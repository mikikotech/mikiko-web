import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { db, database } from "./../../utils/firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";
import { ref, onValue, limitToLast, query } from "firebase/database";
import logopin from "./logopin.png";
import logopinshadow from "./logopinshadow.png";
import { Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const icon = new Icon({
  iconUrl: logopin,
  shadowUrl: logopinshadow,
  iconSize: [32, 42],
  shadowSize: [32, 42],
});

const MapPage = () => {
  const [device, deviceSet] = useState([]);
  const pos = { lat: -8.340539, lng: 115.091949 };

  const getDevices = async () => {
    const deviceList = await getDocs(collection(db, "devices"));
    let dev = [];
    deviceList.docs.map((doc) => {
      dev.push(doc.data());
    });

    deviceSet(dev);
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div style={{ width: "100vw", height: "92vh", marginTop: "8vh" }}>
      <MapContainer
        center={[pos.lat, pos.lng]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {device.map((doc) => {
          // console.log(doc.geoPoint);
          // const rldb = ref(database, `${doc.id}/Sensor`);

          var humi = 0;
          var temp = 0;
          var soil = 0;
          var ph = 0;
          const rldb = ref(database, `${doc.id}/data`);
          onValue(rldb, (res) => {
            const data = res.val();
            if (data != null) {
              humi = res.val().humi;
              temp = res.val().temp;
              soil = res.val().soil;
              ph = res.val().ph;
            }
            console.log(temp);
          });

          return (
            <Marker
              position={[
                doc?.geoPoint?._lat != undefined ? doc.geoPoint._lat : pos.lat,
                doc?.geoPoint?._long != undefined
                  ? doc.geoPoint._long
                  : pos.lng,
              ]}
              icon={icon}
            >
              <Popup>
                <Typography variant="caption">
                  {" "}
                  Device Owner = {doc.devOwner}
                </Typography>
                <br />
                <Typography variant="caption">
                  {" "}
                  Device Location = {doc.location}
                </Typography>
                <Typography variant="caption"> Temperature = {temp}</Typography>
                <br />
                <Typography variant="caption"> Humidity = {humi}</Typography>
                <br />
                <Typography variant="caption">
                  {" "}
                  Soil Moisture = {soil}
                </Typography>
                <br />
                <Typography variant="caption"> Soil PH = {ph}</Typography>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapPage;

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { db, database } from "./../../utils/firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";
import { ref, onValue } from "firebase/database";
import logopin from "./logopin.png";
import logopinshadow from "./logopinshadow.png";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const icon = new Icon({
  iconUrl: logopin,
  shadowUrl: logopinshadow,
  iconSize: [32, 42],
  shadowSize: [32, 42],
});

const MapPage = () => {
  const [device, deviceSet] = useState([]);
  const [deviceRLDB, deviceRLDBSet] = useState([]);
  const pos = { lat: -8.340539, lng: 115.091949 };

  const getDevices = async () => {
    const deviceList = await getDocs(collection(db, "devices"));
    let dev = [];
    deviceList.docs.map((doc) => {
      dev.push(doc.data());
    });

    dev.map(async (res, i) => {
      const rldb = await ref(database, `${res.id}/data`);
      onValue(rldb, (resp) => {
        deviceRLDBSet((oldVal) => {
          const copy = [...oldVal];

          copy[i] = {
            id: res.id,
            humi: resp?.val()?.humi,
            temp: resp?.val()?.temp,
            soil: resp?.val()?.soil,
            ph: resp?.val()?.ph,
          };

          return copy;
        });
      });
    });

    deviceSet(dev);
  };

  useEffect(() => {
    getDevices();

    console.log(deviceRLDB);
  }, []);

  return (
    <div style={{ width: "100vw", height: "92vh", marginTop: "8vh" }}>
      <MapContainer
        center={[pos.lat, pos.lng]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {device.map((doc, i) => {
          // console.log(doc.geoPoint);
          // const rldb = ref(database, `${doc.id}/Sensor`);

          // console.log(deviceRLDB[i]?.id);

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
                {doc.model == "5CH" ? (
                  <>
                    <br />
                    <br />
                    <Typography variant="caption">
                      {" "}
                      Temperature = {deviceRLDB[i]?.temp}
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      {" "}
                      Humidity = {deviceRLDB[i]?.humi}
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      {" "}
                      Soil Moisture = {deviceRLDB[i]?.soil}
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      {" "}
                      Soil PH = {deviceRLDB[i]?.ph}
                    </Typography>
                    <br />
                    <br />
                    <Link to={`/detail/${doc.id}`}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Typography variant="subtitle2">See Details</Typography>
                        <InsertLinkIcon
                          style={{ height: "20px", width: "20px" }}
                        />
                      </Stack>
                    </Link>
                  </>
                ) : null}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapPage;

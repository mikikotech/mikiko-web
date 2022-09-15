import React, { useEffect } from "react";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { useParams } from "react-router-dom";
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
import { database } from "../../utils/firebase-config";
import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
      display: false,
    },
  },
};

const DetailPage = () => {
  let { devId } = useParams();

  const [temp, setTemp] = useState([]);
  const [humi, setHumi] = useState([]);
  const [soil, setSoil] = useState([]);
  const [ph, setPh] = useState([]);
  const [time, setTime] = useState([]);

  const servers = {
    iceServers: [
      {
        urls: ["stun:aws4stun.tuyaus.com:3478", "stun:54.189.54.25:3478"], // free STUN servers provided by Google
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const peerConnection = new RTCPeerConnection(servers);

  const getData = async () => {
    const rldb = await query(ref(database, `${devId}/Sensor`), limitToLast(10));

    onValue(rldb, (res) => {
      console.log(res.val());

      var data = res.val();

      var tempArray = [];
      var humiArray = [];
      var soilArray = [];
      var phArray = [];
      var timeArray = [];

      for (let id in data) {
        tempArray.push(data[id].temp);
        humiArray.push(data[id].hum);
        soilArray.push(data[id].soil);
        phArray.push(data[id].ph);
        timeArray.push(data[id].time);
      }

      setTemp(tempArray);
      setHumi(humiArray);
      setSoil(soilArray);
      setPh(phArray);
      setTime(timeArray);
    });
  };

  useEffect(() => {
    getData();

    const peerListener = peerConnection.addEventListener(
      "icecandidate",
      (event) => {
        if (event.candidate) {
          console.log(event);
        }
      }
    );

    return () => peerListener;
  }, []);

  return (
    <div style={{ marginTop: "8vh" }}>
      <h1>Detail page</h1>

      <Stack direction="row">
        <Stack>
          {temp.length > 1 ? (
            <div style={{ width: "60vh", height: "40vh" }}>
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Temperature",
                      data: temp,
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
            </div>
          ) : null}
          {humi.length > 1 ? (
            <div style={{ width: "60vh", height: "40vh" }}>
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Humidity",
                      data: humi,
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
            </div>
          ) : null}
        </Stack>
        <Stack>
          {soil.length > 1 ? (
            <div style={{ width: "60vh", height: "40vh" }}>
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Soil Moisture",
                      data: soil,
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
            </div>
          ) : null}
          {ph.length > 1 ? (
            <div style={{ width: "60vh", height: "40vh" }}>
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Soil PH",
                      data: ph,
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
            </div>
          ) : null}
        </Stack>

        <Stack gap={8} marginLeft={10}>
          <div style={{ width: "30vh", height: "30vh" }}>
            <Typography variant="subtitle2">Temperature</Typography>
            <CircularProgressbar
              maxValue={60}
              value={temp[temp.length - 1]}
              text={`${temp[temp.length - 1]}°C`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgb(255, 99, 132)`,
                textColor: "rgb(255, 99, 132)",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
          <div style={{ width: "30vh", height: "30vh" }}>
            <Typography variant="subtitle2">Humidity</Typography>
            <CircularProgressbar
              value={humi[humi.length - 1]}
              text={`${humi[humi.length - 1]}%`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgb(255, 99, 132)`,
                textColor: "rgb(255, 99, 132)",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </Stack>

        <Stack gap={8} marginLeft={5}>
          <div style={{ width: "30vh", height: "30vh" }}>
            <Typography variant="subtitle2">Soil Moisture</Typography>
            <CircularProgressbar
              value={soil[soil.length - 1]}
              text={`${soil[soil.length - 1]}%`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgb(255, 99, 132)`,
                textColor: "rgb(255, 99, 132)",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
          <div style={{ width: "30vh", height: "30vh" }}>
            <Typography variant="subtitle2">Soil PH</Typography>
            <CircularProgressbar
              value={ph[ph.length - 1]}
              maxValue={14}
              text={`${ph[ph.length - 1]}`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgb(255, 99, 132)`,
                textColor: "rgb(255, 99, 132)",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default DetailPage;

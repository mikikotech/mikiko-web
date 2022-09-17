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
  const [deviceRLDB, deviceRLDBSet] = useState([]);
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
        humiArray.push(data[id].humi);
        soilArray.push(data[id].soil);
        phArray.push(data[id].ph);
        timeArray.push(data[id].time);
      }

      setTime((oldVal) => {
        var copy = [...oldVal];

        timeArray.map((val, i) => {
          console.log("time", val);
          copy[i] = new Date(val * 1000).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
        });

        return copy;
      });

      setTemp(tempArray);
      setHumi(humiArray);
      setSoil(soilArray);
      setPh(phArray);
    });
  };

  const getRTDB = async () => {
    const rldb = await ref(database, `${devId}/data`);
    onValue(rldb, (resp) => {
      console.log("realtime", resp.val());
      deviceRLDBSet((oldVal) => {
        const copy = [...oldVal];

        copy[0] = resp?.val()?.temp;
        copy[1] = resp?.val()?.humi;
        copy[2] = resp?.val()?.soil;
        copy[3] = resp?.val()?.ph;

        return copy;
      });
    });
  };

  useEffect(() => {
    getData();

    getRTDB();

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
    <div style={{ marginTop: "8vh", backgroundColor: "#1f272b" }}>
      <h1>Detail page</h1>

      <Stack direction="row">
        <Stack marginLeft={3} gap={1}>
          {temp.length >= 1 ? (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Temperature",
                      data: temp,
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: ["00:00"],
                  datasets: [
                    {
                      label: "Temperature",
                      data: [0],
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          )}
          {humi.length >= 1 ? (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Humidity",
                      data: humi,
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: ["00:00"],
                  datasets: [
                    {
                      label: "Humidity",
                      data: [0],
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          )}
        </Stack>
        <Stack marginLeft={1} gap={1}>
          {soil.length >= 1 ? (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Soil Moisture",
                      data: soil,
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: ["00:00"],
                  datasets: [
                    {
                      label: "Soil Moisture",
                      data: [0],
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          )}
          {ph.length >= 1 ? (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: time,
                  datasets: [
                    {
                      label: "Soil PH",
                      data: ph,
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "60vh",
                height: "40vh",
                backgroundColor: "#0e1214",
                borderRadius: "20px",
              }}
            >
              <Line
                options={options}
                data={{
                  labels: ["00:00"],
                  datasets: [
                    {
                      label: "Soil PH",
                      data: [0],
                      borderColor: "#169b7e",
                      backgroundColor: "#169b7e",
                    },
                  ],
                }}
              />
            </div>
          )}
        </Stack>

        <Stack gap={8} marginLeft={5}>
          <div style={{ width: "30vh", height: "30vh" }}>
            <Typography variant="subtitle2">Temperature</Typography>
            <CircularProgressbar
              maxValue={60}
              value={deviceRLDB[0]}
              text={`${deviceRLDB[0]}°C`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `#169b7e`,
                textColor: "#169b7e",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
          <div style={{ width: "30vh", height: "30vh" }}>
            <Typography variant="subtitle2">Humidity</Typography>
            <CircularProgressbar
              value={deviceRLDB[1]}
              text={`${deviceRLDB[1]}%`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `#169b7e`,
                textColor: "#169b7e",
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
              value={deviceRLDB[2]}
              text={`${deviceRLDB[2]}%`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `#169b7e`,
                textColor: "#169b7e",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
          <div style={{ width: "30vh", height: "30vh" }}>
            <Typography variant="subtitle2">Soil PH</Typography>
            <CircularProgressbar
              value={Number(Number(deviceRLDB[3])).toFixed(2)}
              maxValue={14}
              text={`${Number(Number(deviceRLDB[3])).toFixed(2)}`}
              styles={buildStyles({
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `#169b7e`,
                textColor: "#169b7e",
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

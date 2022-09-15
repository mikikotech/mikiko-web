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

const DetailPage = () => {
  let { devId } = useParams();

  const [temp, setTemp] = useState([]);
  const [humi, setHumi] = useState([]);
  const [soil, setSoil] = useState([]);
  const [ph, setPh] = useState([]);
  const [time, setTime] = useState([]);

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
  }, []);

  return (
    <div style={{ marginTop: "8vh" }}>
      <h1>Detail page</h1>
      {temp.length > 1 ? (
        <Line
          //   width={"200px"}
          //   height={"200px"}
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
      ) : null}
    </div>
  );
};

export default DetailPage;

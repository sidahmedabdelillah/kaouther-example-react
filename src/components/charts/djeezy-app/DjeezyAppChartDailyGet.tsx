import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import { Line } from "react-chartjs-2";
import {
  DjeezyAppChartService,
  DjeezyAppServerRequestsType,
} from "../../../services/chart-services/DjeezyAppChartService";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import moment from "moment";
import "chartjs-adapter-moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Djezzy App 1",
    },
  },
};

const DjeezyAppChartDailyGet = () => {
  const djeezyAppChartService = new DjeezyAppChartService();
  const [chartData, setChartData] = useState<DjeezyAppServerRequestsType[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    djeezyAppChartService.getFiveMinutsResults().then((response) => {
      setChartData(response);
    });

    const intervalId = setInterval(() => {
      const lastDate = chartData.length
        ? new Date(chartData[chartData.length - 1].date)
        : undefined;
      djeezyAppChartService.getFiveMinutsResults(lastDate).then((response) => {
        setChartData(
          [...chartData, ...response]
        );
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const newLabesl = chartData.map(({ date }) => date.toString());
    setLabels(newLabesl);
  }, [chartData]);

  // scales: {
  //   xAxes: [
  //     {
  //       type: "time",
  //       time: {
  //         unit: "minute",
  //         unitStepSize: 120,
  //         displayFormats: { minute: "HH:mm" },
  //         min: moment().format("YYYY-MM-DD 00:00"),
  //         max: moment().format("YYYY-MM-DD 23:59"),
  //       },
  //       scaleLabel: {
  //         display: true,
  //         labelString: "Time",
  //       },
  //       gridLines: {
  //         display: true,
  //         color: "#2e2e2e",
  //       },
  //     },
  //   ],
  //   yAxes: [
  //     {
  //       scaleLabel: {
  //         display: true,
  //         labelString: "Request/5minutes",
  //       },
  //       gridLines: {
  //         display: true,
  //         color: "#2e2e2e",
  //       },
  //     },
  //   ],
  // },
  return (
    <Line
      options={{
        ...options,
        scales: {
          x: {
            type: "time",
            time: { unit: "minute", displayFormats: { minute: "HH:mm" } },
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: "GET requests",
            data: chartData.map(({ get }) => get),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "POST requests",
            data: chartData.map(({ post }) => post),
            borderColor: "rgb(13, 62, 10)",
            backgroundColor: "rgba(13, 62, 10, 0.5)",
          },
        ],
      }}
    />
  );
};

export default DjeezyAppChartDailyGet;

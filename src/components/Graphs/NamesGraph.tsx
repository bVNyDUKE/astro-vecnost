import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { NameStat } from "../../types";

export const NamesGraph = ({ nameStats }: { nameStats: NameStat[] }) => {
  const labels = useMemo(() => nameStats.map((x) => x.name), [nameStats]);
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Procenat",
          data: nameStats.map((x) => x.percent),
          borderColor: "white",
          datalabels: {
            display: true,
            color: "black",
            anchor: "end" as const,
            align: "top" as const,
            rotation: -90,
            formatter: function (value: string) {
              return value + "%";
            },
          },
          backgroundColor: "gray",
        },
        {
          label: "Ukupno",
          data: nameStats.map((x) => x.total),
          borderColor: "white",
          datalabels: {
            display: true,
            color: "black",
            anchor: "end" as const,
            align: "top" as const,
            font: { size: 15 },
          },
          backgroundColor: "rgb(55,65,70)",
        },
      ],
    };
  }, [labels, nameStats]);

  const options = {
    elements: {
      bar: { borderWidth: 1 },
    },
    normalized: true,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 30,
        left: 10,
      },
    },
    scales: {
      x: {
        display: true,
        stacked: false,
        grid: { display: false },
        ticks: { font: { size: 16 } },
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Najčešća imena",
        position: "top" as "top",
        font: { weight: "bold", size: 15 },
      },
      legend: { display: false },
    },
  };

  return <Bar datasetIdKey="names" options={options} data={data} />;
};

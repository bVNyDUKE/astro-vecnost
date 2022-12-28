import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import type { IGenStats } from "../../types";

export const GenGraph = ({ genStats }: { genStats: IGenStats[] | null }) => {
  const data = useMemo(() => {
    return {
      labels: ["muski", "zenski", "nepoznato"],
      datasets: [
        {
          data: genStats
            ? [genStats[0].male, genStats[0].female, genStats[0].na]
            : [],
          backgroundColor: ["#E7D2CC", "#b9b7bd", "#868b8e", "#eeede7"],
        },
      ],
    };
  }, [genStats]);

  if (!genStats) {
    return <div></div>;
  }

  const options = {
    normalized: true,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Polovi",
        position: "top" as const,
        font: { size: 25, family: "Playfair" },
        color: "Black",
      },
      datalabels: {
        display: true,
        anchor: "center" as const,
        formatter: function (value: string) {
          return value + "%";
        },
      },
    },
  };

  return <Pie datasetIdKey="okrug" options={options} data={data} />;
};

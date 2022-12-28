import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { PersonsPerOkrugStat } from "../../types";

export const OkrugGraph = ({
  personsPerOkrug,
}: {
  personsPerOkrug: PersonsPerOkrugStat[] | null;
}) => {
  const data = useMemo(() => {
    return {
      labels: personsPerOkrug ? personsPerOkrug.map((x) => x.name) : [],
      datasets: [
        {
          data: personsPerOkrug ? personsPerOkrug.map((x) => x.count) : [],
          backgroundColor: ["#E7D2CC", "#b9b7bd", "#868b8e", "#eeede7"],
        },
      ],
    };
  }, [personsPerOkrug]);

  if (!personsPerOkrug) {
    return <div></div>;
  }

  const options = {
    normalized: true,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Broj lica po okrugu",
        position: "top" as const,
        font: { size: 25, family: "Playfair" },
        color: "Black",
      },
      datalabels: {
        display: true,
        anchor: "end" as const,
        align: "end" as const,
        offset: -7,
      },
    },
  };

  return <Pie datasetIdKey="okrug" options={options} data={data} />;
};

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  Title,
  Tooltip,
  ChartDataLabels,
  BarElement,
  Legend
);

export * from "./NamesGraph";
export * from "./LastnamesGraph";
export * from "./OkrugGraph";
export * from "./GenGraph";

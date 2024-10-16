import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import ChartSkeleton from "./ChartSkeleton";
const VerticalBarChart = dynamic(() => import("./VerticalBarChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const LineChart = dynamic(() => import("./HorizontalLineChart"), {
  ssr: false,
});

const ChartsSection = () => {
  const selectedBar = useSearchParams().get("selectedBar");
  return (
    <div className="flex md:flex-row flex-col gap-5">
      <VerticalBarChart />
      {selectedBar && <LineChart />}
    </div>
  );
};

export default ChartsSection;

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { base_url_server, fetcher } from "@/lib/utils";
import toast from "react-hot-toast";

const HorizontalLineChart = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const selectedBar = searchParams.get('selectedBar')

  const { data: apiData } = useSWR(
    [
      (selectedBar &&  selectedBar !== "")
        ? `${base_url_server}/chart/get-filtereddata?from=${fromDate}&to=${toDate}&age=${age}&gender=${gender}&selectedBar=${selectedBar}`
        : null,
      selectedBar,
    ],

    fetcher,
    {
      revalidateOnFocus: false,
      onError(e) {
        toast.error(`Something went wrong, please try again later`);
        console.log(e);
      },
    }
  );
  console.log(apiData);
  

  return (
    <div>
      <LineChart
        width={730}
        height={250}
        data={apiData?.chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default HorizontalLineChart;

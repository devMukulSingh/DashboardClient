import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { base_url_server } from "@/lib/utils";
import toast from "react-hot-toast";
import { Iargs } from "./VerticalBarChart";
import useLocalStorage from "@/lib/hooks/UseLocalStorage";

const fetcher = async (args: { url: string; keys: Iargs }) =>
  await fetch(args.url, {
    credentials: "include",
  }).then((res) => res.json());
const HorizontalLineChart = () => {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const selectedBar = searchParams.get("selectedBar");
  const { getFromLocalStorage } = useLocalStorage();
  const user = getFromLocalStorage("user");

  const { data: apiData } = useSWR(
    {
      url:
        selectedBar && selectedBar !== ""
          ? `${base_url_server}/chart/get-filtereddata?from=${fromDate}&to=${toDate}&age=${age}&gender=${gender}&selectedBar=${selectedBar}`
          : null,
      keys: {
        selectedBar,
        token: user.token,
      },
    },
    fetcher,
    {
      revalidateOnFocus: false,
      onError(e) {
        toast.error(`Something went wrong, please try again later`);
        console.log(e);
      },
    },
  );

  return (
    <ResponsiveContainer
      width={500}
      height={300}
      className={"border-2 py-5 px-5 "}
    >
      <LineChart width={730} height={250} data={apiData?.chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HorizontalLineChart;

"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { base_url_server } from "@/lib/utils";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { IapiData } from "@/lib/types";
import useAddParams from "@/lib/hooks/UseAddParams";
import useLocalStorage from "@/lib/hooks/UseLocalStorage";

export interface Iargs {
  toDate: string;
  fromDate: string;
  gender: string;
}

const fetcher = async (args: { url: string; keys: Iargs }) =>
  await fetch(args.url, {
    credentials: "include",
  }).then((res) => res.json());

type Props = {};
const VerticalBarChart = ({}: Props) => {
  const { getFromLocalStorage } = useLocalStorage();
  const user = getFromLocalStorage("user");
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const { addSearchParams } = useAddParams();

  const { data } = useSWR<IapiData>(
    {
      url:
        fromDate || toDate || age || gender
          ? `${base_url_server}/chart/get-filtereddata?from=${fromDate}&to=${toDate}&age=${age}&gender=${gender}`
          : `${base_url_server}/chart/get-chartdata`,
      keys: {
        fromDate,
        gender,
        age,
      },
    },
    fetcher,
    {
      revalidateOnFocus: false,
      onError(e) {
        toast.error(`Something went wrong, please try again later`);
        console.log(e);
      },
    }
  );

  return (
    <>
      <ResponsiveContainer width={500} height={340} className={" border-2   "}>
        <BarChart margin={{
          bottom:10,
          left:0,
          right:30,
          top:10
        }} layout="vertical" data={data?.chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey={"name"} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalTime"
            fill="#82ca9d"
            onClick={(data) =>
              addSearchParams({ selectedBar: data.payload.name })
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default VerticalBarChart;

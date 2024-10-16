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
  token: string | undefined;
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
    <>
      <ResponsiveContainer
        width={500}
        height={300}
        className={"py-2 border-2  "}
      >
        <BarChart
          className=""
          margin={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}
          layout="vertical"
          data={data?.chartData}
        >
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

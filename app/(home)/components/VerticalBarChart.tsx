"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Chart from "chart.js/auto";
import { base_url_server } from "@/lib/utils";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Fragment, Suspense, useState } from "react";
import DatePicker from "./DatePicker";
import { DateRange } from "react-day-picker";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IapiData } from "@/lib/types";
import ChartSkeleton from "./ChartSkeleton";
import useAddParams from "@/lib/hooks/useAddParams";
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
  const router = useRouter();
  const { getFromLocalStorage } = useLocalStorage();
  const user = getFromLocalStorage("user");
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
   const { addSearchParams } = useAddParams();

  const { data, isLoading } = useSWR<IapiData>(
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
    }
  );

  return (
    <>
        
   
        <ResponsiveContainer
          width={500}
          height={300}
          className={"border-2 p-5"}
        >
          <BarChart
            layout="vertical"
            data={data?.chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
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

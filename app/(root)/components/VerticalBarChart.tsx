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
import { base_url_server, fetcher } from "@/lib/utils";
import useSWR from "swr";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import DatePicker from "./DatePicker";
import { DateRange } from "react-day-picker";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IapiData } from "@/lib/types";


type Props = {

};
const VerticalBarChart = ({  }: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const age = searchParams.get("age");
  const gender = searchParams.get('gender')

  const addSearchParams = (newParams: any) => {
    // Get the current search params and turn them into a URLSearchParams object
    const params = new URLSearchParams(searchParams);

    // Loop through the newParams object and append or update the query params
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] === undefined) {
        params.delete(key); // Optionally remove params if value is undefined
      } else {
        params.set(key, newParams[key]);
      }
    });

    // Push the new URL with the updated search params
    router.push(`?${params.toString()}`);
  };

  const { data } = useSWR<IapiData>(
    [
      (fromDate || toDate || age || gender)
        ? `${base_url_server}/chart/get-filtereddata?from=${fromDate}&to=${toDate}&age=${age}&gender=${gender}`
        : `${base_url_server}/chart/get-chartdata`,
      fromDate,
      gender,
      age,
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


  return (
    <>
      <ResponsiveContainer width={500} height={300} className={"border-2 p-5"}>
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
            onClick={(data) => addSearchParams({selectedBar:data.payload.name})}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default VerticalBarChart;

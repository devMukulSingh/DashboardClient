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
import { useParams, useSearchParams } from "next/navigation";

interface IapiData {
  excelData: {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    age: string;
    Gender: string;
    Day: Date;
  }[];
  chartData: {
    totalTime: number;
    name: string;
  }[];
}
type Props = {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
};
const Charts = ({ date, setDate }: Props) => {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const age = searchParams.get("age");
  const gender = searchParams.get('gender')


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
      <ResponsiveContainer width="50%" height="50%">
        <BarChart
          layout="vertical"
          width={500}
          height={300}
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
          <Bar dataKey="totalTime" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Charts;

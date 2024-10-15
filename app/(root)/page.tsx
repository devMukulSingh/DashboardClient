"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import DatePicker from "./components/DatePicker";
import { DateRange } from "react-day-picker";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Chart = dynamic(() => import("./components/Charts"), { ssr: false });

export default function Home() {
  const currMonth = useMemo(() => new Date().getMonth(), []);
  const initialDate = useMemo( () => ({
    from: new Date(2022, currMonth, 1),
    to: new Date(2022, currMonth, 30),
  }),[])
  const [date, setDate] = useState<DateRange | undefined>(initialDate);
  const router = useRouter();
  const handleClearFilters = () => {
    router.push('/');
    setDate(initialDate);
  }
  return (
    <main className="flex flex-col gap-5 justify-center items-center h-screen w-screen">
      <div className="h-screen md:w-2/3 w-full gap-5 flex flex-col items-center justify-center">
        <Chart date={date} setDate={setDate} />
        <DatePicker date={date} setDate={setDate} />
        <GenderFilter
        />
        <AgeFilter />
        <Button onClick={handleClearFilters}>Clear filters</Button>
      </div>
    </main>
  );
}

"use client";
import { useMemo, useState } from "react";
import DatePicker from "./components/DatePicker";
import { DateRange } from "react-day-picker";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ChartsSection from "./components/ChartsSection";

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
    <main className="flex flex-col gap-5 justify-center items-center h-screen w-screen p-5 sm:p-10">
      <div className="h-screen md:w-2/3 w-full gap-5 flex flex-col items-center justify-center">
        <ChartsSection/>
        <DatePicker date={date} setDate={setDate} />
        <GenderFilter
        />
        <AgeFilter />
        <Button onClick={handleClearFilters}>Clear filters</Button>
      </div>
    </main>
  );
}

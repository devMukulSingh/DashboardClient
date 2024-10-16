"use client";
import { useMemo, useState } from "react";
import DatePicker from "./components/DatePicker";
import { DateRange } from "react-day-picker";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ChartsSection from "./components/ChartsSection";
import dynamic from "next/dynamic";
import useLocalStorage from "@/lib/hooks/UseLocalStorage";
const Header = dynamic(() => import("./components/Header"), { ssr: false });
import Cookies from "js-cookie";

export default function Home() {
  const currMonth = useMemo(() => new Date().getMonth(), []);
  const initialDate = useMemo(
    () => ({
      from: new Date(2022, currMonth, 1),
      to: new Date(2022, currMonth, 30),
    }),
    [],
  );
  const [date, setDate] = useState<DateRange | undefined>(initialDate);
  const { getFromLocalStorage } = useLocalStorage();
  const user = getFromLocalStorage("user");
  const router = useRouter();
  const handleClearFilters = () => {
    router.push("/");
    setDate(initialDate);
    if (Cookies.get(user.id)) Cookies.remove(user.id);
  };
  return (
    <main className="flex flex-col gap-5 justify-center items-center min-h-screen p-5 sm:p-10">
      <Header />
      <div className=" md:w-2/3 w-full gap-5 flex flex-col items-center justify-center">
        <ChartsSection />
        <DatePicker date={date} setDate={setDate} />
        <GenderFilter />
        <AgeFilter />
        <Button onClick={handleClearFilters}>Clear filters</Button>
      </div>
    </main>
  );
}

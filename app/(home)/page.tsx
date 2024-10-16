"use client";
import { useMemo, useState } from "react";
import DatePicker from "./components/DatePicker";
import { DateRange } from "react-day-picker";
import GenderFilter from "./components/GenderFilter";
import AgeFilter from "./components/AgeFilter";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import ChartsSection from "./components/ChartsSection";
import dynamic from "next/dynamic";
import useLocalStorage from "@/lib/hooks/UseLocalStorage";
const Header = dynamic(() => import("./components/Header"), { ssr: false });
import Cookies from "js-cookie";
import { parse } from "date-fns";

export default function Home() {
  const fromDate = useSearchParams().get("from");
  const toDate = useSearchParams().get("to");
  let from: Date;
  let to: Date;

  if (fromDate) from = parse(fromDate, "dd/MM/yyyy", new Date());
  if (toDate) to = parse(toDate, "dd/MM/yyyy", new Date());

  const currMonth = useMemo(() => new Date().getMonth(), []);
  const initialDate = useMemo(
    () => ({
      from: from || new Date(2022, currMonth, 1),
      to: to || new Date(2022, currMonth, 30),
    }),
    []
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
    <main className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-5rem)]  ">
      <div className=" md:w-2/3 w-full gap-5 flex flex-col sm:items-center px-5 py-5 sm:p-10   ">
        <ChartsSection />
        <div className=" gap-5 flex flex-col sm:px-0 px-20    ">
          <DatePicker date={date} setDate={setDate} />
          <GenderFilter />
          <AgeFilter />
          <Button className="w-fit" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      </div>
    </main>
  );
}

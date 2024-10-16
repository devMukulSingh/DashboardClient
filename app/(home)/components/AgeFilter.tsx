"use client";
import { useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useAddParams from "@/lib/hooks/UseAddParams";

const AgeFilter = () => {
  const ages = ["15-25", ">25"];
  const searchParams = useSearchParams();
  const ageParams = searchParams.get("age");
  const { addSearchParams } = useAddParams();

  return (
    <div className="flex border justify-between w-[20rem] p-2">
      <section>
        <h1>Age</h1>
      </section>
      <section className="flex gap-5">
        <RadioGroup defaultValue="comfortable">
          {ages.map((age, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem
                checked={ageParams === age}
                onClick={() => {
                  addSearchParams({ age });
                }}
                value={age}
                id={age}
              />
              <Label htmlFor={age}>{age}</Label>
            </div>
          ))}
        </RadioGroup>
      </section>
    </div>
  );
};

export default AgeFilter;

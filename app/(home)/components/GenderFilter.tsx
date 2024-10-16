"use client";
import { useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useAddParams from "@/lib/hooks/UseAddParams";

const GenderFilter = ({}) => {
  const genders = ["Male", "Female"];
  const searchParams = useSearchParams();
  const genderSearch = searchParams.get("gender");
  const { addSearchParams } = useAddParams();

  return (
    <div className="flex border justify-between w-[20rem] p-2">
      <section>
        <h1>Gender</h1>
      </section>
      <section className="flex gap-5">
        <RadioGroup defaultValue="comfortable">
          {genders.map((gender, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem
                checked={genderSearch === gender}
                onClick={() => {
                  addSearchParams({ gender });
                }}
                value={gender}
                id={gender}
              />
              <Label htmlFor={gender}>{gender}</Label>
            </div>
          ))}
        </RadioGroup>
      </section>
    </div>
  );
};

export default GenderFilter;

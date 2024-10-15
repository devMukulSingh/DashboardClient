"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const AgeFilter = () => {
  const router = useRouter();
  const ages = ["15-25", ">25"];
  const searchParams = useSearchParams();
  const ageParams = searchParams.get('age');

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
  return (
    <div className="flex border justify-between w-[20rem] p-2">
      <section>
        <h1>Age</h1>
      </section>
      <section className="flex gap-5">
        <RadioGroup defaultValue="comfortable">
          {ages.map((age, index) => (
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={ageParams===age}
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

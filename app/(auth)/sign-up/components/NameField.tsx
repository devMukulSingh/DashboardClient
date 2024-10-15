import React from "react";
import { Iform } from "./SignUpForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const NameField = ({ form }: Iform) => {
  return (
    <FormField
      name="name"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Mukul singh bisht" />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  );
};

export default NameField;

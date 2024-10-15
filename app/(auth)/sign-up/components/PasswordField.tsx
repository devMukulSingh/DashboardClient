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

const PasswordField = ({ form }: Iform) => {
  return (
    <FormField
      name="password"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input {...field} type="password" />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  );
};

export default PasswordField;

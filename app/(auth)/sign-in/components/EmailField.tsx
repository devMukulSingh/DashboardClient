import React from "react";
import { Iform } from "./SignInForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const EmailField = ({ form,isMutating }: Iform) => {
  return (
    <FormField
      disabled={isMutating}
      name="email"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} placeholder="mukulsingh2276@gmail.com" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailField;

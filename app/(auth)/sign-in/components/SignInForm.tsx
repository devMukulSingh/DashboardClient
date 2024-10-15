"use client";
import { signInSchema } from "@/lib/schema";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { base_url_server, useLocalStorage } from "@/lib/utils";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type formValues = z.infer<typeof signInSchema>;
async function sendRequest(
  url: string,
  { arg }: { arg: formValues | { token: string } }
) {
  return await axios.post(url, arg);
}

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
}

const SignUpForm = () => {
  const form = useForm<formValues>({
    resolver: zodResolver(signInSchema),
  });
  const { setInLocalStorage } = useLocalStorage();
  const router = useRouter();

  const { trigger: setToken } = useSWRMutation(
    `/api/auth/set-token`,
    sendRequest
  );

  const { trigger } = useSWRMutation(
    `${base_url_server}/auth/sign-in`,
    sendRequest,
    {
      onError(e) {
        toast.error("Something went wrong");
        console.log(e);
      },
      async onSuccess(data) {
        setInLocalStorage("token", data.data.token);
        await setToken({token:data.data.token});
        router.push("/");
      },
    }
  );
  const onSubmit = (data: formValues) => {
    try {
      trigger(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action=""
        className="flex flex-col gap-5 w-[30rem] border rounded-md p-5"
      >
        <h1 className="text-4xl font-medium">SignIn</h1>
        <Form {...form}>
          <EmailField form={form} />
          <PasswordField form={form} />
        </Form>
        <Button>Continue</Button>
        <Link href={"/sign-up"}>Don't have an account? SignUp</Link>
      </form>
    </>
  );
};

export default SignUpForm;

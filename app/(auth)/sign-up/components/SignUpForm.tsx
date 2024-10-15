"use client";
import { signUpSchema } from "@/lib/schema";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { base_url_server, useLocalStorage } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

type formValues = z.infer<typeof signUpSchema>;

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
}

async function sendRequest(url: string, { arg }: { arg: formValues | {token:string} }) {
  return await axios.post(url, arg);
}

const SignUpForm = () => {
  const { setInLocalStorage } = useLocalStorage();
  const router = useRouter();
  const form = useForm<formValues>({
    resolver: zodResolver(signUpSchema),
  });
    const { trigger: setToken } = useSWRMutation(
      `/api/auth/set-token`,
      sendRequest
    );
  const { trigger } = useSWRMutation(
    `${base_url_server}/auth/sign-up`,
    sendRequest,
    {
      onError(e) {
        toast.error("Something went wrong");
        console.log(e);
      },
     async onSuccess(data){
        setInLocalStorage("token",data.data.token);
        console.log(data.data.token);
        
        await setToken({token:data.data.token});
        router.push('/');
      }
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
        className="flex flex-col gap-5 w-[30rem] border rounded-md p-5"
      >
        <h1 className="text-4xl font-medium">SignUp</h1>
        <Form {...form}>
          <NameField form={form} />
          <EmailField form={form} />
          <PasswordField form={form} />
        </Form>
        <Button>Continue</Button>
        <Link href={"/sign-in"}>Already have an account? SignIn</Link>
      </form>
    </>
  );
};

export default SignUpForm;

"use client";
import { signUpSchema } from "@/lib/schema";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import NameField from "./NameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { base_url_server } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import useLocalStorage from "@/lib/hooks/UseLocalStorage";

type formValues = z.infer<typeof signUpSchema>;

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
  isMutating: boolean;
}

async function sendRequest(
  url: string,
  { arg }: { arg: formValues | { token: string } },
) {
  return await axios.post(url, arg);
}

const SignUpForm = () => {
  const { setInLocalStorage } = useLocalStorage();
  const router = useRouter();
  const form = useForm<formValues>({
    resolver: zodResolver(signUpSchema),
  });
  const { trigger, isMutating } = useSWRMutation(
    `${base_url_server}/auth/sign-up`,
    sendRequest,
    {
      onError(e: AxiosError<any>) {
        console.log(e);
        if (e.response?.data) toast.error(e.response.data.error);
        else toast.error(e.message);
      },
      async onSuccess(data) {
        setInLocalStorage("user", data.data);
        Cookies.set("token", data.data.token, {
          sameSite: "none",
          secure: true,
          expires: 7,
        });
        router.push("/");
      },
    },
  );

  const isLoading = isMutating || form.formState.isSubmitting;
  const onSubmit = async (data: formValues) => {
    try {
      await trigger(data);
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
          <NameField form={form} isMutating={isLoading} />
          <EmailField form={form} isMutating={isLoading} />
          <PasswordField form={form} isMutating={isLoading} />
        </Form>
        <Button disabled={isLoading}>Continue</Button>
        <Link
          className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          aria-disabled={isLoading}
          href={"/sign-in"}
        >
          Already have an account? SignIn
        </Link>
      </form>
    </>
  );
};

export default SignUpForm;

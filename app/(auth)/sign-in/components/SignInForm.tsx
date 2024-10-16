"use client";
import { signInSchema } from "@/lib/schema";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,  } from "@/components/ui/form";
import { z } from "zod";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { base_url_server } from "@/lib/utils";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useLocalStorage from "@/lib/hooks/UseLocalStorage";

type formValues = z.infer<typeof signInSchema>;

async function sendRequest(
  url: string,
  { arg }: { arg: formValues | { token: string } }
) {
  return await axios.post(url, arg, {
    withCredentials: true,
  });
}

export interface Iform {
  form: UseFormReturn<formValues, any, undefined>;
  isMutating: boolean;
}

const SignUpForm = () => {
  const form = useForm<formValues>({
    resolver: zodResolver(signInSchema),
  });

  const { setInLocalStorage } = useLocalStorage();
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    `${base_url_server}/auth/sign-in`,
    sendRequest,
    {
      onError(e: AxiosError<any>) {
        console.log(e);
        if (e.response) toast.error(e.response.data.error);
        else toast.error(e.message);
      },
      async onSuccess(data) {
        setInLocalStorage("user", data.data);
        Cookies.set("token", data.data.token, { expires: 7 });
        const userPreferences = Cookies.get(data.data.id);
        if (userPreferences) router.push(`/?${userPreferences}`);
        else router.push("/");
      },
    }
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
        action=""
        className="flex flex-col gap-5 w-[30rem] border rounded-md p-5"
      >
        <h1 className="text-4xl font-medium">SignIn</h1>
        <Form {...form}>
          <EmailField form={form} isMutating={isLoading} />
          <PasswordField form={form} isMutating={isLoading} />
        </Form>
        <Button disabled={isLoading}>Continue</Button>
        <Link
          className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          aria-disabled={isLoading}
          href={"/sign-up"}
        >
          Don&apos;t have an account? SignUp
        </Link>
      </form>
    </>
  );
};

export default SignUpForm;

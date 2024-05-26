"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { reset } from "@/actions/reset";
import { useState, useTransition } from "react";
export const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | string>();
  const [success, setSuccess] = useState<undefined | string>();

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition( () => {
      reset(values)
        .then((data)=>{
          setError(data?.error)
          setSuccess(data?.success)
        })    
    });
  };

  return (
    <CardWrapper
      headerLable="Forget your password?"
      backButtonLable="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="email"
                      placeholder="abc@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full ">
           Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

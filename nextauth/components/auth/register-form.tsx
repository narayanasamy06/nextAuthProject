"use client"
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
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
import {register} from "@/actions/register"
import { useState, useTransition } from "react";
export const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:"",
    }
  });

const [isPending , startTransition] = useTransition();
const [error,setError] = useState<string | undefined>();
const [success,setSuccess] = useState<string | undefined>();
const onSubmit = (values : z.infer<typeof RegisterSchema>)=>{
  setError("");
  setSuccess("");
  startTransition(()=>{
    register(values).then((data)=>{
      setError(data.error);
      setSuccess(data.success);
    })
  });
    

}

  return (
    <CardWrapper
      headerLable="Create an account"
      backButtonLable="Already have an account"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
          <FormField 
              control={form.control}
              name="name"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="name" placeholder="your name"  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="email" placeholder="abc@example.com"  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="password"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="password" placeholder="********"  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full ">
              Sign up
          </Button>
  
        </form>
      </Form>
    </CardWrapper>
  );
};

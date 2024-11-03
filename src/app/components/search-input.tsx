"use client";

import { Search } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WeatherData } from "../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  cityName: z.string().min(1, { message: "City name is required" }),
});

async function getWeatherData(cityName: string) {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${cityName}&aqi=no`;

  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(`Error getting weather data for ${cityName}:`, error);
    throw error;
  }
}

export default function SearchInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityName: "",
    },
  });

  const { toast } = useToast();
  const { error, isFetching, refetch } = useQuery<WeatherData, AxiosError>({
    queryKey: ["weatherData"],
    queryFn: () => getWeatherData(form.getValues("cityName") || "Koforidua"),
  });

  async function onSubmit() {
    const result = await refetch();
    if (result.isSuccess) {
      form.reset();
    }
  }

  useEffect(() => {
    if (error) {
      const errorMessage =
        (error?.response?.data as { error: { message: string } })?.error
          .message || "Something went wrong";

      toast({
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="cityName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    placeholder="City name..."
                    {...field}
                    disabled={isFetching}
                  />
                </FormControl>
                <Button type="submit" disabled={isFetching}>
                  <Search />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

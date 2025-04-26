/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { maxPrice } from "@/constants";
import { FilterFormSchema } from "@/lib/utils";
import { FilterFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Funnel, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilterFormAccordion } from "./FilterForm";
import { Form } from "./ui/form";

const MobileFilterForm = ({ price, filterOptions }: FilterFormProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [open, setOpen] = useState<boolean>();
  const [error, setError] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      search: "",
      range: [0, 5000],
      rangeFrom: 0,
      rangeTo: 5000,
      type: "all",
    },
  });

  // Watch all form fields for changes
  const formValues = form.watch();

  function onSubmit(data: z.infer<typeof FilterFormSchema>) {}

  useEffect(() => {
    router.refresh();
  }, [
    formValues.range,
    formValues.rangeFrom,
    formValues.rangeTo,
    formValues.search,
    price,
    router,
    params.get("priceRange"),
    params.get("category"),
    params.get("brand"),
    params.get("search"),
    params.get("page"),
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReset = () => {
    form.reset({
      search: "",
      type: "all",
      range: [0, maxPrice],
      rangeFrom: 0,
      rangeTo: maxPrice,
    });

    if (price) {
      router.push("/car-oils");
    } else {
      router.push("/auto-parts");
    }
    setError(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex xl:hidden">
        <Funnel size={24} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="py-6 w-full" side="top">
        <SheetHeader className="flex flex-row justify-between items-center">
          <div className="flex gap-1">
            <span className="text-xl">فلترة المنتجات</span>
          </div>
          <XIcon
            size={22}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </SheetHeader>
        <SheetTitle className="hidden">Filter Products</SheetTitle>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="col-span-3 space-y-6 h-full border-[1px] border-solid border-[#E7E8EC] px-4 rounded-md"
            >
              <FilterFormAccordion
                control={form.control}
                price={price}
                filterOptions={filterOptions}
                error={error}
                handleReset={handleReset}
                slideRange={form.getValues("range")}
              />
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterForm;

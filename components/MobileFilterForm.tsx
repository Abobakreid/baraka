/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { MobileFilterFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Funnel, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilterFormAccordion } from "./FilterForm";
import { Form } from "./ui/form";

const MobileFilterForm = ({
  priceFiltering,
  filterOptions,
  open,
  setOpen,
}: MobileFilterFormProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const priceRange = params.get("priceRange");
  const category = params.get("category");
  const brand = params.get("brand");
  const priceRangeArray = priceRange ? priceRange.split(",").map(Number) : [];
  const rangeFrom = priceRangeArray[0] || 0;
  const rangeTo = priceRangeArray[1] || maxPrice;
  const range = [rangeFrom, rangeTo];

  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      search: params.get("search") || "",
      range: range || [0, maxPrice],
      rangeFrom: rangeFrom,
      rangeTo: rangeTo,
      type: "الكل",
    },
  });

  // Watch all form fields for changes
  const formRange = form.watch("range");
  const formRangeFrom = form.watch("rangeFrom");
  const formRangeTo = form.watch("rangeTo");

  useEffect(() => {
    const currentRange = form.getValues("range") || [0, maxPrice];
    const [newRangeFrom, newRangeTo] = currentRange;

    // Only update if values differ to prevent infinite loops
    if (form.getValues("rangeFrom") !== newRangeFrom) {
      form.setValue("rangeFrom", newRangeFrom);
    }
    if (form.getValues("rangeTo") !== newRangeTo) {
      form.setValue("rangeTo", newRangeTo);
    }
  }, [formRange, form]);

  useEffect(() => {
    const newRangeFrom = form.getValues("rangeFrom") || 0;
    const newRangeTo = form.getValues("rangeTo") || 0;
    const currentRange = form.getValues("range") || [0, maxPrice];

    // Only update range if it differs
    if (currentRange[0] !== newRangeFrom || currentRange[1] !== newRangeTo) {
      form.setValue("range", [newRangeFrom, newRangeTo]);
    }
  }, [formRangeFrom, formRangeTo, form]);

  function onSubmit(data: z.infer<typeof FilterFormSchema>) {}

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  useEffect(() => {
    setOpen(false);
  }, [category, brand, setOpen]);

  const handleReset = () => {
    form.reset({
      search: "",
      type: "الكل",
      range: [0, maxPrice],
      rangeFrom: 0,
      rangeTo: maxPrice,
    });

    if (priceFiltering) {
      router.push("/car-oils");
    } else {
      router.push("/auto-parts");
    }
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
                priceFiltering={priceFiltering}
                filterOptions={filterOptions}
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

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterFormSchema, TypeOption, typeOptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Funnel, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilterFormAccordion } from "./FilterForm";
import { Form } from "./ui/form";
import { useQueryState } from "nuqs";
import { useRouter, useSearchParams } from "next/navigation";
import { maxPrice } from "@/constants";
import { FilterFormProps } from "@/types";

const MobileFilterForm = ({ price, filterOptions }: FilterFormProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [open, setOpen] = useState<boolean>();
  const [error, setError] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [category, setCategory] = useQueryState<TypeOption>("category", {
    defaultValue: "all",
    parse: (value) => {
      // Validate that the value is in typeOptions
      return typeOptions.includes(value as TypeOption)
        ? (value as TypeOption)
        : "all";
    },
    serialize: (value) => (value ? value : ""),
  });
  const [brand, setBrand] = useQueryState<TypeOption>("brand", {
    defaultValue: "all",
    parse: (value) => {
      // Validate that the value is in typeOptions
      return typeOptions.includes(value as TypeOption)
        ? (value as TypeOption)
        : "all";
    },
    serialize: (value) => (value ? value : ""),
  });

  const [priceRange, setPriceRange] = useQueryState("priceRange", {
    defaultValue: [0, maxPrice],
    parse: (value) => value.split(",").map(Number),
    serialize: (value) => value.join(","),
  });

  console.log(search, category, priceRange, brand);

  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      search: search || "",
      range: priceRange,
      rangeFrom: priceRange[0] || 0,
      rangeTo: priceRange[1] || 0,
      type: category !== "all" ? category : brand !== "all" ? brand : "all",
    },
  });

  // Watch all form fields for changes
  const formValues = form.watch();

  function onSubmit(data: z.infer<typeof FilterFormSchema>) {
    console.log(data);
  }

  useEffect(() => {
    router.refresh();
  }, [
    formValues.range,
    formValues.rangeFrom,
    formValues.rangeTo,
    search,
    price,
    router,
    params.get("priceRange"),
    params.get("category"),
    params.get("brand"),
    params.get("search"),
  ]);
  useEffect(() => {
    if (price) {
      if (formValues.rangeFrom || formValues.rangeTo) {
        if (formValues.rangeFrom && formValues.rangeTo) {
          setPriceRange([
            Number(formValues.rangeFrom),
            Number(formValues.rangeTo),
          ]);
        } else if (formValues.rangeTo) {
          setPriceRange([0, Number(formValues.rangeTo)]);
        } else if (formValues.rangeFrom) {
          setPriceRange([Number(formValues.rangeFrom), Number(maxPrice)]);
        }
      }
    }
    router.refresh();
  }, [formValues.rangeFrom, formValues.rangeTo, price, setPriceRange, router]);

  useEffect(() => {
    if (price) {
      if (formValues.range) {
        if (formValues.range.length > 0) {
          setPriceRange([
            Number(formValues.range[0]),
            Number(formValues.range[1]),
          ]);
        }
      }
    }
    router.refresh();
  }, [formValues.range, price, setPriceRange, router]);

  useEffect(() => {
    if (formValues.search) {
      setSearch(`${String(formValues.search)}`);
    }
    if (price) {
      if (formValues.type) {
        setBrand(String(formValues.type) as TypeOption);
      }
    } else {
      if (formValues.type) {
        setCategory(String(formValues.type) as TypeOption);
      }
    }
    router.refresh();
  }, [
    formValues.search,
    formValues.type,
    price,
    setSearch,
    setCategory,
    setBrand,
    router,
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

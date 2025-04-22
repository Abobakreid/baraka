/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { maxPrice } from "@/constants";
import { FilterFormSchema, TypeOption, typeOptions } from "@/lib/utils";
import { FilterFormAccordionProps, FilterFormProps } from "@/types";
import { InputType } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./CustomInput";
import MobileFilterForm from "./MobileFilterForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { RadioGroupItem } from "./ui/radio-group";
const FilterForm = ({ price, filterOptions }: FilterFormProps) => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  // const { setBrand, setRange, setSearchValue } = useGlobalContextApi();
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
  }, [
    formValues.search,
    formValues.type,
    price,
    setSearch,
    setCategory,
    setBrand,
    router,
  ]);

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-3 h-full px-4 rounded-md flex flex-col gap-3"
      >
        <div
          tabIndex={0} // Make the div focusable
          className="flex items-center px-2 border-2 border-[#E7E8EC] rounded-md pr-2.5 focus-within:ring-2 focus-within:ring-blue-500"
        >
          <Search className="text-gray-500" />
          <CustomInput
            control={form.control}
            inputType={InputType.TEXT}
            name="search"
            placeholder="ما الذي تبحث عنه؟"
            type="text"
            inputClassName="focus-visible:ring-0 focus-visible:outline-0 border-0"
          />
          <MobileFilterForm price={price} filterOptions={filterOptions} />
          <Button
            type="submit"
            className="text-lg hidden focus-within:flex" // Hidden by default, shown on focus
          >
            بحث
          </Button>
        </div>
        <div className="hidden xl:flex xl:flex-col h-full">
          <FilterFormAccordion
            control={form.control}
            price={price}
            filterOptions={filterOptions}
            error={error}
            handleReset={handleReset}
            slideRange={form.getValues("range")}
          />
        </div>
        <div className="hidden">
          <Button className="hidden" type="submit">
            submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FilterForm;

export const FilterFormAccordion = ({
  price,
  filterOptions,
  control,
  handleReset,
  error,
  slideRange,
}: FilterFormAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col gap-5 h-full pb-5 w-full xl:border-[1px] border-solid border-[#E7E8EC] xl:px-3"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {price ? "الماركة" : "التصنيفات الرئيسية"}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col py-2">
          <CustomInput
            control={control}
            inputType={InputType.RADIO}
            name="type"
            placeholder=""
            type="text"
          >
            {filterOptions.map((option, index) => (
              <FormItem
                key={index}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormLabel className="font-normal text-[#333333]">
                  {option.label}
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value={option.value} />
                </FormControl>
              </FormItem>
            ))}
          </CustomInput>
        </AccordionContent>
      </AccordionItem>
      {price && (
        <AccordionItem value="item-2" className={`flex-1 `}>
          <AccordionTrigger>السعر</AccordionTrigger>
          <AccordionContent className="flex flex-col">
            <div className="pt-4">
              <CustomInput
                control={control}
                inputType={InputType.RANGE}
                name="range"
                placeholder=""
                type="number"
              />
              <div className="flex gap-2 py-3 justify-center items-center">
                <span>{slideRange?.[0] || 0}</span>-<span>{maxPrice}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              <CustomInput
                control={control}
                inputType={InputType.NUMBER}
                name="rangeFrom"
                placeholder=""
                type="number"
                label="من"
              />
              <CustomInput
                control={control}
                inputType={InputType.NUMBER}
                name="rangeTo"
                placeholder=""
                type="number"
                label="الي"
              />
            </div>
            {error && (
              <span className="text-red-600">من يجب ان تكون اقل من الي</span>
            )}
          </AccordionContent>
        </AccordionItem>
      )}
      <div className="flex flex-col justify-end px-8 flex-1">
        <Button className="w-full" type="button" onClick={handleReset}>
          اعادة الضبط
        </Button>
      </div>
    </Accordion>
  );
};

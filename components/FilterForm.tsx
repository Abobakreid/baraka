/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { maxPrice } from "@/constants";
import { FilterFormSchema } from "@/lib/utils";
import { FilterFormAccordionProps, FilterFormProps } from "@/types";
import { InputType } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
const FilterForm = ({ priceFiltering, filterOptions }: FilterFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const priceRange = params.get("priceRange");
  const priceRangeArray = priceRange ? priceRange.split(",").map(Number) : [];
  const rangeFrom = priceRangeArray[0] || 0;
  const rangeTo = priceRangeArray[1] || maxPrice;
  const range = [rangeFrom, rangeTo];
  const [open, setOpen] = useState<boolean>(false);

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-md:col-span-12 xl:col-span-3 h-full rounded-md flex flex-col gap-3 md:-mt-10"
      >
        <div className="flex items-center px-2 border-2 border-[#E7E8EC] rounded-md pr-2.5 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="text-gray-500" />
          <CustomInput
            control={form.control}
            inputType={InputType.SEARCH}
            name="search"
            placeholder="ما الذي تبحث عنه؟"
            type="text"
            inputClassName="focus-visible:ring-0 focus-visible:outline-0 border-0"
          />
          <MobileFilterForm
            priceFiltering={priceFiltering}
            filterOptions={filterOptions}
            setOpen={setOpen}
            open={open}
          />
        </div>
        <div className="hidden xl:flex xl:flex-col h-full">
          <FilterFormAccordion
            control={form.control}
            priceFiltering={priceFiltering}
            filterOptions={filterOptions}
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
  priceFiltering,
  filterOptions,
  control,
  handleReset,
  slideRange,
}: FilterFormAccordionProps) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={["item-1", "item-2"]}
      className="flex flex-col gap-5 h-full pb-5 w-full xl:border-[1px] border-solid border-[#E7E8EC] xl:px-3"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {priceFiltering ? "الماركة" : "التصنيفات الرئيسية"}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col py-2">
          <CustomInput
            control={control}
            inputType={InputType.RADIO}
            name={priceFiltering ? "brand" : "category"}
            placeholder=""
            type="text"
          >
            {filterOptions.map((option, index) => (
              <FormItem
                key={index}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormLabel className="font-normal text-[#333333] options">
                  {option}
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value={option} />
                </FormControl>
              </FormItem>
            ))}
          </CustomInput>
        </AccordionContent>
      </AccordionItem>
      {priceFiltering && (
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

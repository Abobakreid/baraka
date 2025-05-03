/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { maxPrice } from "@/constants";
import { cn } from "@/lib/utils";
import { RenderInputProps } from "@/types";
import { useQueryState } from "nuqs";
import { InputType } from "../types/enums";
import { Input } from "./ui/input";
import { RadioGroup } from "./ui/radio-group";
import { Slider } from "./ui/slider";

const RenderInput = ({
  type,
  inputType,
  placeholder,
  field,
  child,
  className,
}: RenderInputProps) => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    throttleMs: 500,
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "الكل",
    shallow: false,
    throttleMs: 500,
  });
  const [brand, setBrand] = useQueryState("brand", {
    defaultValue: "الكل",
    shallow: false,
    throttleMs: 500,
  });

  const [priceRange, setPriceRange] = useQueryState("priceRange", {
    defaultValue: [0, maxPrice],
    parse: (value) => value.split(",").map(Number),
    serialize: (value) => value.join(","),
    shallow: false,
    throttleMs: 500,
  });

  const [limit, setLimit] = useQueryState("limit", {
    defaultValue: "6",
    shallow: false,
    throttleMs: 500,
  });

  const handelChange = (value: any, type: string, name?: string) => {
    setLimit("0");
    switch (type) {
      case "search":
        setSearch(value);
      case "number":
        if (name === "rangeFrom") {
          setPriceRange([value, priceRange[1]]);
        } else if (name === "rangeTo") {
          setPriceRange([priceRange[0], value]);
        }
      case "range":
        setPriceRange(value);
      case "radio":
        if (name === "brand") {
          setBrand(value);
        } else if (name === "category") {
          setCategory(value);
        }
    }
  };

  switch (inputType) {
    case InputType.SEARCH:
      return (
        <Input
          placeholder={placeholder}
          {...field}
          value={field.value}
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value);
            handelChange(e.target.value, "search");
          }}
          className={cn(`${className}`)}
        />
      );
    case InputType.EMAIL:
      return (
        <Input
          placeholder={placeholder}
          {...field}
          className={cn(`${className}`)}
        />
      );
    case InputType.PASSWORD:
      return (
        <Input
          placeholder={placeholder}
          {...field}
          type={type}
          className={cn(`${className}`)}
        />
      );
    case InputType.NUMBER:
      return (
        <Input
          placeholder={placeholder}
          type={type}
          min={0}
          value={field.value ?? ""}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            field.onChange(value);
            handelChange(value, "number", field.name);
          }}
          className={cn(`${className}`)}
        />
      );
    case InputType.RANGE:
      return (
        <Slider
          dir="rtl"
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
            handelChange(value, "range");
          }}
          defaultValue={[40, 80]}
          min={0}
          max={maxPrice}
          step={1}
        />
      );
    case InputType.RADIO:
      return (
        <RadioGroup
          onValueChange={(value) => {
            field.onChange(value);
            handelChange(value, "radio", field.name);
          }}
          defaultValue={field.name === "brand" ? brand : category}
          className="flex flex-col items-end space-y-1"
        >
          {child}
        </RadioGroup>
      );
    default:
      return null;
  }
};

export default RenderInput;

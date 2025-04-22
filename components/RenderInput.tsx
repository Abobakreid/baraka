import { maxPrice } from "@/constants";
import { cn } from "@/lib/utils";
import { RenderInputProps } from "@/types";
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
  switch (inputType) {
    case InputType.TEXT:
      return (
        <Input
          placeholder={placeholder}
          {...field}
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
          max={maxPrice}
          value={field.value ?? ""}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            field.onChange(isNaN(value) ? undefined : value);
          }}
          className={cn(`${className}`)}
        />
      );
    case InputType.RANGE:
      return (
        <Slider
          value={field.value}
          onValueChange={field.onChange}
          defaultValue={[40, 80]}
          min={0}
          max={maxPrice}
          step={1}
        />
      );
    case InputType.RADIO:
      return (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
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

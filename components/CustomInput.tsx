import { CustomInputProps } from "@/types";
import RenderInput from "./RenderInput";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

const CustomInput = ({
  name,
  label,
  type,
  inputType,
  placeholder,
  control,
  children,
  inputClassName,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <RenderInput
            type={type}
            inputType={inputType}
            placeholder={placeholder}
            field={field}
            child={children}
            className={inputClassName}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;

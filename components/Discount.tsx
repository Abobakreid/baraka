import { cn } from "@/lib/utils";
import { DiscountProps } from "@/types";

const Discount = ({ value, className }: DiscountProps) => {
  return (
    <div className="relative left-1 top-1">
      <div
        className={cn(
          `absolute top-0 left-0 bg-[#71C173] text-white text-sm font-bold px-3 py-1 rounded-[3px] discount-badge ${className}`
        )}
      >
        {value}
      </div>
    </div>
  );
};

export default Discount;

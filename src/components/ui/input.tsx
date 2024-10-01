import { ComponentProps, ReactNode, forwardRef } from "react";
import { cn } from "src/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  label?: string | ReactNode;
  errorMessage?: string | null;
  labelClassName?: string;
}
function InputInner(
  props: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { className, label, errorMessage, name, labelClassName, ...rest } =
    props;

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={cn("mb-2 font-medium text-sm block", labelClassName)}
        >
          {label}
        </label>
      )}
      <div className="block border border-grey-90 rounded-lg shadow-sm">
        <input
          ref={ref}
          name={name}
          {...rest}
          className={cn(
            "w-full rounded-lg p-2.5 placeholder:text-base outline-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed",
            className
          )}
        />
      </div>
      {errorMessage && (
        <span className="text-red-500 text-sm mt-1 transition-all">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default forwardRef(InputInner);

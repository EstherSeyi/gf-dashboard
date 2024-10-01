import { ComponentProps } from "react";
import { cn } from "src/lib/utils";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = (btnProps: React.PropsWithChildren<ButtonProps>) => {
  const { children, isLoading = false, disabled = false, ...rest } = btnProps;
  return (
    <button
      {...rest}
      disabled={isLoading || disabled}
      className={cn(
        "border-black w-full border bg-black py-3 text-sm font-bold transition-all hover:opacity-80 disabled:border-isabelline disabled:bg-isabelline text-white outline-black disabled:hover:outline-2",
        rest.className
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;

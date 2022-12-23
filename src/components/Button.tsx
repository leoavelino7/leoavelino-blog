import type { FC } from "react";
import classNames from "classnames";

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  Partial<{
    outline: boolean;
    small: boolean;
    type: "submit" | "button";
  }>;

export const Button: FC<ButtonProps> = ({ children, outline, small, ...rest }) => {
  const className = classNames(
    "flex justify-center font-poppins font-medium border-primary border-solid border rounded-md transition-all duration-75 ease-linear focus:outline-dashed",
    rest.className,
    {
      "bg-primary text-paper hover:brightness-75 focus:brightness-75": outline,
      "text-primary hover:bg-primary hover:text-paper focus:border-primary focus:bg-primary focus:text-paper": !outline,
      "py-2 px-4 text-sm lg:text-md": small,
      "py-4 px-7 text-md lg:text-lg": !small
    }
  );

  return (
    <button className={`${className}`} {...rest}>
      {children}
    </button>
  );
};

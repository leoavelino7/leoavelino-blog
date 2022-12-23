import type { FC } from "react";

import Link from "next/link";
import classNames from "classnames";

export type ButtonLinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  to: string;
  outline?: boolean;
  small?: boolean;
  external?: boolean;
};

export const ButtonLink: FC<ButtonLinkProps> = ({ to, external = false, children, outline, small, ...rest }) => {
  const className = classNames(
    "flex justify-center font-poppins font-medium border-primary border-solid border rounded-md transition-all duration-75 ease-linear focus:brightness-75",
    rest.className,
    {
      "bg-primary text-paper hover:brightness-75 focus:brightness-75": outline,
      "text-primary hover:bg-primary hover:text-paper focus:border-primary focus:bg-primary focus:text-paper": !outline,
      "py-2 px-4 text-sm lg:text-md": small,
      "py-4 px-7 text-md lg:text-lg": !small
    }
  );

  if (external) {
    return (
      <a href={to} className={`${className}`} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={to} className={`${className}`} {...rest}>
      {children}
    </Link>
  );
};

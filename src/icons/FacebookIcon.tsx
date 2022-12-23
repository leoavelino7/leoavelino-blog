import type { FC, SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

export const FacebookIcon: FC<SvgProps> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12.6 4.43344H14.1666V1.78344C13.4081 1.70456 12.6459 1.66562 11.8833 1.66677C9.61663 1.66677 8.06663 3.05011 8.06663 5.58344V7.76677H5.5083V10.7334H8.06663V18.3334H11.1333V10.7334H13.6833L14.0666 7.76677H11.1333V5.87511C11.1333 5.00011 11.3666 4.43344 12.6 4.43344Z"
      fill="currentColor"
    />
  </svg>
);

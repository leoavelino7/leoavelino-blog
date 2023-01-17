type TagsAllowed = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "span";

export type ChipProps = React.HTMLAttributes<HTMLSpanElement> & { Tag?: TagsAllowed };

export const Chip: React.FC<ChipProps> = ({
  children,
  className = "",
  Tag = "span",
  ...rest
}) => (
  <Tag {...rest} className={`bg-primary text-paper font-poppins font-medium py-2 px-4 text-xs rounded-full ${className}`}>
    {children}
  </Tag>
);

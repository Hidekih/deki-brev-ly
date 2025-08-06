interface Props extends React.ComponentProps<"p"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Text({ children, className, size = "md", ...props }: Props) {
  const getStyleBySize = (size: Props["size"]) => {
    switch (size) {
      case "xs":
        return "text-[0.625rem] leading-3.5";
      case "sm":
        return "text-xs leading-4";
      case "md":
        return "text-[0.875rem] leading-5 font-semibold";
      case "lg":
        return "text-lg leading-6 font-bold";
      case "xl":
        return "text-2xl leading-8 font-bold";
      default:
        return "text-[0.875rem] leading-5 font-semibold";
    }
  }

  return (
    <p
      className={`${getStyleBySize(size)} text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
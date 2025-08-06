interface Props extends React.ComponentProps<"button"> {
  children: string;
  variant?: "primary" | "secondary";
}

export function Button({ children, className = "", variant = "primary", ...props }: Props) {
  const getButtonStyleByVariant = (size: Props["variant"]) => {
    switch (size) {
      case "primary":
        return "h-12 bg-blue-base rounded-lg hover:bg-blue-dark";
      case "secondary":
        return "h-8 bg-gray-200 rounded-sm border border-transparent hover:border-blue-base";
      default:
        return "text-[0.875rem] leading-5 font-semibold";
    }
  }

  const getSpanStyleByVariant = (size: Props["variant"]) => {
    switch (size) {
      case "primary":
        return "text-white text-[0.875rem] leading-5 font-semibold";
      case "secondary":
        return "text-xs leading-4";
      default:
        return "text-[0.875rem] leading-5 font-semibold";
    }
  }

  return (
    <button className={`flex items-center justify-center gap-1.5 cursor-pointer px-4 transition-colors py-2 disabled:opacity-50 ${getButtonStyleByVariant(variant)} ${className}`} {...props}>
      <span className={getSpanStyleByVariant(variant)}>{children}</span>
    </button>
  );
}
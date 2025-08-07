interface Props extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function IconButton({ children, className = "", variant = "primary", ...props }: Props) {
  const getButtonStyleByVariant = (size: Props["variant"]) => {
    switch (size) {
      case "primary":
        return "h-12 w-12 bg-blue-base rounded-lg hover:bg-blue-dark";
      case "secondary":
        return "h-8 w-8 bg-gray-200 rounded-sm border border-transparent hover:border-blue-base";
      default:
        return "h-12 w-12 text-[0.875rem]";
    }
  }

  return (
    <button 
      className={`flex items-center justify-center cursor-pointer transition-colors disabled:opacity-50 ${getButtonStyleByVariant(variant)} ${className}`}
      {...props}
    >
      <span className="text-gray-600">{children}</span>
    </button>
  );
}
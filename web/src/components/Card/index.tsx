interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  p?: "md" | "lg";
  size?: "md" | "lg" | "fill";
}

export function Card({ children, className, size = "md", p = "md", ...props }: Props) {
  const getStylesByP = (p: Props["p"]) => {
    switch (p) {
      case "md":
        return "p-8";
      case "lg":
        return "py-16 px-12";
      default:
        return "p-8";
    }
  };
  
  const getStylesBySize = (size: Props["size"]) => {
    switch (size) {
      case "fill":
        return "max-w-full";
      case "md":
        return "max-w-full lg:max-w-[23.75rem]";
      case "lg":
        return "max-w-full lg:max-w-[36.25rem]";
      default:
        return "max-w-full lg:max-w-[23.75rem]";
    }
  };

  return (
    <div 
      className={`rounded-lg shadow-xs bg-gray-100 w-full ${getStylesBySize(size)} ${getStylesByP(p)} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
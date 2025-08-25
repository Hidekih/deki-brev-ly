import { Link as RRLink, type LinkProps as RRLinkProps } from "react-router";

interface Props extends RRLinkProps {
  type?: "primary" | "secondary";
}

export function Link({ className, ...props }: Props) {
  return (
    <RRLink
      className={`text-blue-base ${className ?? ''}`}
      {...props}
    />
  );
}
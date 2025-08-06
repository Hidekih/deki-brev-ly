import { Link as RRLink, type LinkProps as RRLinkProps } from "react-router";

interface Props extends RRLinkProps {
  type?: "primary" | "secondary";
}

export function Link({ ...props }: Props) {
  return (
    <RRLink
      className="text-blue-base"
      {...props}
    />
  );
}
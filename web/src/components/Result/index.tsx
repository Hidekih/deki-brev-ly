import { Text } from "../Text";
import { Title } from "../Title";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  image: React.ReactNode;
  title: string;
}

export function Result({ image, title, children, ...props }: Props) {
  return (
    <div className="flex flex-col gap-6 items-center" {...props}>
      {image}
      
      <Title>{title}</Title>

      <Text className="text-balance text-center">{children}</Text>
    </div>
  );
}

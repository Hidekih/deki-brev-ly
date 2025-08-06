interface Props extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: Props) {
  return (
    <button className="bg-blue-500 text-white rounded-lg px-4 py-2" {...props}>
      {children}
    </button>
  );
}
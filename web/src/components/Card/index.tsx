interface Props {
  children: React.ReactNode;
}

export function Card({ children }: Props) {
  return (
    <div className="rounded-lg shadow-xs bg-gray-100 max-w-[36.25rem] w-full py-16 px-12">
      {children}
    </div>
  );
}
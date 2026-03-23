interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-neutral-200 shadow-sm ${
        hover ? "hover:shadow-md hover:border-neutral-300 transition-all duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

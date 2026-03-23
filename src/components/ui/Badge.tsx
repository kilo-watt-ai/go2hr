type BadgeVariant = "primary" | "secondary" | "success" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-100 text-primary-dark",
  secondary: "bg-amber-100 text-amber-800",
  success: "bg-emerald-100 text-emerald-800",
  neutral: "bg-neutral-100 text-neutral-600",
};

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

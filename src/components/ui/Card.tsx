import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({ children, className, hover = true, glass = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500",
        glass && "glass-morphism cinematic-shadow",
        hover && "hover:border-white/10 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
}

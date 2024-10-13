import { cn } from "../../lib/utils";

interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  blur?: boolean;
  bgImage?: "fundo" | "dashboard";
}

export default function Background({
  children,
  className,
  childClassName,
  blur = false,
  bgImage = "fundo",
}: BackgroundProps) {
  const bgClass = bgImage === "dashboard" ? "bg-dashboard" : "bg-fundo";

  return (
    <div className={cn(`bg-center bg-cover bg-no-repeat`, bgClass, className)}>
      <div
        className={cn(
          `flex items-center backdrop-brightness-50 ${
            blur ? "justify-center backdrop-blur-sm" : ""
          }`,
          childClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

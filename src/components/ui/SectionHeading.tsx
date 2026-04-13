import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  pre?: string;
  title: string;
  highlight?: string;
  after?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  pre, title, highlight, after, subtitle, center = true, className,
}: SectionHeadingProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      {pre && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#2d3393] mb-3">{pre}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#0d1040] leading-tight">
        {title}
        {highlight && <span className="text-[#2d3393]"> {highlight}</span>}
        {after && ` ${after}`}
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

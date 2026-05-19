import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-2 md:gap-3 ${className}`}>
      <p className="font-nexa text-sm font-bold uppercase tracking-wider text-[#5FCBB9] sm:text-xl">
        {label}
      </p>
      <h2 className="font-nexa text-2xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm sm:text-base font-medium">{description}</p>
      ) : null}
    </div>
  );
}

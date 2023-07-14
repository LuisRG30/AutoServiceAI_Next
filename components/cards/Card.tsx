import { cn } from "../../utils/ClassNames";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}

export default function Card({
  children,
  className,
  innerClassName,
  id,
}: CardProps) {
  return (
    <div
      id={id}
      className={cn(
        `dark:bg-gray-800 dark:border-gray-700 rounded-lg bg-white shadow m-1 sm:m-4`,
        className
      )}
    >
      <div className={cn(`px-4 py-5 sm:p-6`, innerClassName)}>{children}</div>
    </div>
  );
}

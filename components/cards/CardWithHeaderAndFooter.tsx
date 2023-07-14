import { cn } from "../../utils/ClassNames"

export interface CardWithHeaderAndFooterProps {
  headerContent: React.ReactNode;
  footerContent: React.ReactNode;
  children: React.ReactNode;
  childrenClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  className?: string;
}
export default function CardWithHeaderAndFooter({
  headerContent,
  footerContent,
  children,
  childrenClassName,
  headerClassName,
  footerClassName,
  className,
}: CardWithHeaderAndFooterProps) {
  return (
    <div
      className={cn(
        `dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow`,
        className
      )}
    >
      <div className={cn(`px-4 py-5 sm:px-6`, headerClassName)}>
        {headerContent}
      </div>
      <div className={cn(`px-4 py-5 sm:p-6`, childrenClassName)}>
        {children}
      </div>
      <div className={cn(`px-4 py-4 sm:px-6`, footerClassName)}>
        {footerContent}
      </div>
    </div>
  );
}

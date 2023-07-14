import { Transition } from "@headlessui/react";
import React from "react";
import { cn } from "../../utils/ClassNames";
import CardWithHeaderAndFooter, {
  CardWithHeaderAndFooterProps,
} from "./CardWithHeaderAndFooter";

interface DirectoryCardProps {
  show: boolean;
}

function DirectoryCard({
  show,
  headerContent,
  footerContent,
  children,
  className,
}: DirectoryCardProps & CardWithHeaderAndFooterProps) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={"h-screen"}
    >
      <CardWithHeaderAndFooter
        headerContent={headerContent}
        footerContent={footerContent}
        children={children}
        childrenClassName={"flex-grow"}
        className={cn("flex flex-col h-screen  ", className)}
      />
    </Transition>
  );
}

export default DirectoryCard;

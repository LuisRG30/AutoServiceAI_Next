import { Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Card } from "@mui/material";

interface ChatFilesDrawerProps {
  children: React.ReactNode;
  showFiles: boolean;
  setShowFiles: (showFiles: boolean) => void;
  className?: string;
}

function ChatFilesDrawer({
  children,
  showFiles,
  className,
  setShowFiles,
}: ChatFilesDrawerProps) {
  return (
    <div className={`w-full bottom-0 fixed p-2 overflow-auto ` + className}>
      <div className={`items-center justify-center flex`}>
        <ChevronUpIcon
          onClick={() => setShowFiles(!showFiles)}
          className={`w-10  ${
            showFiles
              ? "transform rotate-180 "
              : "mb-2 hover:translate-y-[-0.5rem]"
          } transition-all duration-300  p-1 flex items-center justify-center text-gray-500  dark:bg-gray-900 bg-gray-300 rounded-full `}
        />
      </div>

      <Transition
        show={showFiles}
        enter="transform ease-out duration-200 transition"
        enterFrom="translate-y-[50vh]"
        enterTo="translate-y-0"
        leave="transform ease-out duration-200 transition"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-[50vh]"
        className="overflow-y-auto"
      >
        <Card className=" bottom-0  ">
          <div className="bg-gray-400  flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-3 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 max-h-screen dark:bg-gray-800 ">
            {children}
          </div>
        </Card>
      </Transition>
    </div>
  );
}

export default ChatFilesDrawer;

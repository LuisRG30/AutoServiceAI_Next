import { Transition } from "@headlessui/react";

interface ProfileDrawerProps {
    children: React.ReactNode;
    showProfile: boolean;
    setShowProfile: (showProfile: boolean) => void;
    className?: string;
}

function ProfileDrawer({
    children,
    showProfile,
    setShowProfile,
    className
}: ProfileDrawerProps) {
    return (
        <div className={`w-full top-20 fixed p-4 overflow-auto ` + className}>
            <Transition
                show={showProfile}
                enter="transform ease-out duration-200 transition"
                enterFrom="translate-x-0"
                enterTo="translate-x-0"
                leave="transform ease-out duration-200 transition"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-[50vh]"
                className="overflow-x-auto"
            >
                <div className="bg-gray-400  flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-3 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 max-h-screen dark:bg-gray-800 ">
                    {children}
                </div>
            </Transition>
        </div>
    )
}




export default ProfileDrawer;
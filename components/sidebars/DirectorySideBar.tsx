import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  ArchiveBoxIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Card from "../cards/Card";
import TabWithPillsAndNumber from "../tabs/TabWithPillsAndNumber";
import DirectoryUserCard from "../cards/DirectoryUserCard";
import InputWithLeadingIcon from "../inputs/InputWithLeadingIcon";
import ChatDropdown from "../widgets/ChatDropdown";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { UserType, UserInfo } from "../../types";
import { randomBackgroundColor } from "../../utils/RandomBackgroundColor";

import { FocusedConversationType } from "../../types";
import Div100vh from "react-div-100vh";

interface DirectorySideBarProps {
  show: boolean;
  conversationsAssignedToMe: Array<{
    id: string | number;
    user?: UserType;
    name: string;
    assigned_to: number | undefined | null;
    status: string;
    archived: boolean;
    lastMessage?: string;
  }>;
  conversationsNotAssigned: Array<{
    id: string | number;
    user?: UserType;
    name: string;
    assigned_to: number | undefined | null;
    status: string;
    archived: boolean;
    lastMessage?: string;
  }>;
  conversations: Array<{
    id: string | number;
    user?: UserType;
    name: string;
    assigned_to: number | undefined | null;
    status: string;
    archived: boolean;
    lastMessage?: string;
  }>;
  children: React.ReactNode;
  user: number | undefined;
  setShow: (show: boolean) => void;
  tabs: {
    name: string;
    href: string;
    id: number;
  }[];
  setFocusedConversation: (
    focusedConversation: FocusedConversationType
  ) => void;
  focusedConversation: FocusedConversationType;
  userInfo: UserInfo;
  handleAssign: (conversationId: number | string) => Promise<void>;
  handleUnassign: (conversationId: number | string) => Promise<void>;
  handleUpdateConversation: (
    conversationId: number | string,
    status: string
  ) => Promise<void>;
  handleToggleArchive: (conversationId: number | string) => Promise<void>;
  showArchived: boolean;
  setShowArchived: (showArchived: boolean) => void;
  search: string;
  setSearch: any;
  tab: number;
  setTab: (tab: number) => void;
}

export default function DirectorySideBar({
  show,
  conversationsAssignedToMe,
  conversationsNotAssigned,
  focusedConversation,
  conversations,
  children,
  setShow,
  tabs,
  user,
  setFocusedConversation,
  userInfo,
  handleAssign,
  handleUnassign,
  handleUpdateConversation,
  handleToggleArchive,
  showArchived,
  setShowArchived,
  search, 
  setSearch,
  tab,
  setTab,
}: DirectorySideBarProps) {


  const conversationsToShow = () => {
    switch (tab) {
      case 1:
        return conversationsAssignedToMe;
      case 2:
        return conversationsNotAssigned;
      case 3:
        return conversations;
      default:
        return conversationsAssignedToMe;
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-30 lg:hidden"
            onClose={setShow}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setShow(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <Card className="flex justify-center items-center m-4">
                      <InputWithLeadingIcon
                        value={search}
                        setValue={setSearch}
                        placeholder="Search"
                        icon={
                          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        }
                      />
                      <TabWithPillsAndNumber
                        tabs={tabs}
                        activeTab={tab}
                        setActiveTab={setTab}
                      />
                    </Card>
                    <nav className="mt-5 space-y-1">
                      <Card
                        className="m-4"
                        innerClassName={`px-0 py-5 sm:p-0  `}
                      >
                        <ul
                          role="list"
                          className="divide-y divide-gray-200 max-w-2xl"
                        >
                          {conversationsToShow().map((conversation) => {
                            const statuscolorBallClass = () => {
                              switch (conversation.status) {
                                case "active":
                                  return "bg-blue-500 rounded-full w-3 h-3";
                                case "inactive":
                                  return "bg-gray-500 rounded-full w-3 h-3";
                                case "urgent":
                                  return "bg-yellow-500 rounded-full w-3 h-3";
                                case "blocked":
                                  return "bg-red-500 rounded-full w-3 h-3";
                                case "resolved":
                                  return "bg-green-500 rounded-full w-3 h-3";
                                default:
                                  return "bg-gray-500 rounded-full w-3 h-3";
                              }
                            };
                            return (
                              <li
                                key={conversation.name}
                                className={`px-3 flex py-4 truncate items-center 
                                                   ${
                                                     focusedConversation &&
                                                     focusedConversation.id ===
                                                       conversation.id &&
                                                     "bg-gray-100"
                                                   }
                     
                              `}
                              >
                                <div className="h-[40px] w-[40px] rounded-full bg-blue-100 flex items-center justify-center capitalize ">
                                  {conversation.name[0]}
                                </div>
                                <div className="ml-3">
                                  <h1 className="text-base font-medium dark:text-gray-300">
                                    {conversation.name}
                                  </h1>
                                  <h1 className="text-base text-gray-500 truncate">
                                    {conversation.lastMessage}
                                  </h1>
                                  <ChevronDownIcon />
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </Card>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200">
                    <a href="#" className="group block w-full flex-shrink-0">
                      <DirectoryUserCard name={userInfo?.first_name} />
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}

        <div className="flex h-[100vh]">
          <div
            className="hidden lg:inset-y-0 lg:flex lg:flex-col 
          lg:w-96 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            {/* Sidebar component, swap this element with another sidebar if you like */}

            <Card className="flex justify-center items-center">
              <div className={`flex space-x-1 mb-2`}>
                <InputWithLeadingIcon
                  value={search}
                  setValue={setSearch}
                  placeholder="Search"
                  icon={
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                  }
                />
                <button
                  className={`basis-1/12 items-center justify-center flex text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400 transition-all duration-200`}
                  onClick={() => setShowArchived(!showArchived)}
                >
                  {showArchived ? <XMarkIcon /> : <ArchiveBoxIcon />}
                </button>
              </div>

              <TabWithPillsAndNumber
                tabs={tabs}
                activeTab={tab}
                setActiveTab={setTab}
              />
            </Card>

            <Card
              className="h-1 mt-5 flex-1 space-y-1 bg-white flex-grow dark:bg-gray-800 z-1 overflow-y-scroll"
              innerClassName={`px-0 py-5 sm:p-0  `}
            >
              <div>
              <ul role="list" className="divide-y divide-gray-200 max-w-2xl">
                {conversationsToShow().map((conversation) => {
                  const statuscolorBallClass = () => {
                    switch (conversation.status) {
                      case "active":
                        return "bg-blue-500 rounded-full w-3 h-3";
                      case "inactive":
                        return "bg-gray-500 rounded-full w-3 h-3";
                      case "urgent":
                        return "bg-yellow-500 rounded-full w-3 h-3";
                      case "blocked":
                        return "bg-red-500 rounded-full w-3 h-3";
                      case "resolved":
                        return "bg-green-500 rounded-full w-3 h-3";
                      default:
                        return "bg-gray-500 rounded-full w-3 h-3";
                    }
                  };
                  return (
                    <li
                      key={conversation.name}
                      className={`flex py-4 px-4 items-center transition-all duration-all
                     ${
                       focusedConversation &&
                       focusedConversation.id === conversation.id &&
                       "bg-gray-100"
                     }
                     `}
                      onClick={() =>
                        setFocusedConversation({
                          id: conversation.id,
                          name: conversation.name,
                          user: conversation.user,
                          archived: conversation.archived,
                        })
                      }
                    >
                      <div
                        className={`h-10 w-10 rounded-full truncate bg-blue-100 flex items-center justify-center capitalize `}
                      >
                        {conversation.name[0]}
                      </div>
                      <div className="flex justify-between w-full items-center">
                        <div className="ml-3">
                          <h1
                            className={`text-base font-medium text-black dark:text-white
                             ${
                               focusedConversation &&
                               focusedConversation.id === conversation.id &&
                               "text-gray-900 dark:text-gray-900"
                             }
                          `}
                          >
                            {conversation.name}
                          </h1>
                          <h1 className="text-base text-gray-500 truncate">
                            {conversation.lastMessage}
                          </h1>
                        </div>
                        <div className={statuscolorBallClass()}></div>
                        <ChatDropdown
                          conversationId={conversation?.id}
                          assigned_to={conversation?.assigned_to}
                          status={conversation?.status}
                          archived={conversation?.archived}
                          handleAssign={handleAssign}
                          handleUnassign={handleUnassign}
                          handleUpdateConversation={handleUpdateConversation}
                          handleToggleArchive={handleToggleArchive}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              </div>
            </Card>

            <div className=" flex flex-shrink-0 border-t border-gray-200">
              <a href="#" className="group block w-full flex-shrink-0">
                <div className="">
                  <DirectoryUserCard name={userInfo?.first_name} />
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col  h-screen  ">
            <main className="flex-1">
              <div className="h-full">
                <Div100vh className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col h-full">
                  {children}
                </Div100vh>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

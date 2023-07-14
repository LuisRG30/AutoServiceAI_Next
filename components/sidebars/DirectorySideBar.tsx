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
import { IntegrationType, UserType, UserInfo } from "../../types";
import { randomBackgroundColor } from "../../utils/RandomBackgroundColor";

import { FocusedConversationType } from "../../types";
import Div100vh from "react-div-100vh";

interface DirectorySideBarProps {
  show: boolean;
  conversationsAssignedToMe: Array<{
    id: string | number;
    integration?: IntegrationType;
    user?: UserType;
    name: string;
    assigned_to: number | undefined | null;
    status: string;
    autopilot: boolean;
    archived: boolean;
    lastMessage?: string;
  }>;
  conversationsNotAssigned: Array<{
    id: string | number;
    integration?: IntegrationType;
    user?: UserType;
    name: string;
    assigned_to: number | undefined | null;
    status: string;
    autopilot: boolean;
    archived: boolean;
    lastMessage?: string;
  }>;
  conversations: Array<{
    id: string | number;
    integration?: IntegrationType;
    user?: UserType;
    name: string;
    assigned_to: number | undefined | null;
    status: string;
    autopilot: boolean;
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
  handleUpdateAutopilot: (
    conversationId: number | string,
    autopilot: boolean
  ) => Promise<void>
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
  handleUpdateAutopilot,
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

  const renderChannelIcon = (channel: string | undefined) => {
    switch (channel) {
      case "integrated":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          )
      case "whatsapp":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )
      case "telegram":
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          )
      case "web":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        )
      default:
        return <div></div>
    }
  }

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
                        {renderChannelIcon(conversation.integration?.channel)}
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" 
                          checked={conversation.autopilot} 
                          onChange={(e) => {
                            handleUpdateAutopilot(conversation.id, !conversation.autopilot)
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
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

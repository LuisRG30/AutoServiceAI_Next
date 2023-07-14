import { Fragment, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface ChatDropdownProps {
  conversationId: number | string;
  assigned_to: number | undefined | null;
  status: string;
  archived: boolean;
  handleAssign: (conversationId: number | string) => Promise<void>;
  handleUnassign: (conversationId: number | string) => Promise<void>;
  handleUpdateConversation: (
    conversationId: number | string,
    status: string
  ) => Promise<void>;
  handleToggleArchive: (conversationId: number) => Promise<void>;
}

const ChatDropdown = ({
  conversationId,
  assigned_to,
  status,
  archived,
  handleAssign,
  handleUnassign,
  handleUpdateConversation,
  handleToggleArchive,
}: ChatDropdownProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <Menu as="div" className="inline-block text-left">
      <div ref={menuRef}>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      > 
        <Menu.Items 
          className="absolute z-50 mt-2 w-56 top-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    if (assigned_to === null) {
                      handleAssign(conversationId);
                    } else {
                      handleUnassign(conversationId);
                    }
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {assigned_to === null || assigned_to === undefined
                    ? "Asignar"
                    : "Desasignar"}
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    handleUpdateConversation(conversationId, "active");
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full"
                  )}
                >
                  <div className="flex items-center">
                    <div
                      className="
                      flex
                      items-center
                      justify-between
                    "
                    >
                      <div>Activa</div>
                      <div
                        className="
                        rounded-full
                        w-3
                        h-3
                        bg-blue-500
                        ml-2
                      "
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    handleUpdateConversation(conversationId, "inactive");
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full"
                  )}
                >
                  <div className="flex items-center">
                    <div
                      className="
                    flex
                    items-center
                    justify-between
                  "
                    >
                      <div>Inactiva</div>
                      <div
                        className="
                      rounded-full
                      w-3
                      h-3
                      bg-gray-500
                      ml-2
                    "
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    handleUpdateConversation(conversationId, "urgent");
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full"
                  )}
                >
                  <div className="flex items-center">
                    <div
                      className="
                    flex
                    items-center
                    justify-between
                  "
                    >
                      <div>Urgente</div>
                      <div
                        className="
                      rounded-full
                      w-3
                      h-3
                      bg-yellow-500
                      ml-2
                    "
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    handleUpdateConversation(conversationId, "blocked");
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full"
                  )}
                >
                  <div className="flex items-center">
                    <div
                      className="
                    flex
                    items-center
                    justify-between
                  "
                    >
                      <div>Bloqueada</div>
                      <div
                        className="
                      rounded-full
                      w-3
                      h-3
                      bg-red-500
                      ml-2
                    "
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    handleUpdateConversation(conversationId, "resolved");
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full"
                  )}
                >
                  <div className="flex items-center">
                    <div
                      className="
                    flex
                    items-center
                    justify-between
                  "
                    >
                      <div>Resuelta</div>
                      <div
                        className="
                      rounded-full
                      w-3
                      h-3
                      bg-green-500
                      ml-2
                    "
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => handleToggleArchive(conversationId as number)}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {archived ? "Desarchivar" : "Archivar"}
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ChatDropdown;

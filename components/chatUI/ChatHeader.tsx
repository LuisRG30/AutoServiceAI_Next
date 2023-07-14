import { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'

import { cn } from "../../utils/ClassNames";
import { Twirl as Hamburger } from "hamburger-react";

interface ChatHeaderProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  className?: string;
  conversationId?: number | string;
  userName?: string;
  onProfileClick?: () => void
  goToDocuments: () => void
  goToPayments: () => void
  logout: () => void
  // todo: agregar props de links de usuario
}


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const ChatHeader = ({
  open,
  setOpen,
  className,
  userName,
  onProfileClick,
  goToDocuments,
  goToPayments,
  logout,
}: // todo: agregar props de links de usuario

ChatHeaderProps) => {
  return (
    <div
      className={cn(
        "dark:bg-gray-800 bg-gray-200 border justify-between dark:border-gray-700 border-gray-300 z-0 rounded-lg p-4 flex items-center " +
          className
      )}
    >
      <div className={`flex items-center w-full justify-between`}>
        <Menu>
          <div className="lg:invisible">
            <Hamburger
              color="white"
              toggled={open}
              onToggle={(toggled) => setOpen(toggled)}
            />
          </div>
          <Menu.Button>
          <div
            className="hover:bg-blue-900 cursor-pointer flex items-center justify-start  space-x-2 bg-opacity-25 transition-all duration-250 rounded-xl p-2"
          >
            <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center capitalize">
              {userName?.charAt(0)}
            </div>
            <h1
              className={cn(
                "text-sm font-light text-gray-800 dark:text-gray-100"
              )}
            >
              {userName}
            </h1>
          </div>
          </Menu.Button> 
          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
            <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={goToDocuments}
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Documentos
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={goToPayments}
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Pagos
                  </button>
                )}
              </Menu.Item>
              {
                onProfileClick ? (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={onProfileClick}
                          type="submit"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Ver datos de usuario
                        </button>
                      )}
                    </Menu.Item>
                ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          type="submit"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Cerrar sesión
                        </button>
                      )}
                    </Menu.Item>
                )
              }
                
            </div>
          </Menu.Items>
        </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default ChatHeader;

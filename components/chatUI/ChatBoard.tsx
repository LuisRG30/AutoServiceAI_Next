import { useEffect, useRef } from "react";
import { MessageType, PaymentType } from "../../types";
import { cn } from "../../utils/ClassNames";
import NoChats from "../svgs/NoChats";
import MessageBubble from "./MessageBubble";

interface ChatBoardProps {
  className?: string;
  user: number | undefined;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  pay: (payment: PaymentType) => void;
  prompt: string
}
const ChatBoard = ({
  className,
  messages,
  user,
  setMessages,
  pay,
  prompt
}: ChatBoardProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  const ScrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      //     iphone safari fix
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    ScrollToBottom();
  }, [messages]);

  // check if scrollHeight changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      ScrollToBottom();
    });
    if (chatRef.current) {
      observer.observe(chatRef.current, { childList: true, subtree: true });
    }
    return () => {
      observer.disconnect();
    };
  }, [chatRef.current]);
  return (
    <div
      ref={chatRef}
      className={cn(
        "dark:bg-gray-800 bg-gray-200 border dark:border-gray-700 border-gray-300 z-0 rounded-lg p-4 " +
          className
      )}
    >
      {messages?.length === 0 && (
        <div
          className={`text-center items-center  justify-center flex flex-col h-full`}
        >
          <NoChats className={`h-40 w-40 mb-4`} />
          <h1
            className={cn(
              "text-4xl font-light text-gray-800 dark:text-gray-100"
            )}
          >
            Uh oh!
          </h1>
          <p
            className={cn(
              "text-sm font-light text-gray-800 dark:text-gray-100"
            )}
          >
            Todavía no cargan los mensajes.
          </p>
          <h2
            className={cn(
              "text-sm font-light text-gray-800 dark:text-gray-100"
            )}
          >
            {prompt}
          </h2>
        </div>
      )}

      {messages?.map((message, index) => {
        return (
          <MessageBubble
            scrollToBottom={ScrollToBottom}
            key={message.id}
            id={message.id}
            message={message.message}
            from_user={message.from_user}
            isSender={message.from_user.id === user || (message.from_user.profile?.admin || false)}
            conversation={message.conversation}
            document={message.document}
            created_at={message.created_at}
            payment={message.payment}
            read={message.read}
            messages={messages}
            setMessages={setMessages}
            pay={pay}
          />
        );
      })}
    </div>
  );
};

export default ChatBoard;

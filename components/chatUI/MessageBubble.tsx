import { cva } from "class-variance-authority";
import Typed from "react-typed";
import { useEffect, useState } from "react";
import { MessageType, PaymentType } from "../../types";
import DocumentPreview from "./DocumentPreview";
import PaymentPreview from "./PaymentPreview";

interface Props {
  scrollToBottom: () => void;
  isSender: boolean;
  setMessages: (messages: MessageType[]) => void;
  messages: MessageType[];
  pay: (payment: PaymentType) => void;
}
function MessageBubble({
  scrollToBottom,
  message,
  from_user,
  document,
  payment,
  isSender,
  image,
  setMessages,
  messages,
  pay,
}: MessageType & Props) {
  const outerDivClasses = cva(["flex", "items-end"], {
    variants: {
      isSender: {
        true: "justify-end",
      },
    },
  });
  const innerDivClasses = cva([
    "flex",
    "items-end",
    "text-md",
    "max-w-xs",
    "space-x-2",
  ]);

  const spanClasses = cva(
    [
      "px-4",
      "py-2",
      "rounded-lg",
      "inline-block",
      "overflow-hidden",
      "flex",
      "flex-col",
      "text-start",
      "space-y-1",
    ],
    {
      variants: {
        isSender: {
          true: "rounded-br-none  text-white bg-blue-400 dark:bg-blue-500",
          false:
            "rounded-bl-none bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
        },
        payments: {
          true: "px-0 py-0",
        },
      },
    }
  );

  return (
    <div className="chat-message z-10 my-4">
      <div id="outer" className={`${outerDivClasses({ isSender })}`}>
        <div id="inner" className={`${innerDivClasses()}`}>
          {!isSender && (
            <img
              src="https://i.imgur.com/7F4VlXq.png"
              alt="Bot"
              className="w-10 h-10 rounded-full"
            />
          )}

          <span
            className={`${spanClasses({
              isSender,
              payments: payment ? true : false,
            })}`}
          >
            {message}
            {document && (
              <DocumentPreview
                document={document}
                setMessages={setMessages}
                messages={messages}
              />
            )}
            {payment && (
              <PaymentPreview
                payment={payment}
                setMessages={setMessages}
                messages={messages}
                isSender={isSender}
                pay={pay}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;

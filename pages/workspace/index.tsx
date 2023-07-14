import * as React from "react";


import useWebSocket, { ReadyState } from "react-use-websocket";
import { useDropzone } from "react-dropzone";

import {
  ConversationType,
  MessageType,
  DocumentType,
  PaymentType,
  UserType,
} from "../../types";

import AuthContext from "../../context/AuthContext";

import useAxios from "../../utils/useAxios";
import ChatBoard from "../../components/chatUI/ChatBoard";
import MessageBubble from "../../components/chatUI/MessageBubble";
import { ProtectedRoute, AdminRoute } from "../../utils/RouteProtection";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatHeader from "../../components/chatUI/ChatHeader";
import ChatInput from "../../components/chatUI/ChatInput";
import Div100vh from "react-div-100vh";

const Workspace = () => {
  const router = useRouter();
  const { axios, initialized } = useAxios({});
  const { user, ticket, setTicket, logoutUser } = React.useContext(AuthContext);

  const [conversation, setConversation] = React.useState<ConversationType>({
    id: 0,
    name: "",
    online_users: [] as Array<UserType>,
    status: "",
    archived: false,
    autopilot: true
  });

  const [messageInput, setMessageInput] = React.useState("");
  const [messages, setMessages] = React.useState<Array<MessageType>>([]);

  const [nextPage, setNextPage] = React.useState<string | null>(null);
  const [previousPage, setPreviousPage] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [files, setFiles] = React.useState<Array<File>>([]);
  const [documents, setDocuments] = React.useState<Array<DocumentType>>([]);

  const handleGoToPayment = (payment: PaymentType) => {
    router.push(`/payments/${payment.id}`);
  };

  const markMessageAsRead = async (message: MessageType) => {
    if (message.read) return;
    try {
      await axios.post("mark-as-read/", {
        message: message.id,
        });
    } catch (e) {
      console.log(e)
    }
  };

  const onDrop = React.useCallback(
    (acceptedFiles: Array<File>) => {
      acceptedFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("conversation", conversation.id.toString());
        formData.append("staging", "True");
        const response = await axios.post("documents/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setDocuments([...documents, response.data]);
      });
      setFiles([...files, ...acceptedFiles]);
    },
    [documents, files, conversation]
  );
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { readyState, sendJsonMessage } = useWebSocket(
    user
      ? `wss://${process.env.NEXT_PUBLIC_SERVER_URL_ROOT}workspace/?ticket_uuid=${ticket}`
      : null,

    {
      onOpen: () => console.log("opened"),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "chat_message_echo":
            setMessages([...messages, data.message]);
            markMessageAsRead(data.message.id);
            break;
          case "last_messages":
            setMessages([...data.messages.reverse()]);
            data.messages.forEach((message: MessageType) => {
              markMessageAsRead(message);
            });
            break;
          default:
            break;
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  React.useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get("register-chat");
        setTicket(response.data.ticket_uuid);
      } catch (e) {
        console.log(e)
      }
    };
    const getConversation = async () => {
      try {
        const response = await axios.get("my-conversation/");
        setConversation(response.data);
      } catch (e) {
        console.log(e)
      }
    };
    if (initialized) {
      getTicket();
      getConversation();
    }
  }, [axios]);

  const getMessages = async (conversation: number, page: number) => {
    const response = await axios.get("messages/", {
      params: {
        conversation,
        page,
      },
    });
    const data: {
      count: number;
      next: string | null;
      previous: string | null;
      results: Array<MessageType>;
    } = response.data;
    setMessages([...data.results, ...messages]);
    setNextPage(data.next);
    setPreviousPage(data.previous);
  };

  const handleSendMessage = () => {
    if (messageInput.length > 0 || documents.length > 0 || files.length > 0) {
      sendJsonMessage({
        type: "chat_message",
        message: messageInput,
        conversation: conversation.id,
        documents: documents.map((document: any) => document.id),
      });
      setMessageInput("");
      setDocuments([]);
      setFiles([]);
    }
  };

  const handleDocumentUpload = async (files: Array<File>) => {
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("conversation", conversation.id.toString());
      const response = await axios.post("documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });
  };

  const goToDocuments = (conversationId: number | string | undefined) => {
    if (conversationId) {
      router.push(`/documents/?conversation=${conversationId}`);
    } else {
      router.push(`/documents/`);
    }
  }

  const goToPayments = (conversationId: number | string | undefined) => {
    if (conversationId) {
      router.push(`/payments/?conversation=${conversationId}`);
    } else {
      router.push(`/payments/`);
    }
  }

  ProtectedRoute();

  return (
    <Div100vh className={`overflow-hidden relative flex flex-col bg-gray-900`}>
      <ChatHeader 
        open={false}
        setOpen={() => {}}
        conversationId={conversation.id}
        userName={conversation.name}
        goToDocuments={() => goToDocuments(conversation.id)}
        goToPayments={() => goToPayments(conversation.id)}
        logout={logoutUser}
      />
      <ChatBoard
        user={user?.user_id}
        messages={messages}
        className={`overflow-y-auto`}
        setMessages={setMessages}
        pay={handleGoToPayment}
        prompt="Espera un momento"
      />
      <ChatInput
        message={messageInput}
        setMessage={setMessageInput}
        ref={inputRef}
        sendMessage={handleSendMessage}
        documents={documents}
        files={files}
        setFiles={setFiles}
        id={conversation.id}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        handleDocumentUpload={handleDocumentUpload}
      />
    </Div100vh>
  );
};

export default Workspace;

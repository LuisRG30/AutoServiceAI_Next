import * as React from "react";
import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";
import useAxios from "../../utils/useAxios";
import useWebSocket, { ReadyState } from "react-use-websocket";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import { AdminRoute } from "../../utils/RouteProtection";
import {
  ConversationType,
  FocusedConversationType,
  MessageType,
  DocumentType,
  PaymentType
} from "../../types";
import ChatFilesDrawer from "../../components/drawers/ChatFilesDrawer";
import ProfileDrawer from "../../components/drawers/ProfileDrawer";
import DirectorySideBar from "../../components/sidebars/DirectorySideBar";
import ChatBoard from "../../components/chatUI/ChatBoard";
import ChatInput from "../../components/chatUI/ChatInput";
import RequestDocument from "../../components/widgets/RequestDocument";
import RequestPayment from "../../components/widgets/RequestPayment";
import ChatHeader from "../../components/chatUI/ChatHeader";
import ProfileCard from "../../components/cards/ProfileCard";
import Div100vh from "react-div-100vh";
import { useDropzone } from "react-dropzone";
import { resolveTxt } from "dns";

const Workspace: NextPageWithLayout = () => {
  AdminRoute();

  const router = useRouter();

  const chatInputRef = React.useRef<HTMLDivElement>(null);
  const { axios, initialized } = useAxios({});
  const { user, ticket, setTicket, logoutUser } = React.useContext(AuthContext);
  const { userinfo } = React.useContext(UserContext);


  const [conversations, setConversations] = React.useState<
    Array<ConversationType>
  >([]);
  const [focusedConversation, setFocusedConversation] = React.useState<FocusedConversationType>(
      JSON.parse(localStorage.getItem("focusedConversation") || '{ "id": 0, "name": "", "user": 0 }')
    );

  const [search, setSearch] = React.useState("");
  const [showArchived, setShowArchived] = React.useState(
    JSON.parse(localStorage.getItem("focusedConversation") || '{"archived": false}').archived
  );

  const searchedConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase())
  ).sort(
    (a, b) => {
      if (a.last_message && b.last_message) {
        return new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime(
          )
        } else {
          return 0
        }
    }
  );

  const conversationsAssignedToMe = searchedConversations.filter(
    (conversation) => conversation.assigned_to === user?.user_id
  );
  const conversationsNotAssigned = searchedConversations.filter(
    (conversation) => conversation.assigned_to === null
  );

  const [tab, setTab] =React.useState(
    JSON.parse(localStorage.getItem("currentTab") || '1')
  );

  const [showDirectory, setShowDirectory] = React.useState<boolean>(false);
  const [showFiles, setShowFiles] = React.useState<boolean>(false);
  const [showProfile, setShowProfile] = React.useState<boolean>(false);

  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Array<MessageType>>([]);

  const [files, setFiles] = React.useState<Array<File>>([]);
  const [documents, setDocuments] = React.useState<Array<DocumentType>>([]);

  const [page, setPage] = React.useState(1);
  const [hasMoreMessages, setHasMoreMessages] = React.useState(true);

  const [onboardingResponse, setOnboardingResponse] = React.useState<any>({});

  const onDrop = React.useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("conversation", focusedConversation.id.toString());
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
    [files, documents, focusedConversation, axios, initialized]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDocumentUpload = async (files: Array<File>) => {
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("conversation", focusedConversation.id.toString());
      const response = await axios.post("documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });
  };

  const handleGoToPayment = (payment: PaymentType) => {
    router.push(`/payments/${payment.id}`);
  };
    

  const { readyState, sendJsonMessage } = useWebSocket(
    user
      ? `ws://${process.env.NEXT_PUBLIC_SERVER_URL_ROOT}${focusedConversation.name}/?ticket_uuid=${ticket}`
      : null,
    {
      onOpen: () => console.log("opened"),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case "chat_message_echo":
            setMessages([...messages, data.message]);
            break;
          case "last_messages":
            setMessages([...data.messages.reverse()]);
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
    const getConversations = async () => {
      try {
        if (showArchived) {
          const response = await axios.get("archived-conversations");
          setConversations(response.data);
        } else {
          const response = await axios.get("conversations");
          setConversations(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user && initialized) {
      getConversations();
    }
  }, [axios, initialized, showArchived]);

  React.useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get("register-chat");
        setTicket(response.data.ticket_uuid);
      } catch (error) {
        console.log(error);
      }
    };
    const getOnboardingResponse = async () => {
      const response = await axios.get("onboarding-response", {
        params: {
          user: focusedConversation.user?.id,
        },
      });
      setOnboardingResponse(response.data);
    };

    if (user && initialized) {
      getTicket();
      getOnboardingResponse();

      localStorage.setItem("focusedConversation", JSON.stringify(focusedConversation));
      localStorage.setItem("currentTab", JSON.stringify(tab));
    }
  }, [focusedConversation, axios, initialized]);


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
  };

  const handleSendMessage = (
    message: string,
    documents: Array<DocumentType>
  ) => {
    if (message !== "" || documents.length > 0) {
      sendJsonMessage({
        type: "chat_message",
        message: message,
        documents: documents.map((document: any) => document.id),
      });
      setDocuments([]);
      setMessage("");
    }
  };
  const handleRequestDocument = (documentName: string) => {
    sendJsonMessage({
      type: "request_document",
      document: documentName,
    });
  };

  const handleRequestPayment = (
    paymentDescription: string,
    paymentAmount: number
  ) => {
    sendJsonMessage({
      type: "request_payment",
      description: paymentDescription,
      amount: paymentAmount * 100,
    });
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile)
  }

  const handleUpdateConversation = async (
    conversationId: number | string,
    status: string
  ) => {
    try {
      const response = await axios.put(`conversations/${conversationId}/`, {
        status: status,
      });
      setConversations(
        conversations.map((conversation) =>
          conversation.id === conversationId ? response.data : conversation
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleConversationArchiveStatus = async (
    conversationId: number | string
  ) => {
    try {
      const response = await axios.post("archived-conversations/", {
        id: conversationId,
      });
      setConversations(
        conversations.filter(
          (conversation) => conversation.id !== conversationId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignConversation = async (conversationId: number | string) => {
    try {
      const response = await axios.post("assign-conversation/", {
        conversation: conversationId,
      });
      //Update conversation assigned_to property with the id of the admin user
      setConversations(
        conversations.map((conversation) => {
          if (conversation.id === conversationId) {
            return {
              ...conversation,
              assigned_to: user?.user_id,
            };
          } else {
            return conversation;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnassignConversation = async (
    conversationId: number | string
  ) => {
    try {
      const response = await axios.post("unassign-conversation/", {
        conversation: conversationId,
      });
      setConversations(
        conversations.map((conversation) => {
          if (conversation.id === conversationId) {
            return {
              ...conversation,
              assigned_to: null,
            };
          } else {
            return conversation;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
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

  const directoryTabs = [
    { name: `Mías (${conversationsAssignedToMe.length})`, href: "#", id: 1 },
    {
      name: `Sin Asignar (${conversationsNotAssigned.length})`,
      href: "#",
      id: 2,
    },
    { name: `Todas (${searchedConversations.length})`, href: "#", id: 3 },
  ];

  const chatTabs = [
    { name: "Chat", href: "#", id: 1 },
    { name: "Archivos", href: "#", id: 2 },
    { name: "Pagos", href: "#", id: 3 },
  ];

  const widgetsComponents = [
    <RequestDocument
      requestDocument={handleRequestDocument}
      setShow={setShowFiles}
    />,
    <RequestPayment
      requestPayment={handleRequestPayment}
      setShow={setShowFiles}
    />,
  ];

  {
    readyState === ReadyState.CONNECTING && (
      // spinner
      <h1>Loading....</h1>
    );
  }
  return (
    <Div100vh className="overflow-hidden relative dark:bg-gray-900 bg-gray-200">
      <DirectorySideBar
        show={showDirectory}
        conversationsAssignedToMe={conversationsAssignedToMe.map(
          (conversation) => {
            return {
              id: conversation.id,
              user: conversation.user,
              name: conversation.name,
              assigned_to: conversation.assigned_to,
              status: conversation.status,
              archived: conversation.archived,
              lastMessage: conversation.last_message?.message,
            };
          }
        )}
        conversationsNotAssigned={conversationsNotAssigned.map(
          (conversation) => {
            return {
              id: conversation.id,
              user: conversation.user,
              name: conversation.name,
              assigned_to: conversation.assigned_to,
              status: conversation.status,
              archived: conversation.archived,
              lastMessage: conversation.last_message?.message,
            };
          }
        )}
        conversations={searchedConversations.map((conversation) => {
          return {
            id: conversation.id,
            user: conversation.user,
            name: conversation.name,
            assigned_to: conversation.assigned_to,
            status: conversation.status,
            archived: conversation.archived,
            lastMessage: conversation.last_message?.message,
          };
        })}
        user={user?.user_id}
        setShow={setShowDirectory}
        tabs={directoryTabs}
        focusedConversation={focusedConversation}
        setFocusedConversation={setFocusedConversation}
        userInfo={userinfo}
        handleAssign={handleAssignConversation}
        handleUnassign={handleUnassignConversation}
        handleUpdateConversation={handleUpdateConversation}
        handleToggleArchive={toggleConversationArchiveStatus}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
        search={search}
        setSearch={setSearch}
        tab={tab}
        setTab={setTab}
      >
        <Div100vh
          className={` flex flex-col relative p-2 space-y-2 overflow-hidden`}
        >
          <ChatHeader
            open={showDirectory}
            setOpen={setShowDirectory}
            userName={focusedConversation.name}
            onProfileClick={handleProfileClick}
            goToDocuments={() => goToDocuments(focusedConversation.id)}
            goToPayments={() => goToPayments(focusedConversation.id)}
            logout={logoutUser}
          />
          <ChatBoard
            user={user?.user_id}
            messages={messages}
            className={`basis-9/12 overflow-y-auto`}
            setMessages={setMessages}
            pay={handleGoToPayment}
            prompt='¡Selecciona una conversación!'
          />
          <ChatInput
            ref={chatInputRef}
            className={`basis-2/12`}
            message={message}
            setMessage={setMessage}
            sendMessage={handleSendMessage}
            documents={documents}
            files={files}
            setFiles={setFiles}
            id={focusedConversation.id}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            handleDocumentUpload={handleDocumentUpload}
          />
        </Div100vh>
      </DirectorySideBar>
      <ChatFilesDrawer showFiles={showFiles} setShowFiles={setShowFiles}>
        <div className="flex flex-col sm:flex-row items-center justify-evenly space-y-4 sm:space-y-0 sm:space-x-4 overflow-auto">
          {widgetsComponents.map((widget, index) => {
            return (
              <div key={index} className="basis-1/2 w-full">
                {widget}
              </div>
            );
          })}
        </div>
      </ChatFilesDrawer>
      <ProfileDrawer 
        showProfile={showProfile} 
        setShowProfile={setShowProfile}
      >
        <ProfileCard 
          firstName={focusedConversation.user?.first_name} 
          lastName={focusedConversation.user?.last_name} 
          email={focusedConversation.user?.email} 
          setShowProfile={setShowProfile}
        />
      </ProfileDrawer>
    </Div100vh>
  );
};

export default Workspace;

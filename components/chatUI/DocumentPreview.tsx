import {
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { DocumentType, MessageType } from "../../types";
import useAxios from "../../utils/useAxios";
import { URLRemoverForDocuments } from "../../utils/URLRemoverForDocuments";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

interface DocumentPreviewProps {
  document: DocumentType;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
}

const DocumentPreview = ({
  document,
  messages,
  setMessages,
}: DocumentPreviewProps) => {
  // remove blob from file name which is between the last / and the last . and keep the extension of the file
  const fileName = document.file?.substring(
    document.file.lastIndexOf("/") + 1,
    document.file.lastIndexOf(".")
  );

  //  the file extension till it get to ?
  const fileExtension = document.file?.substring(
    document.file.lastIndexOf(".") + 1,
    document.file.lastIndexOf("?")
  );

  const fileNameFull = fileName + "." + fileExtension;

  const {axios, initialized} = useAxios({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  function DownloadFile() {
    if (document.file) {
      window.open(document.file, "_blank");
    }
  }

  function UploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("conversation", document.conversation);
      formData.append("existing", document.id.toString());
      axios
        .post("documents/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res: any) => {
          const messageId = res.data.message;
          setMessages(
            messages.map((message) => {
              if (message.id === messageId) {
                if (message.document) {
                  message.document.file = URLRemoverForDocuments(res.data.file);
                }
              }
              return message;
            })
          );
          document.file = URLRemoverForDocuments(res.data.file);
        });
    }
  }

  return (
    <div>
      {document.file ? (
        <button
          className={`flex items-center  space-x-2 bg-white rounded-md p-2  bg-opacity-50 mb-1 hover:bg-opacity-80 transition-all duration-300`}
          onClick={DownloadFile}
        >
          <DocumentArrowDownIcon className={`w-10 h-10 text-gray-900`} />
          <div
            className={"flex flex-col space-y-[-0.4rem] max-w-[10rem] truncate"}
          >
            <h1 className={`text-gray-700 font-light text-xs `}>
              {document.requirement ? document.requirement : document.name}
            </h1>
          </div>
        </button>
      ) : (
        // Document request
        <button
          onClick={() => {
            inputRef.current?.click();
          }}
          className={`hover:bg-opacity-80 flex items-center  bg-white rounded-md p-2  bg-opacity-50 mb-1 transition-all duration-350`}
        >
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type={"file"}
            onChange={UploadFile}
          />
          <div className={`flex items-center space-x-1`}>
            <DocumentMagnifyingGlassIcon className={`w-7 h-7 text-gray-900`} />
            <div className={"flex flex-col space-y-[-0.4rem] gap-1"}>
              <h1 className={`text-gray-900 font-medium  text-start`}>
                {document.requirement}
              </h1>
              <h1 className={`text-gray-700 font-light text-xs`}>
                Click para subir archivo
              </h1>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default DocumentPreview;

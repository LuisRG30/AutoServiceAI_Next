import {
  DragEventHandler,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ClipboardIcon,
  FaceSmileIcon as FaceSmileIconOutline,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Card from "../cards/Card";
import Dropzone, { useDropzone } from "react-dropzone";
import { DocumentType } from "../../types";
import useAxios from "../../utils/useAxios";
import { cn } from "../../utils/ClassNames";

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIconMini,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (message: string, documents: Array<DocumentType>) => void;
  documents: Array<DocumentType>;
  ref?: any;
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
  className?: string;
  id: number | string;
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
  handleDocumentUpload: (files: Array<File>) => void;
};

export default function ChatInput(props: Props) {
  const { axios, initialized } = useAxios({});
  const [uploaderShown, setUploaderShown] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [selected, setSelected] = useState(moods[5]);
  const [keysPressed, setKeysPressed] = useState({
    shift: false,
    enter: false,
  });
  const [DocumentsPreviews, setDocumentsPreviews] = useState<any[]>();

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === "Shift") {
        setKeysPressed((prev) => ({ ...prev, shift: true }));
      }
      if (key === "Enter") {
        setKeysPressed((prev) => ({ ...prev, enter: true }));
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      if (key === "Shift") {
        setKeysPressed((prev) => ({ ...prev, shift: false }));
      }
      if (key === "Enter") {
        setKeysPressed((prev) => ({ ...prev, enter: false }));
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  const inputRef = useRef(null);
  const enterToSend = keysPressed.enter && !keysPressed.shift;

  const SendMessage = () => {
    props.sendMessage(props.message, props.documents);
    if (props.documents) {
      setDocumentsPreviews([]);
    }
  };

  // check if enter is pressed and shift is not pressed
  useEffect(() => {
    if (enterToSend) {
      if (DocumentsPreviews) {
        setDocumentsPreviews([]);
      }
      SendMessage();
    }
  }, [enterToSend]);

  // check if shift is pressed and enter is pressed with the inputRef not using a useEffect

  useEffect(() => {
    // add the files to the documentsPreview state, and keep the old ones

    if (props.documents) {
      const newDocumentElements = props.documents.map((document) => (
        <h1
          key={document.id}
          className="rounded-full truncate max-w-[8rem] bg-black text-white p-3"
        >
          {document.name}
        </h1>
      ));
      setDocumentsPreviews(newDocumentElements);
    }
  }, [props.documents]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      {...props.getRootProps({
        onClick: (e: any) => e.stopPropagation(),
      })}
      className={cn(
        "flex space-x-2 dark:bg-gray-800 bg-gray-200 border dark:border-gray-700 border-gray-300 z-0 rounded-lg p-4 b"
      )}
    >
      <div className="hidden">
        <input {...props.getInputProps()} />
        <p>Drop files here or click to upload</p>
      </div>
      <div className="relative w-full">
        <textarea
          ref={inputRef}
          className={cn(
            "basis-11/12  dark:bg-gray-800 bg-gray-200 dark:text-gray-200 text-gray-800 dark:border-gray-700 border-gray-300 z-0 rounded-lg p-4 w-full h-full resize-none" +
              "placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" +
              props.className
          )}
          placeholder={
            props.isDragActive ? "Drop the files here ..." : "Type a message"
          }
          value={props.message}
          onChange={(e) => {
            if (enterToSend) return;
            props.setMessage(e.target.value);
          }}
        ></textarea>
        {props.documents && (
          <div className="absolute bottom-2 right-2 flex space-x-2">
            {DocumentsPreviews}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between space-y-1">
        <button
          className={cn(
            "basis-1/12 dark:bg-gray-900 dark:hover:bg-gray-700 bg-gray-300 hover:bg-gray-400 dark:text-gray-200 text-gray-800 dark:border-gray-700 border-gray-300 z-0 rounded-lg p-4 resize-none transition-all duration-350"
          )}
          onClick={() => {
            SendMessage();
          }}
        >
          SEND
        </button>
        <button
          className={cn(
            "basis-1/12 dark:bg-gray-900 dark:hover:bg-gray-700 bg-gray-300 hover:bg-gray-400 dark:text-gray-200 text-gray-800 dark:border-gray-700 border-gray-300 z-0 rounded-lg p-4 flex items-center justify-center resize-none transition-all duration-350"
          )}
          onClick={() => {
            {
              fileInputRef.current && fileInputRef.current.click();
            }
          }}
        >
          <div>
            <input
              type="file"
              style={{
                display: "none",
              }}
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files) {
                  props.handleDocumentUpload(Array.from(e.target.files));
                }
              }}
            />
            <ClipboardIcon className={`w-5`} />
          </div>
        </button>
      </div>
    </div>
  );
}

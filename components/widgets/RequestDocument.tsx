import { useState } from "react";
import WidgetTemplate from "./WidgetTemplate";
import Typed from "react-typed";

interface RequestDocumentProps {
  requestDocument: (documentName: string) => void;
  setShow: (show: boolean) => void;
}

function RequestDocument({ requestDocument, setShow }: RequestDocumentProps) {
  const [concepto, setConcepto] = useState<string>("");

  const handleDocumentRequest = () => {
    if (concepto !== "") {
      requestDocument(concepto);
      setShow(false);
    }
  };
  return (
    <WidgetTemplate label="Solicitar un documento 📑">
      <div className="w-full flex flex-col justify-between h-full">
        <div className="w-full">
          <label
            htmlFor="concepto"
            className="block text-gray-700 text-xs translate-y-[0.3rem]  mb-2 dark:text-gray-300"
          >
            Concepto
          </label>
          <input
            type="text"
            id="concepto"
            placeholder="Ej: Factura 123"
            className="w-full border border-gray-300 rounded-md p-2 dark:border-gray-900"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
          />
        </div>

        <button
          onClick={() => handleDocumentRequest()}
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md p-2 mt-2 transition-all duration-250"
        >
          Solicitar
        </button>
      </div>
    </WidgetTemplate>
  );
}

export default RequestDocument;

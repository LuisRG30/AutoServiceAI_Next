import { useState } from "react";
import MoneyInput from "../inputs/MoneyInput";
import WidgetTemplate from "./WidgetTemplate";
import { unknown } from "zod";

interface RequestPaymentProps {
  requestPayment: (paymentDescription: string, paymentAmount: number) => void;
  setShow: (show: boolean) => void;
}

function RequestPayment({ requestPayment, setShow }: RequestPaymentProps) {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const handleSendPayment = () => {
    if (amount !== 0 && description !== "") {
      requestPayment(description, amount);
      setShow(false);
    }
  };
  return (
    <WidgetTemplate label="Solicitar un pago 💵">
      <div className="flex flex-col items-center w-full h-full justify-between">
        <div className="w-full">
          <MoneyInput
            min={1}
            setValue={setAmount}
            placeholder="Ingresa la cantidad a solicitar"
            label="Cantidad"
          />
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
              className="w-full border border-gray-300 rounded-md p-2 dark:border-gray-700 "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => handleSendPayment()}
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-md p-2 mt-2 transition-all duration-250"
        >
          Solicitar
        </button>
      </div>
    </WidgetTemplate>
  );
}

export default RequestPayment;

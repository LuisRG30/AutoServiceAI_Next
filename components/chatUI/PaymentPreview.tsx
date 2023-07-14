import { MessageType, PaymentType } from "../../types";
import AmountDisplay from "../displays/AmountDisplay";
import StripeLogo from "../logos/StripeLogo";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Check from "@mui/icons-material/Check";

interface PaymentPreviewProps {
  payment: PaymentType;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
  isSender: boolean;
  pay: (payment: PaymentType) => void;
}

const PaymentPreview = ({
  payment,
  messages,
  setMessages,
  isSender,
  pay,
}: PaymentPreviewProps) => {

  return (
    <div>
      {payment.paid ? (
        <div className={`relative`}>
          <StripeLogo className={`w-8 absolute top-1 left-2 opacity-50`} />
          <div
            className={`flex items-center  flex-col bg-[#6772E5]  p-5 transition-all duration-300`}
          >
            <div className={`flex space-x-1 items-center mt-4`}>
              <AmountDisplay amount={payment.amount_cents} />
              <h1>Pagados</h1>
            </div>
            <h1 className={`text-gray-300 text-xs italic`}>
              ({payment.description})
            </h1>
            <div className={`border rounded-full p-2 mt-4`}>
              <Check />
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative`}>
          <StripeLogo className={`w-8 absolute top-1 left-2 opacity-50`} />
          <div
            className={`flex items-center  flex-col bg-[#6772E5]  p-5 transition-all duration-300`}
          >
            <div className={`flex space-x-1 items-center mt-4`}>
              <h1>
                <AmountDisplay
                  amount={payment.amount_cents}
                  className={`underline-offset-2 font-semibold`}
                />
              </h1>
              <h1>Solicitados</h1>
            </div>
            <h1 className={`text-gray-300 text-xs italic`}>
              ({payment.description})
            </h1>
            {isSender ? (
              <div
                className={`mt-5 text-center space-x-2 bg-white rounded-md w-full px-2 py-1 bg-opacity-20 mb-1`}
              >
                Esperando pago
              </div>
            ) : (
              <button className={`mt-5 w-full `} onClick={() => pay(payment)}>
                <div
                  className={`
                space-x-2 bg-white rounded-md w-full px-2 py-1 bg-opacity-20 mb-1 hover:bg-opacity-40 transition-all duration-300
               `}
                >
                  <h1>Pagar</h1>
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPreview;

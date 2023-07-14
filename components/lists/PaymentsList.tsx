import { useRouter } from "next/router";
import { PaymentType } from "../../types";
import Check from "@mui/icons-material/Check";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface PaymentsListProps {
  payments: PaymentType[];
}

export default function PaymentsList({ payments }: PaymentsListProps) {
  const router = useRouter();

  return (
    <div className={`w-full`}>
      {payments.map((payment) => (
        <div className={`flex my-3`}>
          <div
            className={`rounded-l-md border-l border-y basis-1/12 flex items-center justify-center relative`}
          >
            <p className={`absolute top-1 left-1 text-gray-400 text-[.7rem]`}>
              No.{payment.id}
            </p>
            {payment.paid ? (
              <div className={`flex flex-col items-center justify-center my-5`}>
                <Check className={`text-green-500`} />
                <h1 className={`text-xs font-light`}>Pagado</h1>
              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center my-6`}>
                <XMarkIcon className={`text-red-500 w-6`} />
                <h1 className={`text-xs font-light`}>Pendiente</h1>
              </div>
            )}
          </div>

          <div
            key={payment.description}
            className={` border basis-10/12 p-5 w-full flex items-center justify-between    relative`}
          >
            <div>
              <p className={`text-xl capitalize text-gray-900`}>
                {payment.description}
              </p>
              <p className={`text-gray-400`}>${payment.amount_cents / 100}</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/payments/${payment.id}`)}
            className={`
              rounded-r-md border-r border-y basis-1/12 flex items-center justify-center relative hover:bg-gray-100 transition-all duration-250 px-3
            `}
          >
            Ver
          </button>
        </div>
      ))}
    </div>
  );
}

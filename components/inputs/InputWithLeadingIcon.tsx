import { EnvelopeIcon } from "@heroicons/react/20/solid";

interface InputWithLeadingIconProps {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  icon?: React.ReactNode;
  id?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputWithLeadingIcon({
  label,
  placeholder,
  type,
  value,
  setValue,
  name,
  id,
  className,
  icon,
  labelClassName,
  inputClassName,
}: InputWithLeadingIconProps) {
  return (
    <div className={`w-full basis-11/12`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 text-white bg-gray-900 focus:ring-indigo-500 sm:text-sm p-2 my-2"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

interface IMoneyInput {
  setValue: (value: number) => void;
  value?: number;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
}

const MoneyInput = ({
  setValue,
  value,
  placeholder,
  label,
  error,
  disabled,
  required,
  className,
  name,
  id,
  type,
  min,
  max,
  step,
  currency = "MXN",
}: IMoneyInput) => {
  return (
    <div className={"mt-1 " + className}>
      {label && (
        <label
          htmlFor={id}
          className="block  dark:text-gray-300 text-gray-700 text-xs translate-y-[0.3rem]  mb-2"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm ">$</span>
        </div>
        <input
          type="number"
          name={name}
          id={id}
          className={`${
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:outline-none focus:ring-orangelizza-default focus:border-orangelizza-default"
          } block w-full pl-7 pr-12 sm:text-sm border rounded-md`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{currency}</span>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default MoneyInput;

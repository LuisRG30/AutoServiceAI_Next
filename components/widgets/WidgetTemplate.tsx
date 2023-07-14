interface WidgetTemplateProps {
  children: React.ReactNode;
  label: string;
}

function WidgetTemplate({ children, label }: WidgetTemplateProps) {
  return (
    <div>
      <div className="rounded-t-md border-x border-t flex items-center justify-center dark:border-gray-600">
        <h1 className="bg-blue-300 w-max px-4 py-2 rounded-3xl translate-y-3">
          {label}
        </h1>
      </div>
      <div className="p-4 flex w-full border-b border-x rounded-b-md h-[15rem] items-center  dark:border-gray-600">
        {children}
      </div>
    </div>
  );
}

export default WidgetTemplate;

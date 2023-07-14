interface TabWithPillsAndNumberProps {
  tabs: Array<{ name: string; href: string; id: number }>;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabWithPillsAndNumber({
  tabs,
  activeTab,
  setActiveTab,
}: TabWithPillsAndNumberProps) {
  return (
    <div>
      <div className="block lg:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden lg:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={() => setActiveTab(tab.id)}
              className={classNames(
                tab.id === activeTab
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-base rounded-md transition-all duration-350 text-center truncate"
              )}
              aria-current={tab.id === activeTab ? "page" : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

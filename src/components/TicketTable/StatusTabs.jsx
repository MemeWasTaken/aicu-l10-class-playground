import { statiCount } from "../../data/mockTickets";

const tabs = [
  { key: "tutti", label: "Tutti" },
  { key: "aperti", label: "Aperti" },
  { key: "in_attesa", label: "In attesa cliente" },
  { key: "risolti", label: "Risolti" },
  { key: "chiusi", label: "Chiusi" },
];

export default function StatusTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-1 border-b border-dark-border">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.key
              ? "text-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.key
                ? "bg-purple-500/20 text-purple-400"
                : "bg-dark-hover text-gray-500"
            }`}
          >
            {statiCount[tab.key]}
          </span>
          {activeTab === tab.key && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
          )}
        </button>
      ))}
    </div>
  );
}

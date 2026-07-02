import { useEffect } from "react";

export default function StatusToast({ type, message, ticketId, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const configs = {
    success: {
      bg: "bg-green-500/10 border-green-500/30",
      icon: (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Ticket salvato con successo!",
      action: "Visualizza ticket →",
    },
    error: {
      bg: "bg-red-500/10 border-red-500/30",
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Si è verificato un errore",
      action: "Riprova",
    },
    loading: {
      bg: "bg-blue-500/10 border-blue-500/30",
      icon: (
        <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ),
      title: "Caricamento in corso...",
      action: null,
    },
  };

  const config = configs[type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${config.bg}`}>
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white m-0">{config.title}</p>
        {message && <p className="text-sm text-gray-400 m-0 mt-1">{message}</p>}
        {ticketId && (
          <p className="text-sm text-gray-400 m-0 mt-1">
            Il ticket <span className="text-purple-400">#{ticketId}</span> è stato creato correttamente.
          </p>
        )}
        {config.action && (
          <button className="text-sm text-purple-400 hover:text-purple-300 mt-2 p-0 bg-transparent border-none cursor-pointer">
            {config.action}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-white p-0 bg-transparent border-none cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

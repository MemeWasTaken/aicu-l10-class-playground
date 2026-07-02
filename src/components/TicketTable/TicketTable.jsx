import { statusLabels, statusColors, prioritaColors } from "../../data/mockTickets";

const canaleIcons = {
  email: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  telefono: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  chat: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

export default function TicketTable({ tickets, selectedIds, onSelect, onSelectAll, sortField, sortDir, onSort }) {
  const columns = [
    { key: "id", label: "ID" },
    { key: "titolo", label: "Titolo" },
    { key: "cliente", label: "Cliente" },
    { key: "priorita", label: "Priorità" },
    { key: "canale", label: "Canale" },
    { key: "stato", label: "Stato" },
    { key: "ultimoAggiornamento", label: "Ultimo aggiornamento" },
  ];

  const allSelected = tickets.length > 0 && selectedIds.length === tickets.length;

  const SortIcon = ({ field }) => {
    const isActive = sortField === field;
    return (
      <svg
        className={`w-3 h-3 ml-1 ${isActive ? "text-purple-400" : "text-gray-500"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            isActive && sortDir === "asc"
              ? "M5 15l7-7 7 7"
              : "M19 9l-7 7-7-7"
          }
        />
      </svg>
    );
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-dark-border">
          <th className="w-10 px-3 py-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="w-4 h-4 rounded border-dark-border bg-dark-bg text-purple-600 focus:ring-purple-500"
            />
          </th>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
              onClick={() => onSort(col.key)}
            >
              <div className="flex items-center">
                {col.label}
                <SortIcon field={col.key} />
              </div>
            </th>
          ))}
          <th className="w-10 px-3 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            className={`border-b border-dark-border hover:bg-dark-hover transition-colors ${
              selectedIds.includes(ticket.id) ? "bg-purple-500/10" : ""
            }`}
          >
            <td className="px-3 py-3">
              <input
                type="checkbox"
                checked={selectedIds.includes(ticket.id)}
                onChange={(e) => onSelect(ticket.id, e.target.checked)}
                className="w-4 h-4 rounded border-dark-border bg-dark-bg text-purple-600 focus:ring-purple-500"
              />
            </td>
            <td className="px-3 py-3 text-sm text-purple-400 font-medium">
              #{ticket.id}
            </td>
            <td className="px-3 py-3 text-sm text-white">{ticket.titolo}</td>
            <td className="px-3 py-3 text-sm text-gray-300">{ticket.cliente}</td>
            <td className="px-3 py-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    prioritaColors[ticket.priorita]
                  }`}
                ></span>
                <span className="text-sm text-gray-300">{ticket.priorita}</span>
              </div>
            </td>
            <td className="px-3 py-3">
              <div className="flex items-center gap-1 text-gray-400">
                {canaleIcons[ticket.canale]}
                <span className="text-sm">{ticket.canale}</span>
              </div>
            </td>
            <td className="px-3 py-3">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  statusColors[ticket.stato]
                }`}
              >
                {statusLabels[ticket.stato]}
              </span>
            </td>
            <td className="px-3 py-3 text-sm text-gray-400">
              {ticket.ultimoAggiornamento}
            </td>
            <td className="px-3 py-3">
              <button className="text-gray-500 hover:text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

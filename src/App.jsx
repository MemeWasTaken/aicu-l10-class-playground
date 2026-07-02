import { useState, useMemo } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import TicketForm from "./components/TicketForm/TicketForm";
import TicketTable from "./components/TicketTable/TicketTable";
import StatusTabs from "./components/TicketTable/StatusTabs";
import Pagination from "./components/TicketTable/Pagination";
import StatusToast from "./components/UI/StatusToast";
import EmptyState from "./components/UI/EmptyState";
import ErrorState from "./components/UI/ErrorState";
import LoadingState from "./components/UI/LoadingState";
import { mockTickets } from "./data/mockTickets";

const tabToStatus = {
  tutti: null,
  aperti: "aperto",
  in_attesa: "in_attesa",
  risolti: "risolto",
  chiusi: "chiuso",
  in_lavorazione: "in_lavorazione",
};

export default function App() {
  const [tickets, setTickets] = useState(mockTickets);
  const [activeTab, setActiveTab] = useState("tutti");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("ultimoAggiornamento");
  const [sortDir, setSortDir] = useState("desc");
  const [toast, setToast] = useState(null);
  const [uiState, setUiState] = useState("normal");
  const [viewMode, setViewMode] = useState("list");

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (activeTab !== "tutti") {
      const status = tabToStatus[activeTab];
      if (status) {
        result = result.filter((t) => t.stato === status);
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.titolo.toLowerCase().includes(q) ||
          t.cliente.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "id") {
        aVal = parseInt(a.id.replace("TCK-", ""));
        bVal = parseInt(b.id.replace("TCK-", ""));
      }
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [tickets, activeTab, searchQuery, sortField, sortDir]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const handleSelect = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedTickets.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleNewTicket = (ticket) => {
    setTickets((prev) => [ticket, ...prev]);
    setToast({
      type: "success",
      ticketId: ticket.id,
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  return (
    <div className="flex h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="flex gap-6">
            <div className="w-[380px] flex-shrink-0">
              <TicketForm onSubmit={handleNewTicket} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="bg-dark-card rounded-xl border border-dark-border">
                <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-white m-0">
                      Elenco ticket
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="Cerca ticket per id, titolo o cliente..."
                        className="w-64 px-3 py-1.5 pl-8 bg-dark-bg border border-dark-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <svg
                        className="w-4 h-4 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors relative">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      Filtri
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-[10px] text-white flex items-center justify-center">
                        2
                      </span>
                    </button>

                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-400">Ordina:</span>
                      <select className="px-2 py-1 bg-dark-bg border border-dark-border rounded text-sm text-white focus:outline-none">
                        <option>Più recenti</option>
                        <option>Più vecchi</option>
                        <option>Priorità alta</option>
                        <option>Alfabetico</option>
                      </select>
                    </div>

                    <div className="flex items-center border border-dark-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 ${
                          viewMode === "list"
                            ? "bg-purple-600 text-white"
                            : "bg-dark-bg text-gray-400 hover:text-white"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 ${
                          viewMode === "grid"
                            ? "bg-purple-600 text-white"
                            : "bg-dark-bg text-gray-400 hover:text-white"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <StatusTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />

                {uiState === "loading" ? (
                  <LoadingState />
                ) : uiState === "error" ? (
                  <ErrorState onRetry={() => setUiState("normal")} />
                ) : paginatedTickets.length === 0 ? (
                  <EmptyState />
                ) : (
                  <TicketTable
                    tickets={paginatedTickets}
                    selectedIds={selectedIds}
                    onSelect={handleSelect}
                    onSelectAll={handleSelectAll}
                    sortField={sortField}
                    sortDir={sortDir}
                    onSort={handleSort}
                  />
                )}

                {paginatedTickets.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={filteredTickets.length}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={(val) => {
                      setItemsPerPage(val);
                      setCurrentPage(1);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 w-96 z-50">
          <StatusToast
            type={toast.type}
            ticketId={toast.ticketId}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}

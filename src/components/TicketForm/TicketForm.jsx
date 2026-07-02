import { useState } from "react";
import { clienti } from "../../data/mockTickets";

export default function TicketForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    titolo: "",
    cliente: "",
    priorita: "normale",
    canale: "email",
    descrizione: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.titolo.trim()) newErrors.titolo = "Il titolo è obbligatorio";
    if (!formData.cliente) newErrors.cliente = "Seleziona un cliente";
    if (!formData.descrizione.trim())
      newErrors.descrizione = "La descrizione è obbligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        id: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
        stato: "aperto",
        ultimoAggiornamento: new Date().toLocaleDateString("it-IT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) + " " + new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setFormData({
        titolo: "",
        cliente: "",
        priorita: "normale",
        canale: "email",
        descrizione: "",
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-dark-card rounded-xl p-5 border border-dark-border">
      <div className="flex items-center justify-between mb-5">
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
          <h2 className="text-lg font-semibold text-white m-0">Nuovo ticket</h2>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-dark-hover text-gray-400">
          Bozza locale
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Titolo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.titolo}
            onChange={(e) => handleChange("titolo", e.target.value)}
            placeholder="Es. Impossibile accedere al portale clienti"
            className={`w-full px-3 py-2 bg-dark-bg border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.titolo ? "border-red-500" : "border-dark-border"
            }`}
          />
          {errors.titolo && (
            <p className="text-red-500 text-xs mt-1">{errors.titolo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Cliente <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.cliente}
            onChange={(e) => handleChange("cliente", e.target.value)}
            className={`w-full px-3 py-2 bg-dark-bg border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.cliente ? "border-red-500" : "border-dark-border"
            }`}
          >
            <option value="">Cerca o seleziona un cliente...</option>
            {clienti.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.cliente && (
            <p className="text-red-500 text-xs mt-1">{errors.cliente}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Priorità <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[
              { value: "bassa", label: "bassa", color: "bg-green-500" },
              { value: "normale", label: "normale", color: "bg-yellow-500" },
              { value: "alta", label: "alta", color: "bg-red-500" },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => handleChange("priorita", p.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.priorita === p.value
                    ? "border-purple-500 bg-purple-500/20 text-white"
                    : "border-dark-border bg-dark-bg text-gray-400 hover:border-gray-500"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${p.color}`}></span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Canale richiesta <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[
              {
                value: "email",
                label: "email",
                icon: (
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                value: "telefono",
                label: "telefono",
                icon: (
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                ),
              },
              {
                value: "chat",
                label: "chat",
                icon: (
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                ),
              },
            ].map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => handleChange("canale", c.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.canale === c.value
                    ? "border-purple-500 bg-purple-500/20 text-white"
                    : "border-dark-border bg-dark-bg text-gray-400 hover:border-gray-500"
                }`}
              >
                {c.icon}
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Descrizione <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              value={formData.descrizione}
              onChange={(e) => handleChange("descrizione", e.target.value)}
              placeholder="Descrivi in dettaglio la richiesta del cliente..."
              rows={4}
              className={`w-full px-3 py-2 bg-dark-bg border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                errors.descrizione ? "border-red-500" : "border-dark-border"
              }`}
            />
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-300"
                  title="Allega file"
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
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-300"
                  title="Menziona"
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
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-300"
                  title="Emoji"
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-300"
                  title="Snippet"
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-xs text-gray-500">
                {formData.descrizione.length}/2000
              </span>
            </div>
          </div>
          {errors.descrizione && (
            <p className="text-red-500 text-xs mt-1">{errors.descrizione}</p>
          )}
        </div>

        <div className="p-3 bg-dark-bg rounded-lg border border-dark-border">
          <p className="text-xs text-purple-400 font-medium mb-1">
            Campo calcolato dal server (futuro)
          </p>
          <p className="text-xs text-gray-500">
            Questo campo verrà popolato automaticamente dal server in futuro.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Salva ticket
          </button>
          <button
            type="button"
            className="px-3 py-3 bg-dark-bg border border-dark-border rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          I dati sono salvati localmente fino all'invio.
        </p>
      </form>
    </div>
  );
}

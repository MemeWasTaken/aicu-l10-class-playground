export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-dark-border bg-[#1a1b23]">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white m-0">
          Dashboard ticket
        </h1>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
            GR
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-400 m-0">Operatore</p>
            <p className="text-sm font-medium text-white m-0">Giulia Rinaldi</p>
          </div>
        </div>

        <div className="text-left">
          <p className="text-xs text-gray-400 m-0">Ruolo</p>
          <p className="text-sm text-white m-0">Operatore</p>
        </div>

        <div className="text-left">
          <p className="text-xs text-gray-400 m-0">Team</p>
          <p className="text-sm text-white m-0">Supporto Tecnico</p>
        </div>

        <div className="flex items-center gap-2 text-left">
          <div>
            <p className="text-xs text-gray-400 m-0">Turno</p>
            <p className="text-sm text-white m-0">08:00 - 16:00</p>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}

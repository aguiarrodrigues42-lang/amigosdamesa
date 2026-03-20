"use client"

import { useState } from "react"

const CONTACTS = [
  { name: "Suporte Milena", phone: "5548988704468" },
  { name: "Suporte Talita", phone: "5511988071345" },
]

const MESSAGE = encodeURIComponent("Olá! Preciso de suporte na Amigos da Mesa.")

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 shrink-0"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.113 1.524 5.843L.057 23.547a.5.5 0 0 0 .598.641l5.939-1.556A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.374l-.36-.214-3.733.979.994-3.639-.235-.374A9.9 9.9 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1c5.468 0 9.9 4.433 9.9 9.9 0 5.468-4.432 9.9-9.9 9.9z" />
    </svg>
  )
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Popup com os dois contatos */}
      {open && (
        <div className="bg-[#1a1a1a] border border-[#f97316]/30 rounded-2xl shadow-2xl overflow-hidden w-56 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="bg-[#f97316] px-4 py-3">
            <p className="text-white font-black text-sm uppercase tracking-wide">Fale com o suporte</p>
          </div>

          {/* Contatos */}
          <div className="p-2 flex flex-col gap-1">
            {CONTACTS.map((contact) => (
              <a
                key={contact.phone}
                href={`https://wa.me/${contact.phone}?text=${MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#f97316]/10 transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366]/25 transition-colors">
                  <WhatsAppIcon />
                </span>
                <span className="text-white text-sm font-semibold leading-tight">{contact.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir suporte via WhatsApp"
        aria-expanded={open}
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon />
        Suporte
      </button>
    </div>
  )
}

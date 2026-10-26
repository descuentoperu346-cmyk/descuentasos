import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BankAppId } from '../utils/paymentLogic';

interface LandingScreenProps {
  onSelectApp: (app: BankAppId) => void;
}

const BANK_OPTIONS: { id: BankAppId; label: string; icon: string }[] = [
  { id: 'bcp', label: 'BCP', icon: '/assets/iconos/bcp.png' },
  { id: 'interbank', label: 'Interbank', icon: '/assets/iconos/interbank.png' },
  { id: 'sip', label: 'Sip', icon: '/assets/iconos/sip.jpeg' },
];

export function LandingScreen({ onSelectApp }: LandingScreenProps) {
  return (
    <main className="min-h-screen w-full bg-[#030B08] flex flex-col items-center justify-center px-5 py-8">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        <img
          src="/assets/logo-descuentos-peru.png"
          alt="Descuentos Perú"
          className="w-[250px] h-[250px] object-contain drop-shadow-[0_0_28px_rgba(16,255,140,0.35)]"
        />

        <h1 className="mt-5 text-white text-[20px] font-bold tracking-tight">
          Selecciona una banca
        </h1>
        <p className="mt-1 text-white/55 text-[13px]">Elige la app que quieres abrir</p>

        <div className="mt-6 w-full flex flex-col gap-3">
          {BANK_OPTIONS.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => onSelectApp(bank.id)}
              aria-label={`Abrir ${bank.label}`}
              className="w-full bg-white rounded-2xl pl-4 pr-5 py-3 flex items-center justify-between border-2 border-transparent hover:border-[#19E07F] active:scale-[0.98] transition"
            >
              <span className="flex items-center gap-4">
                <img
                  src={bank.icon}
                  alt=""
                  className="w-14 h-14 rounded-[14px] object-cover shrink-0"
                />
                <span className="text-[#0F172A] text-[17px] font-semibold">{bank.label}</span>
              </span>
              <ChevronRight size={20} className="text-[#0F172A]/40 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

import React, { useState } from 'react';
import {
  Bell,
  CircleHelp,
  Eye,
  EyeOff,
  Pencil,
  ChevronRight,
  X,
  Send,
  QrCode,
  Droplet,
  ArrowLeftRight,
  Home,
  ShoppingCart,
  Settings,
} from 'lucide-react';
import { BcpLogo, BcpAhorroEmblem } from './BrandLogos';
import { PaymentReceipt, formatAmountNumber } from '../utils/paymentLogic';

interface BcpHomeProps {
  userName: string;
  hideBalances: boolean;
  savingsBalance: number;
  creditConsumed: number;
  onToggleBalances: () => void;
  onStartPayment: (presetDestination?: string) => void;
  onOpenConfirmation: () => void;
  onGoHome: () => void;
}

const QUICK_ACTIONS: {
  lines: [string, string];
  icon: React.ReactNode;
  destination: string;
}[] = [
  {
    lines: ['Transferir', 'dinero'],
    icon: <ArrowLeftRight className="w-[22px] h-[22px] stroke-[2]" />,
    destination: 'BCP',
  },
  {
    lines: ['Pagar', 'servicios'],
    icon: <Droplet className="w-[22px] h-[22px] stroke-[2]" />,
    destination: 'YAPE',
  },
  {
    lines: ['Yapear a', 'celular'],
    icon: <Send className="w-[22px] h-[22px] stroke-[2] -rotate-12" />,
    destination: 'YAPE',
  },
  {
    lines: ['Pagar', 'con QR'],
    icon: <QrCode className="w-[22px] h-[22px] stroke-[2]" />,
    destination: 'YAPE',
  },
];

const HIGHLIGHTS: {
  title: string;
  subtitle: string;
  isNew: boolean;
  iconBg: string;
  icon: React.ReactNode;
}[] = [
  {
    title: 'Cambia soles y dólares',
    subtitle: '¡Con el mejor tipo de cambio!',
    isNew: false,
    iconBg: '#BCEBFF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="12" height="8" rx="1.5" fill="#10B981" />
        <rect x="7" y="4" width="12" height="8" rx="1.5" fill="#059669" />
        <path d="M5 17C7 15 12 15 15 17L12 20H5V17Z" fill="#FDBA74" />
      </svg>
    ),
  },
  {
    title: 'Descubre Qore',
    subtitle: 'Tu nueva zona de beneficios',
    isNew: true,
    iconBg: '#FFFFFF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="#3B5BDB" strokeWidth="2" />
        <circle cx="12" cy="12" r="2.4" fill="#3B5BDB" />
      </svg>
    ),
  },
  {
    title: 'Ahorra con Warda',
    subtitle: 'La alcancía virtual del BCP',
    isNew: false,
    iconBg: '#8B75FF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="7" r="2.5" fill="#FACC15" />
        <circle cx="15" cy="10" r="2" fill="#FDE047" />
        <path d="M6 16C8 14 13 14 17 16L14 19H6V16Z" fill="#FDBA74" />
      </svg>
    ),
  },
];

const HIGHLIGHT_CARD_WIDTH = 0.46;
const HIGHLIGHT_GAP_PX = 12;

export function BcpHomeScreen({
  userName,
  hideBalances,
  savingsBalance,
  onToggleBalances,
  onStartPayment,
  onOpenConfirmation,
  onGoHome,
}: BcpHomeProps) {
  const [showTokenBanner, setShowTokenBanner] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const handleHighlightsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    const step = clientWidth * HIGHLIGHT_CARD_WIDTH + HIGHLIGHT_GAP_PX;
    setHighlightIndex(Math.min(HIGHLIGHTS.length - 1, Math.round(scrollLeft / step)));
  };

  return (
    <div
      className="w-full h-full min-h-[760px] bg-[#F7F8FA] flex flex-col justify-between select-none overflow-hidden font-bcp"
      data-testid="bcp-home-screen"
    >
      <div>
        {/* Blue header */}
        <div className="bg-[#1F449E] text-white px-5 pt-2.5 pb-8">
{/* Logo, help & bell */}
          <div className="flex items-center justify-between mb-4">
            <img
              src="/assets/iconos/ui/bcp-logo-blanco.png"
              alt="BCP"
              className="h-[20px] w-auto object-contain"
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Ayuda BCP"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <CircleHelp className="w-[22px] h-[22px] fill-white text-[#1F449E]" />
              </button>
              <button
                type="button"
                onClick={onOpenConfirmation}
                aria-label="Notificaciones BCP"
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5 fill-white text-white" />
                <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#FF4D4F] border border-[#1F449E]" />
              </button>
            </div>
          </div>

          {/* Greeting */}
          <h1 className="text-[19px] font-bold tracking-tight text-white">
            Hola, {userName}
          </h1>
        </div>

        {/* Content panel */}
        <div className="relative -mt-4 rounded-t-[24px] bg-[#F7F8FA] px-5 pt-5 pb-2">
          {/* Token Digital banner */}
          {showTokenBanner && (
            <div className="flex items-start gap-3 bg-[#EEF0F5] rounded-[14px] px-3.5 py-3 mb-5">
              <div className="w-6 h-6 mt-0.5 rounded-full border-2 border-[#3B5BDB] flex items-center justify-center shrink-0">
                <div className="flex gap-[2px]">
                  <span className="w-[3px] h-[3px] rounded-full bg-[#3B5BDB]" />
                  <span className="w-[3px] h-[3px] rounded-full bg-[#3B5BDB]" />
                  <span className="w-[3px] h-[3px] rounded-full bg-[#3B5BDB]" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[#3C4A6B] text-[13px] leading-snug">
                  Activa <b className="font-bold">GRATIS</b> tu Token Digital y haz operaciones más
                  rápidas.
                </p>
                <button
                  type="button"
                  onClick={onOpenConfirmation}
                  className="mt-1.5 text-[#F58634] font-medium text-[13px]"
                >
                  Actívalo ahora
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowTokenBanner(false)}
                aria-label="Cerrar aviso"
                className="p-0.5 text-[#1F2A44]"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

          {/* Tus productos header */}
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[#2B3A67] font-bold text-[16px]">Tus productos</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleBalances}
                aria-label={hideBalances ? 'Mostrar saldos BCP' : 'Ocultar saldos BCP'}
                className="p-1.5 text-[#2B3A67] hover:text-[#1F449E] transition-colors"
              >
                {hideBalances ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={onToggleBalances}
                aria-label="Editar productos BCP"
                className="p-1.5 text-[#2B3A67] hover:text-[#1F449E] transition-colors"
              >
                <Pencil className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Product: Ahorro Soles */}
          <button
            type="button"
            onClick={() => onStartPayment('YAPE')}
            className="w-full py-3.5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <BcpAhorroEmblem />
              </div>
              <div>
                <div className="text-[#2B3A67] font-bold text-[15px] leading-snug">
                  Ahorro Soles
                </div>
                <div className="text-[#6B7390] text-[13px] mt-0.5">**** 6026</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#2B3A67] font-bold text-[15px] tabular-nums">
                {hideBalances ? 'S/ *****' : `S/ ${formatAmountNumber(savingsBalance)}`}
              </span>
              <ChevronRight className="w-4 h-4 text-[#8A91A8]" />
            </div>
          </button>

          {/* Ver todos */}
          <div className="py-2 text-center">
            <button
              type="button"
              onClick={onToggleBalances}
              className="text-[#F58634] font-bold text-[14px]"
            >
              Ver todos
            </button>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-2 py-4">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.lines.join(' ')}
                type="button"
                onClick={() => onStartPayment(action.destination)}
                className="flex flex-col items-center group"
              >
                <div className="w-[48px] h-[48px] rounded-full bg-[#F58634] text-white flex items-center justify-center group-hover:bg-[#E0761F] transition-colors">
                  {action.icon}
                </div>
                <span className="text-[#3C4A6B] text-[12px] font-medium leading-[1.2] text-center mt-2">
                  {action.lines[0]}
                  <br />
                  {action.lines[1]}
                </span>
              </button>
            ))}
          </div>

          {/* Lo más destacado */}
          <div className="mt-1">
            <h3 className="text-[#2B3A67] font-bold text-[16px] mb-3">Lo más destacado</h3>
            <div
              onScroll={handleHighlightsScroll}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-pl-5 no-scrollbar -mx-5 px-5 pb-1"
            >
              {HIGHLIGHTS.map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => onStartPayment('YAPE')}
                  style={{ width: `${HIGHLIGHT_CARD_WIDTH * 100}%` }}
                  className="relative snap-start shrink-0 bg-white border border-[#E3E6EE] rounded-[14px] p-3.5 text-left shadow-[0_2px_8px_rgba(31,68,158,0.06)] overflow-hidden"
                >
                  {card.isNew && (
                    <span className="absolute top-0 right-0 bg-[#2F5BD8] text-white text-[9.5px] font-bold px-2 py-[3px] rounded-bl-[10px]">
                      Nuevo
                    </span>
                  )}
                  <div
                    style={{ backgroundColor: card.iconBg }}
                    className="w-9 h-9 rounded-full border border-[#E3E6EE] flex items-center justify-center mb-2.5"
                  >
                    {card.icon}
                  </div>
                  <div className="text-[#2B3A67] font-bold text-[12.5px] leading-tight">
                    {card.title}
                  </div>
                  <div className="text-[#6B7390] text-[11px] leading-tight mt-1">
                    {card.subtitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Pager dots */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {HIGHLIGHTS.map((card, i) => (
                <span
                  key={card.title}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === highlightIndex ? 'bg-[#1F449E]' : 'bg-[#C5CAD6]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div>
        <div className="bg-white border-t border-[#E3E6EE] pt-2 pb-2 px-2">
          <div className="grid grid-cols-4 items-center">
            <button
              type="button"
              onClick={onGoHome}
              aria-label="Volver al selector de bancos"
              className="flex flex-col items-center justify-center"
            >
              <span className="flex flex-col items-center px-5 py-1.5 rounded-2xl bg-[#DCE5F7] text-[#1F449E]">
                <Home className="w-5 h-5 fill-[#1F449E]" />
                <span className="text-[10.5px] font-bold mt-1">Inicio</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => onStartPayment('YAPE')}
              className="flex flex-col items-center justify-center py-1.5 text-[#6B7390]"
            >
              <ArrowLeftRight className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10.5px] font-medium mt-1">Operaciones</span>
            </button>

            <button
              type="button"
              onClick={onOpenConfirmation}
              className="flex flex-col items-center justify-center py-1.5 text-[#6B7390]"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10.5px] font-medium mt-1">Paga</span>
            </button>

            <button
              type="button"
              onClick={onOpenConfirmation}
              className="flex flex-col items-center justify-center py-1.5 text-[#6B7390]"
            >
              <Settings className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[10.5px] font-medium mt-1">Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BcpConfirmationProps {
  receipt: PaymentReceipt;
  onBack?: () => void;
}

export function BcpConfirmationScreen({ receipt, onBack }: BcpConfirmationProps) {
  return (
    <div
      className="w-full min-h-screen sm:min-h-[760px] bg-white flex flex-col justify-between relative select-none overflow-hidden font-bcp"
      data-testid="bcp-confirmation-screen"
    >
      <div className="px-6 pt-10 pb-8">
        {/* Top-left BCP logo (clickable to return to Inicio) */}
        <div className="mb-7">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver al inicio BCP"
            className="text-left focus:outline-none"
          >
            <BcpLogo variant="light-bg" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-center text-[#1A253A] font-semibold text-[21.5px] tracking-[-0.01em]">
          ¡Operación exitosa!
        </h1>

        {/* Large Blue Amount */}
        <div
          className="text-center text-[#002A8D] text-[45px] font-normal tracking-[-0.015em] mt-4 leading-none tabular-nums"
          data-testid="bcp-receipt-amount"
        >
          S/ {formatAmountNumber(receipt.amount)}
        </div>

        {/* Date below */}
        <p className="text-center text-[#6E7A8A] text-[13.5px] font-normal mt-2.5">
          {receipt.dateFormatted}
        </p>

        {/* Data Rows with Left Labels & Right Values + Fine Horizontal Separators */}
        <div className="mt-8 border-t border-transparent">
          {/* Row 1: Enviado a */}
          <div className="py-4 border-b border-[#E2E8F0] flex items-start justify-between gap-3">
            <span className="text-[#4A5568] text-[15.5px] font-normal shrink-0">
              Enviado a
            </span>
            <div className="text-right">
              <div
                className="text-[#1A253A] font-semibold text-[15.5px] leading-snug"
                data-testid="bcp-receipt-recipient"
              >
                {receipt.recipientName}
              </div>
              <div className="text-[#6E7A8A] text-[14.5px] leading-snug mt-0.5">
                {receipt.maskedPhone}
              </div>
              <div className="text-[#6E7A8A] text-[14px] uppercase leading-snug mt-0.5">
                {receipt.destination}
              </div>
            </div>
          </div>

          {/* Row 2: Comisión */}
          <div className="py-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4">
            <span className="text-[#4A5568] text-[15.5px] font-normal">
              Comisión
            </span>
            <span className="text-[#1A253A] font-semibold text-[15.5px]">
              {receipt.commission}
            </span>
          </div>

          {/* Row 3: Desde */}
          <div className="py-4 border-b border-[#E2E8F0] flex items-start justify-between gap-4">
            <span className="text-[#4A5568] text-[15.5px] font-normal shrink-0">
              Desde
            </span>
            <div className="text-right">
              <div className="text-[#1A253A] font-semibold text-[15.5px] leading-snug">
                {receipt.sourceAccount}
              </div>
              <div className="text-[#6E7A8A] text-[14.5px] leading-snug mt-0.5">
                {receipt.sourceAccountMasked}
              </div>
            </div>
          </div>

          {/* Row 4: Número de operación */}
          <div className="py-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4">
            <span className="text-[#4A5568] text-[15.5px] font-normal">
              Número de operación
            </span>
            <span
              className="text-[#1A253A] font-semibold text-[15.5px] tabular-nums"
              data-testid="bcp-receipt-code"
            >
              {receipt.operationCode}
            </span>
          </div>
        </div>
      </div>

      {/* Scalloped Ticket Bottom Edge matching image_4a57c5d9.png */}
      <div className="w-full h-5 bg-[#EEF2F6] relative flex items-start justify-between overflow-hidden">
        {Array.from({ length: 15 }).map((_, idx) => (
          <div
            key={idx}
            className="w-5 h-5 rounded-full bg-white -mt-2.5 shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

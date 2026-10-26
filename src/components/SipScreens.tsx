import React, { useEffect, useRef } from 'react';
import {
  Menu,
  Bell,
  Headphones,
  ChevronRight,
  Landmark,
  ReceiptText,
  EyeOff,
  Eye,
  Pencil,
  Gift,
  Home,
  ArrowLeftRight,
  QrCode,
  BadgePercent,
  Check,
} from 'lucide-react';
import { SipOperationTileIcon, SipCircleLogo } from './BrandLogos';
import { PaymentReceipt, formatAmountNumber } from '../utils/paymentLogic';

interface SipHomeProps {
  userName: string;
  hideBalances: boolean;
  debitBalance: number;
  rewardsBalance: number;
  onToggleBalances: () => void;
  onStartPayment: (presetDest?: string) => void;
  onOpenConfirmation: () => void;
  onGoHome: () => void;
}

export function SipHomeScreen({
  userName,
  hideBalances,
  debitBalance,
  rewardsBalance,
  onToggleBalances,
  onStartPayment,
  onOpenConfirmation,
  onGoHome,
}: SipHomeProps) {
  const promosRef = useRef<HTMLDivElement>(null);

  // Start the promo carousel on the second card so the neighbours peek on both sides.
  useEffect(() => {
    const container = promosRef.current;
    const mainCard = container?.children[1] as HTMLElement | undefined;
    if (!container || !mainCard) return;
    container.scrollLeft =
      mainCard.offsetLeft - (container.clientWidth - mainCard.offsetWidth) / 2;
  }, []);

  return (
    <div
      className="w-full h-full min-h-[100dvh] sm:min-h-[760px] bg-[#EAF5FE] flex flex-col justify-between select-none overflow-clip font-sip"
      data-testid="sip-home-screen"
    >
      <div>
        {/* Upper Sky-Blue Container */}
        <div className="bg-[#00A6F9] rounded-b-[28px] px-4 pt-2 pb-6">
{/* App Bar */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onStartPayment('Yape')}
                aria-label="Menú Sip"
                className="text-[#141B26] p-1"
              >
                <img src="/assets/iconos/ui/sip-menu.png" alt="" className="w-6 h-6 object-contain" />
              </button>
              <span className="text-[#141B26] font-bold text-[18px] tracking-tight">
                Hola {userName}
              </span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <button
                type="button"
                onClick={onOpenConfirmation}
                aria-label="Notificaciones Sip"
                className="p-1 hover:opacity-80"
              >
                <img src="/assets/iconos/ui/sip-bell.png" alt="" className="w-6 h-6 object-contain" />
              </button>
              <button
                type="button"
                onClick={onOpenConfirmation}
                aria-label="Soporte Sip"
                className="p-1 hover:opacity-80"
              >
                <img src="/assets/iconos/ui/sip-headset.png" alt="" className="w-6 h-6 object-contain" />
              </button>
            </div>
          </div>

          {/* Tus Operaciones Header */}
          <div className="flex items-center justify-between mt-3 mb-3.5">
            <h2 className="text-[#141B26] font-bold text-[16.5px]">
              Tus Operaciones
            </h2>
            <button
              type="button"
              onClick={() => onStartPayment('Yape')}
              aria-label="Ver más operaciones Sip"
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm"><img src="/assets/iconos/ui/sip-chevron-circle.png" alt="" className="w-8 h-8 object-contain" />
            </button>
          </div>

          {/* 4 White Operation Tiles */}
          <div className="grid grid-cols-4 gap-2">
            {/* 1. Sipear a celular */}
            <button
              type="button"
              onClick={() => onStartPayment('Yape')}
              className="flex flex-col items-center group"
            >
              <div className="w-[62px] h-[62px] rounded-[16px] bg-white shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <img src="/assets/iconos/ui/sip-op-sipear.png" alt="" className="w-[46px] h-[46px] object-contain" />
              </div>
              <span className="text-white text-[11.5px] font-medium leading-tight text-center mt-2">
                Sipear a<br />celular
              </span>
            </button>

            {/* 2. Transferir a otro banco */}
            <button
              type="button"
              onClick={() => onStartPayment('Plin')}
              className="flex flex-col items-center group"
            >
              <div className="w-[62px] h-[62px] rounded-[16px] bg-white shadow-sm flex items-center justify-center">
                <img src="/assets/iconos/ui/sip-op-banco.png" alt="" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-white text-[11.5px] font-medium leading-tight text-center mt-2">
                Transferir a<br />otro banco
              </span>
            </button>

            {/* 3. Pagar mi Tarj. Crédito */}
            <button
              type="button"
              onClick={() => onStartPayment('Yape')}
              className="flex flex-col items-center group"
            >
              <div className="w-[62px] h-[62px] rounded-[16px] bg-white shadow-sm flex items-center justify-center">
                <img src="/assets/iconos/ui/sip-op-tarjeta.png" alt="" className="w-9 h-9 object-contain" />
              </div>
              <span className="text-white text-[11.5px] font-medium leading-tight text-center mt-2">
                Pagar mi<br />Tarj. Crédito
              </span>
            </button>

            {/* 4. Pagar servicios */}
            <button
              type="button"
              onClick={() => onStartPayment('Yape')}
              className="flex flex-col items-center group"
            >
              <div className="w-[62px] h-[62px] rounded-[16px] bg-white shadow-sm flex items-center justify-center">
                <img src="/assets/iconos/ui/sip-op-servicios.png" alt="" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-white text-[11.5px] font-medium leading-tight text-center mt-2">
                Pagar<br />servicios
              </span>
            </button>
          </div>
        </div>

        {/* Tus Cuentas White Card + Blue Footer Bar */}
        <div className="mx-4 mt-3.5">
          <div className="bg-white rounded-t-[18px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#141B26] font-bold text-[16px]">
                Tus Cuentas
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onToggleBalances}
                  aria-label={hideBalances ? 'Mostrar saldos Sip' : 'Ocultar saldos Sip'}
                  className="w-8 h-8 rounded-full bg-[#F2F5F8] text-[#64748B] flex items-center justify-center"
                >
                  {hideBalances ? <Eye className="w-4 h-4" /> : <img src="/assets/iconos/ui/sip-eye-off.png" alt="" className="w-5 h-5 object-contain" />}
                </button>
                <button
                  type="button"
                  onClick={onToggleBalances}
                  aria-label="Editar cuentas Sip"
                  className="w-8 h-8 rounded-full bg-[#F2F5F8] text-[#64748B] flex items-center justify-center"
                >
                  <img src="/assets/iconos/ui/sip-edit.png" alt="" className="w-5 h-5 object-contain" />
                </button>
              </div>
            </div>

            {/* Account 1: Tarjeta de Débito (Oh!pay) */}
            <button
              type="button"
              onClick={() => onStartPayment('Yape')}
              className="w-full border border-[#E2E8F0] rounded-[14px] p-3 mb-2.5 flex items-center justify-between text-left hover:border-[#00A6F9] transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src="/assets/iconos/ui/sip-cuenta-debito.png" alt="" className="w-[42px] h-[42px] object-contain shrink-0" />
                <div>
                  <div className="text-[#7A869A] text-[13px] font-normal">
                    Tarjeta de Débito (Oh!pay)
                  </div>
                  <div className="text-[#141B26] font-bold text-[17.5px] leading-snug tabular-nums mt-0.5">
                    {hideBalances ? 'S/ ••••' : `S/ ${formatAmountNumber(debitBalance)}`}
                  </div>
                </div>
              </div>
              <img src="/assets/iconos/ui/sip-chevron.png" alt="" className="w-5 h-5 object-contain" />
            </button>

            {/* Account 2: Recompensas */}
            <button
              type="button"
              onClick={() => onStartPayment('Yape')}
              className="w-full border border-[#E2E8F0] rounded-[14px] p-3 flex items-center justify-between text-left hover:border-[#00A6F9] transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src="/assets/iconos/ui/sip-cuenta-recompensas.png" alt="" className="w-[42px] h-[42px] object-contain shrink-0" />
                <div>
                  <div className="text-[#7A869A] text-[13px] font-normal">
                    Recompensas
                  </div>
                  <div className="text-[#141B26] font-bold text-[17.5px] leading-snug tabular-nums mt-0.5">
                    {hideBalances ? 'S/ ••••' : `S/ ${formatAmountNumber(rewardsBalance)}`}
                  </div>
                </div>
              </div>
              <img src="/assets/iconos/ui/sip-chevron.png" alt="" className="w-5 h-5 object-contain" />
            </button>
          </div>

          {/* Blue bottom bar attached to Tus Cuentas */}
          <button
            type="button"
            onClick={onToggleBalances}
            className="w-full bg-[#00A6F9] text-white font-medium text-[13px] py-2.5 rounded-b-[14px] text-center hover:bg-[#0095E0] transition-colors"
          >
            Ver todas tus cuentas
          </button>
        </div>

        {/* Recomendado para ti */}
        <div className="mt-4">
          <h3 className="text-[#141B26] font-bold text-[16px] mb-2.5 mx-4">
            Recomendado para ti
          </h3>
          <div
            ref={promosRef}
            className="relative flex gap-2 px-[10%] overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {/* Left neighbour (peeks) */}
            <div className="snap-center shrink-0 w-[80%] h-[112px] rounded-[16px] bg-gradient-to-br from-[#E11D48] to-[#9F1239] p-3 flex items-center text-white shadow-sm">
              <div className="font-extrabold text-[14px] leading-[1.1] uppercase">
                Combos<br />de cine
              </div>
            </div>

            {/* Main card: Cineplanet */}
            <div className="snap-center shrink-0 w-[80%] h-[112px] rounded-[16px] overflow-hidden bg-[#00A6F9] flex items-stretch shadow-sm relative">
              <div className="w-[62%] p-3 flex flex-col justify-between text-white">
                <span className="inline-block bg-white text-[#004B93] text-[9.5px] font-bold px-2 py-0.5 rounded-full w-fit">
                  cineplanet
                </span>
                <div className="font-extrabold text-[12px] leading-[1.15] uppercase tracking-tight">
                  ENTRADAS<br />AL CINE TODOS<br />LOS DÍAS A
                </div>
                <span className="bg-black text-white text-[9px] font-semibold px-2.5 py-1 rounded-full w-fit">
                  Conoce más aquí
                </span>
              </div>
              <div className="w-[38%] bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0284C7] flex items-center justify-center py-2 pr-2 pl-9 text-center">
                <div className="text-white/90 text-[10px] font-semibold leading-tight">
                  Beneficio<br />Oh!pay<br />&amp; Sip
                </div>
              </div>
              {/* Price circle */}
              <div className="w-[60px] h-[60px] rounded-full bg-[#00A6F9] border-2 border-white text-white flex flex-col items-center justify-center absolute left-[62%] -translate-x-1/2 bottom-2 shadow">
                <div className="text-[10px] font-extrabold leading-none">
                  S/<span className="text-[19px]">7</span>.90
                </div>
                <span className="text-[8px] font-bold">c/u</span>
              </div>
            </div>

            {/* Right neighbour (peeks) */}
            <div className="snap-center shrink-0 w-[80%] h-[112px] rounded-[16px] bg-[#00A6F9] p-3 flex flex-col justify-center text-white shadow-sm">
              <div className="text-[12px] font-medium leading-tight">Disfruta de tus beneficios</div>
              <div className="font-extrabold text-[20px] leading-tight uppercase">Todos los días</div>
              <div className="text-[11px] font-semibold uppercase mt-0.5">con promociones</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Bottom Navigation Bar with Protruding Center QR Button */}
      <div className="sticky bottom-0 z-20 bg-[#0F1B2C] text-white px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] mt-2">
        <div className="grid grid-cols-5 items-end">
          <button
            type="button"
            onClick={onGoHome}
            aria-label="Volver al selector de bancos"
            className="flex flex-col items-center justify-center text-white relative pt-1"
          >
            <span className="w-8 h-[3px] bg-[#00A6F9] rounded-full absolute -top-1.5" />
            <img src="/assets/iconos/ui/sip-nav-inicio.png" alt="" className="w-5 h-5 object-contain" />
            <span className="text-[10.5px] font-medium mt-1">Inicio</span>
          </button>

          <button
            type="button"
            onClick={() => onStartPayment('Yape')}
            className="flex flex-col items-center justify-center text-[#94A3B8]"
          >
            <img src="/assets/iconos/ui/sip-nav-operaciones.png" alt="" className="w-5 h-5 object-contain brightness-0 invert opacity-70" />
            <span className="text-[10.5px] font-normal mt-1">Operaciones</span>
          </button>

          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => onStartPayment('Yape')}
              aria-label="QR Sip"
              className="w-[58px] h-[58px] -mt-7 rounded-full bg-[#00A6F9] text-white flex flex-col items-center justify-center shadow-lg border-2 border-[#00A6F9]"
            >
              <QrCode className="w-6 h-6" />
              <span className="text-[9.5px] font-semibold mt-0.5 leading-none">
                QR
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenConfirmation}
            className="flex flex-col items-center justify-center text-[#94A3B8]"
          >
            <img src="/assets/iconos/ui/sip-nav-beneficios.png" alt="" className="w-5 h-5 object-contain brightness-0 invert opacity-70" />
            <span className="text-[10.5px] font-normal mt-1">Beneficios</span>
          </button>

          <button
            type="button"
            onClick={onOpenConfirmation}
            className="flex flex-col items-center justify-center text-[#94A3B8]"
          >
            <img src="/assets/iconos/ui/sip-nav-agora.png" alt="" className="w-5 h-5 object-contain" />
            <span className="text-[10.5px] font-normal mt-1">Ir a agora</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface SipConfirmationProps {
  receipt: PaymentReceipt;
  onBack?: () => void;
}

export function SipConfirmationScreen({ receipt, onBack }: SipConfirmationProps) {
  return (
    <div
      className="w-full min-h-[100dvh] sm:min-h-[760px] bg-white flex flex-col items-center pt-10 pb-8 px-5 select-none overflow-hidden font-sip"
      data-testid="sip-confirmation-screen"
    >
      {/* Green Circle with White Checkmark */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Volver al inicio Sip"
        className="w-[62px] h-[62px] rounded-full bg-[#19C964] flex items-center justify-center text-white shadow-sm focus:outline-none"
      >
        <Check className="w-8 h-8 stroke-[3.2]" />
      </button>

      {/* ¡Sipeaste! */}
      <h1 className="text-[#3F4652] font-semibold text-[18.5px] mt-4 tracking-[-0.01em]">
        ¡Sipeaste!
      </h1>

      {/* Large Black Amount */}
      <div
        className="text-[#1C1E21] font-semibold text-[35px] tracking-[-0.02em] mt-1 leading-tight tabular-nums"
        data-testid="sip-receipt-amount"
      >
        S/ {formatAmountNumber(receipt.amount)}
      </div>

      {/* Light Gray Card with Vertically Organized Data matching image_9bfc8d54.png */}
      <div className="w-full bg-[#F7F7F8] rounded-[16px] p-5 mt-6 text-left space-y-4">
        {/* Enviado a */}
        <div>
          <div className="text-[#8E8E93] text-[12px] font-normal">
            Enviado a
          </div>
          <div
            className="text-[#2C2C2E] text-[13.5px] font-normal uppercase leading-snug mt-0.5"
            data-testid="sip-receipt-recipient"
          >
            {receipt.recipientName}
          </div>
          <div className="text-[#2C2C2E] text-[13.5px] font-normal leading-snug mt-0.5">
            {receipt.maskedPhone}
          </div>
        </div>

        {/* Destino */}
        <div>
          <div className="text-[#8E8E93] text-[12px] font-normal">
            Destino
          </div>
          <div className="text-[#2C2C2E] text-[13.5px] font-normal mt-0.5">
            {receipt.destination}
          </div>
        </div>

        {/* Fecha y hora */}
        <div>
          <div className="text-[#8E8E93] text-[12px] font-normal">
            Fecha y hora
          </div>
          <div className="text-[#2C2C2E] text-[13.5px] font-normal mt-0.5">
            {receipt.dateFormatted}
          </div>
        </div>

        {/* Comisión */}
        <div>
          <div className="text-[#8E8E93] text-[12px] font-normal">
            Comisión
          </div>
          <div className="mt-1">
            <span className="inline-block bg-[#22C55E] text-white font-semibold text-[11px] px-3 py-1 rounded-full tracking-wide uppercase">
              {receipt.commission}
            </span>
          </div>
        </div>

        {/* Número de operación */}
        <div>
          <div className="text-[#8E8E93] text-[12px] font-normal">
            Número de operación
          </div>
          <div
            className="text-[#2C2C2E] text-[13.5px] font-normal mt-0.5 tabular-nums"
            data-testid="sip-receipt-code"
          >
            {receipt.operationCode}
          </div>
        </div>
      </div>
    </div>
  );
}

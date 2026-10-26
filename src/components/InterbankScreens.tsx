import React from 'react';
import {
  Menu,
  Pencil,
  Bell,
  ArrowLeftRight,
  Lightbulb,
  RefreshCw,
  Smartphone,
  CreditCard,
  ChevronDown,
  ChevronRight,
  EyeOff,
  Eye,
  Plus,
  Home,
  QrCode,
  Tag,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { InterbankLogo, PlinBubbleIcon } from './BrandLogos';
import {
  InterbankTab,
  PaymentReceipt,
  formatAmountNumber,
} from '../utils/paymentLogic';

interface InterbankHomeProps {
  activeTab: InterbankTab;
  hideBalances: boolean;
  solesBalance: number;
  dollarsBalance: number;
  onTabChange: (tab: InterbankTab) => void;
  onToggleBalances: () => void;
  onStartPayment: (recipientPreset?: { name: string; phone: string; dest: string }) => void;
  onOpenConfirmation: () => void;
  onGoHome: () => void;
}

export function InterbankHomeScreen({
  activeTab,
  hideBalances,
  solesBalance,
  dollarsBalance,
  onTabChange,
  onToggleBalances,
  onStartPayment,
  onOpenConfirmation,
  onGoHome,
}: InterbankHomeProps) {
  return (
    <div
      className="w-full h-full min-h-[760px] bg-[#05BE50] flex flex-col justify-between select-none overflow-hidden font-interbank"
      data-testid="interbank-home-screen"
    >
      {/* Top Green Header */}
      <div className="px-4 pt-2 pb-4 text-white">
{/* App Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              onTabChange(activeTab === 'operaciones' ? 'productos' : 'operaciones')
            }
            aria-label="Menú Interbank"
            className="w-9 h-9 rounded-full flex items-center justify-center"><img src="/assets/iconos/ui/ibk-menu.png" alt="" className="w-9 h-9 object-contain" />
          </button>

          <InterbankLogo variant="header-green" />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onStartPayment()}
              aria-label="Personalizar Interbank"
              className="p-1 text-white hover:opacity-80"
            >
              <img src="/assets/iconos/ui/ibk-edit.png" alt="" className="w-6 h-6 object-contain" />
            </button>
            <button
              type="button"
              onClick={onOpenConfirmation}
              aria-label="Notificaciones Interbank"
              className="p-1 text-white hover:opacity-80"
            >
              <img src="/assets/iconos/ui/ibk-bell.png" alt="" className="w-6 h-6 object-contain" />
            </button>
          </div>
        </div>
      </div>

      {/* Main White Rounded Sheet */}
      <div className="flex-1 bg-white rounded-t-[28px] flex flex-col justify-between overflow-hidden">
        <div className="px-4 pt-1 pb-2 overflow-y-auto">
          {/* Two Top Tabs: Mis operaciones | Mis productos */}
          <div className="grid grid-cols-2 border-b border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => onTabChange('operaciones')}
              className={`py-3.5 text-[15px] font-semibold text-center relative transition-colors ${
                activeTab === 'operaciones' ? 'text-[#111827]' : 'text-[#374151]'
              }`}
            >
              Mis operaciones
              {activeTab === 'operaciones' && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0039A6] rounded-t-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onTabChange('productos')}
              className={`py-3.5 text-[15px] font-semibold text-center relative transition-colors ${
                activeTab === 'productos' ? 'text-[#111827]' : 'text-[#374151]'
              }`}
            >
              Mis productos
              {activeTab === 'productos' && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0039A6] rounded-t-full" />
              )}
            </button>
          </div>

          {activeTab === 'operaciones' ? (
            <>
              {/* Exchange Rate Line */}
              <div className="text-center text-[#2C3545] text-[12.5px] py-3.5">
                T.C. referencial: Compra: 3.371 | Venta: 3.529
              </div>

              {/* 4x2 Operations Grid */}
              <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                {/* 1. Plinear */}
                <button
                  type="button"
                  onClick={() => onStartPayment()}
                  className="flex flex-col items-center group"
                >
                  <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img src="/assets/iconos/ui/ibk-op-plin.png" alt="" className="w-[38px] h-[38px] object-contain" />
                  </div>
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Plinear
                  </span>
                </button>

                {/* 2. Transferir dinero */}
                <button
                  type="button"
                  onClick={() => onStartPayment()}
                  className="flex flex-col items-center group"
                >
                  <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] flex items-center justify-center">
                    <img src="/assets/iconos/ui/ibk-op-transferir.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Transferir<br />dinero
                  </span>
                </button>

                {/* 3. Ver datos de tarjeta + Nuevo badge */}
                <button
                  type="button"
                  onClick={() => onTabChange('productos')}
                  className="flex flex-col items-center group"
                >
                  <div className="relative">
                    <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] flex items-center justify-center">
                      <img src="/assets/iconos/ui/ibk-op-datos-tarjeta.png" alt="" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#0039A6] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full leading-none whitespace-nowrap">
                      Nuevo
                    </span>
                  </div>
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Ver datos<br />de tarjeta
                  </span>
                </button>

                {/* 4. Pagar servicios */}
                <button
                  type="button"
                  onClick={() => onStartPayment()}
                  className="flex flex-col items-center group"
                >
                  <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] flex items-center justify-center">
                    <img src="/assets/iconos/ui/ibk-op-servicios.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Pagar<br />servicios
                  </span>
                </button>

                {/* 5. Cambiar moneda */}
                <button
                  type="button"
                  onClick={() => onStartPayment()}
                  className="flex flex-col items-center group"
                >
                  <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] flex items-center justify-center">
                    <img src="/assets/iconos/ui/ibk-op-cambiar-moneda.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Cambiar<br />moneda
                  </span>
                </button>

                {/* 6. Recargar celular */}
                <button
                  type="button"
                  onClick={() => onStartPayment()}
                  className="flex flex-col items-center group"
                >
                  <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] flex items-center justify-center">
                    <img src="/assets/iconos/ui/ibk-op-recargar.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Recargar<br />celular
                  </span>
                </button>

                {/* 7. Agregar tarjeta (filled green highlight matching screenshot) */}
                <button
                  type="button"
                  onClick={() => onTabChange('productos')}
                  className="flex flex-col items-center group"
                >
                  <img src="/assets/iconos/ui/ibk-op-agregar-tarjeta.png" alt="" className="w-[62px] h-[62px] object-contain" />
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Agregar<br />tarjeta
                  </span>
                </button>

                {/* 8. Ver más opciones */}
                <button
                  type="button"
                  onClick={() => onTabChange('productos')}
                  className="flex flex-col items-center group"
                >
                  <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] flex items-center justify-center">
                    <img src="/assets/iconos/ui/ibk-op-mas.png" alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="text-[#1F2937] text-[12px] font-medium leading-tight text-center mt-2">
                    Ver más<br />opciones
                  </span>
                </button>
              </div>
            </>
          ) : (
            /* Mis Productos View matching image_8c56a5d4.png */
            <div className="pt-3" data-testid="interbank-productos-panel">
              {/* Top utility row */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2 text-[#111827] font-semibold text-[14.5px]">
                  <img src="/assets/iconos/ui/ibk-datos-tarjeta.png" alt="" className="w-6 h-6 object-contain" />
                  <span>Ver datos de tarjeta</span>
                </div>
                <button
                  type="button"
                  onClick={onToggleBalances}
                  aria-label={hideBalances ? 'Mostrar saldos Interbank' : 'Ocultar saldos Interbank'}
                  className="w-9 h-9 flex items-center justify-center">{hideBalances ? <span className="w-9 h-9 rounded-full border-[1.8px] border-[#0039A6] flex items-center justify-center text-[#0039A6]"><Eye className="w-4 h-4" /></span> : <img src="/assets/iconos/ui/ibk-ojo-oculto.png" alt="" className="w-9 h-9 object-contain" />}
                </button>
              </div>

              {/* Product 1: Cuenta Simple Soles */}
              <button
                type="button"
                onClick={() => onStartPayment()}
                className="w-full py-2.5 border-b border-[#F1F5F9] flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3.5">
                  <img src="/assets/iconos/ui/ibk-cuenta-soles.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <div className="text-[#1F2937] text-[15px] font-normal">
                      Cuenta Simple Soles
                    </div>
                    <div className="text-[#111827] font-bold text-[18px] leading-snug tabular-nums">
                      {hideBalances ? 'S/ ••••' : `S/${formatAmountNumber(solesBalance)}`}
                    </div>
                    <div className="text-[#4B5563] text-[12px]">Saldo disponible</div>
                  </div>
                </div>
                <img src="/assets/iconos/ui/ibk-chevron.png" alt="" className="w-5 h-5 object-contain" />
              </button>

              {/* Product 2: Cuenta Simple Dólares */}
              <button
                type="button"
                onClick={() => onStartPayment()}
                className="w-full py-2.5 border-b border-[#F1F5F9] flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3.5">
                  <img src="/assets/iconos/ui/ibk-cuenta-dolares.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <div className="text-[#1F2937] text-[15px] font-normal">
                      Cuenta Simple Dólares
                    </div>
                    <div className="text-[#111827] font-bold text-[18px] leading-snug tabular-nums">
                      {hideBalances ? '$ ••••' : `$${formatAmountNumber(dollarsBalance)}`}
                    </div>
                    <div className="text-[#4B5563] text-[12px]">Saldo disponible</div>
                  </div>
                </div>
                <img src="/assets/iconos/ui/ibk-chevron.png" alt="" className="w-5 h-5 object-contain" />
              </button>

              {/* Product 3: Débito Clásica */}
              <button
                type="button"
                onClick={() => onStartPayment()}
                className="w-full py-3.5 border-b border-[#F1F5F9] flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3.5">
                  <img src="/assets/iconos/ui/ibk-visa.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                  <div className="text-[#111827] font-semibold text-[17px]">
                    Débito Clásica
                  </div>
                </div>
                <img src="/assets/iconos/ui/ibk-chevron.png" alt="" className="w-5 h-5 object-contain" />
              </button>

              {/* Product 4: Mis Inversiones */}
              <button
                type="button"
                onClick={() => onStartPayment()}
                className="w-full py-3 border-b border-[#F1F5F9] flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3.5">
                  <img src="/assets/iconos/ui/ibk-inversiones.png" alt="" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <div className="text-[#111827] font-semibold text-[17px]">
                      Mis Inversiones
                    </div>
                    <div className="text-[#4B5563] text-[13px]">Explorar productos</div>
                  </div>
                </div>
                <img src="/assets/iconos/ui/ibk-chevron.png" alt="" className="w-5 h-5 object-contain" />
              </button>

              {/* Dashed Box: Agregar nuevo producto */}
              <button
                type="button"
                onClick={() => onStartPayment()}
                className="w-full mt-3 border-[1.8px] border-dashed border-[#CBD5E1] rounded-[16px] p-3.5 flex items-center gap-3.5 text-left hover:border-[#05BE50] transition-colors"
              >
                <img src="/assets/iconos/ui/ibk-mas.png" alt="" className="w-5 h-5 object-contain shrink-0" />
                <div>
                  <div className="text-[#111827] font-semibold text-[16px]">
                    Agregar nuevo producto
                  </div>
                  <div className="text-[#4B5563] text-[13px]">
                    Obtén una cuenta, tarjeta y más.
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Promo Pills Row (WhatsApp Plin + Controla) */}
          <div className="flex items-center gap-2.5 mt-4 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => onStartPayment()}
              className="bg-[#ECFDF0] rounded-full px-3.5 py-2 flex items-center gap-2 shrink-0"
            >
              <img src="/assets/iconos/ui/ibk-whatsapp-plin.png" alt="" className="w-7 h-7 object-contain" />
              <span className="text-[#008A38] font-medium text-[12px] whitespace-nowrap">
                ¡Plinea por Whatsapp aquí!
              </span>
            </button>

            <button
              type="button"
              onClick={() => onStartPayment()}
              className="bg-[#ECFDF0] rounded-full px-3.5 py-2 flex items-center gap-2 shrink-0"
            >
              <img src="/assets/iconos/ui/ibk-controla.png" alt="" className="w-6 h-6 object-contain" />
              <span className="text-[#008A38] font-medium text-[12px] whitespace-nowrap">
                Controla
              </span>
            </button>
          </div>

          {/* Favoritos Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-[#009B3A] font-semibold text-[18px]">Favoritos</h3>
              <button
                type="button"
                onClick={() => onStartPayment()}
                className="text-[#111827] text-[13px] font-medium flex items-center gap-0.5"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {activeTab === 'operaciones' && (
              <div className="flex items-start gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 [&>button]:shrink-0 [&>button]:w-[60px]">
                {/* 1. Beto */}
                <button
                  type="button"
                  onClick={() =>
                    onStartPayment({ name: 'Beto Quispe Demo', phone: '900000021', dest: 'Interbank' })
                  }
                  className="flex flex-col items-center"
                >
                  <div className="w-[58px] h-[58px] rounded-[16px] border-2 border-[#05BE50] flex items-center justify-center">
                    <img src="/assets/iconos/ui/ibk-fav-tino.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-[#1F2937] text-[12px] mt-1.5">Beto</span>
                </button>

                {/* 2. Luna */}
                <button
                  type="button"
                  onClick={() =>
                    onStartPayment({ name: 'Luna Rivera Demo', phone: '900000022', dest: 'Plin' })
                  }
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="w-[58px] h-[58px] rounded-[16px] border-2 border-[#00D1C1] flex items-center justify-center">
                      <img src="/assets/iconos/ui/ibk-fav-estrella.png" alt="" className="w-8 h-8 object-contain" />
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#005A5B] text-white text-[9.5px] font-bold px-2 py-0.2 rounded-full">
                      Plin
                    </span>
                  </div>
                  <span className="text-[#1F2937] text-[12px] mt-1.5">Luna</span>
                </button>

                {/* 3. Mia */}
                <button
                  type="button"
                  onClick={() =>
                    onStartPayment({ name: 'Mia Moreno Demo', phone: '900000023', dest: 'Plin' })
                  }
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="w-[58px] h-[58px] rounded-[16px] border-2 border-[#00D1C1] flex items-center justify-center">
                      <img src="/assets/iconos/ui/ibk-fav-estrella.png" alt="" className="w-8 h-8 object-contain" />
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#005A5B] text-white text-[9.5px] font-bold px-2 py-0.2 rounded-full">
                      Plin
                    </span>
                  </div>
                  <span className="text-[#1F2937] text-[12px] mt-1.5">Mia</span>
                </button>

                {/* 4. Nena */}
                <button
                  type="button"
                  onClick={() =>
                    onStartPayment({
                      name: 'Rosa Elena Vargas Prado',
                      phone: '900000002',
                      dest: 'Ligo',
                    })
                  }
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="w-[58px] h-[58px] rounded-[16px] border-2 border-[#00D1C1] flex items-center justify-center">
                      <span className="text-[#0F2942] font-bold text-[17px]">N</span>
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#005A5B] text-white text-[9.5px] font-bold px-2 py-0.2 rounded-full">
                      Plin
                    </span>
                  </div>
                  <span className="text-[#1F2937] text-[12px] mt-1.5">Nena</span>
                </button>

                {/* 5. Super Deli (peeks at the right edge) */}
                <button
                  type="button"
                  onClick={() =>
                    onStartPayment({ name: 'Super Deli Demo', phone: '900000025', dest: 'Plin' })
                  }
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="w-[58px] h-[58px] rounded-[16px] border-2 border-[#00D1C1] flex items-center justify-center">
                      <span className="text-[#0F2942] font-bold text-[17px]">S</span>
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#005A5B] text-white text-[9.5px] font-bold px-2 py-0.2 rounded-full">
                      Plin
                    </span>
                  </div>
                  <span className="text-[#1F2937] text-[12px] mt-1.5 text-center leading-tight">
                    Super<br />Deli
                  </span>
                </button>
              </div>
            )}
          </div>

          {activeTab === 'operaciones' && (
            <h3 className="text-[#009B3A] font-semibold text-[18px] mt-4">
              Novedades Interbank
            </h3>
          )}
        </div>

        {/* Bottom Navigation Bar with Center Blue QR Circle */}
        <div className="bg-white rounded-t-[20px] shadow-[0_-4px_14px_rgba(0,0,0,0.06)] border-t border-[#F1F5F9] px-2 pt-1.5 pb-2">
          <div className="grid grid-cols-5 items-end">
            <button
              type="button"
              onClick={onGoHome}
              aria-label="Volver al selector de bancos"
              className="flex flex-col items-center justify-center text-[#008A38] relative pt-1"
            >
              <span className="w-8 h-[3px] bg-[#008A38] rounded-full absolute -top-1.5" />
              <img src="/assets/iconos/ui/ibk-nav-inicio.png" alt="" className="w-5 h-5 object-contain" />
              <span className="text-[10.5px] font-semibold mt-1">Inicio</span>
            </button>

            <button
              type="button"
              onClick={onOpenConfirmation}
              className="flex flex-col items-center justify-center text-[#374151]"
            >
              <img src="/assets/iconos/ui/ibk-nav-movimientos.png" alt="" className="w-5 h-5 object-contain" />
              <span className="text-[10.5px] font-medium mt-1">Movimientos</span>
            </button>

            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => onStartPayment()}
                aria-label="Escanear QR Interbank"
                className="w-[52px] h-[52px] -mt-6 rounded-full flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"><img src="/assets/iconos/ui/ibk-nav-qr.png" alt="" className="w-[52px] h-[52px] object-contain" />
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenConfirmation}
              className="flex flex-col items-center justify-center text-[#374151] relative"
            >
              <img src="/assets/iconos/ui/ibk-nav-beneficios.png" alt="" className="w-6 h-6 object-contain" />
              <span className="text-[10.5px] font-medium mt-1">Beneficios</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('productos')}
              className="flex flex-col items-center justify-center text-[#374151]"
            >
              <img src="/assets/iconos/ui/ibk-nav-para-ti.png" alt="" className="w-5 h-5 object-contain" />
              <span className="text-[10.5px] font-medium mt-1">Para ti</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InterbankConfirmationProps {
  receipt: PaymentReceipt;
  onBack?: () => void;
}

export function InterbankConfirmationScreen({
  receipt,
  onBack,
}: InterbankConfirmationProps) {
  return (
    <div
      className="w-full min-h-screen sm:min-h-[760px] bg-white flex flex-col items-center pt-12 pb-8 px-5 select-none overflow-hidden font-interbank"
      data-testid="interbank-confirmation-screen"
    >
      {/* Centered Interbank Logo */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver al inicio Interbank"
          className="focus:outline-none"
        >
          <InterbankLogo variant="white-bg" size="lg" />
        </button>
      </div>

      {/* Centered Plin Speech Bubble Logo */}
      <div className="mb-2">
        <img
          src="/assets/logo-descuentos-peru.png"
          alt="Descuentos Perú"
          className="w-[56px] h-[56px] object-contain"
        />
      </div>

      {/* ¡Pago exitoso! */}
      <h1 className="text-[#1D252D] text-[18.5px] font-normal tracking-[-0.01em]">
        ¡Pago exitoso!
      </h1>

      {/* Large Green Amount in Geometria Medium */}
      <div
        className="text-[#05BE50] mt-1 flex items-baseline justify-center tabular-nums"
        data-testid="interbank-receipt-amount"
      >
        <span className="text-[26px] font-medium mr-1.5">S/</span>
        <span className="text-[43px] font-medium tracking-[-0.02em] leading-none">
          {formatAmountNumber(receipt.amount)}
        </span>
      </div>

      {/* Sawtooth Ticket Block matching image_f5c5c0f4.png */}
      <div className="w-full mt-6 relative">
        {/* Top Zigzag Teeth */}
        <div
          className="w-full h-3"
          style={{
            backgroundImage:
              'linear-gradient(135deg, transparent 50%, #F5F5F5 50%), linear-gradient(225deg, transparent 50%, #F5F5F5 50%)',
            backgroundSize: '16px 12px',
            backgroundRepeat: 'repeat-x',
          }}
        />

        {/* Ticket Body */}
        <div className="bg-[#F5F5F5] px-6 py-5 text-left space-y-4">
          {/* Enviado a: */}
          <div>
            <div className="text-[#111827] font-bold text-[14.5px]">Enviado a:</div>
            <div
              className="text-[#1F2937] text-[14.5px] font-normal leading-snug mt-0.5"
              data-testid="interbank-receipt-recipient"
            >
              {receipt.recipientName}
            </div>
            <div className="text-[#1F2937] text-[14.5px] font-normal leading-snug mt-0.5">
              {receipt.maskedPhone} - {receipt.destination}
            </div>
          </div>

          {/* Comisión: */}
          <div>
            <div className="text-[#111827] font-bold text-[14.5px]">Comisión:</div>
            <div className="mt-1">
              <span className="inline-block bg-[#05BE50] text-white font-bold text-[12.5px] px-2.5 py-0.5 rounded-[5px] tracking-wide">
                {receipt.commission}
              </span>
            </div>
          </div>

          {/* Fecha y hora: */}
          <div>
            <div className="text-[#111827] font-bold text-[14.5px]">
              Fecha y hora:
            </div>
            <div className="text-[#1F2937] text-[14.5px] font-normal mt-0.5">
              {receipt.dateFormatted}
            </div>
          </div>

          {/* Código de operación: */}
          <div>
            <div className="text-[#111827] font-bold text-[14.5px]">
              Código de operación:
            </div>
            <div
              className="text-[#1F2937] text-[14.5px] font-normal mt-0.5 tabular-nums"
              data-testid="interbank-receipt-code"
            >
              {receipt.operationCode}
            </div>
          </div>
        </div>

        {/* Bottom Zigzag Teeth */}
        <div
          className="w-full h-3"
          style={{
            backgroundImage:
              'linear-gradient(45deg, transparent 50%, #F5F5F5 50%), linear-gradient(315deg, transparent 50%, #F5F5F5 50%)',
            backgroundSize: '16px 12px',
            backgroundRepeat: 'repeat-x',
          }}
        />
      </div>
    </div>
  );
}

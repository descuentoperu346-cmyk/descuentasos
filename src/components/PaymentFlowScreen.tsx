import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  X,
  Search,
  QrCode,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import {
  BankAppId,
  PaymentFormInput,
} from '../utils/paymentLogic';

interface PaymentFlowProps {
  app: BankAppId;
  initialInput: PaymentFormInput;
  onCancel: () => void;
  onSubmitPayment: (input: PaymentFormInput) => void;
}

interface ContactItem {
  name: string;
  fullName: string;
  phone: string;
}

const BCP_CONTACTS: ContactItem[] = [
  {
    name: 'Jorge',
    fullName: 'Jorge Luis Ramos Peña',
    phone: '900 000 011',
  },
  {
    name: 'Lucía',
    fullName: 'Lucía Fernanda Rojas Díaz',
    phone: '900 000 012',
  },
  {
    name: 'Mateo',
    fullName: 'Mateo Vargas Demo',
    phone: '900 000 013',
  },
  {
    name: 'Mario',
    fullName: 'Mario Alberto Soto',
    phone: '900 000 014',
  },
  {
    name: 'Beto',
    fullName: 'Beto Quispe Demo',
    phone: '900 000 015',
  },
];

const SIP_CONTACTS: ContactItem[] = [
  {
    name: 'Jorge',
    fullName: 'Jorge Luis Ramos Peña',
    phone: '900 000 011',
  },
  {
    name: 'Lucía',
    fullName: 'Lucía Fernanda Rojas Díaz',
    phone: '900 000 012',
  },
  {
    name: 'Mario',
    fullName: 'Mario Alberto Soto',
    phone: '900 000 014',
  },
  {
    name: 'Beto',
    fullName: 'Beto Quispe Demo',
    phone: '900 000 015',
  },
];

function getInitials(name: string): string {
  const clean = name.replace(/[^\p{L}\s]/gu, '').trim();
  if (!clean) return 'JO';
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getSingleInitial(name: string): string {
  const clean = name.replace(/[^\p{L}\s]/gu, '').trim();
  if (!clean) return 'J';
  return clean[0].toUpperCase();
}

function formatSpacedPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '').slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
}

function getBulletMaskedPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const lastThree = digits.slice(-3) || '011';
  return `••• ••• ${lastThree}`;
}

export function PaymentFlowScreen({
  app,
  onCancel,
  onSubmitPayment,
}: PaymentFlowProps) {
  const [step, setStep] = useState<'contacts' | 'amount'>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactItem>({
    name: 'Jorge',
    fullName: 'Jorge Luis Ramos Peña',
    phone: '900 000 011',
  });
  const [amount, setAmount] = useState('');
  const [motivo, setMotivo] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<string>(
    app === 'sip' ? 'Yape' : ''
  );
  const [isEntitySheetOpen, setIsEntitySheetOpen] = useState(false);
  const [showMoreEntities, setShowMoreEntities] = useState(false);
  const [editingCustomContact, setEditingCustomContact] = useState(false);

  const fontClass =
    app === 'bcp'
      ? 'font-bcp'
      : app === 'interbank'
        ? 'font-interbank'
        : 'font-sip';

  const baseContacts = app === 'sip' ? SIP_CONTACTS : BCP_CONTACTS;

  const filteredContacts = baseContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.replace(/\s/g, '').includes(searchQuery.replace(/\s/g, ''))
  );

  const handleSelectContact = (contact: ContactItem) => {
    setSelectedContact(contact);
    if (app === 'sip' && !selectedEntity) {
      setSelectedEntity('Yape');
    }
    setStep('amount');
  };

  const completePaymentWithEntity = (entityName: string) => {
    setSelectedEntity(entityName);
    setIsEntitySheetOpen(false);
    if (app === 'sip') {
      return;
    }
    const parsed = Number(amount);
    if (amount.trim() && !Number.isNaN(parsed) && parsed > 0) {
      const cleanPhone = selectedContact.phone.replace(/\D/g, '') || '900000011';
      onSubmitPayment({
        recipientName:
          selectedContact.fullName.trim() ||
          selectedContact.name.trim() ||
          'Jorge Luis Ramos Peña',
        phoneNumber: cleanPhone.padEnd(9, '0').slice(0, 9),
        amount: String(parsed),
        destination: entityName,
      });
    }
  };

  const handleConfirmPayment = () => {
    const parsed = Number(amount);
    const finalAmount =
      !amount.trim() || Number.isNaN(parsed) || parsed <= 0 ? 1.0 : parsed;
    const cleanPhone = selectedContact.phone.replace(/\D/g, '') || '900000011';
    const defaultDest =
      app === 'bcp' ? 'YAPE' : app === 'interbank' ? 'Ligo' : 'Yape';
    onSubmitPayment({
      recipientName:
        selectedContact.fullName.trim() ||
        selectedContact.name.trim() ||
        'Jorge Luis Ramos Peña',
      phoneNumber: cleanPhone.padEnd(9, '0').slice(0, 9),
      amount: String(finalAmount),
      destination: selectedEntity || defaultDest,
    });
  };

  // ============================================================================
  // SIP FLOW ("Sipear a celular" — image_6ef56a56.png & image_aaa445a7.png)
  // ============================================================================
  if (app === 'sip') {
    const isSipAmountValid =
      amount.trim().length > 0 &&
      !Number.isNaN(Number(amount)) &&
      Number(amount) > 0;

    return (
      <div
        className="w-full min-h-[100dvh] sm:min-h-[760px] bg-white flex flex-col justify-between relative select-none font-sip text-[#0F172A] overflow-hidden"
        data-testid={
          step === 'contacts' ? 'sip-contacts-screen' : 'sip-amount-screen'
        }
      >
        <div className="flex-1 flex flex-col">
          {/* Top Bright Cyan Header (#00B2FF) */}
          <div className="bg-[#00B2FF] text-[#111827]">
{/* App Bar: <   Sipear a celular */}
            <div className="px-4 pt-3 pb-4 relative flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  if (step === 'amount') {
                    setStep('contacts');
                  } else {
                    onCancel();
                  }
                }}
                aria-label="Volver"
                className="absolute left-3 p-1 text-[#111827] hover:opacity-75"
              >
                <ChevronLeft className="w-6 h-6 stroke-[1.8]" />
              </button>
              <h1 className="text-[#111827] font-semibold text-[16.5px] tracking-[-0.01em]">
                Sipear a celular
              </h1>
            </div>
          </div>

          {/* Light Blue Subheader Bar: Saldo disponible: S/ 0.00 | Actualizar */}
          <div className="bg-[#E5F6FF] px-4 py-3 flex items-center justify-between">
            <div className="text-[13.5px] text-[#334155] font-normal">
              Saldo disponible:{' '}
              <span className="font-semibold text-[#0F172A] text-[14.5px]">
                S/ 0.00
              </span>
            </div>
            <button
              type="button"
              className="text-[#00A8E8] text-[13px] underline font-normal hover:opacity-80"
            >
              Actualizar
            </button>
          </div>

          {step === 'contacts' ? (
            /* SIP STEP 1: Contact Search & List (matching image_6ef56a56.png) */
            <div className="px-4 pt-5 pb-6 flex-1">
              {/* Search Box + QR Square Button */}
              <div className="flex items-center gap-2.5">
                <div className="flex-1 h-[50px] rounded-[10px] border border-[#94A3B8]/80 bg-white px-4 flex items-center justify-between">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar amigos o celular"
                    aria-label="Buscar amigos o celular"
                    className="w-full bg-transparent text-[#0F172A] placeholder-[#94A3B8] text-[14.5px] font-normal focus:outline-none"
                  />
                  <Search className="w-5 h-5 text-[#64748B] shrink-0 stroke-[1.8] ml-2" />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectContact({
                      name: searchQuery.trim() || 'Jorge',
                      fullName:
                        searchQuery.trim() || 'Jorge Luis Ramos Peña',
                      phone: '900 000 011',
                    })
                  }
                  aria-label="Escanear QR Sip"
                  className="w-[50px] h-[50px] rounded-[10px] border border-[#E2E8F0] bg-white flex items-center justify-center text-[#00A8E8] shrink-0 hover:bg-[#F8FAFC]"
                >
                  <QrCode className="w-6 h-6 stroke-[1.8]" />
                </button>
              </div>

              {/* Section Heading: Contactos */}
              <h2 className="text-[#0F172A] font-semibold text-[16px] mt-5 mb-2">
                Contactos
              </h2>

              {/* Custom Contact Option when typing */}
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const digits = searchQuery.replace(/\D/g, '');
                    const isPhone = digits.length >= 6;
                    handleSelectContact({
                      name: isPhone ? 'Contacto' : searchQuery.trim(),
                      fullName: isPhone
                        ? 'Jorge Luis Ramos Peña'
                        : searchQuery.trim(),
                      phone: isPhone
                        ? formatSpacedPhone(digits.padEnd(9, '0'))
                        : '900 000 011',
                    });
                  }}
                  className="w-full py-3.5 border-b border-[#F1F5F9] flex items-center gap-3.5 text-left hover:bg-[#F8FAFC]"
                >
                  <div className="w-[42px] h-[42px] rounded-[10px] bg-[#E1F4FF] text-[#0099FF] font-semibold text-[16px] flex items-center justify-center shrink-0">
                    {getSingleInitial(searchQuery)}
                  </div>
                  <div>
                    <div className="text-[#334155] font-normal text-[14.5px] leading-snug">
                      {searchQuery.trim()}
                    </div>
                    <div className="text-[#475569] font-normal text-[13px] mt-0.5 tabular-nums">
                      900 000 011
                    </div>
                  </div>
                </button>
              )}

              {/* Contacts List matching image_6ef56a56.png */}
              <div>
                {filteredContacts.map((contact) => (
                  <button
                    key={`${contact.name}-${contact.phone}`}
                    type="button"
                    onClick={() => handleSelectContact(contact)}
                    className="w-full py-3.5 border-b border-[#F1F5F9] flex items-center gap-3.5 text-left hover:bg-[#F8FAFC] transition-colors"
                  >
                    <div className="w-[42px] h-[42px] rounded-[10px] bg-[#E1F4FF] text-[#0099FF] font-semibold text-[16px] flex items-center justify-center shrink-0">
                      {getSingleInitial(contact.name)}
                    </div>
                    <div>
                      <div className="text-[#334155] font-normal text-[14.5px] leading-snug">
                        {contact.name}
                      </div>
                      <div className="text-[#475569] font-normal text-[13px] mt-0.5 tabular-nums">
                        {contact.phone}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* SIP STEP 2: Selected Contact, Elige dónde enviar, Monto a pagar (matching image_aaa445a7.png) */
            <div className="px-4 pt-5 pb-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Selected Recipient Card */}
                <div className="rounded-[12px] border border-[#E2E8F0] p-3.5 flex items-center gap-3.5 bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingCustomContact(!editingCustomContact)
                    }
                    className="w-[42px] h-[42px] rounded-[10px] bg-[#00A8FF] text-white font-semibold text-[17px] flex items-center justify-center shrink-0"
                  >
                    {getSingleInitial(selectedContact.fullName)}
                  </button>

                  {editingCustomContact ? (
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={selectedContact.fullName}
                        onChange={(e) =>
                          setSelectedContact({
                            ...selectedContact,
                            fullName: e.target.value,
                          })
                        }
                        aria-label="Nombre completo del destinatario"
                        className="w-full border-b border-[#00A8FF] text-[#0F172A] font-semibold text-[14px] py-0.5 focus:outline-none"
                      />
                      <input
                        type="tel"
                        value={selectedContact.phone}
                        onChange={(e) =>
                          setSelectedContact({
                            ...selectedContact,
                            phone: formatSpacedPhone(e.target.value),
                          })
                        }
                        aria-label="Celular del destinatario"
                        className="w-full border-b border-[#CBD5E1] text-[#475569] font-normal text-[13px] py-0.5 focus:outline-none tabular-nums"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingCustomContact(true)}
                      className="text-left flex-1"
                    >
                      <div className="text-[#0F172A] font-semibold text-[14px] leading-snug">
                        {selectedContact.fullName}
                      </div>
                      <div className="text-[#475569] font-normal text-[13px] mt-0.5 tabular-nums">
                        {getBulletMaskedPhone(selectedContact.phone)}
                      </div>
                    </button>
                  )}
                </div>

                {/* Elige dónde enviar */}
                <div className="mt-5">
                  <h2 className="text-[#0F172A] font-semibold text-[15.5px] mb-2.5">
                    Elige dónde enviar
                  </h2>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsEntitySheetOpen(!isEntitySheetOpen)}
                      data-testid="sip-entity-selector"
                      className="w-full rounded-[12px] border border-[#E2E8F0] p-3.5 flex items-center justify-between bg-white text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-[42px] h-[42px] rounded-[10px] bg-[#E1F4FF] text-[#0099FF] font-semibold text-[16px] flex items-center justify-center shrink-0">
                          {getSingleInitial(selectedEntity || 'Yape')}
                        </div>
                        <div>
                          <div className="text-[#475569] text-[12px] font-normal leading-tight">
                            Destino
                          </div>
                          <div className="text-[#0F172A] font-semibold text-[14.5px] leading-tight mt-0.5">
                            {selectedEntity || 'Yape'}
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#0099FF] stroke-[2.2] transition-transform ${
                          isEntitySheetOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isEntitySheetOpen && (
                      <div className="mt-1.5 rounded-[12px] border border-[#E2E8F0] bg-white shadow-md overflow-hidden divide-y divide-[#F1F5F9]">
                        {['Yape', 'Plin', 'Sip', 'BCP', 'Interbank', 'Ligo'].map(
                          (ent) => (
                            <button
                              key={ent}
                              type="button"
                              onClick={() => {
                                setSelectedEntity(ent);
                                setIsEntitySheetOpen(false);
                              }}
                              className="w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-[#F8FAFC]"
                            >
                              <div className="w-8 h-8 rounded-[8px] bg-[#E1F4FF] text-[#0099FF] font-semibold text-[13px] flex items-center justify-center">
                                {getSingleInitial(ent)}
                              </div>
                              <span className="text-[#0F172A] font-medium text-[14px]">
                                {ent}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Monto a pagar */}
                <div className="mt-5">
                  <h2 className="text-[#0F172A] font-semibold text-[15.5px] mb-2.5">
                    Monto a pagar
                  </h2>

                  <div className="rounded-[12px] border border-[#CBD5E1] px-4 h-[52px] flex items-center bg-white">
                    <input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Monto"
                      aria-label="Monto"
                      className="w-full bg-transparent text-[#0F172A] placeholder-[#94A3B8] text-[15px] font-normal focus:outline-none tabular-nums"
                    />
                  </div>

                  <div className="text-[#64748B] text-[12px] font-normal mt-1.5 mb-3.5">
                    Ingresa un monto entre S/ 1.00 y S/ 500.00
                  </div>

                  <div className="rounded-[12px] border border-[#CBD5E1] px-4 h-[52px] flex items-center bg-white">
                    <input
                      type="text"
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      placeholder="Motivo (Opcional)"
                      aria-label="Motivo (Opcional)"
                      className="w-full bg-transparent text-[#0F172A] placeholder-[#94A3B8] text-[15px] font-normal focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Button: Siguiente */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  data-testid="sip-siguiente-btn"
                  className={`w-full py-3.5 rounded-[12px] font-semibold text-[15.5px] transition-colors ${
                    isSipAmountValid
                      ? 'bg-[#00B2FF] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#94A3B8]'
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============================================================================
  // BCP & INTERBANK FLOW ("Enviar a" — image_2772129a, image_6222d7e3, image_3b45118a)
  // ============================================================================

  // STEP 1: Contact Search & Selection Screen (image_2772129a.png)
  if (step === 'contacts') {
    return (
      <div
        className={`w-full min-h-[100dvh] sm:min-h-[760px] bg-white flex flex-col justify-between select-none ${fontClass} text-[#131B2E]`}
        data-testid="bcp-contacts-screen"
      >
        <div>
{/* Header: Enviar a + X */}
          <div className="px-5 pt-3 pb-3 flex items-center justify-between">
            <h1 className="text-[#1A253A] font-semibold text-[18.5px] ml-8">
              Enviar a
            </h1>
            <button
              type="button"
              onClick={onCancel}
              aria-label="Cerrar Enviar a"
              className="p-1 text-[#1A253A] hover:opacity-75"
            >
              <X className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>

          {/* Search Input + QR Button Row */}
          <div className="px-4 mt-2 flex items-center gap-2.5">
            <div className="flex-1 bg-[#F4F5F7] rounded-[10px] px-3.5 py-3 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#1A253A] shrink-0 stroke-[2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca contacto o ingresa el celular"
                aria-label="Busca contacto o ingresa el celular"
                className="w-full bg-transparent text-[#1A253A] placeholder-[#94A3B8] text-[15px] font-normal focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                handleSelectContact({
                  name: searchQuery.trim() || 'Jorge',
                  fullName:
                    searchQuery.trim() || 'Jorge Luis Ramos Peña',
                  phone: '900 000 011',
                })
              }
              aria-label="Escanear código QR"
              className="w-[46px] h-[46px] rounded-[10px] border border-[#E8EEF5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#002A8D] shrink-0"
            >
              <QrCode className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Custom Contact Option when typing */}
          {searchQuery.trim().length > 0 && (
            <div className="px-5 mt-3">
              <button
                type="button"
                onClick={() => {
                  const digits = searchQuery.replace(/\D/g, '');
                  const isPhone = digits.length >= 6;
                  handleSelectContact({
                    name: isPhone ? 'Nuevo Contacto' : searchQuery.trim(),
                    fullName: isPhone
                      ? 'Jorge Luis Ramos Peña'
                      : searchQuery.trim(),
                    phone: isPhone
                      ? formatSpacedPhone(digits.padEnd(9, '0'))
                      : '900 000 011',
                  });
                }}
                className="w-full py-3.5 border-b border-[#E8EEF5] flex items-center justify-between text-left"
              >
                <div>
                  <div className="text-[#1A253A] font-semibold text-[16px]">
                    {searchQuery.trim()}
                  </div>
                  <div className="text-[#6E7A8A] text-[14.5px] mt-1">
                    900 000 011
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
              </button>
            </div>
          )}

          {/* Contact List matching image_2772129a.png */}
          <div className="px-5 mt-3">
            {filteredContacts.map((contact) => (
              <button
                key={`${contact.name}-${contact.phone}`}
                type="button"
                onClick={() => handleSelectContact(contact)}
                className="w-full py-4 border-b border-[#E8EEF5] text-left block hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="text-[#1A253A] font-semibold text-[16px] leading-snug">
                  {contact.name}
                </div>
                <div className="text-[#6E7A8A] font-normal text-[14.5px] mt-1 tabular-nums">
                  {contact.phone}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // STEP 2 & 3: Amount, Destination & Bottom Sheet (image_6222d7e3.png & image_3b45118a.png)
  return (
    <div
      className={`w-full min-h-[100dvh] sm:min-h-[760px] bg-white flex flex-col justify-between relative select-none ${fontClass} text-[#131B2E] overflow-hidden`}
      data-testid="bcp-amount-screen"
    >
      <div>
{/* Header: <- Enviar a ... X */}
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setStep('contacts')}
              aria-label="Volver a lista de contactos"
              className="p-1 text-[#1A253A] hover:opacity-75"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2]" />
            </button>
            <h1 className="text-[#1A253A] font-semibold text-[18.5px]">
              Enviar a
            </h1>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cerrar"
            className="p-1 text-[#1A253A] hover:opacity-75"
          >
            <X className="w-6 h-6 stroke-[1.8]" />
          </button>
        </div>

        {/* Contact Avatar & Info Centered */}
        <div className="px-6 pt-5 pb-5 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setEditingCustomContact(!editingCustomContact)}
            aria-label="Editar destinatario"
            className="w-11 h-11 rounded-full bg-[#3366FF] text-white font-semibold text-[15px] flex items-center justify-center shadow-2xs"
          >
            {getInitials(selectedContact.name)}
          </button>

          {editingCustomContact ? (
            <div className="mt-2.5 w-full max-w-[240px] space-y-1.5 text-center">
              <input
                type="text"
                value={selectedContact.fullName}
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    name: e.target.value,
                    fullName: e.target.value,
                  })
                }
                aria-label="Nombre del destinatario"
                className="w-full text-center border-b border-[#002A8D] text-[#1A253A] font-semibold text-[16px] py-0.5 focus:outline-none"
              />
              <input
                type="tel"
                value={selectedContact.phone}
                onChange={(e) =>
                  setSelectedContact({
                    ...selectedContact,
                    phone: formatSpacedPhone(e.target.value),
                  })
                }
                aria-label="Celular del destinatario"
                className="w-full text-center border-b border-[#CBD5E1] text-[#1A253A] font-normal text-[14.5px] py-0.5 focus:outline-none tabular-nums"
              />
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditingCustomContact(true)}
                className="text-[#1A253A] font-semibold text-[16.5px] mt-2.5"
              >
                {selectedContact.name}
              </button>
              <div className="text-[#1A253A] font-normal text-[14.5px] mt-0.5 tabular-nums">
                {selectedContact.phone}
              </div>
            </>
          )}

          <div className="w-full h-[1px] bg-[#E8EEF5] mt-5" />
        </div>

        {/* Monto Section */}
        <div className="px-6 pt-2">
          <label
            htmlFor="bcp-monto-input"
            className="block text-[#002A8D] font-semibold text-[16px]"
          >
            Monto
          </label>
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-[#002A8D] font-normal text-[38px] leading-none select-none">
              S/
            </span>
            <input
              id="bcp-monto-input"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-[#002A8D] placeholder-[#94A3B8] font-normal text-[38px] leading-none focus:outline-none tabular-nums"
            />
          </div>
        </div>

        {/* Destino Section */}
        <div className="px-6 mt-7">
          <div className="text-[#002A8D] font-semibold text-[16px] mb-3.5">
            Destino
          </div>

          {/* Entidad financiera Selector Box */}
          <button
            type="button"
            onClick={() => setIsEntitySheetOpen(true)}
            data-testid="bcp-entity-selector"
            className={`w-full rounded-[10px] px-4 h-[56px] flex items-center justify-between text-left relative transition-colors ${
              isEntitySheetOpen
                ? 'border-2 border-[#002A8D]'
                : 'border border-[#CBD5E1]'
            }`}
          >
            {(isEntitySheetOpen || selectedEntity) && (
              <span
                className={`absolute -top-2.5 left-3 bg-white px-1.5 text-[12px] font-medium ${
                  isEntitySheetOpen ? 'text-[#002A8D]' : 'text-[#64748B]'
                }`}
              >
                Entidad financiera
              </span>
            )}

            <span
              className={`text-[15.5px] ${
                selectedEntity && !isEntitySheetOpen
                  ? 'text-[#1A253A] font-semibold'
                  : 'text-[#6E7A8A] font-medium'
              }`}
            >
              {isEntitySheetOpen
                ? ''
                : selectedEntity
                  ? selectedEntity
                  : 'Entidad financiera'}
            </span>

            {/* Solid Triangle Indicator matching image_6222d7e3 and image_3b45118a */}
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              className={`ml-auto ${
                isEntitySheetOpen ? 'text-[#002A8D]' : 'text-[#475569]'
              }`}
            >
              {isEntitySheetOpen ? (
                <path d="M1 8L7 2L13 8H1Z" fill="currentColor" />
              ) : (
                <path d="M1 2L7 8L13 2H1Z" fill="currentColor" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Confirm CTA when an entity is selected */}
      <div className="px-6 pb-8 pt-4">
        {selectedEntity && (
          <button
            type="button"
            onClick={handleConfirmPayment}
            data-testid="bcp-confirm-transfer-btn"
            className="w-full py-3.5 rounded-full bg-[#FF7800] hover:bg-[#E66C00] text-white font-semibold text-[16px] shadow-sm transition-colors"
          >
            Continuar
          </button>
        )}
      </div>

      {/* STEP 3: Bottom Sheet Overlay ("Seleccione una entidad financiera" matching image_3b45118a.png) */}
      {isEntitySheetOpen && (
        <div
          className="absolute inset-0 bg-black/50 z-20 flex flex-col justify-end"
          onClick={() => setIsEntitySheetOpen(false)}
        >
          <div
            className="bg-white rounded-t-[24px] pt-3 pb-7 px-6 z-30"
            onClick={(e) => e.stopPropagation()}
            data-testid="bcp-entity-bottom-sheet"
          >
            {/* Top Gray Drag Handle */}
            <div className="w-11 h-1 bg-[#CBD5E1] rounded-full mx-auto mb-5" />

            <h2 className="text-[#002A8D] font-semibold text-[16.5px] mb-3">
              Seleccione una entidad financiera
            </h2>

            {/* YAPE Option Row */}
            <button
              type="button"
              onClick={() => {
                completePaymentWithEntity(app === 'bcp' ? 'YAPE' : 'Yape');
              }}
              className="w-full py-3.5 border-b border-[#E8EEF5] flex items-center justify-between text-left hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#742384] flex flex-col items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#00E5C3] mb-0.5" />
                  <span className="text-white font-bold italic text-[9.5px] leading-none">
                    yape
                  </span>
                </div>
                <span className="text-[#1A253A] font-semibold text-[15px]">
                  YAPE
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
            </button>

            {showMoreEntities && (
              <div className="divide-y divide-[#E8EEF5]">
                {['Plin', 'Ligo', 'BCP', 'Interbank'].map((ent) => (
                  <button
                    key={ent}
                    type="button"
                    onClick={() => completePaymentWithEntity(ent)}
                    className="w-full py-3.5 flex items-center justify-between text-left hover:bg-[#F8FAFC]"
                  >
                    <span className="text-[#1A253A] font-semibold text-[15px] pl-1">
                      {ent}
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
                  </button>
                ))}
              </div>
            )}

            {/* Ver más entidades in Orange */}
            <button
              type="button"
              onClick={() => setShowMoreEntities(!showMoreEntities)}
              className="mt-5 mx-auto flex items-center justify-center gap-1.5 text-[#FF7800] font-semibold text-[15.5px] hover:opacity-85"
            >
              <span>Ver más entidades</span>
              <ChevronDown
                className={`w-5 h-5 stroke-[2.2] transition-transform ${
                  showMoreEntities ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

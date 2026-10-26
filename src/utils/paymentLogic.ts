export type BankAppId = 'bcp' | 'interbank' | 'sip';
export type ScreenMode = 'home' | 'transfer' | 'confirmation';
export type InterbankTab = 'operaciones' | 'productos';

export interface PaymentReceipt {
  id: string;
  app: BankAppId;
  amount: number;
  recipientName: string;
  phoneNumber: string;
  maskedPhone: string;
  destination: string;
  sourceAccount: string;
  sourceAccountMasked: string;
  commission: string;
  dateFormatted: string;
  operationCode: string;
}

export interface PaymentFormInput {
  recipientName: string;
  phoneNumber: string;
  amount: string;
  destination: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  parsedAmount?: number;
}

export interface AppBankState {
  bcp: {
    userName: string;
    hideBalances: boolean;
    savingsBalance: number;
    creditConsumed: number;
    receipt: PaymentReceipt;
  };
  interbank: {
    activeTab: InterbankTab;
    hideBalances: boolean;
    solesBalance: number;
    dollarsBalance: number;
    receipt: PaymentReceipt;
  };
  sip: {
    userName: string;
    hideBalances: boolean;
    debitBalance: number;
    rewardsBalance: number;
    receipt: PaymentReceipt;
  };
}

export function formatAmountNumber(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function generatePrefixedCode(app: BankAppId, rawDigits?: string): string {
  const cleanDigits = (rawDigits || '').replace(/\D/g, '');
  const fallback =
    app === 'bcp'
      ? '04740517'
      : app === 'interbank'
        ? '00607032'
        : '389317388';
  const digits = cleanDigits.length >= 6 ? cleanDigits : fallback;
  return `${digits}`;
}

export function formatPhoneForReceipt(phoneNumber: string, app: BankAppId): string {
  const digits = phoneNumber.replace(/\D/g, '');
  const last3 = digits.slice(-3) || '000';
  if (app === 'bcp') {
    return '*** **';
  }
  if (app === 'sip') {
    return `••• ••• ${last3}`;
  }
  // Interbank format: 900 000 002
  const padded = digits.padEnd(9, '0').slice(0, 9);
  return `${padded.slice(0, 3)} ${padded.slice(3, 6)} ${padded.slice(6, 9)}`;
}

export function formatDateForApp(app: BankAppId, date = new Date(2026, 9, 25, 12, 0)): string {
  const monthsFull = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  const monthsLower = monthsFull.map((m) => m.toLowerCase());
  const monthsShort = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ];
  const daysFull = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
  ];

  const dayName = daysFull[date.getDay()];
  const dayNum = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();
  const hours24 = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const isPm = hours24 >= 12;
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  if (app === 'bcp') {
    return `${dayName} ${dayNum} ${monthsFull[monthIdx]} ${year} - ${hours12}:${minutes} ${isPm ? 'pm.' : 'am.'}`;
  }
  if (app === 'interbank') {
    return `${dayNum} ${monthsShort[monthIdx]} ${year}   ${hours12}:${minutes} ${isPm ? 'PM' : 'AM'}`;
  }
  return `${dayNum} ${monthsLower[monthIdx]} ${year} - ${hours12}:${minutes} ${isPm ? 'pm' : 'am'}`;
}

export function validatePaymentInput(input: PaymentFormInput): ValidationResult {
  const name = input.recipientName.trim();
  if (!name || name.length < 3) {
    return { valid: false, error: 'Ingresa un nombre de destinatario ficticio válido.' };
  }

  const digits = input.phoneNumber.replace(/\D/g, '');
  if (digits.length !== 9) {
    return { valid: false, error: 'Ingresa un número de celular ficticio de 9 dígitos.' };
  }

  const parsedAmount = Number(input.amount);
  if (!input.amount.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    return { valid: false, error: 'Ingresa un importe mayor a S/ 0.00.' };
  }

  if (parsedAmount > 2000) {
    return { valid: false, error: 'El importe máximo por operación de prueba es S/ 2,000.00.' };
  }

  return { valid: true, parsedAmount: Math.round(parsedAmount * 100) / 100 };
}

export function createReceiptFromFlow(
  app: BankAppId,
  input: PaymentFormInput,
  customSeed?: string,
  customDate?: string
): PaymentReceipt {
  const validation = validatePaymentInput(input);
  const amount = validation.parsedAmount ?? (Number(input.amount) || 1);
  const cleanName = input.recipientName.trim();
  const recipientName = app === 'sip' ? cleanName.toUpperCase() : cleanName;

  const seed =
    customSeed ||
    String(
      Math.abs(
        cleanName.split('').reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 10000000) +
          Math.round(amount * 100)
      )
    ).slice(0, app === 'sip' ? 9 : 8);

  return {
    id: `${app}-${Date.now()}`,
    app,
    amount,
    recipientName,
    phoneNumber: input.phoneNumber,
    maskedPhone: formatPhoneForReceipt(input.phoneNumber, app),
    destination: input.destination || (app === 'bcp' ? 'YAPE' : app === 'interbank' ? 'Ligo' : 'Yape'),
    sourceAccount: app === 'bcp' ? 'Cuenta Yape Soles' : app === 'interbank' ? 'Cuenta Simple Soles' : 'Tarjeta de Débito (Oh!pay)',
    sourceAccountMasked: app === 'bcp' ? '**** 6026' : app === 'interbank' ? '**** 1579' : '**** 4753',
    commission: app === 'bcp' ? 'Gratis' : 'GRATIS',
    dateFormatted: customDate || formatDateForApp(app),
    operationCode: generatePrefixedCode(app, seed),
  };
}

export const INITIAL_BANK_STATE: AppBankState = {
  bcp: {
    userName: 'Carlos',
    hideBalances: true,
    savingsBalance: 1250.0,
    creditConsumed: 340.5,
    receipt: {
      id: 'bcp-initial',
      app: 'bcp',
      amount: 1.0,
      recipientName: 'María Torres D',
      phoneNumber: '900000001',
      maskedPhone: '*** **',
      destination: 'YAPE',
      sourceAccount: 'Cuenta Yape Soles',
      sourceAccountMasked: '**** 6026',
      commission: 'Gratis',
      dateFormatted: 'Domingo 25 Octubre 2026 - 12:00 pm.',
      operationCode: '04740517',
    },
  },
  interbank: {
    activeTab: 'operaciones',
    hideBalances: false,
    solesBalance: 0.0,
    dollarsBalance: 0.0,
    receipt: {
      id: 'interbank-initial',
      app: 'interbank',
      amount: 240.0,
      recipientName: 'Rosa Elena Vargas Prado',
      phoneNumber: '900000002',
      maskedPhone: '900 000 002',
      destination: 'Ligo',
      sourceAccount: 'Cuenta Simple Soles',
      sourceAccountMasked: '**** 1579',
      commission: 'GRATIS',
      dateFormatted: '18 Oct 2026   11:43 PM',
      operationCode: '00607032',
    },
  },
  sip: {
    userName: 'Lucía',
    hideBalances: false,
    debitBalance: 0.0,
    rewardsBalance: 0.32,
    receipt: {
      id: 'sip-initial',
      app: 'sip',
      amount: 160.0,
      recipientName: 'ELENA SOFIA RIOS CASTRO',
      phoneNumber: '900000003',
      maskedPhone: '••• ••• 003',
      destination: 'Yape',
      sourceAccount: 'Tarjeta de Débito (Oh!pay)',
      sourceAccountMasked: '**** 4753',
      commission: 'GRATIS',
      dateFormatted: '9 octubre 2026 - 12:46 am',
      operationCode: '389317388',
    },
  },
};

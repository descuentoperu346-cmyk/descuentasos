import React, { useState } from 'react';
import {
  BankAppId,
  ScreenMode,
  InterbankTab,
  AppBankState,
  INITIAL_BANK_STATE,
  PaymentFormInput,
  createReceiptFromFlow,
} from './utils/paymentLogic';
import { BcpHomeScreen, BcpConfirmationScreen } from './components/BcpScreens';
import {
  InterbankHomeScreen,
  InterbankConfirmationScreen,
} from './components/InterbankScreens';
import { SipHomeScreen, SipConfirmationScreen } from './components/SipScreens';
import { PaymentFlowScreen } from './components/PaymentFlowScreen';
import { LandingScreen } from './components/LandingScreen';

export default function App() {
  const [activeApp, setActiveApp] = useState<BankAppId | null>(null);
  const [screenMode, setScreenMode] = useState<ScreenMode>('home');
  const [bankState, setBankState] = useState<AppBankState>(INITIAL_BANK_STATE);

  const handleToggleBalances = (app: BankAppId) => {
    setBankState((prev) => ({
      ...prev,
      [app]: {
        ...prev[app],
        hideBalances: !prev[app].hideBalances,
      },
    }));
  };

  const handleGoHome = () => {
    setScreenMode('home');
    setActiveApp(null);
  };

  const handleInterbankTabChange = (tab: InterbankTab) => {
    setBankState((prev) => ({
      ...prev,
      interbank: {
        ...prev.interbank,
        activeTab: tab,
      },
    }));
  };

  const handleExecutePayment = (app: BankAppId, input: PaymentFormInput) => {
    const newReceipt = createReceiptFromFlow(app, input);
    const amt = Number(input.amount) || 0;

    setBankState((prev) => {
      if (app === 'bcp') {
        return {
          ...prev,
          bcp: {
            ...prev.bcp,
            savingsBalance: Math.max(0, prev.bcp.savingsBalance - amt),
            receipt: newReceipt,
          },
        };
      }
      if (app === 'interbank') {
        return {
          ...prev,
          interbank: {
            ...prev.interbank,
            solesBalance: Math.max(0, prev.interbank.solesBalance - amt),
            receipt: newReceipt,
          },
        };
      }
      return {
        ...prev,
        sip: {
          ...prev.sip,
          debitBalance: Math.max(0, prev.sip.debitBalance - amt),
          receipt: newReceipt,
        },
      };
    });

    setScreenMode('confirmation');
  };

  const renderDeviceScreen = (app: BankAppId) => {
    if (screenMode === 'transfer') {
      return (
        <PaymentFlowScreen
          app={app}
          initialInput={{
            recipientName: bankState[app].receipt.recipientName,
            phoneNumber: bankState[app].receipt.phoneNumber,
            amount: String(bankState[app].receipt.amount),
            destination: bankState[app].receipt.destination,
          }}
          onCancel={() => setScreenMode('home')}
          onSubmitPayment={(input) => handleExecutePayment(app, input)}
        />
      );
    }

    if (screenMode === 'confirmation') {
      if (app === 'bcp') {
        return (
          <BcpConfirmationScreen
            receipt={bankState.bcp.receipt}
            onBack={() => setScreenMode('home')}
          />
        );
      }
      if (app === 'interbank') {
        return (
          <InterbankConfirmationScreen
            receipt={bankState.interbank.receipt}
            onBack={() => setScreenMode('home')}
          />
        );
      }
      return (
        <SipConfirmationScreen
          receipt={bankState.sip.receipt}
          onBack={() => setScreenMode('home')}
        />
      );
    }

    // Default: ScreenMode === 'home'
    if (app === 'bcp') {
      return (
        <BcpHomeScreen
          userName={bankState.bcp.userName}
          hideBalances={bankState.bcp.hideBalances}
          savingsBalance={bankState.bcp.savingsBalance}
          creditConsumed={bankState.bcp.creditConsumed}
          onToggleBalances={() => handleToggleBalances('bcp')}
          onStartPayment={() => setScreenMode('transfer')}
          onOpenConfirmation={() => setScreenMode('confirmation')}
          onGoHome={handleGoHome}
        />
      );
    }

    if (app === 'interbank') {
      return (
        <InterbankHomeScreen
          activeTab={bankState.interbank.activeTab}
          hideBalances={bankState.interbank.hideBalances}
          solesBalance={bankState.interbank.solesBalance}
          dollarsBalance={bankState.interbank.dollarsBalance}
          onTabChange={handleInterbankTabChange}
          onToggleBalances={() => handleToggleBalances('interbank')}
          onStartPayment={() => setScreenMode('transfer')}
          onOpenConfirmation={() => setScreenMode('confirmation')}
          onGoHome={handleGoHome}
        />
      );
    }

    return (
      <SipHomeScreen
        userName={bankState.sip.userName}
        hideBalances={bankState.sip.hideBalances}
        debitBalance={bankState.sip.debitBalance}
        rewardsBalance={bankState.sip.rewardsBalance}
        onToggleBalances={() => handleToggleBalances('sip')}
        onStartPayment={() => setScreenMode('transfer')}
        onOpenConfirmation={() => setScreenMode('confirmation')}
          onGoHome={handleGoHome}
      />
    );
  };

  if (activeApp === null) {
    return <LandingScreen onSelectApp={setActiveApp} />;
  }

  return (
    <main className="min-h-[100dvh] w-full bg-white sm:bg-[#E5E9EF] flex flex-col items-center sm:justify-center sm:py-6 overflow-x-hidden">
      <div className="w-full max-w-[420px] flex-1 sm:flex-none bg-white sm:rounded-[28px] sm:shadow-[0_24px_60px_rgba(15,23,42,0.25)] overflow-clip">
        {renderDeviceScreen(activeApp)}
      </div>
    </main>
  );
}

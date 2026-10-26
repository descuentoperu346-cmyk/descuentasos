import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatAmountNumber,
  generatePrefixedCode,
  formatPhoneForReceipt,
  validatePaymentInput,
  createReceiptFromFlow,
} from './paymentLogic';

test('formatAmountNumber formats decimals to 2 places', () => {
  assert.equal(formatAmountNumber(1), '1.00');
  assert.equal(formatAmountNumber(160), '160.00');
  assert.equal(formatAmountNumber(240.5), '240.50');
});

test('generatePrefixedCode always prefixes with SIM-', () => {
  assert.equal(generatePrefixedCode('bcp', '04740517'), 'SIM-04740517');
  assert.equal(generatePrefixedCode('interbank', '00607032'), 'SIM-00607032');
  assert.equal(generatePrefixedCode('sip', '389317388'), 'SIM-389317388');
});

test('formatPhoneForReceipt formats according to each app visual reference', () => {
  assert.equal(formatPhoneForReceipt('900000001', 'bcp'), '*** **');
  assert.equal(formatPhoneForReceipt('900000003', 'sip'), '••• ••• 003');
  assert.equal(formatPhoneForReceipt('900000002', 'interbank'), '900 000 002');
});

test('validatePaymentInput validates required fields and bounds', () => {
  const invalidName = validatePaymentInput({
    recipientName: 'A',
    phoneNumber: '900000001',
    amount: '25.00',
    destination: 'Yape',
  });
  assert.equal(invalidName.valid, false);

  const invalidPhone = validatePaymentInput({
    recipientName: 'Carlos Mendoza',
    phoneNumber: '123',
    amount: '25.00',
    destination: 'Yape',
  });
  assert.equal(invalidPhone.valid, false);

  const invalidAmount = validatePaymentInput({
    recipientName: 'Carlos Mendoza',
    phoneNumber: '900000001',
    amount: '0',
    destination: 'Yape',
  });
  assert.equal(invalidAmount.valid, false);

  const valid = validatePaymentInput({
    recipientName: 'Carlos Mendoza',
    phoneNumber: '900000001',
    amount: '85.50',
    destination: 'Plin',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.parsedAmount, 85.5);
});

test('createReceiptFromFlow links recipient, amount, and prefixed code', () => {
  const receipt = createReceiptFromFlow('sip', {
    recipientName: 'Lucia Paredes Demo',
    phoneNumber: '900000004',
    amount: '75.00',
    destination: 'Yape',
  });
  assert.equal(receipt.amount, 75);
  assert.equal(receipt.recipientName, 'LUCIA PAREDES DEMO');
  assert.equal(receipt.maskedPhone, '••• ••• 004');
  assert.equal(receipt.destination, 'Yape');
  assert.ok(receipt.operationCode.startsWith('SIM-'));
});

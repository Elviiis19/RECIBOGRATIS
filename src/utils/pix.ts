import { cpf, cnpj } from 'cpf-cnpj-validator';

export function formatPixKey(key: string): string {
  const formattedKey = key.trim();
  const numericKey = formattedKey.replace(/\D/g, '');

  // Is it an email?
  if (formattedKey.includes('@')) {
    return formattedKey; // Emails should have spaces removed ideally, but let's just trim for now
  }
  
  // Is it a random key (UUID)?
  if (formattedKey.includes('-') && formattedKey.length >= 32 && !formattedKey.includes('@')) {
    return formattedKey.replace(/\s/g, ''); // remove spaces
  }

  // Is it a CPF (11 digits)?
  if (numericKey.length === 11) {
    if (cpf.isValid(numericKey)) {
      return numericKey; // Valid CPF, MUST be numbers only
    }
    // If not a valid CPF, it's very likely a phone number
    return '+55' + numericKey;
  }

  // Is it a CNPJ (14 digits)?
  if (numericKey.length === 14) {
    if (cnpj.isValid(numericKey)) {
       return numericKey; // Valid CNPJ, MUST be numbers only
    }
  }

  // Is it a 10 digit phone number (landline)?
  if (numericKey.length === 10) {
    return '+55' + numericKey;
  }

  // If it's a phone number with DDI typed by the user like +55 (11) 99999-9999 (13 digits)
  if (numericKey.length === 13 || numericKey.length === 12) {
      if (numericKey.startsWith('55')) {
          return '+' + numericKey;
      }
  }

  // Fallback: Just return what the user provided without spaces
  return formattedKey.replace(/\s/g, '');
}

export function generatePixPayload(key: string, name: string, city: string, amount?: string, txid: string = '***') {
  const tlv = (tag: string, value: string) => {
    const valStr = String(value);
    const len = valStr.length.toString().padStart(2, '0');
    return `${tag}${len}${valStr}`;
  };

  const finalKey = formatPixKey(key);


  let formattedAmount = '';
  if (amount) {
    const numericAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(numericAmount) && numericAmount > 0) {
      formattedAmount = numericAmount.toFixed(2);
    }
  }

  let payload = '';
  payload += tlv('00', '01');
  payload += tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', finalKey));
  payload += tlv('52', '0000');
  payload += tlv('53', '986');
  if (formattedAmount) {
    payload += tlv('54', formattedAmount);
  }
  payload += tlv('58', 'BR');
  
  const cleanName = name.replace(/[^\w\s]/gi, '').substring(0, 25).trim() || 'RECEBEDOR';
  const cleanCity = city.replace(/[^\w\s]/gi, '').substring(0, 15).trim() || 'CIDADE';
  
  payload += tlv('59', cleanName);
  payload += tlv('60', cleanCity);
  payload += tlv('62', tlv('05', txid));

  payload += '6304';

  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  
  const crcHex = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  return payload + crcHex;
}

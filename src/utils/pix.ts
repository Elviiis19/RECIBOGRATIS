export function generatePixPayload(key: string, name: string, city: string, amount?: string, txid: string = '***') {
  const tlv = (tag: string, value: string) => {
    const valStr = String(value);
    const len = valStr.length.toString().padStart(2, '0');
    return `${tag}${len}${valStr}`;
  };

  let formattedAmount = '';
  if (amount) {
    const numericAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(numericAmount) && numericAmount > 0) {
      formattedAmount = numericAmount.toFixed(2);
    }
  }

  let payload = '';
  payload += tlv('00', '01');
  payload += tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', key));
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

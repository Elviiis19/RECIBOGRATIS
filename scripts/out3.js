(() => {
  // node_modules/cpf-cnpj-validator/dist/cpf-cnpj-validator.es.js
  var BLACKLIST = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
    "12345678909"
  ];
  var STRICT_STRIP_REGEX = /[.-]/g;
  var LOOSE_STRIP_REGEX = /[^\d]/g;
  var verifierDigit = (digits) => {
    const numbers = digits.split("").map((number) => {
      return parseInt(number, 10);
    });
    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
    return mod < 2 ? 0 : 11 - mod;
  };
  var strip = (number, strict) => {
    const regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return (number || "").replace(regex, "");
  };
  var format = (number) => {
    return strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };
  var isValid = (number, strict) => {
    const stripped = strip(number, strict);
    if (!stripped) {
      return false;
    }
    if (stripped.length !== 11) {
      return false;
    }
    if (BLACKLIST.includes(stripped)) {
      return false;
    }
    let numbers = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return numbers.substr(-2) === stripped.substr(-2);
  };
  var generate = (formatted) => {
    let numbers = "";
    for (let i = 0; i < 9; i += 1) {
      numbers += Math.floor(Math.random() * 9);
    }
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);
    return formatted ? format(numbers) : numbers;
  };
  var cpf = {
    verifierDigit,
    strip,
    format,
    isValid,
    generate
  };
  var BLACKLIST$1 = [
    "00000000000000",
    "11111111111111",
    "22222222222222",
    "33333333333333",
    "44444444444444",
    "55555555555555",
    "66666666666666",
    "77777777777777",
    "88888888888888",
    "99999999999999"
  ];
  var STRICT_STRIP_REGEX$1 = /[-\\/.]/g;
  var LOOSE_STRIP_REGEX$1 = /[^\d]/g;
  var verifierDigit$1 = (digits) => {
    let index = 2;
    const reverse = digits.split("").reduce((buffer, number) => {
      return [parseInt(number, 10)].concat(buffer);
    }, []);
    const sum = reverse.reduce((buffer, number) => {
      buffer += number * index;
      index = index === 9 ? 2 : index + 1;
      return buffer;
    }, 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };
  var strip$1 = (number, strict) => {
    const regex = strict ? STRICT_STRIP_REGEX$1 : LOOSE_STRIP_REGEX$1;
    return (number || "").replace(regex, "");
  };
  var format$1 = (number) => {
    return strip$1(number).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };
  var isValid$1 = (number, strict) => {
    const stripped = strip$1(number, strict);
    if (!stripped) {
      return false;
    }
    if (stripped.length !== 14) {
      return false;
    }
    if (BLACKLIST$1.includes(stripped)) {
      return false;
    }
    let numbers = stripped.substr(0, 12);
    numbers += verifierDigit$1(numbers);
    numbers += verifierDigit$1(numbers);
    return numbers.substr(-2) === stripped.substr(-2);
  };
  var generate$1 = (formatted) => {
    let numbers = "";
    for (let i = 0; i < 12; i += 1) {
      numbers += Math.floor(Math.random() * 9);
    }
    numbers += verifierDigit$1(numbers);
    numbers += verifierDigit$1(numbers);
    return formatted ? format$1(numbers) : numbers;
  };
  var cnpj = {
    verifierDigit: verifierDigit$1,
    strip: strip$1,
    format: format$1,
    isValid: isValid$1,
    generate: generate$1
  };

  // src/utils/pix.ts
  function formatPixKey(key) {
    const formattedKey = key.trim();
    const numericKey = formattedKey.replace(/\D/g, "");
    if (formattedKey.includes("@")) {
      return formattedKey;
    }
    if (formattedKey.includes("-") && formattedKey.length >= 32 && !formattedKey.includes("@")) {
      return formattedKey;
    }
    if (numericKey.length === 11) {
      if (cpf.isValid(numericKey)) {
        return numericKey;
      }
      if (!formattedKey.startsWith("+")) {
        return "+55" + numericKey;
      }
    }
    if (numericKey.length === 14) {
      if (cnpj.isValid(numericKey)) {
        return numericKey;
      }
    }
    if (numericKey.length === 10 && !formattedKey.startsWith("+")) {
      return "+55" + numericKey;
    }
    return formattedKey;
  }
  function generatePixPayload(key, name, city, amount, txid = "***") {
    const tlv = (tag, value) => {
      const valStr = String(value);
      const len = valStr.length.toString().padStart(2, "0");
      return `${tag}${len}${valStr}`;
    };
    const finalKey = formatPixKey(key);
    let formattedAmount = "";
    if (amount) {
      const numericAmount = parseFloat(amount.replace(/\./g, "").replace(",", "."));
      if (!isNaN(numericAmount) && numericAmount > 0) {
        formattedAmount = numericAmount.toFixed(2);
      }
    }
    let payload = "";
    payload += tlv("00", "01");
    payload += tlv("26", tlv("00", "br.gov.bcb.pix") + tlv("01", finalKey));
    payload += tlv("52", "0000");
    payload += tlv("53", "986");
    if (formattedAmount) {
      payload += tlv("54", formattedAmount);
    }
    payload += tlv("58", "BR");
    const cleanName = name.replace(/[^\w\s]/gi, "").substring(0, 25).trim() || "RECEBEDOR";
    const cleanCity = city.replace(/[^\w\s]/gi, "").substring(0, 15).trim() || "CIDADE";
    payload += tlv("59", cleanName);
    payload += tlv("60", cleanCity);
    payload += tlv("62", tlv("05", txid));
    payload += "6304";
    let crc = 65535;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 32768) !== 0) {
          crc = crc << 1 ^ 4129;
        } else {
          crc = crc << 1;
        }
      }
    }
    const crcHex = (crc & 65535).toString(16).toUpperCase().padStart(4, "0");
    return payload + crcHex;
  }

  // scripts/testPixKey.ts
  console.log("Phone without +55:", generatePixPayload("11999999999", "Nome", "Cidade", "10,00"));
  console.log("Phone with +55:", generatePixPayload("+5511999999999", "Nome", "Cidade", "10,00"));
})();
/*! Bundled license information:

cpf-cnpj-validator/dist/cpf-cnpj-validator.es.js:
  (*!
   * cpf-cnpj-validator v1.0.3
   * (c) 2020-present Carvalho, Vinicius Luiz <carvalho.viniciusluiz@gmail.com>
   * Released under the MIT License.
   *)
*/

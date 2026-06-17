(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __glob = (map) => (path) => {
    var fn = map[path];
    if (fn) return fn();
    throw new Error("Module not found in bundle: " + path);
  };
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/numero-por-extenso/lib/nomesExtenso/nomes.js
  var require_nomes = __commonJS({
    "node_modules/numero-por-extenso/lib/nomesExtenso/nomes.js"(exports, module) {
      var primeiraCasa = [
        "zero",
        "um",
        "dois",
        "tr\xEAs",
        "quatro",
        "cinco",
        "seis",
        "sete",
        "oito",
        "nove"
      ];
      var segundaCasa = [
        "",
        "dez",
        "vinte",
        "trinta",
        "quarenta",
        "cinquenta",
        "sessenta",
        "setenta",
        "oitenta",
        "noventa"
      ];
      var terceiraCasa = [
        "",
        "cento",
        "duzentos",
        "trezentos",
        "quatrocentos",
        "quinhentos",
        "seiscentos",
        "setecentos",
        "oitocentos",
        "novecentos"
      ];
      module.exports = [
        primeiraCasa,
        segundaCasa,
        terceiraCasa
      ];
    }
  });

  // node_modules/numero-por-extenso/lib/nomesExtenso/dezenas.js
  var require_dezenas = __commonJS({
    "node_modules/numero-por-extenso/lib/nomesExtenso/dezenas.js"(exports, module) {
      module.exports = [
        "dez",
        "onze",
        "doze",
        "treze",
        "quatorze",
        "quinze",
        "dezesseis",
        "dezessete",
        "dezoito",
        "dezenove"
      ];
    }
  });

  // node_modules/numero-por-extenso/lib/nomesExtenso/casas.js
  var require_casas = __commonJS({
    "node_modules/numero-por-extenso/lib/nomesExtenso/casas.js"(exports, module) {
      module.exports = [
        "",
        "mil",
        "milh\xF5es",
        "bilh\xF5es",
        "trilh\xF5es",
        "quatrilh\xF5es",
        "quintilh\xF5es",
        "sextilh\xF5es",
        "septilh\xF5es",
        "octilh\xF5es",
        "nonilh\xF5es",
        "decilh\xF5es",
        "undecilh\xF5es",
        "duodecilh\xF5es",
        "tredecilh\xF5es"
      ];
    }
  });

  // node_modules/numero-por-extenso/lib/common.js
  var require_common = __commonJS({
    "node_modules/numero-por-extenso/lib/common.js"(exports, module) {
      var nomes = require_nomes();
      var dezenas = require_dezenas();
      var casas = require_casas();
      module.exports = {
        getGroup,
        numberInFull
      };
      function getGroup(number) {
        if (number == "100")
          return "cem";
        let output = "";
        for (let i = 0; i < number.length; i++) {
          let c = number[i];
          if (output) {
            if (c == "0")
              continue;
            output += " e ";
          }
          if ((number.length == 2 && i == 0 || number.length == 3 && i == 1) && c == "1")
            return output + dezenas[+number[i + 1]];
          output += nomes[number.length - i - 1][+c];
        }
        return output;
      }
      function numberInFull(number) {
        let output = [], numbers = [];
        number = number.toString();
        while (number.length > 0) {
          let piece = number.length <= 3 ? number : number.substr(number.length - 3, 3);
          numbers.push({ number: +piece, name: getGroup(piece) });
          number = number.length - 3 > 0 ? number.substr(0, number.length - 3) : "";
        }
        if (numbers.length == 1 && numbers[0].number == 0)
          return numbers[0].name;
        for (var i = numbers.length - 1; i > 0; i--)
          if (numbers[i].number != 0)
            output.push(numbers[i].name + " " + (numbers[i].number == 1 ? casas[i].replace("\xF5es", "\xE3o") : casas[i]));
        if (numbers.length && numbers[0].number > 0)
          output.push(`${numbers.length > 1 && (numbers[0].number < 100 || numbers[0].number % 100 == 0) ? "e " : ""}${numbers[0].name}`);
        else if (output.length > 1)
          output.splice(output.length - 1, 0, "e");
        return output.join(" ");
      }
    }
  });

  // node_modules/numero-por-extenso/lib/estilos/monetario.js
  var require_monetario = __commonJS({
    "node_modules/numero-por-extenso/lib/estilos/monetario.js"(exports, module) {
      var common = require_common();
      module.exports = porExtenso2;
      function porExtenso2(numero) {
        let numberStr = numero.toString().replace("-", "").split("."), numberBefore = numberStr[0] || 0, numberAfter = (numberStr[1] + "00").substr(0, 2);
        let numberBeforeExtended = (numero < 0 ? "menos " : "") + common.numberInFull(numberBefore), numberAfterExtended = common.numberInFull(numberAfter);
        return (numberBefore > 0 ? numberBeforeExtended + (numberBefore == 1 ? " real" : " reais") : "") + (numberAfter > 0 ? (numberBefore > 0 ? " e " : "") + numberAfterExtended + (numberAfter == 1 ? " centavo" : " centavos") : "");
      }
    }
  });

  // node_modules/numero-por-extenso/lib/nomesExtenso/casasDecimais.js
  var require_casasDecimais = __commonJS({
    "node_modules/numero-por-extenso/lib/nomesExtenso/casasDecimais.js"(exports, module) {
      module.exports = [
        "d\xE9cimo",
        "cent\xE9simo",
        "mil\xE9simo",
        "d\xE9cimo de mil\xE9simo",
        "cent\xE9simo de mil\xE9simo",
        "milion\xE9simo",
        "d\xE9cimo de milion\xE9simo",
        "cent\xE9simo de milion\xE9simo",
        "bilion\xE9simo",
        "d\xE9cimo de bilion\xE9simo",
        "cent\xE9simo de bilion\xE9simo",
        "trilion\xE9simo",
        "d\xE9cimo de trilion\xE9simo",
        "cent\xE9simo de trilion\xE9simo",
        "quatrilion\xE9simo",
        "d\xE9cimo de quatrilion\xE9simo",
        "cent\xE9simo de quatrilion\xE9simo",
        "quintilion\xE9simo",
        "d\xE9cimo de quintilion\xE9simo",
        "cent\xE9simo de quintilion\xE9simo"
      ];
    }
  });

  // node_modules/numero-por-extenso/lib/estilos/normal.js
  var require_normal = __commonJS({
    "node_modules/numero-por-extenso/lib/estilos/normal.js"(exports, module) {
      var common = require_common();
      var casasDecimais = require_casasDecimais();
      module.exports = porExtenso2;
      function porExtenso2(numero) {
        let numberStr = numero.toString().replace("-", "").split("."), numberBefore = numberStr[0] || 0, numberAfter = numberStr[1];
        let numberBeforeExtended = (numero < 0 ? "menos " : "") + common.numberInFull(numberBefore), numberAfterExtended = "";
        if (+numberAfter) {
          numberAfter = numberAfter.replace(/0+$/g, "");
          numberAfterExtended = ` v\xEDrgula ${common.numberInFull(numberAfter)}`;
          let casaDecimal = descobreNomeCasaDecimal(numberAfter);
          if (casaDecimal)
            numberAfterExtended += ` ${casaDecimal}`;
        }
        return numberBeforeExtended + numberAfterExtended;
      }
      function descobreNomeCasaDecimal(numberAfter) {
        let casaDecimal = casasDecimais[numberAfter.length - 1] || "";
        if (casaDecimal && +numberAfter !== 1) {
          casaDecimal = casaDecimal.split(" ");
          casaDecimal[0] = casaDecimal[0] + "s";
          casaDecimal = casaDecimal.join(" ");
        }
        return casaDecimal;
      }
    }
  });

  // node_modules/numero-por-extenso/lib/estilos/porcentagem.js
  var require_porcentagem = __commonJS({
    "node_modules/numero-por-extenso/lib/estilos/porcentagem.js"(exports, module) {
      var normal = require_normal();
      module.exports = porExtenso2;
      function porExtenso2(numero) {
        return normal(numero) + " por cento";
      }
    }
  });

  // require("./lib/estilos/**/*") in node_modules/numero-por-extenso/index.js
  var globRequire_lib_estilos;
  var init_ = __esm({
    'require("./lib/estilos/**/*") in node_modules/numero-por-extenso/index.js'() {
      globRequire_lib_estilos = __glob({
        "./lib/estilos/monetario.js": () => require_monetario(),
        "./lib/estilos/normal.js": () => require_normal(),
        "./lib/estilos/porcentagem.js": () => require_porcentagem()
      });
    }
  });

  // node_modules/numero-por-extenso/index.js
  var require_numero_por_extenso = __commonJS({
    "node_modules/numero-por-extenso/index.js"(exports, module) {
      init_();
      var estilos = {
        normal: "normal",
        monetario: "monetario",
        porcentagem: "porcentagem"
      };
      module.exports = {
        porExtenso: porExtenso2,
        estilo: estilos
      };
      function porExtenso2(numero, estilo2 = estilos.normal) {
        if (!estilos[estilo2])
          throw new Error(`Estilo "${estilo2}" inv\xE1lido. Poss\xEDveis valores: normal, monetario, porcentagem`);
        return globRequire_lib_estilos("./lib/estilos/" + estilo2)(numero);
      }
    }
  });

  // scripts/testgetValorExtenso2.ts
  var import_numero_por_extenso = __toESM(require_numero_por_extenso(), 1);
  var getValorExtenso = (valorStr) => {
    if (!valorStr) return "";
    try {
      const cleanStr = valorStr.replace(",", ".");
      const numericValue = parseFloat(cleanStr);
      console.log("numericValue", numericValue);
      if (isNaN(numericValue)) return "";
      return (0, import_numero_por_extenso.porExtenso)(numericValue, import_numero_por_extenso.estilo.monetario);
    } catch (e) {
      console.error(e);
      return "";
    }
  };
  console.log("Test 22,22:", getValorExtenso("22,22"));
  console.log("Test 2.222,22:", getValorExtenso("2.222,22"));
})();

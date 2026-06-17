(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // node_modules/extenso/dist/extenso.min.js
  var require_extenso_min = __commonJS({
    "node_modules/extenso/dist/extenso.min.js"(exports, module) {
      ((e, t) => {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.extenso = t() : e.extenso = t();
      })("undefined" != typeof self ? self : exports, function() {
        return n = [function(e) {
          e.exports = JSON.parse('{"BRL":{"singular":"real","plural":"reais","subunit":{"singular":"centavo","plural":"centavos"}},"CVE":{"singular":"escudo","plural":"escudos","subunit":{"singular":"c\xEAntimo","plural":"c\xEAntimos"}},"EUR":{"singular":"euro","plural":"euros","subunit":{"singular":"c\xEAntimo","plural":"c\xEAntimos"}},"MZN":{"singular":"metical","plural":"meticais","subunit":{"singular":"centavos","plural":"centavos"}}}');
        }, function(e, t, n2) {
          function f(e2) {
            return (f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
              return typeof e3;
            } : function(e3) {
              return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
            })(e2);
          }
          var r2 = Object.prototype.toString, s = n2(4), p = e.exports = function(e2) {
            for (var t2, n3, r3 = 0, o2 = arguments.length, i = new Array(1 < o2 ? o2 - 1 : 0), a = 1; a < o2; a++) i[a - 1] = arguments[a];
            for (e2 = (e2 = ("object" === f(t2 = e2) ? null === t2 : "function" != typeof t2) ? i[r3++] : e2) || {}; r3 < i.length; r3++) if (d(i[r3])) {
              for (var u = 0, c = Object.keys(i[r3]); u < c.length; u++) {
                var l = c[u];
                "__proto__" !== (n3 = l) && "constructor" !== n3 && "prototype" !== n3 && (d(e2[l]) && d(i[r3][l]) ? p(e2[l], i[r3][l]) : e2[l] = i[r3][l]);
              }
              s(e2, i[r3]);
            }
            return e2;
          };
          function d(e2) {
            return "function" == typeof e2 || "[object Object]" === r2.call(e2);
          }
        }, function(e, t) {
          function n2(c) {
            if ((c = c || {}).negativeType = c.negativeType || ("R" === c.negative ? "right" : "left"), "string" != typeof c.negativeLeftSymbol) switch (c.negativeType) {
              case "left":
                c.negativeLeftSymbol = "-";
                break;
              case "brackets":
                c.negativeLeftSymbol = "(";
                break;
              default:
                c.negativeLeftSymbol = "";
            }
            if ("string" != typeof c.negativeRightSymbol) switch (c.negativeType) {
              case "right":
                c.negativeRightSymbol = "-";
                break;
              case "brackets":
                c.negativeRightSymbol = ")";
                break;
              default:
                c.negativeRightSymbol = "";
            }
            function e2(e3, t3) {
              if (t3 = t3 || {}, !e3 && 0 !== e3) return "";
              var n3 = [], r2 = "-" === (e3 = "" + e3).charAt(0);
              if (e3 = e3.replace(/^\-/g, ""), c.negativeLeftOut || t3.noUnits || n3.push(c.prefix), r2 && n3.push(c.negativeLeftSymbol), c.negativeLeftOut && !t3.noUnits && n3.push(c.prefix), e3 = e3.split("."), null != c.round) {
                var o2 = e3, i = c.round;
                if (o2[1] && 0 <= i && o2[1].length > i) {
                  var a = o2[1].slice(0, i);
                  if (5 <= +o2[1].substr(i, 1)) {
                    for (var u = ""; "0" === a.charAt(0); ) u += "0", a = a.substr(1);
                    (a = u + (a = +a + 1 + "")).length > i && (o2[0] = +o2[0] + +a.charAt(0) + "", a = a.substring(1));
                  }
                  o2[1] = a;
                }
              }
              return null != c.truncate && (e3[1] = ((e4, t4) => (e4 && (e4 += ""), e4 && e4.length > t4 ? e4.substr(0, t4) : e4))(e3[1], c.truncate)), 0 < c.padLeft && (e3[0] = ((e4, t4) => {
                e4 += "";
                for (var n4 = []; n4.length + e4.length < t4; ) n4.push("0");
                return n4.join("") + e4;
              })(e3[0], c.padLeft)), 0 < c.padRight && (e3[1] = ((e4, t4) => {
                e4 ? e4 += "" : e4 = "";
                for (var n4 = []; n4.length + e4.length < t4; ) n4.push("0");
                return e4 + n4.join("");
              })(e3[1], c.padRight)), !t3.noSeparator && e3[1] && (e3[1] = ((e4, t4) => {
                if (e4 += "", t4) for (var n4 = /(\d{3})(\d+)/; n4.test(e4); ) e4 = e4.replace(n4, "$1" + t4 + "$2");
                return e4;
              })(e3[1], c.decimalsSeparator)), !t3.noSeparator && e3[0] && (e3[0] = ((e4, t4) => {
                if (e4 += "", t4) for (var n4 = /(\d+)(\d{3})/; n4.test(e4); ) e4 = e4.replace(n4, "$1" + t4 + "$2");
                return e4;
              })(e3[0], c.integerSeparator)), n3.push(e3[0]), e3[1] && (n3.push(c.decimal), n3.push(e3[1])), c.negativeRightOut && !t3.noUnits && n3.push(c.suffix), r2 && n3.push(c.negativeRightSymbol), c.negativeRightOut || t3.noUnits || n3.push(c.suffix), n3.join("");
            }
            function t2(e3, t3) {
              t3 = t3 || [], c.allowedSeparators && c.allowedSeparators.forEach(function(e4) {
                t3.push(e4);
              }), t3.push(c.integerSeparator), t3.push(c.decimalsSeparator);
              var n3 = e3 = (e3 = e3.replace(c.prefix, "")).replace(c.suffix, "");
              do {
                e3 = n3;
                for (var r2 = 0; r2 < t3.length; r2++) n3 = n3.replace(t3[r2], "");
              } while (n3 != e3);
              return e3;
            }
            return "boolean" != typeof c.negativeLeftOut && (c.negativeLeftOut = false !== c.negativeOut), "boolean" != typeof c.negativeRightOut && (c.negativeRightOut = false !== c.negativeOut), c.prefix = c.prefix || "", c.suffix = c.suffix || "", "string" != typeof c.integerSeparator && (c.integerSeparator = "string" == typeof c.separator ? c.separator : ","), c.decimalsSeparator = "string" == typeof c.decimalsSeparator ? c.decimalsSeparator : "", c.decimal = c.decimal || ".", c.padLeft = c.padLeft || -1, c.padRight = c.padRight || -1, e2.negative = c.negative, e2.negativeOut = c.negativeOut, e2.negativeType = c.negativeType, e2.negativeLeftOut = c.negativeLeftOut, e2.negativeLeftSymbol = c.negativeLeftSymbol, e2.negativeRightOut = c.negativeRightOut, e2.negativeRightSymbol = c.negativeRightSymbol, e2.prefix = c.prefix, e2.suffix = c.suffix, e2.separate = c.separate, e2.integerSeparator = c.integerSeparator, e2.decimalsSeparator = c.decimalsSeparator, e2.decimal = c.decimal, e2.padLeft = c.padLeft, e2.padRight = c.padRight, e2.truncate = c.truncate, e2.round = c.round, e2.unformat = t2, e2;
          }
          e.exports = n2, e.exports.default = n2;
        }, function(e, t, n2) {
          e.exports = n2(5).default;
        }, function(e, t, n2) {
          function s(e2, t2) {
            var n3, r2, o2, i, a = "undefined" != typeof Symbol && e2[Symbol.iterator] || e2["@@iterator"];
            if (a) return o2 = !(r2 = true), { s: function() {
              a = a.call(e2);
            }, n: function() {
              var e3 = a.next();
              return r2 = e3.done, e3;
            }, e: function(e3) {
              o2 = true, n3 = e3;
            }, f: function() {
              try {
                r2 || null == a.return || a.return();
              } finally {
                if (o2) throw n3;
              }
            } };
            if (Array.isArray(e2) || (a = ((e3, t3) => {
              var n4;
              if (e3) return "string" == typeof e3 ? u(e3, t3) : "Map" === (n4 = "Object" === (n4 = {}.toString.call(e3).slice(8, -1)) && e3.constructor ? e3.constructor.name : n4) || "Set" === n4 ? Array.from(e3) : "Arguments" === n4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n4) ? u(e3, t3) : void 0;
            })(e2)) || t2 && e2 && "number" == typeof e2.length) return a && (e2 = a), i = 0, { s: t2 = function() {
            }, n: function() {
              return i >= e2.length ? { done: true } : { done: false, value: e2[i++] };
            }, e: function(e3) {
              throw e3;
            }, f: t2 };
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function u(e2, t2) {
            (null == t2 || t2 > e2.length) && (t2 = e2.length);
            for (var n3 = 0, r2 = Array(t2); n3 < t2; n3++) r2[n3] = e2[n3];
            return r2;
          }
          var p = Object.prototype.toString, d = Object.prototype.propertyIsEnumerable, m = Object.getOwnPropertySymbols;
          e.exports = function(e2) {
            if ("function" != typeof (t2 = e2) && "[object Object]" !== p.call(t2) && !Array.isArray(t2)) throw new TypeError("expected the first argument to be an object");
            for (var t2, n3 = arguments.length, r2 = new Array(1 < n3 ? n3 - 1 : 0), o2 = 1; o2 < n3; o2++) r2[o2 - 1] = arguments[o2];
            if (0 !== r2.length && "function" == typeof Symbol && "function" == typeof m) for (var i = 0, a = r2; i < a.length; i++) {
              var u2, c = a[i], l = s(m(c));
              try {
                for (l.s(); !(u2 = l.n()).done; ) {
                  var f = u2.value;
                  d.call(c, f) && (e2[f] = c[f]);
                }
              } catch (e3) {
                l.e(e3);
              } finally {
                l.f();
              }
            }
            return e2;
          };
        }, function(N, e, t) {
          t.r(e), t.d(e, "isValidOpt", function() {
            return _;
          }), t.d(e, "toNegative", function() {
            return M;
          });
          var n2 = t(1), c = t.n(n2);
          function l(e2, t2) {
            return ((e3) => {
              if (Array.isArray(e3)) return e3;
            })(e2) || ((e3, t3) => {
              var n3 = null == e3 ? null : "undefined" != typeof Symbol && e3[Symbol.iterator] || e3["@@iterator"];
              if (null != n3) {
                var r3, o3, i2, a2, u2 = [], c2 = true, l2 = false;
                try {
                  if (i2 = (n3 = n3.call(e3)).next, 0 === t3) {
                    if (Object(n3) !== n3) return;
                    c2 = false;
                  } else for (; !(c2 = (r3 = i2.call(n3)).done) && (u2.push(r3.value), u2.length !== t3); c2 = true) ;
                } catch (e4) {
                  l2 = true, o3 = e4;
                } finally {
                  try {
                    if (!c2 && null != n3.return && (a2 = n3.return(), Object(a2) !== a2)) return;
                  } finally {
                    if (l2) throw o3;
                  }
                }
                return u2;
              }
            })(e2, t2) || ((e3, t3) => {
              var n3;
              if (e3) return "string" == typeof e3 ? r2(e3, t3) : "Map" === (n3 = "Object" === (n3 = {}.toString.call(e3).slice(8, -1)) && e3.constructor ? e3.constructor.name : n3) || "Set" === n3 ? Array.from(e3) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? r2(e3, t3) : void 0;
            })(e2, t2) || (() => {
              throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            })();
          }
          function r2(e2, t2) {
            (null == t2 || t2 > e2.length) && (t2 = e2.length);
            for (var n3 = 0, r3 = Array(t2); n3 < t2; n3++) r3[n3] = e2[n3];
            return r3;
          }
          function a(e2, t2, n3) {
            return A(w(R(z(I(L(O(e2), t2, n3))), e2)), t2).join(" ");
          }
          function u(e2) {
            return e2.replace(/\bum\b/, "uma").replace(/\bdois\b/, "duas");
          }
          function f(e2) {
            return /^0+$/.test(e2);
          }
          function s(e2, t2) {
            var n3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "0", r3 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "0", o3 = 4 < arguments.length ? arguments[4] : void 0;
            if (i2 = e2, !E(d).includes(i2)) throw new Error("Invalid ISO code");
            1 === r3.length && (r3 += "0");
            var i2 = d[e2], e2 = ((e3, t3, n4, r4) => {
              var o4 = parseInt(e3), e3 = $(e3, t3, "m", r4);
              if (1 === o4) return "".concat(e3, " ").concat(n4.singular);
              if (1e6 <= o4) {
                t3 = o4.toString(), r4 = parseInt(t3.substr(-6, 3)), o4 = parseInt(t3.substr(-3, 3));
                if (0 === r4 && 0 === o4) return "".concat(e3, " de ").concat(n4.plural);
              }
              return "".concat(e3, " ").concat(n4.plural);
            })(n3, t2, i2, o3), o3 = ((e3, t3, n4) => (t3 = $(e3, t3), 1 === parseInt(e3) ? "".concat(t3, " ").concat(n4.subunit.singular) : "".concat(t3, " ").concat(n4.subunit.plural)))(r3, t2, i2);
            return f(n3) ? o3 : f(r3) ? e2 : f(n3) && f(r3) ? "zero ".concat(i2.plural) : "".concat(e2, " e ").concat(o3);
          }
          function p(e2, t2, n3) {
            return n3 && "informal" === n3 ? "v\xEDrgula ".concat($(e2, t2)) : (n3 = t2, e2 = (t2 = e2).length, r3 = parseInt(t2), t2 = t2.replace(/^0+/, ""), t2 = $(t2, n3), o3 = q(T(e2), r3), n3 = v(n3)[Math.floor(e2 / 3 - 1)], e2 < 3 ? "".concat(t2, " ").concat(o3) : e2 % 3 == 0 ? "".concat(t2, " ").concat(q(n3, r3)) : "".concat(t2, " ").concat(o3, " de ").concat(n3));
            var r3, o3;
          }
          var d = t(0), o2 = function(e2) {
            return ["zero", "um", "dois", "tr\xEAs", "quatro", "cinco", "seis", "sete", "oito", "nove"];
          }, i = function(e2) {
            return ["dez", "onze", "doze", "treze", { br: "quatorze", pt: "catorze" }[e2], "quinze", { br: "dezesseis", pt: "dezasseis" }[e2], { br: "dezessete", pt: "dezassete" }[e2], "dezoito", { br: "dezenove", pt: "dezanove" }[e2], "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
          }, m = function(e2) {
            return ["cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
          }, g = function(n3) {
            var r3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "short";
            return ["mil", "milh\xF5es", "bil", "tril", "quatril", "quintil", "sextil", "septil", "octil", "nonil", "decil", "undecil", "duodecil"].map(function(e2, t2) {
              return t2 < 2 ? e2 : e2 + { br: "h\xF5es", pt: "i\xF5es" }[n3];
            }).map(function(e2, t2, n4) {
              return "long" !== r3 || t2 < 2 ? e2 : t2 % 2 == 0 ? "mil " + n4[t2 / 2] : n4[t2 / 2 + 0.5];
            });
          }, v = function(e2) {
            return ["mil\xE9simo", "milion\xE9simo", "bilion\xE9simo", "trilion\xE9simo", "quatrilion\xE9simo", "quintilion\xE9simo", "sextilion\xE9simo", "septilion\xE9simo", "octilion\xE9simo", "nonilion\xE9simo", "decilion\xE9simo", "undecilion\xE9simo", "duodecilion\xE9simo"];
          }, b = function(e2, t2) {
            return o2(t2)[e2];
          }, y = function(e2, t2) {
            var n3;
            return e2 < 10 ? b(e2, t2) : e2 < 20 ? i(t2)[e2 - 10] : (n3 = b(e2 % 10, t2), t2 = i(t2)[(e2 - e2 % 10) / 10 + 8], "zero" !== n3 ? "".concat(t2, " e ").concat(n3) : t2);
          }, h = function(e2, t2) {
            var n3;
            return e2 < 100 ? y(e2, t2) : 100 === e2 ? "cem" : (n3 = e2 - e2 % 100, e2 = e2 % 100, n3 = m(t2)[n3 / 100 - 1], t2 = y(e2, t2), e2 ? "".concat(n3, " e ").concat(t2) : n3);
          }, n2 = t(2), S = t.n(n2), O = function(e2) {
            return S()()(e2).split(",");
          }, x = function(e2) {
            e2 = O(e2), e2 = e2[e2.length - 1];
            return parseInt(e2);
          }, j = function(e2) {
            if (null == e2) return [];
            for (var t2, n3, r3 = 0, o3 = e2.length, i2 = o3 - 1, a2 = o3 / 2 | 0; r3 < a2; r3++) n3 = e2[r3], e2[r3] = e2[t2 = i2 - r3], e2[t2] = n3;
            return e2;
          }, w = function(e2) {
            return e2.map(function(e3, t2, n3) {
              return t2 < n3.length - 2 ? "".concat(e3, ",") : e3;
            });
          }, R = function(e2, t2) {
            t2 = x(t2);
            return t2 < 100 || t2 % 100 == 0 ? e2.map(function(e3, t3, n3) {
              return t3 === n3.length - 2 ? "".concat(e3, " e") : e3;
            }) : e2;
          }, I = function(e2) {
            return e2.map(function(e3) {
              return e3.replace(/^0+\s?/, "");
            }).filter(function(e3) {
              return /^\d/.test(e3);
            }).map(function(e3) {
              return e3.replace(/^1\s(mil)$/, "$1");
            });
          }, L = function(e2, n3, r3) {
            return j(j(e2).map(function(e3, t2) {
              t2 = g(n3, r3)[t2 - 1];
              return t2 ? "".concat(e3, " ").concat(t2) : e3;
            }));
          }, z = function(e2) {
            var t2 = /^(1\s.*)ões/;
            return e2.map(function(e3) {
              return e3.replace(t2, "$1\xE3o");
            });
          }, A = function(e2, t2) {
            return e2.map(function(e3) {
              return e3.replace(/^(\d+)/, function(e4) {
                e4 = parseInt(e4);
                return h(e4, t2);
              });
            });
          }, $ = function(e2, t2) {
            var n3, r3 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "m", o3 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : "short", i2 = parseInt(e2);
            return i2 < 1e3 && (n3 = h(i2, t2)), 1e3 === i2 && (n3 = "mil"), 1e3 < i2 && (n3 = a(e2, t2, o3)), "f" === r3 ? u(n3) : n3;
          }, E = function(e2) {
            return Object.keys(e2);
          }, T = function(e2) {
            switch (e2 % 3) {
              case 1:
                return "d\xE9cimo";
              case 2:
                return "cent\xE9simo";
            }
          }, q = function(e2, t2) {
            return 1 < t2 ? "".concat(e2, "s") : e2;
          }, _ = function(e2, t2) {
            return t2.includes(e2);
          }, M = function(e2) {
            return "informal" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "formal") ? "menos ".concat(e2) : "".concat(e2, " negativo");
          };
          e.default = function(e2, t2) {
            if ("string" != typeof e2 && "number" != typeof e2) throw new TypeError("Must be a string or a number");
            if (t2 = c()({ mode: "number", locale: "br", negative: "formal", scale: "short", currency: { type: "BRL" }, number: { gender: "m", decimal: "formal", decimalSeparator: "comma" } }, t2), !(_(t2.mode, ["number", "currency"]) && _(t2.locale, ["pt", "br"]) && _(t2.negative, ["formal", "informal"]) && _(t2.scale, ["short", "long"]) && _(t2.currency.type, ["BRL", "EUR", "CVE"]) && _(t2.number.gender, ["m", "f"]) && _(t2.number.decimal, ["formal", "informal"]) && _(t2.number.decimalSeparator, ["comma", "dot"]))) throw new Error("Invalid option");
            var n3, r3, o3, i2, a2, u2 = "dot" === t2.number.decimalSeparator || "number" == typeof e2;
            if ((function(e3) {
              var t3 = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
              if ("number" == typeof e3) {
                if (Number.isInteger(e3) && !Number.isSafeInteger(e3)) return false;
                if (!Number.isInteger(e3)) return true;
              }
              var n4 = /^-?\d+$/.test(e3), r4 = /^-?\d{1,3}\d?((\.\d{3})+)?$/.test(e3), o4 = /^-?\d{1,3}\d?((\.\d{3})+)?,\d+$/.test(e3), i3 = /^-?\d+,\d+$/.test(e3), a3 = /^-?\d{1,3}\d?((,\d{3})+)?$/.test(e3), u3 = /^-?\d{1,3}\d?((,\d{3})+)?\.\d+$/.test(e3), e3 = /^-?\d+\.\d+$/.test(e3);
              return t3 ? n4 || a3 || u3 || e3 : n4 || r4 || o4 || i3;
            })(e2, u2)) return u2 = (e2 = (function(e3) {
              var t3 = 1 < arguments.length && void 0 !== arguments[1] && arguments[1], n4 = ("number" == typeof e3 && (e3 = e3.toString(), t3 = true), t3 ? "," : "."), t3 = t3 ? "." : ",", r4 = /^-/.test(e3), e3 = e3.replace(RegExp("(-|\\".concat(n4, ")"), "g"), "");
              return e3.includes(t3) ? { isNegative: r4, integer: (n4 = l(e3.split(t3).map(function(e4) {
                return e4.replace(/^0+$/, "0");
              }), 2))[0], decimal: n4[1] } : { isNegative: r4, integer: e3, decimal: "0" };
            })(e2, u2)).isNegative, n3 = e2.integer, e2 = e2.decimal, "currency" === t2.mode ? (o3 = t2.currency.type, i2 = t2.locale, r3 = e2.slice(0, 2), o3 = s(o3, i2, n3, r3, t2.scale), u2 ? M(o3, t2.negative) : o3) : "number" === t2.mode ? (i2 = "f" === t2.number.gender ? "inteira" : "inteiro", r3 = 1 === parseInt(n3) ? i2 : "".concat(i2, "s"), o3 = $(n3, t2.locale, t2.number.gender, t2.scale), i2 = p(e2, t2.locale, t2.number.decimal), "0" === n3 && "0" === e2 ? o3 : "0" !== n3 && "0" === e2 ? u2 ? M(o3, t2.negative) : o3 : "0" === n3 && "0" !== e2 ? (a2 = "informal" === t2.number.decimal ? "zero ".concat(i2) : i2, u2 ? M(a2, t2.negative) : a2) : "0" !== n3 && "0" !== e2 ? "informal" === t2.number.decimal ? "".concat(o3, " ").concat(i2) : (a2 = "".concat(o3, " ").concat(r3, " e ").concat(i2), u2 ? M(a2, t2.negative) : a2) : void 0) : void 0;
            throw new Error("Invalid number");
          };
        }], r = {}, o.m = n, o.c = r, o.d = function(e, t, n2) {
          o.o(e, t) || Object.defineProperty(e, t, { enumerable: true, get: n2 });
        }, o.r = function(e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: true });
        }, o.t = function(t, e) {
          if (1 & e && (t = o(t)), 8 & e) return t;
          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
          var n2 = /* @__PURE__ */ Object.create(null);
          if (o.r(n2), Object.defineProperty(n2, "default", { enumerable: true, value: t }), 2 & e && "string" != typeof t) for (var r2 in t) o.d(n2, r2, function(e2) {
            return t[e2];
          }.bind(null, r2));
          return n2;
        }, o.n = function(e) {
          var t = e && e.__esModule ? function() {
            return e.default;
          } : function() {
            return e;
          };
          return o.d(t, "a", t), t;
        }, o.o = function(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }, o.p = "", o(o.s = 3);
        function o(e) {
          var t;
          return (r[e] || (t = r[e] = { i: e, l: false, exports: {} }, n[e].call(t.exports, t, t.exports, o), t.l = true, t)).exports;
        }
        var n, r;
      });
    }
  });

  // scripts/testExtensoNew.ts
  var import_extenso = __toESM(require_extenso_min(), 1);
  console.log((0, import_extenso.default)(22.22, { mode: "currency" }));
})();
/*! Bundled license information:

extenso/dist/extenso.min.js:
  (*! Extenso.js v2.1.0 | MIT (c) 2015-2024 by Matheus Alves *)
*/

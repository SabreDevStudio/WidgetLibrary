/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
function GetHTML(n) {
    var i = document.getElementById(n), t = i.value;
    return (t == null || t == "") && (t = i.innerHTML), t.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
}
function GetActualItem(n) {
    return isAir ? n.AirItems[0] : isHotel ? n.HotelItems[0] : isAirHotel ? n.AirHotelItems[0] : void 0
}
function GetActualItems(n) {
    return isAir ? n.AirItems : isHotel ? n.HotelItems : isAirHotel ? n.AirHotelItems : void 0
}
function StringToDateValues(n) {
    return n != undefined && n != null && n != "" ? {
        Year: n.split("/")[2],
        Month: n.split("/")[1],
        Day: n.split("/")[0],
        isValid: !0
    } : {Year: 1, Month: 1, Day: 1, isValid: !1}
}
function DateValuesToDate(n) {
    return n.Year != undefined && n.Month != undefined && n.Day != undefined ? new Date(n.Year, n.Month - 1, n.Day, 1, 0, 0) : null
}
function CompareDateValues(n, t) {
    return n && t && n.Year == t.Year && n.Month == t.Month && n.Day == t.Day
}
function FormatCompleteDate(n) {
    var t = n.Day + " de " + Months[n.Month] + " de " + n.Year + " " + (n.Hour == 0 ? "0" : "") + n.Hour + ":";
    return n.Minutes != undefined && (t += (n.Minutes < 10 ? "0" : "") + n.Minutes), t
}
function GetDescriptionAgeBandType(n, t) {
    var i;
    switch (n) {
        case 1:
            i = "Adulto";
            break;
        case 2:
            i = "Criança";
            break;
        case 3:
            i = "Bebê";
            break;
        case 4:
            i = "Idoso";
            break;
        case 5:
            i = "Adolescente"
    }
    return (t > 1 || t == 0) && (i += "s"), i
}
function FormatPointsB2B(n) {
    return Math.ceil(n)
}
function FormatCompleteDateDiference(n, t) {
    var r = DateValuesToDate(n), u = DateValuesToDate(t), i = u - r;
    return returnDate = i.Day + " de " + Months[i.Month] + " de " + i.Year + " " + i.Hour + ":", i.Minutes != undefined && (returnDate += (i.Minutes < 10 ? "0" : "") + i.Minutes), returnDate
}
function FormatSimpleDateTimeValues(n) {
    return (n.Day < 10 ? "0" : "") + parseFloat(n.Day) + "/" + (n.Month < 10 ? "0" : "") + parseFloat(n.Month) + "/" + n.Year + " " + (n.Hour < 10 ? "0" : "") + n.Hour + ":" + (n.Minutes < 10 ? "0" : "") + n.Minutes
}
function FormatSimpleTimeValues(n) {
    return (n.Hour < 10 ? "0" : "") + n.Hour + ":" + (n.Minutes < 10 ? "0" : "") + n.Minutes
}
function FormatSimpleDateValues(n) {
    return (n.Day < 10 ? "0" : "") + parseFloat(n.Day) + "/" + (n.Month < 10 ? "0" : "") + parseFloat(n.Month) + "/" + n.Year
}
function FormatUSDSimpleDateValues(n) {
    return (n.Month < 10 ? "0" : "") + parseFloat(n.Month) + "/" + (n.Day < 10 ? "0" : "") + parseFloat(n.Day) + "/" + n.Year
}
function FormatJavaScriptDateToSimpleDate(n) {
    var i = n.getDate(), t = n.getMonth() + 1, r = n.getFullYear();
    return i < 10 && (i = "0" + i), t < 10 && (t = "0" + t), i + "/" + t + "/" + r
}
function FormatDecimalPointsB2B(n) {
    for (var t = Math.ceil(n).toString(); t.match(/^\d{4}/);)t = t.replace(/(\d)(\d{3}(\.|$))/, "$1.$2");
    return t
}
function FormatTripTypeCode(n) {
    return n == 0 ? "None" : n == 1 ? "OW" : n == 2 ? "RT" : void 0
}
function getNumericTime(n) {
    var t = n.Hour + (n.Minutes < 10 ? "0" : "") + n.Minutes;
    return parseFloat(t)
}
function FormatDateUTC(n) {
    var t = new Date, i = "";
    return t.setUTCDate(n), i = t.getFullYear() != 1 ? t.format("dd/mm/yyyy HH:MM") : ""
}
function FormatDateWhithoutTimezone(n) {
    var t = n;
    return t.setMinutes(n.getTimezoneOffset()), t.getFullYear() != 1 ? t.format("dd/mm/yyyy") : ""
}
function FormatTimeSlider(n) {
    n = Math.round(n).toString();
    var r = "", t, i;
    return n.length == 4 ? (t = n.substr(0, 2), i = n.substr(2, 2)) : n.length == 3 ? (t = n.substr(0, 1), i = n.substr(1, 2)) : n.length == 2 && (t = 0, i = n), t > 24 && (t = 24), i > 59 && (i = 59), isNaN(t) && (t = 0), isNaN(i) && (i = 0), t + ":" + i
}
function VerifyPointsValue(n) {
    var t = new String(n).split(".");
    return t.length > 1 ? !1 : !0
}
function FormatPriceSlider(n) {
    return CurrencyPrefixed ? CurrentCurrencyFormat + n.FormatCurrency() : n
}
function convertSerializableDate(n) {
    var t = new Date;
    return typeof n == "string" && (n = n.replace("/Date(", "").replace(")/", ""), t = new Date(parseFloat(n))), t
}
function FormatDate(n) {
    return n != undefined && (typeof n == "object" && n.Year && (n = new Date(n.Year, n.Month, n.Day)), (typeof n == "Date" || typeof n == "object") && n.getFullYear() != 1) ? n.format("dd/mm/yyyy") : ""
}
function FormatDateValue(n) {
    var i = "", t;
    return n != undefined && n != "" && (t = new Date(n), i = t.format("dd/mm/yyyy")), i
}
function FormatDateWeek(n) {
    return DaysOfWeek[n.DayOfWeek] + ", " + FormatSimpleDateValues(n)
}
function FormatDateWeek2(n) {
    return FormatSimpleDateValues(n) + " (" + DaysOfWeek[n.DayOfWeek] + ")"
}
function DateDif(n, t) {
    return ((t - n) / 864e5).toFixed(0)
}
function NumberOfDays(n, t) {
    return 32 - new Date(t, n - 1, 32).getDate()
}
function SumDays(n, t) {
    var u = n.getDate(), i = n.getMonth() + 1, r = n.getFullYear();
    for (t = t + u; t > NumberOfDays(i, r);)t = t - NumberOfDays(i, r), i++, i > 12 && (i = 1, r++);
    return new Date(r, i - 1, t)
}
function FormatDateWeekMonth(n) {
    return DaysOfWeek[n.DayOfWeek] + ", " + n.Day + " " + Months[n.Month] + " " + n.Year
}
function formatMinutesInHourMinute(n) {
    var r = n % 60, u = (n - r) / 60, t, i;
    return t = u.toString(), i = Math.round(r).toString(), u < 10 && (t = "0" + t), r < 10 && (i = "0" + i), t + ":" + i
}
function formatMinutesInHourMinuteLong(n) {
    var t = n % 60, i = (n - t) / 60, f, r, u;
    return hoursString = i.toString(), r = t.toString(), (i > 0 ? hoursString + (i > 1 ? " horas " : " hora ") : "") + (t > 0 ? r + (t > 1 ? " minutos" : " minuto") : "")
}
function FormatHour(n) {
    var t = "", i = n.Hour;
    return i < 10 && (t = "0"), t += i, t += ":", n.Minutes < 10 && (t += "0"), t += n.Minutes
}
function Clone_Object(n) {
    var r, i, t, u;
    if (typeof n != "object" || n == null)return n;
    r = n instanceof Array ? [] : {};
    for (i in n)if (t = n[i], typeof t == "object")if (t instanceof Array)for (r[i] = [], u = 0; u < t.length; u++)typeof t[u] != "object" ? r[i].push(t[u]) : r[i].push(Clone_Object(t[u])); else r[i] = t instanceof Date ? new Date(t.getTime()) : Clone_Object(t); else r[i] = t;
    return r
}
function toggleAnimateDIV(n, t) {
    var i = $(t);
    i.is(":hidden") ? i.slideDown("fast") : i.slideUp("fast")
}
function CalculeFlightDuration(n) {
    var t = "", i = "";
    return n > 60 ? (i = parseInt(n / 60), n = n % 60, t += i + (i > 1 ? " hs " : " h "), t += (n > 9 ? "" : "0") + n + " min") : t = n + " min", t
}
function ltrim(n) {
    if (l = new Number(n.length), l > 0)while (n.charAt(0) == " " || n.charAt(0) == "\t")n = n.substr(1, l - 1);
    return n
}
function rtrim(n) {
    if (l = new Number(n.length), l > 0)while (n.charAt(l - 1) == " " || n.charAt(l - 1) == "\t")n = n.substr(0, l - 1), l = n.length;
    return n
}
function lmpStr(n, t) {
    for (strResult = "", iCont = 0; iCont < n.length; iCont++)n.charAt(iCont) != t && (strResult += n.charAt(iCont));
    return strResult
}
function trim(n) {
    return n == undefined || n == null ? "" : ltrim(rtrim(n))
}
function soNumero(n) {
    var t = KeyStroke(n);
    return t > 47 && t < 58 || t == 0 || t == 8 || t == 13
}
function soNumeroZipCode(n) {
    var t = KeyStroke(n);
    return t > 47 && t < 58 || t == 0 || t == 8 || t == 13 || t == 45
}
function soNumeroPaymentOut(n) {
    if ($("#txtOneDocumentTypeOut").val() == 0) {
        var t = KeyStroke(n);
        return t > 47 && t < 58 || t == 0 || t == 8 || t == 13
    }
}
function soCaracterNomeCheckout(n) {
    var t = KeyStroke(n);
    return t >= 192 && t <= 252 && t != 197 && t != 198 && t != 203 && t != 207 && t != 208 && t != 215 && t != 216 && t != 221 && t != 222 && t != 223 && t != 229 && t != 230 && t != 235 && t != 239 && t != 240 && t != 247 && t != 248 || t >= 97 && t <= 122 || t >= 65 && t <= 90 || t == 0 || t == 8 || t == 13 || t == 32 || t == 199 || t == 89 || t == 231
}
function soCaracter(n) {
    var t = KeyStroke(n);
    return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t == 0 || t == 8 || t == 13 || t == 32 || t == 199 || t == 89 || t == 231
}
function soNumSinal(n, t) {
    var i = KeyStroke(t);
    return i > 47 && i < 58 || i == 0 || i == 8 || i == 13 || i == 44 || i == n
}
function soNumSinalsemVirgula(n, t) {
    var i = KeyStroke(t);
    return i > 47 && i < 58 || i == 0 || i == 8 || i == 13 || i == n
}
function soNaoSinal(n, t) {
    return !(KeyStroke(t) == n)
}
function KeyStroke(n) {
    var t = 0;
    return t = n.which == undefined ? window.event.keyCode : n.which
}
function KeyIns(n, t) {
    n.which == undefined ? window.event.keyCode = t : n.keyCode = t
}
function Formata(n, t, i, r) {
    var u = i.keyCode;
    vr = Limpar(n.value, "0123456789"), tam = vr.length, dec = r, tam < t && u != 8 && (tam = vr.length + 1), u == 8 && (tam = tam - 1), (u == 8 || u >= 48 && u <= 57 || u >= 96 && u <= 105) && (tam <= dec && (n.value = vr), tam > dec && tam <= 5 && (n.value = vr.substr(0, tam - 2) + "," + vr.substr(tam - dec, tam)), tam >= 6 && tam <= 8 && (n.value = vr.substr(0, tam - 5) + "." + vr.substr(tam - 5, 3) + "," + vr.substr(tam - dec, tam)), tam >= 9 && tam <= 11 && (n.value = vr.substr(0, tam - 8) + "." + vr.substr(tam - 8, 3) + "." + vr.substr(tam - 5, 3) + "," + vr.substr(tam - dec, tam)), tam >= 12 && tam <= 14 && (n.value = vr.substr(0, tam - 11) + "." + vr.substr(tam - 11, 3) + "." + vr.substr(tam - 8, 3) + "." + vr.substr(tam - 5, 3) + "," + vr.substr(tam - dec, tam)), tam >= 15 && tam <= 17 && (n.value = vr.substr(0, tam - 14) + "." + vr.substr(tam - 14, 3) + "." + vr.substr(tam - 11, 3) + "." + vr.substr(tam - 8, 3) + "." + vr.substr(tam - 5, 3) + "," + vr.substr(tam - 2, tam)))
}
function adjustDate(n) {
    var t, i, r;
    valor = "", valor = trim(n.value), valor = lmpStr(valor, "/"), iDia = 0, iMes = 0, iAno = 0, mask = "";
    var u = new Date, f = u.getFullYear(), e = u.getMonth(), o = u.getDay();
    trim(valor).length != 0 && (valor.length >= 1 ? (iDia = parseFloat(valor.substring(0, 2)), iDia < 1 && (iDia = 1), iDia > 31 && (iDia = 31)) : iDia = o, valor.length >= 3 ? (iMes = parseFloat(valor.substring(2, 4)), iMes < 1 && (iMes = 1), iMes > 12 && (iMes = 12)) : iMes = e + 1, valor.length > 4 ? (iAno = parseFloat(valor.substring(4, 8)), iAno < 100 && (iAno = iAno + 2e3)) : iAno = f, (iAno < 1753 || iAno > f) && (t = $(n), t.attr("id").toLowerCase().indexOf("ida") === -1 && t.attr("id").toLowerCase().indexOf("volta") === -1 && (alert("Data de nascimento inválida"), iAno = f)), n.value = "", iMes == 4 && iDia > 30 && (iDia = 30), iMes == 6 && iDia > 30 && (iDia = 30), iMes == 9 && iDia > 30 && (iDia = 30), iMes == 11 && iDia > 30 && (iDia = 30), iMes == 2 && iDia > 29 && (iDia = 29), iMes == 2 && iDia >= 28 && (iBiSexto = iAno / 4, iDia = iBiSexto.toString().length == 3 ? 29 : 28), i = iDia.toString(), n.value += (i.length < 2 ? "0" : "") + i + "/", r = iMes.toString(), n.value += (r.length < 2 ? "0" : "") + r + "/" + iAno.toString())
}
function MascData(n, t) {
    if (valor = "", valor = trim(n.value), valor = lmpStr(valor, "/"), iKey = KeyStroke(t), strDia = "", strMes = "", valor.length > 0 && (iKey >= 48 && iKey <= 57 || iKey >= 96 && iKey <= 105)) {
        if (mask = "", valor.length > 0 && valor.length <= 2 && (mask = valor, valor.length == 2 && parseFloat(valor.substring(0, 2)) > 31 && (mask = "31")), valor.length > 2 && valor.length <= 4) {
            if (strDia = parseFloat(valor.substring(0, 2)) > 31 ? "31" : valor.substring(0, 2), valor.length == 4) {
                var i = valor.substring(2, 4);
                strMes = parseFloat(i) > 12 ? "12" : i
            } else strMes = valor.substring(2, 4);
            mask = mask + strDia + "/" + strMes
        }
        valor.length > 4 && (strDia = parseFloat(valor.substring(0, 2)) > 31 ? "31" : valor.substring(0, 2), strMes = valor.length > 4 ? parseFloat(valor.substring(2, 4)) > 12 ? "12" : valor.substring(2, 4) : valor.substring(2, 4), mask = mask + strDia + "/" + strMes + "/" + valor.substring(4, 8)), n.value = mask
    }
}
function vdHora(n) {
    var t, i;
    valor = "", valor = trim(n.value), valor = lmpStr(valor, ":"), iHora = 0, iMinuto = 0, mask = "";
    var r = new Date, u = r.getHours(), f = r.getMinutes();
    trim(valor).length != 0 && (valor.length >= 1 ? (iHora = parseFloat(valor.substring(0, 2)), iHora < 0 && (iHora = 0), iHora > 23 && (iHora = 23)) : iHora = u, valor.length >= 3 ? (iMinuto = parseFloat(valor.substring(2, 4)), iMinuto < 0 && (iMinuto = 0), iMinuto > 59 && (iMinuto = 59)) : iMinuto = f, n.value = "", t = iHora.toString(), n.value += (t.length < 2 ? "0" : "") + t, n.value += ":", i = iMinuto.toString(), n.value += (i.length < 2 ? "0" : "") + i)
}
function MascHora(n, t) {
    valor = "", valor = trim(n.value), valor = lmpStr(valor, ":"), iKey = KeyStroke(t), strHora = "", strMinuto = "", valor.length > 0 && (iKey >= 48 && iKey <= 57 || iKey >= 96 && iKey <= 105) && (mask = "", valor.length > 0 && valor.length <= 2 && (mask = valor, valor.length == 2 && parseFloat(valor.substring(0, 2)) > 23 && (mask = "23")), valor.length > 2 && valor.length <= 4 && (strHora = parseFloat(valor.substring(0, 2)) > 23 ? "23" : valor.substring(0, 2), strMinuto = valor.length == 4 ? parseFloat(valor.substring(2, 4)) > 59 ? "59" : valor.substring(2, 4) : valor.substring(2, 4), mask = mask + strHora + ":" + strMinuto), n.value = mask)
}
function MascaraCPF_CNPJ(n, t) {
    return n.value.length > 14 ? fnMascaraCNPJ(n, t) : fnMascaraCPF(n, t)
}
function MascaraCPF_CNPJPaymentOut(n, t) {
    if ($("#txtOneDocumentTypeOut").val() == 0)return fnMascaraCPF(n, t)
}
function fnlmpCNPJ(n) {
    for (strResult = "", iCont = 0; iCont < n.length; iCont++)n.charAt(iCont) != "." && n.charAt(iCont) != "-" && n.charAt(iCont) != "/" && (strResult += n.charAt(iCont));
    return strResult
}
function fnMascaraCNPJ(n, t) {
    valor = "", valor = trim(fnlmpCNPJ(n.value)), Key = KeyStroke(t), valor.length > 0 && (Key >= 48 && Key <= 57 || Key >= 96 && Key <= 105) && (mask = "", valor.length > 0 && (mask = valor, valor.length >= 2 && (mask = valor.substring(0, 2) + "." + valor.substring(2, 5)), valor.length >= 5 && (mask = valor.substring(0, 2) + "." + valor.substring(2, 5) + "." + valor.substring(5, 8)), valor.length >= 8 && (mask = valor.substring(0, 2) + "." + valor.substring(2, 5) + "." + valor.substring(5, 8) + "/" + valor.substring(8, 12)), valor.length >= 12 && (mask = valor.substring(0, 2) + "." + valor.substring(2, 5) + "." + valor.substring(5, 8) + "/" + valor.substring(8, 12) + "-" + valor.substring(12, 14))), n.value = mask)
}
function MascaraCEP(n, t) {
    valor = n.value, valor = valor.replace("-", ""), Key = KeyStroke(t), valor.length > 0 && (Key >= 48 && Key <= 57 || Key >= 96 && Key <= 105) && (mask = "", valor.length > 0 && (mask = valor, valor.length >= 5 && (mask = valor.substring(0, 5) + "-" + valor.substr(5, 3))), n.value = mask)
}
function fnMascaraCPF(n, t) {
    valor = "", valor = trim(fnlmpCPF(n.value)), Key = KeyStroke(t), valor.length > 0 && (Key >= 48 && Key <= 57 || Key >= 96 && Key <= 105) && (mask = "", valor.length > 0 && (mask = valor, valor.length >= 3 && (mask = valor.substring(0, 3) + "." + valor.substring(3, 6)), valor.length >= 6 && (mask = valor.substring(0, 3) + "." + valor.substring(3, 6) + "." + valor.substring(6, 9)), valor.length >= 9 && (mask = valor.substring(0, 3) + "." + valor.substring(3, 6) + "." + valor.substring(6, 9) + "-" + valor.substring(9, 11))), n.value = mask)
}
function fnlmpCPF(n) {
    for (strResult = "", iCont = 0; iCont < n.length; iCont++)n.charAt(iCont) != "." && n.charAt(iCont) != "-" && (strResult += n.charAt(iCont));
    return strResult
}
function fnMascaraCEP(n, t) {
    valor = "", valor = trim(fnlmpCEP(n.value)), Key = KeyStroke(t), valor.length > 0 && (Key >= 48 && Key <= 57 || Key >= 96 && Key <= 105) && (mask = "", valor.length > 0 && (mask = valor, valor.length >= 5 && (mask = valor.substring(0, 5) + "-" + valor.substring(5, 8))), n.value = mask)
}
function fnlmpCEP(n) {
    for (strResult = "", iCont = 0; iCont < n.length; iCont++)n.charAt(iCont) != "-" && (strResult += n.charAt(iCont));
    return strResult
}
function CurrencyFormatted(n) {
    var t = parseFloat(n), u, i, r;
    return isNaN(t) && (t = 0), u = "", t < 0 && (u = "-"), t = Math.abs(t), t = parseInt((t + .005) * 100), t = t / 100, i = new String(t), r = i.indexOf("."), r < 0 && (i += ".00"), r == i.length - 2 && (i += "0"), i = u + i, i.replace(".", ",")
}
function NumberFormatted(n) {
    return CurrencyFormatted(n)
}
function ScrollToElement(n) {
    var t, r, i;
    if (n != undefined) {
        for (t = n, n.type == undefined && (t = $("#" + n)[0]), r = 0, i = 0; t != null;)r += t.offsetLeft, i += t.offsetTop, t = t.offsetParent;
        window.scrollTo(r, i)
    }
}
function GetIATA(n) {
    var t = "", n = trim(n);
    return n.indexOf("--") > 0 ? t = n.substr(n.indexOf("--") + 2, 3) : n.indexOf("(") > 0 ? t = n.substr(n.indexOf("(") + 1, 3) : n.length == 3 && (t = n), t.toUpperCase()
}
function GetIATAFromURI(n) {
    if (IATA = "", URI = "", arrURI = undefined, URI = decodeURIComponent(window.location.search), arrURI = URI.split("&"), arrURI != null && arrURI != undefined)for (var t = 0; t < arrURI.length; t++)if (Element = arrURI[t].split("="), Element[0] == n) {
        IATA = Element[1].indexOf("--") > 0 ? Element[1].substr(Element[1].indexOf("--") + 2, 3) : Element[1].substr(Element[1].indexOf("(") + 1, 3);
        break
    }
    return IATA
}
function QueryString(n, t) {
    var r, u, i, f;
    for (t || (t = 0), r = "", u = window.location.search.substring(1).split("&"), n = n.toLowerCase(), i = 0, f = u.length; i < f; i++)if (r = u[i].split("="), r[0].toLowerCase() == n) {
        if (t == 0)return r[1];
        t--
    }
}
function checkDate(n, t, i) {
    var r = /^(19|20)\d\d-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    return r.test(i + "-" + t + "-" + n) ? n == 31 && (/^0?[469]$/.test(t) || t == 11) ? !1 : n >= 30 && t == 2 ? !1 : t != 2 || n != 29 || i % 4 == 0 && (i % 100 != 0 || i % 400 == 0) ? !0 : !1 : !1
}
function checkTime(n, t, i) {
    i || (i = "00");
    var r = /^(0?\d|1\d|2[0-3]):[0-5]?\d:[0-5]?\d$/;
    return r.test(n + ":" + t + ":" + i)
}
function isValidDate(n, t) {
    var i;
    if (t) {
        t = t.toLowerCase().replace(/[^dmy]/g, "");
        var f = t.indexOf("d") + 1, r = t.indexOf("m") + 1, u = t.indexOf("y") + 1
    } else var r = 2, f = 1, u = 3;
    return (i = n.match(/^\b(\d+)\D(\d+)\D(\d+)\b\b(?:\s+(\d{1,2})\D(\d{2})\D*((\d{2})?))?\b$/), !i) ? !1 : (i.clearUndefined(), i.clearStringEmpty(), checkDate(i[f], i[r], i[u]) ? i.length >= 5 ? checkTime(i[4], i[5], i[6] ? i[6] : !1) : !0 : !1)
}
function setDateRegionalString(n) {
    var i, t;
    if (n && n.indexOf("/") >= 0 && (t = n.split("/"), t.length == 3)) {
        var f = t[0], u = t[1] - 1, r = t[2];
        i = new Date, i.setFullYear(r, u, f)
    }
    return i
}
function isEmail(n) {
    n != null && n != undefined && (n = n.replaceAll(" ", ""));
    var t = new RegExp(/^[\d\w_.-]+@([\d\w_-]+\.){1,}[\w\d]+$/);
    return t.test(n)
}
function VerificaCodigoSeguranca(n, t) {
    var i = !0;
    return t == "VI" && (i = n.length <= 3), t == "MC" && (i = n.length <= 3), t == "MS" && (i = n.length <= 3), t == "AX" && (i = n.length == 4), t == "DI" && (i = n.length <= 3), t == "AU" && (i = n.length == 0), t == "GE" && (i = n.length <= 3), i
}
function ValidaCartaoCredito(n, t) {
    var u = 0, e = 0, r = "", f, s, o;
    for (i = 0, len = n.length; i < len; i++)if (f = n.charAt(i), f >= "0" && f <= "9")r += f; else return !1;
    if (r.length < 13 || (first = "" + r.charAt(0), second = "" + r.charAt(1), third = "" + r.charAt(2), firstTwo = first + second, firstFour = firstTwo + third + r.charAt(3), t == "MC" && (first != "5" || second < "1" || second > "5" || r.length != 16)))return !1;
    if (s = "5324", o = "5256", t == "MS") {
        if (r.substring(0, 4) != s && r.substring(0, 4) != o || r.length != 16)return !1
    } else if (t == "AU" || t == "submarino") {
        if (checkCCAura(r) != 0 || r.substring(6, 8).indexOf("18") == -1 || r.substring(0, 6).indexOf("507860") == -1)return !1
    } else {
        if (t == "GE")return r.length == 19 ? r.substring(0, 6) != "384100" || r.substr(6, 1) != "1" && r.substr(6, 1) != "4" && r.substr(6, 1) != "6" ? !1 : !0 : r.length == 16 ? r.substring(0, 6) == "606282" ? !0 : !1 : !1;
        if (t == "VI") {
            if (first != "4" || r.length != 13 && r.length != 16)return !1
        } else if (t == "AX") {
            if (first != "3" || second != "4" && second != "7" || r.length != 15)return !1
        } else if (t == "DI") {
            if (firstTwo != "36" && firstTwo != "38" && (firstTwo != "30" || third < "0" || third > "5") || r.length != 14)return !1
        } else if (t == "JCB Cards" && (firstFour != "2131" && firstFour != "1800" && first != "3" || r.length != 16 && first == "3" || r.length != 15 && first != "3"))return !1
    }
    for (loc = r.length - 2; loc >= 0; loc -= 2)u += 1 * r.charAt(loc + 1), e = r.charAt(loc) * 2, e > 9 && (u += 1), u += e % 10;
    return r.length % 2 > 0 && (u += 1 * r.charAt(0)), u % 10 == 0
}
function checkCCAura(n) {
    var r, t, i;
    for (r = / /gi, n = n.replace(r, ""), n.charAt(0) == "0" && (n = n.substr(1, n.length)), ccprefix = "507860", prefixvalid = !1, lengthvalid = !1, n.indexOf(ccprefix) == 0 && (prefixvalid = !0), n.length == 19 && (lengthvalid = !0), t = 0, prefixvalid || (t += 1), lengthvalid || (t += 2), qsum = 0, i = 0; i < n.length; i++)ch = n.substr(n.length - i - 1, 1), i % 2 != 0 ? (sum = 2 * parseFloat(ch, 10), qsum += sum % 10, sum > 9 && (qsum += 1)) : qsum += parseFloat(ch, 10);
    return qsum % 10 != 0 && (t += 4), t
}
function validCPF_CNPJ(n) {
    var s, h, t, r;
    if ((n = trim(fnlmpCNPJ(n)), n = n.replace(/[^0-9]/g, ""), n == "") || n.length == 11 && n == 11111111111 || n == 22222222222 || n == 33333333333 || n == 44444444444 || n == 55555555555 || n == 66666666666 || n == 77777777777 || n == 88888888888 || n == 99999999999 || n == 0 || !(n.length == 11 || n.length == 14))return !1;
    var f = "0123456789", u = n, o = !0, e = "";
    for (i = 0; i < u.length; i++) {
        for (ch = u.charAt(i), j = 0; j < f.length; j++)if (ch == f.charAt(j))break;
        if (j == f.length) {
            o = !1;
            break
        }
        e += ch
    }
    if (!o || (s = e, h = parseFloat(e), s != "" && !(h > "0")))return !1;
    if (n.length == 11) {
        for (t = 0, i = 2; i <= 10; i++)t += i * parseFloat(u.charAt(10 - i));
        if (t * 10 % 11 % 10 != parseFloat(u.charAt(9)))return !1;
        for (t = 0, i = 2; i <= 11; i++)t += i * parseFloat(u.charAt(11 - i));
        if (t * 10 % 11 % 10 != parseFloat(u.charAt(10)))return !1
    } else {
        for (t = 0, r = 2, i = 0; i <= 11; i++)t += r * parseFloat(u.charAt(11 - i)), r++, r == 10 && (r = 2);
        if (t * 10 % 11 % 10 != parseFloat(u.charAt(12)))return !1;
        for (t = 0, r = 2, i = 0; i <= 12; i++)t += r * parseFloat(u.charAt(12 - i)), r++, r == 10 && (r = 2);
        if (t * 10 % 11 % 10 != parseFloat(u.charAt(13)))return !1
    }
    return !0
}
function RetiraAcentos(n) {
    for (var o = "áàãââÁÀÃÂéêÉÊíÍóõôÓÔÕúüÚÜçÇabcdefghijklmnopqrstuvxwyz", s = "aaaaaAAAAeeEEiIoooOOOuuUUcCABCDEFGHIJKLMNOPQRSTUVXWYZ", u, i, r = "", e = n.toUpperCase(), t = 0, f = n.length; t < f; t++)i = e.charAt(t), u = o.indexOf(i), r += u > -1 ? s.charAt(u) : i;
    return r
}
function SearchTerm(n) {
    var r = 0, t = [];
    for (n = n.toLowerCase(), i = 0; i < cities.length; i++)cities[i].toLowerCase().indexOf(n, 0) != -1 && (t[r] = cities[i], r++);
    return t
}
function SearchTermWithPost(n, t) {
    var i = SearchTerm(n.term.RemoveDiacritics());
    i.length > 1 ? t(i) : $.ajax({
        type: "POST",
        url: "/Produtos/UserControls/asmx/PesqInc.asmx/RetornarLocalidade",
        data: "{'prefixText':'" + n.term + "','count':10,'contextKey':'PesquisarLocalidade=0;PesquisarCidade=1;PesquisarEstado=1;PesquisarPais=1;PesquisarContinente=0;PesquisarAeroporto=1;PesquisarIata=1;QuantidadeItensRetorno=20;MostrarLocalidade=0;MostrarCidadeEstado=1;MostrarPais=1;MostrarAeroportoIata=1;MostrarContinente=0'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (n) {
            t(n)
        }
    })
}
function isOLD_Navigator() {
    return navigator.userAgent.indexOf("MSIE 6.") != -1 || navigator.userAgent.indexOf("MSIE 5.") != -1 || navigator.userAgent.indexOf("MSIE 4.") != -1
}
function getBrazilianDateInternal(n) {
    var s = n.getUTCDate(), e = n.getUTCMonth(), o = n.getUTCFullYear(), u = n.getUTCHours() - 3, f = n.getUTCMinutes(), i = n.getUTCSeconds(), r = n.getTimezoneOffset(), t = new Date(o, e, s, u, f, i);
    return t.setUTCHours(n.getUTCHours() - (180 - r) / 60), t
}
function addDayServerDate(n, t) {
    var r = parseFloat(n.Month), i;
    return i = 31, r == 4 && i > 30 && (i = 30), r == 6 && i > 30 && (i = 30), r == 9 && i > 30 && (i = 30), r == 11 && i > 30 && (i = 30), r == 2 && i > 29 && (i = 29), r == 2 && i >= 28 && (iBiSexto = iAno / 4, i = iBiSexto.toString().length == 3 ? 29 : 28), n.Day = parseFloat(n.Day) + t, n.Day > i ? (n.Month = parseFloat(n.Month) + 1, n.Day = 1) : n.Day < 1 && (n.Month = parseFloat(n.Month) - 1, n.Month > 0 && (r = parseFloat(n.Month), r == 4 && i > 30 && (i = 30), r == 6 && i > 30 && (i = 30), r == 9 && i > 30 && (i = 30), r == 11 && i > 30 && (i = 30), r == 2 && i > 29 && (i = 29), r == 2 && i >= 28 && (iBiSexto = iAno / 4, i = iBiSexto.toString().length == 3 ? 29 : 28), n.Day = i)), n.Month > 12 ? (n.Month = 1, n.Year = parseFloat(n.Year) + 1) : n.Month < 1 && (n.Day = 31, n.Month = 12, n.Year = parseFloat(n.Year) - 1), n
}
function isValidPhoneType(n, t) {
    var i;
    if (n.length < 8 || isNaN(n))return !1;
    if (t == "FIXO") {
        if (i = n.substring(0, 1), i = parseInt(i), i > 5)return !1
    } else if (t == "MOVEL" && (i = n.substring(0, 1), i = parseInt(i), i < 5))return !1;
    return !0
}
function EquipmentResolver(n) {
    return n == 0 ? "Avião" : n == 1 ? "Onibus" : n == 2 ? "Trem" : n == 3 ? "Carro" : n == 4 ? "Caminhão" : n == 5 ? "Barco" : n == 6 ? "Helicoptero" : "Avião"
}
function ClientError() {
    this.Data, this.Namespace, this.ExplicitOriginalTarget, this.Message, this.Method, this.JSONData, this.UserBrowser = navigator.userAgent, this.PointOfSale, this.GetRequest = function () {
        return CurrentPointOfSale != undefined && (this.PointOfSale = CurrentPointOfSale), {
            Data: this.Data,
            Namespace: this.Namespace,
            ExplicitOriginalTarget: this.ExplicitOriginalTarget,
            Message: this.Message,
            Method: this.Method,
            JSONData: this.JSONData,
            UserBrowser: this.UserBrowser,
            PointOfSale: this.PointOfSale
        }
    }
}
function CheckMaxValueToField(n, t) {
    return n <= t
}
function ValidatePhoneNumber(n, t) {
    var i = null;
    switch (t) {
        case PhoneType.Comercial:
        case PhoneType.Residencial:
            i = /^[0-5]/;
            break;
        case PhoneType.Celular:
            i = /^[5-9]/;
            break;
        default:
            return !1
    }
    return i.test(n)
}
function isCCInternational(n) {
    var u = $("input[name=paymentTypes]:radio:checked").val() == 3, t, r, i;
    if (u) {
        if (BinCCInternacional != undefined)for (t = 0, r = BinCCInternacional.length; t < r; t++) {
            if ((i = BinCCInternacional[t].toString().length, n.length < i) || u && BinCCInternacional[t] == n.substring(0, i))return !1;
            if (BinCCInternacional[t] == n.substring(0, i))return !0
        }
        return !0
    }
    for (t = 0, r = BinCCInternacional.length; t < r; t++)if ((i = BinCCInternacional[t].toString().length, n.length < i) || BinCCInternacional[t] == n.substring(0, i))return !0;
    return !1
}
function CreateStarsTypes(n) {
    var i = ["silver", "silver", "silver", "silver", "silver"], t = 0;
    for (t; t < n; t++)i[t] = "gold";
    return n < t && (i[t - 1] = "half"), i
}
function SetLocationName(n) {
    var t = n.FullName;
    return n.RegionCode && n.RegionCode != "" && (t += " / " + n.RegionCode), n.Country && n.Country != "" && (t += ", " + n.Country), t
}
function AdjustIATA(n) {
    return n.replaceAll("---", ")").replaceAll("--", "(")
}
function SetLocationNameWithIATA(n) {
    var t = n.FullName;
    return n.RegionCode && n.RegionCode != "" && (t += " / " + n.RegionCode), n.Country && n.Country != "" && (t += ", " + n.Country), n.IATA && trim(n.IATA) != "" && (t += " (" + n.IATA + ")"), t
}
function GenderCodeToGenderString(n) {
    switch (parseInt(n)) {
        case Gender.Masculino:
            return "Masculino";
        case Gender.Feminino:
            return "Feminino"
    }
}
function PaxTypeCodeToPaxTypeString(n) {
    switch (n) {
        case PaxType.Adulto:
            return "Adulto";
        case PaxType.Crianca:
            return "Criança";
        case PaxType.Bebe:
            return "Bebê"
    }
}
function CabinTypeCodeToCabinTypeString(n) {
    switch (n) {
        case CabinType.PrimeiraClasse:
            return "Primeira Classe";
        case CabinType.Executiva:
            return "Executiva";
        default:
            return "Economica"
    }
}
function GetCCExpireDateFromDate(n) {
    return n.format("MM/yyyy")
}
function ArrToString(n) {
    var i = "", t;
    for (t in n)i += n[t];
    return i
}
function isValidDate(n, t) {
    var i;
    if (t) {
        t = t.toLowerCase().replace(/[^dmy]/g, "");
        var f = t.indexOf("d") + 1, r = t.indexOf("m") + 1, u = t.indexOf("y") + 1
    } else var r = 2, f = 1, u = 3;
    return (i = n.match(/^\b(\d+)\D(\d+)\D(\d+)\b\b(?:\s+(\d{1,2})\D(\d{2})\D*((\d{2})?))?\b$/), !i) ? !1 : (i.clearUndefined(), i.clearStringEmpty(), checkDate(i[f], i[r], i[u]) ? !0 : !1)
}
function checkDate(n, t, i) {
    var r = /^(19|20)\d\d-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    return r.test(i + "-" + t + "-" + n) ? n == 31 && (/^0?[469]$/.test(t) || t == 11) ? !1 : n >= 30 && t == 2 ? !1 : t != 2 || n != 29 || i % 4 == 0 && (i % 100 != 0 || i % 400 == 0) ? !0 : !1 : !1
}
function checkTime(n, t, i) {
    i || (i = "00");
    var r = /^(0?\d|1\d|2[0-3]):[0-5]?\d:[0-5]?\d$/;
    return r.test(n + ":" + t + ":" + i)
}
function verificarDataPesquisaVoo(n) {
    n.value != "" && (isValidDate(n.value) ? (adjustDate(n), AirMotorUC.SearchRules(n)) : n.value = "")
}
function InArray(n, t) {
    for (var i = 0; i < t.length; i++)if (n == t[i])return !0;
    return !1
}
function getParamQueryString(n) {
    for (hu = window.location.search.substring(1), gy = hu.split("&"), i = 0; i < gy.length; i++)if (ft = gy[i].split("="), ft[0] == n)return ft[1]
}
function Reverse(n) {
    for (var i = "", r = n.split(""), t = r.length - 1; t > -1; t--)i += r[t];
    return i
}
function PutPoint(n) {
    return n = Reverse(n), n = n.replace(/(\d{3})()/g, "$1.$2"), n = Reverse(n).replace(/^\./, "")
}
function pluginDefaultBehavior(n, t, i, r) {
    var u, i, f;
    if (!n.length)return n;
    if (u = i[0], i = Array.prototype.slice.call(i, 1), typeof u == "string") {
        if (f = $(n[0]).data(t + "Data"), f && f[u])return f[u].apply(n, i);
        console && console.log("Unable to find method " + u + " in element " + t)
    } else return n.each(function () {
        var n = $(this).data(t + "Data");
        n || (n = r(), $(this).data(t + "Data", n)), n.initialize(this, u)
    })
}
function openPopunder() {
    (CurrentPointOfSale == "SUBMARINO" || CurrentPointOfSale == "AMERICANAS" || CurrentPointOfSale == "SHOPTIME") && (TheNewWin = window.open("", "name" + CurrentPointOfSale, "height=359,width=615,top=0,left=0,close=yes,dialog=yes,minimizable=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no"), TheNewWin.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">'), TheNewWin.document.write('<head><title>Fale Conosco</title></head><body style="overflow:hidden" bgcolor="#ffffff"><img src="' + rootPath), TheNewWin.document.write("Styles/images/" + CurrentPointOfSale + '/img-popunder.jpg" /></body></html>'), TheNewWin.blur(), window.focus())
}
function imgError(n) {
    n.attr("src", "Styles/images/icos_cias/companhia.png")
}
function isNull(n) {
    return n == undefined || n == null
}
function isEmpty(n) {
    return !isNull(n) && n == ""
}
function isNullOrEmpty(n) {
    return isNull(n) || isEmpty(n)
}
function replaceAll(n, t, i) {
    return n.replace(new RegExp(t, "g"), i)
}
function getClientIP() {
    var n;
    return n = document.getElementById("ipclient") != null ? document.getElementById("ipclient").innerHTML : "0.0.0.0"
}
function GetMinimumTimeToSellHotel() {
    var n = new Date;
    return n.getHours() < 15 ? new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1) : new Date(n.getFullYear(), n.getMonth(), n.getDate() + 2)
}
function GetSearchUrl() {
    if (isB2B()) {
        if (isAir)return document.getElementById("voltar-air");
        if (isHotel)return document.getElementById("voltar-hotel");
        if (isAirHotel)return document.getElementById("voltar-airhotel")
    } else {
        if (isAir)return document.getElementById("voltar-aereo");
        if (isHotel)return document.getElementById("voltar-hotel");
        if (isAirHotel)return document.getElementById("voltar-aereo-hotel")
    }
}
function ShowCustomAlert(n, t, i, r) {
    $("#customAlertText").html(n), t ? $("#customAlertOK").show() : $("#customAlertOK").hide(), i ? $("#customAlertClose").show() : $("#customAlertClose").hide(), typeof r != "undefined" ? $("#customAlertOK").unbind().click(r) : $("#customAlertOK").unbind(), window.setTimeout(function () {
        CreateHintBoxy($("#divCustomAlert"))
    }, 100)
}
function CalculaIdade(n, t, i, r, u, f) {
    var e = new Date;
    r && u && f && (e = new Date(r, u - 1, f));
    var o = new Date(n, t - 1, i), h = e.getFullYear() - o.getFullYear(), s = e.getMonth() - o.getMonth();
    return (s < 0 || s === 0 && e.getDate() < o.getDate()) && h--, h
}
function ServiceProxy(n) {
    var i = this, t = 12e5, r = new RegExp("^(http|https|ftp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$");
    this.serviceUrl = n, this.invoke = function (n, u, f, e, o, s) {
        u != null && u.req != null && (u.req.UserBrowser = navigator.userAgent);
        var c = JSON2.stringifyWcf(u), h = i.serviceUrl + n;
        return s && (t = s), o && o.show(), $.ajax({
            url: h,
            data: c,
            type: "POST",
            processData: !1,
            contentType: "application/json",
            timeout: t,
            dataType: "text",
            success: function (n) {
                if (o && o.hide(), (n == null || n == "") && e) {
                    e && e(n);
                    return
                }
                if (f) {
                    setTimeout(function () {
                        try {
                            var i = this.JSON ? this.JSON : JSON2, t = i.parse(n);
                            typeof t != "string" || r.test(t) || (t = i.parse(t), t = Util.JSONMinimumDeserializer(t)), f(t)
                        } catch (u) {
                            PublishStringClientError(u), e && e(n)
                        }
                    }, 0);
                    return
                }
            },
            error: function (t, r) {
                var s, h, c;
                try {
                    if (r == "timeout") {
                        if (o && o.hide(), t.responseText && t.responseText != "") {
                            s = {IsJSON: !1, JSONResponse: null, HtmlResponse: null};
                            try {
                                h = JSON2.parse(t.responseText), s.IsJSON = !0, s.JSONResponse = h
                            } catch (a) {
                                h = t.responseText, s.IsJSON = !1, s.HtmlResponse = h
                            }
                            if (n != "Log")try {
                                c = new ServiceProxy(i.serviceUrl), setTimeout(function () {
                                    c.invoke("Log", {
                                        req: {
                                            Message: t.responseText,
                                            Module: n,
                                            JSONData: JSON2.stringify(u)
                                        }
                                    }, function () {
                                    }, function () {
                                    })
                                }, 0)
                            } catch (l) {
                            }
                        }
                        e && e(t);
                        return
                    }
                } catch (l) {
                }
            }
        })
    }
}
function TrackOmni_social(n, t, i, r) {
    s.pageName = incObjPointOfSale + ":" + n, s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.eVar39 = incObjPointOfSale, t != "" && (s.prop40 = incObjPointOfSale + ":" + t, s.eVar40 = incObjPointOfSale + ":" + t), t != "" && i != "" && (s.prop41 = incObjPointOfSale + ":" + t + ":" + i, s.eVar41 = incObjPointOfSale + ":" + t + ":" + i), t != "" && i != "" && r != "" && (s.prop42 = incObjPointOfSale + ":" + t + ":" + i + ":" + r, s.eVar42 = incObjPointOfSale + ":" + t + ":" + i + ":" + r);
    var u = "";
    switch (n) {
        case"facebook":
            u = "event4";
            break;
        case"gplus":
            u = "event5";
            break;
        case"twitter":
            u = "event6"
    }
    s.events = u, s.t()
}
function stripaccents(n) {
    for (var f = "", t, i, u, r = 0; r < n.length; r++)t = n[r], i = t.charCodeAt(0) - 192, i >= 0 && i < stripstring.length && (u = stripstring.charAt(i), u != "." && (t = u)), f += t;
    return f
}
function s_getObjectID(n) {
    return n.href
}
function AUNICA_ChecaParametro(n, t) {
    var r, u, i;
    AUParam_ = "", AUParam_ = n, t == "S" ? (AUParam_.indexOf("|") != -1 && (r = AUParam_.split("|"), AUParam_ = r[0]), AUParam_.indexOf("?") != -1 && (r = AUParam_.split("?"), AUParam_ = r[0])) : AUParam_.indexOf("?") != -1 && (AUParam_ = ""), i = [], i[0] = "#@", i[1] = "#$", i[2] = "\\>", i[3] = "'", i[4] = "=", i[5] = "(", i[6] = ")", i[7] = ">", i[8] = "<", i[9] = "*", i[10] = "**", i[11] = "***", i[12] = "select", i[13] = "update", i[14] = "delete", i[15] = "where", i[16] = "union", i[17] = "from", i[18] = "join", i[19] = "table", i[20] = "sysdate", i[21] = "varchar", i[22] = "integer", i[23] = "&";
    for (u in i)AUParam_.indexOf(i[u]) != -1 && (AUParam_ = "");
    return AUParam_
}
function s_doPlugins(n) {
    if (s_first_doPlugins && (n.getObjectID = s_getObjectID, n.setupDynamicObjectIDs(), s_first_doPlugins = !1), n.pageType || n.pageName != "" || (n.pageName = n.getPageName(), n.pageName = n.pageName.toLowerCase()), s_cid_aux = AUNICA_ChecaParametro(n.getQueryParam("s_cid"), "S"), s_cid_aux && (n.campaign || (n.campaign = s_cid_aux, n.prop57 = n.campaign, n.prop58 = n.campaign + ":" + n.pageName, n.eVar57 = n.prop57, n.eVar58 = n.prop58)), s_emid_aux = AUNICA_ChecaParametro(n.getQueryParam("s_emid"), "S"), s_emid_aux && (n.campaign || (n.campaign = s_emid_aux, n.prop57 = n.campaign, n.prop58 = n.campaign + ":" + n.pageName, n.eVar57 = n.prop57, n.eVar58 = n.prop58)), s_kwcid_aux = AUNICA_ChecaParametro(n.getQueryParam("s_kwcid"), "N"), s_kwcid_aux && (n.campaign || (n.campaign = s_kwcid_aux, n.prop57 = n.campaign, n.prop58 = n.campaign + ":" + n.pageName, n.eVar57 = n.prop57, n.eVar58 = n.prop58)), s_icid_aux = AUNICA_ChecaParametro(n.getQueryParam("s_icid"), "S"), s_icid_aux && (n.eVar59 || (n.eVar59 = s_icid_aux, n.prop59 = n.eVar59, n.prop60 = n.eVar59 + ":" + n.pageName, n.eVar60 = n.prop60)), n.prop61 = "Sem Informacao de Origem", n.eVar61 = n.prop61, n.campaign)n.prop61 = n.campaign, n.eVar61 = n.prop61; else if (document.referrer) {
        var t = [];
        t = document.referrer.split("/"), n.prop61 = t[2], n.eVar61 = n.prop61
    }
    campaignTmp = getCookie("gpv_v0"), campaignTmp != "" && campaignTmp != "no value" ? n.prop58 = campaignTmp + ":" + n.pageName : n.campaign && campaignTmp == "" && setCookie("gpv_v0", n.campaign, null, "/"), campaignIntTmp = getCookie("gpv_v1"), campaignIntTmp != "" && campaignIntTmp != "no value" ? n.prop60 = campaignIntTmp + ":" + n.pageName : n.eVar59 && campaignIntTmp == "" && setCookie("gpv_v1", n.eVar59, null, "/"), n.campaign = n.getValOnce(n.campaign, "gvo_v0", 0), n.eVar59 = n.getValOnce(n.eVar59, "gvo_v1", 0), n.server = ServerHost, n.clickThruQuality("s_kwcid,s_cid", "event38", "event39")
}
function getCookie(n) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(n + "="), c_start != -1) ? (c_start = c_start + n.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}
function verifEvento(n) {
    var r = "gpv_" + n, t = "", i = [];
    if (s.events && s.events.indexOf(n) >= 0)if (cookieEvento = getCookie(r), cookieEvento.indexOf(n) >= 0)for (i = s.events.split(","), ind = 0; ind < i.length; ind++)i[ind] != n && (t = t == "" ? i[ind] : t + "," + i[ind]); else setCookie(r, s.events, null, "/"), t = s.events;
    return t
}
function setCookie(n, t, i) {
    var r = new Date;
    r.setDate(r.getDate() + i), document.cookie = n + "=" + escape(t) + (i == null ? "" : ";expires=" + r.toUTCString())
}
function trackOmni(n) {
    for (position in n)s[position] = n[position];
    s.t();
    for (position in n)s[position] = ""
}
function trackOmniPersonalizado(n) {
    s.tl(this, "o", n)
}
function s_gi(n, t, i) {
    var s = "s.version='H.24.3';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}", u = window, l = u.s_c_il, p = navigator, a = p.userAgent, c = p.appVersion, v = c.indexOf("MSIE "), y = a.indexOf("Netscape6/"), f, e, h, o, r;
    if (n && (n = n.toLowerCase(), l))for (h = 0; h < 2; h++)for (e = 0; e < l.length; e++)if (r = l[e], o = r._c, (!o || o == "s_c" || h > 0 && o == "s_l") && (r.oun == n || r.fs && r.sa && r.fs(r.oun, n))) {
        if (r.sa && r.sa(n), o == "s_c")return r
    } else r = 0;
    return u.s_an = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", u.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a"), u.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x"), u.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)"), u.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x"), u.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")"), u.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a"), u.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;"), s = s_d(s), v > 0 ? (f = parseInt(e = c.substring(v + 5)), f > 3 && (f = parseFloat(e))) : f = y > 0 ? parseFloat(a.substring(y + 10)) : parseFloat(c), (f < 5 || c.indexOf("Opera") >= 0 || a.indexOf("Opera") >= 0) && (s = s_ft(s)), r || (r = {}, u.s_c_in || (u.s_c_il = [], u.s_c_in = 0), r._il = u.s_c_il, r._in = u.s_c_in, r._il[r._in] = r, u.s_c_in++), r._c = "s_c", new Function("s", "un", "pg", "ss", s)(r, n, t, i), r
}
function s_giqf() {
    var u = window, r = u.s_giq, t, n, i;
    if (r)for (t = 0; t < r.length; t++)n = r[t], i = s_gi(n.oun), i.sa(n.un), i.setTagContainer(n.tagContainerName);
    u.s_giq = 0
}
function OmnitureTrack() {
    this.bindBotoesAereos = !1, this.bindBotoesHotel = !1, this.bindBotoesPacotes = !1, this.sendBlockClickedQTDblocks = function (n) {
        var i = $("#priceGroupsContainer > div").size(), t;
        $("#priceGroupsContainer > div .priceGroup_btnBuy").each(function (i) {
            if ($(this).context.id == n.context.id)return t = i + 1, !1
        }), $("#ClickedBlockQTDblock").val(t + "|" + i)
    }, this.identificaChekout = function (n) {
        var r = n.ShoppingCart.AirHotelItems.length, i = n.ShoppingCart.AirItems.length, t = n.ShoppingCart.HotelItems.length;
        r > 0 ? this.TrackOmni_pacotescomprar(n) : i > 0 ? this.TrackOmni_passagensaereascomprar(n) : t > 0 && this.TrackOmni_hoteiscomprar(n)
    }, this.identificaConfirmation = function (n) {
        var i = n.Order.OrderItems[0].BookingAirs.length, t = n.Order.OrderItems[0].HotelBookings.length;
        i > 0 && t > 0 ? this.TrackOmni_pacotesconfirmacao(n) : i > 0 ? this.TrackOmni_passagensaereasconfirmacao(n) : t > 0 && this.TrackOmni_hoteisconfirmacao(n)
    }, this.identificaBusca = function (n, t) {
        var i = n.Type;
        i == "Air" ? this.TrackOmni_passagensaereasbusca(n, t) : i == "Hotel" ? this.TrackOmni_hoteisbusca(n, t) : i == "AirHotel" && this.TrackOmni_pacotesbusca(n, t)
    }, this.faixaPrecosPassagem = function (n) {
        var t = null;
        return (n != "" || n != null) && (n = Math.round(n), n > 0 && n <= 999 ? t = "faixa1" : n >= 1e3 && n <= 1999 ? t = "faixa2" : n >= 2e3 && n <= 2999 ? t = "faixa3" : n >= 3e3 && n <= 3999 ? t = "faixa4" : n >= 4e3 && n <= 4999 ? t = "faixa5" : n >= 5e3 && (t = "faixa6")), t
    }, this.faixaPrecosHotel = function (n) {
        var t = null;
        return n = Math.round(n), (n != "" || n != null) && (n > 0 && n <= 499 ? t = "faixa1" : n >= 500 && n <= 749 ? t = "faixa2" : n >= 750 && n <= 999 ? t = "faixa3" : n >= 1e3 && n <= 1999 ? t = "faixa4" : n > 1999 && (t = "faixa5")), t
    }, this.faixaHorarioPassagem = function (n) {
        var t = null;
        return (n != "" || n != null) && (n > 6 && n <= 9 ? t = "faixa1" : n >= 10 && n <= 13 ? t = "faixa2" : n >= 14 && n <= 17 ? t = "faixa3" : n >= 18 && n <= 21 ? t = "faixa4" : n >= 22 && n <= 23 ? t = "faixa5" : n >= 0 && n <= 1 ? t = "faixa5" : n >= 2 && n <= 6 && (t = "faixa6")), t
    }, this.TrackOmni_passagensaereasbusca = function (n, t) {
        var i, f, r, u;
        try {
            if (t.PriceGroups == null)return !1;
            i = new TrataObjOmnitureBusca(n, "Air"), f = t.PriceGroups.length > 0 ? t.PriceGroups.length : 0, s.pageName = incObjPointOfSale + ":passagens-aereas:busca", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":passagens-aereas", s.prop41 = incObjPointOfSale + ":passagens-aereas:busca", s.events = "event1,prodView", s.prop1 = i.txtOrigem, s.prop3 = i.txtDataIda, s.prop4 = i.txtDataVolta, s.prop5 = i.selCabin, i.chkIdaVolta ? (s.events += ",event17", s.prop18 = i.Duracao) : (s.events += ",event18", s.prop18 = "0"), s.prop6 = i.chkIdaVolta ? "Ida e Volta" : "Somente Ida", s.prop7 = i.drpQtdADT, s.prop8 = i.drpQtdCHD, s.prop9 = i.drpQtdINF, s.prop10 = i.chkSemParada, s.prop12 = i.Cia, s.prop13 = i.txtHoraIda, s.prop14 = i.txtHoraVolta, s.prop17 = i.DiasSaida, s.prop21 = f, s.eVar1 = s.prop1, s.eVar3 = s.prop3, s.eVar4 = s.prop4, s.eVar5 = s.prop5, s.eVar6 = s.prop6, s.eVar7 = s.prop7, s.eVar8 = s.prop8, s.eVar9 = s.prop9, s.eVar10 = s.prop10, s.eVar12 = s.prop12, s.eVar13 = s.prop13, s.eVar14 = s.prop14, s.eVar17 = s.prop17, s.eVar18 = s.prop18, s.eVar21 = s.prop21, s.eVar39 = s.prop39, s.eVar40 = s.prop40, s.eVar41 = s.prop41, n.offerValue != 0 && (s.eVar73 = n.Origin + "|" + n.Destination + "|" + n.offerValue + "|" + t.PriceGroups[0].Price), s.products = ";Aereo", s.t()
        } catch (e) {
            PublishStringClientError(e)
        }
        r = function (n) {
            trackOmniPersonalizado(incObjPointOfSale + ":passagensaereas:busca:" + n)
        }, u = function (n) {
            try {
                var t = "event26";
                t += n == "email-enviado" ? ",event8" : "", trackOmni({
                    pageName: incObjPointOfSale + ":passagens-aereas:busca:" + n,
                    channel: incObjPointOfSale,
                    prop39: incObjPointOfSale,
                    prop40: incObjPointOfSale + ":passagens-aereas",
                    prop41: incObjPointOfSale + ":passagens-aereas:busca",
                    prop1: i.txtOrigem,
                    prop3: i.txtDataIda,
                    prop4: i.txtDataVolta,
                    prop5: i.selCabin,
                    prop7: i.drpQtdADT,
                    prop8: i.drpQtdCHD,
                    prop9: i.drpQtdINF,
                    prop10: i.chkSemParada,
                    events: t,
                    eVar1: i.txtOrigem,
                    eVar3: i.txtDataIda,
                    eVar4: i.txtDataVolta,
                    eVar5: i.selCabin,
                    eVar7: i.drpQtdADT,
                    eVar8: i.drpQtdCHD,
                    eVar9: i.drpQtdINF,
                    eVar10: i.chkSemParada,
                    eVar39: incObjPointOfSale,
                    eVar40: incObjPointOfSale + ":passagens-aereas",
                    eVar41: incObjPointOfSale + ":passagens-aereas:busca",
                    products: ";Aereo"
                })
            } catch (r) {
                PublishStringClientError(r)
            }
        }, this.bindBotoesAereos || ($("a.lnk_azul").live("click", function () {
            u("duvidas")
        }), $("span.ico_ajuda").live("click", function () {
            u("tire-suas-duvidas")
        }), $("div.priceGroup_icoInfo").live("click", function () {
            u("informacoes")
        }), $("tr.priceGroup_bottom-links td span").live("click", function () {
            u("enviar-email")
        }), $("#formulario #infos #bt-enviar").live("click", function () {
            u("email-enviado")
        }), $("#btnVejaMais").live("click", function () {
            u("ver-mais")
        }), $("#divSliderIda a.ui-slider-handle").live("mousedown", function () {
            r("horario-ida")
        }), $("#divSliderVolta a.ui-slider-handle").live("mousedown", function () {
            r("horario-volta")
        }), $("#divSliderPrice.sliderAirPrice").live("mousedown", function () {
            r("preco-aereo")
        }), $("input.chkFilterStops").live("click", function () {
            r("escalas")
        }), $("input.chkFilterCabinType").live("click", function () {
            r("classe")
        }), $("input.chkFilterAirCompany").live("click", function () {
            r("companhia")
        }), $("div.sliderDuration1 a.ui-slider-handle").live("mousedown", function () {
            r("duracao")
        }), $("input.chkFilterAirportsOutBound").live("click", function () {
            r("aeroporto-partida")
        }), $("input.chkFilterAirportsInbound").live("click", function () {
            r("aeroporto-chegada")
        }), $("input.chkFilterAirportsRoundTrip").live("click", function () {
            r("mesmo-aeroporto-ida-volta")
        }), this.bindBotoesAereos = !0)
    }, this.TrackOmni_passagensaereascomprar = function (n) {
        try {
            s.pageName = incObjPointOfSale + ":passagens-aereas:comprar", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":passagens-aereas", s.prop41 = incObjPointOfSale + ":passagens-aereas:comprar", s.prop24 = n.ShoppingCart.AirItems[0].FlightGroups[0].Flights[0].CiaName, s.prop24 = n.ShoppingCart.AirItems[0].FlightGroups[1] ? s.prop24 + "|" + n.ShoppingCart.AirItems[0].FlightGroups[1].Flights[0].CiaName : s.prop24;
            var t = n.Summary.TotalAmount;
            s.prop48 = this.faixaPrecosPassagem(t), s.prop49 = this.faixaHorarioPassagem(n.ShoppingCart.AirItems[0].FlightGroups[0].FirstArrivalTimeValues.Hour), s.events = "event2,scCheckout", s.eVar24 = s.prop24, s.eVar39 = s.prop39, s.eVar40 = s.prop40, s.eVar41 = s.prop41, s.eVar48 = s.prop48, s.eVar49 = s.prop49, s.eVar70 = $("#ClickedBlockQTDblock").val(), s.products = ";Aereo", s.t()
        } catch (i) {
            PublishStringClientError(i)
        }
    }, this.TrackOmni_passagensaereasconfirmacao = function (n) {
        var t, f, u;
        try {
            s.pageName = incObjPointOfSale + ":passagens-aereas:confirmacao", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":passagens-aereas", s.prop41 = incObjPointOfSale + ":passagens-aereas:confirmacao", t = n, s.events = "event3,purchase", s.events += t.Order.User.AcceptReceiveEmail.toString() == "true" ? ",event29" : "", s.events += t.Order.OrderItems[0].Insurances ? ",event14" : "";
            var w = t.Summary.InsuranceAmount ? t.Summary.InsuranceAmount : "0", b = "cartao|" + t.Order.Payments[0].CreditCardProvider + "|" + t.Order.Payments[0].CreditCardPayment.Installments, p = stripaccents(t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].IssuerCiaName), v = t.Order.Payments[0].CreditCardOwner + "|" + t.Order.Payments[0].CPFOwner + "|" + t.Order.User.Email + "|" + t.Order.ContactsInformation[0].PreFix + t.Order.ContactsInformation[0].PhoneNumber, y = stripaccents(t.Order.Payments[0].BillAddress.City + " - " + t.Order.Payments[0].BillAddress.UF), nt = new Date(t.Order.Passengers[0].BirthDateValues.Day + "/" + t.Order.Passengers[0].BirthDateValues.Month + "/" + t.Order.Passengers[0].BirthDateValues.Year), tt = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Day + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Month + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Year, g = DateDiff.inYears(nt, new Date), k = t.Order.Passengers[0].Gender == 0 ? "Masculino" : "Feminino", d = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Origin + "-" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Destination, e = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Flights.length, o = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1] ? t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].Flights.length : 0, r = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Month + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Day + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Year, h = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].FirstDepartureTimeValues.Hour, a = t.Summary.ServiceTaxesAmount, l = t.Summary.TaxesAmount, c = t.Summary.InsuranceAmount, i = Cookies.getCookie("InsuranceABTest");
            Cookies.setCookie("InsuranceABTest", "", -1), s.prop19 = w, s.prop20 = b, s.prop23 = p, s.prop25 = v, s.prop26 = y, s.prop27 = g, s.prop28 = k, s.prop29 = d, s.prop31 = tt, s.prop35 = t.Summary.Adults, s.prop36 = t.Summary.Childs ? t.Summary.Childs : "0", s.prop37 = t.Summary.Babies ? t.Summary.Babies : "0", s.prop38 = t.Summary.DaysStay ? t.Summary.DaysStay : "0", s.prop48 = this.faixaPrecosPassagem(t.Summary.TotalAmount.toFixed(2)), s.prop49 = this.faixaHorarioPassagem(h), s.prop52 = e > 1 || o > 1 ? "Com Escala" : "Sem Escala", s.prop64 = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Origin + "-" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Destination, s.prop65 = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1] ? t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].Origin + "-" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].Destination : "NÃO DISPONÍVEL", s.prop66 = DateDiff.inDays(new Date, new Date(r)) + " dias", n.Order.OrderItems[0].BookingAirs[0].FlightGroups[1] != null ? (f = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Day + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Month + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Year, u = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Month + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Day + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Year, s.prop67 = DateDiff.inDays(new Date(r), new Date(u)) + " dias", s.prop32 = f, s.eVar32 = s.prop32) : s.prop67 = "NÃO DISPONÍVEL", s.events += ",event15,event16,event11,event12,event13", s.purchaseID = t.Order.Passengers[0].OrderId, s.prop68 = s.purchaseID, s.eVar19 = s.prop19, s.eVar20 = s.prop20, s.eVar23 = s.prop23, s.eVar25 = s.prop25, s.eVar26 = s.prop26, s.eVar27 = s.prop27, s.eVar28 = s.prop28, s.eVar29 = s.prop29, s.eVar31 = s.prop31, s.eVar35 = s.prop35, s.eVar36 = s.prop36, s.eVar37 = s.prop37, s.eVar38 = s.prop38, s.eVar39 = s.prop39, s.eVar40 = s.prop40, s.eVar41 = s.prop41, s.eVar48 = s.prop48, s.eVar49 = s.prop49, s.eVar52 = s.prop52, s.eVar65 = s.prop65, s.eVar64 = s.prop64, s.eVar66 = s.prop66, s.eVar67 = s.prop67, s.eVar68 = s.prop68, i && i != "" && (s.eVar69 = i), s.products = ";Aereo;" + (parseInt(s.eVar35) + parseInt(s.eVar36) + parseInt(s.eVar37)).toString() + ";" + t.Summary.TotalAmount.toFixed(2) + ";event11=" + a + "|event12=" + c + "|event13=" + l, s.t()
        } catch (it) {
            PublishStringClientError(it)
        }
    }, this.TrackOmni_hoteisbusca = function (n, t) {
        var i, o, c, l, r, e;
        try {
            i = new TrataObjOmnitureBusca(n, "Hotel"), o = t.Hotels.length > 0 ? t.Hotels.length : 0, s.pageName = getParameterByName("MarkupType") == "2" ? incObjPointOfSale + ":hotellight:busca" : incObjPointOfSale + ":hoteis:busca", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":hoteis", s.prop41 = incObjPointOfSale + ":hoteis:busca", s.events = "event1,prodView";
            var h = i.drpQtdQuartos, f = i.drpQtdAdultosQuarto1, u = i.drpQtdCriancasQuarto1;
            h == 2 && (f = f + i.drpQtdAdultosQuarto2, u = u + i.drpQtdCriancasQuarto2), h == 3 && (f = f + i.drpQtdAdultosQuarto2 + i.drpQtdAdultosQuarto3, u = u + i.drpQtdCriancasQuarto2 + i.drpQtdCriancasQuarto3), s.prop2 = i.txtDestination, s.prop3 = i.txtCheckIn, s.prop4 = i.txtCheckOut, s.prop7 = f, s.prop8 = u, s.prop11 = h, c = new Date(i.txtCheckIn.split("/")[2], i.txtCheckIn.split("/")[1] - 1, i.txtCheckIn.split("/")[0]), l = new Date(i.txtCheckOut.split("/")[2], i.txtCheckOut.split("/")[1] - 1, i.txtCheckOut.split("/")[0]), s.prop17 = DateDiff.inDays(new Date, c), s.prop18 = DateDiff.inDays(c, l), s.prop21 = o, s.eVar2 = s.prop2, s.eVar3 = s.prop3, s.eVar4 = s.prop4, s.eVar7 = s.prop7, s.eVar8 = s.prop8, s.eVar11 = s.prop11, s.eVar17 = s.prop17, s.eVar18 = s.prop18, s.eVar21 = s.prop21, s.eVar39 = s.prop39, s.eVar40 = s.prop40, s.eVar41 = s.prop41, s.products = ";Hotel", s.t()
        } catch (a) {
            PublishStringClientError(a)
        }
        r = function (n) {
            trackOmniPersonalizado(incObjPointOfSale + ":hoteis:busca:" + n)
        }, e = function (n) {
            var f = i.drpQtdQuartos, r = i.drpQtdAdultosQuarto1, t = i.drpQtdCriancasQuarto1, u, e;
            f == 2 && (r = r + i.drpQtdAdultosQuarto2, t = t + i.drpQtdCriancasQuarto2), f == 3 && (r = r + i.drpQtdAdultosQuarto2 + i.drpQtdAdultosQuarto3, t = t + i._qtdCriancasQuarto2 + i._qtdCriancasQuarto3), u = new Date(i.txtCheckIn.split("/")[2], i.txtCheckIn.split("/")[1] - 1, i.txtCheckIn.split("/")[0]), e = new Date(i.txtCheckOut.split("/")[2], i.txtCheckOut.split("/")[1] - 1, i.txtCheckOut.split("/")[0]), trackOmni({
                pageName: incObjPointOfSale + ":hoteis:busca:" + n,
                channel: incObjPointOfSale,
                prop39: incObjPointOfSale,
                prop40: incObjPointOfSale + ":hoteis",
                prop41: incObjPointOfSale + ":hoteis:busca",
                prop2: i.txtDestination,
                prop3: i.txtCheckIn,
                prop4: i.txtCheckOut,
                prop7: r,
                prop8: t,
                prop11: f,
                prop17: DateDiff.inDays(new Date, u),
                prop18: DateDiff.inDays(u, e),
                prop21: o,
                eVar2: i.txtDestination,
                eVar3: i.txtCheckIn,
                eVar4: i.txtCheckOut,
                eVar7: r,
                eVar8: t,
                eVar11: f,
                eVar17: DateDiff.inDays(new Date, u),
                eVar18: DateDiff.inDays(u, e),
                eVar21: o,
                eVar39: incObjPointOfSale,
                eVar40: incObjPointOfSale + ":hoteis",
                eVar41: incObjPointOfSale + ":hoteis:busca",
                events: "event26",
                products: ";Hotel"
            })
        }, this.bindBotoesHotel || ($("a.infoduvidas-a").live("click", function () {
            e("duvidas")
        }), $("div.loc-img").live("click", function () {
            e("localizacao", i)
        }), $("div.fot-img").live("click", function () {
            e("fotos", i)
        }), $("div.campo-filtro-nome div.filtro-label-seta").live("click", function () {
            r("hotel")
        }), $("#divSliderPrice a.ui-slider-handle").live("mousedown", function () {
            r("preco")
        }), $("#divSliderCenterCity a.ui-slider-handle").live("mousedown", function () {
            r("distancia-centro")
        }), $("#divSliderNearestAirport a.ui-slider-handle").live("mousedown", function () {
            r("distancia-aeroporto")
        }), $("div.segura-filtro-categoria input.chkCategoryFilters").live("click", function () {
            r("categoria")
        }), this.bindBotoesHotel = !0)
    }, this.TrackOmni_hoteisDetalhes = function (n, t) {
        try {
            var e = n.Hotel.Location, f = n.Hotel.Name, o = t.CheckIn.Day + "/" + t.CheckIn.Month + "/" + t.CheckIn.Year, s = t.CheckOut.Day + "/" + t.CheckOut.Month + "/" + t.CheckOut.Year, u = parseInt(t.RoomsRequest.length), i = parseInt(t.RoomsRequest[0].Adults), r = parseInt(t.RoomsRequest[0].ChildAges);
            u > 1 && (i = i + t.RoomsRequest[1] ? parseInt(t.RoomsRequest[1].Adults) : "", r = r + t.RoomsRequest[1] ? parseInt(t.RoomsRequest[1].ChildAges) : ""), u > 2 && (i = i + t.RoomsRequest[2] ? parseInt(t.RoomsRequest[2].Adults) : "", r = r + t.RoomsRequest[2] ? parseInt(t.RoomsRequest[2].ChildAges) : ""), trackOmni({
                pageName: incObjPointOfSale + ":hoteis:busca:" + stripaccents(f),
                channel: incObjPointOfSale,
                prop39: incObjPointOfSale,
                eVar39: incObjPointOfSale,
                prop40: incObjPointOfSale + ":hoteis",
                eVar40: incObjPointOfSale + ":hoteis",
                prop41: incObjPointOfSale + ":hoteis:busca",
                eVar41: incObjPointOfSale + ":hoteis:busca",
                prop2: e,
                prop3: o,
                prop4: s,
                prop5: f,
                prop11: u,
                prop7: i,
                prop8: r,
                eVar2: e,
                eVar3: o,
                eVar4: s,
                eVar5: f,
                eVar11: u,
                eVar7: i,
                eVar8: r,
                events: "event25",
                products: ";Hotel"
            })
        } catch (h) {
            PublishStringClientError(h)
        }
    }, this.TrackOmni_hoteiscomprar = function (n) {
        try {
            s.pageName = incObjPointOfSale + ":hoteis:comprar", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":hoteis", s.prop41 = incObjPointOfSale + ":hoteis:comprar", s.prop43 = n.ShoppingCart.HotelItems[0] ? n.ShoppingCart.HotelItems[0].Hotel.Stars : 0, s.prop22 = n.ShoppingCart.HotelItems[0].Hotel.Name, s.eVar22 = s.prop22;
            var i = n.ShoppingCart.HotelItems[0] ? n.ShoppingCart.HotelItems[0].Hotel.TotalAmount : 0, t = n.ShoppingCart.HotelItems[0].Hotel.Location;
            s.prop44 = this.faixaPrecosHotel(i), s.prop47 = removerCaracteres(t), s.eVar39 = s.prop39, s.eVar40 = s.prop40, s.eVar41 = s.prop41, s.eVar43 = s.prop43, s.eVar44 = s.prop44, s.eVar47 = s.prop47, s.events = "event2,scCheckout", s.products = ";Hotel", s.t()
        } catch (r) {
            PublishStringClientError(r)
        }
    }, this.TrackOmni_hoteisconfirmacao = function (n) {
        var r;
        try {
            s.pageName = incObjPointOfSale + ":hoteis:confirmacao", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":hoteis", s.prop41 = incObjPointOfSale + ":hoteis:confirmacao";
            var t = n, k = t.Summary.ServiceTaxesAmount, d = t.Summary.TaxesAmount, b = t.Summary.InsuranceAmount;
            s.events = "event3,purchase,event11,event12,event13", s.events += t.Order.User.AcceptReceiveEmail.toString() == "true" ? ",event29" : "";
            var p = new Date(t.Order.CreationDateTimeValues.Day + "/" + t.Order.CreationDateTimeValues.Month + "/" + t.Order.CreationDateTimeValues.Year), ft = new Date(t.Order.CreationDateTimeValues.Month + "/" + t.Order.CreationDateTimeValues.Day + "/" + t.Order.CreationDateTimeValues.Year), w = t.Summary.InsuranceAmount ? t.Summary.InsuranceAmount : "0", it = "cartao|" + t.Order.Payments[0].CreditCardProvider + "|" + t.Order.Payments[0].CreditCardPayment.Installments, rt = t.Order.Passengers[0].Gender, g = new Date(t.Order.Passengers[0].BirthDateValues.Day + "/" + t.Order.Passengers[0].BirthDateValues.Month + "/" + t.Order.Passengers[0].BirthDateValues.Year), nt = DateDiff.inYears(g, p), tt = stripaccents(t.Order.Payments[0].BillAddress.City + " - " + t.Order.Payments[0].BillAddress.UF), y = stripaccents(t.Order.OrderItems[0].HotelBookings[0].Hotel.Name), i = t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Day + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Month + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Year, o = t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Day + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Month + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Year, f = t.Summary.Adults, u = t.Summary.Childs ? t.Summary.Childs : "0", h = t.Summary.Babies ? t.Summary.Babies : "0", a = t.Summary.DaysStay ? t.Summary.DaysStay : "0", e = t.Order.OrderItems[0].HotelBookings[0] ? t.Order.OrderItems[0].HotelBookings[0].Hotel.Stars : 0, v = t.Summary.TotalAmount ? t.Summary.TotalAmount : 0, c = new Date(t.Order.CreationDateTimeValues.Day + "/" + t.Order.CreationDateTimeValues.Month + "/" + t.Order.CreationDateTimeValues.Year), l = t.Order.Payments[0].CreditCardOwner + "|" + t.Order.Payments[0].CPFOwner + "|" + t.Order.User.Email + "|" + t.Order.ContactsInformation[0].PreFix + t.Order.ContactsInformation[0].PhoneNumber, et = new Date(t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Month + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Day + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Year);
            s.prop66 = DateDiff.inDays(c, new Date(i)), t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues != null ? (r = new Date(t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Day + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Month + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Year), s.prop67 = DateDiff.inDays(new Date(i), new Date(r))) : s.prop67 = "NÃO DISPONÍVEL", s.prop19 = w, s.prop20 = it, s.prop25 = l, s.prop26 = tt, s.prop27 = nt, s.prop28 = rt, s.prop30 = y, s.prop32 = o, s.prop35 = f, s.prop36 = u, s.prop37 = h, s.prop38 = a, s.prop43 = e, s.prop44 = this.faixaPrecosHotel(v), s.eVar19 = s.prop19, s.eVar20 = s.prop20, s.eVar25 = s.prop25, s.eVar26 = s.prop26, s.eVar27 = s.prop27, s.eVar28 = s.prop28, s.eVar30 = s.prop30, s.eVar32 = s.prop32, s.eVar35 = s.prop35, s.eVar36 = s.prop36, s.eVar37 = s.prop37, s.eVar38 = s.prop38, s.eVar39 = s.prop39, s.eVar40 = s.prop40, s.eVar41 = s.prop41, s.eVar43 = s.prop43, s.eVar44 = s.prop44, s.eVar66 = s.prop66, s.eVar67 = s.prop67, s.products = ";Hotel;" + (parseInt(s.eVar35) + parseInt(s.eVar36) + parseInt(s.eVar37)).toString() + ";" + t.Summary.TotalAmount.toFixed(2) + ";event11=" + k + "|event12=" + b + +'|event13=' + d, s.purchaseID = t.Order.Passengers[0].OrderId, s.prop68 = s.purchaseID, s.eVar68 = s.prop68, s.t()
        } catch (ut) {
            PublishStringClientError(ut)
        }
    }, this.TrackOmni_pacotesbusca = function (n) {
        var i, r, u;
        try {
            i = new TrataObjOmnitureBusca(n, "AirHotel"), s.pageName = incObjPointOfSale + ":pacotes:busca", s.channel = incObjPointOfSale, s.events = "event1,prodView";
            var o = i.ahdrpQtdQuartos, e = i.ahdrpQtdAdultosQuarto1, f = i.ahdrpQtdCriancasQuarto1;
            o == 2 && (e = e + i.ahdrpQtdAdultosQuarto2, f = f + i.ahdrpQtdCriancasQuarto2), o == 3 && (e = e + i.ahdrpQtdAdultosQuarto2 + i.ahdrpQtdAdultosQuarto3, f = f + i.ahdrpQtdCriancasQuarto2 + i.ahdrpQtdCriancasQuarto3), s.prop1 = i.ahtxtOrigem, s.prop3 = i.ahtxtDataIda, s.prop4 = i.ahtxtDataVolta, s.prop5 = i.ahselCabin, s.prop6 = i.IdaOuVolta, s.prop7 = e, s.prop8 = f, s.prop10 = i.chkSemParada, s.prop11 = o, s.prop12 = i.ahdrpCia, s.prop13 = i.ahdrpStartTime, s.prop14 = i.ahdrpEndTime, s.prop15 = i.ahchkOutroDestino, s.prop16 = i.ahchkOutrasDatas, s.prop17 = i.ahDiasSaida, s.prop18 = i.ahDuracao, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":pacotes", s.prop41 = incObjPointOfSale + ":pacotes:busca", s.eVar1 = s.prop1, s.eVar3 = s.prop3, s.eVar4 = s.prop4, s.eVar5 = s.prop5, s.eVar7 = s.prop7, s.eVar8 = s.prop8, s.eVar10 = s.prop10, s.eVar11 = s.prop11, s.eVar12 = s.prop12, s.eVar13 = s.prop13, s.eVar14 = s.prop14, s.eVar15 = s.prop15, s.eVar16 = s.prop16, s.eVar17 = s.prop17, s.eVar18 = s.prop18, s.eVar39 = s.prop39, s.eVar40 = s.prop40, s.eVar41 = s.prop41, s.products = ";Pacotes", s.t()
        } catch (h) {
            PublishStringClientError(h)
        }
        r = function (n) {
            trackOmniPersonalizado(incObjPointOfSale + ":pacotes:busca:" + n)
        }, u = function (n) {
            try {
                var u = i.ahdrpQtdQuartos, r = i.ahdrpQtdAdultosQuarto1, t = i.ahdrpQtdCriancasQuarto1;
                u == 2 && (r = r + i.ahdrpQtdAdultosQuarto2, t = t + i.ahdrpQtdCriancasQuarto2), u == 3 && (r = r + i.ahdrpQtdAdultosQuarto2 + i.ahdrpQtdAdultosQuarto3, t = t + i.ahdrpQtdCriancasQuarto2 + i.ahdrpQtdCriancasQuarto3), trackOmni({
                    pageName: incObjPointOfSale + ":pacotes:busca:" + n,
                    channel: incObjPointOfSale,
                    prop39: incObjPointOfSale,
                    eVar39: incObjPointOfSale,
                    prop40: incObjPointOfSale + ":pacotes",
                    eVar40: incObjPointOfSale + ":pacotes",
                    prop41: incObjPointOfSale + ":pacotes:busca",
                    eVar41: incObjPointOfSale + ":pacotes:busca",
                    prop1: i.ahtxtOrigem,
                    prop3: i.ahtxtDataIda,
                    prop4: i.ahtxtDataVolta,
                    prop12: i.ahdrpCia,
                    prop5: i.ahselCabin,
                    prop10: i.chkSemParada,
                    prop13: i.ahdrpStartTime,
                    prop14: i.ahdrpEndTime,
                    prop11: u,
                    prop7: r,
                    prop8: t,
                    prop15: i.ahchkOutroDestino,
                    prop16: i.ahchkOutrasDatas,
                    prop6: i.IdaOuVolta,
                    prop17: i.ahDiasSaida,
                    prop18: i.ahDuracao,
                    events: "event26",
                    eVar1: i.ahtxtOrigem,
                    eVar3: i.ahtxtDataIda,
                    eVar4: i.ahtxtDataVolta,
                    eVar12: i.ahdrpCia,
                    eVar5: i.ahselCabin,
                    eVar10: i.chkSemParada,
                    eVar13: i.ahdrpStartTime,
                    eVar14: i.ahdrpEndTime,
                    eVar11: u,
                    eVar7: r,
                    eVar8: t,
                    eVar15: i.ahchkOutroDestino,
                    eVar16: i.ahchkOutrasDatas,
                    eVar6: i.IdaOuVolta,
                    eVar17: i.ahDiasSaida,
                    eVar18: i.ahDuracao,
                    products: ";Pacotes"
                })
            } catch (f) {
                PublishStringClientError(f)
            }
        }, this.bindBotoesPacotes || ($("#selecione-pacote, #select-pacote").live("click", function () {
            u("pacote-mais-barato")
        }), $("#selecione-voo, #select-voo").live("click", function () {
            u("voo-mais-curto", i)
        }), $("#select-montado").live("click", function () {
            u("sua-opcao", i)
        }), $("#mais-opcoes-pacotes").live("click", function () {
            u("mais-opcoes-de-pacotes")
        }), $("#alterar-passagem").live("click", function () {
            u("alterar-passagem", i)
        }), $("div.btn-reservar-aereoHotel").live("click", function () {
            u("alterar-reserva", i)
        }), $("p.priceGroup_btnBuy-aereoHotel").live("click", function () {
            u("alterar-voo", i)
        }), $("a.infoduvidas-a").live("click", function () {
            u("duvidas", i)
        }), $("div.loc-img").live("click", function () {
            u("localizacao", i)
        }), $("div.fot-img").live("click", function () {
            u("fotos", i)
        }), $("div.campo-filtro-nome div.filtro-label-seta").live("click", function () {
            r("hotel")
        }), $("#divSliderPrice.sliderHotelPrice a.ui-slider-handle").live("mousedown", function () {
            r("preco-hotel")
        }), $("#divSliderCenterCity a.ui-slider-handle").live("mousedown", function () {
            r("distancia-centro")
        }), $("#divSliderNearestAirport a.ui-slider-handle").live("mousedown", function () {
            r("distancia-aeroporto")
        }), $("div.segura-filtro-categoria input.chkCategoryFilters").live("click", function () {
            r("categoria")
        }), $("#divSliderIda a.ui-slider-handle").live("mousedown", function () {
            r("horario-ida")
        }), $("#divSliderVolta a.ui-slider-handle").live("mousedown", function () {
            r("horario-volta")
        }), $("#divSliderPrice.sliderAirPrice").live("mousedown", function () {
            r("preco-aereo")
        }), $("input.chkFilterStops").live("click", function () {
            r("escalas")
        }), $("input.chkFilterCabinType").live("click", function () {
            r("classe")
        }), $("input.chkFilterAirCompany").live("click", function () {
            r("companhia")
        }), $("div.sliderDuration1 a.ui-slider-handle").live("mousedown", function () {
            r("duracao")
        }), $("input.chkFilterAirportsOutBound").live("click", function () {
            r("aeroporto-partida")
        }), $("input.chkFilterAirportsInbound").live("click", function () {
            r("aeroporto-chegada")
        }), $("input.chkFilterAirportsRoundTrip").live("click", function () {
            r("mesmo-aeroporto-ida-volta")
        }), this.bindBotoesPacotes = !0)
    }, this.TrackOmni_pacotescomprar = function (n) {
        try {
            s.pageName = incObjPointOfSale + ":pacotes:comprar", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":pacotes", s.prop41 = incObjPointOfSale + ":pacotes:comprar", s.eVar39 = incObjPointOfSale, s.eVar40 = incObjPointOfSale + ":pacotes", s.eVar41 = incObjPointOfSale + ":pacotes:comprar";
            var t = n, u = t.ShoppingCart.AirHotelItems[0].Hotel.Location, f = this.faixaPrecosPassagem(t.Summary.AirTotalAmount), i = this.faixaPrecosHotel(t.Summary.HotelTotalAmount), r = t.ShoppingCart.AirHotelItems[0].BookingFares[0].Flights[0] ? t.ShoppingCart.AirHotelItems[0].BookingFares[0].Flights[0].DepartureDateTimeValues.Hour : "";
            s.prop22 = stripaccents(t.ShoppingCart.AirHotelItems[0].Hotel.Name), s.prop43 = t.ShoppingCart.AirHotelItems[0].Hotel.Stars, s.prop44 = i, s.prop47 = removerCaracteres(u), s.prop48 = f, s.prop49 = this.faixaHorarioPassagem(r), s.eVar22 = s.prop22, s.eVar43 = s.prop43, s.eVar44 = s.prop44, s.eVar47 = s.prop47, s.eVar48 = s.prop48, s.eVar49 = s.prop49, s.events = "event2,scCheckout", s.products = ";Pacotes", s.t()
        } catch (e) {
            PublishStringClientError(e)
        }
    }, this.TrackOmni_pacotesconfirmacao = function (n) {
        var f, u;
        try {
            s.pageName = incObjPointOfSale + ":pacotes:confirmacao", s.channel = incObjPointOfSale, s.prop39 = incObjPointOfSale, s.prop40 = incObjPointOfSale + ":pacotes", s.prop41 = incObjPointOfSale + ":pacotes:confirmacao", s.eVar39 = incObjPointOfSale, s.eVar40 = incObjPointOfSale + ":pacotes", s.eVar41 = incObjPointOfSale + ":pacotes:confirmacao";
            var t = n, b = t.Summary.ServiceTaxesAmount, k = t.Summary.TaxesAmount, w = t.Summary.InsuranceAmount, y = t.Order.OrderItems[0].HotelBookings[0].Hotel.Name + ":" + t.Order.OrderItems[0].HotelBookings[0].RoomBooking.Room.Name, p = this.faixaPrecosPassagem(t.Summary.AirTotalAmount), d = this.faixaPrecosHotel(t.Summary.HotelTotalAmount), it = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].FirstDepartureTimeValues.Hour, rt = this.faixaHorarioPassagem(it), tt = t.Order.CreationDateTimeValues.Month + "/" + t.Order.CreationDateTimeValues.Day + "/" + t.Order.CreationDateTimeValues.Year, g = t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Day + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Month + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckInDateValues.Year, nt = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Origin + "-" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Destination, h = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1] ? t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].Origin + "-" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].Destination : "NÃO DISPONÍVEL", o = "cartao|" + t.Order.Payments[0].CreditCardProvider + "|" + t.Order.Payments[0].CreditCardPayment.Installments, e = t.Order.Payments[0].CreditCardOwner + "|" + t.Order.Payments[0].CPFOwner + "|" + t.Order.User.Email + "|" + t.Order.ContactsInformation[0].PreFix + t.Order.ContactsInformation[0].PhoneNumber, c = new Date(t.Order.Passengers[0].BirthDateValues.Day + "/" + t.Order.Passengers[0].BirthDateValues.Month + "/" + t.Order.Passengers[0].BirthDateValues.Year), v = DateDiff.inYears(c, new Date), a = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Flights.length, l = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1] ? t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].Flights.length : 0, r = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Month + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Day + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].LastArrivalTimeValues.Year, i = Cookies.getCookie("InsuranceABTest");
            Cookies.setCookie("InsuranceABTest", "", -1), s.events = "purchase,event15,event16,event11,event12,event13", s.events += t.Order.User.AcceptReceiveEmail.toString() == "true" ? ",event29" : "", s.prop19 = t.Summary.InsuranceAmount ? t.Summary.InsuranceAmount : "0", s.prop20 = o, s.prop23 = stripaccents(t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].IssuerCiaName), s.prop25 = e, s.prop26 = stripaccents(t.Order.Payments[0].BillAddress.City + " - " + t.Order.Payments[0].BillAddress.UF), s.prop27 = v, s.prop28 = t.Order.Passengers[0].Gender == 0 ? "Masculino" : "Feminino", s.prop29 = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Origin + "-" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[0].Destination, s.prop30 = stripaccents(y), s.prop31 = g, s.prop35 = t.Summary.Adults, s.prop36 = t.Summary.Childs ? t.Summary.Childs : "0", s.prop37 = t.Summary.Babies ? t.Summary.Babies : "0", s.prop38 = t.Summary.DaysStay ? t.Summary.DaysStay : "0", s.prop43 = t.Order.OrderItems[0].HotelBookings[0].Hotel.Stars, s.prop44 = d, s.prop48 = p, s.prop49 = rt, s.prop52 = a > 1 || l > 1 ? "Com Escala" : "Sem Escala", s.prop64 = nt, s.prop65 = h, s.prop66 = DateDiff.inDays(new Date(tt), new Date(r)) + " dias", t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues != null ? (f = t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Day + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Month + "/" + t.Order.OrderItems[0].HotelBookings[0].CheckOutDateValues.Year, u = t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Month + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Day + "/" + t.Order.OrderItems[0].BookingAirs[0].FlightGroups[1].LastArrivalTimeValues.Year, s.prop67 = DateDiff.inDays(new Date(r), new Date(u)) + " dias", s.prop32 = f, s.eVar32 = s.prop32) : s.prop67 = "NÃO DISPONÍVEL", s.eVar19 = s.prop19, s.eVar20 = s.prop20, s.eVar23 = s.prop23, s.eVar25 = s.prop25, s.eVar26 = s.prop26, s.eVar27 = s.prop27, s.eVar28 = s.prop28, s.eVar29 = s.prop29, s.eVar30 = s.prop30, s.eVar31 = s.prop31, s.eVar35 = s.prop35, s.eVar36 = s.prop36, s.eVar37 = s.prop37, s.eVar38 = s.prop38, s.eVar43 = s.prop43, s.eVar44 = s.prop44, s.eVar47 = s.prop47, s.eVar48 = s.prop48, s.eVar49 = s.prop49, s.eVar52 = s.prop52, s.eVar64 = s.prop64, s.eVar65 = s.prop65, s.eVar66 = s.prop66, s.eVar67 = s.prop67, s.products = ";Pacotes;" + (parseInt(s.eVar35) + parseInt(s.eVar36) + parseInt(s.eVar37)).toString() + ";" + t.Summary.TotalAmount.toFixed(2) + ";event11=" + b + "|event12=" + w + "|event13=" + k, s.purchaseID = t.Order.Passengers[0].OrderId, s.prop68 = s.purchaseID, s.eVar68 = s.prop68, i && i != "" && (s.eVar69 = i), s.t()
        } catch (ut) {
            PublishStringClientError(ut)
        }
    }
}
function removerCaracteres(n) {
    return n = n.toLowerCase(), n = n.replace(/[á|ã|â|à]/gi, "a"), n = n.replace(/[é|ê|è]/gi, "e"), n = n.replace(/[í|ì|î]/gi, "i"), n = n.replace(/[õ|ò|ó|ô]/gi, "o"), n = n.replace(/[ú|ù|û]/gi, "u"), n = n.replace(/[ç]/gi, "c"), n = n.replace(/[ñ]/gi, "n"), n = n.replace(/[á|ã|â]/gi, "a"), n = n.replace(/\W/gi, "-"), n = n.replace(/(\-)\1+/gi, "-")
}
function getParameterByName(n) {
    n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var i = new RegExp("[\\?&]" + n + "=([^&#]*)"), t = i.exec(location.search);
    return t == null ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
}
var TrimPath, dateFormat, DaysOfWeek, Months, Base64, Cookies, Sources, incObjPointOfSale, _conta, stripstring, s, s_code, s_objectID;
(function (n, t) {
    function vi() {
        if (!i.isReady) {
            try {
                r.documentElement.doScroll("left")
            } catch (n) {
                setTimeout(vi, 1);
                return
            }
            i.ready()
        }
    }

    function wu(n, t) {
        t.src ? i.ajax({
            url: t.src,
            async: !1,
            dataType: "script"
        }) : i.globalEval(t.text || t.textContent || t.innerHTML || ""), t.parentNode && t.parentNode.removeChild(t)
    }

    function at(n, r, u, f, e, o) {
        var c = n.length, h, s;
        if (typeof r == "object") {
            for (h in r)at(n, h, r[h], f, e, u);
            return n
        }
        if (u !== t) {
            for (f = !o && f && i.isFunction(u), s = 0; s < c; s++)e(n[s], r, f ? u.call(n[s], s, e(n[s], r)) : u, o);
            return n
        }
        return c ? e(n[0], r) : t
    }

    function e() {
        return +new Date
    }

    function rt() {
        return !1
    }

    function d() {
        return !0
    }

    function ki(n, t, r) {
        return r[0].type = n, i.event.handle.apply(t, r)
    }

    function di(n) {
        var v, c = [], y = [], p = arguments, o, t, u, a, r, f, s, w, l = i.data(this, "events"), e;
        if (n.liveFired !== this && l && l.live && (!n.button || n.type !== "click")) {
            for (n.liveFired = this, e = l.live.slice(0), r = 0; r < e.length; r++)u = e[r], u.origType.replace(h, "") === n.type ? y.push(u.selector) : e.splice(r--, 1);
            for (t = i(n.target).closest(y, n.currentTarget), f = 0, s = t.length; f < s; f++)for (r = 0; r < e.length; r++)u = e[r], t[f].selector === u.selector && (a = t[f].elem, o = null, (u.preType === "mouseenter" || u.preType === "mouseleave") && (o = i(n.relatedTarget).closest(u.selector)[0]), o && o === a || c.push({
                elem: a,
                handleObj: u
            }));
            for (f = 0, s = c.length; f < s; f++)if (t = c[f], n.currentTarget = t.elem, n.data = t.handleObj.data, n.handleObj = t.handleObj, t.handleObj.origHandler.apply(t.elem, p) === !1) {
                v = !1;
                break
            }
            return v
        }
    }

    function hi(n, t) {
        return "live." + (n && n !== "*" ? n + "." : "") + t.replace(/\./g, "`").replace(/ /g, "&")
    }

    function bt(n) {
        return !n || !n.parentNode || n.parentNode.nodeType === 11
    }

    function gt(n, t) {
        var r = 0;
        t.each(function () {
            var t, f;
            if (this.nodeName === (n[r] && n[r].nodeName)) {
                var e = i.data(n[r++]), o = i.data(this, e), u = e && e.events;
                if (u) {
                    delete o.handle, o.events = {};
                    for (t in u)for (f in u[t])i.event.add(this, t, u[t][f], u[t][f].data)
                }
            }
        })
    }

    function dt(n, t, u) {
        var f, s, e, o = t && t[0] ? t[0].ownerDocument || t[0] : r;
        return n.length === 1 && typeof n[0] == "string" && n[0].length < 512 && o === r && !ri.test(n[0]) && (i.support.checkClone || !si.test(n[0])) && (s = !0, e = i.fragments[n[0]], e && e !== 1 && (f = e)), f || (f = o.createDocumentFragment(), i.clean(n, o, f, u)), s && (i.fragments[n[0]] = e ? f : 1), {
            fragment: f,
            cacheable: s
        }
    }

    function o(n, t) {
        var r = {};
        return i.each(ni.concat.apply([], ni.slice(0, t)), function () {
            r[this] = n
        }), r
    }

    function ei(n) {
        return "scrollTo"in n && n.document ? n : n.nodeType === 9 ? n.defaultView || n.parentWindow : !1
    }

    var i = function (n, t) {
        return new i.fn.init(n, t)
    }, cr = n.jQuery, lr = n.$, r = n.document, a, hr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, or = /^.[^:#\[\.,]*$/, wr = /\S/, gi = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, tr = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, ur = navigator.userAgent, p, bi = !1, l = [], c, et = Object.prototype.toString, ot = Object.prototype.hasOwnProperty, vt = Array.prototype.push, y = Array.prototype.slice, yi = Array.prototype.indexOf, h, li, g, it, tt, ft;
    i.fn = i.prototype = {
        init: function (n, u) {
            var e, o, f, s;
            if (!n)return this;
            if (n.nodeType)return this.context = this[0] = n, this.length = 1, this;
            if (n === "body" && !u)return this.context = r, this[0] = r.body, this.selector = "body", this.length = 1, this;
            if (typeof n == "string") {
                if (e = hr.exec(n), e && (e[1] || !u)) {
                    if (e[1])return s = u ? u.ownerDocument || u : r, f = tr.exec(n), f ? i.isPlainObject(u) ? (n = [r.createElement(f[1])], i.fn.attr.call(n, u, !0)) : n = [s.createElement(f[1])] : (f = dt([e[1]], [s]), n = (f.cacheable ? f.fragment.cloneNode(!0) : f.fragment).childNodes), i.merge(this, n);
                    if (o = r.getElementById(e[2]), o) {
                        if (o.id !== e[2])return a.find(n);
                        this.length = 1, this[0] = o
                    }
                    return this.context = r, this.selector = n, this
                }
                return !u && /^\w+$/.test(n) ? (this.selector = n, this.context = r, n = r.getElementsByTagName(n), i.merge(this, n)) : !u || u.jquery ? (u || a).find(n) : i(u).find(n)
            }
            return i.isFunction(n) ? a.ready(n) : (n.selector !== t && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
        }, selector: "", jquery: "1.4.2", length: 0, size: function () {
            return this.length
        }, toArray: function () {
            return y.call(this, 0)
        }, get: function (n) {
            return n == null ? this.toArray() : n < 0 ? this.slice(n)[0] : this[n]
        }, pushStack: function (n, t, r) {
            var u = i();
            return i.isArray(n) ? vt.apply(u, n) : i.merge(u, n), u.prevObject = this, u.context = this.context, t === "find" ? u.selector = this.selector + (this.selector ? " " : "") + r : t && (u.selector = this.selector + "." + t + "(" + r + ")"), u
        }, each: function (n, t) {
            return i.each(this, n, t)
        }, ready: function (n) {
            return i.bindReady(), i.isReady ? n.call(r, i) : l && l.push(n), this
        }, eq: function (n) {
            return n === -1 ? this.slice(n) : this.slice(n, +n + 1)
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, slice: function () {
            return this.pushStack(y.apply(this, arguments), "slice", y.call(arguments).join(","))
        }, map: function (n) {
            return this.pushStack(i.map(this, function (t, i) {
                return n.call(t, i, t)
            }))
        }, end: function () {
            return this.prevObject || i(null)
        }, push: vt, sort: [].sort, splice: [].splice
    }, i.fn.init.prototype = i.fn, i.extend = i.fn.extend = function () {
        var n = arguments[0] || {}, u = 1, c = arguments.length, o = !1, s, f, e, r, h;
        for (typeof n == "boolean" && (o = n, n = arguments[1] || {}, u = 2), typeof n == "object" || i.isFunction(n) || (n = {}), c === u && (n = this, --u); u < c; u++)if ((s = arguments[u]) != null)for (f in s) {
            if (e = n[f], r = s[f], n === r)continue;
            o && r && (i.isPlainObject(r) || i.isArray(r)) ? (h = e && (i.isPlainObject(e) || i.isArray(e)) ? e : i.isArray(r) ? [] : {}, n[f] = i.extend(o, h, r)) : r !== t && (n[f] = r)
        }
        return n
    }, i.extend({
        noConflict: function (t) {
            return n.$ = lr, t && (n.jQuery = cr), i
        }, isReady: !1, ready: function () {
            if (!i.isReady) {
                if (!r.body)return setTimeout(i.ready, 13);
                if (i.isReady = !0, l) {
                    for (var n, t = 0; n = l[t++];)n.call(r, i);
                    l = null
                }
                i.fn.triggerHandler && i(r).triggerHandler("ready")
            }
        }, bindReady: function () {
            if (!bi) {
                if (bi = !0, r.readyState === "complete")return i.ready();
                if (r.addEventListener)r.addEventListener("DOMContentLoaded", c, !1), n.addEventListener("load", i.ready, !1); else if (r.attachEvent) {
                    r.attachEvent("onreadystatechange", c), n.attachEvent("onload", i.ready);
                    var t = !1;
                    try {
                        t = n.frameElement == null
                    } catch (u) {
                    }
                    r.documentElement.doScroll && t && vi()
                }
            }
        }, isFunction: function (n) {
            return et.call(n) === "[object Function]"
        }, isArray: function (n) {
            return et.call(n) === "[object Array]"
        }, isPlainObject: function (n) {
            if (!n || et.call(n) !== "[object Object]" || n.nodeType || n.setInterval || n.constructor && !ot.call(n, "constructor") && !ot.call(n.constructor.prototype, "isPrototypeOf"))return !1;
            var i;
            for (i in n);
            return i === t || ot.call(n, i)
        }, isEmptyObject: function (n) {
            for (var t in n)return !1;
            return !0
        }, error: function (n) {
            throw n;
        }, parseJSON: function (t) {
            if (typeof t != "string" || !t)return null;
            if (t = i.trim(t), /^[\],:{}\s]*$/.test(t.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return n.JSON && n.JSON.parse ? n.JSON.parse(t) : new Function("return " + t)();
            i.error("Invalid JSON: " + t)
        }, noop: function () {
        }, globalEval: function (n) {
            if (n && wr.test(n)) {
                var u = r.getElementsByTagName("head")[0] || r.documentElement, t = r.createElement("script");
                t.type = "text/javascript", i.support.scriptEval ? t.appendChild(r.createTextNode(n)) : t.text = n, u.insertBefore(t, u.firstChild), u.removeChild(t)
            }
        }, nodeName: function (n, t) {
            return n.nodeName && n.nodeName.toUpperCase() === t.toUpperCase()
        }, each: function (n, r, u) {
            var f, e = 0, s = n.length, h = s === t || i.isFunction(n), o;
            if (u) {
                if (h) {
                    for (f in n)if (r.apply(n[f], u) === !1)break
                } else for (; e < s;)if (r.apply(n[e++], u) === !1)break
            } else if (h) {
                for (f in n)if (r.call(n[f], f, n[f]) === !1)break
            } else for (o = n[0]; e < s && r.call(o, e, o) !== !1; o = n[++e]);
            return n
        }, trim: function (n) {
            return (n || "").replace(gi, "")
        }, makeArray: function (n, t) {
            var r = t || [];
            return n != null && (n.length == null || typeof n == "string" || i.isFunction(n) || typeof n != "function" && n.setInterval ? vt.call(r, n) : i.merge(r, n)), r
        }, inArray: function (n, t) {
            if (t.indexOf)return t.indexOf(n);
            for (var i = 0, r = t.length; i < r; i++)if (t[i] === n)return i;
            return -1
        }, merge: function (n, i) {
            var u = n.length, r = 0, f;
            if (typeof i.length == "number")for (f = i.length; r < f; r++)n[u++] = i[r]; else while (i[r] !== t)n[u++] = i[r++];
            return n.length = u, n
        }, grep: function (n, t, i) {
            for (var f = [], r = 0, u = n.length; r < u; r++)!i != !t(n[r], r) && f.push(n[r]);
            return f
        }, map: function (n, t, i) {
            for (var u = [], f, r = 0, e = n.length; r < e; r++)f = t(n[r], r, i), f != null && (u[u.length] = f);
            return u.concat.apply([], u)
        }, guid: 1, proxy: function (n, r, u) {
            return arguments.length === 2 && (typeof r == "string" ? (u = n, n = u[r], r = t) : r && !i.isFunction(r) && (u = r, r = t)), !r && n && (r = function () {
                return n.apply(u || this, arguments)
            }), n && (r.guid = n.guid = n.guid || r.guid || i.guid++), r
        }, uaMatch: function (n) {
            n = n.toLowerCase();
            var t = /(webkit)[ \/]([\w.]+)/.exec(n) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || !/compatible/.test(n) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(n) || [];
            return {browser: t[1] || "", version: t[2] || "0"}
        }, browser: {}
    }), p = i.uaMatch(ur), p.browser && (i.browser[p.browser] = !0, i.browser.version = p.version), i.browser.webkit && (i.browser.safari = !0), yi && (i.inArray = function (n, t) {
        return yi.call(t, n)
    }), a = i(r), r.addEventListener ? c = function () {
        r.removeEventListener("DOMContentLoaded", c, !1), i.ready()
    } : r.attachEvent && (c = function () {
        r.readyState === "complete" && (r.detachEvent("onreadystatechange", c), i.ready())
    }), function () {
        var o, u, h, c;
        i.support = {};
        var s = r.documentElement, f = r.createElement("script"), t = r.createElement("div"), l = "script" + e();
        if (t.style.display = "none", t.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>", o = t.getElementsByTagName("*"), u = t.getElementsByTagName("a")[0], o && o.length && u) {
            i.support = {
                leadingWhitespace: t.firstChild.nodeType === 3,
                tbody: !t.getElementsByTagName("tbody").length,
                htmlSerialize: !!t.getElementsByTagName("link").length,
                style: /red/.test(u.getAttribute("style")),
                hrefNormalized: u.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(u.style.opacity),
                cssFloat: !!u.style.cssFloat,
                checkOn: t.getElementsByTagName("input")[0].value === "on",
                optSelected: r.createElement("select").appendChild(r.createElement("option")).selected,
                parentNode: t.removeChild(t.appendChild(r.createElement("div"))).parentNode === null,
                deleteExpando: !0,
                checkClone: !1,
                scriptEval: !1,
                noCloneEvent: !0,
                boxModel: null
            }, f.type = "text/javascript";
            try {
                f.appendChild(r.createTextNode("window." + l + "=1;"))
            } catch (v) {
            }
            s.insertBefore(f, s.firstChild), n[l] && (i.support.scriptEval = !0, delete n[l]);
            try {
                delete f.test
            } catch (v) {
                i.support.deleteExpando = !1
            }
            s.removeChild(f), t.attachEvent && t.fireEvent && (t.attachEvent("onclick", function a() {
                i.support.noCloneEvent = !1, t.detachEvent("onclick", a)
            }), t.cloneNode(!0).fireEvent("onclick")), t = r.createElement("div"), t.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>", h = r.createDocumentFragment(), h.appendChild(t.firstChild), i.support.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, i(function () {
                var n = r.createElement("div");
                n.style.width = n.style.paddingLeft = "1px", r.body.appendChild(n), i.boxModel = i.support.boxModel = n.offsetWidth === 2, r.body.removeChild(n).style.display = "none", n = null
            }), c = function (n) {
                var i = r.createElement("div"), t;
                return n = "on" + n, t = n in i, t || (i.setAttribute(n, "return;"), t = typeof i[n] == "function"), i = null, t
            }, i.support.submitBubbles = c("submit"), i.support.changeBubbles = c("change"), s = f = t = o = u = null
        }
    }(), i.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    var f = "jQuery" + e(), yu = 0, wi = {};
    i.extend({
        cache: {}, expando: f, noData: {embed: !0, object: !0, applet: !0}, data: function (r, u, e) {
            if (!r.nodeName || !i.noData[r.nodeName.toLowerCase()]) {
                r = r == n ? wi : r;
                var o = r[f], h = i.cache, s;
                return !o && typeof u == "string" && e === t ? null : (o || (o = ++yu), typeof u == "object" ? (r[f] = o, s = h[o] = i.extend(!0, {}, u)) : h[o] || (r[f] = o, h[o] = {}), s = h[o], e !== t && (s[u] = e), typeof u == "string" ? s[u] : s)
            }
        }, removeData: function (t, r) {
            if (!t.nodeName || !i.noData[t.nodeName.toLowerCase()]) {
                t = t == n ? wi : t;
                var e = t[f], o = i.cache, u = o[e];
                r ? u && (delete u[r], i.isEmptyObject(u) && i.removeData(t)) : (i.support.deleteExpando ? delete t[i.expando] : t.removeAttribute && t.removeAttribute(i.expando), delete o[e])
            }
        }
    }), i.fn.extend({
        data: function (n, r) {
            var u, f;
            return typeof n == "undefined" && this.length ? i.data(this[0]) : typeof n == "object" ? this.each(function () {
                i.data(this, n)
            }) : (u = n.split("."), u[1] = u[1] ? "." + u[1] : "", r === t ? (f = this.triggerHandler("getData" + u[1] + "!", [u[0]]), f === t && this.length && (f = i.data(this[0], n)), f === t && u[1] ? this.data(u[0]) : f) : this.trigger("setData" + u[1] + "!", [u[0], r]).each(function () {
                i.data(this, n, r)
            }))
        }, removeData: function (n) {
            return this.each(function () {
                i.removeData(this, n)
            })
        }
    }), i.extend({
        queue: function (n, t, r) {
            if (n) {
                t = (t || "fx") + "queue";
                var u = i.data(n, t);
                return r ? (!u || i.isArray(r) ? u = i.data(n, t, i.makeArray(r)) : u.push(r), u) : u || []
            }
        }, dequeue: function (n, t) {
            t = t || "fx";
            var u = i.queue(n, t), r = u.shift();
            r === "inprogress" && (r = u.shift()), r && (t === "fx" && u.unshift("inprogress"), r.call(n, function () {
                i.dequeue(n, t)
            }))
        }
    }), i.fn.extend({
        queue: function (n, r) {
            return (typeof n != "string" && (r = n, n = "fx"), r === t) ? i.queue(this[0], n) : this.each(function () {
                var f = i.queue(this, n, r);
                n === "fx" && f[0] !== "inprogress" && i.dequeue(this, n)
            })
        }, dequeue: function (n) {
            return this.each(function () {
                i.dequeue(this, n)
            })
        }, delay: function (n, t) {
            return n = i.fx ? i.fx.speeds[n] || n : n, t = t || "fx", this.queue(t, function () {
                var r = this;
                setTimeout(function () {
                    i.dequeue(r, t)
                }, n)
            })
        }, clearQueue: function (n) {
            return this.queue(n || "fx", [])
        }
    });
    var ai = /[\n\t]/g, nt = /\s+/, vu = /\r/g, nu = /href|src|style/, tu = /(button|input)/i, gr = /(button|input|object|select|textarea)/i, fu = /^(a|area)$/i, ci = /radio|checkbox/;
    if (i.fn.extend({
            attr: function (n, t) {
                return at(this, n, t, !0, i.attr)
            }, removeAttr: function (n) {
                return this.each(function () {
                    i.attr(this, n, ""), this.nodeType === 1 && this.removeAttribute(n)
                })
            }, addClass: function (n) {
                var u, f, s, t, h, e, r, o;
                if (i.isFunction(n))return this.each(function (t) {
                    var r = i(this);
                    r.addClass(n.call(this, t, r.attr("class")))
                });
                if (n && typeof n == "string")for (u = (n || "").split(nt), f = 0, s = this.length; f < s; f++)if (t = this[f], t.nodeType === 1)if (t.className) {
                    for (h = " " + t.className + " ", e = t.className, r = 0, o = u.length; r < o; r++)h.indexOf(" " + u[r] + " ") < 0 && (e += " " + u[r]);
                    t.className = i.trim(e)
                } else t.className = n;
                return this
            }, removeClass: function (n) {
                var o, e, h, r, u, f, s;
                if (i.isFunction(n))return this.each(function (t) {
                    var r = i(this);
                    r.removeClass(n.call(this, t, r.attr("class")))
                });
                if (n && typeof n == "string" || n === t)for (o = (n || "").split(nt), e = 0, h = this.length; e < h; e++)if (r = this[e], r.nodeType === 1 && r.className)if (n) {
                    for (u = (" " + r.className + " ").replace(ai, " "), f = 0, s = o.length; f < s; f++)u = u.replace(" " + o[f] + " ", " ");
                    r.className = i.trim(u)
                } else r.className = "";
                return this
            }, toggleClass: function (n, t) {
                var r = typeof n, u = typeof t == "boolean";
                return i.isFunction(n) ? this.each(function (r) {
                    var u = i(this);
                    u.toggleClass(n.call(this, r, u.attr("class"), t), t)
                }) : this.each(function () {
                    if (r === "string")for (var e, h = 0, o = i(this), f = t, s = n.split(nt); e = s[h++];)f = u ? f : !o.hasClass(e), o[f ? "addClass" : "removeClass"](e); else(r === "undefined" || r === "boolean") && (this.className && i.data(this, "__className__", this.className), this.className = this.className || n === !1 ? "" : i.data(this, "__className__") || "")
                })
            }, hasClass: function (n) {
                for (var r = " " + n + " ", t = 0, i = this.length; t < i; t++)if ((" " + this[t].className + " ").replace(ai, " ").indexOf(r) > -1)return !0;
                return !1
            }, val: function (n) {
                var r, u, h, e, s;
                if (n === t) {
                    if (r = this[0], r) {
                        if (i.nodeName(r, "option"))return (r.attributes.value || {}).specified ? r.value : r.text;
                        if (i.nodeName(r, "select")) {
                            var o = r.selectedIndex, c = [], l = r.options, f = r.type === "select-one";
                            if (o < 0)return null;
                            for (u = f ? o : 0, h = f ? o + 1 : l.length; u < h; u++)if (e = l[u], e.selected) {
                                if (n = i(e).val(), f)return n;
                                c.push(n)
                            }
                            return c
                        }
                        return ci.test(r.type) && !i.support.checkOn ? r.getAttribute("value") === null ? "on" : r.value : (r.value || "").replace(vu, "")
                    }
                    return t
                }
                return s = i.isFunction(n), this.each(function (t) {
                    var f = i(this), r = n, u;
                    if (this.nodeType === 1)s && (r = n.call(this, t, f.val())), typeof r == "number" && (r += ""), i.isArray(r) && ci.test(this.type) ? this.checked = i.inArray(f.val(), r) >= 0 : i.nodeName(this, "select") ? (u = i.makeArray(r), i("option", this).each(function () {
                        this.selected = i.inArray(i(this).val(), u) >= 0
                    }), u.length || (this.selectedIndex = -1)) : this.value = r
                })
            }
        }), i.extend({
            attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
            attr: function (n, r, u, f) {
                var o, h, l, e, s, c;
                return !n || n.nodeType === 3 || n.nodeType === 8 ? t : f && r in i.attrFn ? i(n)[r](u) : (o = n.nodeType !== 1 || !i.isXMLDoc(n), h = u !== t, r = o && i.props[r] || r, n.nodeType === 1) ? (l = nu.test(r), r !== "selected" || i.support.optSelected || (e = n.parentNode, e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)), r in n && o && !l) ? (h && (r === "type" && tu.test(n.nodeName) && n.parentNode && i.error("type property can't be changed"), n[r] = u), i.nodeName(n, "form") && n.getAttributeNode(r)) ? n.getAttributeNode(r).nodeValue : r === "tabIndex" ? (s = n.getAttributeNode("tabIndex"), s && s.specified ? s.value : gr.test(n.nodeName) || fu.test(n.nodeName) && n.href ? 0 : t) : n[r] : !i.support.style && o && r === "style" ? (h && (n.style.cssText = "" + u), n.style.cssText) : (h && n.setAttribute(r, "" + u), c = !i.support.hrefNormalized && o && l ? n.getAttribute(r, 2) : n.getAttribute(r), c === null ? t : c) : i.style(n, r, u)
            }
        }), h = /\.(.*)$/, li = function (n) {
            return n.replace(/[^\w\s\.\|`]/g, function (n) {
                return "\\" + n
            })
        }, i.event = {
            add: function (r, u, f, e) {
                var v, s, c, p, h, o, w, l, y, a;
                if (r.nodeType !== 3 && r.nodeType !== 8 && (r.setInterval && r !== n && !r.frameElement && (r = n), f.handler && (v = f, f = v.handler), f.guid || (f.guid = i.guid++), c = i.data(r), c)) {
                    for (p = c.events = c.events || {}, h = c.handle, h || (c.handle = h = function () {
                        return typeof i != "undefined" && !i.event.triggered ? i.event.handle.apply(h.elem, arguments) : t
                    }), h.elem = r, u = u.split(" "), w = 0; o = u[w++];)s = v ? i.extend({}, v) : {
                        handler: f,
                        data: e
                    }, o.indexOf(".") > -1 ? (l = o.split("."), o = l.shift(), s.namespace = l.slice(0).sort().join(".")) : (l = [], s.namespace = ""), s.type = o, s.guid = f.guid, y = p[o], a = i.event.special[o] || {}, y || (y = p[o] = [], a.setup && a.setup.call(r, e, l, h) !== !1 || (r.addEventListener ? r.addEventListener(o, h, !1) : r.attachEvent && r.attachEvent("on" + o, h))), a.add && (a.add.call(r, s), s.handler.guid || (s.handler.guid = f.guid)), y.push(s), i.event.global[o] = !0;
                    r = null
                }
            },
            global: {},
            remove: function (n, t, r, u) {
                var e, y;
                if (n.nodeType !== 3 && n.nodeType !== 8) {
                    var b, f, d, k = 0, v, a, p, c, o, s, w, h = i.data(n), l = h && h.events;
                    if (h && l) {
                        if (t && t.type && (r = t.handler, t = t.type), !t || typeof t == "string" && t.charAt(0) === ".") {
                            t = t || "";
                            for (f in l)i.event.remove(n, f + t);
                            return
                        }
                        for (t = t.split(" "); f = t[k++];) {
                            if (w = f, s = null, v = f.indexOf(".") < 0, a = [], v || (a = f.split("."), f = a.shift(), p = new RegExp("(^|\\.)" + i.map(a.slice(0).sort(), li).join("\\.(?:.*\\.)?") + "(\\.|$)")), o = l[f], !o)continue;
                            if (!r) {
                                for (e = 0; e < o.length; e++)s = o[e], (v || p.test(s.namespace)) && (i.event.remove(n, w, s.handler, e), o.splice(e--, 1));
                                continue
                            }
                            for (c = i.event.special[f] || {}, e = u || 0; e < o.length; e++)if (s = o[e], r.guid === s.guid && ((v || p.test(s.namespace)) && (u == null && o.splice(e--, 1), c.remove && c.remove.call(n, s)), u != null))break;
                            (o.length === 0 || u != null && o.length === 1) && (c.teardown && c.teardown.call(n, a) !== !1 || g(n, f, h.handle), b = null, delete l[f])
                        }
                        i.isEmptyObject(l) && (y = h.handle, y && (y.elem = null), delete h.events, delete h.handle, i.isEmptyObject(h) && i.removeData(n))
                    }
                }
            },
            trigger: function (n, r, u) {
                var e = n.type || n, v = arguments[3], c, h;
                if (!v) {
                    if (n = typeof n == "object" ? n[f] ? n : i.extend(i.Event(e), n) : i.Event(e), e.indexOf("!") >= 0 && (n.type = e = e.slice(0, -1), n.exclusive = !0), u || (n.stopPropagation(), i.event.global[e] && i.each(i.cache, function () {
                            this.events && this.events[e] && i.event.trigger(n, r, this.handle.elem)
                        })), !u || u.nodeType === 3 || u.nodeType === 8)return t;
                    n.result = t, n.target = u, r = i.makeArray(r), r.unshift(n)
                }
                n.currentTarget = u, c = i.data(u, "handle"), c && c.apply(u, r), h = u.parentNode || u.ownerDocument;
                try {
                    u && u.nodeName && i.noData[u.nodeName.toLowerCase()] || u["on" + e] && u["on" + e].apply(u, r) === !1 && (n.result = !1)
                } catch (y) {
                }
                if (!n.isPropagationStopped() && h)i.event.trigger(n, r, h, !0); else if (!n.isDefaultPrevented()) {
                    var o = n.target, s, a = i.nodeName(o, "a") && e === "click", l = i.event.special[e] || {};
                    if ((!l._default || l._default.call(u, n) === !1) && !a && !(o && o.nodeName && i.noData[o.nodeName.toLowerCase()])) {
                        try {
                            o[e] && (s = o["on" + e], s && (o["on" + e] = null), i.event.triggered = !0, o[e]())
                        } catch (y) {
                        }
                        s && (o["on" + e] = s), i.event.triggered = !1
                    }
                }
            },
            handle: function (r) {
                var s, h, l, c, u, e, a, f, o;
                if (r = arguments[0] = i.event.fix(r || n.event), r.currentTarget = this, s = r.type.indexOf(".") < 0 && !r.exclusive, s || (h = r.type.split("."), r.type = h.shift(), l = new RegExp("(^|\\.)" + h.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")), c = i.data(this, "events"), u = (c || {})[r.type], c && u)for (u = u.slice(0), e = 0, a = u.length; e < a; e++)if (f = u[e], (s || l.test(f.namespace)) && (r.handler = f.handler, r.data = f.data, r.handleObj = f, o = f.handler.apply(this, arguments), o !== t && (r.result = o, o === !1 && (r.preventDefault(), r.stopPropagation())), r.isImmediatePropagationStopped()))break;
                return r.result
            },
            props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
            fix: function (n) {
                var s, o, h, u, e;
                if (n[f])return n;
                for (s = n, n = i.Event(s), o = this.props.length; o;)h = this.props[--o], n[h] = s[h];
                return n.target || (n.target = n.srcElement || r), n.target.nodeType === 3 && (n.target = n.target.parentNode), !n.relatedTarget && n.fromElement && (n.relatedTarget = n.fromElement === n.target ? n.toElement : n.fromElement), n.pageX == null && n.clientX != null && (u = r.documentElement, e = r.body, n.pageX = n.clientX + (u && u.scrollLeft || e && e.scrollLeft || 0) - (u && u.clientLeft || e && e.clientLeft || 0), n.pageY = n.clientY + (u && u.scrollTop || e && e.scrollTop || 0) - (u && u.clientTop || e && e.clientTop || 0)), !n.which && (n.charCode || n.charCode === 0 ? n.charCode : n.keyCode) && (n.which = n.charCode || n.keyCode), !n.metaKey && n.ctrlKey && (n.metaKey = n.ctrlKey), n.which || n.button === t || (n.which = n.button & 1 ? 1 : n.button & 2 ? 3 : n.button & 4 ? 2 : 0), n
            },
            guid: 1e8,
            proxy: i.proxy,
            special: {
                ready: {setup: i.bindReady, teardown: i.noop}, live: {
                    add: function (n) {
                        i.event.add(this, n.origType, i.extend({}, n, {handler: di}))
                    }, remove: function (n) {
                        var t = !0, r = n.origType.replace(h, "");
                        i.each(i.data(this, "events").live || [], function () {
                            if (r === this.origType.replace(h, ""))return t = !1, !1
                        }), t && i.event.remove(this, n.origType, di)
                    }
                }, beforeunload: {
                    setup: function (n, t, i) {
                        return this.setInterval && (this.onbeforeunload = i), !1
                    }, teardown: function (n, t) {
                        this.onbeforeunload === t && (this.onbeforeunload = null)
                    }
                }
            }
        }, g = r.removeEventListener ? function (n, t, i) {
            n.removeEventListener(t, i, !1)
        } : function (n, t, i) {
            n.detachEvent("on" + t, i)
        }, i.Event = function (n) {
            if (!this.preventDefault)return new i.Event(n);
            n && n.type ? (this.originalEvent = n, this.type = n.type) : this.type = n, this.timeStamp = e(), this[f] = !0
        }, i.Event.prototype = {
            preventDefault: function () {
                this.isDefaultPrevented = d;
                var n = this.originalEvent;
                if (n)n.preventDefault && n.preventDefault(), n.returnValue = !1
            }, stopPropagation: function () {
                this.isPropagationStopped = d;
                var n = this.originalEvent;
                if (n)n.stopPropagation && n.stopPropagation(), n.cancelBubble = !0
            }, stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = d, this.stopPropagation()
            }, isDefaultPrevented: rt, isPropagationStopped: rt, isImmediatePropagationStopped: rt
        }, it = function (n) {
            var t = n.relatedTarget;
            try {
                while (t && t !== this)t = t.parentNode;
                t !== this && (n.type = n.data, i.event.handle.apply(this, arguments))
            } catch (r) {
            }
        }, tt = function (n) {
            n.type = n.data, i.event.handle.apply(this, arguments)
        }, i.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (n, t) {
            i.event.special[n] = {
                setup: function (r) {
                    i.event.add(this, t, r && r.selector ? tt : it, n)
                }, teardown: function (n) {
                    i.event.remove(this, t, n && n.selector ? tt : it)
                }
            }
        }), i.support.submitBubbles || (i.event.special.submit = {
            setup: function () {
                if (this.nodeName.toLowerCase() !== "form")i.event.add(this, "click.specialSubmit", function (n) {
                    var r = n.target, t = r.type;
                    if ((t === "submit" || t === "image") && i(r).closest("form").length)return ki("submit", this, arguments)
                }), i.event.add(this, "keypress.specialSubmit", function (n) {
                    var r = n.target, t = r.type;
                    if ((t === "text" || t === "password") && i(r).closest("form").length && n.keyCode === 13)return ki("submit", this, arguments)
                }); else return !1
            }, teardown: function () {
                i.event.remove(this, ".specialSubmit")
            }
        }), !i.support.changeBubbles) {
        var ut = /textarea|input|select/i, k, pi = function (n) {
            var r = n.type, t = n.value;
            return r === "radio" || r === "checkbox" ? t = n.checked : r === "select-multiple" ? t = n.selectedIndex > -1 ? i.map(n.options, function (n) {
                return n.selected
            }).join("-") : "" : n.nodeName.toLowerCase() === "select" && (t = n.selectedIndex), t
        }, b = function (n) {
            var r = n.target, f, u;
            if (ut.test(r.nodeName) && !r.readOnly)return (f = i.data(r, "_change_data"), u = pi(r), (n.type !== "focusout" || r.type !== "radio") && i.data(r, "_change_data", u), f === t || u === f) ? void 0 : f != null || u ? (n.type = "change", i.event.trigger(n, arguments[1], r)) : void 0
        };
        i.event.special.change = {
            filters: {
                focusout: b, click: function (n) {
                    var i = n.target, t = i.type;
                    if (t === "radio" || t === "checkbox" || i.nodeName.toLowerCase() === "select")return b.call(this, n)
                }, keydown: function (n) {
                    var i = n.target, t = i.type;
                    if (n.keyCode === 13 && i.nodeName.toLowerCase() !== "textarea" || n.keyCode === 32 && (t === "checkbox" || t === "radio") || t === "select-multiple")return b.call(this, n)
                }, beforeactivate: function (n) {
                    var t = n.target;
                    i.data(t, "_change_data", pi(t))
                }
            }, setup: function () {
                if (this.type === "file")return !1;
                for (var r in k)i.event.add(this, r + ".specialChange", k[r]);
                return ut.test(this.nodeName)
            }, teardown: function () {
                return i.event.remove(this, ".specialChange"), ut.test(this.nodeName)
            }
        }, k = i.event.special.change.filters
    }
    r.addEventListener && i.each({focus: "focusin", blur: "focusout"}, function (n, t) {
        function r(n) {
            return n = i.event.fix(n), n.type = t, i.event.handle.call(this, n)
        }

        i.event.special[t] = {
            setup: function () {
                this.addEventListener(n, r, !0)
            }, teardown: function () {
                this.removeEventListener(n, r, !0)
            }
        }
    }), i.each(["bind", "one"], function (n, r) {
        i.fn[r] = function (n, u, f) {
            var s, o, e, h;
            if (typeof n == "object") {
                for (s in n)this[r](s, u, n[s], f);
                return this
            }
            if (i.isFunction(u) && (f = u, u = t), o = r === "one" ? i.proxy(f, function (n) {
                    return i(this).unbind(n, o), f.apply(this, arguments)
                }) : f, n === "unload" && r !== "one")this.one(n, u, f); else for (e = 0, h = this.length; e < h; e++)i.event.add(this[e], n, o, u);
            return this
        }
    }), i.fn.extend({
        unbind: function (n, t) {
            var u, r, f;
            if (typeof n != "object" || n.preventDefault)for (r = 0, f = this.length; r < f; r++)i.event.remove(this[r], n, t); else for (u in n)this.unbind(u, n[u]);
            return this
        }, delegate: function (n, t, i, r) {
            return this.live(t, i, r, n)
        }, undelegate: function (n, t, i) {
            return arguments.length === 0 ? this.unbind("live") : this.die(t, null, i, n)
        }, trigger: function (n, t) {
            return this.each(function () {
                i.event.trigger(n, t, this)
            })
        }, triggerHandler: function (n, t) {
            if (this[0]) {
                var r = i.Event(n);
                return r.preventDefault(), r.stopPropagation(), i.event.trigger(r, t, this[0]), r.result
            }
        }, toggle: function (n) {
            for (var r = arguments, t = 1; t < r.length;)i.proxy(n, r[t++]);
            return this.click(i.proxy(n, function (u) {
                var f = (i.data(this, "lastToggle" + n.guid) || 0) % t;
                return i.data(this, "lastToggle" + n.guid, f + 1), u.preventDefault(), r[f].apply(this, arguments) || !1
            }))
        }, hover: function (n, t) {
            return this.mouseenter(n).mouseleave(t || n)
        }
    }), ft = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, i.each(["live", "die"], function (n, r) {
        i.fn[r] = function (n, u, f, e) {
            var o, y = 0, l, s, a, c = e || this.selector, v = e ? this : i(this.context);
            for (i.isFunction(u) && (f = u, u = t), n = (n || "").split(" "); (o = n[y++]) != null;) {
                if (l = h.exec(o), s = "", l && (s = l[0], o = o.replace(h, "")), o === "hover") {
                    n.push("mouseenter" + s, "mouseleave" + s);
                    continue
                }
                a = o, o === "focus" || o === "blur" ? (n.push(ft[o] + s), o = o + s) : o = (ft[o] || o) + s, r === "live" ? v.each(function () {
                    i.event.add(this, hi(o, c), {
                        data: u,
                        selector: c,
                        handler: f,
                        origType: o,
                        origHandler: f,
                        preType: a
                    })
                }) : v.unbind(hi(o, c), f)
            }
            return this
        }
    }), i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (n, t) {
        i.fn[t] = function (n) {
            return n ? this.bind(t, n) : this.trigger(t)
        }, i.attrFn && (i.attrFn[t] = !0)
    }), n.attachEvent && !n.addEventListener && n.attachEvent("onunload", function () {
        for (var n in i.cache)if (i.cache[n].handle)try {
            i.event.remove(i.cache[n].handle.elem)
        } catch (t) {
        }
    });
    /*!
     * Sizzle CSS Selector Engine - v1.0
     *  Copyright 2009, The Dojo Foundation
     *  Released under the MIT, BSD, and GPL Licenses.
     *  More information: http://sizzlejs.com/
     */
    (function () {
        function l(n) {
            for (var r = "", t, i = 0; n[i]; i++)t = n[i], t.nodeType === 3 || t.nodeType === 4 ? r += t.nodeValue : t.nodeType !== 8 && (r += l(t.childNodes));
            return r
        }

        function d(n, t, i, r, u, f) {
            for (var e, s, o = 0, h = r.length; o < h; o++)if (e = r[o], e) {
                for (e = e[n], s = !1; e;) {
                    if (e.sizcache === i) {
                        s = r[e.sizset];
                        break
                    }
                    if (e.nodeType !== 1 || f || (e.sizcache = i, e.sizset = o), e.nodeName.toLowerCase() === t) {
                        s = e;
                        break
                    }
                    e = e[n]
                }
                r[o] = s
            }
        }

        function y(n, t, i, r, u, e) {
            for (var o, h, s = 0, c = r.length; s < c; s++)if (o = r[s], o) {
                for (o = o[n], h = !1; o;) {
                    if (o.sizcache === i) {
                        h = r[o.sizset];
                        break
                    }
                    if (o.nodeType === 1)if (e || (o.sizcache = i, o.sizset = s), typeof t != "string") {
                        if (o === t) {
                            h = !0;
                            break
                        }
                    } else if (f.filter(t, [o]).length > 0) {
                        h = o;
                        break
                    }
                    o = o[n]
                }
                r[s] = h
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, v = 0, g = Object.prototype.toString, e = !1, b = !0, f, u, k, s, o, h;
        [0, 0].sort(function () {
            return b = !1, 0
        }), f = function (n, t, i, e) {
            var ut, v, b, d, l;
            if (i = i || [], ut = t = t || r, t.nodeType !== 1 && t.nodeType !== 9)return [];
            if (!n || typeof n != "string")return i;
            for (var s = [], nt, y, h, it, ft = !0, tt = c(t), rt = n; (a.exec(""), nt = a.exec(rt)) !== null;)if (rt = nt[3], s.push(nt[1]), nt[2]) {
                it = nt[3];
                break
            }
            if (s.length > 1 && k.exec(n))if (s.length === 2 && u.relative[s[0]])y = w(s[0] + s[1], t); else for (y = u.relative[s[0]] ? [t] : f(s.shift(), t); s.length;)n = s.shift(), u.relative[n] && (n += s.shift()), y = w(n, y); else if (!e && s.length > 1 && t.nodeType === 9 && !tt && u.match.ID.test(s[0]) && !u.match.ID.test(s[s.length - 1]) && (v = f.find(s.shift(), t, tt), t = v.expr ? f.filter(v.expr, v.set)[0] : v.set[0]), t)for (v = e ? {
                expr: s.pop(),
                set: o(e)
            } : f.find(s.pop(), s.length === 1 && (s[0] === "~" || s[0] === "+") && t.parentNode ? t.parentNode : t, tt), y = v.expr ? f.filter(v.expr, v.set) : v.set, s.length > 0 ? h = o(y) : ft = !1; s.length;)b = s.pop(), d = b, u.relative[b] ? d = s.pop() : b = "", d == null && (d = t), u.relative[b](h, d, tt); else h = s = [];
            if (h || (h = y), h || f.error(b || n), g.call(h) === "[object Array]")if (ft)if (t && t.nodeType === 1)for (l = 0; h[l] != null; l++)h[l] && (h[l] === !0 || h[l].nodeType === 1 && p(t, h[l])) && i.push(y[l]); else for (l = 0; h[l] != null; l++)h[l] && h[l].nodeType === 1 && i.push(y[l]); else i.push.apply(i, h); else o(h, i);
            return it && (f(it, ut, i, e), f.uniqueSort(i)), i
        }, f.uniqueSort = function (n) {
            if (h && (e = b, n.sort(h), e))for (var t = 1; t < n.length; t++)n[t] === n[t - 1] && n.splice(t--, 1);
            return n
        }, f.matches = function (n, t) {
            return f(n, null, null, t)
        }, f.find = function (n, t, i) {
            var f, o, h, e, r, s;
            if (!n)return [];
            for (o = 0, h = u.order.length; o < h; o++)if (e = u.order[o], (r = u.leftMatch[e].exec(n)) && (s = r[1], r.splice(1, 1), s.substr(s.length - 1) !== "\\" && (r[1] = (r[1] || "").replace(/\\/g, ""), f = u.find[e](r, t, i), f != null))) {
                n = n.replace(u.match[e], "");
                break
            }
            return f || (f = t.getElementsByTagName("*")), {set: f, expr: n}
        }, f.filter = function (n, i, r, e) {
            for (var k = n, y = [], s = i, o, l, g = i && i[0] && c(i[0]), h, d, a, p, w, v, b; n && i.length;) {
                for (h in u.filter)if ((o = u.leftMatch[h].exec(n)) != null && o[2]) {
                    if (d = u.filter[h], w = o[1], l = !1, o.splice(1, 1), w.substr(w.length - 1) === "\\")continue;
                    if (s === y && (y = []), u.preFilter[h])if (o = u.preFilter[h](o, s, r, y, e, g), o) {
                        if (o === !0)continue
                    } else l = a = !0;
                    if (o)for (v = 0; (p = s[v]) != null; v++)p && (a = d(p, o, v, s), b = e ^ !!a, r && a != null ? b ? l = !0 : s[v] = !1 : b && (y.push(p), l = !0));
                    if (a !== t) {
                        if (r || (s = y), n = n.replace(u.match[h], ""), !l)return [];
                        break
                    }
                }
                if (n === k)if (l == null)f.error(n); else break;
                k = n
            }
            return s
        }, f.error = function (n) {
            throw"Syntax error, unrecognized expression: " + n;
        }, u = f.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (n) {
                    return n.getAttribute("href")
                }
            },
            relative: {
                "+": function (n, t) {
                    var s = typeof t == "string", e = s && !/\W/.test(t), o = s && !e, r, u, i;
                    for (e && (t = t.toLowerCase()), r = 0, u = n.length; r < u; r++)if (i = n[r]) {
                        while ((i = i.previousSibling) && i.nodeType !== 1);
                        n[r] = o || i && i.nodeName.toLowerCase() === t ? i || !1 : i === t
                    }
                    o && f.filter(t, n, !0)
                }, ">": function (n, t) {
                    var o = typeof t == "string", e, i, u, r;
                    if (o && !/\W/.test(t))for (t = t.toLowerCase(), i = 0, u = n.length; i < u; i++)r = n[i], r && (e = r.parentNode, n[i] = e.nodeName.toLowerCase() === t ? e : !1); else {
                        for (i = 0, u = n.length; i < u; i++)r = n[i], r && (n[i] = o ? r.parentNode : r.parentNode === t);
                        o && f.filter(t, n, !0)
                    }
                }, "": function (n, t, i) {
                    var f = v++, u = y, r;
                    typeof t != "string" || /\W/.test(t) || (r = t = t.toLowerCase(), u = d), u("parentNode", t, f, n, r, i)
                }, "~": function (n, t, i) {
                    var f = v++, u = y, r;
                    typeof t != "string" || /\W/.test(t) || (r = t = t.toLowerCase(), u = d), u("previousSibling", t, f, n, r, i)
                }
            },
            find: {
                ID: function (n, t, i) {
                    if (typeof t.getElementById != "undefined" && !i) {
                        var r = t.getElementById(n[1]);
                        return r ? [r] : []
                    }
                }, NAME: function (n, t) {
                    var u, r, i, f;
                    if (typeof t.getElementsByName != "undefined") {
                        for (u = [], r = t.getElementsByName(n[1]), i = 0, f = r.length; i < f; i++)r[i].getAttribute("name") === n[1] && u.push(r[i]);
                        return u.length === 0 ? null : u
                    }
                }, TAG: function (n, t) {
                    return t.getElementsByTagName(n[1])
                }
            },
            preFilter: {
                CLASS: function (n, t, i, r, u, f) {
                    if (n = " " + n[1].replace(/\\/g, "") + " ", f)return n;
                    for (var o = 0, e; (e = t[o]) != null; o++)e && (u ^ (e.className && (" " + e.className + " ").replace(/[\t\n]/g, " ").indexOf(n) >= 0) ? i || r.push(e) : i && (t[o] = !1));
                    return !1
                }, ID: function (n) {
                    return n[1].replace(/\\/g, "")
                }, TAG: function (n) {
                    return n[1].toLowerCase()
                }, CHILD: function (n) {
                    if (n[1] === "nth") {
                        var t = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(n[2] === "even" && "2n" || n[2] === "odd" && "2n+1" || !/\D/.test(n[2]) && "0n+" + n[2] || n[2]);
                        n[2] = t[1] + (t[2] || 1) - 0, n[3] = t[3] - 0
                    }
                    return n[0] = v++, n
                }, ATTR: function (n, t, i, r, f, e) {
                    var o = n[1].replace(/\\/g, "");
                    return !e && u.attrMap[o] && (n[1] = u.attrMap[o]), n[2] === "~=" && (n[4] = " " + n[4] + " "), n
                }, PSEUDO: function (n, t, i, r, e) {
                    if (n[1] === "not")if ((a.exec(n[3]) || "").length > 1 || /^\w/.test(n[3]))n[3] = f(n[3], null, null, t); else {
                        var o = f.filter(n[3], t, i, !0 ^ e);
                        return i || r.push.apply(r, o), !1
                    } else if (u.match.POS.test(n[0]) || u.match.CHILD.test(n[0]))return !0;
                    return n
                }, POS: function (n) {
                    return n.unshift(!0), n
                }
            },
            filters: {
                enabled: function (n) {
                    return n.disabled === !1 && n.type !== "hidden"
                }, disabled: function (n) {
                    return n.disabled === !0
                }, checked: function (n) {
                    return n.checked === !0
                }, selected: function (n) {
                    return n.parentNode.selectedIndex, n.selected === !0
                }, parent: function (n) {
                    return !!n.firstChild
                }, empty: function (n) {
                    return !n.firstChild
                }, has: function (n, t, i) {
                    return !!f(i[3], n).length
                }, header: function (n) {
                    return /h\d/i.test(n.nodeName)
                }, text: function (n) {
                    return "text" === n.type
                }, radio: function (n) {
                    return "radio" === n.type
                }, checkbox: function (n) {
                    return "checkbox" === n.type
                }, file: function (n) {
                    return "file" === n.type
                }, password: function (n) {
                    return "password" === n.type
                }, submit: function (n) {
                    return "submit" === n.type
                }, image: function (n) {
                    return "image" === n.type
                }, reset: function (n) {
                    return "reset" === n.type
                }, button: function (n) {
                    return "button" === n.type || n.nodeName.toLowerCase() === "button"
                }, input: function (n) {
                    return /input|select|textarea|button/i.test(n.nodeName)
                }
            },
            setFilters: {
                first: function (n, t) {
                    return t === 0
                }, last: function (n, t, i, r) {
                    return t === r.length - 1
                }, even: function (n, t) {
                    return t % 2 == 0
                }, odd: function (n, t) {
                    return t % 2 == 1
                }, lt: function (n, t, i) {
                    return t < i[3] - 0
                }, gt: function (n, t, i) {
                    return t > i[3] - 0
                }, nth: function (n, t, i) {
                    return i[3] - 0 === t
                }, eq: function (n, t, i) {
                    return i[3] - 0 === t
                }
            },
            filter: {
                PSEUDO: function (n, t, i, r) {
                    var e = t[1], h = u.filters[e], o, i, s;
                    if (h)return h(n, i, t, r);
                    if (e === "contains")return (n.textContent || n.innerText || l([n]) || "").indexOf(t[3]) >= 0;
                    if (e === "not") {
                        for (o = t[3], i = 0, s = o.length; i < s; i++)if (o[i] === n)return !1;
                        return !0
                    }
                    f.error("Syntax error, unrecognized expression: " + e)
                }, CHILD: function (n, t) {
                    var s = t[1], i = n, u, e, o, r, h, f;
                    switch (s) {
                        case"only":
                        case"first":
                            while (i = i.previousSibling)if (i.nodeType === 1)return !1;
                            if (s === "first")return !0;
                            i = n;
                        case"last":
                            while (i = i.nextSibling)if (i.nodeType === 1)return !1;
                            return !0;
                        case"nth":
                            if (u = t[2], e = t[3], u === 1 && e === 0)return !0;
                            if (o = t[0], r = n.parentNode, r && (r.sizcache !== o || !n.nodeIndex)) {
                                for (h = 0, i = r.firstChild; i; i = i.nextSibling)i.nodeType === 1 && (i.nodeIndex = ++h);
                                r.sizcache = o
                            }
                            return f = n.nodeIndex - e, u === 0 ? f === 0 : f % u == 0 && f / u >= 0
                    }
                }, ID: function (n, t) {
                    return n.nodeType === 1 && n.getAttribute("id") === t
                }, TAG: function (n, t) {
                    return t === "*" && n.nodeType === 1 || n.nodeName.toLowerCase() === t
                }, CLASS: function (n, t) {
                    return (" " + (n.className || n.getAttribute("class")) + " ").indexOf(t) > -1
                }, ATTR: function (n, t) {
                    var e = t[1], o = u.attrHandle[e] ? u.attrHandle[e](n) : n[e] != null ? n[e] : n.getAttribute(e), r = o + "", f = t[2], i = t[4];
                    return o == null ? f === "!=" : f === "=" ? r === i : f === "*=" ? r.indexOf(i) >= 0 : f === "~=" ? (" " + r + " ").indexOf(i) >= 0 : i ? f === "!=" ? r !== i : f === "^=" ? r.indexOf(i) === 0 : f === "$=" ? r.substr(r.length - i.length) === i : f === "|=" ? r === i || r.substr(0, i.length + 1) === i + "-" : !1 : r && o !== !1
                }, POS: function (n, t, i, r) {
                    var e = t[2], f = u.setFilters[e];
                    if (f)return f(n, i, t, r)
                }
            }
        }, k = u.match.POS;
        for (s in u.match)u.match[s] = new RegExp(u.match[s].source + /(?![^\[]*\])(?![^\(]*\))/.source), u.leftMatch[s] = new RegExp(/(^(?:.|\r|\n)*?)/.source + u.match[s].source.replace(/\\(\d+)/g, function (n, t) {
            return "\\" + (+t + 1)
        }));
        o = function (n, t) {
            return (n = Array.prototype.slice.call(n, 0), t) ? (t.push.apply(t, n), t) : n
        };
        try {
            Array.prototype.slice.call(r.documentElement.childNodes, 0)[0].nodeType
        } catch (nt) {
            o = function (n, t) {
                var r = t || [], u, i;
                if (g.call(n) === "[object Array]")Array.prototype.push.apply(r, n); else if (typeof n.length == "number")for (i = 0, u = n.length; i < u; i++)r.push(n[i]); else for (i = 0; n[i]; i++)r.push(n[i]);
                return r
            }
        }
        r.documentElement.compareDocumentPosition ? h = function (n, t) {
            if (!n.compareDocumentPosition || !t.compareDocumentPosition)return n == t && (e = !0), n.compareDocumentPosition ? -1 : 1;
            var i = n.compareDocumentPosition(t) & 4 ? -1 : n === t ? 0 : 1;
            return i === 0 && (e = !0), i
        } : "sourceIndex"in r.documentElement ? h = function (n, t) {
            if (!n.sourceIndex || !t.sourceIndex)return n == t && (e = !0), n.sourceIndex ? -1 : 1;
            var i = n.sourceIndex - t.sourceIndex;
            return i === 0 && (e = !0), i
        } : r.createRange && (h = function (n, t) {
            var r, i, u;
            return !n.ownerDocument || !t.ownerDocument ? (n == t && (e = !0), n.ownerDocument ? -1 : 1) : (r = n.ownerDocument.createRange(), i = t.ownerDocument.createRange(), r.setStart(n, 0), r.setEnd(n, 0), i.setStart(t, 0), i.setEnd(t, 0), u = r.compareBoundaryPoints(Range.START_TO_END, i), u === 0 && (e = !0), u)
        }), function () {
            var i = r.createElement("div"), f = "script" + +new Date, n;
            i.innerHTML = "<a name='" + f + "'/>", n = r.documentElement, n.insertBefore(i, n.firstChild), r.getElementById(f) && (u.find.ID = function (n, i, r) {
                if (typeof i.getElementById != "undefined" && !r) {
                    var u = i.getElementById(n[1]);
                    return u ? u.id === n[1] || typeof u.getAttributeNode != "undefined" && u.getAttributeNode("id").nodeValue === n[1] ? [u] : t : []
                }
            }, u.filter.ID = function (n, t) {
                var i = typeof n.getAttributeNode != "undefined" && n.getAttributeNode("id");
                return n.nodeType === 1 && i && i.nodeValue === t
            }), n.removeChild(i), n = i = null
        }(), function () {
            var n = r.createElement("div");
            n.appendChild(r.createComment("")), n.getElementsByTagName("*").length > 0 && (u.find.TAG = function (n, t) {
                var r = t.getElementsByTagName(n[1]), u, i;
                if (n[1] === "*") {
                    for (u = [], i = 0; r[i]; i++)r[i].nodeType === 1 && u.push(r[i]);
                    r = u
                }
                return r
            }), n.innerHTML = "<a href='#'></a>", n.firstChild && typeof n.firstChild.getAttribute != "undefined" && n.firstChild.getAttribute("href") !== "#" && (u.attrHandle.href = function (n) {
                return n.getAttribute("href", 2)
            }), n = null
        }(), r.querySelectorAll && function () {
            var i = f, n = r.createElement("div"), t;
            if (n.innerHTML = "<p class='TEST'></p>", !n.querySelectorAll || n.querySelectorAll(".TEST").length !== 0) {
                f = function (n, t, u, f) {
                    if (t = t || r, !f && t.nodeType === 9 && !c(t))try {
                        return o(t.querySelectorAll(n), u)
                    } catch (e) {
                    }
                    return i(n, t, u, f)
                };
                for (t in i)f[t] = i[t];
                n = null
            }
        }(), function () {
            var n = r.createElement("div");
            if ((n.innerHTML = "<div class='test e'></div><div class='test'></div>", n.getElementsByClassName && n.getElementsByClassName("e").length !== 0) && (n.lastChild.className = "e", n.getElementsByClassName("e").length !== 1))u.order.splice(1, 0, "CLASS"), u.find.CLASS = function (n, t, i) {
                if (typeof t.getElementsByClassName != "undefined" && !i)return t.getElementsByClassName(n[1])
            }, n = null
        }();
        var p = r.compareDocumentPosition ? function (n, t) {
            return !!(n.compareDocumentPosition(t) & 16)
        } : function (n, t) {
            return n !== t && (n.contains ? n.contains(t) : !0)
        }, c = function (n) {
            var t = (n ? n.ownerDocument || n : 0).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, w = function (n, t) {
            for (var o = [], s = "", h, r = t.nodeType ? [t] : t, i, e; h = u.match.PSEUDO.exec(n);)s += h[0], n = n.replace(u.match.PSEUDO, "");
            for (n = u.relative[n] ? n + "*" : n, i = 0, e = r.length; i < e; i++)f(n, r[i], o);
            return f.filter(s, o)
        };
        i.find = f, i.expr = f.selectors, i.expr[":"] = i.expr.filters, i.unique = f.uniqueSort, i.text = l, i.isXMLDoc = c, i.contains = p;
        return
    })();
    var ru = /Until$/, iu = /^(?:parents|prevUntil|prevAll)/, uu = /,/, y = Array.prototype.slice, pt = function (n, t, r) {
        if (i.isFunction(t))return i.grep(n, function (n, i) {
            return !!t.call(n, i, n) === r
        });
        if (t.nodeType)return i.grep(n, function (n) {
            return n === t === r
        });
        if (typeof t == "string") {
            var u = i.grep(n, function (n) {
                return n.nodeType === 1
            });
            if (or.test(t))return i.filter(t, u, !r);
            t = i.filter(t, u)
        }
        return i.grep(n, function (n) {
            return i.inArray(n, t) >= 0 === r
        })
    };
    i.fn.extend({
        find: function (n) {
            for (var t = this.pushStack("", "find", n), e = 0, r, f, u = 0, o = this.length; u < o; u++)if (e = t.length, i.find(n, this[u], t), u > 0)for (r = e; r < t.length; r++)for (f = 0; f < e; f++)if (t[f] === t[r]) {
                t.splice(r--, 1);
                break
            }
            return t
        }, has: function (n) {
            var t = i(n);
            return this.filter(function () {
                for (var n = 0, r = t.length; n < r; n++)if (i.contains(this, t[n]))return !0
            })
        }, not: function (n) {
            return this.pushStack(pt(this, n, !1), "not", n)
        }, filter: function (n) {
            return this.pushStack(pt(this, n, !0), "filter", n)
        }, is: function (n) {
            return !!n && i.filter(n, this).length > 0
        }, closest: function (n, t) {
            var e, c, s;
            if (i.isArray(n)) {
                var h = [], u = this[0], o, f = {}, r;
                if (u && n.length) {
                    for (e = 0, c = n.length; e < c; e++)r = n[e], f[r] || (f[r] = i.expr.match.POS.test(r) ? i(r, t || this.context) : r);
                    while (u && u.ownerDocument && u !== t) {
                        for (r in f)o = f[r], (o.jquery ? o.index(u) > -1 : i(u).is(o)) && (h.push({
                            selector: r,
                            elem: u
                        }), delete f[r]);
                        u = u.parentNode
                    }
                }
                return h
            }
            return s = i.expr.match.POS.test(n) ? i(n, t || this.context) : null, this.map(function (r, u) {
                while (u && u.ownerDocument && u !== t) {
                    if (s ? s.index(u) > -1 : i(u).is(n))return u;
                    u = u.parentNode
                }
                return null
            })
        }, index: function (n) {
            return !n || typeof n == "string" ? i.inArray(this[0], n ? i(n) : this.parent().children()) : i.inArray(n.jquery ? n[0] : n, this)
        }, add: function (n, t) {
            var u = typeof n == "string" ? i(n, t || this.context) : i.makeArray(n), r = i.merge(this.get(), u);
            return this.pushStack(bt(u[0]) || bt(r[0]) ? r : i.unique(r))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), i.each({
        parent: function (n) {
            var t = n.parentNode;
            return t && t.nodeType !== 11 ? t : null
        }, parents: function (n) {
            return i.dir(n, "parentNode")
        }, parentsUntil: function (n, t, r) {
            return i.dir(n, "parentNode", r)
        }, next: function (n) {
            return i.nth(n, 2, "nextSibling")
        }, prev: function (n) {
            return i.nth(n, 2, "previousSibling")
        }, nextAll: function (n) {
            return i.dir(n, "nextSibling")
        }, prevAll: function (n) {
            return i.dir(n, "previousSibling")
        }, nextUntil: function (n, t, r) {
            return i.dir(n, "nextSibling", r)
        }, prevUntil: function (n, t, r) {
            return i.dir(n, "previousSibling", r)
        }, siblings: function (n) {
            return i.sibling(n.parentNode.firstChild, n)
        }, children: function (n) {
            return i.sibling(n.firstChild)
        }, contents: function (n) {
            return i.nodeName(n, "iframe") ? n.contentDocument || n.contentWindow.document : i.makeArray(n.childNodes)
        }
    }, function (n, t) {
        i.fn[n] = function (r, u) {
            var f = i.map(this, t, r);
            return ru.test(n) || (u = r), u && typeof u == "string" && (f = i.filter(u, f)), f = this.length > 1 ? i.unique(f) : f, (this.length > 1 || uu.test(u)) && iu.test(n) && (f = f.reverse()), this.pushStack(f, n, y.call(arguments).join(","))
        }
    }), i.extend({
        filter: function (n, t, r) {
            return r && (n = ":not(" + n + ")"), i.find.matches(n, t)
        }, dir: function (n, r, u) {
            for (var e = [], f = n[r]; f && f.nodeType !== 9 && (u === t || f.nodeType !== 1 || !i(f).is(u));)f.nodeType === 1 && e.push(f), f = f[r];
            return e
        }, nth: function (n, t, i) {
            t = t || 1;
            for (var u = 0; n; n = n[i])if (n.nodeType === 1 && ++u === t)break;
            return n
        }, sibling: function (n, t) {
            for (var i = []; n; n = n.nextSibling)n.nodeType === 1 && n !== t && i.push(n);
            return i
        }
    });
    var wt = / jQuery\d+="(?:\d+|null)"/g, v = /^\s+/, fi = /(<([\w:]+)[^>]*?)\/>/g, eu = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i, ui = /<([\w:]+)/, dr = /<tbody/i, kr = /<|&#?\w+;/, ri = /<script|<object|<embed|<option|<style/i, si = /checked\s*(?:[^=]|=\s*.checked.)/i, oi = function (n, t, i) {
        return eu.test(i) ? n : t + "></" + i + ">"
    }, u = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    };
    u.optgroup = u.option, u.tbody = u.tfoot = u.colgroup = u.caption = u.thead, u.th = u.td, i.support.htmlSerialize || (u._default = [1, "div<div>", "</div>"]), i.fn.extend({
        text: function (n) {
            return i.isFunction(n) ? this.each(function (t) {
                var r = i(this);
                r.text(n.call(this, t, r.text()))
            }) : typeof n != "object" && n !== t ? this.empty().append((this[0] && this[0].ownerDocument || r).createTextNode(n)) : i.text(this)
        }, wrapAll: function (n) {
            if (i.isFunction(n))return this.each(function (t) {
                i(this).wrapAll(n.call(this, t))
            });
            if (this[0]) {
                var t = i(n, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var n = this; n.firstChild && n.firstChild.nodeType === 1;)n = n.firstChild;
                    return n
                }).append(this)
            }
            return this
        }, wrapInner: function (n) {
            return i.isFunction(n) ? this.each(function (t) {
                i(this).wrapInner(n.call(this, t))
            }) : this.each(function () {
                var r = i(this), t = r.contents();
                t.length ? t.wrapAll(n) : r.append(n)
            })
        }, wrap: function (n) {
            return this.each(function () {
                i(this).wrapAll(n)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (n) {
                this.nodeType === 1 && this.appendChild(n)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (n) {
                this.nodeType === 1 && this.insertBefore(n, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (n) {
                this.parentNode.insertBefore(n, this)
            });
            if (arguments.length) {
                var n = i(arguments[0]);
                return n.push.apply(n, this.toArray()), this.pushStack(n, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (n) {
                this.parentNode.insertBefore(n, this.nextSibling)
            });
            if (arguments.length) {
                var n = this.pushStack(this, "after", arguments);
                return n.push.apply(n, i(arguments[0]).toArray()), n
            }
        }, remove: function (n, t) {
            for (var u = 0, r; (r = this[u]) != null; u++)(!n || i.filter(n, [r]).length) && (t || r.nodeType !== 1 || (i.cleanData(r.getElementsByTagName("*")), i.cleanData([r])), r.parentNode && r.parentNode.removeChild(r));
            return this
        }, empty: function () {
            for (var t = 0, n; (n = this[t]) != null; t++)for (n.nodeType === 1 && i.cleanData(n.getElementsByTagName("*")); n.firstChild;)n.removeChild(n.firstChild);
            return this
        }, clone: function (n) {
            var t = this.map(function () {
                var n, r, t;
                return i.support.noCloneEvent || i.isXMLDoc(this) ? this.cloneNode(!0) : (n = this.outerHTML, r = this.ownerDocument, n || (t = r.createElement("div"), t.appendChild(this.cloneNode(!0)), n = t.innerHTML), i.clean([n.replace(wt, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(v, "")], r)[0])
            });
            return n === !0 && (gt(this, t), gt(this.find("*"), t.find("*"))), t
        }, html: function (n) {
            if (n === t)return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(wt, "") : null;
            if (typeof n != "string" || ri.test(n) || !i.support.leadingWhitespace && v.test(n) || u[(ui.exec(n) || ["", ""])[1].toLowerCase()])i.isFunction(n) ? this.each(function (t) {
                var r = i(this), u = r.html();
                r.empty().append(function () {
                    return n.call(this, t, u)
                })
            }) : this.empty().append(n); else {
                n = n.replace(fi, oi);
                try {
                    for (var r = 0, f = this.length; r < f; r++)this[r].nodeType === 1 && (i.cleanData(this[r].getElementsByTagName("*")), this[r].innerHTML = n)
                } catch (e) {
                    this.empty().append(n)
                }
            }
            return this
        }, replaceWith: function (n) {
            return this[0] && this[0].parentNode ? i.isFunction(n) ? this.each(function (t) {
                var r = i(this), u = r.html();
                r.replaceWith(n.call(this, t, u))
            }) : (typeof n != "string" && (n = i(n).detach()), this.each(function () {
                var t = this.nextSibling, r = this.parentNode;
                i(this).remove(), t ? i(t).before(n) : i(r).append(n)
            })) : this.pushStack(i(i.isFunction(n) ? n() : n), "replaceWith", n)
        }, detach: function (n) {
            return this.remove(n, !0)
        }, domManip: function (n, r, u) {
            function v(n) {
                return i.nodeName(n, "table") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
            }

            var c, s, o = n[0], l = [], f, h, e, a;
            if (!i.support.checkClone && arguments.length === 3 && typeof o == "string" && si.test(o))return this.each(function () {
                i(this).domManip(n, r, u, !0)
            });
            if (i.isFunction(o))return this.each(function (f) {
                var e = i(this);
                n[0] = o.call(this, f, r ? e.html() : t), e.domManip(n, r, u)
            });
            if (this[0]) {
                if (h = o && o.parentNode, c = i.support.parentNode && h && h.nodeType === 11 && h.childNodes.length === this.length ? {fragment: h} : dt(n, this, l), f = c.fragment, s = f.childNodes.length === 1 ? f = f.firstChild : f.firstChild, s)for (r = r && i.nodeName(s, "tr"), e = 0, a = this.length; e < a; e++)u.call(r ? v(this[e], s) : this[e], e > 0 || c.cacheable || this.length > 1 ? f.cloneNode(!0) : f);
                l.length && i.each(l, wu)
            }
            return this
        }
    }), i.fragments = {}, i.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (n, t) {
        i.fn[n] = function (r) {
            var o = [], u = i(r), s = this.length === 1 && this[0].parentNode, f, h, e;
            if (s && s.nodeType === 11 && s.childNodes.length === 1 && u.length === 1)return u[t](this[0]), this;
            for (f = 0, h = u.length; f < h; f++)e = (f > 0 ? this.clone(!0) : this).get(), i.fn[t].apply(i(u[f]), e), o = o.concat(e);
            return this.pushStack(o, n, u.selector)
        }
    }), i.extend({
        clean: function (n, t, f, e) {
            var s, o, p, a, l, h;
            for (t = t || r, typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || r), s = [], h = 0; (o = n[h]) != null; h++) {
                if (typeof o == "number" && (o += ""), !o)continue;
                if (typeof o != "string" || kr.test(o)) {
                    if (typeof o == "string") {
                        o = o.replace(fi, oi);
                        var w = (ui.exec(o) || ["", ""])[1].toLowerCase(), y = u[w] || u._default, b = y[0], c = t.createElement("div");
                        for (c.innerHTML = y[1] + o + y[2]; b--;)c = c.lastChild;
                        if (!i.support.tbody)for (p = dr.test(o), a = w === "table" && !p ? c.firstChild && c.firstChild.childNodes : y[1] === "<table>" && !p ? c.childNodes : [], l = a.length - 1; l >= 0; --l)i.nodeName(a[l], "tbody") && !a[l].childNodes.length && a[l].parentNode.removeChild(a[l]);
                        !i.support.leadingWhitespace && v.test(o) && c.insertBefore(t.createTextNode(v.exec(o)[0]), c.firstChild), o = c.childNodes
                    }
                } else o = t.createTextNode(o);
                o.nodeType ? s.push(o) : s = i.merge(s, o)
            }
            if (f)for (h = 0; s[h]; h++)e && i.nodeName(s[h], "script") && (!s[h].type || s[h].type.toLowerCase() === "text/javascript") ? e.push(s[h].parentNode ? s[h].parentNode.removeChild(s[h]) : s[h]) : (s[h].nodeType === 1 && s.splice.apply(s, [h + 1, 0].concat(i.makeArray(s[h].getElementsByTagName("script")))), f.appendChild(s[h]));
            return s
        }, cleanData: function (n) {
            for (var f, u, o = i.cache, s = i.event.special, h = i.support.deleteExpando, t, r, e = 0; (t = n[e]) != null; e++)if (u = t[i.expando], u) {
                if (f = o[u], f.events)for (r in f.events)s[r] ? i.event.remove(t, r) : g(t, r, f.handle);
                h ? delete t[i.expando] : t.removeAttribute && t.removeAttribute(i.expando), delete o[u]
            }
        }
    });
    var au = /z-?index|font-?weight|opacity|zoom|line-?height/i, kt = /alpha\([^)]*\)/, ii = /opacity=([^)]*)/, lt = /float/i, yt = /-([a-z])/ig, pu = /([A-Z])/g, su = /^-?\d+(?:px)?$/i, ou = /^-?\d/, hu = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, lu = ["Left", "Right"], cu = ["Top", "Bottom"], nr = r.defaultView && r.defaultView.getComputedStyle, ti = i.support.cssFloat ? "cssFloat" : "styleFloat", ct = function (n, t) {
        return t.toUpperCase()
    };
    i.fn.css = function (n, r) {
        return at(this, n, r, !0, function (n, r, u) {
            if (u === t)return i.curCSS(n, r);
            typeof u != "number" || au.test(r) || (u += "px"), i.style(n, r, u)
        })
    }, i.extend({
        style: function (n, r, u) {
            var f, s, o, e;
            return !n || n.nodeType === 3 || n.nodeType === 8 ? t : ((r === "width" || r === "height") && parseFloat(u) < 0 && (u = t), f = n.style || n, s = u !== t, !i.support.opacity && r === "opacity") ? (s && (f.zoom = 1, o = parseInt(u, 10) + "" == "NaN" ? "" : "alpha(opacity=" + u * 100 + ")", e = f.filter || i.curCSS(n, "filter") || "", f.filter = kt.test(e) ? e.replace(kt, o) : o), f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(ii.exec(f.filter)[1]) / 100 + "" : "") : (lt.test(r) && (r = ti), r = r.replace(yt, ct), s && (f[r] = u), f[r])
        }, css: function (n, t, r, u) {
            if (t === "width" || t === "height") {
                var f, o = hu, s = t === "width" ? lu : cu;

                function e() {
                    if (f = t === "width" ? n.offsetWidth : n.offsetHeight, u !== "border")i.each(s, function () {
                        u || (f -= parseFloat(i.curCSS(n, "padding" + this, !0)) || 0), u === "margin" ? f += parseFloat(i.curCSS(n, "margin" + this, !0)) || 0 : f -= parseFloat(i.curCSS(n, "border" + this + "Width", !0)) || 0
                    })
                }

                return n.offsetWidth !== 0 ? e() : i.swap(n, o, e), Math.max(0, Math.round(f))
            }
            return i.curCSS(n, t, r)
        }, curCSS: function (n, t, r) {
            var u, f = n.style, l, s, e, o, h, c;
            if (!i.support.opacity && t === "opacity" && n.currentStyle)return u = ii.test(n.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "", u === "" ? "1" : u;
            if (lt.test(t) && (t = ti), !r && f && f[t])u = f[t]; else if (nr) {
                if (lt.test(t) && (t = "float"), t = t.replace(pu, "-$1").toLowerCase(), s = n.ownerDocument.defaultView, !s)return null;
                e = s.getComputedStyle(n, null), e && (u = e.getPropertyValue(t)), t === "opacity" && u === "" && (u = "1")
            } else n.currentStyle && (o = t.replace(yt, ct), u = n.currentStyle[t] || n.currentStyle[o], !su.test(u) && ou.test(u) && (h = f.left, c = n.runtimeStyle.left, n.runtimeStyle.left = n.currentStyle.left, f.left = o === "fontSize" ? "1em" : u || 0, u = f.pixelLeft + "px", f.left = h, n.runtimeStyle.left = c));
            return u
        }, swap: function (n, t, i) {
            var u = {}, r;
            for (r in t)u[r] = n.style[r], n.style[r] = t[r];
            i.call(n);
            for (r in t)n.style[r] = u[r]
        }
    }), i.expr && i.expr.filters && (i.expr.filters.hidden = function (n) {
        var u = n.offsetWidth, r = n.offsetHeight, t = n.nodeName.toLowerCase() === "tr";
        return u === 0 && r === 0 && !t ? !0 : u > 0 && r > 0 && !t ? !1 : i.curCSS(n, "display") === "none"
    }, i.expr.filters.visible = function (n) {
        return !i.expr.filters.hidden(n)
    });
    var rr = e(), er = /<script(.|\s)*?\/script>/gi, fr = /select|textarea/i, ir = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i, s = /=\?(&|$)/, ht = /\?/, yr = /(\?|&)_=.*?(&|$)/, vr = /^(\w+:)?\/\/([^\/?#]+)/, pr = /%20/g, br = i.fn.load;
    i.fn.extend({
        load: function (n, t, r) {
            var u, o, e, f;
            return typeof n != "string" ? br.call(this, n) : this.length ? (u = n.indexOf(" "), u >= 0 && (o = n.slice(u, n.length), n = n.slice(0, u)), e = "GET", t && (i.isFunction(t) ? (r = t, t = null) : typeof t == "object" && (t = i.param(t, i.ajaxSettings.traditional), e = "POST")), f = this, i.ajax({
                url: n,
                type: e,
                dataType: "html",
                data: t,
                complete: function (n, t) {
                    (t === "success" || t === "notmodified") && f.html(o ? i("<div />").append(n.responseText.replace(er, "")).find(o) : n.responseText), r && f.each(r, [n.responseText, t, n])
                }
            }), this) : this
        }, serialize: function () {
            return i.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? i.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || fr.test(this.nodeName) || ir.test(this.type))
            }).map(function (n, t) {
                var r = i(this).val();
                return r == null ? null : i.isArray(r) ? i.map(r, function (n) {
                    return {name: t.name, value: n}
                }) : {name: t.name, value: r}
            }).get()
        }
    }), i.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (n, t) {
        i.fn[t] = function (n) {
            return this.bind(t, n)
        }
    }), i.extend({
        get: function (n, t, r, u) {
            return i.isFunction(t) && (u = u || r, r = t, t = null), i.ajax({
                type: "GET",
                url: n,
                data: t,
                success: r,
                dataType: u
            })
        },
        getScript: function (n, t) {
            return i.get(n, null, t, "script")
        },
        getJSON: function (n, t, r) {
            return i.get(n, t, r, "json")
        },
        post: function (n, t, r, u) {
            return i.isFunction(t) && (u = u || r, r = t, t = {}), i.ajax({
                type: "POST",
                url: n,
                data: t,
                success: r,
                dataType: u
            })
        },
        ajaxSetup: function (n) {
            i.extend(i.ajaxSettings, n)
        },
        ajaxSettings: {
            url: location.href,
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            xhr: n.XMLHttpRequest && (n.location.protocol !== "file:" || !n.ActiveXObject) ? function () {
                return new n.XMLHttpRequest
            } : function () {
                try {
                    return new n.ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {
                }
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        etag: {},
        ajax: function (u) {
            function d() {
                f.success && f.success.call(tt, g, a, o), f.global && k("ajaxSuccess", [o, f])
            }

            function p() {
                f.complete && f.complete.call(tt, o, a), f.global && k("ajaxComplete", [o, f]), f.global && !--i.active && i.event.trigger("ajaxStop")
            }

            function k(n, t) {
                (f.context ? i(f.context) : i.event).trigger(n, t)
            }

            var f = i.extend(!0, {}, i.ajaxSettings, u), l, a, g, tt = u && u.context || f, c = f.type.toUpperCase(), nt, ut, w, rt, v, h, it, y, o, b, ft;
            if (f.data && f.processData && typeof f.data != "string" && (f.data = i.param(f.data, f.traditional)), f.dataType === "jsonp" && (c === "GET" ? s.test(f.url) || (f.url += (ht.test(f.url) ? "&" : "?") + (f.jsonp || "callback") + "=?") : f.data && s.test(f.data) || (f.data = (f.data ? f.data + "&" : "") + (f.jsonp || "callback") + "=?"), f.dataType = "json"), f.dataType === "json" && (f.data && s.test(f.data) || s.test(f.url)) && (l = f.jsonpCallback || "jsonp" + rr++, f.data && (f.data = (f.data + "").replace(s, "=" + l + "$1")), f.url = f.url.replace(s, "=" + l + "$1"), f.dataType = "script", n[l] = n[l] || function (i) {
                    g = i, d(), p(), n[l] = t;
                    try {
                        delete n[l]
                    } catch (r) {
                    }
                    v && v.removeChild(h)
                }), f.dataType === "script" && f.cache === null && (f.cache = !1), f.cache === !1 && c === "GET" && (nt = e(), ut = f.url.replace(yr, "$1_=" + nt + "$2"), f.url = ut + (ut === f.url ? (ht.test(f.url) ? "&" : "?") + "_=" + nt : "")), f.data && c === "GET" && (f.url += (ht.test(f.url) ? "&" : "?") + f.data), f.global && !i.active++ && i.event.trigger("ajaxStart"), w = vr.exec(f.url), rt = w && (w[1] && w[1] !== location.protocol || w[2] !== location.host), f.dataType === "script" && c === "GET" && rt)return v = r.getElementsByTagName("head")[0] || r.documentElement, h = r.createElement("script"), h.src = f.url, f.scriptCharset && (h.charset = f.scriptCharset), l || (it = !1, h.onload = h.onreadystatechange = function () {
                it || this.readyState && this.readyState !== "loaded" && this.readyState !== "complete" || (it = !0, d(), p(), h.onload = h.onreadystatechange = null, v && h.parentNode && v.removeChild(h))
            }), v.insertBefore(h, v.firstChild), t;
            if (y = !1, o = f.xhr(), o) {
                f.username ? o.open(c, f.url, f.async, f.username, f.password) : o.open(c, f.url, f.async);
                try {
                    (f.data || u && u.contentType) && o.setRequestHeader("Content-Type", f.contentType), f.ifModified && (i.lastModified[f.url] && o.setRequestHeader("If-Modified-Since", i.lastModified[f.url]), i.etag[f.url] && o.setRequestHeader("If-None-Match", i.etag[f.url])), rt || o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.setRequestHeader("Accept", f.dataType && f.accepts[f.dataType] ? f.accepts[f.dataType] + ", */*" : f.accepts._default)
                } catch (et) {
                }
                if (f.beforeSend && f.beforeSend.call(tt, o, f) === !1)return f.global && !--i.active && i.event.trigger("ajaxStop"), o.abort(), !1;
                f.global && k("ajaxSend", [o, f]), b = o.onreadystatechange = function (n) {
                    if (o && o.readyState !== 0 && n !== "abort") {
                        if (!y && o && (o.readyState === 4 || n === "timeout")) {
                            y = !0, o.onreadystatechange = i.noop, a = n === "timeout" ? "timeout" : i.httpSuccess(o) ? f.ifModified && i.httpNotModified(o, f.url) ? "notmodified" : "success" : "error";
                            var t;
                            if (a === "success")try {
                                g = i.httpData(o, f.dataType, f)
                            } catch (r) {
                                a = "parsererror", t = r
                            }
                            a === "success" || a === "notmodified" ? l || d() : i.handleError(f, o, a, t), p(), n === "timeout" && o.abort(), f.async && (o = null)
                        }
                    } else y || p(), y = !0, o && (o.onreadystatechange = i.noop)
                };
                try {
                    ft = o.abort, o.abort = function () {
                        o && ft.call(o), b("abort")
                    }
                } catch (et) {
                }
                f.async && f.timeout > 0 && setTimeout(function () {
                    o && !y && b("timeout")
                }, f.timeout);
                try {
                    o.send(c === "POST" || c === "PUT" || c === "DELETE" ? f.data : null)
                } catch (et) {
                    i.handleError(f, o, null, et), p()
                }
                return f.async || b(), o
            }
        },
        handleError: function (n, t, r, u) {
            n.error && n.error.call(n.context || n, t, r, u), n.global && (n.context ? i(n.context) : i.event).trigger("ajaxError", [t, n, u])
        },
        active: 0,
        httpSuccess: function (n) {
            try {
                return !n.status && location.protocol === "file:" || n.status >= 200 && n.status < 300 || n.status === 304 || n.status === 1223 || n.status === 0
            } catch (t) {
            }
            return !1
        },
        httpNotModified: function (n, t) {
            var u = n.getResponseHeader("Last-Modified"), r = n.getResponseHeader("Etag");
            return u && (i.lastModified[t] = u), r && (i.etag[t] = r), n.status === 304 || n.status === 0
        },
        httpData: function (n, t, r) {
            var f = n.getResponseHeader("content-type") || "", e = t === "xml" || !t && f.indexOf("xml") >= 0, u = e ? n.responseXML : n.responseText;
            return e && u.documentElement.nodeName === "parsererror" && i.error("parsererror"), r && r.dataFilter && (u = r.dataFilter(u, t)), typeof u == "string" && (t === "json" || !t && f.indexOf("json") >= 0 ? u = i.parseJSON(u) : (t === "script" || !t && f.indexOf("javascript") >= 0) && i.globalEval(u)), u
        },
        param: function (n, r) {
            function u(n, t) {
                i.isArray(t) ? i.each(t, function (t, e) {
                    r || /\[\]$/.test(n) ? f(n, e) : u(n + "[" + (typeof e == "object" || i.isArray(e) ? t : "") + "]", e)
                }) : r || t == null || typeof t != "object" ? f(n, t) : i.each(t, function (t, i) {
                    u(n + "[" + t + "]", i)
                })
            }

            function f(n, t) {
                t = i.isFunction(t) ? t() : t, e[e.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
            }

            var e = [], o;
            if (r === t && (r = i.ajaxSettings.traditional), i.isArray(n) || n.jquery)i.each(n, function () {
                f(this.name, this.value)
            }); else for (o in n)u(o, n[o]);
            return e.join("&").replace(pr, "+")
        }
    });
    var st = {}, ar = /toggle|show|hide/, sr = /^([+-]=)?([\d+-.]+)(.*)$/, w, ni = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    i.fn.extend({
        show: function (n, t) {
            var r, c, l, f, u, s, e, h;
            if (n || n === 0)return this.animate(o("show", 3), n, t);
            for (r = 0, c = this.length; r < c; r++)l = i.data(this[r], "olddisplay"), this[r].style.display = l || "", i.css(this[r], "display") === "none" && (f = this[r].nodeName, st[f] ? u = st[f] : (s = i("<" + f + " />").appendTo("body"), u = s.css("display"), u === "none" && (u = "block"), s.remove(), st[f] = u), i.data(this[r], "olddisplay", u));
            for (e = 0, h = this.length; e < h; e++)this[e].style.display = i.data(this[e], "olddisplay") || "";
            return this
        }, hide: function (n, t) {
            var r, s, f, u, e;
            if (n || n === 0)return this.animate(o("hide", 3), n, t);
            for (r = 0, s = this.length; r < s; r++)f = i.data(this[r], "olddisplay"), f || f === "none" || i.data(this[r], "olddisplay", i.css(this[r], "display"));
            for (u = 0, e = this.length; u < e; u++)this[u].style.display = "none";
            return this
        }, _toggle: i.fn.toggle, toggle: function (n, t) {
            var r = typeof n == "boolean";
            return i.isFunction(n) && i.isFunction(t) ? this._toggle.apply(this, arguments) : n == null || r ? this.each(function () {
                var t = r ? n : i(this).is(":hidden");
                i(this)[t ? "show" : "hide"]()
            }) : this.animate(o("toggle", 3), n, t), this
        }, fadeTo: function (n, t, i) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: t}, n, i)
        }, animate: function (n, t, r, u) {
            var f = i.speed(t, r, u);
            return i.isEmptyObject(n) ? this.each(f.complete) : this[f.queue === !1 ? "each" : "queue"](function () {
                var r = i.extend({}, f), t, e = this.nodeType === 1 && i(this).is(":hidden"), o = this, u;
                for (t in n) {
                    if (u = t.replace(yt, ct), t !== u && (n[u] = n[t], delete n[t], t = u), n[t] === "hide" && e || n[t] === "show" && !e)return r.complete.call(this);
                    (t === "height" || t === "width") && this.style && (r.display = i.css(this, "display"), r.overflow = this.style.overflow), i.isArray(n[t]) && ((r.specialEasing = r.specialEasing || {})[t] = n[t][1], n[t] = n[t][0])
                }
                return r.overflow != null && (this.style.overflow = "hidden"), r.curAnim = i.extend({}, n), i.each(n, function (t, u) {
                    var l = new i.fx(o, r, t), h, f, s, c;
                    ar.test(u) ? l[u === "toggle" ? e ? "show" : "hide" : u](n) : (h = sr.exec(u), f = l.cur(!0) || 0, h ? (s = parseFloat(h[2]), c = h[3] || "px", c !== "px" && (o.style[t] = (s || 1) + c, f = (s || 1) / l.cur(!0) * f, o.style[t] = f + c), h[1] && (s = (h[1] === "-=" ? -1 : 1) * s + f), l.custom(f, s, c)) : l.custom(f, u, ""))
                }), !0
            })
        }, stop: function (n, t) {
            var r = i.timers;
            return n && this.queue([]), this.each(function () {
                for (var n = r.length - 1; n >= 0; n--)r[n].elem === this && (t && r[n](!0), r.splice(n, 1))
            }), t || this.dequeue(), this
        }
    }), i.each({
        slideDown: o("show", 1),
        slideUp: o("hide", 1),
        slideToggle: o("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"}
    }, function (n, t) {
        i.fn[n] = function (n, i) {
            return this.animate(t, n, i)
        }
    }), i.extend({
        speed: function (n, t, r) {
            var u = n && typeof n == "object" ? n : {
                complete: r || !r && t || i.isFunction(n) && n,
                duration: n,
                easing: r && t || t && !i.isFunction(t) && t
            };
            return u.duration = i.fx.off ? 0 : typeof u.duration == "number" ? u.duration : i.fx.speeds[u.duration] || i.fx.speeds._default, u.old = u.complete, u.complete = function () {
                u.queue !== !1 && i(this).dequeue(), i.isFunction(u.old) && u.old.call(this)
            }, u
        }, easing: {
            linear: function (n, t, i, r) {
                return i + r * n
            }, swing: function (n, t, i, r) {
                return (-Math.cos(n * Math.PI) / 2 + .5) * r + i
            }
        }, timers: [], fx: function (n, t, i) {
            this.options = t, this.elem = n, this.prop = i, t.orig || (t.orig = {})
        }
    }), i.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (i.fx.step[this.prop] || i.fx.step._default)(this), (this.prop === "height" || this.prop === "width") && this.elem.style && (this.elem.style.display = "block")
        }, cur: function (n) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
            var t = parseFloat(i.css(this.elem, this.prop, n));
            return t && t > -1e4 ? t : parseFloat(i.curCSS(this.elem, this.prop)) || 0
        }, custom: function (n, t, r) {
            function u(n) {
                return f.step(n)
            }

            this.startTime = e(), this.start = n, this.end = t, this.unit = r || this.unit || "px", this.now = this.start, this.pos = this.state = 0;
            var f = this;
            u.elem = this.elem, u() && i.timers.push(u) && !w && (w = setInterval(i.fx.tick, 13))
        }, show: function () {
            this.options.orig[this.prop] = i.style(this.elem, this.prop), this.options.show = !0, this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), i(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = i.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (n) {
            var s = e(), c = !0, h, t, r, u, f, o;
            if (n || s >= this.options.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), this.options.curAnim[this.prop] = !0;
                for (h in this.options.curAnim)this.options.curAnim[h] !== !0 && (c = !1);
                if (c) {
                    if (this.options.display != null && (this.elem.style.overflow = this.options.overflow, t = i.data(this.elem, "olddisplay"), this.elem.style.display = t ? t : this.options.display, i.css(this.elem, "display") === "none" && (this.elem.style.display = "block")), this.options.hide && i(this.elem).hide(), this.options.hide || this.options.show)for (r in this.options.curAnim)i.style(this.elem, r, this.options.orig[r]);
                    this.options.complete.call(this.elem)
                }
                return !1
            }
            return u = s - this.startTime, this.state = u / this.options.duration, f = this.options.specialEasing && this.options.specialEasing[this.prop], o = this.options.easing || (i.easing.swing ? "swing" : "linear"), this.pos = i.easing[f || o](this.state, u, 0, 1, this.options.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), !0
        }
    }, i.extend(i.fx, {
        tick: function () {
            for (var t = i.timers, n = 0; n < t.length; n++)t[n]() || t.splice(n--, 1);
            t.length || i.fx.stop()
        }, stop: function () {
            clearInterval(w), w = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (n) {
                i.style(n.elem, "opacity", n.now)
            }, _default: function (n) {
                n.elem.style && n.elem.style[n.prop] != null ? n.elem.style[n.prop] = (n.prop === "width" || n.prop === "height" ? Math.max(0, n.now) : n.now) + n.unit : n.elem[n.prop] = n.now
            }
        }
    }), i.expr && i.expr.filters && (i.expr.filters.animated = function (n) {
        return i.grep(i.timers, function (t) {
            return n === t.elem
        }).length
    }), i.fn.offset = "getBoundingClientRect"in r.documentElement ? function (n) {
        var t = this[0];
        if (n)return this.each(function (t) {
            i.offset.setOffset(this, n, t)
        });
        if (!t || !t.ownerDocument)return null;
        if (t === t.ownerDocument.body)return i.offset.bodyOffset(t);
        var f = t.getBoundingClientRect(), e = t.ownerDocument, r = e.body, u = e.documentElement, h = u.clientTop || r.clientTop || 0, c = u.clientLeft || r.clientLeft || 0, o = f.top + (self.pageYOffset || i.support.boxModel && u.scrollTop || r.scrollTop) - h, s = f.left + (self.pageXOffset || i.support.boxModel && u.scrollLeft || r.scrollLeft) - c;
        return {top: o, left: s}
    } : function (n) {
        var t = this[0];
        if (n)return this.each(function (t) {
            i.offset.setOffset(this, n, t)
        });
        if (!t || !t.ownerDocument)return null;
        if (t === t.ownerDocument.body)return i.offset.bodyOffset(t);
        i.offset.initialize();
        for (var h = t.offsetParent, a = t, l = t.ownerDocument, r, c = l.documentElement, e = l.body, s = l.defaultView, o = s ? s.getComputedStyle(t, null) : t.currentStyle, u = t.offsetTop, f = t.offsetLeft; (t = t.parentNode) && t !== e && t !== c;) {
            if (i.offset.supportsFixedPosition && o.position === "fixed")break;
            r = s ? s.getComputedStyle(t, null) : t.currentStyle, u -= t.scrollTop, f -= t.scrollLeft, t === h && (u += t.offsetTop, f += t.offsetLeft, !i.offset.doesNotAddBorder || i.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(t.nodeName) || (u += parseFloat(r.borderTopWidth) || 0, f += parseFloat(r.borderLeftWidth) || 0), a = h, h = t.offsetParent), i.offset.subtractsBorderForOverflowNotVisible && r.overflow !== "visible" && (u += parseFloat(r.borderTopWidth) || 0, f += parseFloat(r.borderLeftWidth) || 0), o = r
        }
        return (o.position === "relative" || o.position === "static") && (u += e.offsetTop, f += e.offsetLeft), i.offset.supportsFixedPosition && o.position === "fixed" && (u += Math.max(c.scrollTop, e.scrollTop), f += Math.max(c.scrollLeft, e.scrollLeft)), {
            top: u,
            left: f
        }
    }, i.offset = {
        initialize: function () {
            var t = r.body, f = r.createElement("div"), u, n, h, e, s = parseFloat(i.curCSS(t, "marginTop", !0)) || 0, o = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            i.extend(f.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            }), f.innerHTML = o, t.insertBefore(f, t.firstChild), u = f.firstChild, n = u.firstChild, e = u.nextSibling.firstChild.firstChild, this.doesNotAddBorder = n.offsetTop !== 5, this.doesAddBorderForTableAndCells = e.offsetTop === 5, n.style.position = "fixed", n.style.top = "20px", this.supportsFixedPosition = n.offsetTop === 20 || n.offsetTop === 15, n.style.position = n.style.top = "", u.style.overflow = "hidden", u.style.position = "relative", this.subtractsBorderForOverflowNotVisible = n.offsetTop === -5, this.doesNotIncludeMarginInBodyOffset = t.offsetTop !== s, t.removeChild(f), t = f = u = n = h = e = null, i.offset.initialize = i.noop
        }, bodyOffset: function (n) {
            var r = n.offsetTop, t = n.offsetLeft;
            return i.offset.initialize(), i.offset.doesNotIncludeMarginInBodyOffset && (r += parseFloat(i.curCSS(n, "marginTop", !0)) || 0, t += parseFloat(i.curCSS(n, "marginLeft", !0)) || 0), {
                top: r,
                left: t
            }
        }, setOffset: function (n, t, r) {
            var f;
            /static/.test(i.curCSS(n, "position")) && (n.style.position = "relative");
            var e = i(n), u = e.offset(), o = parseInt(i.curCSS(n, "top", !0), 10) || 0, s = parseInt(i.curCSS(n, "left", !0), 10) || 0;
            i.isFunction(t) && (t = t.call(n, r, u)), f = {
                top: t.top - u.top + o,
                left: t.left - u.left + s
            }, "using"in t ? t.using.call(n, f) : e.css(f)
        }
    }, i.fn.extend({
        position: function () {
            if (!this[0])return null;
            var u = this[0], r = this.offsetParent(), n = this.offset(), t = /^body|html$/i.test(r[0].nodeName) ? {
                top: 0,
                left: 0
            } : r.offset();
            return n.top -= parseFloat(i.curCSS(u, "marginTop", !0)) || 0, n.left -= parseFloat(i.curCSS(u, "marginLeft", !0)) || 0, t.top += parseFloat(i.curCSS(r[0], "borderTopWidth", !0)) || 0, t.left += parseFloat(i.curCSS(r[0], "borderLeftWidth", !0)) || 0, {
                top: n.top - t.top,
                left: n.left - t.left
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var n = this.offsetParent || r.body; n && !/^body|html$/i.test(n.nodeName) && i.css(n, "position") === "static";)n = n.offsetParent;
                return n
            })
        }
    }), i.each(["Left", "Top"], function (n, r) {
        var u = "scroll" + r;
        i.fn[u] = function (r) {
            var e = this[0], f;
            return e ? r !== t ? this.each(function () {
                f = ei(this), f ? f.scrollTo(n ? i(f).scrollLeft() : r, n ? r : i(f).scrollTop()) : this[u] = r
            }) : (f = ei(e), f ? "pageXOffset"in f ? f[n ? "pageYOffset" : "pageXOffset"] : i.support.boxModel && f.document.documentElement[u] || f.document.body[u] : e[u]) : null
        }
    }), i.each(["Height", "Width"], function (n, r) {
        var u = r.toLowerCase();
        i.fn["inner" + r] = function () {
            return this[0] ? i.css(this[0], u, !1, "padding") : null
        }, i.fn["outer" + r] = function (n) {
            return this[0] ? i.css(this[0], u, !1, n ? "margin" : "border") : null
        }, i.fn[u] = function (n) {
            var f = this[0];
            return f ? i.isFunction(n) ? this.each(function (t) {
                var r = i(this);
                r[u](n.call(this, t, r[u]()))
            }) : "scrollTo"in f && f.document ? f.document.compatMode === "CSS1Compat" && f.document.documentElement["client" + r] || f.document.body["client" + r] : f.nodeType === 9 ? Math.max(f.documentElement["client" + r], f.body["scroll" + r], f.documentElement["scroll" + r], f.body["offset" + r], f.documentElement["offset" + r]) : n === t ? i.css(f, u) : this.css(u, typeof n == "string" ? n : n + "px") : n == null ? null : this
        }
    }), n.jQuery = n.$ = i
})(window), function (n) {
    var r = window.orientation != null, t = n.browser.opera || n.browser.mozilla && parseFloat(n.browser.version.substr(0, 3)) < 1.9 ? "input" : "paste", i = function (t) {
        t = n.event.fix(t || window.event), t.type = "paste";
        var i = t.target;
        setTimeout(function () {
            n.event.dispatch.call(i, t)
        }, 1)
    };
    n.event.special.paste = {
        setup: function () {
            this.addEventListener ? this.addEventListener(t, i, !1) : this.attachEvent && this.attachEvent("on" + t, i)
        }, teardown: function () {
            this.removeEventListener ? this.removeEventListener(t, i, !1) : this.detachEvent && this.detachEvent("on" + t, i)
        }
    }, n.extend({
        mask: {
            rules: {
                z: /[a-z]/,
                Z: /[A-Z]/,
                a: /[a-zA-Z]/,
                "*": /[0-9a-zA-Z]/,
                "@": /[0-9a-zA-ZçÇáàãâéèêíìóòôõúùü]/
            },
            keyRepresentation: {
                8: "backspace",
                9: "tab",
                13: "enter",
                16: "shift",
                17: "control",
                18: "alt",
                27: "esc",
                33: "page up",
                34: "page down",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "insert",
                46: "delete",
                116: "f5",
                123: "f12",
                224: "command"
            },
            iphoneKeyRepresentation: {10: "go", 127: "delete"},
            signals: {"+": "", "-": "-"},
            options: {
                attr: "alt",
                mask: null,
                type: "fixed",
                maxLength: -1,
                defaultValue: "",
                signal: !1,
                textAlign: !0,
                selectCharsOnFocus: !0,
                autoTab: !0,
                setSize: !1,
                fixedChars: "[(),.:/ -]",
                onInvalid: function () {
                },
                onValid: function () {
                },
                onOverflow: function () {
                }
            },
            masks: {
                phone: {mask: "(99) 9999-9999"},
                "phone-us": {mask: "(999) 999-9999"},
                cpf: {mask: "999.999.999-99"},
                cnpj: {mask: "99.999.999/9999-99"},
                date: {mask: "39/19/9999"},
                "date-us": {mask: "19/39/9999"},
                cep: {mask: "99999-999"},
                time: {mask: "29:59"},
                cc: {mask: "9999 9999 9999 9999"},
                integer: {mask: "999.999.999.999", type: "reverse"},
                decimal: {mask: "99,999.999.999.999", type: "reverse", defaultValue: "000"},
                "decimal-us": {mask: "99.999,999,999,999", type: "reverse", defaultValue: "000"},
                "signed-decimal": {mask: "99,999.999.999.999", type: "reverse", defaultValue: "+000"},
                "signed-decimal-us": {mask: "99,999.999.999.999", type: "reverse", defaultValue: "+000"}
            },
            init: function () {
                if (!this.hasInit) {
                    var u = this, t, i = r ? this.iphoneKeyRepresentation : this.keyRepresentation;
                    for (this.ignore = !1, t = 0; t <= 9; t++)this.rules[t] = new RegExp("[0-" + t + "]");
                    this.keyRep = i, this.ignoreKeys = [], n.each(i, function (n) {
                        u.ignoreKeys.push(parseInt(n, 10))
                    }), this.hasInit = !0
                }
            },
            set: function (t, i) {
                var r = this, f = n(t), u = "maxLength";
                return i = i || {}, this.init(), f.each(function () {
                    var o;
                    i.attr && (r.options.attr = i.attr);
                    var f = n(this), t = n.extend({}, r.options), h = f.attr(t.attr), e = "";
                    if (e = typeof i == "string" ? i : h !== "" ? h : null, e && (t.mask = e), r.masks[e] && (t = n.extend(t, r.masks[e])), typeof i == "object" && i.constructor != Array && (t = n.extend(t, i)), n.metadata && (t = n.extend(t, f.metadata())), t.mask != null) {
                        t.mask += "", f.data("mask") && r.unset(f);
                        var c = t.defaultValue, l = t.type === "reverse", s = new RegExp(t.fixedChars, "g");
                        t.maxLength === -1 && (t.maxLength = f.attr(u)), t = n.extend({}, t, {
                            fixedCharsReg: new RegExp(t.fixedChars),
                            fixedCharsRegG: s,
                            maskArray: t.mask.split(""),
                            maskNonFixedCharsArray: t.mask.replace(s, "").split("")
                        }), (t.type == "fixed" || l) && t.setSize && !f.attr("size") && f.attr("size", t.mask.length), l && t.textAlign && f.css("text-align", "right"), (this.value !== "" || c !== "") && (o = r.string(this.value !== "" ? this.value : c, t), this.defaultValue = o, f.val(o)), t.type == "infinite" && (t.type = "repeat"), f.data("mask", t), f.removeAttr(u), f.bind("keydown.mask", {
                            func: r._onKeyDown,
                            thisObj: r
                        }, r._onMask).bind("keypress.mask", {
                            func: r._onKeyPress,
                            thisObj: r
                        }, r._onMask).bind("keyup.mask", {
                            func: r._onKeyUp,
                            thisObj: r
                        }, r._onMask).bind("paste.mask", {
                            func: r._onPaste,
                            thisObj: r
                        }, r._onMask).bind("focus.mask", r._onFocus).bind("blur.mask", r._onBlur).bind("change.mask", r._onChange)
                    }
                })
            },
            unset: function (t) {
                var i = n(t);
                return i.each(function () {
                    var t = n(this), i;
                    t.data("mask") && (i = t.data("mask").maxLength, i != -1 && t.attr("maxLength", i), t.unbind(".mask").removeData("mask"))
                })
            },
            string: function (t, i) {
                var r, f, e, u;
                this.init(), r = {}, typeof t != "string" && (t = String(t));
                switch (typeof i) {
                    case"string":
                        this.masks[i] ? r = n.extend(r, this.masks[i]) : r.mask = i;
                        break;
                    case"object":
                        r = i
                }
                return r.fixedChars || (r.fixedChars = this.options.fixedChars), f = new RegExp(r.fixedChars), e = new RegExp(r.fixedChars, "g"), r.type === "reverse" && r.defaultValue && typeof this.signals[r.defaultValue.charAt(0)] != "undefined" && (u = t.charAt(0), r.signal = typeof this.signals[u] != "undefined" ? this.signals[u] : this.signals[r.defaultValue.charAt(0)], r.defaultValue = r.defaultValue.substring(1)), this.__maskArray(t.split(""), r.mask.replace(e, "").split(""), r.mask.split(""), r.type, r.maxLength, r.defaultValue, f, r.signal)
            },
            _onFocus: function () {
                var r = n(this), i = r.data("mask");
                i.inputFocusValue = r.val(), i.changed = !1, i.selectCharsOnFocus && r.select()
            },
            _onBlur: function () {
                var i = n(this), r = i.data("mask");
                r.inputFocusValue == i.val() || r.changed || i.trigger("change")
            },
            _onChange: function () {
                n(this).data("mask").changed = !0
            },
            _onMask: function (t) {
                var r = t.data.thisObj, i = {};
                return (i._this = t.target, i.$this = n(i._this), i.data = i.$this.data("mask"), i.$this.attr("readonly") || !i.data) ? !0 : (i[i.data.type] = !0, i.value = i.$this.val(), i.nKey = r.__getKeyNumber(t), i.range = r.__getRange(i._this), i.valueArray = i.value.split(""), t.data.func.call(r, t, i))
            },
            _onKeyDown: function (t, i) {
                if (this.ignore = n.inArray(i.nKey, this.ignoreKeys) > -1 || t.ctrlKey || t.metaKey || t.altKey, this.ignore) {
                    var u = this.keyRep[i.nKey];
                    i.data.onValid.call(i._this, u || "", i.nKey)
                }
                return r ? this._onKeyPress(t, i) : !0
            },
            _onKeyUp: function (n, t) {
                return t.nKey === 9 || t.nKey === 16 ? !0 : t.repeat ? (this.__autoTab(t), !0) : this._onPaste(n, t)
            },
            _onPaste: function (t, i) {
                i.reverse && this.__changeSignal(t.type, i);
                var r = this.__maskArray(i.valueArray, i.data.maskNonFixedCharsArray, i.data.maskArray, i.data.type, i.data.maxLength, i.data.defaultValue, i.data.fixedCharsReg, i.data.signal);
                return (i.$this.val(r), !i.reverse && i.data.defaultValue.length && i.range.start === i.range.end && this.__setRange(i._this, i.range.start, i.range.end), (n.browser.msie || n.browser.safari) && !i.reverse && this.__setRange(i._this, i.range.start, i.range.end), this.ignore) ? !0 : (this.__autoTab(i), !0)
            },
            _onKeyPress: function (n, t) {
                var c, h, o, e, s;
                if (this.ignore)return !0;
                t.reverse && this.__changeSignal(n.type, t);
                var u = String.fromCharCode(t.nKey), r = t.range.start, i = t.value, f = t.data.maskArray;
                if (t.reverse && (c = i.substr(0, r), h = i.substr(t.range.end, i.length), i = c + u + h, t.data.signal && r - t.data.signal.length > 0 && (r -= t.data.signal.length)), o = i.replace(t.data.fixedCharsRegG, "").split(""), e = this.__extraPositionsTill(r, f, t.data.fixedCharsReg), t.rsEp = r + e, t.repeat && (t.rsEp = 0), !this.rules[f[t.rsEp]] || t.data.maxLength != -1 && o.length >= t.data.maxLength && t.repeat)return t.data.onOverflow.call(t._this, u, t.nKey), !1;
                if (this.rules[f[t.rsEp]].test(u))t.data.onValid.call(t._this, u, t.nKey); else return t.data.onInvalid.call(t._this, u, t.nKey), !1;
                return s = this.__maskArray(o, t.data.maskNonFixedCharsArray, f, t.data.type, t.data.maxLength, t.data.defaultValue, t.data.fixedCharsReg, t.data.signal, e), t.repeat || t.$this.val(s), t.reverse ? this._keyPressReverse(n, t) : t.fixed ? this._keyPressFixed(n, t) : !0
            },
            _keyPressFixed: function (n, t) {
                return t.range.start == t.range.end ? (t.rsEp === 0 && t.value.length === 0 || t.rsEp < t.value.length) && this.__setRange(t._this, t.rsEp, t.rsEp + 1) : this.__setRange(t._this, t.range.start, t.range.end), !0
            },
            _keyPressReverse: function (t, i) {
                return n.browser.msie && (i.range.start === 0 && i.range.end === 0 || i.range.start != i.range.end) && this.__setRange(i._this, i.value.length), !1
            },
            __autoTab: function (n) {
                if (n.data.autoTab && (n.$this.val().length >= n.data.maskArray.length && !n.repeat || n.data.maxLength != -1 && n.valueArray.length >= n.data.maxLength && n.repeat)) {
                    var t = this.__getNextInput(n._this, n.data.autoTab);
                    t && (n.$this.trigger("blur"), t.focus().select())
                }
            },
            __changeSignal: function (n, t) {
                if (t.data.signal !== !1) {
                    var i = n === "paste" ? t.value.charAt(0) : String.fromCharCode(t.nKey);
                    this.signals && typeof this.signals[i] != "undefined" && (t.data.signal = this.signals[i])
                }
            },
            __getKeyNumber: function (n) {
                return n.charCode || n.keyCode || n.which
            },
            __maskArray: function (n, t, i, r, u, f, e, o, s) {
                r === "reverse" && n.reverse(), n = this.__removeInvalidChars(n, t, r === "repeat" || r === "infinite"), f && (n = this.__applyDefaultValue.call(n, f)), n = this.__applyMask(n, i, s, e);
                switch (r) {
                    case"reverse":
                        return n.reverse(), (o || "") + n.join("").substring(n.length - i.length);
                    case"infinite":
                    case"repeat":
                        var h = n.join("");
                        return u !== -1 && n.length >= u ? h.substring(0, u) : h;
                    default:
                        return n.join("").substring(0, i.length)
                }
                return ""
            },
            __applyDefaultValue: function (n) {
                for (var i = n.length, r = this.length, t = r - 1; t >= 0; t--)if (this[t] == n.charAt(0))this.pop(); else break;
                for (t = 0; t < i; t++)this[t] || (this[t] = n.charAt(t));
                return this
            },
            __removeInvalidChars: function (n, t, i) {
                for (var u = 0, r = 0; u < n.length; u++)t[r] && this.rules[t[r]] && !this.rules[t[r]].test(n[u]) && (n.splice(u, 1), i || r--, u--), i || r++;
                return n
            },
            __applyMask: function (n, t, i, r) {
                typeof i == "undefined" && (i = 0);
                for (var u = 0; u < n.length + i; u++)t[u] && r.test(t[u]) && n.splice(u, 0, t[u]);
                return n
            },
            __extraPositionsTill: function (n, t, i) {
                for (var r = 0; i.test(t[n++]);)r++;
                return r
            },
            __getNextInput: function (t, i) {
                var c = t.form;
                if (c == null)return null;
                for (var h = c.elements, a = n.inArray(t, h) + 1, s = h.length, u = null, r = a; r < s; r++)if (u = n(h[r]), this.__isNextInput(u, i))return u;
                for (var e = document.forms, v = n.inArray(t.form, e) + 1, o, l = e.length, f = v; f < l; f++)for (o = e[f].elements, s = o.length, r = 0; r < s; r++)if (u = n(o[r]), this.__isNextInput(u, i))return u;
                return null
            },
            __isNextInput: function (n, t) {
                var i = n.get(0);
                return i && (i.offsetWidth > 0 || i.offsetHeight > 0) && i.nodeName != "FIELDSET" && (t === !0 || typeof t == "string" && n.is(t))
            },
            __setRange: function (n, t, i) {
                if (typeof i == "undefined" && (i = t), n.setSelectionRange)n.setSelectionRange(t, i); else {
                    var r = n.createTextRange();
                    r.collapse(), r.moveStart("character", t), r.moveEnd("character", i - t), r.select()
                }
            },
            __getRange: function (t) {
                if (!n.browser.msie)return {start: t.selectionStart, end: t.selectionEnd};
                var i = {start: 0, end: 0}, r = document.selection.createRange();
                return i.start = 0 - r.duplicate().moveStart("character", -1e5), i.end = i.start + r.text.length, i
            },
            unmaskedVal: function (t) {
                return n(t).val().replace(n.mask.fixedCharsRegG, "")
            }
        }
    }), n.fn.extend({
        setMask: function (t) {
            return n.mask.set(this, t)
        }, unsetMask: function () {
            return n.mask.unset(this)
        }, unmaskedVal: function () {
            return n.mask.unmaskedVal(this[0])
        }
    })
}(jQuery), this.JSON2 || (JSON2 = function () {
    function i(n) {
        return f.test(n) ? '"' + n.replace(f, function (n) {
            var t = o[n];
            return typeof t == "string" ? t : (t = n.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
        }) + '"' : '"' + n + '"'
    }

    function r(f, e) {
        var c, l, h, a, v = n, s, o = e[f], y;
        o && typeof o == "object" && typeof o.toJSON == "function" && (o = o.toJSON(f)), typeof t == "function" && (o = t.call(e, f, o));
        switch (typeof o) {
            case"string":
                return i(o);
            case"number":
                return isFinite(o) ? String(o) : "null";
            case"boolean":
            case"null":
                return String(o);
            case"object":
                if (!o)return "null";
                if (o.toUTCString)return y = '"\\/Date(' + o.getTime() + ')\\/"';
                if (n += u, s = [], typeof o.length == "number" && !o.propertyIsEnumerable("length")) {
                    for (a = o.length, c = 0; c < a; c += 1)s[c] = r(c, o) || "null";
                    return h = s.length === 0 ? "[]" : n ? "[\n" + n + s.join(",\n" + n) + "\n" + v + "]" : "[" + s.join(",") + "]", n = v, h
                }
                if (typeof t == "object")for (a = t.length, c = 0; c < a; c += 1)l = t[c], typeof l == "string" && (h = r(l, o, t), h && s.push(i(l) + (n ? ": " : ":") + h)); else for (l in o)h = r(l, o, t), h && s.push(i(l) + (n ? ": " : ":") + h);
                return h = s.length === 0 ? "{}" : n ? "{\n" + n + s.join(",\n" + n) + "\n" + v + "}" : "{" + s.join(",") + "}", n = v, h
        }
    }

    var e = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/, f = /["\\\x00-\x1f\x7f-\x9f]/g, n, u, o = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, t;
    return {
        stringify: function (i, f, e) {
            var o;
            if (n = "", u = "", e)if (typeof e == "number")for (o = 0; o < e; o += 1)u += " "; else typeof e == "string" && (u = e);
            if (f)if (typeof f == "function" || typeof f == "object" && typeof f.length == "number")t = f; else throw new Error("JSON.stringify"); else t = function (n, t) {
                return Object.hasOwnProperty.call(this, n) ? t : undefined
            };
            return r("", {"": i})
        }, parse: function (n, t) {
            function u(n, i) {
                var f, e, r = n[i];
                if (r && typeof r == "object")for (f in r)Object.hasOwnProperty.call(r, f) && (e = u(r, f), e !== undefined ? r[f] = e : delete r[f]);
                return t.call(n, i, r)
            }

            var i, r;
            if (/^[\],:{}\s]*$/.test(n.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return r = /(\"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}.*?\")|(\"\\*\/Date\(.*?\)\\*\/")/g, n = n.replace(r, this.regExDate), i = eval("(" + n + ")"), typeof t == "function" ? u({"": i}, "") : i;
            throw new SyntaxError("JSON.parse");
        }, regExDate: function (n) {
            var e, f;
            return n = n.substring(1).replace('"', ""), e = n, /\/Date(.*)\//.test(n) ? (n = n.match(/Date\((.*?)\)/)[1], e = "getBrazilianDateInternal(new Date(" + parseInt(n) + "))") : (f = n.split(/[-,:,T,Z]/), f[1] = (parseInt(f[1], 0) - 1).toString(), e = "new Date(Date.UTC(" + f.join(",") + "))"), e
        }, quote: i, stringifyWcf: function (n) {
            return JSON2.stringify(n, function (n, t) {
                var i, r;
                return typeof t == "string" && (i = e.exec(t), i) ? (r = "/Date(" + +new Date(Date.UTC(+i[1], +i[2] - 1, +i[3], +i[4], +i[5], +i[6])) + "-0300)/", this[n] = r, r) : t
            })
        }
    }
}()), function () {
    function n(n) {
        this.source = n ? String(n) : ""
    }

    function i(n) {
        return n.replace(/([\\'])/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t")
    }

    var u = !1, t, r;
    "1".replace(/1/, function () {
        return ""
    }) && (String.prototype.__REPLACE_OLD__ = String.prototype.replace, String.prototype.replace = function (n, t) {
        var f, o, e, s, r, u, i;
        if (typeof t == "function") {
            for (f = this, o = f.match(n) || [], u = 1; u < 65536; u++)if (e = String.fromCharCode(u), f.indexOf(e) == -1)break;
            for (f = f.__REPLACE_OLD__(n, e), s = e != "-" ? "-" : "~", r = (s + f + s).split(e), r[0] = r[0].substr(1), r[r.length - 1] = r[r.length - 1].substr(0, r[r.length - 1].length - 1), u = 0; u < o.length; u++)i = n.exec(o[u]), i || (i = n.exec(o[u])), r[u] += t(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9]);
            return r.join("")
        }
        return this.__REPLACE_OLD__(n, t)
    }), TrimPath || (TrimPath = {}), t = TrimPath, n.prototype.parse = function () {
        function y(n, t, i) {
            return i.replace(/\s*\n\s*/g, " ").replace(/^\s+|\s+$/g, "")
        }

        var n = this.source.replace(/\s+$/, ""), v, w, s, o, p, d, k, b, t, h, f, c, a, l, e;
        if (n = n.replace(/[\x00-\x08\x0b\x0c\x0e-\x19]/g, ""), u || (n = n.replace(/\r/g, "")), /\{eval/.test(n) && (n = n.replace(/\{(\/?eval)\}/g, "{$1\x05"), v = /\{eval\x05([^\x05]*)\{\/eval\x05/g, n = n.replace(v, function (n, t) {
                return "{eval " + t.replace(/\}/g, "\x07") + "}"
            }), n = n.replace(/\x05/g, "}"), w = /\{eval\s+(\w+)\s*\}([\s\S]*)\1/g, n = n.replace(w, function (n, t, i) {
                return "{eval " + i.replace(/\}/g, "\x07") + "}"
            })), /\{cdata/.test(n)) {
            n = n.replace(/\{(\/?cdata)\}/g, "{$1\x05"), s = /\{cdata\x05([^\x05]*)\{\/cdata\x05/g;
            do o = !1, n = n.replace(s, function (n, t) {
                return o = !0, "{cdata\x06" + t.replace(/[\}\x06]/g, "\x07") + "{/cdata\x06"
            }); while (o);
            n = n.replace(/\x06/g, "\x05"), n = n.replace(s, function (n, t) {
                return "{cdata " + t + "}"
            }), n = n.replace(/\x05/g, "}"), p = /\{cdata\s+(\w+)\s*\}([\s\S]*)\1/g, n = n.replace(p, function (n, t, i) {
                return "{cdata " + i.replace(/\}/g, "\x07") + "}"
            })
        }
        d = /\{(minify)\}([^\}]*)\{\/minify\}/g, n = n.replace(d, y), k = /\{minify (\w+)\s*\}([^\}]*)\1/g, n = n.replace(k, y), b = /\$\{(%?)\s*([^\}\x07]+)\1\}/g, t = [], n = n.replace(b, function (n, i, r) {
            var o = /([^\|])\|([^\|])/g, f, u;
            if (o.test(r)) {
                r = r.replace(o, "$1\b$2").replace(o, "$1\b$2");
                var s = r.split("\b"), c = s[0], h = "_ECHO(", e = ");", l = /^([^:]*):?(.*)$/;
                for (f = s.length - 1; f > 0; f--)u = s[f].match(l), params = u[2] && "," + u[2], h += '_MODIFIERS["' + u[1] + '"](', e = params + ")" + e;
                t[t.length] = h + c + e
            } else t[t.length] = "_ECHO(" + r + ");";
            return "\x01"
        }), h = /\{(%?)((\/?[^\}\s]+)\s*([^\}]*))\1\}/g, f = [], n = n.replace(h, function (n, t, i, u, e) {
            var o = r[u];
            return o ? (f[f.length] = o(e) || "", "\x02") : n
        }), c = /([\r\n]*)([^\x01\x02]+)/g, n = n.replace(c, "$1\x04$2"), a = /(\x04[^\x01\x02]*[\r\n])([\t ]+[\x02])/g, n = n.replace(a, "$1\x04$2"), n = i(n), l = /([^\x01\x02\x04]*)\x04([^\x01\x02\x04]+)\x04?([^\x01\x02\x04]*)/g, e = [], n = n.replace(l, function (n, t, i, r) {
            return t = t && "if(_FLAGS.keepWhitespace==true)_ECHO('" + t + "');", i = i && "_ECHO('" + i + "');", r = r && "if(_FLAGS.keepWhitespace==true)_ECHO('" + r + "');", e[e.length] = t + i + r, "\x03"
        });
        var tt = 0, nt = 0, g = 0;
        n = n.replace(/\x01/g, function () {
            return t[tt++]
        }), n = n.replace(/\x02/g, function () {
            return f[nt++]
        }), n = n.replace(/\x03/g, function () {
            return e[g++]
        }), this.sourceFunc = ["function defined(p){return (_CONTEXT[p]!=null);}", "function __LENGTH_STACK_CONSTRUCTOR__(){this.level=-1;this.goUp=function(){this.level++;this[this.level]=0;};this.goDown=function(){this.level--;};this.increment=function(){this[this.level]++;};this.getCurrent=function(){return this[this.level];};}", "var __LENGTH_STACK__= new __LENGTH_STACK_CONSTRUCTOR__();", "with(_CONTEXT){", n, "}"].join("");
        try {
            this.render = new Function("_CONTEXT", "_ECHO", "_FLAGS", "_MODIFIERS", this.sourceFunc)
        } catch (it) {
            this.render = function (n, t) {
                t(it.toString() + " Error parsing template. Use original TrimPath engine to debug.")
            }
        }
    }, n.modifiers = {
        eat: function () {
            return ""
        }, escape: function (n) {
            return String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }, capitalize: function (n) {
            return String(n).toUpperCase()
        }, "default": function (n, t) {
            return n != null ? n : t
        }
    }, n.modifiers.h = n.modifiers.escape, r = {
        "if": function (n) {
            return "if(" + n + "){"
        }, elseif: function (n) {
            return "}else if(" + n + "){"
        }, "else": function () {
            return "}else{"
        }, "/if": function () {
            return "}"
        }, "for": function (n) {
            var i = n.match(/^(\w+) in (.+)$/), t, r;
            if (i)return t = "__LIST__" + i[1], r = i[1] + "_index", ["var ", t, "=", i[2], ";", "__LENGTH_STACK__.goUp();", "if (", t, "!=null){", "for(var ", r, " in ", t, "){", "if (typeof ", t, "[", r, "]=='function') continue;", "__LENGTH_STACK__.increment();", "var ", i[1], "=", t, "[", r, "];"].join("")
        }, forelse: function () {
            return "}}if(!__LENGTH_STACK__.getCurrent()){if(true){"
        }, "/for": function () {
            return "}}__LENGTH_STACK__.goDown();"
        }, "var": function (n) {
            return "var " + n + ";"
        }, macro: function (n) {
            var t = n.match(/^(\w+)\s*\(([^\)]*)\)\s*$/);
            if (t)return ["function ", t[1], "(", t[2], "){", "var __LENGTH_STACK__= new __LENGTH_STACK_CONSTRUCTOR__();", "var __OUT__=[];var _ECHO=function(s) {__OUT__[__OUT__.length]=s};",].join("")
        }, "/macro": function () {
            return "return __OUT__.join('');}"
        }, eval: function (n) {
            return "eval('" + i(n.replace(/\x07/g, "}")) + "');"
        }, cdata: function (n) {
            return "_ECHO('" + i(n.replace(/\x07/g, "}")) + "');"
        }
    }, n.prototype.process = function (t, i, r) {
        var f, u, h, s;
        if (i || (i = {}), t || (t = {}), t._MODIFIERS && (r = t._MODIFIERS), r)for (f in n.modifiers)r[f] || (r[f] = n.modifiers[f]); else r = n.modifiers;
        u = [], u[0] = [], u[0][0] = [];
        var e = 0, o = 0, c = function (n) {
            u[e].length > 10 && (o = 0, e++, u[e] = [], u[e][o] = []), u[e][o].length > 10 && (o++, u[e][o] = []), u[e][o].push(n)
        };
        try {
            this.render(t, c, i, r)
        } catch (l) {
            if (i.throwExceptions)throw l;
            return l.message
        }
        for (h = [], s = [], j = 0; j < u.length; j++) {
            for (f = 0; f < u[j].length; f++)s.push(u[j][f].join(""));
            h.push(s.join("")), s = []
        }
        return h.join("")
    }, t.Template = n, t.parseTemplate = function (t) {
        var i = new n(t);
        return i.parse(), i
    }, t.parseDOMTemplate = function (n, i) {
        i || (i = window.document);
        var u = i.getElementById(n), r = u.value || u.innerHTML;
        return r = r.replace(/&lt;/g, "<").replace(/&gt;/g, ">"), t.parseTemplate(r)
    }, t.processDOMTemplate = function (n, i, r, u) {
        return t.parseDOMTemplate(n, u).process(i, r)
    }
}();
var Util = {}, CurrencyPrefixed = !0, CurrentCurrencyFormat, StyleDivFunfo, PriceGroupsUC = undefined, HotelsUC = undefined, isB2B = function () {
    return CurrentPointOfSale.toUpperCase() == "BRADESCO" || CurrentPointOfSale.toUpperCase() == "AMEX"
}, isAir = function () {
    return PriceGroupsUC && !HotelsUC
}, isHotel = function () {
    return !PriceGroupsUC && HotelsUC
}, isAirHotel = function () {
    return PriceGroupsUC && HotelsUC
};
Util.compareIgnoringCaseAndAccents = function (n, t) {
    return accentsTidy = function (n) {
        var t = ("" + n).toLowerCase();
        return t = t.replace(new RegExp(/\s/g), ""), t = t.replace(new RegExp(/[àáâãäå]/g), "a"), t = t.replace(new RegExp(/æ/g), "ae"), t = t.replace(new RegExp(/ç/g), "c"), t = t.replace(new RegExp(/[èéêë]/g), "e"), t = t.replace(new RegExp(/[ìíîï]/g), "i"), t = t.replace(new RegExp(/ñ/g), "n"), t = t.replace(new RegExp(/[òóôõö]/g), "o"), t = t.replace(new RegExp(/œ/g), "oe"), t = t.replace(new RegExp(/[ùúûü]/g), "u"), t = t.replace(new RegExp(/[ýÿ]/g), "y"), t = t.replace(new RegExp(/\W/g), "")
    }, accentsTidy(n) == accentsTidy(t)
}, $(".sem-caracter-especial").live("keypress", function (n) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVXZWYabcdefghijklmnopqrstuvxzwyÇçãÃõÕóÓòÒáÁàÀéèÉÈíìÍÌ";
    if (n.which > -1 && n.which < 33)return !0;
    t.indexOf(String.fromCharCode(n.which)) == -1 && n.preventDefault()
}), $(".sem-caracter-especial2").live("blur", function () {
    $(this).val($(this).val().RemoveDiacritics()), $(this).val().replace(/[^a-zA-Z]+/g, "").length != $(this).val().length && $(this).val("")
}), $(".sem-caracter-especial-mantem-espacos-nome-Checkout").live("blur", function () {
    $(this).val($(this).val().RemoveDiacritics()), $(this).val().replace(/[^a-zA-Z áàãââÁÀÃÂéêÉÊíÍóõôÓÔÕúüÚÜçÇñòîÎìÌèÈ]+/g, "").length != $(this).val().length && $(this).val("")
}), $(".sem-caracter-especial-mantem-espacos").live("blur", function () {
    $(this).val($(this).val().RemoveDiacritics()), $(this).val().replace(/[^a-zA-Z ]+/g, "").length != $(this).val().length && $(this).val("")
}), $(".sem-caracter-especial-location").live("blur", function () {
    $(this).val($(this).val().RemoveDiacritics()), $(this).val().replace(/[^a-zA-Z \/,().'¸`-]+/g, "").length != $(this).val().length && $(this).val("")
}), $(".somente-numeros").live("blur", function () {
    var t = $(this);
    t.val().replace(/[^0-9]+/g, "").length != t.val().length && t.val("")
}), $(".data-valida").live("blur", function () {
    isValidDate(this.value) || (this.value = "")
}), $().mousemove(function (n) {
    var i = n.pageX, t = n.pageY
}), dateFormat = function () {
    var t = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, r = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, i = /[^-+\dA-Z]/g, n = function (n, t) {
        for (n = String(n), t = t || 2; n.length < t;)n = "0" + n;
        return n
    };
    return function (u, f, e) {
        var h = dateFormat;
        if (arguments.length != 1 || Object.prototype.toString.call(u) != "[object String]" || /\d/.test(u) || (f = u, u = undefined), u = u ? new Date(u) : new Date, isNaN(u))throw SyntaxError("invalid date");
        f = String(h.masks[f] || f || h.masks["default"]), f.slice(0, 4) == "UTC:" && (f = f.slice(4), e = !0);
        var o = e ? "getUTC" : "get", c = u[o + "Date"](), y = u[o + "Day"](), a = u[o + "Month"](), w = u[o + "FullYear"](), s = u[o + "Hours"](), b = u[o + "Minutes"](), k = u[o + "Seconds"](), l = u[o + "Milliseconds"](), v = e ? 0 : u.getTimezoneOffset(), p = {
            d: c,
            dd: n(c),
            ddd: h.i18n.dayNames[y],
            dddd: h.i18n.dayNames[y + 7],
            m: a + 1,
            mm: n(a + 1),
            mmm: h.i18n.monthNames[a],
            mmmm: h.i18n.monthNames[a + 12],
            yy: String(w).slice(2),
            yyyy: w,
            h: s % 12 || 12,
            hh: n(s % 12 || 12),
            H: s,
            HH: n(s),
            M: b,
            MM: n(b),
            s: k,
            ss: n(k),
            l: n(l, 3),
            L: n(l > 99 ? Math.round(l / 10) : l),
            t: s < 12 ? "a" : "p",
            tt: s < 12 ? "am" : "pm",
            T: s < 12 ? "A" : "P",
            TT: s < 12 ? "AM" : "PM",
            Z: e ? "UTC" : (String(u).match(r) || [""]).pop().replace(i, ""),
            o: (v > 0 ? "-" : "+") + n(Math.floor(Math.abs(v) / 60) * 100 + Math.abs(v) % 60, 4),
            S: ["th", "st", "nd", "rd"][c % 10 > 3 ? 0 : (c % 100 - c % 10 != 10) * c % 10]
        };
        return f.replace(t, function (n) {
            return n in p ? p[n] : n.slice(1, n.length - 1)
        })
    }
}(), dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
}, dateFormat.i18n = {
    dayNames: ["dom", "seg", "ter", "qua", "qui", "sex", "sab", "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
}, Date.prototype.format = function (n, t) {
    return dateFormat(this, n, t)
}, Date.prototype.addDays = function (n) {
    this.setDate(this.getDate() + n)
}, ContainsSpecialCharacters = function (n) {
    for (var i = n.toString(), r = ["#", "@", "!", "?", "=", "*", "%", "¨", "$", "+", "[", "]", "{", "}"], t = 0; t < i.length; t++)if (InArray(i.charAt(t), r))return !0;
    return !1
}, String.prototype.replaceAll = function (n, t) {
    for (var i = this; i.indexOf(n) >= 0;)i = i.replace(n, t);
    return i.toString()
}, String.prototype.capitalize = function () {
    return this.replace(/\S+/g, function (n) {
        return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
    })
}, String.prototype.initialLowerCase = function () {
    return this.replace(/\S+/g, function (n) {
        return n.charAt(0).toLowerCase() + n.slice(1)
    })
}, DaysOfWeek = {
    "0": "dom",
    "1": "seg",
    "2": "ter",
    "3": "qua",
    "4": "qui",
    "5": "sex",
    "6": "sab"
}, Months = {
    "1": "Janeiro",
    "2": "Fevereiro",
    "3": "Março",
    "4": "Abril",
    "5": "Maio",
    "6": "Junho",
    "7": "Julho",
    "8": "Agosto",
    "9": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro"
}, Array.prototype.remove = function (n, t) {
    var i = this.slice((t || n) + 1 || this.length);
    return this.length = n < 0 ? this.length + n : n, this.push.apply(this, i)
}, Array.prototype.reduce || (Array.prototype.reduce = function (n) {
    if (this === null || this === undefined)throw new TypeError("Object is null or undefined");
    var t = 0, r = this.length >> 0, i;
    if (typeof n != "function")throw new TypeError("First argument is not callable");
    if (arguments.length < 2) {
        if (r === 0)throw new TypeError("Array length is 0 and no second argument");
        i = this[0], t = 1
    } else i = arguments[1];
    while (t < r)t in this && (i = n.call(undefined, i, this[t], t, this)), ++t;
    return i
}), Number.prototype.FormatCurrency = function () {
    return CurrencyFormatted(this)
}, Number.prototype.FormatNumber = function () {
    return NumberFormatted(this)
}, this.CloseHintBoxy = function (n) {
    var i = typeof n == "string" ? window.document.getElementById(n) : n, r = $(i), t;
    r.attr("CreateHintBoxy") == !0 || i.getAttribute("CreateHintBoxy") == !0 ? window.document.body.removeChild(i) : r.css("display", "none").css("visibility", "hidden").hide(), t = window.document.getElementById("CreateHintBoxyDIVFundo"), t != null && window.document.body.removeChild(t)
}, this.CloseHintBoxyANAC = function () {
    $("#infoDelay").remove()
}, this.CloseHintBoxyInfo = function (n) {
    var i = $("#flightInfo"), t;
    i.length < 1 && $(n).parents("div.detalhe-voo").parent().remove(), $("#flightInfo").remove(), $("#infoDelay").remove(), t = window.document.getElementById("CreateHintBoxyDIVFundo"), t != null && window.document.body.removeChild(t)
}, this.CreateHintBoxyIframe = function (n) {
    $.modal('<iframe src="' + n + '" height="450" width="1020" frameborder="0" overflow-y: "scroll" style="background-color:#fff;" >', {
        closeHTML: "",
        closeClass: "simple-modal-close",
        containerCss: {backgroundColor: "#fff", borderColor: "#fff", height: 450, padding: 0, width: 1024},
        opacity: 80,
        overlayClose: !1,
        overlayCss: {backgroundColor: "#fff"}
    })
}, this.CreateHintBoxy = function (n, t, i, r, u, f, e) {
    var c, s, a = !1, h, o, l;
    i == undefined && (i = !0), t != undefined && $(t).length > 0 ? (c = $(t).position().left, s = $(t).position().top, width = $(t).outerWidth(!0), height = $(t).outerHeight(!0), f && (c += width)) : (self.innerHeight ? (c = self.innerWidth, s = self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (c = document.documentElement.clientWidth, s = document.documentElement.clientHeight) : document.body && (c = document.body.clientWidth, s = document.body.clientHeight), s = s / 2, c = c / 2), r == undefined && (r = "fixed"), h = window.document.createElement("div"), h.id = "CreateHintBoxyDIVFundo", h.style.filter = "Alpha(Opacity=40)", StyleDivFunfo == 1 ? (h.style.opacity = "0.7", h.style.backgroundColor = "#222") : (h.style.opacity = "0.9", h.style.backgroundColor = "#fff"), h.style.height = window.scrollMaxY == 0 ? "100%" : $(document).height() + 100 + "px", h.style.width = "100%", h.style.position = isOLD_Navigator() ? "absolute" : "fixed", h.style.zIndex = "500", h.style.top = "0px", h.style.left = "0px", $("#CreateHintBoxyDIVFundo").length == 0 && window.document.body.appendChild(h), typeof n == "string" ? (o = window.document.createElement("div"), i && (o.style.cursor = "pointer", o.onclick = function () {
        CloseHintBoxy(this)
    }), o.style.backgroundColor = "#FFF", o.style.position = r, o.innerHTML = n, $(o).attr("CreateHintBoxy", !0), a = !0) : o = n, o.jquery == undefined ? (o.style.display = "none", o.style.visibility = "visible", window.document.body.appendChild(o), l = $(o), a && (c -= l.width() / 2, s -= l.height() / 2, s < 0 && (s = s * -1)), $.browser.msie && parseInt($.browser.version, 10) < 8 ? (o.style.left = "550px", o.style.top = "200px", o.style.right = "620px") : (e && (c -= l.width()), o.style.left = c + "px", o.style.top = s + "px"), o.style.zIndex = "1000", o.style.position = r, l.fadeIn(200)) : (o[0].style.display = "none", o[0].style.visibility = "visible", window.document.body.appendChild(o[0]), l = $(o), u || (c -= l.width() / 2, s -= l.height() / 2, s < 0 && (s = s * -1)), e && (c -= l.width()), o[0] != undefined && (o[0].style.left = c + "px", o[0].style.top = s + "px", o[0].style.position = r, o[0].style.zIndex = "1000", o[0].style.height = "90%", o.fadeIn(200)))
}, this.PublishStringClientError = function (n) {
    var t = new ClientError;
    t.Data = typeof n == "string" ? n : n.name == "InternalError" ? n.message : n.message + " - " + n.stack, SendClientError(t)
}, this.SendClientError = function (n) {
    var r = n.GetRequest(), i = 18e6, t = new ServiceProxy(PathWebService);
    t.invoke("Log", {req: r}, undefined, undefined, undefined, i)
}, Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (n) {
        var o = "", e, u, t, h, s, f, i, r = 0;
        for (n = Base64._utf8_encode(n); r < n.length;)e = n.charCodeAt(r++), u = n.charCodeAt(r++), t = n.charCodeAt(r++), h = e >> 2, s = (e & 3) << 4 | u >> 4, f = (u & 15) << 2 | t >> 6, i = t & 63, isNaN(u) ? f = i = 64 : isNaN(t) && (i = 64), o = o + this._keyStr.charAt(h) + this._keyStr.charAt(s) + this._keyStr.charAt(f) + this._keyStr.charAt(i);
        return o
    }, decode: function (n) {
        var t = "", o, h, e, s, f, r, u, i = 0;
        for (n = n.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < n.length;)s = this._keyStr.indexOf(n.charAt(i++)), f = this._keyStr.indexOf(n.charAt(i++)), r = this._keyStr.indexOf(n.charAt(i++)), u = this._keyStr.indexOf(n.charAt(i++)), o = s << 2 | f >> 4, h = (f & 15) << 4 | r >> 2, e = (r & 3) << 6 | u, t = t + String.fromCharCode(o), r != 64 && (t = t + String.fromCharCode(h)), u != 64 && (t = t + String.fromCharCode(e));
        return t = Base64._utf8_decode(t)
    }, _utf8_encode: function (n) {
        var i, r, t;
        for (n = n.replace(/\r\n/g, "\n"), i = "", r = 0; r < n.length; r++)t = n.charCodeAt(r), t < 128 ? i += String.fromCharCode(t) : t > 127 && t < 2048 ? (i += String.fromCharCode(t >> 6 | 192), i += String.fromCharCode(t & 63 | 128)) : (i += String.fromCharCode(t >> 12 | 224), i += String.fromCharCode(t >> 6 & 63 | 128), i += String.fromCharCode(t & 63 | 128));
        return i
    }, _utf8_decode: function (n) {
        for (var r = "", t = 0, i = c1 = c2 = 0; t < n.length;)i = n.charCodeAt(t), i < 128 ? (r += String.fromCharCode(i), t++) : i > 191 && i < 224 ? (c2 = n.charCodeAt(t + 1), r += String.fromCharCode((i & 31) << 6 | c2 & 63), t += 2) : (c2 = n.charCodeAt(t + 1), c3 = n.charCodeAt(t + 2), r += String.fromCharCode((i & 15) << 12 | (c2 & 63) << 6 | c3 & 63), t += 3);
        return r
    }
}, Cookies = {
    setCookie: function (n, t, i) {
        var r = new Date;
        r.setDate(r.getDate() + i), document.cookie = n + "=" + escape(t) + (i == null ? "" : ";expires=" + r.toUTCString())
    }, getCookie: function (n) {
        return document.cookie.length > 0 && (c_start = document.cookie.indexOf(n + "="), c_start != -1) ? (c_start = c_start + n.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
    }, clearCookie: function (n) {
        this.setCookie(n, "", -10)
    }, checkCookie: function (n) {
        return cook = this.getCookie(n), cook != null && cook != ""
    }, getCookieObject: function (n) {
        strCook = this.getCookie(n), p_start = strCook.toUpperCase().indexOf("JSON="), p_end = strCook.indexOf(";", p_start), p_end == -1 && (p_end = strCook.length);
        var t = strCook.substring(p_start + 5, p_end);
        return $.evalJSON(t)
    }
}, Sources = {
    None: 0,
    Amadeus: 1,
    Sabre: 2,
    Tam: 3,
    Gol: 4,
    Team: 5,
    OceanAir: 6,
    WebJet: 7,
    Total: 8,
    Trip: 9,
    Passaredo: 10,
    AirMinas: 11,
    TAF: 12,
    Rico: 13,
    Sete: 14,
    NHT: 15,
    Pantanal: 16,
    AeroStar: 17,
    Azul: 18,
    Sol: 19,
    H2W: 20,
    Tourico: 21,
    Travel: 22,
    Trend: 23,
    HotelBeds: 25,
    T4W: 27,
    Expedia: 29,
    "0": "None",
    "1": "Amadeus",
    "2": "Sabre",
    "3": "Tam",
    "4": "Gol",
    "5": "Team",
    "6": "OceanAir",
    "7": "WebJet",
    "8": "Total",
    "9": "Trip",
    "10": "Passaredo",
    "11": "AirMinas",
    "12": "TAF",
    "13": "Rico",
    "14": "Sete",
    "15": "NHT",
    "16": "Pantanal",
    "17": "AeroStar",
    "18": "Azul",
    "19": "Sol",
    "20": "H2W",
    "21": "Tourico",
    "22": "Travel",
    "23": "Trend",
    "25": "HotelBeds",
    "27": "T4W",
    "29": "Expedia"
}, String.prototype.startsWith = function (n) {
    return this.match("^" + n) == n
}, String.prototype.endsWith = function (n) {
    return this.match(n + "$") == n
}, String.prototype.isEmpty = function () {
    return this.length == 0
}, Array.prototype.isEmpty = function () {
    return this.length == 0
}, Array.prototype.where = function (n) {
    for (var r = [], t = 0, i = this.length; t < i; t++)n(this[t]) && r.push(this[t]);
    return r
}, Array.prototype.select = function (n) {
    for (var r = [], t = 0, i = this.length; t < i; t++)r.push(n(this[t]));
    return r
}, Array.prototype.first = function (n) {
    for (var t = 0, i = this.length; t < i; t++)if (n(this[t]))return this[t];
    return undefined
}, Array.prototype.contains = function (n) {
    for (var t = 0, i = this.length; t < i; t++)if (typeof n == "string") {
        if (this[t] == n)return !0
    } else if (n(this[t]))return !0;
    return !1
}, Array.prototype.distinct = function () {
    for (var i = {}, r = [], n = 0, t = this.length; n < t; n++)i[this[n]] || (i[this[n]] = !0, r.push(this[n]));
    return r
}, Array.prototype.forEach || (Array.prototype.forEach = function (n, t) {
    "use strict";
    for (var i = 0, r = this.length; i < r; ++i)i in this && n.call(t, this[i], i, this)
}), Array.prototype.count = function (n) {
    for (var r = 0, t = 0, i = this.length; t < i; t++)n(this[t]) && r++;
    return r
}, String.prototype.RemoveDiacriticsNomeCheckout = function () {
    for (var f = "áàãââÁÀÃÂéêÉÊíÍóõôÓÔÕúüÚÜçÇabcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZñòîÎìÌèÈ", e = "áàãââÁÀÃÂéêÉÊíÍóõôÓÔÕúüÚÜçÇabcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZñòîÎìÌèÈ", t, i, r = "", o = this, n = 0, u = this.length; n < u; n++)i = o.charAt(n), t = f.indexOf(i), r += t > -1 ? e.charAt(t) : i;
    return r
}, String.prototype.RemoveDiacritics = function () {
    for (var f = "áàãââÁÀÃÂéêÉÊíÍóõôÓÔÕúüÚÜçÇabcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZñòîÎìÌèÈ", e = "aaaaaAAAAeeEEiIoooOOOuuUUcCabcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZnoiIiIeE", t, i, r = "", o = this, n = 0, u = this.length; n < u; n++)i = o.charAt(n), t = f.indexOf(i), r += t > -1 ? e.charAt(t) : i;
    return r
}, Array.prototype.binarySearch = function (n, t) {
    for (var e = 0, u = this.length - 1, i, f, r = -1; e <= u;)if (i = parseInt((e + u) / 2, 10), f = t(this[i], n), f > 0)e = i + 1; else if (f < 0)u = i - 1; else {
        r = i;
        break
    }
    return r < 0 && (r = undefined), r
}, Array.prototype.any = function (n) {
    for (var r = typeof n == "function" ? n : function (t) {
        return t == n
    }, t = 0, i = this.length; t < i; t++)if (r(this[t]))return !0;
    return !1
}, Array.prototype.orderBy = function (n) {
    var r = this.length, i, t, u;
    if (r >= 2)for (i = 0; i < r; i++)for (t = 0; t < r; t++)n(this[i]) < n(this[t]) && (u = this[i], this[i] = this[t], this[t] = u)
}, Array.prototype.clearUndefined = function () {
    for (var n = 0; n < this.length; n++)this[n] == undefined && (this.remove(n), n--);
    return !1
}, Array.prototype.clearStringEmpty = function () {
    for (var n = 0; n < this.length; n++)(this[n] == "" || this[n] == null || this[n] == undefined) && (this.remove(n), n--);
    return !1
}, Array.prototype.min = function () {
    for (var t = undefined, n = 0, i = this.length; n < i; n++)(!t || this[n] < t) && (t = this[n]);
    return t ? t : 0
}, Array.prototype.max = function () {
    for (var t = undefined, n = 0; n < this.length; n++)(!t || this[n] > t) && (t = this[n]);
    return t ? t : 0
}, Array.prototype.sum = function (n) {
    var i, t;
    for (n == undefined && (n = function (n) {
        return n
    }), i = 0, t = 0; t < this.length; t++)i += n(this[t]);
    return i
}, Array.prototype.removeAll = function (n) {
    for (var i = [], t = 0; t < this.length; t++)n(this[t]) || i.push(this[t]);
    return i
}, String.prototype.ReplaceStringMessage = function (n) {
    n == "BRADESCO" && (this.replaceAll("compra", "resgate"), this.replaceAll("reais", "pontos"), this.replaceAll("Problemas de processamento", "Ocorreu um erro no processamento de seu resgate. Por favor refaça sua busca em alguns minutos."))
}, String.prototype.ReplaceHyphens = function () {
    return this.replaceAll("---", ")").replaceAll("--", "(")
}, String.prototype.normalize = function () {
    return trim(this).RemoveDiacritics().toLowerCase()
}, Util.pluginDefaultBehavior = function (n, t, i, r) {
    var u, i, f;
    if (!n.length)return n;
    if (u = i[0], i = Array.prototype.slice.call(i, 1), typeof u == "string") {
        if (f = $(n[0]).data(t + "Data"), f && f[u])return f[u].apply(n, i);
        console && console.log("Unable to find method " + u + " in element " + t)
    } else return n.each(function () {
        var n = $(this).data(t + "Data");
        n && $(this).removeData(t + "Data"), n = r(), $(this).data(t + "Data", n), n.initialize(this, u)
    })
}, typeof Util == "undefined" && (Util = {}), Util.JSONMinimumDeserializer = function (n) {
    if ($.isArray(n) && n.length == 2) {
        var t = function (n, i, r) {
            var f, e, u;
            if (!i || n == undefined)return n;
            if (f = i.d || i.e ? [] : {}, e = r[i.i], i.d)for (u = 0; u < n.length; u += 2)f.push({
                Key: n[u],
                Value: t(n[u + 1], e, r)
            }); else if (i.e)for (u = 0; u < n.length; u++)f.push(t(n[u], e, r)); else for (u = 0; u < i.p.length; u++)f[i.p[u].n] = t(n[u], r[i.p[u].i], r);
            return f
        };
        return t(n[1], n[0][0], n[0])
    }
    return n
}, Util.GetMethodToInvoke = function (n) {
    return n + (typeof Global != "undefined" && Global.UseJSONMinimum ? "JSONMinimum" : "")
}, $(document).ready(function () {
    setInterval(function () {
        $("img.img-cias, img.icon-cia").unbind("error"), $("img.img-cias, img.icon-cia").error(function () {
            imgError($(this))
        })
    }, 1e3)
}), function (n) {
    function a(i) {
        if (!t.parent)t.parent = n('<div id="' + i.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>').appendTo(document.body).hide(), n.fn.bgiframe && t.parent.bgiframe(), t.title = n("h3", t.parent), t.body = n("div.body", t.parent), t.url = n("div.url", t.parent)
    }

    function i(t) {
        return n.data(t, "tooltip")
    }

    function y(t) {
        i(this).delay ? f = setTimeout(h, i(this).delay) : h(), l = !!i(this).track, n(document.body).bind("mousemove", u), u(t)
    }

    function c() {
        var u, e, f, o;
        if (!n.tooltip.blocked && this != r && (this.tooltipText || i(this).bodyHandler)) {
            if (r = this, s = this.tooltipText, i(this).bodyHandler)t.title.hide(), u = i(this).bodyHandler.call(this), u.nodeType || u.jquery ? t.body.empty().append(u) : t.body.html(u), t.body.show(); else if (i(this).showBody) {
                for (e = s.split(i(this).showBody), t.title.html(e.shift()).show(), t.body.empty(), f = 0; o = e[f]; f++)f > 0 && t.body.append("<br/>"), t.body.append(o);
                t.body.hideWhenEmpty()
            } else t.title.html(s).show(), t.body.hide();
            i(this).showURL && n(this).url() ? t.url.html(n(this).url().replace("http://", "")).show() : t.url.hide(), t.parent.addClass(i(this).extraClass), i(this).fixPNG && t.parent.fixPNG(), y.apply(this, arguments)
        }
    }

    function h() {
        f = null, e && n.fn.bgiframe || !i(r).fade ? t.parent.show() : t.parent.is(":animated") ? t.parent.stop().show().fadeTo(i(r).fade, r.tOpacity) : t.parent.is(":visible") ? t.parent.fadeTo(i(r).fade, r.tOpacity) : t.parent.fadeIn(i(r).fade), u()
    }

    function u(f) {
        var o, h, c, a, s, e;
        if (!n.tooltip.blocked && (!f || f.target.tagName != "OPTION")) {
            if (!l && t.parent.is(":visible") && n(document.body).unbind("mousemove", u), r == null) {
                n(document.body).unbind("mousemove", u);
                return
            }
            t.parent.removeClass("viewport-right").removeClass("viewport-bottom"), o = t.parent[0].offsetLeft, h = t.parent[0].offsetTop, f && (f.type == "focus" ? (c = n(r).offset(), t.parent.css({
                left: c.left,
                top: c.top + 20
            })) : (o = f.pageX + i(r).left, h = f.pageY + i(r).top, a = "auto", i(r).positionLeft && (a = n(window).width() - o, o = "auto"), t.parent.css({
                left: o,
                right: a,
                top: h
            }))), s = v(), e = t.parent[0], s.x + s.cx < e.offsetLeft + e.offsetWidth && (o -= e.offsetWidth + 20 + i(r).left, t.parent.css({left: o + "px"}).addClass("viewport-right")), s.y + s.cy < e.offsetTop + e.offsetHeight && (h -= e.offsetHeight + 20 + i(r).top, t.parent.css({top: h + "px"}).addClass("viewport-bottom"))
        }
    }

    function v() {
        return {x: n(window).scrollLeft(), y: n(window).scrollTop(), cx: n(window).width(), cy: n(window).height()}
    }

    function o() {
        function s() {
            t.parent.removeClass(o.extraClass).hide().css("opacity", "")
        }

        if (!n.tooltip.blocked) {
            f && clearTimeout(f), r = null;
            var o = i(this);
            e && n.fn.bgiframe || !o.fade ? s() : t.parent.is(":animated") ? t.parent.stop().fadeTo(o.fade, 0, s) : t.parent.stop().fadeOut(o.fade, s), i(this).fixPNG && t.parent.unfixPNG()
        }
    }

    var t = {}, r, s, f, e = n.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent), l = !1;
    n.tooltip = {
        blocked: !1,
        defaults: {delay: 200, fade: !1, showURL: !0, extraClass: "", top: 15, left: 15, id: "tooltip"},
        block: function () {
            n.tooltip.blocked = !n.tooltip.blocked
        }
    }, n.fn.extend({
        tooltip: function (i) {
            i = n.extend({}, n.tooltip.defaults, i), a(i);
            var r = this.each(function () {
                n.data(this, "tooltip", i), this.tOpacity = t.parent.css("opacity"), this.tooltipText = this.title, n(this).removeAttr("title"), this.alt = ""
            }).mouseover(c).mouseout(o);
            return i.showOnFocus ? r.focus(c).blur(o) : r.click(o), r
        }, fixPNG: e ? function () {
            return this.each(function () {
                var t = n(this).css("backgroundImage");
                t.match(/^url\(["']?(.*\.png)["']?\)$/i) && (t = RegExp.$1, n(this).css({
                    backgroundImage: "none",
                    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + t + "')"
                }).each(function () {
                    var t = n(this).css("position");
                    t != "absolute" && t != "relative" && n(this).css("position", "relative")
                }))
            })
        } : function () {
            return this
        }, unfixPNG: e ? function () {
            return this.each(function () {
                n(this).css({filter: "", backgroundImage: ""})
            })
        } : function () {
            return this
        }, hideWhenEmpty: function () {
            return this.each(function () {
                n(this)[n(this).html() ? "show" : "hide"]()
            })
        }, url: function () {
            return this.attr("href") || this.attr("src")
        }
    })
}(jQuery), function (n) {
    n.fn.bgIframe = n.fn.bgiframe = function (t) {
        if (n.browser.msie && parseInt(n.browser.version) <= 6) {
            t = n.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: !0,
                src: "javascript:false;"
            }, t || {});
            var i = function (n) {
                return n && n.constructor == Number ? n + "px" : n
            }, r = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + t.src + '"style="display:block;position:absolute;z-index:-1;' + (t.opacity !== !1 ? "filter:Alpha(Opacity='0');" : "") + "top:" + (t.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : i(t.top)) + ";left:" + (t.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : i(t.left)) + ";width:" + (t.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : i(t.width)) + ";height:" + (t.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : i(t.height)) + ';"/>';
            return this.each(function () {
                n("> iframe.bgiframe", this).length == 0 && this.insertBefore(document.createElement(r), this.firstChild)
            })
        }
        return this
    }, n.browser.version || (n.browser.version = navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1])
}(jQuery), function (n) {
    n.each({focus: "focusin", blur: "focusout"}, function (t, i) {
        n.event.special[i] = {
            setup: function () {
                if (n.browser.msie)return !1;
                this.addEventListener(t, n.event.special[i].handler, !0)
            }, teardown: function () {
                if (n.browser.msie)return !1;
                this.removeEventListener(t, n.event.special[i].handler, !0)
            }, handler: function (t) {
                return arguments[0] = n.event.fix(t), arguments[0].type = i, n.event.handle.apply(this, arguments)
            }
        }
    }), n.extend(n.fn, {
        delegate: function (t, i, r) {
            return this.bind(t, function (t) {
                var u = n(t.target);
                if (u.is(i))return r.apply(u, arguments)
            })
        }, triggerEvent: function (n, t) {
            return this.triggerHandler(n, [jQuery.event.fix({type: n, target: t})])
        }
    })
}(jQuery), function () {
    function it() {
        var r = !1, n;
        if ("localStorage"in window)try {
            window.localStorage.setItem("_tmptest", "tmpval"), r = !0, window.localStorage.removeItem("_tmptest")
        } catch (h) {
        }
        if (r)try {
            window.localStorage && (i = window.localStorage, u = "localStorage", o = i.jStorage_update)
        } catch (c) {
        } else if ("globalStorage"in window)try {
            window.globalStorage && (i = window.location.hostname == "localhost" ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname], u = "globalStorage", o = i.jStorage_update)
        } catch (a) {
        } else if (t = document.createElement("link"), t.addBehavior) {
            t.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(t);
            try {
                t.load("jStorage")
            } catch (f) {
                t.setAttribute("jStorage", "{}"), t.save("jStorage"), t.load("jStorage")
            }
            n = "{}";
            try {
                n = t.getAttribute("jStorage")
            } catch (e) {
            }
            try {
                o = t.getAttribute("jStorage_update")
            } catch (s) {
            }
            i.jStorage = n, u = "userDataBehavior"
        } else {
            t = null;
            return
        }
        tt(), v(), ft(), d(), "addEventListener"in window && window.addEventListener("pageshow", function (n) {
            n.persisted && l()
        }, !1)
    }

    function k() {
        var n = "{}";
        if (u == "userDataBehavior") {
            t.load("jStorage");
            try {
                n = t.getAttribute("jStorage")
            } catch (f) {
            }
            try {
                o = t.getAttribute("jStorage_update")
            } catch (r) {
            }
            i.jStorage = n
        }
        tt(), v(), d()
    }

    function ft() {
        u == "localStorage" || u == "globalStorage" ? "addEventListener"in window ? window.addEventListener("storage", l, !1) : document.attachEvent("onstorage", l) : u == "userDataBehavior" && setInterval(l, 1e3)
    }

    function l() {
        var n;
        clearTimeout(nt), nt = setTimeout(function () {
            if (u == "localStorage" || u == "globalStorage")n = i.jStorage_update; else if (u == "userDataBehavior") {
                t.load("jStorage");
                try {
                    n = t.getAttribute("jStorage_update")
                } catch (r) {
                }
            }
            n && n != o && (o = n, ut())
        }, 25)
    }

    function ut() {
        var i = f.parse(f.stringify(n.__jstorage_meta.CRC32)), r, t, u, e;
        k(), r = f.parse(f.stringify(n.__jstorage_meta.CRC32)), u = [], e = [];
        for (t in i)if (i.hasOwnProperty(t)) {
            if (!r[t]) {
                e.push(t);
                continue
            }
            i[t] != r[t] && String(i[t]).substr(0, 2) == "2." && u.push(t)
        }
        for (t in r)r.hasOwnProperty(t) && (i[t] || u.push(t));
        h(u, "updated"), h(e, "deleted")
    }

    function h(n, t) {
        var e, u, o, i, f;
        if (n = [].concat(n || []), t == "flushed") {
            n = [];
            for (e in r)r.hasOwnProperty(e) && n.push(e);
            t = "deleted"
        }
        for (u = 0, o = n.length; u < o; u++) {
            if (r[n[u]])for (i = 0, f = r[n[u]].length; i < f; i++)r[n[u]][i](n[u], t);
            if (r["*"])for (i = 0, f = r["*"].length; i < f; i++)r["*"][i](n[u], t)
        }
    }

    function a() {
        var n = (+new Date).toString();
        if (u == "localStorage" || u == "globalStorage")try {
            i.jStorage_update = n
        } catch (r) {
            u = !1
        } else u == "userDataBehavior" && (t.setAttribute("jStorage_update", n), t.save("jStorage"));
        l()
    }

    function tt() {
        if (i.jStorage)try {
            n = f.parse(String(i.jStorage))
        } catch (t) {
            i.jStorage = "{}"
        } else i.jStorage = "{}";
        p = i.jStorage ? String(i.jStorage).length : 0, n.__jstorage_meta || (n.__jstorage_meta = {}), n.__jstorage_meta.CRC32 || (n.__jstorage_meta.CRC32 = {})
    }

    function c() {
        et();
        try {
            i.jStorage = f.stringify(n), t && (t.setAttribute("jStorage", i.jStorage), t.save("jStorage")), p = i.jStorage ? String(i.jStorage).length : 0
        } catch (r) {
        }
    }

    function e(n) {
        if (!n || typeof n != "string" && typeof n != "number")throw new TypeError("Key name must be string or numeric");
        if (n == "__jstorage_meta")throw new TypeError("Reserved key name");
        return !0
    }

    function v() {
        var u, t, i, o, r = Infinity, e = !1, f = [];
        if (clearTimeout(g), n.__jstorage_meta && typeof n.__jstorage_meta.TTL == "object") {
            u = +new Date, i = n.__jstorage_meta.TTL, o = n.__jstorage_meta.CRC32;
            for (t in i)i.hasOwnProperty(t) && (i[t] <= u ? (delete i[t], delete o[t], delete n[t], e = !0, f.push(t)) : i[t] < r && (r = i[t]));
            r != Infinity && (g = setTimeout(v, r - u)), e && (c(), a(), h(f, "deleted"))
        }
    }

    function d() {
        var i, u, t, r;
        if (n.__jstorage_meta.PubSub) {
            for (r = b, i = u = n.__jstorage_meta.PubSub.length - 1; i >= 0; i--)t = n.__jstorage_meta.PubSub[i], t[0] > b && (r = t[0], rt(t[1], t[2]));
            b = r
        }
    }

    function rt(n, t) {
        if (s[n])for (var i = 0, r = s[n].length; i < r; i++)try {
            s[n][i](n, f.parse(f.stringify(t)))
        } catch (u) {
        }
    }

    function et() {
        var r, t, i;
        if (n.__jstorage_meta.PubSub) {
            for (r = +new Date - 2e3, t = 0, i = n.__jstorage_meta.PubSub.length; t < i; t++)if (n.__jstorage_meta.PubSub[t][0] <= r) {
                n.__jstorage_meta.PubSub.splice(t, n.__jstorage_meta.PubSub.length - t);
                break
            }
            n.__jstorage_meta.PubSub.length || delete n.__jstorage_meta.PubSub
        }
    }

    function ht(t, i) {
        n.__jstorage_meta || (n.__jstorage_meta = {}), n.__jstorage_meta.PubSub || (n.__jstorage_meta.PubSub = []), n.__jstorage_meta.PubSub.unshift([+new Date, t, i]), c(), a()
    }

    function st(n, t) {
        for (var f = n.length, i = t ^ f, u = 0, r; f >= 4;)r = n.charCodeAt(u) & 255 | (n.charCodeAt(++u) & 255) << 8 | (n.charCodeAt(++u) & 255) << 16 | (n.charCodeAt(++u) & 255) << 24, r = (r & 65535) * 1540483477 + (((r >>> 16) * 1540483477 & 65535) << 16), r ^= r >>> 24, r = (r & 65535) * 1540483477 + (((r >>> 16) * 1540483477 & 65535) << 16), i = (i & 65535) * 1540483477 + (((i >>> 16) * 1540483477 & 65535) << 16) ^ r, f -= 4, ++u;
        switch (f) {
            case 3:
                i ^= (n.charCodeAt(u + 2) & 255) << 16;
            case 2:
                i ^= (n.charCodeAt(u + 1) & 255) << 8;
            case 1:
                i ^= n.charCodeAt(u) & 255, i = (i & 65535) * 1540483477 + (((i >>> 16) * 1540483477 & 65535) << 16)
        }
        return i ^= i >>> 13, i = (i & 65535) * 1540483477 + (((i >>> 16) * 1540483477 & 65535) << 16), i ^= i >>> 15, i >>> 0
    }

    var ot = "0.4.5", y = window.jQuery || window.$ || (window.$ = {}), f = {
        parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function (n) {
            return String(n).evalJSON()
        } || y.parseJSON || y.evalJSON,
        stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || y.toJSON
    };
    if (!("parse"in f) || !("stringify"in f))throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    var n = {__jstorage_meta: {CRC32: {}}}, i = {jStorage: "{}"}, t = null, p = 0, u = !1, r = {}, nt = !1, o = 0, s = {}, b = +new Date, g, w = {
        isXML: function (n) {
            var t = (n ? n.ownerDocument || n : 0).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, encode: function (n) {
            if (!this.isXML(n))return !1;
            try {
                return (new XMLSerializer).serializeToString(n)
            } catch (i) {
                try {
                    return n.xml
                } catch (t) {
                }
            }
            return !1
        }, decode: function (n) {
            var i = "DOMParser"in window && (new DOMParser).parseFromString || window.ActiveXObject && function (n) {
                    var t = new ActiveXObject("Microsoft.XMLDOM");
                    return t.async = "false", t.loadXML(n), t
                }, t;
            return i ? (t = i.call("DOMParser"in window && new DOMParser || window, n, "text/xml"), this.isXML(t) ? t : !1) : !1
        }
    };
    y.jStorage = {
        version: ot, set: function (t, i, r) {
            if (e(t), r = r || {}, typeof i == "undefined")return this.deleteKey(t), i;
            if (w.isXML(i))i = {_is_xml: !0, xml: w.encode(i)}; else {
                if (typeof i == "function")return undefined;
                i && typeof i == "object" && (i = f.parse(f.stringify(i)))
            }
            return n[t] = i, n.__jstorage_meta.CRC32[t] = "2." + st(f.stringify(i), 2538058380), this.setTTL(t, r.TTL || 0), h(t, "updated"), i
        }, get: function (t, i) {
            return (e(t), t in n) ? n[t] && typeof n[t] == "object" && n[t]._is_xml ? w.decode(n[t].xml) : n[t] : typeof i == "undefined" ? null : i
        }, deleteKey: function (t) {
            return (e(t), t in n) ? (delete n[t], typeof n.__jstorage_meta.TTL == "object" && t in n.__jstorage_meta.TTL && delete n.__jstorage_meta.TTL[t], delete n.__jstorage_meta.CRC32[t], c(), a(), h(t, "deleted"), !0) : !1
        }, setTTL: function (t, i) {
            var r = +new Date;
            return (e(t), i = Number(i) || 0, t in n) ? (n.__jstorage_meta.TTL || (n.__jstorage_meta.TTL = {}), i > 0 ? n.__jstorage_meta.TTL[t] = r + i : delete n.__jstorage_meta.TTL[t], c(), v(), a(), !0) : !1
        }, getTTL: function (t) {
            var r = +new Date, i;
            return (e(t), t in n && n.__jstorage_meta.TTL && n.__jstorage_meta.TTL[t]) ? (i = n.__jstorage_meta.TTL[t] - r, i || 0) : 0
        }, flush: function () {
            return n = {__jstorage_meta: {CRC32: {}}}, c(), a(), h(null, "flushed"), !0
        }, storageObj: function () {
            function t() {
            }

            return t.prototype = n, new t
        }, index: function () {
            var i = [], t;
            for (t in n)n.hasOwnProperty(t) && t != "__jstorage_meta" && i.push(t);
            return i
        }, storageSize: function () {
            return p
        }, currentBackend: function () {
            return u
        }, storageAvailable: function () {
            return !!u
        }, listenKeyChange: function (n, t) {
            e(n), r[n] || (r[n] = []), r[n].push(t)
        }, stopListening: function (n, t) {
            if (e(n), r[n]) {
                if (!t) {
                    delete r[n];
                    return
                }
                for (var i = r[n].length - 1; i >= 0; i--)r[n][i] == t && r[n].splice(i, 1)
            }
        }, subscribe: function (n, t) {
            if (n = (n || "").toString(), !n)throw new TypeError("Channel not defined");
            s[n] || (s[n] = []), s[n].push(t)
        }, publish: function (n, t) {
            if (n = (n || "").toString(), !n)throw new TypeError("Channel not defined");
            ht(n, t)
        }, reInit: function () {
            k()
        }
    }, it()
}(), incObjPointOfSale = "", _conta = "";
switch (CurrentPointOfSale) {
    case"SHOPTIME":
        incObjPointOfSale = "shoptimeviagens", _conta = "viagens-shoptime";
        break;
    case"AMERICANAS":
        incObjPointOfSale = "americanasviagem", _conta = "viagens-americanas";
        break;
    case"SUBMARINO":
        incObjPointOfSale = "submarinoviagens", _conta = "viagenssubmarino";
        break;
    case"BRADESCO":
        incObjPointOfSale = "bradesco", _conta = "viagensviagensbradesco";
        break;
    case"AMEX":
        incObjPointOfSale = "amex", _conta = "viagensviagensamex"
}
stripstring = "AAAAAAACEEEEIIIIDNOOOOO.OUUUUY..aaaaaaaceeeeiiiidnooooo.ouuuuy.yAaAaAaCcCcCcCcDdDdEeEeEeEeEeGgGgGgGgHhHhIiIiIiIiIiIiJjKkkLlLlLlLlJlNnNnNnnNnOoOoOoOoRrRrRrSsSsSsSsTtTtTtUuUuUuUuUuUuWwYyYZzZzZz.", s = s_gi(_conta), s.charSet = "UTF-8", s.cookieDomainPeriods = 3, s.currencyCode = "BRL", s.trackDownloadLinks = !0, s.trackExternalLinks = !0, s.trackInlineStats = !0, s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx", s.linkInternalFilters = "javascript:,submarinoviagens.com.br,viagens.shoptime.com.br,viagens.americanas.com.br,bradescofidelidade.com.br,membershiprewardsviagens.com.br", s.linkLeaveQueryString = !1, s.linkTrackVars = "None", s.linkTrackEvents = "None", s.charSet = "ISO-8859-1";
var campaignTmp = "", campaignIntTmp = "", s_first_doPlugins = !0, i = 1;
s.usePlugins = !0, s.doPlugins = s_doPlugins, s.getValOnce = new Function("v", "c", "e", "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v"), s.clickThruQuality = new Function("scp", "tcth_ev", "cp_ev", "cff_ev", "cf_th", "if(i<=1){var ev=(s.events?s.events+',':'');if(s.getQueryParam(scp)){s.events=ev+tcth_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct,0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;};}else{s.c_w('cf',1,0);}}else{if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev+cp_ev;}}i++;}"), s.getQueryParam = new Function("p", "d", "u", "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.location);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v"), s.p_gpv = new Function("k", "u", "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v"), s.p_gvf = new Function("t", "k", "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return ''"), s.getPageName = new Function("u", "var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s.queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.substring(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.indexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.defaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p.substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x;z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.substring(x+1)}return n"), s.p_c = new Function("v", "c", "var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.length:x).toLowerCase()?v:0"), s.split = new Function("l", "d", "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a"), s.setupDynamicObjectIDs = new Function("var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,false);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semaphore=1}"), s.setOIDs = new Function("e", "var s=s_c_il[" + s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i,a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links){for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_objectID')<0&&z.indexOf('s_objectID')<0){u=s.rep(u,'\"','');u=s.rep(u,'\\n','').substring(0,90);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0)x='var x=\".tl(\";';var dt = new Date();x+='s_objectID=\"'+u+'_'+dt.getHours()+'_'+a[u]+'\";return this.s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o]=new Function('e',x)}}}s.wd.s_semaphore=0;return true"), s.visitorNamespace = "b2wviagens", s.trackingServer = "b2wviagens.122.2o7.net", s_code = "", s_giqf();
var getIATA = function (n) {
    var t = "";
    return n = trim(n), n.indexOf("--") > 0 ? t = n.substr(n.indexOf("--") + 2, 3) : n.indexOf("(") > 0 ? t = n.substr(n.indexOf("(") + 1, 3) : n.length == 3 && (t = n), t.toUpperCase()
}, TrataObjOmnitureBusca = function (n, t) {
    var r, f, i, u;
    switch (t) {
        case"Air":
            this.txtOrigem = getIATA(n.Origin) + "-" + getIATA(n.Destination), this.txtDataIda = n.Dates[0].Day + "/" + n.Dates[0].Month + "/" + n.Dates[0].Year, this.txtDataVolta = n.Dates[1] ? n.Dates[1].Day + "/" + n.Dates[1].Month + "/" + n.Dates[1].Year : "", this.txtHoraIda = n.EndTimeIn ? n.EndTimeOut + ":00" : "", this.txtHoraVolta = n.EndTimeOut ? n.EndTimeIn + ":00" : "", this.selCabin = n.CabinFilter, this.chkIdaVolta = n.IsRoundTrip, this.drpQtdADT = parseInt(n.Adults), this.drpQtdCHD = parseInt(n.Children), this.drpQtdINF = parseInt(n.Baby), this.chkSemParada = n.NonStop ? "Sim" : "Nao", this.Cia = n.CiaCode[0] ? n.CiaCode[0] : "Qualquer", r = n.Dates[0].Month + "/" + n.Dates[0].Day + "/" + +n.Dates[0].Year, f = n.Dates[1] ? n.Dates[1].Month + "/" + n.Dates[1].Day + "/" + n.Dates[1].Year : "", this.DiasSaida = DateDiff.inDays(new Date, new Date(r)) + " dias", this.Duracao = DateDiff.inDays(new Date(r), new Date(f)) + " dias";
            break;
        case"AirHotel":
            this.ahdrpQtdQuartos = parseInt(n.RoomsRequest.length), this.ahdrpQtdAdultosQuarto1 = parseInt(n.RoomsRequest[0].Adults), this.ahdrpQtdCriancasQuarto1 = parseInt(n.RoomsRequest[0].ChildAges), this.ahdrpQtdAdultosQuarto2 = n.RoomsRequest[1] ? parseInt(n.RoomsRequest[1].Adults) : "", this.ahdrpQtdCriancasQuarto2 = n.RoomsRequest[1] ? parseInt(n.RoomsRequest[1].ChildAges) : "", this.ahdrpQtdAdultosQuarto3 = n.RoomsRequest[2] ? parseInt(n.RoomsRequest[2].Adults) : "", this.ahdrpQtdCriancasQuarto3 = n.RoomsRequest[2] ? parseInt(n.RoomsRequest[2].ChildAges) : "", this.ahtxtOrigem = getIATA(n.Origin) + "-" + getIATA(n.Destination), this.ahtxtDataIda = n.CheckIn.Day + "/" + n.CheckIn.Month + "/" + n.CheckIn.Year, this.ahtxtDataVolta = n.CheckOut.Day + "/" + n.CheckOut.Month + "/" + n.CheckOut.Year, this.ahselCabin = n.CabinFilter, this.IdaOuVolta = n.IsRoundTrip == !0 ? "Ida e Volta" : "Somente Ida", this.chkSemParada = n.NonStop ? "Sim" : "Nao", this.ahdrpCia = n.CiaCode[0] ? stripaccents(n.CiaCode[0]) : "Qualquer", this.ahdrpStartTime = n.StartTimeIn ? n.StartTimeIn : "Qualquer", this.ahdrpEndTime = n.StartTimeOut ? n.StartTimeOut : "Qualquer", this.ahchkOutroDestino = n.AnotherDestination ? "Sim" : "Nao", this.ahchkOutrasDatas = n.AnotherDate ? "Sim" : "Nao", i = n.CheckIn.Month + "/" + n.CheckIn.Day + "/" + n.CheckIn.Year, u = n.CheckOut.Month + "/" + n.CheckOut.Day + "/" + n.CheckOut.Year, this.ahDiasSaida = DateDiff.inDays(new Date, new Date(i)) + " dias", this.ahDuracao = DateDiff.inDays(new Date(i), new Date(u)) + " dias";
            break;
        case"Hotel":
            this.drpQtdQuartos = parseInt(n.RoomsRequest.length), this.drpQtdAdultosQuarto1 = parseInt(n.RoomsRequest[0].Adults), this.drpQtdCriancasQuarto1 = parseInt(n.RoomsRequest[0].ChildAges), this.drpQtdAdultosQuarto2 = n.RoomsRequest[1] ? parseInt(n.RoomsRequest[1].Adults) : "", this.drpQtdCriancasQuarto2 = n.RoomsRequest[1] ? parseInt(n.RoomsRequest[1].ChildAges) : "", this.drpQtdAdultosQuarto3 = n.RoomsRequest[2] ? parseInt(n.RoomsRequest[2].Adults) : "", this.drpQtdCriancasQuarto3 = n.RoomsRequest[2] ? parseInt(n.RoomsRequest[2].ChildAges) : "", this.txtDestination = stripaccents(n.Location), this.txtCheckIn = n.CheckIn.Day + "/" + n.CheckIn.Month + "/" + n.CheckIn.Year, this.txtCheckOut = n.CheckOut.Day + "/" + n.CheckOut.Month + "/" + n.CheckOut.Year
    }
}, DateDiff = {
    inDays: function (n, t) {
        var r = t.getTime(), i = n.getTime();
        return parseInt((r - i) / 864e5)
    }, inWeeks: function (n, t) {
        var r = t.getTime(), i = n.getTime();
        return parseInt((r - i) / 6048e5)
    }, inMonths: function (n, t) {
        var u = n.getFullYear(), f = t.getFullYear(), i = n.getMonth(), r = t.getMonth();
        return r + 12 * f - (i + 12 * u)
    }, inYears: function (n, t) {
        return t.getFullYear() - n.getFullYear()
    }
}
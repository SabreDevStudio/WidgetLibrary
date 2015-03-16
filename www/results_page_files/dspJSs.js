function _Avazu_AgetKeyWord() {
    if ("0" == _Avazu_uRef || "" == _Avazu_uRef || "-" == _Avazu_uRef)return "";
    var b, c, a = 0;
    try {
        b = _Avazu_uRef.substring(a + 3, _Avazu_uRef.length);
        for (var d = 0; d < _Avazu_sWebM.length; d++)if (b.toLowerCase().indexOf(_Avazu_sWebM[d].toLowerCase()) > -1 && ((a = _Avazu_uRef.indexOf("?" + _Avazu_sWkd[d] + "=")) > -1 || (a = _Avazu_uRef.indexOf("&" + _Avazu_sWkd[d] + "=")) > -1)) {
            c = _Avazu_uRef.substring(a + _Avazu_sWkd[d].length + 2, _Avazu_uRef.length), (a = c.indexOf("&")) > -1 && (c = c.substring(0, a));
            for (var e = 0; e < _Avazu_uOno.length && _Avazu_uOno[e].toLowerCase() != c.toLowerCase(); e++);
            return _AvazuSMastWeb = _Avazu_sWebM[d], _Avazu_UsbK(c)
        }
    } catch (f) {
        return ""
    }
    return ""
}
function _Avazu_UsbK(a) {
    var b = "";
    try {
        if (!a || "" == a)return "";
        for (var c = 0; c < a.length; c++)b += " " == a.charAt(c) ? "+" : a.charAt(c)
    } catch (d) {
        return ""
    }
    return b
}
function _AvazuAddHTML(a) {
    if (document.all) {
        if ("complete" != document.readyState)return setTimeout("_AvazuAddHTML('" + a + "')", 1e3), void 0;
        document.body.insertAdjacentHTML("beforeEnd", a)
    } else if (document.createRange) {
        var b = document.createRange();
        b.setStartAfter(document.body.lastChild);
        var c = b.createContextualFragment(a);
        document.body.appendChild(c)
    } else if (document.layers) {
        var d = new Layer(window.innerWidth);
        d.document.open(), d.document.write(a), d.document.close(), d.top = document.height, document.height += d.document.height, d.visibility = "show"
    }
}
function _RetSetC() {
    if ("undefined" != typeof _AvazuRpid && "" != _AvazuRpid)var a = _Avazutrim(_AvazuRpid); else if ("undefined" == typeof _Rpid || "" == _Rpid)var a = 0; else var a = _Avazutrim(_Rpid);
    if ("undefined" != typeof _AvazuRunid)var b = _AvazuRunid; else if ("undefined" != typeof _Runid)var b = _Runid; else var b = "";
    if ("undefined" != typeof _AvazuRadvid)var c = _AvazuRadvid; else if ("undefined" != typeof _Radvid)var c = _Radvid; else var c = 0;
    var d = _Avazu_AgetKeyWord(), e = "&pid=" + _Avazuisotohtml(a) + "&prunid=" + b + "&k=" + _Avazuisotohtml(d) + "&MastWeb=" + _Avazuisotohtml(_AvazuSMastWeb);
    _AvazuAddHTML('<iframe marginheight="0" marginwidth="0"  src="' + _Avazurooturl + "ret/check_adv.php?r=" + Math.random() + "&runid=" + b + "_0&advid=" + c + "&pid=" + a + "&gettype=0&httptype=" + _Avazuhttptype + e + '" width="1" height="1"  frameborder="0"  scrolling="no"></iframe>')
}
function _Avazutrim(a) {
    return "string" == typeof a ? a.replace(/^\s*|\s*$/g, "") : a
}
function _Avazuisotohtml(a) {
    try {
        a = a.replace(/&/g, "%26amp%3B").replace(/&amp;/g, "%26amp%3B")
    } catch (b) {
        return a
    }
    return a
}
function _AvazuAddEvtListener(a, b, c) {
    document.addEventListener ? a ? a.addEventListener(b, c, !1) : addEventListener(b, c, !1) : attachEvent && (a ? a.attachEvent("on" + b, c) : attachEvent("on" + b, c))
}
function initAvazuClick() {
    var a, b, c, d, e;
    for (e = document.location.protocol + "//" + document.location.host, _AvazuAddEvtListener(document, "mousedown", catch_Avazu_), c = document.getElementsByTagName("iframe"), d = 0; d < c.length; d += 1)_AvazuAddEvtListener(c[d], "focus", catch_Avazu_);
    for (_Avazu_Document = document.documentElement && 0 !== document.documentElement.clientHeight ? document.documentElement : document.body, a = navigator.userAgent ? navigator.userAgent.toLowerCase().replace(/-/g, "") : "", b = ["chrome", "firefox", "safari", "msie", "opera"], _Avazu_Browser = "unknown", d = 0; d < b.length; d += 1)if (-1 !== a.indexOf(b[d])) {
        _Avazu_Browser = b[d];
        break
    }
}
function catch_Avazu_(a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o = !1;
    try {
        if (0 === _Avazu_Quota)return !0;
        if (a || (a = window.event), b = a.which || a.button, c = a.srcElement || null, 0 === b)return !0;
        if (null !== c && "iframe" === c.tagName.toLowerCase()) {
            if (c.sourceIndex === _Avazu_LastIframe)return !0;
            _Avazu_LastIframe = c.sourceIndex
        } else _Avazu_LastIframe = -1;
        if (d = a.clientX, e = a.clientY, f = _Avazu_Document.clientWidth || window.innerWidth, g = _Avazu_Document.clientHeight || window.innerHeight, j = window.pageXOffset || _Avazu_Document.scrollLeft, k = window.pageYOffset || _Avazu_Document.scrollTop, h = Math.max(_Avazu_Document.scrollWidth, _Avazu_Document.offsetWidth, f), i = Math.max(_Avazu_Document.scrollHeight, _Avazu_Document.offsetHeight, g), d > f || e > g)return !0;
        if (d += j, e += k, 0 > d || 0 > e || d > h || e > i)return !0;
        if (l = new Date, l.getTime() - _Avazu_Time < 1e3)return !0;
        if (_Avazu_Time = l.getTime(), _Avazu_Quota > 0 && (_Avazu_Quota -= 1), "undefined" != typeof _AvazuRunid)var q = _AvazuRunid; else if ("undefined" != typeof _Runid)var q = _Runid; else var q = "";
        if ("undefined" != typeof _AvazuRadvid)var r = _AvazuRadvid; else if ("undefined" != typeof _Radvid)var r = _Radvid; else var r = 0;
        n = "avazu_x=" + d + "&avazu_y=" + e + "&avazu_w=" + f + "&avazu_b=" + _Avazu_Browser + "&avazu_c=" + b + "&avazu_aid=" + r + "&avazu_rid=" + q + "&random=" + Math.random() + "&avazu_s=" + _Avazu_Site, o === !1 && (m = new Image, m.src = _Avazu_Server + "?" + n)
    } catch (s) {
    }
    return !0
}
var _Avazurooturl = "https://avazudsp.net/", _Avazuhttptype = "2", _Avazu_uDoc = document, _Avazu_uLoc = _Avazu_uDoc.location, _Avazu_uRef = _Avazu_uDoc.referrer, _Avazu_sWebM = new Array, _Avazu_sWkd = new Array;
_Avazu_sWebM[0] = "google", _Avazu_sWkd[0] = "q", _Avazu_sWebM[1] = "yahoo", _Avazu_sWkd[1] = "p", _Avazu_sWebM[2] = "msn", _Avazu_sWkd[2] = "q", _Avazu_sWebM[3] = "aol", _Avazu_sWkd[3] = "query", _Avazu_sWebM[4] = "aol", _Avazu_sWkd[4] = "encquery", _Avazu_sWebM[5] = "lycos", _Avazu_sWkd[5] = "query", _Avazu_sWebM[6] = "ask", _Avazu_sWkd[6] = "q", _Avazu_sWebM[7] = "altavista", _Avazu_sWkd[7] = "q", _Avazu_sWebM[8] = "netscape", _Avazu_sWkd[8] = "query", _Avazu_sWebM[9] = "cnn", _Avazu_sWkd[9] = "query", _Avazu_sWebM[10] = "looksmart", _Avazu_sWkd[10] = "qt", _Avazu_sWebM[11] = "about", _Avazu_sWkd[11] = "terms", _Avazu_sWebM[12] = "mamma", _Avazu_sWkd[12] = "query", _Avazu_sWebM[13] = "alltheweb", _Avazu_sWkd[13] = "q", _Avazu_sWebM[14] = "gigablast", _Avazu_sWkd[14] = "q", _Avazu_sWebM[15] = "voila", _Avazu_sWkd[15] = "rdata", _Avazu_sWebM[16] = "virgilio", _Avazu_sWkd[16] = "qs", _Avazu_sWebM[17] = "live", _Avazu_sWkd[17] = "q", _Avazu_sWebM[18] = "baidu", _Avazu_sWkd[18] = "wd", _Avazu_sWebM[19] = "alice", _Avazu_sWkd[19] = "qs", _Avazu_sWebM[20] = "yandex", _Avazu_sWkd[20] = "text", _Avazu_sWebM[21] = "najdi", _Avazu_sWkd[21] = "q", _Avazu_sWebM[22] = "aol", _Avazu_sWkd[22] = "q", _Avazu_sWebM[23] = "club-internet", _Avazu_sWkd[23] = "query", _Avazu_sWebM[24] = "mama", _Avazu_sWkd[24] = "query", _Avazu_sWebM[25] = "seznam", _Avazu_sWkd[25] = "q", _Avazu_sWebM[26] = "search", _Avazu_sWkd[26] = "q", _Avazu_sWebM[27] = "wp", _Avazu_sWkd[27] = "szukaj", _Avazu_sWebM[28] = "onet", _Avazu_sWkd[28] = "qt", _Avazu_sWebM[29] = "netsprint", _Avazu_sWkd[29] = "q", _Avazu_sWebM[30] = "google.interia", _Avazu_sWkd[30] = "q", _Avazu_sWebM[31] = "szukacz", _Avazu_sWkd[31] = "q", _Avazu_sWebM[32] = "yam", _Avazu_sWkd[32] = "k", _Avazu_sWebM[33] = "pchome", _Avazu_sWkd[33] = "q", _Avazu_sWebM[34] = "kvasir", _Avazu_sWkd[34] = "searchExpr", _Avazu_sWebM[35] = "sesam", _Avazu_sWkd[35] = "q", _Avazu_sWebM[36] = "ozu", _Avazu_sWkd[36] = "q", _Avazu_sWebM[37] = "terra", _Avazu_sWkd[37] = "query", _Avazu_sWebM[38] = "nostrum", _Avazu_sWkd[38] = "query", _Avazu_sWebM[39] = "mynet", _Avazu_sWkd[39] = "q", _Avazu_sWebM[40] = "ekolay", _Avazu_sWkd[40] = "q", _Avazu_sWebM[41] = "search.ilse", _Avazu_sWkd[41] = "search_for", _Avazu_sWebM[42] = "bing", _Avazu_sWkd[42] = "q";
var _Avazu_uOno = new Array, _AvazuSMastWeb = "", _AvazuflashObject, _Avazu_pid, _Avazu_Site = escape(window.location), _Avazu_Server = _Avazurooturl + "ret/click.php", _Avazu_LastIframe = -1, _Avazu_Time = 0, _Avazu_Quota = -1, _Avazu_Browser = "", _Avazu_Document = "", _Avazu_Wait = 500, _Avazu_LocalWait = 0;
_RetSetC();
var f = this, aa = function (a) {
    var b = typeof a;
    if ("object" == b)if (a) {
        if (a instanceof Array)return "array";
        if (a instanceof Object)return b;
        var c = Object.prototype.toString.call(a);
        if ("[object Window]" == c)return "object";
        if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
        if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
    } else return "null";
    else if ("function" == b && "undefined" == typeof a.call)return "object";
    return b
};
Math.random();
var l = function (a, b) {
    var c = a.split("."), d = f;
    c[0]in d || !d.execScript || d.execScript("var " + c[0]);
    for (var e; c.length && (e = c.shift());)c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
}, m = function (a, b) {
    function c() {
    }

    c.prototype = b.prototype;
    a.n = b.prototype;
    a.prototype = new c;
    a.m = function (a, c, g) {
        for (var k = Array(arguments.length - 2), h = 2; h < arguments.length; h++)k[h - 2] = arguments[h];
        return b.prototype[c].apply(a, k)
    }
};
var n = function (a) {
    if (Error.captureStackTrace)Error.captureStackTrace(this, n); else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a))
};
m(n, Error);
var ba = function (a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;)d += c.shift() + e.shift();
    return d + c.join("%s")
}, q = String.prototype.trim ? function (a) {
    return a.trim()
} : function (a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}, r = function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0
};
Math.random();
var u = function (a, b) {
    b.unshift(a);
    n.call(this, ba.apply(null, b));
    b.shift()
};
m(u, n);
var v = function (a, b, c) {
    if (!a) {
        var d = "Assertion failed";
        if (b)var d = d + (": " + b), e = Array.prototype.slice.call(arguments, 2);
        throw new u("" + d, e || []);
    }
};
var x;
n:{
    var y = f.navigator;
    if (y) {
        var z = y.userAgent;
        if (z) {
            x = z;
            break n
        }
    }
    x = ""
}
var A = function (a) {
    return -1 != x.indexOf(a)
};
var B = function () {
    return A("Opera") || A("OPR")
}, C = function () {
    return A("Edge") || A("Trident") || A("MSIE")
}, D = function () {
    return (A("Chrome") || A("CriOS")) && !B() && !C()
};
var E = function () {
    return A("Edge")
};
var ca = B(), F = C(), G = A("Gecko") && !(-1 != x.toLowerCase().indexOf("webkit") && !E()) && !(A("Trident") || A("MSIE")) && !E(), I = -1 != x.toLowerCase().indexOf("webkit") && !E(), da = I && A("Mobile"), ea = function () {
    var a = x;
    if (G)return /rv\:([^\);]+)(\)|;)/.exec(a);
    if (F && E())return /Edge\/([\d\.]+)/.exec(a);
    if (F)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (I)return /WebKit\/(\S+)/.exec(a)
}, J = function () {
    var a = f.document;
    return a ? a.documentMode : void 0
}, K = function () {
    if (ca && f.opera) {
        var a = f.opera.version;
        return "function" ==
        aa(a) ? a() : a
    }
    var a = "", b = ea();
    b && (a = b ? b[1] : "");
    return F && !E() && (b = J(), b > parseFloat(a)) ? String(b) : a
}(), L = {}, M = function (a) {
    if (!L[a]) {
        for (var b = 0, c = q(String(K)).split("."), d = q(String(a)).split("."), e = Math.max(c.length, d.length), g = 0; 0 == b && g < e; g++) {
            var k = c[g] || "", h = d[g] || "", p = RegExp("(\\d*)(\\D*)", "g"), H = RegExp("(\\d*)(\\D*)", "g");
            do {
                var t = p.exec(k) || ["", "", ""], w = H.exec(h) || ["", "", ""];
                if (0 == t[0].length && 0 == w[0].length)break;
                b = r(0 == t[1].length ? 0 : parseInt(t[1], 10), 0 == w[1].length ? 0 : parseInt(w[1], 10)) || r(0 ==
                t[2].length, 0 == w[2].length) || r(t[2], w[2])
            } while (0 == b)
        }
        L[a] = 0 <= b
    }
}, N = f.document, fa = J(), ga = !N || !F || !fa && E() ? void 0 : fa || ("CSS1Compat" == N.compatMode ? parseInt(K, 10) : 5);
var O;
if (!(O = !G && !F)) {
    var P;
    if (P = F)P = F && (E() || 9 <= ga);
    O = P
}
O || G && M("1.9.1");
F && M("9");
!A("Android") || D() || A("Firefox") || B();
D();
var ha = A("Safari") && !(D() || A("Coast") || B() || C() || A("Silk") || A("Android")) && !(A("iPhone") && !A("iPod") && !A("iPad") || A("iPad") || A("iPod"));
var ja = function (a) {
    var b = window;
    if (da && ha && b) {
        b.focus();
        var c = 0, d = null, d = b.setInterval(function () {
            a.closed || 5 == c ? (b.clearInterval(d), ia(a)) : (a.close(), c++)
        }, 150)
    } else a.close(), ia(a)
}, ia = function (a) {
    if (!a.closed && a.document && a.document.body)if (a = a.document.body, v(null != a, "goog.dom.setTextContent expects a non-null value for node"), "textContent"in a)a.textContent = "Please close this window."; else if (3 == a.nodeType)a.data = "Please close this window."; else if (a.firstChild && 3 == a.firstChild.nodeType) {
        for (; a.lastChild !=
               a.firstChild;)a.removeChild(a.lastChild);
        a.firstChild.data = "Please close this window."
    } else {
        for (var b; b = a.firstChild;)a.removeChild(b);
        v(a, "Node cannot be null or undefined.");
        a.appendChild((9 == a.nodeType ? a : a.ownerDocument || a.document).createTextNode("Please close this window."))
    }
};
var Q, R = function (a) {
    a = a || [];
    for (var b = [], c = 0, d = a.length; c < d; ++c) {
        var e = String(a[c] || "");
        e && b.push(e)
    }
    if (!b.length)return null;
    Q ? Q.reset.call(Q) : Q = shindig.sha1();
    Q.update.call(Q, b.join(" "));
    return Q.digestString.call(Q).toLowerCase()
}, ka = function (a, b, c) {
    this.h = String(a || "");
    this.e = String(b || "");
    this.a = String(c || "");
    this.c = {};
    this.j = this.k = this.f = this.g = "";
    this.d = null
};
ka.prototype.evaluate = function () {
    var a = {}, b = "";
    try {
        b = String(document.cookie || "")
    } catch (c) {
    }
    for (var b = b.split("; ").join(";").split(";"), d = 0, e = b.length; d < e; ++d) {
        var g = b[d], k = g.indexOf("=");
        -1 != k ? a[g.substr(0, k)] = g.substr(k + 1) : a[g] = null
    }
    this.c = a;
    if (this.c.SID)if (this.e = this.e.split(".")[0].split("@")[0], a = "", a = 0 == this.h.indexOf("https://") ? "SAPISID" : "APISID", this.f = String(this.c[a] || ""))if (a = "", a = 0 == gadgets.rpc.getOrigin(String(window.location.href)).indexOf("https://") ? "SAPISID" : "APISID", this.g = String(this.c[a] ||
        "")) {
        b = String(this.c.LSOLH || "").split(":");
        d = b.length;
        if (1 == d || 4 == d)this.k = b[0];
        if (3 == d || 4 == d)a = String(b[d - 3] || ""), b = String(b[d - 1] || ""), (d = R([a, this.g]).substr(0, 4)) && d == b && (this.j = a);
        this.a && (a = this.a.indexOf("."), -1 != a && (a = this.a.substr(0, a) || "", this.a = a + "." + R([this.f, this.h, this.e, this.k, this.j, a]).substr(0, 4)));
        a = R([this.f, this.h, this.e, this.a]);
        this.a && (a = a + "." + this.a);
        this.d = a
    } else this.d = ""; else this.d = ""
};
var la = function (a, b, c) {
    a = new ka(a, b, c);
    a.evaluate();
    return a
}, S = function (a, b, c) {
    c = c || ma(this);
    var d = null;
    if (a) {
        a = String(a);
        var e = a.indexOf(".");
        -1 != e && (d = a.substr(e + 1))
    }
    b = la(c, b, d).d;
    if (null == a || "" == a)a = b == a; else if (null == b || b.length != a.length)a = !1; else {
        d = c = 0;
        for (e = a.length; d < e; ++d)c |= a.charCodeAt(d) ^ b.charCodeAt(d);
        a = 0 == c
    }
    return a
}, T = function (a, b, c) {
    c = c || ma(this);
    c = la(c);
    if (String(a) != c.d)throw Error("Unauthorized request");
    b = String(b);
    a = parseInt(b, 10);
    String(a) == b && 0 <= a ? (b = c.j) ? (b = b.split("|"),
        a = b.length <= a ? null : b[a] || null) : a = null : a = null;
    return a
}, ma = function (a) {
    a = String(a.origin || "");
    if (!a)throw Error("RPC has no origin.");
    return a
};
l("checkSessionState", S);
l("getVersionInfo", T);
var U, V, W, X, Y, Z, na = window, oa = (window.location.href || na.location.href).match(/.*(\?|#|&)usegapi=([^&#]+)/) || [];
"1" === decodeURIComponent(oa[oa.length - 1] || "") ? (W = function (a, b, c, d, e, g) {
    U.send(b, e, d, g || gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)
}, X = function (a, b) {
    U.register(a, b, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)
}, Y = function (a) {
    var b = /^(?:https?:\/\/)?[0-9.\-A-Za-z]+(?::\d+)?/.exec(a), b = gapi.iframes.makeWhiteListIframesFilter([b ? b[0] : null]);
    W("..", "oauth2callback", gadgets.rpc.getAuthToken(".."), void 0, a, b)
}, V = function () {
    pa()
}, Z = function () {
    W("..", "oauth2relayReady", gadgets.rpc.getAuthToken(".."));
    X("check_session_state",
        qa);
    X("get_versioninfo", ra)
}) : (W = function (a, b, c, d, e) {
    gadgets.rpc.call(a, b + ":" + c, d, e)
}, X = function (a, b) {
    gadgets.rpc.register(a, b)
}, Y = function (a) {
    gadgets.rpc.getTargetOrigin("..") == gadgets.rpc.getOrigin(a) && W("..", "oauth2callback", gadgets.rpc.getAuthToken(".."), void 0, a)
}, V = function () {
    Z()
}, Z = function () {
    W("..", "oauth2relayReady", gadgets.rpc.getAuthToken(".."));
    X("check_session_state", S);
    X("get_versioninfo", T)
});
var pa = function () {
    var a = Z;
    window.gapi.load("gapi.iframes", function () {
        U = gapi.iframes.getContext().getParentIframe();
        a()
    })
}, sa = function (a) {
    window.setTimeout(function () {
        Y(a)
    }, 1)
}, qa = function (a) {
    var b, c;
    a && (b = a.session_state, c = a.client_id);
    return S(b, c, U.getOrigin())
}, ra = function (a) {
    return T(a.xapisidHash, a.sessionIndex, U.getOrigin())
};
l("oauth2callback", sa);
l("oauth2verify", function (a, b) {
    var c = window.open("javascript:void(0);", a), d;
    if (c && !c.closed && (d = c.oauth2callbackUrl))return window.b = window.b || {}, window.i = window.i || window.setTimeout, window.setTimeout = function (a, b) {
        try {
            var d = a, h = !1, p;
            a = function () {
                if (!h) {
                    h = !0;
                    try {
                        window.b[String(p)] = void 0, delete window.b[String(p)]
                    } catch (a) {
                    }
                    return d.call(this)
                }
            };
            var H = c.setTimeout(a, b);
            p = window.i(a, b);
            window.b[String(p)] = H;
            return p
        } catch (t) {
        }
        return window.i(a, b)
    }, window.l = window.l || window.clearTimeout, window.clearTimeout =
        function (a) {
            try {
                var b = window.b[String(a)];
                b && c.clearTimeout(b)
            } catch (d) {
            }
            try {
                window.b[String(a)] = void 0, delete window.b[String(a)]
            } catch (h) {
            }
            window.l(a)
        }, sa(String(d)), "keep_open" != b && ja(c), !0;
    c && !c.closed && ja(c);
    return !1
});
window.addEventListener ? window.addEventListener("load", V, !1) : window.attachEvent("onload", V);

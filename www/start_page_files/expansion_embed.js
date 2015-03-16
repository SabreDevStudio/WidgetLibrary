(function () {
    var g, l = this, m = function (a) {
        return void 0 !== a
    }, aa = function (a) {
        a = a.split(".");
        for (var b = l, c; c = a.shift();)if (null != b[c])b = b[c]; else return null;
        return b
    }, ba = function () {
    }, ca = function (a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else return "null"; else if ("function" == b && "undefined" == typeof a.call)return "object";
        return b
    }, n = function (a) {
        return "array" == ca(a)
    }, da = function (a) {
        var b = ca(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, p = function (a) {
        return "string" == typeof a
    }, ea = function (a) {
        return "number" == typeof a
    }, r = function (a) {
        return "function" == ca(a)
    }, fa = function (a) {
        var b =
            typeof a;
        return "object" == b && null != a || "function" == b
    }, ia = function (a) {
        return a[ga] || (a[ga] = ++ha)
    }, ga = "closure_uid_" + (1E9 * Math.random() >>> 0), ha = 0, ja = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ka = function (a, b, c) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, u = function (a, b, c) {
        u = Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf("native code") ? ja : ka;
        return u.apply(null, arguments)
    }, la = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }, w = Date.now || function () {
            return +new Date
        }, x = function (a, b) {
        var c = a.split("."), d = l;
        c[0]in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());)!c.length && m(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
    }, y = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.j = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.jl = function (a, c, f) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++)h[k - 2] = arguments[k];
            return b.prototype[c].apply(a, h)
        }
    };
    var ma = function (a) {
        ma[" "](a);
        return a
    };
    ma[" "] = ba;
    var na = function (a, b) {
        try {
            return ma(a[b]), !0
        } catch (c) {
        }
        return !1
    };
    var oa = function (a) {
        var b = [!0];
        if (!(1E-4 > Math.random())) {
            var c = Math.random();
            if (c < a) {
                try {
                    var d = new Uint16Array(1);
                    window.crypto.getRandomValues(d);
                    c = d[0] / 65536
                } catch (e) {
                    c = Math.random()
                }
                return b[Math.floor(c * b.length)]
            }
        }
        return null
    };
    var z = document, A = window;
    var pa = function (a) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, pa); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    y(pa, Error);
    pa.prototype.name = "CustomError";
    var ra;
    var sa = function (a) {
            return /^[\s\xa0]*$/.test(a)
        }, ta = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, Ba = function (a) {
            if (!ua.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(va, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(wa, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(xa, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(ya, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(za, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(Aa, "&#0;"));
            return a
        }, va = /&/g, wa = /</g,
        xa = />/g, ya = /"/g, za = /'/g, Aa = /\x00/g, ua = /[\x00&<>"']/, Ca = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        }, Da = function (a) {
            var b = Number(a);
            return 0 == b && sa(a) ? NaN : b
        }, Ea = function (a) {
            return String(a).replace(/\-([a-z])/g, function (a, c) {
                return c.toUpperCase()
            })
        }, Fa = function (a) {
            var b = p(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
                return b + e.toUpperCase()
            })
        };
    var Ga = function (a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d;)d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    }, Ha = function (a, b) {
        a.google_image_requests || (a.google_image_requests = []);
        var c = a.document.createElement("img");
        c.src = b;
        a.google_image_requests.push(c)
    };
    var Ia = null, Ja = function (a, b) {
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
    }, Ka = function (a) {
        return ea(a) && 0 < a
    }, La = function (a) {
        return r(a) || "undefined" === typeof a
    };

    function Ma(a) {
        return "function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)
    }

    var Na = function (a) {
        return !!a && (0 < a.indexOf("?google_debug") || 0 < a.indexOf("&google_debug"))
    };
    var Oa = null, Pa = function () {
        var a;
        if (!Oa)t:{
            for (var b = [A.top], c = [], d = 0, e; e = b[d++];) {
                c.push(e);
                try {
                    if (e.frames)for (var f = e.frames.length, h = 0; h < f && 1024 > b.length; ++h)b.push(e.frames[h])
                } catch (k) {
                }
            }
            for (b = 0; b < c.length; b++)try {
                a = c[b].frames.google_esf;
                var q;
                if (q = a)try {
                    q = !!a && null != a.location.href && na(a, "foo")
                } catch (v) {
                    q = !1
                }
                if (q) {
                    Oa = a;
                    break t
                }
            } catch (t) {
            }
            Oa = null
        }
        a = Oa;
        if (!a)return null;
        (c = a.esf_winPropArray) || (c = a.esf_winPropArray = []);
        for (a = 0; a < c.length; a++)if (c[a].window == A)return c[a].store;
        a = {};
        a.window =
            A;
        a.store = {};
        c.push(a);
        return a.store
    };
    var Qa = Array.prototype, Ra = Qa.indexOf ? function (a, b, c) {
        return Qa.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a))return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }, B = Qa.forEach ? function (a, b, c) {
        Qa.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, Sa = Qa.filter ? function (a, b, c) {
        return Qa.filter.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = [], f =
            0, h = p(a) ? a.split("") : a, k = 0; k < d; k++)if (k in h) {
            var q = h[k];
            b.call(c, q, k, a) && (e[f++] = q)
        }
        return e
    }, Ta = Qa.map ? function (a, b, c) {
        return Qa.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, h = 0; h < d; h++)h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    }, Ua = Qa.some ? function (a, b, c) {
        return Qa.some.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return !0;
        return !1
    }, Va = function (a, b) {
        return 0 <= Ra(a, b)
    }, Wa = function (a, b) {
        var c =
            Ra(a, b), d;
        (d = 0 <= c) && Qa.splice.call(a, c, 1);
        return d
    }, Xa = function (a) {
        return Qa.concat.apply(Qa, arguments)
    }, Ya = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return []
    }, Za = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (da(d)) {
                var e = a.length || 0, f = d.length || 0;
                a.length = e + f;
                for (var h = 0; h < f; h++)a[e + h] = d[h]
            } else a.push(d)
        }
    }, $a = function (a) {
        for (var b = {}, c = 0, d = 0; d < a.length;) {
            var e = a[d++], f = fa(e) ? "o" + ia(e) : (typeof e).charAt(0) + e;
            Object.prototype.hasOwnProperty.call(b,
                f) || (b[f] = !0, a[c++] = e)
        }
        a.length = c
    };
    var ab = function (a, b, c) {
            for (var d in a)b.call(c, a[d], d, a)
        }, bb = function (a) {
            var b = [], c = 0, d;
            for (d in a)b[c++] = a[d];
            return b
        }, cb = function (a) {
            var b = [], c = 0, d;
            for (d in a)b[c++] = d;
            return b
        }, fb = function () {
            var a = eb, b;
            for (b in a)return !1;
            return !0
        }, gb = function (a) {
            var b = {}, c;
            for (c in a)b[c] = a[c];
            return b
        }, hb = function (a) {
            var b = ca(a);
            if ("object" == b || "array" == b) {
                if (a.clone)return a.clone();
                var b = "array" == b ? [] : {}, c;
                for (c in a)b[c] = hb(a[c]);
                return b
            }
            return a
        }, jb = function () {
            var a = ib, b = {}, c;
            for (c in a)b[a[c]] = c;
            return b
        },
        kb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), lb = function (a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d)a[c] = d[c];
                for (var f = 0; f < kb.length; f++)c = kb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        }, mb = function (a) {
            var b = arguments.length;
            if (1 == b && n(arguments[0]))return mb.apply(null, arguments[0]);
            if (b % 2)throw Error("Uneven number of arguments");
            for (var c = {}, d = 0; d < b; d += 2)c[arguments[d]] = arguments[d + 1];
            return c
        },
        nb = function (a) {
            var b = arguments.length;
            if (1 == b && n(arguments[0]))return nb.apply(null, arguments[0]);
            for (var c = {}, d = 0; d < b; d++)c[arguments[d]] = !0;
            return c
        };
    var ob = nb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    var qb = function () {
        this.Bg = "";
        this.qi = pb
    };
    qb.prototype.Ac = !0;
    qb.prototype.xc = function () {
        return this.Bg
    };
    qb.prototype.toString = function () {
        return "Const{" + this.Bg + "}"
    };
    var rb = function (a) {
        return a instanceof qb && a.constructor === qb && a.qi === pb ? a.Bg : "type_error:Const"
    }, pb = {};
    var tb = function () {
        this.ng = "";
        this.oi = sb
    };
    tb.prototype.Ac = !0;
    var sb = {};
    tb.prototype.xc = function () {
        return this.ng
    };
    var ub = function (a) {
        return a instanceof tb && a.constructor === tb && a.oi === sb ? a.ng : "type_error:SafeStyle"
    };
    tb.prototype.qe = function (a) {
        this.ng = a;
        return this
    };
    var vb = (new tb).qe(""), wb = /^[-,."'%_!# a-zA-Z0-9]+$/;
    var yb = function () {
        this.Jc = "";
        this.pi = xb
    };
    yb.prototype.Ac = !0;
    yb.prototype.xc = function () {
        return this.Jc
    };
    yb.prototype.Rf = !0;
    yb.prototype.hd = function () {
        return 1
    };
    var xb = {};
    var Ab = function () {
        this.Vh = "";
        this.ri = zb
    };
    Ab.prototype.Ac = !0;
    Ab.prototype.xc = function () {
        return this.Vh
    };
    Ab.prototype.Rf = !0;
    Ab.prototype.hd = function () {
        return 1
    };
    var zb = {};
    var Cb = function () {
        this.Jc = "";
        this.ni = Bb;
        this.ih = null
    };
    Cb.prototype.Rf = !0;
    Cb.prototype.hd = function () {
        return this.ih
    };
    Cb.prototype.Ac = !0;
    Cb.prototype.xc = function () {
        return this.Jc
    };
    var Eb = function (a) {
        return a instanceof Cb && a.constructor === Cb && a.ni === Bb ? a.Jc : "type_error:SafeHtml"
    }, Fb = /^[a-zA-Z0-9-]+$/, Gb = nb("action", "cite", "data", "formaction", "href", "manifest", "poster", "src"), Hb = nb("embed", "iframe", "link", "object", "script", "style", "template"), Jb = function (a) {
        var b = 0, c = "", d = function (a) {
            if (n(a))B(a, d); else {
                if (!(a instanceof Cb)) {
                    var f = null;
                    a.Rf && (f = a.hd());
                    a = Ib(Ba(a.Ac ? a.xc() : String(a)), f)
                }
                c += Eb(a);
                a = a.hd();
                0 == b ? b = a : 0 != a && b != a && (b = null)
            }
        };
        B(arguments, d);
        return Ib(c, b)
    }, Bb = {}, Ib =
        function (a, b) {
            return (new Cb).qe(a, b)
        };
    Cb.prototype.qe = function (a, b) {
        this.Jc = a;
        this.ih = b;
        return this
    };
    Ib("", 0);
    var Kb = function (a, b) {
        return Math.min(Math.max(a, 0), b)
    }, Lb = function (a) {
        a %= 360;
        return 0 > 360 * a ? a + 360 : a
    };
    var C = function (a, b) {
        this.x = m(a) ? a : 0;
        this.y = m(b) ? b : 0
    };
    C.prototype.clone = function () {
        return new C(this.x, this.y)
    };
    var Mb = function (a, b) {
        return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
    }, Nb = function (a, b) {
        var c = a.x - b.x, d = a.y - b.y;
        return Math.sqrt(c * c + d * d)
    }, Ob = function (a, b) {
        return new C(a.x - b.x, a.y - b.y)
    };
    g = C.prototype;
    g.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    g.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    g.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    g.translate = function (a, b) {
        a instanceof C ? (this.x += a.x, this.y += a.y) : (this.x += a, ea(b) && (this.y += b));
        return this
    };
    g.scale = function (a, b) {
        var c = ea(b) ? b : a;
        this.x *= a;
        this.y *= c;
        return this
    };
    var D = function (a, b) {
        this.width = a;
        this.height = b
    };
    g = D.prototype;
    g.clone = function () {
        return new D(this.width, this.height)
    };
    g.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    g.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    g.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    g.scale = function (a, b) {
        var c = ea(b) ? b : a;
        this.width *= a;
        this.height *= c;
        return this
    };
    var Pb;
    t:{
        var Qb = l.navigator;
        if (Qb) {
            var Rb = Qb.userAgent;
            if (Rb) {
                Pb = Rb;
                break t
            }
        }
        Pb = ""
    }
    var E = function (a) {
        return -1 != Pb.indexOf(a)
    };
    var Sb = function () {
        return E("Opera") || E("OPR")
    }, Tb = function () {
        return E("Edge") || E("Trident") || E("MSIE")
    }, Ub = function () {
        return (E("Chrome") || E("CriOS")) && !Sb() && !Tb()
    };
    var Vb = function () {
        return E("Edge")
    };
    var Wb = function () {
        return E("iPhone") && !E("iPod") && !E("iPad")
    };
    var Xb = Sb(), F = Tb(), Yb = E("Gecko") && !(-1 != Pb.toLowerCase().indexOf("webkit") && !Vb()) && !(E("Trident") || E("MSIE")) && !Vb(), G = -1 != Pb.toLowerCase().indexOf("webkit") && !Vb(), Zb = G && E("Mobile"), $b = E("Android"), ac = function () {
        var a = Pb;
        if (Yb)return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (F && Vb())return /Edge\/([\d\.]+)/.exec(a);
        if (F)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (G)return /WebKit\/(\S+)/.exec(a)
    }, bc = function () {
        var a = l.document;
        return a ? a.documentMode : void 0
    }, cc = function () {
        if (Xb && l.opera) {
            var a = l.opera.version;
            return r(a) ? a() : a
        }
        var a = "", b = ac();
        b && (a = b ? b[1] : "");
        return F && !Vb() && (b = bc(), b > parseFloat(a)) ? String(b) : a
    }(), dc = {}, H = function (a) {
        var b;
        if (!(b = dc[a])) {
            b = 0;
            for (var c = ta(String(cc)).split("."), d = ta(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var h = c[f] || "", k = d[f] || "", q = RegExp("(\\d*)(\\D*)", "g"), v = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var t = q.exec(h) || ["", "", ""], R = v.exec(k) || ["", "", ""];
                    if (0 == t[0].length && 0 == R[0].length)break;
                    b = Ca(0 == t[1].length ? 0 : parseInt(t[1], 10), 0 == R[1].length ? 0 :
                        parseInt(R[1], 10)) || Ca(0 == t[2].length, 0 == R[2].length) || Ca(t[2], R[2])
                } while (0 == b)
            }
            b = dc[a] = 0 <= b
        }
        return b
    }, fc = function () {
        return F && (Vb() || 9 <= ec)
    }, gc = l.document, hc = bc(), ec = !gc || !F || !hc && Vb() ? void 0 : hc || ("CSS1Compat" == gc.compatMode ? parseInt(cc, 10) : 5);
    var ic = !F || fc(), jc = !Yb && !F || F && fc() || Yb && H("1.9.1");
    F && H("9");
    var kc = F || Xb || G;
    var nc = function (a) {
            return a ? new lc(mc(a)) : ra || (ra = new lc)
        }, pc = function (a, b) {
            ab(b, function (b, d) {
                "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in oc ? a.setAttribute(oc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
            })
        }, oc = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        }, rc = function (a) {
            a = (a || window).document;
            a = qc(a) ? a.documentElement : a.body;
            return new D(a.clientWidth, a.clientHeight)
        }, sc = function (a) {
            return a.parentWindow || a.defaultView
        }, uc = function (a, b, c, d) {
            function e(c) {
                c && b.appendChild(p(c) ? a.createTextNode(c) : c)
            }

            for (; d < c.length; d++) {
                var f = c[d];
                !da(f) || fa(f) && 0 < f.nodeType ? e(f) : B(tc(f) ? Ya(f) : f, e)
            }
        }, qc = function (a) {
            return "CSS1Compat" == a.compatMode
        }, I = function (a) {
            return a && a.parentNode ? a.parentNode.removeChild(a) : null
        }, vc = function (a) {
            var b;
            if (kc && !(F &&
                H("9") && !H("10") && l.SVGElement && a instanceof l.SVGElement) && (b = a.parentElement))return b;
            b = a.parentNode;
            return fa(b) && 1 == b.nodeType ? b : null
        }, mc = function (a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        }, wc = function (a, b) {
            if ("textContent"in a)a.textContent = b; else if (3 == a.nodeType)a.data = b; else if (a.firstChild && 3 == a.firstChild.nodeType) {
                for (; a.lastChild != a.firstChild;)a.removeChild(a.lastChild);
                a.firstChild.data = b
            } else {
                for (var c; c = a.firstChild;)a.removeChild(c);
                a.appendChild(mc(a).createTextNode(String(b)))
            }
        },
        xc = function (a, b) {
            b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
        }, tc = function (a) {
            if (a && "number" == typeof a.length) {
                if (fa(a))return "function" == typeof a.item || "string" == typeof a.item;
                if (r(a))return "function" == typeof a.item
            }
            return !1
        }, lc = function (a) {
            this.G = a || l.document || document
        };
    lc.prototype.ja = nc;
    var yc = function (a) {
        return a.G
    };
    g = lc.prototype;
    g.sa = function (a) {
        return p(a) ? this.G.getElementById(a) : a
    };
    g.sc = function (a, b, c) {
        var d = this.G, e = arguments, f = e[0], h = e[1];
        if (!ic && h && (h.name || h.type)) {
            f = ["<", f];
            h.name && f.push(' name="', Ba(h.name), '"');
            if (h.type) {
                f.push(' type="', Ba(h.type), '"');
                var k = {};
                lb(k, h);
                delete k.type;
                h = k
            }
            f.push(">");
            f = f.join("")
        }
        f = d.createElement(f);
        h && (p(h) ? f.className = h : n(h) ? f.className = h.join(" ") : pc(f, h));
        2 < e.length && uc(d, f, e, 2);
        return f
    };
    g.createElement = function (a) {
        return this.G.createElement(a)
    };
    g.createTextNode = function (a) {
        return this.G.createTextNode(String(a))
    };
    g.Jb = function () {
        return sc(this.G)
    };
    g.appendChild = function (a, b) {
        a.appendChild(b)
    };
    g.append = function (a, b) {
        uc(mc(a), a, arguments, 1)
    };
    g.canHaveChildren = function (a) {
        if (1 != a.nodeType)return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    g.removeNode = I;
    var Ac = function (a) {
        return jc && void 0 != a.children ? a.children : Sa(a.childNodes, function (a) {
            return 1 == a.nodeType
        })
    };
    lc.prototype.contains = function (a, b) {
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    };
    Yb || G || F && H(11);
    var Bc = !0, Cc = {}, Fc = function (a) {
        var b = Dc, c, d = Bc;
        try {
            c = a()
        } catch (e) {
            try {
                var f = Ga(e);
                a = "";
                e.fileName && (a = e.fileName);
                var h = -1;
                e.lineNumber && (h = e.lineNumber);
                d = b("osd_proto::reqm_int", f, a, h, void 0)
            } catch (k) {
                try {
                    var q = Ga(k), b = "";
                    k.fileName && (b = k.fileName);
                    f = -1;
                    k.lineNumber && (f = k.lineNumber);
                    Dc("pAR", q, b, f, void 0, void 0)
                } catch (v) {
                    Ec("jserror", {context: "mRE", msg: v.toString() + "\n" + (v.stack || "")}, void 0)
                }
            }
            if (!d)throw e;
        } finally {
        }
        return c
    }, Dc = function (a, b, c, d, e, f) {
        var h = {};
        if (e)try {
            e(h)
        } catch (k) {
        }
        h.context =
            a;
        h.msg = b.substring(0, 512);
        c && (h.file = c);
        0 < d && (h.line = d.toString());
        h.url = z.URL.substring(0, 512);
        h.ref = z.referrer.substring(0, 512);
        Gc(h);
        Ec("jserror", h, f);
        return Bc
    }, Ec = function (a, b, c) {
        try {
            if (Math.random() < (c || .01)) {
                var d = "/pagead/gen_204?id=" + a + Hc(b), e = "http" + ("http:" == A.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + d, e = e.substring(0, 2E3);
                Ha(A, e)
            }
        } catch (f) {
        }
    }, Gc = function (a) {
        var b = a || {};
        Ja(Cc, function (a, d) {
            b[d] = A[a]
        })
    }, Ic = function (a) {
        return function () {
            var b = arguments;
            return Fc(function () {
                return a.apply(void 0,
                    b)
            })
        }
    }, Hc = function (a) {
        var b = "";
        Ja(a, function (a, d) {
            if (0 === a || a)b += "&" + d + "=" + Ma(a)
        });
        return b
    };
    var Jc = function (a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }, Mc = function (a) {
        var b = [];
        Kc(new Lc, a, b);
        return b.join("")
    }, Lc = function () {
        this.Oe = void 0
    }, Kc = function (a, b, c) {
        switch (typeof b) {
            case "string":
                Nc(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (n(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)c.push(e), e = b[f], Kc(a, a.Oe ? a.Oe.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b)Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), Nc(f, c), c.push(":"), Kc(a, a.Oe ? a.Oe.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }, Oc = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, Pc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g, Nc = function (a, b) {
        b.push('"', a.replace(Pc, function (a) {
            if (a in Oc)return Oc[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return Oc[a] = e + b.toString(16)
        }), '"')
    };
    var Qc = function (a) {
        return function () {
            return a
        }
    }, Rc = Qc(!1), Sc = function (a) {
        var b = !1, c;
        return function () {
            b || (c = a(), b = !0);
            return c
        }
    };
    var Tc = "StopIteration"in l ? l.StopIteration : Error("StopIteration"), Uc = function () {
    };
    Uc.prototype.next = function () {
        throw Tc;
    };
    Uc.prototype.si = function () {
        return this
    };
    var Vc = function (a, b) {
        this.Pa = {};
        this.w = [];
        this.Rd = this.J = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)this.set(arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof Vc ? (c = a.Zb(), d = a.lb()) : (c = cb(a), d = bb(a));
            for (var e = 0; e < c.length; e++)this.set(c[e], d[e])
        }
    };
    g = Vc.prototype;
    g.lb = function () {
        Wc(this);
        for (var a = [], b = 0; b < this.w.length; b++)a.push(this.Pa[this.w[b]]);
        return a
    };
    g.Zb = function () {
        Wc(this);
        return this.w.concat()
    };
    g.dd = function (a) {
        return Xc(this.Pa, a)
    };
    g.clear = function () {
        this.Pa = {};
        this.Rd = this.J = this.w.length = 0
    };
    g.remove = function (a) {
        return Xc(this.Pa, a) ? (delete this.Pa[a], this.J--, this.Rd++, this.w.length > 2 * this.J && Wc(this), !0) : !1
    };
    var Wc = function (a) {
        if (a.J != a.w.length) {
            for (var b = 0, c = 0; b < a.w.length;) {
                var d = a.w[b];
                Xc(a.Pa, d) && (a.w[c++] = d);
                b++
            }
            a.w.length = c
        }
        if (a.J != a.w.length) {
            for (var e = {}, c = b = 0; b < a.w.length;)d = a.w[b], Xc(e, d) || (a.w[c++] = d, e[d] = 1), b++;
            a.w.length = c
        }
    };
    g = Vc.prototype;
    g.get = function (a, b) {
        return Xc(this.Pa, a) ? this.Pa[a] : b
    };
    g.set = function (a, b) {
        Xc(this.Pa, a) || (this.J++, this.w.push(a), this.Rd++);
        this.Pa[a] = b
    };
    g.forEach = function (a, b) {
        for (var c = this.Zb(), d = 0; d < c.length; d++) {
            var e = c[d], f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    g.clone = function () {
        return new Vc(this)
    };
    g.si = function (a) {
        Wc(this);
        var b = 0, c = this.w, d = this.Pa, e = this.Rd, f = this, h = new Uc;
        h.next = function () {
            for (; ;) {
                if (e != f.Rd)throw Error("The map has changed since the iterator was created");
                if (b >= c.length)throw Tc;
                var h = c[b++];
                return a ? h : d[h]
            }
        };
        return h
    };
    var Xc = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var Yc = function (a) {
        if ("function" == typeof a.lb)return a.lb();
        if (p(a))return a.split("");
        if (da(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)b.push(a[d]);
            return b
        }
        return bb(a)
    }, Zc = function (a, b, c) {
        if ("function" == typeof a.forEach)a.forEach(b, c); else if (da(a) || p(a))B(a, b, c); else {
            var d;
            if ("function" == typeof a.Zb)d = a.Zb(); else if ("function" != typeof a.lb)if (da(a) || p(a)) {
                d = [];
                for (var e = a.length, f = 0; f < e; f++)d.push(f)
            } else d = cb(a); else d = void 0;
            for (var e = Yc(a), f = e.length, h = 0; h < f; h++)b.call(c, e[h], d && d[h], a)
        }
    };
    var J = function () {
        this.jb = this.jb;
        this.gc = this.gc
    };
    J.prototype.jb = !1;
    J.prototype.ia = function () {
        this.jb || (this.jb = !0, this.i())
    };
    var bd = function (a, b) {
        $c(a, la(ad, b))
    }, $c = function (a, b) {
        a.jb ? b.call(void 0) : (a.gc || (a.gc = []), a.gc.push(m(void 0) ? u(b, void 0) : b))
    };
    J.prototype.i = function () {
        if (this.gc)for (; this.gc.length;)this.gc.shift()()
    };
    var ad = function (a) {
        a && "function" == typeof a.ia && a.ia()
    }, cd = function (a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            da(d) ? cd.apply(null, d) : ad(d)
        }
    };
    var dd = function (a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.kc = !1;
        this.ci = !0
    };
    dd.prototype.stopPropagation = function () {
        this.kc = !0
    };
    dd.prototype.preventDefault = function () {
        this.defaultPrevented = !0;
        this.ci = !1
    };
    var ed = !F || fc(), fd = F && !H("9");
    !G || H("528");
    Yb && H("1.9b") || F && H("8") || Xb && H("9.5") || G && H("528");
    Yb && !H("8") || F && H("9");
    var gd = G ? "webkitTransitionEnd" : Xb ? "otransitionend" : "transitionend";
    var hd = function (a, b) {
        dd.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.tc = this.state = null;
        if (a) {
            var c = this.type = a.type;
            this.target = a.target || a.srcElement;
            this.currentTarget = b;
            var d = a.relatedTarget;
            d ? Yb && (na(d, "nodeName") || (d = null)) : "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
            this.relatedTarget = d;
            this.offsetX = G || void 0 !== a.offsetX ? a.offsetX : a.layerX;
            this.offsetY = G || void 0 !== a.offsetY ? a.offsetY : a.layerY;
            this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
            this.screenX = a.screenX || 0;
            this.screenY = a.screenY || 0;
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.state = a.state;
            this.tc =
                a;
            a.defaultPrevented && this.preventDefault()
        }
    };
    y(hd, dd);
    hd.prototype.stopPropagation = function () {
        hd.j.stopPropagation.call(this);
        this.tc.stopPropagation ? this.tc.stopPropagation() : this.tc.cancelBubble = !0
    };
    hd.prototype.preventDefault = function () {
        hd.j.preventDefault.call(this);
        var a = this.tc;
        if (a.preventDefault)a.preventDefault(); else if (a.returnValue = !1, fd)try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)a.keyCode = -1
        } catch (b) {
        }
    };
    hd.prototype.W = function () {
        return this.tc
    };
    var id = "closure_listenable_" + (1E6 * Math.random() | 0), jd = function (a) {
        return !(!a || !a[id])
    }, kd = 0;
    var ld = function (a, b, c, d, e) {
        this.ec = a;
        this.Me = null;
        this.src = b;
        this.type = c;
        this.Zd = !!d;
        this.ne = e;
        this.key = ++kd;
        this.Nc = this.Xd = !1
    }, md = function (a) {
        a.Nc = !0;
        a.ec = null;
        a.Me = null;
        a.src = null;
        a.ne = null
    };
    var nd = function (a) {
        this.src = a;
        this.R = {};
        this.Nd = 0
    };
    nd.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.R[f];
        a || (a = this.R[f] = [], this.Nd++);
        var h = od(a, b, d, e);
        -1 < h ? (b = a[h], c || (b.Xd = !1)) : (b = new ld(b, this.src, f, !!d, e), b.Xd = c, a.push(b));
        return b
    };
    nd.prototype.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.R))return !1;
        var e = this.R[a];
        b = od(e, b, c, d);
        return -1 < b ? (md(e[b]), Qa.splice.call(e, b, 1), 0 == e.length && (delete this.R[a], this.Nd--), !0) : !1
    };
    var pd = function (a, b) {
        var c = b.type;
        if (!(c in a.R))return !1;
        var d = Wa(a.R[c], b);
        d && (md(b), 0 == a.R[c].length && (delete a.R[c], a.Nd--));
        return d
    };
    nd.prototype.Mc = function (a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.R)if (!a || c == a) {
            for (var d = this.R[c], e = 0; e < d.length; e++)++b, md(d[e]);
            delete this.R[c];
            this.Nd--
        }
        return b
    };
    nd.prototype.ld = function (a, b, c, d) {
        a = this.R[a.toString()];
        var e = -1;
        a && (e = od(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    var od = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Nc && f.ec == b && f.Zd == !!c && f.ne == d)return e
        }
        return -1
    };
    var qd = "closure_lm_" + (1E6 * Math.random() | 0), rd = {}, sd = 0, K = function (a, b, c, d, e) {
        if (n(b)) {
            for (var f = 0; f < b.length; f++)K(a, b[f], c, d, e);
            return null
        }
        c = td(c);
        return jd(a) ? a.dc(b, c, d, e) : ud(a, b, c, !1, d, e)
    }, ud = function (a, b, c, d, e, f) {
        if (!b)throw Error("Invalid event type");
        var h = !!e, k = vd(a);
        k || (a[qd] = k = new nd(a));
        c = k.add(b, c, d, e, f);
        if (c.Me)return c;
        d = wd();
        c.Me = d;
        d.src = a;
        d.ec = c;
        a.addEventListener ? a.addEventListener(b.toString(), d, h) : a.attachEvent(xd(b.toString()), d);
        sd++;
        return c
    }, wd = function () {
        var a = yd, b = ed ? function (c) {
            return a.call(b.src,
                b.ec, c)
        } : function (c) {
            c = a.call(b.src, b.ec, c);
            if (!c)return c
        };
        return b
    }, zd = function (a, b, c, d, e) {
        if (n(b)) {
            for (var f = 0; f < b.length; f++)zd(a, b[f], c, d, e);
            return null
        }
        c = td(c);
        return jd(a) ? a.xe(b, c, d, e) : ud(a, b, c, !0, d, e)
    }, Ad = function (a, b, c, d, e) {
        if (n(b))for (var f = 0; f < b.length; f++)Ad(a, b[f], c, d, e); else c = td(c), jd(a) ? a.Vc(b, c, d, e) : a && (a = vd(a)) && (b = a.ld(b, c, !!d, e)) && L(b)
    }, L = function (a) {
        if (ea(a) || !a || a.Nc)return !1;
        var b = a.src;
        if (jd(b))return b.af(a);
        var c = a.type, d = a.Me;
        b.removeEventListener ? b.removeEventListener(c,
            d, a.Zd) : b.detachEvent && b.detachEvent(xd(c), d);
        sd--;
        (c = vd(b)) ? (pd(c, a), 0 == c.Nd && (c.src = null, b[qd] = null)) : md(a);
        return !0
    }, Bd = function (a) {
        if (a)if (jd(a))a.Va && a.Va.Mc("end"); else if (a = vd(a)) {
            var b = 0, c = "end".toString(), d;
            for (d in a.R)if (!c || d == c)for (var e = a.R[d].concat(), f = 0; f < e.length; ++f)L(e[f]) && ++b
        }
    }, Cd = function (a, b, c, d, e) {
        c = td(c);
        d = !!d;
        return jd(a) ? a.ld(b, c, d, e) : a ? (a = vd(a)) ? a.ld(b, c, d, e) : null : null
    }, xd = function (a) {
        return a in rd ? rd[a] : rd[a] = "on" + a
    }, Ed = function (a, b, c, d) {
        var e = !0;
        if (a = vd(a))if (b = a.R[b.toString()])for (b =
                                                         b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.Zd == c && !f.Nc && (f = Dd(f, d), e = e && !1 !== f)
        }
        return e
    }, Dd = function (a, b) {
        var c = a.ec, d = a.ne || a.src;
        a.Xd && L(a);
        return c.call(d, b)
    }, yd = function (a, b) {
        if (a.Nc)return !0;
        if (!ed) {
            var c = b || aa("window.event"), d = new hd(c, this), e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t:{
                    var f = !1;
                    if (0 == c.keyCode)try {
                        c.keyCode = -1;
                        break t
                    } catch (h) {
                        f = !0
                    }
                    if (f || void 0 == c.returnValue)c.returnValue = !0
                }
                c = [];
                for (f = d.currentTarget; f; f = f.parentNode)c.push(f);
                for (var f = a.type, k = c.length - 1; !d.kc &&
                0 <= k; k--) {
                    d.currentTarget = c[k];
                    var q = Ed(c[k], f, !0, d), e = e && q
                }
                for (k = 0; !d.kc && k < c.length; k++)d.currentTarget = c[k], q = Ed(c[k], f, !1, d), e = e && q
            }
            return e
        }
        return Dd(a, new hd(b, this))
    }, vd = function (a) {
        a = a[qd];
        return a instanceof nd ? a : null
    }, Fd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0), td = function (a) {
        if (r(a))return a;
        a[Fd] || (a[Fd] = function (b) {
            return a.handleEvent(b)
        });
        return a[Fd]
    };
    var M = function () {
        J.call(this);
        this.Va = new nd(this);
        this.wi = this;
        this.Ie = null
    };
    y(M, J);
    M.prototype[id] = !0;
    g = M.prototype;
    g.vg = function (a) {
        this.Ie = a
    };
    g.addEventListener = function (a, b, c, d) {
        K(this, a, b, c, d)
    };
    g.removeEventListener = function (a, b, c, d) {
        Ad(this, a, b, c, d)
    };
    g.dispatchEvent = function (a) {
        var b, c = this.Ie;
        if (c)for (b = []; c; c = c.Ie)b.push(c);
        var c = this.wi, d = a.type || a;
        if (p(a))a = new dd(a, c); else if (a instanceof dd)a.target = a.target || c; else {
            var e = a;
            a = new dd(d, c);
            lb(a, e)
        }
        var e = !0, f;
        if (b)for (var h = b.length - 1; !a.kc && 0 <= h; h--)f = a.currentTarget = b[h], e = Gd(f, d, !0, a) && e;
        a.kc || (f = a.currentTarget = c, e = Gd(f, d, !0, a) && e, a.kc || (e = Gd(f, d, !1, a) && e));
        if (b)for (h = 0; !a.kc && h < b.length; h++)f = a.currentTarget = b[h], e = Gd(f, d, !1, a) && e;
        return e
    };
    g.i = function () {
        M.j.i.call(this);
        this.Va && this.Va.Mc(void 0);
        this.Ie = null
    };
    g.dc = function (a, b, c, d) {
        return this.Va.add(String(a), b, !1, c, d)
    };
    g.xe = function (a, b, c, d) {
        return this.Va.add(String(a), b, !0, c, d)
    };
    g.Vc = function (a, b, c, d) {
        return this.Va.remove(String(a), b, c, d)
    };
    g.af = function (a) {
        return pd(this.Va, a)
    };
    var Gd = function (a, b, c, d) {
        b = a.Va.R[String(b)];
        if (!b)return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.Nc && h.Zd == c) {
                var k = h.ec, q = h.ne || h.src;
                h.Xd && a.af(h);
                e = !1 !== k.call(q, d) && e
            }
        }
        return e && 0 != d.ci
    };
    M.prototype.ld = function (a, b, c, d) {
        return this.Va.ld(String(a), b, c, d)
    };
    var Hd = function (a) {
        l.setTimeout(function () {
            throw a;
        }, 0)
    }, Id, Jd = function () {
        var a = l.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !E("Presto") && (a = function () {
            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow, a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(), d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                a = u(function (a) {
                    if (("*" == d || a.origin == d) && a.data == c)this.port1.onmessage()
                }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function () {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !Tb()) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function () {
                if (m(c.next)) {
                    c = c.next;
                    var a = c.Tg;
                    c.Tg = null;
                    a()
                }
            };
            return function (a) {
                d.next = {Tg: a};
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange"in document.createElement("script") ? function (a) {
            var b = document.createElement("script");
            b.onreadystatechange = function () {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function (a) {
            l.setTimeout(a, 0)
        }
    };
    var Kd = function (a, b, c) {
        this.Bj = c;
        this.Ki = a;
        this.ab = b;
        this.Fe = 0;
        this.oe = null
    };
    Kd.prototype.get = function () {
        var a;
        0 < this.Fe ? (this.Fe--, a = this.oe, this.oe = a.next, a.next = null) : a = this.Ki();
        return a
    };
    Kd.prototype.put = function (a) {
        this.ab(a);
        this.Fe < this.Bj && (this.Fe++, a.next = this.oe, this.oe = a)
    };
    var Ld = function () {
        this.gf = this.Xc = null
    }, Nd = new Kd(function () {
        return new Md
    }, function (a) {
        a.reset()
    }, 100);
    Ld.prototype.add = function (a, b) {
        var c = Nd.get();
        c.set(a, b);
        this.gf ? this.gf.next = c : this.Xc = c;
        this.gf = c
    };
    Ld.prototype.remove = function () {
        var a = null;
        this.Xc && (a = this.Xc, this.Xc = this.Xc.next, this.Xc || (this.gf = null), a.next = null);
        return a
    };
    var Md = function () {
        this.next = this.scope = this.Ef = null
    };
    Md.prototype.set = function (a, b) {
        this.Ef = a;
        this.scope = b;
        this.next = null
    };
    Md.prototype.reset = function () {
        this.next = this.scope = this.Ef = null
    };
    var Sd = function (a, b) {
        Od || Pd();
        Qd || (Od(), Qd = !0);
        Rd.add(a, b)
    }, Od, Pd = function () {
        if (l.Promise && l.Promise.resolve) {
            var a = l.Promise.resolve();
            Od = function () {
                a.then(Td)
            }
        } else Od = function () {
            var a = Td;
            !r(l.setImmediate) || l.Window && l.Window.prototype && l.Window.prototype.setImmediate == l.setImmediate ? (Id || (Id = Jd()), Id(a)) : l.setImmediate(a)
        }
    }, Qd = !1, Rd = new Ld, Td = function () {
        for (var a = null; a = Rd.remove();) {
            try {
                a.Ef.call(a.scope)
            } catch (b) {
                Hd(b)
            }
            Nd.put(a)
        }
        Qd = !1
    };
    var Ud = function (a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    }, Vd = function (a) {
        if (!a)return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    var Yd = function (a, b) {
        this.m = 0;
        this.vb = void 0;
        this.qc = this.Bb = this.A = null;
        this.me = this.Cf = !1;
        if (a == Wd)Xd(this, 2, b); else try {
            var c = this;
            a.call(b, function (a) {
                Xd(c, 2, a)
            }, function (a) {
                Xd(c, 3, a)
            })
        } catch (d) {
            Xd(this, 3, d)
        }
    }, Zd = function () {
        this.next = this.context = this.zd = this.Ge = this.Ub = null;
        this.pf = !1
    };
    Zd.prototype.reset = function () {
        this.context = this.zd = this.Ge = this.Ub = null;
        this.pf = !1
    };
    var $d = new Kd(function () {
        return new Zd
    }, function (a) {
        a.reset()
    }, 100), ae = function (a, b, c) {
        var d = $d.get();
        d.Ge = a;
        d.zd = b;
        d.context = c;
        return d
    }, Wd = function () {
    };
    Yd.prototype.then = function (a, b, c) {
        return be(this, r(a) ? a : null, r(b) ? b : null, c)
    };
    Ud(Yd);
    Yd.prototype.cancel = function (a) {
        0 == this.m && Sd(function () {
            var b = new ce(a);
            de(this, b)
        }, this)
    };
    var de = function (a, b) {
        if (0 == a.m)if (a.A) {
            var c = a.A;
            if (c.Bb) {
                for (var d = 0, e = null, f = null, h = c.Bb; h && (h.pf || (d++, h.Ub == a && (e = h), !(e && 1 < d))); h = h.next)e || (f = h);
                e && (0 == c.m && 1 == d ? de(c, b) : (f ? (d = f, d.next == c.qc && (c.qc = d), d.next = d.next.next) : ee(c), fe(c, e, 3, b)))
            }
            a.A = null
        } else Xd(a, 3, b)
    }, he = function (a, b) {
        a.Bb || 2 != a.m && 3 != a.m || ge(a);
        a.qc ? a.qc.next = b : a.Bb = b;
        a.qc = b
    }, be = function (a, b, c, d) {
        var e = ae(null, null, null);
        e.Ub = new Yd(function (a, h) {
            e.Ge = b ? function (c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (v) {
                    h(v)
                }
            } : a;
            e.zd = c ? function (b) {
                try {
                    var e =
                        c.call(d, b);
                    !m(e) && b instanceof ce ? h(b) : a(e)
                } catch (v) {
                    h(v)
                }
            } : h
        });
        e.Ub.A = a;
        he(a, e);
        return e.Ub
    };
    Yd.prototype.hi = function (a) {
        this.m = 0;
        Xd(this, 2, a)
    };
    Yd.prototype.ii = function (a) {
        this.m = 0;
        Xd(this, 3, a)
    };
    var Xd = function (a, b, c) {
        if (0 == a.m) {
            if (a == c)b = 3, c = new TypeError("Promise cannot resolve to itself"); else {
                if (Vd(c)) {
                    a.m = 1;
                    b = c;
                    c = a.hi;
                    var d = a.ii;
                    b instanceof Yd ? he(b, ae(c || ba, d || null, a)) : b.then(c, d, a);
                    return
                }
                if (fa(c))try {
                    if (d = c.then, r(d)) {
                        ie(a, c, d);
                        return
                    }
                } catch (e) {
                    b = 3, c = e
                }
            }
            a.vb = c;
            a.m = b;
            a.A = null;
            ge(a);
            3 != b || c instanceof ce || je(a, c)
        }
    }, ie = function (a, b, c) {
        a.m = 1;
        var d = !1, e = function (b) {
            d || (d = !0, a.hi(b))
        }, f = function (b) {
            d || (d = !0, a.ii(b))
        };
        try {
            c.call(b, e, f)
        } catch (h) {
            f(h)
        }
    }, ge = function (a) {
        a.Cf || (a.Cf = !0, Sd(a.Ri,
            a))
    }, ee = function (a) {
        var b = null;
        a.Bb && (b = a.Bb, a.Bb = b.next, b.next = null);
        a.Bb || (a.qc = null);
        return b
    };
    Yd.prototype.Ri = function () {
        for (var a = null; a = ee(this);)fe(this, a, this.m, this.vb);
        this.Cf = !1
    };
    var fe = function (a, b, c, d) {
        b.Ub && (b.Ub.A = null);
        if (2 == c)b.Ge.call(b.context, d); else if (null != b.zd) {
            if (!b.pf)for (; a && a.me; a = a.A)a.me = !1;
            b.zd.call(b.context, d)
        }
        $d.put(b)
    }, je = function (a, b) {
        a.me = !0;
        Sd(function () {
            a.me && ke.call(null, b)
        })
    }, ke = Hd, ce = function (a) {
        pa.call(this, a)
    };
    y(ce, pa);
    ce.prototype.name = "cancel";
    var le = function (a, b) {
        M.call(this);
        this.ac = a || 1;
        this.Tc = b || l;
        this.sf = u(this.Eg, this);
        this.Uf = w()
    };
    y(le, M);
    g = le.prototype;
    g.enabled = !1;
    g.$ = null;
    g.setInterval = function (a) {
        this.ac = a;
        this.$ && this.enabled ? (this.stop(), this.start()) : this.$ && this.stop()
    };
    g.Eg = function () {
        if (this.enabled) {
            var a = w() - this.Uf;
            0 < a && a < .8 * this.ac ? this.$ = this.Tc.setTimeout(this.sf, this.ac - a) : (this.$ && (this.Tc.clearTimeout(this.$), this.$ = null), this.dispatchEvent("tick"), this.enabled && (this.$ = this.Tc.setTimeout(this.sf, this.ac), this.Uf = w()))
        }
    };
    g.start = function () {
        this.enabled = !0;
        this.$ || (this.$ = this.Tc.setTimeout(this.sf, this.ac), this.Uf = w())
    };
    g.stop = function () {
        this.enabled = !1;
        this.$ && (this.Tc.clearTimeout(this.$), this.$ = null)
    };
    g.i = function () {
        le.j.i.call(this);
        this.stop();
        delete this.Tc
    };
    var me = function (a, b, c) {
        if (r(a))c && (a = u(a, c)); else if (a && "function" == typeof a.handleEvent)a = u(a.handleEvent, a); else throw Error("Invalid listener argument");
        return 2147483647 < b ? -1 : l.setTimeout(a, b || 0)
    };
    var ne = function (a, b, c) {
        J.call(this);
        this.Zf = a;
        this.ac = b || 0;
        this.yc = c;
        this.Fi = u(this.Li, this)
    };
    y(ne, J);
    g = ne.prototype;
    g.ta = 0;
    g.i = function () {
        ne.j.i.call(this);
        this.stop();
        delete this.Zf;
        delete this.yc
    };
    g.start = function (a) {
        this.stop();
        this.ta = me(this.Fi, m(a) ? a : this.ac)
    };
    g.stop = function () {
        this.Na() && l.clearTimeout(this.ta);
        this.ta = 0
    };
    g.Na = function () {
        return 0 != this.ta
    };
    g.Li = function () {
        this.ta = 0;
        this.Zf && this.Zf.call(this.yc)
    };
    var oe = function (a) {
        J.call(this);
        this.yc = a;
        this.w = {}
    };
    y(oe, J);
    var pe = [];
    oe.prototype.dc = function (a, b, c, d) {
        n(b) || (b && (pe[0] = b.toString()), b = pe);
        for (var e = 0; e < b.length; e++) {
            var f = K(a, b[e], c || this.handleEvent, d || !1, this.yc || this);
            if (!f)break;
            this.w[f.key] = f
        }
        return this
    };
    oe.prototype.xe = function (a, b, c, d) {
        return qe(this, a, b, c, d)
    };
    var qe = function (a, b, c, d, e, f) {
        if (n(c))for (var h = 0; h < c.length; h++)qe(a, b, c[h], d, e, f); else {
            b = zd(b, c, d || a.handleEvent, e, f || a.yc || a);
            if (!b)return a;
            a.w[b.key] = b
        }
        return a
    };
    oe.prototype.Vc = function (a, b, c, d, e) {
        if (n(b))for (var f = 0; f < b.length; f++)this.Vc(a, b[f], c, d, e); else if (a = Cd(a, b, c || this.handleEvent, d, e || this.yc || this))L(a), delete this.w[a.key];
        return this
    };
    oe.prototype.Mc = function () {
        ab(this.w, L);
        this.w = {}
    };
    oe.prototype.i = function () {
        oe.j.i.call(this);
        this.Mc()
    };
    oe.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var re = function () {
        J.call(this);
        this.tg = {}
    };
    y(re, J);
    re.prototype.$f = null;
    re.prototype.rc = function (a) {
        a && a()
    };
    re.prototype.nb = function () {
        return !0
    };
    var se = function (a, b) {
        a.tg.expandable_ad = {Ca: b, Nh: !1}
    }, te = function (a, b) {
        if (b && p(a))try {
            return Jc(a)
        } catch (c) {
            return null
        } else if (!b && !p(a))return Mc(a);
        return a
    };
    re.prototype.i = function () {
        re.j.i.call(this);
        delete this.$f;
        delete this.tg;
        delete this.gh
    };
    var ue = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/, xe = function (a) {
        if (ve) {
            ve = !1;
            var b = l.location;
            if (b) {
                var c = b.href;
                if (c && (c = we(c)) && c != b.hostname)throw ve = !0, Error();
            }
        }
        return a.match(ue)
    }, ve = G, we = function (a) {
        return (a = xe(a)[3] || null) ? decodeURI(a) : a
    }, ye = function (a) {
        var b = xe(a);
        a = b[1];
        var c = b[2], d = b[3], b = b[4], e = "";
        a && (e += a + ":");
        d && (e += "//", c && (e += c + "@"), e += d, b && (e += ":" + b));
        return e
    }, ze = function (a, b) {
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
            var e =
                c[d].indexOf("="), f = null, h = null;
            0 <= e ? (f = c[d].substring(0, e), h = c[d].substring(e + 1)) : f = c[d];
            b(f, h ? decodeURIComponent(h.replace(/\+/g, " ")) : "")
        }
    }, Ae = function (a) {
        if (a[1]) {
            var b = a[0], c = b.indexOf("#");
            0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
            c = b.indexOf("?");
            0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
        }
        return a.join("")
    }, Be = function (a, b, c) {
        if (n(b))for (var d = 0; d < b.length; d++)Be(a, String(b[d]), c); else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }, Ce = function (a, b, c, d) {
        for (var e =
            c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b - 1);
            if (38 == f || 63 == f)if (f = a.charCodeAt(b + e), !f || 61 == f || 38 == f || 35 == f)return b;
            b += e + 1
        }
        return -1
    }, De = /#|$/, Ee = /[?&]($|#)/;
    var Fe = function (a, b) {
        var c;
        if (a instanceof Fe)this.Ga = m(b) ? b : a.Ga, Ge(this, a.wb), c = a.nc, He(this), this.nc = c, c = a.Ta, He(this), this.Ta = c, Ie(this, a.Pb), c = a.Ya, He(this), this.Ya = c, Je(this, a.sb.clone()), c = a.Xb, He(this), this.Xb = c; else if (a && (c = xe(String(a)))) {
            this.Ga = !!b;
            Ge(this, c[1] || "", !0);
            var d = c[2] || "";
            He(this);
            this.nc = Ke(d);
            d = c[3] || "";
            He(this);
            this.Ta = Ke(d, !0);
            Ie(this, c[4]);
            d = c[5] || "";
            He(this);
            this.Ya = Ke(d, !0);
            Je(this, c[6] || "", !0);
            c = c[7] || "";
            He(this);
            this.Xb = Ke(c)
        } else this.Ga = !!b, this.sb = new Le(null,
            0, this.Ga)
    };
    g = Fe.prototype;
    g.wb = "";
    g.nc = "";
    g.Ta = "";
    g.Pb = null;
    g.Ya = "";
    g.Xb = "";
    g.xj = !1;
    g.Ga = !1;
    g.toString = function () {
        var a = [], b = this.wb;
        b && a.push(Me(b, Ne, !0), ":");
        if (b = this.Ta) {
            a.push("//");
            var c = this.nc;
            c && a.push(Me(c, Ne, !0), "@");
            a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            b = this.Pb;
            null != b && a.push(":", String(b))
        }
        if (b = this.Ya)this.Ta && "/" != b.charAt(0) && a.push("/"), a.push(Me(b, "/" == b.charAt(0) ? Oe : Pe, !0));
        (b = this.sb.toString()) && a.push("?", b);
        (b = this.Xb) && a.push("#", Me(b, Qe));
        return a.join("")
    };
    g.resolve = function (a) {
        var b = this.clone(), c = !!a.wb;
        c ? Ge(b, a.wb) : c = !!a.nc;
        if (c) {
            var d = a.nc;
            He(b);
            b.nc = d
        } else c = !!a.Ta;
        c ? (d = a.Ta, He(b), b.Ta = d) : c = null != a.Pb;
        d = a.Ya;
        if (c)Ie(b, a.Pb); else if (c = !!a.Ya) {
            if ("/" != d.charAt(0))if (this.Ta && !this.Ya)d = "/" + d; else {
                var e = b.Ya.lastIndexOf("/");
                -1 != e && (d = b.Ya.substr(0, e + 1) + d)
            }
            e = d;
            if (".." == e || "." == e)d = ""; else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                for (var d = 0 == e.lastIndexOf("/", 0), e = e.split("/"), f = [], h = 0; h < e.length;) {
                    var k = e[h++];
                    "." == k ? d && h == e.length && f.push("") :
                        ".." == k ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d && h == e.length && f.push("")) : (f.push(k), d = !0)
                }
                d = f.join("/")
            } else d = e
        }
        c ? (He(b), b.Ya = d) : c = "" !== a.sb.toString();
        c ? Je(b, Ke(a.sb.toString())) : c = !!a.Xb;
        c && (a = a.Xb, He(b), b.Xb = a);
        return b
    };
    g.clone = function () {
        return new Fe(this)
    };
    var Ge = function (a, b, c) {
        He(a);
        a.wb = c ? Ke(b, !0) : b;
        a.wb && (a.wb = a.wb.replace(/:$/, ""))
    }, Ie = function (a, b) {
        He(a);
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)throw Error("Bad port number " + b);
            a.Pb = b
        } else a.Pb = null
    }, Je = function (a, b, c) {
        He(a);
        b instanceof Le ? (a.sb = b, a.sb.ug(a.Ga)) : (c || (b = Me(b, Re)), a.sb = new Le(b, 0, a.Ga))
    }, He = function (a) {
        if (a.xj)throw Error("Tried to modify a read-only Uri");
    };
    Fe.prototype.ug = function (a) {
        this.Ga = a;
        this.sb && this.sb.ug(a);
        return this
    };
    var Te = function (a) {
        return a instanceof Fe ? a.clone() : new Fe(a, void 0)
    }, Ke = function (a, b) {
        return a ? b ? decodeURI(a) : decodeURIComponent(a) : ""
    }, Me = function (a, b, c) {
        return p(a) ? (a = encodeURI(a).replace(b, Ue), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }, Ue = function (a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, Ne = /[#\/\?@]/g, Pe = /[\#\?:]/g, Oe = /[\#\?]/g, Re = /[\#\?@]/g, Qe = /#/g, Le = function (a, b, c) {
        this.ra = a || null;
        this.Ga = !!c
    }, Ve = function (a) {
        a.B || (a.B = new Vc, a.J = 0, a.ra && ze(a.ra,
            function (b, c) {
                a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
            }))
    };
    g = Le.prototype;
    g.B = null;
    g.J = null;
    g.add = function (a, b) {
        Ve(this);
        this.ra = null;
        a = We(this, a);
        var c = this.B.get(a);
        c || this.B.set(a, c = []);
        c.push(b);
        this.J++;
        return this
    };
    g.remove = function (a) {
        Ve(this);
        a = We(this, a);
        return this.B.dd(a) ? (this.ra = null, this.J -= this.B.get(a).length, this.B.remove(a)) : !1
    };
    g.clear = function () {
        this.B = this.ra = null;
        this.J = 0
    };
    g.dd = function (a) {
        Ve(this);
        a = We(this, a);
        return this.B.dd(a)
    };
    g.Zb = function () {
        Ve(this);
        for (var a = this.B.lb(), b = this.B.Zb(), c = [], d = 0; d < b.length; d++)for (var e = a[d], f = 0; f < e.length; f++)c.push(b[d]);
        return c
    };
    g.lb = function (a) {
        Ve(this);
        var b = [];
        if (p(a))this.dd(a) && (b = Xa(b, this.B.get(We(this, a)))); else {
            a = this.B.lb();
            for (var c = 0; c < a.length; c++)b = Xa(b, a[c])
        }
        return b
    };
    g.set = function (a, b) {
        Ve(this);
        this.ra = null;
        a = We(this, a);
        this.dd(a) && (this.J -= this.B.get(a).length);
        this.B.set(a, [b]);
        this.J++;
        return this
    };
    g.get = function (a, b) {
        var c = a ? this.lb(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };
    g.toString = function () {
        if (this.ra)return this.ra;
        if (!this.B)return "";
        for (var a = [], b = this.B.Zb(), c = 0; c < b.length; c++)for (var d = b[c], e = encodeURIComponent(String(d)), d = this.lb(d), f = 0; f < d.length; f++) {
            var h = e;
            "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
            a.push(h)
        }
        return this.ra = a.join("&")
    };
    g.clone = function () {
        var a = new Le;
        a.ra = this.ra;
        this.B && (a.B = this.B.clone(), a.J = this.J);
        return a
    };
    var We = function (a, b) {
        var c = String(b);
        a.Ga && (c = c.toLowerCase());
        return c
    };
    Le.prototype.ug = function (a) {
        a && !this.Ga && (Ve(this), this.ra = null, this.B.forEach(function (a, c) {
            var d = c.toLowerCase();
            c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.ra = null, this.B.set(We(this, d), Ya(a)), this.J += a.length))
        }, this));
        this.Ga = a
    };
    Le.prototype.extend = function (a) {
        for (var b = 0; b < arguments.length; b++)Zc(arguments[b], function (a, b) {
            this.add(b, a)
        }, this)
    };
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
     */
    var Xe = function (a, b) {
        this.Re = [];
        this.Oh = a;
        this.fh = b || null;
        this.od = this.Ma = !1;
        this.vb = void 0;
        this.yg = this.Ai = this.rf = !1;
        this.$e = 0;
        this.A = null;
        this.Wd = 0
    };
    Xe.prototype.cancel = function (a) {
        if (this.Ma)this.vb instanceof Xe && this.vb.cancel(); else {
            if (this.A) {
                var b = this.A;
                delete this.A;
                a ? b.cancel(a) : (b.Wd--, 0 >= b.Wd && b.cancel())
            }
            this.Oh ? this.Oh.call(this.fh, this) : this.yg = !0;
            this.Ma || this.kh(new Ye)
        }
    };
    Xe.prototype.Zg = function (a, b) {
        this.rf = !1;
        Ze(this, a, b)
    };
    var Ze = function (a, b, c) {
        a.Ma = !0;
        a.vb = c;
        a.od = !b;
        $e(a)
    }, bf = function (a) {
        if (a.Ma) {
            if (!a.yg)throw new af;
            a.yg = !1
        }
    };
    Xe.prototype.Ca = function (a) {
        bf(this);
        Ze(this, !0, a)
    };
    Xe.prototype.kh = function (a) {
        bf(this);
        Ze(this, !1, a)
    };
    var df = function (a, b, c) {
        cf(a, b, null, c)
    }, cf = function (a, b, c, d) {
        a.Re.push([b, c, d]);
        a.Ma && $e(a)
    };
    Xe.prototype.then = function (a, b, c) {
        var d, e, f = new Yd(function (a, b) {
            d = a;
            e = b
        });
        cf(this, d, function (a) {
            a instanceof Ye ? f.cancel() : e(a)
        });
        return f.then(a, b, c)
    };
    Ud(Xe);
    var ef = function (a, b) {
        b instanceof Xe ? df(a, u(b.Ci, b)) : df(a, function () {
            return b
        })
    };
    Xe.prototype.Ci = function (a) {
        var b = new Xe;
        cf(this, b.Ca, b.kh, b);
        a && (b.A = this, this.Wd++);
        return b
    };
    var ff = function (a) {
        return Ua(a.Re, function (a) {
            return r(a[1])
        })
    }, $e = function (a) {
        if (a.$e && a.Ma && ff(a)) {
            var b = a.$e, c = gf[b];
            c && (l.clearTimeout(c.ta), delete gf[b]);
            a.$e = 0
        }
        a.A && (a.A.Wd--, delete a.A);
        for (var b = a.vb, d = c = !1; a.Re.length && !a.rf;) {
            var e = a.Re.shift(), f = e[0], h = e[1], e = e[2];
            if (f = a.od ? h : f)try {
                var k = f.call(e || a.fh, b);
                m(k) && (a.od = a.od && (k == b || k instanceof Error), a.vb = b = k);
                Vd(b) && (d = !0, a.rf = !0)
            } catch (q) {
                b = q, a.od = !0, ff(a) || (c = !0)
            }
        }
        a.vb = b;
        d && (k = u(a.Zg, a, !0), d = u(a.Zg, a, !1), b instanceof Xe ? (cf(b, k, d), b.Ai = !0) : b.then(k, d));
        c && (b = new hf(b), gf[b.ta] = b, a.$e = b.ta)
    }, af = function () {
        pa.call(this)
    };
    y(af, pa);
    af.prototype.message = "Deferred has already fired";
    af.prototype.name = "AlreadyCalledError";
    var Ye = function () {
        pa.call(this)
    };
    y(Ye, pa);
    Ye.prototype.message = "Deferred was canceled";
    Ye.prototype.name = "CanceledError";
    var hf = function (a) {
        this.ta = l.setTimeout(u(this.jk, this), 0);
        this.Pi = a
    };
    hf.prototype.jk = function () {
        delete gf[this.ta];
        throw this.Pi;
    };
    var gf = {};
    var jf = {
        1: "NativeMessagingTransport",
        2: "FrameElementMethodTransport",
        3: "IframeRelayTransport",
        4: "IframePollingTransport",
        5: "FlashTransport",
        6: "NixTransport",
        7: "DirectTransport"
    }, kf = ["pu", "lru", "pru", "lpu", "ppu"], lf = {}, nf = function () {
        for (var a = 10, b = mf, c = b.length, d = ""; 0 < a--;)d += b.charAt(Math.floor(Math.random() * c));
        return d
    }, mf = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var of = function (a) {
        J.call(this);
        this.Ea = a || nc()
    };
    y(of, J);
    of.prototype.Md = 0;
    of.prototype.getType = function () {
        return this.Md
    };
    of.prototype.Jb = function () {
        return this.Ea.Jb()
    };
    of.prototype.getName = function () {
        return jf[String(this.Md)] || ""
    };
    var qf = function (a, b, c, d, e) {
        of.call(this, c);
        this.n = a;
        this.Lc = e || 2;
        this.hg = b || "*";
        this.Af = new oe(this);
        this.ud = new le(100, this.Jb());
        this.gg = !!d;
        this.Qb = new Xe;
        this.Rb = new Xe;
        this.Db = new Xe;
        this.Oi = nf();
        this.Ke = null;
        this.gg ? 1 == pf(this.n) ? ef(this.Db, this.Qb) : ef(this.Db, this.Rb) : (ef(this.Db, this.Qb), 2 == this.Lc && ef(this.Db, this.Rb));
        df(this.Db, this.Nj, this);
        this.Db.Ca(!0);
        this.Af.dc(this.ud, "tick", this.Hh)
    };
    y(qf, of);
    qf.prototype.wa = null;
    qf.prototype.zh = !1;
    qf.prototype.Md = 1;
    var rf = {};
    qf.prototype.Gd = 0;
    var tf = function (a) {
        var b = a.W().data;
        if (!p(b))return !1;
        var c = b.indexOf("|"), d = b.indexOf(":");
        if (-1 == c || -1 == d)return !1;
        var e = b.substring(0, c), c = b.substring(c + 1, d), b = b.substring(d + 1);
        if (d = lf[e])return d.Kg(c, b, a.W().origin), !0;
        var d = sf(b)[0], f;
        for (f in lf)if (a = lf[f], 1 == pf(a) && !a.nb() && "tp" == c && ("SETUP" == d || "SETUP_NTPV2" == d))return f = a, delete lf[f.name], f.name = e, lf[e] = f, a.Kg(c, b), !0;
        return !1
    }, uf = function (a) {
        if (2 == a.Lc && (null == a.wa || 2 == a.wa)) {
            var b;
            b = "SETUP_NTPV2," + a.Oi;
            a.send("tp", b)
        }
        null != a.wa && 1 != a.wa ||
        a.send("tp", "SETUP")
    }, vf = function (a, b) {
        if (2 != a.Lc || null != a.wa && 2 != a.wa || 2 != b) {
            if (null != a.wa && 1 != a.wa || 1 != b)return;
            a.send("tp", "SETUP_ACK")
        } else a.send("tp", "SETUP_ACK_NTPV2");
        a.Rb.Ma || a.Rb.Ca(!0)
    }, wf = function (a, b) {
        b > a.wa && (a.wa = b);
        1 == a.wa && (a.Rb.Ma || a.gg || a.Rb.Ca(!0), a.Ke = null)
    };
    g = qf.prototype;
    g.rc = function () {
        var a = this.Jb(), b = ia(a), c = rf[b];
        ea(c) || (c = 0);
        0 == c && K(a.postMessage ? a : a.document, "message", tf, !1, qf);
        rf[b] = c + 1;
        this.zh = !0;
        this.Hh()
    };
    g.Hh = function () {
        var a = 0 == pf(this.n);
        this.gg && a || this.n.nb() || this.jb ? this.ud.stop() : (this.ud.start(), uf(this))
    };
    g.send = function (a, b) {
        var c = this.n.Ob;
        c && (this.send = function (a, b) {
            var f = this, h = this.n.name;
            this.Gd = me(function () {
                f.Gd = 0;
                try {
                    var k = c.postMessage ? c : c.document;
                    k.postMessage && k.postMessage(h + "|" + a + ":" + b, f.hg)
                } catch (q) {
                }
            }, 0)
        }, this.send(a, b))
    };
    g.Nj = function () {
        var a = this.n, b = 1 == this.Lc || 1 == this.wa ? 200 : void 0;
        a.nb() || a.Eb && a.Eb.Na() || (a.m = 2, ad(a.Eb), m(b) ? (a.Eb = new ne(a.uf, b), a.Eb.start()) : (a.Eb = null, a.uf()))
    };
    g.i = function () {
        if (this.zh) {
            var a = this.Jb(), b = ia(a), c = rf[b];
            rf[b] = c - 1;
            1 == c && Ad(a.postMessage ? a : a.document, "message", tf, !1, qf)
        }
        this.Gd && (l.clearTimeout(this.Gd), this.Gd = 0);
        ad(this.Af);
        delete this.Af;
        ad(this.ud);
        delete this.ud;
        this.Qb.cancel();
        delete this.Qb;
        this.Rb.cancel();
        delete this.Rb;
        this.Db.cancel();
        delete this.Db;
        delete this.send;
        qf.j.i.call(this)
    };
    var sf = function (a) {
        a = a.split(",");
        a[1] = a[1] || null;
        return a
    };
    var yf = function (a, b) {
        re.call(this);
        for (var c = 0, d; d = kf[c]; c++)if (d in a && !/^https?:\/\//.test(a[d]))throw Error("URI " + a[d] + " is invalid for field " + d);
        this.ba = a;
        this.name = this.ba.cn || nf();
        this.Ea = b || nc();
        this.de = [];
        this.ig = new oe(this);
        a.lpu = a.lpu || ye(this.Ea.Jb().location.href) + "/robots.txt";
        a.ppu = a.ppu || ye(a.pu || "") + "/robots.txt";
        lf[this.name] = this;
        Cd(window, "unload", xf) || zd(window, "unload", xf)
    };
    y(yf, re);
    var zf = /^%*tp$/, Af = /^%+tp$/;
    g = yf.prototype;
    g.Eb = null;
    g.jc = null;
    g.N = null;
    g.m = 1;
    g.nb = function () {
        return 2 == this.m
    };
    g.Ob = null;
    g.pe = null;
    g.getConfig = function () {
        return this.ba
    };
    g.rc = function (a) {
        this.uf = a || ba;
        3 == this.m && (this.m = 1);
        this.jc ? df(this.jc, this.Yg) : this.Yg()
    };
    g.Yg = function () {
        this.jc = null;
        this.ba.ifrid && (this.pe = this.Ea.sa(this.ba.ifrid));
        if (this.pe) {
            var a = this.pe.contentWindow;
            a || (a = window.frames[this.ba.ifrid]);
            this.Ob = a
        }
        if (!this.Ob) {
            if (window == window.top)throw Error("CrossPageChannel: Can't connect, peer window-object not set.");
            this.Ob = window.parent
        }
        if (!this.N) {
            this.ba.tp || (this.ba.tp = r(document.postMessage) || r(window.postMessage) || F && window.postMessage ? 1 : Yb ? 2 : F && this.ba.pru ? 3 : 4);
            switch (this.ba.tp) {
                case 1:
                    this.N = new qf(this, this.ba.ph, this.Ea, !!this.ba.osh,
                        this.ba.nativeProtocolVersion || 2);
                    break;
                case 6:
                    this.N = null;
                    break;
                case 2:
                    this.N = null;
                    break;
                case 3:
                    this.N = null;
                    break;
                case 4:
                    this.N = null
            }
            if (!this.N)throw Error("CrossPageChannel: No suitable transport found!");
        }
        for (this.N.rc(); 0 < this.de.length;)this.de.shift()()
    };
    g.close = function () {
        this.jc && (this.jc.cancel(), this.jc = null);
        this.de.length = 0;
        this.ig.Mc();
        this.m = 3;
        ad(this.N);
        this.uf = this.N = null;
        ad(this.Eb);
        this.Eb = null
    };
    g.send = function (a, b) {
        if (this.nb()) {
            var c;
            try {
                c = !!this.Ob && !Boolean(this.Ob.closed)
            } catch (d) {
                c = !1
            }
            c ? (fa(b) && (b = Mc(b)), this.N.send(Bf(a), b)) : this.close()
        }
    };
    g.Kg = function (a, b, c) {
        if (this.jc)this.de.push(u(this.Kg, this, a, b, c)); else {
            var d = this.ba.ph;
            if ((sa(null == c ? "" : String(c)) || sa(null == d ? "" : String(d)) || c == this.ba.ph) && !this.jb && 3 != this.m)if (a && "tp" != a)this.nb() && (a = a.replace(/%[0-9a-f]{2}/gi, decodeURIComponent), a = Af.test(a) ? a.substring(1) : a, a = (c = this.tg[a]) ? c : this.gh ? {
                Ca: la(this.gh, a),
                Nh: fa(b)
            } : null) && (b = te(b, a.Nh), null != b && a.Ca(b)); else switch (a = this.N, c = sf(b), b = c[1], c[0]) {
                case "SETUP_ACK":
                    wf(a, 1);
                    a.Qb.Ma || a.Qb.Ca(!0);
                    break;
                case "SETUP_ACK_NTPV2":
                    2 ==
                    a.Lc && (wf(a, 2), a.Qb.Ma || a.Qb.Ca(!0));
                    break;
                case "SETUP":
                    wf(a, 1);
                    vf(a, 1);
                    break;
                case "SETUP_NTPV2":
                    2 == a.Lc && (c = a.wa, wf(a, 2), vf(a, 2), 1 != c && null == a.Ke || a.Ke == b || uf(a), a.Ke = b)
            }
        }
    };
    var Bf = function (a) {
        zf.test(a) && (a = "%" + a);
        return a.replace(/[%:|]/g, encodeURIComponent)
    }, pf = function (a) {
        var b = a.ba.role;
        return ea(b) ? b : window.parent == a.Ob ? 1 : 0
    };
    yf.prototype.i = function () {
        this.close();
        this.pe = this.Ob = null;
        delete lf[this.name];
        ad(this.ig);
        delete this.ig;
        yf.j.i.call(this)
    };
    var xf = function () {
        for (var a in lf)ad(lf[a])
    };
    var Cf = function () {
        return G ? "Webkit" : Yb ? "Moz" : F ? "ms" : Xb ? "O" : null
    }, Df = function (a, b) {
        if (b && a in b)return a;
        var c = Cf();
        return c ? (c = c.toLowerCase(), c += Fa(a), !m(b) || c in b ? c : null) : null
    };
    var Ef = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    g = Ef.prototype;
    g.clone = function () {
        return new Ef(this.top, this.right, this.bottom, this.left)
    };
    g.contains = function (a) {
        return this && a ? a instanceof Ef ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    g.expand = function (a, b, c, d) {
        fa(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
        return this
    };
    g.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    g.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    g.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    g.translate = function (a, b) {
        a instanceof C ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, ea(b) && (this.top += b, this.bottom += b));
        return this
    };
    g.scale = function (a, b) {
        var c = ea(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= c;
        this.bottom *= c;
        return this
    };
    var N = function (a, b, c) {
            if (p(b))(b = Ff(a, b)) && (a.style[b] = c); else for (var d in b) {
                c = a;
                var e = b[d], f = Ff(c, d);
                f && (c.style[f] = e)
            }
        }, Gf = {}, Ff = function (a, b) {
            var c = Gf[b];
            if (!c) {
                var d = Ea(b), c = d;
                void 0 === a.style[d] && (d = Cf() + Fa(d), void 0 !== a.style[d] && (c = d));
                Gf[b] = c
            }
            return c
        }, Hf = function (a, b) {
            var c = mc(a);
            return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
        }, If = function (a, b) {
            return Hf(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style &&
                a.style[b]
        }, Jf = function (a) {
            return If(a, "position")
        }, Lf = function (a, b, c) {
            var d;
            b instanceof C ? (d = b.x, b = b.y) : (d = b, b = c);
            a.style.left = Kf(d, !1);
            a.style.top = Kf(b, !1)
        }, Mf = function (a) {
            var b;
            try {
                b = a.getBoundingClientRect()
            } catch (c) {
                return {left: 0, top: 0, right: 0, bottom: 0}
            }
            F && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
            return b
        }, O = function (a) {
            if (1 == a.nodeType)return a = Mf(a), new C(a.left, a.top);
            var b = r(a.W),
                c = a;
            a.targetTouches && a.targetTouches.length ? c = a.targetTouches[0] : b && a.W().targetTouches && a.W().targetTouches.length && (c = a.W().targetTouches[0]);
            return new C(c.clientX, c.clientY)
        }, Nf = function (a, b, c) {
            if (b instanceof D)c = b.height, b = b.width; else if (void 0 == c)throw Error("missing height argument");
            a.style.width = Kf(b, !0);
            a.style.height = Kf(c, !0)
        }, Kf = function (a, b) {
            "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
            return a
        }, Pf = function (a) {
            var b = Of;
            if ("none" != If(a, "display"))return b(a);
            var c = a.style, d = c.display,
                e = c.visibility, f = c.position;
            c.visibility = "hidden";
            c.position = "absolute";
            c.display = "inline";
            a = b(a);
            c.display = d;
            c.position = f;
            c.visibility = e;
            return a
        }, Of = function (a) {
            var b = a.offsetWidth, c = a.offsetHeight, d = G && !b && !c;
            return m(b) && !d || !a.getBoundingClientRect ? new D(b, c) : (a = Mf(a), new D(a.right - a.left, a.bottom - a.top))
        }, Qf = function (a, b) {
            var c = a.style;
            "opacity"in c ? c.opacity = b : "MozOpacity"in c ? c.MozOpacity = b : "filter"in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")")
        }, Q = function (a, b) {
            a.style.display = b ? "" :
                "none"
        }, Rf = Yb ? "MozUserSelect" : G ? "WebkitUserSelect" : null, Sf = function (a) {
            var b = a.getElementsByTagName("*");
            if (Rf) {
                var c = "none";
                a.style[Rf] = c;
                if (b) {
                    a = 0;
                    for (var d; d = b[a]; a++)d.style[Rf] = c
                }
            } else if (F || Xb)if (c = "on", a.setAttribute("unselectable", c), b)for (a = 0; d = b[a]; a++)d.setAttribute("unselectable", c)
        }, Tf = function (a, b, c, d) {
            if (/^\d+px?$/.test(b))return parseInt(b, 10);
            var e = a.style[c], f = a.runtimeStyle[c];
            a.runtimeStyle[c] = a.currentStyle[c];
            a.style[c] = b;
            b = a.style[d];
            a.style[c] = e;
            a.runtimeStyle[c] = f;
            return b
        },
        Uf = function (a, b) {
            var c = a.currentStyle ? a.currentStyle[b] : null;
            return c ? Tf(a, c, "left", "pixelLeft") : 0
        }, Vf = {thin: 2, medium: 4, thick: 6}, Wf = function (a, b) {
            if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))return 0;
            var c = a.currentStyle ? a.currentStyle[b + "Width"] : null;
            return c in Vf ? Vf[c] : Tf(a, c, "left", "pixelLeft")
        };
    var Xf = function () {
        this.ce = []
    }, S = function (a) {
        return a + "px"
    }, Yf = function (a) {
        setTimeout(function () {
            N(a, {transition: "opacity 5000ms 3000ms", opacity: 0})
        }, 0)
    }, T = function (a, b, c, d, e) {
        a.ce.push(new Zf(b, c, d, e))
    }, U = function (a, b, c, d, e) {
        T(a, b, c, S(d), e)
    }, $f = function (a, b) {
        T(a, b, "zIndex", 999999)
    }, ag = function (a) {
        for (var b = a.ce.length - 1; 0 <= b; b--) {
            var c = a.ce[b];
            c.Qd ? (c.eg.style.removeProperty(c.ib), c.eg.style.setProperty(c.ib, c.Rh, c.Pj)) : c.eg.style[c.ib] = c.Rh
        }
        a.ce.length = 0
    }, Zf = function (a, b, c, d) {
        this.eg = a;
        this.ib = (this.Qd =
            m(d) && a.style && a.style.getPropertyPriority) ? String(b).replace(/([A-Z])/g, "-$1").toLowerCase() : b;
        this.Rh = this.Qd ? a.style.getPropertyValue(this.ib) : a.style[this.ib];
        this.Pj = this.Qd ? a.style.getPropertyPriority(this.ib) : null;
        this.Qd ? (a.style.removeProperty(this.ib), a.style.setProperty(this.ib, c, d)) : a.style[this.ib] = c
    };
    var bg = {NORMAL: 0, LIGHTBOX: 1, EXPANSION_MODES: 2}, cg = function (a) {
        return (a || z.location.protocol + "//" + z.location.host) + "/robots.txt"
    }, dg = function (a, b) {
        var c = a.match("[?&#]" + b + "=([^&#]*)");
        return c ? decodeURIComponent(c[1]) : void 0
    }, eg = function () {
        var a = V().MOBILE_BROWSER_CLASS;
        if (null != a && 0 <= a)return 3 != a;
        a = A.navigator.userAgent;
        return Zb || $b || Yb && (/Mobile/.test(a) || /Tablet/.test(a)) || F && /IEMobile/.test(a)
    }, V = function () {
        return A.CREATIVE_TOOLSET_PARAMS || {}
    }, fg = function () {
        var a = V();
        return {
            SAMPLE_VIEWPORT_SIZES: a.SAMPLE_VIEWPORT_SIZES,
            JS_EXPERIMENT_LABELS: a.JS_EXPERIMENT_LABELS, MOBILE_BROWSER_CLASS: a.MOBILE_BROWSER_CLASS
        }
    }, gg = function (a, b, c) {
        var d = Na(z.URL);
        c = c ? encodeURIComponent : function (a) {
            return a
        };
        return a + (-1 == a.indexOf(c("?")) ? c("?") : c("&")) + c([d ? "google_debug&" : "", "xpc=", b, "&p=", encodeURIComponent(z.location.protocol), "//", encodeURIComponent(z.location.host)].join(""))
    };
    var ig = function (a, b) {
        hg("ct-error", a, b, void 0)
    }, jg = function (a, b, c) {
        hg("ct-info", a, b, c)
    }, hg = function (a, b, c, d) {
        c = gb(c || {});
        c.eventType = b;
        b = V();
        m(b.EXPANSION_CLICK_INFO) && (c.ai = b.EXPANSION_CLICK_INFO);
        Ec(a, c, d || .01)
    };
    var kg = [], lg = function () {
        return 0 < (A.studioV2 && A.studioV2.creativeCount)
    }, mg = function (a) {
        try {
            return !!a.contentWindow.studio && !!a.contentWindow.studio.sdk
        } catch (b) {
            return !1
        }
    }, ng = function () {
        if (!lg())return !1;
        B(z.getElementsByTagName("iframe"), function (a) {
            if (mg(a))return !1
        });
        return !0
    }, og = function (a, b, c) {
        lg() && B(z.getElementsByTagName("iframe"), function (d) {
            mg(d) ? kg.push(K(d.contentDocument.body, a, b, c, void 0)) : kg.push(K(d, "load", function () {
                mg(d) && kg.push(K(d.contentDocument.body, a, b, c, void 0))
            }))
        })
    };
    var pg = E("Firefox"), qg = Wb() || E("iPod"), rg = E("iPad"), sg = E("Android") && !(Ub() || E("Firefox") || Sb() || E("Silk"));
    Ub();
    var tg = E("Safari") && !(Ub() || E("Coast") || Sb() || Tb() || E("Silk") || E("Android")) && !(Wb() || E("iPad") || E("iPod"));
    var ug = function () {
        return m(z.body.onmouseenter) && m(z.body.onmouseleave) && !tg
    }, vg = [], wg = "touchstart touchend click mousedown mouseup vclick".split(" "), xg = new M, yg = !1, zg = !1, Ag = function () {
        return zg || !ng()
    }, Eg = function () {
        yg || (B(wg, function (a) {
            vg.push(K(z.body, a, function (b) {
                Gd(xg, a, !0, Bg(b))
            }, !0));
            vg.push(K(z.body, a, function (b) {
                Gd(xg, a, !1, Bg(b))
            }, !1));
            og(a, function (b) {
                zg || Gd(xg, a, !0, Bg(b))
            }, !0);
            og(a, function (b) {
                zg || Gd(xg, a, !1, Bg(b))
            }, !1)
        }), Cg(), yg = !0, Dg())
    }, Dg = function () {
        lg() && me(function () {
                zg || jg("remote-events-not-enabled")
            },
            3E3)
    }, Gg = function (a, b, c, d) {
        Va(wg, a) && (Eg(), a = K(xg, a, b, c, d), Fg(d, a))
    }, Hg = function (a) {
        null !== a && "object" == typeof a && p(a.type) && Va(wg, a.type) && zg && xg.dispatchEvent(Bg(a))
    }, Bg = function (a) {
        a = r(a.W) ? a : new hd(a);
        a.target = null;
        a.srcElement = null;
        a.currentTarget = null;
        a.relatedTarget = null;
        return a
    }, Ig = function (a) {
        zg = a
    }, Jg = function (a) {
        return r(a.W) ? a.W() : a
    }, Cg = function () {
        var a = null, b = null;
        vg.push(K(xg, "touchstart", function (c) {
            c = Jg(c);
            da(c.touches) && 0 != c.touches.length && (a = w(), c = c.touches[0], b = new C(c.screenX,
                c.screenY))
        }));
        vg.push(K(xg, "touchend", function (c) {
            if (null != b && null != a && (c = Jg(c), da(c.changedTouches) && 0 != c.changedTouches.length)) {
                c = c.changedTouches[0];
                var d = new C(c.screenX, c.screenY), e = Nb(b, d), f = w() - a;
                500 >= f && 9 >= e && (e = z.createEvent("CustomEvent"), e.initEvent("vclick", !0, !0), lb(e, {
                    clientX: c.clientX,
                    clientY: c.clientY,
                    pl: b,
                    ol: d,
                    duration: f
                }), xg.dispatchEvent(e));
                b = a = null
            }
        }))
    }, Fg = function (a, b) {
        for (var c = 1; c < arguments.length; c++)da(arguments[c]) ? la(Fg, a).apply(this, arguments[c]) : function (b) {
            $c(a, function () {
                L(b)
            })
        }(arguments[c])
    };
    var Kg = {
        CATBOX_USL: "catbox_usl",
        CATBOX_OFFER_ID: "catbox_offer_id",
        CATBOX_URL: "catbox_url",
        CATBOX_VANITY_ID: "catbox_vanity_id"
    }, Lg = {ENGAGEMENT_START: "engstart", ENGAGEMENT_END: "engend"}, Mg = {
        CLICK_TO_EXPAND: 29,
        HOVER_TO_EXPAND: 30,
        GENERIC_ENGAGEMENT: 32,
        VIDEO_PLAY: 33,
        VIDEO_UNMUTE: 34,
        VIDEO_VIEW_TIMER: 35,
        MOUSE_HOVER: 36,
        SWIPE: 37,
        VIDEO_REPLAY: 10001,
        VIDEO_PAUSE: 10002,
        VIDEO_STOP: 10003,
        VIDEO_MUTE: 10004,
        VIDEO_MIDPOINT: 10005,
        VIDEO_COMPLETE: 10006,
        VIDEO_INTERACTION: 10007,
        FULL_SCREEN: 10008,
        MANUAL_CLOSE: 10009,
        CONTRACTION: 10010,
        VIDEO_FIRST_QUARTILE: 10011,
        VIDEO_THIRD_QUARTILE: 10012,
        SUCCESSFUL_ENGAGEMENT: 10025,
        ENGAGEMENT_END: 10026,
        VIDEO2_START: 10027,
        VIDEO2_FIRST_QUARTILE: 10028,
        VIDEO2_MIDPOINT: 10029,
        VIDEO2_THIRD_QUARTILE: 10030,
        VIDEO2_COMPLETE: 10031,
        VIDEO3_START: 10032,
        VIDEO3_FIRST_QUARTILE: 10033,
        VIDEO3_MIDPOINT: 10034,
        VIDEO3_THIRD_QUARTILE: 10035,
        VIDEO3_COMPLETE: 10036,
        VIDEO4_START: 10037,
        VIDEO4_FIRST_QUARTILE: 10038,
        VIDEO4_MIDPOINT: 10039,
        VIDEO4_THIRD_QUARTILE: 10040,
        VIDEO4_COMPLETE: 10041,
        VIDEO5_START: 10042,
        VIDEO5_FIRST_QUARTILE: 10043,
        VIDEO5_MIDPOINT: 10044,
        VIDEO5_THIRD_QUARTILE: 10045,
        VIDEO5_COMPLETE: 10046,
        ASSETS_LOADED: 10047,
        RENDERING_COMPLETED: 10048
    }, Ng = {
        CATBOX_VIEW_SHEET: 10177,
        CATBOX_VIEW_OFFER: 10178,
        CATBOX_CLICK_OFFER_ATTACHMENT: 10179,
        CATBOX_CLICK_IMAGE_ATTACHMENT: 10180,
        CATBOX_CLICK_VIDEO_ATTACHMENT: 10181,
        CATBOX_CLICK_OFFER_GROUP_ATTACHMENT: 10182,
        CATBOX_CLICK_IMAGE_GROUP_ATTACHMENT: 10183,
        CATBOX_CLICK_WEB_SNIPPET_ATTACHMENT: 10184,
        CATBOX_CLICK_CALL_TO_ORDER_ATTACHMENT: 10185,
        CATBOX_CLICK_THROUGH_OFFER: 10197
    }, Og = {GDN_REPORTING_DEFERRED: 10199};
    var ib = {
        Ik: "lb_reexpand_overlay",
        cl: "1-point-5-click",
        Bk: "delay_after_notifier_finishes",
        Ak: "studio_events",
        Vk: "recenter_on_resize",
        Wk: "report_page_unload",
        Tk: "no_expansion_animation",
        Lk: "engagement_ad_interstitial",
        Ok: "log_ignored_events",
        Jk: "ignore_page_visibility_events",
        Zk: "swipe_to_expand",
        vk: "circle_swipe_target",
        Kk: "instant_target_animation",
        $k: "swipe_unhook_vibration",
        Yk: "stacking_context_fixes"
    }, W = function (a) {
        var b = V().JS_EXPERIMENT_LABELS;
        return p(b) ? Va(b.split(","), a) : !1
    }, Pg = function () {
        var a =
            [], b = V().JS_EXPERIMENT_LABELS;
        if (p(b)) {
            var c = jb();
            B(b.split(","), function (b) {
                sa(b) || b in c || a.push(b)
            })
        }
        $a(a);
        return a
    };
    var Qg = function () {
        this.Qc = {}
    }, X = function (a, b, c) {
        var d;
        if (fa(c)) {
            var e;
            "touchend" == c.type || "touchcancel" == c.type ? c.changedTouches && 0 < c.changedTouches.length ? (d = c.changedTouches[0].clientX, e = c.changedTouches[0].clientY) : r(c.W) && (c = c.W(), c.changedTouches && 0 < c.changedTouches.length && (d = c.changedTouches[0].clientX, e = c.changedTouches[0].clientY)) : (e = O(c), d = e.x, e = e.y);
            d = m(d) && m(e) ? d + "," + e : ""
        } else d = c + "";
        d && (a.Qc[b] = d)
    }, Sg = function (a) {
        var b = {};
        Ja(a.Qc, u(function (a, d) {
            Rg(d) && (b[d] = a)
        }, a));
        return b
    }, Rg = function (a) {
        var b =
            V().JS_SPAM_SIGNALS;
        a = Tg[a];
        return m(a) && null != b && (b & a) == a
    }, Tg = {zcf: 8192, zcr: 16384, clkt: 16, zbq: 262144, gcf: 32768, gcr: 65536, gq: 4096, gv: 524288};
    var Wg = function () {
        this.be = A.jstiming;
        this.Fg = {};
        this.be && ab(Ug, function (a) {
            Vg(this, a)
        }, this)
    }, $g = function (a, b) {
        if (V().MEASURE_LATENCY && a.be) {
            var c = Xg[b];
            c && (c = a.Fg[c]) && (Yg[b] ? ma(c.tick("start")) : ma(c.tick(b)), Zg[b] && a.reportEvents())
        }
    }, Vg = function (a, b) {
        var c = new window.jstiming.Timer;
        c.name = "loadcreativetoolset";
        a.Fg[b] = c
    };
    Wg.prototype.reportEvents = function () {
        if (V().MEASURE_LATENCY && this.be) {
            var a = V();
            ab(this.Fg, function (b, c) {
                var d = b.t;
                !d || 2 > Object.keys(d).length || (ma(this.be.report(b, {e: a.JS_EXPERIMENT_LABELS})), Vg(this, c))
            }, this)
        }
    };
    var Ug = {Qk: "notifier", Hk: "expansion", xk: "collapse"}, Xg = {
        notifier_start: "notifier",
        notifier_completed: "notifier",
        about_to_expand: "expansion",
        expansion_requested: "expansion",
        expansion_completed: "expansion",
        expansion_cancelled: "expansion",
        collapse_requested: "collapse",
        collapsed: "collapse",
        creative_loaded: "expansion",
        creative_rendered: "expansion"
    }, Zg = {
        notifier_completed: !0,
        expansion_completed: !0,
        expansion_cancelled: !0,
        collapsed: !0
    }, Yg = {notifier_start: !0, expansion_requested: !0, collapse_requested: !0};
    var Y = function (a) {
        M.call(this);
        this.S = !1;
        this.X = this.aboutToExpandCallback = this.expansionCallback = null;
        this.L = a.L;
        this.xf = a.jh;
        this.of = a.ui;
        this.$f = null;
        this.$c = a.zi || a.jh;
        this.$c > this.xf && (this.$c = this.xf);
        var b = z.body;
        this.fd = z.createElement("div");
        b.appendChild(this.fd);
        this.pa = 0;
        this.u = a.ck || new Qg;
        this.sd = a.zj;
        this.v = a.kb;
        this.da = 0
    };
    y(Y, M);
    var ah = function () {
        var a;
        a = p("engagement_css_link") ? document.getElementById("engagement_css_link") : "engagement_css_link";
        if (!fa(a) || 1 != a.nodeType) {
            a = z.getElementsByTagName("head");
            a = 0 < a.length ? a[0] : z.body.parentNode.appendChild(z.createElement("head"));
            var b = z.createElement("link");
            b.rel = "stylesheet";
            b.type = "text/css";
            b.href = V().ENGAGEMENT_CSS_URL || "//pagead2.googlesyndication.com/pagead/css/engagement.css";
            b.id = "engagement_css_link";
            a.appendChild(b);
            b = z.createElement("link");
            b.rel = "stylesheet";
            b.type =
                "text/css";
            b.href = "//fonts.googleapis.com/css?family=Roboto:300,400,500,700";
            a.appendChild(b)
        }
    };
    Y.prototype.i = function () {
        I(this.fd);
        ad(this.X);
        this.X = null;
        Y.j.i.call(this)
    };
    Y.prototype.remove = function () {
        if (4 == this.pa || 0 == this.pa)this.u.Qc = {};
        this.dispatchEvent(new dd("removed", this))
    };
    Y.prototype.jd = function () {
        return this.da
    };
    Y.prototype.getContext = function () {
        return this.pa
    };
    var ch = function (a, b) {
        Va(bh[a.pa], b) || ig("notifierContextTransitionError", {old: a.pa, "new": b, not: a.L});
        a.pa = b;
        a.sd && (1 == a.pa ? $g(a.sd, "notifier_start") : 2 == a.pa && $g(a.sd, "notifier_completed"))
    };
    g = Y.prototype;
    g.Na = function () {
        return 1 == this.pa
    };
    g.re = function () {
        return 1 == this.pa || 2 == this.pa
    };
    g.isExpanded = function () {
        return 3 == this.pa
    };
    g.xb = function (a) {
        ch(this, a ? 3 : 0);
        this.remove()
    };
    g.Yb = function () {
        return this.xf
    };
    g.vc = function () {
        return this.L
    };
    var dh = function (a) {
        a.S && a.expansionCallback && (ch(a, 2), a.remove(), a.expansionCallback(), a.expansionCallback = null)
    };
    Y.prototype.jg = function () {
        this.aboutToExpandCallback && (Va(bh[this.pa], 2) && this.aboutToExpandCallback(), this.aboutToExpandCallback = null);
        this.sd && $g(this.sd, "about_to_expand")
    };
    var fh = function (a, b, c) {
        var d = A.CREATIVE_TOOLSET_PARAMS;
        if (m(d) && m(d.EXPANSION_CLICK_INFO)) {
            var e = eh(a.v, !1);
            null != c && lb(e, c);
            ab(e, function (a, b) {
                e[b] = String(a)
            });
            jg(b, e, 1)
        }
    }, bh = {0: [1], 1: [2, 4], 4: [0], 2: [3], 3: [0]};
    var gh = function (a, b) {
        this.xh = this.Sc = 0;
        this.Kd = this.zb = null;
        this.Ue = 0;
        this.Sc = 0 < a ? a : 0;
        this.xh = b && 0 < b && b < this.Sc ? this.Sc - b : 0
    };
    gh.prototype.start = function (a, b, c) {
        null !== this.zb || null !== this.Kd || 0 >= this.Sc || (this.Ue = w(), this.zb = me(b, this.Sc, a), c && (this.Kd = me(c, this.xh, a)))
    };
    gh.prototype.clear = function () {
        null !== this.zb && (l.clearTimeout(this.zb), this.zb = null);
        null !== this.Kd && (l.clearTimeout(this.Kd), this.Kd = null);
        this.Ue = 0
    };
    var hh = function (a) {
        return a.Ue ? w() - a.Ue : 0
    };
    var ih = function (a) {
        Y.call(this, a);
        this.wd = 0;
        this.T = null;
        this.ef = new gh(50);
        a = z.body;
        ug() ? Fg(this, K(a, "mouseenter", this.De, !1, this), K(a, "mouseleave", this.Ce, !1, this)) : Fg(this, K(a, "mouseover", this.De, !0, this), K(a, "mouseout", this.Ce, !0, this))
    };
    y(ih, Y);
    g = ih.prototype;
    g.De = function (a) {
        this.wd || (this.wd = w(), a && (X(this.u, "zcf", a), X(this.u, "zcr", a)))
    };
    g.i = function () {
        I(this.T);
        this.T = null;
        ih.j.i.call(this)
    };
    g.Ce = function () {
        this.wd = 0
    };
    g.remove = function () {
        ih.j.remove.call(this);
        this.S = !1
    };
    g.xb = function (a) {
        ih.j.xb.call(this, a);
        var b = W("lb_reexpand_overlay");
        !a && A.innerWidth && (Yb || b) && (this.T = document.createElement("div"), N(this.T, {
            position: "absolute",
            width: A.innerWidth + "px",
            height: A.innerHeight + "px",
            opacity: 0,
            top: 0,
            zIndex: 999999
        }), K(this.T, "mouseover", function () {
            z.body.removeChild(this.T);
            this.T = null
        }, !0, this), z.body.appendChild(this.T))
    };
    g.start = function (a, b) {
        this.ef.clear();
        this.S ? this.Ad(a, b) : this.ef.start(this, la(this.Ad, a, b))
    };
    g.Ad = function (a, b) {
        this.ef.clear();
        this.da = 0;
        this.S && (this.expansionCallback = a, this.aboutToExpandCallback = b, ch(this, 1), this.Ng())
    };
    var jh = function (a) {
        ih.call(this, a);
        this.gd = new gh(3E3);
        Gg("mousedown", this.vd, !0, this);
        this.L = "DesktopClickToExpand"
    };
    y(jh, ih);
    g = jh.prototype;
    g.i = function () {
        this.gd.clear();
        jh.j.i.call(this)
    };
    g.vd = function () {
        this.isExpanded() || (this.S = !0, this.gd.clear(), this.gd.start(this, this.Vi))
    };
    g.Vi = function () {
        this.S = !1
    };
    g.Ib = function () {
        return 29
    };
    g.remove = function () {
        jh.j.remove.call(this);
        this.gd.clear()
    };
    g.Ng = function () {
        this.gd.clear();
        this.da = 1;
        dh(this)
    };
    var kh = function (a, b) {
        n(b) || (b = [b]);
        var c = Ta(b, function (a) {
            return p(a) ? a : a.fa + " " + a.duration + "s " + a.timing + " " + a.ca + "s"
        });
        N(a, "transition", c.join(","))
    }, lh = Sc(function () {
        if (F)return H("10.0");
        var a = document.createElement("div"), b = G ? "-webkit" : Yb ? "-moz" : F ? "-ms" : Xb ? "-o" : null, c = {transition: "opacity 1s linear"};
        b && (c[b + "-transition"] = "opacity 1s linear");
        b = {style: c};
        if (!Fb.test("div"))throw Error("Invalid tag name <div>.");
        if ("div"in Hb)throw Error("Tag name <div> is not allowed for SafeHtml.");
        var c = null,
            d = "<div";
        if (b)for (var e in b) {
            if (!Fb.test(e))throw Error('Invalid attribute name "' + e + '".');
            var f = b[e];
            if (null != f) {
                var h;
                h = e;
                if (f instanceof qb)f = rb(f); else if ("style" == h.toLowerCase()) {
                    if (!fa(f))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof f + " given: " + f);
                    if (!(f instanceof tb)) {
                        var k = "", q = void 0;
                        for (q in f) {
                            if (!/^[-_a-zA-Z0-9]+$/.test(q))throw Error("Name allows only [-_a-zA-Z0-9], got: " + q);
                            var v = f[q];
                            if (null != v) {
                                if (v instanceof qb)v = rb(v);
                                else if (wb.test(v)) {
                                    for (var t = !0, R = !0, P = 0; P < v.length; P++) {
                                        var qa = v.charAt(P);
                                        "'" == qa && R ? t = !t : '"' == qa && t && (R = !R)
                                    }
                                    t && R || (v = "zClosurez")
                                } else v = "zClosurez";
                                k += q + ":" + v + ";"
                            }
                        }
                        f = k ? (new tb).qe(k) : vb
                    }
                    f = ub(f)
                } else {
                    if (/^on/i.test(h))throw Error('Attribute "' + h + '" requires goog.string.Const value, "' + f + '" given.');
                    if (h.toLowerCase()in Gb)if (f instanceof Ab)f = f instanceof Ab && f.constructor === Ab && f.ri === zb ? f.Vh : "type_error:TrustedResourceUrl"; else if (f instanceof yb)f = f instanceof yb && f.constructor === yb && f.pi ===
                    xb ? f.Jc : "type_error:SafeUrl"; else throw Error('Attribute "' + h + '" on tag "div" requires goog.html.SafeUrl or goog.string.Const value, "' + f + '" given.');
                }
                f.Ac && (f = f.xc());
                h = h + '="' + Ba(String(f)) + '"';
                d += " " + h
            }
        }
        e = void 0;
        m(e) ? n(e) || (e = [e]) : e = [];
        !0 === ob.div ? d += ">" : (c = Jb(e), d += ">" + Eb(c) + "</div>", c = c.hd());
        (b = b && b.dir) && (c = /^(ltr|rtl|auto)$/i.test(b) ? 0 : null);
        b = Ib(d, c);
        a.innerHTML = Eb(b);
        a = a.firstChild;
        b = a.style[Ea("transition")];
        return "" != ("undefined" !== typeof b ? b : a.style[Ff(a, "transition")] || "")
    });
    var mh = function () {
        M.call(this);
        this.m = 0;
        this.endTime = this.startTime = null
    };
    y(mh, M);
    mh.prototype.Fc = function () {
        this.qa("begin")
    };
    mh.prototype.hc = function () {
        this.qa("end")
    };
    mh.prototype.qa = function (a) {
        this.dispatchEvent(a)
    };
    var nh = function (a, b, c, d, e) {
        mh.call(this);
        this.o = a;
        this.Mi = b;
        this.wj = c;
        this.nh = d;
        this.mk = n(e) ? e : [e]
    };
    y(nh, mh);
    g = nh.prototype;
    g.play = function () {
        if (1 == this.m)return !1;
        this.Fc();
        this.qa("play");
        this.startTime = w();
        this.m = 1;
        if (lh())return N(this.o, this.wj), this.zb = me(this.Sj, void 0, this), !0;
        this.Ag(!1);
        return !1
    };
    g.Sj = function () {
        Pf(this.o);
        kh(this.o, this.mk);
        N(this.o, this.nh);
        this.zb = me(u(this.Ag, this, !1), 1E3 * this.Mi)
    };
    g.stop = function () {
        1 == this.m && this.Ag(!0)
    };
    g.Ag = function (a) {
        N(this.o, "transition", "");
        l.clearTimeout(this.zb);
        N(this.o, this.nh);
        this.endTime = w();
        this.m = 0;
        a ? this.qa("stop") : this.qa("finish");
        this.hc()
    };
    g.i = function () {
        this.stop();
        nh.j.i.call(this)
    };
    g.pause = function () {
    };
    var oh = function (a) {
        this.gi = a;
        this.Oa = !1
    };
    oh.prototype.play = function () {
        this.gi.play();
        this.Oa = !0
    };
    oh.prototype.stop = function () {
        this.gi.stop();
        this.Oa = !1
    };
    oh.prototype.Na = function () {
        return this.Oa
    };
    var ph = function (a, b) {
        this.Kj = a;
        this.Oa = !1;
        this.$ = new le(b);
        K(this.$, "tick", u(this.Eg, this))
    };
    ph.prototype.play = function () {
        this.$.start();
        this.Oa = !0
    };
    ph.prototype.stop = function () {
        this.$.stop();
        this.Oa = !1
    };
    ph.prototype.Na = function () {
        return this.Oa
    };
    ph.prototype.Eg = function () {
        this.Kj() || this.stop()
    };
    var qh = function (a, b, c, d, e, f, h) {
        J.call(this);
        this.Vd = f || 0;
        this.Yc = h || 0;
        this.Le = e;
        t:{
            f = this.Vd;
            switch (e) {
                case 0:
                    e = {
                        qf: 0,
                        fontFamily: "Arial,sans-serif",
                        qh: 12,
                        rh: 14,
                        height: 20,
                        yh: "#eee",
                        Lh: 1,
                        Mh: "#000",
                        Sh: "#aaa",
                        Th: .75,
                        He: 120,
                        Wh: 100,
                        Xh: 1,
                        Yh: 1,
                        Qe: 5,
                        Te: -20,
                        width: 120
                    };
                    break t;
                case 1:
                    e = {
                        qf: 1,
                        fontFamily: "Arial,sans-serif",
                        qh: 12,
                        rh: 14,
                        height: 34,
                        yh: "#999",
                        Mh: "#222",
                        Lh: 0,
                        Sh: "#f1f1f1",
                        Th: .8,
                        He: 300 < f ? 300 : f,
                        Wh: 0,
                        Xh: .8,
                        Yh: -1,
                        Qe: 0,
                        Te: this.Yc,
                        width: 120
                    };
                    break t
            }
            throw Error("unexpected state");
        }
        this.Ia = e;
        this.Ha = a;
        this.hh =
            b;
        this.yd = c;
        this.ob = d;
        this.tb = this.rb = this.Za = this.Gc = null;
        this.Dd = this.Kc = 0;
        this.Lg = this.Ia.Wh;
        this.gb = this.Ia.height;
        this.ok = lh()
    };
    y(qh, J);
    g = qh.prototype;
    g.i = function () {
        I(this.Za);
        this.Za = null;
        I(this.Gc);
        this.Gc = null;
        null != this.rb && this.rb.stop();
        null != this.tb && this.tb.stop();
        qh.j.i.call(this)
    };
    g.Tj = function () {
        if (0 > this.Kc ? 0 : 1 != this.Ia.qf || this.Kc + this.gb < this.Yc)return !1;
        this.Kc += this.Ia.Yh;
        N(this.Ha, "bottom", S(this.Kc));
        return !0
    };
    g.uj = function () {
        if (100 <= this.Dd)return !1;
        this.Dd += 1;
        this.Za.style.width = Kf(this.Dd + "%", !0);
        return !0
    };
    g.pc = function () {
        if (!this.Za) {
            var a = this.Ia, b = document.createElement("SPAN");
            wc(b, this.yd);
            this.Za = document.createElement("DIV");
            var c = this.ob ? "right" : "left", d = this.ob ? "left" : "right";
            N(this.Za, {background: a.yh, height: S(this.gb), opacity: a.Xh, width: 0, zIndex: 999999, "float": c});
            var e = this.Ia, e = {
                bottom: S(e.Lh),
                color: e.Mh,
                fontSize: S(16 < this.yd.length ? this.Ia.qh : this.Ia.rh),
                fontFamily: e.fontFamily,
                left: S(5),
                letterSpacing: "0.05em",
                position: "absolute",
                verticalAlign: "middle",
                zIndex: 999999
            };
            this.ob && (b.setAttribute("dir",
                "rtl"), 0 == this.Le && (e.right = S(5)));
            N(b, e);
            this.Ha.appendChild(b);
            this.Ha.appendChild(this.Za);
            c = mb("background", a.Sh, "bottom", a.Te, "height", S(this.gb), "lineHeight", S(this.gb), "position", "absolute", "padding", 0, "width", S(a.He), "zIndex", 999999, "textDirection", 0, "textAlign", c, "border-top-" + d + "-radius", S(a.Qe), "-moz-border-top-" + d + "-radius", S(a.Qe), "-webkit-border-top-" + d + "-radius", S(a.Qe));
            if (1 == this.Le) {
                var e = mc(b), d = F && b.currentStyle, f;
                if (f = d)e = nc(e), f = qc(e.G);
                if (f && "auto" != d.width && "auto" != d.height && !d.boxSizing)e = Tf(b, d.width, "width", "pixelWidth"), d = Tf(b, d.height, "height", "pixelHeight"), d = new D(e, d); else {
                    d = new D(b.offsetWidth, b.offsetHeight);
                    if (F) {
                        e = Uf(b, "paddingLeft");
                        f = Uf(b, "paddingRight");
                        var h = Uf(b, "paddingTop"), k = Uf(b, "paddingBottom"), e = new Ef(h, f, k, e)
                    } else e = Hf(b, "paddingLeft"), f = Hf(b, "paddingRight"), h = Hf(b, "paddingTop"), k = Hf(b, "paddingBottom"), e = new Ef(parseFloat(h), parseFloat(f), parseFloat(k), parseFloat(e));
                    if (F && !fc()) {
                        f = Wf(b, "borderLeft");
                        var h = Wf(b, "borderRight"), k = Wf(b, "borderTop"),
                            q = Wf(b, "borderBottom");
                        f = new Ef(k, h, q, f)
                    } else f = Hf(b, "borderLeftWidth"), h = Hf(b, "borderRightWidth"), k = Hf(b, "borderTopWidth"), q = Hf(b, "borderBottomWidth"), f = new Ef(parseFloat(k), parseFloat(h), parseFloat(q), parseFloat(f));
                    d = new D(d.width - f.left - e.left - e.right - f.right, d.height - f.top - e.top - e.bottom - f.bottom)
                }
                N(b, "left", S((this.Ia.He - d.width) / 2));
                b = {
                    background: "#fff",
                    opacity: .4,
                    bottom: S(-this.Yc - this.gb),
                    height: S(this.Yc + 2 * this.gb),
                    left: 0,
                    overflow: "hidden",
                    padding: 0,
                    position: "absolute",
                    width: S(this.Vd),
                    zIndex: 999998
                };
                this.Gc = document.createElement("DIV");
                N(this.Gc, b);
                this.Ha.appendChild(this.Gc);
                this.ob && N(this.Gc, "left", S(a.He - this.Vd));
                c["border-bottom"] = "1px solid #6d6e70";
                300 < this.Vd && (c[this.ob ? "border-left" : "border-right"] = "1px solid #6d6e70")
            } else c["pointer-events"] = "none";
            Qf(this.Ha, a.Th);
            N(this.Ha, c);
            this.ok ? (this.tb || (a = this.Lg / 1E3, a = new nh(this.Ha, a, {bottom: S(this.Ia.Te)}, {bottom: S(1 == this.Ia.qf ? this.Yc - this.gb - 1 : 0)}, {
                fa: "bottom",
                duration: a,
                timing: "linear",
                ca: 0
            }), bd(this, a), this.tb =
                new oh(a)), this.rb || (a = this.hh / 1E3, a = new nh(this.Za, a, {width: 0}, {width: "100%"}, {
                fa: "width",
                duration: a,
                timing: "linear",
                ca: 0
            }), bd(this, a), this.rb = new oh(a))) : (this.tb || (this.tb = new ph(u(this.Tj, this), this.Lg / this.gb)), this.rb || (this.rb = new ph(u(this.uj, this), this.hh / 100)))
        }
        this.ub();
        Q(this.Ha, !0);
        this.Dd = 0;
        this.Kc = this.Ia.Te;
        this.tb.play();
        this.rb.play()
    };
    g.ub = function () {
        this.tb && this.tb.stop();
        this.rb && this.rb.stop();
        this.Ha && this.Za && (N(this.Ha, {bottom: S(-this.gb), display: "none"}), this.Za.style.width = Kf(0, !0))
    };
    var rh = function (a) {
        if (a.classList)return a.classList;
        a = a.className;
        return p(a) && a.match(/\S+/g) || []
    }, sh = function (a, b) {
        return a.classList ? a.classList.contains(b) : Va(rh(a), b)
    }, th = function (a, b) {
        a.classList ? a.classList.add(b) : sh(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
    }, uh = function (a, b) {
        if (a.classList)B(b, function (b) {
            th(a, b)
        }); else {
            var c = {};
            B(rh(a), function (a) {
                c[a] = !0
            });
            B(b, function (a) {
                c[a] = !0
            });
            a.className = "";
            for (var d in c)a.className += 0 < a.className.length ? " " + d : d
        }
    }, vh = function (a, b) {
        a.classList ?
            a.classList.remove(b) : sh(a, b) && (a.className = Sa(rh(a), function (a) {
            return a != b
        }).join(" "))
    }, wh = function (a, b) {
        a.classList ? B(b, function (b) {
            vh(a, b)
        }) : a.className = Sa(rh(a), function (a) {
            return !Va(b, a)
        }).join(" ")
    };
    var xh = function (a, b, c, d, e) {
        J.call(this);
        this.yd = c;
        this.ob = d;
        this.Le = e;
        ah();
        a = z.createElement("div");
        uh(a, ["progressbar-notifier", "container", "off", this.ob ? "rtl" : "ltr"]);
        0 == this.Le && th(a, "desktop");
        V().IS_MOBILE_APP_REQUEST && (b = rc().height, 0 >= b && (b = window.innerHeight), a.style.height = Kf(b, !0));
        b = z.createElement("span");
        b.className = "spanner";
        c = z.createTextNode(" ");
        d = z.createElement("div");
        d.className = "overlay overlay1";
        e = z.createElement("div");
        e.className = "overlay overlay2";
        var f = z.createElement("div");
        f.className = "viz";
        var h = z.createElement("div");
        h.className = "notifier-text";
        var k = z.createTextNode(this.yd ? this.yd : "Expanding..."), q = z.createElement("div");
        q.className = "progbar-container";
        var v = z.createElement("div");
        v.className = "progbar-border";
        var t = z.createElement("div");
        t.className = "progbar";
        z.body.appendChild(a);
        a.appendChild(b);
        b.appendChild(c);
        a.appendChild(d);
        a.appendChild(e);
        a.appendChild(f);
        f.appendChild(h);
        h.appendChild(k);
        f.appendChild(q);
        q.appendChild(v);
        q.appendChild(t);
        a = {
            container: a,
            overlay: d
        };
        this.Fb = a.container;
        this.Ha = a.overlay;
        this.Ja = null
    };
    y(xh, J);
    var yh = {li: "off", mi: "on", ji: "cancel"};
    xh.prototype.i = function () {
        I(this.Fb);
        xh.j.i.call(this)
    };
    var zh = function (a, b) {
        wh(a.Fb, bb(yh));
        th(a.Fb, b)
    };
    xh.prototype.pc = function () {
        null != this.Ja && (L(this.Ja), this.Ja = null);
        zh(this, "on")
    };
    xh.prototype.ub = function (a) {
        var b = u(function () {
            null != this.Ja && this.ub(0)
        }, this);
        a && 4 == a ? (zh(this, "cancel"), null == this.Ja && (this.Ja = zd(this.Ha, gd, b, !1, this))) : (L(this.Ja), this.Ja = null, zh(this, "off"))
    };
    var Ah = function (a) {
        ih.call(this, a);
        this.va = 0;
        this.Nb = null;
        this.H = new gh(this.Yb(), this.of);
        Gg("mousedown", this.vd, !0, this);
        Gg("mouseup", this.cg, !0, this);
        a = a.ke || "Expanding...";
        var b = V().EXPANSION_RIGHT_TO_LEFT || !1;
        "DesktopProgressBarCSS3" == this.L && lh() ? this.X = new xh(0, 0, a, b, 0) : (this.L = "DesktopProgressBarJS", this.X = new qh(this.fd, this.$c, a, b, 0))
    };
    y(Ah, ih);
    g = Ah.prototype;
    g.i = function () {
        L(this.Nb);
        this.Nb = null;
        Ah.j.i.call(this)
    };
    g.vd = function () {
        this.isExpanded() || (this.va = w())
    };
    g.cg = function () {
        if (!this.isExpanded() && this.va && this.Na()) {
            this.H.clear();
            this.da = 3;
            var a = this.kd(), b = w() - this.va;
            X(this.u, "zbq", a);
            X(this.u, "clkt", b);
            this.va = 0;
            fh(this, "engagement_opt_in", {hovlen: a});
            dh(this)
        }
    };
    g.De = function (a) {
        Ah.j.De.call(this, a);
        this.S = !0
    };
    g.Ce = function () {
        var a = this.kd();
        Ah.j.Ce.call(this);
        this.S = !1;
        this.ef.clear();
        var b = this.Na();
        b && (ch(this, 4), fh(this, "engagement_opt_out", {hovlen: a}));
        this.H.clear();
        this.remove();
        b && ch(this, 0)
    };
    g.bg = function (a) {
        a && X(this.u, "zcr", a)
    };
    g.kd = function () {
        return this.wd ? w() - this.wd : 0
    };
    g.Ib = function () {
        return 30
    };
    g.remove = function () {
        Ah.j.remove.call(this);
        this.H.clear();
        this.va = 0;
        this.X.ub(this.getContext());
        L(this.Nb);
        this.Nb = null
    };
    g.Cd = function () {
        this.da = 2;
        dh(this)
    };
    g.Ng = function () {
        this.H.start(this, this.Cd, this.jg);
        this.X.pc();
        if (Rg("zcf") || Rg("zcr"))this.Nb = K(z.body, "mousemove", this.bg, !0, this)
    };
    var Bh = function (a) {
        Y.call(this, a);
        this.Aa = 0;
        Gg("touchstart", this.Ig, !0, this);
        Gg("touchend", this.Gg, !0, this)
    };
    y(Bh, Y);
    g = Bh.prototype;
    g.start = function (a) {
        a()
    };
    g.Ib = Qc(29);
    g.jd = function () {
        return 4
    };
    g.Yb = Qc(0);
    g.vc = Qc("InstantlyEngage");
    g.Ig = function (a) {
        this.isExpanded() || (this.Aa = w(), X(this.u, "gcf", a))
    };
    g.Gg = function (a) {
        !this.isExpanded() && this.Aa && this.Se(a)
    };
    g.Se = function (a) {
        if (this.Aa) {
            var b = w();
            X(this.u, "gq", b - this.Aa);
            this.Aa = 0;
            X(this.u, "gcr", a)
        }
    };
    var Ch = function (a) {
        Y.call(this, a)
    };
    y(Ch, Y);
    g = Ch.prototype;
    g.start = function () {
        fh(this, "pre_engagement")
    };
    g.remove = ba;
    g.re = Rc;
    g.xb = ba;
    g.Ib = Qc(32);
    g.Yb = Qc(Infinity);
    g.vc = Qc("NeverEngage");
    var Dh = function () {
        M.call(this)
    };
    y(Dh, M);
    g = Dh.prototype;
    g.remove = ba;
    g.re = Rc;
    g.start = function (a) {
        a()
    };
    g.xb = function () {
    };
    g.Ib = function () {
        return 32
    };
    g.jd = function () {
        return 1
    };
    g.vc = function () {
        return "NoOp"
    };
    g.Yb = function () {
        return 0
    };
    var Fh = function (a) {
        Y.call(this, a);
        this.rd = this.Aa = 0;
        this.wg = !1;
        this.H = new gh(this.Yb(), this.of);
        var b = lh();
        "MobileProgressBarTapToCancelCSS3" != this.L || b || (this.L = "MobileProgressBarTapToCancel");
        "MobileProgressBarTapToExpandCSS3" != this.L || b || (this.L = "MobileProgressBarTapToExpand");
        Gg("touchstart", this.Ig, !0, this);
        Gg("touchend", this.Gg, !0, this);
        b = V().EXPANSION_RIGHT_TO_LEFT || !1;
        t:{
            if (a = a.ke) {
                switch (this.L) {
                    case "MobileProgressBarTapToCancel":
                    case "MobileProgressBarTapToExpand":
                        a = a.toUpperCase();
                        break t;
                    case "MobileProgressBarTapToCancelCSS3":
                    case "MobileProgressBarTapToExpandCSS3":
                        a += "...";
                        break t
                }
                throw Error("unexpected");
            }
            a = Eh[this.L]
        }
        this.X = "MobileProgressBarTapToCancelCSS3" == this.L || "MobileProgressBarTapToExpandCSS3" == this.L ? new xh(0, 0, a, b, 1) : new qh(this.fd, this.$c, a, b, 1, A.innerWidth, A.innerHeight)
    };
    y(Fh, Y);
    var Eh = {
        MobileProgressBarTapToCancel: "TAP TO CANCEL",
        MobileProgressBarTapToCancelCSS3: "Tap to cancel...",
        MobileProgressBarTapToExpand: "TAP TO EXPAND",
        MobileProgressBarTapToExpandCSS3: "Tap to expand..."
    };
    Fh.prototype.i = function () {
        this.H.clear();
        Fh.j.i.call(this)
    };
    var Gh = function (a) {
        return "MobileProgressBarTapToCancel" == a.L || "MobileProgressBarTapToCancelCSS3" == a.L
    };
    Fh.prototype.Ib = function () {
        return 29
    };
    Fh.prototype.remove = function () {
        Fh.j.remove.call(this);
        this.H.clear();
        this.X.ub(this.getContext());
        this.S = !1;
        this.rd = this.Aa = 0;
        this.wg = !1
    };
    var Hh = function (a) {
        ch(a, 4);
        fh(a, "tap", {abproglen: hh(a.H)});
        a.remove();
        ch(a, 0)
    }, Ih = function (a) {
        var b = {};
        lb(b, a.u.Qc);
        b.scproglen = hh(a.H);
        fh(a, "tap", b);
        a.S = !0;
        dh(a)
    }, Jh = function (a) {
        var b;
        if (b = a.Na() && null !== a.H.zb)a = a.H, b = hh(a), b = 0 < Math.max(0, a.Sc - b);
        return b
    };
    g = Fh.prototype;
    g.Ig = function (a) {
        this.isExpanded() || (this.Aa = w(), Jh(this) ? Gh(this) ? (this.H.clear(), Hh(this), a.preventDefault ? a.preventDefault() : a.returnValue = !1, a.stopPropagation()) : this.wg = !0 : X(this.u, "gcf", a))
    };
    g.Gg = function (a) {
        !this.isExpanded() && this.Aa && (this.wg ? Jh(this) && (this.H.clear(), this.Se(a), 8 != this.jd() && (this.da = 6), Ih(this), a.preventDefault ? a.preventDefault() : a.returnValue = !1, a.stopPropagation()) : this.Se(a))
    };
    g.Se = function (a) {
        if (this.Aa) {
            var b = w();
            X(this.u, "gcr", a);
            X(this.u, "gq", b - this.Aa);
            this.Aa = 0;
            this.rd ? X(this.u, "gv", b - this.rd) : this.rd = b
        }
    };
    g.Cd = function () {
        Gh(this) ? (8 != this.jd() && (this.da = 5), Ih(this)) : Hh(this)
    };
    g.ti = function () {
        Gh(this) && this.jg()
    };
    g.xg = Sc(Ag);
    g.start = function (a, b) {
        if (!Jh(this)) {
            this.da = 0;
            if (!this.xg())this.da = 8; else if (0 == this.Aa && 0 == this.rd)return;
            this.expansionCallback = a;
            this.aboutToExpandCallback = b;
            ch(this, 1);
            this.H.start(this, this.Cd, this.ti);
            this.X.pc()
        }
    };
    var Kh = function (a) {
        Y.call(this, a);
        this.xd = this.va = 0;
        this.Nb = null;
        this.H = new gh(this.Yb(), this.of);
        this.Td = new gh(50);
        this.se = !1;
        this.T = null;
        Gg("mousedown", this.vd, !0, this);
        Gg("mouseup", this.cg, !0, this);
        var b = z.body;
        ug() ? Fg(this, K(b, "mouseenter", this.Jh, !1, this), K(b, "mouseleave", this.Ih, !1, this)) : Fg(this, K(b, "mouseover", this.Jh, !0, this), K(b, "mouseout", this.Ih, !0, this));
        a = a.ke || "Expanding...";
        b = V().EXPANSION_RIGHT_TO_LEFT || !1;
        "DesktopProgressBarCSS3" == this.L && lh() ? this.X = new xh(0, 0, a, b, 0) : (this.L = "DesktopProgressBarJS",
            this.X = new qh(this.fd, this.$c, a, b, 0))
    };
    y(Kh, Y);
    g = Kh.prototype;
    g.i = function () {
        this.H.clear();
        this.Td.clear();
        I(this.T);
        this.T = null;
        Kh.j.i.call(this)
    };
    g.kd = function () {
        return this.xd ? w() - this.xd : 0
    };
    g.vd = function () {
        this.isExpanded() || (this.va = w())
    };
    g.cg = function () {
        if (!this.isExpanded() && this.va && this.se) {
            this.H.clear();
            this.da = 3;
            var a = this.kd(), b = w() - this.va;
            X(this.u, "zbq", a);
            X(this.u, "clkt", b);
            this.va = 0;
            fh(this, "engagement_opt_in", {hovlen: a});
            dh(this)
        }
    };
    g.Ih = function () {
        this.S = !1;
        this.Td.clear();
        var a = this.Na();
        a && (ch(this, 4), fh(this, "engagement_opt_out", {hovlen: this.kd()}));
        this.H.clear();
        this.remove();
        this.xd = 0;
        a && ch(this, 0)
    };
    g.Jh = function (a) {
        this.S = !0;
        this.xd || (this.xd = w(), a && (X(this.u, "zcf", a), X(this.u, "zcr", a)))
    };
    g.bg = function (a) {
        a && X(this.u, "zcr", a)
    };
    g.Ib = function () {
        return this.se ? 30 : 29
    };
    g.remove = function () {
        Kh.j.remove.call(this);
        this.H.clear();
        this.va = 0;
        this.S = !1;
        this.X.ub(this.getContext());
        L(this.Nb)
    };
    g.xb = function (a) {
        Kh.j.xb.call(this, a);
        var b = W("lb_reexpand_overlay");
        !a && A.innerWidth && (Yb || b) && (this.T = document.createElement("div"), N(this.T, {
            position: "absolute",
            width: A.innerWidth + "px",
            height: A.innerHeight + "px",
            opacity: 0,
            top: 0,
            zIndex: 999999
        }), K(this.T, "mouseover", function () {
            z.body.removeChild(this.T);
            this.T = null
        }, !0, this), z.body.appendChild(this.T))
    };
    g.Cd = function () {
        this.da = 2;
        dh(this)
    };
    g.start = function (a, b) {
        this.Td.clear();
        this.S ? this.Ad(a, b) : this.Td.start(this, la(this.Ad, a, b))
    };
    g.Ad = function (a, b) {
        this.Td.clear();
        this.da = 0;
        if (this.S)if (this.expansionCallback = a, this.aboutToExpandCallback = b, ch(this, 1), this.se = !1, this.va && 3E3 > w() - this.va)this.da = 1, dh(this); else if (this.se = !0, this.H.start(this, this.Cd, this.jg), this.X.pc(), Rg("zcf") || Rg("zcr"))this.Nb = K(z.body, "mousemove", this.bg, !0, this)
    };
    var Lh = function (a, b, c, d) {
        J.call(this);
        a = document;
        var e;
        (e = !F || fc()) || (e = nc(a), e = qc(e.G));
        a = e ? a.documentElement : a.body;
        this.Zc = a.clientHeight;
        this.Ka = a.clientWidth;
        this.Ee = 2 <= this.Ka / this.Zc ? "horizontal" : "vertical";
        this.Aj = 160 > this.Ka ? "vertical" : "horizontal";
        this.Ed = "slide";
        this.hk = b;
        this.qb = this.dh = new C(this.Ka / 2, this.Zc / 2);
        this.ob = c;
        this.Oa = !1;
        this.Ne = new gh(50);
        this.Ja = null;
        this.Wf = z.createElement("div");
        this.qg = z.createElement("div");
        this.Sa = z.createElement("div");
        this.P = d;
        this.Sb = z.createElement("div");
        this.Dh = !1;
        ah();
        b = z.createElement("div");
        c = z.createElement("span");
        d = z.createElement("div");
        a = z.createElement("div");
        e = z.createElement("div");
        N(b, "zIndex", 999999);
        N(b, "height", "100%");
        uh(b, ["touchagain", "container", this.Ee, this.Ed, this.ob ? "rtl" : "ltr", "off"]);
        c.className = "spanner";
        var f = z.createTextNode(" ");
        d.className = "overlay overlay1";
        a.className = "overlay overlay2";
        this.Sa.className = "viz";
        this.Wf.className = "leftWing";
        this.qg.className = "rightWing";
        this.P.className = "callToAction";
        this.P.tabIndex = -1;
        e.className = "expandSymbol";
        this.Sb.className = "notifier-text";
        c.appendChild(f);
        z.body.appendChild(b);
        b.appendChild(c);
        b.appendChild(d);
        b.appendChild(a);
        b.appendChild(this.Sa);
        this.Sa.appendChild(this.Wf);
        this.Sa.appendChild(this.P);
        this.P.appendChild(e);
        this.P.appendChild(this.Sb);
        this.Sa.appendChild(this.qg);
        wc(this.Sb, this.hk);
        this.Fb = b
    };
    y(Lh, J);
    var Mh = {li: "off", mi: "on", ji: "cancel"};
    Lh.prototype.i = function () {
        this.Ne.clear();
        I(this.Sa);
        Lh.j.i.call(this)
    };
    var Nh = function (a, b) {
        wh(a.Fb, bb(Mh));
        th(a.Fb, b)
    }, Oh = function (a, b) {
        if (b < a.Ka / 2) {
            var c = a.Fb;
            vh(c, "right");
            th(c, "left")
        } else c = a.Fb, vh(c, "left"), th(c, "right")
    };
    Lh.prototype.ub = function (a) {
        4 == a ? (Nh(this, "cancel"), this.Ja = K("slide" == this.Ed && "horizontal" == this.Ee ? this.P : this.Sa, gd, la(this.ub, 0), !1, this)) : (Nh(this, "off"), L(this.Ja));
        "slide" == this.Ed && ("horizontal" == this.Ee ? Ph(this, this.qb.x, !0) : Qh(this, this.qb.y, !0));
        this.Oa = !1
    };
    Lh.prototype.pc = function (a) {
        this.Oa || (this.Oa = !0, this.Ne.clear(), this.Dh || Rh(this), this.qb = a ? a : this.dh, "horizontal" == this.Ee ? (Sh(this), a = this.P) : (Th(this), a = this.Sa), this.Ja = zd(a, gd, function () {
            this.P.focus()
        }, !1, this))
    };
    var Sh = function (a) {
        var b = "slide" == a.Ed;
        Nh(a, "off");
        Oh(a, a.qb.x);
        Ph(a, a.qb.x, b);
        Qh(a, a.qb.y, !1);
        a.Ne.start(a, function () {
            Nh(this, "on");
            b && Ph(this, this.qb.x, !1)
        })
    }, Th = function (a) {
        var b = "slide" == a.Ed;
        Nh(a, "off");
        Qh(a, a.qb.y, b);
        Ph(a, a.Ka / 2, !1);
        a.Ne.start(a, function () {
            Nh(this, "on");
            b && Qh(this, this.qb.y, !1)
        })
    }, Ph = function (a, b, c) {
        var d = a.P.clientWidth;
        b = c ? b < a.Ka / 2 ? 0 - d : a.Ka : Kb(b - d / 2, a.Ka - d);
        c = Kb(b, a.Ka);
        d = Kb(a.Ka - (b + d), a.Ka);
        N(a.P, "left", S(b));
        N(a.Wf, "width", S(c));
        N(a.qg, "width", S(d))
    }, Qh = function (a, b, c) {
        var d =
            "vertical" == a.Aj ? a.Sb.offsetTop + a.Sb.clientHeight : a.Sa.clientHeight;
        b = c ? b < a.Zc / 2 ? 0 - d : a.Zc : Kb(b - d / 2, a.Zc - d);
        N(a.Sa, "top", S(b))
    }, Rh = function (a) {
        var b = 60;
        N(a.Sb, "fontSize", S(b));
        for (var c = Math.max(Math.min(a.Sa.clientHeight - 6, 60), 10); a.Sb.clientHeight > c;)N(a.Sb, "fontSize", S(b--));
        a.Dh = !0
    };
    var Uh = function (a) {
        Y.call(this, a);
        var b = V().EXPANSION_RIGHT_TO_LEFT || !1;
        a = a.ke || "Expand";
        this.Ze = null;
        this.Yd = this.oc = -1;
        this.ge = new gh(4E3);
        this.P = z.createElement("div");
        this.X = new Lh(0, a, b, this.P);
        K(this.P, "touchstart", this.Ei, !0, this);
        K(this.P, "touchend", this.Di, !0, this);
        K(this.P, "blur", this.Gi, !0, this);
        Gg("touchstart", this.yi, !0, this);
        Gg("touchend", this.xi, !1, this)
    };
    y(Uh, Y);
    g = Uh.prototype;
    g.Ib = function () {
        return 29
    };
    g.Ei = function () {
        if (1 == this.getContext() || 4 == this.getContext())this.Yd = w()
    };
    g.Di = function (a) {
        if (1 == this.getContext() || 4 == this.getContext()) {
            var b = w();
            X(this.u, "gcr", a);
            -1 < this.oc && X(this.u, "gv", b - this.oc);
            -1 < this.Yd && X(this.u, "gq", b - this.Yd);
            a = {};
            lb(a, this.u.Qc);
            a.engnotlen = hh(this.ge);
            fh(this, "touchAgain", a);
            dh(this)
        }
    };
    g.Gi = function () {
        this.Na() && (ch(this, 4), this.u.Qc = {}, fh(this, "touchAgain", {abnotlen: hh(this.ge)}), this.remove(), ch(this, 0))
    };
    g.Bi = function () {
        var a = this.P, b = new dd("blur", this.P);
        jd(a) ? Gd(a, "blur", !0, b) : Ed(a, "blur", !0, b)
    };
    g.remove = function () {
        Uh.j.remove.call(this);
        this.ge.clear();
        this.S = !1;
        this.Ze = null;
        this.Yd = this.oc = -1;
        this.X.ub(this.getContext())
    };
    g.yi = function (a) {
        0 == this.getContext() && (this.Ze = O(a), X(this.u, "gcf", a), this.oc = -1)
    };
    g.xi = function (a) {
        0 > this.oc && (this.Ze = O(a), this.oc = w())
    };
    g.xg = Sc(Ag);
    g.start = function (a, b) {
        0 == this.getContext() && (this.xg() ? this.da = 6 : this.da = 8, ch(this, 1), this.S = !0, this.expansionCallback = a, this.aboutToExpandCallback = b, this.X.pc(this.Ze), this.ge.start(this, this.Bi))
    };
    var Vh = function (a) {
        this.v = a
    };
    Vh.prototype.cpeEnabled = function () {
        return this.v.cpeEnabled()
    };
    Vh.prototype.getClientEnvironment = function () {
        return {
            browserClass: this.v.getClientEnvironment().browserClass,
            language: this.v.getClientEnvironment().language
        }
    };
    Vh.prototype.getEngagementState = function () {
        return this.v.getEngagementState()
    };
    Vh.prototype.getActiveExperimentLabels = function () {
        return Pg()
    };
    var Wh = function () {
        this.vf = null
    }, Xh = ["googlesyndication.com", "googleadservices.com", "doubleclick.net"], Yh = function (a) {
        a = we(a);
        if (!a)return !1;
        for (var b = 0; b < Xh.length; ++b) {
            var c = Xh[b], d = String(c).toLowerCase(), c = String(a.substr(a.length - c.length, c.length)).toLowerCase();
            if (0 == (d < c ? -1 : d == c ? 0 : 1))return !0
        }
        return !1
    };
    Wh.prototype.md = function () {
        if (!this.vf) {
            var a;
            if ((a = V()) && a.CREATIVE_CONVERSION_URL)a = a.CREATIVE_CONVERSION_URL; else {
                a = A.location.href;
                var b = a.search(De), c = Ce(a, 0, "ct_conv", b);
                if (0 > c)a = null; else {
                    var d = a.indexOf("&", c);
                    if (0 > d || d > b)d = b;
                    c += 8;
                    a = decodeURIComponent(a.substr(c, d - c).replace(/\+/g, " "))
                }
                a = a ? Yh(a) ? a : "" : ""
            }
            this.vf = a
        }
        return this.vf
    };
    var Zh = function () {
        this.K = null;
        this.Yi = this.Cg = !1;
        this.Q = null;
        this.$g = new Wh;
        this.Rc = this.Tb = this.Sd = null
    };
    Zh.prototype.getEngagementState = function () {
        return this.Q ? this.Q.getEngagementState() : CreativeToolset.EngagementState
    };
    Zh.prototype.cpeEnabled = function () {
        return V().ENABLE_CPE
    };
    Zh.prototype.getClientEnvironment = function () {
        var a = 0;
        eg() && !V().IS_MOBILE_APP_REQUEST ? a = 1 : V().IS_MOBILE_APP_REQUEST && (a = 2);
        return {browserClass: a, language: V().LANGUAGE}
    };
    var eh = function (a, b) {
        var c = {};
        if (a.K) {
            var d = a.K.Yb(), d = Infinity == d ? -1 : d;
            c.engdelay = d.toString();
            c.notifier = a.K.vc();
            d = a.K.jd();
            c.engactd = d;
            8 == d && (b = !1)
        }
        b && null !== a.Rc && lb(c, Sg(a.Rc));
        ea(a.Sd) && (c.visfrc = a.Sd);
        null === a.Tb || (c.viscrd = a.Tb.top + "," + a.Tb.left + "," + a.Tb.bottom + "," + a.Tb.right);
        a.Q && (d = a.Q.getEngagementState(), c.engcyc = d.engagementCycle, d.engagementAction && (c.engact = d.engagementAction), c.cycchrg = d.cycleWasCharged, d.chargeableAction && (c.chrgact = d.chargeableAction));
        return c
    };
    var $h = function () {
        this.Oc = [];
        this.Cb = []
    }, ai = function () {
        var a = aa("googlecreative.reporting.sharedReporter");
        a || (a = new $h, x("googlecreative.reporting.sharedReporter", a));
        return a
    };
    g = $h.prototype;
    g.addReporter = function (a) {
        B(this.Oc, function (b) {
            b.newReporterCallback(a);
            a.newReporterCallback(b)
        });
        B(this.Cb, function (b) {
            a.registerChargeableEventName(b)
        });
        this.Oc.push(a)
    };
    g.reportEvents = function (a) {
        B(this.Oc, function (b) {
            b.reportEvents(a)
        })
    };
    g.registerChargeableEventName = function (a) {
        B(this.Oc, function (b) {
            b.registerChargeableEventName(a)
        });
        this.Cb.push(a)
    };
    g.logCustomVariable = function (a, b) {
        B(this.Oc, function (c) {
            c.logCustomVariable(a, b)
        })
    };
    g.getType = function () {
        return "UNIFIED_DISPATCHER"
    };
    g.getConfig = function () {
        return {reportingApiVersion: 2}
    };
    g.newReporterCallback = ba;
    g.supportsChargeableEvents = function () {
        var a = !1;
        B(this.Oc, function (b) {
            b.supportsChargeableEvents() && (a = !0)
        });
        return a
    };
    var bi = {
        EXPANSION: "expansion",
        EXPANSION_HOVER: "expansion_hover",
        GENERIC_ENGAGEMENT: "generic_engagement",
        RM_VIDEO_PLAY: "rm_video_play",
        RM_VIDEO_UNMUTE: "rm_video_unmute",
        RM_VIDEO_VIEW_TIMER: "rm_video_view_timer",
        MOUSE_HOVER: "mouse_hover",
        SWIPE: "swipe",
        CLICK_THROUGH: "click_through",
        RM_VIDEO_REPLAY: "rm_video_replay",
        RM_VIDEO_PAUSE: "rm_video_pause",
        RM_VIDEO_STOP: "rm_video_stop",
        RM_VIDEO_MUTE: "rm_video_mute",
        VIDEOPLAYTIME50: "videoplaytime50",
        VIDEOPLAYTIME100: "videoplaytime100",
        RM_VIDEO_INTERACTION: "rm_video_interaction",
        RM_FULLSCREEN: "rm_fullscreen",
        RM_MANUAL_CLOSE: "rm_manual_close",
        CONTRACTION: "contraction",
        VIDEOPLAYTIME25: "videoplaytime25",
        VIDEOPLAYTIME75: "videoplaytime75",
        ENGAGE_1S: "engage_1s",
        ENGAGE_2S: "engage_2s",
        ENGAGE_3S: "engage_3s",
        ENGAGE_4S: "engage_4s",
        ENGAGE_5S: "engage_5s",
        ENGAGE_10S: "engage_10s",
        ENGAGE_15S: "engage_15s",
        ENGAGE_30S: "engage_30s",
        ENGAGE_60S: "engage_60s",
        ENGAGE_90S: "engage_90s",
        ENGAGE_120S: "engage_120s",
        ENGAGE_180S: "engage_180s",
        ENGAGE_SUCCESS: "engage_success",
        ENGAGE_ENDED: "engage_ended",
        VIDEO2_PLAYTIME0: "video2_playtime0",
        VIDEO2_PLAYTIME25: "video2_playtime25",
        VIDEO2_PLAYTIME50: "video2_playtime50",
        VIDEO2_PLAYTIME75: "video2_playtime75",
        VIDEO2_PLAYTIME100: "video2_playtime100",
        VIDEO3_PLAYTIME0: "video3_playtime0",
        VIDEO3_PLAYTIME25: "video3_playtime25",
        VIDEO3_PLAYTIME50: "video3_playtime50",
        VIDEO3_PLAYTIME75: "video3_playtime75",
        VIDEO3_PLAYTIME100: "video3_playtime100",
        VIDEO4_PLAYTIME0: "video4_playtime0",
        VIDEO4_PLAYTIME25: "video4_playtime25",
        VIDEO4_PLAYTIME50: "video4_playtime50",
        VIDEO4_PLAYTIME75: "video4_playtime75",
        VIDEO4_PLAYTIME100: "video4_playtime100",
        VIDEO5_PLAYTIME0: "video5_playtime0",
        VIDEO5_PLAYTIME25: "video5_playtime25",
        VIDEO5_PLAYTIME50: "video5_playtime50",
        VIDEO5_PLAYTIME75: "video5_playtime75",
        VIDEO5_PLAYTIME100: "video5_playtime100",
        CATALOG_VIEW_SHEET: "catbox_view_sheet",
        CATALOG_VIEW_OFFER: "catbox_view_offer",
        CATALOG_CLICK_OFFER_ATTACHMENT: "catbox_click_offer_attachment",
        CATALOG_CLICK_IMAGE_ATTACHMENT: "catbox_click_image_attachment",
        CATALOG_CLICK_VIDEO_ATTACHMENT: "catbox_click_video_attachment",
        CATALOG_CLICK_OFFER_GROUP_ATTACHMENT: "catbox_click_offer_group_attachment",
        CATALOG_CLICK_IMAGE_GROUP_ATTACHMENT: "catbox_click_image_group_attachment",
        CATALOG_CLICK_WEB_SNIPPET_ATTACHMENT: "catbox_click_web_snippet_attachment",
        CATALOG_CLICK_CALL_TO_ORDER_ATTACHMENT: "catbox_click_call_to_order_attachment",
        CATALOG_CLICK_THROUGH_OFFER: "catbox_click_through_offer",
        VISUAL_SHOPPING_ROW_SCROLL: "visual_shopping_row_scroll",
        video1Paused: "rm_video_pause",
        video1Played0Percent: "rm_video_play",
        video1Played25Percent: "videoplaytime25",
        video1Played50Percent: "videoplaytime50",
        video1Played75Percent: "videoplaytime75",
        video1Played100Percent: "videoplaytime100",
        video2Paused: "rm_video_pause",
        video2Played0Percent: "video2_playtime0",
        video2Played25Percent: "video2_playtime25",
        video2Played50Percent: "video2_playtime50",
        video2Played75Percent: "video2_playtime75",
        video2Played100Percent: "video2_playtime100",
        video3Paused: "rm_video_pause",
        video3Played0Percent: "video3_playtime0",
        video3Played25Percent: "video3_playtime25",
        video3Played50Percent: "video3_playtime50",
        video3Played75Percent: "video3_playtime75",
        video3Played100Percent: "video3_playtime100",
        video4Paused: "rm_video_pause",
        video4Played0Percent: "video4_playtime0",
        video4Played25Percent: "video4_playtime25",
        video4Played50Percent: "video4_playtime50",
        video4Played75Percent: "video4_playtime75",
        video4Played100Percent: "video4_playtime100",
        video5Paused: "rm_video_pause",
        video5Played0Percent: "video5_playtime0",
        video5Played25Percent: "video5_playtime25",
        video5Played50Percent: "video5_playtime50",
        video5Played75Percent: "video5_playtime75",
        video5Played100Percent: "video5_playtime100",
        "video-paused": "rm_video_pause",
        "video-viewed0percent": "part2viewed",
        "video-viewed25percent": "videoplaytime25",
        "video-viewed50percent": "videoplaytime50",
        "video-viewed75percent": "videoplaytime75",
        "video-viewed100percent": "videoplaytime100",
        imageGalleryCardInteracted: "tetris_image_gallery_card_interacted",
        mapCardInteracted: "tetris_map_card_interacted",
        videoCardInteracted: "tetris_video_card_interacted",
        elementInteracted: "lightbox_ad_interacted"
    };
    W("studio_events") && (bi.EXPAND_TIMER = "expansion_hover", bi.GDN_REPORTING_DEFERRED = "gdn_reporting_deferred");
    var ci = {
        EXPANSION: 29,
        EXPANSION_HOVER: 30,
        GENERIC_ENGAGEMENT: 32,
        RM_VIDEO_PLAY: 33,
        RM_VIDEO_UNMUTE: 34,
        RM_VIDEO_VIEW_TIMER: 35,
        MOUSE_HOVER: 36,
        SWIPE: 37
    };
    W("studio_events") && (ci.EXPAND_TIMER = 30);
    var di = {
        29: "EXPANSION",
        30: "EXPANSION_HOVER",
        32: "GENERIC_ENGAGEMENT",
        33: "RM_VIDEO_PLAY",
        34: "RM_VIDEO_UNMUTE",
        35: "RM_VIDEO_VIEW_TIMER",
        36: "MOUSE_HOVER",
        37: "SWIPE",
        10001: "RM_VIDEO_REPLAY",
        10002: "RM_VIDEO_PAUSE",
        10003: "RM_VIDEO_STOP",
        10004: "RM_VIDEO_MUTE",
        10005: "VIDEOPLAYTME50",
        10006: "VIDEOPLAYTME100",
        10007: "RM_VIDEO_INTERACTION",
        10008: "RM_FULL_SCREEN",
        10009: "RM_MANUAL_CLOSE",
        10010: "CONTRACTION",
        10011: "VIDEOPLAYTIME25",
        10012: "VIDEOPLAYTIME75",
        10013: "ENGAGE_1S",
        10014: "ENGAGE_2S",
        10015: "ENGAGE_3S",
        10016: "ENGAGE_4S",
        10017: "ENGAGE_5S",
        10018: "ENGAGE_10S",
        10019: "ENGAGE_15S",
        10020: "ENGAGE_30S",
        10021: "ENGAGE_60S",
        10022: "ENGAGE_90S",
        10023: "ENGAGE_120S",
        10024: "ENGAGE_180S",
        10025: "ENGAGE_SUCCESS",
        10026: "ENGAGE_ENDED",
        10027: "VIDEO2_PLAYTIME0",
        10028: "VIDEO2_PLAYTIME25",
        10029: "VIDEO2_PLAYTIME50",
        10030: "VIDEO2_PLAYTIME75",
        10031: "VIDEO2_PLAYTIME100",
        10032: "VIDEO3_PLAYTIME0",
        10033: "VIDEO3_PLAYTIME25",
        10034: "VIDEO3_PLAYTIME50",
        10035: "VIDEO3_PLAYTIME75",
        10036: "VIDEO3_PLAYTIME100",
        10037: "VIDEO4_PLAYTIME0",
        10038: "VIDEO4_PLAYTIME25",
        10039: "VIDEO4_PLAYTIME50",
        10040: "VIDEO4_PLAYTIME75",
        10041: "VIDEO4_PLAYTIME100",
        10042: "VIDEO5_PLAYTIME0",
        10043: "VIDEO5_PLAYTIME25",
        10044: "VIDEO5_PLAYTIME50",
        10045: "VIDEO5_PLAYTIME75",
        10046: "VIDEO5_PLAYTIME100",
        10177: "CATALOG_VIEW_SHEET",
        10178: "CATALOG_VIEW_OFFER",
        10179: "CATALOG_CLICK_OFFER_ATTACHMENT",
        10180: "CATALOG_CLICK_IMAGE_ATTACHMENT",
        10181: "CATALOG_CLICK_VIDEO_ATTACHMENT",
        10182: "CATALOG_CLICK_OFFER_GROUP_ATTACHMENT",
        10183: "CATALOG_CLICK_IMAGE_GROUP_ATTACHMENT",
        10184: "CATALOG_CLICK_WEB_SNIPPET_ATTACHMENT",
        10185: "CATALOG_CLICK_CALL_TO_ORDER_ATTACHMENT",
        10197: "CATALOG_CLICK_THROUGH_OFFER",
        10198: "VISUAL_SHOPPING_ROW_SCROLL"
    };
    W("studio_events") && (di[10199] = "GDN_REPORTING_DEFERRED");
    var ei = Xa(bb({
        uk: "chrgact",
        wk: "ctype",
        yk: "cycchrg",
        zk: "deferred_action",
        Ck: "no_charge",
        Dk: "engact",
        Ek: "engactd",
        Fk: "engcyc",
        Gk: "engdelay",
        Mk: "label",
        Nk: "explen",
        Sk: "noconv",
        Rk: "notifier",
        Uk: "random",
        al: "unload",
        dl: "value",
        el: "visfrc",
        fl: "viscrd"
    }), bb(Kg), bb({Xk: "row"}), bb(Lg)), fi = function (a) {
        var b = {};
        Ja(a, function (a, d) {
            Va(ei, d) && (b[d] = a)
        });
        return b
    };
    var gi = function () {
        this.time = 0;
        this.zf = !1;
        this.data = null
    };
    gi.prototype.setTime = function (a) {
        this.time = a;
        return this
    };
    var hi = function (a, b) {
        this.Wg = a;
        this.og = b
    };
    y(hi, gi);
    var ii = function (a, b) {
        var c = [], d = "", e = b.indexOf("?") + 1;
        0 != e ? (c.push(b.substr(0, e)), d = b.substr(e)) : (c.push(b), c.push("?"));
        Ja(a, function (a, b) {
            d = d.replace(new RegExp(b + "=[^&\\s]*&?"), "");
            c.push([b, "=", a, "&"].join(""))
        });
        d ? c.push(d) : (e = c.pop(), e = e.substr(0, e.length - 1), c.push(e));
        return c.join("")
    };
    hi.prototype.Sg = function () {
        if (this.zf) {
            var a = {
                context: "GdnChargeableEventUrlBuilder assembleUrl",
                msg: "eventAlreadySent cannot be true for chargeable url: " + this.Wg
            };
            Ec("cpeunif", a);
            return ""
        }
        a = gb(this.data || {});
        a.ctype = this.Wg.toString();
        return ii(a, this.og)
    };
    var ji = function (a, b) {
        this.yj = a;
        this.og = b
    };
    y(ji, gi);
    ji.prototype.Sg = function () {
        var a = gb(this.data || {});
        a.label = this.yj;
        this.zf && (a.noconv = 1);
        a.random = w();
        var b = [this.og], c;
        for (c in a)Be(c, a[c], b);
        return Ae(b)
    };
    var ki = function (a, b) {
        this.v = a;
        this.Vg = !1;
        this.Bf = {};
        this.Cb = [];
        this.cf = [];
        this.Od = 0;
        this.ki = 1049;
        this.Q = b;
        this.bh = !1
    };
    ki.prototype.reportEvents = function (a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b], d = c.unifiedReportingEvent, e = "CUSTOM_EVENT" != d.type ? d.type : d.name, f;
            f = e;
            if (this.v.cpeEnabled() && !V().ENGAGEMENT_URL) {
                var h = {
                    context: "GdnEventReporter.shouldReportChargeableEvent",
                    msg: "CPE is enabled but chargeable url is not set"
                };
                ig("cpeAndNoChargeableUrl", h);
                f = !1
            } else!this.v.cpeEnabled() || this.bh || li(this) || (h = {
                context: "GdnEventReporter.shouldReportChargeableEvent",
                msg: "CPE default chargeable event is not configured and attempt to configure failed."
            },
                ig("cpeChargeableEventConfigureFailed", h)), f = 0 == this.Cb.length && !!ci[f] || Va(this.Cb, f), f = this.v.cpeEnabled() && !!V().ENGAGEMENT_URL && !this.Vg && f;
            if (f) {
                if (this.Vg = !0, d = this.Q, d.Ua.chargeableAction = e, d.Ua.cycleWasCharged = !0, mi(this, e, new hi(ci[e] || ci.GENERIC_ENGAGEMENT, V().ENGAGEMENT_URL || ""), 1, c.time, !0, c.data, !1), 1 < c.count) {
                    this.Bf[e] = !0;
                    d = [];
                    if (n(c.data))for (f = 1; f < c.data.length; ++f)d.push(hb(c.data[f]));
                    ni(this, e, {count: c.count - 1, time: 0, data: d, unifiedReportingEvent: c.unifiedReportingEvent})
                }
            } else f =
                e, this.v.$g.md() ? f = m(bi[f]) : (ig("noFreeUrl", {
                context: "GdnEventReporter.shouldReportFreeEvent",
                msg: "free url is not set"
            }), f = !1), f ? ni(this, e, c) : (c = d, W("log_ignored_events") && "Counter" == c.trigger && "CUSTOM_EVENT" == c.type && (c = Ma(e + ",").length, this.Od += c, this.Od > this.ki && (oi(this), this.Od = c), Za(this.cf, e)));
            this.Bf[e] = !0
        }
    };
    var ni = function (a, b, c) {
        var d = !!a.Bf[b], e = new ji(bi[b], a.v.$g.md() || "");
        mi(a, b, e, c.count, c.time, !1, c.data, d)
    }, mi = function (a, b, c, d, e, f, h, k) {
        for (var q = 0; q < d; ++q) {
            var v = [];
            n(h) && h.length > q && (v = fi(h[q]));
            if ("engstart"in v) {
                var t = a.Q, R = b;
                t.he = w();
                if (t.cb) {
                    var P = t.cb, qa = t.he;
                    if (null == P.Fd) {
                        var zc = [{interval: 1E3, args: {action: 10013}}, {
                            interval: 2E3,
                            args: {action: 10014}
                        }, {interval: 3E3, args: {action: 10015, chargeable: !0}}, {
                            interval: 4E3,
                            args: {action: 10016}
                        }, {interval: 5E3, args: {action: 10017}}, {interval: 1E4, args: {action: 10018}},
                            {interval: 15E3, args: {action: 10019}}, {
                                interval: 3E4,
                                args: {action: 10020}
                            }, {interval: 6E4, args: {action: 10021}}, {
                                interval: 9E4,
                                args: {action: 10022}
                            }, {interval: 12E4, args: {action: 10023}}, {
                                interval: 18E4,
                                args: {action: 10024}
                            }], db = V().EXPERIMENTAL_REPORTING_SCHEDULE, Se = void 0, Db = V().ENGAGEMENT_CONVERSION_URLS;
                        m(Db) && (Se = Db.ENGAGEMENT_DURATION_10S);
                        if (m(db))try {
                            zc = Jc(db).schedule
                        } catch (ik) {
                            ig("badExpSchedJson", {
                                context: "experimental reporting schedule parse error",
                                msg: ik.toString()
                            })
                        }
                        if (m(Se)) {
                            db = null;
                            for (Db = 0; Db <
                            zc.length; Db++)if (1E4 == zc[Db].interval) {
                                db = zc[Db];
                                break
                            }
                            db && fa(db.args) && !m(db.args.conversionUrl) && (db.args.conversionUrl = Se)
                        }
                        P.Fd = zc
                    }
                    P.Vb = 0;
                    P.Ld = 0;
                    P.bb = qa;
                    qa = w() - P.bb;
                    pi(P, qa)
                }
                t.Ua.currentState = 1;
                t.Ua.timestamp = t.he;
                t.Ua.engagementAction = R
            } else"engend"in v && (t = a.Q, t.yf = w(), t.cb && (t = t.cb, t.ic && qi(t), clearTimeout(t.Pe), t.Vb = 0, t.bb = null, t.Pe = 0), t = v, P = a.Q, P.yf ? (R = P.yf - P.he, qa = 0, P.cb && (P = P.cb, P.ic ? (qa = w() - P.Je, qa = P.Ld + qa) : qa = P.Ld), R -= qa) : R = 0, t.explen = "" + R);
            t = eh(a.v, f);
            lb(t, v);
            R = c.setTime(e);
            R.zf = k;
            R.data =
                t;
            if (t = R.Sg())2E3 < t.length && ig("reporting-url-too-long"), Ha(A, t), 0 < e && (e = 0), k = !0;
            "engend"in v && (v = a.Q, v.Ua.currentState = 0, v.Ua.timestamp = w(), v.Ua.engagementCycle++, v.Ua.cycleWasCharged = !1, oi(a))
        }
    };
    g = ki.prototype;
    g.registerChargeableEventName = function (a) {
        Va(this.Cb, a) || Za(this.Cb, a)
    };
    g.logCustomVariable = ba;
    g.getType = function () {
        return "GDN"
    };
    g.getConfig = function () {
        return {reportingApiVersion: 2}
    };
    g.newReporterCallback = function (a) {
        r(a.getType) && "STUDIO" == a.getType() && (this.v.Cg = !0)
    };
    g.supportsChargeableEvents = function () {
        return this.v.cpeEnabled()
    };
    var li = function (a) {
        if (!A.CREATIVE_TOOLSET_PARAMS || null == V().NEVER_CHARGE_FOR_EXPANSION)return !1;
        V().NEVER_CHARGE_FOR_EXPANSION && 0 == a.Cb.length && ai().registerChargeableEventName("GENERIC_ENGAGEMENT");
        return a.bh = !0
    }, oi = function (a) {
        0 != a.cf.length && (jg("unreportedEvents", {events: a.cf}, 1), a.cf = [], a.Od = 0)
    };
    var si = function (a, b) {
        this.v = a;
        this.Q = b;
        if (!ri) {
            var c = ai();
            this.Gf = new ki(this.v, this.Q);
            c.addReporter(this.Gf);
            ri = !0;
            this.v.Yi = !0
        }
        this.Gf && li(this.Gf)
    }, ri = !1, ti = {29: !0, 30: !0}, ui = function (a, b) {
        var c = di[a];
        return m(c) ? {
            unifiedReportingEvent: {type: "CUSTOM_EVENT", name: c, videoName: "", trigger: "Counter"},
            count: 1,
            time: 0,
            data: [b]
        } : null
    };
    si.prototype.mc = function (a, b) {
        var c = null;
        (W("studio_events") ? !ti[a] : 1) ? c = ui(a, b) : this.v.Cg ? this.v.Cg && (fa(b) || (b = {}), b.deferred_action = a, c = ui(Og.GDN_REPORTING_DEFERED, b)) : c = ui(a, b);
        c && ai().reportEvents([c])
    };
    si.prototype.setChargeableAction = function (a) {
        (a = di[a]) && ai().registerChargeableEventName(a)
    };
    var vi = function () {
        this.Ua = CreativeToolset.EngagementState;
        this.cb = this.yf = this.he = null
    };
    vi.prototype.getEngagementState = function () {
        return this.Ua
    };
    var xi = function (a) {
        var b = wi;
        return function () {
            var c = this || l, c = c.closure_memoize_cache_ || (c.closure_memoize_cache_ = {}), d = b(ia(a), arguments);
            return c.hasOwnProperty(d) ? c[d] : c[d] = a.apply(this, arguments)
        }
    }, wi = function (a, b) {
        for (var c = [a], d = b.length - 1; 0 <= d; --d)c.push(typeof b[d], b[d]);
        return c.join("\x0B")
    };
    var yi = function (a) {
        M.call(this);
        this.Ea = a || nc();
        if (this.mh = this.Zi())this.Qi = K(this.Ea.G, this.mh, u(this.aj, this))
    };
    y(yi, M);
    g = yi.prototype;
    g.Zi = xi(function () {
        var a = this.isSupported(), b = "hidden" != this.le();
        return a ? b ? ((Cf() || "") + "visibilitychange").toLowerCase() : "visibilitychange" : null
    });
    g.le = xi(function () {
        return Df("hidden", this.Ea.G)
    });
    g.$i = xi(function () {
        return Df("visibilityState", this.Ea.G)
    });
    g.isSupported = function () {
        return !!this.le()
    };
    g.aj = function () {
        var a = this.isSupported() ? this.Ea.G[this.$i()] : null, a = new zi(!!this.Ea.G[this.le()], a);
        this.dispatchEvent(a)
    };
    g.i = function () {
        L(this.Qi);
        yi.j.i.call(this)
    };
    var zi = function (a, b) {
        dd.call(this, "visibilitychange");
        this.hidden = a;
        this.visibilityState = b
    };
    y(zi, dd);
    var Ai = function (a) {
        J.call(this);
        this.Vj = a;
        this.Fd = null;
        this.Vb = 0;
        this.bb = null;
        this.Pe = 0;
        this.ic = !1;
        this.Je = null;
        this.Ld = 0;
        W("ignore_page_visibility_events") || (a = new yi, bd(this, a), K(a, "visibilitychange", this.th, !1, this), (a = A.mraid) && a.addEventListener && a.addEventListener("viewableChange", u(this.th, this)))
    };
    y(Ai, J);
    var pi = function (a, b) {
        if (!a.ic && a.Vb < a.Fd.length) {
            var c = a.Fd[a.Vb].interval - b;
            0 < c ? a.Pe = setTimeout(u(a.di, a), c) : a.di()
        }
    };
    Ai.prototype.di = function () {
        if (null != this.bb) {
            var a = w() - this.bb;
            this.Vj(this.Fd[this.Vb].args, a);
            this.Vb += 1;
            pi(this, a)
        }
    };
    var qi = function (a) {
        if (a.ic && null != a.bb) {
            a.ic = !1;
            var b = w() - a.Je;
            a.Ld += b;
            a.bb += b;
            a.Je = null;
            b = w() - a.bb;
            pi(a, b)
        }
    };
    Ai.prototype.th = function (a) {
        (fa(a) ? a.hidden : !a) ? this.ic || null == this.bb || (clearTimeout(this.Pe), this.Je = w(), this.ic = !0) : qi(this)
    };
    var Bi = function () {
        this.rg = ""
    }, Ci = function (a, b) {
        var c;
        a.rg || (c = V(), a.rg = c && c.SEARCH_UPLIFT_URL ? c.SEARCH_UPLIFT_URL : "");
        if (c = a.rg) {
            for (var d = c.search(De), e = 0, f, h = []; 0 <= (f = Ce(c, e, "vi", d));)h.push(c.substring(e, f)), e = Math.min(c.indexOf("&", f) + 1 || d, d);
            h.push(c.substr(e));
            c = [h.join("").replace(Ee, "$1"), "&", "vi"];
            null != b && c.push("=", encodeURIComponent(String(b)));
            c = Ae(c);
            z.body ? (Ia || (d = z.createElement("iframe"), d.style.display = "none", d.id = "anonIframe", Ia = d, z.body.appendChild(d)), d = !0) : d = !1;
            d && Ha(Ia.contentWindow,
                c)
        }
    };
    var Di = function (a) {
        J.call(this);
        this.v = a;
        this.cb = new Ai(u(this.Xi, this));
        bd(this, this.cb);
        this.Q = new vi;
        this.Q.cb = this.cb;
        this.v.Q = this.Q;
        this.bi = new si(this.v, this.Q);
        this.Yj = new Bi
    };
    y(Di, J);
    Di.prototype.Xi = function (a, b) {
        var c = {};
        c.explen = b;
        if (a.chargeable)this.mc(32, c); else if (m(a.conversionUrl)) {
            var d = new Fe(a.conversionUrl);
            Ge(d, A.location.protocol);
            d = d.toString();
            Yh(d) && Ha(A, d)
        }
        this.mc(a.action, c)
    };
    Di.prototype.setChargeableAction = function (a) {
        ci[di[a]] && this.bi.setChargeableAction(a)
    };
    Di.prototype.mc = function (a, b) {
        if ("number" === typeof a) {
            var c = b || {}, d = this.Yj;
            switch (a) {
                case 29:
                case 30:
                    Ci(d, "201");
                    break;
                case 32:
                    Ci(d, "259");
                    break;
                case 10013:
                    Ci(d, "202");
                    break;
                case 10014:
                    Ci(d, "203");
                    break;
                case 10015:
                    Ci(d, "204");
                    break;
                case 10016:
                    Ci(d, "205");
                    break;
                case 10017:
                    Ci(d, "206");
                    break;
                case 10018:
                    Ci(d, "211");
                    break;
                case 10019:
                    Ci(d, "216");
                    break;
                case 10020:
                    Ci(d, "231");
                    break;
                case 10021:
                    Ci(d, "240");
                    break;
                case 10022:
                    Ci(d, "241");
                    break;
                case 10023:
                    Ci(d, "242");
                    break;
                case 10024:
                    Ci(d, "243")
            }
            this.bi.mc(a,
                c)
        }
    };
    var Ei = function (a, b, c, d) {
        this.hf = a;
        this.kf = b;
        this.jf = c;
        this.lf = d
    };
    Ei.prototype.clone = function () {
        return new Ei(this.hf, this.kf, this.jf, this.lf)
    };
    var Fi = function (a) {
        var b = a.jf - a.hf;
        a = a.lf - a.kf;
        return b * b + a * a
    }, Gi = function (a, b) {
        var c = a.hf, d = a.kf;
        return new C(c + b * (a.jf - c), d + b * (a.lf - d))
    };
    var Hi = function (a, b) {
        M.call(this);
        this.Bd = 0;
        this.ye = this.Uc = !1;
        this.o = a;
        this.ak = b;
        this.ye || (this.ye = !0, this.Jj = K(this.o, "touchstart", la(this.Be, u(this.pj, this)), !1, this), this.Ij = K(this.o, "touchmove", la(this.Be, u(this.nj, this)), !1, this), this.Hj = K(this.o, "touchend", la(this.Be, u(this.mj, this)), !1, this), this.Gj = K(this.o, "touchcancel", la(this.Be, u(this.lj, this)), !1, this))
    };
    y(Hi, M);
    Hi.prototype.i = function () {
        this.ye && (this.Uc = !1, this.Bd = 0, this.ye = !1, L(this.Jj), L(this.Ij), L(this.Hj), L(this.Gj));
        Hi.j.i.call(this)
    };
    var Ii = function (a, b) {
        if (!a.Uc)return null;
        for (var c = 0; c < b.changedTouches.length; c++) {
            var d = b.changedTouches[c];
            if (a.Bd == d.identifier)return d
        }
        return null
    };
    g = Hi.prototype;
    g.pj = function (a) {
        var b = a.W();
        this.Uc || 0 == b.targetTouches.length || (b = b.targetTouches[b.targetTouches.length - 1], this.Bd = b.identifier, this.Uc = !0, this.dispatchEvent({
            type: "singletouchstart",
            Ab: b,
            hb: a
        }))
    };
    g.nj = function (a) {
        var b = Ii(this, a.W());
        b && this.dispatchEvent({type: "singletouchmove", Ab: b, hb: a})
    };
    g.mj = function (a) {
        var b = Ii(this, a.W());
        b && (this.Uc = !1, this.Bd = 0, this.dispatchEvent({type: "singletouchend", Ab: b, hb: a}))
    };
    g.lj = function (a) {
        var b = Ii(this, a.W());
        b && (this.Uc = !1, this.Bd = 0, this.dispatchEvent({type: "singletouchcancel", Ab: b, hb: a}))
    };
    g.Be = function (a, b) {
        this.ak && b.preventDefault();
        a(b)
    };
    var Ji = function (a, b) {
        M.call(this);
        this.lg = a;
        this.yb = this.We = this.Ye = this.kg = null;
        this.Dg = 0;
        this.Cc = !1;
        this.zg = [K(b, "singletouchstart", this.kj, !1, this), K(b, "singletouchmove", this.jj, !1, this), K(b, "singletouchend", this.ij, !1, this), K(b, "singletouchcancel", this.hj, !1, this)]
    };
    y(Ji, M);
    Ji.prototype.kj = function (a) {
        if (!this.Cc) {
            this.Cc = !0;
            var b = new C(a.Ab.clientX, a.Ab.clientY);
            this.lg.update();
            var c = O(vc(this.lg.ua.I.O)), d;
            d = this.lg.ua;
            d = Ki(d, d.Jd, d.I.wc());
            this.kg = new Ei(c.x, c.y, d.x, d.y);
            this.Ye = Ob(b, c);
            this.We = new Ei(b.x, b.y, d.x + this.Ye.x, d.y + this.Ye.y);
            this.yb = b;
            this.Dg = Math.sqrt(Fi(this.We));
            Li(this, "linearswipestart", a)
        }
    };
    var Li = function (a, b, c) {
        var d;
        d = a.We;
        var e = c.Ab.clientX, f;
        e instanceof C ? (f = e.y, e = e.x) : f = c.Ab.clientY;
        var h = d.hf, k = d.kf;
        d = Gi(d, Kb(((e - h) * (d.jf - h) + (f - k) * (d.lf - k)) / Fi(d), 1));
        a.yb && (d = Nb(a.yb, d) / a.Dg, e = new C(c.Ab.clientX, c.Ab.clientY), a.dispatchEvent({
            type: b,
            M: d,
            ah: Gi(a.kg, d),
            kk: e,
            hb: c.hb,
            direction: !a.yb || Mb(e, a.yb) ? "none" : Mi(Lb(180 * Math.atan2(e.y - a.yb.y, e.x - a.yb.x) / Math.PI)),
            nl: Nb(a.yb, e)
        }))
    };
    Ji.prototype.jj = function (a) {
        this.Cc && Li(this, "linearswipeprogress", a)
    };
    Ji.prototype.ij = function (a) {
        this.Cc && (Li(this, "linearswipeend", a), this.ab())
    };
    Ji.prototype.hj = function (a) {
        this.Cc && (Li(this, "linearswipecancel", a), this.ab())
    };
    var Mi = function (a) {
        a = Lb(a);
        return 45 >= a ? "right" : 135 >= a ? "down" : 225 >= a ? "left" : 315 >= a ? "up" : "right"
    };
    Ji.prototype.ab = function () {
        this.Cc = !1;
        this.yb = this.We = this.kg = null;
        this.Dg = 0;
        this.Ye = null
    };
    Ji.prototype.i = function () {
        for (var a = 0; a < this.zg.length; a++)L(this.zg[a]);
        this.zg = []
    };
    var Ni = function (a, b, c, d, e, f) {
        this.r = a;
        this.I = b;
        this.q = c;
        this.F = d;
        this.ua = e;
        this.Wb = f;
        this.fc = -1;
        this.Qf = !1;
        this.Xe = 0;
        this.Bh = this.Sf = !1;
        W("instant_target_animation") && (this.Bh = !0);
        this.dg = -1;
        this.ab()
    };
    y(Ni, J);
    Ni.prototype.ab = function () {
        clearTimeout(this.fc);
        this.fc = -1;
        this.Qf = !1;
        clearTimeout(this.dg);
        this.dg = -1;
        this.q.reset();
        var a = this.I;
        Oi(a);
        N(a.s, "box-shadow", "none");
        Pi(a);
        ag(a.k);
        this.F.reset()
    };
    var Si = function (a) {
        var b;
        if (a.Sf) {
            if (a.Sf = !1, b = 1E3, a.Bh) {
                a.q.mg(Qi(a.ua), Ri(a.ua));
                Si(a);
                return
            }
        } else b = a.Xe, a.Xe = Math.min(a.Xe + 1E3, 7E3);
        a.dg = setTimeout(u(a.Qj, a), b)
    };
    Ni.prototype.Qj = function () {
        this.q.mg(Qi(this.ua), Ri(this.ua));
        Si(this)
    };
    Ni.prototype.i = function () {
        clearTimeout(this.fc)
    };
    var Ti = function (a, b, c, d, e) {
        this.lc = d;
        this.Wb = a;
        this.Ti = e;
        this.Xj = b;
        this.qd = !1;
        this.Id = 0;
        this.Yf = [K(c, "linearswipestart", this.fj, !1, this), K(c, "linearswipeprogress", this.ej, !1, this), K(c, "linearswipeend", this.cj, !1, this), K(c, "linearswipecancel", this.bj, !1, this)]
    };
    y(Ti, J);
    g = Ti.prototype;
    g.i = function () {
        for (var a = 0; a < this.Yf.length; a++)L(this.Yf[a]);
        this.Yf = [];
        clearTimeout(this.Id)
    };
    g.dj = function (a) {
        a.hb.preventDefault();
        var b = this.lc;
        b.Qf = !0;
        W("swipe_unhook_vibration") && b.r.navigator.vibrate && b.r.navigator.vibrate(10);
        var c = b.I;
        T(c.k, c.O, "position", "fixed", "important");
        T(c.k, c.s, "position", "fixed", "important");
        T(c.k, c.O, "z-index", 999999, "important");
        T(c.k, c.s, "z-index", 999999, "important");
        N(c.s, "box-shadow", "10px 10px 10px #444");
        Ui(b.I, a.ah, 0);
        b.Xe = 3E3;
        b.Sf = !0;
        Si(b);
        a = b.ua;
        b.q.show(Ki(a, a.Jd, a.gk));
        b.F.show();
        this.qd = !0
    };
    g.fj = function (a) {
        var b = this.lc;
        -1 != b.fc && (b.ab(), clearTimeout(b.fc), b.fc = -1);
        var c = b.I, d = a.kk, e = Pf(c.O), f = O(vc(c.O));
        Lf(c.fb, d.x - f.x - e.width, d.y - f.y - e.height);
        Q(c.fb, !0);
        c.Hg.play(!0);
        b = b.I;
        b.Pf = !1;
        b.Og.stop();
        Q(b.ga, !0);
        b.ga.style.opacity = .7;
        this.qd = !1;
        this.Id = setTimeout(u(this.dj, this, a), this.Xj)
    };
    g.ej = function (a) {
        if (this.qd) {
            a.hb.preventDefault();
            var b = this.lc;
            0 < a.M && (Oi(b.I), Pi(b.I));
            Ui(b.I, a.ah, a.M);
            b.F.Pd(a.M);
            b.q.Pd(a.M);
            a.M > b.Wb ? b.q.Gh() : b.q.bf()
        } else clearTimeout(this.Id)
    };
    g.cj = function (a) {
        var b = this.lc;
        b.Qf ? b.ab() : b.fc = setTimeout(u(b.ab, b), 1E3);
        this.qd ? (a.hb.preventDefault(), a.M > this.Wb && this.Ti()) : clearTimeout(this.Id)
    };
    g.bj = function (a) {
        this.lc.ab();
        this.qd ? a.hb.preventDefault() : clearTimeout(this.Id)
    };
    var Vi = function (a) {
        this.ua = a
    };
    Vi.prototype.update = function () {
        Wi(this.ua)
    };
    var Xi = {tk: 1, bl: 2, Pk: 3}, Yi = function (a, b, c) {
        this.r = a;
        this.I = b;
        this.gk = c;
        this.Jd = 1
    }, Zi = function (a, b) {
        return Nb(Ki(a, b, a.I.wc()), O(vc(a.I.O)))
    }, $i = function (a, b) {
        var c = a.nd();
        switch (b) {
            case 1:
                return new C(c.width / 2, c.height / 2);
            case 2:
                return new C(c.width / 2, c.height / 2 - 125);
            case 3:
                return new C(c.width / 2, c.height / 2 + 125);
            default:
                return new C(c.width / 2, c.height / 2)
        }
    }, Ki = function (a, b, c) {
        return Ob($i(a, b), new C(c.width / 2, c.height / 2))
    };
    Yi.prototype.nd = function () {
        var a = this.r;
        return eg() ? new D(a.innerWidth, a.innerHeight) : rc(a)
    };
    var Ri = function (a) {
        return $i(a, a.Jd)
    }, Qi = function (a) {
        var b = a.I.wc();
        a = O(vc(a.I.O));
        return new C(a.x + b.width / 2, a.y + b.height / 2)
    }, Wi = function (a) {
        var b = Zi(a, 1);
        if (100 < b)a.Jd = 1; else for (var c in Xi) {
            var d = Xi[c], e = Zi(a, d);
            e > b && (a.Jd = d, b = e)
        }
    };
    var bj = function (a, b) {
        this.O = b;
        var c = Pf(this.O);
        this.k = new Xf;
        this.s = a.document.createElement("div");
        this.s.style.width = c.width + "px";
        this.s.style.height = c.height + "px";
        this.s.style.zIndex = If(this.O, "zIndex");
        this.s.style.position = "absolute";
        this.s.style.top = "0";
        this.s.style.left = "0";
        this.s.style.backgroundColor = "rgba(0, 0, 0, 0)";
        this.s.style.overflow = "hidden";
        Sf(this.s);
        this.O.parentNode.appendChild(this.s);
        Q(this.s, !0);
        this.ga = a.document.createElement("div");
        this.ga.style.width = c.width + "px";
        this.ga.style.height =
            c.height + "px";
        this.ga.style.position = "absolute";
        this.ga.style.top = "0px";
        this.ga.style.left = "0px";
        this.ga.style.opacity = .7;
        this.ga.style.backgroundColor = "#fff";
        Sf(this.ga);
        this.s.appendChild(this.ga);
        Q(this.ga, !1);
        this.Og = new nh(this.ga, .5, {opacity: .7}, {opacity: 0}, [{
            fa: "opacity",
            duration: .5,
            timing: "ease-in",
            ca: 0
        }]);
        this.Pf = !0;
        this.fb = a.document.createElement("div");
        this.fb.style.position = "relative";
        this.fb.style.height = 2 * c.height + "px";
        this.fb.style.width = 2 * c.width + "px";
        Sf(this.fb);
        this.s.appendChild(this.fb);
        this.za = a.document.createElement("div");
        this.za.style.position = "absolute";
        this.za.style.margin = "auto";
        this.za.style.bottom = "0";
        this.za.style.top = "0";
        this.za.style.right = "0";
        this.za.style.left = "0";
        this.za.style.opacity = .09;
        this.za.style.backgroundColor = "#000";
        this.za.style.borderRadius = "50%";
        Sf(this.za);
        this.fb.appendChild(this.za);
        this.Ra = a.document.createElement("div");
        this.Ra.style.width = c.width + "px";
        this.Ra.style.height = c.height + "px";
        this.Ra.style.position = "absolute";
        this.Ra.style.top = "0px";
        this.Ra.style.left =
            "0px";
        this.Ra.style.backgroundColor = "rgba(0, 0, 0, 0)";
        Sf(this.Ra);
        this.s.appendChild(this.Ra);
        var d = vc(this.O), e = Jf(d);
        if ("absolute" != e && "fixed" != e && "relative" != e) {
            var e = O(d), f = O(this.O);
            d.style.position = "relative";
            var d = O(d), h = O(this.O);
            Mb(e, d) || aj("swipe-iframe-parent-coords-changed", e, d);
            Mb(f, h) || aj("swipe-iframe-moved-after-parent-position-changed", f, h)
        }
        e = O(this.O);
        f = O(this.s);
        Mb(e, f) || (aj("swipe-overlay-incorrect-after-parent-position-changed", e, f), e = Ob(e, f), this.s.style.top = e.y + "px", this.s.style.left =
            e.x + "px", e = O(this.O), f = O(this.s), Mb(e, f) || aj("swipe-overlay-incorrect-after-offset", e, f));
        c = .95 * Math.max(c.width, c.height);
        this.Hg = new nh(this.za, .4, {height: "15px", width: "15px"}, {
            height: c + "px",
            width: c + "px"
        }, [{fa: "height", duration: .4, timing: "ease-out", ca: 0}, {
            fa: "width",
            duration: .4,
            timing: "ease-out",
            ca: 0
        }]);
        K(this.Hg, "end", u(this.oj, this), !1)
    };
    y(bj, J);
    var aj = function (a, b, c) {
        jg(a, {x1: b.x, y1: b.y, x2: c.x, y2: c.y})
    }, Oi = function (a) {
        a.Hg.stop();
        Q(a.fb, !1)
    };
    bj.prototype.oj = function () {
        Oi(this);
        Pi(this)
    };
    var Ui = function (a, b, c) {
        c = 5 * (1 - c);
        b = new C(b.x - c, b.y - c);
        U(a.k, a.s, "left", b.x, "important");
        U(a.k, a.s, "top", b.y, "important");
        U(a.k, a.O, "left", b.x, "important");
        U(a.k, a.O, "top", b.y, "important")
    }, Pi = function (a) {
        a.Pf || (a.Pf = !0, a.Og.play(!0))
    };
    bj.prototype.wc = function () {
        return Pf(this.Ra)
    };
    bj.prototype.i = function () {
        I(this.Ra);
        I(this.za);
        I(this.fb);
        I(this.ga);
        I(this.s);
        ag(this.k)
    };
    var cj = function (a) {
        this.F = a.document.createElement("div");
        this.F.style.width = "100%";
        this.F.style.height = "100%";
        this.F.style.zIndex = 999997;
        this.F.style.position = "fixed";
        Qf(this.F, 0);
        Lf(this.F, 0, 0);
        this.F.style.backgroundColor = "gray";
        a.document.body.appendChild(this.F);
        this.pd()
    };
    y(cj, J);
    g = cj.prototype;
    g.Pd = function (a) {
        Qf(this.F, .7 * a)
    };
    g.reset = function () {
        this.Pd(0);
        this.pd()
    };
    g.show = function () {
        Q(this.F, !0)
    };
    g.pd = function () {
        Q(this.F, !1)
    };
    g.i = function () {
        I(this.F);
        this.F = null
    };
    var dj = function () {
    };
    y(dj, J);
    var fj = function (a, b, c) {
        this.r = a;
        this.ik = c;
        this.xa = new D(150, 150);
        this.ma = a.document.createElement("div");
        this.ma.style.width = this.xa.width + "px";
        this.ma.style.height = this.xa.height + "px";
        this.ma.style.zIndex = 1000004;
        this.ma.style.position = "fixed";
        this.ma.style.opacity = .98;
        Sf(this.ma);
        a.document.body.appendChild(this.ma);
        this.Z = a.document.createElement("div");
        this.Z.style.borderRadius = "50%";
        this.Z.style.width = "100%";
        this.Z.style.height = "100%";
        this.Z.style.margin = "auto";
        this.Z.style.position = "absolute";
        this.Z.style.bottom = "0";
        this.Z.style.top = "0";
        this.Z.style.right = "0";
        this.Z.style.left = "0";
        this.Z.style.border = "2px dotted";
        this.Z.style.borderColor = "#4285F4";
        this.Z.style.boxSizing = "border-box";
        Sf(this.Z);
        this.ma.appendChild(this.Z);
        this.C = a.document.createElement("div");
        this.C.style.borderRadius = "50%";
        this.C.style.width = "70px";
        this.C.style.height = "70px";
        this.C.style.margin = "auto";
        this.C.style.position = "absolute";
        this.C.style.bottom = "0";
        this.C.style.top = "0";
        this.C.style.right = "0";
        this.C.style.left =
            "0";
        this.C.style.backgroundColor = "#4285F4";
        Sf(this.C);
        this.ma.appendChild(this.C);
        this.ya = a.document.createElement("div");
        this.ya.style.width = "53px";
        this.ya.style.height = "53px";
        this.ya.style.margin = "auto";
        this.ya.style.position = "absolute";
        this.ya.style.bottom = "0";
        this.ya.style.top = "0";
        this.ya.style.right = "0";
        this.ya.style.left = "0";
        this.ya.style.backgroundImage = "url('" + ej(this, "expand_arrows_53.svg") + "')";
        this.ya.style.backgroundRepeat = "no-repeat";
        this.ya.style.backgroundPosition = "center";
        Sf(this.ya);
        this.ma.appendChild(this.ya);
        this.ka = a.document.createElement("div");
        this.ka.style.width = this.xa.width + "px";
        this.ka.style.height = this.xa.height + "px";
        this.ka.style.zIndex = 1000003;
        this.ka.style.position = "fixed";
        Sf(this.ka);
        a.document.body.appendChild(this.ka);
        this.Fa = a.document.createElement("div");
        this.Fa.style.borderRadius = "50%";
        this.Fa.style.width = "70px";
        this.Fa.style.height = "70px";
        this.Fa.style.margin = "auto";
        this.Fa.style.position = "absolute";
        this.Fa.style.bottom = "0";
        this.Fa.style.top = "0";
        this.Fa.style.right =
            "0";
        this.Fa.style.left = "0";
        this.Fa.style.backgroundColor = "#4285F4";
        Sf(this.Fa);
        this.ka.appendChild(this.Fa);
        this.la = a.document.createElement("div");
        this.la.style.width = "48px";
        this.la.style.height = "48px";
        this.la.style.margin = "auto";
        this.la.style.position = "absolute";
        this.la.style.bottom = "0";
        this.la.style.top = "0";
        this.la.style.right = "0";
        this.la.style.left = "0";
        this.la.style.backgroundImage = "url('" + ej(this, "white_chevron_right_48.png") + "')";
        this.la.style.backgroundRepeat = "no-repeat";
        this.la.style.backgroundPosition =
            "center";
        Sf(this.la);
        this.ka.appendChild(this.la);
        this.$b = null;
        this.Nf = new nh(this.C, 1.3, {height: "70px", width: "70px"}, {
            height: "150px",
            width: "150px"
        }, [{fa: "height", duration: .5, timing: "ease-out", ca: .8}, {
            fa: "width",
            duration: .5,
            timing: "ease-out",
            ca: .8
        }]);
        this.Mf = new nh(this.C, .5, {height: "150px", width: "150px"}, {height: "70px", width: "70px"}, [{
            fa: "height",
            duration: .4,
            timing: "ease-in-out",
            ca: .1
        }, {fa: "width", duration: .4, timing: "ease-in-out", ca: .1}]);
        this.wh = new nh(this.Z, 1.3 + .1, {opacity: 0}, {opacity: 1}, [{
            fa: "opacity",
            duration: .1, timing: "ease-in", ca: 1.3
        }]);
        this.rj = K(this.Nf, "end", u(this.Rj, this), !1)
    };
    y(fj, dj);
    fj.prototype.show = function (a) {
        Lf(this.ma, a);
        Q(this.ma, !0);
        Q(this.C, !0)
    };
    var ej = function (a, b) {
        return ["http:" == a.r.location.protocol ? "http:" : "https:", "//pagead2.googlesyndication.com/pagead/bf/images/", b].join("")
    };
    g = fj.prototype;
    g.Gh = function () {
    };
    g.bf = function () {
    };
    g.Pd = function (a) {
        if (0 != a || null == this.$b)0 < a && null != this.$b && gj(this), a = 70 + 80 * Math.min(a / (this.ik + .05), 1) + "px", this.C.style.width = a, this.C.style.height = a
    };
    g.mg = function (a, b) {
        var c = new C(a.x - this.xa.width / 2, a.y - this.xa.height / 2), d = new C(b.x - this.xa.width / 2, b.y - this.xa.height / 2);
        this.la.style.transform = "rotate(" + Lb(180 * Math.atan2(d.y - c.y, d.x - c.x) / Math.PI) + "deg)";
        Lf(this.ka, c);
        Q(this.ka, !0);
        this.$b = new nh(this.ka, .8, {
            visibility: "hidden",
            top: c.y + "px",
            left: c.x + "px",
            opacity: .3
        }, {visibility: "visible", top: d.y + "px", left: d.x + "px", opacity: .98}, [{
            fa: "visibility",
            duration: 0,
            timing: "ease",
            ca: 0
        }, {fa: "top", duration: .8, timing: "ease-out", ca: 0}, {
            fa: "left", duration: .8,
            timing: "ease-out", ca: 0
        }, {fa: "opacity", duration: .8, timing: "ease-out", ca: 0}]);
        this.$b.play(!0);
        this.Nf.play(!0);
        this.wh.play(!0)
    };
    g.Rj = function () {
        null != this.Mf && this.Mf.play(!0)
    };
    var gj = function (a) {
        null != a.$b && (Q(a.ka, !1), a.C.style.width = "70px", a.C.style.height = "70px", a.Z.style.opacity = 1, a.$b.stop(), a.$b = null, a.Nf.stop(), a.Mf.stop(), a.wh.stop())
    };
    fj.prototype.reset = function () {
        this.bf();
        gj(this);
        this.C.style.width = "70px";
        this.C.style.height = "70px";
        Q(this.ka, !1);
        Q(this.ma, !1);
        Q(this.C, !1)
    };
    fj.prototype.wc = function () {
        return this.xa
    };
    fj.prototype.i = function () {
        L(this.rj);
        I(this.ka);
        I(this.ma)
    };
    var eb = {}, hj = null, ij = function (a) {
        a = ia(a);
        delete eb[a];
        fb() && hj && hj.stop()
    }, kj = function () {
        hj || (hj = new ne(function () {
            jj()
        }, 20));
        var a = hj;
        a.Na() || a.start()
    }, jj = function () {
        var a = w();
        ab(eb, function (b) {
            lj(b, a)
        });
        fb() || kj()
    };
    var mj = function (a, b, c, d) {
        mh.call(this);
        if (!n(a) || !n(b))throw Error("Start and end parameters must be arrays");
        if (a.length != b.length)throw Error("Start and end points must be the same length");
        this.Hd = a;
        this.Ni = b;
        this.duration = c;
        this.Mg = d;
        this.coords = [];
        this.qk = !1;
        this.M = 0
    };
    y(mj, mh);
    mj.prototype.play = function (a) {
        if (a || 0 == this.m)this.M = 0, this.coords = this.Hd; else if (1 == this.m)return !1;
        ij(this);
        this.startTime = a = w();
        -1 == this.m && (this.startTime -= this.duration * this.M);
        this.endTime = this.startTime + this.duration;
        this.M || this.Fc();
        this.qa("play");
        -1 == this.m && this.qa("resume");
        this.m = 1;
        var b = ia(this);
        b in eb || (eb[b] = this);
        kj();
        lj(this, a);
        return !0
    };
    mj.prototype.stop = function (a) {
        ij(this);
        this.m = 0;
        a && (this.M = 1);
        nj(this, this.M);
        this.qa("stop");
        this.hc()
    };
    mj.prototype.pause = function () {
        1 == this.m && (ij(this), this.m = -1, this.qa("pause"))
    };
    mj.prototype.i = function () {
        0 == this.m || this.stop(!1);
        this.qa("destroy");
        mj.j.i.call(this)
    };
    var lj = function (a, b) {
        a.M = (b - a.startTime) / (a.endTime - a.startTime);
        1 <= a.M && (a.M = 1);
        nj(a, a.M);
        1 == a.M ? (a.m = 0, ij(a), a.qa("finish"), a.hc()) : 1 == a.m && a.fg()
    }, nj = function (a, b) {
        r(a.Mg) && (b = a.Mg(b));
        a.coords = Array(a.Hd.length);
        for (var c = 0; c < a.Hd.length; c++)a.coords[c] = (a.Ni[c] - a.Hd[c]) * b + a.Hd[c]
    };
    mj.prototype.fg = function () {
        this.qa("animate")
    };
    mj.prototype.qa = function (a) {
        this.dispatchEvent(new oj(a, this))
    };
    var oj = function (a, b) {
        dd.call(this, a);
        this.coords = b.coords;
        this.x = b.coords[0];
        this.y = b.coords[1];
        this.z = b.coords[2];
        this.duration = b.duration;
        this.M = b.M;
        this.state = b.m
    };
    y(oj, dd);
    var pj = function (a, b, c, d, e) {
        mj.call(this, b, c, d, e);
        this.element = a
    };
    y(pj, mj);
    g = pj.prototype;
    g.Wc = ba;
    g.Ch = function () {
        m(this.Pc) || (this.Pc = "rtl" == If(this.element, "direction"));
        return this.Pc
    };
    g.fg = function () {
        this.Wc();
        pj.j.fg.call(this)
    };
    g.hc = function () {
        this.Wc();
        pj.j.hc.call(this)
    };
    g.Fc = function () {
        this.Wc();
        pj.j.Fc.call(this)
    };
    var qj = function (a, b, c, d, e) {
        if (2 != b.length || 2 != c.length)throw Error("Start and end points must be 2D");
        pj.apply(this, arguments)
    };
    y(qj, pj);
    qj.prototype.Wc = function () {
        var a = this.qk && this.Ch() ? "right" : "left";
        this.element.style[a] = Math.round(this.coords[0]) + "px";
        this.element.style.top = Math.round(this.coords[1]) + "px"
    };
    var rj = function (a, b, c, d, e) {
        if (2 != b.length || 2 != c.length)throw Error("Start and end points must be 2D");
        pj.apply(this, arguments)
    };
    y(rj, pj);
    rj.prototype.Wc = function () {
        this.element.style.width = Math.round(this.coords[0]) + "px";
        this.element.style.height = Math.round(this.coords[1]) + "px"
    };
    var sj = function (a, b, c, d, e) {
        ea(b) && (b = [b]);
        ea(c) && (c = [c]);
        pj.call(this, a, b, c, d, e);
        if (1 != b.length || 1 != c.length)throw Error("Start and end points must be 1D");
        this.te = -1
    };
    y(sj, pj);
    var tj = 1 / 1024;
    g = sj.prototype;
    g.Wc = function () {
        var a = this.coords[0];
        Math.abs(a - this.te) >= tj && (Qf(this.element, a), this.te = a)
    };
    g.Fc = function () {
        this.te = -1;
        sj.j.Fc.call(this)
    };
    g.hc = function () {
        this.te = -1;
        sj.j.hc.call(this)
    };
    g.show = function () {
        this.element.style.display = ""
    };
    g.pd = function () {
        this.element.style.display = "none"
    };
    var uj = function (a) {
        return 1 - Math.pow(1 - a, 3)
    };
    var vj = function (a, b) {
        this.ze = !1;
        this.xa = new D(22 + b.width, 22 + b.height);
        this.q = a.document.createElement("div");
        this.q.style.width = this.xa.width + "px";
        this.q.style.height = this.xa.height + "px";
        this.q.style.zIndex = 999998;
        this.q.style.position = "fixed";
        this.q.style.borderRadius = "3px";
        this.q.style.border = "10px dashed";
        this.q.style.borderColor = "#4285F4";
        this.q.style.boxSizing = "border-box";
        a.document.body.appendChild(this.q);
        this.U = a.document.createElement("div");
        this.U.style.margin = "auto";
        this.U.style.backgroundColor =
            "#4285F4";
        this.U.style.borderRadius = "50%";
        this.U.style.position = "absolute";
        this.U.style.bottom = "0";
        this.U.style.top = "0";
        this.U.style.right = "0";
        this.U.style.left = "0";
        this.U.style.opacity = "50%";
        this.q.appendChild(this.U);
        this.tf = new rj(this.U, [60, 60], [180, 180], 1500, uj);
        this.Hi = new sj(this.U, .5, 0, 1500, uj);
        this.Si = K(this.tf, "end", u(this.Uh, this), !1);
        this.Of = !0
    };
    y(vj, dj);
    g = vj.prototype;
    g.Uh = function () {
        this.Of || (this.tf.play(!0), this.Hi.play(!0))
    };
    g.show = function (a) {
        Lf(this.q, a);
        this.Of = !1;
        Q(this.q, !0);
        Q(this.U, !0);
        this.Uh()
    };
    g.Gh = function () {
        this.ze || (this.ze = !0, this.U.style.backgroundColor = "#0F9D58", this.q.style.borderColor = "#0F9D58")
    };
    g.bf = function () {
        this.ze && (this.ze = !1, this.U.style.backgroundColor = "#4285F4", this.q.style.borderColor = "#4285F4")
    };
    g.mg = function () {
    };
    g.reset = function () {
        this.bf();
        this.Of = !0;
        Q(this.q, !1);
        Q(this.U, !1);
        this.tf.stop()
    };
    g.wc = function () {
        return this.xa
    };
    g.Pd = function () {
    };
    g.i = function () {
        L(this.Si);
        I(this.q)
    };
    var wj = function (a, b, c) {
        this.I = new bj(a, b);
        this.Wb = .65;
        this.q = null;
        W("circle_swipe_target") ? this.q = new fj(a, Pf(b), this.Wb) : this.q = new vj(a, Pf(b));
        this.ua = new Yi(a, this.I, this.q.wc());
        Wi(this.ua);
        this.F = new cj(a);
        this.fk = new Vi(this.ua);
        this.fi = new Hi(this.I.Ra, !1);
        this.Fh = new Ji(this.fk, this.fi);
        this.lc = new Ni(a, this.I, this.q, this.F, this.ua, this.Wb);
        a = this.Wb;
        t:{
            b = /swipe_hold_(\d+)/;
            var d = V().JS_EXPERIMENT_LABELS;
            if (p(d))for (var d = d.split(","), e = 0; e < d.length; e++) {
                var f = d[e].match(b);
                if (null != f) {
                    b =
                        parseInt(f[1], 10);
                    break t
                }
            }
            b = 0
        }
        this.Dj = new Ti(a, b, this.Fh, this.lc, c)
    };
    y(wj, J);
    wj.prototype.i = function () {
        this.I.ia();
        this.q.ia();
        this.F.ia();
        this.fi.ia();
        this.Fh.ia();
        this.Dj.ia()
    };
    var xj;
    var yj = function (a) {
        M.call(this);
        this.o = a;
        a = F ? "focusout" : "blur";
        this.Ej = K(this.o, F ? "focusin" : "focus", this, !F);
        this.Fj = K(this.o, a, this, !F)
    };
    y(yj, M);
    yj.prototype.handleEvent = function (a) {
        var b = new hd(a.W());
        b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
        this.dispatchEvent(b)
    };
    yj.prototype.i = function () {
        yj.j.i.call(this);
        L(this.Ej);
        L(this.Fj);
        delete this.o
    };
    var zj = function () {
    };
    zj.getInstance = function () {
        return zj.Ah ? zj.Ah : zj.Ah = new zj
    };
    zj.prototype.Mj = 0;
    var Bj = function (a) {
        M.call(this);
        this.fe = a || nc();
        this.Pc = Aj;
        this.ta = null;
        this.mb = !1;
        this.o = null;
        this.Kb = void 0;
        this.$d = this.ae = this.A = null;
        this.sk = !1
    };
    y(Bj, M);
    Bj.prototype.tj = zj.getInstance();
    var Aj = null;
    g = Bj.prototype;
    g.If = function () {
        return this.ta || (this.ta = ":" + (this.tj.Mj++).toString(36))
    };
    g.sa = function () {
        return this.o
    };
    g.Hf = function () {
        this.Kb || (this.Kb = new oe(this));
        return this.Kb
    };
    g.getParent = function () {
        return this.A
    };
    g.vg = function (a) {
        if (this.A && this.A != a)throw Error("Method not supported");
        Bj.j.vg.call(this, a)
    };
    g.ja = function () {
        return this.fe
    };
    g.sc = function () {
        this.o = this.fe.createElement("div")
    };
    g.je = function () {
        this.mb = !0;
        Cj(this, function (a) {
            !a.mb && a.sa() && a.je()
        })
    };
    g.uc = function () {
        Cj(this, function (a) {
            a.mb && a.uc()
        });
        this.Kb && this.Kb.Mc();
        this.mb = !1
    };
    g.i = function () {
        this.mb && this.uc();
        this.Kb && (this.Kb.ia(), delete this.Kb);
        Cj(this, function (a) {
            a.ia()
        });
        !this.sk && this.o && I(this.o);
        this.A = this.o = this.$d = this.ae = null;
        Bj.j.i.call(this)
    };
    g.Ch = function () {
        null == this.Pc && (this.Pc = "rtl" == If(this.mb ? this.o : this.fe.G.body, "direction"));
        return this.Pc
    };
    var Cj = function (a, b) {
        a.ae && B(a.ae, b, void 0)
    };
    Bj.prototype.removeChild = function (a, b) {
        if (a) {
            var c = p(a) ? a : a.If(), d;
            this.$d && c ? (d = this.$d, d = (c in d ? d[c] : void 0) || null) : d = null;
            a = d;
            if (c && a) {
                d = this.$d;
                c in d && delete d[c];
                Wa(this.ae, a);
                b && (a.uc(), a.o && I(a.o));
                c = a;
                if (null == c)throw Error("Unable to set parent component");
                c.A = null;
                Bj.j.vg.call(c, null)
            }
        }
        if (!a)throw Error("Child is not in parent component");
        return a
    };
    var Dj = function (a, b) {
        Bj.call(this, b);
        this.pk = !!a;
        this.Dc = null
    };
    y(Dj, Bj);
    g = Dj.prototype;
    g.Ff = null;
    g.df = !1;
    g.oa = null;
    g.aa = null;
    g.eb = null;
    g.Rg = !1;
    g.sc = function () {
        Dj.j.sc.call(this);
        var a = this.sa(), b = ta("goog-modalpopup").split(" ");
        uh(a, b);
        xc(a, !0);
        Q(a, !1);
        if (this.pk && !this.aa) {
            var a = this.ja(), c;
            c instanceof tb && (c = ub(c));
            this.aa = a.sc("iframe", {
                frameborder: 0,
                style: "border:0;vertical-align:bottom;" + (c || ""),
                src: 'javascript:""'
            });
            this.aa.className = "goog-modalpopup-bg";
            Q(this.aa, !1);
            Qf(this.aa, 0)
        }
        this.oa || (this.oa = this.ja().sc("div", "goog-modalpopup-bg"), Q(this.oa, !1));
        this.eb || (this.eb = this.ja().createElement("span"), Q(this.eb, !1), xc(this.eb,
            !0), this.eb.style.position = "absolute")
    };
    g.je = function () {
        if (this.aa) {
            var a = this.sa();
            a.parentNode && a.parentNode.insertBefore(this.aa, a)
        }
        a = this.sa();
        a.parentNode && a.parentNode.insertBefore(this.oa, a);
        Dj.j.je.call(this);
        a = this.sa();
        a.parentNode && a.parentNode.insertBefore(this.eb, a.nextSibling);
        this.Ff = new yj(yc(this.ja()));
        this.Hf().dc(this.Ff, "focusin", this.Oj);
        Ej(this, !1)
    };
    g.uc = function () {
        this.Eh() && this.ei(!1);
        ad(this.Ff);
        Dj.j.uc.call(this);
        I(this.aa);
        I(this.oa);
        I(this.eb)
    };
    g.ei = function (a) {
        a != this.df && (this.Ic && this.Ic.stop(), this.bd && this.bd.stop(), this.Hc && this.Hc.stop(), this.ad && this.ad.stop(), this.mb && Ej(this, a), a ? this.bk() : this.sj())
    };
    var Ej = function (a, b) {
        if (b) {
            a.zc || (a.zc = []);
            for (var c = a.ja(), c = Ac(c.G.body), d = 0; d < c.length; d++) {
                var e = c[d], f;
                if (f = e != a.o)f = e.getAttribute("aria-hidden"), f = !(null == f || void 0 == f ? 0 : String(f));
                if (f) {
                    f = e;
                    var h = !0;
                    n(h) && (h = h.join(" "));
                    "" === h || void 0 == h ? (xj || (xj = {
                        atomic: !1,
                        autocomplete: "none",
                        dropeffect: "none",
                        haspopup: !1,
                        live: "off",
                        multiline: !1,
                        multiselectable: !1,
                        orientation: "vertical",
                        readonly: !1,
                        relevant: "additions text",
                        required: !1,
                        sort: "none",
                        busy: !1,
                        disabled: !1,
                        hidden: !1,
                        invalid: "false"
                    }), h = xj, "hidden"in
                    h ? f.setAttribute("aria-hidden", h.hidden) : f.removeAttribute("aria-hidden")) : f.setAttribute("aria-hidden", h);
                    a.zc.push(e)
                }
            }
        } else if (a.zc) {
            for (d = 0; d < a.zc.length; d++)a.zc[d].removeAttribute("aria-hidden");
            a.zc = null
        }
    };
    Dj.prototype.bk = function () {
        if (this.dispatchEvent("beforeshow")) {
            try {
                this.Dc = yc(this.ja()).activeElement
            } catch (a) {
            }
            this.pg();
            this.Wj();
            this.Hf().dc(this.ja().Jb(), "resize", this.pg);
            Fj(this, !0);
            this.focus();
            this.df = !0;
            this.Ic && this.bd ? (zd(this.Ic, "end", this.Qh, !1, this), this.bd.play(), this.Ic.play()) : this.Qh()
        }
    };
    Dj.prototype.sj = function () {
        if (this.dispatchEvent("beforehide")) {
            this.Hf().Vc(this.ja().Jb(), "resize", this.pg);
            this.df = !1;
            this.Hc && this.ad ? (zd(this.Hc, "end", this.Ph, !1, this), this.ad.play(), this.Hc.play()) : this.Ph();
            t:{
                try {
                    var a = this.ja(), b = a.G.body, c = a.G.activeElement || b;
                    if (!this.Dc || this.Dc == b) {
                        this.Dc = null;
                        break t
                    }
                    (c == b || a.contains(this.sa(), c)) && this.Dc.focus()
                } catch (d) {
                }
                this.Dc = null
            }
        }
    };
    var Fj = function (a, b) {
        a.aa && Q(a.aa, b);
        a.oa && Q(a.oa, b);
        Q(a.sa(), b);
        Q(a.eb, b)
    };
    g = Dj.prototype;
    g.Qh = function () {
        this.dispatchEvent("show")
    };
    g.Ph = function () {
        Fj(this, !1);
        this.dispatchEvent("hide")
    };
    g.Eh = function () {
        return this.df
    };
    g.focus = function () {
        this.oh()
    };
    g.pg = function () {
        this.aa && Q(this.aa, !1);
        this.oa && Q(this.oa, !1);
        var a = yc(this.ja()), b = rc((a ? sc(a) : window) || window), c = Math.max(b.width, Math.max(a.body.scrollWidth, a.documentElement.scrollWidth)), a = Math.max(b.height, Math.max(a.body.scrollHeight, a.documentElement.scrollHeight));
        this.aa && (Q(this.aa, !0), Nf(this.aa, c, a));
        this.oa && (Q(this.oa, !0), Nf(this.oa, c, a))
    };
    g.Wj = function () {
        var a = yc(this.ja()), a = (a ? sc(a) : window) || window;
        if ("fixed" == Jf(this.sa()))var b = 0, c = 0; else c = this.ja().G, b = !G && qc(c) ? c.documentElement : c.body || c.documentElement, c = sc(c), c = F && H("10") && c.pageYOffset != b.scrollTop ? new C(b.scrollLeft, b.scrollTop) : new C(c.pageXOffset || b.scrollLeft, c.pageYOffset || b.scrollTop), b = c.x, c = c.y;
        var d = Pf(this.sa()), a = rc(a), b = Math.max(b + a.width / 2 - d.width / 2, 0), a = Math.max(c + a.height / 2 - d.height / 2, 0);
        Lf(this.sa(), b, a);
        Lf(this.eb, b, a)
    };
    g.Oj = function (a) {
        this.Rg ? this.Rg = !1 : a.target == this.eb && me(this.oh, 0, this)
    };
    g.oh = function () {
        try {
            F && yc(this.ja()).body.focus(), this.sa().focus()
        } catch (a) {
        }
    };
    g.i = function () {
        ad(this.Ic);
        this.Ic = null;
        ad(this.Hc);
        this.Hc = null;
        ad(this.bd);
        this.bd = null;
        ad(this.ad);
        this.ad = null;
        Dj.j.i.call(this)
    };
    var Gj = function (a, b, c, d, e) {
        this.l = a;
        this.r = b;
        this.V = c.clone();
        this.Vf = rc(this.r);
        this.dk = d;
        this.cd = e;
        this.Ec = [];
        this.k = new Xf;
        this.mf = .3;
        this.ha = this.Gb = this.na = this.pb = null;
        this.rk = new yi
    }, Ij = function (a) {
        if (W("stacking_context_fixes"))a.na = a.r.document.createElement("div"), a.na.style.width = "100vw", a.na.style.height = "100vh", a.na.style.position = "fixed", a.na.zIndex = 999998, Qf(a.na, .7), Lf(a.na, 0, 0), a.na.style.backgroundColor = "#666", a.Ec.push(K(a.na, "click", a.Jf, !1, a)), $f(a.k, a.l), a.l.parentNode.appendChild(a.na);
        else {
            a.pb = new Dj(!1, new lc(a.r.document));
            var b = a.pb, c = a.r.document.body;
            if (b.mb)throw Error("Component already rendered");
            b.o || b.sc();
            c ? c.insertBefore(b.o, null) : b.fe.G.body.appendChild(b.o);
            b.A && !b.A.mb || b.je();
            (b = a.pb.o) && xc(b, !1);
            b = a.pb.oa;
            c = b.style;
            c.position = "absolute";
            c.left = 0;
            c.top = 0;
            c.background = "#666";
            c.outline = "none";
            Qf(b, .7);
            c.zIndex = 999998;
            a.Ec.push(K(b, "click", a.Jf, !1, a));
            $f(a.k, a.l);
            a.pb.ei(!0)
        }
        N(a.l, "outline", "none");
        var d = O(vc(a.l)), b = Pf(a.l);
        U(a.k, a.l, "width", b.width, "important");
        U(a.k, a.l, "height", b.height, "important");
        c = Hj(a, d, b, a.nd());
        a.Vf = rc(a.r);
        var e;
        eg() ? (d = e = 0, T(a.k, a.l, "position", "absolute", "important"), a.l.parentNode && T(a.k, a.l.parentNode, "position", "relative", "important")) : (e = d.x, d = d.y, T(a.k, a.l, "position", "fixed", "important"));
        t:{
            var f = fg();
            if (null == f.SAMPLE_VIEWPORT_SIZES) {
                if (eg() && !oa(.05) || !eg() && !oa(.01))break t
            } else if (!f.SAMPLE_VIEWPORT_SIZES)break t;
            var f = rc(a.r), h = a.nd();
            jg("viewport", {
                event: "lbstart", ew: a.V.width, eh: a.V.height, lw: f.width, lh: f.height,
                vw: h.width, vh: h.height
            }, 1)
        }
        W("no_expansion_animation") || W("swipe_to_expand") && eg() ? (U(a.k, a.l, "left", c.x, "important"), U(a.k, a.l, "top", c.y, "important"), a.Zh(b)) : (lh() ? a.Gb = new nh(a.l, a.mf, {
            left: e + "px",
            top: d + "px"
        }, {left: c.x + "px", top: c.y + "px"}, [{
            fa: "all",
            duration: a.mf,
            timing: "ease-out",
            ca: 0
        }]) : a.Gb = new qj(a.l, [e, d], [c.x, c.y], 1E3 * a.mf, uj), K(a.Gb, "end", u(a.Zh, a, b), !1), a.Gb.play())
    };
    Gj.prototype.ek = function () {
        this.Cj.ia();
        Ij(this)
    };
    Gj.prototype.nd = function () {
        var a = this.r;
        return eg() ? new D(a.innerWidth, a.innerHeight) : rc(a)
    };
    var Hj = function (a, b, c, d) {
        var e = Math.round(d.width / 2 - c.width / 2);
        d = Math.round(d.height / 2 - c.height / 2);
        T(a.k, a.l, "left", 0);
        T(a.k, a.l, "top", 0);
        var f = Math.floor(a.V.width / 2 - c.width / 2);
        a = Math.floor(a.V.height / 2 - c.height / 2);
        e = Math.max(0, e - f) + f;
        d = Math.max(0, d - a) + a;
        eg() ? (e -= b.x, b = d - b.y) : b = d;
        return new C(e, b)
    };
    Gj.prototype.gj = function () {
        var a = rc(this.r), b = this.Vf;
        b == a || b && a && b.width == a.width && b.height == a.height || (this.Vf = a, this.ea() && (a = O(vc(this.l)), a = Hj(this, a, this.V, this.nd()), U(this.k, this.l, "left", a.x, "important"), U(this.k, this.l, "top", a.y, "important"), Jj(this, a.x, a.y)))
    };
    Gj.prototype.ea = function () {
        return W("stacking_context_fixes") ? null != this.na : null != this.pb && this.pb.Eh()
    };
    var Kj = function (a) {
        a.Gb && 1 == a.Gb.m && (Bd(a.Gb), a.Gb.stop());
        B(a.Ec, function (a) {
            L(a)
        }, a);
        a.Ec = [];
        if (a.ea())if (W("stacking_context_fixes"))I(a.na), a.na = null; else {
            a.pb.uc();
            var b = a.pb.o;
            b && a.r.document.body.removeChild(b)
        }
        a.ha && I(a.ha);
        ag(a.k)
    };
    Gj.prototype.Jf = function () {
        this.cd()
    };
    Gj.prototype.Zh = function (a) {
        var b;
        eg() ? (b = this.l, b = new C(b.offsetLeft, b.offsetTop)) : b = O(this.l);
        var c = b;
        b = c.x - (Math.floor(this.V.width / 2) - Math.floor(a.width / 2));
        a = c.y - (Math.floor(this.V.height / 2) - Math.floor(a.height / 2));
        U(this.k, this.l, "width", this.V.width, "important");
        U(this.k, this.l, "height", this.V.height, "important");
        U(this.k, this.l, "left", b, "important");
        U(this.k, this.l, "top", a, "important");
        Jj(this, b, a);
        (eg() || W("recenter_on_resize")) && this.Ec.push(K(this.r, "resize", this.gj, !1, this));
        r(this.r.document.elementFromPoint) &&
        (a = O(this.l), b = Pf(this.l), this.r.document.elementFromPoint(a.x + b.width / 2, a.y + b.height / 2) != this.l && ig("lightbox-behind-content", {url: this.r.document.location.href}));
        a = this.rk;
        a.Ea.G[a.le()] && ig("lightbox-not-in-focus", {url: this.r.document.location.href});
        this.dk()
    };
    var Jj = function (a, b, c) {
        if (!a.ha) {
            var d = "http:" == A.location.protocol ? "http:" : "https:";
            a.ha = a.r.document.createElement("img");
            a.ha.src = [d, "//pagead2.googlesyndication.com/pagead/bf/images/close_circle.png"].join("");
            a.ha.style.outline = "none";
            a.ha.style.zIndex = 1E6;
            a.ha.style.width = "42px";
            a.ha.style.height = "42px";
            a.Ec.push(K(a.ha, "click", a.Jf, !1, a));
            a.l.parentNode.insertBefore(a.ha, a.l)
        }
        b = b + a.V.width - 21;
        c -= 21;
        a.ha.style.position = Jf(a.l);
        Lf(a.ha, b, c);
        Q(a.ha, !0)
    };
    var Lj = function () {
        J.call(this);
        this.Qa = null
    };
    y(Lj, J);
    Lj.prototype.i = function () {
        I(this.Qa);
        this.Qa = null;
        Lj.j.i.call(this)
    };
    Lj.prototype.show = function (a, b) {
        this.Qa || (this.Qa = z.createElement("div"), z.body.appendChild(this.Qa));
        N(this.Qa, {
            visibility: "visible",
            opacity: .7,
            "pointer-events": "none",
            backgroundColor: "#333",
            color: "#fff",
            font: "bold 26px Arial",
            textAlign: "center",
            position: "absolute",
            display: (rg || qg || tg || sg) && !H(537) ? "-webkit-box" : G ? "-webkit-flex" : Yb && !H(22) ? "-moz-flex" : "flex",
            left: 0,
            top: 0,
            zIndex: 999999,
            transition: "",
            "-moz-justify-content": "center",
            "-moz-align-items": "center",
            "-webkit-justify-content": "center",
            "-webkit-align-items": "center",
            "justify-content": "center",
            "align-items": "center",
            "-webkit-box-align": "center"
        });
        Nf(this.Qa, a);
        wc(this.Qa, b);
        Yf(this.Qa)
    };
    Lj.prototype.pd = function () {
        this.Qa && N(this.Qa, {visibility: "hidden"})
    };
    z && z.URL && (Bc = !Na(z.URL));
    var Mj = function (a, b) {
        this.La = a || 0;
        this.Ba = b || ""
    };
    Mj.prototype.match = function (a) {
        return (this.La || this.Ba) && (a.La || a.Ba) ? this.Ba || a.Ba ? this.Ba == a.Ba : this.La || a.La ? this.La == a.La : !1 : !1
    };
    Mj.prototype.toString = function () {
        var a = "" + this.La;
        this.Ba && (a += "-" + this.Ba);
        return a
    };
    var Nj = function (a) {
        var b = [];
        ab(a, function (a, d) {
            var e = Ma(d), f = a;
            p(f) && (f = Ma(f));
            b.push(e + "=" + f)
        });
        return b.join("\n")
    }, Oj = 0, Pj = 0, Qj = function () {
        var a = 0, b = A;
        if (b && b.Goog_AdSense_getAdAdapterInstance)return b;
        try {
            for (; b && 5 > a;) {
                if (b.google_osd_static_frame)return b;
                if (b.aswift_0 && b.aswift_0.google_osd_static_frame)return b.aswift_0;
                a++;
                b = b != b.parent ? b.parent : null
            }
        } catch (c) {
        }
        return null
    }, Rj = function (a, b, c, d) {
        if (10 < Pj)A.clearInterval(Oj); else if (++Pj, A.postMessage && (b.La || b.Ba)) {
            var e = Qj();
            if (e) {
                var f = {};
                b.La && (f[4] = b.La);
                b.Ba && (f[12] = b.Ba);
                f[0] = "goog_request_monitoring";
                f[6] = a;
                f[16] = c;
                d && d.length && (f[17] = d.join(","));
                try {
                    var h = Nj(f);
                    e.postMessage(h, "*")
                } catch (k) {
                }
            }
        }
    };
    var Sj = function (a, b, c) {
        if (c.data) {
            var d = c.data;
            if (p(d)) {
                c = {};
                for (var d = d.split("\n"), e = 0; e < d.length; e++) {
                    var f = d[e].indexOf("=");
                    if (!(0 >= f)) {
                        var h = Number(d[e].substr(0, f)), f = d[e].substr(f + 1);
                        switch (h) {
                            case 5:
                            case 8:
                            case 11:
                            case 15:
                            case 16:
                                f = "true" == f;
                                break;
                            case 4:
                            case 7:
                            case 6:
                            case 14:
                                f = Number(f);
                                break;
                            case 3:
                                if (r(decodeURIComponent))try {
                                    f = decodeURIComponent(f)
                                } catch (k) {
                                    throw Error("Error: URI malformed: " + f);
                                }
                                break;
                            case 17:
                                f = Ta(decodeURIComponent(f).split(","), Number)
                        }
                        c[h] = f
                    }
                }
                c = c[0] ? c : null
            } else c =
                null;
            if (c && (d = new Mj(c[4], c[12]), a && a.match(d) && "goog_update_data" == c[0])) {
                a = {Sd: c[7]};
                if (c = c[9])c = c.split("-"), 4 == c.length && (a.Tb = new Ef(Da(c[0]), Da(c[3]), Da(c[2]), Da(c[1])));
                b(a)
            }
        }
    };
    var Z = function () {
        M.call(this);
        this.uh = this.ea = this.Mb = !1;
        this.ag = !0;
        this.wf = new D(0, 0);
        this.nf = this.Tf = this.cd = this.Df = null;
        this.Ug = new Ef(0, 0, 0, 0);
        this.V = new D(0, 0);
        this.D = new D(0, 0);
        this.$f = null;
        this.Hb = 0;
        this.Xa = this.K = null;
        this.Ud = !1;
        this.kb = Tj || (Tj = new Zh);
        this.Wi = new Vh(this.kb);
        this.$a = new Di(this.kb);
        bd(this, this.$a);
        this.ed = 0;
        this.Da = this.ue = null;
        this.Rc = new Qg;
        this.kb.Rc = this.Rc;
        this.cc = new Wg;
        this.Y = null;
        this.ff = new Xe;
        var a = u(this.qj, this), b = /[&\?]exk=([^& ]+)/.exec(A.location.href), b =
            new Mj(V().AD_KEY || 0, b && 2 == b.length ? b[1] : null);
        if (b.La || b.Ba)a = la(Sj, b, a), A.addEventListener ? A.addEventListener("message", a, !1) : A.attachEvent && A.attachEvent("onmessage", a), Oj = A.setInterval(Ic(la(Rj, 2, b, void 0, void 0)), 500);
        this.Bc = null;
        this.Jg = new Lj;
        bd(this, this.Jg)
    }, Uj, Vj;
    y(Z, M);
    Z.prototype.i = function () {
        cd(this.K, this.Da);
        this.$a = this.Y = this.Da = this.K = null;
        this.ff = new Xe;
        Z.j.i.call(this)
    };
    var Tj = null;
    Z.prototype.Uj = function () {
        W("report_page_unload") && Fg(this, zd(A, "beforeunload", u(this.$h, this, {unload: !0}), !0, this))
    };
    Z.prototype.$h = function (a) {
        if (this.isExpanded() && this.$a) {
            var b = this.$a;
            a = a || {};
            a.engend = !0;
            b.mc(10010, a)
        }
    };
    var Wj = function (a, b) {
        null != a.Bc && N(a.Bc, {display: b ? "block" : "none"})
    };
    Z.prototype.instantlyResizeWindow = function (a, b) {
        Xj(this, function () {
            if (V().ALLOW_INSTANT_RESIZING) {
                if (!this.isExpanded() && 0 <= a && 0 <= b) {
                    var c = new D(a, b);
                    Yj(this, ["resize_w", c.width, "_h", c.height].join(""))
                }
            } else Zj(this, "illegal_instant_resizing", {resizew: a, resizeh: b})
        }, this)
    };
    Z.prototype.getMaxExpandableSize = function (a) {
        this.Xa ? df(this.Xa, a) : (this.Xa = new Xe, df(this.Xa, a), Yj(this, "maxsize") || (this.Ae = !0))
    };
    var Xj = function (a, b, c) {
        df(a.ff, u(b, c));
        !a.ff.Ma && a.ff.Ca()
    };
    Z.prototype.vj = function () {
        var a = V();
        this.Ud ? this.K = new Dh : W("engagement_ad_interstitial") ? this.K = ak(this, "InstantlyEngage", a.EXPANSION_TEXT) : W("swipe_to_expand") ? this.K = ak(this, "InstantlyEngage", a.EXPANSION_TEXT) : (this.K = ak(this, a.ENGAGEMENT_NOTIFIER, a.EXPANSION_TEXT), eg() && (a.ENGAGEMENT_BORDER_WIDTH || W("1-point-5-click")) && (this.ed = a.ENGAGEMENT_BORDER_WIDTH || 35, this.Da = ak(this, a.CENTER_ENGAGEMENT_NOTIFIER || "InstantlyEngage", a.CENTER_EXPANSION_TEXT), a = rc(), 0 == a.height && (a.height = window.innerHeight),
            this.Ug = new Ef(this.ed, a.width - this.ed, a.height - this.ed, this.ed), Gg("touchstart", this.lk, !1, this)), K(this.K, "removed", this.Kh, !1, this), null === this.Da || K(this.Da, "removed", this.Kh, !1, this))
    };
    var ak = function (a, b, c) {
        var d = V(), e = d.ENGAGEMENT_DELAY_MS;
        if (!e || 0 > e)e = 2E3;
        var f = d.NOTIFIER_ANIMATION_MS;
        if (!f || 0 > f)f = null;
        var h = W("delay_after_notifier_finishes");
        !f && h && (f = e, e += 200);
        h = d.ABOUT_TO_EXPAND_TIME_LEFT_MS;
        if (!h || 0 >= h || h >= e)h = 500;
        e = {L: b, ke: c, jh: e, ui: h, zi: f, ck: a.Rc, zj: a.cc, kb: a.kb};
        switch (b) {
            case "NoOp":
                return new Dh;
            case "InstantlyEngage":
                return new Bh(e);
            case "NeverEngage":
                return new Ch(e);
            case "DesktopProgressBarJS":
            case "DesktopProgressBarCSS3":
                return a = d.ENGAGEMENT_TYPE, m(a) && -1 != a ?
                    2 == a ? new Ah(e) : 3 == a ? new jh(e) : new Kh(e) : new Kh(e);
            case "MobileProgressBarTapToCancel":
            case "MobileProgressBarTapToCancelCSS3":
            case "MobileProgressBarTapToExpand":
            case "MobileProgressBarTapToExpandCSS3":
                return new Fh(e);
            case "MobileTouchAgain":
                return new Uh(e);
            default:
                return ak(a, eg() ? "MobileProgressBarTapToCancelCSS3" : "DesktopProgressBarCSS3", c)
        }
    };
    g = Z.prototype;
    g.lk = function (a) {
        this.ue = O(a)
    };
    g.getCollapsedHeight = function () {
        return this.D.height
    };
    g.getCollapsedWidth = function () {
        return this.D.width
    };
    g.sh = function () {
        return this.D.clone()
    };
    g.getExpandedHeight = function () {
        return this.V.height
    };
    g.getExpandedWidth = function () {
        return this.V.width
    };
    var bk = function (a, b) {
        a.V = b.clone()
    };
    Z.prototype.isExpanded = function () {
        return this.ea
    };
    Z.prototype.isExpansionEnabled = function () {
        return this.Mb
    };
    Z.prototype.shouldMaintainCoordinates = function (a) {
        this.ag = a
    };
    var ck = function (a) {
        return !a.Mb || a.ea || a.Lb() || a.uh && !eg() && pg ? !1 : !0
    }, ek = function (a, b) {
        if ("function" == typeof b) {
            var c = u(function () {
                W("engagement_ad_interstitial") || this.dispatchEvent("expanding");
                b()
            }, a);
            if (ck(a)) {
                $g(a.cc, "expansion_requested");
                var d = u(function (a) {
                    if (null != a) {
                        if (a.lightboxWidth < this.getExpandedWidth()) {
                            this.Jg.show(this.D, "Zoom out for the full experience");
                            dk(this, {overlay: !0, maxw: a.lightboxWidth, maxh: a.lightboxHeight});
                            this.K && this.K.remove();
                            this.Da && this.Da.remove();
                            return
                        }
                        this.Jg.pd()
                    }
                    this.Da &&
                    this.Ug.contains(this.ue) ? this.Y = this.Da : this.K && (this.Y = this.K, this.Da && !this.ue && Zj(this, "incompatible_with_1_point_5_click", {studio: lg()}));
                    null !== this.Y && (this.kb.K = this.Y, this.Y.start(c, u(this.vi, this)))
                }, a);
                eg() && 1 == a.Hb ? a.getMaxExpandableSize(d) : d()
            }
        }
    };
    Z.prototype.Kh = function () {
        this.ue = null
    };
    var hk = function (a, b, c) {
        a.ea = !0;
        a.uh = !0;
        null === a.Y || a.Y.xb(!0);
        a.ag && fk(a, b, c);
        Wj(a, !0);
        gk();
        if (a.$a && a.Y) {
            var d = a.Y.Ib();
            a.$a.mc(d, {engstart: !0})
        }
        1 == a.Hb && (d = u(function (a) {
            (a.lightboxWidth < b.width || a.lightboxHeight < b.height) && dk(this, {
                overlay: !1,
                maxw: a.lightboxWidth,
                maxh: a.lightboxHeight,
                bc: V().MOBILE_BROWSER_CLASS
            })
        }, a), a.getMaxExpandableSize(d));
        "function" == typeof a.Df && (a.Df(b.width, b.height, c), $g(a.cc, "expansion_completed"))
    };
    Z.prototype.vi = function () {
        r(this.nf) && this.nf()
    };
    var gk = function () {
        var a = z.getElementById("abgc");
        a && Q(a, !1);
        (a = z.getElementById("cbc")) && Q(a, !1)
    }, fk = function (a, b, c) {
        if (1 === a.Hb) {
            var d = z.body;
            c = Math.round((b.width - a.D.width) / 2);
            0 < c && N(d, "marginLeft", S(c));
            a = Math.round((b.height - a.D.height) / 2);
            0 < a && N(d, "marginTop", S(a))
        } else {
            d = z.body;
            if (0 == c || 3 == c) {
                var e = b.width - a.D.width;
                0 < e && N(d, "marginLeft", S(e))
            }
            if (0 == c || 1 == c)a = b.height - a.D.height, 0 < a && N(d, "marginTop", S(a))
        }
    };
    Z.prototype.Lb = function () {
        return !!this.Y && this.Y.re()
    };
    Z.prototype.reportEngagement = function (a, b) {
        this.$a && this.$a.mc(a, b);
        switch (a) {
            case 10047:
                $g(this.cc, "creative_loaded");
                break;
            case 10048:
                $g(this.cc, "creative_rendered")
        }
    };
    Z.prototype.setChargeableAction = function (a) {
        this.$a.setChargeableAction(a)
    };
    var dk = function (a, b) {
        var c = {expandw: a.getExpandedWidth(), expandh: a.getExpandedHeight()};
        Ja(b, function (a, b) {
            c[b] = a
        });
        var d = V();
        m(d.EXPANSION_CLICK_INFO) && (c.ai = d.EXPANSION_CLICK_INFO);
        Zj(a, "oversized_expansion", c)
    }, Zj = function (a, b, c) {
        c = gb(c || {});
        c.ee = a.isExpansionEnabled() ? 1 : 0;
        c.ie = a.isExpanded() ? 1 : 0;
        c.em = a.Hb;
        c.p = a.Ud ? 1 : 0;
        c.not = a.K && a.K.vc();
        a.Da && (c.not += "," + a.Da.vc());
        ig(b, c)
    };
    Z.prototype.qj = function (a) {
        this.Ud || (this.kb.Sd = a.Sd, this.kb.Tb = a.Tb || null)
    };
    Z.prototype.getConfig = function () {
        return this.Wi
    };
    Z.prototype.dispatchEvent = function (a) {
        return Z.j.dispatchEvent.call(this, a)
    };
    var lk = function () {
        if (jk && !jk.jb)return jk;
        Z.call(this);
        jk = this;
        this.n = null;
        this.Ae = !1;
        var a = z.URL;
        this.D = rc(A).clone();
        a = kk(a);
        if (!m(a.cn)) {
            var b = Pa();
            b = b ? b.adUrl : void 0;
            (b = b || "") && (a = kk(b))
        }
        m(a.cn) && (this.n = new yf(a), bd(this, this.n), se(this.n, u(this.Lf, this)), this.n.rc(u(this.$j, this)), window.setTimeout(u(this.Kf, this), 3E4))
    };
    y(lk, Z);
    var jk = null;
    lk.prototype.enableExpansion = function (a) {
        this.Mb = !0;
        if (a) {
            var b = a.width, c = a.height, d = a.expansionCallback, e = a.collapseCallback, f = a.initiateCollapseCallback, h = a.expansionImminentCallback;
            h && jg("exp-imm-used");
            var k = a.aboutToExpandCallback || h, h = a.expansionMode, b = Ka(b) && Ka(c), d = r(d) && r(e) && La(f) && La(k), d = b && d;
            if ("undefined" !== typeof h) {
                if (!ea(h) || 0 > h || 2 <= h)d = !1;
                1 !== h || f || (d = !1)
            }
            if (this.Mb = d)this.wf = new D(a.width, a.height), this.V = this.wf.clone(), this.Df = a.expansionCallback, this.cd = a.collapseCallback, this.Tf =
                r(a.initiateCollapseCallback) ? a.initiateCollapseCallback : null, f = a.aboutToExpandCallback || a.expansionImminentCallback, this.nf = r(f) ? f : null, this.Hb = a.expansionMode || 0, 1 === this.Hb && this.shouldMaintainCoordinates(!1), Xj(this, this.vj, this), G && 1 == this.Hb && (this.Bc = z.createElement("div"), this.Bc.id = "inframe-close-button", f = Math.floor(21), N(this.Bc, {
                position: "absolute",
                top: "0",
                right: "0",
                height: S(f),
                width: S(f),
                zIndex: 999999,
                backgroundColor: "transparent !important",
                display: "none"
            }), z.body.appendChild(this.Bc)),
            r(a.toolsetReadyCallback) && Xj(this, a.toolsetReadyCallback), Xj(this, this.Uj, this)
        } else this.Mb = !1;
        a = this.Mb;
        return a ? !0 : !1
    };
    var kk = function (a) {
        var b;
        b = dg(a, "xpc");
        a = dg(a, "p");
        var c = {};
        c.cn = b;
        c.ph = a;
        c.ppu = cg(a);
        c.lpu = cg();
        return c
    };
    lk.prototype.Kf = function () {
        if (this.n && !this.n.nb() && (this.n.ia(), this.n = null, Zj(this, "xct-commTimeout"), this.Ae)) {
            var a = {lightboxWidth: 0, lightboxHeight: 0};
            this.Xa && (this.Xa.Ca(a), this.Xa = null)
        }
    };
    lk.prototype.expandWindow = function (a, b) {
        if (ck(this)) {
            a && b && bk(this, new D(a, b));
            var c = this.V.clone(), d = ["expand_w", c.width, "_h", c.height, "_m", this.Hb].join(""), c = u(function () {
                Yj(this, d)
            }, this);
            ek(this, c)
        }
    };
    lk.prototype.collapseWindow = function () {
        this.Mb && this.ea && Yj(this, "collapse")
    };
    var Yj = function (a, b) {
        if (a.n && a.n.nb())return a.n.send("expandable_ad", b), !0;
        Zj(a, "xct-commError", {msg: b});
        return !1
    };
    lk.prototype.Lf = function (a) {
        var b = a.split("_");
        if ("ok" === b[0]) {
            for (var c, d, e, f = new D(0, 0), h = 2; h < b.length; ++h) {
                var k = b[h].charAt(0), q = parseInt(b[h].substring(1), 10);
                "w" == k ? f.width = q : "h" == k ? f.height = q : "d" == k ? c = q : "i" == k ? d = q : "e" == k && (e = q)
            }
            "expand" == b[1] && Ka(f.width) && Ka(f.height) && ea(c) && 0 <= c ? hk(this, f, c) : "collapse" == b[1] && Ka(f.width) && Ka(f.height) ? ($g(this.cc, "collapse_requested"), this.$h(), this.ea = !1, null === this.Y || this.Y.xb(!1), this.ag && N(z.body, {
                marginLeft: 0,
                marginTop: 0
            }), Wj(this, !1), (a = z.getElementById("abgc")) &&
            Q(a, !0), (a = z.getElementById("cbc")) && Q(a, !0), this.dispatchEvent("collapsed"), bk(this, this.wf), "function" == typeof this.cd && (this.cd(f.width, f.height), $g(this.cc, "collapsed"))) : "resize" == b[1] && Ka(f.width) && Ka(f.height) ? this.D = f.clone() : "maxsize" == b[1] && ea(d) && ea(e) ? (f = {
                lightboxWidth: d,
                lightboxHeight: e
            }, this.Xa && (this.Xa.Ca(f), this.Xa = null)) : "params" != b[1] && Zj(this, "xct-badMsg", {Lj: a})
        } else"initiateCollapse" === b[0] ? null !== this.Y && this.Lb() ? this.Y.xb(!1) : "function" === typeof this.Tf && this.Tf() : Zj(this,
            "xct-badMsg", {Lj: a})
    };
    lk.prototype.$j = function () {
        var a = Mc(fg());
        Yj(this, "params_" + a);
        this.Ae && !Yj(this, "maxsize") && (this.Ae = !0)
    };
    lk.prototype.dispatchEvent = function (a) {
        var b = lk.j.dispatchEvent.call(this, a);
        Yj(this, a);
        return b
    };
    (function (a) {
        function b() {
            if (Uj && !Uj.jb)return Uj;
            a.call(this);
            Uj = this;
            this.Ud = !0;
            this.$a = null
        }

        y(b, a);
        x("CreativeToolset", a);
        x("CreativeToolset.prototype.collapseWindow", a.prototype.collapseWindow);
        x("CreativeToolset.prototype.enableExpansion", a.prototype.enableExpansion);
        x("CreativeToolset.prototype.expandWindow", a.prototype.expandWindow);
        x("CreativeToolset.prototype.instantlyResizeWindow", a.prototype.instantlyResizeWindow);
        x("CreativeToolset.prototype.getCollapsedHeight", a.prototype.getCollapsedHeight);
        x("CreativeToolset.prototype.getCollapsedWidth", a.prototype.getCollapsedWidth);
        x("CreativeToolset.prototype.getExpandedHeight", a.prototype.getExpandedHeight);
        x("CreativeToolset.prototype.getExpandedWidth", a.prototype.getExpandedWidth);
        x("CreativeToolset.prototype.getMaxExpandableSize", a.prototype.getMaxExpandableSize);
        x("CreativeToolset.prototype.isExpanded", a.prototype.isExpanded);
        x("CreativeToolset.prototype.isExpansionEnabled", a.prototype.isExpansionEnabled);
        x("CreativeToolset.prototype.shouldMaintainCoordinates",
            a.prototype.shouldMaintainCoordinates);
        x("CreativeToolset.prototype.reportEngagement", a.prototype.reportEngagement);
        x("CreativeToolset.prototype.setChargeableAction", a.prototype.setChargeableAction);
        x("CreativeToolset.prototype.getConfig", a.prototype.getConfig);
        x("CreativeToolsetProxy", b);
        x("CreativeToolsetProxy.prototype", CreativeToolset.prototype);
        x("CreativeToolset.BrowserClass.DESKTOP", 0);
        x("CreativeToolset.BrowserClass.MOBILE_WEB", 1);
        x("CreativeToolset.BrowserClass.IN_APP", 2);
        x("EngagementAction",
            Mg);
        x("CreativeToolset.EngagementAction", Mg);
        x("CreativeToolset.CatBoxEngagementAction", Ng);
        x("CreativeToolset.CatBoxEngagementParam", Kg);
        x("CreativeToolset.CONVERSION_URL_PARAM", "ct_conv");
        x("CreativeToolset.ExpansionMode", bg);
        var c = {currentState: 0, timestamp: w(), engagementCycle: 0, cycleWasCharged: !1};
        x("CreativeToolset.EngagementState", c);
        x("CreativeToolset.EngagementCycleParam", Lg);
        Tj = new Zh;
        Vj = function () {
            return new a
        };
        x("CreativeToolset.getInstance", Vj);
        c = new Di(Tj);
        ma(c);
        K(A, "load", function () {
            Ci(new Bi,
                "199")
        });
        x("CreativeToolset.internals.creativeBodyRemoteEventSink", Hg);
        x("CreativeToolset.internals.enableRemoteEvents", Ig);
        Z.prototype.listen = Z.prototype.dc;
        Z.prototype.listenOnce = Z.prototype.xe;
        Z.prototype.unlisten = Z.prototype.Vc;
        Z.prototype.unlistenByKey = Z.prototype.af
    })(lk);
    var mk = function (a, b, c, d, e) {
        this.ea = !1;
        this.Pg = a;
        this.r = d;
        this.Qg = e;
        this.nk = b;
        this.D = c.clone();
        this.k = new Xf;
        this.td = null;
        this.ve = this.D.clone();
        this.Xf = this.we = null
    };
    g = mk.prototype;
    g.re = function () {
        return this.Lb
    };
    g.isExpanded = function () {
        return this.ea
    };
    g.sh = function () {
        return this.D.clone()
    };
    g.If = function () {
        return this.Pg
    };
    g.md = function () {
        return this.nk
    };
    g.collapse = function () {
        nk(this) && (this.td && (Kj(this.td), this.td = null), ag(this.k), this.Lb = this.ea = !1)
    };
    var ok = function (a, b, c) {
        U(a.k, b, "width", c.width);
        U(a.k, b, "height", c.height);
        $f(a.k, b)
    }, pk = function (a) {
        var b = [], c = nk(a);
        if (!c)return b;
        b.push(c);
        a.r && a.Qg && b.push(a.r.document.getElementById(a.Qg));
        return b
    };
    mk.prototype.expand = function (a, b) {
        var c = pk(this);
        if (!(0 >= c.length)) {
            for (var d = 0, e = c.length; d < e; ++d)ok(this, c[d], a);
            c = c[c.length - 1];
            a.width > this.D.width && (0 == b || 3 == b) && U(this.k, c, "left", this.D.width - a.width);
            a.height > this.D.height && (1 == b || 0 == b) && U(this.k, c, "top", this.D.height - a.height);
            qk(this, c, !1);
            this.ea = !0
        }
    };
    var rk = function (a) {
        return !!a && /^ins$/i.test(a.nodeName)
    };
    mk.prototype.resize = function (a) {
        var b = pk(this);
        if (!(0 >= b.length)) {
            for (var c = b.length, d = 0; d < c; ++d)Nf(b[d], a);
            b = b[c - 1].parentNode;
            c = b.parentNode;
            d = c.parentNode;
            rk(b) && c && rk(c) && (Nf(b, a), Nf(c, a), d && d && rk(d) && sh(d, "adsbygoogle") && Nf(d, a))
        }
    };
    mk.prototype.Ui = function () {
        if (this.Lb) {
            this.ea = !0;
            this.Lb = !1;
            var a = pk(this);
            1 < a.length && ok(this, a[0], this.ve);
            this.we && (this.we(), this.we = null)
        }
    };
    mk.prototype.Ji = function () {
        this.ea || this.collapse();
        this.Xf && this.Xf()
    };
    var qk = function (a, b, c) {
        b = b.parentNode;
        var d = b.parentNode, e = d.parentNode, f = b;
        rk(b) && d && rk(d) && (f = d.parentNode, e && rk(e) && sh(e, "adsbygoogle") && (f = e.parentNode), c || ($f(a.k, b), $f(a.k, d), f == e.parentNode && $f(a.k, e)));
        for (b = f; b && b.style && !/^body$/i.test(b.nodeName); b = b.parentNode)c && !eg() || "visible" == b.style.overflow || T(a.k, b, "overflow", "visible"), c && (W("stacking_context_fixes") ? ("visible" != b.style.overflow && T(a.k, b, "overflow", "visible", "important"), T(a.k, b, "zIndex", 999999, "important"), "absolute" != b.style.position &&
        "fixed" != b.style.position && "relative" != b.style.position && (T(a.k, b, "position", "relative", "important"), T(a.k, b, "left", 0), T(a.k, b, "top", 0), T(a.k, b, "right", 0), T(a.k, b, "bottom", 0))) : (e = b, d = Jf(e), e = If(e, "zIndex"), "static" != d && "auto" != e && T(a.k, b, "zIndex", "auto", "important")))
    }, nk = function (a) {
        a.l || (a.l = z.getElementById(a.Pg));
        return a.l
    };
    var sk = function (a, b) {
        M.call(this);
        this.Wa = a;
        this.Ii = b;
        var c;
        t:{
            c = a.md();
            var d;
            try {
                var e = c, f = z.URL;
                f instanceof Fe || (f = Te(f));
                e instanceof Fe || (e = Te(e));
                d = f.resolve(e)
            } catch (h) {
                f = c.indexOf("//");
                d = c.substring(0, f);
                d = (e = 0 <= f && (0 == f || ":" == c.charAt(f - 1))) && 0 < f ? d : z.location.protocol;
                c = e ? c.substring(f + 2) : z.location.host;
                f = c.indexOf("/");
                0 > f && (f = c.indexOf("?"));
                e && 0 < f && (c = c.substring(0, f));
                c = d + "//" + c;
                break t
            }
            c = d.wb + "://" + d.Ta;
            null != d.Pb && (c += ":" + d.Pb)
        }
        this.hg = c;
        c = this.Wa;
        d = {};
        d.ifrid = c.If();
        d.pu = c.md();
        d.cn = this.Ii;
        d.ppu = cg(this.hg);
        d.lpu = cg();
        this.n = new yf(d);
        se(this.n, u(this.Lf, this));
        this.Xg();
        me(this.Kf, 3E4, this)
    };
    y(sk, M);
    sk.prototype.Xg = function () {
        if (this.n)try {
            this.n.rc()
        } catch (a) {
            me(this.Xg, 10, this)
        }
    };
    sk.prototype.Kf = function () {
        this.n && !this.n.nb() && (this.n.N.rc = function () {
        }, 1 == this.n.N.Md && (this.n.N.kl = function () {
        }), 4 == this.n.N.Md && (this.n.N.il = function () {
        }), this.n.N.ia(), this.n.ia())
    };
    sk.prototype.Lf = function (a) {
        var b = a.split("_"), c = b[0];
        switch (c) {
            case "expand":
                if (!this.Wa.isExpanded()) {
                    a = new D(0, 0);
                    for (var d = c = 0; d < b.length; ++d) {
                        var e = b[d].charAt(0);
                        "w" == e ? a.width = parseInt(b[d].substring(1), 10) : "h" == e ? a.height = parseInt(b[d].substring(1), 10) : "m" == e && (c = parseInt(b[d].substring(1), 10))
                    }
                    var b = this.Wa, d = pk(b), e = O(d[d.length - 1]), f = rc(b.r || A), d = e.y, h = f.height - (e.y + b.D.height), d = a.height - b.D.height > d || h >= d, h = e.x, e = f.width - (e.x + b.D.width), b = a.width - b.D.width > h || e >= h, e = 2;
                    d && !b ? e = 3 : !d && b ?
                        e = 1 : d || b || (e = 0);
                    b = e;
                    this.Ve = "ok_expand_w" + a.width + "_h" + a.height + "_d" + b;
                    0 === c ? (this.Wa.expand(a, b), this.sg()) : 1 === c && (c = this.Wa, b = u(this.sg, this), d = u(this.Zj, this), c.Lb || c.ea || (c.Lb = !0, e = pk(c), 0 >= e.length || (e = e[e.length - 1], f = c.r || A, c.we = b, c.Xf = d, c.ve = a.clone(), c.td = new Gj(e, f, c.ve, u(c.Ui, c), u(c.Ji, c)), qk(c, e, !0), a = c.td, W("swipe_to_expand") ? a.Cj = new wj(a.r, a.l, u(a.ek, a)) : Ij(a))))
                }
                break;
            case "collapse":
                this.Wa.isExpanded() && (this.Wa.collapse(), a = this.Wa.sh(), tk(this, "ok_collapse_w" + a.width + "_h" + a.height));
                break;
            case "resize":
                a = new D(0, 0);
                for (c = 0; c < b.length; ++c)d = b[c].charAt(0), "w" == d ? a.width = parseInt(b[c].substring(1), 10) : "h" == d && (a.height = parseInt(b[c].substring(1), 10));
                this.Ve = "ok_resize_w" + a.width + "_h" + a.height;
                this.Wa.resize(a);
                this.sg();
                break;
            case "maxsize":
                a = this.Wa;
                if (a.isExpanded())a = a.ve; else if (a = a.r || A, c = eg() ? W("engagement_ad_interstitial") ? new D(a.outerWidth, a.outerHeight) : new D(a.innerWidth, a.innerHeight) : rc(a), a = Math.max(0, c.width - Math.max(Math.ceil(.1 * c.width), 42)), b = Math.max(0, c.height -
                    Math.max(Math.ceil(.2 * c.height), 42)), a = new D(a, b), eg() && 310 <= c.width && (a.width = Math.max(a.width, 300)), W("engagement_ad_interstitial")) {
                    c = 50;
                    b = A;
                    i:{
                        d = b;
                        e = d.parent;
                        for (f = 0; 100 > f++ && e && d !== e;) {
                            try {
                                if (d.document !== e.document) {
                                    b = d;
                                    break i
                                }
                            } catch (k) {
                                break
                            }
                            d = e;
                            e = d.parent
                        }
                        b = d
                    }
                    (b = (d = b.parent) && b !== d ? d : null) && (b = b.document.getElementById("dismiss-button")) && b.clientHeight && (c = b.clientHeight);
                    c += 15;
                    a.height > c && (a.height -= c)
                }
                tk(this, "ok_maxsize_i" + a.width + "_e" + a.height);
                break;
            case "params":
                A.CREATIVE_TOOLSET_PARAMS =
                    Jc(a.substr(7));
                tk(this, "ok_params");
                break;
            case "expanding":
            case "collapsed":
                this.dispatchEvent(c)
        }
    };
    var tk = function (a, b) {
        a.n.send("expandable_ad", b)
    };
    sk.prototype.sg = function () {
        this.Ve && (tk(this, this.Ve), this.Ve = null)
    };
    sk.prototype.Zj = function () {
        tk(this, "initiateCollapse")
    };
    x("ExpandableAdSlotFactory.createIframeFromWindow", function (a) {
        var b = a.google_frame_id;
        b || (b = "google_frame_" + Math.floor(2147483647 * Math.random()));
        var c = uk(b, a.google_ad_url, parseInt(a.google_ad_width, 10), parseInt(a.google_ad_height, 10), a.google_container_id);
        return a[b] = c
    });
    var vk = function (a) {
        if (!a)return null;
        var b = a.a, c = a.b, d = a.c, e = a.d, f = a.e, h = a.h;
        if (!b || !c || 0 >= d || 0 >= e || !f)return null;
        a = new mk(b, c, new D(d, e), a.f, a.g);
        f = new sk(a, f);
        h && (A[h] = f);
        return f
    }, uk = function (a, b, c, d, e, f, h, k) {
        if (!a || !b || 0 >= c || 0 >= d)return null;
        var q = nf();
        b = gg(b, q, k);
        k = "<iframe allowtransparency=true frameborder=0 height=" + d + " hspace=0 id=" + a + " marginheight=0 marginwidth=0 name=" + a + ' scrolling=no src="' + b + '" style="left:0;position:absolute;top:0" vspace=0 width=' + c + " allowfullscreen=true></iframe>";
        if (!h) {
            var v = "border:none;height:" + d + "px;margin:0;padding:0;position:relative;visibility:visible;width:" + c + "px;background-color:transparent";
            k = ['<ins id="', a + "_expand", '" style="display:inline-table;', v, '"><ins id="', a + "_anchor", '" style="display:block;', v, '">', k, "</ins></ins>"].join("")
        }
        (e = e ? z.getElementById(e) : null) ? e.innerHTML = k : z.write(k);
        return vk({a: a, b: b, c: c, d: d, e: q, f: f, g: h, h: void 0})
    };
    x("ExpandableAdSlotFactory.createIframe", uk);
    x("DhtmlExpandableIframeFactory.createElement", function (a, b, c, d) {
        if (!a || !b || 0 >= c || 0 >= d)return null;
        var e = nf();
        b = gg(b, e);
        var f = document.createElement("iframe");
        f.style.cssText = "border:none;height:" + d + "px;margin:0;padding:0;position:relative;visibility:visible;width:" + c + "px";
        f.name = a;
        f.id = a;
        f.src = b;
        f.style.cssText = "left:0;position:absolute;top:0";
        f.width = c;
        f.height = d;
        f.frameBorder = 0;
        f.hspace = 0;
        f.vspace = 0;
        f.scrolling = "no";
        f.ll = 0;
        f.ml = 0;
        f.hl = !0;
        f.gl = !0;
        vk({
            a: a, b: b, c: c, d: d, e: e, f: void 0, g: void 0, h: "expandableAdSlot_" +
            a
        });
        a = "border:none;height:" + d + "px;margin:0;padding:0;position:relative;visibility:visible;width:" + c + "px";
        b = z.createElement("ins");
        b.style.cssText = "display:inline-table;" + a;
        c = z.createElement("ins");
        c.style.cssText = "display:block;" + a;
        c.appendChild(f);
        b.appendChild(c);
        return b
    });
    sk.prototype.listen = sk.prototype.dc;
    sk.prototype.listenOnce = sk.prototype.xe;
    sk.prototype.unlisten = sk.prototype.Vc;
    sk.prototype.unlistenByKey = sk.prototype.af;
    if (Na(document.URL))document.write('<script src="//pagead2.googlesyndication.com/pagead/js/creativetoolset/expansion_embed_dbg.js">\x3c/script>'); else {
        var wk = A.google_eas_queue;
        if (wk && n(wk))for (var xk = 0; xk < wk.length; xk++)wk[xk] && vk(wk[xk]);
        A.google_eas_queue = {push: vk}
    }
    ;
})();

(function () {
    var l, n = this, q = function (a) {
            return void 0 !== a
        }, aa = function () {
        }, ba = function (a) {
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
        }, ca = function (a) {
            return "array" == ba(a)
        }, ea = function (a) {
            var b = ba(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        }, t = function (a) {
            return "string" == typeof a
        }, v = function (a) {
            return "number" == typeof a
        }, fa = function (a) {
            return "function" == ba(a)
        }, w = function (a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        }, ga = "closure_uid_" +
            (1E9 * Math.random() >>> 0), ha = 0, ia = function (a, b, c) {
            return a.call.apply(a.bind, arguments)
        }, ja = function (a, b, c) {
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
        }, x = function (a, b, c) {
            x = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
            return x.apply(null, arguments)
        },
        y = function (a, b) {
            var c = a.split("."), d = n;
            c[0]in d || !d.execScript || d.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift());)!c.length && q(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {}
        }, z = function (a, b) {
            function c() {
            }

            c.prototype = b.prototype;
            a.Y = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.Va = function (a, c, f) {
                for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)g[h - 2] = arguments[h];
                return b.prototype[c].apply(a, g)
            }
        };
    var ka = document, la = window;
    var ma = function (a) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, ma); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    z(ma, Error);
    ma.prototype.name = "CustomError";
    var na;
    var oa = function (a) {
            return /^[\s\xa0]*$/.test(a)
        }, pa = function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, xa = function (a) {
            if (!qa.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(ra, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(sa, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(ta, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(ua, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(va, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(wa, "&#0;"));
            return a
        }, ra = /&/g, sa = /</g, ta = />/g, ua = /"/g, va = /'/g, wa = /\x00/g, qa = /[\x00&<>"']/,
        Ba = function (a) {
            return -1 != a.indexOf("&") ? "document"in n ? za(a) : Aa(a) : a
        }, za = function (a) {
            var b = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'}, c;
            c = n.document.createElement("div");
            return a.replace(Ca, function (a, e) {
                var f = b[a];
                if (f)return f;
                if ("#" == e.charAt(0)) {
                    var g = Number("0" + e.substr(1));
                    isNaN(g) || (f = String.fromCharCode(g))
                }
                f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
                return b[a] = f
            })
        }, Aa = function (a) {
            return a.replace(/&([^;]+);/g, function (a, c) {
                switch (c) {
                    case "amp":
                        return "&";
                    case "lt":
                        return "<";
                    case "gt":
                        return ">";
                    case "quot":
                        return '"';
                    default:
                        if ("#" == c.charAt(0)) {
                            var d = Number("0" + c.substr(1));
                            if (!isNaN(d))return String.fromCharCode(d)
                        }
                        return a
                }
            })
        }, Ca = /&([^;\s<&]+);?/g, Da = {
            "\x00": "\\0",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\x0B",
            '"': '\\"',
            "\\": "\\\\"
        }, Ea = {"'": "\\'"}, Fa = function (a) {
            a = String(a);
            if (a.quote)return a.quote();
            for (var b = ['"'], c = 0; c < a.length; c++) {
                var d = a.charAt(c), e = d.charCodeAt(0), f = c + 1, g;
                if (!(g = Da[d])) {
                    if (!(31 < e && 127 > e))if (d in Ea)d = Ea[d]; else if (d in
                        Da)d = Ea[d] = Da[d]; else {
                        e = d;
                        g = d.charCodeAt(0);
                        if (31 < g && 127 > g)e = d; else {
                            if (256 > g) {
                                if (e = "\\x", 16 > g || 256 < g)e += "0"
                            } else e = "\\u", 4096 > g && (e += "0");
                            e += g.toString(16).toUpperCase()
                        }
                        d = Ea[d] = e
                    }
                    g = d
                }
                b[f] = g
            }
            b.push('"');
            return b.join("")
        }, Ga = function (a) {
            return null == a ? "" : String(a)
        }, Ha = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
    var Ia = function (a) {
        Ia[" "](a);
        return a
    };
    Ia[" "] = aa;
    var Ja = function (a) {
        try {
            var b;
            if (b = !!a && null != a.location.href)t:{
                try {
                    Ia(a.foo);
                    b = !0;
                    break t
                } catch (c) {
                }
                b = !1
            }
            return b
        } catch (d) {
            return !1
        }
    }, Ka = function (a, b) {
        if (!(1E-4 > Math.random())) {
            var c = Math.random();
            if (c < b) {
                try {
                    var d = new Uint16Array(1);
                    window.crypto.getRandomValues(d);
                    c = d[0] / 65536
                } catch (e) {
                    c = Math.random()
                }
                return a[Math.floor(c * a.length)]
            }
        }
        return null
    }, A = function (a, b, c) {
        for (var d in a)Object.prototype.hasOwnProperty.call(a, d) && b.call(c, a[d], d, a)
    }, La = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b,
            c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }, Ma = function (a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
    };
    var Oa = function (a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        a.stack && (b = Na(a.stack, b));
        return b
    }, Pa = function (a, b, c) {
        a.google_image_requests || (a.google_image_requests = []);
        var d = a.document.createElement("img");
        if (c) {
            var e = function (a) {
                c(a);
                Ma(d, "load", e);
                Ma(d, "error", e)
            };
            La(d, "load", e);
            La(d, "error", e)
        }
        d.src = b;
        a.google_image_requests.push(d)
    }, Na = function (a, b) {
        try {
            -1 == a.indexOf(b) && (a = b + "\n" + a);
            for (var c; a != c;)c = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,
                "$1");
            return a.replace(/\n */g, "\n")
        } catch (d) {
            return b
        }
    };
    var Qa = function (a, b) {
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
    };

    function B(a) {
        return "function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)
    }

    function Ra() {
        var a = Sa, b = document, c = b.createElement("script");
        c.type = "text/javascript";
        c.src = a;
        var d = b.getElementsByTagName("head")[0];
        if (d)try {
            window.setTimeout(function () {
                d.appendChild(c)
            }, 0)
        } catch (e) {
        }
    }

    var Ua = function (a, b) {
        Ta(a, "load", b)
    }, Ta = function (a, b, c) {
        La(a, b, c, void 0)
    }, Wa = function () {
        var a = Va();
        "google_onload_fired"in a || (a.google_onload_fired = !1, Ua(a, function () {
            a.google_onload_fired = !0
        }))
    };

    function Xa() {
        return "msie"in Ya ? Ya.msie : Ya.msie = -1 != navigator.userAgent.toLowerCase().indexOf("msie")
    }

    var Ya = {};

    function Za() {
        if (navigator.plugins && navigator.mimeTypes.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && a.description)return a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".")
        } else {
            if (navigator.userAgent && 0 <= navigator.userAgent.indexOf("Windows CE")) {
                for (var a = 3, b = 1; b;)try {
                    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + (a + 1)), a++
                } catch (c) {
                    b = null
                }
                return a.toString()
            }
            if (Xa() && !window.opera) {
                b = null;
                try {
                    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
                } catch (d) {
                    a = 0;
                    try {
                        b =
                            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), a = 6, b.Qa = "always"
                    } catch (e) {
                        if (6 == a)return a.toString()
                    }
                    try {
                        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                    } catch (f) {
                    }
                }
                if (b)return a = b.GetVariable("$version").split(" ")[1], a.replace(/,/g, ".")
            }
        }
        return "0"
    }

    var $a = function (a) {
        var b = a.length;
        if (0 == b)return 0;
        for (var c = 305419896, d = 0; d < b; d++)c ^= (c << 5) + (c >> 2) + a.charCodeAt(d) & 4294967295;
        return 0 < c ? c : 4294967296 + c
    };
    var ab = Array.prototype, bb = function (a, b) {
        if (t(a))return t(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (var c = 0; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }, cb = function (a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, db = function (a, b) {
        for (var c = a.length, d = [], e = 0, f = t(a) ? a.split("") : a, g = 0; g < c; g++)if (g in f) {
            var h = f[g];
            b.call(void 0, h, g, a) && (d[e++] = h)
        }
        return d
    }, eb = function (a, b) {
        for (var c = a.length, d = Array(c), e = t(a) ? a.split("") : a, f = 0; f < c; f++)f in e && (d[f] = b.call(void 0,
            e[f], f, a));
        return d
    }, fb = function (a, b) {
        for (var c = a.length, d = t(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && b.call(void 0, d[e], e, a))return !0;
        return !1
    }, gb = function (a, b) {
        for (var c = a.length, d = t(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && !b.call(void 0, d[e], e, a))return !1;
        return !0
    }, hb = function (a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return f;
        return -1
    }, ib = function (a, b) {
        0 <= bb(a, b) || a.push(b)
    }, jb = function (a, b) {
        var c = hb(a, b, void 0);
        0 <= c && ab.splice.call(a, c, 1)
    }, kb = function (a) {
        return ab.concat.apply(ab,
            arguments)
    }, lb = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return []
    }, mb = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (ea(d)) {
                var e = a.length || 0, f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++)a[e + g] = d[g]
            } else a.push(d)
        }
    }, nb = function (a, b, c) {
        return 2 >= arguments.length ? ab.slice.call(a, b) : ab.slice.call(a, b, c)
    }, ob = function (a) {
        for (var b = {}, c = 0, d = 0; d < a.length;) {
            var e = a[d++], f = w(e) ? "o" + (e[ga] || (e[ga] = ++ha)) : (typeof e).charAt(0) + e;
            Object.prototype.hasOwnProperty.call(b,
                f) || (b[f] = !0, a[c++] = e)
        }
        a.length = c
    }, pb = function (a, b) {
        for (var c = {}, d = 0; d < a.length; d++) {
            var e = a[d], f = b.call(void 0, e, d, a);
            q(f) && (c[f] || (c[f] = [])).push(e)
        }
        return c
    };
    var qb = function (a, b) {
        for (var c in a)b.call(void 0, a[c], c, a)
    }, rb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), sb = function (a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < rb.length; f++)c = rb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }, tb = function (a) {
        var b = arguments.length;
        if (1 == b && ca(arguments[0]))return tb.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++)c[arguments[d]] = !0;
        return c
    };
    tb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    tb("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    tb("embed", "iframe", "link", "object", "script", "style", "template");
    var C = function (a, b) {
        this.x = q(a) ? a : 0;
        this.y = q(b) ? b : 0
    };
    C.prototype.clone = function () {
        return new C(this.x, this.y)
    };
    C.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    C.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    C.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    var D = function (a, b) {
        this.width = a;
        this.height = b
    };
    l = D.prototype;
    l.clone = function () {
        return new D(this.width, this.height)
    };
    l.isEmpty = function () {
        return !(this.width * this.height)
    };
    l.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var E;
    t:{
        var ub = n.navigator;
        if (ub) {
            var vb = ub.userAgent;
            if (vb) {
                E = vb;
                break t
            }
        }
        E = ""
    }
    ;
    var wb = -1 != E.indexOf("Opera") || -1 != E.indexOf("OPR"), F = -1 != E.indexOf("Trident") || -1 != E.indexOf("MSIE"), xb = -1 != E.indexOf("Gecko") && -1 == E.toLowerCase().indexOf("webkit") && !(-1 != E.indexOf("Trident") || -1 != E.indexOf("MSIE")), yb = -1 != E.toLowerCase().indexOf("webkit"), zb = function () {
        var a = n.document;
        return a ? a.documentMode : void 0
    }, Ab = function () {
        var a = "", b;
        if (wb && n.opera)return a = n.opera.version, fa(a) ? a() : a;
        xb ? b = /rv\:([^\);]+)(\)|;)/ : F ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : yb && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(E)) ?
            a[1] : "");
        return F && (b = zb(), b > parseFloat(a)) ? String(b) : a
    }(), Bb = {}, Cb = function (a) {
        var b;
        if (!(b = Bb[a])) {
            b = 0;
            for (var c = pa(String(Ab)).split("."), d = pa(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var g = c[f] || "", h = d[f] || "", k = RegExp("(\\d*)(\\D*)", "g"), m = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var p = k.exec(g) || ["", "", ""], r = m.exec(h) || ["", "", ""];
                    if (0 == p[0].length && 0 == r[0].length)break;
                    b = Ha(0 == p[1].length ? 0 : parseInt(p[1], 10), 0 == r[1].length ? 0 : parseInt(r[1], 10)) || Ha(0 == p[2].length, 0 == r[2].length) ||
                    Ha(p[2], r[2])
                } while (0 == b)
            }
            b = Bb[a] = 0 <= b
        }
        return b
    }, Db = n.document, Eb = Db && F ? zb() || ("CSS1Compat" == Db.compatMode ? parseInt(Ab, 10) : 5) : void 0;
    var Fb = !F || F && 9 <= Eb, Gb = !xb && !F || F && F && 9 <= Eb || xb && Cb("1.9.1");
    F && Cb("9");
    var Hb = F || wb || yb;
    var Kb = function (a) {
        return a ? new Ib(Jb(a)) : na || (na = new Ib)
    }, Lb = function (a) {
        var b = document;
        return t(a) ? b.getElementById(a) : a
    }, Nb = function (a, b) {
        qb(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Mb ? a.setAttribute(Mb[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }, Mb = {
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
    }, Ob = function (a) {
        a = a.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
        return new D(a.clientWidth, a.clientHeight)
    }, Pb = function (a) {
        return yb || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement
    }, Qb = function (a) {
        return a.parentWindow || a.defaultView
    }, Sb = function (a, b, c) {
        function d(c) {
            c && b.appendChild(t(c) ? a.createTextNode(c) : c)
        }

        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !ea(f) || w(f) && 0 < f.nodeType ? d(f) :
                cb(Rb(f) ? lb(f) : f, d)
        }
    }, Tb = function (a) {
        return Gb && void 0 != a.children ? a.children : db(a.childNodes, function (a) {
            return 1 == a.nodeType
        })
    }, Ub = function (a) {
        var b;
        if (Hb && !(F && Cb("9") && !Cb("10") && n.SVGElement && a instanceof n.SVGElement) && (b = a.parentElement))return b;
        b = a.parentNode;
        return w(b) && 1 == b.nodeType ? b : null
    }, Jb = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }, Rb = function (a) {
        if (a && "number" == typeof a.length) {
            if (w(a))return "function" == typeof a.item || "string" == typeof a.item;
            if (fa(a))return "function" == typeof a.item
        }
        return !1
    }, Ib = function (a) {
        this.j = a || n.document || document
    };
    Ib.prototype.k = function (a, b, c) {
        var d = this.j, e = arguments, f = e[0], g = e[1];
        if (!Fb && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', xa(g.name), '"');
            if (g.type) {
                f.push(' type="', xa(g.type), '"');
                var h = {};
                sb(h, g);
                delete h.type;
                g = h
            }
            f.push(">");
            f = f.join("")
        }
        f = d.createElement(f);
        g && (t(g) ? f.className = g : ca(g) ? f.className = g.join(" ") : Nb(f, g));
        2 < e.length && Sb(d, f, e);
        return f
    };
    Ib.prototype.appendChild = function (a, b) {
        a.appendChild(b)
    };
    Ib.prototype.contains = function (a, b) {
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    };
    var Vb = {}, Yb = function (a, b) {
            var c = Wb, d, e = !0;
            try {
                d = b()
            } catch (f) {
                try {
                    var g = Oa(f), h = "";
                    f.fileName && (h = f.fileName);
                    var k = -1;
                    f.lineNumber && (k = f.lineNumber);
                    e = c(a, g, h, k, void 0)
                } catch (m) {
                    try {
                        var p = Oa(m), c = "";
                        m.fileName && (c = m.fileName);
                        g = -1;
                        m.lineNumber && (g = m.lineNumber);
                        Wb("pAR", p, c, g, void 0, void 0)
                    } catch (r) {
                        Xb({context: "mRE", msg: r.toString() + "\n" + (r.stack || "")}, void 0)
                    }
                }
                if (!e)throw f;
            } finally {
            }
            return d
        }, Wb = function (a, b, c, d, e, f) {
            var g = {};
            if (e)try {
                e(g)
            } catch (h) {
            }
            g.context = a;
            g.msg = b.substring(0, 512);
            c && (g.file =
                c);
            0 < d && (g.line = d.toString());
            g.url = ka.URL.substring(0, 512);
            g.ref = ka.referrer.substring(0, 512);
            Zb(g);
            Xb(g, f);
            return !0
        }, Xb = function (a, b) {
            try {
                if (Math.random() < (b || .01)) {
                    var c = "/pagead/gen_204?id=jserror" + $b(a), d = "http" + ("http:" == la.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c, d = d.substring(0, 2E3);
                    Pa(la, d, void 0)
                }
            } catch (e) {
            }
        }, Zb = function (a) {
            var b = a || {};
            Qa(Vb, function (a, d) {
                b[d] = la[a]
            })
        }, ac = function (a, b) {
            return function () {
                var c = arguments;
                return Yb(a, function () {
                    return b.apply(void 0, c)
                })
            }
        },
        bc = function (a) {
            return ac("osd::util::rschange", a)
        }, $b = function (a) {
            var b = "";
            Qa(a, function (a, d) {
                if (0 === a || a)b += "&" + d + "=" + B(a)
            });
            return b
        };
    var cc = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    l = cc.prototype;
    l.getWidth = function () {
        return this.right - this.left
    };
    l.getHeight = function () {
        return this.bottom - this.top
    };
    l.clone = function () {
        return new cc(this.top, this.right, this.bottom, this.left)
    };
    l.contains = function (a) {
        return this && a ? a instanceof cc ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    l.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    l.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    l.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    var G = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    G.prototype.clone = function () {
        return new G(this.left, this.top, this.width, this.height)
    };
    var dc = function (a) {
        return new cc(a.top, a.left + a.width, a.top + a.height, a.left)
    };
    G.prototype.contains = function (a) {
        return a instanceof G ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };
    G.prototype.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    G.prototype.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    G.prototype.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var ec = function (a, b) {
        var c;
        t:{
            c = Jb(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break t
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }, fc = function (a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        F && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }, gc = function (a) {
        if (F && !(F && 8 <= Eb))return a.offsetParent;
        var b = Jb(a), c = ec(a, "position"), d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)if (11 == a.nodeType && a.host && (a = a.host), c = ec(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))return a;
        return null
    }, hc = function (a) {
        var b = Jb(a);
        ec(a, "position");
        var c = new C(0, 0), d;
        d = b ? Jb(b) : document;
        var e;
        (e = !F || F && 9 <=
        Eb) || (e = "CSS1Compat" == Kb(d).j.compatMode);
        if (a == (e ? d.documentElement : d.body))return c;
        a = fc(a);
        d = Kb(b).j;
        b = Pb(d);
        d = Qb(d);
        b = F && Cb("10") && d.pageYOffset != b.scrollTop ? new C(b.scrollLeft, b.scrollTop) : new C(d.pageXOffset || b.scrollLeft, d.pageYOffset || b.scrollTop);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }, ic = function (a) {
        "number" == typeof a && (a = Math.round(a) + "px");
        return a
    }, jc = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = yb && !b && !c;
        return q(b) && !d || !a.getBoundingClientRect ? new D(b, c) : (a = fc(a), new D(a.right -
        a.left, a.bottom - a.top))
    };
    var kc = function () {
        this.j = []
    }, mc = function (a, b, c, d, e) {
        a.j.push(new lc(b, c, d, e))
    }, lc = function (a, b, c, d) {
        this.l = a;
        this.j = (this.k = q(d) && a.style && a.style.getPropertyPriority) ? String(b).replace(/([A-Z])/g, "-$1").toLowerCase() : b;
        this.m = this.k ? a.style.getPropertyValue(this.j) : a.style[this.j];
        this.n = this.k ? a.style.getPropertyPriority(this.j) : null;
        this.k ? (a.style.removeProperty(this.j), a.style.setProperty(this.j, c, d)) : a.style[this.j] = c
    };
    var nc = function (a) {
        return function () {
            return a
        }
    }, oc = function (a) {
        var b = arguments, c = b.length;
        return function () {
            for (var a = 0; a < c; a++)if (!b[a].apply(this, arguments))return !1;
            return !0
        }
    };
    var pc = function (a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }, H = function (a) {
        var b = [];
        qc(new rc, a, b);
        return b.join("")
    }, rc = function () {
    }, qc = function (a, b, c) {
        switch (typeof b) {
            case "string":
                sc(b, c);
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
                if (ca(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)c.push(e), qc(a, b[f], c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (e in b)Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), sc(e, c), c.push(":"), qc(a, f, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }, tc = {
        '"': '\\"',
        "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b"
    }, uc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g, sc = function (a, b) {
        b.push('"', a.replace(uc, function (a) {
            if (a in tc)return tc[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return tc[a] = e + b.toString(16)
        }), '"')
    };
    var vc = function (a, b, c, d) {
        this.m = a;
        this.j = 1;
        this.l = b;
        this.o = c;
        this.v = d;
        this.n = Math.random();
        this.q = {};
        this.k = null;
        this.r = x(this.u, this)
    };
    vc.prototype.u = function (a) {
        if (a.origin == this.o && a.source == this.l) {
            var b = null;
            try {
                b = pc(a.data)
            } catch (c) {
            }
            if (w(b) && (a = b.i, b.c === this.m && a != this.n && (2 != this.j && (this.j = 2, wc(this), this.k && (this.k(), this.k = null)), a = b.s, b = b.p, t(a) && (t(b) || w(b)) && this.q.hasOwnProperty(a))))this.q[a](b)
        }
    };
    var wc = function (a) {
        var b = {};
        b.c = a.m;
        b.i = a.n;
        a.l.postMessage(H(b), a.o)
    };
    vc.prototype.t = function () {
        if (1 == this.j) {
            try {
                this.l.postMessage && wc(this)
            } catch (a) {
            }
            window.setTimeout(x(this.t, this), 50)
        }
    };
    var xc = function (a, b) {
        b && (a.k = b);
        La(window, "message", a.r);
        a.v && a.t()
    }, yc = function (a, b, c) {
        a.q[b] = c
    };
    vc.prototype.send = function (a, b) {
        var c = {};
        c.c = this.m;
        c.i = this.n;
        c.s = a;
        c.p = b;
        this.l.postMessage(H(c), this.o)
    };
    vc.prototype.close = function () {
        3 != this.j && (this.j = 3, Ma(window, "message", this.r))
    };
    xb || yb || F && Cb(11);
    var zc = function (a) {
        this.m = a;
        this.n = null;
        this.u = this.l = 0;
        this.k = null;
        this.G = "sfchannel" + a
    };
    var Ac = function (a, b, c, d, e, f) {
        this.l = a.clone();
        this.k = b.clone();
        this.m = c;
        this.j = d.clone();
        this.n = e;
        this.o = f
    }, Bc = function (a) {
        return H({
            windowCoords_t: a.l.top,
            windowCoords_r: a.l.right,
            windowCoords_b: a.l.bottom,
            windowCoords_l: a.l.left,
            frameCoords_t: a.k.top,
            frameCoords_r: a.k.right,
            frameCoords_b: a.k.bottom,
            frameCoords_l: a.k.left,
            styleZIndex: a.m,
            allowedExpansion_t: a.j.top,
            allowedExpansion_r: a.j.right,
            allowedExpansion_b: a.j.bottom,
            allowedExpansion_l: a.j.left,
            xInView: a.n,
            yInView: a.o
        })
    }, Cc = function (a) {
        var b =
            window.screenX || window.screenLeft || 0, c = window.screenY || window.screenTop || 0, b = new cc(c, (window.outerWidth || document.documentElement.clientWidth || 0) - b, (window.outerHeight || document.documentElement.clientHeight || 0) - c, b), c = hc(a), d;
        if ("none" != ec(a, "display"))d = jc(a); else {
            d = a.style;
            var e = d.display, f = d.visibility, g = d.position;
            d.visibility = "hidden";
            d.position = "absolute";
            d.display = "inline";
            var h = jc(a);
            d.display = e;
            d.position = g;
            d.visibility = f;
            d = h
        }
        c = new G(c.x, c.y, d.width, d.height);
        d = dc(c);
        for (var e = String(ec(a,
            "zIndex")), f = new cc(0, Infinity, Infinity, 0), g = Kb(a), k = g.j.body, m = g.j.documentElement, h = Pb(g.j); a = gc(a);)if (!(F && 0 == a.clientWidth || yb && 0 == a.clientHeight && a == k) && a != k && a != m && "visible" != ec(a, "overflow")) {
            var p = hc(a), r = new C(a.clientLeft, a.clientTop);
            p.x += r.x;
            p.y += r.y;
            f.top = Math.max(f.top, p.y);
            f.right = Math.min(f.right, p.x + a.clientWidth);
            f.bottom = Math.min(f.bottom, p.y + a.clientHeight);
            f.left = Math.max(f.left, p.x)
        }
        a = h.scrollLeft;
        h = h.scrollTop;
        f.left = Math.max(f.left, a);
        f.top = Math.max(f.top, h);
        g = Ob(Qb(g.j) ||
        window);
        f.right = Math.min(f.right, a + g.width);
        f.bottom = Math.min(f.bottom, h + g.height);
        a = 0 <= f.top && 0 <= f.left && f.bottom > f.top && f.right > f.left ? f : null;
        var u;
        if (null != a)t:{
            h = new G(a.left, a.top, a.right - a.left, a.bottom - a.top);
            u = Math.max(h.left, c.left);
            f = Math.min(h.left + h.width, c.left + c.width);
            if (u <= f && (g = Math.max(h.top, c.top), h = Math.min(h.top + h.height, c.top + c.height), g <= h)) {
                u = new G(u, g, f - u, h - g);
                break t
            }
            u = null
        }
        a = (f = (f = null != u && (0 != u.width || u.left + u.width != a.left && u.left != a.right)) && (0 != u.height || u.top + u.height !=
        a.top && u.top != a.bottom)) ? new cc(Math.max(d.top - a.top, 0), Math.max(a.right - d.right, 0), Math.max(a.bottom - d.bottom, 0), Math.max(d.left - a.left, 0)) : new cc(0, 0, 0, 0);
        g = f = 0;
        u && !(new D(u.width, u.height)).isEmpty() && (f = u.width / c.width, g = u.height / c.height);
        return new Ac(b, d, e, a, f, g)
    };
    var Dc = !1, Ec = "", Fc = function (a) {
        a = a.match(/[\d]+/g);
        if (!a)return "";
        a.length = 3;
        return a.join(".")
    };
    if (navigator.plugins && navigator.plugins.length) {
        var Gc = navigator.plugins["Shockwave Flash"];
        Gc && (Dc = !0, Gc.description && (Ec = Fc(Gc.description)));
        navigator.plugins["Shockwave Flash 2.0"] && (Dc = !0, Ec = "2.0.0.11")
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var Hc = navigator.mimeTypes["application/x-shockwave-flash"];
        (Dc = Hc && Hc.enabledPlugin) && (Ec = Fc(Hc.enabledPlugin.description))
    } else try {
        var Ic = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), Dc = !0, Ec = Fc(Ic.GetVariable("$version"))
    } catch (Jc) {
        try {
            Ic =
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), Dc = !0, Ec = "6.0.21"
        } catch (Kc) {
            try {
                Ic = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Dc = !0, Ec = Fc(Ic.GetVariable("$version"))
            } catch (Lc) {
            }
        }
    }
    var Mc = Dc, Nc = Ec;
    var Oc = function () {
        this.j = {shared: {sf_ver: "1-0-2", ck_on: navigator.cookieEnabled ? 1 : 0, flash_ver: Mc ? Nc : "0"}}
    };
    var Pc = function () {
        this.j = !0;
        this.k = !1
    };
    var Qc = function (a, b, c, d) {
        var e = new Pc, f = new Oc;
        this.o = a;
        this.j = b;
        this.k = c;
        this.m = e;
        this.l = f;
        this.n = d
    };
    var Rc = function (a) {
        this.j = a
    }, Sc = function (a, b) {
        this.j = a;
        this.version = b
    };
    z(Sc, Rc);
    Sc.prototype.l = function () {
        return H({uid: this.j, version: this.version})
    };
    var Tc = function (a, b, c) {
        this.j = a;
        this.m = b;
        this.k = c
    };
    z(Tc, Rc);
    Tc.prototype.l = function () {
        return H({uid: this.j, initialWidth: this.m, initialHeight: this.k})
    };
    var Uc = function (a, b) {
        this.j = a;
        this.description = b
    };
    z(Uc, Rc);
    Uc.prototype.l = function () {
        return H({uid: this.j, description: this.description})
    };
    var Vc = function (a, b) {
        this.j = a;
        this.k = b
    };
    z(Vc, Rc);
    Vc.prototype.l = function () {
        return H({
            uid: this.j,
            expand_t: this.k.top,
            expand_r: this.k.right,
            expand_b: this.k.bottom,
            expand_l: this.k.left
        })
    };
    var Wc = function (a) {
        this.j = a
    };
    z(Wc, Rc);
    Wc.prototype.l = function () {
        return H({uid: this.j})
    };
    var Xc = function (a, b) {
        this.j = a;
        this.m = b
    };
    z(Xc, Rc);
    Xc.prototype.l = function () {
        var a = {uid: this.j, newGeometry: Bc(this.m)};
        return H(a)
    };
    var Yc = function (a, b, c, d) {
        Xc.call(this, a, c);
        this.n = b;
        this.k = d
    };
    z(Yc, Xc);
    Yc.prototype.l = function () {
        var a = {
            uid: this.j,
            success: this.n,
            newGeometry: Bc(this.m),
            expand_t: this.k.top,
            expand_r: this.k.right,
            expand_b: this.k.bottom,
            expand_l: this.k.left
        };
        return H(a)
    };
    var Zc = function (a, b, c) {
        this.j = a;
        this.width = b;
        this.height = c
    };
    z(Zc, Rc);
    Zc.prototype.l = function () {
        return H({uid: this.j, width: this.width, height: this.height})
    };
    var $c = function (a) {
        try {
            for (var b = null; b != a; b = a, a = a.parent)switch (a.location.protocol) {
                case "https:":
                    return !0;
                case "http:":
                case "file:":
                    return !1
            }
        } catch (c) {
        }
        return !0
    };
    var dd = function (a) {
        zc.call(this, ad++);
        this.r = a.Ha;
        this.t = a.X;
        this.I = window.location.protocol + "//" + window.location.host;
        this.J = window.location.protocol + "//tpc.googlesyndication.com";
        this.B = Boolean(a.xa);
        this.v = 1 == a.size;
        this.o = new kc;
        bd(this, a.X, a.size);
        this.n = this.F = Cc(a.X);
        this.j = cd(this, a.Ca, a.content, a.size);
        this.w = x(this.K, this);
        this.A = -1;
        this.q = 0;
        this.k = new vc(this.G, this.j.contentWindow, this.J, !1);
        yc(this.k, "init_done", x(this.Da, this));
        yc(this.k, "register_done", x(this.Ma, this));
        yc(this.k, "report_error",
            x(this.Na, this));
        yc(this.k, "expand_request", x(this.ya, this));
        yc(this.k, "collapse_request", x(this.wa, this));
        yc(this.k, "creative_geometry_update", x(this.H, this));
        xc(this.k, x(this.Ka, this));
        if (a.ua) {
            var b = x(function () {
                var c;
                t:{
                    try {
                        if (this.j.contentWindow.frames.google_pubads_beacon_iframe) {
                            c = !0;
                            break t
                        }
                    } catch (d) {
                    }
                    c = !1
                }
                c || (a.ua(), Ma(this.j, "load", b))
            }, this);
            La(this.j, "load", b)
        }
    };
    z(dd, zc);
    var ad = 1, bd = function (a, b, c) {
        a.v ? (b.style.width = ic("100%"), b.style.height = ic("auto")) : (b.style.width = ic(c.width), b.style.height = ic(c.height))
    }, cd = function (a, b, c, d) {
        var e = Kb(a.t);
        c = "1-0-2;" + c.length + ";" + c;
        var f;
        f = new Qc(a.m, a.I, a.F, a.v);
        var g = f.o, h = f.j, k = Bc(f.k), m;
        m = f.m;
        m = H({expandByOverlay: m.j, expandByPush: m.k, readCookie: !1, writeCookie: !1});
        f = {
            uid: g,
            hostPeerName: h,
            initialGeometry: k,
            permissions: m,
            metadata: H(f.l.j),
            reportCreativeGeometry: f.n
        };
        f = H(f);
        c = c + f;
        a.B && d instanceof D && (f = Kb(a.t), ed || (g = f.k("script",
            {src: "//pagead2.googlesyndication.com/pagead/expansion_embed.js?source=safeframe"}), Ub(f.j.getElementsByTagName("script")[0]).appendChild(g), ed = !0), f = Qb(f.j), f.google_eas_queue = f.google_eas_queue || [], f.google_eas_queue.push({
            a: b,
            b: f.location.protocol + "//tpc.googlesyndication.com",
            c: d.width,
            d: d.height,
            e: "sf-gdn-exp-" + a.m,
            f: void 0,
            g: void 0,
            h: void 0
        }));
        a.v ? (f = "100%", d = 0) : (f = d.width, d = d.height);
        g = Qb(e.j);
        h = "//tpc.googlesyndication.com/safeframe/1-0-2/html/container.html";
        k = g;
        for (m = 0; k != k.parent;)m++,
            k = k.parent;
        (k = m) && (h += "?n=" + k);
        g = ($c(g) ? "https:" : "http:") + h;
        a.B && (g += "#" + ["xpc=", "sf-gdn-exp-" + a.m, "&p=", encodeURIComponent(ka.location.protocol), "//", encodeURIComponent(ka.location.host)].join(""));
        b = {
            id: b,
            name: c,
            src: g,
            scrolling: "no",
            marginWidth: "0",
            marginHeight: "0",
            width: String(f),
            height: String(d),
            "data-is-safeframe": "true"
        };
        d = {
            frameborder: 0,
            style: "border:0;vertical-align:bottom;",
            allowTransparency: "true",
            src: F && !Cb(9) ? "javascript:\"<html><body style='background:transparent'></body></html>\"" : "about:blank"
        };
        b && sb(d, b);
        e = e.k("iframe", d);
        a.t.appendChild(e);
        return e
    };
    l = dd.prototype;
    l.Ka = function () {
        La(window, "resize", this.w);
        La(window, "scroll", this.w)
    };
    l.Da = function (a) {
        try {
            if (0 != this.l)throw Error("Container already initialized");
            if (!t(a))throw Error("Could not parse serialized message");
            var b, c = pc(a);
            if (!(w(c) && v(c.uid) && t(c.version)))throw Error("Cannot parse JSON message");
            b = new Sc(c.uid, c.version);
            if (this.m != b.j || "1-0-2" != b.version)throw Error("Wrong source container");
            this.l = 1
        } catch (d) {
            this.r.error("Invalid INITIALIZE_DONE message. Reason: " + d.message)
        }
    };
    l.Ma = function (a) {
        try {
            if (1 != this.l)throw Error("Container not initialized");
            if (!t(a))throw Error("Could not parse serialized message");
            var b = pc(a);
            if (!(w(b) && v(b.uid) && v(b.initialWidth) && v(b.initialHeight)))throw Error("Cannot parse JSON message");
            if (this.m != (new Tc(b.uid, b.initialWidth, b.initialHeight)).j)throw Error("Wrong source container");
            this.l = 2
        } catch (c) {
            this.r.error("Invalid REGISTER_DONE message. Reason: " + c.message)
        }
    };
    l.Na = function (a) {
        try {
            if (!t(a))throw Error("Could not parse serialized message");
            var b, c = pc(a);
            if (!(w(c) && v(c.uid) && t(c.description)))throw Error("Cannot parse JSON message");
            b = new Uc(c.uid, c.description);
            if (this.m != b.j)throw Error("Wrong source container");
            this.r.info("Ext reported an error. Description: " + b.description)
        } catch (d) {
            this.r.error("Invalid REPORT_ERROR message. Reason: " + d.message)
        }
    };
    l.ya = function (a) {
        try {
            if (2 != this.l)throw Error("Container is not registered");
            if (0 != this.u)throw Error("Container is not collapsed");
            if (!t(a))throw Error("Could not parse serialized message");
            var b, c = pc(a);
            if (!(w(c) && v(c.uid) && v(c.expand_t) && v(c.expand_r) && v(c.expand_b) && v(c.expand_l)))throw Error("Cannot parse JSON message");
            b = new Vc(c.uid, new cc(c.expand_t, c.expand_r, c.expand_b, c.expand_l));
            if (this.m != b.j)throw Error("Wrong source container");
            if (!(0 <= b.k.top && 0 <= b.k.left && 0 <= b.k.bottom && 0 <= b.k.right))throw Error("Invalid expansion amounts");
            var d;
            var e = b.k, f = this.n = Cc(this.j);
            if (e.top <= f.j.top && e.right <= f.j.right && e.bottom <= f.j.bottom && e.left <= f.j.left) {
                for (var g = this.j.parentNode; g && g.style; g = g.parentNode)mc(this.o, g, "overflowX", "visible", "important"), mc(this.o, g, "overflowY", "visible", "important");
                var h = dc(new G(0, 0, this.n.k.getWidth(), this.n.k.getHeight()));
                w(e) ? (h.top -= e.top, h.right += e.right, h.bottom += e.bottom, h.left -= e.left) : (h.top -= e, h.right += void 0, h.bottom += void 0, h.left -= NaN);
                mc(this.o, this.t, "position", "relative");
                mc(this.o,
                    this.j, "zIndex", "10000");
                mc(this.o, this.j, "position", "absolute");
                var k = h.getWidth();
                mc(this.o, this.j, "width", k + "px", void 0);
                var m = h.getHeight();
                mc(this.o, this.j, "height", m + "px", void 0);
                mc(this.o, this.j, "left", h.left + "px", void 0);
                mc(this.o, this.j, "top", h.top + "px", void 0);
                this.u = 2;
                this.n = Cc(this.j);
                d = !0
            } else d = !1;
            this.k.send("expand_response", (new Yc(this.m, d, this.n, b.k)).l())
        } catch (p) {
            this.r.error("Invalid EXPAND_REQUEST message. Reason: " + p.message)
        }
    };
    l.wa = function (a) {
        try {
            if (2 != this.l)throw Error("Container is not registered");
            if (2 != this.u)throw Error("Container is not expanded");
            if (!t(a))throw Error("Could not parse serialized message");
            var b = pc(a);
            if (!w(b) || !v(b.uid))throw Error("Cannot parse JSON message");
            if (this.m != (new Wc(b.uid)).j)throw Error("Wrong source container");
            fd(this);
            this.k.send("collapse_response", (new Xc(this.m, this.n)).l())
        } catch (c) {
            this.r.error("Invalid COLLAPSE_REQUEST message. Reason: " + c.message)
        }
    };
    var fd = function (a) {
        for (var b = a.o, c = b.j.length - 1; 0 <= c; c--) {
            var d = b.j[c];
            d.k ? (d.l.style.removeProperty(d.j), d.l.style.setProperty(d.j, d.m, d.n)) : d.l.style[d.j] = d.m
        }
        b.j.length = 0;
        a.u = 0;
        a.j && (a.n = Cc(a.j))
    };
    dd.prototype.K = function () {
        if (1 == this.l || 2 == this.l)switch (this.q) {
            case 0:
                gd(this);
                this.A = setTimeout(x(this.C, this), 1E3);
                this.q = 1;
                break;
            case 1:
                this.q = 2;
                break;
            case 2:
                this.q = 2
        }
    };
    dd.prototype.H = function (a) {
        try {
            if (!t(a))throw Error("Could not parse serialized message");
            var b, c = pc(a);
            if (!(w(c) && v(c.uid) && v(c.width) && v(c.height)))throw Error("Cannot parse JSON message");
            b = new Zc(c.uid, c.width, c.height);
            if (this.m != b.j)throw Error("Wrong source container");
            this.v ? this.j.height = String(b.height) : this.r.error("Got CreativeGeometryUpdate message in non-fluidcontainer. The container is not resized.")
        } catch (d) {
            this.r.error("Invalid CREATIVE_GEOMETRY_UPDATE message. Reason: " + d.message)
        }
    };
    dd.prototype.C = function () {
        if (1 == this.l || 2 == this.l)switch (this.q) {
            case 1:
                this.q = 0;
                break;
            case 2:
                gd(this), this.A = setTimeout(x(this.C, this), 1E3), this.q = 1
        }
    };
    var gd = function (a) {
        a.n = Cc(a.j);
        a.k.send("geometry_update", (new Xc(a.m, a.n)).l())
    }, hd = function (a) {
        100 != a.l && (2 == a.u && fd(a), clearTimeout(a.A), a.A = -1, a.q = 3, a.k && (a.k.close(), a.k = null), Ma(window, "resize", a.w), Ma(window, "scroll", a.w), a.j && a.t == Ub(a.j) && a.t.removeChild(a.j), a.j = null, a.t = null, a.l = 100)
    }, ed = !1;
    var id = function (a, b, c, d, e) {
        this.slot = a;
        this.isEmpty = b;
        this.size = c;
        this.creativeId = d;
        this.lineItemId = e;
        this.serviceName = "publisher_ads"
    };
    var jd = function (a, b) {
        this.j = a;
        this.k = b;
        this.r = this.j.getName();
        this.u = this.j.getSlotId().getInstance();
        var c = this.r, d = c.split("/");
        this.v = "/" == c.charAt(0) && 2 <= d.length ? d[1] : "/" != c.charAt(0) && 1 <= d.length ? d[0] : "";
        this.w = "";
        this.A = 0;
        this.l = null;
        this.m = -1
    };
    jd.prototype.C = 0;
    jd.prototype.q = !1;
    var kd = -1, ld = function (a) {
        a.C = 0;
        a.q = !1;
        a.n = null;
        a.t = null;
        a.o = null;
        a.B = null
    };
    jd.prototype.getName = function () {
        return this.r
    };
    jd.prototype.getInstance = function () {
        return this.u
    };
    var I = function (a) {
        return a.r + "_" + a.u
    }, J = function (a) {
        return a.j.getSlotId().getDomId()
    }, K = function (a) {
        return "google_ads_iframe_" + I(a)
    };
    jd.prototype.toString = function () {
        var a = this.j.getSlotId().toString();
        return "[gam.gut.AdSlot: nwid=" + this.v + ", name=" + this.r + ", instance=" + this.u + ", iframeLoaded=" + this.q + ", tries=" + this.C + ", GUT slot id=" + a + "]"
    };
    var md = function (a, b) {
        a.n || (a.n = (new Date).getTime());
        a.j.fetchStarted(b || "")
    }, nd = function (a) {
        a.o || (a.o = (new Date).getTime());
        a.j.renderStarted()
    }, L = function (a, b) {
        a.B || (a.B = (new Date).getTime());
        a.j.renderEnded(b)
    };
    jd.prototype.getSizes = function (a) {
        var b = a || window;
        a = null;
        b.top == b && (a = Ob(window), a = this.j.getSizes(a.width, a.height));
        null == a && (a = this.j.getSizes());
        for (var b = [], c = 0; c < a.length; ++c)b.push([a[c].getWidth(), a[c].getHeight()]);
        return b
    };
    var od = function (a) {
        a = a.getSizes();
        for (var b = [], c = 0; c < a.length; ++c)b.push(a[c].join("x"));
        return b.join("|")
    }, pd = function (a) {
        var b = [], c = a.j.getTargetingMap();
        A(c, function (a, c) {
            for (var d = [], h = 0; h < a.length; ++h)d.push(encodeURIComponent(a[h]));
            b.push(encodeURIComponent(c) + "=" + d.join(","))
        });
        if (fa(a.j.getCategoryExclusions) && (a = a.j.getCategoryExclusions(), 0 < a.length && !("excl_cat"in c))) {
            for (var c = [], d = 0; d < a.length; ++d)c.push(encodeURIComponent(a[d]));
            b.push(encodeURIComponent("excl_cat") + "=" + c.join(","))
        }
        return b.join("&")
    };
    l = jd.prototype;
    l.getContentUrl = function () {
        return this.j.getContentUrl()
    };
    l.setClickUrl = function (a) {
        this.j.setClickUrl(a)
    };
    l.getClickUrl = function () {
        return this.j.getClickUrl()
    };
    l.getOutOfPage = function () {
        return this.j.getOutOfPage()
    };
    l.getAudExtId = function () {
        return this.j.getAudExtId()
    };
    l.getCollapseEmptyDiv = function () {
        return this.j.getCollapseEmptyDiv()
    };
    l.getDivStartsCollapsed = function () {
        return this.j.getDivStartsCollapsed()
    };
    l.getFirstLook = function () {
        return this.j.getFirstLook()
    };
    var qd = function (a, b) {
        var c = null, d = !0, e = null, f = null;
        w(b) && (d = b._empty_, d || (c = [b._width_, b._height_], 0 == b._is_afc_ && b._creative_ids_ && b._adgroup2_ids_ && (e = b._creative_ids_[0], f = b._adgroup2_ids_[0])));
        return new id(a.j, d, c, e, f)
    }, rd = function (a) {
        return new id(a.j, !0, null, null, null)
    }, sd = function (a) {
        a.m = ++kd;
        return a.m
    };
    var td = {
        google_ad_channel: "channel",
        google_ad_host: "host",
        google_ad_host_channel: "h_ch",
        google_ad_host_tier_id: "ht_id",
        google_ad_section: "region",
        google_ad_type: "ad_type",
        google_adtest: "adtest",
        google_original_width: "orig_w",
        google_available_width: "avail_w",
        google_allow_expandable_ads: "ea",
        google_alternate_ad_url: "alternate_ad_url",
        google_alternate_color: "alt_color",
        google_bid: "bid",
        google_city: "gcs",
        google_color_bg: "color_bg",
        google_color_border: "color_border",
        google_color_line: "color_line",
        google_color_link: "color_link",
        google_color_text: "color_text",
        google_color_url: "color_url",
        google_contents: "contents",
        google_country: "gl",
        google_cpm: "cpm",
        google_cust_age: "cust_age",
        google_cust_ch: "cust_ch",
        google_cust_gender: "cust_gender",
        google_cust_id: "cust_id",
        google_cust_interests: "cust_interests",
        google_cust_job: "cust_job",
        google_cust_l: "cust_l",
        google_cust_lh: "cust_lh",
        google_cust_u_url: "cust_u_url",
        google_disable_video_autoplay: "disable_video_autoplay",
        google_ed: "ed",
        google_encoding: "oe",
        google_flash_version: "flash",
        google_font_face: "f",
        google_font_size: "fs",
        google_hints: "hints",
        google_kw: "kw",
        google_kw_type: "kw_type",
        google_language: "hl",
        google_page_url: "url",
        google_pgb_reactive: "pra",
        google_region: "gr",
        google_reuse_colors: "reuse_colors",
        google_responsive_formats: "resp_fmts",
        google_safe: "adsafe",
        google_sc_id: "sc_id",
        google_tag_info: "gut",
        google_targeting: "targeting",
        google_ui_features: "ui",
        google_ui_version: "uiv",
        google_video_doc_id: "video_doc_id",
        google_video_product_type: "video_product_type"
    }, ud = {
        google_ad_block: "ad_block",
        google_ad_client: "client",
        google_ad_format: "format",
        google_ad_output: "output",
        google_ad_callback: "callback",
        google_ad_height: "h",
        google_ad_slot: "slotname",
        google_ad_unit_key: "adk",
        google_ad_unit_key_2: "adk2",
        google_ad_width: "w",
        google_analytics_url_parameters: "aup",
        google_captcha_token: "captok",
        google_content_recommendation_ui_type: "crui",
        google_ctr_threshold: "ctr_t",
        google_cust_criteria: "cust_params",
        google_image_size: "image_size",
        google_last_modified_time: "lmt",
        google_loeid: "loeid",
        google_max_num_ads: "num_ads",
        google_max_radlink_len: "max_radlink_len",
        google_mtl: "mtl",
        google_enable_content_recommendations: "ecr",
        google_num_radlinks: "num_radlinks",
        google_num_radlinks_per_unit: "num_radlinks_per_unit",
        google_only_ads_with_video: "only_ads_with_video",
        google_rl_dest_url: "rl_dest_url",
        google_rl_filtering: "rl_filtering",
        google_rl_mode: "rl_mode",
        google_rt: "rt",
        google_source_type: "src_type",
        google_sui: "sui",
        google_skip: "skip",
        google_tag_for_child_directed_treatment: "tfcd",
        google_tag_origin: "to",
        google_tdsma: "tdsma",
        google_tfs: "tfs",
        google_tl: "tl"
    }, vd = {
        google_lact: "lact",
        google_only_pyv_ads: "pyv",
        google_only_userchoice_ads: "uc",
        google_scs: "scs",
        google_with_pyv_ads: "withpyv",
        google_previous_watch: "p_w",
        google_previous_searches: "p_s",
        google_video_url_to_fetch: "durl",
        google_yt_pt: "yt_pt",
        google_yt_up: "yt_up"
    };
    var wd = !!window.google_async_iframe_id, xd = wd && window.parent || window, Va = function () {
        if (wd && !Ja(xd)) {
            for (var a = "." + ka.domain; 2 < a.split(".").length && !Ja(xd);)ka.domain = a = a.substr(a.indexOf(".") + 1), xd = window.parent;
            Ja(xd) || (xd = window)
        }
        return xd
    };
    var yd = !1, zd = function (a, b, c) {
        "" != b && (c ? a.j.hasOwnProperty(c) && (a.j[c] = b) : a.k.push(b))
    }, Bd = function () {
        var a = Ad, b = a.k.concat([]);
        A(a.j, function (a) {
            "" != a && b.push(a)
        });
        return b
    };
    yd = !1;
    var Cd = function (a, b) {
        for (var c = 0, d = a, e = 0; a && a != a.parent;)if (a = a.parent, e++, Ja(a))d = a, c = e; else if (b)break;
        return {Z: d, j: c}
    }, Dd = null;
    var Ed = function (a) {
        this.S = a;
        M(this, 3, null);
        M(this, 4, 0);
        M(this, 5, 0);
        M(this, 6, 0);
        M(this, 15, 0);
        a = Va();
        if ("C" == a.google_pstate_gc_expt)a = 1 + Math.floor(Math.random() * Math.pow(2, 43)); else {
            a = Cd(a, !1).Z;
            var b = a.google_global_correlator;
            b || (a.google_global_correlator = b = 1 + Math.floor(Math.random() * Math.pow(2, 43)));
            a = b
        }
        M(this, 7, a);
        M(this, 8, {});
        M(this, 9, {});
        M(this, 10, {});
        M(this, 11, []);
        M(this, 12, 0);
        M(this, 16, null);
        M(this, 14, {})
    }, Fd = {google_persistent_state: !0, google_persistent_state_async: !0}, Gd = {}, Hd = function (a) {
        var b =
            Va();
        a = a && Fd[a] ? a : wd ? "google_persistent_state_async" : "google_persistent_state";
        if (Gd[a])return Gd[a];
        var c = "google_persistent_state_async" == a ? {} : b, d = b[a];
        return "object" == typeof d && "object" == typeof d.S ? Gd[a] = d : b[a] = Gd[a] = new Ed(c)
    }, Id = function (a) {
        switch (a) {
            case 3:
                return "google_exp_persistent";
            case 4:
                return "google_num_sdo_slots";
            case 5:
                return "google_num_0ad_slots";
            case 6:
                return "google_num_ad_slots";
            case 7:
                return "google_correlator";
            case 8:
                return "google_prev_ad_formats_by_region";
            case 9:
                return "google_prev_ad_slotnames_by_region";
            case 10:
                return "google_num_slots_by_channel";
            case 11:
                return "google_viewed_host_channels";
            case 12:
                return "google_num_slot_to_show";
            case 14:
                return "gaGlobal";
            case 15:
                return "google_num_reactive_ad_slots";
            case 16:
                return "google_persistent_language"
        }
        throw Error("unexpected state");
    }, Jd = function (a) {
        var b = Id(14);
        return a.S[b]
    }, M = function (a, b, c) {
        a = a.S;
        b = Id(b);
        void 0 === a[b] && (a[b] = c)
    };
    var Kd = function (a, b, c, d, e, f) {
        var g = "";
        a && (g += a + ":");
        c && (g += "//", b && (g += b + "@"), g += c, d && (g += ":" + d));
        e && (g += e);
        f && (g += "?" + f);
        return g
    }, Ld = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/, Od = function (a) {
        if (Md) {
            Md = !1;
            var b = n.location;
            if (b) {
                var c = b.href;
                if (c && (c = Nd(c)) && c != b.hostname)throw Md = !0, Error();
            }
        }
        return a.match(Ld)
    }, Md = yb, Nd = function (a) {
        return (a = Od(a)[3] || null) ? decodeURI(a) : a
    };

    function Pd(a, b, c, d) {
        c = c || a.google_ad_width;
        d = d || a.google_ad_height;
        if (a.top == a)return !1;
        var e = b.documentElement;
        if (c && d) {
            var f = 1, g = 1;
            a.innerHeight ? (f = a.innerWidth, g = a.innerHeight) : e && e.clientHeight ? (f = e.clientWidth, g = e.clientHeight) : b.body && (f = b.body.clientWidth, g = b.body.clientHeight);
            if (g > 2 * d || f > 2 * c)return !1
        }
        return !0
    };
    var Qd = function (a) {
        this.j = {};
        this.k = a
    }, Rd = function (a, b, c, d) {
        b && (c || (c = ""), "google_gl" == b ? b = "google_country" : "google_region" == b && (b = "google_section"), b in a.k && ("undefined" == typeof d || d || !a.j[b]) && (a.j[b] = c))
    }, Sd = function (a, b) {
        A(b.j, function (a, b) {
            this.j[b] || (this.j[b] = a)
        }, a)
    }, Td = function (a) {
        var b = new Qd(a.k);
        a = a.j;
        var c = {}, d;
        for (d in a)c[d] = a[d];
        b.j = c;
        delete b.j.google_page_url;
        return b
    }, Ud = function (a) {
        return a.j.google_page_url
    };
    Qd.prototype.D = function () {
        var a = [];
        A(this.j, function (b, c) {
            var d = td[c] || ud[c] || vd[c] || null;
            d && b && a.push(d + "=" + B(b))
        });
        return a.join("&")
    };
    var Wd = function (a, b, c, d) {
        var e = Vd(a, Td(b), c, d);
        a = Vd(a, b, c, d);
        b = [];
        e[0] && 0 < e[0].length && b.push(e[0].join("&"));
        a[1] && 0 < a[1].length && b.push("sps=" + a[1].join("|"));
        return b.join("&")
    }, Vd = function (a, b, c, d) {
        var e = [], f = [], g = b.j;
        A(d, function (b, d) {
            if (b) {
                var m = "";
                null != g[d] && (m = B(g[d]));
                for (var p = [], r = -1, u = -1, da = 0; da < a.length; ++da) {
                    var ya = I(a[da]);
                    ++r;
                    null == c[ya] ? p.push("") : (ya = c[ya].j, null != ya[d] ? (p.push(B(B(ya[d]))), u = r) : p.push(""))
                }
                if (0 <= u) {
                    r = [];
                    r.push(B(m));
                    for (da = 0; da <= u; ++da)r.push(p[da]);
                    f.push(b + "," +
                    r.join(","))
                } else m && e.push(b + "=" + m)
            }
        });
        b = [];
        b.push(e);
        b.push(f);
        return b
    }, Xd = function () {
        var a = window, b;
        t:{
            b = a.navigator;
            var c = document, d = b.userAgent, e = b.platform;
            if (/Win|Mac|Linux|iPad|iPod|iPhone/.test(e) && !/^Opera/.test(d)) {
                var f = (/WebKit\/(\d+)/.exec(d) || [0, 0])[1], g = (/rv\:(\d+\.\d+)/.exec(d) || [0, 0])[1];
                if (/Win/.test(e) && /Trident/.test(d) && 9 < c.documentMode || !f && "Gecko" == b.product && 1.7 < g && !/rv\:1\.8([^.]|\.0)/.test(d) || 524 < f) {
                    b = !0;
                    break t
                }
            }
            b = !1
        }
        a = Pd(a, a.document, 500, 300);
        c = {};
        if (!b || a)c.ea = "0";
        return c
    }, Yd = function () {
        var a, b = window, c = document;
        var d = Cd(window, !1).Z;
        a = d.location.href;
        if (d == d.top)a = !0; else {
            var e = !1, f = d.document;
            f && f.referrer && (a = f.referrer, d.parent == d.top && (e = !0));
            (d = d.location.ancestorOrigins) && (d = d[d.length - 1]) && -1 == a.indexOf(d) && (e = !1);
            a = e
        }
        b = Pd(Va(), c, b.google_ad_width, b.google_ad_height);
        c = a;
        a = Va();
        a = a.top == a ? 0 : Ja(a.top) ? 1 : 2;
        e = 4;
        b || 1 != a ? b || 2 != a ? b && 1 == a ? e = 7 : b && 2 == a && (e = 8) : e = 6 : e = 5;
        c && (e |= 16);
        return "" + e || null
    };
    var Zd = function (a, b, c) {
        b = b || la;
        a && b.top != b && (b = b.top);
        try {
            return b.document && !b.document.body ? new D(-1, -1) : c ? new D(b.innerWidth, b.innerHeight) : Ob(b || window)
        } catch (d) {
            return new D(-12245933, -12245933)
        }
    }, $d = function (a, b) {
        Xa() && !window.opera ? Ta(a, "readystatechange", bc(function () {
            "complete" == a.readyState && b(null)
        })) : Ta(a, "load", ac("osd::util::load", b))
    }, ae = function () {
        var a = 0;
        !q(la.postMessage) && (a |= 1);
        return a
    };
    var N = function (a, b) {
        this.m = a;
        this.k = b && b.k ? b.k : [];
        this.q = b ? b.q : !1;
        this.l = b && b.l ? b.l : 0;
        this.o = b ? b.o : "";
        this.j = b && b.j ? b.j : [];
        this.n = null;
        this.r = !1;
        if (b) {
            var c;
            for (c = 0; c < this.k.length; ++c)this.k[c].push("true");
            for (c = 0; c < this.j.length; ++c)this.j[c].qa = !0
        }
    }, Sa = "", be = 0, ce = 0, de = function (a, b) {
        var c = a.k, d = a.m.google_ad_request_done;
        d && (d = d.orig_callback || d, a.m.google_ad_request_done = function (a) {
            if (a && 0 < a.length) {
                var f = 1 < a.length ? a[1].url : null, g = a[0].log_info || null, h = a[0].activeview_url || null, k = a[0].activeview_js_enabled ||
                    null, m = a[0].activeview_js_immediate_enabled || null, p = a[0].activeview_js_tos_enabled || null, r = a[0].activeview_cid || null, u = a[0].activeview_metadata || null;
                c.push([b, Ba(a[0].url), f, g, null, h, k, m, p, r, u])
            }
            d(a)
        }, a.m.google_ad_request_done.orig_callback = d)
    }, ee = function (a, b, c, d) {
        var e = a.k;
        if (0 < e.length)for (var f = b.document.getElementsByTagName("a"), g = 0; g < f.length; g++)for (var h = 0; h < e.length; h++)if (0 <= f[g].href.indexOf(e[h][1])) {
            var k = f[g].parentNode;
            if (e[h][2])for (var m = k, p = 0; 4 > p; p++) {
                if (0 <= m.innerHTML.indexOf(e[h][2])) {
                    k =
                        m;
                    break
                }
                m = m.parentNode
            }
            c(k, e[h][0], d || 0, !0, e[h][3], void 0, e[h][5], "true" == e[h][6], "true" == e[h][7], "true" == e[h][11], "true" == e[h][8], e[h][9], e[h][10]);
            e.splice(h, 1);
            break
        }
        if (g = 0 < e.length)Dd || (Dd = Cd(window, !0).Z), g = b != Dd;
        if (g)try {
            ee(a, b.parent, c, d)
        } catch (r) {
        }
        for (g = 0; g < e.length; ++g)a = e[g], "true" == a[6] && fe("osd2", a[3]), "true" == a[7] && fe("osdim", a[3])
    }, fe = function (a, b) {
        if (a && b) {
            var c = ["//"];
            c.push("pagead2.googlesyndication.com");
            c.push("/activeview");
            c.push("?id=" + a);
            c.push("&r=j");
            c.push("&avi=" + b);
            Pa(la,
                c.join(""), void 0)
        }
    };
    l = N.prototype;
    l.getNewBlocks = function (a, b) {
        b && ee(this, this.m, a, 1);
        for (var c = this.j.length, d = 0; d < c; d++) {
            var e = this.j[d];
            !e.m && e.j && (a(e.j, e.l, e.o, e.k, "", e.n, "", !1, !1, e.qa, !1, "", ""), e.m = !0)
        }
        b && (this.n = a)
    };
    l.getRegisteredAdblockUrls = function () {
        for (var a = [], b = this.j.length, c = 0; c < b; c++)a.push(this.j[c].l);
        return a
    };
    l.setupOse = function (a) {
        if (this.getOseId())return this.getOseId();
        var b = window.google_enable_ose, c;
        !0 === b ? c = 2 : !1 !== b && (c = Ka([0], ce), null == c && ((c = Ka([2], be)) || (c = 3)));
        if (!c)return 0;
        this.l = c;
        this.o = String(a || 0);
        return this.getOseId()
    };
    l.getOseId = function () {
        return window ? this.l : -1
    };
    l.getCorrelator = function () {
        return this.o
    };
    l.numBlocks = function () {
        return this.k.length + this.j.length
    };
    l.registerAdBlock = function (a, b, c, d, e, f) {
        var g = null;
        e && f && (g = {width: e, height: f});
        if (this.n && d)this.n(d, a, b, !0, "", g, "", !1, !1, !1, !1, "", ""); else {
            if ("js" == c)de(this, a); else {
                var h = new ge(a, b, d, g);
                this.j.push(h);
                d && $d(d, function () {
                    h.k = !0
                })
            }
            this.q || (Wa(), Ra(), this.q = !0)
        }
    };
    l.unloadAdBlock = function (a, b) {
        q(window.Goog_Osd_UnloadAdBlock) && window.Goog_Osd_UnloadAdBlock(a, b)
    };
    l.setUpForcePeriscope = function () {
        window.google_enable_ose_periscope && (this.r = !0)
    };
    l.shouldForcePeriscope = function () {
        return this.r
    };
    var he = function () {
        var a = Va(), b = a.__google_ad_urls;
        if (!b)return a.__google_ad_urls = new N(a);
        try {
            if (0 <= b.getOseId())return b
        } catch (c) {
        }
        return a.__google_ad_urls = new N(a, b)
    }, ge = function (a, b, c, d) {
        this.l = a;
        this.o = b;
        this.j = c;
        this.m = this.k = !1;
        this.n = d;
        this.qa = !1
    };
    y("Goog_AdSense_getAdAdapterInstance", he);
    y("Goog_AdSense_OsdAdapter", N);
    y("Goog_AdSense_OsdAdapter.prototype.numBlocks", N.prototype.numBlocks);
    y("Goog_AdSense_OsdAdapter.prototype.getNewBlocks", N.prototype.getNewBlocks);
    y("Goog_AdSense_OsdAdapter.prototype.getOseId", N.prototype.getOseId);
    y("Goog_AdSense_OsdAdapter.prototype.getCorrelator", N.prototype.getCorrelator);
    y("Goog_AdSense_OsdAdapter.prototype.getRegisteredAdblockUrls", N.prototype.getRegisteredAdblockUrls);
    y("Goog_AdSense_OsdAdapter.prototype.setupOse", N.prototype.setupOse);
    y("Goog_AdSense_OsdAdapter.prototype.registerAdBlock", N.prototype.registerAdBlock);
    y("Goog_AdSense_OsdAdapter.prototype.setUpForcePeriscope", N.prototype.setUpForcePeriscope);
    y("Goog_AdSense_OsdAdapter.prototype.shouldForcePeriscope", N.prototype.shouldForcePeriscope);
    y("Goog_AdSense_OsdAdapter.prototype.unloadAdBlock", N.prototype.unloadAdBlock);
    var O = n.googletag._vars_, ie = O["#7#"], je = O["#20#"], Sa = [O["#6#"] ? "https" : "http", "://", O["#1#"], "/pagead/osd.js"].join(""), be = ie, ce = je;
    var ke = function (a, b) {
        var c = b[I(a)];
        return null != c ? Ud(c) : null
    }, le = function (a, b, c) {
        if (null != Ud(b))return !0;
        b = !1;
        for (var d = 0; d < a.length && !b; d++)b = null != ke(a[d], c);
        return b
    }, me = function (a) {
        var b = a;
        "about:blank" != a && (b = b.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/'/g, "%27"), /^https?:\/\//.test(b) || (b = "unknown:" + b));
        return b
    }, ne = /\+/g, oe = function (a) {
        var b = O["#6#"];
        return a || b ? "https://" + O["#3#"] : "http://" + O["#2#"]
    }, pe = function () {
        var a = navigator.userAgent, b = a.indexOf("MSIE ");
        return -1 ==
        b ? 0 : parseFloat(a.substring(b + 5, a.indexOf(";", b)))
    }, qe = function () {
        var a = E;
        return null != a && -1 != a.indexOf("MSIE ") && -1 == a.indexOf("IEMobile")
    }, re = function (a, b) {
        var c = 0, d = [];
        a && (d.push(a.getName()), d.push(od(a)), d.push(J(a)));
        if (b) {
            var e;
            e = [];
            for (var f = 0, g = b; g && 25 > f; g = g.parentNode, ++f)e.push(9 != g.nodeType && g.id || "");
            (e = e.join()) && d.push(e)
        }
        0 < d.length && (c = $a(d.join(":")));
        return c.toString()
    }, se = {Ua: "visible", Ra: "hidden", Ta: "prerender", Sa: "other"}, te = function (a) {
        a = a || document;
        a = a.webkitVisibilityState ||
        a.mozVisibilityState || a.visibilityState || "visible";
        var b;
        t:{
            for (b in se)if (se[b] == a) {
                b = !0;
                break t
            }
            b = !1
        }
        return b ? a : "other"
    }, ue = function () {
        return Boolean(n.JSON && n.JSON.parse) && (!F || Cb(9)) && (!wb || Cb(12))
    };
    var ve = function () {
        this.j = {};
        var a = ka.URL;
        null == P(this, "target_platform") && (this.j.target_platform = "DESKTOP");
        for (var b = this.j, a = a.split("?"), a = a[a.length - 1].split("&"), c = 0; c < a.length; c++) {
            var d = a[c].split("=");
            if (d[0]) {
                var e = d[0].toLowerCase();
                if ("google_domain_reset_url" != e)try {
                    var f;
                    if (1 < d.length) {
                        var g = d[1];
                        f = window.decodeURIComponent ? decodeURIComponent(g.replace(ne, " ")) : unescape(g)
                    } else f = "";
                    b[e] = f
                } catch (h) {
                }
            }
        }
    }, P = function (a, b) {
        return null == b ? null : a.j[b]
    };
    var we = function (a) {
        this.j = {};
        this.u = {};
        this.l = [];
        this.o = {};
        this.t = [];
        this.C = a;
        this.k = new Qd(a);
        this.n = {};
        this.v = {};
        this.q = {};
        this.m = {};
        this.B = this.r = "";
        this.w = null;
        this.A = -1
    }, xe = function (a, b, c) {
        b = new jd(b, c || !1);
        if (!b.getName())return null;
        c = I(b);
        var d = a.j[c];
        if (d)return d;
        a.j[c] = b;
        a.u[b.getName()] || (a.u[b.getName()] = []);
        return a.u[b.getName()][b.getInstance()] = b
    }, ze = function (a) {
        return db(ye(a), function (a) {
            return !a.n
        })
    }, Ae = function (a, b) {
        -1 == hb(a.l, function (a) {
            return I(b) == I(a)
        }) && a.l.push(b)
    }, Be =
        function (a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c], e = I(d);
                e in a.j && (ld(d), jb(a.l, function (a) {
                    return I(a) == e
                }))
            }
        }, Ce = function (a) {
        a = db(ye(a), function (a) {
            return !!a.n && !(a.n && a.t)
        });
        return eb(a, function (a) {
            return [a.getName(), a.getInstance()]
        })
    }, De = function (a) {
        var b = 0;
        A(a.j, function () {
            b++
        });
        return b
    };
    we.prototype.toString = function () {
        var a = "[AdData:", b = [];
        A(this.j, function (a) {
            b.push(a.toString())
        });
        A(this.o, function (a, d) {
            b.push("[" + d + "," + a + "]")
        });
        a += b.join();
        return a + "]"
    };
    var Ee = function (a, b) {
        if (b) {
            var c = b.getName(), d = b.getSlotId().getInstance();
            return a.j[c + "_" + d] || null
        }
        return null
    }, ye = function (a) {
        var b = [];
        A(a.j, function (a) {
            b.push(a)
        });
        return b
    }, Fe = function (a, b) {
        var c = b || ye(a), c = eb(c, function (a) {
            return a.v
        });
        ob(c);
        return c
    }, Ge = function (a) {
        var b = [];
        A(a.o, function (a, d) {
            b.push(B(d) + "=" + B(a))
        });
        0 < a.t.length && !("excl_cat"in a.o) && b.push(B("excl_cat") + "=" + B(a.t.join(",")));
        return b.join("&")
    }, He = function (a, b) {
        var c = a.q[I(b)], d;
        if (c)if (c)try {
            var e = window.top, f = new C(0, 0),
                g, h = Jb(c);
            g = h ? Qb(h) : window;
            do {
                var k;
                if (g == e)k = hc(c); else {
                    var m = fc(c);
                    k = new C(m.left, m.top)
                }
                h = k;
                f.x += h.x;
                f.y += h.y
            } while (g && g != e && g != g.parent && (c = g.frameElement) && (g = g.parent));
            d = f
        } catch (p) {
            d = new C(-12245933, -12245933)
        } else d = null; else d = null;
        return d
    };
    var Ie = function () {
        this.o = "";
        this.v = "json_html";
        this.k = "fif";
        this.m = 1;
        this.u = !1;
        this.n = "";
        this.j = [];
        this.w = this.persistentRoadblocksOnly = !1;
        this.videoPodNumber = this.videoPodPosition = NaN;
        this.r = this.t = "";
        this.q = !1;
        this.videoStreamCorrelator = NaN;
        this.l = 0
    };
    var Le = function (a) {
        this.n = document;
        this.j = a || 0;
        this.k = Je(this, "__gads=");
        this.o = this.m = !1;
        Ke(this)
    }, Me = function (a, b) {
        if (b._cookies_ && b._cookies_.length && (a.l = b._cookies_[0], null != a.l && (a.k = a.l._value_, null != a.l && a.k))) {
            var c = new Date;
            c.setTime(1E3 * a.l._expires_);
            a.n.cookie = "__gads=" + a.k + "; expires=" + c.toGMTString() + "; path=" + a.l._path_ + "; domain=." + a.l._domain_
        }
    }, Ke = function (a) {
        if (!a.k && !a.o && 1 != a.j) {
            a.n.cookie = "GoogleAdServingTest=Good";
            var b = "Good" == Je(a, "GoogleAdServingTest=");
            if (b) {
                var c = new Date;
                c.setTime((new Date).valueOf() + -1);
                a.n.cookie = "GoogleAdServingTest=; expires=" + c.toGMTString()
            }
            a.m = b;
            a.o = !0
        }
    }, Je = function (a, b) {
        var c = a.n.cookie, d = c.indexOf(b), e = "";
        -1 != d && (d += b.length, e = c.indexOf(";", d), -1 == e && (e = c.length), e = c.substring(d, e));
        return e
    }, Ne = null, Oe = function (a) {
        null == Ne && (Ne = new Le(a));
        return Ne
    };
    var Ad = new function (a) {
        this.k = [];
        this.j = {};
        for (var b = 0, c = arguments.length; b < c; ++b)this.j[arguments[b]] = ""
    }, Pe = [], Re = function (a, b, c) {
        c = c || [];
        a = new Qe(a);
        if (oc.apply(a, c)()) {
            var d = a.j;
            c = [];
            var e = 0, f;
            for (f in d)c[e++] = d[f];
            f = a.k;
            d = a.l;
            (yd ? 0 : d ? f.j.hasOwnProperty(d) && "" == f.j[d] : 1) && (b = Ka(c, b * c.length)) && zd(f, b, d)
        }
        Pe.push(a);
        return a
    }, Qe = function (a) {
        var b = Ad;
        this.j = a;
        this.k = b;
        this.l = "exp" + (this[ga] || (this[ga] = ++ha));
        this.k.j[this.l] = ""
    }, Se = function (a) {
        if ("experiment"in a.j) {
            var b = a.k, c = a.l;
            a = a.j.experiment ==
            (b.j.hasOwnProperty(c) ? b.j[c] : "")
        } else a = !1;
        return a
    }, Te = function (a, b) {
        b in a.j && zd(a.k, a.j[b], a.l)
    }, Ue = function (a) {
        for (var b = 0; b < Pe.length; ++b) {
            var c = Pe[b], d = c.j, e = {}, f = void 0;
            for (f in d)e[d[f]] = f;
            d = e[a];
            if (null != d) {
                Te(c, d);
                return
            }
        }
        0 <= bb(Ad.k, a) || zd(Ad, a)
    }, Ve = O["#18#"], We;
    We = 0 <= bb(["prerender"], te(void 0));
    Re({control: "108809009", experiment: "108809010"}, Ve, [nc(We)]);
    var Xe = Re({control: "108809021", experiment: "108809022"}, O["#25#"], [nc(ue())]);
    Re({branch_1: "108809028", branch_2: "108809029"}, O["#27#"]);
    var Ye = Re({control: "108809030", experiment: "108809031"}, O["#28#"]), Ze = Re({
        control: "108809034",
        experiment: "108809035"
    }, O["#31#"]);
    O["#39#"] && Ue(O["#39#"]);
    var $e = function () {
        var a = n.googletag;
        return null != a && fa(a.getVersion) ? a.getVersion() : null
    };
    var Q = function (a, b, c, d, e) {
        this.j = b;
        this.q = c;
        this.l = d;
        this.n = a;
        this.k = e;
        this.m = "";
        this.w = td;
        this.o = [];
        this.v = []
    };
    Q.prototype.D = function (a, b) {
        if (!ca(a))return "";
        if ("sra" == this.n)0 == a.length && (a = ye(this.j)); else {
            if (0 == a.length)return "";
            1 < a.length && (a = [a[0]])
        }
        this.t();
        this.u(a);
        return b ? af(this.m, 2048) : this.m
    };
    Q.prototype.u = function (a) {
        try {
            var b, c = "", d = 0;
            "prerender" == te(document) ? (c = "108809008", d = O["#17#"]) : (c = "108809007", d = O["#16#"]);
            b = Ka([c], d);
            R(this, "eid", (b ? kb(this.k.j, b) : this.k.j).join())
        } catch (e) {
        }
        this.l && 0 !== this.l.j && R(this, "co", this.l.j);
        b = this.j.A;
        -1 !== b && R(this, "tfcd", b);
        Boolean(window.postMessage) && R(this, "sfv", "1-0-2");
        if ("sra" == this.n) {
            b = a.length;
            for (c = 0; c < b; c++) {
                var d = a[c].getName(), f = "";
                if ("" != d) {
                    d = d.split("/");
                    for (f = 0; f < d.length; f++)if ("" != d[f]) {
                        for (var g = !1, h = 0; h < this.o.length; h++)if (d[f] ==
                            this.o[h]) {
                            g = !0;
                            break
                        }
                        g || this.o.push(d[f])
                    }
                    f = "";
                    for (g = 0; g < d.length; g++) {
                        if (0 < g)f += "/"; else if ("" == d[0])continue;
                        for (h = 0; h < this.o.length; h++)if (d[g] == this.o[h]) {
                            f += h;
                            break
                        }
                    }
                }
                this.v.push(f)
            }
            R(this, "iu_parts", this.o.join());
            R(this, "enc_prev_ius", this.v.join());
            b = [];
            for (c = 0; c < a.length; ++c)b.push(od(a[c]));
            R(this, "prev_iu_szs", b.join());
            b = [];
            c = !1;
            for (d = 0; d < a.length; ++d)f = a[d].getFirstLook(), 0 != f && (c = !0), b.push(f);
            (b = c ? b.join() : void 0) && R(this, "fla", b);
            if (a.length) {
                b = "";
                for (c = 0; c < a.length; ++c)b += a[c].getOutOfPage() ?
                    "1" : "0";
                b = parseInt(b, 2)
            } else b = 0;
            b && R(this, "ists", b);
            bf(this);
            c = null;
            b = [];
            for (c = 0; c < a.length; ++c)b.push(pd(a[c]));
            c = b.join("|");
            c.length == b.length - 1 && (c = null);
            R(this, "prev_scp", c)
        } else b = a[0].j.gtfcd(), -1 !== b && R(this, "tfcd", b), b = a[0], R(this, "iu", b.getName()), R(this, "sz", od(b)), (c = b.getFirstLook()) && R(this, "fl", c), b.getClickUrl() && R(this, "click", b.getClickUrl()), b.getOutOfPage() && R(this, "ists", "1"), b in this.j.m && R(this, "logonly", "1"), bf(this), b = a[0], c = pd(b), R(this, "scp", c), b = b.getAudExtId(), 0 < b &&
        R(this, "audextid", b);
        b = a[0].k;
        c = le(a, this.j.k, this.j.n);
        d = this.k.u;
        f = 3 == this.k.m;
        g = 0;
        1 != this.k.m && (g |= 1);
        b && (g |= 2);
        c && (g |= 4);
        d && (g |= 8);
        f && (g |= 16);
        b = g;
        0 < b && R(this, "eri", b);
        "prerender" == te() && R(this, "d_imp", 1);
        b = window;
        c = document;
        R(this, "cust_params", Ge(this.j));
        this.l && 1 != this.l.j && (R(this, "cookie", this.l.k), this.l.m && R(this, "cookie_enabled", "1"));
        (d = this.j.r) && R(this, "uule", d);
        this.l && 1 != this.l.j && (b = (Ud(this.j.k) || (b.top == b ? c.URL : c.referrer)) != c.URL ? c.domain : "") && R(this, "cdm", b);
        null != P(this.q, "google_preview") &&
        R(this, "gct", P(this.q, "google_preview"));
        this.r(new Date, a);
        b = {};
        b.u_tz = -(new Date).getTimezoneOffset();
        var k;
        c = window;
        try {
            k = c.history.length
        } catch (m) {
            k = 0
        }
        b.u_his = k;
        b.u_java = navigator.javaEnabled();
        window.screen && (b.u_h = window.screen.height, b.u_w = window.screen.width, b.u_ah = window.screen.availHeight, b.u_aw = window.screen.availWidth, b.u_cd = window.screen.colorDepth);
        navigator.plugins && (b.u_nplug = navigator.plugins.length);
        navigator.mimeTypes && (b.u_nmime = navigator.mimeTypes.length);
        cf(this, b);
        n.devicePixelRatio &&
        S(this, "u_sd", Number(n.devicePixelRatio.toFixed(3)));
        var p;
        try {
            p = Za()
        } catch (r) {
            p = "0"
        }
        S(this, "flash", p);
        k = window;
        p = k.document;
        b = "sra" == this.n ? Ud(this.j.k) : ke(a[0], this.j.n) || Ud(this.j.k);
        null == b && (b = Ud(this.j.k) || (k.top == k ? p.URL : p.referrer), null != P(this.q, "google_preview") && (c = b.indexOf("google_preview=", b.lastIndexOf("?")), d = b.indexOf("&", c), -1 == d && (d = b.length - 1, --c), b = b.substring(0, c) + b.substring(d + 1, b.length)));
        R(this, "url", b);
        le(a, this.j.k, this.j.n) && k.top != k || R(this, "ref", p.referrer);
        R(this, "vrg",
            $e());
        R(this, "vrp", "57")
    };
    var df = function (a, b) {
        for (var c = b.length, d = [], e = 0; e < c; e++) {
            var f = re(b[e]);
            b[e].w = f;
            d.push(f)
        }
        R(a, "adks", d.join(","))
    }, cf = function (a, b) {
        A(b, function (a, b) {
            S(this, b, a)
        }, a)
    }, bf = function (a) {
        a.l && 1 == a.l.j || R(a, "ppid", a.j.B)
    };
    Q.prototype.r = function (a, b) {
        R(this, "lmt", (Date.parse(document.lastModified) / 1E3).toString());
        S(this, "dt", a.getTime());
        if (document.body) {
            var c = document.body.scrollHeight, d = document.body.clientHeight;
            d && c && R(this, "cc", Math.round(100 * d / c).toString())
        }
        c = P(this.q, "deb");
        null != c && R(this, "deb", c);
        c = P(this.q, "haonly");
        null != c && R(this, "haonly", c);
        c = Xd();
        Qa(c, x(function (a, b) {
            R(this, b, a)
        }, this));
        c = Yd();
        null != c && R(this, "frm", c);
        if (c = Zd(!0))R(this, "biw", c.width), R(this, "bih", c.height);
        this.k.l && R(this, "oid", this.k.l);
        if ("sra" == this.n)df(this, b); else {
            if (c = He(this.j, b[0]))R(this, "adx", Math.round(c.x)), R(this, "ady", Math.round(c.y));
            c = b[0].w || re(b[0], this.j.v[I(b[0])]);
            R(this, "adk", c)
        }
        c = ae();
        0 < c && R(this, "osd", c);
        c = this.j.k;
        d = "";
        "sra" == this.n ? d = Wd(b, c, this.j.n, this.w) : (d = this.j.n[I(b[0])], null == d ? d = c : Sd(d, c), d = Td(d), d = d.D());
        d && (this.m += "&" + d)
    };
    Q.prototype.t = function () {
        this.m = oe(Boolean(this.j.r) || Se(Ye)) + "/gampad/ads?";
        S(this, "gdfp_req", 1);
        R(this, "correlator", this.k.o);
        S(this, "output", this.k.v);
        S(this, "callback", this.k.n);
        S(this, "impl", this.k.k);
        this.k.persistentRoadblocksOnly && R(this, "per_only", 1);
        "sra" == this.n ? R(this, "json_a", 1) : this.k.w && R(this, "fif_to", 1)
    };
    var R = function (a, b, c) {
        null != c && S(a, b, B("" + c))
    }, S = function (a, b, c) {
        null != c && "" != c && (a.m = "?" != a.m.charAt(a.m.length - 1) ? a.m + ("&" + b + "=" + c) : a.m + (b + "=" + c))
    }, af = function (a, b) {
        var c = b - 8;
        if (a.length > b) {
            var d = a.lastIndexOf("&", c);
            -1 != d ? a = a.substring(0, d) : (a = a.substring(0, c), a = a.replace(/%\w?$/, ""));
            a += "&trunc=1"
        }
        return a
    };
    var ef = navigator;

    function ff(a) {
        var b = 1, c = 0, d;
        if (void 0 != a && "" != a)for (b = 0, d = a.length - 1; 0 <= d; d--)c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = 0 != c ? b ^ c >> 21 : b;
        return b
    }

    function gf(a, b) {
        if (!a || "none" == a)return 1;
        a = String(a);
        "auto" == a && (a = b, "www." == a.substring(0, 4) && (a = a.substring(4, a.length)));
        return ff(a.toLowerCase())
    }

    var hf = /^\s*_ga=\s*1\.(\d+)[^.]*\.(.*?)\s*$/, jf = /^[^=]+=\s*GA1\.(\d+)[^.]*\.(.*?)\s*$/;
    var kf = function (a, b, c, d, e) {
        Q.call(this, a, b, c, d, e)
    };
    z(kf, Q);
    kf.prototype.r = function (a, b) {
        0 < navigator.userAgent.indexOf("MSIE ") && Rd(this.j.k, "google_encoding", document.charset, !1);
        Q.prototype.r.call(this, a, b);
        R(this, "ifi", b[0].A);
        var c;
        var d = window;
        d == d.top ? c = 0 : (c = [], c.push(d.document.URL), d.name && c.push(d.name), d = Zd(!1, d, !1), c.push(d.width.toString()), c.push(d.height.toString()), c = $a(c.join("")));
        0 != c && R(this, "ifk", c.toString())
    };
    kf.prototype.u = function (a) {
        var b = a[0], c = window;
        c.google_unique_id ? ++c.google_unique_id : c.google_unique_id = 1;
        b.A = c.google_unique_id;
        this.k.q && (S(this, "hxva", 1), R(this, "cmsid", this.k.r), R(this, "vid", this.k.t));
        isNaN(this.k.videoPodNumber) || S(this, "pod", this.k.videoPodNumber);
        isNaN(this.k.videoPodPosition) || S(this, "ppos", this.k.videoPodPosition);
        isNaN(this.k.videoStreamCorrelator) || S(this, "scor", this.k.videoStreamCorrelator);
        Q.prototype.u.call(this, a);
        a = window;
        var b = a.document.domain, c = a.document.cookie,
            d = a.history.length, e = a.screen, f = a.document.referrer, g = Math.round((new Date).getTime() / 1E3), h = window.google_analytics_domain_name, b = "undefined" == typeof h ? gf("auto", b) : gf(h, b), k = -1 < c.indexOf("__utma=" + b + "."), m = -1 < c.indexOf("__utmb=" + b), h = Hd("google_persistent_state"), p;
        (p = Jd(h)) || (p = h.S[Id(14)] = {});
        h = p;
        p = !1;
        if (k)f = c.split("__utma=" + b + ".")[1].split(";")[0].split("."), m ? h.sid = f[3] + "" : h.sid || (h.sid = g + ""), h.vid = f[0] + "." + f[1], h.from_cookie = !0; else {
            h.sid || (h.sid = g + "");
            if (!h.vid) {
                p = !0;
                m = Math.round(2147483647 *
                Math.random());
                k = [ef.appName, ef.version, ef.language ? ef.language : ef.browserLanguage, ef.platform, ef.userAgent, ef.javaEnabled() ? 1 : 0].join("");
                e ? k += e.width + "x" + e.height + e.colorDepth : window.java && (e = java.awt.Toolkit.getDefaultToolkit().getScreenSize(), k += e.screen.width + "x" + e.screen.height);
                k = k + c + (f || "");
                for (f = k.length; 0 < d;)k += d-- ^ f++;
                h.vid = (m ^ ff(k) & 2147483647) + "." + g
            }
            h.from_cookie = !1
        }
        if (!h.cid) {
            var r;
            t:{
                g = 999;
                if (f = window.google_analytics_domain_name)f = 0 == f.indexOf(".") ? f.substr(1) : f, g = ("" + f).split(".").length;
                f = 999;
                c = c.split(";");
                for (e = 0; e < c.length; e++)if (d = hf.exec(c[e]) || jf.exec(c[e])) {
                    if (d[1] == g) {
                        r = d[2];
                        break t
                    }
                    d[1] < f && (f = d[1], r = d[2])
                }
            }
            p && r && -1 != r.search(/^\d+\.\d+$/) ? h.vid = r : r != h.vid && (h.cid = r)
        }
        h.dh = b;
        h.hid || (h.hid = Math.round(2147483647 * Math.random()));
        r = Hd();
        r = Jd(r);
        S(this, "ga_vid", r.vid);
        S(this, "ga_sid", r.sid);
        S(this, "ga_hid", r.hid);
        S(this, "ga_fc", r.from_cookie);
        R(this, "ga_wpids", a.google_analytics_uacct)
    };
    var lf = function () {
    };
    var mf, nf = function () {
    };
    z(nf, lf);
    nf.prototype.j = function () {
        var a;
        t:{
            if (!this.k && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
                for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                    var d = b[c];
                    try {
                        new ActiveXObject(d);
                        a = this.k = d;
                        break t
                    } catch (e) {
                    }
                }
                throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
            }
            a = this.k
        }
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    };
    mf = new nf;
    var of = function (a) {
        n.setTimeout(function () {
            throw a;
        }, 0)
    }, pf, qf = function () {
        var a = n.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == E.indexOf("Presto") && (a = function () {
            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow, a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(), d = "file:" == b.location.protocol ? "*" : b.location.protocol +
            "//" + b.location.host, a = x(function (a) {
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
        if ("undefined" !== typeof a && -1 == E.indexOf("Trident") && -1 == E.indexOf("MSIE")) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function () {
                if (q(c.next)) {
                    c = c.next;
                    var a = c.ja;
                    c.ja = null;
                    a()
                }
            };
            return function (a) {
                d.next = {ja: a};
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange"in
        document.createElement("script") ? function (a) {
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
            n.setTimeout(a, 0)
        }
    };
    var wf = function (a, b) {
        rf || sf();
        tf || (rf(), tf = !0);
        uf.push(new vf(a, b))
    }, rf, sf = function () {
        if (n.Promise && n.Promise.resolve) {
            var a = n.Promise.resolve();
            rf = function () {
                a.then(xf)
            }
        } else rf = function () {
            var a = xf;
            !fa(n.setImmediate) || n.Window && n.Window.prototype.setImmediate == n.setImmediate ? (pf || (pf = qf()), pf(a)) : n.setImmediate(a)
        }
    }, tf = !1, uf = [], xf = function () {
        for (; uf.length;) {
            var a = uf;
            uf = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                try {
                    c.j.call(c.k)
                } catch (d) {
                    of(d)
                }
            }
        }
        tf = !1
    }, vf = function (a, b) {
        this.j = a;
        this.k = b
    };
    var zf = function (a, b) {
        this.k = 0;
        this.o = void 0;
        this.j = this.n = null;
        this.l = this.m = !1;
        try {
            var c = this;
            a.call(b, function (a) {
                yf(c, 2, a)
            }, function (a) {
                yf(c, 3, a)
            })
        } catch (d) {
            yf(this, 3, d)
        }
    };
    zf.prototype.then = function (a, b, c) {
        return Af(this, fa(a) ? a : null, fa(b) ? b : null, c)
    };
    zf.prototype.then = zf.prototype.then;
    zf.prototype.$goog_Thenable = !0;
    var Cf = function (a, b) {
        a.j && a.j.length || 2 != a.k && 3 != a.k || Bf(a);
        a.j || (a.j = []);
        a.j.push(b)
    }, Af = function (a, b, c, d) {
        var e = {M: null, sa: null, ta: null};
        e.M = new zf(function (a, g) {
            e.sa = b ? function (c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (m) {
                    g(m)
                }
            } : a;
            e.ta = c ? function (b) {
                try {
                    var e = c.call(d, b);
                    a(e)
                } catch (m) {
                    g(m)
                }
            } : g
        });
        e.M.n = a;
        Cf(a, e);
        return e.M
    };
    zf.prototype.q = function (a) {
        this.k = 0;
        yf(this, 2, a)
    };
    zf.prototype.r = function (a) {
        this.k = 0;
        yf(this, 3, a)
    };
    var yf = function (a, b, c) {
        if (0 == a.k) {
            if (a == c)b = 3, c = new TypeError("Promise cannot resolve to itself"); else {
                var d;
                if (c)try {
                    d = !!c.$goog_Thenable
                } catch (e) {
                    d = !1
                } else d = !1;
                if (d) {
                    a.k = 1;
                    c.then(a.q, a.r, a);
                    return
                }
                if (w(c))try {
                    var f = c.then;
                    if (fa(f)) {
                        Df(a, c, f);
                        return
                    }
                } catch (g) {
                    b = 3, c = g
                }
            }
            a.o = c;
            a.k = b;
            Bf(a);
            3 != b || Ef(a, c)
        }
    }, Df = function (a, b, c) {
        a.k = 1;
        var d = !1, e = function (b) {
            d || (d = !0, a.q(b))
        }, f = function (b) {
            d || (d = !0, a.r(b))
        };
        try {
            c.call(b, e, f)
        } catch (g) {
            f(g)
        }
    }, Bf = function (a) {
        a.m || (a.m = !0, wf(a.t, a))
    };
    zf.prototype.t = function () {
        for (; this.j && this.j.length;) {
            var a = this.j;
            this.j = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b], d = this.o;
                if (2 == this.k)c.sa(d); else {
                    if (c.M)for (var e = void 0, e = this; e && e.l; e = e.n)e.l = !1;
                    c.ta(d)
                }
            }
        }
        this.m = !1
    };
    var Ef = function (a, b) {
        a.l = !0;
        wf(function () {
            a.l && Ff.call(null, b)
        })
    }, Ff = of;
    var Jf = function (a, b) {
        var c = {timeoutMs: 0, withCredentials: !0};
        return new zf(function (d, e) {
            var f = c || {}, g, h = f.Pa ? f.Pa.j() : mf.j();
            try {
                h.open("POST", a, !0)
            } catch (k) {
                e(new Gf("Error opening XHR: " + k.message, a))
            }
            h.onreadystatechange = function () {
                if (4 == h.readyState) {
                    n.clearTimeout(g);
                    var b;
                    t:switch (h.status) {
                        case 200:
                        case 201:
                        case 202:
                        case 204:
                        case 206:
                        case 304:
                        case 1223:
                            b = !0;
                            break t;
                        default:
                            b = !1
                    }
                    !b && (b = 0 === h.status) && (b = Od(a)[1] || null, !b && self.location && (b = self.location.protocol, b = b.substr(0, b.length - 1)), b =
                        b ? b.toLowerCase() : "", b = !("http" == b || "https" == b || "" == b));
                    b ? d(h) : e(new Hf(h.status, a))
                }
            };
            h.onerror = function () {
                e(new Gf("Network error", a))
            };
            var m;
            if (f.headers) {
                for (var p in f.headers)m = f.headers[p], null != m && h.setRequestHeader(p, m);
                m = f.headers["Content-Type"]
            }
            p = n.FormData && b instanceof n.FormData;
            void 0 !== m || p || h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            f.withCredentials && (h.withCredentials = f.withCredentials);
            f.responseType && (h.responseType = f.responseType);
            f.Ja &&
            h.overrideMimeType(f.Ja);
            0 < f.Oa && (g = n.setTimeout(function () {
                h.onreadystatechange = aa;
                h.abort();
                e(new If(a))
            }, f.Oa));
            try {
                h.send(b)
            } catch (r) {
                h.onreadystatechange = aa, n.clearTimeout(g), e(new Gf("Error sending XHR: " + r.message, a))
            }
        })
    }, Gf = function (a, b) {
        ma.call(this, a + ", url=" + b);
        this.url = b
    };
    z(Gf, ma);
    Gf.prototype.name = "XhrError";
    var Hf = function (a, b) {
        Gf.call(this, "Request Failed, status=" + a, b)
    };
    z(Hf, Gf);
    Hf.prototype.name = "XhrHttpError";
    var If = function (a) {
        Gf.call(this, "Request timed out", a)
    };
    z(If, Gf);
    If.prototype.name = "XhrTimeoutError";
    var Kf = function () {
    };
    z(Kf, lf);
    Kf.prototype.j = function () {
        var a = new XMLHttpRequest;
        if ("withCredentials"in a)return a;
        if ("undefined" != typeof XDomainRequest)return new Lf;
        throw Error("Unsupported browser");
    };
    var Lf = function () {
        this.j = new XDomainRequest;
        this.readyState = 0;
        this.responseText = this.onreadystatechange = null;
        this.status = -1;
        this.j.onload = x(this.za, this);
        this.j.onerror = x(this.oa, this);
        this.j.onprogress = x(this.Aa, this);
        this.j.ontimeout = x(this.Ba, this)
    };
    l = Lf.prototype;
    l.open = function (a, b, c) {
        if (null != c && !c)throw Error("Only async requests are supported.");
        this.j.open(a, b)
    };
    l.send = function (a) {
        if (a)if ("string" == typeof a)this.j.send(a); else throw Error("Only string data is supported"); else this.j.send()
    };
    l.abort = function () {
        this.j.abort()
    };
    l.setRequestHeader = function () {
    };
    l.za = function () {
        this.status = 200;
        this.responseText = this.j.responseText;
        Mf(this, 4)
    };
    l.oa = function () {
        this.status = 500;
        this.responseText = null;
        Mf(this, 4)
    };
    l.Ba = function () {
        this.oa()
    };
    l.Aa = function () {
        this.status = 200;
        Mf(this, 1)
    };
    var Mf = function (a, b) {
        a.readyState = b;
        if (a.onreadystatechange)a.onreadystatechange()
    };
    var Nf = null, Of = function (a) {
        if (a = Lb(a))a.innerHTML = ""
    }, Pf = function (a, b) {
        var c = Lb(a);
        c && (c.style.display = b ? "" : "none")
    }, Qf = function (a) {
        document.write('<script type="text/javascript" src="' + a + '">\x3c/script>')
    }, Rf = function (a, b, c, d, e) {
        e = (e || document).createElement("iframe");
        e.id = b;
        e.name = b;
        null != d[0] && null != d[1] && (e.width = String(d[0]), e.height = String(d[1]));
        e.vspace = "0";
        e.hspace = "0";
        e.allowTransparency = "true";
        e.scrolling = "no";
        e.marginWidth = "0";
        e.marginHeight = "0";
        e.frameBorder = "0";
        e.style.border = "0";
        e.style.verticalAlign =
            "bottom";
        c && (e.style.visibility = "hidden", e.style.display = "none");
        e.src = "javascript:\"<html><body style='background:transparent'></body></html>\"";
        a.appendChild(e);
        return e
    }, Tf = function (a, b) {
        if (0 == pe())Nf || (Nf = null), Nf.j("iFrame not removed as non-IE browser, id: " + b); else {
            var c = a.getElementById(b);
            c ? "hidden" != c.style.visibility || "none" != c.style.display ? Sf("iFrame found to remove but it isn't hidden, id: " + b) : (c.parentNode.removeChild(c), Nf || (Nf = null), Nf.j("Hidden iFrame removed, id: " + b)) : Sf("iFrame not found to remove, id: " +
            b)
        }
    }, Vf = function (a, b, c, d, e) {
        return new dd({
            X: a, Ca: b, content: Uf(c), size: new D(d[0], d[1]), Ha: {
                info: function () {
                }, j: function () {
                }, error: function () {
                }
            }, xa: !0, ua: e
        })
    }, Yf = function (a, b, c) {
        c && (b = Uf(b));
        if (0 != pe()) {
            var d;
            try {
                d = !!a.contentWindow.document
            } catch (e) {
                d = !1
            }
            if (d) {
                var f = b, g = Wf();
                try {
                    var h = window.frames[a.name];
                    if (6 < parseInt(pe(), 10) || 0 > f.indexOf("http://" + O["#1#"] + "/pagead/inject_object_div.js")) {
                        var k;
                        i:{
                            a = f;
                            b = document;
                            var m = pe(), p;
                            if (!(p = 0 == m || isNaN(m) || 7 > m || 9 < m || b.documentMode && 10 <= b.documentMode)) {
                                var r =
                                    navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);
                                p = 6 <= (r ? parseFloat(r[1]) : 0)
                            }
                            if (!p)for (m = 0; m < a.length; ++m)if (127 < a.charCodeAt(m)) {
                                k = !0;
                                break i
                            }
                            k = !1
                        }
                        if (k) {
                            var u = unescape(encodeURIComponent(f)), da = Math.floor(u.length / 2);
                            a = [];
                            for (k = 0; k < da; ++k)a[k] = String.fromCharCode(256 * u.charCodeAt(2 * k + 1) + u.charCodeAt(2 * k));
                            1 == u.length % 2 && (a[da] = u.charAt(u.length - 1));
                            f = a.join("")
                        }
                        h.contents = f;
                        h.location.replace("javascript:window.contents")
                    } else h.contents = f, h.location.replace("javascript:document.write(window.contents);document.close();")
                } catch (ya) {
                    Sf("Could not write third party content into IE iframe: " +
                    ya.message)
                } finally {
                    Xf(g)
                }
            } else {
                u = b;
                h = Wf();
                try {
                    f = "google-ad-content-" + (Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ +new Date).toString(36)), window[f] = u, u = 'var adContent = window.parent["' + f + '"];window.parent["' + f + '"] = null;document.write(adContent);', u = 6 == pe() ? "window.onload = function() {document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \"" + document.domain + '";' + u + "<\\/scr\\' + \\'ipt>\\');document.close(); };" : 'document.domain = "' +
                    document.domain + '";' + u + "document.close();", a.src = 'javascript:\'<script type="text/javascript">' + u + "\x3c/script>'"
                } catch (Pg) {
                    window[f] = null, Sf("Could not write third party content into  IE iframe with modified document.domain: " + Pg.message)
                } finally {
                    Xf(h)
                }
            }
        } else {
            h = b;
            try {
                g = a.contentWindow ? a.contentWindow.document : a.contentDocument, -1 != navigator.userAgent.indexOf("Firefox") && g.open("text/html", "replace"), g.write(h), g.close()
            } catch (Qg) {
                Sf("Could not write content into iframe using  the DOM standards method:" +
                Qg.message)
            }
        }
    }, Uf = function (a) {
        if (!Boolean(a))return a;
        var b = a.toLowerCase();
        return -1 < b.indexOf("<!doctype") || -1 < b.indexOf("<html") ? a : "<html>\n<head>\n<script>var inDapIF=true;\x3c/script>\n</head><body>" + a + "</body></html>\n"
    }, Sf = function (a) {
        Nf || (Nf = null);
        Nf.k(a)
    }, Zf = function (a, b) {
        var c = (b || document).getElementById(a);
        if (c && c.style.height && c.style.width) {
            for (var c = [c.style.width, c.style.height], d = 0; d < c.length; ++d)if (2 < c[d].length && "px" == c[d].substring(c[d].length - 2))c[d] = parseInt(c[d], 10); else return null;
            return c
        }
        return null
    }, Wf = function () {
        var a = [], b = document.getElementsByTagName("base");
        if (b)for (var c = 0, d = b.length; c < d; ++c) {
            var e = b[c], f = e.getAttribute("target");
            f && (a.push({va: e, La: f}), e.removeAttribute("target"))
        }
        return a
    }, Xf = function (a) {
        if (a)for (var b = 0, c = a.length; b < c; ++b) {
            var d = a[b];
            d.va.setAttribute("target", d.La)
        }
    };
    var T = function (a, b, c, d) {
        var e = P(c, "api_experiment");
        oa(Ga(e)) || cb(eb(e.split(","), pa), Ue);
        null != P(c, "google_force_post") && Te(Xe, "experiment");
        cb(Bd(), function (a) {
            googletag._tmanager_.addFeature(a)
        });
        this.j = b;
        this.n = c;
        this.l = {};
        this.G = d;
        this.t = Math.floor(4503599627370496 * Math.random());
        this.ha = !1;
        this.k = a;
        this.ia = this.r = !1;
        "MOBILE" == P(c, "target_platform") && (this.ia = !0);
        this.r = this.j && null !== this.j.w ? Boolean(this.j.w) : this.ia;
        F && Cb(9) && (mf = new Kf)
    };
    T.prototype.K = function () {
        return "lean"
    };
    var $f = function (a, b) {
        b && window.top != window ? a.ha = !0 : b = Math.floor(4503599627370496 * Math.random());
        a.t = Math.floor(b)
    };
    T.prototype.fa = function () {
        return null
    };
    T.prototype.Q = function () {
        return !1
    };
    var ag = function (a, b) {
        for (var c = 0; c < b.length; c++)a.l[I(b[c])] = null;
        Be(a.j, b)
    };
    T.prototype.$ = function () {
    };
    T.prototype.w = function (a) {
        var b = new Ie;
        b.o = this.t + "";
        b.v = "json_html";
        b.k = this.J(this.k);
        b.m = a;
        b.n = this.ga();
        b.j = Bd();
        b.u = this.ha;
        return b
    };
    T.prototype.D = function (a, b, c) {
        return bg(this, this.k ? "sra" : "single", this.w(b)).D(a, c)
    };
    var cg = function (a) {
        return ue() && Se(Xe) && 2048 < a.length
    }, dg = function (a, b) {
        return b ? af(a, 8192) : af(a, 2048)
    }, fg = function (a, b, c, d) {
        b = Od(b);
        Jf(Kd(b[1], b[2], b[3], b[4], b[5], "nwids=" + B(d)), b[6]).then(function (a) {
            var b;
            a = a.responseText;
            a = a.substring(a.indexOf("(") + 1, a.lastIndexOf(")")).replace(/\\x/g, "\\u00");
            var d = n.JSON.parse;
            try {
                b = d(a)
            } catch (h) {
                b = null
            }
            b && (eg(b), c(b))
        }, function () {
        }, a)
    }, eg = function (a) {
        ca(a) ? cb(a, eg) : A(a, function (a) {
            a._cookies_ && delete a._cookies_
        })
    }, gg = function (a, b) {
        cb(b, function (a) {
            var b =
                this.w(1);
            b.k = this.J(!1);
            b = bg(this, "single", b).D([a], !0);
            md(a, b)
        }, a)
    }, hg = function (a, b, c, d, e, f, g) {
        a = a.createElement(b);
        a.style.width = d + "px";
        e && (a.style.height = e + "px");
        a.style.display = f;
        a.style.position = "relative";
        g && (a.style.margin = g);
        a.style.border = 0;
        c && a.appendChild(c);
        return a
    }, ig = function (a, b, c, d, e, f) {
        e = hg(a, "ins", e, c, d, "block");
        d = hg(a, "ins", e, c, d, "inline-table");
        d.style.verticalAlign = "bottom";
        b = a.getElementById(b);
        f ? (a = hg(a, "div", d, c, null, "block", "auto"), b.appendChild(a)) : b.appendChild(d)
    }, jg =
        function (a, b, c, d) {
            var e = document;
            a = a.l[I(c)];
            var f = a._width_, g = a._height_, h = a._html_, k = e.createElement("iframe"), m = K(c);
            k.id = m;
            k.name = m;
            k.width = f;
            k.height = g;
            k.vspace = 0;
            k.hspace = 0;
            k.allowTransparency = "true";
            k.scrolling = "no";
            k.marginWidth = 0;
            k.marginHeight = 0;
            k.frameBorder = 0;
            k.style.border = 0;
            k.style.position = "absolute";
            k.style.top = 0;
            k.style.left = 0;
            La(k, "load", function () {
                c.o && googletag._tmanager_.tickRepeated("ad_render_end", c.m, c.k)
            });
            ig(e, b, f, g, k, d);
            k.contentWindow.document.write(h);
            k.contentWindow.document.write("<script>document.close();\x3c/script>");
            L(c, qd(c, a))
        };
    T.prototype.o = function (a, b, c, d) {
        c in this.j.m || (d && this.Q([c]), a = c.getCollapseEmptyDiv(), null == a && (a = "true" === P(this.n, "google_collapse_empty_div")), a && Pf(J(c), !1))
    };
    T.prototype.C = function (a, b, c) {
        this.l || (this.l = {});
        var d = [];
        if (this.k)if (ca(a)) {
            d = c || ye(this.j);
            b = [];
            var e = {};
            for (c = 0; c < d.length; ++c) {
                for (var f = d[c], g = null, g = null, h = Math.min(a.length, c + 1), k = 0; k < h; k++)if (null == e[k] && (g = a[k], g = g[f.getName()])) {
                    e[k] = !0;
                    break
                }
                g && (kg(this, f, g), b.push(f))
            }
            d = b
        } else d = lg(this, a); else {
            c = [];
            f = 0;
            for (e in a)c[f++] = e;
            1 < c.length || 0 == c.length ? a = null : (e = c[0], a = a[e], (b = b ? this.j.j[b] : mg(this, e)) ? (kg(this, b, a), a = b) : a = null);
            a && d.push(a)
        }
        return d
    };
    var lg = function (a, b) {
        var c = [];
        A(b, function (a, b) {
            var f = mg(this, b);
            f && (kg(this, f, a), c.push(f))
        }, a);
        return c
    }, kg = function (a, b, c) {
        a.l[I(b)] = c;
        b.t || (b.t = (new Date).getTime());
        b.j.fetchEnded();
        null != c._cookies_ && Me(a.G, c);
        c._persistent_for_stream_ && (a.j.m[b] = null)
    }, mg = function (a, b) {
        if (!a.k)for (var c = a.j.l, d = c.length - 1; 0 <= d; --d)if (c[d].getName() == b) {
            var e = c[d];
            if (!a.l[I(e)])return e
        }
        d = [];
        if (e = a.j.u[b])for (c = 0; c < e.length; ++c)e[c] && d.push(c);
        if (c = d.length ? d : null)for (d = 0; d < c.length; ++d)if ((e = a.j.j[b + "_" + c[d]]) && !a.l[I(e)])return e;
        return null
    }, ng = function () {
        n.googletag._getcook_ = 1
    };
    var og = function (a, b) {
        var c;
        c = O["#6#"] ? "https://" + O["#33#"] : "http://" + O["#33#"];
        if (!b || 0 > b || 1 < b)b = 0;
        this.l = Math.random() < b;
        this.k = a;
        this.j = c + "/pagead/gen_204?id=" + B(a)
    }, U = function (a, b, c) {
        b && b.match(/^\w+$/) && c && (a.j += "&" + b + "=" + B(c))
    }, pg = function (a, b) {
        var c = $e();
        null != c && U(a, "vrg", "" + c);
        U(a, "vrp", "57");
        var c = document, d = window, e = Fe(b);
        0 < e.length && (U(a, "pub_id", e[0]), 3 >= e.length || (e = nb(e, 0, 3), e.push("__extra__")), U(a, "nw_id", e.join(",")));
        U(a, "nslots", De(b).toString());
        e = Bd();
        0 < e.length && U(a, "eid", e.join());
        U(a, "pub_url", c.URL);
        null != Ud(b.k) && d.top != d || U(a, "pub_ref", c.referrer)
    }, qg = function (a) {
        a.l && a.k && a.j && Pa(window, a.j)
    };
    var rg = function (a, b, c, d, e) {
        Q.call(this, a, b, c, d, e)
    };
    z(rg, Q);
    rg.prototype.t = function () {
        Q.prototype.t.call(this);
        S(this, "m_ast", "js");
        S(this, "markup", "html");
        S(this, "js", "afmc")
    };
    var V = function (a, b, c, d) {
        T.call(this, a, b, c, d);
        this.u = this.H = this.A = null;
        this.da = this.L = this.F = this.B = !1;
        this.O = this.P = "";
        this.videoStreamCorrelator = NaN;
        this.N = 0
    };
    z(V, T);
    V.prototype.K = function () {
        return "unknown"
    };
    V.prototype.w = function (a) {
        a = V.Y.w.call(this, a);
        a.q = this.da;
        a.r = this.O;
        a.t = this.P;
        a.l = this.N;
        return a
    };
    var sg = function (a) {
        var b = Ce(a.j);
        if (0 < b.length) {
            for (var c = {}, d = [], e = 0; e < b.length; ++e)c[b[e][0]] = !0;
            A(c, function (a, b) {
                d.push(b)
            });
            a.A = new og("gpt_missing_cb", O["#10#"]);
            U(a.A, "pending", d.join());
            U(a.A, "correlator", a.t.toString());
            U(a.A, "impl", a.K());
            pg(a.A, a.j);
            qg(a.A)
        }
    };
    V.prototype.Fa = function () {
        sg(this);
        if (this.k && !this.F) {
            var a = De(this.j), b = this.j.l.length;
            a != b && (this.H = new og("gpt_sra_mismatch", O["#11#"]), U(this.H, "correlator", this.t.toString()), U(this.H, "fslots", b.toString()), pg(this.H, this.j), qg(this.H))
        }
    };
    V.prototype.Ga = function () {
        De(this.j);
        this.u = new og("gpt_req_disp_mismatch", O["#23#"]);
        U(this.u, "fslots", this.j.l.length.toString());
        U(this.u, "impl", this.J(this.k));
        U(this.u, "sra", this.k ? "1" : "0");
        U(this.u, "correlator", this.t.toString());
        pg(this.u, this.j);
        qg(this.u)
    };
    var bg = function (a, b, c) {
        switch (P(a.n, "target_platform")) {
            case "MOBILE":
                return new rg(b, a.j, a.n, a.G, c);
            default:
                return new kf(b, a.j, a.n, a.G, c)
        }
    };
    V.prototype.o = function (a, b, c, d) {
        a.google_js_backfill ? b.write('<script src="' + O["#5#"] + '">\x3c/script>') : V.Y.o.call(this, a, b, c, d)
    };
    V.prototype.C = function (a, b, c) {
        return T.prototype.C.call(this, a, b, c)
    };
    var tg = function (a, b, c) {
        a.N && b && (a = a.j.j[c], c = "", a && (c = a.getContentUrl()), he().registerAdBlock(c, 3, "json_html", b))
    };
    var W = function (a, b, c, d) {
        V.call(this, a, b, c, d);
        this.v = [];
        this.q = {};
        this.m = 0;
        this.V = [];
        this.Ia = [];
        this.na = {};
        this.W = !1;
        this.ra = this.pa = NaN;
        this.ba = !1;
        this.U = NaN;
        this.ma = !1;
        this.T = this.I = null
    };
    z(W, V);
    W.prototype.K = function () {
        return this.k ? "gut_friendly_iframe_sra" : "gut_friendly_iframe"
    };
    W.prototype.ga = function () {
        return "callbackProxy"
    };
    W.prototype.J = function (a) {
        return a ? "fifs" : "fif"
    };
    W.prototype.w = function (a) {
        a = W.Y.w.call(this, a);
        !this.k && this.W && (a.w = !0);
        a.persistentRoadblocksOnly = this.ma;
        a.videoPodNumber = this.pa;
        a.videoPodPosition = this.ra;
        a.videoStreamCorrelator = this.videoStreamCorrelator;
        return a
    };
    var Ag = function (a, b, c, d) {
        if (!(a.B || a.F && 1 == d)) {
            for (var e = 0; e < b.length; e++)Ae(a.j, b[e]), ug(a, b[e]);
            d = a.D(b, d, !1);
            if (cg(d))vg(a, d, b), wg(a, b[c]); else {
                d = dg(d, !1);
                d = me(d);
                gg(a, b);
                xg(a, b, c);
                d = yg(b, d, !0);
                googletag._tmanager_.tickRepeated("ad_fetch_start", a.m, b[0].k);
                a.q[a.m] = b;
                a.m++;
                if (Se(Ze) && null == document.getElementById(J(b[c])) && (c = hb(b, function (a) {
                        return null != document.getElementById(J(a))
                    }), -1 == c))return;
                zg(b[c], d)
            }
            ng()
        }
    }, Bg = function (a, b, c) {
        Ae(a.j, b);
        c = a.D([b], c, !1);
        cg(c) ? (vg(a, c, [b]), wg(a, b)) : (c =
            dg(c, !1), a.W = !1, c = me(c), googletag._tmanager_.tickRepeated("ad_fetch_start", a.m, b.k), a.q[a.m] = [b], a.m++, md(b, c), xg(a, [b], 0), c = yg([b], c, !(b in a.j.m)), zg(b, c));
        ng();
        a.na[I(b)] = setTimeout(x(a.la, a, !0), O["#13#"])
    }, yg = function (a, b, c) {
        var d = "";
        c && (a = eb(a, function (a) {
            return Fa(I(a))
        }), d += '<script type="text/javascript">function callbackProxy(adContents) { ', d += "window.parent.googletag.impl.pubads.setAdContentsBySlotForAsync(adContents, [" + a.join() + "]);}", d += "\x3c/script>");
        return d += '<script src = "' + b +
        '">\x3c/script>'
    }, vg = function (a, b, c) {
        b = dg(b, !0);
        var d = me(b);
        a.k ? gg(a, c) : md(c[0], d);
        var e = eb(c, function (a) {
            return I(a)
        }), d = x(function (a) {
            !this.k && c[0]in this.j.m || Cg(this, a, e)
        }, a);
        fg(a, b, d, Fe(a.j, c).join(","));
        googletag._tmanager_.tickRepeated("ad_fetch_start", a.m, c[0].k);
        a.q[a.m] = c;
        a.m++
    }, wg = function (a, b) {
        if (a.G && 1 != n.googletag._getcook_) {
            var c;
            c = a.G;
            var d = document.domain;
            if (1 == c.j || !c.k && !c.m)c = null; else {
                var e = oe(Boolean(a.j.r)) + "/gampad/cookie.js?", e = e + ("domain=" + B(d)), e = e + "&callback=window.parent.googletag.impl.pubads.setCookieInfo" +
                    ("&iu=" + b.v);
                c.k && (e += "&cookie=" + B(c.k));
                c.m && (e += "&cookie_enabled=1");
                c = e
            }
            c && (c = '<script src = "' + me(c) + '">\x3c/script>', zg(b, c))
        }
    }, zg = function (a, b) {
        var c = document, d = K(a) + "__hidden__", e = c.getElementById(d);
        if (!e) {
            e = J(a);
            e = c.getElementById(e);
            if (null == e)return;
            e = Rf(e, d, !0, [0, 0], c)
        }
        Yf(e, b, !1)
    }, Dg = function (a) {
        return K(a) + "__container__"
    }, Gg = function (a, b) {
        var c = document;
        if (!(b in a.j.m)) {
            var d = J(b), e = c.getElementById(d);
            if (e) {
                for (var d = Dg(b), f = K(b) + "__hidden__", e = e.childNodes, g = !1, h = 0; h < e.length; ++h)if (1 ==
                    e[h].nodeType) {
                    var k = e[h];
                    if (k.id != d && k.id != f) {
                        g = !0;
                        break
                    }
                }
                (g = g || Eg(c, b)) && Fg(b)
            }
        }
    }, Eg = function (a, b) {
        var c = a.getElementById(Dg(b));
        return Boolean(c) && fb(Tb(c), function (a) {
                return a.id != K(b)
            })
    };
    W.prototype.$ = function (a, b) {
        var c = pb(a, function (a) {
            return 0 != a.getSizes().length
        });
        c[!1] && cb(c[!1], function (a) {
            this.o(window, document, a, !0)
        }, this);
        if (a = c[!0]) {
            q(b.videoStreamCorrelator) ? this.videoStreamCorrelator = b.videoStreamCorrelator : (c = !0, q(b.changeCorrelator) && (c = b.changeCorrelator), c && $f(this));
            this.pa = b.videoPodNumber || NaN;
            this.ra = b.videoPodPosition || NaN;
            this.ma = b.persistentRoadblocksOnly || !1;
            this.ba = b.clearUnfilledSlots || !1;
            ag(this, a);
            this.k && ib(this.Ia, a);
            this.U = a.length;
            for (c = 0; c < a.length; ++c)Gg(this,
                a[c]);
            Hg(this, a, 0, b.isVideoRefresh ? 3 : 2)
        }
    };
    W.prototype.Q = function (a) {
        for (var b = 0; b < a.length; ++b)Fg(a[b]), Ig(this, a[b]);
        return !0
    };
    var Fg = function (a) {
        var b = !!a.l;
        Jg(a);
        var c = J(a);
        if (b) {
            var d = document.getElementById(c);
            if (d) {
                var e = Dg(a) + "__to_be_removed__";
                a = lb(d.childNodes);
                cb(a, function (a) {
                    1 == a.nodeType && a.id == e || d.removeChild(a)
                })
            }
        } else Of(c)
    }, ug = function (a, b) {
        var c = document, d = b.getSizes();
        if (0 != d.length) {
            var e = d[0];
            1 < d.length && (e = Zf(J(b), c) || e);
            var d = K(b), f = c.getElementById(d);
            if (!f) {
                f = J(b);
                f = c.getElementById(f);
                if (null == f)return;
                var g = c.createElement("div");
                g.id = Dg(b);
                g.name = g.id;
                g.style.border = "0pt none";
                a.r && (g.style.margin =
                    "auto", g.style.textAlign = "center");
                f.appendChild(g);
                f = Rf(g, d, !1, e, c);
                La(f, "load", function () {
                    b.o && googletag._tmanager_.tickRepeated("ad_render_end", b.m, b.k)
                })
            }
            a.j.q[I(b)] = f
        }
    }, Kg = function (a, b) {
        for (var c = 0; c < a.m; c++)if (a.q.hasOwnProperty(c) && gb(a.q[c], function (a, c) {
                return I(a) == b[c]
            }))return c;
        return -1
    }, Mg = function (a, b, c) {
        for (var d = [], e = 0; e < c.length; e++)d.push(a.j.j[c[e]]);
        b = a.C(b, void 0, d);
        c = Kg(a, c);
        0 <= c && (googletag._tmanager_.tickRepeated("ad_fetch_end", c, b[0].k), delete a.q[c]);
        cb(b, function (a) {
            Lg(this,
                a)
        }, a)
    }, Cg = function (a, b, c) {
        if (a.k)Mg(a, b, c); else {
            b = a.C(b, c[0]);
            c = Kg(a, c);
            0 <= c && (googletag._tmanager_.tickRepeated("ad_fetch_end", c, b[0].k), delete a.q[c]);
            c = a.v[0];
            for (var d = !1, e = 0; e < b.length; ++e)Lg(a, b[e]), b[e] === c && (d = !0);
            d && (clearTimeout(a.na[I(c)]), a.la())
        }
    };
    W.prototype.la = function (a) {
        a && (this.W = !0);
        0 < this.v.length && (this.v.shift(), this.V.shift(), 0 < this.v.length && Bg(this, this.v[0], this.V[0]))
    };
    var Ng = function (a, b) {
        Ae(a.j, b);
        ug(a, b);
        null != a.l[I(b)] && Lg(a, b)
    }, Hg = function (a, b, c, d) {
        if (a.k)Ag(a, b, c, d); else if (!(a.B || a.F && 1 == d)) {
            for (c = 0; c < b.length; c++)ug(a, b[c]);
            mb(a.v, b);
            c = b.length;
            for (var e = [], f = 0; f < c; f++)e[f] = d;
            mb(a.V, e);
            a.v.length == b.length && Bg(a, b[0], d)
        }
    };
    W.prototype.ca = function (a) {
        if (!this.k) {
            var b = document.getElementById(J(a));
            b && (this.j.v[I(a)] = b)
        }
    };
    W.prototype.ka = function () {
    };
    W.prototype.aa = function () {
    };
    W.prototype.R = function (a) {
        Ig(this, a);
        var b = null, c = -1;
        if (this.k) {
            Ng(this, a);
            b = ze(this.j);
            if (0 == b.length)return;
            b = pb(b, function (a) {
                return 0 != a.getSizes().length
            });
            b[!1] && cb(b[!1], function (a) {
                this.o(window, document, a, !0)
            }, this);
            b = b[!0];
            if (!b)return;
            c = !a.n && 0 <= bb(b, a) ? hb(b, function (b) {
                return I(a) == I(b)
            }) : 0
        } else {
            if (0 == a.getSizes().length) {
                this.o(window, document, a, !0);
                return
            }
            b = [a];
            c = 0
        }
        Hg(this, b, c, 1)
    };
    var Ig = function (a, b) {
        var c = b.getDivStartsCollapsed();
        null == c && (c = "true" === P(a.n, "google_divs_start_collapsed"));
        c && Pf(J(b), !1)
    }, Lg = function (a, b) {
        try {
            Og(a, b)
        } catch (c) {
        }
    }, Og = function (a, b) {
        var c = window, d = document, e = a.l[I(b)];
        googletag._tmanager_.tickRepeated("ad_render_start", sd(b), b.k);
        nd(b);
        if (null == e || e._empty_)a.o(c, d, b, a.ba), L(b, rd(b)); else if (a.L)L(b, rd(b)); else {
            c = e._html_;
            if (!t(c)) {
                Jg(b);
                return
            }
            Pf(J(b), !0);
            Rg(a, b);
            var f = [e._width_, e._height_];
            e._use_safe_frame_ ? Sg(a, d, b, f, c, function () {
                googletag._tmanager_.tickRepeated("ad_render_end",
                    b.m, b.k)
            }) : Tg(a, d, b, f, c);
            L(b, qd(b, e))
        }
        Tf(d, K(b) + "__hidden__")
    }, Jg = function (a) {
        var b = document.getElementById(Dg(a)), c = a.l;
        if (b) {
            var d = document.getElementById(K(a)), e = he();
            e.unloadAdBlock && e.unloadAdBlock(d, !!a.l);
            a.l ? (b.style.display = "none", b.id += "__to_be_removed__", d.id = d.id + "__to_be_removed__", window.setTimeout(function () {
                c && hd(c);
                b.parentNode && b.parentNode.removeChild(b)
            }, O["#24#"])) : b.parentNode.removeChild(b)
        } else c && hd(c);
        a.l = null
    }, Rg = function (a, b) {
        if (b.l)Jg(b), ug(a, b); else {
            var c = document.getElementById(K(b)),
                d = he();
            d.unloadAdBlock && d.unloadAdBlock(c, !!b.l)
        }
    }, Tg = function (a, b, c, d, e) {
        b = b.getElementById(K(c));
        null != b && (b.width = String(d[0]), b.height = String(d[1]), Yf(b, e, !0), tg(a, b, I(c)))
    }, Sg = function (a, b, c, d, e, f) {
        var g = b.getElementById(Dg(c));
        if (null != g) {
            for (var h; h = g.firstChild;)g.removeChild(h);
            a.r || (g.style.display = "inline-block");
            d = Vf(g, K(c), e, d, f);
            c.l = d;
            tg(a, b.getElementById(K(c)), I(c))
        }
    };
    W.prototype.fa = function () {
        return isNaN(this.U) || this.k ? 0 == ze(this.j).length : ze(this.j).length == De(this.j) - this.U
    };
    var xg = function (a, b, c) {
        null == document.getElementById(J(b[c])) && Ug(a);
        a.k && (fb(b, function (a) {
            return null != document.getElementById(J(a))
        }) || Vg(a))
    }, Ug = function (a) {
        a.I = new og("gpt_target_slot_has_no_div", O["#29#"]);
        U(a.I, "sra", a.k ? "1" : "0");
        pg(a.I, a.j);
        qg(a.I)
    }, Vg = function (a) {
        a.T = new og("gpt_request_slots_have_no_divs", O["#29#"]);
        pg(a.T, a.j);
        qg(a.T)
    };
    var Wg = function (a, b, c, d) {
        V.call(this, a, b, c, d);
        this.v = this.m = 0;
        this.q = !1
    };
    z(Wg, V);
    Wg.prototype.K = function () {
        return this.k ? "gut_sync_sra" : "gut_sync"
    };
    Wg.prototype.ga = function () {
        return this.q ? (this.q = !1, "googletag.impl.pubads.setPassbackAdContents") : "googletag.impl.pubads.setAdContentsBySlotForSync"
    };
    Wg.prototype.J = function (a) {
        return a ? "ss" : "s"
    };
    var Xg = function (a, b) {
        if (!a.B) {
            var c = a.D([b], 1, !0), c = me(c);
            googletag._tmanager_.tickRepeated("ad_fetch_start", a.m, b.k);
            a.m++;
            md(b, c);
            ng();
            Qf(c)
        }
    }, Zg = function (a, b, c) {
        b = a.C(b);
        googletag._tmanager_.tickRepeated("ad_fetch_end", a.v, b[0].k);
        a.v++;
        if (a.k)c = a.j.l, 1 == c.length && Yg(a, c[0], void 0); else for (var d = 0; d < b.length; ++d)Yg(a, b[d], c)
    }, $g = function (a, b) {
        if (!a.B) {
            var c = a.D(b, 1, !0), c = me(c);
            ng();
            Qf(c);
            googletag._tmanager_.tickRepeated("ad_fetch_start", a.m, b[0].k);
            a.m++;
            gg(a, b)
        }
    };
    Wg.prototype.ca = function (a) {
        if (!this.k) {
            var b;
            b = null;
            var c = ka.getElementsByTagName("script");
            c && c.length && (b = c[c.length - 1]);
            (b = b && b.parentElement) && (this.j.v[I(a)] = b)
        }
    };
    Wg.prototype.ka = function (a) {
        var b = "google_temp_div_" + I(a), c = '<div id="' + xa(b) + '"></div>';
        document.write(c);
        (b = Lb(b)) && (this.j.q[I(a)] = b)
    };
    Wg.prototype.aa = function (a) {
        var b = this.j;
        a = I(a);
        var c = b.q[a];
        c && (c && c.parentNode && c.parentNode.removeChild(c), delete b.q[a])
    };
    Wg.prototype.R = function (a) {
        Ae(this.j, a);
        var b = this.j.l.length;
        this.k ? 1 == b ? (b = db(ye(this.j), function (a) {
            return 0 != a.getSizes().length
        }), 0 <= bb(b, a) || this.o(window, document, a, !1), b.length && $g(this, b)) : Yg(this, a, void 0) : 0 == a.getSizes().length ? this.o(window, document, a, !1) : Xg(this, a)
    };
    var Yg = function (a, b, c) {
        var d = window, e = document, f = a.l[I(b)];
        nd(b);
        googletag._tmanager_.tickRepeated("ad_render_start", sd(b), b.k);
        if (null == f || f._empty_)a.o(d, e, b, !1), L(b, rd(b)); else if (a.L)L(b, rd(b)); else if (f._use_safe_frame_) {
            var d = function () {
                googletag._tmanager_.tickRepeated("ad_render_end", b.m, b.k)
            }, g = f._html_;
            g ? (c = [f._width_, f._height_], ah(a, e, b, c, g, d), L(b, qd(b, f))) : L(b, rd(b))
        } else if (f._snippet_ && !f._is_afc_)bh(a, b, e); else if (qe()) {
            e = "googletag.impl.pubads.syncAdSlotLoaded(this, '" + I(b) + "'," +
            c + ");";
            d = "about:blank";
            if (c = P(a.n, "google_domain_reset_url"))if (g = Nd(c), null === g || 0 <= g.indexOf(document.domain))d = c;
            c = [f._width_, f._height_];
            ch(a, b, d, e, c, a.r)
        } else f = dh(a, b, e), e.write("<script>googletag.impl.pubads.createDomIframe(" + Fa(f) + " ," + Fa(I(b)) + "," + a.r + "," + c + ");\x3c/script>")
    }, ah = function (a, b, c, d, e, f) {
        eh(c, b);
        var g = K(c) + "__container__", h = '<div id="' + xa(g) + '"></div>';
        b.write(h);
        g = b.getElementById(g);
        null != g && (a.r ? g.style.margin = "auto" : g.style.display = "inline-block", d = Vf(g, K(c), e, d, f), c.l = d,
            tg(a, b.getElementById(K(c)), I(c)))
    }, fh = function (a, b, c) {
        a = a.l[I(c)];
        var d = b.parentNode, e = a && a._html_;
        e ? (!a._expandable_ || a._is_afc_ && a._is_3pas_ ? (La(b, "load", function () {
            c.o && googletag._tmanager_.tickRepeated("ad_render_end", c.m, c.k)
        }), Yf(b, e, !0)) : d.innerHTML = e, L(c, qd(c, a))) : (d.removeChild(b), L(c, rd(c)))
    }, gh = function (a, b, c, d) {
        b = J(b) + "_ad_container";
        var e = '<div id="' + xa(b) + '"';
        a.r && d ? (e += ' style="width:' + d._width_, e += 'px;margin:auto;">') : e += ">";
        d && (e += d._html_);
        c.write(e + "\n</div>\n");
        return b
    }, eh = function (a,
                      b) {
        var c = b.getElementById(J(a));
        c && c.parentNode && "" === c.innerHTML && c.parentNode.removeChild(c)
    }, bh = function (a, b, c) {
        eh(b, c);
        var d = a.l[I(b)];
        if (null != d) {
            var e = gh(a, b, c, d);
            L(b, qd(b, d));
            (c = c.getElementById(e)) && tg(a, c, I(b))
        }
    }, ch = function (a, b, c, d, e, f) {
        eh(b, document);
        var g = K(b), h = [], k = e[0];
        e = e[1];
        c = me(c);
        h.push('<iframe id="', xa(g), '" name="', xa(g), '" width="', k, '" height="', e, '" vspace="0" hspace="0" allowtransparency="true" ', "scrolling=", a.I ? '"auto"' : '"no"', ' marginwidth="0" marginheight="0" frameborder="0" style=',
            '"border:0px;left:0;position:absolute;top:0;"', ' src="', c, '"');
        null != d && h.push(' onload="', d, '"');
        h.push("></iframe>");
        d = [];
        c = J(b) + "_ad_container";
        d.push('<div id="', xa(c), '"');
        f && d.push(' style="text-align:center" ');
        d.push(">");
        d.push('<ins style="position:relative;width:' + k + "px;height:" + e + 'px;border:none;display:inline-table;vertical-align:bottom;">' + ('<ins style="position:relative;width:' + k + "px;height:" + e + 'px;border:none;display:block;">' + h.join("") + "</ins>") + "</ins>");
        d.push("</div>");
        document.write(d.join(""));
        (f = document.getElementById(g)) && tg(a, f, I(b))
    }, dh = function (a, b, c) {
        eh(b, c || document);
        return gh(a, b, c || document)
    };
    var hh = function () {
        this.l = this.j = this.k = null
    }, X = function (a) {
        null == a.k && (a.k = new we(td));
        return a.k
    }, Y = function (a) {
        if (null != a.j)return a.j;
        switch (P(ih(a), "google_ad_impl")) {
            case "gut_sync_sra":
                googletag._tmanager_.setSraMode(!0);
                a.j = new Wg(!0, X(a), ih(a), Oe(void 0));
                googletag._tmanager_.addFeature("sync");
                break;
            case "gut_friendly_iframe":
                googletag._tmanager_.setSraMode(!1);
                a.j = new W(!1, X(a), ih(a), Oe(void 0));
                googletag._tmanager_.addFeature("fif");
                break;
            case "gut_friendly_iframe_sra":
                googletag._tmanager_.setSraMode(!0);
                a.j = new W(!0, X(a), ih(a), Oe(void 0));
                googletag._tmanager_.addFeature("fif");
                break;
            default:
                googletag._tmanager_.setSraMode(!1), a.j = new Wg(!1, X(a), ih(a), Oe(void 0)), googletag._tmanager_.addFeature("sync")
        }
        var b = a.j;
        b.B = null != P(b.n, "google_nofetch") || Boolean(window.google_noFetch) || b.B;
        b.F = null != P(b.n, "google_disable_initial_load") || Boolean(window.google_DisableInitialLoad) || b.F;
        b.L = null != P(b.n, "google_norender") || b.L;
        var c = x(b.Fa, b), d = window;
        d.attachEvent ? d.attachEvent("onload", c) : d.addEventListener &&
        d.addEventListener("load", c, !1);
        c = x(b.Ga, b);
        d = window;
        d.attachEvent ? d.attachEvent("onunload", c) : d.addEventListener && d.addEventListener("unload", c, !1);
        b.N = he().setupOse(b.t);
        return a.j
    }, ih = function (a) {
        null == a.l && (a.l = new ve);
        return a.l
    }, jh = null, Z = function () {
        jh || (jh = new hh);
        return jh
    }, kh = null, lh = function () {
        kh || (kh = new hh);
        return kh
    };
    var mh = O["#38#"], nh = function (a, b) {
        var c = {methodId: a};
        b.name && (c.name = b.name);
        b.message && (c.message = b.message.substring(0, 512));
        b.fileName && (c.fileName = b.fileName);
        b.lineNumber && (c.lineNumber = b.lineNumber);
        b.stack && (c.stack = Na(b.stack, ""));
        return c
    }, ph = function (a, b) {
        oh(a, b, void 0);
        throw b;
    }, oh = function (a, b, c) {
        if (!b.Ea)try {
            b.Ea = !0;
            var d = mh;
            q(c) && 0 <= c && 1 >= c && (d = c);
            var e = nh(a, b), f = new og("gpt_exception", d);
            try {
                pg(f, X(Z()))
            } catch (g) {
            }
            A(e, function (a, b) {
                U(f, b, a)
            });
            qg(f)
        } catch (h) {
        }
    };
    var qh = function () {
    };
    l = qh.prototype;
    l.addSlot = function (a) {
        if (!a)return null;
        var b = a.getName();
        return b && b.length ? xe(X(Z()), a) : null
    };
    l.fillSlot = function (a) {
        var b = Z(), c = Y(b);
        (a = Ee(X(b), a)) && (null == c.l[I(a)] || c.k) && (c.ca(a), c.ka(a), c.R(a), c.aa(a))
    };
    l.setCookieOptions = function (a) {
        Z();
        var b = Oe(a);
        b.j = a;
        Ke(b)
    };
    l.setTagForChildDirectedTreatment = function (a) {
        X(Z()).A = a
    };
    l.passback = function (a) {
        if (a) {
            var b = a.getName();
            b && b.length && (b = lh(), a = xe(X(b), a, !0), b = Y(b), b.q = !0, b.R(a))
        }
    };
    l.disableInitialLoad = function () {
        window.google_DisableInitialLoad = !0
    };
    l.addAttribute = function (a, b) {
        var c = X(Z()), d = b;
        if (!oa(Ga(a))) {
            oa(Ga(d)) && (d = "");
            var e = c.o[a];
            c.o[a] = e ? e + "," + d : d
        }
    };
    l.clearAttribute = function (a) {
        var b = X(Z());
        oa(Ga(a)) || b.o[a] && delete b.o[a]
    };
    l.addPageCategoryExclusion = function (a) {
        var b = X(Z());
        oa(Ga(a)) || ib(b.t, a)
    };
    l.clearPageCategoryExclusions = function () {
        X(Z()).t = []
    };
    l.addAdSensePageAttribute = function (a, b) {
        var c = X(Z());
        Rd(c.k, a, b)
    };
    l.addAdSenseSlotAttribute = function (a, b, c) {
        var d = X(Z());
        a && (a = Ee(d, a)) && (a = I(a), null == d.n[a] && (d.n[a] = new Qd(d.C)), Rd(d.n[a], b, c))
    };
    l.enableSingleRequest = function () {
        var a = ih(Z());
        null == P(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_sync_sra")
    };
    l.collapseEmptyDivs = function (a) {
        var b = ih(Z());
        b.j.google_collapse_empty_div = "true";
        a && (b.j.google_divs_start_collapsed = "true")
    };
    l.enableAsyncRendering = function () {
        var a = ih(Z());
        null == P(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_friendly_iframe")
    };
    l.enableAsyncSingleRequest = function () {
        var a = ih(Z());
        null == P(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_friendly_iframe_sra")
    };
    l.setVideoContentInformation = function (a, b) {
        var c = Y(Z());
        c.da = !0;
        c.P = a;
        c.O = b;
        c.videoStreamCorrelator = Math.floor(4503599627370496 * Math.random())
    };
    l.getVideoContentInformation = function () {
        var a = Y(Z());
        return {cmsid: a.O, vid: a.P}
    };
    l.getVideoStreamCorrelator = function () {
        return Y(Z()).videoStreamCorrelator
    };
    l.refresh = function (a, b) {
        var c = Z(), d = Y(c), c = X(c), e = null, e = null != a ? rh(a) : ye(c);
        0 == e.length || d.$(e, b)
    };
    l.getCorrelator = function () {
        return Y(Z()).t + ""
    };
    l.setCorrelator = function (a) {
        $f(Y(Z()), a)
    };
    l.setMobilePlatform = function () {
        ih(Z()).j.target_platform = "MOBILE"
    };
    l.setApiExperiment = function (a) {
        Ue(a)
    };
    l.isAdRequestFinished = function () {
        return Y(Z()).fa()
    };
    l.isSlotAPersistentRoadblock = function (a) {
        if (!a)return !1;
        var b = X(Z());
        return !!(new jd(a, !1)in b.m)
    };
    l.clearNoRefreshState = function () {
        X(Z()).m = {}
    };
    l.clearSlotContents = function (a) {
        var b = Z(), c = Y(b), b = X(b), d = null, d = a ? rh(a) : ye(b);
        return c.Q(d)
    };
    l.setLocation = function (a) {
        X(Z()).r = a
    };
    l.setPublisherProvidedId = function (a) {
        X(Z()).B = a
    };
    l.getVersion = function () {
        return "57"
    };
    l.setCenterAds = function (a) {
        X(Z()).w = a
    };
    var rh = function (a) {
        for (var b = [], c = X(Z()), d = 0; d < a.length; ++d) {
            var e = Ee(c, a[d]);
            e && b.push(e)
        }
        return b
    }, sh = function (a, b) {
        var c;
        c = n.googletag || (n.googletag = {});
        c = c.impl || (c.impl = {});
        c = c.pubads || (c.pubads = {});
        c[a] || (c[a] = b)
    };
    sh("createDomIframe", function (a, b, c, d) {
        try {
            var e;
            e = d ? lh() : Z();
            var f = Y(e), g;
            if (g = X(e).j[b]) {
                jg(f, a, g, c);
                var h = document.getElementById(K(g));
                h && tg(f, h, b)
            }
        } catch (k) {
            ph(2401, k)
        }
    });
    sh("setAdContentsBySlot", function (a) {
        try {
            Y(Z()).C(a)
        } catch (b) {
            ph(2402, b)
        }
    });
    sh("setAdContentsBySlotForSync", function (a) {
        try {
            Zg(Y(Z()), a)
        } catch (b) {
            ph(2403, b)
        }
    });
    sh("setPassbackAdContents", function (a) {
        try {
            Zg(Y(lh()), a, !0)
        } catch (b) {
            ph(2404, b)
        }
    });
    sh("setAdContentsBySlotForAsync", function (a, b) {
        try {
            Cg(Y(Z()), a, b)
        } catch (c) {
            ph(2405, c)
        }
    });
    sh("syncAdSlotLoaded", function (a, b, c) {
        try {
            var d = Y(c ? lh() : Z());
            if (b) {
                var e = d.j.j[b];
                e && !e.q && (e.q = !0, fh(d, a, e))
            }
        } catch (f) {
            ph(2407, f)
        }
    });
    sh("setCookieInfo", function (a) {
        try {
            var b;
            Z();
            b = Oe(void 0);
            Me(b, a)
        } catch (c) {
            ph(2408, c)
        }
    });
    try {
        ih(Z());
        googletag._tmanager_.tick("pubads_load");
        window.google_noFetch = !1;
        window.google_DisableInitialLoad = !1;
        try {
            var th = n.googletag.pubads;
            if (fa(th))th().onGoogleAdsJsLoad(new qh)
        } catch (uh) {
            oh(3002, uh)
        }
    } catch (vh) {
        ph(3001, vh)
    }
    ;
})();

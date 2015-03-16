(function () {
    var h, l = this, n = function (a) {
        return void 0 !== a
    }, aa = function (a) {
        a = a.split(".");
        for (var b = l, c; c = a.shift();)if (null != b[c])b = b[c]; else return null;
        return b
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
        var b = ba(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, p = function (a) {
        return "string" == typeof a
    }, r = function (a) {
        return "number" == typeof a
    }, u = function (a) {
        return "function" == ba(a)
    }, ea = function (a) {
        var b = typeof a;
        return "object" == b && null != a ||
            "function" == b
    }, fa = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ga = function (a, b, c) {
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
    }, v = function (a, b, c) {
        v = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? fa : ga;
        return v.apply(null, arguments)
    }, ha = function (a,
                      b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }, w = Date.now || function () {
            return +new Date
        };
    var ia = {Jc: "ud=1", Ic: "ts=1"};
    var ja;
    var ka = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, ta = function (a) {
            if (!la.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(ma, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(na, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(pa, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(qa, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(ra, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(sa, "&#0;"));
            return a
        }, ma = /&/g, na = /</g, pa = />/g, qa = /"/g, ra = /'/g, sa = /\x00/g, la = /[\x00&<>"']/,
        va = function (a, b) {
            for (var c = 0, d = ka(String(a)).split("."), e = ka(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
                var k = d[g] || "", m = e[g] || "", t = RegExp("(\\d*)(\\D*)", "g"), q = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var y = t.exec(k) || ["", "", ""], z = q.exec(m) || ["", "", ""];
                    if (0 == y[0].length && 0 == z[0].length)break;
                    c = ua(0 == y[1].length ? 0 : parseInt(y[1], 10), 0 == z[1].length ? 0 : parseInt(z[1], 10)) || ua(0 == y[2].length, 0 == z[2].length) || ua(y[2], z[2])
                } while (0 == c)
            }
            return c
        }, ua = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        }, wa =
            function () {
                return "display".replace(/\-([a-z])/g, function (a, b) {
                    return b.toUpperCase()
                })
            }, xa = function (a) {
            var b = p(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
                return b + e.toUpperCase()
            })
        };
    var ya = function (a) {
        ya[" "](a);
        return a
    };
    ya[" "] = function () {
    };
    var za = function (a) {
        try {
            var b;
            if (b = !!a && null != a.location.href)i:{
                try {
                    ya(a.foo);
                    b = !0;
                    break i
                } catch (c) {
                }
                b = !1
            }
            return b
        } catch (d) {
            return !1
        }
    }, Aa = function (a, b) {
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
    }, Ba = function (a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }, x = function (a, b, c, d) {
        a.removeEventListener ?
            a.removeEventListener(b, c, d || !1) : a.detachEvent && a.detachEvent("on" + b, c)
    };
    var Ca = function (a) {
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
    }, A = function (a, b, c) {
        a.google_image_requests || (a.google_image_requests = []);
        var d = a.document.createElement("img");
        if (c) {
            var e = function (a) {
                c(a);
                x(d, "load", e);
                x(d, "error",
                    e)
            };
            Ba(d, "load", e);
            Ba(d, "error", e)
        }
        d.src = b;
        a.google_image_requests.push(d)
    };
    var B = document, C = window;
    var Da = null, Ea = function (a, b) {
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
    }, Fa = function (a) {
        return !!a && "function" == typeof a && !!a.call
    };

    function D(a) {
        return "function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)
    }

    var Ga = function (a) {
        Ba(C, "load", a, void 0)
    };
    var Ha = function (a) {
        return {
                visible: 1,
                hidden: 2,
                prerender: 3,
                preview: 4
            }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0
    }, Ia = function () {
        var a;
        B.mozVisibilityState ? a = "mozvisibilitychange" : B.webkitVisibilityState ? a = "webkitvisibilitychange" : B.visibilityState && (a = "visibilitychange");
        return a
    };
    var Ja = !0, Ka = {}, Na = function (a, b, c, d) {
        var e = La, f, g = Ja;
        try {
            f = b()
        } catch (k) {
            try {
                var m = Ca(k);
                b = "";
                k.fileName && (b = k.fileName);
                var t = -1;
                k.lineNumber && (t = k.lineNumber);
                g = e(a, m, b, t, c)
            } catch (q) {
                try {
                    var y = Ca(q);
                    a = "";
                    q.fileName && (a = q.fileName);
                    c = -1;
                    q.lineNumber && (c = q.lineNumber);
                    La("pAR", y, a, c, void 0, void 0)
                } catch (z) {
                    Ma({context: "mRE", msg: z.toString() + "\n" + (z.stack || "")}, void 0)
                }
            }
            if (!g)throw k;
        } finally {
            if (d)try {
                d()
            } catch (da) {
            }
        }
        return f
    }, La = function (a, b, c, d, e, f) {
        var g = {};
        if (e)try {
            e(g)
        } catch (k) {
        }
        g.context = a;
        g.msg =
            b.substring(0, 512);
        c && (g.file = c);
        0 < d && (g.line = d.toString());
        g.url = B.URL.substring(0, 512);
        g.ref = B.referrer.substring(0, 512);
        Oa(g);
        Ma(g, f);
        return Ja
    }, Ma = function (a, b) {
        try {
            if (Math.random() < (b || .01)) {
                var c = "/pagead/gen_204?id=jserror" + Pa(a), d = "http" + ("http:" == C.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c, d = d.substring(0, 2E3);
                A(C, d, void 0)
            }
        } catch (e) {
        }
    }, Oa = function (a) {
        var b = a || {};
        Ea(Ka, function (a, d) {
            b[d] = C[a]
        })
    }, Qa = function (a, b, c, d, e) {
        return function () {
            var f = arguments;
            return Na(a, function () {
                return b.apply(c,
                    f)
            }, d, e)
        }
    }, E = function (a, b) {
        return Qa(a, b, void 0, void 0, void 0)
    }, Pa = function (a) {
        var b = "";
        Ea(a, function (a, d) {
            if (0 === a || a)b += "&" + d + "=" + D(a)
        });
        return b
    };
    var F = Array.prototype, Ra = F.indexOf ? function (a, b, c) {
        return F.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a))return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }, G = F.forEach ? function (a, b, c) {
        F.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, Sa = F.filter ? function (a, b, c) {
        return F.filter.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = [], f = 0, g = p(a) ?
            a.split("") : a, k = 0; k < d; k++)if (k in g) {
            var m = g[k];
            b.call(c, m, k, a) && (e[f++] = m)
        }
        return e
    }, Ta = F.map ? function (a, b, c) {
        return F.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, g = 0; g < d; g++)g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    }, Ua = F.some ? function (a, b, c) {
        return F.some.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return !0;
        return !1
    }, Va = function (a) {
        var b = H;
        i:{
            for (var c = b.length, d = p(b) ? b.split("") : b, e = 0; e <
            c; e++)if (e in d && a.call(void 0, d[e], e, b)) {
                a = e;
                break i
            }
            a = -1
        }
        return 0 > a ? null : p(b) ? b.charAt(a) : b[a]
    }, Wa = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return []
    }, Ya = function (a, b, c, d) {
        F.splice.apply(a, Xa(arguments, 1))
    }, Xa = function (a, b, c) {
        return 2 >= arguments.length ? F.slice.call(a, b) : F.slice.call(a, b, c)
    }, Za = function (a) {
        for (var b = [], c = 0; c < a; c++)b[c] = 0;
        return b
    }, $a = function (a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            if ("array" == ba(d))for (var e = 0; e <
            d.length; e += 8192)for (var f = $a.apply(null, Xa(d, e, e + 8192)), g = 0; g < f.length; g++)b.push(f[g]); else b.push(d)
        }
        return b
    };
    var ab = function () {
        this.va = this.va;
        this.Ca = this.Ca
    };
    ab.prototype.va = !1;
    var cb = function () {
        var a = bb;
        a.va || (a.va = !0, a.Sa())
    };
    ab.prototype.Sa = function () {
        if (this.Ca)for (; this.Ca.length;)this.Ca.shift()()
    };
    var db = function (a, b) {
        for (var c in a)b.call(void 0, a[c], c, a)
    }, eb = function (a) {
        var b = 0, c;
        for (c in a)b++;
        return b
    }, fb = function (a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = d;
        return b
    }, gb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), hb = function (a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < gb.length; f++)c = gb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }, ib = function (a) {
        var b = arguments.length;
        if (1 == b && "array" == ba(arguments[0]))return ib.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++)c[arguments[d]] = !0;
        return c
    };
    var I;
    i:{
        var jb = l.navigator;
        if (jb) {
            var kb = jb.userAgent;
            if (kb) {
                I = kb;
                break i
            }
        }
        I = ""
    }
    var J = function (a) {
        return -1 != I.indexOf(a)
    };
    var lb = function () {
        return J("Opera") || J("OPR")
    }, mb = function () {
        return J("Edge") || J("Trident") || J("MSIE")
    }, nb = function () {
        return (J("Chrome") || J("CriOS")) && !lb() && !mb()
    };
    var K = function () {
        return J("Edge")
    };
    var ob = lb(), L = mb(), M = J("Gecko") && !(-1 != I.toLowerCase().indexOf("webkit") && !K()) && !(J("Trident") || J("MSIE")) && !K(), pb = -1 != I.toLowerCase().indexOf("webkit") && !K(), qb = function () {
        var a = I;
        if (M)return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (L && K())return /Edge\/([\d\.]+)/.exec(a);
        if (L)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (pb)return /WebKit\/(\S+)/.exec(a)
    }, rb = function () {
        var a = l.document;
        return a ? a.documentMode : void 0
    }, sb = function () {
        if (ob && l.opera) {
            var a = l.opera.version;
            return u(a) ? a() : a
        }
        var a = "", b =
            qb();
        b && (a = b ? b[1] : "");
        return L && !K() && (b = rb(), b > parseFloat(a)) ? String(b) : a
    }(), tb = {}, N = function (a) {
        return tb[a] || (tb[a] = 0 <= va(sb, a))
    }, ub = l.document, vb = rb(), wb = !ub || !L || !vb && K() ? void 0 : vb || ("CSS1Compat" == ub.compatMode ? parseInt(sb, 10) : 5);
    L && N("9");
    !pb || N("528");
    M && N("1.9b") || L && N("8") || ob && N("9.5") || pb && N("528");
    M && !N("8") || L && N("9");
    var O = function (a, b, c) {
        ab.call(this);
        this.hd = a;
        this.ad = b;
        this.Xc = c;
        this.Mc = v(this.ld, this)
    };
    (function () {
        function a() {
        }

        a.prototype = ab.prototype;
        O.ud = ab.prototype;
        O.prototype = new a;
        O.Gd = function (a, c, d) {
            for (var e = Array(arguments.length - 2), f = 2; f < arguments.length; f++)e[f - 2] = arguments[f];
            return ab.prototype[c].apply(a, e)
        }
    })();
    h = O.prototype;
    h.Ha = !1;
    h.lb = 0;
    h.ba = null;
    h.Qb = function () {
        this.ba || this.lb ? this.Ha = !0 : xb(this)
    };
    h.stop = function () {
        this.ba && (l.clearTimeout(this.ba), this.ba = null, this.Ha = !1)
    };
    h.pause = function () {
        this.lb++
    };
    h.Sa = function () {
        O.ud.Sa.call(this);
        this.stop()
    };
    h.ld = function () {
        this.ba = null;
        this.Ha && !this.lb && (this.Ha = !1, xb(this))
    };
    var xb = function (a) {
        var b;
        b = a.Mc;
        var c = a.ad;
        if (!u(b))if (b && "function" == typeof b.handleEvent)b = v(b.handleEvent, b); else throw Error("Invalid listener argument");
        b = 2147483647 < c ? -1 : l.setTimeout(b, c || 0);
        a.ba = b;
        a.hd.call(a.Xc)
    };
    ib("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    ib("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    ib("embed", "iframe", "link", "object", "script", "style", "template");
    var P = function (a, b) {
        this.x = n(a) ? a : 0;
        this.y = n(b) ? b : 0
    };
    P.prototype.clone = function () {
        return new P(this.x, this.y)
    };
    P.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    P.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    P.prototype.translate = function (a, b) {
        a instanceof P ? (this.x += a.x, this.y += a.y) : (this.x += a, r(b) && (this.y += b));
        return this
    };
    var Q = function (a, b) {
        this.width = a;
        this.height = b
    };
    Q.prototype.clone = function () {
        return new Q(this.width, this.height)
    };
    Q.prototype.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    Q.prototype.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var yb = !L || L && (K() || 9 <= wb);
    !M && !L || L && L && (K() || 9 <= wb) || M && N("1.9.1");
    L && N("9");
    var Ab = function (a) {
        return a ? new zb(R(a)) : ja || (ja = new zb)
    }, Cb = function (a) {
        var b = document;
        return b.querySelectorAll && b.querySelector ? b.querySelectorAll("." + a) : Bb("*", a, void 0)
    }, Bb = function (a, b, c) {
        var d = document;
        c = c || d;
        var e = a && "*" != a ? a.toUpperCase() : "";
        if (c.querySelectorAll && c.querySelector && (e || b))return c.querySelectorAll(e + (b ? "." + b : ""));
        if (b && c.getElementsByClassName) {
            a = c.getElementsByClassName(b);
            if (e) {
                c = {};
                for (var f = d = 0, g; g = a[f]; f++)e == g.nodeName && (c[d++] = g);
                c.length = d;
                return c
            }
            return a
        }
        a = c.getElementsByTagName(e ||
        "*");
        if (b) {
            c = {};
            for (f = d = 0; g = a[f]; f++) {
                var e = g.className, k;
                if (k = "function" == typeof e.split)k = 0 <= Ra(e.split(/\s+/), b);
                k && (c[d++] = g)
            }
            c.length = d;
            return c
        }
        return a
    }, Eb = function (a, b) {
        db(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Db ? a.setAttribute(Db[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }, Db = {
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
    }, Fb = function (a) {
        var b = pb || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView;
        return L && N("10") && a.pageYOffset != b.scrollTop ? new P(b.scrollLeft, b.scrollTop) : new P(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    }, Gb = function (a) {
        return a ? a.parentWindow || a.defaultView : window
    }, Ib = function (a, b, c) {
        var d = arguments, e = document, f = d[0], g = d[1];
        if (!yb && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', ta(g.name), '"');
            if (g.type) {
                f.push(' type="', ta(g.type), '"');
                var k = {};
                hb(k, g);
                delete k.type;
                g = k
            }
            f.push(">");
            f = f.join("")
        }
        f = e.createElement(f);
        g && (p(g) ? f.className = g : "array" == ba(g) ? f.className = g.join(" ") : Eb(f, g));
        2 < d.length && Hb(e, f, d);
        return f
    }, Hb = function (a, b, c) {
        function d(c) {
            c && b.appendChild(p(c) ? a.createTextNode(c) : c)
        }

        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !ca(f) || ea(f) && 0 < f.nodeType ? d(f) : G(Jb(f) ? Wa(f) : f, d)
        }
    }, Kb = function (a) {
        a && a.parentNode &&
        a.parentNode.removeChild(a)
    }, R = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }, Lb = function (a) {
        return a.contentWindow || Gb(a.contentDocument || a.contentWindow.document)
    }, Jb = function (a) {
        if (a && "number" == typeof a.length) {
            if (ea(a))return "function" == typeof a.item || "string" == typeof a.item;
            if (u(a))return "function" == typeof a.item
        }
        return !1
    }, zb = function (a) {
        this.ga = a || l.document || document
    };
    zb.prototype.createElement = function (a) {
        return this.ga.createElement(a)
    };
    zb.prototype.createTextNode = function (a) {
        return this.ga.createTextNode(String(a))
    };
    zb.prototype.appendChild = function (a, b) {
        a.appendChild(b)
    };
    zb.prototype.contains = function (a, b) {
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    };
    var Pb = function () {
        return J("iPad") || J("Android") && !J("Mobile") || J("Silk")
    };
    var S = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    h = S.prototype;
    h.clone = function () {
        return new S(this.top, this.right, this.bottom, this.left)
    };
    h.contains = function (a) {
        return this && a ? a instanceof S ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    h.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    h.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    h.translate = function (a, b) {
        a instanceof P ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, r(b) && (this.top += b, this.bottom += b));
        return this
    };
    var Qb = {}, Sb = function (a, b, c) {
        var d;
        b instanceof P ? (d = b.x, b = b.y) : (d = b, b = c);
        a.style.left = Rb(d, !1);
        a.style.top = Rb(b, !1)
    }, Tb = function (a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        L && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }, Rb = function (a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    };
    var Ub = function (a, b, c) {
        if ("array" == ba(b))for (var d = 0; d < b.length; d++)Ub(a, String(b[d]), c); else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }, Vb = function (a, b, c) {
        for (c = c || 0; c < b.length; c += 2)Ub(b[c], b[c + 1], a);
        return a
    }, Wb = function (a, b) {
        var c = 2 == arguments.length ? Vb([a], arguments[1], 0) : Vb([a], arguments, 1);
        if (c[1]) {
            var d = c[0], e = d.indexOf("#");
            0 <= e && (c.push(d.substr(e)), c[0] = d = d.substr(0, e));
            e = d.indexOf("?");
            0 > e ? c[1] = "?" : e == d.length - 1 && (c[1] = void 0)
        }
        return c.join("")
    };
    !J("Android") || nb() || J("Firefox") || lb();
    nb();
    var Xb = J("Safari") && !(nb() || J("Coast") || lb() || mb() || J("Silk") || J("Android")) && !(J("iPhone") && !J("iPod") && !J("iPad") || J("iPad") || J("iPod"));
    var Yb = function () {
        for (var a = C, b = a, c = 0; a && a != a.parent;)a = a.parent, c++, za(a) && (b = a);
        return b
    };
    var Zb = ["GoogleActiveViewClass", "DfaVisibilityIdentifier"];
    var $b = !1, T = "", ac = function (a) {
        a = a.match(/[\d]+/g);
        if (!a)return "";
        a.length = 3;
        return a.join(".")
    };
    if (navigator.plugins && navigator.plugins.length) {
        var bc = navigator.plugins["Shockwave Flash"];
        bc && ($b = !0, bc.description && (T = ac(bc.description)));
        navigator.plugins["Shockwave Flash 2.0"] && ($b = !0, T = "2.0.0.11")
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var cc = navigator.mimeTypes["application/x-shockwave-flash"];
        ($b = cc && cc.enabledPlugin) && (T = ac(cc.enabledPlugin.description))
    } else try {
        var dc = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), $b = !0, T = ac(dc.GetVariable("$version"))
    } catch (ec) {
        try {
            dc =
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), $b = !0, T = "6.0.21"
        } catch (fc) {
            try {
                dc = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), $b = !0, T = ac(dc.GetVariable("$version"))
            } catch (gc) {
            }
        }
    }
    var hc = T;
    if (B && B.URL)var ic = B.URL, Ja = !(ic && (0 < ic.indexOf("?google_debug") || 0 < ic.indexOf("&google_debug")));
    var U = function (a, b, c, d, e) {
        c = Qa(d || "osd_or_lidar::" + b, c, void 0, void 0, void 0);
        Ba(a, b, c, e);
        return c
    };
    var jc = function (a, b, c) {
        b = b || C;
        a && b.top != b && (b = b.top);
        try {
            var d;
            if (b.document && !b.document.body)d = new Q(-1, -1); else {
                var e;
                if (c)e = new Q(b.innerWidth, b.innerHeight); else {
                    var f = (b || window).document, g = "CSS1Compat" == f.compatMode ? f.documentElement : f.body;
                    e = new Q(g.clientWidth, g.clientHeight)
                }
                d = e
            }
            return d
        } catch (k) {
            return new Q(-12245933, -12245933)
        }
    }, kc = function () {
        return C.outerWidth ? new Q(C.outerWidth, C.outerHeight) : new Q(-12245933, -12245933)
    }, lc = function (a, b) {
        try {
            b.postMessage(a, "*")
        } catch (c) {
        }
    }, mc = function (a,
                      b) {
        if (b) {
            a(b);
            var c = b.frames;
            if (c) {
                var d = c.length, e;
                for (e = 0; e < d; ++e)mc(a, c[e])
            }
        }
    }, qc = function () {
        var a = 0 <= nc ? V() - nc : -1, b = oc ? V() - pc : -1, c, d;
        c = [2E3, 4E3];
        d = [250, 500, 1E3];
        var e = a;
        -1 != b && b < a && (e = b);
        for (var f, a = 0; a < c.length; ++a)if (e < c[a]) {
            f = d[a];
            break
        }
        void 0 === f && (f = d[c.length]);
        return f
    }, rc = (new Date).getTime(), nc = -1, oc = !1, pc = -1, V = function () {
        return (new Date).getTime() - rc
    }, sc = function () {
        var a = Ib("div");
        a.style.cssText = "position:relative;left:0px;top:0px;width:0;height:0;";
        return a
    }, tc = function (a) {
        for (var b; a &&
        a != a.parentElement;) {
            if (b = a.style) {
                var c = a;
                b = c.style[wa()];
                if ("undefined" === typeof b) {
                    b = c.style;
                    var d = Qb.display;
                    if (!d) {
                        var e = wa(), d = e;
                        void 0 === c.style[e] && (e = (pb ? "Webkit" : M ? "Moz" : L ? "ms" : ob ? "O" : null) + xa(e), void 0 !== c.style[e] && (d = e));
                        Qb.display = d
                    }
                    b = b[d] || ""
                }
                b = "none" == b
            }
            if (b)return !0;
            b = a;
            a = a.parentElement
        }
        if (b && (a = R(b))) {
            var f, g;
            try {
                if (f = Gb(a))g = f.frameElement
            } catch (k) {
                return !1
            }
            if (f && g && f != f.parent)return tc(g)
        }
        return !1
    };
    var vc = function (a) {
        this.pd = a || 100;
        uc(this)
    }, xc = function () {
        var a = I;
        return Boolean(/Firefox\//.exec(a) && !/(Tablet|Mobile);/.exec(a) && r(C[wc()]))
    }, uc = function (a) {
        a.Xb = null;
        a.Wb = null;
        a.nb = null;
        a.U = !1;
        a.Ea = !0;
        a.kb = !1;
        a.Dc = null;
        a.oc = null
    }, yc = {ai: 1, ou: 4, zP: 0};
    vc.prototype.N = function (a, b, c, d) {
        if (this.U || !a || "DIV" != a.tagName)return !1;
        a.style.position = "relative";
        var e = Ib("iframe", {frameborder: "no", scrolling: "no", width: 1, height: 1});
        e.style.position = "absolute";
        e.style.opacity = "0.001";
        d && (e.style.zIndex = -999999);
        Sb(e, b);
        a.appendChild(e);
        a = e.contentWindow;
        if (!a || !a.document)return Kb(e), !1;
        b = a.document;
        b.open();
        b.close();
        b = b.documentElement;
        b.style.position = "absolute";
        Sb(b, 0, 0);
        d = 1;
        var f;
        d instanceof Q ? (f = d.height, d = d.width) : f = 1;
        b.style.width = Rb(d, !0);
        b.style.height =
            Rb(f, !0);
        this.Xb = e;
        this.Wb = b;
        this.nb = a;
        this.U = !0;
        this.Dc = c;
        return !0
    };
    yc.n = 5;
    vc.prototype.qa = function () {
        if (this.U && this.Ea) {
            var a, b, c = v(function () {
                var d, e, f = this.nb[wc()];
                n(b) && (d = f > b, d !== a && (e = v(this.Dc, this, d)), a = d);
                b = f;
                this.Wb.style.opacity = this.kb ? .1 : .2;
                this.kb = !this.kb;
                this.oc = C.setTimeout(E("osd_or_lidar::ppsamp_to", c), this.pd);
                e && e()
            }, this);
            this.Ea = !1;
            c()
        }
    };
    var zc = {t: 6, tC: 3, n: 2}, Ac = function (a) {
        a.U && !a.Ea && (C.clearTimeout(a.oc), a.Ea = !0)
    };
    vc.prototype.Ja = function () {
        this.U && (Ac(this), Kb(this.Xb), this.U = !1, uc(this))
    };
    var wc = function (a) {
        var b = !1, c;
        return function () {
            b || (c = a(), b = !0);
            return c
        }
    }(function () {
        zc.mo = -1;
        var a = [], b = function (b, d) {
            a[b + 1] = d
        };
        db(yc, b);
        db(zc, b);
        return a.join("")
    }), Bc = function (a) {
        this.pb = a || 5E3;
        this.I = null;
        this.ab = !1;
        this.Ma = this.za = null;
        this.Za = this.Ya = !1;
        this.cb = null;
        this.lc = new O(v(this.Wc, this), 100);
        this.ka = !1;
        this.O = -1;
        this.vb = this.rb = this.ya = 0;
        this.pc = function () {
        }
    }, Cc = function (a, b, c, d, e) {
        this.wd = a;
        this.ic = b;
        this.fa = c;
        this.W = d;
        this.Tb = e
    };
    Bc.prototype.N = function (a, b, c, d) {
        var e = l.navigator || null;
        if (!(e && e.mimeTypes && e.mimeTypes["application/x-pnacl"] && a) || "DIV" != a.tagName)return !1;
        e = R(a).createElement("embed");
        e.setAttribute("width", c);
        e.setAttribute("height", b);
        e.setAttribute("src", "//www.gstatic.com/osd/hb.nmf?v=3");
        e.setAttribute("type", "application/x-pnacl");
        Dc(e, "load", v(this.Sb, this));
        Dc(e, "message", v(this.Qc, this));
        Dc(e, "loadstart", v(this.Pc, this));
        Dc(e, "crash", v(this.Nc, this));
        e.style.visibility = "hidden";
        e.style.opacity = 0;
        e.style.zIndex = -999999;
        this.Ya = this.ab = this.Za = !1;
        Sb(e, new P(0, 0));
        e.style.position = "absolute";
        b = sc();
        c = !0;
        try {
            b.appendChild(e), a.insertBefore(b, a.childNodes[0] || null)
        } catch (f) {
            c = !1
        }
        if (a = c)this.rb = w(), this.I = e, this.pc = d;
        return a
    };
    var Dc = function (a, b, c) {
        U(a, b, c, "osd_or_lidar::pnacl::" + b, !0)
    };
    Bc.prototype.update = function () {
        var a = this.O;
        this.ka && (this.ka = !1, this.O = 0);
        Ec(this, a);
        if (this.I && !this.Za && u(this.I.postMessage))try {
            this.I.postMessage("", "*")
        } catch (b) {
        }
    };
    Bc.prototype.pause = function () {
        this.ka = !0;
        Ec(this, this.O)
    };
    var Fc = function (a) {
        if (a.I)try {
            Kb(a.I)
        } catch (b) {
        }
        a.I = null;
        a.O = -1
    }, Ec = function (a, b) {
        if (isFinite(b) && !isNaN(b) && (!(0 > b || 1 < b) || -1 == b)) {
            var c = w(), d = new Cc(a.ka ? 0 : b, a.O, 0 < a.ya ? c - a.ya : 0, !a.ab && c - a.rb > a.pb, a.Ya);
            a.O = b;
            a.ya = c;
            a.pc(d)
        }
    };
    h = Bc.prototype;
    h.Sb = function () {
        null == this.Ma && (this.Ma = this.vb ? w() - this.vb : 0);
        null == this.za && (this.za = w() - this.rb);
        this.ab = !0
    };
    h.Pc = function () {
        this.vb = w()
    };
    h.Nc = function () {
        this.Ya = !0;
        Ec(this, -1);
        Fc(this)
    };
    h.Qc = function (a) {
        this.cb = String(a.data);
        this.lc && this.lc.Qb()
    };
    h.Wc = function () {
        this.Za = !0;
        this.Sb();
        var a = this.cb / 100;
        this.cb = null;
        this.ka ? this.O = a : Ec(this, a)
    };
    var Gc = function (a, b) {
            this.rd = a || 3E3;
            this.pb = b || 3E3;
            this.p = "u";
            this.Qa = null;
            this.h = [];
            this.Fb = !1;
            this.H = -1;
            this.ua = this.ya = 0
        }, Hc = function (a, b, c) {
            this.Ia = a;
            this.gc = b;
            this.fa = c
        }, Lc = function (a, b, c) {
            if (!(b && b.getBoundingClientRect && 0 <= va(hc, "11") && c) || L && 9 > sb || 0 < a.h.length)return !1;
            try {
                var d = b.getBoundingClientRect()
            } catch (e) {
                return !1
            }
            var f = "DIV" == b.tagName, g = R(b), k = [];
            if (f) {
                var m = sc(), d = Ic(d);
                G(d, function (a, b) {
                    var d = new Jc("e", g, c, String(b));
                    this.h.push(d);
                    k.push(v(d.$c, d, m, a))
                }, a);
                b.insertBefore(m, b.childNodes[0] ||
                null)
            } else d = Kc(a, d), G(d, function (a, d) {
                var e = new Jc("e", g, c, String(d));
                this.h.push(e);
                k.push(v(e.Zc, e, b, a))
            }, a);
            var t = !0;
            G(k, function (a) {
                t = t && a()
            });
            t ? (a.p = "l", a.Qa = b, a.Fb = !f) : (G(a.h, function (a) {
                a.remove()
            }), a.h = []);
            return t
        }, Ic = function (a) {
            return [new P(Math.floor((a.right - a.left) / 2), Math.floor((a.bottom - a.top) / 2))]
        }, Kc = function (a, b) {
            var c;
            try {
                c = b || a.Qa.getBoundingClientRect()
            } catch (d) {
                c = new S(0, 0, 0, 0)
            }
            var e = Ic(c);
            G(e, function (a) {
                a.x += c.left;
                a.y += c.top
            });
            return e
        }, Nc = function (a) {
            if (a.Qa && a.Fb) {
                var b =
                    Kc(a);
                G(b, function (a, b) {
                    this.h[b] && Mc(this.h[b], a)
                }, a)
            }
        }, Oc = function (a) {
            G(a.h, function (a) {
                a.remove()
            });
            a.h = [];
            a.p = "d"
        }, Sc = function (a) {
            var b = (new Date).getTime(), c = a.hc ? b - a.hc : 0, d = -1;
            4 == a.h.length ? (d = Ta(a.h, function (a) {
                return Pc(a, b)
            }), d = Qc(d)) : 1 == a.h.length && (d = [-1, 0, 1, 2, 3, 5][Pc(a.h[0], b) + 1]);
            a.ua = d == a.H ? a.ua + c : 0;
            c = new Hc(d, a.H, c);
            a.H = d;
            a.hc = b;
            Rc(a, d);
            Nc(a);
            return c
        }, Qc = function (a) {
            var b = Za(eb(Tc));
            G(a, function (a) {
                0 <= a && ++b[a]
            });
            return 4 == b[4] ? 6 : 3 <= b[4] ? 5 : 0 < b[4] ? 4 : 4 == b[2] ? 2 : 4 == b[1] ? 1 : 4 == b[0] ? 0 : 3
        },
        Rc = function (a, b) {
            0 == b && a.W() ? a.p = "n" : a.p = "dlfcrrrr".split("")[b + 1]
        }, Uc = function (a) {
            return "f" == a.p && a.ua >= a.rd
        };
    Gc.prototype.W = function () {
        return "n" == this.p ? !0 : "l" == this.p && this.ua >= this.pb
    };
    var Jc = function (a, b, c, d) {
        this.d = null;
        this.wb = a;
        this.Vb = "e" == a ? String(c) + "~" + String(d) : "";
        this.M = [];
        this.Y = -1;
        this.bb = 0;
        this.Fa = Za(eb(Vc));
        this.td = Za(eb(Tc));
        "e" == this.wb && (Wc[this.Vb] = v(this.Vc, this));
        L ? (a = b.createElement("div"), a.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" style="opacity:0;-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(opacity=0)\';filter:alpha(opacity=0)"><param name="movie" value="' + Xc(this, !0) + '"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param></object>',
            a = a.firstChild, a.id = String(Math.random())) : a = Yc(this, b);
        a.width = 1;
        a.height = 1;
        a.style.zIndex = -999999;
        this.d = a
    }, Tc = {Fd: -1, LOADING: 0, Hc: 1, Gc: 2, xd: 3, VISIBLE: 4}, Vc = {
        LOADING: 0,
        Hc: 1,
        Gc: 2,
        Bd: 3,
        yd: 4,
        Dd: 5,
        Ed: 6,
        Cd: 7,
        zd: 8,
        Ad: 9
    }, Wc = {}, Yc = function (a, b) {
        var c = function (a, c, d) {
            var e = b.createElement("param");
            e.name = c;
            e.value = d;
            a.appendChild(e)
        }, d = Xc(a), e = b.createElement("object");
        e.type = "application/x-shockwave-flash";
        e.data = d;
        c(e, "movie", d);
        c(e, "allowscriptaccess", "always");
        c(e, "wmode", "opaque");
        e.style.visibility =
            "hidden";
        e.style.opacity = 0;
        return e
    }, Xc = function (a, b) {
        var c = "//www.gstatic.com/osd/hbt.swf";
        "e" == a.wb && (c = Wb("//www.gstatic.com/osd/hbe.swf", "id", a.Vb));
        b && (c = Wb(c, "delay", "1"));
        return c
    };
    Jc.prototype.$c = function (a, b) {
        if (!this.d)return !1;
        this.d.style.position = "absolute";
        Mc(this, b);
        var c = !0;
        try {
            a.appendChild(this.d)
        } catch (d) {
            c = !1
        }
        return c
    };
    Jc.prototype.Zc = function (a, b) {
        if (!this.d || !a.parentNode)return !1;
        this.d.style.position = "fixed";
        Mc(this, b);
        var c = !0;
        try {
            a.parentNode && a.parentNode.insertBefore(this.d, a.nextSibling)
        } catch (d) {
            c = !1
        }
        return c
    };
    var Mc = function (a, b) {
        var c;
        if (c = a.d)c = a.d, c = new P(c.offsetLeft, c.offsetTop), c = !(b == c || b && c && b.x == c.x && b.y == c.y);
        c && Sb(a.d, b)
    };
    Jc.prototype.remove = function () {
        if (this.d)try {
            Kb(this.d)
        } catch (a) {
        }
        this.d = null
    };
    Jc.prototype.Vc = function (a) {
        this.Y = a ? 3 : 4
    };
    var Pc = function (a, b) {
        if ("e" == a.wb) {
            var c = null;
            try {
                c = a.d.it()
            } catch (d) {
            }
            null === c ? (c = 0, 0 < a.Y && (c = 2)) : c = c ? 3 : 4;
            ++a.td[c + 1];
            a.Y = c
        } else {
            var e = Number(b), f = null;
            try {
                f = a.d.fc()
            } catch (g) {
            }
            Zc(a, f, e);
            c = a.M[a.M.length - 1];
            if (null === f) {
                if (f = e = 0, 0 < a.Y || r(c.La))f = e = 2
            } else null === c.La || c.sb >= e ? (e = 10 <= f ? 4 : 0, f = 0) : f > c.La ? (c = (f - c.La) / (e - c.sb) * 1E3, e = 10 <= c ? 4 : 3, c = 0 == c ? 1 : 1 > c ? 3 : 4 > c ? 4 : 23 > c ? 6 : 26 > c ? 8 : 9, 6 == a.bb && 6 == c && (c = 7), f = c) : f = e = 1;
            6 == a.bb && (--a.Fa[6], 4 == f || 8 == f ? ++a.Fa[5] : ++a.Fa[7]);
            ++a.Fa[f];
            a.Y = e;
            a.bb = f
        }
        return a.Y
    }, Zc = function (a,
                      b, c) {
        var d = c - 1E3, e = a.M.length;
        G(a.M, function (a, b) {
            a.sb <= d && (e = Math.min(e, b + 1))
        });
        var f = a.M.length - e;
        0 < f && a.M.splice(e, f);
        a.M.unshift({La: b, sb: c})
    }, $c = Qa("osd_or_lidar::gteh_ex", function (a, b) {
        var c = Wc[a];
        u(c) && c(b)
    }), ad = ["gteh"], W = l;
    ad[0]in W || !W.execScript || W.execScript("var " + ad[0]);
    for (var bd; ad.length && (bd = ad.shift());)!ad.length && n($c) ? W[bd] = $c : W = W[bd] ? W[bd] : W[bd] = {};
    var cd = function (a, b) {
        this.r = a || 0;
        this.q = b || ""
    };
    cd.prototype.match = function (a) {
        return (this.r || this.q) && (a.r || a.q) ? this.q || a.q ? this.q == a.q : this.r || a.r ? this.r == a.r : !1 : !1
    };
    cd.prototype.toString = function () {
        var a = "" + this.r;
        this.q && (a += "-" + this.q);
        return a
    };
    var dd = function (a) {
        var b = [];
        db(a, function (a, d) {
            var e = D(d), f = a;
            p(f) && (f = D(f));
            b.push(e + "=" + f)
        });
        return b.join("\n")
    };
    var X = function (a, b, c, d, e, f) {
        this.a = ed.clone();
        this.k = this.m = 0;
        this.Oa = new S(0, 0, 0, 0);
        this.tc = this.vc = this.Ka = -1;
        this.ub = [0, 0, 0, 0, 0];
        this.Z = [0, 0, 0, 0, 0];
        this.w = [0, 0, 0, 0, 0];
        this.Ob = 0;
        this.zoom = [0, 0, 0, 0, 0];
        this.Gb = "";
        this.la = d;
        this.na = this.ma = -1;
        this.mb = 0;
        this.Eb = b;
        this.v = c && c._adk_ ? c._adk_ : 0;
        this.Lc = null;
        this.f = e;
        this.Aa = function () {
        };
        this.ra = function () {
        };
        this.g = this.element = c;
        this.Yc = 0;
        this.ob = "";
        this.da = c ? String(c._avi_ || "") : "";
        this.Kc = c ? String(c._avihost_ || "") : "";
        this.cc = c ? Boolean(c._ismobileweb_) :
            !1;
        this.Pb = c ? Boolean(c._eos_) : !1;
        this.ha = c ? Boolean(c._imm_) : !1;
        this.jc = 0;
        this.gd = [];
        this.Ec = !1;
        this.nc = "";
        this.l = {};
        this.l.le = 0;
        this.l.nt = 2;
        this.l.Fr = 3;
        this.j = this.Ta = null;
        this.Ua = !1;
        this.B = this.c = null;
        this.Va = 0;
        this.T = null;
        this.ia = !1;
        this.b = null;
        this.aa = "";
        this.$ = this.u = null;
        this.ib = 0;
        this.K = null;
        this.F = this.ja = !1;
        this.J = this.C = null;
        this.hb = !1;
        this.A = this.pa = this.Ba = null;
        this.wa = 0;
        this.sa = !1;
        this.S = null;
        this.V = !1;
        this.ca = null;
        this.Pa = 0;
        this.ta = !1;
        this.P = null;
        this.Fc = 0;
        this.Cb = null;
        this.xa = this.G =
            this.X = !1;
        this.sd = .01 > Math.random();
        this.qd = this.L = null;
        this.Ra = c ? String(c._cvu_ || "") : "";
        this.Mb = !1;
        this.Db = c ? String(c._cid_ || "") : "";
        this.Q = this.D = !1;
        this.Bb = [];
        this.Cc = this.zc = void 0;
        this.Ac = 0;
        this.tb = -1;
        this.kc = this.ea = 0;
        this.ec = void 0;
        this.Ib = this.Hb = this.Bc = 0;
        this.jb = !1;
        this.dc = -1;
        this.cd = this.Zb = !1;
        this.Yb = 0;
        this.R = {gb: null, fb: null};
        this.Nb = this.bd = !1;
        this.o = c && c._tos_ ? !0 : !1;
        this.qb = !0;
        this.sc = this.vd = this.uc = -1;
        this.Rb = 0;
        this.s = {xb: 0, zb: 0, yb: 0};
        this.Wa = 1 != this.f ? 0 : Aa([1, 2], .5) || 0;
        fd(this, c &&
        c._avm_);
        gd(this, a, f)
    }, ed = new S(0, 0, 0, 0), fd = function (a, b) {
        if (p(b) && 0 != b.length)for (var c = b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d], f = ia;
            e == f.Jc && (a.qb = !1);
            e == f.Ic && (a.o = !0)
        }
    }, id = function (a, b, c, d) {
        var e = a.qd, f = null, f = new S(-12245933, -12245933, -12245933, -12245933);
        d || (a.a = f, e && (a.m = e.width * e.height));
        hd(a, f, b, c, d, !0)
    }, jd = function (a, b, c, d, e) {
        if (!(0 > a.la)) {
            var f = C.innerWidth, g = C.innerHeight, k = new S(Math.round(C.mozInnerScreenY), Math.round(C.mozInnerScreenX + f), Math.round(C.mozInnerScreenY + g), Math.round(C.mozInnerScreenX));
            c = new S(C.screenY + d, C.screenX + c.width, C.screenY + c.height, C.screenX);
            e || (d = new S(k.top - c.top, k.right - c.left, k.bottom - c.top, k.left - c.left), d.top > a.a.top ? a.a = d : (a.a.right = a.a.left + f, a.a.bottom = a.a.top + g), a.m = f * g);
            hd(a, k, c, b, e, !0)
        }
    }, ld = function (a, b, c) {
        var d = kd(a, C && C.document);
        if (d) {
            c || gd(a, C, !0);
            var e = Math.floor((a.a.left + a.a.right) / 2), f = Math.floor((a.a.top + a.a.bottom) / 2), g = Fb(document), d = d(e - g.x, f - g.y) ? .5 : 0;
            hd(a, a.a, d, b, c, !0)
        }
    }, kd = function (a, b) {
        md(a);
        if (!a.Ta) {
            var c = [];
            G(fb(a.l), function (a) {
                c[this.l[a] +
                1] = a
            }, a);
            var d = c.join(""), d = b && b[d];
            a.Ta = d && v(d, b)
        }
        return a.Ta
    }, md = function (a) {
        a.l.e = -1;
        a.l.i = 6;
        a.l.n = 7;
        a.l.t = 8
    };
    X.prototype.update = function (a, b, c, d, e) {
        if (0 > this.la)return null;
        c || gd(this, d, e);
        Boolean(this.c) && (c ? (this.c && (e = this.c, 3 <= e.H && (e.H = 3)), d.clearInterval(this.B), this.B = null) : this.c && !this.B && "d" != this.c.p && od(this, d, !0));
        Boolean(this.u) && (c ? (this.u && this.u.pause(), d.clearInterval(this.$), this.$ = null) : this.u && !this.$ && this.ja && pd(this, d, !0));
        null != this.S && (c ? (d.clearInterval(this.A), this.A = null, this.sa = !1) : this.V && !this.A && qd(this, d, !0));
        null !== this.J && (c ? this.F && (this.mc(d, !1), this.C && Ac(this.C)) :
        this.F && this.C && this.C.qa());
        null != this.P && "-" != this.P && (c ? (d.clearInterval(this.ca), this.ca = null, this.ta = !1) : this.X && !this.ca && rd(this, d, !0));
        return hd(this, this.a, b, a, c, !1)
    };
    var sd = function (a, b) {
        if (!a.jb || 1E3 < b - a.dc) {
            var c = aa("ima.bridge.getNativeViewability");
            u(c) && (c(a.ob, v(a.Tc, a)), a.jb = !0, a.dc = b)
        }
    };
    X.prototype.Tc = function (a) {
        this.jb = !1;
        td(this, a)
    };
    var td = function (a, b) {
        var c = b.opt_nativeViewBounds || {}, d = b.opt_nativeViewVisibleBounds || {}, e = b.opt_nativeTime || -1, f = b.opt_nativeVolume, c = new S(c.top || 0, c.left + c.width || 0, c.top + c.height || 0, c.left || 0), d = b.opt_nativeViewHidden ? ed.clone() : new S(d.top || 0, d.left + d.width || 0, d.top + d.height || 0, d.left || 0);
        a.m = (c.bottom - c.top) * (c.right - c.left);
        a.a = c;
        hd(a, c, d, e, !1, !0, f)
    }, hd = function (a, b, c, d, e, f, g) {
        var k = d - a.la || 1, m = null;
        r(c) ? b = ud(a, c) : (m = c, b = ud(a, b, m));
        a.zc || vd(a, b, k, a.ma, f, e, m, g);
        a.ma = e ? -1 : b;
        a.la = d;
        -1 != b && (0 >
        a.Ka && (a.Ka = d), a.tc = d);
        -1 == a.vc && Y(a) && (a.vc = d);
        a.Aa(a, m || ed);
        return a.k
    }, ud = function (a, b, c) {
        if (a.cd)return a.k = 0, wd(a.k);
        if (a.Zb && 7 == a.f)return a.k = 1, wd(a.k);
        var d = null;
        if (r(b))a.k = b; else {
            c = new S(Math.max(b.top, c.top), Math.min(b.right, c.right), Math.min(b.bottom, c.bottom), Math.max(b.left, c.left));
            if (0 >= a.m || c.top >= c.bottom || c.left >= c.right)return a.Oa = new S(0, 0, 0, 0), a.k = 0, -1;
            a.Oa = c.clone().translate(-b.left, -b.top);
            d = (c.bottom - c.top) * (c.right - c.left);
            a.k = d / a.m
        }
        return wd(a.k)
    }, wd = function (a) {
        var b =
            -1;
        1 <= a ? b = 0 : .75 <= a ? b = 1 : .5 <= a ? b = 2 : .25 <= a ? b = 3 : 0 < a && (b = 4);
        return b
    }, vd = function (a, b, c, d, e, f, g, k) {
        e = e && -1 != d && 2 >= d;
        var m = -1 == d || -1 == b ? -1 : Math.max(d, b);
        d = e ? m : d;
        -1 != d && (a.ub[d] += c, 2 >= d && (a.Ob += c));
        (e = g || null) ? (-1 != d && 2 >= d && -1 != a.na && (a.zoom[a.na] += c), e = 100 * a.m / ((e.bottom - e.top) * (e.right - e.left)), a.na = 20 <= e ? 0 : 10 <= e ? 1 : 5 <= e ? 2 : 2.5 <= e ? 3 : 4) : a.na = -1;
        (g = g || null) ? (g = (g.bottom - g.top) * (g.right - g.left), a.mb = 0 < g ? a.m * a.k / g : 0) : a.mb = 0;
        if (7 == a.f) {
            k = n(k) ? k : xd(a);
            g = -1 != d && 2 >= d;
            e = .1 <= k && .1 <= a.ec;
            a.Bc += c;
            e && (a.Hb += c, g ? a.Ib +=
                c : a.ea += c);
            a.ea > a.kc && (a.kc = a.ea);
            if (g || !n(k) || .1 > k)a.ea = 0;
            n(k) && (Number(k) ? (g = Math.pow(10, 3), k = Math.round(k * g) / g) : k = 0);
            a.ec = k
        }
        for (; 0 <= d && 4 >= d; d++)a.w[d] += c, a.w[d] > a.Z[d] && (a.Z[d] = a.w[d]);
        for (d = 0; d < a.w.length; ++d)if (d < b || f || -1 == b)a.w[d] = 0
    };
    X.prototype.Sc = function (a) {
        var b = wd(a.wd);
        vd(this, b, a.fa, wd(a.ic), !1, !1);
        this.ma = b;
        Y(this) && (this.Aa(this, ed), this.o || Fc(this.b));
        a.Tb ? (this.aa = "c", this.ra(this), this.o = !1, Fc(this.b)) : a.W && (this.aa = "l", this.ra(this), this.o = !1, Fc(this.b))
    };
    var yd = function (a) {
        a.j && Oc(a.j)
    }, od = function (a, b, c) {
        a.B = b.setInterval(E("osd_or_lidar::adblock::flv_int", v(a.rc, a, b)), 1E3);
        c && a.rc(b)
    };
    X.prototype.rc = function (a) {
        if (this.c) {
            var b = Sc(this.c);
            this.Va = 5 <= b.Ia && 5 <= b.gc ? this.Va + b.fa : 0;
            if (1E3 <= this.Va)a.clearInterval(this.B), this.B = null, this.ia = !1, this.c && Oc(this.c), this.T = "v"; else if (2 == b.Ia || this.c.W() || Uc(this.c))a.clearInterval(this.B), this.B = null, this.ia = !1, this.c && Oc(this.c), this.T = "i"
        }
    };
    var pd = function (a, b, c) {
        a.$ = b.setInterval(E("osd_or_lidar::adblock::nclv_int", v(a.xc, a)), 1E3);
        c && a.xc()
    };
    X.prototype.xc = function () {
        this.u && this.u.update()
    };
    X.prototype.Rc = function (a, b) {
        var c = wd(b.ic);
        this.ib = -1 != c && 2 >= c ? this.ib + b.fa : 0;
        1E3 <= this.ib ? (zd(this, a), this.K = "v") : b.Tb ? (this.aa = "c", zd(this, a), this.K = "i") : b.W && (this.aa = "l", zd(this, a), this.K = "i")
    };
    var zd = function (a, b) {
        b.clearInterval(a.$);
        a.$ = null;
        a.ja = !1;
        a.u && Fc(a.u)
    }, qd = function (a, b, c) {
        a.A = b.setInterval(E("osd_or_lidar::adblock::iem_int", v(a.wc, a, b, 1E3)), 1E3);
        c && a.wc(b)
    };
    X.prototype.wc = function (a, b) {
        var c = kd(this, a && a.document);
        if (c) {
            gd(this, a, !0);
            var d = Math.floor((this.a.left + this.a.right) / 2), e = Math.floor((this.a.top + this.a.bottom) / 2), f = Fb(document), c = Boolean(c(d - f.x, e - f.y)), d = b || 0;
            c ? (this.wa += this.sa ? d : 0, this.sa = !0) : (this.wa = 0, this.sa = !1);
            1E3 <= this.wa && (a.clearInterval(this.A), this.A = null, this.V = !1, this.S = "v");
            gd(this, a, !1)
        } else a.clearInterval(this.A), this.A = null, this.V = !1, this.S = "i"
    };
    var Ad = function (a, b, c) {
        b.clearTimeout(a.Ba);
        a.Ba = b.setTimeout(E("osd_or_lidar::adblock::mppv_to", v(a.kd, a, b)), c)
    };
    X.prototype.kd = function (a) {
        if (null !== this.pa) {
            var b = w() - this.pa;
            1E3 <= b ? (this.J = "v", this.F = !1, a.clearTimeout(this.Ba), this.C && (this.C.Ja(), this.C = null)) : Ad(this, a, 1E3 - b)
        }
    };
    X.prototype.mc = function (a, b) {
        b && null === this.pa ? (this.pa = w(), Ad(this, a, 1E3)) : (this.pa = null, a.clearTimeout(this.Ba))
    };
    var rd = function (a, b, c) {
        a.ca = b.setInterval(E("osd_or_lidar::adblock::xdev_int", v(a.yc, a, b, 1E3)), 1E3);
        c && a.yc(b)
    };
    X.prototype.yc = function (a, b) {
        if (this.Cb) {
            var c = this.Cb.contentWindow, d = this.a.right - this.a.left, e = this.a.bottom - this.a.top, f = this.Fc, g = kc(), k = new S(Math.round(c.mozInnerScreenY), Math.round(c.mozInnerScreenX + d), Math.round(c.mozInnerScreenY + e), Math.round(c.mozInnerScreenX)), c = new S(c.screenY + f, c.screenX + g.width, c.screenY + g.height, c.screenX), k = new S(Math.max(k.top, c.top), Math.min(k.right, c.right), Math.min(k.bottom, c.bottom), Math.max(k.left, c.left)), e = d * e, d = 0;
            0 < e && k.top < k.bottom && k.left < k.right && (d = (k.bottom -
            k.top) * (k.right - k.left) / e);
            e = b || 0;
            .5 <= d ? (this.Pa += this.ta ? e : 0, this.ta = !0) : (this.Pa = 0, this.ta = !1);
            1E3 <= this.Pa && (a.clearInterval(this.ca), this.ca = null, this.X = !1, this.P = "v")
        }
    };
    var gd = function (a, b, c) {
        b = c ? b : b.top;
        try {
            var d = ed.clone(), e = new P(0, 0);
            if (a.g) {
                if (c || 2 != a.Wa || !tc(a.g))d = a.g.getBoundingClientRect();
                if (c || !b.frameElement) {
                    var f = a.g, g = new P(0, 0), k = Gb(R(f));
                    c = f;
                    do {
                        var m;
                        if (k == b) {
                            var f = c, t = R(f), q = new P(0, 0), y = void 0, y = t ? R(t) : document, z;
                            (z = !L || L && (K() || 9 <= wb)) || (z = "CSS1Compat" == Ab(y).ga.compatMode);
                            if (f != (z ? y.documentElement : y.body)) {
                                var da = Tb(f), oa, Mb = Ab(t);
                                oa = Fb(Mb.ga);
                                q.x = da.left + oa.x;
                                q.y = da.top + oa.y
                            }
                            m = q
                        } else {
                            var Nb = Tb(c);
                            m = new P(Nb.left, Nb.top)
                        }
                        f = m;
                        g.x += f.x;
                        g.y +=
                            f.y
                    } while (k && k != b && k != k.parent && (c = k.frameElement) && (k = k.parent));
                    e = g
                }
            }
            var Ob = e.x, nd = e.y, Ee = d.right - d.left, Fe = d.bottom - d.top;
            a.a = new S(Math.round(nd), Math.round(Ob + Ee), Math.round(nd + Fe), Math.round(Ob))
        } catch (bf) {
            a.a = ed.clone()
        } finally {
            a.l.Po = 5, a.l.me = 1, a.l.om = 4
        }
        a.m = (a.a.bottom - a.a.top) * (a.a.right - a.a.left);
        2 != a.f && 3 != a.f && 6 != a.f || 0 != a.m ? (a.xa = !1, a.L = null) : (a.xa = !0, a.g && a.g.parentElement && a.sd && (d = a.g.parentElement.getBoundingClientRect(), a.L = new S(d.top, d.right, d.bottom, d.left)))
    }, Y = function (a) {
        return 1E3 <=
            Math.max(a.w[2], a.Z[2])
    };
    X.prototype.getStats = function () {
        var a = this.a, a = ["p=" + a.top + "," + a.left + "," + a.bottom + "," + a.right];
        a.push("tos=" + this.ub.join(","));
        a.push("mtos=" + this.Z.join(","));
        a.push("rs=" + this.f);
        var b = 5 == this.f || 6 == this.f;
        b || a.push("ht=" + this.Yc);
        0 <= this.Ka && (a.push("tfs=" + this.Ka), a.push("tls=" + this.tc));
        this.da && a.push("avi=" + this.da);
        this.Db && a.push("cid=" + this.Db);
        this.S && a.push("iemv=" + this.S);
        this.J && (a.push("mppv=" + this.J), a.push("mppz=" + (this.hb ? "1" : "0")));
        this.P && a.push("xdev=" + this.P);
        this.b && (a.push("ncl=1"),
        this.b.za && a.push("nclt=" + this.b.za), this.b.Ma && a.push("nctt=" + this.b.Ma));
        this.K && a.push("nclv=" + this.K);
        this.aa && a.push("ncldbg=" + this.aa);
        this.j ? a.push("swf=" + this.j.p) : this.Ua && a.push("swf=-");
        this.T && a.push("swfv=" + (this.c ? this.c.p : "") + this.T);
        this.nc && a.push("fp=" + D(this.nc));
        7 == this.f && a.push("qid=" + this.ob);
        this.Gb && a.push("afp=" + D(this.Gb));
        b && (this.Bb && 0 != this.Bb.length && a.push("qt=" + this.Bb.join(",")), this.Eb && a.push("req=" + D(this.Eb).substring(0, 100)));
        0 != this.Yb && a.push("ipc=" + this.Yb);
        this.Pb && a.push("eop=1");
        this.bd && a.push("ci=1");
        this.Rb && a.push("gte=" + this.Rb);
        -1 < this.uc && (a.push("tmo=" + this.uc), a.push("tme=" + this.vd));
        -1 < this.sc && a.push("tdl=" + this.sc);
        (b = this.s.xb || this.s.zb || this.s.yb ? [this.s.xb, this.s.zb, this.s.yb].join("-") : void 0) && a.push("abd=" + b);
        this.L && a.push("pb=" + this.L.top + "," + this.L.left + "," + this.L.bottom + "," + this.L.right);
        this.Wa && a.push("ha=" + this.Wa);
        return a
    };
    var xd = function (a) {
        if ("as" == a.Cc && u(a.element.sdkVolume))try {
            return Number(a.element.sdkVolume())
        } catch (b) {
            return -1
        }
        if ("h" == a.Cc) {
            var c = aa("ima.common.sdkVolume");
            if (u(c))try {
                return Number(c(a.ob))
            } catch (d) {
                return -1
            }
        }
    }, Bd = function (a) {
        return null != a.Ra && null != a.Ra.match(/\/pagead\/adview\?.*ai=.*&vt=\d+/i) && !a.Mb
    }, Cd = function (a) {
        a.R.gb && (x(a.element, "mouseover", a.R.gb, void 0), a.R.gb = null);
        a.R.fb && (x(a.element, "mouseout", a.R.fb, void 0), a.R.fb = null)
    };
    var Dd = !1;
    var Ed = null, Fd = 0, bb = null, Gd = null, Hd = null, Id = !1, Md = function () {
            if (!Id) {
                Id = !0;
                if (!Ed) {
                    var a;
                    Fd = a = Aa([1, 2], .01) || 0;
                    0 == a || 1 == a ? Ed = U(C, "scroll", Jd, "osd_or_lidar::scroll") : (bb = new O(Jd, 100), a = v(bb.Qb, bb), Ed = U(C, "scroll", a, "osd_or_lidar::throttled_scroll"))
                }
                Gd = Gd || U(C, "resize", Kd, "osd_or_lidar::resize");
                a = Ld;
                var b = Ia();
                b && (Hd = Hd || U(B, b, a, "osd_or_lidar::visibility"));
                Ld()
            }
        }, Pd = function () {
            Id = !1;
            Fa(Ed) && (x(C, "scroll", Ed, void 0), Ed = null);
            bb && (cb(), bb = null);
            Fa(Gd) && (x(C, "resize", Gd, void 0), Gd = null);
            if (Fa(Hd)) {
                var a =
                    Ia();
                a && x(C, a, Hd, void 0);
                Hd = null
            }
            for (var b = 0; b < H.length; ++b)a = H[b], a.element && Cd(a);
            Nd && G(H, function (a) {
                yd(a)
            });
            Od && G(H, function (a) {
                a.b && Fc(a.b)
            })
        }, Kd = function () {
            Qd(!1);
            Jd()
        }, Jd = function () {
            Rd(H, !1)
        }, Zd = function () {
            var a;
            Sd && (Td = jc(!0, C, Sd));
            a = Td;
            var b = Ud, c = Vd;
            if (Wd) {
                a = b;
                Qd(!1);
                var d = Xd, e = d.height - a;
                0 >= e && (e = d.height, a = 0);
                Td = new Q(d.width, e);
                e = new Yd;
                e.ac = !0;
                e.Lb = Td;
                e.Kb = d;
                e.Jb = a;
                return e
            }
            if (c)return a = new Yd, a.$b = !0, a;
            if (Nd)return a = new Yd, a.bc = !0, a;
            if (Od)return a = new Yd, a.dd = !0, a;
            i:{
                b = new Yd;
                b.Lb =
                    a;
                b.$a = !1;
                if (null != a && -1 != a.width && -1 != a.height && -12245933 != a.width && -12245933 != a.height) {
                    try {
                        var c = Sd, f = C || C, f = f.top, e = a || jc(!0, f, c), g, k = Ab(f.document);
                        g = Fb(k.ga);
                        d = -1 == e.width || -12245933 == e.width ? new S(e.width, e.width, e.width, e.width) : new S(g.y, g.x + e.width, g.y + e.height, g.x)
                    } catch (m) {
                        a = b;
                        break i
                    }
                    b.Ab = d;
                    b.$a = !0
                }
                a = b
            }
            return a
        }, Rd = function (a, b) {
            if (!$d)if (window.clearTimeout(ae), ae = null, 0 == a.length)b || be(); else {
                ce = null;
                var c = Zd();
                try {
                    var d = V();
                    if (c.ed)for (var e = 0; e < a.length; e++)n(void 0) ? td(a[e], void 0) :
                        sd(a[e], d); else if (c.ac)for (e = 0; e < a.length; e++)jd(a[e], d, c.Kb, c.Jb, b); else if (c.$b)for (e = 0; e < a.length; e++)ld(a[e], d, b); else if (c.fd) {
                        var f = Dd && !1;
                        Dd = !1;
                        for (e = 0; e < a.length; e++)id(a[e], c.Ab, d, b || !f)
                    } else if (Od)G(a, function (a) {
                        b ? a.b && a.b.pause() : a.b && a.b.update()
                    }); else if (c.bc)G(a, function (a) {
                        if (b) {
                            if (a.j) {
                                var c = a.j;
                                3 <= c.H && (c.H = 3);
                                a.ma = -1
                            }
                        } else if (a.j && "d" != a.j.p) {
                            var c = Sc(a.j), d = [-1, -1, -1, -1, -1, 4, 2, 0], e = d[c.Ia + 1];
                            vd(a, e, c.fa, d[c.gc + 1], !0, !1);
                            a.ma = e;
                            a.Aa(a, ed);
                            7 == a.f ? 2E3 <= Math.max(a.w[2], a.Z[2]) &&
                            yd(a) : Y(a) && !a.o && yd(a);
                            if (2 == c.Ia || a.j.W() || Uc(a.j))a.ra(a), a.o = !1, yd(a)
                        }
                    }); else if (c.$a)for (e = 0; e < a.length; e++)a[e].update(d, c.Ab, b, C, de);
                    ee += V() - d;
                    ++fe;
                    ge()
                } finally {
                    b ? G(a, function (a) {
                        a.k = 0;
                        a.Oa = new S(0, 0, 0, 0)
                    }) : be()
                }
            }
        }, Ld = function () {
            var a = he();
            if (a) {
                if (!oc) {
                    var b = V();
                    pc = b;
                    G(H, function (a) {
                        var d = a.Ac;
                        oc || a.zc || -1 == a.tb || (d += b - a.tb);
                        a.Ac = d
                    })
                }
                oc = !0;
                Qd(!0)
            } else b = V(), ie = je(b), oc = !1, G(H, function (a) {
                0 <= a.la && (a.tb = b)
            });
            Rd(H, !a)
        }, he = function () {
            if (ke())return !0;
            var a = Ha(C.document);
            return 1 == a || 0 == a
        }, be =
            function () {
                C && (ae = C.setTimeout(E("osd_or_lidar::psamp_to", function () {
                    Rd(H, !1)
                }), qc()))
            }, le = function (a) {
            return null != Va(function (b) {
                    return b.element == a
                })
        }, H = [], $d = !1, Td = null, Xd = null, me = null, ae = null, de = !za(C.top), ne = "", ce = null, Ud = 0, Wd = !1, Vd = !1, Nd = !1, Od = !1, Sd = Pb() || !Pb() && (J("iPod") || J("iPhone") || J("Android") || J("IEMobile")), ie = 0, oe = 0, pe = 0, ee = 0, fe = 0, qe = -1, re = function () {
            var a = C.document;
            return a.body && a.body.getBoundingClientRect ? !0 : !1
        }, Qd = function (a) {
            Td = jc(!0, C, Sd);
            if (!a) {
                Xd = kc();
                a = C;
                a.top != a && (a = a.top);
                var b = 0, c = 0, d = Td;
                try {
                    var e = a.document, f = e.body, g = e.documentElement;
                    if ("CSS1Compat" == e.compatMode && g.scrollHeight)b = g.scrollHeight != d.height ? g.scrollHeight : g.offsetHeight, c = g.scrollWidth != d.width ? g.scrollWidth : g.offsetWidth; else {
                        var k = g.scrollHeight, m = g.scrollWidth, t = g.offsetHeight, q = g.offsetWidth;
                        g.clientHeight != t && (k = f.scrollHeight, m = f.scrollWidth, t = f.offsetHeight, q = f.offsetWidth);
                        k > d.height ? k > t ? (b = k, c = m) : (b = t, c = q) : k < t ? (b = k, c = m) : (b = t, c = q)
                    }
                    me = new Q(c, b)
                } catch (y) {
                    me = new Q(-12245933, -12245933)
                }
            }
        }, se =
            function (a) {
                if (ce && !a)return Wa(ce);
                var b = C.document;
                a = 0 <= nc ? V() - nc : -1;
                var c = V();
                -1 == qe && (a = c);
                var d = [], e = H;
                try {
                    if (0 < e.length ? ((b = Td) && d.push("bs=" + b.width + "," + b.height), (b = Xd) && d.push("bos=" + b.width + "," + b.height), (b = me) && d.push("ps=" + b.width + "," + b.height), C.screen && d.push("ss=" + C.screen.width + "," + C.screen.height)) : (d.push("url=" + D(C.location.href.substring(0, 1024))), b.referrer && d.push("referrer=" + D(b.referrer.substring(0, 512)))), d.push("tt=" + a), d.push("pt=" + nc), Wd && d.push("xde=1"), Vd && d.push("iem=1"),
                        0 != Fd && d.push("st=" + Fd), d.push("deb=" + D([1, oe, pe, ee, fe, qe].join("-"))), d.push("tvt=" + je(c)), C.top != C) {
                        0 < e.length && d.push("iframe_loc=" + D(C.location.href.substring(0, 512)));
                        var f = jc(!1, C, Sd);
                        d.push("is=" + f.width + "," + f.height)
                    }
                } catch (g) {
                    d.push("error")
                }
                ce = d;
                return Wa(ce)
            }, te = function () {
            return M && r(C.screenX) && r(C.mozInnerScreenX) && r(C.outerWidth)
        }, ue = function (a) {
            var b = a.indexOf("Firefox/"), c = -1;
            if (0 <= b)c = Math.floor(a.substr(b + 8)) || -1; else return null;
            var d = a.indexOf("Mac OS X 10."), b = -1;
            0 <= d && (b = Number(a.substr(d +
            12, 1)) || -1);
            var e = 0 < b ? -1 : a.indexOf("Windows NT "), d = -1;
            0 <= e && (d = {"6.0": 0, "6.1": 1, "6.2": 2}[a.substr(e + 11, 3)] || -1);
            a = 148;
            5 <= b ? a = 4 <= c ? 108 : 3 <= c ? 127 : 108 : 0 <= d && (16 == c || 17 == c || 18 == c) && (a = [[146, 146, 146], [148, 147, 148], [131, 130, 136]][d][c - 16]);
            return a
        }, we = function () {
            var a = ve, b = !1;
            G(H, function (c, d) {
                if (1 > Math.random()) {
                    var e;
                    var f = String(d);
                    Boolean(Boolean(c.g && !!f && !Xb) && !Xb) ? (e = new Gc, (f = Lc(e, c.g, f)) ? (c.ra = a, c.j = e) : c.Ua = !0, e = f) : (c.Ua = !0, e = !1);
                    b = b || e
                }
            });
            (Nd = b) && G(H, function (b) {
                Boolean(b.j) || a(b)
            });
            return b
        },
        xe = function () {
            var a = ve, b = !1;
            G(H, function (c) {
                if (.02 > Math.random()) {
                    if (c.g) {
                        var d = c.a.bottom - c.a.top, e = c.a.right - c.a.left, f = new Bc;
                        if (d = f.N(c.g, d, e, v(c.Sc, c)))a && (c.ra = a), c.b = f;
                        c = d
                    } else c = !1;
                    b = b || c
                }
            });
            (Od = b) && G(H, function (b) {
                Boolean(b.b) || a(b)
            });
            return b
        }, ge = function () {
            if ("osd" == ne)for (var a = H, b = 0; b < a.length; b++) {
                var c = se(), d = a[b], e = c, c = Y(d);
                if (0 == d.jc)d.s.xb++; else if (1 != d.jc || c && !d.Ec) {
                    d.s.yb++;
                    var f = d.getStats();
                    f.unshift("adk=" + d.v);
                    f.push("r=u");
                    var f = f.concat(e).join("&"), e = {}, g = new cd(d.v, d.Lc),
                        k = e;
                    g.r && (k[4] = g.r);
                    g.q && (k[12] = g.q);
                    e[0] = "goog_update_data";
                    e[3] = f;
                    e[5] = c;
                    e[15] = d.ia || d.ja || d.V || d.F || d.X;
                    e[11] = d.G || d.xa;
                    e[7] = d.k;
                    f = d.Oa;
                    e[9] = f ? f.top + "-" + f.left + "-" + f.bottom + "-" + f.right : "0-0-0-0";
                    e[13] = d.Z.join(",");
                    e[14] = d.mb;
                    f = d;
                    g = d.gd;
                    try {
                        var m = dd(e);
                        if (m && f.element) {
                            var t = g ? g.length : 0;
                            if (0 < t)for (var q = 0; q < t; ++q) {
                                var y = g[q];
                                (y == C.top || y.parent && y.parent != y) && lc(m, y)
                            } else {
                                e = [];
                                try {
                                    var z = Lb(f.element);
                                    if (z)e = [z]; else for (var da = Bb("iframe", void 0, f.element), q = 0; q < da.length; ++q)(z = Lb(da[q])) && e.push(z);
                                    var oa = e.length;
                                    if (0 < oa)for (var Mb = ha(lc, m), q = 0; q < oa; ++q)mc(Mb, e[q])
                                } catch (Nb) {
                                }
                            }
                        }
                    } catch (Ob) {
                    }
                    d.Ec = c
                } else d.s.zb++
            }
        }, ye = function (a) {
            G(a, function (a) {
                le(a.element) || H.push(a)
            })
        }, je = function (a) {
            var b = ie;
            oc && (b += a - pc);
            return b
        }, ke = function () {
            return Ua(H, function (a) {
                return a.Zb
            })
        }, Yd = function () {
            this.Kb = this.Lb = null;
            this.Jb = 0;
            this.Ab = null;
            this.$a = this.dd = this.bc = this.fd = this.$b = this.ac = this.ed = !1
        };
    var ze = function (a) {
        this.oa = new vc;
        this.jd = a;
        this.Da = [];
        this.Ga = this.Ub = this.Xa = this.eb = null
    };
    ze.prototype.Uc = function (a) {
        this.Da.push({od: a, Na: w()})
    };
    ze.prototype.Oc = function () {
        var a;
        a = this.Da;
        var b = w(), c, d, e = a.length;
        if (0 < e)for (c = 0, d = b - a[0].Na, --e; 0 <= e; e--) {
            if (b < a[e].Na) {
                d = c = -1;
                break
            }
            a[e].od && (c += b - a[e].Na);
            b = a[e].Na
        } else d = c = -1;
        a = {nd: d, md: c};
        this.Ja();
        this.jd(a)
    };
    var Ae = function (a) {
        var b, c = v(function (a) {
            a !== b && (a ? (this.oa.qa(), this.eb = C.setTimeout(E("osd_or_lidar::ah_mt", v(this.Oc, this)), 1E3)) : (C.clearTimeout(this.eb), this.Da = [], Ac(this.oa)), b = a)
        }, a), d = v(function () {
            var a;
            a = C.screenX;
            var b = C.screenY, e = kc();
            a = new S(b + this.Ub + 60, a + e.width - 20, b + e.height - 50, a + 20);
            a = a.top >= a.bottom || a.left >= a.right ? null : a;
            null === a ? a = !1 : (b = this.oa.nb, b = new P(Math.round(b.mozInnerScreenX), Math.round(b.mozInnerScreenY)), a = a.contains(b));
            c(a);
            this.Xa = C.setTimeout(E("osd_or_lidar::ah_gt",
                d), 100)
        }, a), e = v(function () {
            1 === Ha(B) ? d() : (C.clearTimeout(this.Xa), c(!1))
        }, a), f = Ia();
        if (f) {
            var g = U(B, f, e, "osd_or_lidar::ah_pv");
            a.Ga = function () {
                x(B, f, g, void 0);
                this.Ga = null
            }
        }
        e()
    };
    ze.prototype.N = function (a) {
        if (!a)return !1;
        var b = a.getBoundingClientRect(), b = new P(Math.floor((b.right - b.left) / 2), Math.floor((b.bottom - b.top) / 2)), c;
        c = ue(I);
        null === c ? c = !1 : (this.Ub = c, c = !0);
        return c && this.oa.N(a, b, v(this.Uc, this)) ? !0 : !1
    };
    ze.prototype.qa = function () {
        Ae(this)
    };
    ze.prototype.Ja = function () {
        C.clearTimeout(this.eb);
        C.clearTimeout(this.Xa);
        this.Ga && this.Ga();
        this.oa.Ja();
        this.Da = []
    };
    var Be = null, Ce = !1, De = !1, Ge = 0, He = 0, Z = 0, Ie = 0, Je = 0, Ke = 0, Le = 0, Oe = function (a) {
        if (a) {
            var b = a.D && !(a.ha && !a.Q);
            if (!b || Bd(a)) {
                if (Y(a) && Bd(a)) {
                    var c = a.Ra, d;
                    B.body ? (Da || (d = B.createElement("iframe"), d.style.display = "none", d.id = "anonIframe", Da = d, B.body.appendChild(d)), d = !0) : d = !1;
                    d && A(Da.contentWindow, c, void 0);
                    a.Mb = !0
                }
                b || a.ia || a.ja || a.V || a.F || a.X || !Y(a) ? a.xa && Me(a, "z") : Me(a, "v");
                5 != Z && 6 != Z && 1 != Z || !Y(a) || Ne(a, !0)
            }
        }
    }, Me = function (a, b) {
        if (a && !$d) {
            7 === a.f && "i" == b && (a.G = !0);
            var c = !a.Pb && !a.D, d = a.ha && !a.Q;
            if (c || d) {
                var e =
                    "//" + (a.Kc || "pagead2.googlesyndication.com") + (a.cc ? "/pagead/gen_204" : "/activeview") + "?id=", f = [];
                f.push("v=272");
                var g = "adk=" + (a.v || 1) + "&" + a.getStats().join("&");
                f.push(g);
                f.push("r=" + b);
                Ce || f.push("its=0");
                De && f.push("ahm=1");
                f.push("ndc=" + Ie);
                f.push("tdc=" + Je);
                f.push("npl=" + Ke);
                f.push("tpl=" + Le);
                oe = C.__google_lidar_;
                g = se(!1);
                f.push(g.join("&"));
                f.push(Pe());
                f = "&" + f.join("&");
                c && (A(C, (e + "lidar2" + f).substring(0, 2E3), void 0), a.D = !0);
                d && (A(C, (e + "lidarim" + f).substring(0, 2E3), void 0), a.Q = !0)
            }
        }
        Qe() || ($d = !0, H = [], Pd())
    }, Qe = function () {
        if (Ge || He || 2 == Z || 7 == Z || 4 == Z)return !0;
        for (var a = H, b = 0; b < a.length; b++) {
            var c = a[b], d = !c.D;
            if (c.ha && !c.Q || d || c.o || Bd(c))return !0
        }
        return !1
    }, Pe = function () {
        var a = Be || C;
        if (!a)return "";
        var b = a.document, c = [];
        c.push("url=" + D(a.location.href.substring(0, 512)));
        b && b.referrer && c.push("referrer=" + D(b.referrer.substring(0, 512)));
        b = a.location && a.location.ancestorOrigins;
        if (de && b && 0 < b.length) {
            for (var d = [], a = b.length, e = a - 1; 0 <= e; --e)d.push(D(b[e]));
            b = d.join(",");
            b = b.substring(0, 512);
            c.push("anc=" +
            b);
            c.push("adep=" + a)
        }
        return c.join("&")
    }, Ne = function (a, b) {
        if (!b || !a.Nb) {
            var c = "//pagead2.googlesyndication.com/activeview?id=avtest&exp=pde&exp_id=" + Z + "&v=272&type=" + (b ? "imm" : "eos") + "&avi=" + a.da;
            if (4 == Z || 5 == Z) {
                var d = c.split("?");
                C.navigator.sendBeacon(d[0], d[1])
            } else if (7 == Z || 6 == Z) {
                var e = 0, f = function (a) {
                    a && "error" == a.type && 1 > e && (e++, A(C, c, f))
                };
                A(C, c, f)
            } else A(C, c, void 0);
            a.Nb = !0
        }
    };
    var Re = null, Te = function () {
            Je = V();
            Ie = Se()
        }, Ue = function () {
            Le = V();
            Ke = Se()
        }, af = function () {
            try {
                var a = V();
                nc = a;
                Be = Yb();
                Qd(!1);
                if (re()) {
                    var b = Aa([1, 3], 0);
                    if (b) {
                        var c = document.createElement("a");
                        c.hasOwnProperty && c.hasOwnProperty("ping") || (b = 1 == b ? 2 : 4);
                        3 == b && (Re = c);
                        Ge = b
                    }
                    var d = Aa([1, 3], 0);
                    d && (C.navigator.sendBeacon || (d = 1 == d ? 2 : 4), He = d);
                    pe = 0;
                    var e = Ve(a);
                    pe = e.length;
                    ye(e);
                    if (1 > H.length)We("n"); else if (window.setTimeout(function () {
                            Ce = !0
                        }, 1), 1 > Math.random() && xc() && te() && n(Ia()) && C !== C.top && G(H, function (a) {
                            if (a.da &&
                                5 === a.f) {
                                var b = new ze(function (b) {
                                    var c = Xe(C);
                                    null === c && (c = -1);
                                    A(C, ["//pagead2.googlesyndication.com/pagead/gen_204?id=ah&v=272", "avi=" + a.da, "adk=" + a.v, "pmd=" + b.nd, "pd=" + b.md, "fd=" + c].join("&").substring(0, 2E3), void 0)
                                });
                                b.N(a.element) && (De = !0, b.qa())
                            }
                        }), qe = V() - a, de)Ye(); else {
                        Ze();
                        if (M) {
                            var f = te(), g = xc(), k;
                            G(H, function (a) {
                                var b = Math.random();
                                if (f && 0 > (b -= .01))i:{
                                    void 0 === k && (b = ue(C.navigator.userAgent), null !== b && (Ud = b, Wd = !1), k = Ud), b = k;
                                    a.X = !0;
                                    a.Fc = b;
                                    a.P = "u";
                                    var b = sc(), c = Ib("iframe", {
                                        frameborder: 0, height: 0,
                                        width: 0
                                    });
                                    c.style.visibility = "hidden";
                                    c.style.opacity = 0;
                                    c.style.zIndex = -999999;
                                    Sb(c, new P(0, 0));
                                    c.style.position = "absolute";
                                    try {
                                        b.appendChild(c);
                                        var d = a.element;
                                        d.insertBefore(b, d.childNodes[0] || null)
                                    } catch (e) {
                                        a.P = "-";
                                        a.X = !1;
                                        break i
                                    }
                                    a.Cb = c;
                                    rd(a, C)
                                } else g && 0 > b - .01 && null === a.J && a.element && xc() && 6 !== a.f && (d = a.element.getBoundingClientRect(), d = new P(Math.floor((d.right - d.left) / 2), Math.floor((d.bottom - d.top) / 2)), b = new vc, a.hb = .5 < Math.random(), b.N(a.element, d, v(a.mc, a, C), a.hb) ? (a.F = !0, a.C = b, a.J = "u", b.qa()) :
                                    (a.F = !1, a.J = "-"))
                            })
                        } else G(H, function (a, b) {
                            var c = Math.random();
                            if (0 > (c -= .01)) {
                                var c = String(b), d = new Gc;
                                Boolean(a.g && !!c && !Xb) && Lc(d, a.g, c) ? (a.T = "u", a.c = d, a.ia = !0, od(a, C)) : a.T = "-"
                            } else if (0 > (c -= .01)) {
                                var c = a.a.bottom - a.a.top, d = a.a.right - a.a.left, e = new Bc;
                                e.N(a.g, c, d, v(a.Rc, a, C)) ? (a.u = e, a.ja = !0, pd(a, C), a.K = "u") : a.K = "-"
                            } else 0 > c - .01 && L && N(8) && (a.V = !0, qd(a, C), a.S = "u")
                        });
                        Md();
                        $e()
                    }
                } else We("c")
            } catch (m) {
                throw H = [], We("x"), m;
            }
        }, $e = function () {
            window.setTimeout(E("lidar::hd_to", function () {
                We("t")
            }), 36E5)
        },
        Ye = function () {
            var a;
            te() && 1 > Math.random() ? (a = ue(C.navigator.userAgent), null !== a && (Ud = a, Wd = !0), a = !0) : a = !1;
            a ? (Md(), $e()) : (a = L && N(8) && 1 > Math.random() ? Vd = !0 : !1, a ? (Md(), $e()) : xe() ? (Md(), $e()) : we() ? (Md(), $e()) : We("i"))
        }, Xe = function (a, b, c) {
            b = b || 100;
            c = c || 0;
            return a === C.top ? c : c >= b ? null : Xe(a.parent, b, c + 1)
        }, We = function (a) {
            window.clearTimeout(ae);
            ae = null;
            var b = H, c = [], d = [];
            if (!$d) {
                var e = ["//pagead2.googlesyndication.com/activeview?id=lidar2"], f = e.length;
                e.push("v=272");
                var g = e.length;
                e.push(null);
                Rd(b, !0);
                if (!$d) {
                    0 <
                    b.length && (4 == Z || 7 == Z || 2 == Z) && G(b, function (a) {
                        Y(a) && Ne(a, !1)
                    });
                    c = Sa(b, function (a) {
                        return !a.D
                    });
                    d = Sa(b, function (a) {
                        return a.ha && !a.Q
                    });
                    e.push("r=" + a);
                    Ce || e.push("its=0");
                    De && e.push("ahm=1");
                    oe = C.__google_lidar_;
                    a = se(!1);
                    e.push(a.join("&"));
                    0 == c.length || e.push(Pe());
                    0 != c.length ? G(c, function (a, b) {
                        if (3 != (a.G || 0 >= a.m ? 2 : Y(a) ? 4 : 3) || a.qb || 5 != a.f) {
                            var c = "adk=" + (a.v || b + 1) + "&" + a.getStats().join("&");
                            e[g] = c;
                            e[0] = a.cc ? "//pagead2.googlesyndication.com/pagead/gen_204?id=lidar2" : "//pagead2.googlesyndication.com/activeview?id=lidar2";
                            (c = a.o && !a.G && Y(a)) && Ya(e, f, 0, "ts=1");
                            A(C, e.join("&").substring(0, 2E3), void 0);
                            c && (a.o = !1, F.splice.call(e, f, 1))
                        }
                    }) : 0 == b.length && (e[0] = "//pagead2.googlesyndication.com/pagead/gen_204?id=lidar2", c = Se(), e.push("nd=" + c), A(C, e.join("&").substring(0, 2E3), void 0));
                    0 == d.length || G(d, function (a, b) {
                        if (3 != (a.G || 0 >= a.m ? 2 : Y(a) ? 4 : 3) || a.qb) {
                            var c = "adk=" + (a.v || b + 1) + "&" + a.getStats().join("&");
                            e[g] = c;
                            e[0] = "//pagead2.googlesyndication.com/activeview?id=lidarim";
                            A(C, e.join("&").substring(0, 2E3), void 0)
                        }
                    });
                    G(b, function (a,
                                   b) {
                        if (a.o && !a.G && Y(a)) {
                            var c = "adk=" + (a.v || b + 1) + "&" + a.getStats().join("&");
                            e[g] = c;
                            e[0] = "//pagead2.googlesyndication.com/activeview?id=lidartos";
                            A(C, e.join("&").substring(0, 2E3), void 0);
                            a.o = !1
                        }
                    });
                    if (Ge || He)e[0] = "//pagead2.googlesyndication.com/activeview?id=avtest", Ge && e.splice(-1, 0, "ape=" + Ge), He && e.splice(-1, 0, "sbe=" + He), G(b, function (a, b) {
                        var c = "adk=" + (a.v || b + 1) + "&" + a.getStats().join("&");
                        e[g] = c;
                        var c = e.join("&").substring(0, 2E3), d = 3 == He;
                        3 == Ge || d ? d ? (d = c.split("?"), C.navigator.sendBeacon(d[0], d[1]) ||
                        (c = c.replace(/&sbe=3&/, "&sbe=3&sberr=1&"), A(C, c, void 0))) : (d = Re, d.href = "javascript:void(0)", d.ping = c, d.click ? d.click() : (c = document.createEvent("HTMLEvents"), c.initEvent("click", !0, !0), d.dispatchEvent(c))) : A(C, c, void 0)
                    });
                    $d = !0
                }
            }
        }, Ve = function (a) {
            var b = [], c = $a(Ta(Zb, function (a) {
                return Wa(Cb(a))
            })), c = Sa(c, function (a) {
                return /^div$/i.test(a.nodeName)
            }), c = Ta(c, function (a) {
                return {
                    element: a,
                    qc: a && a.id ? 0 == a.id.lastIndexOf("DfaVisibilityIdentifier", 0) ? 5 : 0 == a.id.lastIndexOf("DfpVisibilityIdentifier", 0) ? 6 : 0 :
                        0
                }
            });
            G(c, function (c) {
                if (0 != c.qc && !le(c.element)) {
                    var e = c.qc;
                    c = new X(C, "", c.element, a, e, de);
                    6 == e && 1 > Math.random() && (c.D = !0);
                    7 != e && (c.Aa = Oe);
                    b.push(c)
                }
            });
            return b
        }, ve = function (a) {
            a && (a.G = !0, a.D && (!a.ha || a.Q) || Me(a, "i"))
        }, Ze = function () {
            var a = Aa([1, 2, 7, 6], .01);
            a && (Z = a)
        }, Se = function () {
            return Cb("GoogleActiveViewClass").length
        };
    Na("lidar::main", function () {
        C.__google_lidar_ ? C.__google_lidar_ += 1 : (C.__google_lidar_ = 1, ne = "lidar", U(C, "unload", function () {
            We("u")
        }, "lidar::unload"), document.readyState && "complete" === document.readyState ? af() : (Ga(function () {
            C.setTimeout(E("lidar::init_to", af), 100)
        }), U(C, "DOMContentLoaded", Te, "lidar::dcl"), U(C, "load", Ue, "lidar::pl")))
    });
})();

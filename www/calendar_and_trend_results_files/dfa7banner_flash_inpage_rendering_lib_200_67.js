(function () {
    var l, n = this, r = function (a) {
            return void 0 !== a
        }, t = function (a, b) {
            for (var c = a.split("."), d = b || n, e; e = c.shift();)if (null != d[e])d = d[e]; else return null;
            return d
        }, u = function () {
        }, aa = function (a) {
            a.getInstance = function () {
                return a.hb ? a.hb : a.hb = new a
            }
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
        }, v = function (a) {
            return "array" == ba(a)
        }, w = function (a) {
            return "string" == typeof a
        }, x = function (a) {
            return "function" == ba(a)
        }, ca = function (a) {
            var b = typeof a;
            return "object" ==
                b && null != a || "function" == b
        }, da = function (a, b, c) {
            return a.call.apply(a.bind, arguments)
        }, ea = function (a, b, c) {
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
        }, y = function (a, b, c) {
            y = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? da : ea;
            return y.apply(null, arguments)
        },
        fa = function (a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function () {
                var b = c.slice();
                b.push.apply(b, arguments);
                return a.apply(this, b)
            }
        }, A = function () {
            return +new Date
        }, ga = function (a, b) {
            var c = a.split("."), d = n;
            c[0]in d || !d.execScript || d.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift());)!c.length && r(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {}
        }, B = function (a, b) {
            function c() {
            }

            c.prototype = b.prototype;
            a.M = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.hd = function (a, c, f) {
                for (var g = Array(arguments.length -
                2), h = 2; h < arguments.length; h++)g[h - 2] = arguments[h];
                return b.prototype[c].apply(a, g)
            }
        };
    var ha = function (a, b) {
        for (var c in a)b.call(void 0, a[c], c, a)
    }, ia = function (a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = a[d];
        return b
    }, ja = function (a, b) {
        for (var c in a)if (a[c] == b)return !0;
        return !1
    }, ka = function (a) {
        for (var b in a)return !1;
        return !0
    }, la = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), ma = function (a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < la.length; f++)c = la[f], Object.prototype.hasOwnProperty.call(d,
                c) && (a[c] = d[c])
        }
    }, na = function (a) {
        var b = arguments.length;
        if (1 == b && v(arguments[0]))return na.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++)c[arguments[d]] = !0;
        return c
    };
    var oa = function (a, b, c, d, e) {
        this.g = a;
        this.a = b;
        this.c = c ? c : "0.0.0";
        this.j = d || "";
        this.e = e || "always"
    }, pa = {bd: "transparent", Qc: "opaque", dd: "window"}, qa = function (a) {
        return a && ja(pa, a.toLowerCase()) ? a.toLowerCase() : null
    };
    var ra = function (a) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, ra); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    B(ra, Error);
    ra.prototype.name = "CustomError";
    var sa;
    var C = function (a) {
        return /^[\s\xa0]*$/.test(a)
    }, D = function (a) {
        return null == a ? "" : String(a)
    }, E = function (a, b) {
        for (var c = 0, d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
            var h = d[g] || "", k = e[g] || "", m = RegExp("(\\d*)(\\D*)", "g"), z = RegExp("(\\d*)(\\D*)", "g");
            do {
                var p = m.exec(h) || ["", "", ""], q = z.exec(k) || ["", "", ""];
                if (0 == p[0].length && 0 == q[0].length)break;
                c = ta(0 == p[1].length ? 0 : parseInt(p[1],
                    10), 0 == q[1].length ? 0 : parseInt(q[1], 10)) || ta(0 == p[2].length, 0 == q[2].length) || ta(p[2], q[2])
            } while (0 == c)
        }
        return c
    }, ta = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }, ua = function (a) {
        return String(a).replace(/\-([a-z])/g, function (a, c) {
            return c.toUpperCase()
        })
    }, va = function (a) {
        var b = w(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
            return b + e.toUpperCase()
        })
    };
    var wa = Array.prototype, xa = function (a, b) {
        if (w(a))return w(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (var c = 0; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }, F = function (a, b, c) {
        for (var d = a.length, e = w(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, ya = function (a, b) {
        for (var c = a.length, d = [], e = 0, f = w(a) ? a.split("") : a, g = 0; g < c; g++)if (g in f) {
            var h = f[g];
            b.call(void 0, h, g, a) && (d[e++] = h)
        }
        return d
    }, za = function (a, b) {
        for (var c = a.length, d = Array(c), e = w(a) ? a.split("") : a, f = 0; f < c; f++)f in e && (d[f] = b.call(void 0,
            e[f], f, a));
        return d
    }, Aa = function (a, b) {
        for (var c = a.length, d = w(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && b.call(void 0, d[e], e, a))return !0;
        return !1
    }, Ba = function (a, b) {
        for (var c = a.length, d = w(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && !b.call(void 0, d[e], e, a))return !1;
        return !0
    }, Ca = function (a, b) {
        var c;
        t:{
            c = a.length;
            for (var d = w(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && b.call(void 0, d[e], e, a)) {
                c = e;
                break t
            }
            c = -1
        }
        return 0 > c ? null : w(a) ? a.charAt(c) : a[c]
    }, Da = function (a, b) {
        0 <= xa(a, b) || a.push(b)
    }, G = function (a, b) {
        var c = xa(a,
            b), d;
        (d = 0 <= c) && wa.splice.call(a, c, 1);
        return d
    }, Ea = function (a) {
        return wa.concat.apply(wa, arguments)
    }, Fa = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return []
    }, Ga = function (a, b) {
        var c = {};
        F(a, function (d, e) {
            c[b.call(void 0, d, e, a)] = d
        });
        return c
    };
    var H = function (a, b) {
        this.x = r(a) ? a : 0;
        this.y = r(b) ? b : 0
    };
    H.prototype.clone = function () {
        return new H(this.x, this.y)
    };
    H.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    H.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    H.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    var Ha = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    l = Ha.prototype;
    l.clone = function () {
        return new Ha(this.top, this.right, this.bottom, this.left)
    };
    l.contains = function (a) {
        return this && a ? a instanceof Ha ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
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
    var Ia = function (a) {
        this.a = a
    };
    ga("studio.common.mde.Direction", Ia);
    Ia.prototype.toString = function () {
        return (this.a & 2 ? "b" : "t") + (this.a & 1 ? "r" : "l")
    };
    na("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    na("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    na("embed", "iframe", "link", "object", "script", "style", "template");
    var Ja = function (a) {
        return a
    }, Ka = function () {
        var a = escape, b = 1, b = b || 0;
        return function () {
            return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
        }
    };
    var La = "StopIteration"in n ? n.StopIteration : Error("StopIteration"), Ma = function () {
    };
    Ma.prototype.next = function () {
        throw La;
    };
    Ma.prototype.j = function () {
        return this
    };
    var I = function (a, b) {
        this.c = {};
        this.a = [];
        this.e = this.g = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)Na(this, arguments[d], arguments[d + 1])
        } else if (a) {
            if (a instanceof I)d = a.Ba(), c = a.Ca(); else {
                var c = [], e = 0;
                for (d in a)c[e++] = d;
                d = c;
                c = ia(a)
            }
            for (e = 0; e < d.length; e++)Na(this, d[e], c[e])
        }
    };
    I.prototype.Ca = function () {
        Oa(this);
        for (var a = [], b = 0; b < this.a.length; b++)a.push(this.c[this.a[b]]);
        return a
    };
    I.prototype.Ba = function () {
        Oa(this);
        return this.a.concat()
    };
    I.prototype.clear = function () {
        this.c = {};
        this.e = this.g = this.a.length = 0
    };
    I.prototype.remove = function (a) {
        return Pa(this.c, a) ? (delete this.c[a], this.g--, this.e++, this.a.length > 2 * this.g && Oa(this), !0) : !1
    };
    var Oa = function (a) {
        if (a.g != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length;) {
                var d = a.a[b];
                Pa(a.c, d) && (a.a[c++] = d);
                b++
            }
            a.a.length = c
        }
        if (a.g != a.a.length) {
            for (var e = {}, c = b = 0; b < a.a.length;)d = a.a[b], Pa(e, d) || (a.a[c++] = d, e[d] = 1), b++;
            a.a.length = c
        }
    }, Qa = function (a, b) {
        return Pa(a.c, b) ? a.c[b] : void 0
    }, Na = function (a, b, c) {
        Pa(a.c, b) || (a.g++, a.a.push(b), a.e++);
        a.c[b] = c
    };
    I.prototype.forEach = function (a, b) {
        for (var c = this.Ba(), d = 0; d < c.length; d++) {
            var e = c[d];
            a.call(b, Qa(this, e), e, this)
        }
    };
    I.prototype.clone = function () {
        return new I(this)
    };
    I.prototype.j = function (a) {
        Oa(this);
        var b = 0, c = this.a, d = this.c, e = this.e, f = this, g = new Ma;
        g.next = function () {
            for (; ;) {
                if (e != f.e)throw Error("The map has changed since the iterator was created");
                if (b >= c.length)throw La;
                var g = c[b++];
                return a ? g : d[g]
            }
        };
        return g
    };
    var Pa = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var Ra;
    t:{
        var Sa = n.navigator;
        if (Sa) {
            var Ta = Sa.userAgent;
            if (Ta) {
                Ra = Ta;
                break t
            }
        }
        Ra = ""
    }
    var J = function (a) {
        return -1 != Ra.indexOf(a)
    };
    var Ua = function () {
        return J("iPhone") && !J("iPod") && !J("iPad")
    };
    var Va = J("Opera") || J("OPR"), K = J("Trident") || J("MSIE"), L = J("Gecko") && -1 == Ra.toLowerCase().indexOf("webkit") && !(J("Trident") || J("MSIE")), M = -1 != Ra.toLowerCase().indexOf("webkit"), Wa = M && J("Mobile"), Xa = J("Macintosh"), Ya = J("Windows"), Za = J("Android"), $a = function () {
        var a = n.document;
        return a ? a.documentMode : void 0
    }, ab = function () {
        var a = "", b;
        if (Va && n.opera)return a = n.opera.version, x(a) ? a() : a;
        L ? b = /rv\:([^\);]+)(\)|;)/ : K ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : M && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(Ra)) ? a[1] : "");
        return K && (b = $a(), b > parseFloat(a)) ? String(b) : a
    }(), bb = {}, N = function (a) {
        return bb[a] || (bb[a] = 0 <= E(ab, a))
    }, cb = n.document, db = cb && K ? $a() || ("CSS1Compat" == cb.compatMode ? parseInt(ab, 10) : 5) : void 0;
    var eb = function (a) {
        eb[" "](a);
        return a
    };
    eb[" "] = u;
    var fb = !K || K && 9 <= db, gb = K && !N("9");
    !M || N("528");
    L && N("1.9b") || K && N("8") || Va && N("9.5") || M && N("528");
    L && !N("8") || K && N("9");
    var O = function () {
        this.B = this.B;
        this.q = this.q
    };
    O.prototype.B = !1;
    O.prototype.R = function () {
        this.B || (this.B = !0, this.g())
    };
    O.prototype.g = function () {
        if (this.q)for (; this.q.length;)this.q.shift()()
    };
    var hb = function (a) {
        a && "function" == typeof a.R && a.R()
    }, ib = function (a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b], e = d, f = ba(e);
            "array" == f || "object" == f && "number" == typeof e.length ? ib.apply(null, d) : hb(d)
        }
    };
    var P = function (a, b) {
        this.type = a;
        this.a = this.target = b;
        this.mb = !0
    };
    P.prototype.preventDefault = function () {
        this.mb = !1
    };
    var jb = function (a, b) {
        P.call(this, a ? a.type : "");
        this.a = this.target = null;
        this.button = this.clientY = this.clientX = 0;
        this.metaKey = this.shiftKey = this.ctrlKey = !1;
        this.c = this.state = null;
        if (a) {
            this.type = a.type;
            this.target = a.target || a.srcElement;
            this.a = b;
            var c = a.relatedTarget;
            if (c && L)try {
                eb(c.nodeName)
            } catch (d) {
            }
            this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
            this.button = a.button;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.state =
                a.state;
            this.c = a;
            a.defaultPrevented && this.preventDefault()
        }
    };
    B(jb, P);
    jb.prototype.preventDefault = function () {
        jb.M.preventDefault.call(this);
        var a = this.c;
        if (a.preventDefault)a.preventDefault(); else if (a.returnValue = !1, gb)try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)a.keyCode = -1
        } catch (b) {
        }
    };
    var kb = "closure_listenable_" + (1E6 * Math.random() | 0), lb = 0;
    var mb = function (a, b, c, d, e) {
        this.ga = a;
        this.a = null;
        this.src = b;
        this.type = c;
        this.Fa = !!d;
        this.Ia = e;
        this.cb = ++lb;
        this.xa = this.Ea = !1
    }, nb = function (a) {
        a.xa = !0;
        a.ga = null;
        a.a = null;
        a.src = null;
        a.Ia = null
    };
    var ob = function (a) {
        this.src = a;
        this.a = {};
        this.c = 0
    };
    ob.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.a[f];
        a || (a = this.a[f] = [], this.c++);
        var g = pb(a, b, d, e);
        -1 < g ? (b = a[g], c || (b.Ea = !1)) : (b = new mb(b, this.src, f, !!d, e), b.Ea = c, a.push(b));
        return b
    };
    ob.prototype.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.a))return !1;
        var e = this.a[a];
        b = pb(e, b, c, d);
        return -1 < b ? (nb(e[b]), wa.splice.call(e, b, 1), 0 == e.length && (delete this.a[a], this.c--), !0) : !1
    };
    var qb = function (a, b) {
        var c = b.type;
        if (!(c in a.a))return !1;
        var d = G(a.a[c], b);
        d && (nb(b), 0 == a.a[c].length && (delete a.a[c], a.c--));
        return d
    }, rb = function (a, b, c, d, e) {
        a = a.a[b.toString()];
        b = -1;
        a && (b = pb(a, c, d, e));
        return -1 < b ? a[b] : null
    }, pb = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.xa && f.ga == b && f.Fa == !!c && f.Ia == d)return e
        }
        return -1
    };
    var sb = "closure_lm_" + (1E6 * Math.random() | 0), tb = {}, ub = 0, vb = function (a, b, c, d, e) {
        if (v(b)) {
            for (var f = 0; f < b.length; f++)vb(a, b[f], c, d, e);
            return null
        }
        c = wb(c);
        if (a && a[kb])a = a.c(b, c, d, e); else {
            if (!b)throw Error("Invalid event type");
            var f = !!d, g = xb(a);
            g || (a[sb] = g = new ob(a));
            c = g.add(b, c, !1, d, e);
            c.a || (d = yb(), c.a = d, d.src = a, d.ga = c, a.addEventListener ? a.addEventListener(b.toString(), d, f) : a.attachEvent(zb(b.toString()), d), ub++);
            a = c
        }
        return a
    }, yb = function () {
        var a = Ab, b = fb ? function (c) {
            return a.call(b.src, b.ga, c)
        } : function (c) {
            c =
                a.call(b.src, b.ga, c);
            if (!c)return c
        };
        return b
    }, Bb = function (a, b, c, d, e) {
        if (v(b))for (var f = 0; f < b.length; f++)Bb(a, b[f], c, d, e); else c = wb(c), a && a[kb] ? a.P(b, c, d, e) : a && (a = xb(a)) && (b = rb(a, b, c, !!d, e)) && Cb(b)
    }, Cb = function (a) {
        if ("number" == typeof a || !a || a.xa)return !1;
        var b = a.src;
        if (b && b[kb])return qb(b.da, a);
        var c = a.type, d = a.a;
        b.removeEventListener ? b.removeEventListener(c, d, a.Fa) : b.detachEvent && b.detachEvent(zb(c), d);
        ub--;
        (c = xb(b)) ? (qb(c, a), 0 == c.c && (c.src = null, b[sb] = null)) : nb(a);
        return !0
    }, zb = function (a) {
        return a in
        tb ? tb[a] : tb[a] = "on" + a
    }, Eb = function (a, b, c, d) {
        var e = !0;
        if (a = xb(a))if (b = a.a[b.toString()])for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.Fa == c && !f.xa && (f = Db(f, d), e = e && !1 !== f)
        }
        return e
    }, Db = function (a, b) {
        var c = a.ga, d = a.Ia || a.src;
        a.Ea && Cb(a);
        return c.call(d, b)
    }, Ab = function (a, b) {
        if (a.xa)return !0;
        if (!fb) {
            var c = b || t("window.event"), d = new jb(c, this), e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t:{
                    var f = !1;
                    if (0 == c.keyCode)try {
                        c.keyCode = -1;
                        break t
                    } catch (g) {
                        f = !0
                    }
                    if (f || void 0 == c.returnValue)c.returnValue = !0
                }
                c = [];
                for (f = d.a; f; f = f.parentNode)c.push(f);
                for (var f = a.type, h = c.length - 1; 0 <= h; h--) {
                    d.a = c[h];
                    var k = Eb(c[h], f, !0, d), e = e && k
                }
                for (h = 0; h < c.length; h++)d.a = c[h], k = Eb(c[h], f, !1, d), e = e && k
            }
            return e
        }
        return Db(a, new jb(b, this))
    }, xb = function (a) {
        a = a[sb];
        return a instanceof ob ? a : null
    }, Fb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0), wb = function (a) {
        if (x(a))return a;
        a[Fb] || (a[Fb] = function (b) {
            return a.handleEvent(b)
        });
        return a[Fb]
    };
    var Q = function (a, b) {
        this.width = a;
        this.height = b
    };
    Q.prototype.clone = function () {
        return new Q(this.width, this.height)
    };
    Q.prototype.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
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
    var Gb = function (a) {
        n.setTimeout(function () {
            throw a;
        }, 0)
    }, Hb, Ib = function () {
        var a = n.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !J("Presto") && (a = function () {
            var a = document.createElement("iframe");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow, a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(), d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                a = y(function (a) {
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
        if ("undefined" !== typeof a && !J("Trident") && !J("MSIE")) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function () {
                if (r(c.next)) {
                    c = c.next;
                    var a = c.bb;
                    c.bb = null;
                    a()
                }
            };
            return function (a) {
                d.next = {bb: a};
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange"in document.createElement("script") ?
            function (a) {
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
    var Ob = function (a, b) {
        Jb || Kb();
        Lb || (Jb(), Lb = !0);
        Mb.push(new Nb(a, b))
    }, Jb, Kb = function () {
        if (n.Promise && n.Promise.resolve) {
            var a = n.Promise.resolve();
            Jb = function () {
                a.then(Pb)
            }
        } else Jb = function () {
            var a = Pb;
            !x(n.setImmediate) || n.Window && n.Window.prototype.setImmediate == n.setImmediate ? (Hb || (Hb = Ib()), Hb(a)) : n.setImmediate(a)
        }
    }, Lb = !1, Mb = [], Pb = function () {
        for (; Mb.length;) {
            var a = Mb;
            Mb = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                try {
                    c.a.call(c.c)
                } catch (d) {
                    Gb(d)
                }
            }
        }
        Lb = !1
    }, Nb = function (a, b) {
        this.a = a;
        this.c = b
    };
    var Qb = function (a) {
        a.prototype.then = a.prototype.then;
        a.prototype.$goog_Thenable = !0
    }, Rb = function (a) {
        if (!a)return !1;
        try {
            return !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    var Tb = function (a, b) {
        this.c = 0;
        this.k = void 0;
        this.a = this.j = null;
        this.g = this.e = !1;
        try {
            var c = this;
            a.call(b, function (a) {
                Sb(c, 2, a)
            }, function (a) {
                Sb(c, 3, a)
            })
        } catch (d) {
            Sb(this, 3, d)
        }
    };
    Tb.prototype.then = function (a, b, c) {
        return Ub(this, x(a) ? a : null, x(b) ? b : null, c)
    };
    Qb(Tb);
    var Xb = function (a, b, c) {
        var d = function () {
            try {
                b.call(c)
            } catch (a) {
                Vb.call(null, a)
            }
        };
        Wb(a, {za: null, Xa: d, Wa: d})
    }, Wb = function (a, b) {
        a.a && a.a.length || 2 != a.c && 3 != a.c || Yb(a);
        a.a || (a.a = []);
        a.a.push(b)
    }, Ub = function (a, b, c, d) {
        var e = {za: null, Wa: null, Xa: null};
        e.za = new Tb(function (a, g) {
            e.Wa = b ? function (c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (m) {
                    g(m)
                }
            } : a;
            e.Xa = c ? function (b) {
                try {
                    var e = c.call(d, b);
                    a(e)
                } catch (m) {
                    g(m)
                }
            } : g
        });
        e.za.j = a;
        Wb(a, e);
        return e.za
    };
    Tb.prototype.m = function (a) {
        this.c = 0;
        Sb(this, 2, a)
    };
    Tb.prototype.q = function (a) {
        this.c = 0;
        Sb(this, 3, a)
    };
    var Sb = function (a, b, c) {
        if (0 == a.c) {
            if (a == c)b = 3, c = new TypeError("Promise cannot resolve to itself"); else {
                if (Rb(c)) {
                    a.c = 1;
                    c.then(a.m, a.q, a);
                    return
                }
                if (ca(c))try {
                    var d = c.then;
                    if (x(d)) {
                        Zb(a, c, d);
                        return
                    }
                } catch (e) {
                    b = 3, c = e
                }
            }
            a.k = c;
            a.c = b;
            Yb(a);
            3 != b || $b(a, c)
        }
    }, Zb = function (a, b, c) {
        a.c = 1;
        var d = !1, e = function (b) {
            d || (d = !0, a.m(b))
        }, f = function (b) {
            d || (d = !0, a.q(b))
        };
        try {
            c.call(b, e, f)
        } catch (g) {
            f(g)
        }
    }, Yb = function (a) {
        a.e || (a.e = !0, Ob(a.B, a))
    };
    Tb.prototype.B = function () {
        for (; this.a && this.a.length;) {
            var a = this.a;
            this.a = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b], d = this.k;
                if (2 == this.c)c.Wa(d); else {
                    if (c.za)for (var e = void 0, e = this; e && e.g; e = e.j)e.g = !1;
                    c.Xa(d)
                }
            }
        }
        this.e = !1
    };
    var $b = function (a, b) {
        a.g = !0;
        Ob(function () {
            a.g && Vb.call(null, b)
        })
    }, Vb = Gb;
    var R = function () {
        O.call(this);
        this.da = new ob(this);
        this.Z = this;
        this.F = null
    };
    B(R, O);
    R.prototype[kb] = !0;
    R.prototype.O = function (a) {
        this.F = a
    };
    R.prototype.addEventListener = function (a, b, c, d) {
        vb(this, a, b, c, d)
    };
    R.prototype.removeEventListener = function (a, b, c, d) {
        Bb(this, a, b, c, d)
    };
    var S = function (a, b) {
        var c, d = a.F;
        if (d) {
            c = [];
            for (var e = 1; d; d = d.F)c.push(d), ++e
        }
        var d = a.Z, e = b, f = e.type || e;
        if (w(e))e = new P(e, d); else if (e instanceof P)e.target = e.target || d; else {
            var g = e, e = new P(f, d);
            ma(e, g)
        }
        var g = !0, h;
        if (c)for (var k = c.length - 1; 0 <= k; k--)h = e.a = c[k], g = ac(h, f, !0, e) && g;
        h = e.a = d;
        g = ac(h, f, !0, e) && g;
        g = ac(h, f, !1, e) && g;
        if (c)for (k = 0; k < c.length; k++)h = e.a = c[k], g = ac(h, f, !1, e) && g
    };
    R.prototype.g = function () {
        R.M.g.call(this);
        if (this.da) {
            var a = this.da, b = 0, c;
            for (c in a.a) {
                for (var d = a.a[c], e = 0; e < d.length; e++)++b, nb(d[e]);
                delete a.a[c];
                a.c--
            }
        }
        this.F = null
    };
    R.prototype.c = function (a, b, c, d) {
        return this.da.add(String(a), b, !1, c, d)
    };
    R.prototype.P = function (a, b, c, d) {
        return this.da.remove(String(a), b, c, d)
    };
    var ac = function (a, b, c, d) {
        b = a.da.a[String(b)];
        if (!b)return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.xa && g.Fa == c) {
                var h = g.ga, k = g.Ia || g.src;
                g.Ea && qb(a.da, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && 0 != d.mb
    };
    var T = function (a) {
        O.call(this);
        this.e = a;
        this.a = {}
    };
    B(T, O);
    var bc = [];
    T.prototype.c = function (a, b, c, d) {
        v(b) || (b && (bc[0] = b.toString()), b = bc);
        for (var e = 0; e < b.length; e++) {
            var f = vb(a, b[e], c || this.handleEvent, d || !1, this.e || this);
            if (!f)break;
            this.a[f.cb] = f
        }
        return this
    };
    T.prototype.P = function (a, b, c, d, e) {
        if (v(b))for (var f = 0; f < b.length; f++)this.P(a, b[f], c, d, e); else c = c || this.handleEvent, e = e || this.e || this, c = wb(c), d = !!d, b = a && a[kb] ? rb(a.da, String(b), c, d, e) : a ? (a = xb(a)) ? rb(a, b, c, d, e) : null : null, b && (Cb(b), delete this.a[b.cb]);
        return this
    };
    var cc = function (a) {
        ha(a.a, Cb);
        a.a = {}
    };
    T.prototype.g = function () {
        T.M.g.call(this);
        cc(this)
    };
    T.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var dc = function () {
        R.call(this);
        this.m = new T(this);
        var a = fa(hb, this.m);
        this.B ? a.call(void 0) : (this.q || (this.q = []), this.q.push(r(void 0) ? y(a, void 0) : a))
    };
    B(dc, R);
    var ec = function () {
        dc.call(this);
        this.a = window.mraid || null
    };
    B(ec, dc);
    aa(ec);
    var fc = /doubleclick.net\/(pf)?ad/;
    ec.prototype.e = function () {
        try {
            this.a.removeEventListener("ready", y(this.e, this))
        } catch (a) {
            this.a.removeEventListener("ready")
        }
        this.a.addEventListener("viewableChange", y(this.j, this));
        this.a.addEventListener("stateChange", y(this.k, this));
        S(this, "ready");
        this.a.isViewable() && this.j()
    };
    ec.prototype.k = function () {
        S(this, "state_change")
    };
    ec.prototype.j = function () {
        this.a.isViewable() ? S(this, "show") : S(this, "hide")
    };
    ec.prototype.g = function () {
        this.a = null;
        ec.M.g.call(this)
    };
    var gc = function (a, b) {
        R.call(this);
        this.k = a || 1;
        this.e = b || n;
        this.m = y(this.o, this);
        this.n = A()
    };
    B(gc, R);
    gc.prototype.j = !1;
    gc.prototype.a = null;
    gc.prototype.o = function () {
        if (this.j) {
            var a = A() - this.n;
            0 < a && a < .8 * this.k ? this.a = this.e.setTimeout(this.m, this.k - a) : (this.a && (this.e.clearTimeout(this.a), this.a = null), S(this, "tick"), this.j && (this.a = this.e.setTimeout(this.m, this.k), this.n = A()))
        }
    };
    gc.prototype.g = function () {
        gc.M.g.call(this);
        this.j = !1;
        this.a && (this.e.clearTimeout(this.a), this.a = null);
        delete this.e
    };
    var hc = function (a, b, c) {
        if (x(a))c && (a = y(a, c)); else if (a && "function" == typeof a.handleEvent)a = y(a.handleEvent, a); else throw Error("Invalid listener argument");
        return 2147483647 < b ? -1 : n.setTimeout(a, b || 0)
    };
    var ic = void 0, lc = function () {
        void 0 === ic && (ic = Ca(jc, kc) || "none");
        return ic
    }, kc = function (a) {
        switch (a) {
            case "gdn":
                return window.IN_ADSENSE_IFRAME && CreativeToolset;
            case "yahoo":
                return window.Y && window.Y.SandBox && window.Y.SandBox.vendor;
            case "msn":
                var b;
                t:{
                    try {
                        b = window.$WLXRmAd || window.parent && window.parent.$WLXRmAd;
                        break t
                    } catch (c) {
                    }
                    b = void 0
                }
                return !!b;
            case "safe":
                return !!t("$sf.ext");
            case "mraid":
                return window.mraid;
            default:
                return !1
        }
    }, jc = "gdn mraid safe yahoo msn none".split(" ");
    var mc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/, pc = function (a) {
        if (nc) {
            nc = !1;
            var b = n.location;
            if (b) {
                var c = b.href;
                if (c && (c = oc(c)) && c != b.hostname)throw nc = !0, Error();
            }
        }
        return a.match(mc)
    }, nc = M, oc = function (a) {
        return (a = pc(a)[3] || null) ? decodeURI(a) : a
    }, qc = function (a, b) {
        for (var c = a.split("&"), d = 0; d < c.length; d++) {
            var e = c[d].indexOf("="), f = null, g = null;
            0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
            b(f, g ? decodeURIComponent(g.replace(/\+/g,
                " ")) : "")
        }
    }, rc = function (a, b) {
        var c = [a, "&", b];
        if (c[1]) {
            var d = c[0], e = d.indexOf("#");
            0 <= e && (c.push(d.substr(e)), c[0] = d = d.substr(0, e));
            e = d.indexOf("?");
            0 > e ? c[1] = "?" : e == d.length - 1 && (c[1] = void 0)
        }
        return c.join("")
    };
    var sc = function (a) {
        var b = window;
        try {
            return a.document.domain == b.document.domain
        } catch (c) {
            return !1
        }
    }, tc = function () {
        try {
            if ("" != n.document.referrer)return n.document.referrer;
            if (n.location.ancestorOrigins && n.location.ancestorOrigins[0])return n.location.ancestorOrigins[0];
            if (top != n)return n.parent.location.href
        } catch (a) {
        }
        return n.location.href
    };
    var vc = function (a, b) {
        var c = Array.prototype.slice.call(arguments), d = c.shift();
        if ("undefined" == typeof d)throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function (a, b, d, h, k, m, z, p) {
            if ("%" == m)return "%";
            var q = c.shift();
            if ("undefined" == typeof q)throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = q;
            return uc[m].apply(null, arguments)
        })
    }, uc = {
        s: function (a, b, c) {
            return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c -
            a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a
        }, f: function (a, b, c, d, e) {
            d = a.toString();
            isNaN(e) || "" == e || (d = a.toFixed(e));
            var f;
            f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
            0 <= a && (d = f + d);
            if (isNaN(c) || d.length >= c)return d;
            d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e);
            a = c - d.length - f.length;
            return d = 0 <= b.indexOf("-", 0) ? f + d + Array(a + 1).join(" ") : f + Array(a + 1).join(0 <= b.indexOf("0", 0) ? "0" : " ") + d
        }, d: function (a, b, c, d, e, f, g, h) {
            return uc.f(parseInt(a, 10), b, c, d, 0, f, g, h)
        }
    };
    uc.i = uc.d;
    uc.u = uc.d;
    var wc = function (a, b) {
        var c;
        a instanceof wc ? (this.ea = r(b) ? b : a.ea, xc(this, a.ha), this.Pa = a.Pa, this.qa = a.qa, yc(this, a.Na), this.Ma = a.Ma, zc(this, a.a.clone()), this.Ga = a.Ga) : a && (c = pc(String(a))) ? (this.ea = !!b, xc(this, c[1] || "", !0), this.Pa = Ac(c[2] || ""), this.qa = Ac(c[3] || "", !0), yc(this, c[4]), this.Ma = Ac(c[5] || "", !0), zc(this, c[6] || "", !0), this.Ga = Ac(c[7] || "")) : (this.ea = !!b, this.a = new Bc(null, 0, this.ea))
    };
    l = wc.prototype;
    l.ha = "";
    l.Pa = "";
    l.qa = "";
    l.Na = null;
    l.Ma = "";
    l.Ga = "";
    l.ea = !1;
    l.toString = function () {
        var a = [], b = this.ha;
        b && a.push(Cc(b, Dc, !0), ":");
        if (b = this.qa) {
            a.push("//");
            var c = this.Pa;
            c && a.push(Cc(c, Dc, !0), "@");
            a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            b = this.Na;
            null != b && a.push(":", String(b))
        }
        if (b = this.Ma)this.qa && "/" != b.charAt(0) && a.push("/"), a.push(Cc(b, "/" == b.charAt(0) ? Ec : Fc, !0));
        (b = this.a.toString()) && a.push("?", b);
        (b = this.Ga) && a.push("#", Cc(b, Gc));
        return a.join("")
    };
    l.clone = function () {
        return new wc(this)
    };
    var xc = function (a, b, c) {
        a.ha = c ? Ac(b, !0) : b;
        a.ha && (a.ha = a.ha.replace(/:$/, ""))
    }, yc = function (a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)throw Error("Bad port number " + b);
            a.Na = b
        } else a.Na = null
    }, zc = function (a, b, c) {
        b instanceof Bc ? (a.a = b, Hc(a.a, a.ea)) : (c || (b = Cc(b, Jc)), a.a = new Bc(b, 0, a.ea))
    }, Ac = function (a, b) {
        return a ? b ? decodeURI(a) : decodeURIComponent(a) : ""
    }, Cc = function (a, b, c) {
        return w(a) ? (a = encodeURI(a).replace(b, Kc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }, Kc = function (a) {
        a = a.charCodeAt(0);
        return "%" +
            (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, Dc = /[#\/\?@]/g, Fc = /[\#\?:]/g, Ec = /[\#\?]/g, Jc = /[\#\?@]/g, Gc = /#/g, Bc = function (a, b, c) {
        this.a = a || null;
        this.c = !!c
    }, Lc = function (a) {
        a.J || (a.J = new I, a.aa = 0, a.a && qc(a.a, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    };
    l = Bc.prototype;
    l.J = null;
    l.aa = null;
    l.add = function (a, b) {
        Lc(this);
        this.a = null;
        a = Mc(this, a);
        var c = Qa(this.J, a);
        c || Na(this.J, a, c = []);
        c.push(b);
        this.aa++;
        return this
    };
    l.remove = function (a) {
        Lc(this);
        a = Mc(this, a);
        return Pa(this.J.c, a) ? (this.a = null, this.aa -= Qa(this.J, a).length, this.J.remove(a)) : !1
    };
    l.clear = function () {
        this.J = this.a = null;
        this.aa = 0
    };
    l.Ba = function () {
        Lc(this);
        for (var a = this.J.Ca(), b = this.J.Ba(), c = [], d = 0; d < b.length; d++)for (var e = a[d], f = 0; f < e.length; f++)c.push(b[d]);
        return c
    };
    l.Ca = function (a) {
        Lc(this);
        var b = [];
        if (w(a)) {
            var c = a;
            Lc(this);
            c = Mc(this, c);
            Pa(this.J.c, c) && (b = Ea(b, Qa(this.J, Mc(this, a))))
        } else for (a = this.J.Ca(), c = 0; c < a.length; c++)b = Ea(b, a[c]);
        return b
    };
    l.toString = function () {
        if (this.a)return this.a;
        if (!this.J)return "";
        for (var a = [], b = this.J.Ba(), c = 0; c < b.length; c++)for (var d = b[c], e = encodeURIComponent(String(d)), d = this.Ca(d), f = 0; f < d.length; f++) {
            var g = e;
            "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
            a.push(g)
        }
        return this.a = a.join("&")
    };
    l.clone = function () {
        var a = new Bc;
        a.a = this.a;
        this.J && (a.J = this.J.clone(), a.aa = this.aa);
        return a
    };
    var Mc = function (a, b) {
        var c = String(b);
        a.c && (c = c.toLowerCase());
        return c
    }, Hc = function (a, b) {
        b && !a.c && (Lc(a), a.a = null, a.J.forEach(function (a, b) {
            var e = b.toLowerCase();
            b != e && (this.remove(b), this.remove(e), 0 < a.length && (this.a = null, Na(this.J, Mc(this, e), Fa(a)), this.aa += a.length))
        }, a));
        a.c = b
    };
    var Nc = J("Firefox"), Oc = Ua() || J("iPod"), Pc = J("iPad"), Qc = !(J("Chrome") || J("CriOS")) && J("Android"), Rc = J("Chrome") || J("CriOS"), Sc = J("Safari") && !J("Chrome") && !J("CriOS") && !J("Android");
    var Tc = function (a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }, Uc = function () {
    }, Wc = function (a, b, c) {
        switch (typeof b) {
            case "string":
                Vc(b, c);
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
                if (v(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)c.push(e), Wc(a, b[f], c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (e in b)Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), Vc(e, c), c.push(":"), Wc(a, f, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }, Xc = {
        '"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n",
        "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b"
    }, Yc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g, Vc = function (a, b) {
        b.push('"', a.replace(Yc, function (a) {
            if (a in Xc)return Xc[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return Xc[a] = e + b.toString(16)
        }), '"')
    };
    var Zc = function (a) {
        this.g = a.sourceFilename;
        this.a = a.quality;
        this.c = a.mimetype
    };
    var $c = null, bd = function (a, b) {
        var c;
        try {
            c = Tc(a)
        } catch (d) {
            return a
        }
        if (!ca(c))return a;
        ad(c, b);
        var e = [];
        Wc(new Uc, c, e);
        return e.join("")
    }, ad = function (a, b) {
        if (a && ("video" === a.Type || a.DrmVideoData)) {
            var c;
            if (b) {
                c = a.DrmVideoData || {};
                var d = a.Progressive_Url || a.Url || "";
                c = {
                    Za: ".flv" === d.substring(d.length - 4).toLowerCase() ? c.flv_progressive_url || d || c.mp4_url || "" : c.flv_progressive_url || c.mp4_url || d,
                    stream: c.flv_stream_url || a.Stream_Url || ""
                }
            } else {
                c = a.DrmVideoData || {};
                if (!$c) {
                    $c = {qb: !1, jb: !1};
                    var e = document.createElement("VIDEO"),
                        d = e.canPlayType("video/webm"), e = e.canPlayType("video/mp4");
                    $c.qb = !!d && "no" !== d;
                    $c.jb = !!e && "no" !== e || Za
                }
                d = $c;
                c = {
                    Za: (d.qb ? c.webm_url : "") || (d.jb ? c.mp4_url : "") || a.Progressive_Url || a.Url || "",
                    stream: ""
                }
            }
            a.Type = "video";
            a.Url = c.Za;
            a.Progressive_Url = c.Za;
            a.Stream_Url = c.stream;
            delete a.DrmVideoData
        } else if (ca(a))for (c in a)ad(a[c], b)
    };
    var cd = function (a, b, c, d, e) {
        this.name = a;
        this.e = b;
        this.type = c;
        this.k = d;
        this.m = e;
        this.chargeable = !1
    }, dd = function (a) {
        switch (a) {
            case "Exit":
                return "Exit";
            case "Count":
                return "Counter";
            case "Start":
            case "Stop":
                return "Timer";
            default:
                throw"Unsupported event action";
        }
    };
    var ed = function (a, b, c) {
        cd.call(this, a, b, "Exit", !1, !0);
        this.a = c;
        this.j = "_blank";
        this.g = null
    };
    B(ed, cd);
    var fd = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    l = fd.prototype;
    l.clone = function () {
        return new fd(this.left, this.top, this.width, this.height)
    };
    l.contains = function (a) {
        return a instanceof fd ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };
    l.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var gd = {ad: "top", Zc: "right", Wb: "bottom", zc: "left"}, hd = function (a) {
        if (!a)return null;
        a = a.toLowerCase();
        0 == a.lastIndexOf("alignment_", 0) && (a = a.substr(10));
        return ja(gd, a) ? a : null
    };
    var id = function (a) {
        a = a ? a.toLowerCase() : "";
        switch (a) {
            case "normal":
                return "normal";
            case "lightbox":
                return "lightbox";
            case "pushdown":
                return "pushdown"
        }
        return null
    };
    var jd = function (a, b) {
        this.a = a;
        this.expansionMode = b;
        this.c = "pushdown" == b
    };
    var kd = function (a, b, c, d) {
        this.a = a;
        this.k = b;
        this.e = -1 < b;
        this.c = c;
        this.g = -1 < c;
        this.j = d
    };
    var ld = function () {
    };
    var md = function () {
    };
    var nd = function () {
        this.g = this.a = this.c = !1
    };
    var pd = function (a, b) {
        this.top = parseInt(a, 10);
        this.c = od(a);
        this.left = parseInt(b, 10);
        this.a = od(b)
    }, od = function (a) {
        return Ca(qd, function (b) {
                var c = String(b).toLowerCase();
                b = String(a.substr(a.length - b.length, b.length)).toLowerCase();
                return 0 == (c < b ? -1 : c == b ? 0 : 1)
            }) || "px"
    }, qd = ["px", "%", "pxc"];
    var rd = {
        bc: "ad_container_id",
        qc: "hideObjects",
        Tc: "mtfTop",
        Sc: "mtfLeft",
        gd: "zindex",
        gc: "mtfDuration",
        ed: "wmode",
        Uc: "displayHTML5",
        nc: "as_kw",
        oc: "as_lat",
        pc: "as_lng",
        tc: "mtfIFPath",
        lc: "expansionMode",
        Oc: "top_container",
        Nc: "mtfTopFloat",
        Mc: "mtfTopDuration",
        Pc: "mtfTopWmode",
        Kc: "right_container",
        Jc: "mtfRightFloat",
        Ic: "mtfRightDuration",
        Lc: "mtfRightWmode",
        Cc: "bottom_container",
        Bc: "mtfBottomFloat",
        Ac: "mtfBottomDuration",
        Dc: "mtfBottomWmode",
        Gc: "left_container",
        Fc: "mtfLeftFloat",
        Ec: "mtfLeftDuration",
        Hc: "mtfLeftWmode",
        Yc: "mtfRenderFloatInplace",
        fd: "tryToWriteHtmlInline",
        fc: "debugjs",
        wc: "dcapp",
        Xb: "breakoutiframe"
    }, sd = ["mtfTop", "mtfLeft", "wmode", "mtfDuration"], td = function (a) {
        return "The parameter: " + a + " does not have a multi-floating analog. Please use one of the valid parameters: " + sd.join(", ") + "."
    }, ud = function (a, b) {
        switch (a) {
            case "left":
                switch (b) {
                    case "mtfDuration":
                        return "mtfLeftDuration";
                    case "wmode":
                        return "mtfLeftWmode";
                    case "mtfTop":
                    case "mtfLeft":
                        return "mtfLeftFloat";
                    case "ad_container_id":
                        return "left_container";
                    default:
                        throw Error(td(b));
                }
            case "right":
                switch (b) {
                    case "mtfDuration":
                        return "mtfRightDuration";
                    case "wmode":
                        return "mtfRightWmode";
                    case "mtfTop":
                    case "mtfLeft":
                        return "mtfRightFloat";
                    case "ad_container_id":
                        return "right_container";
                    default:
                        throw Error(td(b));
                }
            case "bottom":
                switch (b) {
                    case "mtfDuration":
                        return "mtfBottomDuration";
                    case "wmode":
                        return "mtfBottomWmode";
                    case "mtfTop":
                    case "mtfLeft":
                        return "mtfBottomFloat";
                    case "ad_container_id":
                        return "bottom_container";
                    default:
                        throw Error(td(b));
                }
            case "top":
                switch (b) {
                    case "mtfDuration":
                        return "mtfTopDuration";
                    case "wmode":
                        return "mtfTopWmode";
                    case "mtfTop":
                    case "mtfLeft":
                        return "mtfTopFloat";
                    case "ad_container_id":
                        return "top_container";
                    default:
                        throw Error(td(b));
                }
            default:
                return b
        }
    };
    var vd = function (a, b, c, d, e) {
        this.id = a;
        this.e = b;
        this.j = c;
        this.p = "BANNER" == c || "EXPANDABLE" == c;
        this.width = d.width;
        this.height = d.height;
        this.v = this.n = null;
        this.m = e;
        this.A = 0;
        this.D = this.B = this.o = this.k = this.F = this.a = this.g = this.C = this.c = this.q = null
    }, wd = {
        adContainerElementId: "ad_container_id",
        zIndex: "zindex",
        expansionMode: "expansionMode",
        hideObjects: "hideObjects",
        duration: "mtfDuration",
        wmode: "wmode",
        top: "mtfTop",
        left: "mtfLeft",
        renderFloatInplace: "mtfRenderFloatInplace",
        "multiFloat.top.renderingSlotId": "top_container",
        "multiFloat.top.duration": "mtfTopDuration",
        "multiFloat.top.wmode": "mtfTopWmode",
        "multiFloat.top.position": "mtfTopFloat",
        "multiFloat.right.renderingSlotId": "right_container",
        "multiFloat.right.duration": "mtfRightDuration",
        "multiFloat.right.wmode": "mtfRightWmode",
        "multiFloat.right.position": "mtfRightFloat",
        "multiFloat.bottom.renderingSlotId": "bottom_container",
        "multiFloat.bottom.duration": "mtfBottomDuration",
        "multiFloat.bottom.wmode": "mtfBottomWmode",
        "multiFloat.bottom.position": "mtfBottomFloat",
        "multiFloat.left.renderingSlotId": "left_container",
        "multiFloat.left.duration": "mtfLeftDuration",
        "multiFloat.left.wmode": "mtfLeftWmode",
        "multiFloat.left.position": "mtfLeftFloat"
    }, xd = function (a) {
        var b = a.a && a.a.a;
        if (b) {
            var c = b.left, d = b.top;
            3 >= Math.abs(c) && (b.left = 0);
            3 >= Math.abs(d) && (b.top = 0);
            3 >= Math.abs(c + b.width - a.width) && (0 == b.left ? b.width = a.width : b.left = a.width - b.width);
            3 >= Math.abs(d + b.height - a.height) && (0 == b.top ? b.height = a.height : b.top = a.height - b.height)
        }
    }, yd = function (a) {
        return !!a.c && 0 <= E(a.c.c, "1.0.0") && 0 > E(a.c.c, "2.0.0")
    };
    vd.prototype.toString = function () {
        return "[PrimaryFile " + this.id + "]"
    };
    var zd = function (a) {
        return "BACKUP_IMAGE" != a.j && "PRE_LOADER" != a.j
    }, Ad = function (a, b) {
        if ("zindex"in b) {
            var c = parseInt(b.zindex, 10);
            isNaN(c) || (a.A = c)
        }
        "expansionMode"in b && !C(D(b.expansionMode)) && null !== a.a && (c = id(b.expansionMode), null !== c && (a.a.expansionMode = c));
        "hideObjects"in b && !C(D(b.hideObjects)) && null !== a.k && (a.k.a = "true" == b.hideObjects);
        c = null;
        if (null !== a.g) {
            var c = a.g.j || null, d = ud(c, "mtfDuration"), d = parseInt(b[d], 10);
            isNaN(d) || (a.g.c = d, a.g.g = !0);
            d = [];
            if (null === c)d[0] = b.mtfTop, d[1] = b.mtfLeft; else {
                var e =
                    ud(c, "mtfTop");
                null != b[e] && (d = b[e].split(","))
            }
            2 <= d.length && (e = parseInt(d[0], 10), isNaN(e) || (a.g.a.top = e, a.g.a.c = od(d[0])), e = parseInt(d[1], 10), isNaN(e) || (a.g.a.left = e, a.g.a.a = od(d[1])))
        }
        if (a.p || "true" == b.mtfRenderFloatInplace)d = ud(c, "ad_container_id"), d = b[d], C(D(d)) || (a.v = d);
        a.c && (c = ud(c, "wmode"), c = qa(b[c]), null !== c && (a.c.a = c))
    };
    !L && !K || K && K && 9 <= db || L && N("1.9.1");
    K && N("9");
    var Dd = function (a) {
        return a ? new Bd(Cd(a)) : sa || (sa = new Bd)
    }, Ed = function (a, b) {
        return w(b) ? a.getElementById(b) : b
    }, Gd = function (a, b) {
        ha(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Fd ? a.setAttribute(Fd[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }, Fd = {
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
    }, Hd = function (a) {
        return a.parentWindow || a.defaultView
    }, Id = function (a) {
        return "CSS1Compat" == a.compatMode
    }, Jd = function (a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    }, Cd = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }, Bd = function (a) {
        this.a = a || n.document || document
    };
    Bd.prototype.S = function (a) {
        return Ed(this.a, a)
    };
    Bd.prototype.appendChild = function (a, b) {
        a.appendChild(b)
    };
    Bd.prototype.c = Jd;
    Bd.prototype.contains = function (a, b) {
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    };
    var Kd = function () {
        return M ? "Webkit" : L ? "Moz" : K ? "ms" : Va ? "O" : null
    };
    var Ld = !1, Md = "", Nd = function (a) {
        a = a.match(/[\d]+/g);
        if (!a)return "";
        a.length = 3;
        return a.join(".")
    };
    if (navigator.plugins && navigator.plugins.length) {
        var Od = navigator.plugins["Shockwave Flash"];
        Od && (Ld = !0, Od.description && (Md = Nd(Od.description)));
        navigator.plugins["Shockwave Flash 2.0"] && (Ld = !0, Md = "2.0.0.11")
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var Pd = navigator.mimeTypes["application/x-shockwave-flash"];
        (Ld = Pd && Pd.enabledPlugin) && (Md = Nd(Pd.enabledPlugin.description))
    } else try {
        var Qd = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), Ld = !0, Md = Nd(Qd.GetVariable("$version"))
    } catch (Rd) {
        try {
            Qd =
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), Ld = !0, Md = "6.0.21"
        } catch (Sd) {
            try {
                Qd = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Ld = !0, Md = Nd(Qd.GetVariable("$version"))
            } catch (Td) {
            }
        }
    }
    var Ud = Md;
    var Vd = function (a) {
        return (a = a.exec(Ra)) ? a[1] : ""
    }, Wd = function () {
        if (Nc)return Vd(/Firefox\/([0-9.]+)/);
        if (K || Va)return ab;
        if (Rc)return Vd(/Chrome\/([0-9.]+)/);
        if (Sc && !(Ua() || J("iPad") || J("iPod")))return Vd(/Version\/([0-9.]+)/);
        if (Oc || Pc) {
            var a;
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(Ra))return a[1] + "." + a[2]
        } else if (Qc)return (a = Vd(/Android\s+([0-9.]+)/)) ? a : Vd(/Version\/([0-9.]+)/);
        return ""
    }();
    var Xd = function (a) {
        return (K || L || M || Va || !1) && !Wa && 0 <= E(Ud, a)
    }, Yd = function (a, b, c) {
        if (!window.postMessage)return !1;
        b = v(b) ? Fa(b) : [];
        a || (Da(b, "Modernizr.canvas"), c && Da(b, "Modernizr.cssanimations"));
        return 0 == b.length ? !0 : Ba(b, function (b) {
            if ("svgFilters" == b) {
                if (!(K && N("10") && K && 10 <= db || Rc && 0 <= E(Wd, "18") || Nc && 0 <= E(Wd, "11")))return !1
            } else if ("svgFeImage" == b) {
                if (!(K && N("10") && K && 10 <= db || Rc && 0 <= E(Wd, "29")))return !1
            } else if (/Modernizr.canvas/.test(b)) {
                if (!(document.createElement("canvas").getContext || K && 0 <= E(Wd,
                        "9")))return !1
            } else if (/Modernizr.cssanimations/.test(b)) {
                if (b = (!M && Id(document) ? document.documentElement : document.body || document.documentElement).style, !r(b.animationName) && !r(b[Kd() + "AnimationName"]))return !1
            } else if (!a || !t(b))return !1;
            return !0
        })
    }, Zd = function (a) {
        return 0 <= E(Ud, "9.115") || 0 <= E(Ud, "9.28") && "window" == a
    };
    var $d = "undefined_type", be = function () {
        return ae || (ae = "200_67_" + $d)
    }, ce = 0, ae = null;
    var de = {
        Wc: "varName",
        dc: "creativeId",
        Vb: "assetId",
        ac: "click",
        jc: "clickN",
        Zb: "assets",
        cd: "vcData",
        ic: "exitEvents",
        cc: "googleDiscoveryUrl",
        sc: "adSiteUrl",
        $c: "isGCNAd",
        rc: "td",
        Vc: "assetType",
        mc: "isFlashFullScreenEnabled",
        Yb: "br",
        Rc: "os",
        Tb: "sn",
        Sb: "sid",
        Jb: "adv",
        Lb: "buy",
        Qb: "pid",
        Kb: "aid",
        Nb: "cid",
        Rb: "rid",
        Pb: "kid",
        Ob: "geo",
        Mb: "randomNumber",
        hc: "dcData",
        xc: "ispushdown",
        kc: "expEnv",
        yc: "layoutsConfig",
        Xc: "rv",
        ec: "customMetaData"
    }, ee = function (a) {
        this.a = a
    }, fe = function (a) {
        switch (a) {
            case "BANNER":
                return "Inpage";
            case "FLOATING":
                return "Floating";
            case "EXPANDABLE":
                return "Expanding";
            case "OVERLAY":
                return "Overlay";
            default:
                return ""
        }
    }, ie = function (a, b) {
        var c, d, e = [], f = a.a.m;
        c = [];
        d = [];
        if ("FLASH" == b.e)c = ["video/x-flv"], d = ["video/mp4"]; else {
            var g = document.createElement("VIDEO");
            g && g.canPlayType && (g.canPlayType("video/webm").replace(/no/, "") && d.push("video/webm"), (g.canPlayType("video/mp4").replace(/no/, "") || Za) && d.push("video/mp4"))
        }
        g = a.a;
        if (!g.k) {
            g.k = {};
            for (var h = 0; h < g.m.length; h++) {
                var k = g.m[h], m = k.name.toLowerCase();
                if (k.e) {
                    var k = k.e, z = k.g.toLowerCase(), p = g.k[z];
                    p || (p = {}, g.k[z] = p);
                    z = p[k.a];
                    z || (z = {}, p[k.a] = z);
                    z[k.c] = m
                } else g.k[m] || (g.k[m] = {})
            }
        }
        var g = g.k, q;
        for (q in g) {
            (h = ge(g, q, c)) || (h = ge(g, q, d));
            m = h || q;
            h = null;
            for (k = 0; k < f.length; k++)f[k].name.toLowerCase() === m && (h = f[k]);
            if (h) {
                he(a, e, q, h);
                for (var Ic in g[q]) {
                    var m = g[q][Ic], ue;
                    for (ue in m)k = m[ue], g[k] || he(a, e, k, h)
                }
            }
        }
        return yd(b) ? e.join("&") : escape(e.join("&"))
    }, he = function (a, b, c, d) {
        d.g ? (b.push(je("PRO_" + c, d.a)), null != d.c && b.push(je("STR_" + c, d.c))) : b.push(je(c, /^https?:/.test(d.a) ?
            d.a : ke(a.a) + d.a))
    }, ge = function (a, b, c) {
        if (!c.length || !a[b] || ka(a[b]))return null;
        var d = function (d, e) {
            for (; 1 <= d && 5 >= d;) {
                var h = a[b][d];
                if (h)for (var k = 0; k < c.length; k++)if (h[c[k]])return h[c[k]];
                d += e
            }
            return null
        }, e = d(5, -1);
        e || (e = d(6, 1));
        return e
    }, le = function (a) {
        var b = [];
        a = a.a.Ya;
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            b.push(escape(vc("name:%s,vfp_low:%s,vfp_mid:%s,vfp_high:%s,pfp_low:%s,pfp_mid:%s,pfp_high:%s", escape(d.m), escape(d.e || ""), escape(d.k || ""), escape(d.c || ""), escape(d.g || ""), escape(d.j || ""),
                escape(d.a || ""))))
        }
        return b.join("{DELIM}")
    }, me = function (a, b) {
        var c = [], d = a.a.o, e;
        for (e in d) {
            var f = d[e], g = vc("name:%s,url:%s,target:%s", escape(f.name), escape(f.a).replace(/\+/g, "%2B"), f.g ? "popup" : escape(f.j));
            if (/,/.test(f.a) && !yd(b) || b.c && 0 <= E(b.c.c, "2.0.0"))g = escape(g);
            c.push(g)
        }
        return c.join("{DELIM}")
    }, ne = function () {
        var a = new wc(!/^http/.test(window.location.href) && sc(window.parent) ? window.parent.location.href : window.location.href);
        return a.ha + "://" + a.qa
    }, oe = function (a) {
        if (a.a.c) {
            if (!C(D(a.a.$)) &&
                0 != a.a.$.indexOf("%"))return a.a.$;
            if ((a = document.getElementsByTagName("base")) && a.length && !C(D(a[0].href)))return a[0].href
        }
        return tc()
    }, pe = function (a, b) {
        var c = [], d;
        for (d in b)c.push(U(a, d, b[d]));
        return c.join("&")
    };
    ee.prototype.c = function (a) {
        return encodeURIComponent(a).replace(/[!'()*]/g, Ka())
    };
    var U = function (a, b, c) {
        return a.c(b) + "=" + a.c(String(c))
    }, je = function (a, b) {
        return escape(a) + "=" + escape(String(b))
    };
    var re = function (a, b, c) {
        if (w(b))(b = qe(a, b)) && (a.style[b] = c); else for (var d in b) {
            c = a;
            var e = b[d], f = qe(c, d);
            f && (c.style[f] = e)
        }
    }, se = {}, qe = function (a, b) {
        var c = se[b];
        if (!c) {
            var d = ua(b), c = d;
            void 0 === a.style[d] && (d = Kd() + va(d), void 0 !== a.style[d] && (c = d));
            se[b] = c
        }
        return c
    }, ve = function (a, b, c) {
        if (b instanceof Q)c = b.height, b = b.width; else if (void 0 == c)throw Error("missing height argument");
        a.style.width = te(b, !0);
        a.style.height = te(c, !0)
    }, te = function (a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    };
    var we = function (a, b, c, d) {
        P.call(this, a);
        this.c = b;
        this.j = c;
        this.q = !!d
    };
    B(we, P);
    var xe = function (a, b, c, d) {
        "Count" == b && (d = !0);
        we.call(this, a, b, !0, d);
        this.g = c
    };
    B(xe, we);
    var ye = function (a, b, c, d, e) {
        we.call(this, a, b, !1, e);
        this.e = c;
        this.m = d
    };
    B(ye, we);
    var ze = function (a, b, c, d) {
        ye.call(this, a, "Exit", b, !0);
        this.k = "null" != c ? c : null;
        this.g = "null" != d ? d : null
    };
    B(ze, ye);
    var Ae = {
        DISPLAY_TIMER: {id: null, type: "Timer", L: !0, N: !0},
        INTERACTION_TIMER: {id: null, type: "Timer", L: !0, N: !0},
        INTERACTIVE_IMPRESSION: {id: null, type: "Counter", L: !0, N: !1},
        MANUAL_CLOSE: {id: null, type: "Counter", L: !0, N: !0},
        BACKUP_IMAGE_IMPRESSION: {id: null, type: "Counter", L: !0, N: !0},
        EXPAND_TIMER: {id: null, type: "Timer", L: !0, N: !1},
        VIDEO_PLAY: {id: null, type: "Counter", L: !0, N: !1},
        VIDEO_VIEW_TIMER: {id: null, type: "Timer", L: !0, N: !0},
        VIDEO_COMPLETE: {id: null, type: "Counter", L: !0, N: !1},
        VIDEO_INTERACTION: {
            id: null, type: "Counter",
            L: !0, N: !0
        },
        VIDEO_PAUSE: {id: null, type: "Counter", L: !0, N: !0},
        VIDEO_MUTE: {id: null, type: "Counter", L: !0, N: !0},
        VIDEO_REPLAY: {id: null, type: "Counter", L: !0, N: !0},
        VIDEO_MIDPOINT: {id: null, type: "Counter", L: !0, N: !0},
        VIDEO_STOP: {id: null, type: "Counter", L: !0, N: !0},
        VIDEO_UNMUTE: {id: null, type: "Counter", L: !0, N: !0},
        FULL_SCREEN: {id: null, type: "Counter", L: !0, N: !0},
        DYNAMIC_CREATIVE_IMPRESSION: {id: null, type: "Counter", L: !0, N: !0},
        HTML5_CREATIVE_IMPRESSION: {id: null, type: "Counter", L: !0, N: !0}
    }, Be = function (a) {
        var b = Ae[a];
        return b ?
            new cd(a, b.id, b.type, b.L, b.N) : null
    };
    var De = function (a) {
        R.call(this);
        this.a = this.k = null;
        this.e = new T(this);
        this.n = !1;
        if (!Ce) {
            this.a = new gc(100);
            this.e.c(this.a, "tick", this.j);
            var b = this.a;
            b.j = !0;
            b.a || (b.a = b.e.setTimeout(b.m, b.k), b.n = A());
            this.e.c(document, "DOMContentLoaded", this.j);
            this.e.c(document, "readystatechange", this.j);
            this.e.c(window, "load", this.m);
            this.j();
            null != a && "number" == typeof a && hc(this.m, a, this)
        }
    };
    B(De, R);
    var Ce = !1;
    De.prototype.j = function () {
        var a;
        if (a = K) {
            a = !1;
            try {
                a = null == window.frameElement
            } catch (b) {
            }
        }
        a && document.documentElement.doScroll ? a = Ee() : "undefined" === document.readyState ? document.getElementsByTagName ? (a = document.getElementsByTagName("*"), a = 0 < a.length ? a[a.length - 1] : null, this.k && a && this.k == a ? a = !0 : (this.k = a, a = !1)) : a = !1 : a = "complete" === document.readyState;
        a && this.m()
    };
    var Ee = function () {
        if (!document.documentElement.doScroll)return !1;
        try {
            return document.documentElement.doScroll("left"), !0
        } catch (a) {
            return !1
        }
    };
    De.prototype.g = function () {
        Fe(this);
        De.M.g.call(this)
    };
    var Fe = function (a) {
        a.e.R();
        a.a && (a.a.R(), a.a = null)
    };
    De.prototype.m = function () {
        this.n || (Ce = this.n = !0, Fe(this), S(this, new P("ready")))
    };
    var Ge = function () {
    };
    aa(Ge);
    Ge.prototype.a = 0;
    var V = function (a) {
        R.call(this);
        this.m = a || Dd();
        this.C = null;
        this.fa = !1;
        this.a = null;
        this.k = void 0;
        this.p = this.A = this.n = null
    };
    B(V, R);
    V.prototype.ba = Ge.getInstance();
    V.prototype.j = function () {
        return this.C || (this.C = ":" + (this.ba.a++).toString(36))
    };
    V.prototype.S = function () {
        return this.a
    };
    var He = function (a) {
        a.k || (a.k = new T(a));
        return a.k
    };
    V.prototype.O = function (a) {
        if (this.n && this.n != a)throw Error("Method not supported");
        V.M.O.call(this, a)
    };
    V.prototype.D = function () {
        this.a = this.m.a.createElement("div")
    };
    var Ie = function (a, b, c) {
        if (a.fa)throw Error("Component already rendered");
        a.a || a.D();
        b ? b.insertBefore(a.a, c || null) : a.m.a.body.appendChild(a.a);
        a.n && !a.n.fa || a.sa()
    };
    V.prototype.Qa = function (a) {
        this.a = a
    };
    V.prototype.sa = function () {
        this.fa = !0;
        Je(this, function (a) {
            !a.fa && a.S() && a.sa()
        })
    };
    V.prototype.Aa = function () {
        Je(this, function (a) {
            a.fa && a.Aa()
        });
        this.k && cc(this.k);
        this.fa = !1
    };
    V.prototype.g = function () {
        this.fa && this.Aa();
        this.k && (this.k.R(), delete this.k);
        Je(this, function (a) {
            a.R()
        });
        this.a && Jd(this.a);
        this.n = this.a = this.p = this.A = null;
        V.M.g.call(this)
    };
    var Je = function (a, b) {
        a.A && F(a.A, b, void 0)
    };
    V.prototype.removeChild = function (a, b) {
        if (a) {
            var c = w(a) ? a : a.j(), d;
            this.p && c ? (d = this.p, d = (c in d ? d[c] : void 0) || null) : d = null;
            a = d;
            if (c && a) {
                d = this.p;
                c in d && delete d[c];
                G(this.A, a);
                b && (a.Aa(), a.a && Jd(a.a));
                c = a;
                if (null == c)throw Error("Unable to set parent component");
                c.n = null;
                V.M.O.call(c, null)
            }
        }
        if (!a)throw Error("Child is not in parent component");
        return a
    };
    var Ke = function (a) {
        V.call(this, a)
    };
    B(Ke, V);
    Ke.prototype.j = function () {
        return this.C || (this.C = be() + "_" + (ce++).toString(36))
    };
    Ke.prototype.toString = function () {
        return this.j()
    };
    var Le = function (a) {
        Je(a, function (a) {
            Le(a)
        })
    }, Me = function (a) {
        Je(a, function (a) {
            Me(a)
        })
    }, Ne = function (a) {
        Je(a, function (a) {
            Ne(a)
        })
    }, Oe = function (a) {
        Je(a, function (a) {
            Oe(a)
        })
    };
    Ke.prototype.ya = function (a, b) {
        ve(this.S(), a, b);
        Je(this, function (a) {
            a.ya("100%", "100%")
        })
    };
    var Pe = function (a, b, c) {
        V.call(this, c);
        this.ca = a;
        this.X = b;
        if (b = a.a && a.a.a)b = a.a.a, b = new Q(b.width, b.height);
        this.W = b || new Q(a.width, a.height);
        this.G = !1;
        this.H = [];
        this.I = null
    };
    B(Pe, Ke);
    l = Pe.prototype;
    l.Fb = function () {
        for (this.G = !0; 0 < this.H.length;)this.H.shift()
    };
    l.Gb = function () {
        this.G = !1
    };
    l.Qa = function (a) {
        Pe.M.Qa.call(this, a);
        a.style.position = "relative";
        ve(a, this.W.width, this.W.height);
        "boxSizing"in a.style && (a.style.boxSizing = "content-box");
        var b = this.X.H;
        (null == b ? 0 : b.g && 1 == this.X.e.length) && Qe(b, a)
    };
    l.sa = function () {
        var a = He(this);
        a.c(this, "conduitInitialized", this.Fb);
        a.c(this, "RESET", this.Gb);
        Pe.M.sa.call(this);
        var b = He(this);
        this.I = new De(5E3);
        Ce ? this.V() : b.c(this.I, "ready", this.V);
        b = this.S();
        a.c(b, "mouseover", this.xb);
        a.c(b, "mouseout", this.fb);
        a.c(this, "logEvent", this.eb);
        a.c(this, "logExitFlushEventsOpenPopup", this.eb)
    };
    l.xb = function () {
        Re(this, "1")
    };
    l.fb = function () {
        Re(this, "0")
    };
    l.eb = function (a) {
        "Exit" == dd(a.c) && this.fb()
    };
    var Re = function (a, b) {
        a.G || a.H.push({name: "isMouseOver", value: b})
    };
    var Se = function (a, b, c) {
        Pe.call(this, a, b, c);
        this.o = b;
        this.e = null
    };
    B(Se, Pe);
    Se.prototype.V = function () {
        null != this.e || Te(this)
    };
    Se.prototype.ya = function (a, b) {
        Se.M.ya.call(this, a, b);
        ve(this.e, "100%", "100%")
    };
    var Ue = function (a) {
        a = a.slice(0, a.lastIndexOf("/") + 1);
        /^\/+$/.test(a) || (a = a.replace(/\/+$/, ""));
        return a
    };
    var Ve = function (a, b) {
        null != a && this.a.apply(this, arguments)
    };
    Ve.prototype.c = "";
    Ve.prototype.a = function (a, b, c) {
        this.c += a;
        if (null != b)for (var d = 1; d < arguments.length; d++)this.c += arguments[d];
        return this
    };
    Ve.prototype.clear = function () {
        this.c = ""
    };
    Ve.prototype.toString = function () {
        return this.c
    };
    var We = function (a, b, c) {
        var d = [], e;
        for (e in a)d.push([encodeURIComponent(e), encodeURIComponent(a[e])]);
        for (a = 0; a < b.length; a++)if (e = b[a], "FLASH" == e.e) {
            e.m && (b = Ue(e.m) + "/", d.push(["moviePath", b]), d.push(["moviepath", b]));
            break
        }
        for (a = 0; a < c.length; a++)d.push(["submovie" + (a + 1), encodeURIComponent(c[a].a)]);
        return za(d, function (a) {
            return a.join("=")
        }).join("&")
    }, Xe = function (a, b, c) {
        var d = a + "_DoFSCommand";
        Hd(b.a)[d] = c;
        c = null;
        K && (c = b.a.createElement("script"), c.event = "FSCommand(command,args)", c.htmlFor = a, c.text =
            d + "(command, args)", a = null, d = b.a, d.querySelectorAll && d.querySelector ? d = d.querySelectorAll("HEAD") : d = d.getElementsByTagName("HEAD"), d && 0 != d.length ? a = d[0] : a = b.a.documentElement, b.appendChild(a, c));
        return c
    };
    var Ye = function (a, b, c) {
        Se.call(this, a, b, c);
        this.v = "FLASH_" + this.j();
        this.U = this.T = this.Q = null;
        this.K = a.c.j || ""
    };
    B(Ye, Se);
    Ye.prototype.D = function () {
        Ye.M.D.call(this);
        this.Qa(this.S())
    };
    Ye.prototype.sa = function () {
        Ye.M.sa.call(this);
        Te(this);
        var a = this.o.o, b;
        for (b in a) {
            var c = a[b];
            if (c.g) {
                this.T = c.a;
                this.U = c.g;
                this.Q = Xe(this.v, this.m, y(this.$, this));
                break
            }
        }
    };
    var Te = function (a) {
        var b = a.ca, c = a.o, d = a.j(), e = {};
        (e.src = b.m) && (e.base = Ue(b.m));
        e.width = b.width;
        e.height = b.height;
        e.wmode = b.c.a;
        e.allowScriptAccess = b.c.e;
        var c = new ee(c), f = b.c, f = f ? 3 == f.g ? escape : c.c : Ja, d = [U(c, "varName", d), U(c, "creativeId", c.a.q), U(c, "assetId", b.id), U(c, "rv", "200_67"), U(c, "assetType", fe(b.j)), U(c, "layoutsConfig", b.B || null || ""), U(c, "click", c.a.F), U(c, "clickN", c.a.C), U(c, "assets", ie(c, b)), U(c, "vcData", le(c)), U(c, "exitEvents", me(c, b)), U(c, "sn", c.a.a.sn || ""), U(c, "sid", c.a.a.sid || ""), U(c,
            "adv", c.a.a.adv || ""), U(c, "buy", c.a.a.buy || ""), U(c, "pid", c.a.a.pid || ""), U(c, "aid", c.a.a.aid || ""), U(c, "cid", c.a.a.cid || ""), U(c, "rid", c.a.a.rid || ""), c.a.a.geo || "", U(c, "br", L ? "ff" : Rc ? "cr" : Sc ? "sf" : K ? "ie" : "ot"), U(c, "isFlashFullScreenEnabled", Zd(b.c && b.c.a || "transparent")), U(c, "td", ne()), U(c, "adSiteUrl", oe(c)), U(c, "googleDiscoveryUrl", c.a.c ? "http://pagead2.googlesyndication.com/pagead/ads?client=dclk-3pas-query&output=xml&geo=true&adtest=on" : "http://pagead2.googlesyndication.com/pagead/ads?client=dclk-3pas-query&output=xml&geo=true"),
            U(c, "dcData", f(bd(c.a.Q, "FLASH" === b.e))), U(c, "customMetaData", pe(c, Ze(c.a))), U(c, "ispushdown", !(!b.a || !b.a.c)), U(c, "expEnv", ("gdn" == lc() ? "adsense" : "basic").toString()), pe(c, Ze(c.a))].join("&");
        e.flashvars = d;
        c = b.a && b.a.a;
        if (d = b.c)if (d = b.c.a, !(d = Xa && (M && !N("534") || Sc && !(0 <= E(Wd, "5.1")) || L && !N("11")) || Ya && "window" == d.toLowerCase()))if (null != c && null != b && Rc && !sc(top)) {
            d = new Ha(c.top, c.left + c.width, c.top + c.height, c.left);
            c = (new Q(c.width, c.height)).clone();
            f = window.document;
            f = Id(f) ? f.documentElement : f.body;
            f = new Q(f.clientWidth, f.clientHeight);
            if (b = 0 < d.left && d.right == b.width)b = new Q(c.width, c.height), b = f == b ? !0 : f && b ? f.width == b.width && f.height == b.height : !1;
            d = b
        } else d = !1;
        d && (e.flashvars += "&scaleMode=noScale");
        e.id = e.name = a.v;
        "window" == e.wmode && Hd(a.m.a).IN_ADSENSE_IFRAME && (e.wmode = "opaque");
        var b = [], d = a.o.o, g;
        for (g in d)c = d[g], b[c.name] = c.a;
        e.flashVars = We(b, a.o.e, a.o.m);
        "" != a.K && (e.bgcolor = a.K);
        g = a.S();
        var b = {}, d = {}, c = !1, h;
        for (h in e)switch (f = e[h], h.toLowerCase()) {
            case "codebase":
            case "pluginspage":
            case "type":
            case "classid":
            case "minversion":
                break;
            case "src":
            case "movie":
                K ? d.movie = f : b.data = f;
                break;
            case "querystring":
            case "flashvars":
                K ? d.FlashVars = f : b.FlashVars = f;
                break;
            case "width":
            case "height":
            case "align":
            case "vspace":
            case "hspace":
            case "class":
            case "title":
            case "accesskey":
            case "name":
            case "id":
            case "tabindex":
            case "alt":
            case "onmouseover":
            case "onmouseout":
            case "swliveconnect":
                b[h] = f;
                break;
            case "allowscriptaccess":
            case "base":
                K ? d[h] = f : b[h] = f;
                break;
            case "wmode":
                c = Zd(f);
                K ? d[h] = f : b[h] = f;
                break;
            default:
                d[h] = f
        }
        c && (K ? (d.allowFullScreenInteractive =
            "true", d.allowFullScreen = "true") : (b.allowFullScreenInteractive = "true", b.allowFullScreen = "true"));
        e = new Ve;
        e.a("<object");
        K && !N(11) ? e.a(' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"') : e.a(' type="application/x-shockwave-flash"');
        for (var k in b)e.a(" "), e.a(k), e.a('="'), e.a(b[k]), e.a('"');
        e.a(">");
        for (var m in d)e.a('<param name="'), e.a(m), e.a('" value="'), e.a(d[m]), e.a('"/>');
        e.a("</object>");
        g.innerHTML = e.toString();
        k = g.firstChild;
        k.style.outline = "none";
        a.e = k
    };
    Ye.prototype.Aa = function () {
        if (K) {
            this.e.style.display = "none";
            for (var a in this.e)x(this.e[a]) && (this.e[a] = null)
        }
        this.m.c(this.e);
        this.e = null;
        this.S().innerHTML = "";
        Xe(this.v, this.m, this.Q);
        Ye.M.Aa.call(this)
    };
    Ye.prototype.$ = function (a) {
        if ("openWindow" == a) {
            a = Hd(this.m.a);
            var b = this.U || "";
            if (!/(left=|top=)/.test(b)) {
                for (var c = {}, b = b.split(","), d = 0; d < b.length; d++) {
                    var e = b[d].split("=");
                    c[e[0]] = e[1] || ""
                }
                c.left = Math.floor((a.screen.width - c.width) / 2);
                c.top = Math.floor((a.screen.height - c.height) / 2);
                var b = [], f;
                for (f in c)b.push(f + "=" + c[f]);
                b = b.join(",")
            }
            a.open(this.T, this.v, b)
        }
    };
    var $e = function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    };
    var af = document;
    var bf = null;
    var cf = function (a) {
        this.a = !!a
    };
    cf.prototype.a = !1;
    var df = function (a, b) {
        if (!a.a && !C(D(b))) {
            window.studioV2_image_requests || (window.studioV2_image_requests = []);
            var c = document.createElement("img");
            c.src = b;
            window.studioV2_image_requests.push(c)
        }
    };
    var ef = function (a, b, c) {
        this.name = a;
        this.a = b;
        c && (this.a = this.a.replace(/^http:\/\//, "https://"));
        this.g = !1;
        this.e = this.c = null
    }, ff = function (a, b) {
        var c = new ef(a.name, a.url, b);
        if (a.isVideo) {
            var d = a.streamingUrl, e = a.transcodeInformation;
            c.g = !0;
            c.c = d || null;
            c.e = e ? new Zc(e) : null
        }
        return c
    };
    var gf = function () {
    };
    ga("studio.common.Environment", gf);
    var hf = {LIVE: 1, LOCAL: 2, BROWSER: 4, IN_APP: 8, LAYOUTS_PREVIEW: 16, CREATIVE_TOOLSET: 32};
    gf.Type = hf;
    var jf = 6;
    gf.hasType = function (a) {
        return (jf & a) == a
    };
    var kf = function (a, b) {
        (8 & a) == a && (jf |= a, jf &= ~b)
    };
    var lf = function (a) {
        return (a = a.match(/([^:]+):([^:]*):([^:]*):(.+)/)) && 5 == a.length ? {
            type: a[1],
            name: unescape(a[2]),
            videoName: unescape(a[3]),
            trigger: a[4]
        } : null
    };
    /*
     Portions of this code are from MochiKit, received by
     The Closure Authors under the MIT license. All other code is Copyright
     2005-2009 The Closure Authors. All Rights Reserved.
     */
    var mf = function (a, b) {
        this.e = [];
        this.p = b || null;
        this.a = this.c = !1;
        this.g = void 0;
        this.B = this.n = this.k = !1;
        this.j = 0;
        this.m = null;
        this.o = 0
    };
    mf.prototype.q = function (a, b) {
        this.k = !1;
        nf(this, a, b)
    };
    var nf = function (a, b, c) {
        a.c = !0;
        a.g = c;
        a.a = !b;
        of(a)
    }, qf = function (a) {
        if (a.c) {
            if (!a.B)throw new pf;
            a.B = !1
        }
    }, rf = function (a, b, c) {
        a.e.push([b, c, void 0]);
        a.c && of(a)
    };
    mf.prototype.then = function (a, b, c) {
        var d, e, f = new Tb(function (a, b) {
            d = a;
            e = b
        });
        rf(this, d, function (a) {
            e(a)
        });
        return f.then(a, b, c)
    };
    Qb(mf);
    var sf = function (a) {
        return Aa(a.e, function (a) {
            return x(a[1])
        })
    }, of = function (a) {
        if (a.j && a.c && sf(a)) {
            var b = a.j, c = tf[b];
            c && (n.clearTimeout(c.Ha), delete tf[b]);
            a.j = 0
        }
        a.m && (a.m.o--, delete a.m);
        for (var b = a.g, d = c = !1; a.e.length && !a.k;) {
            var e = a.e.shift(), f = e[0], g = e[1], e = e[2];
            if (f = a.a ? g : f)try {
                var h = f.call(e || a.p, b);
                r(h) && (a.a = a.a && (h == b || h instanceof Error), a.g = b = h);
                Rb(b) && (d = !0, a.k = !0)
            } catch (k) {
                b = k, a.a = !0, sf(a) || (c = !0)
            }
        }
        a.g = b;
        d && (h = y(a.q, a, !0), d = y(a.q, a, !1), b instanceof mf ? (rf(b, h, d), b.n = !0) : b.then(h, d));
        c &&
        (b = new uf(b), tf[b.Ha] = b, a.j = b.Ha)
    }, pf = function () {
        ra.call(this)
    };
    B(pf, ra);
    pf.prototype.message = "Deferred has already fired";
    pf.prototype.name = "AlreadyCalledError";
    var uf = function (a) {
        this.Ha = n.setTimeout(y(this.c, this), 0);
        this.a = a
    };
    uf.prototype.c = function () {
        delete tf[this.Ha];
        throw this.a;
    };
    var tf = {};
    var yf = function (a) {
        var b = {}, c = b.document || document, d = document.createElement("SCRIPT"), e = {
            a: d,
            Ib: void 0
        }, f = new mf(0, e), g = null, h = null != b.timeout ? b.timeout : 5E3;
        0 < h && (g = window.setTimeout(function () {
            vf(d, !0);
            var b = new wf(1, "Timeout reached for loading script " + a);
            qf(f);
            nf(f, !1, b)
        }, h), e.Ib = g);
        d.onload = d.onreadystatechange = function () {
            d.readyState && "loaded" != d.readyState && "complete" != d.readyState || (vf(d, b.jd || !1, g), qf(f), nf(f, !0, null))
        };
        d.onerror = function () {
            vf(d, !0, g);
            var b = new wf(0, "Error while loading script " +
            a);
            qf(f);
            nf(f, !1, b)
        };
        Gd(d, {type: "text/javascript", charset: "UTF-8", src: a});
        xf(c).appendChild(d)
    }, xf = function (a) {
        var b = a.getElementsByTagName("HEAD");
        return b && 0 != b.length ? b[0] : a.documentElement
    }, vf = function (a, b, c) {
        null != c && n.clearTimeout(c);
        a.onload = u;
        a.onerror = u;
        a.onreadystatechange = u;
        b && window.setTimeout(function () {
            Jd(a)
        }, 0)
    }, wf = function (a, b) {
        var c = "Jsloader error (code #" + a + ")";
        b && (c += ": " + b);
        ra.call(this, c)
    };
    B(wf, ra);
    var zf = function (a, b) {
        this.a = a || "";
        this.g = !C(this.a) && 8 != b;
        this.c = !1
    }, Qe = function (a, b) {
        b.setAttribute("id", "DfaVisibilityIdentifier_" + A());
        b.className = "GoogleActiveViewClass";
        b._avi_ = a.a;
        a.c || (yf("//pagead2.googlesyndication.com/pagead/js/lidar.js"), a.c = !0)
    };
    var Af = function (a, b, c) {
        this.a = a;
        this.c = b;
        this.g = !!c
    }, Bf = {$b: "CLICK", vc: "IMPRESSION_JS", uc: "IMPRESSION_IMG", Ub: "ARTWORK_IMPRESSION"}, Cf = function (a) {
        if (a.g) {
            var b = a.a;
            if (!a.c.a && !C(D(b)) && null !== b && (af.body ? (bf || (a = af.createElement("iframe"), a.style.display = "none", a.id = "anonIframe", bf = a, af.body.appendChild(a)), a = !0) : a = !1, a)) {
                a = bf.contentWindow;
                a.google_image_requests || (a.google_image_requests = []);
                var c = a.document.createElement("img");
                c.src = b;
                a.google_image_requests.push(c)
            }
        } else df(a.c, a.a)
    };
    var Df = function () {
        this.g = this.e = this.height = this.width = this.c = this.target = this.a = ""
    }, Ef = function (a) {
        var b = Ca(a.primaryFiles, function (a) {
            return "BACKUP_IMAGE" == a.renderAs
        });
        if (null === b)return null;
        var c = new Df;
        c.c = b.url || c.c;
        c.width = b.width || c.width;
        c.height = b.height || c.height;
        b = Ca(a.exitEvents, function (a) {
            return !!a.backUpExit
        });
        null !== b && (c.a = b.destinationUrl || c.a, c.target = b.targetWindow || c.target);
        b = Ca(a.thirdPartyUrls, function (a) {
            return "IMPRESSION_IMG" == a.type
        });
        null !== b && (c.g = b.url || c.g);
        a = a.eventTrackingBaseUrl;
        null != a && (";" != a.charAt(a.length - 1) && (a += ";"), c.e = a + "met=1;&timestamp=" + +new Date + ";eid1=9;ecn1=1;etm1=0;");
        return c
    };
    var Ff = function (a) {
        var b;
        b = a.toLowerCase();
        a = [];
        var c = 0;
        /^https?:\/\//.test(b) ? (a[0] = 0, c = "s" == b.charAt(4) ? 8 : 7) : a[0] = -1;
        a[1] = c;
        b = [b.indexOf(":", c), b.indexOf("/", c), b.indexOf("?", c), b.indexOf("#", c)];
        for (c = 0; c < b.length; ++c)if (-1 == b[c])a[c + 2] = -1; else {
            for (var d = !0, e = c + 1; e < b.length; ++e)-1 < b[e] && b[c] > b[e] && (d = !1);
            a[c + 2] = d ? b[c] : -1
        }
        this.a = a
    };
    var Gf = function () {
        this.pa = !1;
        this.q = this.g = this.nb = "";
        this.n = new Q(0, 0);
        this.Ua = !1;
        this.Q = "";
        this.lb = this.p = !1;
        this.v = new Q(0, 0);
        this.c = !1;
        this.V = this.I = "";
        this.na = [];
        this.Ta = this.ja = !1;
        this.$ = "";
        this.a = {};
        this.O = "";
        this.ta = !1;
        this.ma = this.ia = this.la = "";
        this.ra = this.D = !1;
        this.va = 4;
        this.Sa = null;
        this.ua = "";
        this.G = {Ja: "", Ka: ""};
        this.j = {};
        this.F = this.X = this.T = "";
        this.C = 1;
        this.U = this.ob = this.W = "";
        this.ka = null;
        this.oa = "";
        this.pb = !1;
        this.e = [];
        this.m = [];
        this.Ya = [];
        this.Ra = {};
        this.Va = {};
        this.o = {};
        this.La =
        {};
        this.ca = {};
        this.B = {};
        this.P = !1;
        this.Z = {};
        this.H = this.A = this.K = this.wa = this.ba = null;
        this.Z.Exit = this.o;
        this.Z.Timer = this.La;
        this.Z.Counter = this.ca
    };
    Gf.prototype.kb = !1;
    var Hf = function (a, b) {
        if (C(D(a)))return "";
        var c = new Ff(a), d;
        d = c.a[3];
        if (-1 == d)return a;
        t:{
            for (var e = 4; e < c.a.length; ++e)if (-1 != c.a[e]) {
                c = c.a[e];
                break t
            }
            c = -1
        }
        e = -1 == c ? a.substring(d) : a.substring(d, c);
        if (-1 == e.toLowerCase().indexOf(";" + b.toLowerCase() + "="))e += (";" == e.charAt(e.length - 1) ? "" : ";") + b + "=1;"; else var f = "", g = e.toLowerCase().indexOf(";" + b.toLowerCase() + "="), h = e.indexOf("=", g), f = e.indexOf(";", g + 1), f = -1 == f ? e.substring(h + 1) : e.substring(h + 1, f), e = e.replace(e.substring(g, h + 1) + f, ";" + b + "=1");
        return a.substring(0,
                d) + e + (-1 == c ? "" : a.substring(c))
    };
    Gf.prototype.toString = function () {
        return "Creative_" + this.q
    };
    var Ze = function (a) {
            var b = {}, c;
            for (c in a.a)c in de || c in rd || (b[c] = a.a[c]);
            return b
        }, If = function () {
            return "https:" == window.location.protocol
        }, ke = function (a) {
            return If() ? a.G.Ka : a.G.Ja
        }, Jf = function (a, b) {
            if (r(b))return b in a.j ? Fa(a.j[b]) : [];
            var c = [], d;
            for (d in a.j)c = Ea(c, a.j[d]);
            return c
        }, Kf = function (a, b) {
            "HTML5" == b.e && (a.kb = !0);
            var c = b.g ? b.g.j : null;
            c && (a.Ra[c] = b);
            a.e.push(b)
        }, Lf = function (a, b) {
            var c = [];
            F(a.e, function (a) {
                a.e == b && c.push(a)
            });
            return c
        }, Of = function (a, b, c) {
            var d = Mf(a, b);
            d && (d.e = c, a.Va[b] =
                d, Nf(a, d))
        }, Qf = function (a, b) {
            var c = a.P;
            Pf(a, "EXPAND_TIMER", b);
            a.P = c
        }, Pf = function (a, b, c) {
            return (b = a.B[Rf(b, "Counter") || ""] || a.B[Rf(b, "Timer") || ""] || Mf(a, b)) ? (b.chargeable = c, a.P = !0) : !1
        }, Nf = function (a, b) {
            if (b) {
                var c;
                (c = b.k ? Sf(a, b.name) : b.c ? Tf(a, b.c.Da, b.c.ab) : Rf(b.name, b.type)) && (a.B[c] = b)
            }
        }, Uf = function (a, b) {
            var c = b.a, c = c.replace(/%eaid!/g, a.a.aid || "").replace(/%ebuy!/g, a.a.buy || "").replace(/%epid!/g, a.a.pid || "").replace(/%esid!/g, a.a.sid || "").replace(/%erid!/g, a.a.rid || "").replace(/%ecid!/g, a.a.cid ||
            "").replace(/%ekid!/g, a.a.kid || "").replace(/%eadv!/g, a.a.adv || "").replace(/%erv!/g, a.I).replace(/%s/g, a.a.sn || "").replace(/%g/g, a.a.geo || "").replace(/%n/g, a.a.randomNumber || ""), d;
            for (d in a.ka)var e = a.ka[d], f = "(%pKEY=!;|%%PATTERN:KEY%%)".replace(/KEY/g, d), c = c.replace(new RegExp(f, "g"), e);
            b.a = c;
            c = a.U;
            C(D(c)) || (b.a = rc(b.a, c));
            a.o[b.name] = b;
            Nf(a, b)
        }, Sf = function (a, b) {
            var c = Mf(a, b);
            return c ? [b, escape(""), escape(""), c.type].join(":") : null
        }, Rf = function (a, b) {
            return ["CUSTOM_EVENT", escape(a), escape(""), b].join(":")
        },
        Tf = function (a, b, c) {
            return (a = Mf(a, b)) && [b, escape(""), escape(c), a.type].join(":")
        }, Wf = function (a, b) {
            if (!b)return null;
            if ("CUSTOM_EVENT" == b.type || b.videoName) {
                if ("CUSTOM_EVENT" == b.type && !b.videoName) {
                    var c = b.trigger;
                    if (a.Z[c])var c = a.Z[c], d = b.name, c = c[d] && c[d].e || null; else c = null;
                    return c
                }
                if ("CUSTOM_EVENT" != b.type && b.videoName) {
                    t:switch (c = b.videoName, d = Mf(a, b.type), d.type) {
                        case "Timer":
                            c = Vf(a.La, d, c);
                            c = null != c ? c.e : null;
                            break t;
                        case "Counter":
                            c = Vf(a.ca, d, c);
                            c = null != c ? c.e : null;
                            break t;
                        default:
                            c = null
                    }
                    return c
                }
            } else return (c =
                Mf(a, b.type)) ? c.e : null;
            return null
        }, Mf = function (a, b) {
            return a.Va[b] || (a.Va[b] = Be(b))
        }, Vf = function (a, b, c) {
            for (var d in a) {
                var e = a[d];
                if (e.c && e.c.ab == c && e.c.Da == b.name)return e
            }
            return null
        };
    var Yf = function (a) {
        this.o = a.eventReportingUrl || "";
        this.K = a.clickUrl || "";
        this.B = a.clickUrlTimesToEscape || 1;
        this.g = a.clickEventTagUrl || "";
        this.T = a.impressionUrl || "";
        this.A = a.geoData || "";
        this.P = a.siteName || "";
        this.O = a.siteId || "";
        this.k = a.adId || "";
        this.q = a.buyId || "";
        this.n = a.creativeId || "";
        this.F = a.placementId || "";
        this.m = a.advertiserId || "";
        this.C = a.keyValueOrdinal || "";
        this.H = a.renderingVersion || "";
        this.G = a.renderingId || "";
        this.D = a.randomNumber || "";
        this.I = a.stringReportingUrl || "";
        this.c = a.bookingTimeMetaData ||
        {};
        this.j = new Xf(a.tag || {});
        this.V = a.urlToGetKeywordsFor || "";
        this.p = a.exitSuffix || "";
        this.Q = a.dynamicData || "";
        this.v = a.exitUrlPatternMacroValues;
        this.e = hf[a.renderingEnvironment || "BROWSER"];
        this.a = a.placementDimensions || {w: "0", h: "0"};
        this.U = a.swiffyRuntimeUrl || ""
    }, Xf = function (a) {
        this.e = a.adContainerElementId;
        this.o = a.hideObjects;
        this.c = a.preferHtml5Artwork;
        this.j = a.adSenseKeywords;
        this.k = a.adSenseLatitude;
        this.m = a.adSenseLongitude;
        this.q = a.publisherSideFilePath;
        this.g = a.runtimeMetaData || {};
        this.expansionMode =
            id(a.expansionMode);
        this.B = !!a.renderFloatInplace;
        this.n = !!a.tryToWriteHtmlInline;
        this.a = {};
        this.a.top = new Zf(t("multiFloat.top.duration", a), t("multiFloat.top.wmode", a), t("multiFloat.top.position", a) ? t("multiFloat.top.position", a).split(",") : []);
        this.a.right = new Zf(t("multiFloat.right.duration", a), t("multiFloat.right.wmode", a), t("multiFloat.right.position", a) ? t("multiFloat.right.position", a).split(",") : []);
        this.a.bottom = new Zf(t("multiFloat.bottom.duration", a), t("multiFloat.bottom.wmode", a), t("multiFloat.bottom.position",
            a) ? t("multiFloat.bottom.position", a).split(",") : []);
        this.a.left = new Zf(t("multiFloat.left.duration", a), t("multiFloat.left.wmode", a), t("multiFloat.left.position", a) ? t("multiFloat.left.position", a).split(",") : [])
    }, Zf = function (a, b, c) {
        this.top = 1 < c.length ? c[0] : "";
        this.left = 1 < c.length ? c[1] : ""
    };
    var $f = function (a) {
        this.id = a.id;
        this.H = a.uniqueId;
        this.c = new Yf(a.adServerData || {});
        this.m = new zf(a.adServerData && a.adServerData.activeViewClkStr, this.c.e);
        this.F = a.isPreviewEnvironment;
        this.a = a.thirdPartyImpressionUrls || [];
        this.k = a.thirdPartyArtworkImpressionUrl;
        this.p = a.hasFlashAsset;
        this.e = a.hasHtmlAsset;
        this.Oa = a.requiresCss3Animations;
        this.flashVersion = a.flashVersion;
        this.A = a.httpMediaServer || "";
        this.C = a.httpsMediaServer || "";
        this.o = a.csiStart;
        this.B = a.csiAdRespTime;
        this.n = a.csiEvents;
        this.g =
            a.dimensions;
        this.D = a.preloaderUrl;
        this.v = a.hasModernizrFeatureChecks;
        this.j = a.html5FeatureChecks;
        var b;
        if (b = a.backupImage)if (b = a.backupImage, null != b) {
            var c = new Df;
            c.a = b.exitUrl || c.a;
            c.target = b.target || c.target;
            c.c = b.imageUrl || c.c;
            c.width = b.width || c.width;
            c.height = b.height || c.height;
            c.e = b.backupDisplayActivityUrl || c.e;
            c.g = b.thirdPartyBackupImpressionUrl || c.g;
            b = c
        } else b = null;
        this.q = b || null;
        this.G = a.hasSwiffyHtmlAsset
    };
    var ag = function (a, b, c, d) {
        this.c = d;
        d = !1;
        this.c && this.c.Da && (d = Be(this.c.Da).m);
        cd.call(this, a, b, c, !1, d)
    };
    B(ag, cd);
    var bg = function (a, b, c, d, e) {
        this.g = a;
        this.c = b;
        this.j = c ? c.replace(/^.*\/\//, "") : null;
        this.k = d;
        this.e = {};
        this.q = Math.floor(1E3 * Math.random());
        this.m = e
    }, cg = function (a, b, c, d) {
        a.e[b] = {time: d || A(), $a: c}
    }, eg = function (a) {
        if (a.a()) {
            var b = dg(a, a.e);
            df(a.m, b)
        }
    }, dg = function (a, b) {
        var c = "&adi=" + (a.j ? "csd_" + a.j + "," : "") + "gt_" + be() + (0 <= a.c && 1E5 > a.c ? "&srt=" + a.c : ""), d = (self.location.protocol && "https:" == self.location.protocol.toString().toLowerCase() ? "https://s0.2mdn.net" : "http://s0.2mdn.net") + "/csi?v=2&s=rmad", e = [],
            f = [], g = [], h;
        for (h in b) {
            var k = b[h];
            if (k.$a) {
                var m = b[k.$a];
                m && (m = k.time - m.time, f.push(h + "." + (0 < m ? m : 0)), k = k.time - a.g, g.push(0 < k ? k : 0))
            } else k = k.time - a.g, e.push(h + "." + (0 < k ? k : 0))
        }
        e = "" + ((e.length ? "&rt=" + e.join(",") : "") + (f.length ? "&it=" + f.join(",") : "") + (g.length ? "&irt=" + g.join(",") : ""));
        return d + e + c
    };
    bg.prototype.a = function () {
        return 0 == this.q && !this.k
    };
    var fg = function (a, b, c, d, e, f) {
        bg.call(this, a, b, c, d, e);
        this.B = f
    };
    B(fg, bg);
    var gg = function (a, b) {
        b[a] = {time: A(), $a: void 0};
        return b
    }, hg = function (a, b, c) {
        r(b) ? a.a() && (b = dg(a, b), C(D(c)) || (b += "&e=" + c + "," + be()), df(a.m, b)) : eg(a)
    };
    fg.prototype.a = function () {
        return !this.k && this.B
    };
    var ig = function (a) {
        switch (a) {
            case 0:
                return "mtf_nd_ru";
            case 1:
                return "mtf_nd_rbu";
            case 2:
                return "mtf_nd_rmb";
            case 3:
                return "mtf_nd_rfv";
            case 4:
                return "mtf_nd_rnf";
            default:
                throw Error("Unknown noDisplayReason");
        }
    };
    var jg = function (a) {
        return a.gb && Xd(a.flashVersion) || a.Cb && Yd(!!a.html5Features, a.html5Features, a.Oa) ? !0 : !1
    }, kg = function (a, b, c, d, e, f) {
        if (b) {
            c = Ed(document, c);
            var g = [], g = g.concat(['<a target="', b.target, '" href="', b.a, '">']), g = g.concat(['<img src="', b.c, '" ']), g = g.concat(['width="', b.width, '" height="', b.height, '" ']);
            g.push('border="0"></a>');
            c.innerHTML = g.join("");
            d = new cf(d);
            df(d, b.e);
            df(d, b.g);
            for (b = 0; b < e.length; b++)df(d, e[b]);
            if (e = window.DARTDebugEventHandler) {
                e = new e;
                try {
                    e.handleEventActivity("BACKUP_IMAGE_IMPRESSION",
                        "Counter", 1, 0, !1, a)
                } catch (h) {
                }
            }
            f.g && Qe(f, c)
        }
    };
    var lg = function (a) {
        this.a = a
    };
    var mg = function () {
        this.k = {};
        this.a = null;
        this.g = [];
        this.c = !0;
        this.j = new De
    }, ng = function (a, b, c) {
        a.c = !1;
        null === a.a && (a.a = new Tb(a.e, a));
        Xb(a.a.then(b, u, c), function () {
            this.c = !0
        }, a)
    };
    mg.prototype.e = function (a) {
        Ce ? og(this) && a() : vb(this.j, "ready", function () {
            og(this) ? a() : hc(function () {
                og(this) && a()
            }, 0, this)
        }, !1, this)
    };
    var og = function (a) {
        for (var b = 0; b < a.g.length; ++b)if (null === Ed(document, a.g[b]))return !1;
        return !0
    };
    var pg = function (a, b, c) {
        this.m = a;
        this.e = b.c;
        this.k = b.g;
        this.c = b.a;
        this.g = c.c;
        this.j = c.g;
        this.a = c.a
    }, qg = function (a, b, c) {
        this.c = a || null;
        this.g = b || null;
        this.a = c || null
    };
    var rg = function (a, b) {
        this.ab = a;
        this.Da = b
    }, tg = function (a) {
        var b = a.split(":");
        if (2 == b.length && (a = b[0], b = sg[b[1]]))return new rg(a, b)
    }, sg = {
        Complete: "VIDEO_COMPLETE",
        Interaction: "VIDEO_INTERACTION",
        MidPoint: "VIDEO_MIDPOINT",
        Mute: "VIDEO_MUTE",
        Pause: "VIDEO_PAUSE",
        Play: "VIDEO_PLAY",
        Replay: "VIDEO_REPLAY",
        Stop: "VIDEO_STOP",
        Unmute: "VIDEO_UNMUTE",
        ViewTime: "VIDEO_VIEW_TIMER"
    };
    var ug = null, vg = null, xg = function (a, b) {
        var c = new Gf, d = new $f(a.creativeDto);
        if (!c.pa) {
            c.pa = !0;
            var e = d.c, f = e.j;
            c.g = d.id || c.g;
            c.q = d.H || c.g || c.q;
            c.n = d.g ? new Q(parseInt(d.g.width, 10) || c.n.width, parseInt(d.g.height, 10) || c.n.height) : c.n;
            c.Q = e.Q || c.Q;
            c.lb = d.G || c.lb;
            c.v = e.a ? new Q(parseInt(e.a.w, 10) || c.v.width, parseInt(e.a.h, 10) || c.v.height) : c.v;
            c.c = d.F || c.c;
            c.I = e.H || c.I;
            c.V = d.flashVersion || c.V;
            c.na = d.j || c.na;
            c.ja = d.Oa || c.ja;
            c.$ = e.V || c.$;
            for (var g in e.c)c.a[g] = e.c[g];
            c.a.sn = e.P;
            c.a.sid = e.O;
            c.a.aid = e.k;
            c.a.cid =
                e.n;
            c.a.buy = e.q;
            c.a.pid = e.F;
            c.a.adv = e.m;
            c.a.kid = e.C;
            c.a.rid = e.G;
            c.a.geo = e.A;
            c.a.randomNumber = e.D;
            for (var h in f.g)c.a[h] = f.g[h];
            c.O = f.e || c.O;
            c.ta = f.c || c.ta;
            c.la = f.j || c.la;
            c.ia = f.k || c.ia;
            c.ma = f.m || c.ma;
            c.D = f.B || c.D;
            c.ra = f.n || c.ra;
            c.va = e.e || c.va;
            c.ua = d.D || c.ua;
            c.G = {Ja: d.A || c.G.Ja, Ka: d.C || c.G.Ka};
            g = new cf(c.c);
            C(D(e.g)) || (c.j.CLICK = [new Af(e.g, g)]);
            if (v(d.a) && 0 < d.a.length)for (c.j.IMPRESSION_IMG = [], h = 0; h < d.a.length; ++h)c.j.IMPRESSION_IMG.push(new Af(d.a[h], g));
            C(D(d.k)) || (c.j.ARTWORK_IMPRESSION = [new Af(d.k,
                g)]);
            c.T = e.o || c.T;
            c.X = e.I || c.X;
            c.F = e.K || c.F;
            c.C = parseInt(e.B, 10) || c.C;
            c.W = e.T || c.W;
            c.ob = e.U || c.ob;
            c.U = e.p || c.U;
            c.ka = e.v || c.ka;
            c.oa = f.q || c.oa;
            c.ba = d.o || c.ba;
            c.wa = d.B || c.wa;
            c.K = d.n || c.K;
            c.A = d.q || c.A;
            c.H = d.m || c.H
        }
        c.Sa = b.customScriptUrl;
        c.Ua = b.isDynamic;
        c.Ta = b.delayedImpression;
        var e = b.standardEventIds, k;
        for (k in e)Of(c, k, e[k]);
        e = b.exitEvents;
        for (k = 0; k < e.length; k++)f = e[k], g = new ed(f.name, f.reportingId, f.url), g.j = f.targetWindow, g.g = f.windowProperties, Uf(c, g);
        f = b.timerEvents;
        for (k = 0; k < f.length; k++)e = f[k],
            g = c, e = wg(e, "Timer"), g.La[e.name] = e, Nf(g, e);
        f = b.counterEvents;
        for (k = 0; k < f.length; k++)e = f[k], g = c, e = wg(e, "Counter"), g.ca[e.name] = e, Nf(g, e);
        e = If();
        f = b.childFiles;
        for (k = 0; k < f.length; k++)g = c, h = ff(f[k], e), g.m.push(h), g.k = null;
        f = b.videoFiles;
        for (k = 0; k < f.length; k++)g = c, h = ff(f[k], e), g.m.push(h), g.k = null;
        e = b.videoEntries;
        for (k = 0; k < e.length; k++)f = e[k], c.Ya.push(new pg(f.reportingIdentifier, new qg(f.lowBandwidthVideo, f.mediumBandwidthVideo, f.highBandwidthVideo), new qg(f.lowBandwidthFallbackVideo, f.mediumBandwidthFallbackVideo,
            f.highBandwidthFallbackVideo)));
        k = !1;
        e = Xd(d.flashVersion);
        f = Yd(d.v, d.j, d.Oa);
        g = d.c.j.c || Sc && 0 <= E(Wd, "6.1");
        d = !d.p || !e || g && d.e && f ? d.e && f ? "HTML5" : null : "FLASH";
        e = b.primaryAssets;
        for (g = f = 0; g < e.length; ++g) {
            e[g].floatingDisplayTypeData && !C(D(e[g].floatingDisplayTypeData.alignment)) && f++;
            var m = e[g], z = a.creativeDto.adServerData.tag;
            h = new vd(m.id, m.artworkType, m.displayType, new Q(parseInt(m.width, 10) || 0, parseInt(m.height, 10) || 0), (ke(c) || "") + m.servingPath);
            h.A = m.zIndex;
            h.o = m.customCss;
            h.n = m.location || h.n;
            h.B =
                m.layoutsConfig;
            h.D = m.layoutsApi;
            var p = m.flashArtworkTypeData;
            p && (h.c = new oa(p.actionscriptVersion, p.wmode, C(D(p.sdkVersion)) ? "0.0.0" : p.sdkVersion, p.flashBackgroundColor, p.allowScriptAccess));
            m.htmlArtworkTypeData && (h.C = new ld);
            if (p = m.floatingDisplayTypeData) {
                var q = p.position, q = new pd(q.top + q.topUnit, q.left + q.leftUnit);
                h.q = hd(p.alignment);
                h.g = new kd(q, p.startTime, p.endTime, h.q)
            }
            if (p = m.expandingDisplayTypeData)q = p.collapsedRect, h.a = new jd(new fd(q.left, q.top, q.width, q.height), p.isPushdown ? "pushdown" :
            id(p.expansionMode) || "normal");
            m.imageGalleryTypeData && (h.F = new md);
            m = m.pageSettings;
            p = new nd;
            m && (p.c = m.hideDropdowns || !1, p.a = m.hideObjects || !1, p.g = m.updateZIndex || !1);
            h.k = p;
            if (null == z)z = {}; else {
                m = {};
                p = void 0;
                for (p in wd)q = t(p, z), r(q) && (m[wd[p]] = q);
                z = m
            }
            Ad(h, z);
            xd(h);
            h.e == d && Kf(c, h)
        }
        1 < f && (k = !0);
        c.p = k;
        return c
    }, wg = function (a, b) {
        var c;
        a.videoData && (c = a.videoData, c = new rg(c.associatedVideoEntryReportingIdentifier, c.associatedStandardVideoEvent));
        return new ag(a.name, a.reportingId, b, c)
    }, zg = function (a) {
        var b;
        b = ug;
        var c = a.q;
        yg[c] || (yg[c] = new W(a, b, ec.getInstance()));
        b = yg[c];
        c = new mg;
        a = a.e;
        for (var d = 0; d < a.length; ++d) {
            var e = a[d], f = e.v;
            if (null != f) {
                var g = c, e = e.q;
                g.c && (f = new lg(f), g.a = null, g.k[null != e ? e : "."] = f, g.g.push(f.a))
            }
        }
        ng(c, b.Hb, b)
    }, Bg = function () {
        var a = [], b = t("studioV2.creatives") || {}, c;
        for (c in b) {
            var d = b[c], e = d.creativeDefinition;
            if (e)for (d = d.adResponses; 0 < d.length;) {
                var f = d.shift(), g = f.creativeDto;
                if (g.rendererName == $d && "200_67" == g.templateVersion)a.push(xg(f, e)); else {
                    d.unshift(f);
                    break
                }
            }
        }
        b = [];
        c =
            t("window.dclkStudioV3.creatives") || [];
        for (e = c.length - 1; 0 <= e; --e) {
            var d = c[e], g = f = new Gf, h = d;
            if (!g.pa) {
                g.pa = !0;
                g.nb = h.renderingLibraryData.version;
                var k = h.creativeParameters;
                g.g = k.cid || g.g;
                g.q = k.creative_unique_id || g.q;
                g.n = new Q(parseInt(h.width, 10) || g.n.width, parseInt(h.height, 10) || g.n.height);
                g.Q = h.dynamicData || g.Q;
                g.v = new Q(parseInt(h.slotWidth, 10) || g.v.width, parseInt(h.slotHeight, 10) || g.v.height);
                g.c = h.previewMode || g.c;
                g.I = k.rv || g.I;
                g.V = h.flashVersion || g.V;
                v(h.html5Features) && (g.ja = 0 <= xa(h.html5Features,
                    "Modernizr.cssanimations"), g.na = h.html5Features);
                g.pb = h.translated_layout;
                g.a = k;
                g.O = k.ad_container_id || g.O;
                g.ta = "true" == k.displayHTML5 || g.ta;
                g.la = k.as_kw || g.la;
                g.ia = k.as_lat || g.ia;
                g.ma = k.as_lng || g.ma;
                g.D = "true" == k.mtfRenderFloatInplace || g.D;
                g.ra = "true" == k.tryToWriteHtmlInline || g.ra;
                g.va = "1" == k.dcapp ? 8 : 4;
                g.U = k.exit_suffix || g.U;
                var m;
                t:{
                    m = h.primaryFiles;
                    if (null != m)for (var z = 0; z < m.length; ++z)if ("PRE_LOADER" == m[z].renderAs) {
                        m = m[z].url;
                        break t
                    }
                    m = ""
                }
                g.ua = m || g.ua;
                m = oc(h.renderingLibraryData.renderingLibrary);
                g.G = {Ja: "http://" + m, Ka: "https://" + m};
                if (null != h.thirdPartyUrls) {
                    m = h.thirdPartyUrls;
                    for (var z = new cf(g.c), p = 0; p < m.length; ++p) {
                        var q;
                        q = m[p].type;
                        q = ja(Bf, q) ? q : null;
                        null != q && (q in g.j || (g.j[q] = []), g.j[q].push(new Af(m[p].url, z, "true" == m[p].scrub)))
                    }
                }
                g.T = Hf(h.eventTrackingBaseUrl, "met") || g.T;
                g.X = Hf(h.customVariableEventTrackingBaseUrl, "stragg") || g.X;
                g.F = h.clickUrl || g.F;
                g.C = parseInt(k.clickN, 10) || g.C;
                g.W = h.impressionUrl || g.W;
                g.oa = k.mtfIFPath || g.oa;
                g.A = Ef(h) || g.A;
                g.H = new zf(h.clickString, g.va)
            }
            f.Ua = !C(D(d.dynamicData));
            f.Ta = !C(D(d.impressionUrl));
            for (g = 0; g < d.standardEvents.length; g++)h = d.standardEvents[g], Of(f, h.name, h.reportingId);
            for (g = 0; g < d.exitEvents.length; g++)h = d.exitEvents[g], k = new ed(h.name, h.reportingId, h.destinationUrl), k.j = h.targetWindow, k.g = h.windowProperties, Uf(f, k);
            for (g = 0; g < d.timerEvents.length; g++)h = d.timerEvents[g], k = tg(h.name), h = new ag(h.name, h.reportingId, "Timer", k), k = f, k.La[h.name] = h, Nf(k, h);
            for (g = 0; g < d.counterEvents.length; g++)h = d.counterEvents[g], k = tg(h.name), h = new ag(h.name, h.reportingId,
                "Counter", k), k = f, k.ca[h.name] = h, Nf(k, h);
            g = If();
            h = (h = d.creativeParameters.CREATIVE_PARAMETER_ASSETS_DATA) ? Tc(h.replace(/\\"/g, '"')) : {};
            k = void 0;
            for (k in h)m = f, z = new ef(k, h[k], g), m.m.push(z), m.k = null;
            h = (g = d.creativeParameters.CREATIVE_PARAMETER_VIDEO_DATA) ? Tc(g.replace(/\\"/g, '"')) : [];
            for (g = 0; g < h.length; ++g)k = h[g], f.Ya.push(new pg(k.name, new qg(k.vfp_low, k.vfp_mid, k.vfp_high), new qg(k.pfp_low, k.pfp_mid, k.pfp_high)));
            h = null;
            "CREATIVE_PARAMETER_LAYOUT_CONFIG"in d.creativeParameters && (h = d.creativeParameters.CREATIVE_PARAMETER_LAYOUT_CONFIG);
            k = d.primaryFiles;
            for (g = 0; g < k.length; g++) {
                m = k[g];
                z = d.creativeParameters;
                q = h;
                p = new vd(f.g + "_" + g, m.type, m.renderAs, new Q(parseInt(m.width, 10) || 0, parseInt(m.height, 10) || 0), m.url);
                p.A = parseInt(m.zIndex, 10);
                p.o = m.customCss;
                p.n = m.location || p.n;
                p.B = q || p.B;
                if (q = m.flashProperties)p.c = new oa(parseInt(q.actionScriptVersion, 10), qa(q.wmode) || "transparent", "0.0.0", q.flashBackgroundColor || "", q.allowScriptAccess || "");
                m.htmlProperties && (p.C = new ld);
                if (q = m.floatingDisplayProperties) {
                    var Ic = new pd(q.top, q.left);
                    p.q =
                        hd(q.label);
                    p.g = new kd(Ic, parseInt(q.startTime, 10), parseInt(q.duration, 10), p.q)
                }
                if (q = m.expandingDisplayProperties)p.a = new jd(new fd(parseInt(q.collapsedRectLeft, 10), parseInt(q.collapsedRectTop, 10), parseInt(q.collapsedRectWidth, 10), parseInt(q.collapsedRectHeight, 10)), id(q.expansionMode) || "normal");
                p.k = new nd;
                p.k.a = m.hideFlashObjects;
                null != z && Ad(p, z);
                xd(p);
                Kf(f, p)
            }
            d = f;
            t:{
                f = d;
                g = f.e;
                for (h = 0; h < g.length; h++)if (k = g[h], zd(k) && !ug.a(k)) {
                    f = !1;
                    break t
                }
                f = "200_67" == f.nb
            }
            f && (wa.splice.call(c, e, 1), b.push(d))
        }
        a =
            a.concat(b);
        for (b = 0; b < a.length; b++)Ag(a[b])
    }, Ag = function (a) {
        vg && a.K && (a.K.ge = vg);
        var b = {
            gb: 0 < Lf(a, "FLASH").length,
            flashVersion: a.V,
            Cb: 0 < Lf(a, "HTML5").length,
            html5Features: a.na,
            Oa: a.ja
        };
        if (jg(b))zg(a); else if (a.A) {
            var c = [];
            F(Jf(a, "IMPRESSION_IMG"), function (a) {
                c.push(a.a)
            });
            kg(a.g, a.A, a.O, a.c, c, a.H)
        } else if (a.p) {
            var d = {};
            a = new fg(a.ba || 0, a.wa || 0, ke(a), a.c, new cf(a.c), a.p);
            var e = b.gb ? K || L || M || Va ? Wa ? 2 : 0 <= E(Ud, b.flashVersion) ? 0 : 3 : 1 : 4;
            4 != e || Xd(b.flashVersion) || (d = gg(ig(e), d), e = K || L || M || Va ? Wa ? 2 : 0 <= E(Ud,
                b.flashVersion) ? 0 : 3 : 1);
            b = ig(e);
            hg(a, gg(b, d))
        }
    }, Cg = function (a) {
        yg[a] && (yg[a].R(), delete yg[a])
    };
    var Dg = function (a) {
        var b;
        a.mozVisibilityState ? b = "mozvisibilitychange" : a.webkitVisibilityState ? b = "webkitvisibilitychange" : a.visibilityState && (b = "visibilitychange");
        return b
    }, Eg = function (a, b) {
        if (3 == ({
                visible: 1,
                hidden: 2,
                prerender: 3,
                preview: 4
            }[b.webkitVisibilityState || b.mozVisibilityState || b.visibilityState || ""] || 0))return !1;
        a();
        return !0
    }, Fg = function (a) {
        var b = document;
        if (!Eg(a, b)) {
            var c = !1, d = Dg(b), e = function () {
                if (!c && Eg(a, b)) {
                    c = !0;
                    var f = e;
                    b.removeEventListener ? b.removeEventListener(d, f, !1) : b.detachEvent &&
                    b.detachEvent("on" + d, f)
                }
            };
            d && $e(b, d, e)
        }
    };
    var Gg = function (a, b) {
        P.call(this, a);
        this.c = b
    };
    B(Gg, P);
    var Hg = "EXPAND EXPAND_REQUEST EXPAND_FINISH COLLAPSE COLLAPSE_REQUEST COLLAPSE_FINISH EXPAND_FULL_SCREEN COLLAPSE_FULL_SCREEN SHOW HIDE".split(" ");
    var X = function (a, b) {
        this.c = b;
        this.F = new T(this);
        this.F.c(this.c, Hg, this.Z);
        this.a = a;
        this.A = [];
        this.v = [];
        this.n = [];
        this.e = [];
        this.p = [];
        this.o = [];
        this.m = [];
        this.k = []
    };
    B(X, O);
    X.prototype.g = function () {
        this.F.R();
        this.k = this.m = this.e = this.o = this.p = this.n = this.v = this.A = null;
        X.M.g.call(this)
    };
    X.prototype.Z = function (a) {
        if (a.c == this.a) {
            var b = null;
            switch (a.type) {
                case "SHOW":
                    b = this.A;
                    break;
                case "HIDE":
                    b = this.v;
                    break;
                case "COLLAPSE_REQUEST":
                    b = this.m;
                    break;
                case "COLLAPSE_FINISH":
                    b = this.k;
                    break;
                case "COLLAPSE":
                    b = this.e;
                    break;
                case "EXPAND":
                    b = this.n;
                    break;
                case "EXPAND_REQUEST":
                    b = this.p;
                    break;
                case "EXPAND_FINISH":
                    b = this.o
            }
            b && Ig(this, b)
        }
    };
    var Ig = function (a, b) {
        F(b, function (a) {
            a(this)
        }, a)
    }, Jg = function (a) {
        return a.c.j[a.a] || null
    };
    X.prototype.C = function () {
        return this.a.j
    };
    X.prototype.getType = X.prototype.C;
    X.prototype.j = function () {
        return this.a.id
    };
    X.prototype.getId = X.prototype.j;
    X.prototype.X = function () {
        var a = Jg(this);
        return a && (a = a.S()) ? (a = new H(a.offsetLeft, a.offsetTop), {x: a.x, y: a.y}) : null
    };
    X.prototype.getPosition = X.prototype.X;
    X.prototype.ua = function (a, b) {
        var c = Jg(this);
        if (c) {
            var c = c.S(), d, e;
            a instanceof H ? (d = a.x, e = a.y) : (d = a, e = b);
            c.style.left = te(d, !1);
            c.style.top = te(e, !1)
        }
    };
    X.prototype.setPosition = X.prototype.ua;
    X.prototype.va = function (a) {
        var b = Jg(this);
        b && re(b.S(), a)
    };
    X.prototype.setStyle = X.prototype.va;
    X.prototype.W = function () {
        var a = Jg(this);
        if (a) {
            var b = a.S();
            if (b) {
                var c = Cd(b);
                a = Cd(b);
                a.defaultView && a.defaultView.getComputedStyle && (a = a.defaultView.getComputedStyle(b, null)) && (a.position || a.getPropertyValue("position"));
                var a = new H(0, 0), d;
                d = c ? Cd(c) : document;
                var e;
                (e = !K || K && 9 <= db) || (e = Dd(d), e = Id(e.a));
                if (b != (e ? d.documentElement : d.body)) {
                    var f;
                    i:{
                        try {
                            f = b.getBoundingClientRect()
                        } catch (g) {
                            f = {left: 0, top: 0, right: 0, bottom: 0};
                            break i
                        }
                        K && b.ownerDocument.body && (b = b.ownerDocument, f.left -= b.documentElement.clientLeft +
                        b.body.clientLeft, f.top -= b.documentElement.clientTop + b.body.clientTop)
                    }
                    b = Dd(c).a;
                    c = !M && Id(b) ? b.documentElement : b.body || b.documentElement;
                    b = Hd(b);
                    c = K && N("10") && b.pageYOffset != c.scrollTop ? new H(c.scrollLeft, c.scrollTop) : new H(b.pageXOffset || c.scrollLeft, b.pageYOffset || c.scrollTop);
                    a.x = f.left + c.x;
                    a.y = f.top + c.y
                }
                return {x: a.x, y: a.y}
            }
        }
        return null
    };
    X.prototype.getPagePosition = X.prototype.W;
    X.prototype.D = function () {
        return {width: this.a.width, height: this.a.height}
    };
    X.prototype.getDimension = X.prototype.D;
    X.prototype.ya = function (a, b) {
        var c = Jg(this);
        c && c.ya(a, b)
    };
    X.prototype.setDimension = X.prototype.ya;
    X.prototype.U = function () {
        var a = this.a.a && this.a.a.a;
        return a ? {width: a.width, height: a.height} : this.D()
    };
    X.prototype.getCollapsedDimension = X.prototype.U;
    X.prototype.na = function (a, b, c, d) {
        var e = Jg(this);
        e && (e.S().style.clip = ["rect(", a, "px ", b, "px ", c, "px ", d, "px)"].join(""), e.S().style.position = "absolute")
    };
    X.prototype.setClip = X.prototype.na;
    X.prototype.V = function () {
        var a = Jg(this);
        return a ? a.S() : null
    };
    X.prototype.getContainerElement = X.prototype.V;
    X.prototype.ra = function () {
        var a = Jg(this);
        return a ? a.e : null
    };
    X.prototype.getAssetElement = X.prototype.ra;
    X.prototype.T = function (a) {
        this.A.push(a)
    };
    X.prototype.addShowCallback = X.prototype.T;
    X.prototype.ma = function (a) {
        G(this.A, a)
    };
    X.prototype.removeShowCallback = X.prototype.ma;
    X.prototype.Q = function (a) {
        this.v.push(a)
    };
    X.prototype.addHideCallback = X.prototype.Q;
    X.prototype.ia = function (a) {
        G(this.v, a)
    };
    X.prototype.removeHideCallback = X.prototype.ia;
    X.prototype.P = function (a) {
        this.n.push(a)
    };
    X.prototype.addExpandCallback = X.prototype.P;
    X.prototype.ja = function (a) {
        G(this.n, a)
    };
    X.prototype.removeExpandCallback = X.prototype.ja;
    X.prototype.K = function (a) {
        this.p.push(a)
    };
    X.prototype.addExpandRequestCallback = X.prototype.K;
    X.prototype.la = function (a) {
        G(this.p, a)
    };
    X.prototype.removeExpandRequestCallback = X.prototype.la;
    X.prototype.I = function (a) {
        this.o.push(a)
    };
    X.prototype.addExpandFinishCallback = X.prototype.I;
    X.prototype.ka = function (a) {
        G(this.o, a)
    };
    X.prototype.removeExpandFinishCallback = X.prototype.ka;
    X.prototype.G = function (a) {
        this.e.push(a)
    };
    X.prototype.addCollapseCallback = X.prototype.G;
    X.prototype.$ = function (a) {
        G(this.e, a)
    };
    X.prototype.removeCollapseCallback = X.prototype.$;
    X.prototype.O = function (a) {
        this.m.push(a)
    };
    X.prototype.addCollapseRequestCallback = X.prototype.O;
    X.prototype.ca = function (a) {
        G(this.m, a)
    };
    X.prototype.removeCollapseRequestCallback = X.prototype.ca;
    X.prototype.H = function (a) {
        this.k.push(a)
    };
    X.prototype.addCollapseFinishCallback = X.prototype.H;
    X.prototype.ba = function (a) {
        G(this.k, a)
    };
    X.prototype.removeCollapseFinishCallback = X.prototype.ba;
    X.prototype.wa = function () {
        Kg(this.c, this.a)
    };
    X.prototype.show = X.prototype.wa;
    X.prototype.ta = function () {
        this.c.p(this.a)
    };
    X.prototype.hide = X.prototype.ta;
    X.prototype.pa = function () {
        Lg(this.c, this.a)
    };
    X.prototype.expand = X.prototype.pa;
    X.prototype.oa = function () {
        Mg(this.c, this.a)
    };
    X.prototype.collapse = X.prototype.oa;
    var Y = function (a, b) {
        this.a = a;
        this.c = b
    };
    B(Y, O);
    Y.prototype.j = function () {
        return this.a.name
    };
    Y.prototype.getName = Y.prototype.j;
    Y.prototype.k = function () {
        var a = this.a.a;
        return (/^https?/.test(a) ? "" : this.c) + a
    };
    Y.prototype.getUrl = Y.prototype.k;
    Y.prototype.m = function () {
        return this.a.g
    };
    Y.prototype.isVideo = Y.prototype.m;
    Y.prototype.e = function () {
        return this.a.c
    };
    Y.prototype.getStreamingUrl = Y.prototype.e;
    var Ng = function (a, b) {
        this.a = a;
        this.g = b
    };
    Ng.prototype.e = function () {
        return this.a.name
    };
    Ng.prototype.getName = Ng.prototype.e;
    Ng.prototype.j = function () {
        return this.a.a
    };
    Ng.prototype.getUrl = Ng.prototype.j;
    Ng.prototype.c = function (a, b) {
        this.g.ib(new ze("logExitFlushEventsOpenPopup", this.a.name, a || null, b || null))
    };
    Ng.prototype.fireExit = Ng.prototype.c;
    var Z = function (a, b) {
        O.call(this);
        this.a = a;
        this.c = Og(a.e, b);
        this.k = Ga(this.c, function (a) {
            return a.j()
        });
        this.e = Pg(a.m, ke(a) || "");
        this.j = Qg(a.o, b);
        this.AssetTypes = Rg;
        Sg(this)
    };
    B(Z, O);
    var Og = function (a, b) {
        return za(a, function (a) {
            return new X(a, b)
        })
    }, Pg = function (a, b) {
        return za(a, function (a) {
            return new Y(a, b)
        })
    }, Qg = function (a, b) {
        return za(ia(a), function (a) {
            return new Ng(a, b)
        })
    }, Sg = function (a) {
        var b = t("studioV2.api.creatives") || [];
        ga("studioV2.api.creatives", b);
        b.push(a)
    };
    Z.prototype.g = function () {
        var a = t("studioV2.api.creatives");
        a && v(a) && G(a, this);
        ib(this.c, this.e, this.j);
        Z.M.g.call(this)
    };
    Z.prototype.n = function () {
        return "1.0"
    };
    Z.prototype.getApiVersion = Z.prototype.n;
    Z.prototype.F = function () {
        return this.a.q
    };
    Z.prototype.getCreativeId = Z.prototype.F;
    Z.prototype.K = function () {
        return this.a.a.sid || ""
    };
    Z.prototype.getSiteId = Z.prototype.K;
    Z.prototype.Q = function () {
        return this.a.a.sn || ""
    };
    Z.prototype.getSiteName = Z.prototype.Q;
    Z.prototype.H = function () {
        return this.a.a.aid || ""
    };
    Z.prototype.getAdId = Z.prototype.H;
    Z.prototype.P = function () {
        return this.a.a.buy || ""
    };
    Z.prototype.getBuyId = Z.prototype.P;
    Z.prototype.m = function () {
        return this.a.a.cid || ""
    };
    Z.prototype.getAdserverCreativeId = Z.prototype.m;
    Z.prototype.I = function () {
        return this.a.a.pid || ""
    };
    Z.prototype.getPlacementId = Z.prototype.I;
    Z.prototype.O = function () {
        return this.a.a.adv || ""
    };
    Z.prototype.getAdvertiserId = Z.prototype.O;
    Z.prototype.v = function () {
        return this.c
    };
    Z.prototype.getAssets = Z.prototype.v;
    Z.prototype.C = function () {
        return this.e
    };
    Z.prototype.getChildAssets = Z.prototype.C;
    Z.prototype.o = function (a) {
        return this.c[a] || null
    };
    Z.prototype.getAssetAt = Z.prototype.o;
    Z.prototype.p = function (a) {
        return this.k[a] || null
    };
    Z.prototype.getAssetById = Z.prototype.p;
    Z.prototype.G = function (a) {
        return Ca(this.c, function (b) {
            return b.C() == a
        })
    };
    Z.prototype.getFirstAssetByType = Z.prototype.G;
    Z.prototype.A = function (a) {
        return ya(this.c, function (b) {
            return b.C() == a
        })
    };
    Z.prototype.getAssetsByType = Z.prototype.A;
    Z.prototype.D = function () {
        return this.j
    };
    Z.prototype.getExits = Z.prototype.D;
    var Rg = {INPAGE: "BANNER", EXPANDING: "EXPANDABLE", FLOAT: "FLOATING", OVERLAY: "OVERLAY"};
    var Tg = function () {
        this.a = [];
        this.c = []
    };
    l = Tg.prototype;
    l.addReporter = function (a) {
        F(this.a, function (b) {
            b.newReporterCallback(a);
            a.newReporterCallback(b)
        });
        F(this.c, function (b) {
            a.registerChargeableEventName(b)
        });
        this.a.push(a)
    };
    l.reportEvents = function (a) {
        F(this.a, function (b) {
            b.reportEvents(a)
        })
    };
    l.registerChargeableEventName = function (a) {
        F(this.a, function (b) {
            b.registerChargeableEventName(a)
        });
        this.c.push(a)
    };
    l.logCustomVariable = function (a, b) {
        F(this.a, function (c) {
            c.logCustomVariable(a, b)
        })
    };
    l.getType = function () {
        return "UNIFIED_DISPATCHER"
    };
    l.getConfig = function () {
        return {reportingApiVersion: 2}
    };
    l.newReporterCallback = u;
    l.supportsChargeableEvents = function () {
        var a = !1;
        F(this.a, function (b) {
            b.supportsChargeableEvents() && (a = !0)
        });
        return a
    };
    var Ug = function (a) {
        this.g = a.T;
        this.c = a.X;
        this.a = a;
        this.e = new cf
    };
    l = Ug.prototype;
    l.reportEvents = function (a) {
        for (var b = [], c = 0; c < a.length; c++) {
            var d = a[c], e = Wf(this.a, d.unifiedReportingEvent);
            if (e) {
                var f = b, d = ["eid", c + 1, "=", e, ";ecn", c + 1, "=", d.count, ";etm", c + 1, "=", d.time, ";"].join("");
                0 == f.length && f.push("");
                e = f.pop();
                950 < e.length + d.length && (f.push(e), e = "");
                e += d;
                f.push(e)
            }
        }
        if (b.length)for (a = A(), c = 0; c < b.length; c++)document.createElement("img").src = this.g + "&timestamp=" + a + ";" + b[c]
    };
    l.registerChargeableEventName = function (a) {
        var b = this.a.P;
        Pf(this.a, a, !0) && !b && Qf(this.a, !1)
    };
    l.logCustomVariable = function (a, b) {
        if (this.c && 0 < this.c.length) {
            var c = [this.c, "&timestamp=", A(), ";str=", a, ";strtype=", b].join("");
            df(this.e, c)
        }
    };
    l.getType = function () {
        return "STUDIO"
    };
    l.getConfig = function () {
        return {reportingApiVersion: 2}
    };
    l.newReporterCallback = function (a) {
        a.supportsChargeableEvents() && !this.a.P && Qf(this.a, !0)
    };
    l.supportsChargeableEvents = function () {
        return !1
    };
    var Vg = function (a) {
        this.a = {};
        this.c = {};
        this.j = {};
        this.A = {};
        this.H = -1;
        this.G = !1;
        this.K = !a.c;
        this.n = null;
        this.C = !1;
        this.k = this.F(a);
        this.v = a;
        this.D = 5E3;
        this.o = {};
        this.p = {};
        this.m = {}
    };
    B(Vg, O);
    var Wg = function (a) {
        a.G = !0;
        a.H = A()
    }, Xg = function (a, b, c) {
        if (c || !a.A[b])a.A[b] || (a.a[b] = 0, a.A[b] = !0), a.a[b]++, (b = a.v.B[b]) && b.chargeable && a.e()
    }, Yg = function (a, b, c) {
        if (!(b in a.j)) {
            for (var d = A(), e = a.o[b]; e && 0 < e.length;)d += e.pop();
            a.j[b] = d;
            c && (a.m[c] = a.m[c] || [], a.m[c].push(b));
            Xg(a, b, !1)
        }
    }, Zg = function (a, b, c) {
        if (b in a.j) {
            for (var d = a.j[b], e = A(), f = a.p[b]; f && 0 < f.length;)e += f.pop();
            d = e - d;
            0 > d && (d = 0);
            a.c[b] = a.c[b] || 0;
            a.c[b] += d;
            delete a.j[b];
            c && a.m[c] && G(a.m[c], b)
        }
    }, $g = function (a) {
        for (var b in a.j)Zg(a, b)
    };
    Vg.prototype.e = function () {
        var a;
        if (a = !this.C)t:{
            for (var b in this.a)if (a = this.v.B[b], 0 < this.a[b] && a && a.chargeable) {
                a = !0;
                break t
            }
            a = !1
        }
        b = a;
        if (!(a = b)) {
            if (!(a = this.G && !this.B && (!this.K || !this.n || A() - this.n > this.D)))t:{
                for (var c in this.a)if ((a = this.v.B[c]) && a.m) {
                    a = !0;
                    break t
                }
                a = !1
            }
            a = a && !(12E5 < A() - this.H)
        }
        if (a) {
            for (var d in this.j)Zg(this, d), Yg(this, d);
            c = [];
            for (d in this.a) {
                a = 0;
                var e = this.a[d];
                this.c[d] && (a = Math.floor(this.c[d] / 1E3), this.c[d] -= 1E3 * a);
                this.a[d] = 0;
                (0 < e || 0 < a) && c.push({
                    unifiedReportingEvent: lf(d),
                    count: e, time: a
                })
            }
            b && (this.C = !0);
            this.n = A();
            this.k.reportEvents(c)
        }
    };
    Vg.prototype.g = function () {
        $g(this);
        this.e();
        Vg.M.g.call(this)
    };
    var ah = function (a) {
        Vg.call(this, a)
    };
    B(ah, Vg);
    ah.prototype.F = function (a) {
        var b;
        "gdn" == lc() ? (b = t("googlecreative.reporting.sharedReporter"), b || (b = new Tg, ga("googlecreative.reporting.sharedReporter", b)), a.pb || b.addReporter(new Ug(a))) : b = new Ug(a);
        return b
    };
    ah.prototype.I = u;
    ah.prototype.P = u;
    ah.prototype.O = function (a, b) {
        this.k.logCustomVariable(a, b)
    };
    var bh = function (a) {
        this.c = a;
        this.a = "undefined" != typeof DARTDebugEventHandler && DARTDebugEventHandler ? new DARTDebugEventHandler : null
    };
    l = bh.prototype;
    l.reportEvents = function (a) {
        if (this.a)for (var b = 0; b < a.length; ++b) {
            var c = a[b], d = c.unifiedReportingEvent, d = this.c.B[[d.type, escape(d.name), escape(d.videoName), d.trigger].join(":")];
            try {
                this.a.handleEventActivity(d.name, d.type, c.count, c.time, !d.k, this.c.g)
            } catch (e) {
            }
        }
    };
    l.registerChargeableEventName = u;
    l.logCustomVariable = function (a, b) {
        try {
            this.a.handleCustomVariable(unescape(a), b, this.c.g)
        } catch (c) {
        }
    };
    l.getType = function () {
        return "OUTPUT_CONSOLE"
    };
    l.getConfig = function () {
        return {reportingApiVersion: 2}
    };
    l.newReporterCallback = u;
    l.supportsChargeableEvents = function () {
        return !1
    };
    var ch = function (a) {
        Vg.call(this, a)
    };
    B(ch, Vg);
    ch.prototype.F = function (a) {
        return new bh(a)
    };
    ch.prototype.I = function (a, b, c) {
        var d = this.k;
        a = d.c.B[a];
        if (d.a)try {
            d.a.handleEventAction(b, a.name, c, a.type, !a.k, d.c.g)
        } catch (e) {
        }
    };
    ch.prototype.P = function (a) {
        var b = this.k;
        try {
            b.a.handleCustomJSExecution(a, b.c.g)
        } catch (c) {
        }
    };
    ch.prototype.O = function (a, b) {
        this.k.logCustomVariable(a, b)
    };
    var W = function (a, b, c) {
        R.call(this);
        this.a = a;
        this.W = b;
        this.e = a.c ? new ch(a) : new ah(a);
        this.A = c;
        this.j = {};
        this.m = {};
        this.D = new T(this);
        this.H = this.I = !1;
        this.n = this.Q = 0;
        this.o = [];
        this.v = {};
        this.T = new Z(this.a, this);
        this.G = new cf(this.a.c);
        this.k = null;
        this.C = {};
        b = a.ba;
        c = a.wa;
        null != b && null != c && (a.p ? this.k = new fg(b, c, ke(a), a.c, this.G, a.p) : this.k = new bg(b, c, ke(a), a.c, this.G), dh(this, "ge", "gb"), dh(this, "pe", "pb"));
        K && this.D.c(self, "unload", this.R);
        null != this.A.a && (jf |= 8, kf(2, 1), kf(1, 2), kf(4, 8), kf(8, 4), a = this.A,
            "loading" == a.a.getState() ? a.a.addEventListener("ready", y(a.e, a)) : a.e())
    };
    B(W, R);
    var eh = [10, 20, 50, 120, 240], yg = {}, dh = function (a, b, c) {
        var d = a.a.K;
        a.k && d && d[c] && d[b] && (cg(a.k, c, null, d[c]), cg(a.k, b, c, d[b]))
    };
    l = W.prototype;
    l.rb = function (a) {
        a = this.m[a.a];
        this.k && (0 == this.a.e.length || a.p) && (cg(this.k, "fe", "fb"), eg(this.k))
    };
    l.Ab = function () {
        this.n++;
        fh(this)
    };
    l.wb = function () {
        gh(this, new xe("logEvent", "Count", "FULL_SCREEN"))
    };
    l.Db = function (a) {
        "boolean" == typeof a.j && a.j ? gh(this, a) : hh(this, a);
        a.q && this.e.e()
    };
    l.zb = function () {
        this.e.e()
    };
    var hh = function (a, b) {
        var c = dd(b.c), c = Rf(b.e, c);
        null != c && ih(a, c, b.c, b.m, b.a)
    }, ih = function (a, b, c, d, e) {
        if (null !== b)switch (a.e.I(b, c, d), c) {
            case "Exit":
                for (c = Jf(a.a, "CLICK"), e = c.length - 1; 0 <= e; --e)Cf(c[e]);
            case "Count":
                Xg(a.e, b, d);
                break;
            case "Start":
                Yg(a.e, b, e);
                break;
            case "Stop":
                Zg(a.e, b, e)
        }
    }, gh = function (a, b) {
        if ("DISPLAY_TIMER" == b.g) {
            if ("Start" == b.c) {
                a.I || (Fg(y(a.X, a)), a.I = !0);
                if (0 == a.Q++) {
                    var c = Sf(a.a, "DISPLAY_TIMER");
                    c && ih(a, c, "Start", !1)
                }
                a.n--
            }
        } else(c = Sf(a.a, b.g)) && ih(a, c, b.c, !1, b.a)
    };
    l = W.prototype;
    l.Eb = function (a) {
        gh(this, a);
        var b = Tf(this.a, a.g, a.videoName);
        null != b && ih(this, b, a.c, !1, a.a)
    };
    l.ib = function (a) {
        var b = this.a.o[a.e], c = null != a.k ? a.k : b.a;
        null != a.g && !C(D(a.g)) && (c = rc(c, a.g));
        var d = this.a.F, e = this.a.C;
        if (!C(D(d)) && -1 < d.indexOf("?"))for (var e = "number" == typeof e ? e : 1, f = 0; f < e; f++)c = escape(c);
        d = d + c;
        c = b.j;
        b = null != b.g ? b.g : void 0;
        null != this.A.a ? (b = this.A, fc.test(d) ? b.a.expand(d) : b.a.open(d)) : window.open(d, c || "_blank", b || "");
        hh(this, a);
        this.e.e()
    };
    l.yb = function (a) {
        var b = this.m[a.a];
        switch (a.type) {
            case "expandAsset":
                Lg(this, b);
                break;
            case "expandRequested":
                Lg(this, b);
                break;
            case "expandFinished":
                if (a = this.j[b])Me(a), S(this, new Gg("EXPAND_FINISH", b));
                break;
            case "collapseAsset":
                Mg(this, b);
                break;
            case "collapseRequested":
                Mg(this, b);
                break;
            case "collapseFinished":
                if (a = this.j[b])Oe(a), S(this, new Gg("COLLAPSE_FINISH", b));
                break;
            case "tellAssetHide":
                this.p(b)
        }
    };
    l.ub = function (a) {
        var b;
        t:{
            b = this.a;
            var c = a.c;
            if (c && (c = hd(c)) && b.Ra[c]) {
                b = b.Ra[c];
                break t
            }
            for (c = 0; c < b.e.length; c++) {
                var d = b.e[c];
                if (this.m[a.a] != d && zd(d)) {
                    b = d;
                    break t
                }
            }
            b = null
        }
        if (b)switch (a.type) {
            case "tellCompanionAssetShow":
                Kg(this, b);
                break;
            case "tellCompanionAssetHide":
                this.p(b)
        }
    };
    l.tb = function (a) {
        a = unescape(a.c);
        this.a.c && this.e.P(a);
        try {
            eval(a)
        } catch (b) {
        }
    };
    l.Bb = function (a) {
        a = parseInt(a.c, 10);
        !isNaN(a) && 0 < a && (this.e.D = a)
    };
    l.sb = function (a) {
        var b = Sf(this.a, a.e);
        if (b) {
            var c = this.e, d = a.c;
            a = a.g;
            var e = c.o[b] || (c.o[b] = []), b = c.p[b] || (c.p[b] = []);
            0 != d && e.push(d);
            0 != a && b.push(a)
        }
    };
    l.vb = function (a) {
        this.e.O(a.c, a.g)
    };
    l.Hb = function () {
        this.a.Sa && yf(this.a.Sa);
        this.a.p && this.k && hg(this.k, gg("mtf_br", {}), this.a.g);
        for (var a = this.a.e, b = 0; b < a.length; b++) {
            var c = a[b], d = c.g;
            Kg(this, c, d && !d.e ? -1 : 1E3 * (d && d.e && 0 < d.k && d.k || 0))
        }
    };
    var Kg = function (a, b, c) {
        c ? 0 < c && (a.n++, a.o.push(hc(y(a.K, a, b), c))) : (a.n++, a.K(b))
    };
    W.prototype.K = function (a) {
        if (!(a in this.j)) {
            var b;
            b = this.a;
            if (b = this.W.a(a) ? new Ye(a, b) : null) {
                this.j[a] = b;
                this.m[b] = a;
                b = this.j[a];
                var c = this.D;
                c.c(b, "conduitInitialized", this.rb);
                c.c(b, "logEvent", this.Db);
                c.c(b, "logVideoEvent", this.Eb);
                c.c(b, "logExitFlushEventsOpenPopup", this.ib);
                c.c(b, "expandAsset expandRequested expandFinished collapseAsset collapseRequested collapseFinished tellAssetHide".split(" "), this.yb);
                c.c(b, ["tellCompanionAssetShow", "tellCompanionAssetHide"], this.ub);
                c.c(b, "invokeExternalJSFunction",
                    this.tb);
                c.c(b, "setThrottlingWindow", this.Bb);
                c.c(b, "reportCustomVariable", this.vb);
                c.c(b, "setTimerAdjustment", this.sb);
                c.c(b, "flushCounters", this.zb);
                c.c(b, "RESET", this.Ab);
                c.c(b, "registerChargeableEventName", this.U);
                c.c(b, "fullscreenExpandFinished", this.wb);
                this.k && (0 == this.a.e.length || a.p) && cg(this.k, "fb");
                if (a.p || this.a.D) {
                    if (b = a.v, c = Ed(document, b))if (this.a.D && (c.style.position = "relative"), a.a && a.a.c && (this.C[b] = c.style.height, c.style.height = "auto"), Ie(this.j[a], c), a.o) {
                        b = this.j[a];
                        for (var c =
                            a.o.split(";"), d = 0; d < c.length; d++) {
                            var e = c[d].split(":");
                            2 <= e.length && re(b.S(), e[0], e[1])
                        }
                    }
                } else document.body && document.body.firstChild ? (b = document.body.firstChild, Ie(this.j[a], b.parentNode, b)) : document.body ? Ie(this.j[a], document.body) : document.documentElement && Ie(this.j[a], document.documentElement);
                S(this, new Gg("SHOW", a))
            }
        }
        a.g && (b = a.g, b = 1E3 * (b && b.g && 0 < b.c && b.c || -1), 0 < b && (b = hc(y(this.p, this, a), b), this.o.push(b), this.v[a] = b));
        this.H || (Fg(y(this.V, this)), this.H = !0)
    };
    W.prototype.p = function (a) {
        var b = this.j[a];
        if (b) {
            for (var c = this.e, d = c.m[b] || []; 0 < d.length;)Zg(c, d.pop(), b);
            delete this.m[b];
            b.R();
            delete this.j[a];
            this.v[a] && (n.clearTimeout(this.v[a]), delete this.v[a]);
            S(this, new Gg("HIDE", a));
            fh(this)
        }
    };
    var Lg = function (a, b) {
        var c = a.j[b];
        c && (Le(c), S(a, new Gg("EXPAND", b)), S(a, new Gg("EXPAND_REQUEST", b)))
    }, Mg = function (a, b) {
        var c = a.j[b];
        c && (Ne(c), S(a, new Gg("COLLAPSE", b)), S(a, new Gg("COLLAPSE_REQUEST", b)))
    }, jh = function (a) {
        gh(a, new xe("logEvent", "Count", "HTML5_CREATIVE_IMPRESSION"));
        a.e.e()
    }, kh = function (a) {
        gh(a, new xe("logEvent", "Count", "DYNAMIC_CREATIVE_IMPRESSION"));
        a.e.e()
    };
    W.prototype.V = function () {
        lh(this)
    };
    var lh = function (a) {
        Wg(a.e);
        a.a.p && a.k && hg(a.k, gg("mtf_fi", {}), a.a.g);
        a.a.kb && jh(a);
        a.a.Ua && kh(a);
        a.a.Ta && df(a.G, a.a.W);
        F(["IMPRESSION_IMG", "ARTWORK_IMPRESSION"], function (a) {
            F(Jf(this.a, a), function (a) {
                Cf(a)
            }, this)
        }, a)
    };
    W.prototype.X = function () {
        var a = [];
        if (this.a.c)for (var b = eh[eh.length - 1] / 2, c = 1; c <= b; c++)a[a.length] = 2 * c; else a = eh;
        b = y(this.e.e, this.e);
        for (c = 0; c < a.length; c++)this.o.push(hc(b, 1E3 * a[c]))
    };
    var fh = function (a) {
        if (0 == --a.Q) {
            var b = Sf(a.a, "DISPLAY_TIMER");
            b && ih(a, b, "Stop", !1);
            $g(a.e);
            0 == a.n && a.R()
        }
    };
    W.prototype.U = function (a) {
        this.e.k.registerChargeableEventName(a.c)
    };
    W.prototype.g = function () {
        for (var a in this.C)Ed(document, a).style.height = this.C[a];
        this.D.R();
        for (this.T.R(); 0 < this.o.length;)a = this.o.pop(), n.clearTimeout(a);
        a = this.a.e;
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            c in this.j && (this.j[c].R(), delete this.j[c])
        }
        this.m = null;
        this.e.R();
        this.e = null;
        W.M.g.call(this)
    };
    var mh = function () {
    }, nh = function (a, b) {
        return v(a) ? 0 <= xa(a, b) : a == b
    };
    mh.prototype.a = function () {
        return !1
    };
    var oh = function () {
    };
    B(oh, mh);
    oh.prototype.a = function (a) {
        var b = nh("BANNER", a.j), c = !1, c = r("FLASH") ? nh("FLASH", a.e) : !0;
        return b && c
    };
    ug = new oh;
    t:{
        for (var ph = document.getElementsByTagName("noscript"), qh = 0; qh < ph.length; qh++)ph[qh].style.display = "none";
        if (t("studioV2.loadedLibraries.200_67.dfa7banner_flash_inpage")) {
            if (t("studioV2.loadedLibraries.200_67.dfa7banner_flash_inpage").bootstrap)break t;
            vg = A();
            ga("studioV2.loadedLibraries.200_67.dfa7banner_flash_inpage.bootstrap", Bg);
            ga("studioV2.loadedLibraries.200_67.dfa7banner_flash_inpage.unload", Cg)
        }
        if (t("dclkStudioV3.renderingLibraries"))for (var rh = t("dclkStudioV3.renderingLibraries"), sh = 0; sh <
        rh.length; ++sh) {
            var th = rh[sh];
            if ("200_67" == th.version && -1 != th.url.indexOf("dfa7banner_flash_inpage")) {
                if (th.bootstrapFunction)break t;
                vg = A();
                th.bootstrapFunction = Bg;
                th.unload = Cg
            }
        }
        var $d = "dfa7banner_flash_inpage", uh = t("studioV2.defer");
        uh && x(uh) ? uh(Bg) : Bg()
    }
    ;
})()

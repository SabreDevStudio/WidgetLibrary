(function () {
    var e, h = this, l = function (a) {
        return void 0 !== a
    }, aa = function (a) {
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
    }, m = function (a) {
        return "array" == aa(a)
    }, ba = function (a) {
        var b = aa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, n = function (a) {
        return "string" == typeof a
    }, p = function (a) {
        return "boolean" == typeof a
    }, q = function (a) {
        return "number" == typeof a
    }, ca = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, da = "closure_uid_" + (1E9 * Math.random() >>> 0), ea =
        0, fa = function (a, b, c) {
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
    }, ha = function (a, b, c) {
        ha = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? fa : ga;
        return ha.apply(null, arguments)
    }, ia = function (a) {
        var b =
            t;

        function c() {
        }

        c.prototype = b.prototype;
        a.S = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.R = function (a, c, g) {
            for (var k = Array(arguments.length - 2), r = 2; r < arguments.length; r++)k[r - 2] = arguments[r];
            return b.prototype[c].apply(a, k)
        }
    };
    var u = function (a, b) {
        var c = parseFloat(a);
        return isNaN(c) || 1 < c || 0 > c ? b : c
    }, ja = function (a, b) {
        var c = parseInt(a, 10);
        return isNaN(c) ? b : c
    }, ka = /^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/, la = function (a, b) {
        if (!a)return b;
        var c = a.match(ka);
        return c ? c[0] : b
    };
    var ma = u("0.02", 0), na = u("0.0", 0);
    var oa = u("0.005", 0), pa = u("0", 0), qa = u("0.001", 0), ra = ja("1500", 1500), sa = u("0.01", 0), ta = u("1.0", 0), ua = u("0.5", 0), va = u("", .001), wa = ja("", 200), xa = u("0.1", 0),
        ya = u("0.01", 0), za = /^true$/.test("") ? !0 : !1, Aa = u("0.05", 0), Ba = u("0.01", 0), Ca = u("0.1", 0), Da = u("0.01", 0), Ea = u("1", 0), Fa = u("", .001), Ga = u("0.0", 0);
    var Ha = function (a) {
        return /^[\s\xa0]*$/.test(a)
    }, Ia = function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var v = function (a, b, c) {
        for (var d in a)Object.prototype.hasOwnProperty.call(a, d) && b.call(c, a[d], d, a)
    }, Ja = function (a) {
        var b = window;
        b.addEventListener ? b.addEventListener("message", a, !1) : b.attachEvent && b.attachEvent("onmessage", a)
    };
    var w = function () {
        return h.googletag || (h.googletag = {})
    }, x = function (a, b, c) {
        var d = w();
        a in d && !c || (d[a] = b)
    }, Ka = function (a, b) {
        a.addEventListener ? a.addEventListener("load", b, !1) : a.attachEvent && a.attachEvent("onload", b)
    };
    var y = {};
    y["#1#"] = la("", "pagead2.googlesyndication.com");
    y["#2#"] = la("", "pubads.g.doubleclick.net");
    y["#3#"] = la("", "securepubads.g.doubleclick.net");
    y["#4#"] = la("", "partner.googleadservices.com");
    y["#5#"] = "http://pagead2.googlesyndication.com/pagead/show_ads.js";
    var La;
    t:{
        var Ma = null, z = window, Na = null;
        try {
            for (; null != z && z !== Ma;) {
                Na = z.location.protocol;
                if ("https:" === Na)break; else if ("http:" === Na || "file:" === Na) {
                    La = !1;
                    break t
                }
                Ma = z;
                z = z.parent
            }
        } catch (Oa) {
        }
        La = !0
    }
    y["#6#"] = La;
    y["#7#"] = ma;
    y["#10#"] = pa;
    y["#11#"] = qa;
    y["#12#"] = oa;
    y["#13#"] = ra;
    y["#16#"] = sa;
    y["#17#"] = ta;
    y["#18#"] = ua;
    y["#20#"] = na;
    y["#23#"] = va;
    y["#24#"] = wa;
    y["#25#"] = xa;
    y["#27#"] = ya;
    y["#28#"] = Aa;
    y["#29#"] = Ba;
    y["#31#"] = Ca;
    y["#33#"] = la("", "pagead2.googlesyndication.com");
    y["#34#"] = Ea;
    y["#36#"] = za;
    y["#37#"] = Da;
    y["#38#"] = Fa;
    y["#39#"] = "";
    y["#40#"] = Ga;
    x("_vars_", y);
    var Pa = Array.prototype, Qa = function (a, b) {
            if (n(a))return n(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
            for (var c = 0; c < a.length; c++)if (c in a && a[c] === b)return c;
            return -1
        }, Ra = function (a, b, c) {
            for (var d = a.length, f = n(a) ? a.split("") : a, g = 0; g < d; g++)g in f && b.call(c, f[g], g, a)
        }, Sa = function (a, b) {
            for (var c = a.length, d = Array(c), f = n(a) ? a.split("") : a, g = 0; g < c; g++)g in f && (d[g] = b.call(void 0, f[g], g, a));
            return d
        }, Ta = function (a, b) {
            var c;
            t:{
                c = a.length;
                for (var d = n(a) ? a.split("") : a, f = 0; f < c; f++)if (f in d && b.call(void 0, d[f], f, a)) {
                    c =
                        f;
                    break t
                }
                c = -1
            }
            return 0 > c ? null : n(a) ? a.charAt(c) : a[c]
        }, Ua = function (a, b) {
            0 <= Qa(a, b) || a.push(b)
        }, Va = function (a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
                return c
            }
            return []
        }, Wa = function (a, b, c) {
            return 2 >= arguments.length ? Pa.slice.call(a, b) : Pa.slice.call(a, b, c)
        }, Xa = function (a) {
            for (var b = {}, c = 0, d = 0; d < a.length;) {
                var f = a[d++], g = ca(f) ? "o" + (f[da] || (f[da] = ++ea)) : (typeof f).charAt(0) + f;
                Object.prototype.hasOwnProperty.call(b, g) || (b[g] = !0, a[c++] = f)
            }
            a.length = c
        }, Za = function (a, b) {
            a.sort(b || Ya)
        },
        ab = function (a) {
            for (var b = $a, c = 0; c < a.length; c++)a[c] = {index: c, value: a[c]};
            var d = b || Ya;
            Za(a, function (a, b) {
                return d(a.value, b.value) || a.index - b.index
            });
            for (c = 0; c < a.length; c++)a[c] = a[c].value
        }, Ya = function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        };
    var bb = function (a) {
        return q(a) && isFinite(a) && 0 == a % 1 && 0 <= a
    }, cb = function (a) {
        return a.replace(/[^a-zA-Z0-9]/g, function (a) {
            return "&#" + a.charCodeAt() + ";"
        })
    }, db = function () {
        return A("#6#") ? "https:" : "http:"
    }, eb = function (a) {
        var b = [], b = Sa(a, function (a) {
            a = a.getName();
            var b = a.split("/");
            return "/" == a.charAt(0) && 2 <= b.length ? b[1] : "/" != a.charAt(0) && 1 <= b.length ? b[0] : ""
        });
        Xa(b);
        return b
    }, A = function (a) {
        return w()._vars_[a]
    };
    var fb = A("#36#");
    var C = function (a, b) {
        this.b = a;
        this.a = b || []
    };
    C.prototype.getMessageId = function () {
        return this.b
    };
    C.prototype.getMessageArgs = function () {
        return this.a
    };
    var gb = function (a, b, c, d, f) {
        this.b = new Date;
        this.g = d || null;
        this.f = c || null;
        this.c = a;
        this.d = b;
        this.a = f || null
    };
    e = gb.prototype;
    e.getSlot = function () {
        return this.g
    };
    e.getService = function () {
        return this.f
    };
    e.getLevel = function () {
        return this.c
    };
    e.getTimestamp = function () {
        return this.b
    };
    e.getMessage = function () {
        return this.d
    };
    e.getReference = function () {
        return this.a
    };
    var hb = ["Debug", "Info", "Warning", "Error", "Fatal"];
    gb.prototype.toString = function () {
        var a = this.b.toTimeString() + ": " + hb[this.c] + ": " + this.d;
        this.a && (a += " Duration: " + (this.b.getTime() - this.a.getTimestamp().getTime()) + "ms.");
        return a
    };
    var E = function () {
        this.a = []
    };
    E.prototype.getAllEvents = function () {
        return this.a
    };
    E.prototype.getEventsByService = function (a) {
        return ib(this, function (b) {
            return b.getService() === a
        })
    };
    E.prototype.getEventsBySlot = function (a) {
        return ib(this, function (b) {
            return b.getSlot() === a
        })
    };
    E.prototype.getEventsByLevel = function (a) {
        return ib(this, function (b) {
            return b.getLevel() >= a
        })
    };
    var ib = function (a, b) {
        for (var c = [], d = 0; d < a.a.length; ++d)b(a.a[d]) && c.push(a.a[d]);
        return c
    };
    E.prototype.log = function (a, b, c, d, f) {
        a = new gb(a, b, c, d, f);
        this.a.push(a);
        return a
    };
    var G = function (a, b, c, d, f) {
        return a.log(1, b, c, d, f)
    }, H = function (a, b, c, d) {
        a.log(2, b, c, d, void 0)
    }, I = function (a, b, c, d) {
        a.log(3, b, c, d, void 0)
    }, J = function () {
        var a = w();
        return a.debug_log || (a.debug_log = new E)
    };
    x("getEventLog", J);
    var K = function (a) {
            return function () {
                return new C(a, [])
            }
        }, L = function (a) {
            return function (b) {
                return new C(a, [b])
            }
        }, M = function (a) {
            return function (b, c) {
                return new C(a, [b, c])
            }
        }, N = function (a) {
            return function (b, c, d) {
                return new C(a, [b, c, d])
            }
        }, jb = function (a) {
            return "[" + Sa(a, function (a) {
                    return n(a) ? "'" + a + "'" : m(a) ? jb(a) : String(a)
                }).join(", ") + "]"
        }, kb = K(1), lb = L(2), mb = L(3), nb = L(4), ob = L(5), pb = L(6), qb = K(8), rb = N(9), sb = N(10), tb = M(12), ub = L(13), vb = L(14), wb = K(16), xb = N(17), yb = K(19), zb = L(20), Ab = L(21), Bb = M(22), Cb = M(23), Db =
            L(26), Eb = L(27), Fb = L(28), Gb = L(30), Hb = M(31), Ib = K(34), Jb = L(35), Kb = N(36), Lb = N(37), Mb = K(38), Nb = L(39), Ob = M(40), Pb = K(42), Qb = M(43), Rb = K(44), Sb = K(45), Tb = L(46), Ub = L(47), Vb = L(48), Wb = K(49), Xb = K(50), Yb = K(52), Zb = M(53), $b = M(54), ac = L(55), bc = L(56), cc = M(57), dc = N(58), gc = L(59), hc = L(60), ic = M(61), jc = M(62), kc = L(63), lc = M(64), mc = L(65), nc = K(66), oc = K(67), pc = K(68), qc = K(69), rc = K(70), sc = K(71), tc = K(72), uc = L(75), vc = N(77), wc = L(78), xc = K(79), yc = L(80), zc = M(82), Ac = M(84), Bc = L(85), Cc = K(87), Dc = N(88), Ec = L(90), Fc = L(92), Gc = L(93), Hc = L(94),
        Ic = L(95), O = function (a, b) {
            var c = jb(Va(b)), c = c.substring(1, c.length - 1);
            return new C(96, [a, c])
        };
    x("getVersion", function () {
        return "57"
    });
    var Kc = function () {
        this.a = Jc + "/pagead/gen_204?id=" + encodeURIComponent("gpt_exception")
    }, Jc = A("#6#") ? "https://" + A("#33#") : "http://" + A("#33#"), Lc = function (a, b, c) {
        b && b.match(/^\w+$/) && c && (a.a += "&" + b + "=" + encodeURIComponent(c))
    }, Mc = function (a, b) {
        if (!l(b) || 0 > b || 1 < b)b = A("#23#");
        if (Math.random() < b && a.a) {
            var c = a.a, d = window;
            d.google_image_requests || (d.google_image_requests = []);
            var f = d.document.createElement("img");
            f.src = c;
            d.google_image_requests.push(f)
        }
    }, Oc = function (a) {
        var b = Nc;
        Lc(a, "vrg", "57");
        b = eb(b);
        3 >=
        b.length || (b = Wa(b, 0, 3), b.push("__extra__"));
        Lc(a, "nw_id", b.join(","))
    };
    var Pc = A("#38#"), Nc = [], Qc = function (a, b) {
        var c = {methodId: a};
        b.name && (c.name = b.name);
        b.message && (c.message = b.message.substring(0, 512));
        b.fileName && (c.fileName = b.fileName);
        b.lineNumber && (c.lineNumber = b.lineNumber);
        if (b.stack) {
            var d;
            var f = b.stack;
            try {
                -1 == f.indexOf("") && (f = "\n" + f);
                for (var g; f != g;)g = f, f = f.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                d = f.replace(/\n */g, "\n")
            } catch (k) {
                d = ""
            }
            c.stack = d
        }
        return c
    }, P = function (a, b) {
        Rc(a, b, void 0);
        throw b;
    }, Rc = function (a, b, c) {
        if (!b.O)try {
            b.O = !0;
            var d =
                Pc;
            l(c) && 0 <= c && 1 >= c && (d = c);
            var f = Qc(a, b), g = new Kc;
            try {
                Oc(g)
            } catch (k) {
            }
            v(f, function (a, b) {
                Lc(g, b, a)
            });
            Mc(g, d)
        } catch (r) {
        }
    };
    var Sc = function () {
        this.b = this.a = 0
    };
    Sc.prototype.push = function (a) {
        try {
            for (var b = J(), c = 0; c < arguments.length; ++c)try {
                "function" == aa(arguments[c]) && (arguments[c](), this.a++)
            } catch (d) {
                this.b++, I(b, Gb(String(d.message)))
            }
            G(b, Hb(String(this.a), String(this.b)));
            return this.a
        } catch (f) {
            P(1001, f)
        }
    };
    (function () {
        function a(a) {
            this.t = {};
            this.tick = function (a, b, c) {
                this.t[a] = [void 0 != c ? c : (new Date).getTime(), b];
                if (void 0 == c)try {
                    window.console.timeStamp("CSI/" + a)
                } catch (d) {
                }
            };
            this.tick("start", null, a)
        }

        var b;
        window.performance && (b = window.performance.timing);
        var c = b ? new a(b.responseStart) : new a;
        window.GPT_jstiming = {Timer: a, load: c};
        b && (c = b.navigationStart, b = b.responseStart, 0 < c && b >= c && (window.GPT_jstiming.srt = b - c));
        try {
            b = null, window.chrome && window.chrome.csi && (b = Math.floor(window.chrome.csi().pageT)), null ==
            b && window.gtbExternal && (b = window.gtbExternal.pageT()), null == b && window.external && (b = window.external.pageT), b && (window.GPT_jstiming.pt = b)
        } catch (d) {
        }
    })();
    if (window.GPT_jstiming) {
        window.GPT_jstiming.M = {};
        window.GPT_jstiming.P = 1;
        var Tc = function (a, b, c) {
            var d = a.t[b], f = a.t.start;
            if (d && (f || c))return d = a.t[b][0], void 0 != c ? f = c : f = f[0], d - f
        };
        window.GPT_jstiming.getTick = Tc;
        var Uc = function (a, b, c) {
            var d = "";
            window.GPT_jstiming.srt && (d += "&srt=" + window.GPT_jstiming.srt);
            window.GPT_jstiming.pt && (d += "&tbsrt=" + window.GPT_jstiming.pt);
            try {
                window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d += "&tran=" + window.gtbExternal.tran() :
                window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
            } catch (f) {
            }
            var g = window.chrome;
            if (g && (g = g.loadTimes)) {
                g().wasFetchedViaSpdy && (d += "&p=s");
                if (g().wasNpnNegotiated) {
                    var d = d + "&npn=1", k = g().npnNegotiatedProtocol;
                    k && (d += "&npnv=" + (encodeURIComponent || escape)(k))
                }
                g().wasAlternateProtocolAvailable && (d += "&apa=1")
            }
            var r = a.t, Q = r.start, g = [], k = [], B;
            for (B in r)if ("start" != B && 0 != B.indexOf("_")) {
                var D = r[B][1];
                D ? r[D] && k.push(B + "." + Tc(a, B, r[D][0])) : Q && g.push(B + "." + Tc(a, B))
            }
            if (b)for (var F in b)d +=
                "&" + F + "=" + b[F];
            (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
            return [b, "?v=3", "&s=" + (window.GPT_jstiming.sn || "gpt") + "&action=", a.name, k.length ? "&it=" + k.join(",") : "", d, "&rt=", g.join(",")].join("")
        }, Vc = function (a, b, c) {
            a = Uc(a, b, c);
            if (!a)return "";
            b = new Image;
            var d = window.GPT_jstiming.P++;
            window.GPT_jstiming.M[d] = b;
            b.onload = b.onerror = function () {
                window.GPT_jstiming && delete window.GPT_jstiming.M[d]
            };
            b.src = a;
            b = null;
            return a
        };
        window.GPT_jstiming.report =
            function (a, b, c) {
                if ("prerender" == document.webkitVisibilityState) {
                    var d = !1, f = function () {
                        if (!d) {
                            b ? b.prerender = "1" : b = {prerender: "1"};
                            var g;
                            "prerender" == document.webkitVisibilityState ? g = !1 : (Vc(a, b, c), g = !0);
                            g && (d = !0, document.removeEventListener("webkitvisibilitychange", f, !1))
                        }
                    };
                    document.addEventListener("webkitvisibilitychange", f, !1);
                    return ""
                }
                return Vc(a, b, c)
            }
    }
    ;
    var Wc = function (a, b) {
        for (var c in a)if (b.call(void 0, a[c], c, a))return !0;
        return !1
    }, Xc = function (a, b) {
        for (var c in a)if (a[c] == b)return !0;
        return !1
    }, Yc = function (a) {
        var b = arguments.length;
        if (1 == b && m(arguments[0]))return Yc.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++)c[arguments[d]] = !0;
        return c
    };
    Yc("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    Yc("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    Yc("embed", "iframe", "link", "object", "script", "style", "template");
    var Zc = function (a, b) {
        this.b = a;
        this.a = b
    };
    e = Zc.prototype;
    e.clone = function () {
        return new Zc(this.b, this.a)
    };
    e.isEmpty = function () {
        return !(this.b * this.a)
    };
    e.ceil = function () {
        this.b = Math.ceil(this.b);
        this.a = Math.ceil(this.a);
        return this
    };
    e.floor = function () {
        this.b = Math.floor(this.b);
        this.a = Math.floor(this.a);
        return this
    };
    e.round = function () {
        this.b = Math.round(this.b);
        this.a = Math.round(this.a);
        return this
    };
    var R;
    t:{
        var $c = h.navigator;
        if ($c) {
            var ad = $c.userAgent;
            if (ad) {
                R = ad;
                break t
            }
        }
        R = ""
    }
    ;
    var bd = -1 != R.indexOf("Opera") || -1 != R.indexOf("OPR"), S = -1 != R.indexOf("Trident") || -1 != R.indexOf("MSIE"), cd = -1 != R.indexOf("Gecko") && -1 == R.toLowerCase().indexOf("webkit") && !(-1 != R.indexOf("Trident") || -1 != R.indexOf("MSIE")), dd = -1 != R.toLowerCase().indexOf("webkit"), ed = function () {
        var a = h.document;
        return a ? a.documentMode : void 0
    }, fd = function () {
        var a = "", b;
        if (bd && h.opera)return a = h.opera.version, "function" == aa(a) ? a() : a;
        cd ? b = /rv\:([^\);]+)(\)|;)/ : S ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : dd && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(R)) ? a[1] : "");
        return S && (b = ed(), b > parseFloat(a)) ? String(b) : a
    }(), gd = {}, hd = function (a) {
        if (!gd[a]) {
            for (var b = 0, c = String(fd).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, d.length), g = 0; 0 == b && g < f; g++) {
                var k = c[g] || "", r = d[g] || "", Q = RegExp("(\\d*)(\\D*)", "g"), B = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var D = Q.exec(k) || ["", "", ""], F = B.exec(r) || ["", "", ""];
                    if (0 == D[0].length && 0 == F[0].length)break;
                    b = Ia(0 == D[1].length ? 0 : parseInt(D[1],
                        10), 0 == F[1].length ? 0 : parseInt(F[1], 10)) || Ia(0 == D[2].length, 0 == F[2].length) || Ia(D[2], F[2])
                } while (0 == b)
            }
            gd[a] = 0 <= b
        }
    }, id = h.document, jd = id && S ? ed() || ("CSS1Compat" == id.compatMode ? parseInt(fd, 10) : 5) : void 0;
    var kd;
    if (!(kd = !cd && !S)) {
        var ld;
        if (ld = S)ld = S && 9 <= jd;
        kd = ld
    }
    kd || cd && hd("1.9.1");
    S && hd("9");
    var md = {Q: "slotRenderEnded"}, nd = function (a, b, c, d) {
        this.slot = a;
        this.isEmpty = b;
        this.size = c;
        this.lineItemId = this.creativeId = null;
        this.serviceName = d
    };
    var t = function () {
        this.F = [];
        this.I = {};
        this.b = !1;
        this.m = {};
        this.log = J();
        G(this.log, Jb(this.getName()), this)
    };
    e = t.prototype;
    e.getName = function () {
        return "unknown"
    };
    e.getVersion = function () {
        return "unversioned"
    };
    e.getSlots = function () {
        return this.F
    };
    e.getSlotIdMap = function () {
        return this.I
    };
    e.enable = function () {
        if (this.b)G(this.log, Mb(), this); else {
            this.b = !0;
            try {
                this.A()
            } catch (a) {
                Rc(1402, a), I(this.log, Nb(String(a)), this)
            }
        }
    };
    e.B = function (a) {
        this.F.push(a);
        this.I[a.getSlotId().getId()] = a;
        G(this.log, Ob(this.getName(), a.getName()), this, a)
    };
    e.addEventListener = function (a, b) {
        try {
            if ("function" != aa(b) || !n(a)) {
                var c = O("Service.addEventListener", arguments);
                H(this.log, c, this);
                return this
            }
            if (!Xc(md, a))return H(this.log, Gc(a), this), this;
            c = a;
            m(this.m[c]) || (this.m[c] = []);
            this.m[c].push(b);
            return this
        } catch (d) {
            P(1401, d)
        }
    };
    var od = function (a, b) {
        var c = a.m.slotRenderEnded;
        m(c) && Ra(c, function (a) {
            try {
                a(b)
            } catch (c) {
                a = c && n(c.name) ? c.name : null;
                var g = c && n(c.message) ? c.message : null, k = "";
                a && g ? k = a + ": " + g : a ? k = a : g && (k = g);
                H(this.log, Fc(k), this)
            }
        }, a)
    };
    var pd = {load: !0, gpt_load: !0, _pubads_load_start: !0, pubads_load: !0}, qd = {
        ad_fetch_start: !0,
        ad_render_start: !0
    }, rd = {
        pubads_load: "_pubads_load_start",
        ad_fetch_end: "ad_fetch_start",
        ad_render_end: "ad_render_start"
    }, sd = {}, td = function () {
        this.g = !1;
        h.GPT_jstiming && h.GPT_jstiming.load && ("http:" == h.location.protocol || "https:" == h.location.protocol) && Math.random() < A("#37#") && (this.g = !0);
        this.c = this.b = this.f = null;
        this.l = this.k = !1;
        this.j = window.GPT_jstiming.getTick(window.GPT_jstiming.load, "start", 0);
        this.d = window.GPT_jstiming.load;
        this.d.name = "global";
        this.a = {};
        this.a.load = !1;
        this.a.gpt_load = !1;
        this.a._pubads_load_start = !1;
        this.a.pubads_load = !1;
        this.h = 500;
        this.m = [];
        this.i = {};
        this.n = !1
    }, vd = function (a, b, c, d, f, g) {
        c && a.d ? (a.d.tick(b, f, g), ud(a, !0)) : c || (d ? (a.c || (a.c = new h.GPT_jstiming.Timer(a.j), a.c.name = "ad_events_psbk"), a.c.tick(b, f, g), 0 != b.indexOf("_") && (a.l = !0)) : (a.b || (a.b = new h.GPT_jstiming.Timer(a.j), a.b.name = "ad_events"), a.b.tick(b, f, g), 0 != b.indexOf("_") && (a.k = !0)))
    };
    td.prototype.tick = function (a, b) {
        try {
            if (this.g) {
                var c = pd.hasOwnProperty(a), d = rd[a];
                c && (this.a[a] = !0);
                vd(this, a, c, b || !1, d)
            }
        } catch (f) {
            P(2601, f)
        }
    };
    var wd = function (a) {
        window.setTimeout(ha(function () {
            try {
                ud(this, !1) && (this.h = 32E3 < 2 * this.h ? 32E3 : 2 * this.h), wd(this)
            } catch (a) {
                P(2602, a)
            }
        }, a), a.h)
    }, ud = function (a, b) {
        if (!a.g)return !1;
        var c = "https:" == h.location.protocol ? "https://www.google.com/csi" : "http://csi.gstatic.com/csi", d = {vrg: "57"};
        a.m.length && (d.e = a.m.join());
        var f = !1;
        if (b && a.d && null != a.d && (a.a.load || "complete" == document.readyState) && a.a.gpt_load && a.a._pubads_load_start == a.a.pubads_load)return h.GPT_jstiming.report(a.d, d, c), a.d = null, !0;
        b || (a.b &&
        a.k && (h.GPT_jstiming.report(a.b, d, c), a.b = null, a.k = !1, f = !0), a.c && a.l && (h.GPT_jstiming.report(a.c, d, c), a.c = null, a.l = !1, f = !0));
        return f
    };
    td.prototype.tickRepeated = function (a, b, c) {
        if (this.g && !(4 < b)) {
            var d = rd[a], f = pd.hasOwnProperty(a), g = a, k = d;
            d && (k = this.f && sd[d] ? k + ".sra" : k + ("." + b));
            g = this.f && sd[a] ? g + ".sra" : g + ("." + b);
            k && this.i.hasOwnProperty("_" + k) && (k = "_" + k, vd(this, k, !1, c || !1, void 0, this.i[k] + this.j), delete this.i[k]);
            vd(this, g, f, c || !1, k);
            b = c ? this.c : this.b;
            f || "ad_fetch_start" != a || this.n || (vd(this, "first_ad_fetch_start", !1, c || !1, void 0, window.GPT_jstiming.getTick(b, g) + this.j), this.n = !0);
            qd.hasOwnProperty(a) && (a = window.GPT_jstiming.getTick(b,
                g), this.i["_" + g] = a)
        }
    };
    td.prototype.addFeature = function (a) {
        0 < a.length && Ua(this.m, a)
    };
    td.prototype.setSraMode = function (a) {
        null === this.f && ((this.f = a) ? this.addFeature("sra") : this.addFeature("non-sra"))
    };
    var yd = function () {
        return w()._tmanager_ || xd()
    }, xd = function () {
        var a = new td;
        x("_tmanager_", a);
        wd(a);
        Ka(window, function () {
            a.tick("load")
        });
        a.addFeature("v57");
        return a
    };
    var zd = function () {
        this.a = {};
        this.b = !1;
        this.c = J();
        this.f = G(this.c, qb());
        Ka(window, ha(zd.prototype.d, this))
    }, Ad = function (a, b) {
        var c = null;
        b in a.a && (c = a.a[b]);
        return c
    }, Bd = function () {
        var a = T();
        v(a.a, function (a, c) {
            a.enable();
            yd().addFeature(c)
        })
    };
    zd.prototype.d = function () {
        try {
            this.b = !0, G(this.c, kb(), null, null, this.f)
        } catch (a) {
            P(1802, a)
        }
    };
    var T = function () {
        var a = w();
        return a.service_manager_instance || (a.service_manager_instance = new zd)
    };
    x("enableServices", function () {
        try {
            Bd()
        } catch (a) {
            P(1801, a)
        }
    });
    var Cd = function (a) {
        return m(a) && 2 == a.length && bb(a[0]) && bb(a[1])
    }, Dd = function (a) {
        return m(a) && 1 < a.length && q(a[0]) && q(a[1])
    };
    var Ed = function (a, b) {
        this.b = a;
        this.a = b
    };
    Ed.prototype.getWidth = function () {
        return this.b
    };
    Ed.prototype.getHeight = function () {
        return this.a
    };
    var Fd = function (a) {
        var b = [];
        if (m(a))if (Dd(a))b.push(new Ed(a[0], a[1])); else for (var c = 0; c < a.length; ++c) {
            var d = a[c];
            Dd(d) && b.push(new Ed(d[0], d[1]))
        }
        return b
    };
    var Gd = function (a, b) {
        this.a = a;
        this.b = b
    };
    Gd.prototype.clone = function () {
        return new Gd(this.a, this.b)
    };
    var Hd = function (a) {
        this.a = a
    }, Id = function (a, b) {
        var c = Ta(a.a, function (a) {
            a = a.a;
            return a.b <= b.b && a.a <= b.a
        });
        return null == c ? null : c.b
    }, Jd = function (a) {
        if (!m(a) || 2 != a.length)throw Error("Each mapping entry has to be an array of size 2");
        var b;
        b = a[0];
        if (!Cd(b))throw Error("Size has to be an array of two non-negative integers");
        b = new Zc(b[0], b[1]);
        if (m(a[1]) && 0 == a[1].length)a = []; else if (a = Fd(a[1]), 0 == a.length)throw Error("At least one slot size must be present");
        return new Gd(b, a)
    };
    var Kd = function (a, b, c) {
        this.b = a;
        this.c = q(b) ? b : 0;
        this.a = this.b + "_" + this.c;
        this.d = c || "gpt_unit_" + this.a
    };
    e = Kd.prototype;
    e.getId = function () {
        return this.a
    };
    e.getName = function () {
        return this.b
    };
    e.getInstance = function () {
        return this.c
    };
    e.toString = Kd.prototype.getId;
    e.getDomId = function () {
        return this.d
    };
    var Ld = function (a, b, c, d) {
        this.i = a;
        this.w = Fd(c);
        this.l = null;
        this.b = new Kd(a, b, d);
        this.c = [];
        this.f = {};
        this.h = null;
        this.a = J();
        G(this.a, lb(this.b.toString()), null, this);
        this.g = this.k = null;
        this.p = this.r = "";
        this.m = !0;
        this.d = {};
        this.j = [];
        this.v = !1;
        this.s = this.q = null;
        this.o = 0;
        this.n = -1;
        this.u = 0
    };
    e = Ld.prototype;
    e.set = function (a, b) {
        try {
            if (!n(a) || !b)return H(this.a, O("Slot.set", arguments), null, this), this;
            var c = this.getName();
            this.f[a] = b;
            this.k || this.g ? H(this.a, sb(a, String(b), c), null, this) : G(this.a, rb(a, String(b), c), null, this);
            return this
        } catch (d) {
            P(201, d)
        }
    };
    e.get = function (a) {
        try {
            return n(a) ? this.f.hasOwnProperty(a) ? this.f[a] : null : (H(this.a, O("Slot.get", arguments), null, this), null)
        } catch (b) {
            P(202, b)
        }
    };
    e.getAttributeKeys = function () {
        try {
            var a = [];
            v(this.f, function (b, d) {
                a.push(d)
            });
            return a
        } catch (b) {
            P(203, b)
        }
    };
    e.addService = function (a) {
        try {
            var b = T();
            if (!Xc(b.a, a))return H(this.a, Hc(this.b.toString()), null, this), this;
            for (b = 0; b < this.c.length; ++b)if (a == this.c[b])return H(this.a, tb(a.getName(), this.b.toString()), a, this), this;
            this.c.push(a);
            a.B(this);
            return this
        } catch (c) {
            P(204, c)
        }
    };
    e.getName = function () {
        return this.i
    };
    e.getAdUnitPath = function () {
        try {
            return this.i
        } catch (a) {
            P(215, a)
        }
    };
    e.getSlotId = function () {
        return this.b
    };
    e.getServices = function () {
        return this.c
    };
    e.getSizes = function (a, b) {
        return q(a) && q(b) && this.l ? Id(this.l, new Zc(a, b)) : this.w
    };
    e.defineSizeMapping = function (a) {
        try {
            if (!m(a))throw Error("Size mapping has to be an array");
            var b = Sa(a, Jd);
            this.l = new Hd(b)
        } catch (c) {
            Rc(205, c), H(this.a, ub(c.message), null, this)
        }
        return this
    };
    e.hasWrapperDiv = function () {
        return !!document.getElementById(this.b.getDomId())
    };
    e.setClickUrl = function (a) {
        try {
            if (!n(a))return H(this.a, O("Slot.setClickUrl", arguments), null, this), this;
            this.p = a;
            return this
        } catch (b) {
            P(206, b)
        }
    };
    e.getClickUrl = function () {
        return this.p
    };
    e.setCategoryExclusion = function (a) {
        try {
            return n(a) && !Ha(null == a ? "" : String(a)) ? (Ua(this.j, a), G(this.a, vb(a), null, this)) : H(this.a, O("Slot.setCategoryExclusion", arguments), null, this), this
        } catch (b) {
            P(207, b)
        }
    };
    e.clearCategoryExclusions = function () {
        try {
            return G(this.a, wb(), null, this), this.j = [], this
        } catch (a) {
            P(208, a)
        }
    };
    e.getCategoryExclusions = function () {
        try {
            return Va(this.j)
        } catch (a) {
            P(209, a)
        }
    };
    e.setTargeting = function (a, b) {
        try {
            var c = [];
            m(b) ? c = b : b && c.push(b.toString());
            n(a) ? (G(this.a, xb(a, c.join(), this.getName()), null, this), this.d[a] = c) : H(this.a, O("Slot.setTargeting", arguments), null, this);
            return this
        } catch (d) {
            P(210, d)
        }
    };
    e.clearTargeting = function () {
        try {
            return G(this.a, yb(), null, this), this.d = {}, this
        } catch (a) {
            P(211, a)
        }
    };
    e.getTargetingMap = function () {
        var a = this.d, b = {}, c;
        for (c in a)b[c] = a[c];
        return b
    };
    e.getTargeting = function (a) {
        try {
            return n(a) ? this.d.hasOwnProperty(a) ? Va(this.d[a]) : [] : (H(this.a, O("Slot.getTargeting", arguments), null, this), [])
        } catch (b) {
            P(212, b)
        }
    };
    e.getTargetingKeys = function () {
        try {
            var a = [];
            v(this.d, function (b, d) {
                a.push(d)
            });
            return a
        } catch (b) {
            P(213, b)
        }
    };
    e.getOutOfPage = function () {
        return this.v
    };
    e.getAudExtId = function () {
        return this.o
    };
    e.setTagForChildDirectedTreatment = function (a) {
        if (0 === a || 1 === a)this.n = a
    };
    e.gtfcd = function () {
        return this.n
    };
    e.setCollapseEmptyDiv = function (a, b) {
        try {
            if (!p(a) || b && !p(b))return H(this.a, O("Slot.setCollapseEmptyDiv", arguments), null, this), this;
            this.s = (this.q = a) && Boolean(b);
            b && !a && H(this.a, zb(this.b.toString()), null, this);
            return this
        } catch (c) {
            P(214, c)
        }
    };
    e.getCollapseEmptyDiv = function () {
        return this.q
    };
    e.getDivStartsCollapsed = function () {
        return this.s
    };
    var Md = function (a, b) {
        if (!a.hasWrapperDiv())return I(a.a, Ab(a.b.toString()), null, a), !1;
        var c = h.document, d = a.b.getDomId(), c = c && c.getElementById(d);
        if (!c)return I(a.a, Bb(d, a.b.toString()), null, a), !1;
        d = a.h;
        return n(d) && 0 < d.length ? (a.renderStarted(), c.innerHTML = d, a.renderEnded(b), !0) : !1
    };
    e = Ld.prototype;
    e.fetchStarted = function (a) {
        this.k = G(this.a, mb(this.getName()), null, this);
        this.r = a
    };
    e.getContentUrl = function () {
        return this.r
    };
    e.fetchEnded = function () {
        G(this.a, nb(this.getName()), null, this, this.k)
    };
    e.renderStarted = function () {
        this.g = G(this.a, ob(this.getName()), null, this)
    };
    e.renderEnded = function (a) {
        G(this.a, pb(this.getName()), null, this, this.g);
        Ra(this.c, function (b) {
            b.getName() == a.serviceName && od(b, a)
        })
    };
    e.setFirstLook = function (a) {
        if (!p(a))return H(this.a, O("Slot.setFirstLook", arguments), null, this), this;
        this.u = a ? 1 : 2;
        return this
    };
    e.getFirstLook = function () {
        return this.u
    };
    var Nd = function () {
        this.a = {};
        this.b = {};
        this.c = J()
    }, Od = function (a, b, c, d) {
        if (!n(b) || 0 >= b.length || !c)return null;
        b in a.a || (a.a[b] = []);
        c = new Ld(b, a.a[b].length, c, d);
        d = c.getSlotId().getDomId();
        if (a.b[d])return I(a.c, Fb(d)), null;
        a.a[b].push(c);
        a.b[c.getSlotId().getDomId()] = c;
        Nc.push(c);
        return c
    };
    Nd.prototype.d = function (a, b) {
        var c = b || 0, d = n(a) && this.a[a] || [];
        return 0 <= c && c < d.length && (d = d[c], d.getSlotId().getInstance() == c) ? d : null
    };
    var Pd = function (a, b) {
        return Wc(a.a, function (a) {
            return 0 <= Qa(a, b)
        })
    }, U = function () {
        var a = w();
        return a.slot_manager_instance || (a.slot_manager_instance = new Nd)
    }, V = function (a, b, c) {
        try {
            var d = U();
            return d && Od(d, a, b, c)
        } catch (f) {
            P(802, f)
        }
    };
    x("defineOutOfPageSlot", function (a, b) {
        try {
            var c = U();
            if (!c)return null;
            var d = Od(c, a, [1, 1], b);
            return d ? (d.v = !0, d) : null
        } catch (f) {
            P(801, f)
        }
    });
    x("defineSlot", V);
    x("defineUnit", V);
    Nd.prototype.find = Nd.prototype.d;
    Nd.getInstance = U;
    var Qd = function (a) {
        try {
            var b = J();
            if (n(a)) {
                var c, d = U();
                if (c = d.b[a] ? d.b[a] : null)if (c.m && !c.hasWrapperDiv())H(c.a, Cb(c.i, c.b.getDomId()), null, c); else for (a = 0; a < c.c.length; ++a)c.c[a].b && c.c[a].n(c); else I(b, Eb(String(a)))
            } else I(b, Db(String(a)))
        } catch (f) {
            P(2201, f)
        }
    };
    x("display", Qd, !0);
    var Rd = /#|$/, Sd = function (a, b) {
        var c = a.search(Rd), d;
        t:{
            d = 0;
            for (var f = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;) {
                var g = a.charCodeAt(d - 1);
                if (38 == g || 63 == g)if (g = a.charCodeAt(d + f), !g || 61 == g || 38 == g || 35 == g)break t;
                d += f + 1
            }
            d = -1
        }
        if (0 > d)return null;
        f = a.indexOf("&", d);
        if (0 > f || f > c)f = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, f - d).replace(/\+/g, " "))
    };
    var Td = null, Ud = cd || dd || bd || "function" == typeof h.atob;
    var Wd = function (a, b, c) {
        var d = Vd++;
        this.a = new Ld(a, d, b);
        this.a.addService(c);
        this.b = c
    }, Vd = 1;
    e = Wd.prototype;
    e.setClickUrl = function (a) {
        try {
            return this.a.setClickUrl(a), this
        } catch (b) {
            P(1202, b)
        }
    };
    e.setTargeting = function (a, b) {
        try {
            return this.a.setTargeting(a, b), this
        } catch (c) {
            P(1204, c)
        }
    };
    e.setAudExtId = function (a) {
        try {
            return bb(a) && (this.a.o = a), this
        } catch (b) {
            P(1205, b)
        }
    };
    e.setTagForChildDirectedTreatment = function (a) {
        try {
            return this.a.setTagForChildDirectedTreatment(a), this
        } catch (b) {
            P(1203, b)
        }
    };
    e.display = function () {
        try {
            Xd(this.b, this.a)
        } catch (a) {
            P(1201, a)
        }
    };
    var Yd = function (a, b) {
        this.a = a;
        this.b = b || {changeCorrelator: !0}
    }, W = function () {
        t.call(this);
        this.g = !1;
        this.a = null;
        this.C = 0;
        this.p = -1;
        this.o = {};
        this.i = {};
        this.v = [];
        this.H = this.u = "";
        this.f = this.D = this.G = !1;
        this.c = fb ? !1 : !0;
        this.w = fb;
        this.q = this.j = !1;
        this.d = [];
        this.l = [];
        this.h = [];
        this.J = {};
        this.r = !1;
        this.k = -1;
        this.K = this.L = "";
        this.s = [];
        null !== Sd(window.location.href, "google_force_safeframe_image") && this.s.push("108809020")
    };
    ia(W);
    var Zd = {
        adsense_ad_format: "google_ad_format",
        adsense_ad_types: "google_ad_type",
        adsense_allow_expandable_ads: "google_allow_expandable_ads",
        adsense_background_color: "google_color_bg",
        adsense_bid: "google_bid",
        adsense_border_color: "google_color_border",
        adsense_channel_ids: "google_ad_channel",
        adsense_content_section: "google_ad_section",
        adsense_cpm: "google_cpm",
        adsense_ed: "google_ed",
        adsense_encoding: "google_encoding",
        adsense_family_safe: "google_safe",
        adsense_feedback: "google_feedback",
        adsense_flash_version: "google_flash_version",
        adsense_font_face: "google_font_face",
        adsense_font_size: "google_font_size",
        adsense_hints: "google_hints",
        adsense_host: "google_ad_host",
        adsense_host_channel: "google_ad_host_channel",
        adsense_host_tier_id: "google_ad_host_tier_id",
        adsense_keyword_type: "google_kw_type",
        adsense_keywords: "google_kw",
        adsense_line_color: "google_line_color",
        adsense_link_color: "google_color_link",
        adsense_relevant_content: "google_contents",
        adsense_reuse_colors: "google_reuse_colors",
        adsense_targeting: "google_targeting",
        adsense_targeting_types: "google_targeting",
        adsense_test_mode: "google_adtest",
        adsense_text_color: "google_color_text",
        adsense_ui_features: "google_ui_features",
        adsense_ui_version: "google_ui_version",
        adsense_url_color: "google_color_url",
        alternate_ad_iframe_color: "google_alternate_color",
        alternate_ad_url: "google_alternate_ad_url",
        demographic_age: "google_cust_age",
        demographic_ch: "google_cust_ch",
        demographic_gender: "google_cust_gender",
        demographic_interests: "google_cust_interests",
        demographic_job: "google_cust_job",
        demographic_l: "google_cust_l",
        demographic_lh: "google_cust_lh",
        demographic_u_url: "google_cust_u_url",
        demographic_unique_id: "google_cust_id",
        document_language: "google_language",
        geography_override_city: "google_city",
        geography_override_country: "google_country",
        geography_override_region: "google_region",
        page_url: "google_page_url"
    };
    e = W.prototype;
    e.set = function (a, b) {
        try {
            if (!(n(a) && 0 < a.length))return H(this.log, O("PubAdsService.set", arguments), this, null), this;
            this.o[a] = b;
            G(this.log, Kb(a, String(b), this.getName()), this, null);
            return this
        } catch (c) {
            P(21, c)
        }
    };
    e.get = function (a) {
        try {
            return this.o[a]
        } catch (b) {
            P(22, b)
        }
    };
    e.getAttributeKeys = function () {
        try {
            var a = [];
            v(this.o, function (b, d) {
                a.push(d)
            });
            return a
        } catch (b) {
            P(23, b)
        }
    };
    e.display = function (a, b, c, d) {
        try {
            this.enable();
            var f = c ? V(a, b, c) : V(a, b);
            f.addService(this);
            d && f.setClickUrl(d);
            Qd(f.getSlotId().getDomId())
        } catch (g) {
            P(24, g)
        }
    };
    e.A = function () {
        if (this.c) {
            if (!this.g) {
                var a = document, b = a.createElement("script");
                T();
                b.async = !0;
                b.type = "text/javascript";
                b.src = $d();
                (a = a.getElementsByTagName("head")[0] || a.getElementsByTagName("body")[0]) ? (G(this.log, Tb("GPT PubAds"), this), yd().tick("_pubads_load_start"), a.appendChild(b), this.g = !0) : I(this.log, Ub("GPT PubAds"), this)
            }
        } else ae(this)
    };
    e.getName = function () {
        return "publisher_ads"
    };
    var $d = function () {
        return db() + "//partner.googleadservices.com/gpt/pubads_impl_57.js"
    }, ae = function (a) {
        var b = T();
        a.g || b.b || (b = document, a.g = !0, yd().tick("_pubads_load_start"), b.write('<script type="text/javascript" src="' + cb($d()) + '">\x3c/script>'))
    };
    W.prototype.fillSlot = function (a) {
        G(this.log, Xb());
        this.a.fillSlot(a);
        this.J[a.getName()] = !0;
        if (this.a)for (a = 0; a < this.h.length; a++) {
            var b = this.h[a];
            b.a[0].getName()in this.J && (this.refresh(b.a, b.b), Pa.splice.call(this.h, a, 1), a--)
        } else I(this.log, Wb(), this)
    };
    W.prototype.onGoogleAdsJsLoad = function (a) {
        this.a = a;
        G(this.log, Vb("GPT"), this);
        this.a.setCookieOptions(this.C);
        this.a.setTagForChildDirectedTreatment(this.p);
        Ra(this.s, function (a) {
            this.a.setApiExperiment(a)
        }, this);
        this.a.setCenterAds(this.w);
        fb && (this.f = !1, this.a.setMobilePlatform());
        this.j && this.a.collapseEmptyDivs(this.q);
        if (this.f) {
            this.c ? this.a.enableAsyncSingleRequest() : this.a.enableSingleRequest();
            be(this);
            a = this.getSlots();
            for (var b = 0; b < a.length; ++b)ce(this, a[b])
        } else this.c && this.a.enableAsyncRendering();
        this.D && this.a.disableInitialLoad();
        de(this);
        ee(this);
        if (0 < this.d.length)for (b = 0; b < this.d.length; ++b)this.n(this.d[b]);
        if (0 < this.l.length)for (b = 0; b < this.l.length; ++b)Xd(this, this.l[b])
    };
    W.prototype.B = function (a) {
        this.c || (a.m = !1);
        t.prototype.B.call(this, a)
    };
    W.prototype.n = function (a) {
        if (T().b && !this.c)I(this.log, Yb(), this); else if (this.a)be(this), ce(this, a) && this.fillSlot(a); else if (this.c || this.g && 0 == this.d.length) {
            for (var b = !1, c = 0; c < this.d.length; ++c)a === this.d[c] && (b = !0);
            b || (G(this.log, Zb(a.getName(), "GPT"), this, a), this.d.push(a))
        } else I(this.log, ac(a.getName()), this, a)
    };
    var ce = function (a, b) {
        if (a.a && null == a.a.addSlot(b))return I(a.log, bc(b.getName()), a, b), !1;
        for (var c = b.getAttributeKeys(), d = 0; d < c.length; ++d)c[d]in Zd ? a.a.addAdSenseSlotAttribute(b, Zd[c[d]], String(b.get(c[d]))) : H(a.log, dc(String(c[d]), String(b.get(c[d])), b.getName()), a, b);
        return !0
    }, be = function (a) {
        if (!a.G) {
            a.G = !0;
            for (var b = a.getAttributeKeys(), c = 0; c < b.length; ++c)b[c]in Zd ? a.a.addAdSensePageAttribute(Zd[b[c]], String(a.get(b[c]))) : H(a.log, cc(String(b[c]), String(a.get(b[c]))), a);
            a.a.addAdSensePageAttribute("google_tag_info",
                "v2");
            v(a.i, function (a, b) {
                if (m(a))for (var c = 0; c < a.length; ++c)this.a.addAttribute(b, a[c])
            }, a);
            Ra(a.v, function (a) {
                this.a.addPageCategoryExclusion(a)
            }, a);
            a.a.setPublisherProvidedId(a.H);
            a.u && a.a.setLocation(a.u)
        }
    };
    e = W.prototype;
    e.setCookieOptions = function (a) {
        try {
            if (!q(a) || !bb(a))return H(this.log, gc(String(a)), this), this;
            this.C = a;
            this.a && this.a.setCookieOptions(a);
            return this
        } catch (b) {
            P(17, b)
        }
    };
    e.setTagForChildDirectedTreatment = function (a) {
        try {
            if (0 !== a && 1 !== a)return H(this.log, Ec(String(a)), this), this;
            this.p = a;
            this.a && this.a.setTagForChildDirectedTreatment(a);
            return this
        } catch (b) {
            P(18, b)
        }
    };
    e.clearTagForChildDirectedTreatment = function () {
        try {
            return this.p = -1, this.a && this.a.setTagForChildDirectedTreatment(-1), this
        } catch (a) {
            P(19, a)
        }
    };
    e.setTargeting = function (a, b) {
        try {
            var c = null;
            n(b) ? c = [b] : m(b) ? c = b : ba(b) && (c = Va(b));
            var d = c ? c.join() : String(b);
            if (!n(a) || Ha(null == a ? "" : String(a)) || !c)return H(this.log, O("PubAdsService.setTargeting", arguments), this), this;
            this.i[a] = c;
            G(this.log, Dc(a, d, this.getName()), this);
            if (this.a)for (this.a.clearAttribute(a), d = 0; d < c.length; ++d)this.a.addAttribute(a, c[d]);
            return this
        } catch (f) {
            P(1, f)
        }
    };
    e.clearTargeting = function (a) {
        try {
            if (!n(a) || Ha(null == a ? "" : String(a)))return H(this.log, O("PubAdsService.clearTargeting", arguments), this), this;
            if (!this.i[a])return H(this.log, Ac(a, this.getName()), this), this;
            delete this.i[a];
            G(this.log, zc(a, this.getName()), this);
            this.a && this.a.clearAttribute(a);
            return this
        } catch (b) {
            P(2, b)
        }
    };
    e.setCategoryExclusion = function (a) {
        try {
            if (!n(a) || Ha(null == a ? "" : String(a)))return H(this.log, O("PubAdsService.setCategoryExclusion", arguments), this), this;
            Ua(this.v, a);
            G(this.log, Bc(a), this);
            this.a && this.a.addPageCategoryExclusion(a);
            return this
        } catch (b) {
            P(3, b)
        }
    };
    e.clearCategoryExclusions = function () {
        try {
            return this.v = [], G(this.log, Cc(), this), this.a && this.a.clearPageCategoryExclusions(), this
        } catch (a) {
            P(4, a)
        }
    };
    e.disableInitialLoad = function () {
        try {
            this.a ? H(this.log, ic("disableInitialLoad", "pubads"), this) : this.D = !0
        } catch (a) {
            P(5, a)
        }
    };
    e.enableSingleRequest = function () {
        try {
            return this.b && !this.f ? H(this.log, hc("enableSingleRequest"), this) : (G(this.log, kc("single request"), this), this.f = !0), this.f
        } catch (a) {
            P(6, a)
        }
    };
    e.enableAsyncRendering = function () {
        try {
            return this.b && !this.c ? H(this.log, hc("enableAsyncRendering"), this) : (G(this.log, kc("asynchronous rendering"), this), this.c = !0), this.c
        } catch (a) {
            P(7, a)
        }
    };
    e.enableSyncRendering = function () {
        try {
            if (this.b && this.c)H(this.log, hc("enableSyncRendering"), this); else {
                G(this.log, kc("synchronous rendering"), this);
                this.c = !1;
                for (var a = this.getSlots(), b = 0; b < a.length; ++b)a[b].m = !1
            }
            return !this.c
        } catch (c) {
            P(8, c)
        }
    };
    e.setCentering = function (a) {
        try {
            G(this.log, lc("centering", String(a)), this), this.w = a
        } catch (b) {
            P(9, b)
        }
    };
    e.setPublisherProvidedId = function (a) {
        try {
            return this.b ? H(this.log, jc("setPublisherProvidedId", a), this) : (G(this.log, lc("PPID", a), this), this.H = a), this
        } catch (b) {
            P(20, b)
        }
    };
    e.definePassback = function (a, b) {
        try {
            return !n(a) || 0 >= a.length || !Boolean(b) ? (I(this.log, O("PubAdsService.definePassback", arguments)), null) : new Wd(a, b, this)
        } catch (c) {
            P(10, c)
        }
    };
    var Xd = function (a, b) {
        ae(a);
        a.a ? a.a.passback(b) : (G(a.log, $b(b.getName(), "GPT"), a, b), a.l.push(b))
    };
    e = W.prototype;
    e.refresh = function (a, b) {
        try {
            if (a && !m(a) || b && (!ca(b) || b.changeCorrelator && !p(b.changeCorrelator)))H(this.log, O("PubAdsService.refresh", arguments), this); else {
                var c = null;
                if (a && (c = fe(this, a), !c.length)) {
                    H(this.log, O("PubAdsService.refresh", arguments), this);
                    return
                }
                if (this.a) {
                    G(this.log, rc(), this);
                    var d = !0;
                    l(b) && l(b.changeCorrelator) && (d = b.changeCorrelator);
                    this.a.refresh(c, {changeCorrelator: d})
                } else this.f ? (G(this.log, qc(), this), c ? Ua(this.h, new Yd(c, b)) : Ua(this.h, new Yd(this.getSlots(), b))) : H(this.log,
                    nc(), this)
            }
        } catch (f) {
            P(11, f)
        }
    };
    e.N = function (a, b) {
        if (a && !m(a) || b.videoStreamCorrelator && !q(b.videoStreamCorrelator) || b.videoPodNumber && !q(b.videoPodNumber) || b.videoPodPosition && !q(b.videoPodPosition) || b.persistentRoadblocksOnly && !p(b.persistentRoadblocksOnly) || b.clearUnfilledSlots && !p(b.clearUnfilledSlots))H(this.log, O("PubAdsService.internalVideoRefresh", arguments), this); else if (this.a) {
            var c = null;
            if (a && (c = fe(this, a), !c.length)) {
                I(this.log, mc("internalVideoRefresh"), this);
                return
            }
            G(this.log, rc(), this);
            this.a.refresh(c, b)
        } else H(this.log,
            nc(), this)
    };
    e.enableVideoAds = function () {
        try {
            this.r = !0, de(this)
        } catch (a) {
            P(12, a)
        }
    };
    e.setVideoContent = function (a, b) {
        try {
            this.r = !0, this.L = a, this.K = b, de(this)
        } catch (c) {
            P(13, c)
        }
    };
    e.getVideoContent = function () {
        try {
            return this.a ? this.a.getVideoContentInformation() : null
        } catch (a) {
            P(30, a)
        }
    };
    var de = function (a) {
        a.r && a.a && a.a.setVideoContentInformation(a.L, a.K)
    }, ee = function (a) {
        a.a && a.a.setCorrelator(-1 == a.k ? void 0 : a.k)
    };
    e = W.prototype;
    e.getCorrelator = function () {
        try {
            return 0 == this.getSlots().length ? "not_available" : this.a ? this.a.getCorrelator() : "not_loaded"
        } catch (a) {
            P(27, a)
        }
    };
    e.setCorrelator = function (a) {
        try {
            var b = window;
            if (b.top == b)return this;
            if (!bb(a) || 0 === a)return H(this.log, Ic(String(a)), this), this;
            this.k = a;
            ee(this);
            return this
        } catch (c) {
            P(28, c)
        }
    };
    e.updateCorrelator = function () {
        try {
            return this.k = -1, ee(this), this
        } catch (a) {
            P(25, a)
        }
    };
    e.getVideoStreamCorrelator = function () {
        if (!this.a)return 0;
        var a = this.a.getVideoStreamCorrelator();
        return isNaN(a) ? 0 : a
    };
    e.isAdRequestFinished = function () {
        try {
            return this.a ? this.a.isAdRequestFinished() : !1
        } catch (a) {
            P(29, a)
        }
    };
    e.isSlotAPersistentRoadblock = function (a) {
        return this.a ? this.a.isSlotAPersistentRoadblock(a) : !1
    };
    e.collapseEmptyDivs = function (a) {
        try {
            return this.j ? H(this.log, xc(), this) : this.b ? H(this.log, hc("collapseEmptyDivs"), this) : (this.q = Boolean(a), G(this.log, wc(String(this.q)), this), this.j = !0), this.j
        } catch (b) {
            P(14, b)
        }
    };
    e.clear = function (a) {
        try {
            if (!this.a)return H(this.log, pc(), this), !1;
            var b = null;
            if (a && (b = fe(this, a), 0 == b.length))return H(this.log, O("PubAdsService.clear", arguments), this), !1;
            G(this.log, sc(), this);
            return this.a.clearSlotContents(b)
        } catch (c) {
            P(15, c)
        }
    };
    e.clearNoRefreshState = function () {
        this.a ? (G(this.log, tc(), this), this.a.clearNoRefreshState()) : H(this.log, oc(), this)
    };
    e.setLocation = function (a, b, c) {
        try {
            var d = "role:1 producer:12";
            if (l(b)) {
                if (!q(a))return H(this.log, uc("Latitude")), this;
                if (!q(b))return H(this.log, uc("Longitude")), this;
                d += " latlng{ latitude_e7: " + Math.round(1E7 * a) + " longitude_e7: " + Math.round(1E7 * b) + "}";
                if (l(c)) {
                    if (isNaN(c))return H(this.log, uc("Radius")), this;
                    d += " radius:" + Math.round(c)
                }
            } else {
                if (50 < a.length) {
                    var f = a.substring(0, 50);
                    H(this.log, vc(String(a), "50", f));
                    a = f
                }
                d += ' loc:"' + a + '"'
            }
            var g;
            if (Ud)g = h.btoa(d); else {
                f = d;
                d = [];
                for (b = a = 0; b < f.length; b++) {
                    for (var k =
                        f.charCodeAt(b); 255 < k;)d[a++] = k & 255, k >>= 8;
                    d[a++] = k
                }
                if (!ba(d))throw Error("encodeByteArray takes an array as a parameter");
                if (!Td)for (Td = {}, k = 0; 65 > k; k++)Td[k] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k);
                k = Td;
                f = [];
                for (a = 0; a < d.length; a += 3) {
                    var r = d[a], Q = a + 1 < d.length, B = Q ? d[a + 1] : 0, D = a + 2 < d.length, F = D ? d[a + 2] : 0;
                    b = r >> 2;
                    c = (r & 3) << 4 | B >> 4;
                    var ec = (B & 15) << 2 | F >> 6, fc = F & 63;
                    D || (fc = 64, Q || (ec = 64));
                    f.push(k[b], k[c], k[ec], k[fc])
                }
                g = f.join("")
            }
            this.u = "a " + g;
            return this
        } catch (ze) {
            P(16, ze)
        }
    };
    e.getVersion = function () {
        return this.a ? this.a.getVersion() : void 0
    };
    e.forceExperiment = function (a) {
        this.b ? H(this.log, jc("forceExperiment", a), this) : this.s.push(a)
    };
    var X = function () {
        try {
            var a = T(), b = Ad(a, "publisher_ads");
            if (!b) {
                var c = b = new W;
                a.a[c.getName()] = c
            }
            return b
        } catch (d) {
            P(26, d)
        }
    }, fe = function (a, b) {
        for (var c = [], d = 0; d < b.length; ++d) {
            var f = b[d];
            f instanceof Ld ? c.push(f) : H(a.log, yc(String(d)), a)
        }
        return c
    };
    x("pubads", X);
    var Y = function () {
        t.call(this);
        this.o = !0;
        this.d = this.l = !1;
        this.h = 0;
        this.g = this.f = void 0;
        this.p = this.k = !1;
        this.j = {};
        this.c = {};
        this.a = !1;
        this.i = {}
    };
    ia(Y);
    e = Y.prototype;
    e.set = function (a, b) {
        n(a) && 0 < a.length ? (this.i[a] = b, G(this.log, Kb(a, String(b), this.getName()), this, null)) : H(this.log, Lb(String(a), String(b), this.getName()), this, null);
        return this
    };
    e.get = function (a) {
        return this.i[a]
    };
    e.getAttributeKeys = function () {
        var a = [];
        v(this.i, function (b, c) {
            a.push(c)
        });
        return a
    };
    e.display = function (a, b, c, d) {
        this.enable();
        a = c ? V(a, b, c) : V(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        Qd(a.getSlotId().getDomId())
    };
    e.A = function () {
        if (this.o) {
            if (!this.p) {
                var a = document, b = document.createElement("script");
                b.async = !0;
                b.type = "text/javascript";
                b.src = ge();
                try {
                    var c = a.getElementsByTagName("script")[0];
                    G(this.log, Tb("GPT CompanionAds"), this);
                    this.p = !0;
                    c.parentNode && c.parentNode.insertBefore(b, c)
                } catch (d) {
                    Rc(414, d), I(this.log, Ub("GPT CompanionAds"), this)
                }
            }
        } else this.k || (h.document.write('<script type="text/javascript" src="' + cb(ge()) + '">\x3c/script>'), this.k = !0)
    };
    e.enableSyncLoading = function () {
        try {
            this.o = !1
        } catch (a) {
            P(402, a)
        }
    };
    e.setRefreshUnfilledSlots = function (a) {
        try {
            p(a) && (this.l = a)
        } catch (b) {
            P(403, b)
        }
    };
    e.setClearUnfilledSlots = function (a) {
        try {
            p(a) && (this.d = a)
        } catch (b) {
            P(412, b)
        }
    };
    e.notifyUnfilledSlots = function (a) {
        try {
            if (this.l)he(this, ie(this, a)); else if (this.d) {
                var b = ie(this, a), c = X();
                if (c.b)for (c.clear(b), a = 0; a < b.length; ++a) {
                    var d = new nd(b[a], !0, null, c.getName());
                    od(c, d)
                } else I(this.log, Qb("PubAds", "clear"))
            }
        } catch (f) {
            P(413, f)
        }
    };
    e.isRoadblockingSupported = function () {
        var a = X();
        if (!a.b)return !1;
        var a = a.getSlots(), b = this.getSlots();
        if (a.length != b.length)return !1;
        for (var c = 0; c < b.length; ++c) {
            for (var d = !1, f = 0; f < a.length; ++f)if (b[c] === a[f]) {
                d = !0;
                break
            }
            if (!d)return !1
        }
        return !0
    };
    e.refreshAllSlots = function () {
        try {
            this.l && he(this, null)
        } catch (a) {
            P(404, a)
        }
    };
    e.setVideoSessionInfo = function (a, b, c, d, f, g, k) {
        try {
            this.a = !1, this.h = 0, this.g = this.f = void 0, this.h = a, l(f) && (this.f = f), l(g) && (this.g = g), l(k) && (this.a = k)
        } catch (r) {
            P(405, r)
        }
    };
    e.setVideoSession = function (a, b, c, d) {
        this.setVideoSessionInfo(a, "", "", "", b, c, d)
    };
    e.getDisplayAdsCorrelator = function () {
        try {
            return X().getCorrelator()
        } catch (a) {
            P(406, a)
        }
    };
    e.getVideoStreamCorrelator = function () {
        try {
            return X().getVideoStreamCorrelator()
        } catch (a) {
            P(407, a)
        }
    };
    var he = function (a, b) {
        var c = X();
        if (c.b) {
            if (a.a) {
                if (!a.isRoadblockingSupported()) {
                    H(a.log, Pb());
                    return
                }
                c.clearNoRefreshState();
                c.clear()
            }
            var d = {isVideoRefresh: !0};
            l(a.h) && (d.videoStreamCorrelator = a.h);
            a.f && (d.videoPodNumber = a.f);
            a.g && (d.videoPodPosition = a.g);
            a.a && (d.persistentRoadblocksOnly = a.a);
            a.d && (d.clearUnfilledSlots = a.d);
            c.N(b, d)
        } else I(a.log, Qb("PubAds", "refresh"))
    };
    Y.prototype.isSlotAPersistentRoadblock = function (a) {
        try {
            var b = X();
            if (b.b && Pd(U(), a))return b.isSlotAPersistentRoadblock(a);
            I(this.log, Rb());
            return !1
        } catch (c) {
            P(408, c)
        }
    };
    var ie = function (a, b) {
        for (var c = a.getSlotIdMap(), d = [], f = 0; f < b.length; ++f) {
            var g = b[f];
            g in c ? d.push(c[g]) : H(a.log, Sb(), a)
        }
        return d
    };
    Y.prototype.getName = function () {
        return "companion_ads"
    };
    var ge = function () {
        return db() + "//pagead2.googlesyndication.com/pagead/show_companion_ad.js"
    };
    Y.prototype.onImplementationLoaded = function () {
        try {
            G(this.log, Vb("GPT CompanionAds"), this), this.k = !0
        } catch (a) {
            P(409, a)
        }
    };
    var je = function (a, b) {
        var c = b && b.getSlotId().getId();
        if (c && c in a.j && b.hasWrapperDiv() && a.b && !a.isSlotAPersistentRoadblock(b)) {
            b.h = a.j[c];
            var d = null;
            a.c.hasOwnProperty(c) && (d = a.c[c], delete a.c[c]);
            c = new nd(b, !1, d, a.getName());
            return Md(b, c)
        }
        return !1
    };
    Y.prototype.n = function (a) {
        je(this, a)
    };
    Y.prototype.fillSlot = function (a, b, c, d) {
        try {
            return Pd(U(), a) && n(b) && 0 < b.length ? (this.j[a.getSlotId().getId()] = b, null != c && null != d && (this.c[a.getSlotId().getId()] = [c, d]), je(this, a)) : !1
        } catch (f) {
            P(410, f)
        }
    };
    Y.prototype.slotRenderEnded = function (a, b, c) {
        try {
            var d = null;
            null != b && null != c && (d = [b, c]);
            var f = new nd(a, !1, d, this.getName());
            od(this, f)
        } catch (g) {
            P(411, g)
        }
    };
    x("companionAds", function () {
        try {
            var a = T(), b = Ad(a, "companion_ads");
            if (!b) {
                var c = b = new Y;
                a.a[c.getName()] = c
            }
            return b
        } catch (d) {
            P(401, d)
        }
    });
    var Z = function () {
        t.call(this);
        this.a = {};
        this.c = {}
    };
    ia(Z);
    e = Z.prototype;
    e.getName = function () {
        return "content"
    };
    e.set = function (a, b) {
        n(a) && 0 < a.length ? (this.a[a] = b, G(this.log, Kb(a, String(b), this.getName()), this, null)) : H(this.log, Lb(String(a), String(b), this.getName()), this, null);
        return this
    };
    e.get = function (a) {
        return this.a[a]
    };
    e.getAttributeKeys = function () {
        var a = [];
        v(this.a, function (b, c) {
            a.push(c)
        });
        return a
    };
    e.display = function (a, b, c, d) {
        this.enable();
        a = c ? V(a, b, c) : V(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        Qd(a.getSlotId().getDomId())
    };
    var ke = function (a, b) {
        var c = b && b.getSlotId().getId();
        c in a.c && a.b && b.hasWrapperDiv() && !b.g && (b.h = a.c[c], c = new nd(b, !1, null, a.getName()), Md(b, c))
    };
    Z.prototype.A = function () {
        for (var a = this.getSlots(), b = 0; b < a.length; ++b)ke(this, a[b])
    };
    Z.prototype.n = function (a) {
        ke(this, a)
    };
    Z.prototype.setContent = function (a, b) {
        try {
            Pd(U(), a) && n(b) && 0 < b.length && (this.c[a.getSlotId().getId()] = b, ke(this, a))
        } catch (c) {
            P(602, c)
        }
    };
    x("content", function () {
        try {
            var a = T(), b = Ad(a, "content");
            if (!b) {
                var c = b = new Z;
                a.a[c.getName()] = c
            }
            return b
        } catch (d) {
            P(601, d)
        }
    });
    var le = null, me = function () {
        var a = document, b = a.createElement("script");
        b.type = "text/javascript";
        b.src = db() + "//publisherconsole.appspot.com/js/loader.js";
        b.async = !0;
        (a = a.getElementsByTagName("script")[0]) && a.parentNode && a.parentNode.insertBefore(b, a)
    }, ne = function () {
        var a = window, b = document;
        if (w()._pubconsole_disable_)return !1;
        var c;
        c = document.cookie.split("google_pubconsole=");
        if (c = 2 == c.length ? c[1].split(";")[0] : "")if (c = c.split("|"), 0 < c.length && ("1" == c[0] || "0" == c[0]))return !0;
        T();
        c = !1;
        try {
            c = a.top.document.URL ===
            b.URL
        } catch (d) {
        }
        a = c ? b.URL : b.referrer;
        return null !== Sd(a, "google_debug") || null !== Sd(a, "google_console") || null !== Sd(a, "google_force_console") || null !== Sd(a, "googfc")
    }, pe = function () {
        try {
            ne() && me(), oe()
        } catch (a) {
            P(2002, a)
        }
    }, oe = function () {
        Ja(function (a) {
            a.source == window && "gpt_open_pubconsole" == a.data.type && (a = a.data.slotDomId) && (googletag && googletag.console ? googletag.console.openConsole(a) : (le = a, me()))
        })
    };
    "complete" === document.readyState ? pe() : Ka(window, pe);
    x("disablePublisherConsole", function () {
        try {
            w()._pubconsole_disable_ = !0
        } catch (a) {
            P(2001, a)
        }
    });
    x("onPubConsoleJsLoad", function () {
        le && (googletag.console.openConsole(le), le = null)
    });
    var qe = function () {
        this.a = [];
        this.c = !1;
        this.b = J()
    };
    qe.prototype.addSize = function (a, b) {
        try {
            var c;
            if (!(c = !Cd(a))) {
                var d = b, f;
                if (!(f = Cd(d))) {
                    var g;
                    if (m(d))t:{
                        for (var k = d.length, r = n(d) ? d.split("") : d, d = 0; d < k; d++)if (d in r && !Cd.call(void 0, r[d])) {
                            g = !1;
                            break t
                        }
                        g = !0
                    } else g = !1;
                    f = g
                }
                c = !f
            }
            if (c)return this.c = !0, H(this.b, O("SizeMappingBuilder.addSize", arguments)), this;
            this.a.push([a, b]);
            return this
        } catch (Q) {
            P(1601, Q)
        }
    };
    qe.prototype.build = function () {
        try {
            if (this.c)return H(this.b, Ib()), null;
            ab(this.a);
            return this.a
        } catch (a) {
            P(1602, a)
        }
    };
    var $a = function (a, b) {
        var c;
        t:{
            c = b[0];
            for (var d = a[0], f = Ya, g = Math.min(c.length, d.length), k = 0; k < g; k++) {
                var r = f(c[k], d[k]);
                if (0 != r) {
                    c = r;
                    break t
                }
            }
            c = Ya(c.length, d.length)
        }
        return c
    };
    x("sizeMapping", function () {
        try {
            return new qe
        } catch (a) {
            P(1603, a)
        }
    });
    var se = function () {
        var a = re;
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

    function te() {
        Ra(document.getElementsByTagName("script"), function (a) {
            var b = a.src;
            b && (0 <= b.indexOf("/tag/js/gpt.js") || 0 <= b.indexOf("/tag/js/gpt_mobile.js")) && a.innerHTML && !a.googletag_executed && (a.googletag_executed = !0, eval(a.innerHTML))
        })
    }

    try {
        var ue = yd(), ve = w().cmd;
        if (!ve || m(ve)) {
            var we = w().cmd = new Sc;
            ve && 0 < ve.length && we.push.apply(we, ve)
        }
        te();
        var xe = A("#34#");
        if (Math.random() < xe) {
            var ye = document, Ae = ye.createElement("iframe"), re;
            re = ye ? ye.parentWindow || ye.defaultView : window;
            for (var Be = "//tpc.googlesyndication.com/safeframe/1-0-2/html/container.html", Ce, De = re, Ee = 0; De != De.parent;)Ee++, De = De.parent;
            (Ce = Ee) && (Be += "?n=" + Ce);
            Ae.src = (se() ? "https:" : "http:") + Be;
            Ae.style.visibility = "hidden";
            Ae.style.display = "none";
            var Fe = ye.getElementsByTagName("script");
            if (0 < Fe.length) {
                var Ge = Fe[Fe.length - 1];
                Ge.parentNode && Ge.parentNode.insertBefore(Ae, Ge.nextSibling)
            }
        }
        ue.tick("gpt_load")
    } catch (He) {
        P(2801, He)
    }
    ;
})()

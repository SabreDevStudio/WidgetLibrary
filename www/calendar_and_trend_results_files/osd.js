(function () {
    var k = this, aa = function (a, b) {
        var c = a.split("."), d = k;
        c[0]in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());)c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
    }, ba = function (a) {
        a = a.split(".");
        for (var b = k, c; c = a.shift();)if (null != b[c])b = b[c]; else return null;
        return b
    }, ca = function (a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)return "object";
            if ("[object Array]" ==
                c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else return "null"; else if ("function" == b && "undefined" == typeof a.call)return "object";
        return b
    }, da = function (a) {
        var b = ca(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, m = function (a) {
        return "string" == typeof a
    }, q = function (a) {
        return "number" == typeof a
    }, t = function (a) {
        return "function" == ca(a)
    }, ea = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, fa = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ha = function (a, b, c) {
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
    }, u = function (a,
                     b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? fa : ha;
        return u.apply(null, arguments)
    }, ia = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    };
    var w = function (a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    };
    var ka = w("1.0"), la = w("0.05"), ma = w("0.95"), na = w("0.02"), oa = w("0.20"), pa = w("0.02"), qa = w("1.0"), ra = w("0.0");
    var sa = /^true$/.test("false") ? !0 : !1;
    var ta;
    var ua = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, Ca = function (a) {
            if (!va.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(wa, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(xa, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(ya, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(za, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(Aa, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(Ba, "&#0;"));
            return a
        }, wa = /&/g, xa = /</g, ya = />/g, za = /"/g, Aa = /'/g, Ba = /\x00/g, va = /[\x00&<>"']/,
        Ea = function (a, b) {
            for (var c = 0, d = ua(String(a)).split("."), e = ua(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
                var h = d[g] || "", l = e[g] || "", r = RegExp("(\\d*)(\\D*)", "g"), v = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var p = r.exec(h) || ["", "", ""], z = v.exec(l) || ["", "", ""];
                    if (0 == p[0].length && 0 == z[0].length)break;
                    c = Da(0 == p[1].length ? 0 : parseInt(p[1], 10), 0 == z[1].length ? 0 : parseInt(z[1], 10)) || Da(0 == p[2].length, 0 == z[2].length) || Da(p[2], z[2])
                } while (0 == c)
            }
            return c
        }, Da = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        }, Fa =
            function () {
                return "display".replace(/\-([a-z])/g, function (a, b) {
                    return b.toUpperCase()
                })
            }, Ga = function (a) {
            var b = m(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function (a, b, e) {
                return b + e.toUpperCase()
            })
        };
    var Ha = function (a) {
        Ha[" "](a);
        return a
    };
    Ha[" "] = function () {
    };
    var Ia = function (a) {
        try {
            var b;
            if (b = !!a && null != a.location.href)i:{
                try {
                    Ha(a.foo);
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
    }, Ja = function (a, b) {
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
    }, Ka = function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    };
    var x = document, y = window;
    var La = function (a) {
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
    }, Ma = function (a, b) {
        a.google_image_requests || (a.google_image_requests = []);
        var c = a.document.createElement("img");
        c.src = b;
        a.google_image_requests.push(c)
    };
    var Na = null, Oa = function (a, b) {
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
    };

    function A(a) {
        return "function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)
    }

    var Pa = function (a, b) {
        Ka(a, "readystatechange", b)
    }, Va = function () {
        var a = B();
        return "complete" == a.document.readyState || !!a.google_onload_fired
    }, Wa = {};
    var Xa = !!window.google_async_iframe_id, C = Xa && window.parent || window, B = function () {
        if (Xa && !Ia(C)) {
            for (var a = "." + x.domain; 2 < a.split(".").length && !Ia(C);)x.domain = a = a.substr(a.indexOf(".") + 1), C = window.parent;
            Ia(C) || (C = window)
        }
        return C
    };
    var Ya = .01, Za = !0, $a = {}, cb = function (a, b, c, d) {
        var e = ab, f, g = Za;
        try {
            f = b()
        } catch (h) {
            try {
                var l = La(h);
                b = "";
                h.fileName && (b = h.fileName);
                var r = -1;
                h.lineNumber && (r = h.lineNumber);
                g = e(a, l, b, r, c)
            } catch (v) {
                try {
                    var p = La(v);
                    a = "";
                    v.fileName && (a = v.fileName);
                    c = -1;
                    v.lineNumber && (c = v.lineNumber);
                    ab("pAR", p, a, c, void 0, void 0)
                } catch (z) {
                    bb({context: "mRE", msg: z.toString() + "\n" + (z.stack || "")}, void 0)
                }
            }
            if (!g)throw h;
        } finally {
            if (d)try {
                d()
            } catch (Y) {
            }
        }
        return f
    }, ab = function (a, b, c, d, e, f) {
        var g = {};
        if (e)try {
            e(g)
        } catch (h) {
        }
        g.context =
            a;
        g.msg = b.substring(0, 512);
        c && (g.file = c);
        0 < d && (g.line = d.toString());
        g.url = x.URL.substring(0, 512);
        g.ref = x.referrer.substring(0, 512);
        db(g);
        bb(g, f);
        return Za
    }, bb = function (a, b) {
        try {
            if (Math.random() < (b || Ya)) {
                var c = "/pagead/gen_204?id=jserror" + eb(a), d = "http" + ("http:" == y.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c, d = d.substring(0, 2E3);
                Ma(y, d)
            }
        } catch (e) {
        }
    }, db = function (a) {
        var b = a || {};
        Oa($a, function (a, d) {
            b[d] = y[a]
        })
    }, fb = function (a, b, c, d, e) {
        return function () {
            var f = arguments;
            return cb(a, function () {
                return b.apply(c,
                    f)
            }, d, e)
        }
    }, D = function (a, b) {
        return fb(a, b, void 0, void 0, void 0)
    }, gb = function (a, b) {
        return fb(a, b, void 0, void 0, void 0)
    }, eb = function (a) {
        var b = "";
        Oa(a, function (a, d) {
            if (0 === a || a)b += "&" + d + "=" + A(a)
        });
        return b
    };
    var hb = function (a) {
        return (a = /[&\?]exk=([^& ]+)/.exec(a)) && 2 == a.length ? a[1] : null
    };
    var E = Array.prototype, F = E.forEach ? function (a, b, c) {
        E.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = m(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, ib = E.map ? function (a, b, c) {
        return E.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = m(a) ? a.split("") : a, g = 0; g < d; g++)g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    }, jb = E.some ? function (a, b, c) {
        return E.some.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = m(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return !0;
        return !1
    }, kb = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return []
    }, lb = function (a) {
        for (var b = [], c = 0; c < a; c++)b[c] = 0;
        return b
    };
    var mb = function (a, b) {
        for (var c in a)b.call(void 0, a[c], c, a)
    }, nb = function (a) {
        var b = 0, c;
        for (c in a)b++;
        return b
    }, ob = function (a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = d;
        return b
    }, pb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), qb = function (a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < pb.length; f++)c = pb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }, rb = function (a) {
        var b = arguments.length;
        if (1 == b && "array" == ca(arguments[0]))return rb.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++)c[arguments[d]] = !0;
        return c
    };
    rb("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    rb("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    rb("embed", "iframe", "link", "object", "script", "style", "template");
    var G = function (a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    G.prototype.clone = function () {
        return new G(this.x, this.y)
    };
    G.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    G.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    G.prototype.translate = function (a, b) {
        a instanceof G ? (this.x += a.x, this.y += a.y) : (this.x += a, q(b) && (this.y += b));
        return this
    };
    var H = function (a, b) {
        this.width = a;
        this.height = b
    };
    H.prototype.clone = function () {
        return new H(this.width, this.height)
    };
    H.prototype.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    H.prototype.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var sb;
    i:{
        var tb = k.navigator;
        if (tb) {
            var ub = tb.userAgent;
            if (ub) {
                sb = ub;
                break i
            }
        }
        sb = ""
    }
    var I = function (a) {
        return -1 != sb.indexOf(a)
    };
    var vb = function () {
        return I("Opera") || I("OPR")
    }, wb = function () {
        return I("Edge") || I("Trident") || I("MSIE")
    }, xb = function () {
        return (I("Chrome") || I("CriOS")) && !vb() && !wb()
    };
    var J = function () {
        return I("Edge")
    };
    var yb = vb(), K = wb(), L = I("Gecko") && !(-1 != sb.toLowerCase().indexOf("webkit") && !J()) && !(I("Trident") || I("MSIE")) && !J(), zb = -1 != sb.toLowerCase().indexOf("webkit") && !J(), Ab = function () {
        var a = sb;
        if (L)return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (K && J())return /Edge\/([\d\.]+)/.exec(a);
        if (K)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (zb)return /WebKit\/(\S+)/.exec(a)
    }, Bb = function () {
        var a = k.document;
        return a ? a.documentMode : void 0
    }, Cb = function () {
        if (yb && k.opera) {
            var a = k.opera.version;
            return t(a) ? a() : a
        }
        var a = "",
            b = Ab();
        b && (a = b ? b[1] : "");
        return K && !J() && (b = Bb(), b > parseFloat(a)) ? String(b) : a
    }(), Eb = {}, M = function (a) {
        return Eb[a] || (Eb[a] = 0 <= Ea(Cb, a))
    }, Fb = k.document, Gb = Bb(), Hb = !Fb || !K || !Gb && J() ? void 0 : Gb || ("CSS1Compat" == Fb.compatMode ? parseInt(Cb, 10) : 5);
    var Ib = !K || K && (J() || 9 <= Hb);
    !L && !K || K && K && (J() || 9 <= Hb) || L && M("1.9.1");
    K && M("9");
    var Lb = function (a) {
            return a ? new Jb(Kb(a)) : ta || (ta = new Jb)
        }, Nb = function (a, b) {
            mb(b, function (b, d) {
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
            var b = zb || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
            a = a.parentWindow || a.defaultView;
            return K && M("10") && a.pageYOffset != b.scrollTop ? new G(b.scrollLeft, b.scrollTop) : new G(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
        }, Pb = function (a) {
            return a ? a.parentWindow || a.defaultView : window
        }, Rb = function (a, b, c) {
            var d = arguments, e = document, f = d[0], g = d[1];
            if (!Ib && g && (g.name || g.type)) {
                f = ["<", f];
                g.name && f.push(' name="', Ca(g.name), '"');
                if (g.type) {
                    f.push(' type="',
                        Ca(g.type), '"');
                    var h = {};
                    qb(h, g);
                    delete h.type;
                    g = h
                }
                f.push(">");
                f = f.join("")
            }
            f = e.createElement(f);
            g && (m(g) ? f.className = g : "array" == ca(g) ? f.className = g.join(" ") : Nb(f, g));
            2 < d.length && Qb(e, f, d);
            return f
        }, Qb = function (a, b, c) {
            function d(c) {
                c && b.appendChild(m(c) ? a.createTextNode(c) : c)
            }

            for (var e = 2; e < c.length; e++) {
                var f = c[e];
                !da(f) || ea(f) && 0 < f.nodeType ? d(f) : F(Sb(f) ? kb(f) : f, d)
            }
        }, Kb = function (a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        }, Tb = function (a) {
            return a.contentWindow || Pb(a.contentDocument || a.contentWindow.document)
        },
        Sb = function (a) {
            if (a && "number" == typeof a.length) {
                if (ea(a))return "function" == typeof a.item || "string" == typeof a.item;
                if (t(a))return "function" == typeof a.item
            }
            return !1
        }, Jb = function (a) {
            this.W = a || k.document || document
        };
    Jb.prototype.createElement = function (a) {
        return this.W.createElement(a)
    };
    Jb.prototype.createTextNode = function (a) {
        return this.W.createTextNode(String(a))
    };
    Jb.prototype.appendChild = function (a, b) {
        a.appendChild(b)
    };
    var N = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    N.prototype.clone = function () {
        return new N(this.top, this.right, this.bottom, this.left)
    };
    N.prototype.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    N.prototype.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    N.prototype.translate = function (a, b) {
        a instanceof G ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, q(b) && (this.top += b, this.bottom += b));
        return this
    };
    var Ub = {}, Vb = function (a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        K && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }, Wb = function (a) {
        "number" == typeof a && (a += "px");
        return a
    };
    var Xb = /[&\?](?:client|correlator|url|ifk|oid|eid|iu)=[^&]+/g, Yb = /[&\?](?:slotname|dt|ifi|adx|ady|format|output|flash|impl)=[^&]+/g, Zb = {
        Sb: "ud=1",
        Rb: "ts=1"
    };
    K && M("9");
    !zb || M("528");
    L && M("1.9b") || K && M("8") || yb && M("9.5") || zb && M("528");
    L && !M("8") || K && M("9");
    var $b = function (a, b, c) {
        if ("array" == ca(b))for (var d = 0; d < b.length; d++)$b(a, String(b[d]), c); else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }, ac = function (a, b, c) {
        for (c = c || 0; c < b.length; c += 2)$b(b[c], b[c + 1], a);
        return a
    }, bc = function (a, b) {
        var c = 2 == arguments.length ? ac([a], arguments[1], 0) : ac([a], arguments, 1);
        if (c[1]) {
            var d = c[0], e = d.indexOf("#");
            0 <= e && (c.push(d.substr(e)), c[0] = d = d.substr(0, e));
            e = d.indexOf("?");
            0 > e ? c[1] = "?" : e == d.length - 1 && (c[1] = void 0)
        }
        return c.join("")
    };
    var cc = !1, P = "", dc = function (a) {
        a = a.match(/[\d]+/g);
        if (!a)return "";
        a.length = 3;
        return a.join(".")
    };
    if (navigator.plugins && navigator.plugins.length) {
        var ec = navigator.plugins["Shockwave Flash"];
        ec && (cc = !0, ec.description && (P = dc(ec.description)));
        navigator.plugins["Shockwave Flash 2.0"] && (cc = !0, P = "2.0.0.11")
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var fc = navigator.mimeTypes["application/x-shockwave-flash"];
        (cc = fc && fc.enabledPlugin) && (P = dc(fc.enabledPlugin.description))
    } else try {
        var gc = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), cc = !0, P = dc(gc.GetVariable("$version"))
    } catch (hc) {
        try {
            gc =
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), cc = !0, P = "6.0.21"
        } catch (ic) {
            try {
                gc = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), cc = !0, P = dc(gc.GetVariable("$version"))
            } catch (jc) {
            }
        }
    }
    var kc = P;
    !I("Android") || xb() || I("Firefox") || vb();
    xb();
    var lc = I("Safari") && !(xb() || I("Coast") || vb() || wb() || I("Silk") || I("Android")) && !(I("iPhone") && !I("iPod") && !I("iPad") || I("iPad") || I("iPod"));
    sa && (Ya = 1);
    if (x && x.URL)var mc = x.URL, Za = !(mc && (0 < mc.indexOf("?google_debug") || 0 < mc.indexOf("&google_debug")));
    var Q = function (a, b, c, d) {
        c = gb(d || "osd_or_lidar::" + b, c);
        Ka(a, b, c);
        return c
    };
    var nc = function (a, b, c) {
        b = b || y;
        a && b.top != b && (b = b.top);
        try {
            var d;
            if (b.document && !b.document.body)d = new H(-1, -1); else {
                var e;
                if (c)e = new H(b.innerWidth, b.innerHeight); else {
                    var f = (b || window).document, g = "CSS1Compat" == f.compatMode ? f.documentElement : f.body;
                    e = new H(g.clientWidth, g.clientHeight)
                }
                d = e
            }
            return d
        } catch (h) {
            return new H(-12245933, -12245933)
        }
    }, pc = function (a, b, c) {
        var d = oc, e = y || y;
        a && (e = e.top);
        a = b || nc(a, e, d);
        c || (e = Lb(e.document), c = Ob(e.W));
        e = c;
        return -1 == a.width || -12245933 == a.width ? new N(a.width, a.width,
            a.width, a.width) : new N(e.y, e.x + a.width, e.y + a.height, e.x)
    }, qc = function () {
        return y.outerWidth ? new H(y.outerWidth, y.outerHeight) : new H(-12245933, -12245933)
    }, rc = function (a, b) {
        ("msie"in Wa ? Wa.msie : Wa.msie = -1 != navigator.userAgent.toLowerCase().indexOf("msie")) && !window.opera ? Pa(a, gb("osd::util::rschange", function () {
            "complete" == a.readyState && b(null)
        })) : Ka(a, "load", gb("osd::util::load", b))
    }, sc = function (a, b) {
        try {
            b.postMessage(a, "*")
        } catch (c) {
        }
    }, tc = function (a, b) {
        if (b) {
            a(b);
            var c = b.frames;
            if (c) {
                var d = c.length,
                    e;
                for (e = 0; e < d; ++e)tc(a, c[e])
            }
        }
    }, wc = function (a) {
        var b = 0 <= R ? S() - R : -1, c = uc ? S() - vc : -1, d;
        if (79463068 == a)return 500;
        if (947190538 == a)a = [4E3], d = [250, 1E3]; else if (947190541 == a)a = [4E3], d = [100, 1E3]; else {
            if (947190542 == a)return 100;
            if (79463069 == a)return 200;
            a = [2E3, 4E3];
            d = [250, 500, 1E3]
        }
        var e = b;
        -1 != c && c < b && (e = c);
        for (var f, b = 0; b < a.length; ++b)if (e < a[b]) {
            f = d[b];
            break
        }
        void 0 === f && (f = d[a.length]);
        return f
    }, xc = (new Date).getTime(), R = -1, uc = !1, vc = -1, S = function () {
        return (new Date).getTime() - xc
    }, yc = function () {
        var a = Rb("div");
        a.style.cssText = "position:relative;left:0px;top:0px;width:0;height:0;";
        return a
    }, zc = function (a) {
        for (var b; a && a != a.parentElement;) {
            if (b = a.style) {
                var c = a;
                b = c.style[Fa()];
                if ("undefined" === typeof b) {
                    b = c.style;
                    var d = Ub.display;
                    if (!d) {
                        var e = Fa(), d = e;
                        void 0 === c.style[e] && (e = (zb ? "Webkit" : L ? "Moz" : K ? "ms" : yb ? "O" : null) + Ga(e), void 0 !== c.style[e] && (d = e));
                        Ub.display = d
                    }
                    b = b[d] || ""
                }
                b = "none" == b
            }
            if (b)return !0;
            b = a;
            a = a.parentElement
        }
        if (b && (a = Kb(b))) {
            var f, g;
            try {
                if (f = Pb(a))g = f.frameElement
            } catch (h) {
                return !1
            }
            if (f && g && f !=
                f.parent)return zc(g)
        }
        return !1
    };
    var Ac = function () {
        this.gc = this.ec = 3E3;
        this.k = "u";
        this.Ba = null;
        this.j = [];
        this.hb = !1;
        this.I = -1;
        this.ca = 0
    }, Bc = function (a, b, c) {
        this.sa = a;
        this.xb = b;
        this.pb = c
    }, Fc = function (a, b, c) {
        if (!(b && b.getBoundingClientRect && 0 <= Ea(kc, "11") && c) || K && 9 > Cb || 0 < a.j.length)return !1;
        try {
            var d = b.getBoundingClientRect()
        } catch (e) {
            return !1
        }
        var f = "DIV" == b.tagName, g = Kb(b), h = [];
        if (f) {
            var l = yc(), d = Cc(d);
            F(d, function (a, b) {
                var d = new Dc("e", g, c, String(b));
                this.j.push(d);
                h.push(u(d.Xb, d, l, a))
            }, a);
            b.insertBefore(l, b.childNodes[0] || null)
        } else d =
            Ec(a, d), F(d, function (a, d) {
            var e = new Dc("e", g, c, String(d));
            this.j.push(e);
            h.push(u(e.Wb, e, b, a))
        }, a);
        var r = !0;
        F(h, function (a) {
            r = r && a()
        });
        r ? (a.k = "l", a.Ba = b, a.hb = !f) : (F(a.j, function (a) {
            a.remove()
        }), a.j = []);
        return r
    }, Cc = function (a) {
        return [new G(Math.floor((a.right - a.left) / 2), Math.floor((a.bottom - a.top) / 2))]
    }, Ec = function (a, b) {
        var c;
        try {
            c = b || a.Ba.getBoundingClientRect()
        } catch (d) {
            c = new N(0, 0, 0, 0)
        }
        var e = Cc(c);
        F(e, function (a) {
            a.x += c.left;
            a.y += c.top
        });
        return e
    }, Hc = function (a) {
        if (a.Ba && a.hb) {
            var b = Ec(a);
            F(b,
                function (a, b) {
                    this.j[b] && Gc(this.j[b], a)
                }, a)
        }
    }, Ic = function (a) {
        F(a.j, function (a) {
            a.remove()
        });
        a.j = [];
        a.k = "d"
    }, Mc = function (a) {
        var b = (new Date).getTime(), c = a.yb ? b - a.yb : 0, d = -1;
        4 == a.j.length ? (d = ib(a.j, function (a) {
            return Jc(a, b)
        }), d = Kc(d)) : 1 == a.j.length && (d = [-1, 0, 1, 2, 3, 5][Jc(a.j[0], b) + 1]);
        a.ca = d == a.I ? a.ca + c : 0;
        c = new Bc(d, a.I, c);
        a.I = d;
        a.yb = b;
        Lc(a, d);
        Hc(a);
        return c
    }, Kc = function (a) {
        var b = lb(nb(Nc));
        F(a, function (a) {
            0 <= a && ++b[a]
        });
        return 4 == b[4] ? 6 : 3 <= b[4] ? 5 : 0 < b[4] ? 4 : 4 == b[2] ? 2 : 4 == b[1] ? 1 : 4 == b[0] ? 0 : 3
    }, Lc = function (a,
                      b) {
        0 == b && Oc(a) ? a.k = "n" : a.k = "dlfcrrrr".split("")[b + 1]
    }, Pc = function (a) {
        return "f" == a.k && a.ca >= a.ec
    }, Oc = function (a) {
        return "n" == a.k ? !0 : "l" == a.k && a.ca >= a.gc
    }, Dc = function (a, b, c, d) {
        this.f = null;
        this.bb = a;
        this.qb = "e" == a ? String(c) + "~" + String(d) : "";
        this.L = [];
        this.O = -1;
        this.Pa = 0;
        this.ra = lb(nb(Qc));
        this.ic = lb(nb(Nc));
        "e" == this.bb && (Rc[this.qb] = u(this.Vb, this));
        K ? (a = b.createElement("div"), a.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" style="opacity:0;-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(opacity=0)\';filter:alpha(opacity=0)"><param name="movie" value="' +
        Sc(this, !0) + '"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param></object>', a = a.firstChild, a.id = String(Math.random())) : a = Tc(this, b);
        a.width = 1;
        a.height = 1;
        a.style.zIndex = -999999;
        this.f = a
    }, Nc = {sc: -1, LOADING: 0, Qb: 1, Pb: 2, kc: 3, VISIBLE: 4}, Qc = {
        LOADING: 0,
        Qb: 1,
        Pb: 2,
        oc: 3,
        lc: 4,
        qc: 5,
        rc: 6,
        pc: 7,
        mc: 8,
        nc: 9
    }, Rc = {}, Tc = function (a, b) {
        var c = function (a, c, d) {
            var e = b.createElement("param");
            e.name = c;
            e.value = d;
            a.appendChild(e)
        }, d = Sc(a), e = b.createElement("object");
        e.type = "application/x-shockwave-flash";
        e.data = d;
        c(e, "movie", d);
        c(e, "allowscriptaccess", "always");
        c(e, "wmode", "opaque");
        e.style.visibility = "hidden";
        e.style.opacity = 0;
        return e
    }, Sc = function (a, b) {
        var c = "//www.gstatic.com/osd/hbt.swf";
        "e" == a.bb && (c = bc("//www.gstatic.com/osd/hbe.swf", "id", a.qb));
        b && (c = bc(c, "delay", "1"));
        return c
    };
    Dc.prototype.Xb = function (a, b) {
        if (!this.f)return !1;
        this.f.style.position = "absolute";
        Gc(this, b);
        var c = !0;
        try {
            a.appendChild(this.f)
        } catch (d) {
            c = !1
        }
        return c
    };
    Dc.prototype.Wb = function (a, b) {
        if (!this.f || !a.parentNode)return !1;
        this.f.style.position = "fixed";
        Gc(this, b);
        var c = !0;
        try {
            a.parentNode && a.parentNode.insertBefore(this.f, a.nextSibling)
        } catch (d) {
            c = !1
        }
        return c
    };
    var Gc = function (a, b) {
        var c;
        if (c = a.f)c = a.f, c = new G(c.offsetLeft, c.offsetTop), c = !(b == c || b && c && b.x == c.x && b.y == c.y);
        if (c) {
            c = a.f;
            var d, e;
            b instanceof G ? (d = b.x, e = b.y) : (d = b, e = void 0);
            c.style.left = Wb(d);
            c.style.top = Wb(e)
        }
    };
    Dc.prototype.remove = function () {
        if (this.f)try {
            var a = this.f;
            a && a.parentNode && a.parentNode.removeChild(a)
        } catch (b) {
        }
        this.f = null
    };
    Dc.prototype.Vb = function (a) {
        this.O = a ? 3 : 4
    };
    var Jc = function (a, b) {
        if ("e" == a.bb) {
            var c = null;
            try {
                c = a.f.it()
            } catch (d) {
            }
            null === c ? (c = 0, 0 < a.O && (c = 2)) : c = c ? 3 : 4;
            ++a.ic[c + 1];
            a.O = c
        } else {
            var e = Number(b), f = null;
            try {
                f = a.f.fc()
            } catch (g) {
            }
            Uc(a, f, e);
            c = a.L[a.L.length - 1];
            if (null === f) {
                if (f = e = 0, 0 < a.O || q(c.ua))f = e = 2
            } else null === c.ua || c.Ya >= e ? (e = 10 <= f ? 4 : 0, f = 0) : f > c.ua ? (c = (f - c.ua) / (e - c.Ya) * 1E3, e = 10 <= c ? 4 : 3, c = 0 == c ? 1 : 1 > c ? 3 : 4 > c ? 4 : 23 > c ? 6 : 26 > c ? 8 : 9, 6 == a.Pa && 6 == c && (c = 7), f = c) : f = e = 1;
            6 == a.Pa && (--a.ra[6], 4 == f || 8 == f ? ++a.ra[5] : ++a.ra[7]);
            ++a.ra[f];
            a.O = e;
            a.Pa = f
        }
        return a.O
    }, Uc = function (a,
                      b, c) {
        var d = c - 1E3, e = a.L.length;
        F(a.L, function (a, b) {
            a.Ya <= d && (e = Math.min(e, b + 1))
        });
        var f = a.L.length - e;
        0 < f && a.L.splice(e, f);
        a.L.unshift({ua: b, Ya: c})
    };
    aa("gteh", fb("osd_or_lidar::gteh_ex", function (a, b) {
        var c = Rc[a];
        t(c) && c(b)
    }));
    var Vc = function (a, b) {
        this.r = a || 0;
        this.q = b || ""
    }, Wc = function (a, b) {
        a.r && (b[4] = a.r);
        a.q && (b[12] = a.q)
    };
    Vc.prototype.match = function (a) {
        return (this.r || this.q) && (a.r || a.q) ? this.q || a.q ? this.q == a.q : this.r || a.r ? this.r == a.r : !1 : !1
    };
    Vc.prototype.toString = function () {
        var a = "" + this.r;
        this.q && (a += "-" + this.q);
        return a
    };
    var Xc = function (a) {
        var b = [];
        mb(a, function (a, d) {
            var e = A(d), f = a;
            m(f) && (f = A(f));
            b.push(e + "=" + f)
        });
        return b.join("\n")
    };
    var T = function (a, b, c, d, e, f) {
        this.a = Yc.clone();
        this.h = this.p = 0;
        this.S = new N(0, 0, 0, 0);
        this.Xa = this.$a = this.Q = -1;
        this.va = [0, 0, 0, 0, 0];
        this.J = [0, 0, 0, 0, 0];
        this.B = [0, 0, 0, 0, 0];
        this.zoom = [0, 0, 0, 0, 0];
        this.U = "";
        this.o = d;
        this.Y = this.ka = -1;
        this.Va = 0;
        this.$ = b;
        this.v = c && c._adk_ ? c._adk_ : 0;
        this.kb = null;
        this.b = e;
        this.Sa = function () {
        };
        this.Eb = function () {
        };
        this.m = this.element = c;
        this.ha = 0;
        this.ga = -1;
        this.qa = "";
        this.w = c ? String(c._avi_ || "") : "";
        this.Tb = c ? Boolean(c._eos_) : !1;
        this.la = 0;
        this.Qa = [];
        this.Nb = !1;
        this.Ua = "";
        this.l =
        {};
        this.l.le = 0;
        this.l.nt = 2;
        this.l.Fr = 3;
        this.g = this.Da = null;
        this.fa = !1;
        this.N = this.d = null;
        this.Ea = 0;
        this.F = null;
        this.Ia = !1;
        this.c = null;
        this.oa = "";
        this.na = this.G = this.s = null;
        this.La = this.ia = !1;
        this.Z = this.ma = null;
        this.Bb = !1;
        this.C = this.dc = null;
        this.ea = 0;
        this.aa = !1;
        this.D = null;
        this.X = !1;
        this.T = null;
        this.xa = 0;
        this.ba = !1;
        this.M = null;
        this.jc = 0;
        this.Ob = null;
        this.Oa = this.ja = this.Na = !1;
        this.hc = .01 > Math.random();
        this.pa = this.K = null;
        this.da = c ? String(c._cvu_ || "") : "";
        this.ob = !1;
        this.Kb = void 0;
        this.za = c ? String(c._cid_ ||
        "") : "";
        this.P = this.ya = this.Aa = !1;
        this.gb = [];
        this.Mb = this.Ib = void 0;
        this.Jb = 0;
        this.Za = -1;
        this.zb = this.V = 0;
        this.wb = void 0;
        this.jb = this.ib = this.Lb = 0;
        this.Ta = !1;
        this.vb = -1;
        this.Yb = this.rb = !1;
        this.Ha = 0;
        this.nb = {bc: null, ac: null};
        this.Ja = !1;
        this.u = c && c._tos_ ? !0 : !1;
        this.Cb = !0;
        this.ta = this.H = this.R = -1;
        this.Ga = 0;
        this.A = {cb: 0, fb: 0, eb: 0};
        this.Fa = 1 != this.b ? 0 : Ja([1, 2], .2) || 0;
        Zc(this, c && c._avm_);
        $c(this, a, f)
    }, Yc = new N(0, 0, 0, 0), ad = function (a) {
        return new Vc(a.v, a.kb)
    }, Zc = function (a, b) {
        if (m(b) && 0 != b.length)for (var c =
            b.split("&"), d = 0; d < c.length; d++) {
            var e = c[d], f = Zb;
            e == f.Sb && (a.Cb = !1);
            e == f.Rb && (a.u = !0)
        }
    }, dd = function (a, b, c, d) {
        var e = bd, f = a.pa, g = null, g = f && e ? new N(e.y, e.x + f.width, e.y + f.height, e.x) : new N(-12245933, -12245933, -12245933, -12245933);
        d || (a.a = g, f && (a.p = f.width * f.height));
        cd(a, g, b, c, d, !0)
    }, ed = function (a, b, c, d, e) {
        if (!(0 > a.o)) {
            var f = y.innerWidth, g = y.innerHeight, h = new N(Math.round(y.mozInnerScreenY), Math.round(y.mozInnerScreenX + f), Math.round(y.mozInnerScreenY + g), Math.round(y.mozInnerScreenX));
            c = new N(y.screenY +
            d, y.screenX + c.width, y.screenY + c.height, y.screenX);
            e || (d = new N(h.top - c.top, h.right - c.left, h.bottom - c.top, h.left - c.left), d.top > a.a.top ? a.a = d : (a.a.right = a.a.left + f, a.a.bottom = a.a.top + g), a.p = f * g);
            cd(a, h, c, b, e, !0)
        }
    }, gd = function (a, b, c) {
        var d = fd(a, y && y.document);
        if (d) {
            c || $c(a, y, !0);
            var e = Math.floor((a.a.left + a.a.right) / 2), f = Math.floor((a.a.top + a.a.bottom) / 2), g = Ob(document), d = d(e - g.x, f - g.y) ? .5 : 0;
            cd(a, a.a, d, b, c, !0)
        }
    }, fd = function (a, b) {
        hd(a);
        if (!a.Da) {
            var c = [];
            F(ob(a.l), function (a) {
                c[this.l[a] + 1] = a
            }, a);
            var d =
                c.join(""), d = b && b[d];
            a.Da = d && u(d, b)
        }
        return a.Da
    }, hd = function (a) {
        a.l.e = -1;
        a.l.i = 6;
        a.l.n = 7;
        a.l.t = 8
    };
    T.prototype.update = function (a, b, c, d, e) {
        if (0 > this.o)return null;
        c || $c(this, d, e);
        Boolean(this.d) && (c ? (this.d && (e = this.d, 3 <= e.I && (e.I = 3)), d.clearInterval(this.N), this.N = null) : this.d && !this.N && "d" != this.d.k && id(this, d, !0));
        Boolean(this.s) && (c ? (this.s && this.s.pause(), d.clearInterval(this.G), this.G = null) : this.s && !this.G && this.ia && (this.G = d.setInterval(D("osd_or_lidar::adblock::nclv_int", u(this.Gb, this)), 1E3), this.Gb()));
        null != this.D && (c ? (d.clearInterval(this.C), this.C = null, this.aa = !1) : this.X && !this.C &&
        jd(this, d, !0));
        null !== this.Z && (c ? this.La && (d.clearTimeout(this.dc), this.ma && this.ma.tc()) : this.La && this.ma && this.ma.uc());
        null != this.M && "-" != this.M && (c ? (d.clearInterval(this.T), this.T = null, this.ba = !1) : this.Na && !this.T && (this.T = d.setInterval(D("osd_or_lidar::adblock::xdev_int", u(this.Hb, this, d, 1E3)), 1E3), this.Hb(d)));
        return cd(this, this.a, b, a, c, !1)
    };
    var kd = function (a, b) {
        if (!a.Ta || 1E3 < b - a.vb) {
            var c = ba("ima.bridge.getNativeViewability");
            t(c) && (c(a.qa, u(a.Ub, a)), a.Ta = !0, a.vb = b)
        }
    };
    T.prototype.Ub = function (a) {
        this.Ta = !1;
        var b = a.opt_nativeViewBounds || {}, c = a.opt_nativeViewVisibleBounds || {}, d = a.opt_nativeTime || -1, e = a.opt_nativeVolume, b = new N(b.top || 0, b.left + b.width || 0, b.top + b.height || 0, b.left || 0);
        a = a.opt_nativeViewHidden ? Yc.clone() : new N(c.top || 0, c.left + c.width || 0, c.top + c.height || 0, c.left || 0);
        this.p = (b.bottom - b.top) * (b.right - b.left);
        this.a = b;
        cd(this, b, a, d, !1, !0, e)
    };
    var cd = function (a, b, c, d, e, f, g) {
        var h = d - a.o || 1, l = null;
        q(c) ? b = ld(a, c) : (l = c, b = ld(a, b, l));
        a.Ib || md(a, b, h, a.ka, f, e, l, g);
        a.ka = e ? -1 : b;
        a.o = d;
        -1 != b && (0 > a.Q && (a.Q = d), a.Xa = d);
        -1 == a.$a && U(a) && (a.$a = d);
        a.Sa(a, l || Yc);
        return a.h
    }, ld = function (a, b, c) {
        if (a.Yb)return a.h = 0, nd(a.h);
        if (a.rb && 7 == a.b)return a.h = 1, nd(a.h);
        var d = null;
        if (q(b))a.h = b; else {
            c = new N(Math.max(b.top, c.top), Math.min(b.right, c.right), Math.min(b.bottom, c.bottom), Math.max(b.left, c.left));
            if (0 >= a.p || c.top >= c.bottom || c.left >= c.right)return a.S = new N(0,
                0, 0, 0), a.h = 0, -1;
            a.S = c.clone().translate(-b.left, -b.top);
            d = (c.bottom - c.top) * (c.right - c.left);
            a.h = d / a.p
        }
        return nd(a.h)
    }, nd = function (a) {
        var b = -1;
        1 <= a ? b = 0 : .75 <= a ? b = 1 : .5 <= a ? b = 2 : .25 <= a ? b = 3 : 0 < a && (b = 4);
        return b
    }, md = function (a, b, c, d, e, f, g, h) {
        e = e && -1 != d && 2 >= d;
        var l = -1 == d || -1 == b ? -1 : Math.max(d, b);
        d = e ? l : d;
        -1 != d && (a.va[d] += c);
        (e = g || null) ? (-1 != d && 2 >= d && -1 != a.Y && (a.zoom[a.Y] += c), e = 100 * a.p / ((e.bottom - e.top) * (e.right - e.left)), a.Y = 20 <= e ? 0 : 10 <= e ? 1 : 5 <= e ? 2 : 2.5 <= e ? 3 : 4) : a.Y = -1;
        (g = g || null) ? (g = (g.bottom - g.top) * (g.right - g.left),
            a.Va = 0 < g ? a.p * a.h / g : 0) : a.Va = 0;
        if (7 == a.b) {
            h = void 0 !== h ? h : od(a);
            g = -1 != d && 2 >= d;
            e = .1 <= h && .1 <= a.wb;
            a.Lb += c;
            e && (a.ib += c, g ? a.jb += c : a.V += c);
            a.V > a.zb && (a.zb = a.V);
            if (g || void 0 === h || .1 > h)a.V = 0;
            void 0 !== h && (Number(h) ? (g = Math.pow(10, 3), h = Math.round(h * g) / g) : h = 0);
            a.wb = h
        }
        for (; 0 <= d && 4 >= d; d++)a.B[d] += c, a.B[d] > a.J[d] && (a.J[d] = a.B[d]);
        for (d = 0; d < a.B.length; ++d)if (d < b || f || -1 == b)a.B[d] = 0
    }, pd = function (a) {
        a.g && Ic(a.g)
    }, id = function (a, b, c) {
        a.N = b.setInterval(D("osd_or_lidar::adblock::flv_int", u(a.Db, a, b)), 1E3);
        c && a.Db(b)
    };
    T.prototype.Db = function (a) {
        if (this.d) {
            var b = Mc(this.d);
            this.Ea = 5 <= b.sa && 5 <= b.xb ? this.Ea + b.pb : 0;
            if (1E3 <= this.Ea)qd(this, a), this.F = "v"; else if (2 == b.sa || Oc(this.d) || Pc(this.d))qd(this, a), this.F = "i"
        }
    };
    var qd = function (a, b) {
        b.clearInterval(a.N);
        a.N = null;
        a.Ia = !1;
        a.d && Ic(a.d)
    };
    T.prototype.Gb = function () {
        this.s && this.s.update()
    };
    var jd = function (a, b, c) {
        a.C = b.setInterval(D("osd_or_lidar::adblock::iem_int", u(a.Fb, a, b, 1E3)), 1E3);
        c && a.Fb(b)
    };
    T.prototype.Fb = function (a, b) {
        var c = fd(this, a && a.document);
        if (c) {
            $c(this, a, !0);
            var d = Math.floor((this.a.left + this.a.right) / 2), e = Math.floor((this.a.top + this.a.bottom) / 2), f = Ob(document), c = Boolean(c(d - f.x, e - f.y)), d = b || 0;
            c ? (this.ea += this.aa ? d : 0, this.aa = !0) : (this.ea = 0, this.aa = !1);
            1E3 <= this.ea && (a.clearInterval(this.C), this.C = null, this.X = !1, this.D = "v");
            $c(this, a, !1)
        } else a.clearInterval(this.C), this.C = null, this.X = !1, this.D = "i"
    };
    T.prototype.Hb = function (a, b) {
        if (this.Ob) {
            var c = this.Ob.contentWindow, d = this.a.right - this.a.left, e = this.a.bottom - this.a.top, f = this.jc, g = qc(), h = new N(Math.round(c.mozInnerScreenY), Math.round(c.mozInnerScreenX + d), Math.round(c.mozInnerScreenY + e), Math.round(c.mozInnerScreenX)), c = new N(c.screenY + f, c.screenX + g.width, c.screenY + g.height, c.screenX), h = new N(Math.max(h.top, c.top), Math.min(h.right, c.right), Math.min(h.bottom, c.bottom), Math.max(h.left, c.left)), e = d * e, d = 0;
            0 < e && h.top < h.bottom && h.left < h.right && (d = (h.bottom -
            h.top) * (h.right - h.left) / e);
            e = b || 0;
            .5 <= d ? (this.xa += this.ba ? e : 0, this.ba = !0) : (this.xa = 0, this.ba = !1);
            1E3 <= this.xa && (a.clearInterval(this.T), this.T = null, this.Na = !1, this.M = "v")
        }
    };
    var rd = function (a) {
        return a.Ia || a.ia || a.X || a.La || a.Na
    }, sd = function (a) {
        return a ? a.top + "-" + a.left + "-" + a.bottom + "-" + a.right : "0-0-0-0"
    }, xd = function (a, b, c, d) {
        var e = U(a);
        if (0 == a.la)a.A.cb++; else if (1 != a.la || e && !a.Nb) {
            a.A.eb++;
            var f = a.getStats();
            f.unshift("adk=" + a.v);
            d && f.push("r=" + d);
            b = f.concat(b).join("&");
            d = {};
            Wc(ad(a), d);
            d[0] = c;
            d[3] = b;
            d[5] = e;
            d[15] = rd(a);
            d[11] = a.ja || a.Oa;
            d[7] = a.h;
            d[9] = sd(a.S);
            d[13] = a.J.join(",");
            d[14] = a.Va;
            td(a, d, a.Qa);
            a.Nb = e
        } else a.A.fb++
    }, td = function (a, b, c) {
        try {
            var d = Xc(b);
            if (d && a.element) {
                var e =
                    c ? c.length : 0;
                if (0 < e)for (var f = 0; f < e; ++f) {
                    var g = c[f];
                    (g == y.top || g.parent && g.parent != g) && sc(d, g)
                } else {
                    b = [];
                    try {
                        var h = Tb(a.element);
                        if (h)b = [h]; else {
                            var l;
                            var r;
                            c = document;
                            var v = a.element || c;
                            l = v.querySelectorAll && v.querySelector ? v.querySelectorAll("IFRAME") : r = v.getElementsByTagName("IFRAME");
                            for (f = 0; f < l.length; ++f)(h = Tb(l[f])) && b.push(h)
                        }
                        var p = b.length;
                        if (0 < p)for (var z = ia(sc, d), f = 0; f < p; ++f)tc(z, b[f])
                    } catch (Y) {
                    }
                }
            }
        } catch (ga) {
        }
    };
    T.prototype.cc = function () {
        this.ga = S()
    };
    T.prototype.Ab = function () {
        this.ha += S() - this.ga;
        this.ga = -1
    };
    var $c = function (a, b, c) {
        b = c ? b : b.top;
        try {
            var d = Yc.clone(), e = new G(0, 0);
            if (a.m) {
                if (c || 2 != a.Fa || !zc(a.m))d = a.m.getBoundingClientRect();
                if (c || !b.frameElement) {
                    var f = a.m, g = new G(0, 0), h = Pb(Kb(f));
                    c = f;
                    do {
                        var l;
                        if (h == b) {
                            var f = c, r = Kb(f), v = new G(0, 0), p = void 0, p = r ? Kb(r) : document, z;
                            (z = !K || K && (J() || 9 <= Hb)) || (z = "CSS1Compat" == Lb(p).W.compatMode);
                            if (f != (z ? p.documentElement : p.body)) {
                                var Y = Vb(f), ga, Db = Lb(r);
                                ga = Ob(Db.W);
                                v.x = Y.left + ga.x;
                                v.y = Y.top + ga.y
                            }
                            l = v
                        } else {
                            var Qa = Vb(c);
                            l = new G(Qa.left, Qa.top)
                        }
                        f = l;
                        g.x += f.x;
                        g.y += f.y
                    } while (h &&
                    h != b && h != h.parent && (c = h.frameElement) && (h = h.parent));
                    e = g
                }
            }
            var Ra = e.x, Sa = e.y, Ta = d.right - d.left, Ua = d.bottom - d.top;
            a.a = new N(Math.round(Sa), Math.round(Ra + Ta), Math.round(Sa + Ua), Math.round(Ra))
        } catch (O) {
            a.a = Yc.clone()
        } finally {
            a.l.Po = 5, a.l.me = 1, a.l.om = 4
        }
        a.p = (a.a.bottom - a.a.top) * (a.a.right - a.a.left);
        2 != a.b && 3 != a.b && 6 != a.b || 0 != a.p ? (a.Oa = !1, a.K = null) : (a.Oa = !0, a.m && a.m.parentElement && a.hc && (d = a.m.parentElement.getBoundingClientRect(), a.K = new N(d.top, d.right, d.bottom, d.left)))
    }, U = function (a) {
        return 1E3 <= Math.max(a.B[2],
                a.J[2])
    };
    T.prototype.getStats = function () {
        var a = this.a, a = ["p=" + a.top + "," + a.left + "," + a.bottom + "," + a.right];
        a.push("tos=" + this.va.join(","));
        a.push("mtos=" + this.J.join(","));
        a.push("rs=" + this.b);
        var b = 5 == this.b || 6 == this.b;
        b || a.push("ht=" + this.ha);
        0 <= this.Q && (a.push("tfs=" + this.Q), a.push("tls=" + this.Xa));
        this.w && a.push("avi=" + this.w);
        this.za && a.push("cid=" + this.za);
        this.D && a.push("iemv=" + this.D);
        this.Z && (a.push("mppv=" + this.Z), a.push("mppz=" + (this.Bb ? "1" : "0")));
        this.M && a.push("xdev=" + this.M);
        this.c && (a.push("ncl=1"),
        this.c.Ra && a.push("nclt=" + this.c.Ra), this.c.ab && a.push("nctt=" + this.c.ab));
        this.na && a.push("nclv=" + this.na);
        this.oa && a.push("ncldbg=" + this.oa);
        this.g ? a.push("swf=" + this.g.k) : this.fa && a.push("swf=-");
        this.F && a.push("swfv=" + (this.d ? this.d.k : "") + this.F);
        this.Ua && a.push("fp=" + A(this.Ua));
        7 == this.b && a.push("qid=" + this.qa);
        this.U && a.push("afp=" + A(this.U));
        b && (this.gb && 0 != this.gb.length && a.push("qt=" + this.gb.join(",")), this.$ && a.push("req=" + A(this.$).substring(0, 100)));
        0 != this.Ha && a.push("ipc=" + this.Ha);
        this.Tb && a.push("eop=1");
        this.Ja && a.push("ci=1");
        this.Ga && a.push("gte=" + this.Ga);
        -1 < this.R && (a.push("tmo=" + this.R), a.push("tme=" + this.H));
        -1 < this.ta && a.push("tdl=" + this.ta);
        (b = this.A.cb || this.A.fb || this.A.eb ? [this.A.cb, this.A.fb, this.A.eb].join("-") : void 0) && a.push("abd=" + b);
        this.K && a.push("pb=" + this.K.top + "," + this.K.left + "," + this.K.bottom + "," + this.K.right);
        this.Fa && a.push("ha=" + this.Fa);
        return a
    };
    var od = function (a) {
        if ("as" == a.Mb && t(a.element.sdkVolume))try {
            return Number(a.element.sdkVolume())
        } catch (b) {
            return -1
        }
        if ("h" == a.Mb) {
            var c = ba("ima.common.sdkVolume");
            if (t(c))try {
                return Number(c(a.qa))
            } catch (d) {
                return -1
            }
        }
    };
    var yd = function () {
        return I("iPad") || I("Android") && !I("Mobile") || I("Silk")
    };
    var zd = !1, Ad = null, Bd = null, bd = null, Cd = null, Dd = 0, Ed = !1, Fd = 0, Gd = null, Ld = function (a, b, c, d) {
        if (y.top.postMessage)if (1 != a.length)b(); else if (Cd = a[0].pa) {
            var e;
            try {
                e = y.top.frames.google_top_static_frame ? !0 : !1
            } catch (f) {
                e = !1
            }
            if (e) {
                if (d)Dd = 2; else if (Hd(), 2 != Dd) {
                    b();
                    return
                }
                zd = !0;
                Gd = c;
                Q(y, "message", Id, "osd::periscope::message");
                Jd()
            } else Kd() ? b() : y.setTimeout(D("osd::periscope::mpmtgt_to", function () {
                Ld(a, b, c, d)
            }), 50)
        } else b(); else b()
    }, Jd = function () {
        var a = {};
        Fd = Math.floor(1E6 * Math.random());
        a[0] = "google_loc_request";
        a[1] = Fd;
        var b = [], c;
        for (c in a)b.push(c + "=" + a[c]);
        y.top.postMessage(b.join("\n"), "*")
    }, Id = function (a) {
        var b;
        try {
            b = {};
            var c = a.data.split("\n");
            for (a = 0; a < c.length; a++) {
                var d = c[a].indexOf("=");
                -1 != d && (b[c[a].substr(0, d)] = c[a].substr(d + 1))
            }
        } catch (e) {
        }
        if (b && 1 in b && b[1] == Fd) {
            c = parseInt(b[10], 10);
            d = parseInt(b[11], 10);
            c = 0 < c && 0 < d ? new H(c, d) : new H(-12245933, -12245933);
            -12245933 != c.width && -12245933 != c.height && (Bd = c);
            c = parseInt(b[12], 10);
            d = parseInt(b[13], 10);
            c = 0 <= c && 0 <= d ? new G(c, d) : new G(-12245933, -12245933);
            -12245933 != c.x && -12245933 != c.y && (Ad = c);
            c = Cd;
            if (null != c && 0 < c.width && 0 < c.height) {
                d = parseInt(b[6], 10);
                a = parseInt(b[7], 10);
                var f = parseInt(b[8], 10);
                b = parseInt(b[9], 10);
                b = 0 < d && 0 < a && 0 < f && 0 < b && 10 >= Math.abs(f - c.width) + Math.abs(b - c.height) ? new G(d, a) : new G(-12245933, -12245933);
                -12245933 != b.x && -12245933 != b.y && (bd = b)
            }
            Ed = !0;
            Gd && (b = Gd, Gd = null, b());
            y.setTimeout(D("osd::periscope::pmtgt_to", Jd), wc())
        }
    }, Kd = function () {
        var a = 0 <= R ? S() - R : -1;
        return -1 != a && 500 < a
    }, Hd = function () {
        var a = Ja([2], ma);
        Dd = a ? a : 1
    }, Md = function () {
        var a =
            null != Bd && null != Ad && null != bd && null != Cd;
        return Ed && a
    };
    var Nd = null, Od = null, Pd = null, Qd = !1, Rd = void 0, Ud = function (a, b) {
        if (!Qd) {
            Qd = !0;
            Nd = Nd || Q(a, "scroll", Sd, "osd_or_lidar::scroll");
            Od = Od || Q(a, "resize", Td, "osd_or_lidar::resize");
            if (b)for (var c, d = 0; d < V.length; ++d)c = V[d], c.element && (c.nb.bc = Q(c.element, "mouseover", u(c.cc, c), "osd_or_lidar::adblock::mouseover"), c.nb.ac = Q(c.element, "mouseout", u(c.Ab, c), "osd_or_lidar::adblock::mouseout"));
            var d = W, e;
            x.mozVisibilityState ? e = "mozvisibilitychange" : x.webkitVisibilityState ? e = "webkitvisibilitychange" : x.visibilityState &&
            (e = "visibilitychange");
            e && (Pd = Pd || Q(x, e, d, "osd_or_lidar::visibility"));
            W()
        }
    }, Td = function () {
        Vd(!1);
        Sd()
    }, Sd = function () {
        Wd(V, !1)
    }, de = function () {
        var a;
        oc && (X = nc(!0, y, oc));
        a = X;
        var b = Xd, c = Yd;
        if (Zd) {
            a = b;
            Vd(!1);
            var d = $d, b = d.height - a;
            0 >= b && (b = d.height, a = 0);
            X = new H(d.width, b);
            b = new ae;
            b.tb = !0;
            b.Ca = X;
            b.mb = d;
            b.lb = a;
            return b
        }
        if (c)return a = new ae, a.sb = !0, a;
        if (zd)return a = new ae, a.Ma = !1, d = Bd, a.Ca = d, null != d && -12245933 != d.height && -12245933 != d.width && (X = d, b = Ad, null != b && -12245933 != b.x && -12245933 != b.y && (d = pc(!1, d, b),
            a.wa = d, a.Ma = !0)), a;
        if (be)return a = new ae, a.ub = !0, a;
        if (ce)return a = new ae, a.Zb = !0, a;
        i:{
            b = new ae;
            b.Ca = a;
            b.Ka = !1;
            if (null != a && -1 != a.width && -1 != a.height && -12245933 != a.width && -12245933 != a.height) {
                try {
                    d = pc(!0, a)
                } catch (e) {
                    a = b;
                    break i
                }
                b.wa = d;
                b.Ka = !0
            }
            a = b
        }
        return a
    }, Wd = function (a, b) {
        if (!ee)if (window.clearTimeout(fe), fe = null, 0 == a.length)b || ge(); else {
            he = null;
            var c = de();
            try {
                var d = S();
                if (c.$b)for (var e = 0; e < a.length; e++)kd(a[e], d); else if (c.tb)for (e = 0; e < a.length; e++)ed(a[e], d, c.mb, c.lb, b); else if (c.sb)for (e = 0; e < a.length; e++)gd(a[e],
                    d, b); else if (c.Ma) {
                    var f = Md();
                    Ed = !1;
                    for (e = 0; e < a.length; e++)dd(a[e], c.wa, d, b || !f)
                } else if (ce)F(a, function (a) {
                    b ? a.c && a.c.pause() : a.c && a.c.update()
                }); else if (c.ub)F(a, function (a) {
                    if (b) {
                        if (a.g) {
                            var c = a.g;
                            3 <= c.I && (c.I = 3);
                            a.ka = -1
                        }
                    } else if (a.g && "d" != a.g.k) {
                        var c = Mc(a.g), d = [-1, -1, -1, -1, -1, 4, 2, 0], e = d[c.sa + 1];
                        md(a, e, c.pb, d[c.xb + 1], !0, !1);
                        a.ka = e;
                        a.Sa(a, Yc);
                        7 == a.b ? 2E3 <= Math.max(a.B[2], a.J[2]) && pd(a) : U(a) && !a.u && pd(a);
                        if (2 == c.sa || Oc(a.g) || Pc(a.g))a.Eb(a), a.u = !1, pd(a)
                    }
                }); else if (c.Ka)for (e = 0; e < a.length; e++)a[e].update(d,
                    c.wa, b, y, ie);
                je += S() - d;
                ++ke;
                le()
            } finally {
                b ? F(a, function (a) {
                    a.h = 0;
                    a.S = new N(0, 0, 0, 0)
                }) : ge()
            }
        }
    }, W = function () {
        var a = me();
        if (a) {
            if (!uc) {
                var b = S();
                vc = b;
                F(V, function (a) {
                    var d = a.Jb;
                    uc || a.Ib || -1 == a.Za || (d += b - a.Za);
                    a.Jb = d
                })
            }
            uc = !0;
            Vd(!0)
        } else b = S(), ne = oe(b), uc = !1, F(V, function (a) {
            0 <= a.o && (a.Za = b)
        });
        Wd(V, !a)
    }, me = function () {
        if (pe())return !0;
        var a;
        a = y.document;
        a = {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4
        }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0;
        return 1 == a || 0 == a
    }, ge = function () {
        y &&
        (fe = y.setTimeout(D("osd_or_lidar::psamp_to", function () {
            Wd(V, !1)
        }), wc(Rd)))
    }, V = [], ee = !1, X = null, $d = null, qe = null, fe = null, ie = !Ia(y.top), re = "", he = null, Xd = 0, Zd = !1, Yd = !1, be = !1, ce = !1, oc = yd() || !yd() && (I("iPod") || I("iPhone") || I("Android") || I("IEMobile")), ne = 0, se = 0, te = 0, je = 0, ke = 0, ue = -1, Vd = function (a) {
        X = nc(!0, y, oc);
        if (!a) {
            $d = qc();
            a = y;
            a.top != a && (a = a.top);
            var b = 0, c = 0, d = X;
            try {
                var e = a.document, f = e.body, g = e.documentElement;
                if ("CSS1Compat" == e.compatMode && g.scrollHeight)b = g.scrollHeight != d.height ? g.scrollHeight : g.offsetHeight,
                    c = g.scrollWidth != d.width ? g.scrollWidth : g.offsetWidth; else {
                    var h = g.scrollHeight, l = g.scrollWidth, r = g.offsetHeight, v = g.offsetWidth;
                    g.clientHeight != r && (h = f.scrollHeight, l = f.scrollWidth, r = f.offsetHeight, v = f.offsetWidth);
                    h > d.height ? h > r ? (b = h, c = l) : (b = r, c = v) : h < r ? (b = h, c = l) : (b = r, c = v)
                }
                qe = new H(c, b)
            } catch (p) {
                qe = new H(-12245933, -12245933)
            }
        }
    }, ve = function (a, b) {
        if (he && !b)return kb(he);
        var c = a.document, d = 0 <= R ? S() - R : -1, e = S();
        -1 == ue && (d = e);
        var f = [], g = V;
        try {
            if (0 < g.length ? ((c = X) && f.push("bs=" + c.width + "," + c.height), (c =
                    $d) && f.push("bos=" + c.width + "," + c.height), (c = qe) && f.push("ps=" + c.width + "," + c.height), a.screen && f.push("ss=" + a.screen.width + "," + a.screen.height)) : (f.push("url=" + A(a.location.href.substring(0, 1024))), c.referrer && f.push("referrer=" + A(c.referrer.substring(0, 512)))), f.push("tt=" + d), f.push("pt=" + R), Zd && f.push("xde=1"), Yd && f.push("iem=1"), Dd && f.push("pei=" + Dd), f.push("deb=" + A([1, se, te, je, ke, ue].join("-"))), f.push("tvt=" + oe(e)), a.top != a) {
                0 < g.length && f.push("iframe_loc=" + A(a.location.href.substring(0, 512)));
                var h = nc(!1, a, oc);
                f.push("is=" + h.width + "," + h.height)
            }
        } catch (l) {
            f.push("error")
        }
        he = f;
        return kb(he)
    }, we = function (a) {
        var b;
        var c = a.indexOf("Firefox/");
        b = -1;
        if (0 <= c) {
            b = Math.floor(a.substr(c + 8)) || -1;
            var d = a.indexOf("Mac OS X 10."), c = -1;
            0 <= d && (c = Number(a.substr(d + 12, 1)) || -1);
            var e = 0 < c ? -1 : a.indexOf("Windows NT "), d = -1;
            0 <= e && (d = {"6.0": 0, "6.1": 1, "6.2": 2}[a.substr(e + 11, 3)] || -1);
            a = 148;
            5 <= c ? a = 4 <= b ? 108 : 3 <= b ? 127 : 108 : 0 <= d && (16 == b || 17 == b || 18 == b) && (a = [[146, 146, 146], [148, 147, 148], [131, 130, 136]][d][b - 16]);
            b = a
        } else b =
            null;
        null !== b && (Xd = b, Zd = !0)
    }, xe = function (a) {
        var b = Rb("iframe", {
            id: "google_osd_static_frame_" + Math.floor(1E13 * Math.random()),
            name: "google_osd_static_frame"
        });
        b.style.display = "none";
        b.style.width = "0px";
        b.style.height = "0px";
        a.document.body.appendChild(b)
    }, ye = function (a, b) {
        var c = b.match(a);
        return c ? c.join("") : ""
    }, ze = function (a) {
        var b = !1;
        F(V, function (c, d) {
            if (Math.random() < oa) {
                var e;
                var f = String(d);
                Boolean(Boolean(c.m && !!f && !lc) && !lc) ? (e = new Ac, (f = Fc(e, c.m, f)) ? (c.Eb = a, c.g = e) : c.fa = !0, e = f) : (c.fa = !0, e = !1);
                b = b || e
            }
        });
        (be = b) && F(V, function (b) {
            Boolean(b.g) || a(b)
        });
        return b
    }, le = function () {
        if ("osd" == re)for (var a = V, b = 0; b < a.length; b++) {
            var c = ve(y);
            xd(a[b], c, "goog_update_data", "u")
        }
    }, oe = function (a) {
        var b = ne;
        uc && (b += a - vc);
        return b
    }, pe = function () {
        return jb(V, function (a) {
            return a.rb
        })
    }, ae = function () {
        this.mb = this.Ca = null;
        this.lb = 0;
        this.wa = null;
        this.Ka = this.Zb = this.ub = this.Ma = this.sb = this.tb = this.$b = !1
    };
    var Z, Ae = 0, Be = null, Ce = "", De = !1, Ee = null, He = function () {
        if (!(0 < R)) {
            try {
                if (!Fe())return;
                Vd(!1);
                Ge(!1)
            } catch (a) {
            }
            Be = window.setTimeout(D("osd::nppls_to", He), 250)
        }
    }, Ge = function (a) {
        Ie || (Q(y, "message", Je, "osd::message"), De && Q(B(), "message", Je, "osd::message"), Ie = !0);
        Z.getNewBlocks(function (b, c, d, e, f, p, z, Y, ga, Db, Qa, Ra, Sa) {
            if (window && Date) {
                var Ta = -1, Ua = !1;
                if (null == Ee) {
                    var O = Ja([1, 2, 3, 4], .04);
                    Ee = O ? O : 0
                }
                var O = Ee, ja = 3 == d, ud = ja && 2 == O, vd = ja && 3 == O, ja = ja && 4 == O, wd = e && !a, Oe = a && !ja && !vd;
                wd || Oe || ud ? Ta = S() : wd || (Ua = !0);
                var n =
                    new T(window, c, b, Ta, d, ie);
                n.Sa = Ke;
                n.U = ye(Yb, c);
                n.v = Le(c);
                n.kb = hb(c);
                n.Ha = Ae;
                Me(n);
                f && (n.w = f, Ne = !0);
                n.da = z;
                n.ya = Y;
                n.P = ga;
                Db && (n.Ja = !0);
                n.u = Qa || n.u;
                n.za = Ra;
                Zc(n, Sa);
                p && p.width && p.height ? (p = new H(p.width, p.height), 0 < p.width && 0 < p.height && (n.pa = p)) : n.pa = p || null;
                3 == n.b && (n.R = S(), O && (n.Ga = O));
                V.push(n);
                ++te;
                Ua && b.contentWindow ? rc(b, function () {
                    var a = S();
                    n.o = a;
                    3 == n.b && -1 == n.H && (n.H = a);
                    Pe(n);
                    W()
                }) : (Pe(n), n.H = n.R);
                !a && (ud || e && (ja || vd)) && W()
            }
        }, a);
        if (a)for (var b = S(), c = V.length, d = 0; d < c; ++d) {
            var e = V[d], f = 3 == e.b &&
                (3 == Ee || 4 == Ee);
            0 >= e.o && !f && (e.o = b);
            3 == e.b && (-1 == e.R && (e.R = b), f || -1 != e.H || (e.H = b))
        }
    }, Te = function () {
        try {
            var a = B();
            R = S();
            window.clearTimeout(Be);
            Be = null;
            Vd(!1);
            Fe() ? (se = Z.numBlocks(), Ge(!0), 0 == te ? Qe("n") : ie ? Re(a) : (L && q(a.screenX) && q(a.mozInnerScreenX) && q(a.outerWidth) || F(V, function (b, d) {
                var e = Math.random();
                if (0 > (e -= pa)) {
                    var e = String(d), f = new Ac;
                    Boolean(b.m && !!e && !lc) && Fc(f, b.m, e) ? (b.F = "u", b.d = f, b.Ia = !0, id(b, a)) : b.F = "-"
                } else 0 > e - ra && K && M(8) && (b.X = !0, jd(b, a), b.D = "u")
            }), Se())) : Qe("c")
        } catch (b) {
            throw V =
                [], Qe("x"), b;
        }
    }, Re = function (a, b) {
        var c = b || 0, d = 0 != Ae;
        if (1 > c && L && q(a.screenX) && q(a.mozInnerScreenX) && q(a.outerWidth) && 1 > Math.random())we(a.navigator.userAgent), Se(); else if (2 > c && K && M(8) && Math.random() < qa)Yd = !0, Se(); else if (3 > c && !d)Ld(V, ia(Re, a, 3), function () {
            Se();
            W()
        }, Z.shouldForcePeriscope()); else {
            d = function (b) {
                b.ja = !0;
                xd(b, ve(a), "goog_update_data", "i");
                b.P && Ue(b, "i", !0)
            };
            if (!(4 > c && ze(d)))for (c = 0; c < V.length; c++)d(V[c]);
            Se()
        }
    }, Se = function () {
        if (-1 == ue) {
            var a = B(), b = 2 == Z.getOseId();
            Ud(a, b);
            window.setTimeout(D("osd::hd_to",
                function () {
                    Qe("t")
                }), 36E5);
            Math.random() < ka && (Math.random() < la ? (xe(B()), De = !0) : xe(y));
            ue = S() - R
        }
    }, Qe = function (a) {
        window.clearTimeout(fe);
        fe = null;
        Z || (Z = Goog_AdSense_getAdAdapterInstance());
        if (!ee) {
            var b = Z.getOseId();
            if (2 == b || Ne) {
                -1 == ue && (V = []);
                var c = B(), d = ["//pagead2.googlesyndication.com/pagead/gen_204?id=osd"], e = V;
                if (0 < e.length) {
                    Wd(e, !0);
                    for (var f = 0; f < e.length; f++)if (0 < e[f].v) {
                        0 < e[f].ga && e[f].Ab();
                        var g = e[f], h = g.a, h = ["p:", h.top, h.left, h.bottom, h.right];
                        h.push("tos:", g.va.join(","));
                        h.push("mtos:",
                            g.J.join(","));
                        h.push("rs:", g.b);
                        5 !== g.b && 6 !== g.b && (h.push("zoom:", g.zoom.join(",")), h.push("ht:", g.ha));
                        0 <= g.Q && h.push("tfs:", g.Q, "tls:", g.Xa);
                        h.push("vt:", g.$a);
                        g.U && h.push("fp:", g.U);
                        7 === g.b && h.push("qid:", g.qa);
                        g.w && h.push("avi:", g.w);
                        g.D && h.push("iemv:", g.D);
                        g.Z && (h.push("mppv:", g.Z), h.push("mppz:", g.Bb ? "1" : "0"));
                        g.M && h.push("xdev:", g.M);
                        g.c && (h.push("ncl:", "1"), g.c.Ra && h.push("nclt:", g.c.Ra), g.c.ab && h.push("nctt:", g.c.ab));
                        g.na && h.push("nclv:", g.na);
                        g.oa && h.push("ncldbg:", g.oa);
                        g.g ? h.push("swf:",
                            g.g.k) : g.fa && h.push("swf:", "-");
                        g.F && h.push("swfv:", (g.d ? g.d.k : "") + g.F);
                        null != g.Kb && h.push("vl:" + g.Kb);
                        g.Ja && h.push("ci:", "1");
                        d.splice(1, 0, "adk" + e[f].v + "=" + A(h.join(",")))
                    }
                }
                d.push("r=" + a);
                f = ve(c, !1);
                d.push(f.join("&"));
                0 == e.length && (d.push("correlator=" + Z.getCorrelator()), d.push("oid=" + b));
                2 == b && (b = d.join("&"), Ce && (b += "&fp=" + A(Ce)), Ma(c, b));
                c = V;
                for (b = 0; b < c.length; b++)d = c[b], Ue(d, a), d.w && d.v && d.P && Ue(d, a, !0)
            }
            ee = !0
        }
    }, Ne = !1, Ie = !1, Fe = function () {
        var a = B().document;
        if (!a.body || !a.body.getBoundingClientRect ||
            "function" != typeof Goog_AdSense_getAdAdapterInstance)return !1;
        Z = Goog_AdSense_getAdAdapterInstance();
        return !0
    }, Ke = function (a) {
        if (a) {
            var b = U(a), c;
            if (c = b)c = null != a.da && null != a.da.match(/\/pagead\/adview\?.*ai=.*&vt=\d+/i) && !a.ob;
            if (c) {
                c = a.da;
                var d;
                x.body ? (Na || (d = x.createElement("iframe"), d.style.display = "none", d.id = "anonIframe", Na = d, x.body.appendChild(d)), d = !0) : d = !1;
                d && Ma(Na.contentWindow, c);
                a.ob = !0
            }
            b && a.P && !rd(a) && Ue(a, "v", !0);
            2 == Ae && b && !rd(a) && Ue(a, "v")
        }
    }, Le = function (a) {
        return (a = a.match(/[&\?](?:adk)=([0-9]+)/)) &&
        2 == a.length ? parseInt(a[1], 10) : 0
    }, Je = function (a) {
        if (a.data) {
            var b;
            var c = a.data;
            if (m(c)) {
                for (var d = {}, c = c.split("\n"), e = 0; e < c.length; e++) {
                    var f = c[e].indexOf("=");
                    if (!(0 >= f)) {
                        b = Number(c[e].substr(0, f));
                        f = c[e].substr(f + 1);
                        switch (b) {
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
                                if (t(decodeURIComponent))try {
                                    f = decodeURIComponent(f)
                                } catch (g) {
                                    throw Error("Error: URI malformed: " + f);
                                }
                                break;
                            case 17:
                                f = ib(decodeURIComponent(f).split(","), Number)
                        }
                        d[b] =
                            f
                    }
                }
                b = d[0] ? d : null
            } else b = null;
            if (b && (c = b[0], "goog_provide_mode" == c || "goog_request_monitoring" == c || "goog_dom_content_loaded" == c)) {
                i:{
                    d = new Vc(b[4], b[12]);
                    e = V;
                    for (f = 0; f < e.length; ++f)if (d.match(ad(e[f]))) {
                        d = e[f];
                        break i
                    }
                    d = null
                }
                if (d)if ("goog_dom_content_loaded" == c)-1 == d.ta && (a = S(), d.ta = a, 3 == d.b && 3 == Ee && -1 == d.o && (d.o = a, d.H = a, W())); else {
                    e = b[6];
                    f = d.la;
                    d.la = 2 == e || 2 == f ? 2 : 3 == e || 3 == f ? 3 : 1 == e || 1 == f ? 1 : 0;
                    d.Qa.push(a.source);
                    d.u = b[16] ? !0 : !1;
                    if (b[17])for (a = b[17], b = 0; b < a.length; ++b)switch (a[b]) {
                        case 947190538:
                        case 947190541:
                        case 947190542:
                            Rd =
                                a[b]
                    }
                    "goog_request_monitoring" == c && (a = d, c = ie, b = {}, Wc(ad(a), b), b[0] = "goog_acknowledge_monitoring", b[7] = a.h, b[9] = sd(a.S), b[8] = c, td(a, b, a.Qa));
                    e && 0 != e && (Ne = !0);
                    -1 == d.o && (a = S(), d.o = a, W(), 3 == d.b && (d.H = a))
                }
            }
        }
    }, Pe = function (a) {
        var b;
        if (b = a)b = ad(a), b = !!b.r || !!b.q;
        if (b) {
            b = ie;
            var c = {};
            Wc(ad(a), c);
            c[0] = "goog_get_mode";
            c[7] = a.h;
            c[9] = sd(a.S);
            c[8] = b;
            td(a, c)
        }
    }, Me = function (a) {
        if (!Ce) {
            if (!a.$)return;
            var b = ye(Xb, a.$);
            !b || "&" != b.charAt(0) && "?" != b.charAt(0) || (b = b.slice(1));
            Ce = b
        }
        a.Ua = Ce
    }, Ve = function () {
        Q(B(), "unload", function () {
                Qe("u")
            },
            "osd::unload")
    }, We = function () {
        Z || (Z = Goog_AdSense_getAdAdapterInstance());
        if (Z && 2 == Z.getOseId()) {
            var a = Ja([1, 2], na);
            a && (Ae = a)
        }
    }, Ue = function (a, b, c) {
        var d = c && (!a.w || a.P), e = !c && (a.Aa || !a.ya) && U(a), f = e && a.u, g = !a.Aa && (!a.w || a.ya);
        if (a && a.v && (d || g || f)) {
            d = a.getStats();
            f = B();
            g = ve(f, !1);
            if (a.w) {
                var h;
                h = c ? "osdim" : e ? "osdtos" : "osd2";
                var l = a.ja || 0 >= a.p ? 2 : U(a) ? 4 : 3;
                if ("osdim" != h || 3 != l || a.Cb) {
                    var r = "//pagead2.googlesyndication.com/activeview?id=" + h;
                    "osd2" == h && a.u && 4 == l && (r += "&ts=1");
                    Ma(f, [r, "adk=" + a.v + "&" + d.join("&") +
                    "&js=1", "r=" + b, g.join("&")].join("&"))
                }
                c && (a.P = !1)
            } else xd(a, g, "goog_image_request", b);
            c || e || (a.Aa = !0);
            if (e || !c && a.u)a.u = !1
        }
    };
    aa("Goog_Osd_UnloadAdBlock", fb("osd::unload_ex", function (a, b) {
        var c;
        if (a) {
            c = V;
            for (var d = -1, e = 0; e < c.length; ++e)if (c[e].element == a) {
                d = e;
                break
            }
            c = 0 <= d ? V.splice(d, 1)[0] : null
        } else c = null;
        d = B();
        c && (e = c, pd(e), qd(e, d), e.c && e.c.Wa(), d.clearInterval(e.G), e.G = null, e.ia = !1, e.s && e.s.Wa());
        if (c && c.element.contentWindow && 3 == c.b) {
            e = c.getStats();
            e.unshift("adk=" + c.v);
            e.push("r=u");
            var f = ve(d, !1);
            e.push(f.join("&"));
            if (b)Ue(c, "u"); else try {
                d.google_image_requests || (d.google_image_requests = []), c.element.contentWindow.osdsir(d,
                    e.join("&"), c.ja || 0 >= c.p ? 2 : U(c) ? 4 : 3)
            } catch (g) {
            }
        }
    }));
    aa("Goog_Osd_UpdateElementToMeasure", fb("osd::update_elem_ex", function (a, b) {
        if (a && b && ea(a) && 1 == a.nodeType && ea(b) && 1 == b.nodeType) {
            for (var c, d = V, e = 0; e < d.length; ++e)d[e].element == a && (c = d[e]);
            c && (d = B(), c.m = b, pd(c), qd(c, d), c.c && c.c.Wa(), d.clearInterval(c.G), c.G = null, c.ia = !1, c.s && c.s.Wa())
        }
    }));
    cb("osd::main", function () {
        We();
        re = "osd";
        Ve();
        Va() ? Te() : (He(), Q(B(), "load", function () {
            window.setTimeout(D("osd::main::hi_to", Te), 100)
        }, "osd::main::onload"))
    });
})();

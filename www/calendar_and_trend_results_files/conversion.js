(function () {
    var f = this, k = function (a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var d = Object.prototype.toString.call(a);
            if ("[object Window]" == d)return "object";
            if ("[object Array]" == d || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == d || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else return "null";
        else if ("function" == b && "undefined" == typeof a.call)return "object";
        return b
    };
    var l = function (a) {
        l[" "](a);
        return a
    };
    l[" "] = function () {
    };
    var m = function (a, b) {
        for (var d in a)Object.prototype.hasOwnProperty.call(a, d) && b.call(void 0, a[d], d, a)
    };
    var n = window;
    var p = function (a, b, d) {
        a.addEventListener ? a.addEventListener(b, d, !1) : a.attachEvent && a.attachEvent("on" + b, d)
    };
    var q = function (a) {
        return {
                visible: 1,
                hidden: 2,
                prerender: 3,
                preview: 4
            }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0
    }, r = function (a) {
        var b;
        a.mozVisibilityState ? b = "mozvisibilitychange" : a.webkitVisibilityState ? b = "webkitvisibilitychange" : a.visibilityState && (b = "visibilitychange");
        return b
    }, t = function (a, b) {
        if (3 == q(b))return !1;
        a();
        return !0
    }, u = function (a, b) {
        if (!t(a, b)) {
            var d = !1, c = r(b), e = function () {
                if (!d && t(a, b)) {
                    d = !0;
                    var g = e;
                    b.removeEventListener ? b.removeEventListener(c, g, !1) : b.detachEvent &&
                    b.detachEvent("on" + c, g)
                }
            };
            c && p(b, c, e)
        }
    };
    var v = function (a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    };
    var w = v("0.06"), x = v("0.01"), y = v("0.05");
    var z;
    n:{
        var A = f.navigator;
        if (A) {
            var B = A.userAgent;
            if (B) {
                z = B;
                break n
            }
        }
        z = ""
    }
    var C = function (a) {
        return -1 != z.indexOf(a)
    };
    var D = C("Opera") || C("OPR"), E = C("Edge") || C("Trident") || C("MSIE"), F = C("Gecko") && !(-1 != z.toLowerCase().indexOf("webkit") && !C("Edge")) && !(C("Trident") || C("MSIE")) && !C("Edge"), G = -1 != z.toLowerCase().indexOf("webkit") && !C("Edge"), H = function () {
        var a = z;
        if (F)return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (E && C("Edge"))return /Edge\/([\d\.]+)/.exec(a);
        if (E)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (G)return /WebKit\/(\S+)/.exec(a)
    };
    (function () {
        if (D && f.opera) {
            var a = f.opera.version;
            return "function" == k(a) ? a() : a
        }
        var a = "", b = H();
        b && (a = b ? b[1] : "");
        return E && !C("Edge") && (b = (b = f.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a
    })();
    var I = function (a) {
        this.b = [];
        this.a = {};
        for (var b = 0, d = arguments.length; b < d; ++b)this.a[arguments[b]] = ""
    }, K = function (a, b, d) {
        var c = J;
        if (d ? c.a.hasOwnProperty(d) && "" == c.a[d] : 1) {
            n:{
                if (!(1E-4 > Math.random())) {
                    var e = Math.random();
                    if (e < b) {
                        try {
                            var g = new Uint16Array(1);
                            window.crypto.getRandomValues(g);
                            e = g[0] / 65536
                        } catch (h) {
                            e = Math.random()
                        }
                        a = a[Math.floor(e * a.length)];
                        break n
                    }
                }
                a = null
            }
            a && "" != a && (d ? c.a.hasOwnProperty(d) && (c.a[d] = a) : c.b.push(a))
        }
    }, L = function (a) {
        var b = J;
        return b.a.hasOwnProperty(a) ? b.a[a] : ""
    }, M = function () {
        var a =
            J, b = a.b.concat([]);
        m(a.a, function (a) {
            "" != a && b.push(a)
        });
        return b
    };
    var J, N = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_remarketing_only google_remarketing_for_search google_conversion_items google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_is_call google_conversion_page_url".split(" "),
        O = ["google_conversion_first_time", "google_conversion_snippets"];

    function P(a) {
        return null != a ? escape(a.toString()) : ""
    }

    function Q(a) {
        return null != a ? a.toString().substring(0, 512) : ""
    }

    function R(a, b) {
        var d = P(b);
        if ("" != d) {
            var c = P(a);
            if ("" != c)return "&".concat(c, "=", d)
        }
        return ""
    }

    function S(a) {
        var b = typeof a;
        return null == a || "object" == b || "function" == b ? null : String(a).replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/=/g, "\\=")
    }

    function T(a) {
        var b;
        if ((a = a.google_custom_params) && "object" == typeof a && "function" != typeof a.join) {
            var d = [];
            for (b in a)if (Object.prototype.hasOwnProperty.call(a, b)) {
                var c = a[b];
                if (c && "function" == typeof c.join) {
                    for (var e = [], g = 0; g < c.length; ++g) {
                        var h = S(c[g]);
                        null != h && e.push(h)
                    }
                    c = 0 == e.length ? null : e.join(",")
                } else c = S(c);
                (e = S(b)) && null != c && d.push(e + "=" + c)
            }
            b = d.join(";")
        } else b = "";
        return "" == b ? "" : "&".concat("data=", encodeURIComponent(b))
    }

    function U(a) {
        return "number" != typeof a && "string" != typeof a ? "" : P(a.toString())
    }

    function aa(a) {
        if (!a)return "";
        a = a.google_conversion_items;
        if (!a)return "";
        for (var b = [], d = 0, c = a.length; d < c; d++) {
            var e = a[d], g = [];
            e && (g.push(U(e.value)), g.push(U(e.quantity)), g.push(U(e.item_id)), g.push(U(e.adwords_grouping)), g.push(U(e.sku)), b.push("(" + g.join("*") + ")"))
        }
        return 0 < b.length ? "&item=" + b.join("") : ""
    }

    function ba(a, b, d) {
        var c = [];
        if (a) {
            var e = a.screen;
            e && (c.push(R("u_h", e.height)), c.push(R("u_w", e.width)), c.push(R("u_ah", e.availHeight)), c.push(R("u_aw", e.availWidth)), c.push(R("u_cd", e.colorDepth)));
            a.history && c.push(R("u_his", a.history.length))
        }
        d && "function" == typeof d.getTimezoneOffset && c.push(R("u_tz", -d.getTimezoneOffset()));
        b && ("function" == typeof b.javaEnabled && c.push(R("u_java", b.javaEnabled())), b.plugins && c.push(R("u_nplug", b.plugins.length)), b.mimeTypes && c.push(R("u_nmime", b.mimeTypes.length)));
        return c.join("")
    }

    function V(a, b, d) {
        var c = "";
        if (b) {
            var e;
            if (a.top == a)e = 0; else {
                var g = a.location.ancestorOrigins;
                if (g)e = g[g.length - 1] == a.location.origin ? 1 : 2; else {
                    g = a.top;
                    try {
                        var h;
                        if (h = !!g && null != g.location.href)e:{
                            try {
                                l(g.foo);
                                h = !0;
                                break e
                            } catch (la) {
                            }
                            h = !1
                        }
                        e = h
                    } catch (ma) {
                        e = !1
                    }
                    e = e ? 1 : 2
                }
            }
            h = "";
            h = d ? d : 1 == e ? a.top.location.href : a.location.href;
            c += R("frm", e);
            c += R("url", Q(h));
            c += R("ref", Q(b.referrer))
        }
        return c
    }

    function W(a) {
        return "42631044" == (J ? L(2) : "") || a && a.location && a.location.protocol && "https:" == a.location.protocol.toString().toLowerCase() ? "https:" : "http:"
    }

    function X(a) {
        return a.google_remarketing_only ? "googleads.g.doubleclick.net" : a.google_conversion_domain || "www.googleadservices.com"
    }

    function ca(a, b, d, c) {
        var e = "/?";
        "landing" == c.google_conversion_type && (e = "/extclk?");
        var e = W(a) + "//" + X(c) + "/pagead/" + [c.google_remarketing_only ? "viewthroughconversion/" : "conversion/", P(c.google_conversion_id), e, "random=", P(c.google_conversion_time)].join(""), g = d ? q(d) : "0", h;
        n:{
            h = c.google_conversion_language;
            if (null != h) {
                h = h.toString();
                if (2 == h.length) {
                    h = R("hl", h);
                    break n
                }
                if (5 == h.length) {
                    h = R("hl", h.substring(0, 2)) + R("gl", h.substring(3, 5));
                    break n
                }
            }
            h = ""
        }
        a = [R("cv", c.google_conversion_js_version), R("fst",
            c.google_conversion_first_time), R("num", c.google_conversion_snippets), R("fmt", c.google_conversion_format), R("value", c.google_conversion_value), R("currency_code", c.google_conversion_currency), R("label", c.google_conversion_label), R("oid", c.google_conversion_order_id), R("bg", c.google_conversion_color), h, R("guid", "ON"), R("disvt", c.google_disable_viewthrough), R("is_call", c.google_is_call), R("eid", M().join()), aa(c), ba(a, b, c.google_conversion_date), T(c), V(a, d, c.google_conversion_page_url), c.google_remarketing_for_search && !c.google_conversion_domain ? "&srr=n" : "", R("vis", g)].join("");
        return e + a
    }

    function da(a) {
        return {
            ar: 1,
            bg: 1,
            cs: 1,
            da: 1,
            de: 1,
            el: 1,
            en_AU: 1,
            en_US: 1,
            en_GB: 1,
            es: 1,
            et: 1,
            fi: 1,
            fr: 1,
            hi: 1,
            hr: 1,
            hu: 1,
            id: 1,
            is: 1,
            it: 1,
            iw: 1,
            ja: 1,
            ko: 1,
            lt: 1,
            nl: 1,
            no: 1,
            pl: 1,
            pt_BR: 1,
            pt_PT: 1,
            ro: 1,
            ru: 1,
            sk: 1,
            sl: 1,
            sr: 1,
            sv: 1,
            th: 1,
            tl: 1,
            tr: 1,
            vi: 1,
            zh_CN: 1,
            zh_TW: 1
        }[a] ? a + ".html" : "en_US.html"
    }

    var ea = /Android ([01]\.|2\.[01])/i;

    function Y(a, b, d, c) {
        3 != c.google_conversion_format || c.google_remarketing_only || c.google_conversion_domain || J && K("317150500 317150501 317150502 317150503 317150504 317150505".split(" "), w, 1);
        var e = J ? L(1) : "";
        b = ca(a, b, d, c);
        d = function (a, b, c) {
            return '<img height="' + c + '" width="' + b + '" border="0" alt="" src="' + a + '" />'
        };
        return 0 == c.google_conversion_format && null == c.google_conversion_domain ? '<a href="' + (W(a) + "//services.google.com/sitestats/" + da(c.google_conversion_language) + "?cid=" + P(c.google_conversion_id)) +
        '" target="_blank">' + d(b, 135, 27) + "</a>" : 1 < c.google_conversion_snippets || 3 == c.google_conversion_format ? "317150501" == e || "317150502" == e || "317150503" == e || "317150504" == e || "317150505" == e ? d(b, 1, 1) + ('<script src="' + b.replace(/(&|\?)fmt=3(&|$)/, "$1fmt=4&adtest=on$2") + '">\x3c/script>') : d(b, 1, 1) : '<iframe name="google_conversion_frame" title="Google conversion frame" width="' + (2 == c.google_conversion_format ? 200 : 300) + '" height="' + (2 == c.google_conversion_format ? 26 : 13) + '" src="' + b + '" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no">' +
        d(b.replace(/\?random=/, "?frame=0&random="), 1, 1) + "</iframe>"
    }

    function fa() {
        return new Image
    }

    function ga(a, b) {
        var d = fa;
        "function" === typeof a.opt_image_generator && (d = a.opt_image_generator);
        d = d();
        b += R("async", "1");
        d.src = b;
        d.onload = function () {
        }
    }

    function Z(a, b, d) {
        var c;
        c = W(a) + "//www.google.com/ads/user-lists/" + [P(d.google_conversion_id), "/?random=", Math.floor(1E9 * Math.random())].join("");
        c += [R("label", d.google_conversion_label), R("fmt", "3"), V(a, b, d.google_conversion_page_url)].join("");
        ga(d, c)
    }

    function ha(a) {
        if ("landing" == a.google_conversion_type || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough)return !1;
        a.google_conversion_date = new Date;
        a.google_conversion_time = a.google_conversion_date.getTime();
        a.google_conversion_snippets = "number" == typeof a.google_conversion_snippets && 0 < a.google_conversion_snippets ? a.google_conversion_snippets + 1 : 1;
        "number" != typeof a.google_conversion_first_time && (a.google_conversion_first_time = a.google_conversion_time);
        a.google_conversion_js_version =
            "7";
        0 != a.google_conversion_format && 1 != a.google_conversion_format && 2 != a.google_conversion_format && 3 != a.google_conversion_format && (a.google_conversion_format = 1);
        J = new I(1, 2, 3);
        "https:" == W(n) || ea.test(navigator.userAgent) || J && K(["42631043", "42631044"], x, 2);
        return !0
    }

    function ia(a) {
        for (var b = 0; b < N.length; b++)a[N[b]] = null
    }

    function ja(a) {
        for (var b = {}, d = 0; d < N.length; d++)b[N[d]] = a[N[d]];
        for (d = 0; d < O.length; d++)b[O[d]] = a[O[d]];
        return b
    }

    function ka(a) {
        var b = document.getElementsByTagName("head")[0];
        b || (b = document.createElement("head"), document.getElementsByTagName("html")[0].insertBefore(b, document.getElementsByTagName("body")[0]));
        var d = document.createElement("script");
        d.src = W(window) + "//" + X(a) + "/pagead/conversion_debug_overlay.js";
        b.appendChild(d)
    };
    (function (a, b, d) {
        if (a)if (null != /[\?&;]google_debug/.exec(document.URL))ka(a); else {
            try {
                if (ha(a))if (J && K(["3145833456", "3145833457"], y, 3), "3145833457" == (J ? L(3) : "") && 3 == q(d)) {
                    var c = ja(a), e = "google_conversion_" + Math.floor(1E9 * Math.random());
                    d.write('<span id="' + e + '"></span>');
                    u(function () {
                        try {
                            var h = d.getElementById(e);
                            h && (h.innerHTML = Y(a, b, d, c), c.google_remarketing_for_search && !c.google_conversion_domain && Z(a, d, c))
                        } catch (g) {
                        }
                    }, d)
                } else d.write(Y(a, b, d, a)), a.google_remarketing_for_search && !a.google_conversion_domain &&
                Z(a, d, a)
            } catch (g) {
            }
            ia(a)
        }
    })(window, navigator, document);
})();

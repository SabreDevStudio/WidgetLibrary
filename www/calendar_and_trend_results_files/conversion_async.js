(function () {
    var f = this, k = function (a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var e = Object.prototype.toString.call(a);
            if ("[object Window]" == e)return "object";
            if ("[object Array]" == e || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == e || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
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
        for (var e in a)Object.prototype.hasOwnProperty.call(a, e) && b.call(void 0, a[e], e, a)
    };
    var n = window;
    var p;
    n:{
        var u = f.navigator;
        if (u) {
            var y = u.userAgent;
            if (y) {
                p = y;
                break n
            }
        }
        p = ""
    }
    var z = function (a) {
        return -1 != p.indexOf(a)
    };
    var A = z("Opera") || z("OPR"), C = z("Edge") || z("Trident") || z("MSIE"), D = z("Gecko") && !(-1 != p.toLowerCase().indexOf("webkit") && !z("Edge")) && !(z("Trident") || z("MSIE")) && !z("Edge"), E = -1 != p.toLowerCase().indexOf("webkit") && !z("Edge"), F = function () {
        var a = p;
        if (D)return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (C && z("Edge"))return /Edge\/([\d\.]+)/.exec(a);
        if (C)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (E)return /WebKit\/(\S+)/.exec(a)
    };
    (function () {
        if (A && f.opera) {
            var a = f.opera.version;
            return "function" == k(a) ? a() : a
        }
        var a = "", b = F();
        b && (a = b ? b[1] : "");
        return C && !z("Edge") && (b = (b = f.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a
    })();
    var G = function (a) {
        this.b = [];
        this.a = {};
        for (var b = 0, e = arguments.length; b < e; ++b)this.a[arguments[b]] = ""
    }, I = function () {
        var a = H, b = a.b.concat([]);
        m(a.a, function (a) {
            "" != a && b.push(a)
        });
        return b
    };
    var H, M = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_remarketing_only google_remarketing_for_search google_conversion_items google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_is_call google_conversion_page_url".split(" ");

    function N(a) {
        return null != a ? escape(a.toString()) : ""
    }

    function O(a) {
        return null != a ? a.toString().substring(0, 512) : ""
    }

    function P(a, b) {
        var e = N(b);
        if ("" != e) {
            var c = N(a);
            if ("" != c)return "&".concat(c, "=", e)
        }
        return ""
    }

    function Q(a) {
        var b = typeof a;
        return null == a || "object" == b || "function" == b ? null : String(a).replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/=/g, "\\=")
    }

    function R(a) {
        var b;
        if ((a = a.google_custom_params) && "object" == typeof a && "function" != typeof a.join) {
            var e = [];
            for (b in a)if (Object.prototype.hasOwnProperty.call(a, b)) {
                var c = a[b];
                if (c && "function" == typeof c.join) {
                    for (var d = [], g = 0; g < c.length; ++g) {
                        var h = Q(c[g]);
                        null != h && d.push(h)
                    }
                    c = 0 == d.length ? null : d.join(",")
                } else c = Q(c);
                (d = Q(b)) && null != c && e.push(d + "=" + c)
            }
            b = e.join(";")
        } else b = "";
        return "" == b ? "" : "&".concat("data=", encodeURIComponent(b))
    }

    function S(a) {
        return "number" != typeof a && "string" != typeof a ? "" : N(a.toString())
    }

    function T(a) {
        if (!a)return "";
        a = a.google_conversion_items;
        if (!a)return "";
        for (var b = [], e = 0, c = a.length; e < c; e++) {
            var d = a[e], g = [];
            d && (g.push(S(d.value)), g.push(S(d.quantity)), g.push(S(d.item_id)), g.push(S(d.adwords_grouping)), g.push(S(d.sku)), b.push("(" + g.join("*") + ")"))
        }
        return 0 < b.length ? "&item=" + b.join("") : ""
    }

    function U(a, b, e) {
        var c = [];
        if (a) {
            var d = a.screen;
            d && (c.push(P("u_h", d.height)), c.push(P("u_w", d.width)), c.push(P("u_ah", d.availHeight)), c.push(P("u_aw", d.availWidth)), c.push(P("u_cd", d.colorDepth)));
            a.history && c.push(P("u_his", a.history.length))
        }
        e && "function" == typeof e.getTimezoneOffset && c.push(P("u_tz", -e.getTimezoneOffset()));
        b && ("function" == typeof b.javaEnabled && c.push(P("u_java", b.javaEnabled())), b.plugins && c.push(P("u_nplug", b.plugins.length)), b.mimeTypes && c.push(P("u_nmime", b.mimeTypes.length)));
        return c.join("")
    }

    function V(a, b, e) {
        var c = "";
        if (b) {
            var d;
            if (a.top == a)d = 0; else {
                var g = a.location.ancestorOrigins;
                if (g)d = g[g.length - 1] == a.location.origin ? 1 : 2; else {
                    g = a.top;
                    try {
                        var h;
                        if (h = !!g && null != g.location.href)r:{
                            try {
                                l(g.foo);
                                h = !0;
                                break r
                            } catch (q) {
                            }
                            h = !1
                        }
                        d = h
                    } catch (B) {
                        d = !1
                    }
                    d = d ? 1 : 2
                }
            }
            h = "";
            h = e ? e : 1 == d ? a.top.location.href : a.location.href;
            c += P("frm", d);
            c += P("url", O(h));
            c += P("ref", O(b.referrer))
        }
        return c
    }

    function W(a) {
        var b;
        H ? (b = H, b = b.a.hasOwnProperty(2) ? b.a[2] : "") : b = "";
        return "42631044" == b || a && a.location && a.location.protocol && "https:" == a.location.protocol.toString().toLowerCase() ? "https:" : "http:"
    }

    var X = /Android ([01]\.|2\.[01])/i;

    function Y() {
        return new Image
    }

    function Z(a, b, e) {
        var c = Y;
        "function" === typeof a.opt_image_generator && (c = a.opt_image_generator);
        c = c();
        b += P("async", "1");
        c.src = b;
        c.onload = e && "function" === typeof a.onload_callback ? a.onload_callback : function () {
        }
    }

    function aa(a) {
        for (var b = window, e = {}, c = function (c) {
            e[c] = a && null != a[c] ? a[c] : b[c]
        }, d = 0; d < M.length; d++)c(M[d]);
        c("onload_callback");
        return e
    };
    window.google_trackConversion = function (a) {
        a = aa(a);
        a.google_conversion_format = 3;
        var b;
        var e = window, c = navigator, d = document, g = !1;
        if (a && 3 == a.google_conversion_format) {
            try {
                var h;
                if ("landing" == a.google_conversion_type || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough)h = !1; else {
                    a.google_conversion_date = new Date;
                    a.google_conversion_time = a.google_conversion_date.getTime();
                    a.google_conversion_snippets = "number" == typeof a.google_conversion_snippets && 0 < a.google_conversion_snippets ?
                    a.google_conversion_snippets + 1 : 1;
                    "number" != typeof a.google_conversion_first_time && (a.google_conversion_first_time = a.google_conversion_time);
                    a.google_conversion_js_version = "7";
                    0 != a.google_conversion_format && 1 != a.google_conversion_format && 2 != a.google_conversion_format && 3 != a.google_conversion_format && (a.google_conversion_format = 1);
                    H = new G(1, 2, 3);
                    if ("https:" != W(n) && !X.test(navigator.userAgent) && H) {
                        var q = H, B = ["42631043", "42631044"];
                        if (q.a.hasOwnProperty(2) && "" == q.a[2]) {
                            var r;
                            r:{
                                if (!(1E-4 > Math.random())) {
                                    var v =
                                        Math.random();
                                    if (0 > v) {
                                        try {
                                            var J = new Uint16Array(1);
                                            window.crypto.getRandomValues(J);
                                            v = J[0] / 65536
                                        } catch (ca) {
                                            v = Math.random()
                                        }
                                        r = B[Math.floor(v * B.length)];
                                        break r
                                    }
                                }
                                r = null
                            }
                            r && "" != r && q.a.hasOwnProperty(2) && (q.a[2] = r)
                        }
                    }
                    h = !0
                }
                if (h) {
                    h = "/?";
                    "landing" == a.google_conversion_type && (h = "/extclk?");
                    var K;
                    K = W(e) + "//" + (a.google_remarketing_only ? "googleads.g.doubleclick.net" : a.google_conversion_domain || "www.googleadservices.com") + "/pagead/" + [a.google_remarketing_only ? "viewthroughconversion/" : "conversion/", N(a.google_conversion_id),
                        h, "random=", N(a.google_conversion_time)].join("");
                    var ba = d ? {
                        visible: 1,
                        hidden: 2,
                        prerender: 3,
                        preview: 4
                    }[d.webkitVisibilityState || d.mozVisibilityState || d.visibilityState || ""] || 0 : "0", w;
                    e:{
                        var L = a.google_conversion_language;
                        if (null != L) {
                            var t = L.toString();
                            if (2 == t.length) {
                                w = P("hl", t);
                                break e
                            }
                            if (5 == t.length) {
                                w = P("hl", t.substring(0, 2)) + P("gl", t.substring(3, 5));
                                break e
                            }
                        }
                        w = ""
                    }
                    b = [P("cv", a.google_conversion_js_version), P("fst", a.google_conversion_first_time), P("num", a.google_conversion_snippets), P("fmt", a.google_conversion_format),
                        P("value", a.google_conversion_value), P("currency_code", a.google_conversion_currency), P("label", a.google_conversion_label), P("oid", a.google_conversion_order_id), P("bg", a.google_conversion_color), w, P("guid", "ON"), P("disvt", a.google_disable_viewthrough), P("is_call", a.google_is_call), P("eid", I().join()), T(a), U(e, c, a.google_conversion_date), R(a), V(e, d, a.google_conversion_page_url), a.google_remarketing_for_search && !a.google_conversion_domain ? "&srr=n" : "", P("vis", ba)].join("");
                    Z(a, K + b, !0);
                    if (a.google_remarketing_for_search && !a.google_conversion_domain) {
                        var x;
                        x = W(e) + "//www.google.com/ads/user-lists/" + [N(a.google_conversion_id), "/?random=", Math.floor(1E9 * Math.random())].join("");
                        x += [P("label", a.google_conversion_label), P("fmt", "3"), V(e, d, a.google_conversion_page_url)].join("");
                        Z(a, x, !1)
                    }
                    g = !0
                }
            } catch (da) {
            }
            b = g
        } else b = !1;
        return b
    };
})();

(function () {
    var g, l = this, aa = function (a, c) {
        var b = a.split("."), d = l;
        b[0]in d || !d.execScript || d.execScript("var " + b[0]);
        for (var e; b.length && (e = b.shift());)b.length || void 0 === c ? d = d[e] ? d[e] : d[e] = {} : d[e] = c
    }, ba = function (a) {
        a.ha = function () {
            return a.rb ? a.rb : a.rb = new a
        }
    }, ca = function (a) {
        var c = typeof a;
        if ("object" == c)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return c;
            var b = Object.prototype.toString.call(a);
            if ("[object Window]" == b)return "object";
            if ("[object Array]" == b || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == b || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else return "null"; else if ("function" == c && "undefined" == typeof a.call)return "object";
        return c
    }, p = function (a) {
        return "string" == typeof a
    }, da = function (a) {
        return "function" == ca(a)
    }, ea = function (a, c, b) {
        return a.call.apply(a.bind, arguments)
    }, fa = function (a,
                      c, b) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var b = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(b, d);
                return a.apply(c, b)
            }
        }
        return function () {
            return a.apply(c, arguments)
        }
    }, q = function (a, c, b) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ea : fa;
        return q.apply(null, arguments)
    }, u = Date.now || function () {
            return +new Date
        }, ga = function (a, c) {
        function b() {
        }

        b.prototype = c.prototype;
        a.pc =
            c.prototype;
        a.prototype = new b;
        a.prototype.constructor = a;
        a.wc = function (a, b, f) {
            for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++)h[k - 2] = arguments[k];
            return c.prototype[b].apply(a, h)
        }
    };
    var ha = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, qa = function (a) {
            if (!ia.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(ka, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(la, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(ma, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(na, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(oa, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(pa, "&#0;"));
            return a
        }, ka = /&/g, la = /</g, ma = />/g, na = /"/g, oa = /'/g, pa = /\x00/g, ia = /[\x00&<>"']/,
        ra = function (a, c) {
            return a < c ? -1 : a > c ? 1 : 0
        }, sa = function (a) {
            return String(a).replace(/\-([a-z])/g, function (a, b) {
                return b.toUpperCase()
            })
        }, ta = function (a) {
            var c = p(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function (a, c, e) {
                return c + e.toUpperCase()
            })
        };
    var ua = function (a) {
        ua[" "](a);
        return a
    };
    ua[" "] = function () {
    };
    var va = document, v = window;
    var wa = function (a, c) {
        for (var b in a)Object.prototype.hasOwnProperty.call(a, b) && c.call(null, a[b], b, a)
    }, y = function (a, c, b, d) {
        b = q(d, b);
        a.addEventListener ? a.addEventListener(c, b, !1) : a.attachEvent && a.attachEvent("on" + c, b)
    };
    var xa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), ya = function (a, c) {
        for (var b, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (b in d)a[b] = d[b];
            for (var f = 0; f < xa.length; f++)b = xa[f], Object.prototype.hasOwnProperty.call(d, b) && (a[b] = d[b])
        }
    }, za = function (a) {
        var c = arguments.length;
        if (1 == c && "array" == ca(arguments[0]))return za.apply(null, arguments[0]);
        for (var b = {}, d = 0; d < c; d++)b[arguments[d]] = !0;
        return b
    };
    var Aa = function () {
        this.B = {}
    };
    ba(Aa);
    var Ba = "undefined" != typeof DOMTokenList, Ca = function (a, c, b) {
        a = a.classList;
        b == a.contains(c) && a.toggle(c)
    }, Da = function (a, c) {
        var b = a.className;
        if (b) {
            for (var b = b.split(/\s+/), d = !1, e = 0; e < b.length && !d; ++e)d = b[e] == c;
            d || (b.push(c), a.className = b.join(" "))
        } else a.className = c
    }, Ea = function (a, c) {
        var b = a.className;
        if (b && !(0 > b.indexOf(c))) {
            for (var b = b.split(/\s+/), d = 0; d < b.length; ++d)b[d] == c && b.splice(d--, 1);
            a.className = b.join(" ")
        }
    };
    var Fa = function (a, c) {
        var b = parseInt(a, 10);
        return isNaN(b) ? c : b
    };
    var Ga = {}, Ja = function (a) {
            try {
                if (.01 > Math.random()) {
                    var c = "/pagead/gen_204?id=jserror" + Ia(a), b = "http" + ("http:" == v.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c, b = b.substring(0, 2E3);
                    v.google_image_requests || (v.google_image_requests = []);
                    var d = v.document.createElement("img");
                    d.src = b;
                    v.google_image_requests.push(d)
                }
            } catch (e) {
            }
        }, La = function (a, c) {
            try {
                var b, d = a.toString();
                a.name && -1 == d.indexOf(a.name) && (d += ": " + a.name);
                a.message && -1 == d.indexOf(a.message) && (d += ": " + a.message);
                if (a.stack) {
                    var e =
                        a.stack, f = d;
                    try {
                        -1 == e.indexOf(f) && (e = f + "\n" + e);
                        for (var h; e != h;)h = e, e = e.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                        d = e.replace(/\n */g, "\n")
                    } catch (k) {
                        d = f
                    }
                }
                b = d;
                d = "";
                a.fileName && (d = a.fileName);
                e = -1;
                a.lineNumber && (e = a.lineNumber);
                f = {};
                if (c)try {
                    c(f)
                } catch (t) {
                }
                f.context = "iaf::mute";
                f.msg = b.substring(0, 512);
                d && (f.file = d);
                0 < e && (f.line = e.toString());
                f.url = va.URL.substring(0, 512);
                f.ref = va.referrer.substring(0, 512);
                Ka(f);
                Ja(f)
            } catch (P) {
                Ja({context: "mRE", msg: P.toString() + "\n" + (P.stack || "")})
            }
        },
        Ka = function (a) {
            var c = a || {};
            wa(Ga, function (a, d) {
                c[d] = v[a]
            })
        }, Ia = function (a) {
            var c = "";
            wa(a, function (a, d) {
                if (0 === a || a)c += "&" + d + "=" + ("function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a))
            });
            return c
        };
    var Ma = Array.prototype, Na = Ma.indexOf ? function (a, c, b) {
        return Ma.indexOf.call(a, c, b)
    } : function (a, c, b) {
        b = null == b ? 0 : 0 > b ? Math.max(0, a.length + b) : b;
        if (p(a))return p(c) && 1 == c.length ? a.indexOf(c, b) : -1;
        for (; b < a.length; b++)if (b in a && a[b] === c)return b;
        return -1
    };
    za("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    var Pa = function () {
        this.nc = "";
        this.Qb = Oa
    }, Oa = {};
    var Ra = function () {
        this.Ra = "";
        this.Rb = Qa
    };
    Ra.prototype.nb = function () {
        return 1
    };
    var Qa = {};
    var Ta = function () {
        this.Ra = "";
        this.Pb = Sa;
        this.$b = null
    };
    Ta.prototype.nb = function () {
        return this.$b
    };
    za("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    za("embed", "iframe", "link", "object", "script", "style", "template");
    var Sa = {};
    var z;
    i:{
        var Ua = l.navigator;
        if (Ua) {
            var Va = Ua.userAgent;
            if (Va) {
                z = Va;
                break i
            }
        }
        z = ""
    }
    ;
    var A = function () {
        return -1 != z.indexOf("Edge")
    };
    var Wa = -1 != z.indexOf("Opera") || -1 != z.indexOf("OPR"), B = -1 != z.indexOf("Edge") || -1 != z.indexOf("Trident") || -1 != z.indexOf("MSIE"), C = -1 != z.indexOf("Gecko") && !(-1 != z.toLowerCase().indexOf("webkit") && !A()) && !(-1 != z.indexOf("Trident") || -1 != z.indexOf("MSIE")) && !A(), D = -1 != z.toLowerCase().indexOf("webkit") && !A(), Xa = function () {
        var a = z;
        if (C)return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (B && A())return /Edge\/([\d\.]+)/.exec(a);
        if (B)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (D)return /WebKit\/(\S+)/.exec(a)
    }, Ya = function () {
        var a =
            l.document;
        return a ? a.documentMode : void 0
    }, Za = function () {
        if (Wa && l.opera) {
            var a = l.opera.version;
            return da(a) ? a() : a
        }
        var a = "", c = Xa();
        c && (a = c ? c[1] : "");
        return B && !A() && (c = Ya(), c > parseFloat(a)) ? String(c) : a
    }(), $a = {}, E = function (a) {
        var c;
        if (!(c = $a[a])) {
            c = 0;
            for (var b = ha(String(Za)).split("."), d = ha(String(a)).split("."), e = Math.max(b.length, d.length), f = 0; 0 == c && f < e; f++) {
                var h = b[f] || "", k = d[f] || "", t = RegExp("(\\d*)(\\D*)", "g"), P = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var I = t.exec(h) || ["", "", ""], J = P.exec(k) || ["", "", ""];
                    if (0 ==
                        I[0].length && 0 == J[0].length)break;
                    c = ra(0 == I[1].length ? 0 : parseInt(I[1], 10), 0 == J[1].length ? 0 : parseInt(J[1], 10)) || ra(0 == I[2].length, 0 == J[2].length) || ra(I[2], J[2])
                } while (0 == c)
            }
            c = $a[a] = 0 <= c
        }
        return c
    }, ab = l.document, bb = Ya(), cb = !ab || !B || !bb && A() ? void 0 : bb || ("CSS1Compat" == ab.compatMode ? parseInt(Za, 10) : 5);
    !C && !B || B && B && (A() || 9 <= cb) || C && E("1.9.1");
    B && E("9");
    var F = function (a) {
        var c = document;
        return p(a) ? c.getElementById(a) : a
    }, db = function (a, c) {
        if ("textContent"in a)a.textContent = c; else if (3 == a.nodeType)a.data = c; else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild;)a.removeChild(a.lastChild);
            a.firstChild.data = c
        } else {
            for (var b; b = a.firstChild;)a.removeChild(b);
            a.appendChild((9 == a.nodeType ? a : a.ownerDocument || a.document).createTextNode(String(c)))
        }
    };
    B && E(8);
    var eb = {}, fb = {}, gb = {}, ib = {}, jb = {}, G = function () {
        throw Error("Do not instantiate directly");
    };
    G.prototype.Ja = null;
    G.prototype.toString = function () {
        return this.content
    };
    var nb = function (a, c, b) {
        a.innerHTML = kb(c(b || lb, void 0, void 0))
    }, kb = function (a) {
        var c = typeof a;
        if (("object" != c || null == a) && "function" != c)return String(a);
        if (a instanceof G) {
            if (a.J === eb)return a.content;
            if (a.J === jb)return qa(a.content)
        }
        return "zSoyz"
    }, lb = {};
    var ob = function (a) {
        if (null != a)switch (a.Ja) {
            case 1:
                return 1;
            case -1:
                return -1;
            case 0:
                return 0
        }
        return null
    }, pb = function () {
        G.call(this)
    };
    ga(pb, G);
    pb.prototype.J = eb;
    var H = function (a) {
        return null != a && a.J === eb ? a : a instanceof Ta ? qb(a instanceof Ta && a.constructor === Ta && a.Pb === Sa ? a.Ra : "type_error:SafeHtml", a.nb()) : qb(qa(String(String(a))), ob(a))
    }, qb = function (a) {
        function c(a) {
            this.content = a
        }

        c.prototype = a.prototype;
        return function (a, d) {
            var e = new c(String(a));
            void 0 !== d && (e.Ja = d);
            return e
        }
    }(pb);
    (function (a) {
        function c(a) {
            this.content = a
        }

        c.prototype = a.prototype;
        return function (a, d) {
            var e = String(a);
            if (!e)return "";
            e = new c(e);
            void 0 !== d && (e.Ja = d);
            return e
        }
    })(pb);
    var K = function (a) {
            null != a && a.J === eb ? (a = String(a.content).replace(rb, "").replace(sb, "&lt;"), a = String(a).replace(tb, ub)) : a = qa(String(a));
            return a
        }, xb = function (a) {
            if (null == a)return " null ";
            if (null != a && a.J === fb)return a.content;
            switch (typeof a) {
                case "boolean":
                case "number":
                    return " " + a + " ";
                default:
                    return "'" + String(String(a)).replace(vb, wb) + "'"
            }
        }, Bb = function (a) {
            null != a && a.J === gb ? a = String(a).replace(yb, zb) : a instanceof Ra ? (a = a instanceof Ra && a.constructor === Ra && a.Rb === Qa ? a.Ra : "type_error:SafeUrl", a = String(a).replace(yb,
                zb)) : (a = String(a), a = Ab.test(a) ? a.replace(yb, zb) : "#zSoyz");
            return a
        }, L = function (a) {
            null != a && a.J === ib ? a = a.content : null == a ? a = "" : a instanceof Pa ? a = a instanceof Pa && a.constructor === Pa && a.Qb === Oa ? a.nc : "type_error:SafeStyle" : (a = String(a), a = Cb.test(a) ? a : "zSoyz");
            return a
        }, Db = {
            "\x00": "&#0;",
            "\t": "&#9;",
            "\n": "&#10;",
            "\x0B": "&#11;",
            "\f": "&#12;",
            "\r": "&#13;",
            " ": "&#32;",
            '"': "&quot;",
            "&": "&amp;",
            "'": "&#39;",
            "-": "&#45;",
            "/": "&#47;",
            "<": "&lt;",
            "=": "&#61;",
            ">": "&gt;",
            "`": "&#96;",
            "\u0085": "&#133;",
            "\u00a0": "&#160;",
            "\u2028": "&#8232;",
            "\u2029": "&#8233;"
        }, ub = function (a) {
            return Db[a]
        }, Eb = {
            "\x00": "\\x00",
            "\b": "\\x08",
            "\t": "\\t",
            "\n": "\\n",
            "\x0B": "\\x0b",
            "\f": "\\f",
            "\r": "\\r",
            '"': "\\x22",
            $: "\\x24",
            "&": "\\x26",
            "'": "\\x27",
            "(": "\\x28",
            ")": "\\x29",
            "*": "\\x2a",
            "+": "\\x2b",
            ",": "\\x2c",
            "-": "\\x2d",
            ".": "\\x2e",
            "/": "\\/",
            ":": "\\x3a",
            "<": "\\x3c",
            "=": "\\x3d",
            ">": "\\x3e",
            "?": "\\x3f",
            "[": "\\x5b",
            "\\": "\\\\",
            "]": "\\x5d",
            "^": "\\x5e",
            "{": "\\x7b",
            "|": "\\x7c",
            "}": "\\x7d",
            "\u0085": "\\x85",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
        }, wb =
            function (a) {
                return Eb[a]
            }, Fb = {
            "\x00": "%00",
            "\u0001": "%01",
            "\u0002": "%02",
            "\u0003": "%03",
            "\u0004": "%04",
            "\u0005": "%05",
            "\u0006": "%06",
            "\u0007": "%07",
            "\b": "%08",
            "\t": "%09",
            "\n": "%0A",
            "\x0B": "%0B",
            "\f": "%0C",
            "\r": "%0D",
            "\u000e": "%0E",
            "\u000f": "%0F",
            "\u0010": "%10",
            "\u0011": "%11",
            "\u0012": "%12",
            "\u0013": "%13",
            "\u0014": "%14",
            "\u0015": "%15",
            "\u0016": "%16",
            "\u0017": "%17",
            "\u0018": "%18",
            "\u0019": "%19",
            "\u001a": "%1A",
            "\u001b": "%1B",
            "\u001c": "%1C",
            "\u001d": "%1D",
            "\u001e": "%1E",
            "\u001f": "%1F",
            " ": "%20",
            '"': "%22",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "<": "%3C",
            ">": "%3E",
            "\\": "%5C",
            "{": "%7B",
            "}": "%7D",
            "\u007f": "%7F",
            "\u0085": "%C2%85",
            "\u00a0": "%C2%A0",
            "\u2028": "%E2%80%A8",
            "\u2029": "%E2%80%A9",
            "\uff01": "%EF%BC%81",
            "\uff03": "%EF%BC%83",
            "\uff04": "%EF%BC%84",
            "\uff06": "%EF%BC%86",
            "\uff07": "%EF%BC%87",
            "\uff08": "%EF%BC%88",
            "\uff09": "%EF%BC%89",
            "\uff0a": "%EF%BC%8A",
            "\uff0b": "%EF%BC%8B",
            "\uff0c": "%EF%BC%8C",
            "\uff0f": "%EF%BC%8F",
            "\uff1a": "%EF%BC%9A",
            "\uff1b": "%EF%BC%9B",
            "\uff1d": "%EF%BC%9D",
            "\uff1f": "%EF%BC%9F",
            "\uff20": "%EF%BC%A0",
            "\uff3b": "%EF%BC%BB",
            "\uff3d": "%EF%BC%BD"
        }, zb = function (a) {
            return Fb[a]
        }, tb = /[\x00\x22\x27\x3c\x3e]/g, vb = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g, yb = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g, Cb = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i, Ab = /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
        rb = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g, sb = /</g;
    var Gb = function (a) {
        a = a || {};
        var c = "" + (a.Y ? "#333" : "#f1f2f2"), b = "" + (a.Y ? "#333" : "#fff"), d = "" + (a.Y ? "#fff" : "#333"), e = "" + (a.Y ? "#ccc" : "#999"), f = "" + (a.Y ? "#e5e5e5" : "#666"), h = 2 < a.l / a.k, k = 2 < a.k / a.l, t = (60 < a.k ? "12" : "11") + "px";
        return a = "" + ('<div id="info_container"><ul><li><div id="back_section" class="back_border" onclick="handleClick(\'backClick\', event)">' + ('<img src="' + K(Bb(a.S.ab)) + '" />') + '</div></li><li><div id="info_content"></div></li></ul></div><div id="border_overlay"></div><style>#info_container * {box-sizing:border-box; -moz-box-sizing:border-box; -webkit-box-sizing:border-box;}#info_container > ul {list-style-type:none; margin:0; padding:0;}' +
        (k ? "" : "#info_container > ul > li {float:left;}") + (h ? ".inline {float:left;}" : "") + ".back_border {" + (k ? "border-bottom:1px solid #ccc;" : "border-right:1px solid #ccc;") + "}.opt_border {" + (h ? "border-left:1px solid #ccc;border-right:1px solid #ccc;" : "border-bottom:1px solid #ccc;border-top:1px solid #ccc;") + "}.opt_border_last {" + (k ? "border-bottom:1px solid #ccc;" : "") + "}.mn_opt {color:" + L("#39c") + "; display:table;" + (h ? "height:" + L(a.k) + "px;" : "width:" + (k ? L(a.l) : L(a.l - 30)) + "px;") + (60 >= a.k ? "line-height:11px;" :
            "") + "padding:0 5px;}.cell {display:table-cell; position:relative; width:inherit;}.conf {color:" + L(e) + ";" + (k ? "padding:5px 10px;" : "padding-left:" + (16E3 < a.k * a.l ? "10" : "5") + "px;") + (k ? "" : "vertical-align:middle;") + "}.header {color:" + L(d) + "; margin-bottom:" + (50 > a.k ? "0" : "5") + "px;}.fb_opt{color:" + L("#39c") + "; padding:" + (50 > a.k ? "2" : "5") + "px 0; position:relative;" + (h ? "" : "width:" + (k ? L(a.l) : L(a.l - 30)) + "px;") + "}.opt_tappable{position:absolute; margin:" + (h ? "0 " + L("5px") + ";" : L("5px") + " 0;") + "bottom:0; left:0; right:0; top:0;}.center{text-align:center;}.middle{vertical-align:middle;}.athird{" +
        (h ? "width" : "height") + ":" + (k ? "15%" : "33%") + ";}#survey_page {display:table-cell;" + (k ? "" : "vertical-align:middle;") + "}#info_card {font:bold " + L(t) + " Roboto; height:" + L(a.k) + "px;" + L(a.dc) + ":" + L(-a.l) + "px; position:absolute;" + L(a.vc) + ":" + L(-a.k) + "px; width:" + L(a.l) + "px; z-index:9100;}#back_section{background-color:" + L(c) + "; opacity:1.0; width:" + (k ? L(a.l) : "30") + "px; height:" + (k ? "30" : L(a.k)) + "px; display:table-cell; vertical-align:middle; text-align:center;}#back_section.hidden{display:none;}#countdown {color:" +
        L(f) + ";}#info_container {display:-webkit-box; height:" + L(a.k) + "px; -webkit-box-orient:vertical; -webkit-box-pack:center; width:" + L(a.l) + "px;}#info_content {background-color:" + L(b) + "; display:table; height:" + (k ? L(a.k - 30) : L(a.k)) + "px; opacity:0.97; position:relative; width:" + (k ? L(a.l) : L(a.l - 30)) + "px;}#info_content.expand{height:" + L(a.k) + "px; width:" + L(a.l) + "px;}#border_overlay {border:1px solid #ccc; bottom:0; left:0; pointer-events:none; position:absolute; right:0; top:0;}</style>")
    }, Hb = function (a) {
        a =
            a || {};
        return '<div class="inline center athird mn_opt"><div class="cell middle"><img src="' + K(Bb(a.Tb)) + '" /><div class="fb_opt_txt">' + H(a.Vb) + '</div><div class="opt_tappable" onclick="handleClick(\'attributionClick\', event)"></div></div></div><div class="inline center athird mn_opt opt_border"><div class="cell middle"><img src="' + K(Bb(a.S.Gb)) + '" /><div class="fb_opt_txt">' + H(a.S.Hb) + '</div><div class="opt_tappable" onclick="handleClick(\'pubMuteClick\', event)"></div></div></div><div class="inline center athird mn_opt opt_border_last"><div class="cell middle"><img src="' +
            K(Bb(a.S.yb)) + '" /><div class="fb_opt_txt">' + H(a.S.zb) + '</div><div class="opt_tappable" onclick="handleClick(\'adMuteClick\', event)"></div></div></div>'
    }, Ib = function (a) {
        a = a || {};
        var c = '<div id="survey_page"><div class="header center">' + H(a.qc) + "</div>";
        a = a.rc;
        for (var b = a.length, d = 0; d < b; d++) {
            var e = '<div class="inline athird center fb_opt ' + (0 != d ? "opt_border" : "") + (d == b - 1 ? "_last" : "") + '"><div style="display:table;width:100%;height:100%"><div class="cell middle">', f;
            f = a[d].text();
            f = H(f);
            c += e + f + '</div></div><div class="opt_tappable" onclick="handleClick(\'surveyOptionClick\', event, ' +
            K(xb(d)) + ')"></div></div>'
        }
        return c + "</div>"
    }, Jb = function (a) {
        a = a || {};
        return '<div class="cell conf"><div class="header">' + H(a.bc) + ' <a id="undo_link" class="fb_opt" onclick="handleClick(\'undoClick\', event)">' + H(a.uc) + "</a></div>" + H(a.text) + ' <span id="countdown" style="display:none"></span></div>'
    };
    var Kb = function (a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (c) {
        }
        throw Error("Invalid JSON string: " + a);
    };
    var M = function (a, c, b) {
        if (p(c))(c = Lb(a, c)) && (a.style[c] = b); else for (var d in c) {
            b = a;
            var e = c[d], f = Lb(b, d);
            f && (b.style[f] = e)
        }
    }, Mb = {}, Lb = function (a, c) {
        var b = Mb[c];
        if (!b) {
            var d = sa(c), b = d;
            void 0 === a.style[d] && (d = (D ? "Webkit" : C ? "Moz" : B ? "ms" : Wa ? "O" : null) + ta(d), void 0 !== a.style[d] && (b = d));
            Mb[c] = b
        }
        return b
    };
    var Nb = function () {
        this.jb = this.jb;
        this.ic = this.ic
    };
    Nb.prototype.jb = !1;
    var N = function (a, c) {
        this.type = a;
        this.currentTarget = this.target = c;
        this.defaultPrevented = this.P = !1;
        this.Ib = !0
    };
    N.prototype.preventDefault = function () {
        this.defaultPrevented = !0;
        this.Ib = !1
    };
    var Ob = !B || B && (A() || 9 <= cb), Pb = B && !E("9");
    !D || E("528");
    C && E("1.9b") || B && E("8") || Wa && E("9.5") || D && E("528");
    C && !E("8") || B && E("9");
    var O = function (a, c) {
        N.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.lb = this.state = null;
        if (a) {
            var b = this.type = a.type;
            this.target = a.target || a.srcElement;
            this.currentTarget = c;
            var d = a.relatedTarget;
            if (d) {
                if (C) {
                    var e;
                    i:{
                        try {
                            ua(d.nodeName);
                            e = !0;
                            break i
                        } catch (f) {
                        }
                        e = !1
                    }
                    e || (d = null)
                }
            } else"mouseover" ==
            b ? d = a.fromElement : "mouseout" == b && (d = a.toElement);
            this.relatedTarget = d;
            this.offsetX = D || void 0 !== a.offsetX ? a.offsetX : a.layerX;
            this.offsetY = D || void 0 !== a.offsetY ? a.offsetY : a.layerY;
            this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
            this.screenX = a.screenX || 0;
            this.screenY = a.screenY || 0;
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.charCode = a.charCode || ("keypress" == b ? a.keyCode : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey =
                a.metaKey;
            this.state = a.state;
            this.lb = a;
            a.defaultPrevented && this.preventDefault()
        }
    };
    ga(O, N);
    O.prototype.preventDefault = function () {
        O.pc.preventDefault.call(this);
        var a = this.lb;
        if (a.preventDefault)a.preventDefault(); else if (a.returnValue = !1, Pb)try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)a.keyCode = -1
        } catch (c) {
        }
    };
    var Qb = "closure_listenable_" + (1E6 * Math.random() | 0), Rb = 0;
    var Sb = function (a, c, b, d, e) {
        this.K = a;
        this.wa = null;
        this.src = c;
        this.type = b;
        this.da = !!d;
        this.ia = e;
        this.key = ++Rb;
        this.Q = this.ca = !1
    }, Tb = function (a) {
        a.Q = !0;
        a.K = null;
        a.wa = null;
        a.src = null;
        a.ia = null
    };
    var Q = function (a) {
        this.src = a;
        this.o = {};
        this.Da = 0
    };
    Q.prototype.add = function (a, c, b, d, e) {
        var f = a.toString();
        a = this.o[f];
        a || (a = this.o[f] = [], this.Da++);
        var h = Ub(a, c, d, e);
        -1 < h ? (c = a[h], b || (c.ca = !1)) : (c = new Sb(c, this.src, f, !!d, e), c.ca = b, a.push(c));
        return c
    };
    Q.prototype.remove = function (a, c, b, d) {
        a = a.toString();
        if (!(a in this.o))return !1;
        var e = this.o[a];
        c = Ub(e, c, b, d);
        return -1 < c ? (Tb(e[c]), Ma.splice.call(e, c, 1), 0 == e.length && (delete this.o[a], this.Da--), !0) : !1
    };
    var Vb = function (a, c) {
        var b = c.type;
        if (b in a.o) {
            var d = a.o[b], e = Na(d, c), f;
            (f = 0 <= e) && Ma.splice.call(d, e, 1);
            f && (Tb(c), 0 == a.o[b].length && (delete a.o[b], a.Da--))
        }
    };
    Q.prototype.Ma = function (a, c, b, d) {
        a = this.o[a.toString()];
        var e = -1;
        a && (e = Ub(a, c, b, d));
        return -1 < e ? a[e] : null
    };
    var Ub = function (a, c, b, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.Q && f.K == c && f.da == !!b && f.ia == d)return e
        }
        return -1
    };
    var Wb = "closure_lm_" + (1E6 * Math.random() | 0), Xb = {}, Yb = 0, Zb = function (a, c, b, d, e) {
        if ("array" == ca(c))for (var f = 0; f < c.length; f++)Zb(a, c[f], b, d, e); else if (b = $b(b), a && a[Qb])a.listen(c, b, d, e); else {
            if (!c)throw Error("Invalid event type");
            var f = !!d, h = bc(a);
            h || (a[Wb] = h = new Q(a));
            b = h.add(c, b, !1, d, e);
            b.wa || (d = cc(), b.wa = d, d.src = a, d.K = b, a.addEventListener ? a.addEventListener(c.toString(), d, f) : a.attachEvent(dc(c.toString()), d), Yb++)
        }
    }, cc = function () {
        var a = ec, c = Ob ? function (b) {
            return a.call(c.src, c.K, b)
        } : function (b) {
            b =
                a.call(c.src, c.K, b);
            if (!b)return b
        };
        return c
    }, fc = function (a, c, b, d, e) {
        if ("array" == ca(c))for (var f = 0; f < c.length; f++)fc(a, c[f], b, d, e); else b = $b(b), a && a[Qb] ? a.unlisten(c, b, d, e) : a && (a = bc(a)) && (c = a.Ma(c, b, !!d, e)) && gc(c)
    }, gc = function (a) {
        if ("number" != typeof a && a && !a.Q) {
            var c = a.src;
            if (c && c[Qb])Vb(c.N, a); else {
                var b = a.type, d = a.wa;
                c.removeEventListener ? c.removeEventListener(b, d, a.da) : c.detachEvent && c.detachEvent(dc(b), d);
                Yb--;
                (b = bc(c)) ? (Vb(b, a), 0 == b.Da && (b.src = null, c[Wb] = null)) : Tb(a)
            }
        }
    }, dc = function (a) {
        return a in
        Xb ? Xb[a] : Xb[a] = "on" + a
    }, ic = function (a, c, b, d) {
        var e = !0;
        if (a = bc(a))if (c = a.o[c.toString()])for (c = c.concat(), a = 0; a < c.length; a++) {
            var f = c[a];
            f && f.da == b && !f.Q && (f = hc(f, d), e = e && !1 !== f)
        }
        return e
    }, hc = function (a, c) {
        var b = a.K, d = a.ia || a.src;
        a.ca && gc(a);
        return b.call(d, c)
    }, ec = function (a, c) {
        if (a.Q)return !0;
        if (!Ob) {
            var b;
            if (!(b = c))i:{
                b = ["window", "event"];
                for (var d = l, e; e = b.shift();)if (null != d[e])d = d[e]; else {
                    b = null;
                    break i
                }
                b = d
            }
            e = b;
            b = new O(e, this);
            d = !0;
            if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                i:{
                    var f = !1;
                    if (0 == e.keyCode)try {
                        e.keyCode = -1;
                        break i
                    } catch (h) {
                        f = !0
                    }
                    if (f || void 0 == e.returnValue)e.returnValue = !0
                }
                e = [];
                for (f = b.currentTarget; f; f = f.parentNode)e.push(f);
                for (var f = a.type, k = e.length - 1; !b.P && 0 <= k; k--) {
                    b.currentTarget = e[k];
                    var t = ic(e[k], f, !0, b), d = d && t
                }
                for (k = 0; !b.P && k < e.length; k++)b.currentTarget = e[k], t = ic(e[k], f, !1, b), d = d && t
            }
            return d
        }
        return hc(a, new O(c, this))
    }, bc = function (a) {
        a = a[Wb];
        return a instanceof Q ? a : null
    }, jc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0), $b = function (a) {
        if (da(a))return a;
        a[jc] || (a[jc] = function (c) {
            return a.handleEvent(c)
        });
        return a[jc]
    };
    var R = function () {
        Nb.call(this);
        this.N = new Q(this);
        this.Sb = this;
        this.Bb = null
    };
    ga(R, Nb);
    R.prototype[Qb] = !0;
    g = R.prototype;
    g.addEventListener = function (a, c, b, d) {
        Zb(this, a, c, b, d)
    };
    g.removeEventListener = function (a, c, b, d) {
        fc(this, a, c, b, d)
    };
    g.dispatchEvent = function (a) {
        var c, b = this.Bb;
        if (b)for (c = []; b; b = b.Bb)c.push(b);
        var b = this.Sb, d = a.type || a;
        if (p(a))a = new N(a, b); else if (a instanceof N)a.target = a.target || b; else {
            var e = a;
            a = new N(d, b);
            ya(a, e)
        }
        var e = !0, f;
        if (c)for (var h = c.length - 1; !a.P && 0 <= h; h--)f = a.currentTarget = c[h], e = kc(f, d, !0, a) && e;
        a.P || (f = a.currentTarget = b, e = kc(f, d, !0, a) && e, a.P || (e = kc(f, d, !1, a) && e));
        if (c)for (h = 0; !a.P && h < c.length; h++)f = a.currentTarget = c[h], e = kc(f, d, !1, a) && e;
        return e
    };
    g.listen = function (a, c, b, d) {
        return this.N.add(String(a), c, !1, b, d)
    };
    g.unlisten = function (a, c, b, d) {
        return this.N.remove(String(a), c, b, d)
    };
    var kc = function (a, c, b, d) {
        c = a.N.o[String(c)];
        if (!c)return !0;
        c = c.concat();
        for (var e = !0, f = 0; f < c.length; ++f) {
            var h = c[f];
            if (h && !h.Q && h.da == b) {
                var k = h.K, t = h.ia || h.src;
                h.ca && Vb(a.N, h);
                e = !1 !== k.call(t, d) && e
            }
        }
        return e && 0 != d.Ib
    };
    R.prototype.Ma = function (a, c, b, d) {
        return this.N.Ma(String(a), c, b, d)
    };
    var lc = function (a, c) {
        R.call(this);
        this.qa = a || 1;
        this.X = c || l;
        this.Ga = q(this.sc, this);
        this.Pa = u()
    };
    ga(lc, R);
    g = lc.prototype;
    g.enabled = !1;
    g.q = null;
    g.sc = function () {
        if (this.enabled) {
            var a = u() - this.Pa;
            0 < a && a < .8 * this.qa ? this.q = this.X.setTimeout(this.Ga, this.qa - a) : (this.q && (this.X.clearTimeout(this.q), this.q = null), this.dispatchEvent("tick"), this.enabled && (this.q = this.X.setTimeout(this.Ga, this.qa), this.Pa = u()))
        }
    };
    g.start = function () {
        this.enabled = !0;
        this.q || (this.q = this.X.setTimeout(this.Ga, this.qa), this.Pa = u())
    };
    g.stop = function () {
        this.enabled = !1;
        this.q && (this.X.clearTimeout(this.q), this.q = null)
    };
    var mc = function () {
        this.Ha = {};
        var a = q(this.hc, this);
        aa("handleClick", a)
    };
    ba(mc);
    mc.prototype.u = function (a, c) {
        this.Ha[c] = a
    };
    mc.prototype.hc = function (a, c, b) {
        da(this.Ha[a]) && this.Ha[a].apply(this, Array.prototype.slice.call(arguments, 1))
    };
    var nc = function () {
        this.va = [];
        var a = q(this.Qa, this);
        aa("onLoad", a)
    };
    ba(nc);
    nc.prototype.u = function (a) {
        this.va.push(a)
    };
    nc.prototype.Qa = function () {
        for (var a = 0; a < this.va.length; a += 1)da(this.va[a]) && this.va[a]()
    };
    var oc = ["", "moz", "ms", "O", "webkit"];
    var pc = function () {
        this.Za = [];
        this.vb = [];
        this.h()
    };
    pc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    pc.prototype.h = function () {
        this.Za.length = 0;
        this.vb.length = 0
    };
    pc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            if ("ad_text" == d)for (var e = 0; e < b.length; ++e)this.Za.push(b[e]);
            if ("line_rtl" == d)for (e = 0; e < b.length; ++e)this.vb.push(b[e])
        }
    };
    var qc = function () {
        this.h()
    };
    g = qc.prototype;
    g.height = function () {
        return this.C
    };
    g.width = function () {
        return this.H
    };
    g.j = function (a) {
        this.h();
        this.g(a)
    };
    g.h = function () {
        this.O = "";
        this.H = this.C = 0
    };
    g.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "image_url" == d && (this.O = b);
            "height" == d && (this.C = b);
            "width" == d && (this.H = b)
        }
    };
    var rc = function () {
        this.Nb = [];
        this.za = null;
        this.Db = [];
        this.h()
    };
    g = rc.prototype;
    g.name = function () {
        return this.F
    };
    g.Na = function () {
        return this.D
    };
    g.j = function (a) {
        this.h();
        this.g(a)
    };
    g.h = function () {
        this.D = this.F = "";
        this.Nb.length = 0;
        this.za = null;
        this.Db.length = 0
    };
    g.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "name" == d && (this.F = b);
            "icon_url" == d && (this.D = b);
            if ("user_reviews" == d)for (var e = 0; e < b.length; ++e)this.Nb.push(b[e]);
            "screenshot_data" == d && (null === this.za && (this.za = new sc), this.za.g(b));
            if ("promo_code" == d)for (e = 0; e < b.length; ++e)d = new tc, this.Db.push(d), d.g(b[e])
        }
    };
    var tc = function () {
        this.h()
    };
    tc.prototype.Ka = function () {
        return this.A
    };
    tc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    tc.prototype.h = function () {
        this.A = ""
    };
    tc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c];
            "destination_url" == c.toLowerCase() && (this.A = b)
        }
    };
    var uc = function () {
        this.h()
    };
    g = uc.prototype;
    g.name = function () {
        return this.F
    };
    g.Na = function () {
        return this.D
    };
    g.j = function (a) {
        this.h();
        this.g(a)
    };
    g.h = function () {
        this.D = this.F = ""
    };
    g.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "name" == d && (this.F = b);
            "icon_url" == d && (this.D = b)
        }
    };
    var vc = function () {
        this.Cb = [];
        this.h()
    };
    vc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    vc.prototype.h = function () {
        this.Cb.length = 0
    };
    vc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c];
            if ("product" == c.toLowerCase())for (var d = 0; d < b.length; ++d) {
                var e = new uc;
                this.Cb.push(e);
                e.g(b[d])
            }
        }
    };
    var wc = function () {
        this.T = [];
        this.h()
    };
    wc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    wc.prototype.h = function () {
        this.T.length = 0
    };
    wc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c];
            if ("artists" == c.toLowerCase())for (var d = 0; d < b.length; ++d)this.T.push(b[d])
        }
    };
    var xc = function () {
        this.T = [];
        this.Kb = [];
        this.h()
    };
    xc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    xc.prototype.h = function () {
        this.T.length = 0;
        this.Kb.length = 0
    };
    xc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            if ("artists" == d)for (var e = 0; e < b.length; ++e)this.T.push(b[e]);
            if ("songs" == d)for (e = 0; e < b.length; ++e)d = new wc, this.Kb.push(d), d.g(b[e])
        }
    };
    var yc = function () {
        this.O = [];
        this.kb = [];
        this.h()
    };
    yc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    yc.prototype.h = function () {
        this.O.length = 0;
        this.kb.length = 0
    };
    yc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            if ("image_url" == d)for (var e = 0; e < b.length; ++e)this.O.push(b[e]);
            if ("duration" == d)for (e = 0; e < b.length; ++e)this.kb.push(b[e])
        }
    };
    var zc = function () {
        this.h()
    };
    zc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    zc.prototype.h = function () {
    };
    zc.prototype.g = function (a) {
        for (var c in a);
    };
    var Ac = function () {
        this.h()
    };
    Ac.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    Ac.prototype.h = function () {
    };
    Ac.prototype.g = function (a) {
        for (var c in a);
    };
    var Bc = function () {
        this.Z = null;
        this.h()
    };
    Bc.prototype.text = function () {
        return this.G
    };
    Bc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    Bc.prototype.h = function () {
        this.G = this.O = "";
        this.Z = null
    };
    Bc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "image_url" == d && (this.O = b);
            "text" == d && (this.G = b);
            "action_urls" == d && (null === this.Z && (this.Z = new Ac), this.Z.g(b))
        }
    };
    var S = function () {
        this.bb = [];
        this.la = this.ma = this.ga = this.sa = this.aa = this.Ca = this.na = null;
        this.h()
    };
    S.prototype.Ka = function () {
        return this.A
    };
    S.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    S.prototype.h = function () {
        this.A = "";
        this.bb.length = 0;
        this.la = this.ma = this.ga = this.sa = this.aa = this.Ca = this.na = null
    };
    S.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "destination_url" == d && (this.A = b);
            if ("buttons" == d)for (var e = 0; e < b.length; ++e) {
                var f = new Bc;
                this.bb.push(f);
                f.g(b[e])
            }
            "image_creative" == d && (null === this.na && (this.na = new qc), this.na.g(b));
            "text_creative" == d && (null === this.Ca && (this.Ca = new pc), this.Ca.g(b));
            "app_creative" == d && (null === this.aa && (this.aa = new rc), this.aa.g(b));
            "music_creative" == d && (null === this.sa && (this.sa = new xc), this.sa.g(b));
            "crossfade_creative" == d && (null === this.ga &&
            (this.ga = new yc), this.ga.g(b));
            "iap_creative" == d && (null === this.ma && (this.ma = new vc), this.ma.g(b));
            "html5_template_creative" == d && (null === this.la && (this.la = new zc), this.la.g(b))
        }
    };
    S.CREATIVE_TYPE_UNKNOWN = 0;
    S.CREATIVE_TYPE_TEXT = 1;
    S.CREATIVE_TYPE_IMAGE = 2;
    S.CREATIVE_TYPE_CROSSFADE_BANNER = 3;
    S.CREATIVE_TYPE_PRODUCT = 4;
    S.CREATIVE_TYPE_APP = 5;
    S.CREATIVE_TYPE_MUSIC = 6;
    S.CREATIVE_TYPE_IN_APP_PURCHASE = 7;
    S.CREATIVE_TYPE_HTML5_TEMPLATE = 8;
    var T = function () {
        this.ib = [];
        this.ba = null;
        this.B = [];
        this.h()
    };
    T.prototype.height = function () {
        return this.C
    };
    T.prototype.width = function () {
        return this.H
    };
    var Cc = function (a) {
        null === a.ba && (a.ba = new U);
        return a.ba
    };
    T.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    T.prototype.h = function () {
        this.H = this.C = this.ib.length = 0;
        this.ba = null;
        this.B.length = 0
    };
    T.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            if ("creatives" == d)for (var e = 0; e < b.length; ++e) {
                var f = new S;
                this.ib.push(f);
                f.g(b[e])
            }
            "height" == d && (this.C = b);
            "width" == d && (this.H = b);
            "attribution" == d && Cc(this).g(b);
            if ("flags" == d)for (e = 0; e < b.length; ++e)d = new Dc, this.B.push(d), d.g(b[e])
        }
    };
    T.CREATIVE_TYPE_UNKNOWN = 0;
    T.CREATIVE_TYPE_TEXT = 1;
    T.CREATIVE_TYPE_IMAGE = 2;
    T.CREATIVE_TYPE_CROSSFADE_BANNER = 3;
    T.CREATIVE_TYPE_PRODUCT = 4;
    T.CREATIVE_TYPE_APP = 5;
    var V = function () {
        this.h()
    };
    V.prototype.label = function () {
        return this.tb
    };
    V.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    V.prototype.h = function () {
        this.Oa = this.tb = "";
        this.qb = !0
    };
    V.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "label" == d && (this.tb = b);
            "label_instance" == d && (this.Oa = b);
            "include_close_button_token" == d && (this.qb = b)
        }
    };
    var Ec = function () {
        this.ea = null;
        this.h()
    };
    Ec.prototype.text = function () {
        return this.G
    };
    var Fc = function (a) {
        null === a.ea && (a.ea = new V);
        return a.ea
    };
    Ec.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    Ec.prototype.h = function () {
        this.G = "";
        this.ea = null
    };
    Ec.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "text" == d && (this.G = b);
            "conversion" == d && Fc(this).g(b)
        }
    };
    var Gc = function () {
        this.ya = this.xa = this.ua = this.ta = this.pa = null;
        this.Aa = [];
        this.h()
    }, Hc = function (a) {
        null === a.pa && (a.pa = new V);
        return a.pa
    }, Ic = function (a) {
        null === a.ta && (a.ta = new V);
        return a.ta
    }, Jc = function (a) {
        null === a.ua && (a.ua = new V);
        return a.ua
    }, Kc = function (a) {
        null === a.xa && (a.xa = new V);
        return a.xa
    }, Lc = function (a) {
        null === a.ya && (a.ya = new V);
        return a.ya
    };
    Gc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    Gc.prototype.h = function () {
        this.cb = this.La = this.gb = this.Gb = this.Hb = this.yb = this.zb = "";
        this.ya = this.xa = this.ua = this.ta = this.pa = null;
        this.Lb = "";
        this.Aa.length = 0;
        this.Ia = this.eb = this.Mb = this.Fb = this.Eb = this.xb = this.wb = this.ab = "";
        this.pb = !1
    };
    Gc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "mute_text" == d && (this.zb = b);
            "mute_icon_url" == d && (this.yb = b);
            "pub_feedback_text" == d && (this.Hb = b);
            "pub_feedback_icon_url" == d && (this.Gb = b);
            "conversion_url" == d && (this.gb = b);
            "encoded_cookie" == d && (this.La = b);
            "close_button_token" == d && (this.cb = b);
            "interaction_conversion" == d && Hc(this).g(b);
            "mute_conversion" == d && Ic(this).g(b);
            "mute_undo_conversion" == d && Jc(this).g(b);
            "pub_feedback_conversion" == d && Kc(this).g(b);
            "pub_feedback_undo_conversion" ==
            d && Lc(this).g(b);
            "survey_header" == d && (this.Lb = b);
            if ("survey_options" == d)for (var e = 0; e < b.length; ++e) {
                var f = new Ec;
                this.Aa.push(f);
                f.g(b[e])
            }
            "back_icon_url" == d && (this.ab = b);
            "mute_confirmation_header" == d && (this.wb = b);
            "mute_confirmation_text" == d && (this.xb = b);
            "pub_feedback_confirmation_header" == d && (this.Eb = b);
            "pub_feedback_confirmation_text" == d && (this.Fb = b);
            "undo_text" == d && (this.Mb = b);
            "closing_countdown_text" == d && (this.eb = b);
            "close_message" == d && (this.Ia = b, this.pb = !0)
        }
    };
    var U = function () {
        this.Ea = null;
        this.h()
    };
    U.prototype.Ka = function () {
        return this.A
    };
    U.prototype.Na = function () {
        return this.D
    };
    U.prototype.text = function () {
        return this.G
    };
    var Mc = function (a) {
        null === a.Ea && (a.Ea = new Gc);
        return a.Ea
    };
    U.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    U.prototype.h = function () {
        this.G = this.D = this.A = "";
        this.Ea = null
    };
    U.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "destination_url" == d && (this.A = b);
            "icon_url" == d && (this.D = b);
            "text" == d && (this.G = b);
            "user_feedback_data" == d && Mc(this).g(b)
        }
    };
    U.BOTTOM_LEFT = 0;
    U.TOP_LEFT = 1;
    U.TOP_RIGHT = 2;
    U.BOTTOM_RIGHT = 3;
    var Dc = function () {
        this.h()
    };
    g = Dc.prototype;
    g.name = function () {
        return this.F
    };
    g.value = function () {
        return this.Ob
    };
    g.j = function (a) {
        this.h();
        this.g(a)
    };
    g.h = function () {
        this.Ob = this.F = ""
    };
    g.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "name" == d && (this.F = b);
            "value" == d && (this.Ob = b)
        }
    };
    var sc = function () {
        this.Jb = [];
        this.h()
    };
    sc.prototype.j = function (a) {
        this.h();
        this.g(a)
    };
    sc.prototype.h = function () {
        this.Jb.length = 0
    };
    sc.prototype.g = function (a) {
        for (var c in a) {
            var b = a[c];
            if ("screenshots" == c.toLowerCase())for (var d = 0; d < b.length; ++d) {
                var e = new Nc;
                this.Jb.push(e);
                e.g(b[d])
            }
        }
    };
    var Nc = function () {
        this.h()
    };
    g = Nc.prototype;
    g.width = function () {
        return this.H
    };
    g.height = function () {
        return this.C
    };
    g.j = function (a) {
        this.h();
        this.g(a)
    };
    g.h = function () {
        this.C = this.H = 0
    };
    g.g = function (a) {
        for (var c in a) {
            var b = a[c], d = c.toLowerCase();
            "width" == d && (this.H = b);
            "height" == d && (this.C = b)
        }
    };
    var W = function (a, c, b, d, e, f, h, k) {
        this.Xa = a;
        this.Ya = c;
        this.ka = b;
        this.Fa = d;
        this.Ub = e;
        this.Wb = f;
        this.Xb = h;
        this.ob = !1;
        this.i = k;
        this.M = 0;
        this.w = this.fa = null;
        this.ra = !1;
        a = mc.ha();
        a.u(q(this.gc, this), "backClick");
        a.u(q(this.fc, this), "attributionClick");
        a.u(q(this.ec, this), "adMuteClick");
        a.u(q(this.jc, this), "pubMuteClick");
        a.u(q(this.kc, this), "surveyOptionClick");
        a.u(q(this.lc, this), "undoClick");
        nc.ha().u(q(this.Qa, this))
    };
    W.prototype.Qa = function () {
        for (var a = F("info_card"), c = this.ka + " linear 0.2s," + this.Fa + " linear 0.2s", b = 0; b < oc.length; b++)M(a, oc[b] ? oc[b] + "transition"[0].toUpperCase() + "ransition" : "transition", c)
    };
    W.prototype.collapse = function () {
        var a = F("info_card");
        M(a, this.ka, -1 * this.Ya + "px");
        M(a, this.Fa, -1 * this.Xa + "px")
    };
    W.prototype.expand = function () {
        Oc(this);
        var a = F("info_card");
        M(a, this.ka, "0px");
        M(a, this.Fa, "0px");
        this.ob || (X(this, Hc(this.i)), this.ob = !0)
    };
    var Oc = function (a) {
        nb(F("info_content"), Hb, {Tb: a.Ub, Vb: a.Wb, S: a.i});
        a.M = 1;
        Pc(!0)
    }, Qc = function (a, c, b, d) {
        nb(F("info_content"), Jb, {bc: c, text: b, uc: a.i.Mb});
        a.M = d;
        Pc(!1)
    }, Pc = function (a) {
        var c = F("back_section"), b = F("info_content");
        c && b && (a ? (Ba ? Ca(c, "hidden", !0) : Ea(c, "hidden"), Ba ? Ca(b, "expand", !0) : Ea(b, "expand")) : (Ba ? Ca(c, "hidden", !1) : Da(c, "hidden"), Ba ? Ca(b, "expand", !1) : Da(b, "expand")))
    }, X = function (a, c) {
        var b = a.i.gb + "&label=" + c.label();
        "" !== c.Oa && (b += "&label_instance=" + c.Oa);
        c.qb && (b += "&cbt=" + a.i.cb);
        0 <
        a.i.La.length && (b += "&cid=" + a.i.La);
        (new Image).src = b
    };
    W.prototype.oc = function (a, c, b) {
        if (!(3 != this.M && 4 != this.M || 0 > c || c > a)) {
            var d = a;
            if (!this.w) {
                this.w = new lc(1E3);
                var e = F("countdown"), f = this.i.eb;
                a = q(function () {
                    var a = "";
                    0 < d && (a = f.replace("%1$d", String(d)));
                    e.style.display = a ? "inline" : "none";
                    db(e, a);
                    if (d == c)try {
                        var k = this.i.Ia;
                        "i-dismiss" == b ? window.parent.interstitialAdFrame.dismiss() : window.top.postMessage(k, "*");
                        this.ra = !0
                    } catch (t) {
                        La(t, function (a) {
                            a.closeMsg = k
                        })
                    }
                    0 >= d && Rc(this);
                    d--
                }, this);
                Zb(this.w, "tick", a)
            }
            this.w.dispatchEvent("tick");
            0 <= d && this.w.start()
        }
    };
    var Rc = function (a) {
        a.w && (a.w.stop(), a.w = null, a.ra = !1);
        a.fa && (window.clearTimeout(a.fa), a.fa = null);
        if (a = F("countdown"))a.style.display = "none"
    }, Sc = function (a) {
        if (a.i.pb) {
            var c = Kb(a.i.Ia), b = {};
            if (c && c.key_value)for (var d = c.key_value, e = 0; e < d.length; e++) {
                var f = d[e];
                if ("key"in f && "value"in f) {
                    var h = f.value;
                    b[f.key] = null == h ? null : String(h)
                }
            }
            c = c.msg_type;
            if ("ablate-me" == c || "resize-me" == c || "dismiss" == c || "i-dismiss" == c)d = Fa(b["secs-to-countdown"], 2), a.fa = window.setTimeout(q(a.oc, a, Fa(b.countdown, 0), Fa(b["message-tick"],
                0), c), 1E3 * d)
        }
    };
    g = W.prototype;
    g.gc = function () {
        if (!this.ra)switch (Rc(this), this.M) {
            case 1:
                this.collapse();
                break;
            case 2:
                Oc(this), X(this, Jc(this.i))
        }
    };
    g.lc = function () {
        if (!this.ra)switch (Rc(this), this.M) {
            case 3:
                this.collapse();
                X(this, Jc(this.i));
                break;
            case 4:
                this.collapse(), X(this, Lc(this.i))
        }
    };
    g.fc = function () {
        window.open(this.Xb)
    };
    g.ec = function () {
        nb(F("info_content"), Ib, {qc: this.i.Lb, rc: this.i.Aa});
        this.M = 2;
        Pc(!0);
        X(this, Ic(this.i))
    };
    g.kc = function (a, c) {
        Qc(this, this.i.wb, this.i.xb, 3);
        X(this, Fc(this.i.Aa[c]));
        Sc(this)
    };
    g.jc = function () {
        Qc(this, this.i.Eb, this.i.Fb, 4);
        X(this, Kc(this.i));
        Sc(this)
    };
    var Z = function (a, c, b, d, e, f, h, k, t, P, I, J, bd, cd, dd, n, m, w, ed, x, Ha, ac, r) {
        this.n = a;
        this.s = c;
        this.v = b;
        this.p = d;
        this.m = e;
        this.fb = f;
        this.U = h;
        this.Yb = k;
        this.ac = t;
        this.$a = P;
        this.Sa = I;
        this.Ba = J;
        this.Ta = bd;
        this.W = cd;
        this.Ua = dd;
        i:for (a = this.s, c = "A", b = a.childNodes, d = 0; d < b.length; d++)if (e = b.item(d), "undefined" != typeof e.tagName && e.tagName.toUpperCase() == c) {
            a = e;
            break i
        }
        this.I = a;
        this.V = "left" == m;
        this.L = this.t = null;
        this.Ab = !0 === x;
        this.sb = !0 === Ha;
        this.oa = null;
        if (ac) {
            x = new T;
            x.j(r);
            if (r.flags && (Ha = Aa.ha(), r = r.flags))for (Ha.B =
                                                            {}, a = 0; a < r.length; a++)Ha.B[r[a].name] = r[a].value;
            m = this.oa = new W(x.height(), x.width(), m, this.sb ? "bottom" : "top", Cc(x).Na(), Cc(x).text(), Cc(x).Ka(), Mc(Cc(x)));
            r = F("info_card");
            x = Aa.ha();
            nb(r, Gb, {
                k: m.Xa,
                l: m.Ya,
                dc: m.ka,
                vc: m.Fa,
                Y: void 0 !== x.B.uses_octagon_sdk ? "true" === x.B.uses_octagon_sdk || !0 === x.B.uses_octagon_sdk : !1,
                S: m.i
            });
            Oc(m)
        }
        m = "undefined" != typeof SVGElement && "undefined" != typeof document.createElementNS;
        "img" == w && (m = !1);
        m ? "adchoices" == n ? (this.v.appendChild(Y(Tc(this), Uc("0px"))), this.V ? (n = this.p +
        2, w = 0) : (n = 5, w = this.m - this.p - 0), this.t = Vc(this.Sa, n, this.Ua, this.Ba), this.I.appendChild(Y(Wc(this, this.m, this.U), Uc(w + "px"), this.t))) : "adsbygoogle" == n ? (n = Tc(this), w = Xc("0px"), this.v.appendChild(Y(n, w)), this.V ? (r = 0, n = this.p + 2, w = this.m - this.W - 5) : (m = 0, n = 5, w = this.m - this.W - 2 - m - this.p, r = this.m - this.p - m), m = Wc(this, this.m, this.U), this.t = Vc(this.Sa, n, this.Ua, this.Ba), "" != this.Ta && (this.L = Vc(this.Ta, w, this.Ua, this.W)), n = Xc(r + "px"), null != this.I && (n = this.L ? Y(m, this.t, this.L, n) : Y(m, this.t, n), this.I.appendChild(n))) :
            "germany" == n ? (this.v.appendChild(Y(Tc(this), Uc("0px"))), this.V ? (w = this.p + 2, m = 3, r = 0) : (w = this.m - 45 - this.p, m = this.m - 88 - 3, r = this.m - this.p - 0), n = Wc(this, this.m, this.U), this.t = Vc(this.Sa, w, 0, this.Ba), this.L = Vc(this.Ta, m, 14, this.W), w = Uc(r + "px"), null != this.I && (n = Y(n, this.t, this.L, w), this.I.appendChild(n))) : Yc(this) : Yc(this);
        this.R = null;
        this.ub = 0;
        ac ? y(this.n, "click", this, q(this.oa.expand, this.oa)) : ed ? this.Wa() : (y(this.n, "mouseover", this, this.Wa), y(this.n, "mouseout", this, this.tc), y(this.n, "mouseup", this, this.Va),
            y(this.n, "touchstart", this, this.Wa), y(this.n, "touchend", this, this.Va), y(this.n, "touchcancel", this, this.Va), y(this.I, "click", this, this.mc))
    }, Y = function (a) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        c.setAttribute("width", "100%");
        c.setAttribute("height", "100%");
        for (var b = 0; b < arguments.length; b++)c.appendChild(arguments[b]);
        return c
    }, Tc = function (a) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        if (a.Ab)return c;
        c.setAttribute("width", "100%");
        c.setAttribute("height",
            "100%");
        c.setAttribute("fill", "lightgray");
        return c
    }, Wc = function (a, c, b) {
        var d = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (a.Ab)return d;
        d.setAttribute("fill", "lightgray");
        var e = "M";
        a.sb ? (e += "0," + b + "L" + c + "," + b, e = a.V ? e + ("L" + c + ",4s0,-4,-4,-4L0,0") : e + ("L" + c + ",0L4,0s-4,0,-4,4")) : (e += "0,0L" + c + ",0", e = a.V ? e + ("L" + c + "," + (b - 4) + "s0,4,-4,4L0," + b) : e + ("L" + c + "," + b + "L4," + b + "s-4,0,-4,-4"));
        d.setAttribute("d", e + "z");
        return d
    }, Vc = function (a, c, b, d) {
        b = 11 + b;
        var e = document.createElementNS("http://www.w3.org/2000/svg",
            "svg"), f = document.createElementNS("http://www.w3.org/2000/svg", "text");
        a = document.createTextNode(a);
        e.setAttribute("overflow", "visible");
        e.setAttribute("x", c + "px");
        e.setAttribute("y", b + "px");
        e.setAttribute("width", d + "px");
        f.setAttribute("fill", "black");
        f.setAttribute("font-family", "Arial");
        f.setAttribute("font-size", "100px");
        e.appendChild(f);
        f.appendChild(a);
        return e
    }, Zc = function (a, c) {
        var b = a.childNodes.item(0), d = b.getComputedTextLength();
        0 != d && b.setAttribute("transform", "scale(" + c / d + ")")
    }, Uc = function (a) {
        var c =
            document.createElementNS("http://www.w3.org/2000/svg", "svg"), b = document.createElementNS("http://www.w3.org/2000/svg", "circle"), d = document.createElementNS("http://www.w3.org/2000/svg", "path");
        c.appendChild(b);
        c.appendChild(d);
        c.setAttribute("fill", "#00aecd");
        c.setAttribute("x", a);
        c.setAttribute("y", "0.5px");
        b.setAttribute("cx", "6.711px");
        b.setAttribute("cy", "6.04px");
        b.setAttribute("r", "0.483");
        d.setAttribute("d", "M2.696,3.234c0-0.555,0.131-0.989,0.537-1.201c0.359-0.188,0.769-0.136,1.25,0.141l7.438,4.219c0.485,0.28,0.743,0.546,0.734,1c-0.009,0.456-0.271,0.771-0.766,1.032L7.78,10.519c-0.594,0.297-0.798,0.289-1.031,0.188C6.39,10.55,6.296,10.237,6.296,9.378l0.016-1.672c0-0.828,0.844-0.906,0.844,0l0.016,1.719C7.155,9.94,7.499,9.769,7.499,9.769L11.53,7.69c0.359-0.219,0.25-0.406,0.141-0.516c-0.024-0.024-0.188-0.12-0.25-0.156L4.233,2.987c-0.797-0.531-0.656,0.25-0.656,0.25s-0.016,7.182-0.016,7.625c0,0.797,0.094,0.672,1.062,0.156c0.95-0.506,1.156,0.422,0.516,0.75c0,0-0.869,0.473-1.297,0.641c-0.797,0.312-1.109-0.234-1.141-0.641C2.674,11.401,2.696,3.234,2.696,3.234z");
        return c
    }, Yc = function (a) {
        var c = $c(a.Yb, a.$a, a.p, a.fb);
        a.v.appendChild(c);
        c = $c(a.ac, a.$a, a.m, a.U);
        a.I.appendChild(c);
        c.width = a.m
    }, $c = function (a, c, b, d) {
        var e = document.createElement("img");
        e.src = a;
        e.alt = c;
        e.setAttribute("border", "0");
        e.width = b;
        e.height = d;
        return e
    };
    Z.prototype.Wa = function () {
        window.clearTimeout(this.R);
        this.R = null;
        this.s && "block" == this.s.style.display || (this.ub = u(), this.m && (this.n.style.width = this.m + "px", this.n.style.height = this.U + "px"), this.v && this.s && (this.v.style.display = "none", this.s.style.display = "block"), this.t && Zc(this.t, this.Ba), this.L && Zc(this.L, this.W))
    };
    Z.prototype.tc = function () {
        ad(this, 500)
    };
    Z.prototype.Va = function () {
        ad(this, 4E3)
    };
    var ad = function (a, c) {
        window.clearTimeout(a.R);
        a.R = window.setTimeout(q(a.cc, a), c)
    };
    Z.prototype.cc = function () {
        window.clearTimeout(this.R);
        this.R = null;
        this.Zb && (this.n.style.left = this.Zb + "px");
        this.p && (this.n.style.width = this.p + "px", this.n.style.height = this.fb + "px");
        this.v && this.s && (this.v.style.display = "block", this.s.style.display = "none")
    };
    Z.prototype.mc = function (a) {
        this.s && "block" == this.s.style.display && 500 > u() - this.ub && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    };
    var Xc = function (a) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "svg"), b = document.createElementNS("http://www.w3.org/2000/svg", "circle"), d = document.createElementNS("http://www.w3.org/2000/svg", "circle"), e = document.createElementNS("http://www.w3.org/2000/svg", "line");
        c.setAttribute("stroke", "#00aecd");
        c.setAttribute("fill", "#00aecd");
        c.setAttribute("x", a);
        c.setAttribute("y", "0px");
        b.setAttribute("cx", "7.5px");
        b.setAttribute("cy", "7.5px");
        b.setAttribute("r", "5.5px");
        b.setAttribute("fill",
            "none");
        b.setAttribute("stroke-width", "1.1px");
        d.setAttribute("cx", "7.5px");
        d.setAttribute("cy", "4.75px");
        d.setAttribute("r", "1px");
        d.setAttribute("stroke", "none");
        e.setAttribute("x1", "7.5px");
        e.setAttribute("x2", "7.5px");
        e.setAttribute("y1", "6.5px");
        e.setAttribute("y2", "11px");
        e.setAttribute("fill", "none");
        e.setAttribute("stroke-width", "1.75px");
        c.appendChild(b);
        c.appendChild(d);
        c.appendChild(e);
        return c
    };
    aa("abg", Z);
})();

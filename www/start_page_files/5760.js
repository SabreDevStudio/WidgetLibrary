var Oppuz = Oppuz || function () {
        var b = Math.random();
        var a = {};
        return {
            getOppuz: function (d) {
                if (!a[d]) {
                    a[d] = new c(d)
                }
                return a[d]
            }
        };
        function c(k) {
            var y = window;
            var q = window.location;
            var i = q.pathname;
            var h = q.search;
            var B = q.protocol + "//" + q.hostname + (q.port ? ":" + q.port : "");
            var f = "www.oppuz.com";
            var n = (("https:" == q.protocol) ? "https://" : "http://");
            var s = k;
            var u = function (C) {
                if (window.console && window.console.log) {
                    window.console.log("[" + k + "] " + C)
                }
            };
            var l = {
                getApplication: function () {
                    return k
                },
                getTrackingApplication: function () {
                    return s
                },
                setTrackingApplication: function (C) {
                    s = C
                },
                getOppuzHost: function () {
                    return f
                },
                setOppuzHost: function (C) {
                    f = C
                },
                getDomain: function () {
                    return B
                },
                getUrl: function () {
                    return B + i
                },
                getFullUrl: function () {
                    return B + i + h
                },
                getUrlParam: function (E, D) {
                    if (!D) {
                        D = l.getFullUrl()
                    }
                    var C = D.match(RegExp(E + "=([^&]+)"));
                    var F = C ? C[1] : "";
                    return F
                },
                log: u,
                readCookie: function (D) {
                    var F = D + "=";
                    var C = document.cookie.split(";");
                    for (var E = 0; E < C.length; E++) {
                        var G = C[E];
                        while (G.charAt(0) == " ") {
                            G = G.substring(1, G.length)
                        }
                        if (G.indexOf(F) == 0) {
                            return G.substring(F.length, G.length)
                        }
                    }
                    return null
                },
                deleteCookie: function (C) {
                    document.cookie = C + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
                },
                writeCookie: function (E, G, C) {
                    if (C == -1 || C == "session") {
                        D = -1
                    } else {
                        if (!C) {
                            C = 1
                        }
                        var F = new Date();
                        F.setDate(F.getDate() + C);
                        var D = F.toUTCString()
                    }
                    var H = escape(G) + "; expires=" + D + "; path=/";
                    document.cookie = E + "=" + H
                },
                showcase: function (G, E, C, H) {
                    var I = "showcases.oppuz.com";
                    var D = document.createElement("script"), F = "showcase", K = (H || {});
                    if (G) {
                        K.element = G
                    }
                    if (E) {
                        K.type = E
                    }
                    if (C) {
                        K.category_id = C
                    }
                    D.type = "text/javascript";
                    D.src = n + I + "/" + F + "/" + k + "?" + r(F, K);
                    var J = t(document.documentElement);
                    J.appendChild(D)
                },
                getAbsolutePath: function (C) {
                    if (C.match(/^http:/i) == null) {
                        return B + C
                    }
                    return C
                },
                removeParameter: function (D, K) {
                    var J = D.split("#");
                    var F = J[0].split("?");
                    if (F.length >= 2) {
                        var H = F.shift();
                        var C = F.join("?");
                        var I = encodeURIComponent(K) + "=";
                        var E = C.split(/[&;]/g);
                        for (var G = E.length; G-- > 0;) {
                            if (E[G].lastIndexOf(I, 0) !== -1) {
                                E.splice(G, 1)
                            }
                        }
                        D = H + "?" + E.join("&");
                        if (J[1]) {
                            D += "#" + J[1]
                        }
                    }
                    return D
                },
                sendRequest: z,
                getOppuzCookie: d,
                setOppuzCookie: p,
                getJSON: o,
                getProduct: v,
                getImage: e,
                validateCurrentDomain: A,
                getParameters: r,
                identicalArrays: w,
                removeArrayFromArray: x
            };
            return l;
            function r(E, D, G) {
                var F = "";
                if (!g(D)) {
                    if (m(D)) {
                        for (var C in D) {
                            paramName = E + "[" + C + "]";
                            param = D[C];
                            if (!g(param)) {
                                if (m(param)) {
                                    F += r(paramName, param, true)
                                } else {
                                    if (typeof(D[C]) != "undefined" && D[C] != null) {
                                        F += paramName + "=" + encodeURIComponent(D[C]) + "&"
                                    }
                                }
                            }
                        }
                    } else {
                        if (D) {
                            F = E + "=" + encodeURIComponent(D)
                        }
                    }
                }
                if (!G) {
                    if (!F) {
                        F = ""
                    }
                    F += "tid=" + b + "&"
                }
                return F
            }

            function m(C) {
                return C && (typeof C === "object")
            }

            function g(C) {
                return C && (typeof C === "function")
            }

            function A() {
                if (B.match(/googleusercontent.com/)) {
                    return false
                }
                if (!this.valid_domains || this.valid_domains.length == 0) {
                    return true
                }
                for (var C = 0; C < this.valid_domains.length; ++C) {
                    if (B.indexOf(this.valid_domains[C]) != -1) {
                        return true
                    }
                }
                return false
            }

            function z(G, D, F) {
                var E = [G, D].join("/");
                var F = r(G, F);
                var C = [E, F].join("?");
                if (this.validateCurrentDomain()) {
                    setTimeout(function () {
                        if (C.length > 2000) {
                            j(C)
                        } else {
                            e(C)
                        }
                    }, 0)
                } else {
                    u("[Oppuz] Request from invalid domain " + B + " (request_url = " + C + ")")
                }
            }

            function o(C, E, D) {
                if (typeof("$opz") === "undefined") {
                    return
                }
                C = n + f + "/" + C;
                if (!D) {
                    C += ".json"
                }
                return $opz.ajax({
                    url: C, dataType: "jsonp", success: function (G, F, H) {
                        if (E) {
                            E(G)
                        }
                    }
                })
            }

            function d(C, D) {
                l.getJSON("/get_cookie/?name=" + C, D, true)
            }

            function p(C, D, E) {
                l.getJSON("/set_cookie/?name=" + C + "&value=" + escape(D), E, true)
            }

            function v(C, D) {
                return l.getJSON(k + "/product/" + C, D)
            }

            function j(C) {
                var F = C.split("?", 2);
                var G = n + f + "/" + F[0];
                var E = F[1];
                var D = document.createElement("iframe");
                D.onload = function () {
                    var N = D.contentWindow.document;
                    var J = N.createElement("form");
                    J.style.display = "none";
                    J.action = G;
                    J.method = "post";
                    J.acceptCharset = "utf-8";
                    var L = E.split("&");
                    for (var I = 0; I < L.length; ++I) {
                        var M = L[I];
                        var K = M.split("=", 2);
                        var H = N.createElement("input");
                        H.name = K[0];
                        H.value = decodeURIComponent(K[1]);
                        J.appendChild(H)
                    }
                    N.body.appendChild(J);
                    D.onload = function () {
                        setTimeout(function () {
                            document.body.removeChild(D)
                        }, 100)
                    };
                    J.submit()
                };
                D.style.display = "none";
                D.style.visibility = "hidden";
                D.style.height = "1px";
                document.body.appendChild(D)
            }

            function e(C, E) {
                var D = new Image(1, 1);
                if (!E) {
                    C = n + f + "/" + C
                }
                D.src = C
            }

            function t(D) {
                var C = D.firstChild;
                while (C.nodeType != 1) {
                    C = C.nextSibling
                }
                return C
            }

            function x(E, D) {
                if (!E || !D || !$opz.isArray(E) || !$opz.isArray(D)) {
                    return null
                }
                var F = false;
                for (var C = 0; C < D.length; C++) {
                    if (w(E, D[C])) {
                        D.splice(C, 1);
                        F = true
                    }
                }
                return F
            }

            function w(E, D) {
                if (!E || !D || !$opz.isArray(E) || !$opz.isArray(D)) {
                    return null
                }
                var C = E.length;
                if (C != D.length) {
                    return false
                }
                while (C--) {
                    if (E[C] !== D[C]) {
                        return false
                    }
                }
                return true
            }
        }
    }();
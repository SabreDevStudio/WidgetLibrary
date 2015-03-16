var VeAPI = VeAPI || {version: {major: 3, minor: 0, revision: 3, deploy: 1, build: 1}};
if (!VeAPI.ready)try {
    VeAPI.ready = function (a) {
        function b() {
            clearTimeout(d), a(veTagData)
        }

        function c() {
            "complete" === document.readyState && (document.addEventListener ? document.removeEventListener("DOMContentLoaded", c) : document.detachEvent("onreadystatechange", c), b())
        }

        if ("complete" === document.readyState)a(veTagData); else {
            var d = setInterval(c, 10);
            document.addEventListener ? document.addEventListener("DOMContentLoaded", c) : document.attachEvent("onreadystatechange", c)
        }
    }, VeAPI.isInitialized = !1, VeAPI.ready(function (a) {
        function b(a) {
            if (a.enabled)for (var b = 0, c = E.length; c > b; b += 1)if (a[E[b]])return !0;
            return !1
        }

        function c(a) {
            for (var c = [], d = 0, e = a.length; e > d; d += 1)appInfo = a[d], appInfo.name = appInfo.name.toLowerCase(), b(appInfo) && c.push(appInfo.name);
            return c
        }

        function d(a) {
            var b, c, d, e;
            for (b = 0, d = a.length; d > b; b += 1)for (appInfo = a[b], c = 0, e = E.length; e > c; c += 1)appInfo[E[c]] && (void 0 === H[E[c]] ? H[E[c]] = [appInfo.name] : H[E[c]].push(appInfo.name))
        }

        function e(a) {
            "use strict";
            this.method = "localStorage", this.namespace = a, this.sessionTimeOutMinutes = 60, this.isSupported = f(this.method)
        }

        function f(a) {
            var b = "testStorage";
            try {
                return window[a].setItem(b, b), window[a].removeItem(b), !0
            } catch (c) {
                return !1
            }
        }

        function g(a) {
            "use strict";
            function b(a, b, c, d) {
                function e(a) {
                    return void 0 !== a[b] ? null === a[b] ? !1 : -1 === N.array.indexOf(c, a[b]) : !0
                }

                var g = b !== f;
                return b = b.toLowerCase(), c = c.toString(), d = d.toLowerCase(), a = N.object.toLowerCase(a), a && (g = e(a), g && void 0 !== a[d] && (g = null === a[d] ? !1 : e(a[d]))), g
            }

            function c() {
                var a = null;
                return null !== i && m[i].versionRegExp && (a = parseFloat(navigator.userAgent.replace(new RegExp(m[i].versionRegExp, "g"), "$1")), "Trident" === m[i].nameRegExp && (a += 4)), a ? a : f
            }

            function d(a) {
                for (var b = 0; b < a.length; b += 1)if (new RegExp(a[b].nameRegExp, "g").test(navigator.userAgent))return i = b, a[b].name;
                return f
            }

            function e() {
                g = d(m), h = c(g), j = d(n), g !== f && h !== f && j !== f && (k = b(o, g, h, j), k || (l = "Browser is set as not supported in version's default settings."), a && k && (k = b(a, g, h, j), k || (l = "Browser is set as not supported in customer's settings."))), N.shell.info("Browser detected: " + g + (k ? "" : " NOT") + " supported")
            }

            var f = "unknown", g = null, h = null, i = null, j = null, k = !1, l = "Browser is supported.", m = [{
                name: "Chrome",
                nameRegExp: "CriOS",
                versionRegExp: ".*?CriOS/([0-9.]+).*"
            }, {name: "Chrome", nameRegExp: "Chrome", versionRegExp: ".*?Chrome/([0-9.]+).*"}, {
                name: "Firefox",
                nameRegExp: "Firefox",
                versionRegExp: ".*?Firefox/([0-9.]+).*"
            }, {name: "Opera", nameRegExp: "Opera", versionRegExp: ".*?Opera/([0-9.]+).*"}, {
                name: "IE",
                nameRegExp: "Trident",
                versionRegExp: ".*?Trident/([0-9.]+).*"
            }, {name: "IE", nameRegExp: "MSIE", versionRegExp: ".*?MSIE\\s([0-9.]+).*"}, {
                name: "Android browser",
                nameRegExp: "Mobile\\s",
                versionRegExp: ".*?Version/([0-9.]+).*"
            }, {
                name: "Safari",
                nameRegExp: "Safari",
                versionRegExp: ".*?Version/([0-9.]+).*"
            }], n = [{name: "iPhone/ipod", nameRegExp: "iPhone"}, {
                name: "iPad",
                nameRegExp: "iPad"
            }, {name: "Windows Phone", nameRegExp: "Windows Phone"}, {
                name: "Windows Tablet",
                nameRegExp: "(Windows){1}.*?(Tablet PC)"
            }, {name: "Android", nameRegExp: "Android"}, {name: "Windows", nameRegExp: "Windows"}, {
                name: "Mac",
                nameRegExp: "Mac"
            }], o = {
                "iPhone/ipod": null,
                iPad: null,
                "Windows Phone": null,
                Android: null,
                Windows: {Safari: null, IE: [5, 6, 7, 8]},
                Opera: null
            };
            return e(), {
                browser: function () {
                    return g
                }, version: function () {
                    return h
                }, OS: function () {
                    return j
                }, isSupported: function () {
                    return k
                }, messageNotSupported: function () {
                    return l
                }
            }
        }

        function h(a, b, c, d, e) {
            function f() {
                (K || 3) > h ? (h += 1, N.shell.log(h + " retry the AJAX request for " + a), N.ajax.request(g, d, f)) : (N.shell.error("AJAX request for " + a + " not successful"), "function" == typeof e && e())
            }

            var g = window.location.protocol + "//" + J[a].baseURL, h = 0;
            if ("chat" === a && -1 != N.array.indexOf("getpersonalitychat", b) && (g = window.location.protocol + "//" + J.assist.baseURL), g = N.domain.createUrl(g, b, c), e)N.ajax.request(g, d, f); else try {
                VeAPI.JSONP.request(g, d)
            } catch (i) {
                N.shell.error("Error " + i.name + ": " + i.message)
            }
        }

        function j(a, b) {
            var c = 0;
            return 1 === a.length ? c = a[0].FormId : a.length > 1 && (c = -1), b && (c = Q.onFormIdentified(c)), c
        }

        function k(a) {
            return classicFormIdentification = new p(a, window.location.href), matchedClassicForms = classicFormIdentification.matchFormsByURL(), matchedClassicForms.length > 1 ? (matchedClassicForms = classicFormIdentification.preferFormsWithParameters(matchedClassicForms), matchedClassicForms.length > 1 ? matchedClassicForms = classicFormIdentification.preferFormsWithVisibleFormMappings(matchedClassicForms) : matchedClassicForms) : matchedClassicForms
        }

        function l(a, b) {
            var c = [];
            return a.getSettingsJSON(b), c = a.getAdditionalFormMappings(), c.length > 0 && (b.formfields = N.array.concatWithoutDuplicate(b.formfields, c)), b = m(b)
        }

        function m(a) {
            var b, c = [];
            for (b = 0; b < a.formfields.length; b++)c.push(new o(a.formfields[b]));
            if (c.length !== a.formfields.length)throw new Error("Couldn't initialise all the form mappings");
            return a.formfields = c, a
        }

        function n(a) {
            var b = new p(a, window.location.href);
            return matchedProductForms = b.matchFormsByURL()
        }

        function o(a) {
            "use strict";
            function b() {
                return "Raw" === l || "RawSeries" === l ? void(n = g()) : (f(), d(), void c())
            }

            function c() {
                var a = {Id: "#" + j, Name: "[name='" + j + "']", Class: "." + j}, b = a[l];
                b && (j = b, l = "Raw")
            }

            function d() {
                var b = e(a), c = [{
                    clientFieldName: j,
                    fieldTypeName: l
                }, {
                    clientFieldName: p + "[" + l.toLowerCase() + "$='" + j.substring(1, j.length) + "']",
                    fieldTypeName: "RawSeries"
                }, {
                    clientFieldName: p + "[" + l.toLowerCase() + "^='" + j.substring(0, j.length - 1) + "']",
                    fieldTypeName: "RawSeries"
                }, {
                    clientFieldName: p + "[" + l.toLowerCase() + "*='" + j.substring(0, j.length - 1).substring(1, j.length) + "']",
                    fieldTypeName: "RawSeries"
                }];
                j = c[b].clientFieldName, l = c[b].fieldTypeName
            }

            function e() {
                var a = 0, b = j.length;
                return "Raw" === l || "RawSeries" === l ? a : (0 === j.indexOf("*") && (a += 1), j.indexOf("*", 1) === b - 1 && (a += 2), a)
            }

            function f() {
                var b = {
                    ":text": "input[type='text']",
                    ":radio": "input[type='radio']",
                    ":checkbox": "input[type='checkbox']",
                    ":hidden": "input[type='hidden']",
                    select: "select",
                    textarea: "textarea"
                }, c = b[a.HtmlType];
                n = g(), c && (p = c)
            }

            function g() {
                var a = {
                    ":text": "value",
                    ":radio": "value",
                    ":checkbox": "checkbox",
                    ":hidden": "value",
                    select: "value",
                    textarea: "value"
                }, b = a[p];
                return "Value" === n ? b ? b : "innerHTML" : n
            }

            function h() {
                var b = e(a), c = ["", "^", "$", "*"];
                return c[b]
            }

            function i() {
                return "Raw" === l || "RawSeries" === l ? VEjQuery(j) : VEjQuery()
            }

            var j = a.ClientFieldName, k = a.DomEvent, l = a.FieldTypeName, m = a.FormMappingId, n = a.HtmlAttributeTag, o = a.IdentifyAbandonment, p = a.HtmlType, q = a.isEmail;
            return b(), {
                ClientFieldName: j,
                DomEvent: k,
                FieldTypeName: l,
                FormMappingId: m,
                HtmlAttributeTag: n,
                IdentifyAbandonment: o,
                HtmlType: p,
                isEmail: q,
                getElementsWithSelector: function () {
                    return i()
                },
                getFilter: function () {
                    return h()
                }
            }
        }

        function p(a, b) {
            "use strict";
            function c() {
                var a;
                b = N.capture.toLowerCaseString(b), b = b.replace(/http(s)?\:\/\/(www\.)?/, ""), b = b.replace(/([#;])/gi, "?"), a = b.split("?", 2), l = a[0], k = a.length > 1 ? "?" + a[1] : ""
            }

            function d(a, b) {
                var c, d, e, f, g;
                for (c = 0; c < a.length; c++) {
                    if (d = N.capture.toLowerCaseString(a[c].Paremeter), e = N.capture.toLowerCaseString(a[c].ParameterValue), "*" === e)return g = new RegExp("[?&]" + d + "([=&]|$)", "i"), g.test(b);
                    if (f = N.domain.getQueryParameter(d, b), !N.capture.stringMatch(e, f))return !1
                }
                return !0
            }

            function e(a, b) {
                var c, d = f(a), e = f(b);
                if (d.length !== e.length)return !1;
                for (c = 0; c < e.length; c++)if (!N.capture.stringMatch(d[c], e[c]))return !1;
                return !0
            }

            function f(a) {
                "/" == a.substring(a.length - 1) && (a = a.substring(0, a.length - 1));
                var b = a.split("/");
                return b.length > 2 && "" == b[b.length - 1] && (b = b.slice(0, b.length - 2)), b
            }

            function g() {
                var b, c, e = [];
                for (b = 0; b < a.length; b++)c = a[b], (0 === c.Paremeter.length || d(c.Paremeter, k)) && h(c) && N.array.pushWithoutDuplicate(c, e);
                return e
            }

            function h(a) {
                var b, c;
                for (b = 0; b < a.FormURLs.length; b++)if (c = N.capture.toLowerCaseString(a.FormURLs[b]), e(c, l))return !0;
                return !1
            }

            function i(a) {
                var b, c = [];
                for (b = 0; b < a.length; b++)a[b].Paremeter.length > 0 && N.array.pushWithoutDuplicate(a[b], c);
                return c.length > 0 ? c : a
            }

            function j(a) {
                var b, c, d, e, f = [];
                for (b = 0; b < a.length; b++)for (d = a[b], e = d.FormFields, c = 0; c < e.length; c++)if (N.capture.checkForControls(e[c]).length > 0) {
                    N.array.pushWithoutDuplicate(d, f);
                    break
                }
                return f.length > 0 ? f : a
            }

            var k, l, m;
            return c(), m = g(), {
                matchFormsByURL: function () {
                    return m
                }, preferFormsWithParameters: function (a) {
                    return i(a)
                }, preferFormsWithVisibleFormMappings: function (a) {
                    return j(a)
                }
            }
        }

        function q(a) {
            function b(b) {
                return i || 1 !== a.length ? (b.formfields = c(a), b.FormTypeId = h, b.chatAgentId = null) : (b.formfields = a[0].FormFields, b.FormTypeId = h, b.chatAgentId = a[0].ChatAgentId), b
            }

            function c(a) {
                for (var b = 0, c = []; b < a.length; b++)c = N.array.concatWithoutDuplicate(c, a[b].FormFields);
                return c
            }

            function d() {
                var b;
                for (b = 0; b < j.length; b++)j[b] !== a && (k = N.array.concatWithoutDuplicate(k, j[b]))
            }

            function e() {
                k.length > 0 && !(m.length > 0) && (m = c(k))
            }

            function f() {
                0 === n.length && (l.length > 0 || m.length > 0) && (n = N.array.concatWithoutDuplicate(l, m))
            }

            function g() {
                1 === a.length ? (l = a[0].FormFields, h = a[0].FormTypeId) : (i = !0, h = 1, l = c(a)), d(), e(), f()
            }

            var h, i = !1, j = arguments, k = [], l = [], m = [], n = [];
            return g(), {
                getSettingsJSON: function (a) {
                    return b(a)
                }, getAdditionalForms: function () {
                    return k
                }, getMainFormMappings: function () {
                    return l
                }, getAdditionalFormMappings: function () {
                    return m
                }, getMergedFormMappings: function () {
                    return n
                }
            }
        }

        function r() {
            "use strict";
            function b(b) {
                var c = {
                    journeyId: a.captureConfig.JourneyId,
                    sessionId: J[b].agent.sessionId
                }, d = ["tags", a.journeycode.replace(/-/g, "/"), b, J[b].agentId + ".html"], e = window.location.protocol + a.veHostDomain;
                switch (b) {
                    case"assist":
                        c.searchTerm = J.assist.custom.search.searchTerm
                }
                return N.domain.createUrl(e, d, c)
            }

            function c(a, b) {
                var c = document.createElement("div");
                return c.id = "ve-" + a + "-iframe-overlay", c.setAttribute("data-ve-app-close", a), b.appendChild(c), c
            }

            function d(a, b, c) {
                var d = document.createElement("iframe");
                return d.id = "ve-" + a + "-iframe", d.frameBorder = 0, d.src = c, d.tabIndex = "-1", b.appendChild(d), d
            }

            function f(a, b) {
                var c = document.createElement("div");
                return c.id = "ve-" + a + "-iframe-close", c.setAttribute("data-ve-app-close", a), c.innerHTML = "X", b.appendChild(c), c
            }

            function g(a, b) {
                var e = b.appName, g = "ve-" + e + "-iframe-container";
                if (!document.getElementById(g)) {
                    var h = document.createElement("div");
                    return h.id = g, a.appendChild(h), b.htmlCode && (h.innerHTML = b.htmlCode), b.closeBtn && f(e, h), b.overlay && c(e, h), b.iframeUrl ? d(e, h, b.iframeUrl) : document.getElementById("ChatMainDiv")
                }
            }

            function h() {
                if (!document.getElementById("ve-apps-style-css")) {
                    var b, c, d = VeAPI.version.major + "." + VeAPI.version.minor, e = window.location.protocol + a.veHostDomain + "/scripts/" + d + "/capture-apps-" + d + "." + VeAPI.version.revision + ".css";
                    document.createStyleSheet ? document.createStyleSheet(e) : (c = document.head || document.getElementsByTagName("head")[0], b = document.createElement("link"), b.id = "ve-apps-style-css", b.type = "text/css", b.rel = "stylesheet", c.appendChild(b), b.href = e)
                }
            }

            function i(a, b) {
                H[b] && (H[b] = N.array.removeElementFromArray(H[b], a), 0 === H[b].length && cb.removeEvent(b))
            }

            function j(a) {
                for (var b in H)i(a, b)
            }

            function k() {
            }

            function l(a) {
                a = a || window.event;
                var b = a.currentTarget || a.srcElement;
                k.prototype.hide(b.getAttribute("data-ve-app-close"))
            }

            function m(a) {
                var b = J[a.name];
                a.setElementsToClose(), a.addDraggableEvent(), a.setPositionApp(b.agent), a.inactivityTime = b.agent.inactivityTime || 0, b.app.isAppReady = !0, cb.onInitializedApp(a.name), 0 === a.inactivityTime ? i(a.name, "inactivity") : cb.setInactivityEvent(a.name, a.inactivityTime)
            }

            function n() {
                k.call(this), this.name = "assist"
            }

            function o() {
                function a(a, b) {
                    if (null !== a) {
                        var c, d = document.getElementById(m);
                        null !== d && (c = "<font color='" + s[b].color + "'>" + s[b].name + " </font><font color='#555555'>" + a + "</font><br/><br/>", d.innerHTML += c, d.scrollTop = d.scrollHeight, "agent" === b ? t.stop() : "customer" === b && t.start())
                    }
                }

                function b(a) {
                    null !== a.agentName && "" !== a.agentName && (s.agent.name = a.agentName), null !== a.userName && "" !== a.userName && (s.customer.name = a.userName), null !== a.agentColor && "" !== a.agentColor && (s.agent.color = a.agentColor), null !== a.userColor && "" !== a.userColor && (s.customer.color = a.userColor)
                }

                function c(a) {
                    if (null !== a) {
                        var b = a.toLowerCase();
                        -1 !== b.indexOf("closechat") && r.app.hide("chat")
                    }
                }

                function d(a) {
                    a = a.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    try {
                        a = a.replace(/\r/g, " ").replace(/\n/g, " ")
                    } catch (b) {
                        N.shell.error(b.name + ": " + b.message)
                    }
                    return a
                }

                function e() {
                    if (q > 20)return clearInterval(k), q = 0, void a(r.agent.appSettings.outOfService, "agent");
                    if (q++, null !== l) {
                        var b = document.location.protocol + "//" + ab + "Answer?VeC_PersonalityId=" + r.agentId + "&sessionId=" + r.agent.sessionId + "&questionId=" + l.QuestionId + "&jsoncallback=?";
                        try {
                            VEjQuery.getJSON(b, function (b) {
                                null !== b && null !== b.Response && (clearInterval(k), q = 0, c(b.Response), a(b.Response, "agent"))
                            })
                        } catch (d) {
                            N.shell.error(d.name + ": " + d.message)
                        }
                    }
                }

                function f(b, c) {
                    var d = encodeURIComponent(b), f = document.location.protocol + "//" + ab + "Question?VeC_PersonalityId=" + r.agentId + "&question=" + d + "&sessionId=" + r.agent.sessionId + "&form=" + S + "&jsoncallback=?";
                    try {
                        VEjQuery.getJSON(f, function (b) {
                            return null !== b && null !== b.QuestionId ? (l = b, clearInterval(k), k = setInterval(e, r.agent.appSettings.answerMilliseconds)) : a(r.agent.appSettings.outOfService, "agent"), void 0 !== c && c(), 0
                        })
                    } catch (g) {
                        N.shell.error(g.name + ": " + g.message)
                    }
                }

                function g() {
                    var b, e = document.getElementById(o);
                    null !== e && "" !== e.value && (b = e.value, e.value = "", e.focus(), b = d(b), "" !== b.replace(/^\s+|\s+$/g, "") && (c(b), a(b, "customer"), f(b)))
                }

                function h(a) {
                    a = a || window.event;
                    var b = a.keyCode || a.which;
                    13 === b && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, g())
                }

                function i() {
                    var a = document.getElementById(o);
                    null !== a && a.focus(), g()
                }

                function j(a, b) {
                    function c() {
                        N.shell.info("Converting click in chat"), b && setTimeout(function () {
                            window.location = b
                        }, 1500)
                    }

                    f(a, c), r.app.hide("chat")
                }

                var k, l, m = "ChatFlowDiv", n = "ChatButtonsDiv", o = "ChatInputText", p = "ChatStatusDiv", q = 0, r = null, s = {
                    agent: {
                        color: "#46985c",
                        name: "Agent:"
                    }, customer: {color: "#0265ff", name: "You:"}
                }, t = function () {
                    var a = document.getElementById(p);
                    return {
                        start: function () {
                            a.style.visibility = "visible"
                        }, stop: function () {
                            a.style.visibility = "hidden"
                        }
                    }
                }();
                return {
                    initialize: function (c) {
                        var d = document.getElementById(o), e = document.getElementById(n);
                        null !== d && N.event.addEvent(d, "keydown", h), null !== e && N.event.addEvent(e, "click", i), r = c, b(r.agent.appSettings), a(r.agent.appSettings.firstMessage, "agent")
                    }, convertClick: function (a, b) {
                        j(a, b)
                    }
                }
            }

            function p() {
                function a(a) {
                    a = a || window.event;
                    var c = a.keyCode || a.which;
                    13 === c && b(a)
                }

                function b() {
                    if ("" !== N.string.trim(d.value)) {
                        var a = document.getElementById("ChatButtonsDiv");
                        a && (a.className = "contact-proactive"), N.shell.info("proactive. Email marked as proactive"), J.chat.app.hide("chat")
                    }
                }

                var c = null, d = null;
                return {
                    initialize: function () {
                        d = document.getElementById("veProactiveTextInput"), c = document.getElementById("veProactiveButton"), null !== d && (N.event.addEvent(d, "keydown", a), "ie" === M.browser().toLowerCase() ? window.setTimeout(function () {
                            N.dom.focus(d)
                        }, 1e3) : N.dom.focus(d)), null !== c && N.event.addEvent(c, "click", b)
                    }
                }
            }

            function q() {
                k.call(this), this.name = "chat"
            }

            function r() {
                var a = document.getElementById("veProactiveButton"), b = document.getElementById("veProactiveTextInput");
                return a && b
            }

            k.prototype.name = "", k.prototype.container = null, k.prototype.isDraggable = !1, k.prototype.inactivityTime = 0, k.prototype.isAvailable = function () {
                return !0
            }, k.prototype.isAvailableOnEvent = function (a) {
                return "inactivity" === a && J[this.name].agent.inactivityTime < 1 ? !1 : !0
            }, k.prototype.elementsToClose = [], k.prototype.handleDraggbale = null, k.prototype.appContainer = null, k.prototype.options = {
                isIframe: !0,
                closeBtn: !0,
                overlay: !0
            }, k.prototype.addDraggableEvent = function () {
                function a(a) {
                    function b(a) {
                        return a.pageY ? a.pageY : a.clientY + document.body.scrollTop + document.documentElement.scrollTop
                    }

                    function c(a) {
                        return a.pageX ? a.pageX : a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
                    }

                    function e(a, b) {
                        var c = a;
                        return 0 > a ? c = 0 : a + h.app[b] > h.window[b] && (c = h.window[b] - h.app[b]), c
                    }

                    function f(a) {
                        if (null !== d) {
                            d.style.top = e(b(a) + (h.app.y - h.window.y), "height") + "px", d.style.left = e(c(a) + (h.app.x - h.window.x), "width") + "px";
                            try {
                                a.returnValue = !1
                            } catch (a) {
                                N.shell.error(a.name + ": " + a.message)
                            }
                        }
                    }

                    function g() {
                        N.event.removeEvent(document, "mousemove", f), N.event.removeEvent(document, "mouseup", g)
                    }

                    if (a = a || window.event, null !== d)var h = {
                        window: {
                            width: window.innerWidth ? window.innerWidth : document.documentElement.clientWidth,
                            height: window.innerHeight ? window.innerHeight : document.documentElement.clientHeight,
                            x: c(a),
                            y: b(a)
                        },
                        app: {
                            width: parseInt(d.style.width),
                            height: parseInt(d.style.height),
                            x: parseInt(d.style.left),
                            y: parseInt(d.style.top)
                        }
                    };
                    null !== d && (N.event.addEvent(document, "mousemove", f), N.event.addEvent(document, "mouseup", g))
                }

                var b = this, c = document.getElementById(b.handleDraggbaleId), d = b.appContainer;
                b.isDraggable && null !== c && null !== d && N.event.addEvent(c, "mousedown", a)
            }, k.prototype.setPositionApp = function (a) {
                if (null !== a && a.position && this.appContainer) {
                    var b, c, d = this.appContainer, e = a.position, f = 0, g = 0, h = parseInt(d.style.width), i = parseInt(d.style.height), j = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth, k = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
                    if (null !== e)if (0 === e.type)f = e.coordinates.x, g = e.coordinates.y; else switch (b = j - h, c = k - i, e.relativePosition) {
                        case 0:
                            f = 0, g = 0;
                            break;
                        case 1:
                            f = b / 2, g = 0;
                            break;
                        case 2:
                            f = b, g = 0;
                            break;
                        case 3:
                            f = 0, g = c / 2;
                            break;
                        case 4:
                            f = b / 2, g = c / 2;
                            break;
                        case 5:
                            f = b, g = c / 2;
                            break;
                        case 6:
                            f = 0, g = c;
                            break;
                        case 7:
                            f = b / 2, g = c;
                            break;
                        case 8:
                            f = b, g = c;
                            break;
                        default:
                            f = b / 2, g = c / 2
                    }
                    return f = f > 0 ? f : 0, g = g > 0 ? g : 0, d.style.left = f + "px", d.style.top = g + "px", g + "px"
                }
            }, k.prototype.setElementsToClose = function () {
                var a = this.name;
                this.elementsToClose.push("ve-" + a + "-iframe-close"), this.elementsToClose.push("ve-" + a + "-iframe-overlay")
            }, k.prototype.setContainer = function () {
                if (!this.container) {
                    N.shell.log(this.name + ". Adding to DOM");
                    var a = document.createElement("div");
                    a.id = "ve-" + this.name + "-container", a.style.display = "none", document.getElementsByTagName("body")[0].appendChild(a), this.container = a
                }
            }, k.prototype.show = function () {
                if (this.container) {
                    N.shell.info(this.name + ". Showing"), this.container.style.display = "block", document.getElementById("ve-" + this.name + "-iframe-container").style.top = N.dom.windowTop() + "px";
                    var a, b, c;
                    for (a = 0, b = this.elementsToClose.length; b > a; a += 1)c = document.getElementById(this.elementsToClose[a]), c && (c.setAttribute("data-ve-app-close", this.name), N.event.addEvent(c, "click", l))
                }
            }, k.prototype.hide = function (a) {
                if (J[a].app.container) {
                    N.shell.info(a + ". Hiding"), J[a].app.container.style.display = "none";
                    var b, c, d, e = J[a].app.elementsToClose;
                    for (b = 0, c = e.length; c > b; b += 1)d = document.getElementById(this.elementsToClose[b]), d && N.event.removeEvent(d, "click", l)
                }
            }, k.prototype.remove = function () {
                if (this.container) {
                    var a = this.name;
                    N.shell.log(a + ". Removing from DOM"), J[a].app.isAppReady = !1, N.dom.removeElement(this.container), this.container = null
                }
            }, k.prototype.init = function () {
                function c() {
                    N.shell.log(e.name + ". Iframe is initializing"), m(e)
                }

                function d(b) {
                    if (b.origin === window.location.protocol + a.veHostDomain) {
                        var d = N.ajax.parseJSON(b.data);
                        d.status ? ("success" === d.status && c(), d.iframeHeight && (document.getElementById("ve-assist-iframe").style.height = d.iframeHeight + "px")) : N.shell.info(b.data)
                    }
                }

                var e = this, f = e.name;
                if (this.isAvailable()) {
                    N.shell.info(e.name + ". Loading"), e.remove(), e.setContainer(), h();
                    var i = {appName: f, overlay: e.options.overlay, closeBtn: e.options.closeBtn};
                    e.options.isIframe ? (i.iframeUrl = b(e.name), N.event.addEvent(window, "message", d)) : i.htmlCode = e.options.htmlCode;
                    var l = g(e.container, i);
                    return k.prototype.appContainer = l, !0
                }
                return N.shell.info(f + ". Not available"), j(f), !1
            }, n.prototype = N.object.create(k.prototype), n.prototype.elementsToClose = [], n.prototype.storage = function () {
                var b = new e("assist." + a.captureConfig.JourneyId.toString() + "."), c = b.load(["time", "searchTerm", "closed"]);
                return b.isInVeSession(c.time) ? c.time = N.date.now() : (c.time = 0, c.searchTerm = "", c.closed = "0"), b.store(c), {
                    time: c.time,
                    searchTerm: c.searchTerm,
                    closed: c.closed,
                    store: function (a) {
                        b.store(a)
                    },
                    isInVeSession: function () {
                        return b.isInVeSession(c.time)
                    },
                    load: function (a) {
                        return b.load([a])[a]
                    }
                }
            }(), n.prototype.isAvailable = function () {
                var a, b = J.assist.custom, c = b.search !== !1 ? !0 : !1, d = "assist";
                if (N.shell.info(d + '. SearchTerm: "' + b.search.searchTerm + '"'), c) {
                    if (J[d].agent) {
                        if (a = J[d].agent, a.hasProducts)return a;
                        if (N.shell.info(d + ". There are no products"), a.searchBoxEnabled && b.showNoProducts)return N.shell.info(d + ". SearchBox enabled"), a
                    }
                    c = !1
                }
                return c
            }, n.prototype.init = function () {
                J[this.name].agent.overlay = !0, n.prototype.options = {
                    isIframe: !0,
                    closeBtn: !0,
                    overlay: J[this.name].agent.overlay
                }, k.prototype.init.call(this)
            }, q.prototype = N.object.create(k.prototype), q.prototype.isAvailable = function () {
                var a, b = !0;
                if (b) {
                    if (J[this.name].agent && (a = J[this.name].agent, a.onCloseActive || a.inactivityActive))return a;
                    b = !1
                }
                return b
            }, q.prototype.show = function () {
                k.prototype.show.call(this);
                var a = document.getElementById("ChatMainDiv"), b = document.getElementById("ve-chat-iframe-overlay");
                a && (a.style.visibility = "visible"), b && (b.style.visibility = "visible"), L.initialize(J[this.name])
            }, q.prototype.init = function () {
                if (q.prototype.elementsToClose = ["WindowCloseBtn"], q.prototype.isDraggable = !0, q.prototype.handleDraggbaleId = "WindowTittleDiv", q.prototype.options = {
                        isIframe: !1,
                        closeBtn: !1,
                        overlay: J[this.name].agent.overlay,
                        htmlCode: J[this.name].agent.appSettings.htmlCode
                    }, k.prototype.init.call(this)) {
                    var a = document.getElementById("ve-chat-iframe-overlay");
                    document.getElementById("ve-chat-iframe-container").style.width = 0, a && (a.style.visibility = "hidden"), this.container.style.display = "block", L = r() ? new p : new o, m(this)
                }
            }, J.chat.app = new q, J.assist.app = new n
        }

        function s(a, b) {
            "use strict";
            function c(a) {
                n = a.showNoProducts || !1, N.shell.log("Show no products is: " + n), o = !a.ignoreCloses, N.shell.log("Ignore Closes is: " + !o), p = a.storeSearchTerm || !1, N.shell.log("Store Search Term is: " + p), e = a.replaceCharactersBySpace || !1, f = a.customRegExp || !1, k = a.source || k || "none", N.shell.log("Search term source is: " + k)
            }

            var d, e, f, g = window.location.href, h = new t(a), i = h.getFromReferrer(), j = h.getSearchEngine(), k = j, l = {}, m = b ? b.length : 0, n = !1, o = !0, p = !1;
            for (d = 0; m > d; d += 1) {
                if (l = b[d], i) {
                    if (!l.notSearchEngine && j) {
                        c(l);
                        break
                    }
                } else {
                    if (i = h.getFromRegexp(l, g), i && (l.notSearchEngine || j)) {
                        i = h.cleanSearchTerms(l, i), c(l);
                        break
                    }
                    i = ""
                }
                l = {}
            }
            var q = h.manageStoredSearchTerm(i, l.storeSearchTerm);
            return q !== i && (l = {source: "storage"}, i = q, N.shell.log("Search term taken from storage. Using default settings"), c(l)), {
                get: function () {
                    return {showNoProducts: n, rememberClosed: o, search: {searchTerm: i, searchTermSource: k}}
                }
            }
        }

        function t(a) {
            "use strict";
            function b(a) {
                if (a) {
                    var b = Math.max(a.indexOf("+site%3"), a.indexOf("%20site%3"));
                    -1 !== b && (a = a.substr(0, b))
                }
                return a
            }

            function c(a, b) {
                return ("string" == typeof b || b instanceof RegExp) && (a = a.replace(new RegExp(b, "gi"), " ")), a
            }

            function d(a, b) {
                var c;
                if ("function" == typeof b)try {
                    c = b(a), "string" == typeof c ? a = c : N.shell.error('The setting "customRegExp" is not providing a valid string.')
                } catch (d) {
                    N.shell.error('The setting "customRegExp" is not a valid function.')
                }
                return a
            }

            function e(a, b) {
                var c = {time: N.date.now()};
                return !a && J.assist.app.storage.searchTerm && (a = J.assist.app.storage.searchTerm), b && a && (c.searchTerm = a), J.assist.app.storage.store(c), a
            }

            function f(a, b) {
                return -1 !== b.search(a.regexp) && b.match(a.regexp)[1] ? b.match(a.regexp)[1] : ""
            }

            function g(a, b) {
                return b = N.domain.recursiveURIDecode(b), b = d(b, a.customRegExp), b = c(b, a.replaceCharactersBySpace), b = N.string.cleanString(b)
            }

            function h() {
                var a, b = "";
                for (a in l)a.hasOwnProperty() || (b = b + "|" + a);
                return b.replace("|", "")
            }

            function i() {
                var b = new RegExp(".*?(.|://)(" + h() + ")..*");
                return b.test(a) ? a.replace(b, "$2") : !1
            }

            function j() {
                var c = "";
                if (k) {
                    var d = l[k];
                    d && (c = N.domain.getQueryParameter(d, a) || "", c = N.string.cleanString(b(c)))
                }
                return c
            }

            var k, l = {google: "q", yahoo: "p", aol: "q", ask: "q", bing: "q", baidu: "wd", yandex: "text"};
            return a = N.domain.recursiveURIDecode(a), k = i(), {
                getFromRegexp: function (a, b) {
                    return f(a, b)
                }, manageStoredSearchTerm: function (a, b) {
                    return e(a, b) || a
                }, getFromReferrer: function () {
                    return j()
                }, getSearchEngine: function () {
                    return k
                }, cleanSearchTerms: function (a, b) {
                    return g(a, b)
                }
            }
        }

        function u() {
            "undefined" != typeof J && (VeAPI.manager = {
                isLoaded: function () {
                    return cb ? cb.isLoaded() : !1
                }, isPlaying: function () {
                    return cb ? cb.isPlaying() : !1
                }, isDelayed: function () {
                    return cb ? cb.isDelayed() : !1
                }, isPaused: function () {
                    return cb ? cb.isPaused() : !1
                }, isStopped: function () {
                    return cb ? cb.isStopped() : !1
                }, hasBeenShown: function () {
                    return cb ? cb.hasBeenShown() : !1
                }, delay: function () {
                    cb && cb.delay()
                }, resume: function () {
                    cb && cb.resume()
                }, pause: function () {
                    cb && cb.pause()
                }, stop: function () {
                    cb && cb.stop()
                }, status: function () {
                    cb && cb.status()
                }, isBackButtonEventAdded: function () {
                    return cb ? cb.isEventAdded("backButton") : !1
                }, isExitEventAdded: function () {
                    return cb ? cb.isEventAdded("exit") : !1
                }, isInactivityEventAdded: function () {
                    return cb ? cb.isEventAdded("inactivity") : !1
                }
            }, VeAPI.Chat = {
                convertClick: function (a, b) {
                    VeAPI.chat.convertClick(a, b)
                }
            }, VeAPI.chat = {
                convertClick: function (a, b) {
                    L.convertClick(a, b)
                }, show: function () {
                    cb.isLoaded() && cb.runApp("chat")
                }
            }, VeAPI.assist = {
                show: function () {
                    cb.isLoaded() && cb.runApp("assist")
                }
            }), VeAPI.JSONP = N.ajax.JSONP(), VeAPI.getVersion = function () {
                console.log("VeApps " + VeAPI.version.major + "." + VeAPI.version.minor + "." + VeAPI.version.revision + " Deploy:" + VeAPI.version.deploy + " Build:" + VeAPI.version.build)
            }, VeAPI.capture = {
                capturedControls: function () {
                    return X
                }, formConfiguration: function () {
                    return bb
                }, formId: function () {
                    return S
                }
            }, N.shell.info("VeApps " + VeAPI.version.major + "." + VeAPI.version.minor + "." + VeAPI.version.revision + " Deploy:" + VeAPI.version.deploy + " Build:" + VeAPI.version.build)
        }

        function v(b, c) {
            "use strict";
            function d(a) {
                function b(a) {
                    var b = new RegExp(".*?([-]?[0-9]+([.][0-9]+)?).*", "");
                    return parseFloat(a.toString().replace(b, "$1"))
                }

                function c(a) {
                    var b = new RegExp("[^0-9-.]/", "g");
                    return parseFloat(a.toString().replace(b, ""))
                }

                function d(a) {
                    return a.toString()
                }

                var e = {};
                switch (a) {
                    case"String":
                        e = {
                            "=": function (a, b) {
                                return a = d(a), b = d(b), a === b
                            }, Like: function (a, b) {
                                return a = d(a), b = d(b), -1 !== a.indexOf(b)
                            }, Start: function (a, b) {
                                return a = d(a), b = d(b), a.substring(0, b.length) === b
                            }, End: function (a, b) {
                                return a = d(a), b = d(b), a.substring(a.length - b.length, a.length) === b
                            }, NotLike: function (a, b) {
                                return a = d(a), b = d(b), -1 === a.indexOf(b)
                            }
                        };
                        break;
                    case"Number":
                        e = {
                            "=": function (a, c) {
                                return b(a) === b(c)
                            }, "<": function (a, c) {
                                return b(a) < b(c)
                            }, "<=": function (a, c) {
                                return b(a) <= b(c)
                            }, ">": function (a, c) {
                                return b(a) > b(c)
                            }, ">=": function (a, c) {
                                return b(a) >= b(c)
                            }, Between: function (a, b, c) {
                                return c > a && b > c
                            }
                        };
                        break;
                    case"Currency":
                        e = {
                            "=": function (a, b) {
                                return c(a) === c(b)
                            }, "<": function (a, b) {
                                return c(a) < c(b)
                            }, "<=": function (a, b) {
                                return c(a) <= c(b)
                            }, ">": function (a, b) {
                                return c(a) > c(b)
                            }, ">=": function (a, b) {
                                return c(a) >= c(b)
                            }, Between: function (a, b, c) {
                                return c > a && b > c
                            }
                        };
                        break;
                    case"Date":
                        break;
                    case"default":
                }
                return e
            }

            function e(a, b, c) {
                var e, f, g, h, i = 0;
                if (null !== a && a.length > 0)for (c = N.string.trim(decodeURIComponent(c).toString()), e = 0, f = a.length; f > e; e += 1)if (g = a[e], b == g.FormMappingId && (h = d(g.TypeName), h[g.QueryValue] && h[g.QueryValue](c, g.Value)))return g.PersonalityId;
                return i
            }

            function f(a) {
                var b, c, d, f = 0, g = l;
                for (N.shell.info("chat. Criteria filters found: " + a.length), c = 0, d = g.length; d > c; c++)if (b = g[c], f = e(a, b.fieldId, b.fieldValue))return f;
                return f
            }

            function g(a, b) {
                var c, e, f, h, i, j, k = l;
                for (f = 0, i = k.length; i > f; f++)if (c = k[f], c.fieldId == a.formMappingId && (e = d(a.typeName), null !== a.value && e[a.operator] && e[a.operator](c.fieldValue, a.value))) {
                    if (null === a.innerGrouping || 0 === a.innerGrouping.length)return b;
                    for (h = 0, j = a.innerGrouping.length; j > h; h += 1)if (g(a.innerGrouping[h], b))return b
                }
                return !1
            }

            function h(a) {
                var b, c, d, e = a.criteria, f = a.value;
                for (c = 0, d = e.length; d > c; c += 1)if (b = e[c], g(b, f))return f;
                return 0
            }

            function i(a) {
                if (a) {
                    var b, c, d, e = 0;
                    for (b = 0, c = a.length; c > b; b += 1) {
                        if (d = a[b], 0 === d.criteria.length)return d.value;
                        if (e = h(d))return e
                    }
                }
            }

            function j(a, c) {
                var d;
                for (d in c)if (c.hasOwnProperty(d)) {
                    if (0 === b)return c[d][a];
                    if (d === b.toString())return c[d][a]
                }
                return []
            }

            function k() {
                if (I) {
                    var a, b, d;
                    for (a = 0, b = I.length; b > a; a += 1)d = I[a], "chat" !== d && (m[d] = j(d, c), N.shell.info(d + ". criteria filters found: " + (m[d] ? m[d].length : "0")))
                }
            }

            var l = null, m = {};
            return k(), {
                getAgentId: function (b) {
                    var c = 0;
                    return c = "chat" === b ? f(a.criteriaFilters.chatAgentId) : i(m[b])
                }, setCapturedControls: function (a) {
                    l = a
                }, __getOperators__: d
            }
        }

        function w(b) {
            "use strict";
            function c(b, c) {
                var d;
                return "chat" === b ? d = {
                    path: ["api", b, "getpersonality" + b, c, a.journeycode],
                    params: {},
                    isAjaxRequest: !0
                } : (d = {
                    path: ["api", b, "getagent" + b, c, a.captureConfig.JourneyId, a.journeycode],
                    params: {},
                    isAjaxRequest: !0
                }, "assist" === b && (d.params = {
                    searchTerm: J.assist.custom.search.searchTerm,
                    searchSource: J.assist.custom.search.searchTermSource
                })), d
            }

            function d(a, b, d) {
                if (!b || 0 == b || "chat" === a && !V)N.shell.info(a + ". No agent matches the criteria filters"); else {
                    var e = c(a, b);
                    N.shell.info(a + ". Loading agent: " + b), h(a, e.path, e.params, d, e.isAjaxRequest)
                }
            }

            function e(a, b) {
                null !== b && (b = N.ajax.parseJSON(b, "Not possible to parse the data in the request of the agent for " + a), N.shell.log(a + ". Agent received"), VeAPI[a].agent = J[a].agent = b, cb.isLoaded() || cb.init(), J[a].app.init())
            }

            function f(b) {
                if (I) {
                    var c, e, h, j, k;
                    for (g.setCapturedControls(b), j = 0, k = I.length; k > j; j++)e = I[j], ("chat" !== e || null != V && !V.HasChatBeenClosed) && (h = J[e].agentId, c = g.getAgentId(e), (0 == h && 0 != c || h != c) && (N.shell.info(e + ". Form mappings found: " + b.length), J[e].agentId = c, d(e, c, i[e])))
                } else filterPriorities(a.apps), f(b)
            }

            var g = new v(b, a.criteriaFilters), i = {
                chat: function (a) {
                    e("chat", a)
                }, assist: function (a) {
                    e("assist", a)
                }
            };
            return -1 !== N.array.indexOf("assist", I) && (J.assist.custom = new s(D, settings.keywordsRegExp).get()), {
                findAgents: function (a) {
                    f(a)
                }, getFormId: function () {
                    return b
                }
            }
        }

        function x() {
            "use strict";
            function a(a, b) {
                var c = J[a], d = {
                    path: ["api", "log", c.agentId, b, c.agent.sessionId],
                    params: null,
                    isAjaxRequest: !0
                };
                return d
            }

            function b(b, c) {
                function d() {
                    N.shell.info(b + ". Report " + c)
                }

                function e() {
                    N.shell.log(b + ". Not worked report: " + c)
                }

                if ("chat" === b) {
                    if (4 == c || 5 == c) {
                        var f = {
                            4: "InsertSessionPage",
                            5: "InsertSessionOpen"
                        }, g = window.location.protocol + "//" + J.chat.baseURL + f[c] + "?PersonalityId=" + J.chat.agentId + "&sessionId=" + V.SessionId + "&FormId=" + S;
                        VeAPI.JSONP.request(g, d)
                    }
                } else {
                    var i = a(b, c);
                    h(b, i.path, i.params, d, e)
                }
            }

            return {
                backButtonFired: function (a) {
                    b(a, 3)
                }, exitEventFired: function (a) {
                    b(a, 4)
                }, appAccepted: function (a) {
                    function c() {
                        clearTimeout(e)
                    }

                    function d() {
                        cb.hasBeenShown() && b(a, 5)
                    }

                    var e = null;
                    N.event.addEvent(window, "unload", c), e = setTimeout(d, 1e3)
                }, inactivityFired: function (a) {
                    b(a, 6)
                }
            }
        }

        function y() {
            "use strict";
            function a(a) {
                function b() {
                    history.go(a)
                }

                N.shell.info("BackButton pressed"), cb.onEvent("backButton") && setTimeout(b, 10)
            }

            function b(a) {
                function b() {
                    e = 0, f = null, g = 0, h = null, i = document.createElement("iframe")
                }

                function c() {
                    f = i.src.substr(0, 11), 1 === g && "about:blank" !== f ? i.src = "about:blank" : 2 > e && "about:blank" !== f && (e += 1, h = setTimeout(c, 700))
                }

                function d() {
                    2 === g ? a(-1) : (g += 1, 1 === g && c())
                }

                var e = 0, f = null, g = 0, h = null, i = null;
                this.isEventAdded = !1, this.addEvent = function () {
                    this.removeEvent(), b(), i.src = "about:inprivate", i.style.display = "none", i.tabindex = -1, N.event.addEvent(i, "load", d), document.body.appendChild(i), this.isEventAdded = !0
                }, this.removeEvent = function () {
                    null !== i && null !== i.parentElement && (N.dom.removeElement(i), i = null), this.isEventAdded = !1
                }
            }

            function c(a) {
                function b() {
                    N.event.removeEvent(window, "hashchange", c), k ? k = !1 : (cb.delay(), window.history.go(-1))
                }

                function c() {
                    clearTimeout(h), k = !0, b()
                }

                function d() {
                    l ? l = !1 : (history.state === n && q === o ? (cb.isDelayed() && (cb.pause(), cb.resume()), a(-2)) : q === p && (N.event.addEvent(window, "hashchange", c), h = setTimeout(b, 100)), q = history.state)
                }

                function e() {
                    function a(a) {
                        q = a
                    }

                    i = window.history.pushState, window.history.pushState = function (b) {
                        return "function" == typeof window.history.onpushstate && window.history.onpushstate({state: b}), a(b), i.apply(window.history, arguments)
                    }
                }

                function f() {
                    function a(a) {
                        switch (q) {
                            case n:
                                n = a;
                                break;
                            case o:
                                o = a;
                                break;
                            case p:
                                p = a
                        }
                        q = a
                    }

                    j = window.history.replaceState, window.history.replaceState = function (b) {
                        return "function" == typeof window.history.onreplacestate && window.history.onreplacestate({state: b}), a(b), j.apply(window.history, arguments)
                    }
                }

                function g() {
                    var a = history.length;
                    m || (m = !0, window.history.pushState(n, n, location.href), history.length <= a ? window.history.replaceState(p, p, location.href) : window.history.pushState(o, o, location.href), q = history.state, e(), f())
                }

                {
                    var h = null, i = null, j = null, k = !1, l = !1, m = !1, n = "VeBackButton1", o = "VeBackButton2", p = "VeBackButtonReplaced", q = history.state, r = "VeHashOnStart";
                    -1 !== N.array.indexOf("#", location.href) ? location.hash.split("#")[1] || "" : r
                }
                this.isEventAdded = !1, this.addEvent = function () {
                    function a() {
                        g(), "interactive" !== document.readyState || "Chrome" !== M.browser() && "Safari" !== M.browser() || (l = !0), b.isEventAdded = N.event.addEvent(window, "popstate", d)
                    }

                    var b = this;
                    N.shell.log("Event BackButton added"), history.state === n ? (history.go(-1), b.isEventAdded = !0, setTimeout(a, 10)) : history.state === o ? (history.go(-2), b.isEventAdded = !0, setTimeout(a, 10)) : a()
                }, this.removeEvent = function () {
                    N.shell.log("Event BackButton removed"), this.isEventAdded = !N.event.removeEvent(window, "popstate", d)
                }
            }

            function d(a) {
                N.shell.info("Beforeunload event fired");
                var b = cb.onEvent("exit");
                return b ? ((a || window.event).returnValue = b, b) : void 0
            }

            function e() {
                N.shell.info("Inactivity event fired"), h.stop(), cb.onEvent("inactivity")
            }

            function f() {
                h.reset(h.duration)
            }

            var g = null, h = null, i = null, j = null, k = null;
            return {
                addEvent: function (a) {
                    switch (a) {
                        case"backButton":
                            history.length > 1 && (k.isEventAdded || k.addEvent(), g.isEventAdded || (N.shell.log("Event beforeunload added"), g.addEvent()));
                            break;
                        case"exit":
                            !k.isEventAdded && history.length > 1 && k.addEvent(), g.isEventAdded || (N.shell.log("Event beforeunload added"), g.addEvent());
                            break;
                        case"inactivity":
                            h.start(F), N.shell.log("Event " + a + " added"), i.isEventAdded || i.addEvent(), j.isEventAdded || j.addEvent()
                    }
                }, removeEvent: function (a) {
                    switch (N.shell.log("Event " + a + " removed"), a) {
                        case"backButton":
                            break;
                        case"exit":
                            k.isEventAdded || g.removeEvent();
                            break;
                        case"inactivity":
                            h.stop(), i.removeEvent(), j.removeEvent()
                    }
                }, stopInactivity: function () {
                    h.stop()
                }, startInactivity: function () {
                    h.start()
                }, resetInactivity: function () {
                    h.reset()
                }, isEventAdded: function (a) {
                    switch (a) {
                        case"backButton":
                            return k.isEventAdded;
                        case"exit":
                            return g.isEventAdded;
                        case"inactivity":
                            return h.isEventAdded;
                        case"load":
                            return !1
                    }
                }, init: function () {
                    N.shell.log("Loading EventsManager"), k = "IE" === M.browser() ? new b(a) : new c(a), g = new N.modules.Event(window, "beforeunload", d), h = new N.modules.Timer(e), VeAPI.manager.inactivityCounter = h.counter, i = new N.modules.Event(document.body, "mousemove", f), j = new N.modules.Event(document.body, "keydown", f)
                }
            }
        }

        function z() {
            "use strict";
            function a() {
                cb.onSettingsDelaying()
            }

            function b() {
                a()
            }

            function c() {
                a()
            }

            function d() {
                function b() {
                    a()
                }

                var c = document.getElementsByTagName("form");
                return {
                    addEvent: function () {
                        N.event.addEventsToArray(c, "submit", b)
                    }, removeEvent: function () {
                        N.event.removeEventsFromArray(c, "submit", b)
                    }
                }
            }

            function e() {
                function b() {
                    a()
                }

                var c = [];
                return {
                    addEvent: function (a) {
                        c = N.dom.getElementsByQuerySelectors(a), N.event.addEventsToArray(c, "click", b)
                    }, removeEvent: function () {
                        N.event.removeEventsFromArray(c, "click", b)
                    }
                }
            }

            function f() {
                function b() {
                    a()
                }

                var c = [];
                return {
                    addEvent: function (a) {
                        c = N.dom.getElementsByQuerySelectors(a), N.event.addEventsToArray(c, "mousedown", b)
                    }, removeEvent: function () {
                        N.event.removeEventsFromArray(c, "mousedown", b)
                    }
                }
            }

            function g(a, b) {
                n[a] !== b && (n[a] = b, cb.onSettingsPausingChange(n))
            }

            function h(a) {
                g(a, !0)
            }

            function i(a) {
                g(a, !1)
            }

            function j() {
                function a(a) {
                    var b, c = I.length;
                    for (b = 0; c > b; b += 1)if (a.id === "ve-" + I[b] + "-iframe")return a.blur(), !0;
                    return !1
                }

                function b() {
                    window.setTimeout(function () {
                        document.activeElement ? "iframe" !== document.activeElement.tagName.toLowerCase() || a(document.activeElement) ? i(c) : h(c) : i(c)
                    }, 10)
                }

                var c = "iframeHandler";
                return {
                    addEvent: function () {
                        "IE8" === M.browser() ? (N.event.addEvent(document.body, "focusin", b), N.event.addEvent(document.body, "focusout", b)) : (N.event.addEvent(window, "focus", b), N.event.addEvent(window, "blur", b))
                    }, removeEvent: function () {
                        "IE8" === M.browser() ? (N.event.removeEvent(document.body, "focusin", b), N.event.removeEvent(document.body, "focusout", b)) : (N.event.removeEvent(window, "focus", b), N.event.removeEvent(window, "blur", b)), i(c)
                    }
                }
            }

            function k() {
                function a(a) {
                    f = N.array.removeElementFromArray(f, a), 0 === f.length && i(e)
                }

                function b(c) {
                    c.closed ? a(c) : setTimeout(function () {
                        b(c)
                    }, 500)
                }

                function c(a) {
                    f.push(a), f.length >= 1 && h(e), b(a)
                }

                function d() {
                    N.shell.log("Overwriting window.open"), window.open = function (a) {
                        return function (b, d, e) {
                            var f;
                            return d = d || "", f = a(b, d, e), f && c(f), f
                        }
                    }(window.open)
                }

                var e = "windowOpenHandler", f = [], g = window.open;
                return {
                    addEvent: function () {
                        d()
                    }, removeEvent: function () {
                        window.open = g, f = [], i(e)
                    }
                }
            }

            function l() {
                var a = "autocompleteInputsHandler", b = null;
                return {
                    addEvent: function (c) {
                        b = N.dom.getElementsByQuerySelectors(c);
                        for (var d = 0; d < b.length; d++)N.event.addEvent(b[d], "focus", function () {
                            h(a)
                        }), N.event.addEvent(b[d], "blur", function () {
                            i(a)
                        })
                    }, removeEvent: function () {
                        if (b)for (var c = 0; c < b.length; c++)N.event.removeEvent(b[c], "focus", function () {
                            h(a)
                        }), N.event.removeEvent(b[c], "blur", function () {
                            i(a)
                        });
                        i(a)
                    }
                }
            }

            function m() {
                cb.onSettingsStoppingApps()
            }

            var n = {
                iframeHandler: !1,
                windowOpenHandler: !1,
                inputSearchAutocomplete: !1
            }, o = null, p = null, q = null, r = null, s = null, t = null, u = null, v = null, w = new function () {
                function a() {
                    m()
                }

                var b = [];
                this.addEvent = function (c) {
                    b = N.dom.getElementsByQuerySelectors(c), N.event.addEventsToArray(b, "click", a)
                }, this.removeEvent = function () {
                    N.event.removeEventsFromArray(b, "click", a)
                }
            }, x = new function () {
                function a() {
                    m()
                }

                var b = [];
                this.addEvent = function (c) {
                    b = N.dom.getElementsByQuerySelectors(c), N.event.addEventsToArray(b, "mousedown", a)
                }, this.removeEvent = function () {
                    N.event.removeEventsFromArray(b, "mousedown", a)
                }
            }, y = new function () {
                function a() {
                    N.shell.log("Element stopping event triggered"), m()
                }

                function b(b, c) {
                    function d(b) {
                        N.event.addEvent(b, c, a), i.push({element: b, eventType: c, handler: a})
                    }

                    function e(a) {
                        setTimeout(function () {
                            d(a)
                        }, 200)
                    }

                    for (var f = 0, g = N.dom.querySelectorAll(b); f < g.length; f += 1)e(g[f])
                }

                function c(a) {
                    var b = 0, c = [];
                    for (b = 0; b < h.length; b += 1)h[b].creatorElement === a && c.push(b);
                    return c
                }

                function d(a, d) {
                    for (var e = 0, g = null, i = c(d); e < i.length; e += 1)g = h[i[e]], g.elementsQueryArray.length > 0 ? f(g.elementsQueryArray[g.elementsQueryArray.length - 1], g.eventsTypeArray[g.eventsTypeArray.length - 1], g.elementsQueryArray.slice(0, g.elementsQueryArray.length - 1), g.eventsTypeArray.slice(0, g.eventsTypeArray.length - 1), g.finalElementQuery, g.finalElementEventType) : b(g.finalElementQuery, g.finalElementEventType)
                }

                function e(a, b, c, e, f, g) {
                    function i(b) {
                        d(b, a)
                    }

                    N.event.addEvent(a, b, i), h.push({
                        creatorElement: a,
                        eventType: b,
                        handler: i,
                        elementsQueryArray: c,
                        eventsTypeArray: e,
                        finalElementQuery: f,
                        finalElementEventType: g
                    })
                }

                function f(a, b, c, d, f, g) {
                    var h = 0, i = N.dom.querySelectorAll(a);
                    if (i.length > 0)for (; h < i.length; h += 1)e(i[h], b, c, d, f, g)
                }

                function g(a, b, c, d, e) {
                    for (var h = 0; h < a.length; h += 1)a[h].doesElementExistOnLoad ? f(a[h].elementQuery, a[h].eventType, b, c, d, e) : (b.push(a[h].elementQuery), c.push(a[h].eventType), g(a[h].creatorElements, b, c, d, e))
                }

                var h = [], i = [], j = null;
                this.addEvent = function (a) {
                    j = a;
                    for (var c = 0; c < j.length; c += 1)j[c].doesElementExistOnLoad ? b(j[c].elementQuery, j[c].eventType) : g(j[c].creatorElements, [], [], j[c].elementQuery, j[c].eventType)
                }, this.removeEvent = function () {
                    for (var a = 0; a < h.length; a += 1)N.event.removeEvent(h[a].creatorElement, h[a].eventType, h[a].handler);
                    for (a = 0; a < i.length; a += 1)N.event.removeEvent(i[a].element, i[a].eventType, i[a].handler);
                    h = [], i = []
                }
            };
            return {
                init: function () {
                    N.shell.log("Loading SettingsManager"), o = new N.modules.Event(document.body, "mousedown", b), p = new N.modules.Event(document.body, "keydown", c), q = d(), r = e(), s = f(), t = j(), u = k(), v = l()
                }, addSettings: function (a, b) {
                    switch (a) {
                        case"default":
                            o.addEvent(), p.addEvent(), q.addEvent(), t.addEvent();
                            break;
                        case"elementsToDelayOnClick":
                            r.addEvent(b);
                            break;
                        case"elementsToDelayOnMouseDown":
                            s.addEvent(b);
                            break;
                        case"windowOpenHandler":
                            b && u.addEvent();
                            break;
                        case"autocompleteInputsHandler":
                            v.addEvent(b);
                            break;
                        case"elementsStoppingAppsOnClick":
                            w.addEvent(b);
                            break;
                        case"elementsStoppingAppsOnMouseDown":
                            x.addEvent(b);
                            break;
                        case"elementsStoppingAppsOnEvent":
                            y.addEvent(b)
                    }
                }, removeSettings: function (a) {
                    switch (a) {
                        case"default":
                            o.removeEvent(), p.removeEvent(), q.removeEvent(), t.removeEvent();
                            break;
                        case"elementsToDelayOnClick":
                            r.removeEvent();
                            break;
                        case"elementsToDelayOnMouseDown":
                            s.removeEvent();
                            break;
                        case"windowOpenHandler":
                            u.removeEvent();
                            break;
                        case"autocompleteInputsHandler":
                            v.removeEvent();
                            break;
                        case"elementsStoppingAppsOnClick":
                            w.removeEvent();
                            break;
                        case"elementsStoppingAppsOnMouseDown":
                            x.removeEvent();
                            break;
                        case"elementsStoppingAppsOnEvent":
                            y.removeEvent()
                    }
                }
            }
        }

        function A() {
            function b(b) {
                null !== b && (V = b, VeAPI.chat.criteriaFilters = V, a.criteriaFilters.chatAgentId = V.criteriaFilters, N.shell.info("chat. Criteria filters received."), null !== agentManager && agentManager.findAgents(X))
            }

            var c = ["GetCriteriaFilters"], d = {VeC_AgentId: S, journeyCode: a.journeycode};
            h("chat", c, d, b, !1)
        }

        function B() {
            M.isSupported() && (S || -1 === N.array.indexOf("assist", I) || (N.shell.info("assist. No formId. Forcing to load"), agentManager = new w(0), agentManager.findAgents(X)))
        }

        function C(a) {
            M.isSupported() && (agentManager = new w(a), agentManager.findAgents(X))
        }

        if (!VeAPI.isInitialized) {
            VeAPI.isInitialized = !0, settings = function (a) {
                var b, c = 0, d = 0, e = {
                    unsupportedBrowsersVersionPlatform: {},
                    domainsToIgnore: [],
                    windowOpenHandler: !0,
                    hasCustomSettings: !1,
                    consoleMessagesEnabled: !1
                };
                for (b in e)void 0 === a[b] && (a[b] = e[b]);
                if (a.elementsToIgnore) {
                    if (a.elementsStoppingAppsOnClick)for (d = a.elementsToIgnore.length, c = 0; d > c; c += 1)a.elementsStoppingAppsOnClick.push(a.elementsToIgnore[c]); else a.elementsStoppingAppsOnClick = a.elementsToIgnore;
                    delete a.elementsToIgnore
                }
                if (a.inputSearchAutocomplete) {
                    if (a.autocompleteInputsHandler)for (d = a.autocompleteInputsHandler.length, c = 0; d > c; c += 1)a.autocompleteInputsHandler.push(a.inputSearchAutocomplete[c]); else a.autocompleteInputsHandler = a.inputSearchAutocomplete;
                    delete a.inputSearchAutocomplete
                }
                return a
            }(a.settings);
            var D = document.referrer, E = ["exit", "inactivity", "backButton"], F = 0, G = !1, H = {}, I = c(a.apps), J = {
                assist: {
                    app: null,
                    agentId: 0,
                    agent: null,
                    criteriaFilter: null,
                    baseURL: a.assistServicesUrl,
                    custom: {search: {searchTerm: "", searchTermSource: ""}, showNoProducts: !1, rememberClosed: !0}
                },
                chat: {app: null, agentId: 0, agent: null, criteriaFilter: null, baseURL: a.chatServicesUrl, custom: {}}
            }, K = 3, L = null, M = null;
            agentManager = null, function (a, b) {
                function c(a) {
                    var b = a.length, c = rb.type(a);
                    return rb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
                }

                function d(a) {
                    var b = V[a] = {};
                    return rb.each(a.match(tb) || [], function (a, c) {
                        b[c] = !0
                    }), b
                }

                function e(a, c, d, e) {
                    if (rb.acceptData(a)) {
                        var f, g, h = rb.expando, i = "string" == typeof c, j = a.nodeType, k = j ? rb.cache : a, l = j ? a[h] : a[h] && h;
                        if (l && k[l] && (e || k[l].data) || !i || d !== b)return l || (j ? a[h] = l = ib.pop() || rb.guid++ : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = rb.noop)), ("object" == typeof c || "function" == typeof c) && (e ? k[l] = rb.extend(k[l], c) : k[l].data = rb.extend(k[l].data, c)), f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[rb.camelCase(c)] = d), i ? (g = f[c], null == g && (g = f[rb.camelCase(c)])) : g = f, g
                    }
                }

                function f(a, b, c) {
                    if (rb.acceptData(a)) {
                        var d, e, f, g = a.nodeType, i = g ? rb.cache : a, j = g ? a[rb.expando] : rb.expando;
                        if (i[j]) {
                            if (b && (f = c ? i[j] : i[j].data)) {
                                for ((rb.isArray(b) ? b = b.concat(rb.map(b, rb.camelCase)) : b in f ? b = [b] : (b = rb.camelCase(b), b = b in f ? [b] : b.split(" ")), d = 0, e = b.length); e > d; d++)delete f[b[d]];
                                if (!(c ? h : rb.isEmptyObject)(f))return
                            }
                            (c || (delete i[j].data, h(i[j]))) && (g ? rb.cleanData([a], !0) : rb.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null)
                        }
                    }
                }

                function g(a, c, d) {
                    if (d === b && 1 === a.nodeType) {
                        var e = "data-" + c.replace(X, "-$1").toLowerCase();
                        if (d = a.getAttribute(e), "string" == typeof d) {
                            try {
                                d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : W.test(d) ? rb.parseJSON(d) : d
                            } catch (f) {
                            }
                            rb.data(a, c, d)
                        } else d = b
                    }
                    return d
                }

                function h(a) {
                    for (var b in a)if (("data" !== b || !rb.isEmptyObject(a[b])) && "toJSON" !== b)return !1;
                    return !0
                }

                function i() {
                    return !0
                }

                function j() {
                    return !1
                }

                function k(a, b) {
                    do a = a[b]; while (a && 1 !== a.nodeType);
                    return a
                }

                function l(a, b, c) {
                    if (b = b || 0, rb.isFunction(b))return rb.grep(a, function (a, d) {
                        var e = !!b.call(a, d, a);
                        return e === c
                    });
                    if (b.nodeType)return rb.grep(a, function (a) {
                        return a === b === c
                    });
                    if ("string" == typeof b) {
                        var d = rb.grep(a, function (a) {
                            return 1 === a.nodeType
                        });
                        if (Xb.test(b))return rb.filter(b, d, !c);
                        b = rb.filter(b, d)
                    }
                    return rb.grep(a, function (a) {
                        return rb.inArray(a, b) >= 0 === c
                    })
                }

                function m(a) {
                    var b = $b.split("|"), c = a.createDocumentFragment();
                    if (c.createElement)for (; b.length;)c.createElement(b.pop());
                    return c
                }

                function n(a, b) {
                    return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
                }

                function o(a) {
                    var b = a.getAttributeNode("type");
                    return a.type = (b && b.specified) + "/" + a.type, a
                }

                function p(a) {
                    var b = kc.exec(a.type);
                    return b ? a.type = b[1] : a.removeAttribute("type"), a
                }

                function q(a, b) {
                    for (var c, d = 0; null != (c = a[d]); d++)rb._data(c, "globalEval", !b || rb._data(b[d], "globalEval"))
                }

                function r(a, b) {
                    if (1 === b.nodeType && rb.hasData(a)) {
                        var c, d, e, f = rb._data(a), g = rb._data(b, f), h = f.events;
                        if (h) {
                            delete g.handle, g.events = {};
                            for (c in h)for (d = 0, e = h[c].length; e > d; d++)rb.event.add(b, c, h[c][d])
                        }
                        g.data && (g.data = rb.extend({}, g.data))
                    }
                }

                function s(a, b) {
                    var c, d, e;
                    if (1 === b.nodeType) {
                        if (c = b.nodeName.toLowerCase(), !rb.support.noCloneEvent && b[rb.expando]) {
                            e = rb._data(b);
                            for (d in e.events)rb.removeEvent(b, d, e.handle);
                            b.removeAttribute(rb.expando)
                        }
                        "script" === c && b.text !== a.text ? (o(b).text = a.text, p(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), rb.support.html5Clone && a.innerHTML && !rb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && hc.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
                    }
                }

                function t(a, c) {
                    var d, e, f = 0, g = typeof a.getElementsByTagName !== cb ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== cb ? a.querySelectorAll(c || "*") : b;
                    if (!g)for (g = [], d = a.childNodes || a; null != (e = d[f]); f++)!c || rb.nodeName(e, c) ? g.push(e) : rb.merge(g, t(e, c));
                    return c === b || c && rb.nodeName(a, c) ? rb.merge([a], g) : g
                }

                function u(a) {
                    hc.test(a.type) && (a.defaultChecked = a.checked)
                }

                function v(a, b) {
                    if (b in a)return b;
                    for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Ec.length; e--;)if (b = Ec[e] + c, b in a)return b;
                    return d
                }

                function w(a, b) {
                    return a = b || a, "none" === rb.css(a, "display") || !rb.contains(a.ownerDocument, a)
                }

                function x(a, b) {
                    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)d = a[g], d.style && (f[g] = rb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && w(d) && (f[g] = rb._data(d, "olddisplay", B(d.nodeName)))) : f[g] || (e = w(d), (c && "none" !== c || !e) && rb._data(d, "olddisplay", e ? c : rb.css(d, "display"))));
                    for (g = 0; h > g; g++)d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
                    return a
                }

                function y(a, b, c) {
                    var d = xc.exec(b);
                    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
                }

                function z(a, b, c, d, e) {
                    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += rb.css(a, c + Dc[f], !0, e)), d ? ("content" === c && (g -= rb.css(a, "padding" + Dc[f], !0, e)), "margin" !== c && (g -= rb.css(a, "border" + Dc[f] + "Width", !0, e))) : (g += rb.css(a, "padding" + Dc[f], !0, e), "padding" !== c && (g += rb.css(a, "border" + Dc[f] + "Width", !0, e)));
                    return g
                }

                function A(a, b, c) {
                    var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = qc(a), g = rb.support.boxSizing && "border-box" === rb.css(a, "boxSizing", !1, f);
                    if (0 >= e || null == e) {
                        if (e = rc(a, b, f), (0 > e || null == e) && (e = a.style[b]), yc.test(e))return e;
                        d = g && (rb.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
                    }
                    return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
                }

                function B(a) {
                    var b = db, c = Ac[a];
                    return c || (c = C(a, b), "none" !== c && c || (pc = (pc || rb("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (pc[0].contentWindow || pc[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = C(a, b), pc.detach()), Ac[a] = c), c
                }

                function C(a, b) {
                    var c = rb(b.createElement(a)).appendTo(b.body), d = rb.css(c[0], "display");
                    return c.remove(), d
                }

                function D(a, b, c, d) {
                    var e;
                    if (rb.isArray(b))rb.each(b, function (b, e) {
                        c || Gc.test(a) ? d(a, e) : D(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
                    }); else if (c || "object" !== rb.type(b))d(a, b); else for (e in b)D(a + "[" + e + "]", b[e], c, d)
                }

                function E(a) {
                    return function (b, c) {
                        "string" != typeof b && (c = b, b = "*");
                        var d, e = 0, f = b.toLowerCase().match(tb) || [];
                        if (rb.isFunction(c))for (; d = f[e++];)"+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                    }
                }

                function F(a, c, d, e) {
                    function f(i) {
                        var j;
                        return g[i] = !0, rb.each(a[i] || [], function (a, i) {
                            var k = i(c, d, e);
                            return "string" != typeof k || h || g[k] ? h ? !(j = k) : b : (c.dataTypes.unshift(k), f(k), !1)
                        }), j
                    }

                    var g = {}, h = a === Wc;
                    return f(c.dataTypes[0]) || !g["*"] && f("*")
                }

                function G(a, c) {
                    var d, e, f = rb.ajaxSettings.flatOptions || {};
                    for (e in c)c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
                    return d && rb.extend(!0, a, d), a
                }

                function H(a, c, d) {
                    var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
                    for (h in k)h in d && (c[k[h]] = d[h]);
                    for (; "*" === j[0];)j.shift(), f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
                    if (f)for (h in i)if (i[h] && i[h].test(f)) {
                        j.unshift(h);
                        break
                    }
                    if (j[0]in d)g = j[0]; else {
                        for (h in d) {
                            if (!j[0] || a.converters[h + " " + j[0]]) {
                                g = h;
                                break
                            }
                            e || (e = h)
                        }
                        g = g || e
                    }
                    return g ? (g !== j[0] && j.unshift(g), d[g]) : b
                }

                function I(a, b) {
                    var c, d, e, f, g = {}, h = 0, i = a.dataTypes.slice(), j = i[0];
                    if (a.dataFilter && (b = a.dataFilter(b, a.dataType)), i[1])for (e in a.converters)g[e.toLowerCase()] = a.converters[e];
                    for (; d = i[++h];)if ("*" !== d) {
                        if ("*" !== j && j !== d) {
                            if (e = g[j + " " + d] || g["* " + d], !e)for (c in g)if (f = c.split(" "), f[1] === d && (e = g[j + " " + f[0]] || g["* " + f[0]])) {
                                e === !0 ? e = g[c] : g[c] !== !0 && (d = f[0], i.splice(h--, 0, d));
                                break
                            }
                            if (e !== !0)if (e && a.throws)b = e(b); else try {
                                b = e(b)
                            } catch (k) {
                                return {state: "parsererror", error: e ? k : "No conversion from " + j + " to " + d}
                            }
                        }
                        j = d
                    }
                    return {state: "success", data: b}
                }

                function J() {
                    try {
                        return new a.XMLHttpRequest
                    } catch (b) {
                    }
                }

                function K() {
                    try {
                        return new a.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (b) {
                    }
                }

                function L() {
                    return setTimeout(function () {
                        Zc = b
                    }), Zc = rb.now()
                }

                function M(a, b) {
                    rb.each(b, function (b, c) {
                        for (var d = (dd[b] || []).concat(dd["*"]), e = 0, f = d.length; f > e; e++)if (d[e].call(a, b, c))return
                    })
                }

                function N(a, b, c) {
                    var d, e, f = 0, g = cd.length, h = rb.Deferred().always(function () {
                        delete i.elem
                    }), i = function () {
                        if (e)return !1;
                        for (var b = Zc || L(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)j.tweens[g].run(f);
                        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                    }, j = h.promise({
                        elem: a,
                        props: rb.extend({}, b),
                        opts: rb.extend(!0, {specialEasing: {}}, c),
                        originalProperties: b,
                        originalOptions: c,
                        startTime: Zc || L(),
                        duration: c.duration,
                        tweens: [],
                        createTween: function (b, c) {
                            var d = rb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                            return j.tweens.push(d), d
                        },
                        stop: function (b) {
                            var c = 0, d = b ? j.tweens.length : 0;
                            if (e)return this;
                            for (e = !0; d > c; c++)j.tweens[c].run(1);
                            return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                        }
                    }), k = j.props;
                    for (O(k, j.opts.specialEasing); g > f; f++)if (d = cd[f].call(j, a, k, j.opts))return d;
                    return M(j, k), rb.isFunction(j.opts.start) && j.opts.start.call(a, j), rb.fx.timer(rb.extend(i, {
                        elem: a,
                        anim: j,
                        queue: j.opts.queue
                    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
                }

                function O(a, b) {
                    var c, d, e, f, g;
                    for (e in a)if (d = rb.camelCase(e), f = b[d], c = a[e], rb.isArray(c) && (f = c[1], c = a[e] = c[0]), e !== d && (a[d] = c, delete a[e]), g = rb.cssHooks[d], g && "expand"in g) {
                        c = g.expand(c), delete a[d];
                        for (e in c)e in a || (a[e] = c[e], b[e] = f)
                    } else b[d] = f
                }

                function P(a, b, c) {
                    var d, e, f, g, h, i, j, k, l, m = this, n = a.style, o = {}, p = [], q = a.nodeType && w(a);
                    c.queue || (k = rb._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function () {
                        k.unqueued || l()
                    }), k.unqueued++, m.always(function () {
                        m.always(function () {
                            k.unqueued--, rb.queue(a, "fx").length || k.empty.fire()
                        })
                    })), 1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], "inline" === rb.css(a, "display") && "none" === rb.css(a, "float") && (rb.support.inlineBlockNeedsLayout && "inline" !== B(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", rb.support.shrinkWrapBlocks || m.always(function () {
                        n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
                    }));
                    for (e in b)if (g = b[e], _c.exec(g)) {
                        if (delete b[e], i = i || "toggle" === g, g === (q ? "hide" : "show"))continue;
                        p.push(e)
                    }
                    if (f = p.length)for ((h = rb._data(a, "fxshow") || rb._data(a, "fxshow", {}), "hidden"in h && (q = h.hidden), i && (h.hidden = !q), q ? rb(a).show() : m.done(function () {
                        rb(a).hide()
                    }), m.done(function () {
                        var b;
                        rb._removeData(a, "fxshow");
                        for (b in o)rb.style(a, b, o[b])
                    }), e = 0); f > e; e++)d = p[e], j = m.createTween(d, q ? h[d] : 0), o[d] = h[d] || rb.style(a, d), d in h || (h[d] = j.start, q && (j.end = j.start, j.start = "width" === d || "height" === d ? 1 : 0))
                }

                function Q(a, b, c, d, e) {
                    return new Q.prototype.init(a, b, c, d, e)
                }

                function R(a, b) {
                    var c, d = {height: a}, e = 0;
                    for (b = b ? 1 : 0; 4 > e; e += 2 - b)c = Dc[e], d["margin" + c] = d["padding" + c] = a;
                    return b && (d.opacity = d.width = a), d
                }

                function S(a) {
                    return rb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
                }

                var T, U, V, W, X, Y, Z, $, _, ab, bb, cb = typeof b, db = a.document, eb = a.location, fb = a.VEjQuery, gb = a.$, hb = {}, ib = [], jb = "1.9.1", kb = ib.concat, lb = ib.push, mb = ib.slice, nb = ib.indexOf, ob = hb.toString, pb = hb.hasOwnProperty, qb = jb.trim, rb = function (a, b) {
                    return new rb.fn.init(a, b, U)
                }, sb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, tb = /\S+/g, ub = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, vb = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, wb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, xb = /^[\],:{}\s]*$/, yb = /(?:^|:|,)(?:\s*\[)+/g, zb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, Ab = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, Bb = /^-ms-/, Cb = /-([\da-z])/gi, Db = function (a, b) {
                    return b.toUpperCase()
                }, Eb = function (a) {
                    (db.addEventListener || "load" === a.type || "complete" === db.readyState) && (Fb(), rb.ready())
                }, Fb = function () {
                    db.addEventListener ? (db.removeEventListener("DOMContentLoaded", Eb, !1), a.removeEventListener("load", Eb, !1)) : (db.detachEvent("onreadystatechange", Eb), a.detachEvent("onload", Eb))
                };
                rb.fn = rb.prototype = {
                    VEjQuery: jb, constructor: rb, init: function (a, c, d) {
                        var e, f;
                        if (!a)return this;
                        if ("string" == typeof a) {
                            if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : vb.exec(a), !e || !e[1] && c)return !c || c.VEjQuery ? (c || d).find(a) : this.constructor(c).find(a);
                            if (e[1]) {
                                if (c = c instanceof rb ? c[0] : c, rb.merge(this, rb.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : db, !0)), wb.test(e[1]) && rb.isPlainObject(c))for (e in c)rb.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                                return this
                            }
                            if (f = db.getElementById(e[2]), f && f.parentNode) {
                                if (f.id !== e[2])return d.find(a);
                                this.length = 1, this[0] = f
                            }
                            return this.context = db, this.selector = a, this
                        }
                        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : rb.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), rb.makeArray(a, this))
                    }, selector: "", length: 0, size: function () {
                        return this.length
                    }, toArray: function () {
                        return mb.call(this)
                    }, get: function (a) {
                        return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
                    }, pushStack: function (a) {
                        var b = rb.merge(this.constructor(), a);
                        return b.prevObject = this, b.context = this.context, b
                    }, each: function (a, b) {
                        return rb.each(this, a, b)
                    }, ready: function (a) {
                        return rb.ready.promise().done(a), this
                    }, slice: function () {
                        return this.pushStack(mb.apply(this, arguments))
                    }, first: function () {
                        return this.eq(0)
                    }, last: function () {
                        return this.eq(-1)
                    }, eq: function (a) {
                        var b = this.length, c = +a + (0 > a ? b : 0);
                        return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
                    }, map: function (a) {
                        return this.pushStack(rb.map(this, function (b, c) {
                            return a.call(b, c, b)
                        }))
                    }, end: function () {
                        return this.prevObject || this.constructor(null)
                    }, push: lb, sort: [].sort, splice: [].splice
                }, rb.fn.init.prototype = rb.fn, rb.extend = rb.fn.extend = function () {
                    var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
                    for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || rb.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)if (null != (f = arguments[i]))for (e in f)a = h[e], d = f[e], h !== d && (k && d && (rb.isPlainObject(d) || (c = rb.isArray(d))) ? (c ? (c = !1, g = a && rb.isArray(a) ? a : []) : g = a && rb.isPlainObject(a) ? a : {}, h[e] = rb.extend(k, g, d)) : d !== b && (h[e] = d));
                    return h
                }, rb.extend({
                    noConflict: function (b) {
                        return a.$ === rb && (a.$ = gb), b && a.VEjQuery === rb && (a.VEjQuery = fb), rb
                    }, isReady: !1, readyWait: 1, holdReady: function (a) {
                        a ? rb.readyWait++ : rb.ready(!0)
                    }, ready: function (a) {
                        if (a === !0 ? !--rb.readyWait : !rb.isReady) {
                            if (!db.body)return setTimeout(rb.ready);
                            rb.isReady = !0, a !== !0 && --rb.readyWait > 0 || (T.resolveWith(db, [rb]), rb.fn.trigger && rb(db).trigger("ready").off("ready"))
                        }
                    }, isFunction: function (a) {
                        return "function" === rb.type(a)
                    }, isArray: Array.isArray || function (a) {
                        return "array" === rb.type(a)
                    }, isWindow: function (a) {
                        return null != a && a == a.window
                    }, isNumeric: function (a) {
                        return !isNaN(parseFloat(a)) && isFinite(a)
                    }, type: function (a) {
                        return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? hb[ob.call(a)] || "object" : typeof a
                    }, isPlainObject: function (a) {
                        if (!a || "object" !== rb.type(a) || a.nodeType || rb.isWindow(a))return !1;
                        try {
                            if (a.constructor && !pb.call(a, "constructor") && !pb.call(a.constructor.prototype, "isPrototypeOf"))return !1
                        } catch (c) {
                            return !1
                        }
                        for (var d in a);
                        return d === b || pb.call(a, d)
                    }, isEmptyObject: function (a) {
                        for (var b in a)return !1;
                        return !0
                    }, error: function (a) {
                        throw Error(a)
                    }, parseHTML: function (a, b, c) {
                        if (!a || "string" != typeof a)return null;
                        "boolean" == typeof b && (c = b, b = !1), b = b || db;
                        var d = wb.exec(a), e = !c && [];
                        return d ? [b.createElement(d[1])] : (d = rb.buildFragment([a], b, e), e && rb(e).remove(), rb.merge([], d.childNodes))
                    }, parseJSON: function (c) {
                        return a.JSON && a.JSON.parse ? a.JSON.parse(c) : null === c ? c : "string" == typeof c && (c = rb.trim(c), c && xb.test(c.replace(zb, "@").replace(Ab, "]").replace(yb, ""))) ? Function("return " + c)() : (rb.error("Invalid JSON: " + c), b)
                    }, parseXML: function (c) {
                        var d, e;
                        if (!c || "string" != typeof c)return null;
                        try {
                            a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                        } catch (f) {
                            d = b
                        }
                        return d && d.documentElement && !d.getElementsByTagName("parsererror").length || rb.error("Invalid XML: " + c), d
                    }, noop: function () {
                    }, globalEval: function (b) {
                        b && rb.trim(b) && (a.execScript || function (b) {
                            a.eval.call(a, b)
                        })(b)
                    }, camelCase: function (a) {
                        return a.replace(Bb, "ms-").replace(Cb, Db)
                    }, nodeName: function (a, b) {
                        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                    }, each: function (a, b, d) {
                        var e, f = 0, g = a.length, h = c(a);
                        if (d) {
                            if (h)for (; g > f && (e = b.apply(a[f], d), e !== !1); f++); else for (f in a)if (e = b.apply(a[f], d), e === !1)break
                        } else if (h)for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++); else for (f in a)if (e = b.call(a[f], f, a[f]), e === !1)break;
                        return a
                    }, trim: qb && !qb.call(" ") ? function (a) {
                        return null == a ? "" : qb.call(a)
                    } : function (a) {
                        return null == a ? "" : (a + "").replace(ub, "")
                    }, makeArray: function (a, b) {
                        var d = b || [];
                        return null != a && (c(Object(a)) ? rb.merge(d, "string" == typeof a ? [a] : a) : lb.call(d, a)), d
                    }, inArray: function (a, b, c) {
                        var d;
                        if (b) {
                            if (nb)return nb.call(b, a, c);
                            for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
                        }
                        return -1
                    }, merge: function (a, c) {
                        var d = c.length, e = a.length, f = 0;
                        if ("number" == typeof d)for (; d > f; f++)a[e++] = c[f]; else for (; c[f] !== b;)a[e++] = c[f++];
                        return a.length = e, a
                    }, grep: function (a, b, c) {
                        var d, e = [], f = 0, g = a.length;
                        for (c = !!c; g > f; f++)d = !!b(a[f], f), c !== d && e.push(a[f]);
                        return e
                    }, map: function (a, b, d) {
                        var e, f = 0, g = a.length, h = c(a), i = [];
                        if (h)for (; g > f; f++)e = b(a[f], f, d), null != e && (i[i.length] = e); else for (f in a)e = b(a[f], f, d), null != e && (i[i.length] = e);
                        return kb.apply([], i)
                    }, guid: 1, proxy: function (a, c) {
                        var d, e, f;
                        return "string" == typeof c && (f = a[c], c = a, a = f), rb.isFunction(a) ? (d = mb.call(arguments, 2), e = function () {
                            return a.apply(c || this, d.concat(mb.call(arguments)))
                        }, e.guid = a.guid = a.guid || rb.guid++, e) : b
                    }, access: function (a, c, d, e, f, g, h) {
                        var i = 0, j = a.length, k = null == d;
                        if ("object" === rb.type(d)) {
                            f = !0;
                            for (i in d)rb.access(a, c, i, d[i], !0, g, h)
                        } else if (e !== b && (f = !0, rb.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function (a, b, c) {
                                return k.call(rb(a), c)
                            })), c))for (; j > i; i++)c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
                        return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
                    }, now: function () {
                        return (new Date).getTime()
                    }
                }), rb.ready.promise = function (b) {
                    if (!T)if (T = rb.Deferred(), "complete" === db.readyState)setTimeout(rb.ready); else if (db.addEventListener)db.addEventListener("DOMContentLoaded", Eb, !1), a.addEventListener("load", Eb, !1); else {
                        db.attachEvent("onreadystatechange", Eb), a.attachEvent("onload", Eb);
                        var c = !1;
                        try {
                            c = null == a.frameElement && db.documentElement
                        } catch (d) {
                        }
                        c && c.doScroll && function e() {
                            if (!rb.isReady) {
                                try {
                                    c.doScroll("left")
                                } catch (a) {
                                    return setTimeout(e, 50)
                                }
                                Fb(), rb.ready()
                            }
                        }()
                    }
                    return T.promise(b)
                }, rb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
                    hb["[object " + b + "]"] = b.toLowerCase()
                }), U = rb(db), V = {}, rb.Callbacks = function (a) {
                    a = "string" == typeof a ? V[a] || d(a) : rb.extend({}, a);
                    var c, e, f, g, h, i, j = [], k = !a.once && [], l = function (b) {
                        for (e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++)if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                            e = !1;
                            break
                        }
                        c = !1, j && (k ? k.length && l(k.shift()) : e ? j = [] : m.disable())
                    }, m = {
                        add: function () {
                            if (j) {
                                var b = j.length;
                                !function d(b) {
                                    rb.each(b, function (b, c) {
                                        var e = rb.type(c);
                                        "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
                                    })
                                }(arguments), c ? g = j.length : e && (i = b, l(e))
                            }
                            return this
                        }, remove: function () {
                            return j && rb.each(arguments, function (a, b) {
                                for (var d; (d = rb.inArray(b, j, d)) > -1;)j.splice(d, 1), c && (g >= d && g--, h >= d && h--)
                            }), this
                        }, has: function (a) {
                            return a ? rb.inArray(a, j) > -1 : !(!j || !j.length)
                        }, empty: function () {
                            return j = [], this
                        }, disable: function () {
                            return j = k = e = b, this
                        }, disabled: function () {
                            return !j
                        }, lock: function () {
                            return k = b, e || m.disable(), this
                        }, locked: function () {
                            return !k
                        }, fireWith: function (a, b) {
                            return b = b || [], b = [a, b.slice ? b.slice() : b], !j || f && !k || (c ? k.push(b) : l(b)), this
                        }, fire: function () {
                            return m.fireWith(this, arguments), this
                        }, fired: function () {
                            return !!f
                        }
                    };
                    return m
                }, rb.extend({
                    Deferred: function (a) {
                        var b = [["resolve", "done", rb.Callbacks("once memory"), "resolved"], ["reject", "fail", rb.Callbacks("once memory"), "rejected"], ["notify", "progress", rb.Callbacks("memory")]], c = "pending", d = {
                            state: function () {
                                return c
                            }, always: function () {
                                return e.done(arguments).fail(arguments), this
                            }, then: function () {
                                var a = arguments;
                                return rb.Deferred(function (c) {
                                    rb.each(b, function (b, f) {
                                        var g = f[0], h = rb.isFunction(a[b]) && a[b];
                                        e[f[1]](function () {
                                            var a = h && h.apply(this, arguments);
                                            a && rb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                                        })
                                    }), a = null
                                }).promise()
                            }, promise: function (a) {
                                return null != a ? rb.extend(a, d) : d
                            }
                        }, e = {};
                        return d.pipe = d.then, rb.each(b, function (a, f) {
                            var g = f[2], h = f[3];
                            d[f[1]] = g.add, h && g.add(function () {
                                c = h
                            }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                                return e[f[0] + "With"](this === e ? d : this, arguments), this
                            }, e[f[0] + "With"] = g.fireWith
                        }), d.promise(e), a && a.call(e, e), e
                    }, when: function (a) {
                        var b, c, d, e = 0, f = mb.call(arguments), g = f.length, h = 1 !== g || a && rb.isFunction(a.promise) ? g : 0, i = 1 === h ? a : rb.Deferred(), j = function (a, c, d) {
                            return function (e) {
                                c[a] = this, d[a] = arguments.length > 1 ? mb.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                            }
                        };
                        if (g > 1)for (b = Array(g), c = Array(g), d = Array(g); g > e; e++)f[e] && rb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                        return h || i.resolveWith(d, f), i.promise()
                    }
                }), rb.support = function () {
                    var b, c, d, e, f, g, h, i, j, k, l = db.createElement("div");
                    if (l.setAttribute("className", "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = l.getElementsByTagName("*"), d = l.getElementsByTagName("a")[0], !c || !d || !c.length)return {};
                    f = db.createElement("select"), h = f.appendChild(db.createElement("option")), e = l.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b = {
                        getSetAttribute: "t" !== l.className,
                        leadingWhitespace: 3 === l.firstChild.nodeType,
                        tbody: !l.getElementsByTagName("tbody").length,
                        htmlSerialize: !!l.getElementsByTagName("link").length,
                        style: /top/.test(d.getAttribute("style")),
                        hrefNormalized: "/a" === d.getAttribute("href"),
                        opacity: /^0.5/.test(d.style.opacity),
                        cssFloat: !!d.style.cssFloat,
                        checkOn: !!e.value,
                        optSelected: h.selected,
                        enctype: !!db.createElement("form").enctype,
                        html5Clone: "<:nav></:nav>" !== db.createElement("nav").cloneNode(!0).outerHTML,
                        boxModel: "CSS1Compat" === db.compatMode,
                        deleteExpando: !0,
                        noCloneEvent: !0,
                        inlineBlockNeedsLayout: !1,
                        shrinkWrapBlocks: !1,
                        reliableMarginRight: !0,
                        boxSizingReliable: !0,
                        pixelPosition: !1
                    }, e.checked = !0, b.noCloneChecked = e.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !h.disabled;
                    try {
                        delete l.test
                    } catch (m) {
                        b.deleteExpando = !1
                    }
                    e = db.createElement("input"), e.setAttribute("value", ""), b.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), b.radioValue = "t" === e.value, e.setAttribute("checked", "t"), e.setAttribute("name", "t"), g = db.createDocumentFragment(), g.appendChild(e), b.appendChecked = e.checked, b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked, l.attachEvent && (l.attachEvent("onclick", function () {
                        b.noCloneEvent = !1
                    }), l.cloneNode(!0).click());
                    for (k in{
                        submit: !0,
                        change: !0,
                        focusin: !0
                    })l.setAttribute(i = "on" + k, "t"), b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1;
                    return l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = "content-box" === l.style.backgroundClip, rb(function () {
                        var c, d, e, f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", g = db.getElementsByTagName("body")[0];
                        g && (c = db.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(c).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = l.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", j = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = 4 === l.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== g.offsetTop, a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {width: "4px"}).width, d = l.appendChild(db.createElement("div")), d.style.cssText = l.style.cssText = f, d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), typeof l.style.zoom !== cb && (l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (g.style.zoom = 1)), g.removeChild(c), c = l = e = d = null)
                    }), c = f = g = h = d = e = null, b
                }(), W = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, X = /([A-Z])/g, rb.extend({
                    cache: {},
                    expando: "VEjQuery" + (jb + Math.random()).replace(/\D/g, ""),
                    noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
                    hasData: function (a) {
                        return a = a.nodeType ? rb.cache[a[rb.expando]] : a[rb.expando], !!a && !h(a)
                    },
                    data: function (a, b, c) {
                        return e(a, b, c)
                    },
                    removeData: function (a, b) {
                        return f(a, b)
                    },
                    _data: function (a, b, c) {
                        return e(a, b, c, !0)
                    },
                    _removeData: function (a, b) {
                        return f(a, b, !0)
                    },
                    acceptData: function (a) {
                        if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType)return !1;
                        var b = a.nodeName && rb.noData[a.nodeName.toLowerCase()];
                        return !b || b !== !0 && a.getAttribute("classid") === b
                    }
                }), rb.fn.extend({
                    data: function (a, c) {
                        var d, e, f = this[0], h = 0, i = null;
                        if (a === b) {
                            if (this.length && (i = rb.data(f), 1 === f.nodeType && !rb._data(f, "parsedAttrs"))) {
                                for (d = f.attributes; d.length > h; h++)e = d[h].name, e.indexOf("data-") || (e = rb.camelCase(e.slice(5)), g(f, e, i[e]));
                                rb._data(f, "parsedAttrs", !0)
                            }
                            return i
                        }
                        return "object" == typeof a ? this.each(function () {
                            rb.data(this, a)
                        }) : rb.access(this, function (c) {
                            return c === b ? f ? g(f, a, rb.data(f, a)) : null : (this.each(function () {
                                rb.data(this, a, c)
                            }), b)
                        }, null, c, arguments.length > 1, null, !0)
                    }, removeData: function (a) {
                        return this.each(function () {
                            rb.removeData(this, a)
                        })
                    }
                }), rb.extend({
                    queue: function (a, c, d) {
                        var e;
                        return a ? (c = (c || "fx") + "queue", e = rb._data(a, c), d && (!e || rb.isArray(d) ? e = rb._data(a, c, rb.makeArray(d)) : e.push(d)), e || []) : b
                    }, dequeue: function (a, b) {
                        b = b || "fx";
                        var c = rb.queue(a, b), d = c.length, e = c.shift(), f = rb._queueHooks(a, b), g = function () {
                            rb.dequeue(a, b)
                        };
                        "inprogress" === e && (e = c.shift(), d--), f.cur = e, e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
                    }, _queueHooks: function (a, b) {
                        var c = b + "queueHooks";
                        return rb._data(a, c) || rb._data(a, c, {
                                empty: rb.Callbacks("once memory").add(function () {
                                    rb._removeData(a, b + "queue"), rb._removeData(a, c)
                                })
                            })
                    }
                }), rb.fn.extend({
                    queue: function (a, c) {
                        var d = 2;
                        return "string" != typeof a && (c = a, a = "fx", d--), d > arguments.length ? rb.queue(this[0], a) : c === b ? this : this.each(function () {
                            var b = rb.queue(this, a, c);
                            rb._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && rb.dequeue(this, a)
                        })
                    }, dequeue: function (a) {
                        return this.each(function () {
                            rb.dequeue(this, a)
                        })
                    }, delay: function (a, b) {
                        return a = rb.fx ? rb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                            var d = setTimeout(b, a);
                            c.stop = function () {
                                clearTimeout(d)
                            }
                        })
                    }, clearQueue: function (a) {
                        return this.queue(a || "fx", [])
                    }, promise: function (a, c) {
                        var d, e = 1, f = rb.Deferred(), g = this, h = this.length, i = function () {
                            --e || f.resolveWith(g, [g])
                        };
                        for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;)d = rb._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
                        return i(), f.promise(c)
                    }
                });
                var Gb, Hb, Ib = /[\t\r\n]/g, Jb = /\r/g, Kb = /^(?:input|select|textarea|button|object)$/i, Lb = /^(?:a|area)$/i, Mb = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, Nb = /^(?:checked|selected)$/i, Ob = rb.support.getSetAttribute, Pb = rb.support.input;
                rb.fn.extend({
                    attr: function (a, b) {
                        return rb.access(this, rb.attr, a, b, arguments.length > 1)
                    }, removeAttr: function (a) {
                        return this.each(function () {
                            rb.removeAttr(this, a)
                        })
                    }, prop: function (a, b) {
                        return rb.access(this, rb.prop, a, b, arguments.length > 1)
                    }, removeProp: function (a) {
                        return a = rb.propFix[a] || a, this.each(function () {
                            try {
                                this[a] = b, delete this[a]
                            } catch (c) {
                            }
                        })
                    }, addClass: function (a) {
                        var b, c, d, e, f, g = 0, h = this.length, i = "string" == typeof a && a;
                        if (rb.isFunction(a))return this.each(function (b) {
                            rb(this).addClass(a.call(this, b, this.className))
                        });
                        if (i)for (b = (a || "").match(tb) || []; h > g; g++)if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ib, " ") : " ")) {
                            for (f = 0; e = b[f++];)0 > d.indexOf(" " + e + " ") && (d += e + " ");
                            c.className = rb.trim(d)
                        }
                        return this
                    }, removeClass: function (a) {
                        var b, c, d, e, f, g = 0, h = this.length, i = 0 === arguments.length || "string" == typeof a && a;
                        if (rb.isFunction(a))return this.each(function (b) {
                            rb(this).removeClass(a.call(this, b, this.className))
                        });
                        if (i)for (b = (a || "").match(tb) || []; h > g; g++)if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ib, " ") : "")) {
                            for (f = 0; e = b[f++];)for (; d.indexOf(" " + e + " ") >= 0;)d = d.replace(" " + e + " ", " ");
                            c.className = a ? rb.trim(d) : ""
                        }
                        return this
                    }, toggleClass: function (a, b) {
                        var c = typeof a, d = "boolean" == typeof b;
                        return this.each(rb.isFunction(a) ? function (c) {
                            rb(this).toggleClass(a.call(this, c, this.className, b), b)
                        } : function () {
                            if ("string" === c)for (var e, f = 0, g = rb(this), h = b, i = a.match(tb) || []; e = i[f++];)h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e); else(c === cb || "boolean" === c) && (this.className && rb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : rb._data(this, "__className__") || "")
                        })
                    }, hasClass: function (a) {
                        for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Ib, " ").indexOf(b) >= 0)return !0;
                        return !1
                    }, val: function (a) {
                        var c, d, e, f = this[0];
                        return arguments.length ? (e = rb.isFunction(a), this.each(function (c) {
                            var f, g = rb(this);
                            1 === this.nodeType && (f = e ? a.call(this, c, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : rb.isArray(f) && (f = rb.map(f, function (a) {
                                return null == a ? "" : a + ""
                            })), d = rb.valHooks[this.type] || rb.valHooks[this.nodeName.toLowerCase()], d && "set"in d && d.set(this, f, "value") !== b || (this.value = f))
                        })) : f ? (d = rb.valHooks[f.type] || rb.valHooks[f.nodeName.toLowerCase()], d && "get"in d && (c = d.get(f, "value")) !== b ? c : (c = f.value, "string" == typeof c ? c.replace(Jb, "") : null == c ? "" : c)) : void 0
                    }
                }), rb.extend({
                    valHooks: {
                        option: {
                            get: function (a) {
                                var b = a.attributes.value;
                                return !b || b.specified ? a.value : a.text
                            }
                        }, select: {
                            get: function (a) {
                                for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)if (c = d[i], !(!c.selected && i !== e || (rb.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && rb.nodeName(c.parentNode, "optgroup"))) {
                                    if (b = rb(c).val(), f)return b;
                                    g.push(b)
                                }
                                return g
                            }, set: function (a, b) {
                                var c = rb.makeArray(b);
                                return rb(a).find("option").each(function () {
                                    this.selected = rb.inArray(rb(this).val(), c) >= 0
                                }), c.length || (a.selectedIndex = -1), c
                            }
                        }
                    },
                    attr: function (a, c, d) {
                        var e, f, g, h = a.nodeType;
                        return a && 3 !== h && 8 !== h && 2 !== h ? typeof a.getAttribute === cb ? rb.prop(a, c, d) : (f = 1 !== h || !rb.isXMLDoc(a), f && (c = c.toLowerCase(), e = rb.attrHooks[c] || (Mb.test(c) ? Hb : Gb)), d === b ? e && f && "get"in e && null !== (g = e.get(a, c)) ? g : (typeof a.getAttribute !== cb && (g = a.getAttribute(c)), null == g ? b : g) : null !== d ? e && f && "set"in e && (g = e.set(a, d, c)) !== b ? g : (a.setAttribute(c, d + ""), d) : (rb.removeAttr(a, c), b)) : void 0
                    },
                    removeAttr: function (a, b) {
                        var c, d, e = 0, f = b && b.match(tb);
                        if (f && 1 === a.nodeType)for (; c = f[e++];)d = rb.propFix[c] || c, Mb.test(c) ? !Ob && Nb.test(c) ? a[rb.camelCase("default-" + c)] = a[d] = !1 : a[d] = !1 : rb.attr(a, c, ""), a.removeAttribute(Ob ? c : d)
                    },
                    attrHooks: {
                        type: {
                            set: function (a, b) {
                                if (!rb.support.radioValue && "radio" === b && rb.nodeName(a, "input")) {
                                    var c = a.value;
                                    return a.setAttribute("type", b), c && (a.value = c), b
                                }
                            }
                        }
                    },
                    propFix: {
                        tabindex: "tabIndex",
                        readonly: "readOnly",
                        "for": "htmlFor",
                        "class": "className",
                        maxlength: "maxLength",
                        cellspacing: "cellSpacing",
                        cellpadding: "cellPadding",
                        rowspan: "rowSpan",
                        colspan: "colSpan",
                        usemap: "useMap",
                        frameborder: "frameBorder",
                        contenteditable: "contentEditable"
                    },
                    prop: function (a, c, d) {
                        var e, f, g, h = a.nodeType;
                        return a && 3 !== h && 8 !== h && 2 !== h ? (g = 1 !== h || !rb.isXMLDoc(a), g && (c = rb.propFix[c] || c, f = rb.propHooks[c]), d !== b ? f && "set"in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get"in f && null !== (e = f.get(a, c)) ? e : a[c]) : void 0
                    },
                    propHooks: {
                        tabIndex: {
                            get: function (a) {
                                var c = a.getAttributeNode("tabindex");
                                return c && c.specified ? parseInt(c.value, 10) : Kb.test(a.nodeName) || Lb.test(a.nodeName) && a.href ? 0 : b
                            }
                        }
                    }
                }), Hb = {
                    get: function (a, c) {
                        var d = rb.prop(a, c), e = "boolean" == typeof d && a.getAttribute(c), f = "boolean" == typeof d ? Pb && Ob ? null != e : Nb.test(c) ? a[rb.camelCase("default-" + c)] : !!e : a.getAttributeNode(c);
                        return f && f.value !== !1 ? c.toLowerCase() : b
                    }, set: function (a, b, c) {
                        return b === !1 ? rb.removeAttr(a, c) : Pb && Ob || !Nb.test(c) ? a.setAttribute(!Ob && rb.propFix[c] || c, c) : a[rb.camelCase("default-" + c)] = a[c] = !0, c
                    }
                }, Pb && Ob || (rb.attrHooks.value = {
                    get: function (a, c) {
                        var d = a.getAttributeNode(c);
                        return rb.nodeName(a, "input") ? a.defaultValue : d && d.specified ? d.value : b
                    }, set: function (a, c, d) {
                        return rb.nodeName(a, "input") ? (a.defaultValue = c, b) : Gb && Gb.set(a, c, d)
                    }
                }), Ob || (Gb = rb.valHooks.button = {
                    get: function (a, c) {
                        var d = a.getAttributeNode(c);
                        return d && ("id" === c || "name" === c || "coords" === c ? "" !== d.value : d.specified) ? d.value : b
                    }, set: function (a, c, d) {
                        var e = a.getAttributeNode(d);
                        return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", "value" === d || c === a.getAttribute(d) ? c : b
                    }
                }, rb.attrHooks.contenteditable = {
                    get: Gb.get, set: function (a, b, c) {
                        Gb.set(a, "" === b ? !1 : b, c)
                    }
                }, rb.each(["width", "height"], function (a, c) {
                    rb.attrHooks[c] = rb.extend(rb.attrHooks[c], {
                        set: function (a, d) {
                            return "" === d ? (a.setAttribute(c, "auto"), d) : b
                        }
                    })
                })), rb.support.hrefNormalized || (rb.each(["href", "src", "width", "height"], function (a, c) {
                    rb.attrHooks[c] = rb.extend(rb.attrHooks[c], {
                        get: function (a) {
                            var d = a.getAttribute(c, 2);
                            return null == d ? b : d
                        }
                    })
                }), rb.each(["href", "src"], function (a, b) {
                    rb.propHooks[b] = {
                        get: function (a) {
                            return a.getAttribute(b, 4)
                        }
                    }
                })), rb.support.style || (rb.attrHooks.style = {
                    get: function (a) {
                        return a.style.cssText || b
                    }, set: function (a, b) {
                        return a.style.cssText = b + ""
                    }
                }), rb.support.optSelected || (rb.propHooks.selected = rb.extend(rb.propHooks.selected, {
                    get: function (a) {
                        var b = a.parentNode;
                        return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
                    }
                })), rb.support.enctype || (rb.propFix.enctype = "encoding"), rb.support.checkOn || rb.each(["radio", "checkbox"], function () {
                    rb.valHooks[this] = {
                        get: function (a) {
                            return null === a.getAttribute("value") ? "on" : a.value
                        }
                    }
                }), rb.each(["radio", "checkbox"], function () {
                    rb.valHooks[this] = rb.extend(rb.valHooks[this], {
                        set: function (a, c) {
                            return rb.isArray(c) ? a.checked = rb.inArray(rb(a).val(), c) >= 0 : b
                        }
                    })
                });
                var Qb = /^(?:input|select|textarea)$/i, Rb = /^key/, Sb = /^(?:mouse|contextmenu)|click/, Tb = /^(?:focusinfocus|focusoutblur)$/, Ub = /^([^.]*)(?:\.(.+)|)$/;
                rb.event = {
                    global: {},
                    add: function (a, c, d, e, f) {
                        var g, h, i, j, k, l, m, n, o, p, q, r = rb._data(a);
                        if (r) {
                            for (d.handler && (j = d, d = j.handler, f = j.selector), d.guid || (d.guid = rb.guid++), (h = r.events) || (h = r.events = {}), (l = r.handle) || (l = r.handle = function (a) {
                                return typeof rb === cb || a && rb.event.triggered === a.type ? b : rb.event.dispatch.apply(l.elem, arguments)
                            }, l.elem = a), c = (c || "").match(tb) || [""], i = c.length; i--;)g = Ub.exec(c[i]) || [], o = q = g[1], p = (g[2] || "").split(".").sort(), k = rb.event.special[o] || {}, o = (f ? k.delegateType : k.bindType) || o, k = rb.event.special[o] || {}, m = rb.extend({
                                type: o,
                                origType: q,
                                data: e,
                                handler: d,
                                guid: d.guid,
                                selector: f,
                                needsContext: f && rb.expr.match.needsContext.test(f),
                                namespace: p.join(".")
                            }, j), (n = h[o]) || (n = h[o] = [], n.delegateCount = 0, k.setup && k.setup.call(a, e, p, l) !== !1 || (a.addEventListener ? a.addEventListener(o, l, !1) : a.attachEvent && a.attachEvent("on" + o, l))), k.add && (k.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, m) : n.push(m), rb.event.global[o] = !0;
                            a = null
                        }
                    },
                    remove: function (a, b, c, d, e) {
                        var f, g, h, i, j, k, l, m, n, o, p, q = rb.hasData(a) && rb._data(a);
                        if (q && (k = q.events)) {
                            for (b = (b || "").match(tb) || [""], j = b.length; j--;)if (h = Ub.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                                for (l = rb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;)g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                                i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || rb.removeEvent(a, n, q.handle), delete k[n])
                            } else for (n in k)rb.event.remove(a, n + b[j], c, d, !0);
                            rb.isEmptyObject(k) && (delete q.handle, rb._removeData(a, "events"))
                        }
                    },
                    trigger: function (c, d, e, f) {
                        var g, h, i, j, k, l, m, n = [e || db], o = pb.call(c, "type") ? c.type : c, p = pb.call(c, "namespace") ? c.namespace.split(".") : [];
                        if (i = l = e = e || db, 3 !== e.nodeType && 8 !== e.nodeType && !Tb.test(o + rb.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), o = p.shift(), p.sort()), h = 0 > o.indexOf(":") && "on" + o, c = c[rb.expando] ? c : new rb.Event(o, "object" == typeof c && c), c.isTrigger = !0, c.namespace = p.join("."), c.namespace_re = c.namespace ? RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = null == d ? [c] : rb.makeArray(d, [c]), k = rb.event.special[o] || {}, f || !k.trigger || k.trigger.apply(e, d) !== !1)) {
                            if (!f && !k.noBubble && !rb.isWindow(e)) {
                                for (j = k.delegateType || o, Tb.test(j + o) || (i = i.parentNode); i; i = i.parentNode)n.push(i), l = i;
                                l === (e.ownerDocument || db) && n.push(l.defaultView || l.parentWindow || a)
                            }
                            for (m = 0; (i = n[m++]) && !c.isPropagationStopped();)c.type = m > 1 ? j : k.bindType || o, g = (rb._data(i, "events") || {})[c.type] && rb._data(i, "handle"), g && g.apply(i, d), g = h && i[h], g && rb.acceptData(i) && g.apply && g.apply(i, d) === !1 && c.preventDefault();
                            if (c.type = o, !(f || c.isDefaultPrevented() || k._default && k._default.apply(e.ownerDocument, d) !== !1 || "click" === o && rb.nodeName(e, "a") || !rb.acceptData(e) || !h || !e[o] || rb.isWindow(e))) {
                                l = e[h], l && (e[h] = null), rb.event.triggered = o;
                                try {
                                    e[o]()
                                } catch (q) {
                                }
                                rb.event.triggered = b, l && (e[h] = l)
                            }
                            return c.result
                        }
                    },
                    dispatch: function (a) {
                        a = rb.event.fix(a);
                        var c, d, e, f, g, h = [], i = mb.call(arguments), j = (rb._data(this, "events") || {})[a.type] || [], k = rb.event.special[a.type] || {};
                        if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                            for (h = rb.event.handlers.call(this, a, j), c = 0; (f = h[c++]) && !a.isPropagationStopped();)for (a.currentTarget = f.elem, g = 0; (e = f.handlers[g++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, d = ((rb.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), d !== b && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                            return k.postDispatch && k.postDispatch.call(this, a), a.result
                        }
                    },
                    handlers: function (a, c) {
                        var d, e, f, g, h = [], i = c.delegateCount, j = a.target;
                        if (i && j.nodeType && (!a.button || "click" !== a.type))for (; j != this; j = j.parentNode || this)if (1 === j.nodeType && (j.disabled !== !0 || "click" !== a.type)) {
                            for (f = [], g = 0; i > g; g++)e = c[g], d = e.selector + " ", f[d] === b && (f[d] = e.needsContext ? rb(d, this).index(j) >= 0 : rb.find(d, this, null, [j]).length), f[d] && f.push(e);
                            f.length && h.push({elem: j, handlers: f})
                        }
                        return c.length > i && h.push({elem: this, handlers: c.slice(i)}), h
                    },
                    fix: function (a) {
                        if (a[rb.expando])return a;
                        var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
                        for (g || (this.fixHooks[e] = g = Sb.test(e) ? this.mouseHooks : Rb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new rb.Event(f), b = d.length; b--;)c = d[b], a[c] = f[c];
                        return a.target || (a.target = f.srcElement || db), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
                    },
                    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                    fixHooks: {},
                    keyHooks: {
                        props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                            return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                        }
                    },
                    mouseHooks: {
                        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                        filter: function (a, c) {
                            var d, e, f, g = c.button, h = c.fromElement;
                            return null == a.pageX && null != c.clientX && (e = a.target.ownerDocument || db, f = e.documentElement, d = e.body, a.pageX = c.clientX + (f && f.scrollLeft || d && d.scrollLeft || 0) - (f && f.clientLeft || d && d.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || d && d.scrollTop || 0) - (f && f.clientTop || d && d.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
                        }
                    },
                    special: {
                        load: {noBubble: !0}, click: {
                            trigger: function () {
                                return rb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : b
                            }
                        }, focus: {
                            trigger: function () {
                                if (this !== db.activeElement && this.focus)try {
                                    return this.focus(), !1
                                } catch (a) {
                                }
                            }, delegateType: "focusin"
                        }, blur: {
                            trigger: function () {
                                return this === db.activeElement && this.blur ? (this.blur(), !1) : b
                            }, delegateType: "focusout"
                        }, beforeunload: {
                            postDispatch: function (a) {
                                a.result !== b && (a.originalEvent.returnValue = a.result)
                            }
                        }
                    },
                    simulate: function (a, b, c, d) {
                        var e = rb.extend(new rb.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
                        d ? rb.event.trigger(e, null, b) : rb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
                    }
                }, rb.removeEvent = db.removeEventListener ? function (a, b, c) {
                    a.removeEventListener && a.removeEventListener(b, c, !1)
                } : function (a, b, c) {
                    var d = "on" + b;
                    a.detachEvent && (typeof a[d] === cb && (a[d] = null), a.detachEvent(d, c))
                }, rb.Event = function (a, c) {
                    return this instanceof rb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? i : j) : this.type = a, c && rb.extend(this, c), this.timeStamp = a && a.timeStamp || rb.now(), this[rb.expando] = !0, b) : new rb.Event(a, c)
                }, rb.Event.prototype = {
                    isDefaultPrevented: j,
                    isPropagationStopped: j,
                    isImmediatePropagationStopped: j,
                    preventDefault: function () {
                        var a = this.originalEvent;
                        this.isDefaultPrevented = i, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                    },
                    stopPropagation: function () {
                        var a = this.originalEvent;
                        this.isPropagationStopped = i, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
                    },
                    stopImmediatePropagation: function () {
                        this.isImmediatePropagationStopped = i, this.stopPropagation()
                    }
                }, rb.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
                    rb.event.special[a] = {
                        delegateType: b, bindType: b, handle: function (a) {
                            var c, d = this, e = a.relatedTarget, f = a.handleObj;
                            return (!e || e !== d && !rb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                        }
                    }
                }), rb.support.submitBubbles || (rb.event.special.submit = {
                    setup: function () {
                        return rb.nodeName(this, "form") ? !1 : (rb.event.add(this, "click._submit keypress._submit", function (a) {
                            var c = a.target, d = rb.nodeName(c, "input") || rb.nodeName(c, "button") ? c.form : b;
                            d && !rb._data(d, "submitBubbles") && (rb.event.add(d, "submit._submit", function (a) {
                                a._submit_bubble = !0
                            }), rb._data(d, "submitBubbles", !0))
                        }), b)
                    }, postDispatch: function (a) {
                        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && rb.event.simulate("submit", this.parentNode, a, !0))
                    }, teardown: function () {
                        return rb.nodeName(this, "form") ? !1 : (rb.event.remove(this, "._submit"), b)
                    }
                }), rb.support.changeBubbles || (rb.event.special.change = {
                    setup: function () {
                        return Qb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (rb.event.add(this, "propertychange._change", function (a) {
                            "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                        }), rb.event.add(this, "click._change", function (a) {
                            this._just_changed && !a.isTrigger && (this._just_changed = !1), rb.event.simulate("change", this, a, !0)
                        })), !1) : (rb.event.add(this, "beforeactivate._change", function (a) {
                            var b = a.target;
                            Qb.test(b.nodeName) && !rb._data(b, "changeBubbles") && (rb.event.add(b, "change._change", function (a) {
                                !this.parentNode || a.isSimulated || a.isTrigger || rb.event.simulate("change", this.parentNode, a, !0)
                            }), rb._data(b, "changeBubbles", !0))
                        }), b)
                    }, handle: function (a) {
                        var c = a.target;
                        return this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type ? a.handleObj.handler.apply(this, arguments) : b
                    }, teardown: function () {
                        return rb.event.remove(this, "._change"), !Qb.test(this.nodeName)
                    }
                }), rb.support.focusinBubbles || rb.each({focus: "focusin", blur: "focusout"}, function (a, b) {
                    var c = 0, d = function (a) {
                        rb.event.simulate(b, a.target, rb.event.fix(a), !0)
                    };
                    rb.event.special[b] = {
                        setup: function () {
                            0 == c++ && db.addEventListener(a, d, !0)
                        }, teardown: function () {
                            0 == --c && db.removeEventListener(a, d, !0)
                        }
                    }
                }), rb.fn.extend({
                    on: function (a, c, d, e, f) {
                        var g, h;
                        if ("object" == typeof a) {
                            "string" != typeof c && (d = d || c, c = b);
                            for (g in a)this.on(g, c, d, a[g], f);
                            return this
                        }
                        if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1)e = j; else if (!e)return this;
                        return 1 === f && (h = e, e = function (a) {
                            return rb().off(a), h.apply(this, arguments)
                        }, e.guid = h.guid || (h.guid = rb.guid++)), this.each(function () {
                            rb.event.add(this, a, e, d, c)
                        })
                    }, one: function (a, b, c, d) {
                        return this.on(a, b, c, d, 1)
                    }, off: function (a, c, d) {
                        var e, f;
                        if (a && a.preventDefault && a.handleObj)return e = a.handleObj, rb(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
                        if ("object" == typeof a) {
                            for (f in a)this.off(f, c, a[f]);
                            return this
                        }
                        return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = j), this.each(function () {
                            rb.event.remove(this, a, d, c)
                        })
                    }, bind: function (a, b, c) {
                        return this.on(a, null, b, c)
                    }, unbind: function (a, b) {
                        return this.off(a, null, b)
                    }, delegate: function (a, b, c, d) {
                        return this.on(b, a, c, d)
                    }, undelegate: function (a, b, c) {
                        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                    }, trigger: function (a, b) {
                        return this.each(function () {
                            rb.event.trigger(a, b, this)
                        })
                    }, triggerHandler: function (a, c) {
                        var d = this[0];
                        return d ? rb.event.trigger(a, c, d, !0) : b
                    }
                }), function (a, b) {
                    function c(a) {
                        return mb.test(a + "")
                    }

                    function d() {
                        var a, b = [];
                        return a = function (c, d) {
                            return b.push(c += " ") > y.cacheLength && delete a[b.shift()], a[c] = d
                        }
                    }

                    function e(a) {
                        return a[N] = !0, a
                    }

                    function f(a) {
                        var b = F.createElement("div");
                        try {
                            return a(b)
                        } catch (c) {
                            return !1
                        } finally {
                            b = null
                        }
                    }

                    function g(a, b, c, d) {
                        var e, f, g, h, i, j, k, n, o, p;
                        if ((b ? b.ownerDocument || b : O) !== F && E(b), b = b || F, c = c || [], !a || "string" != typeof a)return c;
                        if (1 !== (h = b.nodeType) && 9 !== h)return [];
                        if (!H && !d) {
                            if (e = nb.exec(a))if (g = e[1]) {
                                if (9 === h) {
                                    if (f = b.getElementById(g), !f || !f.parentNode)return c;
                                    if (f.id === g)return c.push(f), c
                                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && L(b, f) && f.id === g)return c.push(f), c
                            } else {
                                if (e[2])return Z.apply(c, $.call(b.getElementsByTagName(a), 0)), c;
                                if ((g = e[3]) && P.getByClassName && b.getElementsByClassName)return Z.apply(c, $.call(b.getElementsByClassName(g), 0)), c
                            }
                            if (P.qsa && !I.test(a)) {
                                if (k = !0, n = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                                    for (j = l(a), (k = b.getAttribute("id")) ? n = k.replace(qb, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;)j[i] = n + m(j[i]);
                                    o = lb.test(a) && b.parentNode || b, p = j.join(",")
                                }
                                if (p)try {
                                    return Z.apply(c, $.call(o.querySelectorAll(p), 0)), c
                                } catch (q) {
                                } finally {
                                    k || b.removeAttribute("id")
                                }
                            }
                        }
                        return u(a.replace(fb, "$1"), b, c, d)
                    }

                    function h(a, b) {
                        var c = b && a, d = c && (~b.sourceIndex || W) - (~a.sourceIndex || W);
                        if (d)return d;
                        if (c)for (; c = c.nextSibling;)if (c === b)return -1;
                        return a ? 1 : -1
                    }

                    function i(a) {
                        return function (b) {
                            var c = b.nodeName.toLowerCase();
                            return "input" === c && b.type === a
                        }
                    }

                    function j(a) {
                        return function (b) {
                            var c = b.nodeName.toLowerCase();
                            return ("input" === c || "button" === c) && b.type === a
                        }
                    }

                    function k(a) {
                        return e(function (b) {
                            return b = +b, e(function (c, d) {
                                for (var e, f = a([], c.length, b), g = f.length; g--;)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                            })
                        })
                    }

                    function l(a, b) {
                        var c, d, e, f, h, i, j, k = T[a + " "];
                        if (k)return b ? 0 : k.slice(0);
                        for (h = a, i = [], j = y.preFilter; h;) {
                            (!c || (d = gb.exec(h))) && (d && (h = h.slice(d[0].length) || h), i.push(e = [])), c = !1, (d = hb.exec(h)) && (c = d.shift(), e.push({
                                value: c,
                                type: d[0].replace(fb, " ")
                            }), h = h.slice(c.length));
                            for (f in y.filter)(d = kb[f].exec(h)) && (!j[f] || (d = j[f](d))) && (c = d.shift(), e.push({
                                value: c,
                                type: f,
                                matches: d
                            }), h = h.slice(c.length));
                            if (!c)break
                        }
                        return b ? h.length : h ? g.error(a) : T(a, i).slice(0)
                    }

                    function m(a) {
                        for (var b = 0, c = a.length, d = ""; c > b; b++)d += a[b].value;
                        return d
                    }

                    function n(a, b, c) {
                        var d = b.dir, e = c && "parentNode" === d, f = R++;
                        return b.first ? function (b, c, f) {
                            for (; b = b[d];)if (1 === b.nodeType || e)return a(b, c, f)
                        } : function (b, c, g) {
                            var h, i, j, k = Q + " " + f;
                            if (g) {
                                for (; b = b[d];)if ((1 === b.nodeType || e) && a(b, c, g))return !0
                            } else for (; b = b[d];)if (1 === b.nodeType || e)if (j = b[N] || (b[N] = {}), (i = j[d]) && i[0] === k) {
                                if ((h = i[1]) === !0 || h === x)return h === !0
                            } else if (i = j[d] = [k], i[1] = a(b, c, g) || x, i[1] === !0)return !0
                        }
                    }

                    function o(a) {
                        return a.length > 1 ? function (b, c, d) {
                            for (var e = a.length; e--;)if (!a[e](b, c, d))return !1;
                            return !0
                        } : a[0]
                    }

                    function p(a, b, c, d, e) {
                        for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                        return g
                    }

                    function q(a, b, c, d, f, g) {
                        return d && !d[N] && (d = q(d)), f && !f[N] && (f = q(f, g)), e(function (e, g, h, i) {
                            var j, k, l, m = [], n = [], o = g.length, q = e || t(b || "*", h.nodeType ? [h] : h, []), r = !a || !e && b ? q : p(q, m, a, h, i), s = c ? f || (e ? a : o || d) ? [] : g : r;
                            if (c && c(r, s, h, i), d)for (j = p(s, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
                            if (e) {
                                if (f || a) {
                                    if (f) {
                                        for (j = [], k = s.length; k--;)(l = s[k]) && j.push(r[k] = l);
                                        f(null, s = [], j, i)
                                    }
                                    for (k = s.length; k--;)(l = s[k]) && (j = f ? _.call(e, l) : m[k]) > -1 && (e[j] = !(g[j] = l))
                                }
                            } else s = p(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : Z.apply(g, s)
                        })
                    }

                    function r(a) {
                        for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = n(function (a) {
                            return a === b
                        }, g, !0), j = n(function (a) {
                            return _.call(b, a) > -1
                        }, g, !0), k = [function (a, c, d) {
                            return !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                        }]; e > h; h++)if (c = y.relative[a[h].type])k = [n(o(k), c)]; else {
                            if (c = y.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                                for (d = ++h; e > d && !y.relative[a[d].type]; d++);
                                return q(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1)).replace(fb, "$1"), c, d > h && r(a.slice(h, d)), e > d && r(a = a.slice(d)), e > d && m(a))
                            }
                            k.push(c)
                        }
                        return o(k)
                    }

                    function s(a, b) {
                        var c = 0, d = b.length > 0, f = a.length > 0, h = function (e, h, i, j, k) {
                            var l, m, n, o = [], q = 0, r = "0", s = e && [], t = null != k, u = D, v = e || f && y.find.TAG("*", k && h.parentNode || h), w = Q += null == u ? 1 : Math.random() || .1;
                            for (t && (D = h !== F && h, x = c); null != (l = v[r]); r++) {
                                if (f && l) {
                                    for (m = 0; n = a[m++];)if (n(l, h, i)) {
                                        j.push(l);
                                        break
                                    }
                                    t && (Q = w, x = ++c)
                                }
                                d && ((l = !n && l) && q--, e && s.push(l))
                            }
                            if (q += r, d && r !== q) {
                                for (m = 0; n = b[m++];)n(s, o, h, i);
                                if (e) {
                                    if (q > 0)for (; r--;)s[r] || o[r] || (o[r] = Y.call(j));
                                    o = p(o)
                                }
                                Z.apply(j, o), t && !e && o.length > 0 && q + b.length > 1 && g.uniqueSort(j)
                            }
                            return t && (Q = w, D = u), s
                        };
                        return d ? e(h) : h
                    }

                    function t(a, b, c) {
                        for (var d = 0, e = b.length; e > d; d++)g(a, b[d], c);
                        return c
                    }

                    function u(a, b, c, d) {
                        var e, f, g, h, i, j = l(a);
                        if (!d && 1 === j.length) {
                            if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType && !H && y.relative[f[1].type]) {
                                if (b = y.find.ID(g.matches[0].replace(tb, ub), b)[0], !b)return c;
                                a = a.slice(f.shift().value.length)
                            }
                            for (e = kb.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !y.relative[h = g.type]);)if ((i = y.find[h]) && (d = i(g.matches[0].replace(tb, ub), lb.test(f[0].type) && b.parentNode || b))) {
                                if (f.splice(e, 1), a = d.length && m(f), !a)return Z.apply(c, $.call(d, 0)), c;
                                break
                            }
                        }
                        return B(a, j)(d, b, H, c, lb.test(a)), c
                    }

                    function v() {
                    }

                    var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date, O = a.document, P = {}, Q = 0, R = 0, S = d(), T = d(), U = d(), V = typeof b, W = -2147483648, X = [], Y = X.pop, Z = X.push, $ = X.slice, _ = X.indexOf || function (a) {
                            for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
                            return -1
                        }, ab = "[\\x20\\t\\r\\n\\f]", bb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", cb = bb.replace("w", "w#"), db = "\\[" + ab + "*(" + bb + ")" + ab + "*(?:([*^$|!~]?=)" + ab + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + cb + ")|)|)" + ab + "*\\]", eb = ":(" + bb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + db.replace(3, 8) + ")*)|.*)\\)|)", fb = RegExp("^" + ab + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ab + "+$", "g"), gb = RegExp("^" + ab + "*," + ab + "*"), hb = RegExp("^" + ab + "*([\\x20\\t\\r\\n\\f>+~])" + ab + "*"), ib = RegExp(eb), jb = RegExp("^" + cb + "$"), kb = {
                        ID: RegExp("^#(" + bb + ")"),
                        CLASS: RegExp("^\\.(" + bb + ")"),
                        NAME: RegExp("^\\[name=['\"]?(" + bb + ")['\"]?\\]"),
                        TAG: RegExp("^(" + bb.replace("w", "w*") + ")"),
                        ATTR: RegExp("^" + db),
                        PSEUDO: RegExp("^" + eb),
                        CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ab + "*(even|odd|(([+-]|)(\\d*)n|)" + ab + "*(?:([+-]|)" + ab + "*(\\d+)|))" + ab + "*\\)|)", "i"),
                        needsContext: RegExp("^" + ab + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ab + "*((?:-\\d)?\\d*)" + ab + "*\\)|)(?=[^-]|$)", "i")
                    }, lb = /[\x20\t\r\n\f]*[+~]/, mb = /^[^{]+\{\s*\[native code/, nb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ob = /^(?:input|select|textarea|button)$/i, pb = /^h\d$/i, qb = /'|\\/g, sb = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, tb = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, ub = function (a, b) {
                        var c = "0x" + b - 65536;
                        return c !== c ? b : 0 > c ? String.fromCharCode(c + 65536) : String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c)
                    };
                    try {
                        $.call(O.documentElement.childNodes, 0)[0].nodeType
                    } catch (vb) {
                        $ = function (a) {
                            for (var b, c = []; b = this[a++];)c.push(b);
                            return c
                        }
                    }
                    A = g.isXML = function (a) {
                        var b = a && (a.ownerDocument || a).documentElement;
                        return b ? "HTML" !== b.nodeName : !1
                    }, E = g.setDocument = function (a) {
                        var d = a ? a.ownerDocument || a : O;
                        return d !== F && 9 === d.nodeType && d.documentElement ? (F = d, G = d.documentElement, H = A(d), P.tagNameNoComments = f(function (a) {
                            return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
                        }), P.attributes = f(function (a) {
                            a.innerHTML = "<select></select>";
                            var b = typeof a.lastChild.getAttribute("multiple");
                            return "boolean" !== b && "string" !== b
                        }), P.getByClassName = f(function (a) {
                            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e", 2 === a.getElementsByClassName("e").length) : !1
                        }), P.getByName = f(function (a) {
                            a.id = N + 0, a.innerHTML = "<a name='" + N + "'></a><div name='" + N + "'></div>", G.insertBefore(a, G.firstChild);
                            var b = d.getElementsByName && d.getElementsByName(N).length === 2 + d.getElementsByName(N + 0).length;
                            return P.getIdNotName = !d.getElementById(N), G.removeChild(a), b
                        }), y.attrHandle = f(function (a) {
                            return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== V && "#" === a.firstChild.getAttribute("href")
                        }) ? {} : {
                            href: function (a) {
                                return a.getAttribute("href", 2)
                            }, type: function (a) {
                                return a.getAttribute("type")
                            }
                        }, P.getIdNotName ? (y.find.ID = function (a, b) {
                            if (typeof b.getElementById !== V && !H) {
                                var c = b.getElementById(a);
                                return c && c.parentNode ? [c] : []
                            }
                        }, y.filter.ID = function (a) {
                            var b = a.replace(tb, ub);
                            return function (a) {
                                return a.getAttribute("id") === b
                            }
                        }) : (y.find.ID = function (a, c) {
                            if (typeof c.getElementById !== V && !H) {
                                var d = c.getElementById(a);
                                return d ? d.id === a || typeof d.getAttributeNode !== V && d.getAttributeNode("id").value === a ? [d] : b : []
                            }
                        }, y.filter.ID = function (a) {
                            var b = a.replace(tb, ub);
                            return function (a) {
                                var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                                return c && c.value === b
                            }
                        }), y.find.TAG = P.tagNameNoComments ? function (a, c) {
                            return typeof c.getElementsByTagName !== V ? c.getElementsByTagName(a) : b
                        } : function (a, b) {
                            var c, d = [], e = 0, f = b.getElementsByTagName(a);
                            if ("*" === a) {
                                for (; c = f[e++];)1 === c.nodeType && d.push(c);
                                return d
                            }
                            return f
                        }, y.find.NAME = P.getByName && function (a, c) {
                            return typeof c.getElementsByName !== V ? c.getElementsByName(name) : b
                        }, y.find.CLASS = P.getByClassName && function (a, c) {
                            return typeof c.getElementsByClassName === V || H ? b : c.getElementsByClassName(a)
                        }, J = [], I = [":focus"], (P.qsa = c(d.querySelectorAll)) && (f(function (a) {
                            a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || I.push("\\[" + ab + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || I.push(":checked")
                        }), f(function (a) {
                            a.innerHTML = "<input type='hidden' i=''/>", a.querySelectorAll("[i^='']").length && I.push("[*^$]=" + ab + "*(?:\"\"|'')"), a.querySelectorAll(":enabled").length || I.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), I.push(",.*:")
                        })), (P.matchesSelector = c(K = G.matchesSelector || G.mozMatchesSelector || G.webkitMatchesSelector || G.oMatchesSelector || G.msMatchesSelector)) && f(function (a) {
                            P.disconnectedMatch = K.call(a, "div"), K.call(a, "[s!='']:x"), J.push("!=", eb)
                        }), I = RegExp(I.join("|")), J = RegExp(J.join("|")), L = c(G.contains) || G.compareDocumentPosition ? function (a, b) {
                            var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                            return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                        } : function (a, b) {
                            if (b)for (; b = b.parentNode;)if (b === a)return !0;
                            return !1
                        }, M = G.compareDocumentPosition ? function (a, b) {
                            var c;
                            return a === b ? (C = !0, 0) : (c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? 1 & c || a.parentNode && 11 === a.parentNode.nodeType ? a === d || L(O, a) ? -1 : b === d || L(O, b) ? 1 : 0 : 4 & c ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
                        } : function (a, b) {
                            var c, e = 0, f = a.parentNode, g = b.parentNode, i = [a], j = [b];
                            if (a === b)return C = !0, 0;
                            if (!f || !g)return a === d ? -1 : b === d ? 1 : f ? -1 : g ? 1 : 0;
                            if (f === g)return h(a, b);
                            for (c = a; c = c.parentNode;)i.unshift(c);
                            for (c = b; c = c.parentNode;)j.unshift(c);
                            for (; i[e] === j[e];)e++;
                            return e ? h(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                        }, C = !1, [0, 0].sort(M), P.detectDuplicates = C, F) : F
                    }, g.matches = function (a, b) {
                        return g(a, null, null, b)
                    }, g.matchesSelector = function (a, b) {
                        if ((a.ownerDocument || a) !== F && E(a), b = b.replace(sb, "='$1']"), !(!P.matchesSelector || H || J && J.test(b) || I.test(b)))try {
                            var c = K.call(a, b);
                            if (c || P.disconnectedMatch || a.document && 11 !== a.document.nodeType)return c
                        } catch (d) {
                        }
                        return g(b, F, null, [a]).length > 0
                    }, g.contains = function (a, b) {
                        return (a.ownerDocument || a) !== F && E(a), L(a, b)
                    }, g.attr = function (a, b) {
                        var c;
                        return (a.ownerDocument || a) !== F && E(a), H || (b = b.toLowerCase()), (c = y.attrHandle[b]) ? c(a) : H || P.attributes ? a.getAttribute(b) : ((c = a.getAttributeNode(b)) || a.getAttribute(b)) && a[b] === !0 ? b : c && c.specified ? c.value : null
                    }, g.error = function (a) {
                        throw Error("Syntax error, unrecognized expression: " + a)
                    }, g.uniqueSort = function (a) {
                        var b, c = [], d = 1, e = 0;
                        if (C = !P.detectDuplicates, a.sort(M), C) {
                            for (; b = a[d]; d++)b === a[d - 1] && (e = c.push(d));
                            for (; e--;)a.splice(c[e], 1)
                        }
                        return a
                    }, z = g.getText = function (a) {
                        var b, c = "", d = 0, e = a.nodeType;
                        if (e) {
                            if (1 === e || 9 === e || 11 === e) {
                                if ("string" == typeof a.textContent)return a.textContent;
                                for (a = a.firstChild; a; a = a.nextSibling)c += z(a)
                            } else if (3 === e || 4 === e)return a.nodeValue
                        } else for (; b = a[d]; d++)c += z(b);
                        return c
                    }, y = g.selectors = {
                        cacheLength: 50,
                        createPseudo: e,
                        match: kb,
                        find: {},
                        relative: {
                            ">": {dir: "parentNode", first: !0},
                            " ": {dir: "parentNode"},
                            "+": {dir: "previousSibling", first: !0},
                            "~": {dir: "previousSibling"}
                        },
                        preFilter: {
                            ATTR: function (a) {
                                return a[1] = a[1].replace(tb, ub), a[3] = (a[4] || a[5] || "").replace(tb, ub), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                            }, CHILD: function (a) {
                                return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || g.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && g.error(a[0]), a
                            }, PSEUDO: function (a) {
                                var b, c = !a[5] && a[2];
                                return kb.CHILD.test(a[0]) ? null : (a[4] ? a[2] = a[4] : c && ib.test(c) && (b = l(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function (a) {
                                return "*" === a ? function () {
                                    return !0
                                } : (a = a.replace(tb, ub).toLowerCase(), function (b) {
                                    return b.nodeName && b.nodeName.toLowerCase() === a
                                })
                            }, CLASS: function (a) {
                                var b = S[a + " "];
                                return b || (b = RegExp("(^|" + ab + ")" + a + "(" + ab + "|$)")) && S(a, function (a) {
                                        return b.test(a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
                                    })
                            }, ATTR: function (a, b, c) {
                                return function (d) {
                                    var e = g.attr(d, a);
                                    return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                                }
                            }, CHILD: function (a, b, c, d, e) {
                                var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                                return 1 === d && 0 === e ? function (a) {
                                    return !!a.parentNode
                                } : function (b, c, i) {
                                    var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                                    if (q) {
                                        if (f) {
                                            for (; p;) {
                                                for (l = b; l = l[p];)if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)return !1;
                                                o = p = "only" === a && !o && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                            for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === Q && j[1], m = j[0] === Q && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)if (1 === l.nodeType && ++m && l === b) {
                                                k[a] = [Q, n, m];
                                                break
                                            }
                                        } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === Q)m = j[1]; else for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [Q, m]), l !== b)););
                                        return m -= e, m === d || 0 == m % d && m / d >= 0
                                    }
                                }
                            }, PSEUDO: function (a, b) {
                                var c, d = y.pseudos[a] || y.setFilters[a.toLowerCase()] || g.error("unsupported pseudo: " + a);
                                return d[N] ? d(b) : d.length > 1 ? (c = [a, a, "", b], y.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function (a, c) {
                                    for (var e, f = d(a, b), g = f.length; g--;)e = _.call(a, f[g]), a[e] = !(c[e] = f[g])
                                }) : function (a) {
                                    return d(a, 0, c)
                                }) : d
                            }
                        },
                        pseudos: {
                            not: e(function (a) {
                                var b = [], c = [], d = B(a.replace(fb, "$1"));
                                return d[N] ? e(function (a, b, c, e) {
                                    for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                                }) : function (a, e, f) {
                                    return b[0] = a, d(b, null, f, c), !c.pop()
                                }
                            }), has: e(function (a) {
                                return function (b) {
                                    return g(a, b).length > 0
                                }
                            }), contains: e(function (a) {
                                return function (b) {
                                    return (b.textContent || b.innerText || z(b)).indexOf(a) > -1
                                }
                            }), lang: e(function (a) {
                                return jb.test(a || "") || g.error("unsupported lang: " + a), a = a.replace(tb, ub).toLowerCase(), function (b) {
                                    var c;
                                    do if (c = H ? b.getAttribute("xml:lang") || b.getAttribute("lang") : b.lang)return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                                    return !1
                                }
                            }), target: function (b) {
                                var c = a.location && a.location.hash;
                                return c && c.slice(1) === b.id
                            }, root: function (a) {
                                return a === G
                            }, focus: function (a) {
                                return a === F.activeElement && (!F.hasFocus || F.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                            }, enabled: function (a) {
                                return a.disabled === !1
                            }, disabled: function (a) {
                                return a.disabled === !0
                            }, checked: function (a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && !!a.checked || "option" === b && !!a.selected
                            }, selected: function (a) {
                                return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                            }, empty: function (a) {
                                for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType)return !1;
                                return !0
                            }, parent: function (a) {
                                return !y.pseudos.empty(a)
                            }, header: function (a) {
                                return pb.test(a.nodeName)
                            }, input: function (a) {
                                return ob.test(a.nodeName)
                            }, button: function (a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && "button" === a.type || "button" === b
                            }, text: function (a) {
                                var b;
                                return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                            }, first: k(function () {
                                return [0]
                            }), last: k(function (a, b) {
                                return [b - 1]
                            }), eq: k(function (a, b, c) {
                                return [0 > c ? c + b : c]
                            }), even: k(function (a, b) {
                                for (var c = 0; b > c; c += 2)a.push(c);
                                return a
                            }), odd: k(function (a, b) {
                                for (var c = 1; b > c; c += 2)a.push(c);
                                return a
                            }), lt: k(function (a, b, c) {
                                for (var d = 0 > c ? c + b : c; --d >= 0;)a.push(d);
                                return a
                            }), gt: k(function (a, b, c) {
                                for (var d = 0 > c ? c + b : c; b > ++d;)a.push(d);
                                return a
                            })
                        }
                    };
                    for (w in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})y.pseudos[w] = i(w);
                    for (w in{submit: !0, reset: !0})y.pseudos[w] = j(w);
                    B = g.compile = function (a, b) {
                        var c, d = [], e = [], f = U[a + " "];
                        if (!f) {
                            for (b || (b = l(a)), c = b.length; c--;)f = r(b[c]), f[N] ? d.push(f) : e.push(f);
                            f = U(a, s(e, d))
                        }
                        return f
                    }, y.pseudos.nth = y.pseudos.eq, y.filters = v.prototype = y.pseudos, y.setFilters = new v, E(), g.attr = rb.attr, rb.find = g, rb.expr = g.selectors, rb.expr[":"] = rb.expr.pseudos, rb.unique = g.uniqueSort, rb.text = g.getText, rb.isXMLDoc = g.isXML, rb.contains = g.contains
                }(a);
                var Vb = /Until$/, Wb = /^(?:parents|prev(?:Until|All))/, Xb = /^.[^:#\[\.,]*$/, Yb = rb.expr.match.needsContext, Zb = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
                rb.fn.extend({
                    find: function (a) {
                        var b, c, d, e = this.length;
                        if ("string" != typeof a)return d = this, this.pushStack(rb(a).filter(function () {
                            for (b = 0; e > b; b++)if (rb.contains(d[b], this))return !0
                        }));
                        for (c = [], b = 0; e > b; b++)rb.find(a, this[b], c);
                        return c = this.pushStack(e > 1 ? rb.unique(c) : c), c.selector = (this.selector ? this.selector + " " : "") + a, c
                    }, has: function (a) {
                        var b, c = rb(a, this), d = c.length;
                        return this.filter(function () {
                            for (b = 0; d > b; b++)if (rb.contains(this, c[b]))return !0
                        })
                    }, not: function (a) {
                        return this.pushStack(l(this, a, !1))
                    }, filter: function (a) {
                        return this.pushStack(l(this, a, !0))
                    }, is: function (a) {
                        return !!a && ("string" == typeof a ? Yb.test(a) ? rb(a, this.context).index(this[0]) >= 0 : rb.filter(a, this).length > 0 : this.filter(a).length > 0)
                    }, closest: function (a, b) {
                        for (var c, d = 0, e = this.length, f = [], g = Yb.test(a) || "string" != typeof a ? rb(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType;) {
                            if (g ? g.index(c) > -1 : rb.find.matchesSelector(c, a)) {
                                f.push(c);
                                break
                            }
                            c = c.parentNode
                        }
                        return this.pushStack(f.length > 1 ? rb.unique(f) : f)
                    }, index: function (a) {
                        return a ? "string" == typeof a ? rb.inArray(this[0], rb(a)) : rb.inArray(a.VEjQuery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    }, add: function (a, b) {
                        var c = "string" == typeof a ? rb(a, b) : rb.makeArray(a && a.nodeType ? [a] : a), d = rb.merge(this.get(), c);
                        return this.pushStack(rb.unique(d))
                    }, addBack: function (a) {
                        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                    }
                }), rb.fn.andSelf = rb.fn.addBack, rb.each({
                    parent: function (a) {
                        var b = a.parentNode;
                        return b && 11 !== b.nodeType ? b : null
                    }, parents: function (a) {
                        return rb.dir(a, "parentNode")
                    }, parentsUntil: function (a, b, c) {
                        return rb.dir(a, "parentNode", c)
                    }, next: function (a) {
                        return k(a, "nextSibling")
                    }, prev: function (a) {
                        return k(a, "previousSibling")
                    }, nextAll: function (a) {
                        return rb.dir(a, "nextSibling")
                    }, prevAll: function (a) {
                        return rb.dir(a, "previousSibling")
                    }, nextUntil: function (a, b, c) {
                        return rb.dir(a, "nextSibling", c)
                    }, prevUntil: function (a, b, c) {
                        return rb.dir(a, "previousSibling", c)
                    }, siblings: function (a) {
                        return rb.sibling((a.parentNode || {}).firstChild, a)
                    }, children: function (a) {
                        return rb.sibling(a.firstChild)
                    }, contents: function (a) {
                        return rb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : rb.merge([], a.childNodes)
                    }
                }, function (a, b) {
                    rb.fn[a] = function (c, d) {
                        var e = rb.map(this, b, c);
                        return Vb.test(a) || (d = c), d && "string" == typeof d && (e = rb.filter(d, e)), e = this.length > 1 && !Zb[a] ? rb.unique(e) : e, this.length > 1 && Wb.test(a) && (e = e.reverse()), this.pushStack(e)
                    }
                }), rb.extend({
                    filter: function (a, b, c) {
                        return c && (a = ":not(" + a + ")"), 1 === b.length ? rb.find.matchesSelector(b[0], a) ? [b[0]] : [] : rb.find.matches(a, b)
                    }, dir: function (a, c, d) {
                        for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !rb(f).is(d));)1 === f.nodeType && e.push(f), f = f[c];
                        return e
                    }, sibling: function (a, b) {
                        for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
                        return c
                    }
                });
                var $b = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", _b = / VEjQuery\d+="(?:null|\d+)"/g, ac = RegExp("<(?:" + $b + ")[\\s/>]", "i"), bc = /^\s+/, cc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, dc = /<([\w:]+)/, ec = /<tbody/i, fc = /<|&#?\w+;/, gc = /<(?:script|style|link)/i, hc = /^(?:checkbox|radio)$/i, ic = /checked\s*(?:[^=]|=\s*.checked.)/i, jc = /^$|\/(?:java|ecma)script/i, kc = /^true\/(.*)/, lc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, mc = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    area: [1, "<map>", "</map>"],
                    param: [1, "<object>", "</object>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: rb.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                }, nc = m(db), oc = nc.appendChild(db.createElement("div"));
                mc.optgroup = mc.option, mc.tbody = mc.tfoot = mc.colgroup = mc.caption = mc.thead, mc.th = mc.td, rb.fn.extend({
                    text: function (a) {
                        return rb.access(this, function (a) {
                            return a === b ? rb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || db).createTextNode(a))
                        }, null, a, arguments.length)
                    }, wrapAll: function (a) {
                        if (rb.isFunction(a))return this.each(function (b) {
                            rb(this).wrapAll(a.call(this, b))
                        });
                        if (this[0]) {
                            var b = rb(a, this[0].ownerDocument).eq(0).clone(!0);
                            this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                                for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
                                return a
                            }).append(this)
                        }
                        return this
                    }, wrapInner: function (a) {
                        return this.each(rb.isFunction(a) ? function (b) {
                            rb(this).wrapInner(a.call(this, b))
                        } : function () {
                            var b = rb(this), c = b.contents();
                            c.length ? c.wrapAll(a) : b.append(a)
                        })
                    }, wrap: function (a) {
                        var b = rb.isFunction(a);
                        return this.each(function (c) {
                            rb(this).wrapAll(b ? a.call(this, c) : a)
                        })
                    }, unwrap: function () {
                        return this.parent().each(function () {
                            rb.nodeName(this, "body") || rb(this).replaceWith(this.childNodes)
                        }).end()
                    }, append: function () {
                        return this.domManip(arguments, !0, function (a) {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(a)
                        })
                    }, prepend: function () {
                        return this.domManip(arguments, !0, function (a) {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(a, this.firstChild)
                        })
                    }, before: function () {
                        return this.domManip(arguments, !1, function (a) {
                            this.parentNode && this.parentNode.insertBefore(a, this)
                        })
                    }, after: function () {
                        return this.domManip(arguments, !1, function (a) {
                            this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                        })
                    }, remove: function (a, b) {
                        for (var c, d = 0; null != (c = this[d]); d++)(!a || rb.filter(a, [c]).length > 0) && (b || 1 !== c.nodeType || rb.cleanData(t(c)), c.parentNode && (b && rb.contains(c.ownerDocument, c) && q(t(c, "script")), c.parentNode.removeChild(c)));
                        return this
                    }, empty: function () {
                        for (var a, b = 0; null != (a = this[b]); b++) {
                            for (1 === a.nodeType && rb.cleanData(t(a, !1)); a.firstChild;)a.removeChild(a.firstChild);
                            a.options && rb.nodeName(a, "select") && (a.options.length = 0)
                        }
                        return this
                    }, clone: function (a, b) {
                        return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                            return rb.clone(this, a, b)
                        })
                    }, html: function (a) {
                        return rb.access(this, function (a) {
                            var c = this[0] || {}, d = 0, e = this.length;
                            if (a === b)return 1 === c.nodeType ? c.innerHTML.replace(_b, "") : b;
                            if (!("string" != typeof a || gc.test(a) || !rb.support.htmlSerialize && ac.test(a) || !rb.support.leadingWhitespace && bc.test(a) || mc[(dc.exec(a) || ["", ""])[1].toLowerCase()])) {
                                a = a.replace(cc, "<$1></$2>");
                                try {
                                    for (; e > d; d++)c = this[d] || {}, 1 === c.nodeType && (rb.cleanData(t(c, !1)), c.innerHTML = a);
                                    c = 0
                                } catch (f) {
                                }
                            }
                            c && this.empty().append(a)
                        }, null, a, arguments.length)
                    }, replaceWith: function (a) {
                        var b = rb.isFunction(a);
                        return b || "string" == typeof a || (a = rb(a).not(this).detach()), this.domManip([a], !0, function (a) {
                            var b = this.nextSibling, c = this.parentNode;
                            c && (rb(this).remove(), c.insertBefore(a, b))
                        })
                    }, detach: function (a) {
                        return this.remove(a, !0)
                    }, domManip: function (a, c, d) {
                        a = kb.apply([], a);
                        var e, f, g, h, i, j, k = 0, l = this.length, m = this, q = l - 1, r = a[0], s = rb.isFunction(r);
                        if (s || !(1 >= l || "string" != typeof r || rb.support.checkClone) && ic.test(r))return this.each(function (e) {
                            var f = m.eq(e);
                            s && (a[0] = r.call(this, e, c ? f.html() : b)), f.domManip(a, c, d)
                        });
                        if (l && (j = rb.buildFragment(a, this[0].ownerDocument, !1, this), e = j.firstChild, 1 === j.childNodes.length && (j = e), e)) {
                            for (c = c && rb.nodeName(e, "tr"), h = rb.map(t(j, "script"), o), g = h.length; l > k; k++)f = j, k !== q && (f = rb.clone(f, !0, !0), g && rb.merge(h, t(f, "script"))), d.call(c && rb.nodeName(this[k], "table") ? n(this[k], "tbody") : this[k], f, k);
                            if (g)for (i = h[h.length - 1].ownerDocument, rb.map(h, p), k = 0; g > k; k++)f = h[k], jc.test(f.type || "") && !rb._data(f, "globalEval") && rb.contains(i, f) && (f.src ? rb.ajax({
                                url: f.src,
                                type: "GET",
                                dataType: "script",
                                async: !1,
                                global: !1,
                                "throws": !0
                            }) : rb.globalEval((f.text || f.textContent || f.innerHTML || "").replace(lc, "")));
                            j = e = null
                        }
                        return this
                    }
                }), rb.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function (a, b) {
                    rb.fn[a] = function (a) {
                        for (var c, d = 0, e = [], f = rb(a), g = f.length - 1; g >= d; d++)c = d === g ? this : this.clone(!0), rb(f[d])[b](c), lb.apply(e, c.get());
                        return this.pushStack(e)
                    }
                }), rb.extend({
                    clone: function (a, b, c) {
                        var d, e, f, g, h, i = rb.contains(a.ownerDocument, a);
                        if (rb.support.html5Clone || rb.isXMLDoc(a) || !ac.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (oc.innerHTML = a.outerHTML, oc.removeChild(f = oc.firstChild)), !(rb.support.noCloneEvent && rb.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || rb.isXMLDoc(a)))for (d = t(f), h = t(a), g = 0; null != (e = h[g]); ++g)d[g] && s(e, d[g]);
                        if (b)if (c)for (h = h || t(a), d = d || t(f), g = 0; null != (e = h[g]); g++)r(e, d[g]); else r(a, f);
                        return d = t(f, "script"), d.length > 0 && q(d, !i && t(a, "script")), d = h = e = null, f
                    }, buildFragment: function (a, b, c, d) {
                        for (var e, f, g, h, i, j, k, l = a.length, n = m(b), o = [], p = 0; l > p; p++)if (f = a[p], f || 0 === f)if ("object" === rb.type(f))rb.merge(o, f.nodeType ? [f] : f); else if (fc.test(f)) {
                            for (h = h || n.appendChild(b.createElement("div")), i = (dc.exec(f) || ["", ""])[1].toLowerCase(), k = mc[i] || mc._default, h.innerHTML = k[1] + f.replace(cc, "<$1></$2>") + k[2], e = k[0]; e--;)h = h.lastChild;
                            if (!rb.support.leadingWhitespace && bc.test(f) && o.push(b.createTextNode(bc.exec(f)[0])), !rb.support.tbody)for (f = "table" !== i || ec.test(f) ? "<table>" !== k[1] || ec.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;)rb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                            for (rb.merge(o, h.childNodes), h.textContent = ""; h.firstChild;)h.removeChild(h.firstChild);
                            h = n.lastChild
                        } else o.push(b.createTextNode(f));
                        for (h && n.removeChild(h), rb.support.appendChecked || rb.grep(t(o, "input"), u), p = 0; f = o[p++];)if ((!d || -1 === rb.inArray(f, d)) && (g = rb.contains(f.ownerDocument, f), h = t(n.appendChild(f), "script"), g && q(h), c))for (e = 0; f = h[e++];)jc.test(f.type || "") && c.push(f);
                        return h = null, n
                    }, cleanData: function (a, b) {
                        for (var c, d, e, f, g = 0, h = rb.expando, i = rb.cache, j = rb.support.deleteExpando, k = rb.event.special; null != (c = a[g]); g++)if ((b || rb.acceptData(c)) && (e = c[h], f = e && i[e])) {
                            if (f.events)for (d in f.events)k[d] ? rb.event.remove(c, d) : rb.removeEvent(c, d, f.handle);
                            i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== cb ? c.removeAttribute(h) : c[h] = null, ib.push(e))
                        }
                    }
                });
                var pc, qc, rc, sc = /alpha\([^)]*\)/i, tc = /opacity\s*=\s*([^)]*)/, uc = /^(top|right|bottom|left)$/, vc = /^(none|table(?!-c[ea]).+)/, wc = /^margin/, xc = RegExp("^(" + sb + ")(.*)$", "i"), yc = RegExp("^(" + sb + ")(?!px)[a-z%]+$", "i"), zc = RegExp("^([+-])=(" + sb + ")", "i"), Ac = {BODY: "block"}, Bc = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                }, Cc = {
                    letterSpacing: 0,
                    fontWeight: 400
                }, Dc = ["Top", "Right", "Bottom", "Left"], Ec = ["Webkit", "O", "Moz", "ms"];
                rb.fn.extend({
                    css: function (a, c) {
                        return rb.access(this, function (a, c, d) {
                            var e, f, g = {}, h = 0;
                            if (rb.isArray(c)) {
                                for (f = qc(a), e = c.length; e > h; h++)g[c[h]] = rb.css(a, c[h], !1, f);
                                return g
                            }
                            return d !== b ? rb.style(a, c, d) : rb.css(a, c)
                        }, a, c, arguments.length > 1)
                    }, show: function () {
                        return x(this, !0)
                    }, hide: function () {
                        return x(this)
                    }, toggle: function (a) {
                        var b = "boolean" == typeof a;
                        return this.each(function () {
                            (b ? a : w(this)) ? rb(this).show() : rb(this).hide()
                        })
                    }
                }), rb.extend({
                    cssHooks: {
                        opacity: {
                            get: function (a, b) {
                                if (b) {
                                    var c = rc(a, "opacity");
                                    return "" === c ? "1" : c
                                }
                            }
                        }
                    },
                    cssNumber: {
                        columnCount: !0,
                        fillOpacity: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {"float": rb.support.cssFloat ? "cssFloat" : "styleFloat"},
                    style: function (a, c, d, e) {
                        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                            var f, g, h, i = rb.camelCase(c), j = a.style;
                            if (c = rb.cssProps[i] || (rb.cssProps[i] = v(j, i)), h = rb.cssHooks[c] || rb.cssHooks[i], d === b)return h && "get"in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                            if (g = typeof d, "string" === g && (f = zc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(rb.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || rb.cssNumber[i] || (d += "px"), rb.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), h && "set"in h && (d = h.set(a, d, e)) === b)))try {
                                j[c] = d
                            } catch (k) {
                            }
                        }
                    },
                    css: function (a, c, d, e) {
                        var f, g, h, i = rb.camelCase(c);
                        return c = rb.cssProps[i] || (rb.cssProps[i] = v(a.style, i)), h = rb.cssHooks[c] || rb.cssHooks[i], h && "get"in h && (g = h.get(a, !0, d)), g === b && (g = rc(a, c, e)), "normal" === g && c in Cc && (g = Cc[c]), "" === d || d ? (f = parseFloat(g), d === !0 || rb.isNumeric(f) ? f || 0 : g) : g
                    },
                    swap: function (a, b, c, d) {
                        var e, f, g = {};
                        for (f in b)g[f] = a.style[f], a.style[f] = b[f];
                        e = c.apply(a, d || []);
                        for (f in b)a.style[f] = g[f];
                        return e
                    }
                }), a.getComputedStyle ? (qc = function (b) {
                    return a.getComputedStyle(b, null)
                }, rc = function (a, c, d) {
                    var e, f, g, h = d || qc(a), i = h ? h.getPropertyValue(c) || h[c] : b, j = a.style;
                    return h && ("" !== i || rb.contains(a.ownerDocument, a) || (i = rb.style(a, c)), yc.test(i) && wc.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i
                }) : db.documentElement.currentStyle && (qc = function (a) {
                    return a.currentStyle
                }, rc = function (a, c, d) {
                    var e, f, g, h = d || qc(a), i = h ? h[c] : b, j = a.style;
                    return null == i && j && j[c] && (i = j[c]), yc.test(i) && !uc.test(c) && (e = j.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = "fontSize" === c ? "1em" : i, i = j.pixelLeft + "px", j.left = e, g && (f.left = g)), "" === i ? "auto" : i
                }), rb.each(["height", "width"], function (a, c) {
                    rb.cssHooks[c] = {
                        get: function (a, d, e) {
                            return d ? 0 === a.offsetWidth && vc.test(rb.css(a, "display")) ? rb.swap(a, Bc, function () {
                                return A(a, c, e)
                            }) : A(a, c, e) : b
                        }, set: function (a, b, d) {
                            var e = d && qc(a);
                            return y(a, b, d ? z(a, c, d, rb.support.boxSizing && "border-box" === rb.css(a, "boxSizing", !1, e), e) : 0)
                        }
                    }
                }), rb.support.opacity || (rb.cssHooks.opacity = {
                    get: function (a, b) {
                        return tc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
                    }, set: function (a, b) {
                        var c = a.style, d = a.currentStyle, e = rb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
                        c.zoom = 1, (b >= 1 || "" === b) && "" === rb.trim(f.replace(sc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = sc.test(f) ? f.replace(sc, e) : f + " " + e)
                    }
                }), rb(function () {
                    rb.support.reliableMarginRight || (rb.cssHooks.marginRight = {
                        get: function (a, c) {
                            return c ? rb.swap(a, {display: "inline-block"}, rc, [a, "marginRight"]) : b
                        }
                    }), !rb.support.pixelPosition && rb.fn.position && rb.each(["top", "left"], function (a, c) {
                        rb.cssHooks[c] = {
                            get: function (a, d) {
                                return d ? (d = rc(a, c), yc.test(d) ? rb(a).position()[c] + "px" : d) : b
                            }
                        }
                    })
                }), rb.expr && rb.expr.filters && (rb.expr.filters.hidden = function (a) {
                    return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !rb.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || rb.css(a, "display"))
                }, rb.expr.filters.visible = function (a) {
                    return !rb.expr.filters.hidden(a)
                }), rb.each({margin: "", padding: "", border: "Width"}, function (a, b) {
                    rb.cssHooks[a + b] = {
                        expand: function (c) {
                            for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)e[a + Dc[d] + b] = f[d] || f[d - 2] || f[0];
                            return e
                        }
                    }, wc.test(a) || (rb.cssHooks[a + b].set = y)
                });
                var Fc = /%20/g, Gc = /\[\]$/, Hc = /\r?\n/g, Ic = /^(?:submit|button|image|reset|file)$/i, Jc = /^(?:input|select|textarea|keygen)/i;
                rb.fn.extend({
                    serialize: function () {
                        return rb.param(this.serializeArray())
                    }, serializeArray: function () {
                        return this.map(function () {
                            var a = rb.prop(this, "elements");
                            return a ? rb.makeArray(a) : this
                        }).filter(function () {
                            var a = this.type;
                            return this.name && !rb(this).is(":disabled") && Jc.test(this.nodeName) && !Ic.test(a) && (this.checked || !hc.test(a))
                        }).map(function (a, b) {
                            var c = rb(this).val();
                            return null == c ? null : rb.isArray(c) ? rb.map(c, function (a) {
                                return {name: b.name, value: a.replace(Hc, "\r\n")}
                            }) : {name: b.name, value: c.replace(Hc, "\r\n")}
                        }).get()
                    }
                }), rb.param = function (a, c) {
                    var d, e = [], f = function (a, b) {
                        b = rb.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                    if (c === b && (c = rb.ajaxSettings && rb.ajaxSettings.traditional), rb.isArray(a) || a.VEjQuery && !rb.isPlainObject(a))rb.each(a, function () {
                        f(this.name, this.value)
                    }); else for (d in a)D(d, a[d], c, f);
                    return e.join("&").replace(Fc, "+")
                }, rb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
                    rb.fn[b] = function (a, c) {
                        return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                    }
                }), rb.fn.hover = function (a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                };
                var Kc, Lc, Mc = rb.now(), Nc = /\?/, Oc = /#.*$/, Pc = /([?&])_=[^&]*/, Qc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Rc = /^(?:GET|HEAD)$/, Sc = /^\/\//, Tc = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Uc = rb.fn.load, Vc = {}, Wc = {}, Xc = "*/".concat("*");
                try {
                    Lc = eb.href
                } catch (Yc) {
                    Lc = db.createElement("a"), Lc.href = "", Lc = Lc.href
                }
                Kc = Tc.exec(Lc.toLowerCase()) || [], rb.fn.load = function (a, c, d) {
                    if ("string" != typeof a && Uc)return Uc.apply(this, arguments);
                    var e, f, g, h = this, i = a.indexOf(" ");
                    return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), rb.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (g = "POST"), h.length > 0 && rb.ajax({
                        url: a,
                        type: g,
                        dataType: "html",
                        data: c
                    }).done(function (a) {
                        f = arguments, h.html(e ? rb("<div>").append(rb.parseHTML(a)).find(e) : a)
                    }).complete(d && function (a, b) {
                        h.each(d, f || [a.responseText, b, a])
                    }), this
                }, rb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
                    rb.fn[b] = function (a) {
                        return this.on(b, a)
                    }
                }), rb.each(["get", "post"], function (a, c) {
                    rb[c] = function (a, d, e, f) {
                        return rb.isFunction(d) && (f = f || e, e = d, d = b), rb.ajax({
                            url: a,
                            type: c,
                            dataType: f,
                            data: d,
                            success: e
                        })
                    }
                }), rb.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Lc,
                        type: "GET",
                        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Kc[1]),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Xc,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {xml: /xml/, html: /html/, json: /json/},
                        responseFields: {xml: "responseXML", text: "responseText"},
                        converters: {
                            "* text": a.String,
                            "text html": !0,
                            "text json": rb.parseJSON,
                            "text xml": rb.parseXML
                        },
                        flatOptions: {url: !0, context: !0}
                    },
                    ajaxSetup: function (a, b) {
                        return b ? G(G(a, rb.ajaxSettings), b) : G(rb.ajaxSettings, a)
                    },
                    ajaxPrefilter: E(Vc),
                    ajaxTransport: E(Wc),
                    ajax: function (a, c) {
                        function d(a, c, d, e) {
                            var f, l, s, t, v, x = c;
                            2 !== u && (u = 2, i && clearTimeout(i), k = b, h = e || "", w.readyState = a > 0 ? 4 : 0, d && (t = H(m, w, d)), a >= 200 && 300 > a || 304 === a ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (rb.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (rb.etag[g] = v)), 204 === a ? (f = !0, x = "nocontent") : 304 === a ? (f = !0, x = "notmodified") : (f = I(m, t), x = f.state, l = f.data, s = f.error, f = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]), q.fireWith(n, [w, x]), j && (o.trigger("ajaxComplete", [w, m]), --rb.active || rb.event.trigger("ajaxStop")))
                        }

                        "object" == typeof a && (c = a, a = b), c = c || {};
                        var e, f, g, h, i, j, k, l, m = rb.ajaxSetup({}, c), n = m.context || m, o = m.context && (n.nodeType || n.VEjQuery) ? rb(n) : rb.event, p = rb.Deferred(), q = rb.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                            readyState: 0,
                            getResponseHeader: function (a) {
                                var b;
                                if (2 === u) {
                                    if (!l)for (l = {}; b = Qc.exec(h);)l[b[1].toLowerCase()] = b[2];
                                    b = l[a.toLowerCase()]
                                }
                                return null == b ? null : b
                            },
                            getAllResponseHeaders: function () {
                                return 2 === u ? h : null
                            },
                            setRequestHeader: function (a, b) {
                                var c = a.toLowerCase();
                                return u || (a = t[c] = t[c] || a, s[a] = b), this
                            },
                            overrideMimeType: function (a) {
                                return u || (m.mimeType = a), this
                            },
                            statusCode: function (a) {
                                var b;
                                if (a)if (2 > u)for (b in a)r[b] = [r[b], a[b]]; else w.always(a[w.status]);
                                return this
                            },
                            abort: function (a) {
                                var b = a || v;
                                return k && k.abort(b), d(0, b), this
                            }
                        };
                        if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || Lc) + "").replace(Oc, "").replace(Sc, Kc[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = rb.trim(m.dataType || "*").toLowerCase().match(tb) || [""], null == m.crossDomain && (e = Tc.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === Kc[1] && e[2] === Kc[2] && (e[3] || ("http:" === e[1] ? 80 : 443)) == (Kc[3] || ("http:" === Kc[1] ? 80 : 443)))), m.data && m.processData && "string" != typeof m.data && (m.data = rb.param(m.data, m.traditional)), F(Vc, m, c, w), 2 === u)return w;
                        j = m.global, j && 0 == rb.active++ && rb.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Rc.test(m.type), g = m.url, m.hasContent || (m.data && (g = m.url += (Nc.test(g) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = Pc.test(g) ? g.replace(Pc, "$1_=" + Mc++) : g + (Nc.test(g) ? "&" : "?") + "_=" + Mc++)), m.ifModified && (rb.lastModified[g] && w.setRequestHeader("If-Modified-Since", rb.lastModified[g]), rb.etag[g] && w.setRequestHeader("If-None-Match", rb.etag[g])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Xc + "; q=0.01" : "") : m.accepts["*"]);
                        for (f in m.headers)w.setRequestHeader(f, m.headers[f]);
                        if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u))return w.abort();
                        v = "abort";
                        for (f in{success: 1, error: 1, complete: 1})w[f](m[f]);
                        if (k = F(Wc, m, c, w)) {
                            w.readyState = 1, j && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function () {
                                w.abort("timeout")
                            }, m.timeout));
                            try {
                                u = 1, k.send(s, d)
                            } catch (x) {
                                if (!(2 > u))throw x;
                                d(-1, x)
                            }
                        } else d(-1, "No Transport");
                        return w
                    },
                    getScript: function (a, c) {
                        return rb.get(a, b, c, "script")
                    },
                    getJSON: function (a, b, c) {
                        return rb.get(a, b, c, "json")
                    }
                }), rb.ajaxSetup({
                    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
                    contents: {script: /(?:java|ecma)script/},
                    converters: {
                        "text script": function (a) {
                            return rb.globalEval(a), a
                        }
                    }
                }), rb.ajaxPrefilter("script", function (a) {
                    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
                }), rb.ajaxTransport("script", function (a) {
                    if (a.crossDomain) {
                        var c, d = db.head || rb("head")[0] || db.documentElement;
                        return {
                            send: function (b, e) {
                                c = db.createElement("script"), c.async = !0, a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, b) {
                                    (b || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success"))
                                }, d.insertBefore(c, d.firstChild)
                            }, abort: function () {
                                c && c.onload(b, !0)
                            }
                        }
                    }
                }), Y = [], Z = /(=)\?(?=&|$)|\?\?/, rb.ajaxSetup({
                    jsonp: "callback", jsonpCallback: function () {
                        var a = Y.pop() || rb.expando + "_" + Mc++;
                        return this[a] = !0, a
                    }
                }), rb.ajaxPrefilter("json jsonp", function (c, d, e) {
                    var f, g, h, i = c.jsonp !== !1 && (Z.test(c.url) ? "url" : "string" == typeof c.data && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Z.test(c.data) && "data");
                    return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = rb.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(Z, "$1" + f) : c.jsonp !== !1 && (c.url += (Nc.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () {
                        return h || rb.error(f + " was not called"), h[0]
                    }, c.dataTypes[0] = "json", g = a[f], a[f] = function () {
                        h = arguments
                    }, e.always(function () {
                        a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Y.push(f)), h && rb.isFunction(g) && g(h[0]), h = g = b
                    }), "script") : b
                }), ab = 0, bb = a.ActiveXObject && function () {
                    for (var a in $)$[a](b, !0)
                }, rb.ajaxSettings.xhr = a.ActiveXObject ? function () {
                    return !this.isLocal && J() || K()
                } : J, _ = rb.ajaxSettings.xhr(), rb.support.cors = !!_ && "withCredentials"in _, _ = rb.support.ajax = !!_, _ && rb.ajaxTransport(function (c) {
                    if (!c.crossDomain || rb.support.cors) {
                        var d;
                        return {
                            send: function (e, f) {
                                var g, h, i = c.xhr();
                                if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields)for (h in c.xhrFields)i[h] = c.xhrFields[h];
                                c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                                try {
                                    for (h in e)i.setRequestHeader(h, e[h])
                                } catch (j) {
                                }
                                i.send(c.hasContent && c.data || null), d = function (a, e) {
                                    var h, j, k, l;
                                    try {
                                        if (d && (e || 4 === i.readyState))if (d = b, g && (i.onreadystatechange = rb.noop, bb && delete $[g]), e)4 !== i.readyState && i.abort(); else {
                                            l = {}, h = i.status, j = i.getAllResponseHeaders(), "string" == typeof i.responseText && (l.text = i.responseText);
                                            try {
                                                k = i.statusText
                                            } catch (m) {
                                                k = ""
                                            }
                                            h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                                        }
                                    } catch (n) {
                                        e || f(-1, n)
                                    }
                                    l && f(h, k, l, j)
                                }, c.async ? 4 === i.readyState ? setTimeout(d) : (g = ++ab, bb && ($ || ($ = {}, rb(a).unload(bb)), $[g] = d), i.onreadystatechange = d) : d()
                            }, abort: function () {
                                d && d(b, !0)
                            }
                        }
                    }
                });
                var Zc, $c, _c = /^(?:toggle|show|hide)$/, ad = RegExp("^(?:([+-])=|)(" + sb + ")([a-z%]*)$", "i"), bd = /queueHooks$/, cd = [P], dd = {
                    "*": [function (a, b) {
                        var c, d, e = this.createTween(a, b), f = ad.exec(b), g = e.cur(), h = +g || 0, i = 1, j = 20;
                        if (f) {
                            if (c = +f[2], d = f[3] || (rb.cssNumber[a] ? "" : "px"), "px" !== d && h) {
                                h = rb.css(e.elem, a, !0) || c || 1;
                                do i = i || ".5", h /= i, rb.style(e.elem, a, h + d); while (i !== (i = e.cur() / g) && 1 !== i && --j)
                            }
                            e.unit = d, e.start = h, e.end = f[1] ? h + (f[1] + 1) * c : c
                        }
                        return e
                    }]
                };
                rb.Animation = rb.extend(N, {
                    tweener: function (a, b) {
                        rb.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                        for (var c, d = 0, e = a.length; e > d; d++)c = a[d], dd[c] = dd[c] || [], dd[c].unshift(b)
                    }, prefilter: function (a, b) {
                        b ? cd.unshift(a) : cd.push(a)
                    }
                }), rb.Tween = Q, Q.prototype = {
                    constructor: Q, init: function (a, b, c, d, e, f) {
                        this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (rb.cssNumber[c] ? "" : "px")
                    }, cur: function () {
                        var a = Q.propHooks[this.prop];
                        return a && a.get ? a.get(this) : Q.propHooks._default.get(this)
                    }, run: function (a) {
                        var b, c = Q.propHooks[this.prop];
                        return this.pos = b = this.options.duration ? rb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Q.propHooks._default.set(this), this
                    }
                }, Q.prototype.init.prototype = Q.prototype, Q.propHooks = {
                    _default: {
                        get: function (a) {
                            var b;
                            return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = rb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                        }, set: function (a) {
                            rb.fx.step[a.prop] ? rb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[rb.cssProps[a.prop]] || rb.cssHooks[a.prop]) ? rb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                        }
                    }
                }, Q.propHooks.scrollTop = Q.propHooks.scrollLeft = {
                    set: function (a) {
                        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                    }
                }, rb.each(["toggle", "show", "hide"], function (a, b) {
                    var c = rb.fn[b];
                    rb.fn[b] = function (a, d, e) {
                        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(R(b, !0), a, d, e)
                    }
                }), rb.fn.extend({
                    fadeTo: function (a, b, c, d) {
                        return this.filter(w).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
                    }, animate: function (a, b, c, d) {
                        var e = rb.isEmptyObject(a), f = rb.speed(b, c, d), g = function () {
                            var b = N(this, rb.extend({}, a), f);
                            g.finish = function () {
                                b.stop(!0)
                            }, (e || rb._data(this, "finish")) && b.stop(!0)
                        };
                        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                    }, stop: function (a, c, d) {
                        var e = function (a) {
                            var b = a.stop;
                            delete a.stop, b(d)
                        };
                        return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                            var b = !0, c = null != a && a + "queueHooks", f = rb.timers, g = rb._data(this);
                            if (c)g[c] && g[c].stop && e(g[c]); else for (c in g)g[c] && g[c].stop && bd.test(c) && e(g[c]);
                            for (c = f.length; c--;)f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                            (b || !d) && rb.dequeue(this, a)
                        })
                    }, finish: function (a) {
                        return a !== !1 && (a = a || "fx"), this.each(function () {
                            var b, c = rb._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = rb.timers, g = d ? d.length : 0;
                            for (c.finish = !0, rb.queue(this, a, []), e && e.cur && e.cur.finish && e.cur.finish.call(this), b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                            for (b = 0; g > b; b++)d[b] && d[b].finish && d[b].finish.call(this);
                            delete c.finish
                        })
                    }
                }), rb.each({
                    slideDown: R("show"),
                    slideUp: R("hide"),
                    slideToggle: R("toggle"),
                    fadeIn: {opacity: "show"},
                    fadeOut: {opacity: "hide"},
                    fadeToggle: {opacity: "toggle"}
                }, function (a, b) {
                    rb.fn[a] = function (a, c, d) {
                        return this.animate(b, a, c, d)
                    }
                }), rb.speed = function (a, b, c) {
                    var d = a && "object" == typeof a ? rb.extend({}, a) : {
                        complete: c || !c && b || rb.isFunction(a) && a,
                        duration: a,
                        easing: c && b || b && !rb.isFunction(b) && b
                    };
                    return d.duration = rb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in rb.fx.speeds ? rb.fx.speeds[d.duration] : rb.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
                        rb.isFunction(d.old) && d.old.call(this), d.queue && rb.dequeue(this, d.queue)
                    }, d
                }, rb.easing = {
                    linear: function (a) {
                        return a
                    }, swing: function (a) {
                        return .5 - Math.cos(a * Math.PI) / 2
                    }
                }, rb.timers = [], rb.fx = Q.prototype.init, rb.fx.tick = function () {
                    var a, c = rb.timers, d = 0;
                    for (Zc = rb.now(); c.length > d; d++)a = c[d], a() || c[d] !== a || c.splice(d--, 1);
                    c.length || rb.fx.stop(), Zc = b
                }, rb.fx.timer = function (a) {
                    a() && rb.timers.push(a) && rb.fx.start()
                }, rb.fx.interval = 13, rb.fx.start = function () {
                    $c || ($c = setInterval(rb.fx.tick, rb.fx.interval))
                }, rb.fx.stop = function () {
                    clearInterval($c), $c = null
                }, rb.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, rb.fx.step = {}, rb.expr && rb.expr.filters && (rb.expr.filters.animated = function (a) {
                    return rb.grep(rb.timers, function (b) {
                        return a === b.elem
                    }).length
                }), rb.fn.offset = function (a) {
                    if (arguments.length)return a === b ? this : this.each(function (b) {
                        rb.offset.setOffset(this, a, b)
                    });
                    var c, d, e = {top: 0, left: 0}, f = this[0], g = f && f.ownerDocument;
                    return g ? (c = g.documentElement, rb.contains(c, f) ? (typeof f.getBoundingClientRect !== cb && (e = f.getBoundingClientRect()), d = S(g), {
                        top: e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
                        left: e.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
                    }) : e) : void 0
                }, rb.offset = {
                    setOffset: function (a, b, c) {
                        var d = rb.css(a, "position");
                        "static" === d && (a.style.position = "relative");
                        var e, f, g = rb(a), h = g.offset(), i = rb.css(a, "top"), j = rb.css(a, "left"), k = ("absolute" === d || "fixed" === d) && rb.inArray("auto", [i, j]) > -1, l = {}, m = {};
                        k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), rb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using"in b ? b.using.call(a, l) : g.css(l)
                    }
                }, rb.fn.extend({
                    position: function () {
                        if (this[0]) {
                            var a, b, c = {top: 0, left: 0}, d = this[0];
                            return "fixed" === rb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), rb.nodeName(a[0], "html") || (c = a.offset()), c.top += rb.css(a[0], "borderTopWidth", !0), c.left += rb.css(a[0], "borderLeftWidth", !0)), {
                                top: b.top - c.top - rb.css(d, "marginTop", !0),
                                left: b.left - c.left - rb.css(d, "marginLeft", !0)
                            }
                        }
                    }, offsetParent: function () {
                        return this.map(function () {
                            for (var a = this.offsetParent || db.documentElement; a && !rb.nodeName(a, "html") && "static" === rb.css(a, "position");)a = a.offsetParent;
                            return a || db.documentElement
                        })
                    }
                }), rb.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
                    var d = /Y/.test(c);
                    rb.fn[a] = function (e) {
                        return rb.access(this, function (a, e, f) {
                            var g = S(a);
                            return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? rb(g).scrollLeft() : f, d ? f : rb(g).scrollTop()) : a[e] = f, b)
                        }, a, e, arguments.length, null)
                    }
                }), rb.each({Height: "height", Width: "width"}, function (a, c) {
                    rb.each({padding: "inner" + a, content: c, "": "outer" + a}, function (d, e) {
                        rb.fn[e] = function (e, f) {
                            var g = arguments.length && (d || "boolean" != typeof e), h = d || (e === !0 || f === !0 ? "margin" : "border");
                            return rb.access(this, function (c, d, e) {
                                var f;
                                return rb.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? rb.css(c, d, h) : rb.style(c, d, e, h)
                            }, c, g ? e : b, g, null)
                        }
                    })
                }), a.VEjQuery = rb, "function" == typeof define && define.amd && define.amd.VEjQuery && define("VEjQuery", [], function () {
                    return rb
                })
            }(window), VEjQuery.noConflict();
            var N = {
                string: {
                    startsWith: function (a, b) {
                        return "" === b ? !1 : 0 === a.indexOf(b)
                    }, endsWith: function (a, b) {
                        return a && b ? -1 !== a.indexOf(b, a.length - b.length) : !1
                    }, trim: function (a) {
                        return "string" == typeof a ? a.replace(/^\s+|\s+$/g, "") : void 0
                    }, isValidEmail: function (a) {
                        a = a.toUpperCase();
                        var b = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/;
                        return -1 === a.search(b) ? !1 : !0
                    }, cleanString: function (a) {
                        var b = /([¿¡`~!?@#%\^&*\(\)\|=;:\'",\.\-<>\{\}\[\]¬¦\/\\])/gi;
                        return a = a.replace(b, " "), a = N.string.trim(a.replace(/[\+]+/g, "+").replace(/\+/g, " ").replace(/ +/g, " "))
                    }, boolToString: function (a) {
                        return a ? "1" : "0"
                    }, stringToBool: function (a) {
                        return "0" !== a ? !0 : !1
                    }
                }, array: {
                    indexOf: function (a, b) {
                        if ("undefined" == typeof b)throw new TypeError("Argument array should not be undefined or NULL.");
                        return N.array.indexOf = b.indexOf ? function (a, b) {
                            return b.indexOf(a)
                        } : function (a, b) {
                            var c, d = Object(b), e = d.length >>> 0;
                            if (e > 0)for (c = 0; e > c; c += 1)if (c in d && d[c] === a)return c;
                            return -1
                        }, N.array.indexOf(a, b)
                    }, removeElementFromArray: function (a, b) {
                        for (var c = 0; c < a.length; c += 1)if (a[c] === b || "object" == typeof a[c] && N.object.areEqual(a[c], b))return a.splice(c, 1), a;
                        return a
                    }, concatWithoutDuplicate: function (a, b) {
                        function c(a) {
                            for (var b = 0; b < a.length; b += 1)-1 === N.array.indexOf(a[b], d) && d.push(a[b])
                        }

                        var d = [];
                        return c(a), c(b), d
                    }, pushWithoutDuplicate: function (a, b) {
                        return -1 === N.array.indexOf(a, b) && b.push(a), b
                    }
                }, date: {
                    now: function () {
                        return N.date.now = Date.now ? function () {
                            return window.Date.now()
                        } : function () {
                            return (new Date).getTime()
                        }, N.date.now()
                    }
                }, dom: {
                    hasClass: function (a, b) {
                        return N.dom.hasClass = "classList"in document.createElement("_") ? function (a, b) {
                            return a.classList.contains(b)
                        } : function (a, b) {
                            return new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)").test(a.className)
                        }, N.dom.hasClass(a, b)
                    }, addClass: function (a, b) {
                        "classList"in document.createElement("_") ? N.dom.addClass = function (a, b) {
                            a.classList.add(b)
                        } : N.dom.hasClass(a, b) || (N.dom.addClass = function (a, b) {
                            a.className = a.className ? [a.className, b].join(" ") : b
                        }), N.dom.addClass(a, b)
                    }, removeClass: function (a, b) {
                        N.dom.removeClass = "classList"in document.createElement("_") ? function (a, b) {
                            a.classList.remove(b)
                        } : function (a, b) {
                            if (N.dom.hasClass(a, b)) {
                                var c = a.className;
                                a.className = c.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ")
                            }
                        }, N.dom.removeClass(a, b)
                    }, focus: function (a) {
                        a && window.setTimeout(function () {
                            try {
                                a.focus()
                            } catch (b) {
                            }
                        }, 10)
                    }, windowTop: function () {
                        return void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
                    }, removeElement: function (a) {
                        void 0 !== a && null !== a && a.parentElement.removeChild(a)
                    }, getElementsByClassName: function (a, b, c) {
                        return N.dom.getElementsByClassName = document.getElementsByClassName ? function (a) {
                            var b = [];
                            return "string" != typeof a ? b : document.getElementsByClassName(a)
                        } : document.querySelectorAll ? function (a) {
                            var b = [];
                            return "string" != typeof a ? b : document.querySelectorAll("." + a)
                        } : function (a, b, c) {
                            var d = [];
                            if ("string" != typeof a)return d;
                            null == b && (b = document), null == c && (c = "*");
                            var e, f, g = b.getElementsByTagName(c), h = g.length, i = new RegExp("(^|\\s)" + a + "(\\s|$)");
                            for (e = 0, f = 0; h > e; e += 1)i.test(g[e].className) && (d[f] = g[e], f += 1);
                            return d
                        }, N.dom.getElementsByClassName(a, b, c)
                    }, querySelectorAll: function (a) {
                        return document.querySelectorAll(a)
                    }, getElementsByQuerySelectors: function (a) {
                        var b = 0, c = [];
                        if ("object" != typeof a || void 0 === a.length)throw new TypeError("The parametter is supposed to be an Array.");
                        for (; b < a.length; b += 1)c = N.dom.concatNodeList(c, N.dom.querySelectorAll(a[b]));
                        return c
                    }, concatNodeList: function (a, b) {
                        function c(a) {
                            for (var b = 0, c = []; b < a.length; b += 1)c.push(a[b]);
                            return c
                        }

                        if (!("object" == typeof a && void 0 !== a.length || "object" == typeof b && void 0 !== b.length))throw new TypeError("The parametters are supposed to be Arrays or Node List.");
                        return a = c(a), b = c(b), a.concat(b)
                    }, exists: function (a) {
                        return null !== a ? !0 : !1
                    }, getParentByTagName: function (a, b) {
                        var c = a.parentNode;
                        return a.parentNode.tagName.toLowerCase() !== b.toLowerCase() && (c = this.getParentByTagName(a.parentNode, b)), c
                    }, getParentByDataAttribute: function (a, b, c) {
                        var d = a && a.parentNode;
                        return d && d.hasAttribute ? ((!d.hasAttribute(b) || void 0 !== c && d.getAttribute(b) !== c) && (d = this.getParentByDataAttribute(d, b, c)), d) : void 0
                    }, getElementsByDataAttribute: function (a, b, c) {
                        if (null !== a) {
                            var d = a.getElementsByTagName("*"), e = [], f = 0;
                            for (f = 0; f < d.length; f += 1)!d[f].hasAttribute(b) || void 0 !== c && d[f].getAttribute(b) !== c || e.push(d[f]);
                            return e.length > 0 ? e : []
                        }
                        return []
                    }
                }, ajax: {
                    request: function (a, b, c) {
                        var d, e = new XMLHttpRequest;
                        if ("withCredentials"in e)e.open("GET", a, !0); else {
                            if ("undefined" == typeof XDomainRequest)return void N.shell.error("Your browser does not support AJAX cross-domain requests !");
                            var f = {urlCORS: encodeURIComponent(window.location.protocol + "//" + window.location.hostname)};
                            a = encodeURI(N.domain.createUrl(a, null, f)), e = new XDomainRequest, e.open("GET", a)
                        }
                        return e.onload = function () {
                            d = e.responseText, b(d)
                        }, e.onerror = function () {
                            c()
                        }, e.send(), d
                    }, parseJSON: function (a, b) {
                        var c = a;
                        if ("object" != typeof a && "undefined" != typeof JSON)try {
                            c = window.JSON.parse(a)
                        } catch (d) {
                            b && N.shell.log(b)
                        }
                        return c
                    }, stringify: function (a, b) {
                        var c = a;
                        if ("string" != typeof data && "undefined" != typeof JSON)try {
                            c = window.JSON.stringify(a)
                        } catch (d) {
                            b && N.shell.log(b)
                        }
                        return c
                    }, JSONP: function () {
                        var a = {};
                        return {
                            request: function (b, c, d) {
                                d || (d = {}), b += b.indexOf("?") + 1 ? "&" : "?";
                                var e, f = document.getElementsByTagName("head")[0], g = document.createElement("script"), h = [], i = N.date.now();
                                d.jsoncallback = "VeAPI.JSONP.callbacks.request" + i, a["request" + i] = function (b) {
                                    f.removeChild(g), delete a["request" + i], c(b)
                                };
                                for (e in d)h.push(e + "=" + encodeURIComponent(d[e]));
                                b += h.join("&"), g.type = "text/javascript", g.src = b, f.appendChild(g)
                            }, callbacks: a
                        }
                    }
                }, object: {
                    create: function (a) {
                        function b() {
                        }

                        return Object.create ? Object.create(a) : (b.prototype = a, new b)
                    }, isEmpty: function (a) {
                        for (var b in a)if (a.hasOwnProperty(b))return !1;
                        return !0
                    }, areEqual: function (a, b) {
                        function c(e, f) {
                            for (d in e) {
                                if ("object" == typeof e[d] && f[d]) {
                                    if (!c(e[d], f[d]))return !1
                                } else if (e[d] !== f[d])return !1;
                                delete a[d], delete b[d]
                            }
                            return !0
                        }

                        var d = "";
                        return c(a, b) && c(b, a)
                    }, length: function (a) {
                        if ("object" != typeof a)throw new TypeError("The parametter must be an object.");
                        var b = 0, c = "";
                        for (c in a)b += 1;
                        return b
                    }, toLowerCase: function (a) {
                        var b = null, c = {}, d = null, e = null;
                        for (b in a)if (d = b.toLowerCase(), "undefined" == typeof a[d] && d !== b)switch (e = a[b], typeof e) {
                            case"string":
                                c[d] = e.toLowerCase();
                                break;
                            case"object":
                                if (null !== e && "undefined" == typeof e.length) {
                                    c[d] = N.object.toLowerCase(e);
                                    break
                                }
                            default:
                                c[d] = e
                        } else d === b && (c[b] = a[b]);
                        return c
                    }
                }, event: {
                    addEvent: function (a, b, c) {
                        N.event.addEvent = a.addEventListener ? function (a, b, c) {
                            return a.addEventListener(b, c), !0
                        } : a.attachEvent ? function (a, b, c) {
                            return a.attachEvent("on" + b, c), !0
                        } : function () {
                            return !1
                        }, N.event.addEvent(a, b, c)
                    }, removeEvent: function (a, b, c) {
                        return N.event.removeEvent = a.removeEventListener ? function (a, b, c) {
                            return a.removeEventListener(b, c), !0
                        } : a.detachEvent ? function (a, b, c) {
                            return a.detachEvent("on" + b, c), !0
                        } : function () {
                            return !1
                        }, N.event.removeEvent(a, b, c)
                    }, addEventsToArray: function (a, b, c) {
                        if (void 0 === a)throw new TypeError("Argument array should not be undefined or NULL.");
                        var d, e = a.length >>> 0;
                        for (d = 0; e > d; d += 1)N.event.addEvent(a[d], b, c)
                    }, removeEventsFromArray: function (a, b, c) {
                        var d = !0, e = !0;
                        if ("undefined" == typeof a)throw new TypeError("Argument array should not be undefined or NULL.");
                        for (len = a.length >>> 0, i = 0; len > i; i += 1)N.event.removeEvent(a[i], b, c), e = N.event.removeEvent(a[i], b, c), d = e && d ? !0 : !1;
                        return d
                    }, preventDefault: function (a) {
                        return a.preventDefault ? a.preventDefault() : a.returnValue = !1, a
                    }, getSrcElement: function (a) {
                        return a.target || a.srcElement
                    }, onClick: function (a, b) {
                        N.dom.exists(a) && N.event.addEvent(a, "click", b)
                    }
                }, shell: {
                    log: function (a) {
                        try {
                            settings.consoleMessagesEnabled && console.log("VeApps: " + a)
                        } catch (b) {
                        }
                    }, info: function (a) {
                        try {
                            settings.consoleMessagesEnabled && console.info("VeApps: " + a)
                        } catch (b) {
                        }
                    }, error: function (a) {
                        try {
                            settings.consoleMessagesEnabled && console.error("VeApps: " + a)
                        } catch (b) {
                        }
                    }
                }, domain: {
                    isInIframe: function () {
                        return window.location !== window.parent.location
                    }, referrerIsInDomains: function (a, b) {
                        function c(a, b) {
                            for (; d < b.length; d += 1)if (b[d] = b[d].replace(/\./g, "\\."), e = new RegExp("(^|\\.)" + b[d] + "$"), e.test(a))return !0;
                            return !1
                        }

                        var d = 0, e = null;
                        return "" !== a ? 0 === b.length ? !1 : (a = a.split("/")[2], a = a.replace("www.", ""), c(a, b)) : !0
                    }, createUrl: function (a, b, c) {
                        var d, e, f;
                        if (b)for (d = 0, e = b.length; e > d; d += 1)a = 0 === d ? a + ("/" !== a[a.length - 1] ? "/" : "") + b[d] : a + "/" + b[d];
                        d = 0;
                        for (f in c)a = a + (0 === d && -1 === a.indexOf("?") ? "?" : "&") + f + "=" + c[f], d += 1;
                        return a
                    }, getQueryParameter: function (a, b) {
                        var c = b ? b : window.location.search, d = c.match(new RegExp("[?&]" + a + "=([^&]*)(&?)", "i"));
                        return d ? d[1] : d
                    }, isURL: function (a) {
                        var b = new RegExp("((http|https)(://))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(/{1}[a-zA-Z0-9]+)*/?", "i");
                        return b.test(a) ? !0 : !1
                    }, recursiveURIDecode: function (a) {
                        for (var b = ""; b !== a;) {
                            b = a;
                            try {
                                a = decodeURIComponent(b)
                            } catch (c) {
                                return a
                            }
                        }
                        return a
                    }
                }, modules: {
                    Event: function (a, b, c) {
                        this.isEventAdded = !1, this.addEvent = function () {
                            this.isEventAdded = N.event.addEvent(a, b, c)
                        }, this.removeEvent = function () {
                            this.isEventAdded = N.event.removeEvent(a, b, c)
                        }
                    }, Timer: function (a) {
                        var b, c = null;
                        this.duration = null, this.isEventAdded = !1, this.start = function (d) {
                            "number" == typeof d && d > 0 && (this.stop(), this.duration = d, b = N.date.now(), c = setTimeout(a, d), this.isEventAdded = !0)
                        }, this.stop = function () {
                            b = 0, clearTimeout(c), this.isEventAdded = !1
                        }, this.reset = function (a) {
                            this.stop(), this.start(a)
                        }, this.counter = function () {
                            return 0 !== b ? ((N.date.now() - b) / 1e3).toString() + " secs" : "stopped"
                        }
                    }
                }, capture: {
                    stringMatch: function (a, b) {
                        var c, d = "\\.\\\\+\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-";
                        return a = N.capture.toLowerCaseString(a), b = N.capture.toLowerCaseString(b), a = a.replace(new RegExp("(?=[" + d + "])", "gi"), "\\"), a = a.replace(/\*/gi, ".*"), c = new RegExp("^" + a + "$"), c.test(b)
                    }, toLowerCaseString: function (a) {
                        return a = new String(a).toString(), a = a.toLowerCase()
                    }, findFormById: function (a, b) {
                        var c;
                        for (c = 0; c < b.length; c++)if (b[c].FormId === a)return b[c];
                        return !1
                    }, splitFormsByType: function (a, b) {
                        var c, d = [], e = [];
                        for (c = 0; c < a.length; c++)a[c].FormTypeId === b ? d.push(a[c]) : e.push(a[c]);
                        return a = e, {matchedForms: d, remainingForms: e}
                    }, checkForControls: function (a) {
                        var b = new o(a);
                        return b.getElementsWithSelector()
                    }, getInnerText: function (a) {
                        function b(a) {
                            var d, e = "", f = a.childNodes;
                            if (c(a))for (d = 0; d < f.length; d++)3 === f[d].nodeType ? e += f[d].nodeValue + " " : 1 === f[d].nodeType && (e += b(f[d]));
                            return e
                        }

                        function c(a) {
                            var b = ["script", "noscript", "style", "template"];
                            return a && 1 === a.nodeType && -1 === N.array.indexOf(a.nodeName.toLowerCase(), b) ? !0 : !1
                        }

                        var d = "";
                        return a && (d = b(a), d = d.replace(new RegExp(String.fromCharCode(160), "gmi"), " "), d = d.replace(/(\r\n|\n|\r)/gm, " "), d = d.replace(/[\s]+/gm, " "), d = N.string.trim(d)), encodeURIComponent(d)
                    }
                }, nothing: !1
            };
            e.prototype.store = function (a) {
                if (this.isSupported)for (var b in a)window[this.method][this.namespace + b] = a[b]
            }, e.prototype.load = function (a) {
                var b = {};
                if (this.isSupported)for (var c = 0, d = a.length; d > c; c += 1) {
                    var e = a[c];
                    b[e] = window[this.method][this.namespace + e]
                }
                return b
            }, e.prototype.isInVeSession = function (a) {
                return (N.date.now() - a) / 6e4 < this.sessionTimeOutMinutes
            };
            try {
                if (!(window.console && window.console.log && -1 != window.console.log.toString().indexOf("[native code]") || null !== document.getElementById("veConsoleIframe"))) {
                    var O = document.createElement("iframe");
                    O.id = "veConsoleIframe", O.style.visibility = "hidden", O.style.display = "none", O.border = "0px", O.frameBorder = "0", O.width = "0px", O.height = "0px", O.tabindex = -1, document.documentElement.appendChild(O), window.console = O.contentWindow.console, window.console || (window.console = {
                        debug: function () {
                        }, dir: function () {
                        }, error: function () {
                        }, group: function () {
                        }, groupCollapsed: function () {
                        }, groupEnd: function () {
                        }, info: function () {
                        }, log: function () {
                        }, time: function () {
                        }, timeEnd: function () {
                        }, trace: function () {
                        }, warn: function () {
                        }
                    }), window.console.log("ve: console restored !")
                }
            } catch (P) {
            }
            new r, u();
            var Q = function (a) {
                function b(a) {
                    if (N.shell.log("Loading custom events."), d = e, N.object.isEmpty(a))d.hasCustomSettings = !1; else {
                        d.hasCustomSettings = !0;
                        for (c in a)d[c] = a[c]
                    }
                    return d
                }

                var c = "", d = {}, e = {
                    reload: function (a) {
                        b(a)
                    }, onLoad: function () {
                    }, onFormIdentified: function (a) {
                        return a
                    }, onGetCaptureValue: function (a, b) {
                        return b
                    }, onBackButton: function () {
                        return !0
                    }
                };
                return a && b(a), d
            }(a.customEvents);
            N.shell.info("Loading Capture");
            var R, S, T, U, V, W = "https:" == document.location.protocol ? "https://" : "http://", X = (a.captureConfigUrl, []), Y = !1, Z = !1, $ = !1, _ = {}, ab = (a.journeycode, a.chatServicesUrl), bb = (a.veHostDomain, {
                customerid: a.captureConfig.CustomerId,
                IdentifyAbandonmentOr: a.captureConfig.IdentifyAbandonmentOr,
                NumberIdentifiedFields: a.captureConfig.NumberIdentifiedFields,
                datareceiverurl: a.captureConfig.datareceiverurl
            });
            VEjQuery(document).ready(function () {
                function b(a, b, c) {
                    var d = "https:" == document.location.protocol ? "https://" : "http://";
                    b = d + b + "MarkOptedOut?journeyCode=" + a + "&value=" + c + "&jsoncallback=?";
                    try {
                        VEjQuery.getJSON(b)
                    } catch (e) {
                    }
                }

                function c(a, b) {
                    var c = "https:" == document.location.protocol ? "https://" : "http://";
                    b = c + b + "IsOptedOut?journeyCode=" + a + "&jsoncallback=?";
                    try {
                        VEjQuery.getJSON(b, function (a) {
                            switch (a.result) {
                                case"none":
                                    Z = !1, Y = !0;
                                    break;
                                case"True":
                                    Z = !0, Y = !1;
                                    break;
                                case"False":
                                    Z = !1, Y = !1
                            }
                        })
                    } catch (d) {
                    }
                }

                function d(a, b) {
                    try {
                        var c = R + "&formmappingid=" + b + "&identifyabandonment=" + !1 + "&fieldidname=optOut&identifypage=" + !1 + "&SerieNumber=&valuefield=" + a;
                        db(c)
                    } catch (d) {
                    }
                }

                function e(a, b) {
                    try {
                        var c;
                        if (null == b || -1 == b)return {result: !1};
                        for (var d = 0; d < a.Forms.length; d++)if (a.Forms[d].FormId == b) {
                            c = a.Forms[d];
                            break
                        }
                        for (var e = new Array, d = 0; d < c.FormFields.length; d++)c.FormFields[d].isEmail && e.push({
                            name: c.FormFields[d].ClientFieldName,
                            type: c.FormFields[d].FieldTypeName,
                            htmlType: c.FormFields[d].HtmlType
                        });
                        for (var d = 0; d < c.OptOuts.length; d++) {
                            var f = c.OptOuts[d];
                            if (f.optOutId = a.OptOutField, f.Default)return {result: !0, optOut: f, controls: e};
                            if (VEjQuery(f.Selector).text() == f.Criteria)return {result: !0, optOut: f, controls: e}
                        }
                        return {result: !1}
                    } catch (g) {
                        return {result: !1}
                    }
                }

                function f(a) {
                    try {
                        Z = a
                    } catch (b) {
                    }
                }

                function g(a) {
                    return a.replace(/^\s+|\s+$/g, "")
                }

                function h(a, b, c, e) {
                    try {
                        if (zb = a.Effect, a.MarkUp = g(a.MarkUp), "<div " == a.MarkUp.substring(0, 5) ? a.MarkUp = '<div id="veEMail" ' + a.MarkUp.substring(5) : "<DIV " == a.MarkUp.substring(0, 5) && (a.MarkUp = '<DIV id="veEMail" ' + a.MarkUp.substring(5)), VEjQuery("body").append(a.MarkUp), VEjQuery(".veClose").click(function () {
                                Y = !1, "" == zb ? VEjQuery("#veEMail").hide() : VEjQuery("#veEMail").toggle(zb)
                            }), VEjQuery(".veClick").change(function () {
                                d(!0, a.optOutId), i(this.checked, e, c)
                            }), VEjQuery(".veYesClick").click(function () {
                                d(!0, a.optOutId), i(!0, e, c)
                            }), VEjQuery(".veNoClick").click(function () {
                                d(!1, a.optOutId), i(!1, e, c)
                            }), 0 == VEjQuery(".veClick").length && 0 == VEjQuery(".veYesClick").length && 0 == VEjQuery(".veNoClick").length) {
                            for (var f = 0; f < b.length; f++) {
                                var h = H({
                                    filter: "",
                                    clientFieldName: b[f].name
                                }, b[f].type, b[f].htmlType, b[f].name);
                                VEjQuery(h).blur(function () {
                                    "" == zb ? VEjQuery("#veEMail").hide() : VEjQuery("#veEMail").toggle(zb)
                                })
                            }
                            Z = !0
                        }
                        VEjQuery("#veEMail").css("position", "absolute"), VEjQuery("#veEMail").css("z-index", 1e3), VEjQuery("#veEMail").hide(), _ = {
                            Position: a.Position,
                            X: a.X,
                            Y: a.Y
                        }, Y = !0
                    } catch (j) {
                    }
                }

                function i(a, c, d) {
                    Y = !1, b(c, d, a), f(a), "" == zb ? VEjQuery("#veEMail").hide() : VEjQuery("#veEMail").toggle(zb)
                }

                function m(a) {
                    try {
                        var b = VEjQuery(a), c = b.offset().left, d = b.offset().top;
                        switch (_.Position) {
                            case"TopLeft":
                                break;
                            case"TopRight":
                                c += b.width();
                                break;
                            case"BottonLeft":
                                d += b.height();
                                break;
                            case"BottomRight":
                                c += b.width(), d += b.height()
                        }
                        c += _.X, d += _.Y, VEjQuery("#veEMail").css("left", c).css("top", d), VEjQuery("#veEMail").is(":visible") || ("" == zb ? VEjQuery("#veEMail").show() : VEjQuery("#veEMail").toggle(zb))
                    } catch (e) {
                    }
                }

                function o(a) {
                    try {
                        var b = new String(a).toLowerCase();
                        return b = b.replace("http://", ""), b = b.replace("https://", ""), b = b.replace("#", "?"), b = b.replace(";", "?"), "www." == b.substr(0, 4) && (b = b.replace("www.", "")), b
                    } catch (c) {
                        return ""
                    }
                }

                function p(a, b) {
                    try {
                        var c = W + a.datareceiverurl, d = a.customerid, e = a.IdentifyAbandonmentOr, f = a.NumberIdentifiedFields;
                        R = c + "?journeycode=" + qb + "&captureurl=" + b + "&customerid=" + d + "&identifyabandonmentor=" + e + "&numberidentifiedfields=" + f
                    } catch (g) {
                    }
                }

                function r(a) {
                    try {
                        var b = 0;
                        if (2 == a.FormTypeId && (b = 1), 3 == a.FormTypeId && (b = 9), b > 0) {
                            var c = W + a.datareceiverurl + "ChangeStatus?journeyCode=" + qb + "&status=" + b;
                            db(c)
                        }
                        for (var d = 0; d < a.formfields.length; d++) {
                            var e = a.formfields[d].DomEvent;
                            "DynamicActivity" == e || "DynamicPageIdentified" == e ? A(a.formfields[d]) : E(a.formfields[d])
                        }
                        ob.length > 0 && (s(), setInterval(s, 750))
                    } catch (f) {
                        N.shell.log("Error in ProcesssInitalMappingJSON"), N.shell.log(f)
                    }
                }

                function s() {
                    try {
                        var a = 5;
                        Bb++, Bb == a && (t(), Bb = 0);
                        for (var b = 0; b < Ab.length; b++)Ab[b] = M(Ab[b])
                    } catch (c) {
                    }
                }

                function t() {
                    try {
                        for (var a = 0; a < ob.length; a++)ob[a] = u(ob[a])
                    } catch (b) {
                    }
                }

                function u(a) {
                    try {
                        for (var b = a.selector, c = a.series, d = a.seriesURL, e = a.valueType, f = a.isEmail, g = a.fieldTypeName, h = a.formMappingId, i = VEjQuery(b), j = 0; j < i.length; j++) {
                            var k;
                            k = "" === c ? "" : j + 1;
                            var l = x(i[j], b, k, g, j);
                            if (!y(l)) {
                                "" !== c && (c = parseInt(c) + 1);
                                var m = d + "&SerieNumber=" + c;
                                z(l, e, m, f, h)
                            }
                        }
                        var n = {
                            selector: b,
                            series: c,
                            seriesURL: d,
                            valueType: e,
                            isEmail: f,
                            fieldTypeName: g,
                            formMappingId: h
                        };
                        return n
                    } catch (o) {
                        var p = {selector: "", series: 0, seriesURL: "", valueType: "", isEmail: !1, fieldTypeName: ""};
                        return p
                    }
                }

                function v(a) {
                    return a = w(a, "["), a = w(a, "]"), a = w(a, "jQuery"), a = w(a, ":")
                }

                function w(a, b) {
                    return a.replace(b, "\\" + b)
                }

                function x(a, b, c, d, e) {
                    try {
                        if ("Raw" == d)return b;
                        if ("RawSeries" == d)return b + ":eq(" + e + ")";
                        var f = "";
                        "" != a.id && (f = "#" + v(a.id));
                        var g;
                        if (g = "" == a.name || void 0 == a.name ? !1 : !0, "" == f && g) {
                            var h;
                            switch (a.type) {
                                case"text":
                                case"radio":
                                case"checkbox":
                                case"hidden":
                                    h = "input:" + a.type;
                                    break;
                                default:
                                    h = a.type
                            }
                            f = h + '[name="' + v(a.name) + '"]'
                        }
                        if ("" == f) {
                            var i;
                            i = "" == c ? b : b + ":eq(" + (c - 1) + ")", f = i
                        }
                        return f
                    } catch (j) {
                        return ""
                    }
                }

                function y(a) {
                    try {
                        for (var b = !1, c = 0; c < Ab.length; c++)a == Ab[c].name && (b = !0);
                        return b
                    } catch (d) {
                        return !1
                    }
                }

                function z(a, b, c, d, e) {
                    try {
                        var f = {name: a, oldValue: "", valueType: b, URL: c, isEmail: d, formMappingId: e};
                        Ab.push(f)
                    } catch (g) {
                    }
                }

                function A(a) {
                    try {
                        var b = a.ClientFieldName, c = a.HtmlType, d = a.FieldTypeName, e = a.FormMappingId, f = a.IdentifyAbandonment, g = a.DomEvent, h = a.HtmlAttributeTag, i = a.isEmail;
                        a.hasOwnProperty("isEmail") && (i = a.isEmail);
                        var j;
                        j = "DynamicPageIdentified" == g ? "true" : "false";
                        var k, l, m = I(b), n = H(m, d, c, b);
                        "" == m.filter ? (k = 0, l = "") : (k = 1, l = 0), "RawSeries" == d && (k = 1, l = 0);
                        var o, p = "&formmappingid=" + e + "&identifyabandonment=" + f + "&fieldidname=" + encodeURIComponent(b) + "&identifypage=" + j;
                        o = "Value" == h ? J(c) : h, D(n, l, p, o, i, d, e)
                    } catch (q) {
                        N.shell.log("Error in ProcessAJAXControl"), N.shell.log(q)
                    }
                }

                function D(a, b, c, d, e, f, g) {
                    try {
                        var h = {
                            fieldTypeName: f,
                            selector: a,
                            series: b,
                            seriesURL: c,
                            valueType: d,
                            isEmail: e,
                            formMappingId: g
                        };
                        ob.push(h)
                    } catch (i) {
                    }
                }

                function E(a) {
                    try {
                        var b, c = a.DomEvent, d = a.ClientFieldName, e = a.FieldTypeName, f = a.HtmlType, g = I(d), h = H(g, e, f, d), i = 0, j = 1;
                        a.hasOwnProperty("seriesStart") && (i = a.seriesStart), a.hasOwnProperty("seriesGap") && (j = a.seriesGap), b = "" == g.filter ? 0 : 1, "RawSeries" == e && (b = 1);
                        var k, l = VEjQuery(h);
                        if (0 == b && (l.length > 0 || "href" === a.HtmlAttributeTag && "window.location.href" === a.ClientFieldName)) {
                            var m;
                            m = "Name" == e ? l.length - 1 : 0;
                            for (var n = 0; m >= n; n++) {
                                k = VEjQuery(l[n]);
                                var o = F(a, "", k), p = new eb(o);
                                G(p, c, k)
                            }
                        }
                        if (1 == b)for (var q = i; q < l.length; q += j) {
                            k = VEjQuery(l[q]), o = F(a, q + 1, k);
                            var p = new eb(o);
                            G(p, c, k)
                        }
                    } catch (r) {
                        N.shell.log("Error in ProcessTraditionalControl"), N.shell.log(r)
                    }
                }

                function F(a, b, c) {
                    try {
                        var d, e = a.FieldTypeName, f = a.HtmlType, g = a.FormMappingId, h = a.IdentifyAbandonment, i = a.ClientFieldName, j = a.HtmlAttributeTag;
                        d = "Value" == j ? J(f) : j;
                        var k = {
                            clientFieldName: i,
                            fieldTypeName: e,
                            htmlType: f,
                            series: b,
                            formMappingId: g,
                            identifyAbandonment: h,
                            pageIdentified: !1,
                            controlOnPage: c,
                            accessType: d
                        };
                        return k
                    } catch (l) {
                        var m = {
                            clientFieldName: "",
                            fieldTypeName: "",
                            htmlType: "",
                            series: "",
                            formMappingId: "",
                            identifyAbandonment: "",
                            pageIdentified: !1,
                            controlOnPage: "",
                            accessType: ""
                        };
                        return m
                    }
                }

                function G(a, b, c) {
                    try {
                        "OnChange" == b && c.change(a.sendData), "OnBlur" == b && c.blur(a.sendData), "OnLoad" == b && c.ready(a.sendData), "OnloadOnChange" == b && (c.ready(a.sendData), c.change(a.sendData))
                    } catch (d) {
                    }
                }

                function H(a, b, c, d) {
                    return d
                }

                function I() {
                    return {filter: ""}
                }

                function J() {
                    throw new Error("Failed to get access type during form mapping initialisation.")
                }

                function K(a, b) {
                    var c = new RegExp("&formmappingid=[0-9]*&"), d = (new RegExp("[0-9]*"), new RegExp("&SerieNumber=d*")), e = c.exec(a)[0];
                    e = e.substring(15, e.length - 1);
                    var f = d.exec(a)[0];
                    f = f.substring(13, f.length), L(b, e, f)
                }

                function L(a, b, c) {
                    for (var d = !1, e = 0; e < X.length; e++) {
                        var f = X[e];
                        if (f.fieldId == b && f.series == c) {
                            f.fieldValue = a, d = !0;
                            break
                        }
                    }
                    d || X.push({
                        fieldValue: a,
                        fieldId: b,
                        series: c
                    }), N.shell.log("FormMapping: " + b + ". Value detection: " + decodeURIComponent(a)), null != T && T(a, b)
                }

                function M(a) {
                    try {
                        var b = a.oldValue, c = P(a.name, a.valueType, a.formMappingId, a.clientFieldName), d = a.URL + "&valuefield=" + c;
                        if (c != b) {
                            if (a.oldValue = c, Cb++, a.isEmail && ($ && Y && 0 != Cb && m(a.name), !O(decodeURIComponent(c))))return a;
                            if (fb(c))return a;
                            K(a.URL, c), db(R + d)
                        }
                        return a
                    } catch (e) {
                        return {name: "", oldValue: "", valueType: "", URL: ""}
                    }
                }

                function O(a) {
                    a = a.toUpperCase();
                    var b = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/;
                    return -1 == a.search(b) ? !1 : !0
                }

                function P(a, b, c, d) {
                    try {
                        var e;
                        if (e = VEjQuery(a), "href" === b && "window.location.href" === d) {
                            var f = ab(e, null, b, d);
                            return V(c, f, e)
                        }
                        if (0 == e.length)return "";
                        var g = e[0], f = ab(e, g, b, d);
                        return V(c, f, e)
                    } catch (h) {
                        return ""
                    }
                }

                function V(a, b, c) {
                    try {
                        return Q.onGetCaptureValue(a, b, c)
                    } catch (d) {
                        return ""
                    }
                }

                function ab(a, b, c, d) {
                    try {
                        switch (c) {
                            case"value":
                                return encodeURIComponent(b.value);
                            case"checkbox":
                                return b.checked ? "Checked" : "Unchecked";
                            case"innerHTML":
                                try {
                                    return N.capture.getInnerText(b)
                                } catch (e) {
                                    return ""
                                }
                                break;
                            case"src":
                                return encodeURIComponent(b.src);
                            case"radio":
                                return cb(a);
                            case"Class":
                                return b.attributes.getNamedItem("class").value;
                            case"Id":
                                return b.id;
                            case"href":
                                return encodeURIComponent("window.location.href" === d ? window.location.href : b.href);
                            default:
                                return b.style[c]
                        }
                    } catch (f) {
                        return ""
                    }
                }

                function cb(a) {
                    try {
                        for (var b = "", c = 0; c < a.length; c++)a[c].checked && (b = "" == b ? a[c].value : b + " --- " + a[c].value);
                        return b
                    } catch (d) {
                        return ""
                    }
                }

                function db(a) {
                    a += "&jsoncallback=?";
                    try {
                        VEjQuery.getJSON(a, function () {
                        })
                    } catch (b) {
                    }
                }

                function eb(a) {
                    this.sendData = function () {
                        try {
                            var b = P(a.controlOnPage, a.accessType, a.formMappingId, a.clientFieldName);
                            if (fb(b))return;
                            var c = "&formmappingid=" + a.formMappingId + "&identifyabandonment=" + a.identifyAbandonment + "&fieldidname=" + encodeURIComponent(a.clientFieldName) + "&identifypage=" + a.pageIdentified + "&SerieNumber=" + a.series + "&valuefield=" + b;
                            if ("" == b && ":radio" == vAA.htmlType)return;
                            L(b, a.formMappingId, a.series), db(R + c)
                        } catch (d) {
                        }
                    }
                }

                function fb(a) {
                    var b = ib(a);
                    return b.length >= 15 ? gb(a) : !1
                }

                function gb(a) {
                    for (var b = 15 != a.length, c = 0, d = 0; d < a.length; d++) {
                        var e = a.substring(d, d + 1);
                        c += hb(1 * e, b), b = !b
                    }
                    return c % 10 == 0
                }

                function hb(a, b) {
                    var c = b ? 2 : 1, d = a * c;
                    return d > 9 && (d = d % 10 + 1), d
                }

                function ib(a) {
                    for (var b = "", c = 0; c < a.length; c++) {
                        var d = a.substring(c, c + 1);
                        d >= "0" && "9" >= d && (b += d)
                    }
                    return b
                }

                var jb, kb, lb, mb, nb = a.captureConfig, ob = new Array, pb = encodeURIComponent(o(window.location)), qb = nb.JourneyCode, rb = !1, sb = N.capture.splitFormsByType(nb.Forms, 4), tb = sb.matchedForms;
                nb.Forms = sb.remainingForms;
                for (var ub = 0; ub < nb.Forms.length; ub++)if (nb.Forms[ub].OptOuts.length > 0 && nb.Forms[ub].OptOuts[0].Effect.length > 0) {
                    rb = !0;
                    break
                }
                if (rb) {
                    var vb = document.getElementById("veEffects");
                    if (!vb) {
                        var wb = document.createElement("script");
                        wb.id = "veEffects", wb.type = "text/javascript", wb.async = !0, wb.src = ("https:" == document.location.protocol ? "https://" : "http://") + a.veHostDomain + "/scripts/shared/compliance-effects.js";
                        var xb = document.getElementsByTagName("script")[0];
                        xb.parentNode.insertBefore(wb, xb)
                    }
                }
                p(nb, pb), jb = k(nb.Forms), kb = n(tb), lb = j(jb), S = j(jb, !0), S !== lb && (matchedClassicForms = [N.capture.findFormById(S, nb.Forms)], lb = S), 0 === jb.length && "undefined" != typeof B && B(), mb = new q(jb, kb), bb = l(mb, bb), null !== bb.chatAgentId && null != U && U(), "undefined" != typeof C && (settings.appsFormsBlacklist && -1 === N.array.indexOf(S, settings.appsFormsBlacklist) || !settings.appsFormsBlacklist) && C(S);
                var yb = e(nb, S);
                yb.result && (c(nb.JourneyCode, nb.datareceiverurl), $ = !0, h(yb.optOut, yb.controls, nb.datareceiverurl, nb.JourneyCode)), r(bb);
                var zb, Ab = new Array, Bb = 4, Cb = 0
            }), Q.onLoad(), function () {
                function a() {
                    var a = "klarnaCheckoutIntegration";
                    document.getElementById(a) || (klarnaContainer = document.createElement("div"), klarnaContainer.id = a, klarnaContainer.style.display = "none", document.body.appendChild(klarnaContainer))
                }

                function b(a, b) {
                    var c = "h_KlarnaCheckout_", d = document.getElementById(c + a);
                    d || (d = document.createElement("input"), d.type = "hidden", d.id = c + a, d.name = c + a, klarnaContainer.appendChild(d)), d.value = b
                }

                function c(a) {
                    if (a) {
                        var c, d, e, f, g = ["email", "postal_code", "given_name", "family_name"], h = null;
                        for (d = 0, e = g.length; e > d; d += 1)c = g[d], f = a[c], f && (h = b(c, f))
                    }
                }

                "undefined" != typeof window._klarnaCheckout && window._klarnaCheckout(function (b) {
                    a(), N.shell.info("Loading Klarna intergation"), b.on({
                        change: function (a) {
                            c(a)
                        }
                    })
                })
            }();
            var cb = new function () {
                "use strict";
                function a() {
                    return A
                }

                function b() {
                    switch (a()) {
                        case 0:
                            return "Not Loaded";
                        case 1:
                            return "Loaded";
                        case 2:
                            return "Playing";
                        case 3:
                            return "Delayed";
                        case 4:
                            return "Paused";
                        case 5:
                            return "Going Back";
                        case 6:
                            return "Stopped";
                        case 7:
                            return "Shown";
                        default:
                            return "no status"
                    }
                }

                function c(a) {
                    A = a
                }

                function d() {
                    w.isDelayed() && (N.shell.log("AppManager delay cleared"), clearTimeout(w.lastDelayTimeout))
                }

                function e() {
                    N.shell.info("Enabling AppManager"), E.startInactivity(), c(2)
                }

                function f(a) {
                    function b() {
                        var b = !1;
                        for (c in a)a[c] && (b = !0);
                        return b
                    }

                    var c = null;
                    b() ? w.pause() : (w.resume(), w.delay())
                }

                function g(a) {
                    if (!G)switch (a) {
                        case"assist":
                            G = J[a].agent.popupMessage || "You might have missed some products";
                            break;
                        case"chat":
                            G = J[a].agent.popupMessage || "An agent wants to speak with you"
                    }
                }

                function h(a) {
                    var b = !0;
                    if ("assist" === a) {
                        var c = {
                            time: N.date.now(),
                            closed: "1"
                        }, d = J.assist.app.storage.isInVeSession(), e = J.assist.app.storage.load("closed") || "0";
                        J[a].custom.rememberClosed && d && (b = !N.string.stringToBool(e)), J.assist.app.storage.store(c)
                    }
                    return b
                }

                function i(a, b) {
                    var c, d, b = "boolean" == typeof b ? b : !0, e = 0;
                    if (H[a])for (; e < H[a].length; e += 1)if (d = J[H[a][e]].app, d.isAppReady) {
                        if (c = H[a][e], b && h(c))return c;
                        if (!b)return c
                    }
                    return !1
                }

                function j(a) {
                    return void 0 !== a && w.isPlaying() ? (J[a].app.show(), G) : w.isGoingBack() ? G : !1
                }

                function k() {
                    "Chrome" === M.browser() && parseFloat(M.version()) > 31 ? alert(" ") : "Safari" === M.browser() && "Mac" === M.OS() && alert(" ")
                }

                function l() {
                    var a = null;
                    return w.isPlaying() ? (a = i("exit", !0), a && (g(a), K.exitEventFired(a))) : w.isGoingBack() && (clearTimeout(w.backButtonClickedTimer), a = i("backButton", !1), a && K.backButtonFired(a)), a && "chat" !== a || "chat" === a && J[a].agent.onCloseActive ? (G = j(a), w.shown(), k(), K.appAccepted(a), G) : !1
                }

                function m(a) {
                    var b = null;
                    return "function" == typeof Q.onBackButton && (b = Q.onBackButton()), "boolean" == typeof b ? b : "boolean" == typeof a ? a : !1
                }

                function n(a) {
                    if (w.isPlaying() && !N.domain.referrerIsInDomains(D, settings.domainsToIgnore)) {
                        var b = i(a, !0);
                        b ? (g(b), j(b), w.backButtonClicked()) : w.pause()
                    } else w.pause();
                    return m(!0)
                }

                function o(a) {
                    if (w.isPlaying()) {
                        var b, c = i(a, !0);
                        if (c && "chat" !== c || "chat" === c && J[c].agent.inactivityActive)return b = j(c), K.inactivityFired(c), w.shown(), b
                    }
                }

                function p(a) {
                    return w.isPlaying() ? j(a) : void 0
                }

                function q() {
                    VeAPI.capture.formId = function () {
                        return S
                    }, c(1);
                    H ? c(2) : N.shell.info("No priorities, AppsManager doesn't start")
                }

                function r(a) {
                    for (var b in H)"inactivity" !== b && -1 !== N.array.indexOf(a, H[b]) && E.addEvent(b)
                }

                function s(a) {
                    I.addSettings("default", null);
                    for (var b in a)I.addSettings(b, a[b])
                }

                function t(a) {
                    for (var b in a)E.removeEvent(b)
                }

                function u(a) {
                    I.removeSettings("default", null);
                    for (var b in a)I.removeSettings(b)
                }

                function v() {
                    N.shell.info("Stop AppManager"), t(H), C && (u(settings), C = !1), C = !1
                }

                var w = this, A = 0, B = "none", C = !1, E = null, I = null, K = null;
                this.status = function () {
                    N.shell.log(b())
                }, this.isLoaded = function () {
                    return a() > 0 && a() < 6
                }, this.isPlaying = function () {
                    return 2 === a()
                }, this.isDelayed = function () {
                    return 3 === a()
                }, this.isPaused = function () {
                    return 4 === a()
                }, this.isGoingBack = function () {
                    return 5 === a()
                }, this.isStopped = function () {
                    return 6 === a()
                }, this.hasBeenShown = function () {
                    return 7 === a()
                }, this.delay = function () {
                    w.isPlaying() || w.isDelayed() ? (d(), N.shell.info("Delaying AppManager"), c(3), w.lastDelayTimeout = setTimeout(function () {
                        w.isDelayed() && e()
                    }, 3e3)) : N.shell.log("Not delaying. AppManager status: " + b())
                }, this.resume = function () {
                    w.isPaused() ? e() : N.shell.log("Not enabling. AppManager status: " + b())
                }, this.pause = function () {
                    w.isPlaying() || w.isDelayed() ? (N.shell.info("Pausing AppManager"), d(), E.stopInactivity(), c(4)) : N.shell.log("Not pausing. AppManager status: " + b())
                }, this.backButtonClicked = function () {
                    w.hasBeenShown() || (N.shell.info("Back button has been clicked"), c(5), w.backButtonClickedTimer = setTimeout(function () {
                        if (!w.hasBeenShown()) {
                            var a = i("backButton", !1);
                            K.backButtonFired(a), K.appAccepted(a), w.shown()
                        }
                    }, 500))
                }, this.stop = function () {
                    w.isLoaded() ? (c(6), v()) : N.shell.log("Not stopping. AppManager status: " + b())
                }, this.shown = function () {
                    N.shell.info("App has been shown"), clearTimeout(w.backButtonClickedTimer), w.stop(), c(7)
                }, w.onSettingsDelaying = function () {
                    w.delay()
                }, w.onSettingsPausingChange = function (a) {
                    f(a)
                }, w.onSettingsStoppingApps = function () {
                    w.stop()
                }, this.isEventAdded = function (a) {
                    return E ? E.isEventAdded(a) : void 0
                }, this.runApp = function (a) {
                    J[a].app.show()
                }, w.onEvent = function (a) {
                    switch (a) {
                        case"backButton":
                            return n(a);
                        case"exit":
                            return l(a);
                        case"inactivity":
                            return o(a);
                        case"load":
                            return p(a)
                    }
                }, w.onInitializedApp = function (a) {
                    r(a), C || (s(settings), C = !0)
                }, w.setInactivityEvent = function (a, b) {
                    if (H.inactivity) {
                        var c = N.array.indexOf(B, H.inactivity), d = N.array.indexOf(a, H.inactivity);
                        -1 !== d && (c > d || -1 === c) && (B = a, F = 1e3 * b, E.addEvent("inactivity"))
                    }
                }, w.removeEvent = function (a) {
                    delete H[a], N.object.isEmpty(H) ? v() : E.removeEvent(a)
                }, w.init = function () {
                    N.shell.info("Loading AppsManager"), E = new y, I = new z, K = new x, E.init(), I.init(), q()
                }
            };
            M = new g(veTagData.settings.unsupportedBrowsersVersionPlatform), VeAPI.browser = M, M.isSupported() ? N.domain.isInIframe() ? N.shell.info("Not loading VeApps: within an Iframe") : d(a.apps) : N.shell.info("Not loading VeApps : " + M.messageNotSupported()), U = function () {
                M.isSupported() && -1 !== N.array.indexOf("chat", I) && A()
            }, T = function () {
                M.isSupported() && (0 === agentManager.getFormId() && (agentManager = new w(S)), agentManager.findAgents(X))
            }
        }
    })
} catch (e) {
    console.error(e.name + ": " + e.message)
}
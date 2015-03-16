/*! Copyright 2006-2015 ClickTale Ltd. */
!function () {
    var aR = !0, aQ = null, aP = !1;

    function aO(e) {
        return function () {
            return e
        }
    }

    var aN;
    var aM;

    function aL() {
        if (aM) {
            return aM
        }
        var e = window.ClickTaleGlobal;
        e || (e = {}, window.ClickTaleGlobal = e);
        e.exports = e.exports || {};
        return aM = e
    }

    var aK;

    function aJ() {
        if (!aK) {
            var e = aL();
            e.exports.queueing = e.exports.queueing || {};
            aK = e.exports.queueing
        }
        return aK
    }

    function aI(f, e) {
        this.f = aR;
        this.d = [];
        this.h = f;
        this.a = e;
        this.a.setContext(this)
    }

    aN = aI.prototype;
    aN.r = function (e) {
        this.j(e, this.d.length)
    };
    aN.j = function (f, e) {
        this.f && (this.d.splice(e, 0, f), this.i())
    };
    aN.s = function (e) {
        this.j(e, 0)
    };
    aN.l = function () {
        return this.d[0]
    };
    aN.i = function () {
        var e = this.l();
        if (e) {
            if (this.h.process(e) && (this.d = this.d.splice(1), !this.k())) {
                return e
            }
            this.a.defer(this.i)
        }
        return aQ
    };
    aN.k = function () {
        return 0 < this.d.length
    };
    aN.flush = function (f) {
        var e, f = f || aO(aR);
        this.f = aP;
        for (this.a.destroy(); e = this.l();) {
            f(e) && this.h.process(e), this.d = this.d.splice(1)
        }
    };
    aN.q = function () {
        this.f = aP;
        this.a && this.a.destroy();
        this.a = this.h = aQ;
        this.d.length = 0
    };
    function aH(f, e, g) {
        this.f = aR;
        this.g = [];
        this.e = [];
        this.h = f;
        this.a = e;
        this.p = g;
        this.a.setContext(this)
    }

    aN = aH.prototype;
    aN.r = function (e) {
        this.j(e, this.e)
    };
    aN.j = function (f, e) {
        this.f && (e.push(f), this.i())
    };
    aN.s = function (e) {
        this.j(e, this.g)
    };
    function aG(f) {
        var e;
        if (e = f.g[0]) {
            f.g = f.g.splice(1)
        } else {
            if (e = f.e[0]) {
                f.e = f.e.splice(1)
            }
        }
        return e
    }

    aN.l = function () {
        return this.g[0] || this.e[0]
    };
    aN.i = function () {
        var e = this.l();
        if (e) {
            if (this.h.process(e) && (aG(this), !this.k())) {
                return e
            }
            this.p() && this.a.defer(this.i)
        }
        return aQ
    };
    aN.k = function () {
        return 0 < this.g.length || 0 < this.e.length
    };
    aN.flush = function () {
        var e;
        this.f = aP;
        this.a.destroy();
        for (this.e.length = 0; e = aG(this);) {
            this.h.process(e)
        }
    };
    aN.q = function () {
        this.f = aP;
        this.a && this.a.destroy();
        this.p = this.a = this.h = aQ;
        this.g.length = 0;
        this.e.length = 0
    };
    function aF(e) {
        this.n = e;
        this.b = window;
        this.c = 0
    }

    aF.prototype.defer = function (f) {
        var e = this;
        this.c || (this.c = setTimeout(function () {
            e.clear();
            f.apply(e.b)
        }, this.n))
    };
    aF.prototype.o = function (e) {
        this.b = e
    };
    aF.prototype.clear = function () {
        clearTimeout(this.c);
        this.c = aQ
    };
    aF.prototype.m = function () {
        this.clear();
        this.n = this.b = aQ
    };
    function aE(e) {
        this.t = e;
        this.b = window;
        this.c = 0
    }

    aE.prototype.defer = function (f) {
        var e = this;
        this.c || (this.c = setTimeout(function () {
            e.clear();
            f.apply(e.b)
        }, this.t()))
    };
    aE.prototype.o = function (e) {
        this.b = e
    };
    aE.prototype.clear = function () {
        clearTimeout(this.c);
        this.c = aQ
    };
    aE.prototype.m = function () {
        this.clear();
        this.n = this.b = aQ
    };
    function aD() {
        this.b = window;
        this.c = 0
    }

    aD.prototype.defer = function (e) {
        e.apply(this.b)
    };
    aD.prototype.o = function (e) {
        this.b = e
    };
    aD.prototype.clear = function () {
    };
    aD.prototype.m = function () {
        this.b = aQ
    };
    (function () {
        function f(j) {
            return {
                enqueue: function () {
                    j.r.apply(j, arguments)
                }, enqueueTop: function () {
                    j.s.apply(j, arguments)
                }, flush: function () {
                    j.flush.apply(j, arguments)
                }, dequeue: function () {
                    j.i.call(j)
                }, destroy: function () {
                    j.q.call(j)
                }, hasItems: function () {
                    return j.k.call(j)
                }
            }
        }

        function e(j) {
            return {
                defer: function () {
                    j.defer.apply(j, arguments)
                }, setContext: function () {
                    j.o.apply(j, arguments)
                }, destroy: function () {
                    j.m.call(j)
                }
            }
        }

        var g = aJ();
        g.createQueue = function (j, l) {
            var k = new aI(j, l);
            return f(k)
        };
        g.createTransportQueue = function (j, l, k) {
            j = new aH(j, l, k);
            return f(j)
        };
        g.createPromise = function (j) {
            return e("function" === typeof j ? new aE(j) : new aF(j))
        };
        g.createStubPromise = function () {
            return e(new aD)
        }
    })();
    function aC(e) {
        e = e.ClickTaleSettings;
        "object" !== typeof e && (e = aQ);
        return e
    }

    function aB() {
    }

    function aA(f, e) {
        var g = az, j = ay(g, e);
        return j ? j : (j = ay(g, f)) ? j : aB
    }

    function av(f, e) {
        return "function" === typeof f ? f : "number" === typeof f ? function () {
            return f
        } : e || aQ
    }

    function ay(f, e) {
        return "function" === typeof e ? e : "string" === typeof e ? ay(f, f[e]) : aQ
    }

    function au(f) {
        function e() {
            return 0
        }

        var f = (aC(f) || {}).Compression || {}, j = av(f.Interval), k = f.Async, g = f.UseDefer;
        f.Interval = function () {
            return j
        };
        f.Level = av(f.Level, e);
        f.ChunkSize = av(f.ChunkSize, e);
        f.MaxExecutionTime = av(f.MaxExecutionTime, aO(50));
        f.DeferExecutionTime = av(f.DeferExecutionTime, e);
        f.Async = function () {
            return "function" === typeof k ? !!k() : k
        };
        f.UseDefer = function () {
            var l = "function" === typeof g ? !!g() : g;
            return "boolean" !== typeof l ? aR : l
        };
        return f
    }

    var at = {deflate: {name: "deflate", hasLevels: aR}, lzw: {name: "lzw", hasLevels: aP}};
    var ar, aq, ap;
    (function () {
        var f = {}, e, g;
        ar = function (j) {
            f[j.name] = j;
            if (!e || j.u) {
                e = j
            }
        };
        aq = function (j) {
            g = j
        };
        ap = function (k) {
            var j = g(k);
            return j in f ? f[j].encode(k) : e.encode(k)
        }
    })();
    var ao;

    function an(f) {
        var e;
        ao || (e = aL(), e.exports.compression = e.exports.compression || {}, ao = e.exports.compression);
        e = ao;
        e.addMethod = ar;
        e.encode = ap;
        e.getCompressionLevel = f.Level;
        e.getCompressionInterval = f.Interval;
        e.getChunkSize = f.ChunkSize;
        e.getMaxExecutionTime = f.MaxExecutionTime;
        e.getIsAsync = f.Async;
        e.getCompressionDeferTime = f.DeferExecutionTime;
        e.getUseDefer = f.UseDefer
    }

    (function (f) {
        var f = au(f), e = f.Method, g = typeof e, j;
        an(f);
        switch (g) {
            case"string":
            case"undefined":
                if (e && (e = e.toLowerCase(), e in at)) {
                    j = function () {
                        return e
                    };
                    break
                }
                j = function () {
                    return at.lzw.name
                };
                break;
            case"function":
                j = e
        }
        aq(j)
    })(window);
    function am() {
        this.rules = []
    }

    aN = am.prototype;
    aN.addRule = function (e) {
        al(this, e, this.rules.length)
    };
    function al(f, e, g) {
        var j;
        "function" === typeof e ? j = e : "pattern" in e && "replace" in e && (j = function (k) {
            return k.replace(e.pattern, e.replace)
        });
        j && (g === f.rules.length ? f.rules.push(j) : f.rules.splice(g, 0, j))
    }

    aN.insertAt = function (f, e) {
        al(this, f, e)
    };
    aN.clear = function () {
        this.rules.length = 0
    };
    aN.removeAt = function (e) {
        0 < e && e < this.rules.length && this.rules.splice(e, 1)
    };
    aN.rewrite = function (f) {
        for (var e = 0; e < this.rules.length; e++) {
            f = (0, this.rules[e])(f)
        }
        return f
    };
    var ak;

    function aj() {
        if (!ak) {
            var e = aL();
            e.exports.rewriteRules = e.exports.rewriteRules || {};
            ak = e.exports.rewriteRules
        }
        return ak
    }

    var az = window, ai = (aC(az) || {}).RewriteRules || {};
    ai.OnBeforeRewrite = aA("ClickTaleOnBeforeRewrite", ai.OnBeforeRewrite);
    ai.OnAfterRewrite = aA("ClickTaleOnAfterRewrite", ai.OnAfterRewrite);
    var ah = ai.Rules, ag = function () {
        var f = aj(), e = new am;
        f.addRule = function () {
            return e.addRule.apply(e, arguments)
        };
        f.insertAt = function () {
            return e.insertAt.apply(e, arguments)
        };
        f.removeAt = function () {
            return e.removeAt.apply(e, arguments)
        };
        f.clear = function () {
            return e.clear.apply(e, arguments)
        };
        f.rewrite = function () {
            return e.rewrite.apply(e, arguments)
        };
        f.raiseOnBeforeRewrite = ai.OnBeforeRewrite;
        f.raiseOnAfterRewrite = ai.OnAfterRewrite;
        return e
    }();
    if (ah instanceof Array) {
        for (var af = 0; af < ah.length; af++) {
            ag.addRule(ah[af])
        }
    }
    function ae(f) {
        var f = (aC(f) || {}).Transport || {}, e = av(f.Interval), j = f.LastMessage || {}, k = j.RegisterToOnBeforeUnload, g = av(f.MaxConcurrentRequests, aO(2));
        switch (typeof k) {
            case"boolean":
                j.RegisterToOnBeforeUnload = function () {
                    return k
                };
                break;
            case"function":
                j.RegisterToOnBeforeUnload = k;
                break;
            default:
                j.RegisterToOnBeforeUnload = aO(aP)
        }
        f.Interval = function () {
            return e
        };
        f.LastMessage = function () {
            return j
        };
        f.MaxConcurrentRequests = function () {
            return g
        };
        return f
    }

    var ad;

    function aw() {
        if (!ad) {
            var e = aL();
            e.exports.transport = e.exports.transport || {};
            ad = e.exports.transport
        }
        return ad
    }

    (function (f) {
        var e = aw(), f = ae(f), g = f.Legacy === aR;
        e.isLegacy = function () {
            return g
        };
        e.getTransportInterval = f.Interval;
        e.getTransportLastMessage = f.LastMessage;
        e.getMaxConcurrentRequests = f.MaxConcurrentRequests
    })(window);
    var ac;
    var ab = (aC(window) || {}).LogicalPages || {};
    ab.Enable = !!ab.Enable;
    ab.URL = !!ab.URL;
    ab.History = !!ab.History;
    var w;
    if (!ac) {
        var h = aL();
        h.exports.LogicalPages = h.exports.LogicalPages || {};
        ac = h.exports.LogicalPages
    }
    w = ac;
    w.enable = ab.Enable;
    w.url = ab.URL;
    w.history = ab.History;
    var d;
    var aS = window, c;
    if (!d) {
        var b = aL();
        b.exports.recordingTime = b.exports.recordingTime || {};
        d = b.exports.recordingTime
    }
    c = d;
    var a = ((aC(aS) || {}).RecordingTime || {}).MaxRecordingTime;
    c.recordingTime = {};
    var ax;
    "number" === typeof a && 0 < a ? (c.maxRecordingTime = 60000 * a, ax = aR) : ax = aP;
    ax || (c.maxRecordingTime = 1800000)
}();
function WRCr(a) {
    this.options = a;
    if (a.text.length == 0) {
        return
    }
    var d = {};
    for (i = 0; i < 256; i++) {
        d[String.fromCharCode(i)] = i
    }
    var b = encodeURI(a.text);
    var c = {s: b, ch: a.chunkSize, t: -1, f: null, e: null, d: d, i: 0, cc: 256, p: "", context: this};
    this.process = function (e) {
        c.f = e;
        return WRAh(c)
    }
}
function WRAg(c, b, a, g, h) {
    if (c.length == 0) {
        return
    }
    var j = {};
    for (i = 0; i < 256; i++) {
        j[String.fromCharCode(i)] = i
    }
    c = encodeURI(c);
    WRAh({s: c, ch: b, t: a, f: g, e: h, d: j, i: 0, cc: 256, p: ""})
}
function WRAh(d) {
    var a = "", e;
    if (d.p == "") {
        d.p = WRAi(d)
    }
    while (d.i < d.s.length && a.length < d.ch) {
        e = WRAi(d);
        if (e == "") {
            return
        }
        if (d.d.hasOwnProperty(d.p + e)) {
            d.p += e
        } else {
            a += WRAj(d.d[d.p]);
            if (d.cc < 4096) {
                d.d[d.p + e] = d.cc++
            }
            d.p = e
        }
    }
    if (d.i < d.s.length) {
        if (d.t >= 0) {
            setTimeout(function () {
                WRAh(d)
            }, d.t)
        }
    } else {
        a += WRAj(d.d[d.p])
    }
    var c = d.i >= d.s.length;
    d.f.apply(d.context, [a, c]);
    if (c && d.e) {
        d.e()
    }
    return !c
}
function WRAi(a) {
    var b = a.s.charAt(a.i++);
    if (b == "%") {
        b = String.fromCharCode(WRAa[a.s.charAt(a.i++)] * 16 + WRAa[a.s.charAt(a.i++)])
    }
    return b
}
function WRAj(a) {
    return WRAY[a >> 6] + WRAY[a & 63]
}
/*! Iuppiter Utf8 encode library, New BSD License, Copyright (c) 2010 Nuwa Information Co., Ltd, and individual contributors. All rights reserved. https://code.google.com/p/jslzjb/source/browse/trunk/Iuppiter.js?r=2
 Zlib RawDeflate, zlib license, Copyright (C) 1999-2012 Masanao Izumo (JavaScript implementation), Copyright (C) 1995-2012 Jean-loup Gailly and Mark Adler (Original implementation). http://www.onicos.com/staff/iz/release/zlib-js/zlib-js.html */
function WRDS(c) {
    var b, a;
    if (c) {
        b = self;
        a = c.data
    } else {
        b = window
    }
    b.WRCt = b.WRCt || function (r, bb) {
        var o = 32768;
        var X = 0;
        var bQ = 1;
        var be = 2;
        var aw = 6;
        var bO = true;
        var a6 = 32768;
        var au = 64;
        var q = 1024 * 8;
        var I = 2 * o;
        var a2 = 3;
        var h = 258;
        var aU = 16;
        var w = 8192;
        var bN = 13;
        if (w > a6) {
            alert("error: zip_INBUFSIZ is too small")
        }
        if ((o << 1) > (1 << aU)) {
            alert("error: zip_WSIZE is too large")
        }
        if (bN > aU - 1) {
            alert("error: zip_HASH_BITS is too large")
        }
        if (bN < 8 || h != 258) {
            alert("error: Code too clever")
        }
        var ay = w;
        var B = 1 << bN;
        var aD = B - 1;
        var aq = o - 1;
        var aI = 0;
        var a3 = 4096;
        var m = h + a2 + 1;
        var bz = o - m;
        var aV = 1;
        var ah = 15;
        var n = 7;
        var bJ = 29;
        var ab = 256;
        var bv = 256;
        var aK = ab + 1 + bJ;
        var bc = 30;
        var j = 19;
        var y = 16;
        var aP = 17;
        var af = 18;
        var bw = 2 * aK + 1;
        var bI = parseInt((bN + a2 - 1) / a2);
        var ax;
        var ao, ak;
        var k;
        var bS = null;
        var bU, aO;
        var br;
        var aJ;
        var d;
        var bq;
        var D;
        var aF;
        var K;
        var u;
        var bV;
        var ai;
        var aZ;
        var aY;
        var an;
        var ad;
        var bk;
        var aL;
        var F;
        var H;
        var W;
        var bE;
        var bh;
        var x;
        var Q;
        var e;
        var U;
        var a4;
        var bF;
        var al;
        var aT;
        var aX;
        var ap;
        var aH;
        var at;
        var G;
        var bW;
        var R;
        var v;
        var t;
        var bT;
        var N;
        var bl;
        var a5;
        var ac;
        var a0;
        var bC;
        var a9;
        var bg;
        var P;
        var bB;
        var bX;
        var bm = null;
        var aN = false;

        function bn() {
            return bm || (bm = new Date())
        }

        function l() {
            return bm = null
        }

        function ba() {
            this.fc = 0;
            this.dl = 0
        }

        function a1() {
            this.dyn_tree = null;
            this.static_tree = null;
            this.extra_bits = null;
            this.extra_base = 0;
            this.elems = 0;
            this.max_length = 0;
            this.max_code = 0
        }

        function bs(bZ, bY, b1, b0) {
            this.good_length = bZ;
            this.max_lazy = bY;
            this.nice_length = b1;
            this.max_chain = b0
        }

        function bo() {
            this.next = null;
            this.len = 0;
            this.ptr = new Array(q);
            this.off = 0
        }

        var bd = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0);
        var bP = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13);
        var aW = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7);
        var C = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
        var bK = new Array(new bs(0, 0, 0, 0), new bs(4, 4, 8, 4), new bs(4, 5, 16, 8), new bs(4, 6, 32, 32), new bs(4, 4, 16, 16), new bs(8, 16, 32, 32), new bs(8, 16, 128, 128), new bs(8, 32, 128, 256), new bs(32, 128, 258, 1024), new bs(32, 258, 258, 4096));

        function f(bZ) {
            var bY;
            if (!bZ) {
                bZ = aw
            } else {
                if (bZ < 1) {
                    bZ = 1
                } else {
                    if (bZ > 9) {
                        bZ = 9
                    }
                }
            }
            bh = bZ;
            k = false;
            F = false;
            if (bS != null) {
                return
            }
            ax = ao = ak = null;
            bS = new Array(q);
            aJ = new Array(I);
            d = new Array(ay);
            bq = new Array(a6 + au);
            D = new Array(1 << aU);
            e = new Array(bw);
            for (bY = 0; bY < bw; bY++) {
                e[bY] = new ba()
            }
            U = new Array(2 * bc + 1);
            for (bY = 0; bY < 2 * bc + 1; bY++) {
                U[bY] = new ba()
            }
            a4 = new Array(aK + 2);
            for (bY = 0; bY < aK + 2; bY++) {
                a4[bY] = new ba()
            }
            bF = new Array(bc);
            for (bY = 0; bY < bc; bY++) {
                bF[bY] = new ba()
            }
            al = new Array(2 * j + 1);
            for (bY = 0; bY < 2 * j + 1; bY++) {
                al[bY] = new ba()
            }
            aT = new a1();
            aX = new a1();
            ap = new a1();
            aH = new Array(ah + 1);
            at = new Array(2 * aK + 1);
            R = new Array(2 * aK + 1);
            v = new Array(h - a2 + 1);
            t = new Array(512);
            bT = new Array(bJ);
            N = new Array(bc);
            bl = new Array(parseInt(w / 8))
        }

        function bj() {
            ax = ao = ak = null;
            bS = null;
            aJ = null;
            d = null;
            bq = null;
            D = null;
            e = null;
            U = null;
            a4 = null;
            bF = null;
            al = null;
            aT = null;
            aX = null;
            ap = null;
            aH = null;
            at = null;
            R = null;
            v = null;
            t = null;
            bT = null;
            N = null;
            bl = null
        }

        function p(bY) {
            bY.next = ax;
            ax = bY
        }

        function J() {
            var bY;
            if (ax != null) {
                bY = ax;
                ax = ax.next
            } else {
                bY = new bo()
            }
            bY.next = null;
            bY.len = bY.off = 0;
            return bY
        }

        function M(bY) {
            return D[o + bY]
        }

        function L(bY, bZ) {
            return D[o + bY] = bZ
        }

        function bf(bY) {
            bS[aO + bU++] = bY;
            if (aO + bU == q) {
                aB()
            }
        }

        function az(bY) {
            bY &= 65535;
            if (aO + bU < q - 2) {
                bS[aO + bU++] = (bY & 255);
                bS[aO + bU++] = (bY >>> 8)
            } else {
                bf(bY & 255);
                bf(bY >>> 8)
            }
        }

        function aC() {
            bV = ((bV << bI) ^ (aJ[bk + a2 - 1] & 255)) & aD;
            ai = M(bV);
            D[bk & aq] = ai;
            L(bV, bk)
        }

        function V(bZ, bY) {
            Y(bY[bZ].fc, bY[bZ].dl)
        }

        function O(bY) {
            return (bY < 256 ? t[bY] : t[256 + (bY >> 7)]) & 255
        }

        function aR(bZ, b0, bY) {
            return bZ[b0].fc < bZ[bY].fc || (bZ[b0].fc == bZ[bY].fc && R[b0] <= R[bY])
        }

        function aj(b6, b1, b0) {
            var b2, bZ, bY = 255, b3, b4, b5 = bB.length;
            for (b2 = 0; b2 < b0 && bX < b5; b2++) {
                bZ = bB.charCodeAt(bX);
                b3 = b1 + b2;
                b4 = av(bZ) - 1;
                if ((b2 + b4) < b0) {
                    if (bZ <= 127) {
                        b6[b3] = (bZ) & bY
                    } else {
                        if (bZ <= 2047) {
                            b6[b3] = ((bZ >> 6) | 192) & bY;
                            b6[b3 + 1] = ((bZ & 63) | 128) & bY
                        } else {
                            if (bZ <= 65535) {
                                b6[b3] = ((bZ >> 12) | 224) & bY;
                                b6[b3 + 1] = (((bZ >> 6) & 63) | 128) & bY;
                                b6[b3 + 2] = ((bZ & 63) | 128) & bY
                            } else {
                                b6[b3] = ((bZ >> 18) | 240) & bY;
                                b6[b3 + 1] = (((bZ >> 12) & 63) | 128) & bY;
                                b6[b3 + 2] = (((bZ >> 6) & 63) | 128) & bY;
                                b6[b3 + 3] = ((bZ & 63) | 128) & bY
                            }
                        }
                    }
                    bX++;
                    b2 += b4
                } else {
                    break
                }
            }
            return b2
        }

        function av(bY) {
            if (bY <= 127) {
                return 1
            } else {
                if (bY <= 2047) {
                    return 2
                } else {
                    if (bY <= 65535) {
                        return 3
                    }
                }
            }
            return 4
        }

        function bi() {
            var bY;
            for (bY = 0; bY < B; bY++) {
                D[o + bY] = 0
            }
            bE = bK[bh].max_lazy;
            x = bK[bh].good_length;
            if (!bO) {
                Q = bK[bh].nice_length
            }
            W = bK[bh].max_chain;
            bk = 0;
            u = 0;
            H = aj(aJ, 0, 2 * o);
            if (H <= 0) {
                F = true;
                H = 0;
                return
            }
            F = false;
            while (H < m && !F) {
                aA()
            }
            bV = 0;
            for (bY = 0; bY < a2 - 1; bY++) {
                bV = ((bV << bI) ^ (aJ[bY] & 255)) & aD
            }
        }

        function aa(b3) {
            var b5 = W;
            var b0 = bk;
            var b1;
            var b4;
            var bZ = ad;
            var b2 = (bk > bz ? bk - bz : aI);
            var bY = bk + h;
            var b7 = aJ[b0 + bZ - 1];
            var b6 = aJ[b0 + bZ];
            if (ad >= x) {
                b5 >>= 2
            }
            do {
                b1 = b3;
                if (aJ[b1 + bZ] != b6 || aJ[b1 + bZ - 1] != b7 || aJ[b1] != aJ[b0] || aJ[++b1] != aJ[b0 + 1]) {
                    continue
                }
                b0 += 2;
                b1++;
                do {
                } while (aJ[++b0] == aJ[++b1] && aJ[++b0] == aJ[++b1] && aJ[++b0] == aJ[++b1] && aJ[++b0] == aJ[++b1] && aJ[++b0] == aJ[++b1] && aJ[++b0] == aJ[++b1] && aJ[++b0] == aJ[++b1] && aJ[++b0] == aJ[++b1] && b0 < bY);
                b4 = h - (bY - b0);
                b0 = bY - h;
                if (b4 > bZ) {
                    aL = b3;
                    bZ = b4;
                    if (bO) {
                        if (b4 >= h) {
                            break
                        }
                    } else {
                        if (b4 >= Q) {
                            break
                        }
                    }
                    b7 = aJ[b0 + bZ - 1];
                    b6 = aJ[b0 + bZ]
                }
            } while ((b3 = D[b3 & aq]) > b2 && --b5 != 0);
            return bZ
        }

        function aA() {
            var b0, bY;
            var bZ = I - H - bk;
            if (bZ == -1) {
                bZ--
            } else {
                if (bk >= o + bz) {
                    for (b0 = 0; b0 < o; b0++) {
                        aJ[b0] = aJ[b0 + o]
                    }
                    aL -= o;
                    bk -= o;
                    u -= o;
                    for (b0 = 0; b0 < B; b0++) {
                        bY = M(b0);
                        L(b0, bY >= o ? bY - o : aI)
                    }
                    for (b0 = 0; b0 < o; b0++) {
                        bY = D[b0];
                        D[b0] = (bY >= o ? bY - o : aI)
                    }
                    bZ += o
                }
            }
            if (!F) {
                b0 = aj(aJ, bk + H, bZ);
                if (b0 <= 0) {
                    F = true
                } else {
                    H += b0
                }
            }
        }

        function S() {
            if (ai != aI && bk - ai <= bz) {
                an = aa(ai);
                if (an > H) {
                    an = H
                }
            }
            if (an >= a2) {
                flush = aS(bk - aL, an - a2);
                H -= an;
                if (an <= bE) {
                    an--;
                    do {
                        bk++;
                        aC()
                    } while (--an != 0);
                    bk++
                } else {
                    bk += an;
                    an = 0;
                    bV = aJ[bk] & 255;
                    bV = ((bV << bI) ^ (aJ[bk + 1] & 255)) & aD
                }
            } else {
                flush = aS(0, aJ[bk] & 255);
                H--;
                bk++
            }
            if (flush) {
                am(0);
                u = bk
            }
        }

        function ae(b0) {
            if (!aN) {
                var bZ = bL(ae, b0);
                while (H != 0 && ao == null) {
                    var bY;
                    aC();
                    if (bx(bZ)) {
                        return
                    }
                    S();
                    if (bx(bZ)) {
                        return
                    }
                    by();
                    if (bx(bZ)) {
                        return
                    }
                }
                b0()
            }
        }

        function by() {
            while (H < m && !F) {
                aA()
            }
        }

        function bx(bZ) {
            if (!bb.async && bb.useDefer) {
                var bY = new Date() - bn();
                if (bY > bb.threshold) {
                    aN = true;
                    setTimeout(function () {
                        aN = false;
                        l();
                        bZ()
                    }, bb.defer);
                    return true
                }
            }
            return false
        }

        function bL(bZ, bY) {
            return function () {
                bZ(bY)
            }
        }

        function bu() {
            ad = an;
            aZ = aL;
            an = a2 - 1;
            if (ai != aI && ad < bE && bk - ai <= bz) {
                an = aa(ai);
                if (an > H) {
                    an = H
                }
                if (an == a2 && bk - aL > a3) {
                    an--
                }
            }
            if (ad >= a2 && an <= ad) {
                var bY;
                bY = aS(bk - 1 - aZ, ad - a2);
                H -= ad - 1;
                ad -= 2;
                do {
                    bk++;
                    aC()
                } while (--ad != 0);
                aY = 0;
                an = a2 - 1;
                bk++;
                if (bY) {
                    am(0);
                    u = bk
                }
            } else {
                if (aY != 0) {
                    if (aS(0, aJ[bk - 1] & 255)) {
                        am(0);
                        u = bk
                    }
                    bk++;
                    H--
                } else {
                    aY = 1;
                    bk++;
                    H--
                }
            }
        }

        function ar(bZ) {
            if (!aN) {
                var bY = bL(ar, bZ);
                while (H != 0 && ao == null) {
                    aC();
                    if (bx(bY)) {
                        return
                    }
                    bu();
                    if (bx(bY)) {
                        return
                    }
                    by();
                    if (bx(bY)) {
                        return
                    }
                }
                bZ()
            }
        }

        function bM() {
            if (F) {
                return
            }
            aF = 0;
            K = 0;
            bp();
            bi();
            ao = null;
            bU = 0;
            aO = 0;
            aY = 0;
            if (bh <= 3) {
                ad = a2 - 1;
                an = 0
            } else {
                an = a2 - 1;
                aY = 0;
                aY = 0
            }
            br = false
        }

        function T(b4, b1, bZ, b3) {
            var b2, b0;
            if (!k) {
                bM();
                k = true;
                if (H == 0) {
                    br = true;
                    return b3(0)
                }
            }
            if ((b2 = bR(b4, b1, bZ)) == bZ) {
                return b3(bZ)
            }
            if (br) {
                return b3(b2)
            }
            b0 = bh <= 3 ? ae : ar;
            b0(function () {
                b3(bY())
            });
            function bY() {
                if (H == 0) {
                    if (aY != 0) {
                        aS(0, aJ[bk - 1] & 255)
                    }
                    am(1);
                    br = true
                }
                return b2 + bR(b4, b2 + b1, bZ - b2)
            }
        }

        function bR(b4, b2, bZ) {
            var b3, b0, bY;
            b3 = 0;
            while (ao != null && b3 < bZ) {
                b0 = bZ - b3;
                if (b0 > ao.len) {
                    b0 = ao.len
                }
                for (bY = 0; bY < b0; bY++) {
                    b4[b2 + b3 + bY] = ao.ptr[ao.off + bY]
                }
                ao.off += b0;
                ao.len -= b0;
                b3 += b0;
                if (ao.len == 0) {
                    var b1;
                    b1 = ao;
                    ao = ao.next;
                    p(b1)
                }
            }
            if (b3 == bZ) {
                return b3
            }
            if (aO < bU) {
                b0 = bZ - b3;
                if (b0 > bU - aO) {
                    b0 = bU - aO
                }
                for (bY = 0; bY < b0; bY++) {
                    b4[b2 + b3 + bY] = bS[aO + bY]
                }
                aO += b0;
                b3 += b0;
                if (bU == aO) {
                    bU = aO = 0
                }
            }
            return b3
        }

        function bp() {
            var b2;
            var b0;
            var bZ;
            var bY;
            var b1;
            if (bF[0].dl != 0) {
                return
            }
            aT.dyn_tree = e;
            aT.static_tree = a4;
            aT.extra_bits = bd;
            aT.extra_base = ab + 1;
            aT.elems = aK;
            aT.max_length = ah;
            aT.max_code = 0;
            aX.dyn_tree = U;
            aX.static_tree = bF;
            aX.extra_bits = bP;
            aX.extra_base = 0;
            aX.elems = bc;
            aX.max_length = ah;
            aX.max_code = 0;
            ap.dyn_tree = al;
            ap.static_tree = null;
            ap.extra_bits = aW;
            ap.extra_base = 0;
            ap.elems = j;
            ap.max_length = n;
            ap.max_code = 0;
            bZ = 0;
            for (bY = 0; bY < bJ - 1; bY++) {
                bT[bY] = bZ;
                for (b2 = 0; b2 < (1 << bd[bY]); b2++) {
                    v[bZ++] = bY
                }
            }
            v[bZ - 1] = bY;
            b1 = 0;
            for (bY = 0; bY < 16; bY++) {
                N[bY] = b1;
                for (b2 = 0; b2 < (1 << bP[bY]); b2++) {
                    t[b1++] = bY
                }
            }
            b1 >>= 7;
            for (; bY < bc; bY++) {
                N[bY] = b1 << 7;
                for (b2 = 0; b2 < (1 << (bP[bY] - 7)); b2++) {
                    t[256 + b1++] = bY
                }
            }
            for (b0 = 0; b0 <= ah; b0++) {
                aH[b0] = 0
            }
            b2 = 0;
            while (b2 <= 143) {
                a4[b2++].dl = 8;
                aH[8]++
            }
            while (b2 <= 255) {
                a4[b2++].dl = 9;
                aH[9]++
            }
            while (b2 <= 279) {
                a4[b2++].dl = 7;
                aH[7]++
            }
            while (b2 <= 287) {
                a4[b2++].dl = 8;
                aH[8]++
            }
            aQ(a4, aK + 1);
            for (b2 = 0; b2 < bc; b2++) {
                bF[b2].dl = 5;
                bF[b2].fc = E(b2, 5)
            }
            bG()
        }

        function bG() {
            var bY;
            for (bY = 0; bY < aK; bY++) {
                e[bY].fc = 0
            }
            for (bY = 0; bY < bc; bY++) {
                U[bY].fc = 0
            }
            for (bY = 0; bY < j; bY++) {
                al[bY].fc = 0
            }
            e[bv].fc = 1;
            bg = P = 0;
            a5 = ac = a0 = 0;
            bC = 0;
            a9 = 1
        }

        function ag(bY, b0) {
            var bZ = at[b0];
            var b1 = b0 << 1;
            while (b1 <= G) {
                if (b1 < G && aR(bY, at[b1 + 1], at[b1])) {
                    b1++
                }
                if (aR(bY, bZ, at[b1])) {
                    break
                }
                at[b0] = at[b1];
                b0 = b1;
                b1 <<= 1
            }
            at[b0] = bZ
        }

        function a7(b6) {
            var cb = b6.dyn_tree;
            var b1 = b6.extra_bits;
            var bY = b6.extra_base;
            var b7 = b6.max_code;
            var b9 = b6.max_length;
            var ca = b6.static_tree;
            var b4;
            var bZ, b0;
            var b8;
            var b3;
            var b5;
            var b2 = 0;
            for (b8 = 0; b8 <= ah; b8++) {
                aH[b8] = 0
            }
            cb[at[bW]].dl = 0;
            for (b4 = bW + 1; b4 < bw; b4++) {
                bZ = at[b4];
                b8 = cb[cb[bZ].dl].dl + 1;
                if (b8 > b9) {
                    b8 = b9;
                    b2++
                }
                cb[bZ].dl = b8;
                if (bZ > b7) {
                    continue
                }
                aH[b8]++;
                b3 = 0;
                if (bZ >= bY) {
                    b3 = b1[bZ - bY]
                }
                b5 = cb[bZ].fc;
                bg += b5 * (b8 + b3);
                if (ca != null) {
                    P += b5 * (ca[bZ].dl + b3)
                }
            }
            if (b2 == 0) {
                return
            }
            do {
                b8 = b9 - 1;
                while (aH[b8] == 0) {
                    b8--
                }
                aH[b8]--;
                aH[b8 + 1] += 2;
                aH[b9]--;
                b2 -= 2
            } while (b2 > 0);
            for (b8 = b9; b8 != 0; b8--) {
                bZ = aH[b8];
                while (bZ != 0) {
                    b0 = at[--b4];
                    if (b0 > b7) {
                        continue
                    }
                    if (cb[b0].dl != b8) {
                        bg += (b8 - cb[b0].dl) * cb[b0].fc;
                        cb[b0].fc = b8
                    }
                    bZ--
                }
            }
        }

        function aQ(bZ, b4) {
            var b1 = new Array(ah + 1);
            var b0 = 0;
            var b2;
            var b3;
            for (b2 = 1; b2 <= ah; b2++) {
                b0 = ((b0 + aH[b2 - 1]) << 1);
                b1[b2] = b0
            }
            for (b3 = 0; b3 <= b4; b3++) {
                var bY = bZ[b3].dl;
                if (bY == 0) {
                    continue
                }
                bZ[b3].fc = E(b1[bY]++, bY)
            }
        }

        function bH(b3) {
            var b6 = b3.dyn_tree;
            var b5 = b3.static_tree;
            var bY = b3.elems;
            var bZ, b1;
            var b4 = -1;
            var b0 = bY;
            G = 0;
            bW = bw;
            for (bZ = 0; bZ < bY; bZ++) {
                if (b6[bZ].fc != 0) {
                    at[++G] = b4 = bZ;
                    R[bZ] = 0
                } else {
                    b6[bZ].dl = 0
                }
            }
            while (G < 2) {
                var b2 = at[++G] = (b4 < 2 ? ++b4 : 0);
                b6[b2].fc = 1;
                R[b2] = 0;
                bg--;
                if (b5 != null) {
                    P -= b5[b2].dl
                }
            }
            b3.max_code = b4;
            for (bZ = G >> 1; bZ >= 1; bZ--) {
                ag(b6, bZ)
            }
            do {
                bZ = at[aV];
                at[aV] = at[G--];
                ag(b6, aV);
                b1 = at[aV];
                at[--bW] = bZ;
                at[--bW] = b1;
                b6[b0].fc = b6[bZ].fc + b6[b1].fc;
                if (R[bZ] > R[b1] + 1) {
                    R[b0] = R[bZ]
                } else {
                    R[b0] = R[b1] + 1
                }
                b6[bZ].dl = b6[b1].dl = b0;
                at[aV] = b0++;
                ag(b6, aV)
            } while (G >= 2);
            at[--bW] = at[aV];
            a7(b3);
            aQ(b6, b4)
        }

        function z(b6, b5) {
            var bZ;
            var b3 = -1;
            var bY;
            var b1 = b6[0].dl;
            var b2 = 0;
            var b0 = 7;
            var b4 = 4;
            if (b1 == 0) {
                b0 = 138;
                b4 = 3
            }
            b6[b5 + 1].dl = 65535;
            for (bZ = 0; bZ <= b5; bZ++) {
                bY = b1;
                b1 = b6[bZ + 1].dl;
                if (++b2 < b0 && bY == b1) {
                    continue
                } else {
                    if (b2 < b4) {
                        al[bY].fc += b2
                    } else {
                        if (bY != 0) {
                            if (bY != b3) {
                                al[bY].fc++
                            }
                            al[y].fc++
                        } else {
                            if (b2 <= 10) {
                                al[aP].fc++
                            } else {
                                al[af].fc++
                            }
                        }
                    }
                }
                b2 = 0;
                b3 = bY;
                if (b1 == 0) {
                    b0 = 138;
                    b4 = 3
                } else {
                    if (bY == b1) {
                        b0 = 6;
                        b4 = 3
                    } else {
                        b0 = 7;
                        b4 = 4
                    }
                }
            }
        }

        function bA(b6, b5) {
            var bZ;
            var b3 = -1;
            var bY;
            var b1 = b6[0].dl;
            var b2 = 0;
            var b0 = 7;
            var b4 = 4;
            if (b1 == 0) {
                b0 = 138;
                b4 = 3
            }
            for (bZ = 0; bZ <= b5; bZ++) {
                bY = b1;
                b1 = b6[bZ + 1].dl;
                if (++b2 < b0 && bY == b1) {
                    continue
                } else {
                    if (b2 < b4) {
                        do {
                            V(bY, al)
                        } while (--b2 != 0)
                    } else {
                        if (bY != 0) {
                            if (bY != b3) {
                                V(bY, al);
                                b2--
                            }
                            V(y, al);
                            Y(b2 - 3, 2)
                        } else {
                            if (b2 <= 10) {
                                V(aP, al);
                                Y(b2 - 3, 3)
                            } else {
                                V(af, al);
                                Y(b2 - 11, 7)
                            }
                        }
                    }
                }
                b2 = 0;
                b3 = bY;
                if (b1 == 0) {
                    b0 = 138;
                    b4 = 3
                } else {
                    if (bY == b1) {
                        b0 = 6;
                        b4 = 3
                    } else {
                        b0 = 7;
                        b4 = 4
                    }
                }
            }
        }

        function A() {
            var bY;
            z(e, aT.max_code);
            z(U, aX.max_code);
            bH(ap);
            for (bY = j - 1; bY >= 3; bY--) {
                if (al[C[bY]].dl != 0) {
                    break
                }
            }
            bg += 3 * (bY + 1) + 5 + 5 + 4;
            return bY
        }

        function s(bZ, bY, b0) {
            var b1;
            Y(bZ - 257, 5);
            Y(bY - 1, 5);
            Y(b0 - 4, 4);
            for (b1 = 0; b1 < b0; b1++) {
                Y(al[C[b1]].dl, 3)
            }
            bA(e, bZ - 1);
            bA(U, bY - 1)
        }

        function am(bY) {
            var b0, bZ;
            var b2;
            var b3;
            b3 = bk - u;
            bl[a0] = bC;
            bH(aT);
            bH(aX);
            b2 = A();
            b0 = (bg + 3 + 7) >> 3;
            bZ = (P + 3 + 7) >> 3;
            if (bZ <= b0) {
                b0 = bZ
            }
            if (b3 + 4 <= b0 && u >= 0) {
                var b1;
                Y((X << 1) + bY, 3);
                aE();
                az(b3);
                az(~b3);
                for (b1 = 0; b1 < b3; b1++) {
                    bf(aJ[u + b1])
                }
            } else {
                if (bZ == b0) {
                    Y((bQ << 1) + bY, 3);
                    bt(a4, bF)
                } else {
                    Y((be << 1) + bY, 3);
                    s(aT.max_code + 1, aX.max_code + 1, b2 + 1);
                    bt(e, U)
                }
            }
            bG();
            if (bY != 0) {
                aE()
            }
        }

        function aS(b2, b0) {
            bq[a5++] = b0;
            if (b2 == 0) {
                e[b0].fc++
            } else {
                b2--;
                e[v[b0] + ab + 1].fc++;
                U[O(b2)].fc++;
                d[ac++] = b2;
                bC |= a9
            }
            a9 <<= 1;
            if ((a5 & 7) == 0) {
                bl[a0++] = bC;
                bC = 0;
                a9 = 1
            }
            if (bh > 2 && (a5 & 4095) == 0) {
                var bY = a5 * 8;
                var b1 = bk - u;
                var bZ;
                for (bZ = 0; bZ < bc; bZ++) {
                    bY += U[bZ].fc * (5 + bP[bZ])
                }
                bY >>= 3;
                if (ac < parseInt(a5 / 2) && bY < parseInt(b1 / 2)) {
                    return true
                }
            }
            return (a5 == w - 1 || ac == ay)
        }

        function bt(b4, b2) {
            var b6;
            var bZ;
            var b0 = 0;
            var b7 = 0;
            var b3 = 0;
            var b5 = 0;
            var bY;
            var b1;
            if (a5 != 0) {
                do {
                    if ((b0 & 7) == 0) {
                        b5 = bl[b3++]
                    }
                    bZ = bq[b0++] & 255;
                    if ((b5 & 1) == 0) {
                        V(bZ, b4)
                    } else {
                        bY = v[bZ];
                        V(bY + ab + 1, b4);
                        b1 = bd[bY];
                        if (b1 != 0) {
                            bZ -= bT[bY];
                            Y(bZ, b1)
                        }
                        b6 = d[b7++];
                        bY = O(b6);
                        V(bY, b2);
                        b1 = bP[bY];
                        if (b1 != 0) {
                            b6 -= N[bY];
                            Y(b6, b1)
                        }
                    }
                    b5 >>= 1
                } while (b0 < a5)
            }
            V(bv, b4)
        }

        var a8 = 16;

        function Y(bZ, bY) {
            if (K > a8 - bY) {
                aF |= (bZ << K);
                az(aF);
                aF = (bZ >> (a8 - K));
                K += bY - a8
            } else {
                aF |= bZ << K;
                K += bY
            }
        }

        function E(b0, bY) {
            var bZ = 0;
            do {
                bZ |= b0 & 1;
                b0 >>= 1;
                bZ <<= 1
            } while (--bY > 0);
            return bZ >> 1
        }

        function aE() {
            if (K > 8) {
                az(aF)
            } else {
                if (K > 0) {
                    bf(aF)
                }
            }
            aF = 0;
            K = 0
        }

        function aB() {
            if (bU != 0) {
                var bZ, bY;
                bZ = J();
                if (ao == null) {
                    ao = ak = bZ
                } else {
                    ak = ak.next = bZ
                }
                bZ.len = bU - aO;
                for (bY = 0; bY < bZ.len; bY++) {
                    bZ.ptr[bY] = bS[aO + bY]
                }
                bU = aO = 0
            }
        }

        var Z = function (b0) {
            var bZ = "";
            for (var bY = 0; bY < b0.length; bY++) {
                bZ += String.fromCharCode(b0[bY])
            }
            return bZ
        };

        function aG(bY) {
            return bY < 26 ? bY + 65 : bY < 52 ? bY + 71 : bY < 62 ? bY - 4 : bY === 62 ? 43 : bY === 63 ? 47 : 65
        }

        function g(b3) {
            var bZ, b2 = "";
            for (var b1 = b3.length, bY = 0, b0 = 0; b0 < b1; b0++) {
                bZ = b0 % 3;
                bY |= b3[b0] << (16 >>> bZ & 24);
                if (bZ === 2 || b3.length - b0 === 1) {
                    b2 += String.fromCharCode(aG(bY >>> 18 & 63), aG(bY >>> 12 & 63), aG(bY >>> 6 & 63), aG(bY & 63));
                    bY = 0
                }
            }
            return b2.replace(/A(?=A$|$)/g, "=")
        }

        function bD(b1, b0, bZ) {
            var bY = b1.slice(b0, bZ);
            if (!!r.Uint8Array && bb.useBinary) {
                return new Uint8Array(bY)
            }
            return bY
        }

        function aM(b2) {
            var bZ = new Array(bb.chunkSize), b1 = true, bY = [], b0;
            if (!aN) {
                bn();
                T(bZ, 0, bZ.length, function (b3) {
                    if (b3 > 0) {
                        bY = bD(bZ, 0, b3);
                        b1 = (b3 < bb.chunkSize)
                    }
                    switch (bb.outputType) {
                        case"string":
                            bY = Z(bY);
                            break;
                        case"base64":
                            bY = g(bY);
                            break;
                        default:
                            break
                    }
                    b2.apply(this, [bY, b1]);
                    if (b1) {
                        bB = null;
                        return false
                    }
                })
            }
            return true
        }

        bB = bb.text;
        bX = 0;
        if (!bb.level) {
            bb.level = aw
        }
        f(bb.level);
        this.options = bb;
        this.process = aM
    };
    if (a) {
        if (!b.deflate) {
            b.options = a;
            b.options.async = true;
            b.options.useDefer = false;
            b.deflate = new WRCt(self, a)
        }
        b.deflate.process(function () {
            postMessage({args: Array.prototype.slice.call(arguments), url: this.location && this.location.href})
        })
    }
}
WRDS();
function WRDR(c, a) {
    var b = this;
    this.final_ = true;
    this.callback_ = null;
    this.options_ = a;
    this.worker_ = d(WRDS);
    this.worker_.onmessage = function (h) {
        var f = h.data.args, g;
        b.final_ = f[1];
        b.callback_.apply(b, f);
        if (!b.final_) {
            b.processInternal()
        } else {
            g = (window.URL && window.URL.revokeObjectURL) || (window.webkitURL && window.webkitURL.revokeObjectURL);
            g(h.data.url);
            b.worker_.terminate()
        }
    };
    this.process = function (e) {
        this.callback_ = e;
        return this.processInternal()
    };
    this.processInternal = function () {
        this.worker_.postMessage(this.options_);
        return false
    };
    function d(h) {
        var g = window.Blob, e = new g(["onmessage = " + Function.toString.apply(h)]), j = (window.URL && window.URL.createObjectURL) || (window.webkitURL && window.webkitURL.createObjectURL), f = j(e);
        return new Worker(f)
    }
}
var WRWarn = "Copyright 2006-2015 ClickTale Ltd., US Patent and US Patent Pending", WRI, WRSID, WRJ = 0, WRBU = [0], WRBV, WRBg, WRW, WRAv, WRBM = 0, WRAn = /(?:^|\s+)ClickTaleSensitive(?:\s+|$)/i, WRCT = "", WRCh = null, WRCs = null, WRC3 = null, WRC9 = 0, WRAw = [], WRB1 = [], WRL = "", WRBN = 0, WRM = 0, WRN = 0, WRO = 0, WRP = 0, WRQ = 0, WRR = {
    w: 0,
    h: 0,
    cw: 0,
    ch: 0,
    sw: 0,
    sh: 0,
    lw: 0,
    lh: 0
}, WRAV = 0, WRS = 0, WRT = 0, WRBx = false, WRBy = 0, WRAx, WRAW = 0, WRAy, WRAX, WRr, WRu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", WRAY = {}, WRAZ = "0123456789ABCDEF", WRAa = {}, WRCe = false, WRCf = false, WRDU = [], WRDV = 1000000, WRDd = false, WRDk;
(function () {
    var f;
    var b;

    function a() {
        if (!b) {
            var c;
            f ? c = f : (c = window.ClickTaleGlobal, c || (c = {}, window.ClickTaleGlobal = c), c.exports = c.exports || {}, f = c);
            c.exports.xhr = c.exports.xhr || {};
            b = c.exports.xhr
        }
        return b
    }

    window.WRBX = function (d) {
        var d = d || window, c = a();
        return c.originalXHR ? c.originalXHR : "undefined" != typeof d.XMLHttpRequest && ("function" == typeof d.XMLHttpRequest.OriginalXMLHttpRequest || "object" == typeof d.XMLHttpRequest.OriginalXMLHttpRequest) ? d.XMLHttpRequest.OriginalXMLHttpRequest : d.XMLHttpRequest
    };
    window.WRCC = function (d) {
        var d = d || window, c = a();
        return c.registerRecorderFunctionAPI ? c.registerRecorderFunctionAPI : d.XMLHttpRequest && d.XMLHttpRequest.RegisterRecorderFunction ? d.XMLHttpRequest.RegisterRecorderFunction : null
    };
    window.WRCD = function (d) {
        var d = d || window, c = a();
        return c.v ? c.v : d.XMLHttpRequest && "number" == typeof d.XMLHttpRequest.ClickTaleWrapperVersion ? d.XMLHttpRequest.ClickTaleWrapperVersion : null
    }
})();
!function () {
    var aC;

    function aB() {
        if (aC) {
            return aC
        }
        var c = window.ClickTaleGlobal;
        c || (c = {}, window.ClickTaleGlobal = c);
        c.exports = c.exports || {};
        return aC = c
    }

    var aA;

    function az() {
        if (!aA) {
            var c = aB();
            c.exports.queueing = c.exports.queueing || {};
            aA = c.exports.queueing
        }
        return aA
    }

    var ay, ax, aw, av;
    (function () {
        var c = az();
        ay = function (e, f) {
            return c.createQueue(e, f)
        };
        ax = function (e, g, f) {
            return c.createTransportQueue(e, g, f)
        };
        aw = function (e) {
            return c.createPromise(e)
        };
        av = function () {
            return c.createStubPromise()
        }
    })();
    window.WRCk = ay;
    window.WRC5 = ax;
    window.WRCl = aw;
    window.WRC6 = av;
    var au;
    var at, ar, aq, ap, ao, an, am, al, ak, aj;
    if (!au) {
        var ai = aB();
        ai.exports.compression = ai.exports.compression || {};
        au = ai.exports.compression
    }
    aj = au;
    at = aj.addMethod;
    ar = aj.encode;
    aq = aj.getCompressionLevel;
    ap = aj.getCompressionInterval;
    ao = aj.getChunkSize;
    an = aj.getMaxExecutionTime;
    am = aj.getIsAsync;
    al = aj.getUseDefer;
    ak = aj.getCompressionDeferTime;
    window.WRCi = at;
    window.WRCj = ar;
    window.WRCx = ao;
    window.WRCy = ap;
    window.WRCz = aq;
    window.WRDN = an;
    window.WRDO = am;
    window.WRDT = al;
    window.WRDP = ak;
    var ah;

    function ag() {
        if (!ah) {
            var c = aB();
            c.exports.rewriteRules = c.exports.rewriteRules || {};
            ah = c.exports.rewriteRules
        }
        return ah
    }

    var af, ae, ad, ac, ab;
    (function () {
        function e(g) {
            c.addRule(g)
        }

        var c = ag(), f = {
            add: e, clear: function () {
                c.clear()
            }
        };
        af = e;
        ae = function (g, h) {
            c.insertAt(g, h)
        };
        ad = function (g) {
            return c.rewrite(g)
        };
        ac = function () {
            c.raiseOnBeforeRewrite(f)
        };
        ab = c.raiseOnAfterRewrite
    })();
    window.WRCn = af;
    window.WRCp = ae;
    window.WRCo = ad;
    window.WRCq = ac;
    window.WRCv = ab;
    var aa;

    function Z() {
        if (!aa) {
            var c = aB();
            c.exports.transport = c.exports.transport || {};
            aa = c.exports.transport
        }
        return aa
    }

    var Y, X, W, V;
    (function () {
        var c = Z();
        Y = c.isLegacy;
        X = function (e, g, f) {
            return c.getTransportInterval.apply(this, arguments)
        };
        W = c.getTransportLastMessage;
        V = c.getMaxConcurrentRequests
    })();
    window.WRCw = Y;
    window.WRC0 = X;
    window.WRDg = W;
    window.WRC7 = V;
    var U;
    var T, S, u;
    if (!U) {
        var d = aB();
        d.exports.LogicalPages = d.exports.LogicalPages || {};
        U = d.exports.LogicalPages
    }
    u = U;
    T = u.url;
    S = u.history;
    window.WRDl = u.enable;
    window.WRDm = T;
    window.WRDn = S;
    var b;
    if (!b) {
        var a = aB();
        a.exports.recordingTime = a.exports.recordingTime || {};
        b = a.exports.recordingTime
    }
    window.WRDt = b.maxRecordingTime
}();
if (WRInitTime && WRA && WRG && WRl && WRH && WRD && !WRBS && !WRCf) {
    WRU()
}
function WRDQ() {
    var e = WRDO();
    var a = window.Blob && window.Worker && !window.MSBlobBuilder;
    var d = WRBT(true);
    if (d.m) {
        var f = WRBm(window.navigator.userAgent);
        var c = false;
        if (f.AppleWebKit) {
            var b = parseInt(f.AppleWebKit.value);
            c = !isNaN(b) && b >= 536
        }
        a = a && c && (d.t == d.Ch || d.t == d.Sa)
    }
    if (typeof e !== "boolean") {
        return a ? WRDR : WRCt
    }
    return e && a ? WRDR : WRCt
}
function WRU() {
    WRCf = true;
    var k = WRCx() || (WRBR.XDR ? 10000 : 1500);
    WRCi({
        name: "deflate", encode: function (m) {
            var e = WRCu();
            var n = k;
            var v = "base64";
            var w = WRDQ();
            if (e) {
                n = ((k * 3) / 4) - 2;
                v = "binary"
            }
            return new w(window, {
                text: m,
                useBinary: e,
                useDefer: WRDT(),
                outputType: v,
                level: WRCz(),
                chunkSize: n,
                defer: WRDP(),
                threshold: WRDN()
            })
        }
    });
    WRCi({
        name: "lzw", encode: function (e) {
            return new WRCr({text: e, chunkSize: k})
        }
    });
    var b = function () {
        return WRBR.XDR ? 1000 : 400
    };
    WRCs = WRCk({
        process: function (e) {
            var m = e instanceof WRDR || e instanceof WRCt;
            if (!e.end) {
                return !e.process(function (v, n) {
                    e.end = n;
                    WRj(e.stid, v, (n ? 1 : 0) | (m ? 32 : 0))
                })
            }
            return true
        }
    }, WRC1(b));
    WRC3 = {
        flushing: false,
        id: ++WRC9,
        intervalFactory: WRC0() || b,
        concurrentMessagesFactory: WRC7(),
        onCallback: function (n, v, m) {
            --WRC4;
            if (!this.flushing) {
                var e = setTimeout(function () {
                    clearTimeout(e);
                    WRCh.dequeue()
                }, this.intervalFactory(n, v, m))
            }
        },
        process: function (m) {
            if (WRC4 <= this.concurrentMessagesFactory() - 1) {
                var e = m.stid, n = WRI + m.mid + "&" + e + "&" + WRBU[e] + "&";
                WRCm(n, e, m.d, m.flag, m.mid, function (x, y, w) {
                    if (WRC3) {
                        var v = WRC3.id;
                        WRC8(v, x, y, w)
                    }
                });
                WRBU[e]++;
                return true
            }
            return false
        }
    };
    WRCh = WRC5(WRC3, WRC6(), function () {
        return false
    });
    WRSID = WRG();
    WRDG("recorder", "recording started", {sessionId: WRSID});
    WRAr("note5: starting to record, session id " + WRSID);
    setTimeout(ClickTaleStop, WRDt);
    WRCg();
    if (!WRBg) {
        WRBg = WRBR.XDR ? 50000 : 512
    }
    WRI = WRDp + "wr/?";
    WRI += WRSID + "&";
    WRI += (WRA + "&e&");
    var a = WRCS && WRCc ? WRCc : WRD.location.href, t;
    if (window.ClickTaleSettings && window.ClickTaleSettings.LocationRewriter) {
        t = window.ClickTaleSettings.LocationRewriter(a)
    }
    if (WRAL) {
        WRZ({a: "locu", loc: (t || a), t: 0})
    } else {
        if (ClickTaleFetchFrom && (t || a) != ClickTaleFetchFrom) {
            WRZ({a: "fetch", loc: (t || a), f: ClickTaleFetchFrom, t: 0})
        } else {
            if (t) {
                WRZ({a: "fetch", loc: t, f: a, t: 0})
            } else {
                WRZ({a: "loc", loc: a, t: 0})
            }
        }
    }
    WRB = WRB.reverse();
    var u = [], s = 0;
    while (WRB.length > 0) {
        var j = WRB.pop();
        if (j.streamval) {
            j.streamid = WRBU.length + s++;
            u.push(j.streamval);
            delete j.streamval
        }
        WRCb(j)
    }
    var h, f;
    try {
        h = self.screenX;
        f = self.screenY
    } catch (p) {
    }
    var d = "_" + WRA + "_" + WRCP;
    if (WRCQ) {
        WRCK(WRCQ, "rpv" + d, ClickTaleCookieExpiryDays)
    }
    WRAE = {w: WRp(), h: WRq(), sw: WRAQ(), sh: WRAR(), cw: WRBh(), ch: WRBi(), lw: WRBk(), lh: WRBl(), o: WRBj()};
    var c = navigator, l = (new Date()).getTimezoneOffset();
    WRZ({
        a: "init",
        nav: WRk,
        plat: c.platform,
        scrw: screen.width,
        scrh: screen.height,
        scrx: (h || self.screenLeft),
        scry: (f || self.screenTop),
        scrd: screen.colorDepth,
        itime: WRInitTime,
        tz: (-l / 60),
        em: ClickTaleEventsMask,
        hl: history.length,
        w: WRAE.w,
        h: WRAE.h,
        cw: WRAE.cw,
        ch: WRAE.ch,
        cf: c.cookieEnabled ? 1 : 0,
        lang: c.language || c.userLanguage || "",
        u: WRK,
        isclass: WRBt,
        lw: WRAE.lw,
        lh: WRAE.lh,
        o: WRAE.o,
        m: WRBR.m,
        dpr: parseInt(window.devicePixelRatio * 10) || 0,
        gpvc: WRCN(WRCQ, "gpv") || 0,
        apvc: WRCN(WRCQ, "apv" + d) || 0,
        cpvc: WRCN(WRCQ, "cpv" + d) || 0,
        rpvc: WRCN(WRCQ, "rpv" + d) || 0,
        t: WRH()
    });
    var r = WRD.referrer;
    if (WRCS && WRCT) {
        r = WRCT
    }
    if (window.ClickTaleSettings && window.ClickTaleSettings.ReferrerRewriter) {
        r = window.ClickTaleSettings.ReferrerRewriter(r)
    }
    if (r && r.length > 0) {
        WRZ({a: "referrer", ref: r, t: WRH()})
    }
    WRd();
    WRAz(true);
    WRDe(true);
    if (ClickTaleEventsMask & 4) {
        var q = WRBL();
        if (q) {
            WRA6({target: q})
        }
    }
    WRBW();
    u = u.reverse();
    while (u.length > 0) {
        WRBa(u.pop())
    }
    if (typeof WRBu == "function") {
        WRBu()
    }
    if (typeof ClickTaleOnRecording == "function") {
        ClickTaleOnRecording()
    }
    WRAU();
    var g = WRCC();
    if (g) {
        var o = WRCD();
        if (o == 1) {
            g(WRBe, WRH, WRBf, WRBW)
        }
    }
}
function WRC8(a, c, d, b) {
    if (WRC3 && WRC3.id === a) {
        WRC3.onCallback(c, d, b)
    }
}
function WRC2(a) {
    return WRCl(WRC0() || a)
}
function WRC1(a) {
    return WRCl(WRCy() || a)
}
function WRCg() {
    if (!WRCe) {
        for (var a = 0; a < WRu.length; a++) {
            WRAY[a] = WRu.charAt(a)
        }
        for (var a = 0; a < WRAZ.length; a++) {
            WRAa[WRAZ.charAt(a)] = a
        }
        WRCe = true
    }
}
function WRA0(f, b, d, a) {
    for (var c = 0; c < b.length; c++) {
        var g = WRD.getElementsByTagName(b[c]), e = g.length;
        WRDh(f, g, d, a)
    }
}
function WRDh(h, a, k, c) {
    var g = a.length, b = k.length;
    for (var e = 0; e < g; e++) {
        var f = a[e];
        for (var d = 0; d < b; d++) {
            WRA1(h, f, k[d], c[d])
        }
    }
}
function WRA1(f, e, d, g) {
    if (f) {
        if (WRBR.t == WRBR.IE && WRBR.v < 9) {
            WRAF(e, d, g)
        }
        WRl(e, d, g)
    } else {
        WRAF(e, d, g)
    }
}
function ClickTaleRebindEvents() {
    WRAz(false);
    WRAz(true)
}
function WRDe() {
    if (WRBR.t == WRBR.IE && WRBR.v == 8) {
        var c = window.Element, d = window.HTMLDocument;
        if (c && c.prototype.cloneNode) {
            var a = c.prototype.cloneNode;
            c.prototype.cloneNode = function () {
                var e = a.apply(this, arguments);
                WRDf(e);
                WRCV(e);
                return e
            }
        }
        if (d && d.prototype.cloneNode) {
            var b = d.prototype.cloneNode;
            d.prototype.cloneNode = function () {
                var e = b.apply(this, arguments);
                WRDf(e);
                WRCV(e);
                return e
            }
        }
    }
}
function WRAz(c) {
    if (c && WRDC) {
        return
    }
    if (ClickTaleEventsMask & 32) {
        if (c) {
            WRAv = window.onerror;
            window.onerror = WR9
        } else {
            window.onerror = WRAv
        }
    }
    WRA1(c, window, "load", WRCB);
    WRA1(c, window, "unload", WRc);
    var d = WRDg();
    var b = d.RegisterToOnBeforeUnload;
    if (c) {
        if (d && typeof b === "function" && b()) {
            WRA1(true, window, "beforeunload", WRc)
        }
    } else {
        WRA1(false, window, "beforeunload", WRc)
    }
    WRA1(c, window, "scroll", WRd);
    WRA1(c, window, "pagehide", WRB9);
    if (ClickTaleEventsMask & 1 && !WRBR.m) {
        WRA1(c, WRD, "mousemove", WR5);
        WRA1(c, WRD, "mouseover", WRA2);
        WRA1(c, WRD, "mouseout", WRA3)
    }
    if (ClickTaleEventsMask & 256 && WRBR.m) {
        WRA1(c, WRD, "touchstart", WRBn);
        WRA1(c, WRD, "touchend", WRBo);
        WRA1(c, WRD, "touchmove", WRBp)
    }
    if (ClickTaleEventsMask & 2 && !WRBR.m) {
        WRA1(c, WRD, "mousedown", WR6);
        WRA1(c, WRD, "mouseup", WR7)
    }
    if (ClickTaleEventsMask & 8) {
        WRA1(c, WRD, "click", WRn);
        WRA1(c, WRD, "contextmenu", WRAI);
        for (var a = 0; a < WRD.forms.length; a++) {
            WRA1(c, WRD.forms.item(a), "submit", WRA4);
            WRA1(c, WRD.forms.item(a), "reset", WRA5)
        }
    }
    WRA1(c, window, "resize", WR8);
    WRA1(c, window, "orientationchange", WRBq);
    if (ClickTaleEventsMask & 4) {
        WRA1(c, WRD, "keydown", WRAA);
        WRA1(c, WRD, "keyup", WRAB);
        WRA1(c, WRD, "keypress", WRAC);
        WRA0(c, ["input", "textarea", "button", "iframe", "select", "object"], ["focus", "blur"], [WRA6, WRA7]);
        for (var a = 0; a < WRD.links.length; a++) {
            WRA1(c, WRD.links.item(a), "focus", WRA6);
            WRA1(c, WRD.links.item(a), "blur", WRA7)
        }
        WRA0(c, ["select"], ["change"], [WRA8])
    }
    WRDC = c
}
function WRB9() {
    WRBW()
}
function WRBL() {
    if (document.hasFocus && document.hasFocus()) {
        try {
            return document.activeElement
        } catch (a) {
        }
    }
    return false
}
function WRj(b, e, a) {
    var c = b === 0 ? WRCh.enqueueTop : WRCh.enqueue;
    c({stid: b, d: e, flag: a, mid: WRJ++})
}
function WRCu() {
    return !!WRBR.XHRBin && !WRCw()
}
function WRBW(a) {
    if (WRL.length == 0 && a == 0) {
        return
    }
    WRj(0, WRL, a || 0);
    WRV();
    if (WRW) {
        clearInterval(WRW);
        WRW = false
    }
    WRW = setInterval(WRa, 300000)
}
function WRV() {
    WRL = "";
    WRM = 0;
    WRN = 0;
    WRO = 0;
    WRP = 0;
    WRQ = 0;
    WRR = {w: 0, h: 0, cw: 0, ch: 0, sw: 0, sh: 0, lw: 0, lh: 0};
    WRAV = 0
}
function WRCb(a) {
    if (a.t > 1000000000 && a.a != "stop" && a.a != "field") {
        ClickTaleField("dt", a.t);
        ClickTaleStop();
        return
    }
    if (a.streamval) {
        a.streamid = WRBa(a.streamval);
        delete a.streamval
    }
    WRB5(a)
}
function WRB5(a) {
    var b = WRAw.length;
    switch (a.a) {
        case"blur":
        case"mouseout":
        case"mouseover":
        case"elmpos":
            WRB2(false, a.t, a);
            break;
        case"mouseover_t":
            for (var d = b - 1; d >= 0 && (WRAw[d].a == "mouseover" || WRAw[d].a == "mousemove" || WRAw[d].a == "elmpos"); d--) {
            }
            if (d >= 0 && WRAw[d].a == "mouseout" && a.t - WRAw[d].t < 100) {
                WRAw.splice(d, 1)
            }
            WRB2(true);
            break;
        case"mousemove":
            var c = a.t;
            if (b && WRAw[b - 1].a == a.a) {
                var e = WRAw[b - 1];
                if (a.t == e.t && a.b == e.b && a.k == e.k) {
                    WRAw[b - 1] = a;
                    a = false
                } else {
                    if (a.x == e.x && a.y == e.y && a.b == e.b && a.k == e.k) {
                        a = false
                    }
                }
            }
            WRB2(false, c, a);
            break;
        case"scrollx":
        case"scrolly":
            var c = a.t;
            if (b && WRAw[b - 1].a == a.a) {
                var e = WRAw[b - 1];
                if (a.t == e.t) {
                    WRAw[b - 1] = a;
                    a = false
                } else {
                    if ((a.a == "scrollx" && a.x == e.x) || (a.a == "scrolly" && a.y == e.y)) {
                        a = false
                    }
                }
            }
            WRB2(false, c, a);
            break;
        case"focus":
            if (b && WRAw[b - 1].a == "blur" && a.t - WRAw[b - 1].t < 100) {
                WRAw.pop()
            } else {
                if (b > 1 && WRAw[b - 1].a == "elmpos" && WRAw[b - 2].a == "blur" && a.t - WRAw[b - 2].t < 100) {
                    WRAw.splice(b - 2, 1)
                }
            }
            WRB2(true, a.t, a);
            break;
        default:
            WRB2(true, a.t, a);
            break
    }
}
function WRB3(a) {
    if (WRB1.length > 0) {
        switch (a.a) {
            case"mouseover":
            case"mousemove":
            case"keydown":
            case"scrolly":
            case"scrollx":
            case"unload":
                WRB8(WRB1, a);
                WRB4(true);
                break;
            default:
                WRB1.push(a);
                break
        }
    }
    if (WRB1.length == 0) {
        switch (a.a) {
            case"submit":
            case"submitend":
            case"_submit_hint":
            case"submitsent":
            case"submitnotsent":
                if (a.i !== false) {
                    WRB4(true);
                    WRB1.push(a);
                    break
                }
            default:
                WRB4(true, a.t, a);
                break
        }
    }
}
function WRB8(h, k) {
    if (h.length == 0) {
        return
    }
    var v = "submit", b = "submitend", f = "_submit_hint";

    function p(x) {
        var w = {};
        for (var m = 0; m < x.length; m++) {
            if (!w[x[m].a]) {
                w[x[m].a] = []
            }
            w[x[m].a].push(m)
        }
        return w
    }

    var c = p(h);
    if (c[v] && c[v].length > 1) {
        h.push({a: "note", c: "FA err 1", t: h[h.length - 1].t});
        return
    }
    if (c[b] && c[b].length > 1) {
        h.push({a: "note", c: "FA err 2", t: h[h.length - 1].t});
        return
    }
    var g = 999, d = c[v] ? c[v][0] : g, u = c[b] ? c[b][0] : g, s = c[f] ? c[f][0] : g, t = Math.min(d, Math.min(u, s));
    if (t == g) {
        h.push({a: "note", c: "FA err 3", t: h[h.length - 1].t});
        return
    }
    var r = h[t].i, a = [];
    if (c[v]) {
        a = a.concat(c[v])
    }
    if (c[b]) {
        a = a.concat(c[b])
    }
    if (c[f]) {
        a = a.concat(c[f])
    }
    for (var n = 0; n < a.length; n++) {
        if (h[a[n]].i != r) {
            h.push({a: "note", c: "FA err 4", t: h[h.length - 1].t});
            return
        }
    }
    if (!c[b]) {
        h.push({a: b, i: h[t].i, u: h[t].u, t: h[h.length - 1].t})
    }
    if (c[f]) {
        var l = (c[v] ? c[v].length : 0) + c[f].length - 1, o;
        for (o = c[f].length - 1; l > 0; o--, l--) {
            h.splice(c[f][o], 1)
        }
        if (o >= 0) {
            h[c[f][o]].a = v;
            c[v] = [c[f][o]]
        }
    }
    if (!c[v]) {
        h.splice(0, 0, {a: v, i: h[t].i, u: h[t].u, t: h[0].t})
    }
    c = p(h);
    var e = c[v][0];
    for (var o = 0; o < e; o++) {
        if (h[o].a == "submitsent" || h[o].a == "submitnotsent") {
            var k = h.splice(o, 1)[0];
            k.t = h[c[b][0] - 1].t;
            h.splice(c[b][0] - 1, 0, k);
            e--;
            o--
        }
    }
}
function WRB2(c, b, a) {
    WRA9(WRAw, c, b, a, WRB3)
}
function WRB4(c, b, a) {
    WRA9(WRB1, c, b, a, WRBA)
}
function WRA9(f, e, c, a, d) {
    if (e) {
        for (var b = 0; b < f.length; b++) {
            d(f[b])
        }
        f.splice(0, f.length);
        if (a) {
            d(a)
        }
    } else {
        for (var b = 0; b < f.length && c - f[b].t > 200; b++) {
            d(f[b])
        }
        f.splice(0, b);
        if (a) {
            f.push(a)
        }
    }
}
function WRBA(a) {
    var b = WRX(a);
    if (!b) {
        return
    }
    if ((WRL.length && WRL.length + b.length > 1000) && !WRDi) {
        WRBW();
        b = WRX(a)
    }
    WRL += b;
    WRY(a);
    if (WRL.length > 1000 && !WRDi) {
        WRBW()
    }
}
function WRX(c) {
    var k = "";
    switch (c.a) {
        case"loc":
        case"locu":
        case"fetch":
            k = {
                loc: "J",
                locu: "K",
                fetch: "L"
            }[c.a] + (c.a == "fetch" ? WRCJ(c.f, WRBR.XDR ? 2048 : 1024) : "") + WRCJ(c.loc, WRBR.XDR ? 2048 : 512);
            break;
        case"init":
            var d = c.u.split(".");
            if (!d[1]) {
                d[1] = 0
            }
            var h = c.lang.toLowerCase().match(/^[a-z\-]{2,5}/);
            c.lang = (h && h[0]) ? h[0] : "";
            k = "a" + WRCJ(c.nav, 512) + WRw(c.plat) + "&" + WR3(c.scrh, c.scrw) + WR3(c.scrx, c.scry) + WR1(c.scrd) + WRAb(c.itime) + "&" + c.tz + "&" + WR3(c.h, c.w) + WR3(c.ch, c.cw) + WR0(WRx(c.em), 2) + c.cf + c.lang + "&" + WR0(WRx(d[0]), 6) + WR0(WRx(d[1]), 6) + WR1(14) + WR1(20) + WR1(c.hl) + WR1(c.isclass) + WRAJ(c.lw, c.lh) + WR1(c.o) + WR1(c.m) + WR1(c.dpr) + WR1(c.gpvc) + WR1(c.apvc) + WR1(c.cpvc) + WR1(c.rpvc);
            break;
        case"load":
            k = "b" + WR3(c.h, c.w) + WR3(c.ch, c.cw) + WRAJ(c.sw, c.sh) + WRAJ(c.lw, c.lh) + WR1(c.o);
            break;
        case"stop":
        case"term":
        case"unload":
            k = {stop: "x", term: "y", unload: "c"}[c.a] + WR0(WRx(ClickTaleUnloadPause), 2);
            break;
        case"scrollx":
            var j = c.x - WRP;
            k = (j < 0 ? "D" + WR1(-j) : "d" + WR1(j));
            break;
        case"scrolly":
            var j = c.y - WRQ;
            k = (j < 0 ? "E" + WR1(-j) : "e" + WR1(j));
            break;
        case"mousemove":
            k = ((c.b == 0 && c.k == 0) ? "f" : "g" + WR2(c.b, c.k)) + WR3(c.x - WRN, c.y - WRO);
            break;
        case"mousedown":
            k = "h" + WR2(c.b, c.k) + WR3(c.x - WRN, c.y - WRO);
            break;
        case"mouseup":
            k = ((c.b == 0 && c.k == 0) ? "i" : "j" + WR2(c.b, c.k)) + WR3(c.x - WRN, c.y - WRO);
            break;
        case"resize":
            k = "k" + WR3(c.w - WRR.w, c.h - WRR.h) + WR3(c.cw - WRR.cw, c.ch - WRR.ch) + WRAJ(c.sw - WRR.sw, c.sh - WRR.sh) + WRAJ(c.lw - WRR.lw, c.lh - WRR.lh) + WR1(c.o);
            break;
        case"exec":
            if (c.streamid) {
                k = "ZO" + WR1(c.streamid);
                break
            }
        case"json":
            if (c.streamid) {
                k = "ZR" + WR1(c.streamid);
                break
            }
        case"tag":
        case"note":
            k = {tag: "o", note: "p", exec: "P", json: "ZQ"}[c.a] + WRCJ(c.c.toString(), WRBg);
            break;
        case"field":
            k = "q" + WRCJ(c.f.toString(), WRBg) + WRCJ(c.v.toString(), WRBg);
            break;
        case"error":
            k = "s" + WRCJ(c.msg ? c.msg : "", WRBg) + WRCJ(c.url ? c.url : "", 512) + c.line + "&";
            break;
        case"keydown":
            k = "t" + WR4(c.k, c.kc);
            break;
        case"keyup":
            k = "u" + WR4(c.k, c.kc);
            break;
        case"keypress":
            if (c.k) {
                k = "v" + WR1(c.cc * 4 + c.k)
            } else {
                var j = c.cc - WRAV;
                k = (j < 0 ? "N" + WR1(-j) : "M" + WR1(j))
            }
            break;
        case"mouseover":
        case"click":
        case"context":
        case"focus":
        case"reset":
        case"submitsent":
        case"submitnotsent":
        case"submitend":
            k = {
                mouseover: "l",
                click: "n",
                context: "A",
                focus: "Q",
                reset: "T",
                submitsent: "ZF",
                submitnotsent: "ZG",
                submitend: "ZN"
            }[c.a];
            k += WR1(c.i);
            break;
        case"submitsuccess":
        case"submitfail":
            k = (c.i !== false) ? ({submitsuccess: "ZH", submitfail: "ZJ"}[c.a] + WR1(c.i)) : {
                submitsuccess: "ZI",
                submitfail: "ZK"
            }[c.a];
            break;
        case"caret":
            k += "U" + WR1(c.c.s) + WR1(c.c.e - c.c.s) + WR1(c.c.l - c.c.e);
            break;
        case"change":
            k += "V" + WR1(c.i) + WR1(c.v + 1);
            break;
        case"mouseout":
        case"ping":
        case"start":
        case"domload":
        case"blur":
            k = {mouseout: "m", ping: "r", start: "w", domload: "z", blur: "R"}[c.a];
            break;
        case"referrer":
            k = "B" + WRCJ(c.ref, 512);
            break;
        case"link":
        case"submit":
            k = {link: "H", submit: "S"}[c.a];
            k += WR1(c.i);
            k += WRCJ(c.u, 512);
            break;
        case"elmpos":
            k = c.p ? (c.b ? "C" : "X") : "I";
            k += WR1(c.i);
            if (c.p) {
                for (var e = c.p.length - 1; e >= 0; e--) {
                    k += WR0(WRx(c.p[e].c), 2) + WR1(c.p[e].p) + WRCG(c.p[e])
                }
                k += "&"
            }
            if (c.b) {
                k += WRAJ(c.x, c.y) + WRAJ(c.h, c.w);
                var a = {x: 0, y: 0, w: c.w, h: c.h};
                for (var e = 0; e < c.b.length; e++) {
                    var g = c.b[e];
                    if (g.c) {
                        var f = (typeof g.i == "number") ? (g.i >= 57 ? 57 : g.i) : 58;
                        k += WR0(WRx(g.c), 2) + WR1(f) + WRAJ(g.x - a.x, g.y - a.y) + WRAJ(g.h - a.h, g.w - a.w);
                        a = g;
                        if (e > 100) {
                            break
                        }
                    }
                }
                k += "&"
            }
            break;
        case"hchk":
            k = "F" + WR0(WRx(c.h), 6);
            break;
        case"bchk":
            k = "G" + WR0(WRx(c.b), 6);
            break;
        case"upload":
            k = "O" + WR1(c.stid);
            break;
        case"stream":
            k = "W" + WR1(c.id) + WR1(c.l);
            break;
        case"streamms":
        case"streamme":
            k = {streamms: "ZA", streamme: "ZB"}[c.a];
            k += WR1(c.stid) + WR1(c.msid);
            break;
        case"xhropen":
            k = "ZC" + WR1(c.xhrid) + WRCJ(c.u, 512) + WR1(c.methodid);
            break;
        case"xhrstate":
            k = "ZD" + WR1(c.xhrid) + WR1(c.stateid);
            break;
        case"xhrstatedone":
            k = "ZE" + WR1(c.xhrid) + WR1(c.status) + WRCJ(c.statusText, WRBg) + WR1(c.streamid);
            break;
        case"xhrstatedoneim":
            k = "ZP" + WR1(c.xhrid) + WR1(c.status) + WRCJ(c.statusText, WRBg) + WR1(c.streamid) + WRCJ(c.fetchUrl, WRBg) + WR1(!(!c.fetcherDoRewriteRules));
            break;
        case"touchstart":
            k = "ZL" + WR1(c.eid) + WR1(c.tid & 65535) + WR1(c.tc) + WR3(c.x, c.y);
            break;
        case"orientchange":
            k = "ZM" + WR1(c.o);
            break;
        default:
            k = "qunkevent&" + WRw(c.a) + "&"
    }
    return k + WR1(c.t - WRM)
}
function WRY(a) {
    switch (a.a) {
        case"scrollx":
            WRP = a.x;
            break;
        case"scrolly":
            WRQ = a.y;
            break;
        case"mousemove":
        case"mousedown":
        case"mouseup":
            WRN = a.x;
            WRO = a.y;
            break;
        case"resize":
            WRR = a;
            break;
        case"keypress":
            if (!a.k) {
                WRAV = a.cc
            }
        default:
    }
    WRM = a.t
}
function WRc() {
    if (WRBw()) {
        WRDi = true;
        WRZ({a: "unload", t: WRH()});
        WRBW(1);
        WRCh.flush();
        WRAG();
        WRCU();
        WRv(ClickTaleUnloadPause)
    }
}
function WRBd() {
    return WRB7(window, WRs)
}
function WRd() {
    var a = WRBd();
    if (WRBR.t == WRBR.Sa) {
        a.x = Math.min(a.x, WRAQ() - WRBh());
        a.y = Math.min(a.y, WRAR() - WRBi());
        a.x = Math.max(a.x, 0);
        a.y = Math.max(a.y, 0)
    }
    if (WRS != a.x) {
        WRZ({a: "scrollx", x: a.x, t: WRH()});
        WRS = a.x
    }
    if (WRT != a.y) {
        WRZ({a: "scrolly", y: a.y, t: WRH()});
        WRT = a.y
    }
    if (WRBR.m) {
        WR8()
    }
}
function WRe(a) {
    return (a.altKey ? 1 : 0) + (a.ctrlKey ? 2 : 0) + (a.shiftKey ? 4 : 0)
}
function WRo(a, b) {
    if (WRBR.t == WRBR.IE && WRBR.v < 11) {
        return Math.min(b.button, 7)
    }
    if (a == "mousemove") {
        return 0
    }
    return [1, 4, 2][Math.min(b.button, 2)]
}
function WRg(b, d) {
    if (!d) {
        var d = event
    }
    var j = d.clientY, a = d.clientX;
    a -= WRs.clientLeft || 0;
    j -= WRs.clientTop || 0;
    if (b == "mousedown" || b == "mouseup") {
        if (j >= WRs.clientHeight || a >= WRs.clientWidth) {
            return
        }
        if (j < 0 || a < 0) {
            return
        }
    }
    j = Math.min(Math.max(j, 0), WRBi());
    a = Math.min(Math.max(a, 0), WRBh());
    var h = d.srcElement || d.target;
    if (h != WRAx) {
        var g = WRAc(h);
        if (g !== false) {
            WRZ({a: "mouseover", i: g, t: WRH()});
            WRAx = h
        }
    }
    var f = {a: b, x: a, y: j, b: WRo(b, d), k: WRe(d), t: WRH()};
    if (WRr && "mousemove" == f.a && WRr.x == f.x && WRr.y == f.y && WRr.b == f.b && WRr.k == f.k) {
        return
    }
    WRr = f;
    WRZ(f);
    if (f.a == "mousedown" && f.b === 2 && WRBR.t == WRBR.Sa) {
        var c = {};
        c.a = "mouseup";
        c.x = f.x;
        c.y = f.y;
        c.b = f.b;
        c.k = f.k;
        c.t = f.t;
        WRr = c;
        WRZ(c)
    }
}
function WR5(a) {
    WRg("mousemove", a)
}
function WR6(a) {
    WRg("mousedown", a)
}
function WR7(a) {
    WRg("mouseup", a);
    WRBB()
}
function WRA2() {
    WRZ({a: "mouseover_t", t: WRH()})
}
function WRA3() {
    WRAx = null;
    WRZ({a: "mouseout", t: WRH()})
}
function WRBn(c) {
    if (!c.changedTouches || !c.touches) {
        return
    }
    for (var b = 0; b < c.changedTouches.length; b++) {
        var a = c.changedTouches[b];
        WRBv(a, c.touches.length)
    }
}
function WRBv(d, a) {
    var c = WRAc(d.target);
    if (c === false) {
        return
    }
    var b = {a: "touchstart", eid: c, tid: d.identifier, tc: a, x: d.clientX, y: d.clientY, t: WRH()};
    WRZ(b)
}
function WRBo() {
    WR8()
}
function WRBp(a) {
    WRd()
}
function WRA7() {
    WRBB();
    WRZ({a: "blur", t: WRH()});
    WRAy = null
}
function WRBC(a, b) {
    if (!b) {
        var b = event
    }
    var c = WRAc(b.srcElement || b.target);
    if (c !== false) {
        WRZ({a: a, i: c, t: WRH()})
    }
    return c
}
var ClickTaleRegisterElementAction = WRBC;
function WRDc(a) {
    return WRDd || (a.ClickTale && a.ClickTale.isDisabled)
}
function WRA6(a) {
    var c = WRBC("focus", a);
    if (c === false) {
        return
    }
    var b = a.srcElement || a.target;
    if (b.form && !WRDc(b.form)) {
        WRBD(b.form)
    }
    WRAy = b;
    if (!b.CTCaret && WRBE(b)) {
        b.CTCaret = {s: 0, e: 0, l: 0}
    }
    WRBB()
}
function WRBD(h) {
    var a, q = true, r = {}, l = [], m = WRDZ(h), c = false;

    function d(e) {
        var t;
        if (t = r[e]) {
            l = l.concat(t)
        }
    }

    function s(t) {
        var e = t.tagName, u;
        if (e) {
            e = e.toLowerCase();
            u = r[e] || (r[e] = []);
            u.push(t)
        }
    }

    if (m) {
        var b, f, n, j = m.inputs, p = m.submits, o = ClickTaleEventsMask & 4;
        a = [];
        for (b in j) {
            f = j[b];
            if (o) {
                s(f)
            }
            a.push(f)
        }
        if (o) {
            for (b in p) {
                f = p[b];
                s(f)
            }
        }
        if (o) {
            d("input");
            d("textarea");
            d("button");
            d("iframe");
            d("select");
            d("object");
            d("a");
            d("area");
            WRDh(q, l, ["focus", "blur"], [WRA6, WRA7]);
            l = [];
            d("select");
            WRDh(q, l, ["change"], [WRA8])
        }
    } else {
        c = !!h.CTFormAnn;
        if (!c) {
            a = h.elements;
            WRA1(true, h, "submit", WRA4);
            WRA1(true, h, "reset", WRA5);
            h.CTFormAnn = [true]
        }
    }
    if (!c) {
        for (var g = 0; g < a.length; g++) {
            var k = a[g];
            if (/input/i.test(k.tagName) && /checkbox|radio/i.test(k.type)) {
                WRBF(k, k.checked)
            } else {
                if (/input/i.test(k.tagName) && /password|text/i.test(k.type)) {
                    WRBF(k, k.value.length)
                } else {
                    if (/textarea/i.test(k.tagName)) {
                        WRBF(k, WRBG(k.value))
                    } else {
                        if (/select/i.test(k.tagName)) {
                            WRBF(k, k.selectedIndex)
                        }
                    }
                }
            }
        }
    }
}
function WRBB() {
    if (WRAy && WRAy.CTCaret) {
        var b = WRBH(WRAy), a = WRAy.CTCaret;
        if (!b) {
            return
        }
        if (b.s != a.s || b.e != a.e || b.l != a.l) {
            WRZ({a: "caret", c: b, p: a, t: WRH()});
            WRAy.CTCaret = b
        }
    }
}
function WRA5(a) {
    if (!WRDc(a)) {
        WRBC("reset", a)
    }
}
function WRA4(c) {
    if (!c) {
        var c = event
    }
    var b = c.srcElement || c.currentTarget;
    if (!WRDc(b)) {
        WRBQ("submitend", b)
    }
}
function WRBY(d, c) {
    var b = null;
    if (WRBR.t == WRBR.IE) {
        if (d && d.getAttributeNode) {
            b = d.getAttributeNode(c)
        }
        if (b) {
            b = b.value
        }
    } else {
        if (d && d.getAttribute) {
            b = d.getAttribute(c)
        }
    }
    return b
}
function WRBQ(c, b) {
    var a, d;
    if (typeof b == "number") {
        d = b
    } else {
        d = WRAc(b);
        a = WRBY(b, "action")
    }
    if (d !== false) {
        WRZ({a: c, i: d, u: (a || ""), t: WRH()})
    }
}
function ClickTaleRegisterFormSubmit(b) {
    var c;
    if (b && b.tagName && /form/i.test(b.tagName)) {
        WRBQ("_submit_hint", b)
    } else {
        if (c = WRDZ(b)) {
            WRBQ("submit", c.eid)
        }
    }
}
function ClickTaleRegisterFormSubmitSent(b) {
    var c;
    if (b && b.tagName && /form/i.test(b.tagName)) {
        var d = WRAc(b);
        if (d !== false) {
            WRZ({a: "submitsent", i: d, t: WRH()})
        }
    } else {
        if (c = WRDZ(b)) {
            WRZ({a: "submitsent", i: c.eid, t: WRH()})
        }
    }
}
function ClickTaleRegisterFormSubmitNotSent(b) {
    var c;
    if (b && b.tagName && /form/i.test(b.tagName)) {
        var d = WRAc(b);
        if (d !== false) {
            WRZ({a: "submitnotsent", i: d, t: WRH()})
        }
    } else {
        if (c = WRDZ(b)) {
            WRZ({a: "submitnotsent", i: c.eid, t: WRH()})
        }
    }
}
function WRBz(b) {
    var d = false, c;
    if (b) {
        if (b.tagName && /form/i.test(b.tagName)) {
            d = WRAc(b);
            if (d === false) {
                return
            }
        } else {
            if (c = WRDZ(b)) {
                d = c.eid
            } else {
                return
            }
        }
    }
    WRZ({a: "submitsuccess", i: d, t: WRH()})
}
function WRB0(b) {
    var d = false, c;
    if (b) {
        if (b.tagName && /form/i.test(b.tagName)) {
            d = WRAc(b);
            if (d === false) {
                return
            }
        } else {
            if (c = WRDZ(b)) {
                d = c.eid
            } else {
                return
            }
        }
    }
    WRZ({a: "submitfail", i: d, t: WRH()})
}
function WRn(c) {
    if (c.button) {
        return
    }
    WRBC("click", c);
    if (ClickTaleEventsMask & 64) {
        WRBI(c)
    }
    var b = c.srcElement || c.target;
    if ((ClickTaleEventsMask & 4) && /input/i.test(b.tagName) && /checkbox|radio/i.test(b.type)) {
        if (/radio/i.test(b.type)) {
            WRCA(b)
        } else {
            WRBF(b, b.checked)
        }
    }
    if ((ClickTaleEventsMask & 8) && /input|button/i.test(b.tagName) && b.type && /submit/i.test(b.type) && b.form && !WRDc(b.form)) {
        WRBD(b.form);
        WRBQ("submit", b.form)
    }
}
function WRA8(c) {
    var b = c.srcElement || c.target;
    if ((ClickTaleEventsMask & 4) && /select/i.test(b.tagName)) {
        WRBF(b, b.selectedIndex)
    }
}
function WRBF(c, a) {
    if (c.CTPrevVal && c.CTPrevVal[0] == a) {
        return
    }
    var b = WRAc(c);
    if (b === false) {
        return
    }
    WRZ({a: "change", i: b, v: (a === true ? 1 : (a === false ? 0 : a)), t: WRH()});
    c.CTPrevVal = [a]
}
function WRCA(d) {
    if (d.name) {
        var c;
        if (d.form) {
            c = d.form[d.name]
        } else {
            c = document.getElementsByName(d.name)
        }
        if (c && c.length) {
            for (var b = 0; b < c.length; b++) {
                var a = c[b];
                if (/radio/i.test(a.type)) {
                    WRBF(a, a.checked)
                }
            }
        }
    } else {
        WRBF(d, d.checked)
    }
}
function WRAI(a) {
    WRBC("context", a)
}
function WRBI(c) {
    if (!c) {
        var c = event
    }
    var b = c.srcElement || c.target;
    while (b && (!b.href || /img/i.test(b.tagName))) {
        b = b.parentNode
    }
    if (b && typeof b.href === "string") {
        var d = WRAc(b);
        if (d !== false) {
            WRZ({a: "link", i: d, u: (b.href ? b.href : ""), t: WRH()})
        }
    }
}
function WR9(a, c, b) {
    if (a && !isNaN(parseInt(b)) && WRBM < 20) {
        WRZ({a: "error", msg: a, url: c.toString(), line: b, t: WRH()});
        WRBM++
    }
    if (WRAv) {
        return WRAv(a, c, b)
    }
    return false
}
function WR8() {
    if (!WRBR.m) {
        c();
        return
    }
    var b = [200, 160, 120, 100];
    WRBy = b.length;
    if (!WRBx) {
        c();
        WRBx = setTimeout(a, b[WRBy - 1])
    }
    function a() {
        c();
        if (--WRBy <= 0) {
            clearTimeout(WRBx);
            WRBx = false
        } else {
            WRBx = setTimeout(a, b[WRBy - 1])
        }
    }

    function c() {
        var d = {
            a: "resize",
            w: WRp(),
            h: WRq(),
            cw: WRBh(),
            ch: WRBi(),
            sw: WRAQ(),
            sh: WRAR(),
            lw: WRBk(),
            lh: WRBl(),
            o: WRBj(),
            t: WRH()
        };
        if (WRAE && WRAE.w == d.w && WRAE.h == d.h && WRAE.cw == d.cw && WRAE.ch == d.ch && WRAE.sw == d.sw && WRAE.sh == d.sh && WRAE.lw == d.lw && WRAE.lh == d.lh && WRAE.o == d.o) {
            return
        }
        WRZ(d);
        WRAE = d
    }
}
function WRBq() {
    WRZ({a: "orientchange", o: WRBj(), t: WRH()});
    WRd()
}
function WRz(b, j, h, l) {
    if (!j) {
        var j = event
    }
    var f = j.srcElement || j.target, h = Math.max(j.keyCode, 0), g = WRe(j);
    if (((h >= 48 && h <= 90) || (h >= 96 && h <= 111) || (h >= 187)) && (g & (1 | 2)) == 0) {
        if (f.type && /PASSWORD|FILE/i.test(f.type)) {
            h = 0
        }
        if (WRBO || WRAn.test(f.className)) {
            h = 1
        }
    }
    WRZ({a: b, k: g, kc: h, t: WRH()});
    if (b == "keydown" && WRAy && WRAy.CTCaret) {
        var n = WRAy.CTCaret;
        if (h == 8) {
            if (n.s < n.e) {
                n.l -= (n.e - n.s);
                n.e = n.s
            } else {
                if (n.s == n.e && n.s > 0) {
                    n.s--;
                    n.e--;
                    n.l--
                }
            }
        } else {
            if (h == 46) {
                if (n.s < n.e) {
                    n.l -= (n.e - n.s);
                    n.e = n.s
                } else {
                    if (n.s == n.e && n.e < n.l) {
                        n.l--
                    }
                }
            } else {
                if (h == 37 && n.s > 0) {
                    n.s--;
                    if (!(g & 4)) {
                        n.e--
                    }
                } else {
                    if (h == 39 && n.e < n.l) {
                        n.e++;
                        if (!(g & 4)) {
                            n.s++
                        }
                    } else {
                        if (h == 36) {
                            n.s = 0;
                            if (!(g & 4)) {
                                n.e = 0
                            }
                        } else {
                            if (h == 35) {
                                n.e = n.l;
                                if (!(g & 4)) {
                                    n.s = n.l
                                }
                            } else {
                                if (h == 13 && !(g & (2 | 1)) && /textarea/i.test(WRAy.tagName)) {
                                    n.l += n.e - n.s + 1;
                                    n.s++;
                                    n.e = n.s
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function WRAA(a) {
    WRz("keydown", a)
}
function WRAB(c) {
    WRz("keyup", c);
    WRBB();
    if (ClickTaleEventsMask & 4) {
        var b = c.srcElement || c.target;
        if (/select/i.test(b.tagName)) {
            WRBF(b, b.selectedIndex)
        }
        if (/input/i.test(b.tagName) && /radio/i.test(b.type)) {
            WRCA(b)
        }
    }
}
function WRAC(f) {
    if (!f) {
        var f = event
    }
    if (f.charCode === 0) {
        return
    }
    var b = f.srcElement || f.target, c = WRe(f) & (1 | 2), g = f.keyCode || f.charCode;
    g = Math.max(g, 0);
    if (c == 0 && g > 27) {
        if (b.type && /PASSWORD|FILE/i.test(b.type)) {
            g = 0
        }
        if (WRBO || WRAn.test(b.className)) {
            g = 1
        }
        if (WRAy && WRAy.CTCaret) {
            var d = WRAy.CTCaret;
            WRAy.CTCaret = {s: d.s + 1, e: d.s + 1, l: d.l + d.e - d.s + 1}
        }
    }
    WRZ({a: "keypress", k: c, cc: g, t: WRH()})
}
function WRa() {
    WRZ({a: "ping", t: WRH()});
    WRBW()
}
function WRAc(e, g) {
    function c(m) {
        function r(v, x, w) {
            var u = 0, t = 0;
            for (; t < v.length; t++) {
                if (!v[t]) {
                    return false
                }
                if (v[t] == x) {
                    break
                }
                if (v[t].tagName && v[t].tagName != "!" && WRAd(v[t].tagName) == w) {
                    u++
                }
            }
            return u
        }

        var n = m, s = [];
        while (n && n != WRD.body && n != WRD.documentElement) {
            if (!n.parentNode) {
                return false
            }
            var p = n.parentNode.childNodes;
            var o, l = WRAd(n.tagName);
            o = r(p, n, l);
            if (o === false) {
                return false
            }
            var q = WRCH(n);
            q.c = l;
            q.p = o;
            n = n.parentNode;
            if (n && (WRBY(n, "id") || (n.ClickTale && n.ClickTale.EPID)) && n != WRD.body && n != WRD.documentElement) {
                var k = WRAc(n, true);
                if (k === false) {
                    return false
                }
                q.inheritsEID = k;
                s.push(q);
                break
            }
            s.push(q)
        }
        if (!n) {
            return false
        }
        if (window.ClickTaleSettings && window.ClickTaleSettings.ElementPathRewriter) {
            s = window.ClickTaleSettings.ElementPathRewriter(m, s)
        }
        return s
    }

    while (e && !e.tagName) {
        e = e.parentNode
    }
    if (!e) {
        return false
    }
    var j, b;
    if (e.ClickTale && typeof e.ClickTale.EPID == "number") {
        b = e.ClickTale.EPID
    } else {
        b = -1
    }
    j = c(e);
    if (!j) {
        return false
    }
    if (e.ClickTale && e.ClickTale.Path && WRAf(e.ClickTale.Path, j)) {
        j = false
    }
    var f, a;
    if (!g) {
        var h = (e != WRD.body && e != WRD.documentElement);
        a = h ? WRAP(e) : {x: 0, y: 0, w: WRBr(), h: WRBs()};
        f = [];
        WRAe(h ? e : WRD.body, a.x, a.y, f);
        if (e.ClickTale && e.ClickTale.Blks) {
            if (WRAf(e.ClickTale.Blks, f) && WRAf(e.ClickTale.Rect, a)) {
                f = false
            }
        }
    }
    if (f || j) {
        e.ClickTale = e.ClickTale || {};
        if (b == -1) {
            b = WRAW++
        }
        var d = {a: "elmpos", i: b, t: WRH()};
        if (j) {
            d.p = j;
            e.ClickTale.Path = j
        }
        if (f) {
            d.b = f;
            d.x = a.x;
            d.y = a.y;
            d.w = a.w;
            d.h = a.h;
            e.ClickTale.Blks = f;
            e.ClickTale.Rect = a
        }
        WRZ(d);
        e.ClickTale.EPID = b
    }
    return b
}
function WRCH(b) {
    var a = {};
    if (WRBY(b, "id")) {
        a.id = WRBY(b, "id")
    }
    if (WRBY(b, "type")) {
        a.tc = WRCI(WRBY(b, "type"))
    }
    if (WRBY(b, "name")) {
        a.name = WRBY(b, "name")
    }
    if (b.ClickTale && b.ClickTale.CustomID) {
        a.ctid = b.ClickTale.CustomID
    }
    return a
}
function WRCG(c) {
    var a = 0, b = "";
    if (c.id) {
        a += 1;
        b += WRCJ(c.id, WRBg)
    }
    if (c.tc) {
        a += 2;
        b += WR0(WRx(c.tc), 1)
    }
    if (c.name) {
        a += 4;
        b += WRCJ(c.name, WRBg)
    }
    if (c.ctid) {
        a += 8;
        b += WRCJ(c.ctid, WRBg)
    }
    if (typeof c.inheritsEID == "number") {
        a += 16;
        b += WR1(c.inheritsEID)
    }
    return WR0(WRx(a), 1) + b
}
function WRBr() {
    return Math.max(WRs.clientWidth, WRs.scrollWidth)
}
function WRBs() {
    return Math.max(WRs.clientHeight, WRs.scrollHeight)
}
function WRAf(d, c) {
    for (var e in d) {
        if (typeof d[e] != typeof c[e]) {
            return false
        }
        if (typeof d[e] == "object") {
            if (!WRAf(d[e], c[e])) {
                return false
            }
        } else {
            if (d[e] != c[e]) {
                return false
            }
        }
    }
    return true
}
function WRw(a) {
    return encodeURIComponent(a)
}
function WRCJ(b, a) {
    return WRw(b.substr(0, a)) + "&"
}
function WR1(d) {
    if (d < 0) {
        return "//////" + WR1(-d)
    }
    if (d <= 0) {
        return "A"
    }
    var a = WRx(d);
    if (d < 59) {
        return a
    }
    var e = WRAY[59 + a.length - 1];
    if (!e) {
        return "A"
    }
    return e + a
}
function WR3(a, h) {
    var e = WRx(a), d = WRx(h);
    var g = e.length, b = d.length;
    if (g >= 4 || b >= 4) {
        return "A"
    }
    var f = (a < 0 ? 32 : 0) + (g << 3) + (h < 0 ? 4 : 0) + b;
    f = WRAY[f];
    return f + e + d
}
function WRAJ(a, h) {
    var e = WRx(a), d = WRx(h);
    var g = e.length, b = d.length;
    b = Math.max(b, g);
    if (b >= 8) {
        return "A"
    }
    if (g < b) {
        g = b - 1
    }
    var f = (a < 0 ? 32 : 0) + (h < 0 ? 16 : 0) + (g < b ? 8 : 0) + b;
    f = WRAY[f];
    return f + WR0(e, g) + WR0(d, b)
}
function WRx(a) {
    a = Math.abs(a);
    var b = "", c;
    while (a != 0) {
        c = a & 63;
        a >>>= 6;
        b = WRAY[c] + b
    }
    return b
}
function WRAb(a) {
    a = Math.abs(a);
    var b = "", c;
    while (a != 0) {
        c = a & 63;
        a = parseInt(a / 64);
        b = WRAY[c] + b
    }
    return b
}
function WR2(a, c) {
    return WRAY[(a << 3) + c]
}
function WR4(a, b) {
    return WR0(WRx((a << 9) + b), 2)
}
function WR0(a, b) {
    if (a.length > b) {
        return a.substr(0, b)
    }
    while (a.length < b) {
        a = "A" + a
    }
    return a
}
function WRv(b) {
    var a = (new Date()).getTime() + b;
    while ((new Date()).getTime() < a) {
    }
}
function WRAG() {
    WRAF(window, "load", WRb);
    WRAz(false)
}
function ClickTaleStop() {
    if (WRBw()) {
        WRDi = true;
        WRZ({a: "stop", t: WRH()});
        WRC3.flushing = true;
        WRBW(1);
        WRCh.flush();
        WRCU();
        WRAG();
        WRv(ClickTaleUnloadPause);
        WRPublishEventForHandlers(window.ClickTaleOnStop)
    }
}
function ClickTaleTerm() {
    if (WRBw()) {
        WRDi = true;
        WRZ({a: "term", t: WRH()});
        WRBW(2);
        WRC3.flushing = true;
        WRCh.flush();
        WRCU();
        WRAG();
        WRPublishEventForHandlers(window.ClickTaleOnStop)
    }
}
function WRBZ(a) {
    var b = WRBU.length;
    WRBU[b] = 0;
    WRZ({a: "stream", id: b, l: a, t: WRH()});
    return b
}
function WRBa(b) {
    var a = WRCj(b);
    a.stid = WRBZ(b.length);
    WRCs.enqueue(a);
    return a.stid
}
function WRDj() {
    var f, d = ["<html "], j = (WRBR.t == WRBR.IE && WRBR.v < 8);
    if (document.doctype) {
        var a = document.doctype, c = a.publicId, h = a.systemId;
        f = "<!doctype " + a.name + (c ? ' PUBLIC "' + c + '"' : "") + (!c && h ? " SYSTEM" : "") + (h ? ' "' + h + '"' : "") + ">\n"
    } else {
        f = document.childNodes[0].text
    }
    f = f || "";
    for (var k = document.documentElement.attributes, b = k.length, e = 0; e < b; e++) {
        var g = k.item(e);
        if (!j || (j && !!g.specified)) {
            d.push(g.name + '="' + g.value + '"');
            e < b && d.push(" ")
        }
    }
    d.push(">\n");
    f += d.join("");
    return f.toString()
}
function WRAU() {
    if (!WRDA && (WRDB || window.ClickTaleIncludedOnDOMReady) && WRBw() && WRAL) {
        WRAN = WRAN || WRDj();
        WRAO = WRAO || "</html>";
        var b = {
            pattern: new RegExp('(<div id="?ClickTaleDiv"?[^>]+>)\\s*<script[^>]+><\/script>\\s*(</div>)', "i"),
            replace: "$1$2"
        };
        var a = {pattern: /<script\b([^>]*)>([\s\S]*?)<\/script>/gi, replace: "<script><\/script>"};
        WRAM = WRD.documentElement.innerHTML;
        WRCp(a, 0);
        WRCq();
        WRCp(b, 0);
        WRAM = WRCo(WRAM);
        WRAX = WRAN + WRAM + WRAO;
        WRCv(WRAX);
        WRPublishEventForHandlers(window.ClickTaleOnUploadPageContentFetched);
        WRAM = null;
        WRBV = WRBa(WRAX);
        WRZ({a: "upload", stid: WRBV, t: WRH()});
        WRDA = true
    }
}
function WRBe() {
    if (WRAS && (WRBR.XDR || (window.ClickTaleSettings && window.ClickTaleSettings.XHRWrapper && window.ClickTaleSettings.XHRWrapper.AllowWithGet))) {
        return WRZ.apply(window, arguments)
    }
}
function WRBf() {
    if (WRAS && (WRBR.XDR || (window.ClickTaleSettings && window.ClickTaleSettings.XHRWrapper && window.ClickTaleSettings.XHRWrapper.AllowWithGet))) {
        return WRBa.apply(window, arguments)
    }
    return 1
}
function WRCB() {
    setTimeout(function () {
        WRd()
    }, 1)
}
function WRCU() {
    WRBt = false;
    WRB = [];
    ClickTaleFetchFrom = null;
    WRAS = false;
    WRAE = null;
    WRAL = false;
    WRAM = null;
    WRAN = null;
    WRAO = null;
    WRI = null;
    WRSID = null;
    WRJ = 0;
    WRBU = [0];
    WRBV = null;
    WRAv = null;
    WRBM = 0;
    WRAw = [];
    WRB1 = [];
    WRL = "";
    WRBN = 0;
    WRS = 0;
    WRT = 0;
    WRBx = 0;
    WRBy = 0;
    WRAx = null;
    WRAW = 0;
    WRAy = null;
    WRAX = null;
    WRr = null;
    WRCS = false;
    WRE = ".clicktale.net/";
    WRDq = WRDs;
    WRDp = WRDr;
    WRCY = false;
    WRCV(WRs);
    WRCh.destroy();
    WRCs.destroy();
    WRCc = "";
    WRC4 = 0;
    WRC3 = null;
    WRDA = false;
    WRDC = false;
    WRClickTaleOnReadyInvoked = false;
    WRDU = [];
    WRDV = 1000000;
    WRDd = false;
    WRDi = false
}
function WRCV(a) {
    if (a.childNodes.length) {
        for (var b = a.childNodes[0]; b; b = b.nextSibling) {
            WRDf(b);
            WRCV(b)
        }
    }
}
function WRDf(a) {
    if (a.ClickTale) {
        WRDW(a, "ClickTale")
    }
    if (a.CTCaret) {
        WRDW(a, "CTCaret")
    }
    if (a.CTFormAnn) {
        WRDW(a, "CTFormAnn")
    }
    if (a.CTPrevVal) {
        WRDW(a, "CTPrevVal")
    }
}
function WRDW(a, b) {
    if (WRBR.t === WRBR.IE && WRBR.v < 9 && !WRBR.m) {
        a[b] = null
    } else {
        delete a[b]
    }
}
function WRDY(a) {
    return a.eid || (a.eid = WRDV++)
}
function ClickTaleLogicalForm(k, h, b) {
    var d, g, a, e, c, f, j;
    c = WRDZ(k);
    if (!c) {
        k = (k || "").toString();
        c = {name: k, inputs: {}, submits: {}};
        WRDY(c);
        WRDU[c.eid.toString()] = WRDU[k] = c
    }
    f = [];
    if (h) {
        g = h.length;
        for (d = 0; d < g; d++) {
            e = h[d];
            a = WRAc(e);
            c.inputs[a] = e;
            f.push({type: "InputFieldDeclaration", eid: a})
        }
    }
    j = [];
    if (b) {
        g = b.length;
        for (d = 0; d < g; d++) {
            e = b[d];
            a = WRAc(e);
            c.submits[a] = e;
            j.push({type: "SubmissionFieldDeclaration", eid: a})
        }
    }
    WRDX({type: "LogicalFormDeclaration", name: c.name, eid: c.eid, inputFields: f, submissionField: j});
    WRBD(c.eid);
    return c.eid
}
function WRDZ(c) {
    var a = typeof c;
    var b = null;
    if (a === "number" || a === "string") {
        b = WRDU[c]
    }
    return b
}
function ClickTaleFormDisable(b) {
    if (b && b.tagName && /form/i.test(b.tagName)) {
        var a = WRAc(b);
        if (a) {
            WRDX({type: "FormDisable", form: a});
            b.ClickTale = b.ClickTale || {};
            b.ClickTale.isDisabled = true
        }
    }
}
function ClickTaleFormDisableAll() {
    WRDd = true;
    WRDX({type: "FormDisableAll"})
}
function ClickTaleFormGetInputs(d) {
    var c, b = [];
    c = WRDZ(d);
    if (!c) {
        return null
    }
    for (var a in c.inputs) {
        if (a) {
            b.push(c.inputs[a])
        }
    }
    return b
}
if (WRDl) {
    (function () {
        var a = window.history, c = a.pushState, b = a.replaceState;
        WRA1(true, window, "hashchange", WRDo);
        WRA1(true, window, "popstate", WRDo);
        a.pushState = function () {
            c.apply(this, arguments);
            WRDo()
        };
        a.replaceState = function () {
            b.apply(this, arguments);
            WRDo()
        }
    })()
}
function WRDo() {
    if (!WRDl) {
        return
    }
    var b = WRDk ? WRDk.url : document.referrer;
    var a = {url: location.href, referrer: b, historyState: window.history.state || ""}, c = false;
    if (!WRDk) {
        c = true
    } else {
        if (WRDm && WRDk && (WRDk.url !== a.url)) {
            c = true
        } else {
            if (WRDn && WRDk && !WRAf(WRDk.historyState, a.historyState) && (WRDk.url === a.url)) {
                c = true
            }
        }
    }
    WRDk = a;
    if (c) {
        ClickTaleStop();
        ClickTaleUploadPage();
        ClickTaleLogical(WRDk.url, WRDk.referrer)
    }
}
function WRAF(c, a, b) {
    if (c.detachEvent) {
        c.detachEvent("on" + a, b)
    } else {
        if (c.removeEventListener) {
            c.removeEventListener(a, b, false)
        }
    }
}
function WRAe(h, n, m, k, o, l) {
    var g = h.childNodes;
    var b = {};
    for (var d = 0; d < g.length; d++) {
        var f = g[d];
        if (!f.tagName || f.tagName == "!") {
            continue
        }
        var c = WRAd(f.tagName);
        if (!l) {
            if (typeof b[c] == "number") {
                b[c]++
            } else {
                b[c] = 0
            }
        }
        if (WRAk(f)) {
            WRAe(f, n, m, k, o, true)
        } else {
            if (WRAl(f, o)) {
                if (f.offsetWidth != 0 && f.offsetHeight != 0) {
                    var a = WRAP(f, o);
                    var e = {x: a.x - n, y: a.y - m, w: a.w, h: a.h, c: c};
                    if (!l) {
                        e.i = b[c]
                    }
                    k.push(e)
                }
            }
        }
    }
}
function WRAm(c, b, a) {
    if (!a) {
        a = document
    }
    if (c.currentStyle) {
        return c.currentStyle[b]
    } else {
        if (window.getComputedStyle) {
            return a.defaultView.getComputedStyle(c, null).getPropertyValue(b)
        }
    }
}
function WRAk(a) {
    var b = a.tagName;
    return b == "TBODY" || b == "TR"
}
function WRAl(b, a) {
    var c = WRAm(b, "display", a);
    if (c != "block" && c != "list-item" && c != "table-cell" && c != "table") {
        return false
    }
    c = WRAm(b, "position", a);
    return c == "static"
}
function WRAd(a) {
    return ((a.charCodeAt(0) - 64) & 31) + (((a.charCodeAt(1) - 64) & 28) << 3) + (((a.charCodeAt(2) - 64) & 30) << 7)
}
function WRCI(a) {
    return ((a.charCodeAt(0) - 64) & 7) + (((a.charCodeAt(0) - 64) & 16) >> 1) + (((a.charCodeAt(1) - 64) & 4) << 2) + (((a.charCodeAt(3) - 64) & 4) << 3)
}
function WRB7(b, a) {
    return {x: b.pageXOffset || a.scrollLeft, y: b.pageYOffset || a.scrollTop}
}
function WRAP(b, l) {
    function k(p, q) {
        var o = {left: 0, top: 0, w: p.offsetWidth, h: p.offsetHeight};
        while (h(p, q)) {
            o.left += p.offsetLeft;
            o.top += p.offsetTop;
            p = h(p, q)
        }
        o.left += p.offsetLeft;
        o.top += p.offsetTop;
        return o
    }

    function h(q, p) {
        try {
            return q.offsetParent
        } catch (o) {
            return p.body
        }
    }

    function m(p) {
        try {
            return p.getBoundingClientRect()
        } catch (o) {
            return {top: 0, left: 0, right: 0, bottom: 0}
        }
    }

    l = l || document;
    var j = (l.compatMode == "BackCompat");
    var f = (j ? l.body : l.documentElement);
    var c = {top: 0, left: 0};
    if (b.getBoundingClientRect) {
        var a = WRBd();
        var e = m(b), d = f.clientTop || 0, g = f.clientLeft || 0;
        c.top = parseInt(e.top + a.y - d);
        c.left = parseInt(e.left + a.x - g)
    } else {
        var n = k(b, l);
        c.top = n.top;
        c.left = n.left
    }
    return {w: b.offsetWidth, h: b.offsetHeight, x: c.left, y: c.top}
}
function WRBJ(b, c, g, f) {
    if (!f) {
        f = document
    }
    if (b.setSelectionRange) {
        try {
            b.setSelectionRange(c, g)
        } catch (a) {
        }
    } else {
        if (f.selection && f.selection.createRange) {
            var d = b.createTextRange();
            d.collapse(true);
            d.moveStart("character", c);
            d.moveEnd("character", g - c);
            d.select()
        }
    }
}
function WRBH(g, f) {
    var d = {s: 0, e: 0, l: WRBG(g.value)};
    if (!f) {
        f = document
    }
    if (g.setSelectionRange) {
        try {
            d.s = g.selectionStart;
            d.e = g.selectionEnd
        } catch (c) {
            return false
        }
    } else {
        if (f.selection && f.selection.createRange) {
            var b;
            try {
                b = f.selection.createRange()
            } catch (c) {
                return false
            }
            if (b.parentElement() != g) {
                return false
            }
            var a = b.duplicate();
            d.s = -a.moveStart("character", -100000);
            d.e = d.s + WRBG(b.text);
            if (!g.CTCBase) {
                g.CTCBase = [WRBK(g, d, f)]
            }
            d.s -= g.CTCBase[0];
            d.e -= g.CTCBase[0]
        } else {
            return false
        }
    }
    return d
}
function WRBK(g, d, f) {
    if (!f) {
        f = document
    }
    WRBJ(g, 0, 0, f);
    range = f.selection.createRange();
    var c = range.duplicate();
    var a = -c.moveStart("character", -100000);
    if (d) {
        WRBJ(g, d.s - a, d.e - a, f)
    }
    return a
}
function WRBG(a) {
    return a.length - (a.split("\r").length - 1)
}
function WRBE(a) {
    return /textarea|input/i.test(a.tagName) && (!a.type || /password|text|email|search|tel/i.test(a.type)) && typeof a.value == "string"
};
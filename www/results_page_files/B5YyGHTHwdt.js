/*!CK:785928267!*//*1425659841,*/

if (self.CavalryLogger) {
    CavalryLogger.start_js(["Z3urS"]);
}

if (!Array.from)Array.from = function (a) {
    if (a == null)throw new TypeError('Object is null or undefined');
    var b = arguments[1], c = arguments[2], d = this, e = Object(a), f = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator', g = typeof b === 'function', h = typeof e[f] === 'function', i = 0, j, k;
    if (h) {
        j = typeof d === 'function' ? new d() : [];
        var l = e[f](), m;
        while (!(m = l.next()).done) {
            k = m.value;
            if (g)k = b.call(c, k, i);
            j[i] = k;
            i += 1;
        }
        j.length = i;
        return j;
    }
    var n = e.length;
    if (isNaN(n) || n < 0)n = 0;
    j = typeof d === 'function' ? new d(n) : new Array(n);
    while (i < n) {
        k = e[i];
        if (g)k = b.call(c, k, i);
        j[i] = k;
        i += 1;
    }
    j.length = i;
    return j;
};

self.__DEV__ = self.__DEV__ || 0;
(function (a) {
    function b(c, d) {
        if (this == null)throw new TypeError('Array.prototype.findIndex called on null or undefined');
        if (typeof c !== 'function')throw new TypeError('predicate must be a function');
        var e = Object(this), f = e.length >>> 0;
        for (var g = 0; g < f; g++)if (c.call(d, e[g], g, e))return g;
        return -1;
    }

    if (!Array.prototype.findIndex)Array.prototype.findIndex = b;
    if (!Array.prototype.find)Array.prototype.find = function (c, d) {
        if (this == null)throw new TypeError('Array.prototype.find called on null or undefined');
        var e = b.call(this, c, d);
        return e === -1 ? a : this[e];
    };
})();


(function (a) {
    var b = function (c, d, e) {
        if (typeof __transform_includes === 'undefined')return e;
        if ('sourcemeta' in __transform_includes)e.__SMmeta = d;
        return e;
    };
    a.__annotator = b;
})(this);

if (JSON.stringify(["\u2028\u2029"]) === '["\u2028\u2029"]')JSON.stringify = function (a) {
    var b = /\u2028/g, c = /\u2029/g;
    return function (d, e, f) {
        var g = a.call(this, d, e, f);
        if (g) {
            if (-1 < g.indexOf('\u2028'))g = g.replace(b, '\\u2028');
            if (-1 < g.indexOf('\u2029'))g = g.replace(c, '\\u2029');
        }
        return g;
    };
}(JSON.stringify);


if (!Object.assign)Object.assign = function (a, b) {
    if (a == null)throw new TypeError('Object.assign target cannot be null or undefined');
    var c = Object(a), d = Object.prototype.hasOwnProperty;
    for (var e = 1; e < arguments.length; e++) {
        var f = arguments[e];
        if (f == null)continue;
        var g = Object(f);
        for (var h in g)if (d.call(g, h))c[h] = g[h];
    }
    return c;
};

(function (a) {
    a.__m = function (b, c) {
        b.__SMmeta = c;
        return b;
    };
})(this);
if (!String.prototype.startsWith)String.prototype.startsWith = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this), c = arguments.length > 1 ? (Number(arguments[1]) || 0) : 0, d = Math.min(Math.max(c, 0), b.length);
    return b.indexOf(String(a), c) == d;
};
if (!String.prototype.endsWith)String.prototype.endsWith = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this), c = b.length, d = String(a), e = arguments.length > 1 ? (Number(arguments[1]) || 0) : c, f = Math.min(Math.max(e, 0), c), g = f - d.length;
    if (g < 0)return false;
    return b.lastIndexOf(d, g) == g;
};
if (!String.prototype.contains)String.prototype.contains = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this), c = arguments.length > 1 ? (Number(arguments[1]) || 0) : 0;
    return b.indexOf(String(a), c) != -1;
};
if (!String.prototype.repeat)String.prototype.repeat = function (a) {
    "use strict";
    if (this == null)throw TypeError();
    var b = String(this);
    a = Number(a) || 0;
    if (a < 0 || a === Infinity)throw RangeError();
    if (a === 1)return b;
    var c = '';
    while (a) {
        if (a & 1)c += b;
        if ((a >>= 1))b += b;
    }
    return c;
};


__t = function (a) {
    return a[0];
};
__w = function (a) {
    return a;
};

(function (a) {
    if (a.require)return;
    var b = Object.prototype.toString, c = {}, d = {}, e = {}, f = 0, g = 1, h = 2, i = Object.prototype.hasOwnProperty;

    function j(y) {
        var z = Array.prototype.slice.call(y), aa = {}, ba, ca, da, ea;
        while (z.length) {
            ca = z.shift();
            if (aa[ca])continue;
            aa[ca] = true;
            da = c[ca];
            if (!da || !da.waiting)continue;
            for (ba = 0; ba < da.dependencies.length; ba++) {
                ea = da.dependencies[ba];
                if (!c[ea] || c[ea].waiting)z.push(ea);
            }
        }
        for (ca in aa)if (i.call(aa, ca))z.push(ca);
        var fa = [];
        for (ba = 0; ba < z.length; ba++) {
            ca = z[ba];
            var ga = ca;
            da = c[ca];
            if (!da) {
                ga += ' is not defined';
            } else if (!da.waiting) {
                ga += ' is ready';
            } else {
                var ha = [];
                for (var ia = 0; ia < da.dependencies.length; ia++) {
                    ea = da.dependencies[ia];
                    if (!c[ea] || c[ea].waiting)ha.push(ea);
                }
                ga += ' is waiting for ' + ha.join(', ');
            }
            fa.push(ga);
        }
        return fa.join('\n');
    }

    function k(y) {
        this.name = 'ModuleError';
        this.message = y;
        this.stack = Error(y).stack;
        this.framesToPop = 2;
    }

    k.prototype = Object.create(Error.prototype);
    k.prototype.constructor = k;
    var l = a.performance || a.msPerformance || a.webkitPerformance || {};
    if (!l.now)l = a.Date;
    var m = l ? l.now.bind(l) : function () {
        return 0;
    }, n = [0], o = 0;

    function p(y) {
        var z = c[y], aa, ba, ca;
        if (z && z.exports) {
            if (z.refcount-- === 1)delete c[y];
            return z.exports;
        }
        if (a.ErrorUtils && !a.ErrorUtils.inGuard())return ErrorUtils.applyWithGuard(p, this, arguments);
        if (!z) {
            ca = 'Requiring unknown module "' + y + '"';
            throw new k(ca);
        }
        if (z.hasError)throw new k('Requiring module "' + y + '" which threw an exception');
        if (z.waiting)throw new k('Requiring module "' + y + '" with unresolved dependencies: ' + j([y]));
        var da = z.exports = {}, ea = z.factory;
        if (b.call(ea) === '[object Function]') {
            var fa = [], ga = z.dependencies, ha = ga.length, ia;
            if (z.special & h)ha = Math.min(ha, ea.length);
            try {
                for (ba = 0; fa.length < ha; ba++) {
                    aa = ga[ba];
                    if (!z.inlineRequires[aa])fa.push(aa === 'module' ? z : (aa === 'exports' ? da : p.call(null, aa)));
                }
                ++o;
                n.unshift(0);
                var ka = m();
                try {
                    ia = ea.apply(z.context || a, fa);
                } catch (ja) {
                    if (c.ex && c.erx) {
                        var la = p.call(null, 'ex'), ma = p.call(null, 'erx'), na = ma(ja.message);
                        if (na[0].indexOf(' from module "%s"') < 0) {
                            na[0] += ' from module "%s"';
                            na[na.length] = y;
                        }
                        ja.message = la.apply(null, na);
                    }
                    throw ja;
                } finally {
                    var oa = m() - ka, pa = oa - n.shift();
                    n[0] += oa;
                    z.factoryTime = pa;
                }
            } catch (ja) {
                z.hasError = true;
                z.exports = null;
                throw ja;
            }
            if (ia)z.exports = ia;
        } else z.exports = ea;
        if (z.refcount-- === 1)delete c[y];
        return z.exports;
    }

    p.__getFactoryTime = function () {
        var y = 0;
        for (var z in c)if (c.hasOwnProperty(z))y += c[z].factoryTime;
        return y;
    };
    p.__getTotalFactories = function () {
        return o;
    };
    function q(y, z, aa, ba, ca, da, ea) {
        if (a.TimeSlice && !a.TimeSlice.inGuard())return a.TimeSlice.guard(function () {
            q(y, z, aa, ba, ca, da, ea);
        }, 'define ' + y)();
        if (z === (void 0)) {
            z = [];
            aa = y;
            y = u();
        } else if (aa === (void 0)) {
            aa = z;
            if (b.call(y) === '[object Array]') {
                z = y;
                y = u();
            } else z = [];
        }
        var fa = {cancel: s.bind(this, y)}, ga = c[y];
        if (ga) {
            if (da)ga.refcount += da;
            return fa;
        } else if (!z && !aa && da) {
            e[y] = (e[y] || 0) + da;
            return fa;
        }
        var ha = (e[y] || 0) + (da || 0);
        delete e[y];
        ga = new r(y, ha, null, aa, z, ca, ba, ea || {});
        c[y] = ga;
        w(y);
        return fa;
    }

    function r(y, z, aa, ba, ca, da, ea, fa) {
        this.id = y;
        this.refcount = z;
        this.exports = aa || null;
        this.factory = ba;
        this.dependencies = ca;
        this.context = da;
        this.special = ea || 0;
        this.inlineRequires = fa;
        this.waitingMap = {};
        this.waiting = 0;
        this.hasError = false;
        this.factoryTime = null;
    }

    function s(y) {
        if (!c[y])return;
        var z = c[y];
        delete c[y];
        for (var aa in z.waitingMap)if (z.waitingMap[aa])delete d[aa][y];
        for (var ba = 0; ba < z.dependencies.length; ba++) {
            aa = z.dependencies[ba];
            if (c[aa]) {
                if (c[aa].refcount-- === 1)s(aa);
            } else if (e[aa])e[aa]--;
        }
    }

    function t(y, z, aa) {
        return q(y, z, (void 0), g, aa, 1);
    }

    function u() {
        return '__mod__' + f++;
    }

    function v(y, z) {
        if (!y.waitingMap[z] && y.id !== z) {
            y.waiting++;
            y.waitingMap[z] = 1;
            d[z] || (d[z] = {});
            d[z][y.id] = 1;
        }
    }

    function w(y) {
        var z = [], aa = c[y], ba, ca, da;
        for (ca = 0; ca < aa.dependencies.length; ca++) {
            ba = aa.dependencies[ca];
            if (!c[ba]) {
                v(aa, ba);
            } else if (c[ba].waiting)for (da in c[ba].waitingMap)if (c[ba].waitingMap[da])v(aa, da);
        }
        if (aa.waiting === 0 && aa.special & g)z.push(y);
        if (d[y]) {
            var ea = d[y], fa;
            d[y] = (void 0);
            for (ba in ea) {
                fa = c[ba];
                for (da in aa.waitingMap)if (aa.waitingMap[da])v(fa, da);
                if (fa.waitingMap[y]) {
                    fa.waitingMap[y] = 0;
                    fa.waiting--;
                }
                if (fa.waiting === 0 && fa.special & g)z.push(ba);
            }
        }
        for (ca = 0; ca < z.length; ca++)p.call(null, z[ca]);
    }

    function x(y, z) {
        c[y] = new r(y, 0, z);
    }

    x('module', 0);
    x('exports', 0);
    x('define', q);
    x('global', a);
    x('require', p);
    x('requireDynamic', p);
    x('requireLazy', t);
    q.amd = {};
    a.define = q;
    a.require = p;
    a.requireDynamic = p;
    a.requireLazy = t;
    p.__debug = {
        modules: c, deps: d, printDependencyInfo: function () {
            if (!a.console)return;
            var y = Object.keys(p.__debug.deps);
            a.console.log(j(y));
        }
    };
    a.__d = function (y, z, aa, ba, ca) {
        var da = ['global', 'require', 'requireDynamic', 'requireLazy', 'module', 'exports'];
        q(y, da.concat(z), aa, ba || h, null, null, ca);
    };
})(this);
__d("CookieCore", [], function (a, b, c, d, e, f) {
    var g = {
        set: function (h, i, j, k, l) {
            document.cookie = h + "=" + encodeURIComponent(i) + "; " + (j ? "expires=" + (new Date(Date.now() + j)).toGMTString() + "; " : "") + "path=" + (k || '/') + "; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1') + (l ? "; secure" : "");
        }, clear: function (h, i) {
            i = i || '/';
            document.cookie = h + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; " + "path=" + i + "; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
        }, get: function (h) {
            var i = document.cookie.match('(?:^|;\\s*)' + h + '=(.*?)(?:;|$)');
            return (i ? decodeURIComponent(i[1]) : i);
        }
    };
    e.exports = g;
}, null);
__d("copyProperties", [], function (a, b, c, d, e, f) {
    function g(h, i, j, k, l, m, n) {
        h = h || {};
        var o = [i, j, k, l, m], p = 0, q;
        while (o[p]) {
            q = o[p++];
            for (var r in q)h[r] = q[r];
            if (q.hasOwnProperty && q.hasOwnProperty('toString') && (typeof q.toString != 'undefined') && (h.toString !== q.toString))h.toString = q.toString;
        }
        return h;
    }

    e.exports = g;
}, null);
__d("Env", ["copyProperties"], function (a, b, c, d, e, f, g) {
    var h = {start: Date.now()};
    if (a.Env) {
        g(h, a.Env);
        a.Env = (void 0);
    }
    e.exports = h;
}, null);
__d("Cookie", ["CookieCore", "Env", "copyProperties"], function (a, b, c, d, e, f, g, h, i) {
    function j(l, m, n, o, p) {
        if (h.no_cookies && l != 'tpa')return;
        g.set(l, m, n, o, p);
    }

    var k = i({}, g);
    k.set = j;
    e.exports = k;
}, null);
__d("eprintf", [], function (a, b, c, d, e, f) {
    var g = function (h) {
        var i = Array.prototype.slice.call(arguments).map(function (l) {
            return String(l);
        }), j = h.split('%s').length - 1;
        if (j !== i.length - 1)return g('eprintf args number mismatch: %s', JSON.stringify(i));
        var k = 1;
        return h.replace(/%s/g, function (l) {
            return String(i[k++]);
        });
    };
    e.exports = g;
}, null);
__d("ex", ["eprintf"], function (a, b, c, d, e, f, g) {
    var h = function () {
        for (var i = [], j = 0, k = arguments.length; j < k; j++)i.push(arguments[j]);
        i = i.map(function (l) {
            return String(l);
        });
        if (i[0].split('%s').length !== i.length)return h('ex args number mismatch: %s', JSON.stringify(i));
        return h._prefix + JSON.stringify(i) + h._suffix;
    };
    h._prefix = '<![EX[';
    h._suffix = ']]>';
    e.exports = h;
}, null);
__d("erx", ["ex"], function (a, b, c, d, e, f, g) {
    var h = function (i) {
        if (typeof i !== 'string')return i;
        var j = i.indexOf(g._prefix), k = i.lastIndexOf(g._suffix);
        if (j < 0 || k < 0)return [i];
        var l = j + g._prefix.length, m = k + g._suffix.length;
        if (l >= k)return ['erx slice failure: %s', i];
        var n = i.substring(0, j), o = i.substring(m);
        i = i.substring(l, k);
        var p;
        try {
            p = JSON.parse(i);
            p[0] = n + p[0] + o;
        } catch (q) {
            return ['erx parse failure: %s', i];
        }
        return p;
    };
    e.exports = h;
}, null);
__d("ErrorUtils", ["Env", "eprintf", "erx"], function (a, b, c, d, e, f, g, h, i) {
    var j = {}, k = '<anonymous guard>', l = '<generated guard>', m = '<window.onerror>', n = /^https?:\/\//i, o = /^Type Mismatch for/, p = ['Unknown script code', 'Function code', 'eval code'], q = new RegExp('(.*?)(\\s)(?:' + p.join('|') + ')$'), r = [], s, t = [], u = 50, v = [], w = false, x = false, y = j.nocatch || (/nocatch/).test(location.search);

    function z(la) {
        if (!la)return [];
        var ma = la.split(/\n\n/)[0].replace(/[\(\)]|\[.*?\]|^\w+:\s.*?\n/g, '').split('\n').map(function (na) {
            var oa, pa, qa;
            na = na.trim();
            if (/(:(\d+)(:(\d+))?)$/.test(na)) {
                pa = RegExp.$2;
                qa = RegExp.$4;
                na = na.slice(0, -RegExp.$1.length);
            }
            if (q.test(na) || /(.*)(@|\s)[^\s]+$/.test(na)) {
                na = na.substring(RegExp.$1.length + 1);
                oa = /(at)?\s*(.*)([^\s]+|$)/.test(RegExp.$1) ? RegExp.$2 : '';
            }
            var ra = {identifier: oa, script: na, line: pa, column: qa};
            if (s)s(ra);
            ra.text = '    at' + (ra.identifier ? ' ' + ra.identifier + ' (' : ' ') + ra.script + (ra.line ? ':' + ra.line : '') + (ra.column ? ':' + ra.column : '') + (ra.identifier ? ')' : '');
            return ra;
        });
        return ma;
    }

    function aa(la) {
        if (!la) {
            return {};
        } else if (la._originalError)return la;
        var ma = z(la.stackTrace || la.stack), na = false;
        if (la.framesToPop) {
            var oa = la.framesToPop, pa;
            while (oa > 0 && ma.length > 0) {
                pa = ma.shift();
                oa--;
                na = true;
            }
            if (o.test(la.message) && la.framesToPop === 2 && pa)if (n.test(pa.script))la.message += ' at ' + pa.script + (pa.line ? ':' + pa.line : '') + (pa.column ? ':' + pa.column : '');
            delete la.framesToPop;
        }
        var qa = {
            line: la.lineNumber || la.line,
            column: la.columnNumber || la.column,
            name: la.name,
            message: la.message,
            messageWithParams: la.messageWithParams,
            type: la.type,
            script: la.fileName || la.sourceURL || la.script,
            stack: ma.map(function (sa) {
                return sa.text;
            }).join('\n'),
            stackFrames: ma,
            guard: la.guard,
            guardList: la.guardList,
            extra: la.extra,
            snapshot: la.snapshot
        };
        if (typeof qa.message === 'string' && !qa.messageWithParams) {
            qa.messageWithParams = i(qa.message);
            qa.message = h.apply(a, qa.messageWithParams);
        } else {
            qa.messageObject = qa.message;
            qa.message = String(qa.message);
        }
        if (s)s(qa);
        if (na) {
            delete qa.script;
            delete qa.line;
            delete qa.column;
        }
        if (ma[0]) {
            qa.script = qa.script || ma[0].script;
            qa.line = qa.line || ma[0].line;
            qa.column = qa.column || ma[0].column;
        }
        qa._originalError = la;
        for (var ra in qa)(qa[ra] == null && delete qa[ra]);
        return qa;
    }

    function ba(la, ma) {
        if (x)return false;
        if (v.length > 0) {
            la.guard = la.guard || v[0];
            la.guardList = v.slice();
        }
        la = aa(la);
        !ma;
        if (t.length > u)t.splice(u / 2, 1);
        t.push(la);
        x = true;
        for (var na = 0; na < r.length; na++)try {
            r[na](la);
        } catch (oa) {
        }
        x = false;
        return true;
    }

    function ca() {
        return w;
    }

    function da(la) {
        v.unshift(la);
        w = true;
    }

    function ea() {
        v.shift();
        w = (v.length !== 0);
    }

    function fa(la, ma, na, oa, pa) {
        da(pa || k);
        var qa;
        if (g.nocatch)y = true;
        if (y) {
            try {
                qa = la.apply(ma, na || []);
            } finally {
                ea();
            }
            return qa;
        }
        try {
            qa = la.apply(ma, na || []);
            return qa;
        } catch (ra) {
            var sa = aa(ra);
            if (oa)oa(sa);
            if (la)sa.callee = la.toString().substring(0, 100);
            if (na)sa.args = Array.prototype.slice.call(na).toString().substring(0, 100);
            sa.guard = v[0];
            sa.guardList = v.slice();
            ba(sa);
        } finally {
            ea();
        }
    }

    function ga(la, ma, na) {
        ma = ma || la.name || l;
        function oa() {
            return fa(la, na || this, arguments, null, ma);
        }

        return oa;
    }

    function ha(la, ma, na, oa, pa) {
        pa = pa || {};
        pa.message = pa.message || la;
        pa.script = pa.script || ma;
        pa.line = pa.line || na;
        pa.column = pa.column || oa;
        pa.guard = m;
        pa.guardList = [m];
        ba(pa, true);
    }

    window.onerror = ha;
    function ia(la, ma) {
        r.push(la);
        if (!ma)t.forEach(la);
    }

    function ja(la) {
        s = la;
    }

    var ka = {
        ANONYMOUS_GUARD_TAG: k,
        GENERATED_GUARD_TAG: l,
        GLOBAL_ERROR_HANDLER_TAG: m,
        addListener: ia,
        setSourceResolver: ja,
        applyWithGuard: fa,
        guard: ga,
        history: t,
        inGuard: ca,
        normalizeError: aa,
        onerror: ha,
        reportError: ba
    };
    e.exports = a.ErrorUtils = ka;
    if (typeof __t === 'function' && __t.setHandler)__t.setHandler(ba);
}, null);
__d("CallbackDependencyManager", ["ErrorUtils"], function (a, b, c, d, e, f, g) {
    function h() {
        "use strict";
        this.$CallbackDependencyManager0 = {};
        this.$CallbackDependencyManager1 = {};
        this.$CallbackDependencyManager2 = 1;
        this.$CallbackDependencyManager3 = {};
    }

    h.prototype.$CallbackDependencyManager4 = function (i, j) {
        "use strict";
        var k = 0, l = {};
        for (var m = 0, n = j.length; m < n; m++)l[j[m]] = 1;
        for (var o in l) {
            if (this.$CallbackDependencyManager3[o])continue;
            k++;
            if (this.$CallbackDependencyManager0[o] === (void 0))this.$CallbackDependencyManager0[o] = {};
            this.$CallbackDependencyManager0[o][i] = (this.$CallbackDependencyManager0[o][i] || 0) + 1;
        }
        return k;
    };
    h.prototype.$CallbackDependencyManager5 = function (i) {
        "use strict";
        if (!this.$CallbackDependencyManager0[i])return;
        for (var j in this.$CallbackDependencyManager0[i]) {
            this.$CallbackDependencyManager0[i][j]--;
            if (this.$CallbackDependencyManager0[i][j] <= 0)delete this.$CallbackDependencyManager0[i][j];
            this.$CallbackDependencyManager1[j].$CallbackDependencyManager6--;
            if (this.$CallbackDependencyManager1[j].$CallbackDependencyManager6 <= 0) {
                var k = this.$CallbackDependencyManager1[j].$CallbackDependencyManager7;
                delete this.$CallbackDependencyManager1[j];
                g.applyWithGuard(k);
            }
        }
    };
    h.prototype.addDependenciesToExistingCallback = function (i, j) {
        "use strict";
        if (!this.$CallbackDependencyManager1[i])return null;
        var k = this.$CallbackDependencyManager4(i, j);
        this.$CallbackDependencyManager1[i].$CallbackDependencyManager6 += k;
        return i;
    };
    h.prototype.isPersistentDependencySatisfied = function (i) {
        "use strict";
        return !!this.$CallbackDependencyManager3[i];
    };
    h.prototype.satisfyPersistentDependency = function (i) {
        "use strict";
        this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
    };
    h.prototype.satisfyNonPersistentDependency = function (i) {
        "use strict";
        var j = this.$CallbackDependencyManager3[i] === 1;
        if (!j)this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
        if (!j)delete this.$CallbackDependencyManager3[i];
    };
    h.prototype.registerCallback = function (i, j) {
        "use strict";
        var k = this.$CallbackDependencyManager2;
        this.$CallbackDependencyManager2++;
        var l = this.$CallbackDependencyManager4(k, j);
        if (l === 0) {
            g.applyWithGuard(i);
            return null;
        }
        this.$CallbackDependencyManager1[k] = {$CallbackDependencyManager7: i, $CallbackDependencyManager6: l};
        return k;
    };
    h.prototype.unsatisfyPersistentDependency = function (i) {
        "use strict";
        delete this.$CallbackDependencyManager3[i];
    };
    e.exports = h;
}, null);
__d("EventSubscription", [], function (a, b, c, d, e, f) {
    'use strict';
    function g(h) {
        this.subscriber = h;
    }

    g.prototype.remove = function () {
        this.subscriber.removeSubscription(this);
    };
    e.exports = g;
}, null);
__d("EmitterSubscription", ["EventSubscription"], function (a, b, c, d, e, f, g) {
    'use strict';
    for (var h in g)if (g.hasOwnProperty(h))j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    function j(k, l, m) {
        g.call(this, k);
        this.listener = l;
        this.context = m;
    }

    e.exports = j;
}, null);
__d("sprintf", [], function (a, b, c, d, e, f) {
    function g(h) {
        for (var i = [], j = 1, k = arguments.length; j < k; j++)i.push(arguments[j]);
        var l = 0;
        return h.replace(/%s/g, function (m) {
            return i[l++];
        });
    }

    e.exports = g;
}, null);
__d("invariant", ["ex", "sprintf"], function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = g, j = function (k, l) {
        if (!k) {
            var m;
            if (l === (void 0)) {
                m = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
            } else {
                var n = ['Invariant Violation: ' + l];
                for (var o = 2, p = arguments.length; o < p; o++)n.push(arguments[o]);
                m = new Error(i.apply(null, n));
                m.messageWithParams = n;
            }
            m.framesToPop = 1;
            throw m;
        }
    };
    e.exports = j;
}, null);
__d("EventSubscriptionVendor", ["invariant"], function (a, b, c, d, e, f, g) {
    'use strict';
    function h() {
        this.$EventSubscriptionVendor0 = {};
        this.$EventSubscriptionVendor1 = null;
    }

    h.prototype.addSubscription = function (i, j) {
        g(j.subscriber === this);
        if (!this.$EventSubscriptionVendor0[i])this.$EventSubscriptionVendor0[i] = [];
        var k = this.$EventSubscriptionVendor0[i].length;
        this.$EventSubscriptionVendor0[i].push(j);
        j.eventType = i;
        j.key = k;
        return j;
    };
    h.prototype.removeAllSubscriptions = function (i) {
        if (i === (void 0)) {
            this.$EventSubscriptionVendor0 = {};
        } else delete this.$EventSubscriptionVendor0[i];
    };
    h.prototype.removeSubscription = function (i) {
        var j = i.eventType, k = i.key, l = this.$EventSubscriptionVendor0[j];
        if (l)delete l[k];
    };
    h.prototype.getSubscriptionsForType = function (i) {
        return this.$EventSubscriptionVendor0[i];
    };
    e.exports = h;
}, null);
__d("emptyFunction", [], function (a, b, c, d, e, f) {
    function g(i) {
        return function () {
            return i;
        };
    }

    function h() {
    }

    h.thatReturns = g;
    h.thatReturnsFalse = g(false);
    h.thatReturnsTrue = g(true);
    h.thatReturnsNull = g(null);
    h.thatReturnsThis = function () {
        return this;
    };
    h.thatReturnsArgument = function (i) {
        return i;
    };
    e.exports = h;
}, null);
__d("ExecutionEnvironment", [], function (a, b, c, d, e, f) {
    "use strict";
    var g = !!(typeof window !== 'undefined' && window.document && window.document.createElement), h = {
        canUseDOM: g,
        canUseWorkers: typeof Worker !== 'undefined',
        canUseEventListeners: g && !!(window.addEventListener || window.attachEvent),
        canUseViewport: g && !!window.screen,
        isInWorker: !g
    };
    e.exports = h;
}, null);
__d("performance", ["ExecutionEnvironment"], function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    if (g.canUseDOM)h = window.performance || window.msPerformance || window.webkitPerformance;
    e.exports = h || {};
}, null);
__d("performanceNow", ["performance"], function (a, b, c, d, e, f, g) {
    var h = g;
    if (!h || !h.now)h = Date;
    var i = h.now.bind(h);
    e.exports = i;
}, null);
__d("Stopwatch", ["performanceNow"], function (a, b, c, d, e, f, g) {
    function h() {
        "use strict";
        this.reset();
    }

    h.prototype.reset = function () {
        "use strict";
        this.$Stopwatch0 = g();
    };
    h.prototype.read = function () {
        "use strict";
        return g() - this.$Stopwatch0;
    };
    e.exports = h;
}, null);
__d("StopwatchPool", ["Stopwatch"], function (a, b, c, d, e, f, g) {
    var h = 0, i = [], j = {}, k = {
        acquire: function () {
            var l;
            if (i.length > 0) {
                l = i.pop();
            } else {
                h++;
                l = new g();
                l.__index = h;
            }
            j[l.__index] = l;
            return l;
        }, release: function (l) {
            if (l.__index && j[l.__index] === l) {
                delete j[l.__index];
                i.push(l);
            }
        }
    };
    e.exports = k;
}, null);
__d("CircularBuffer", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i) {
        "use strict";
        g(i > 0);
        this.$CircularBuffer0 = i;
        this.$CircularBuffer1 = 0;
        this.$CircularBuffer2 = [];
    }

    h.prototype.write = function (i) {
        "use strict";
        if (this.$CircularBuffer2.length < this.$CircularBuffer0) {
            this.$CircularBuffer2.push(i);
        } else {
            this.$CircularBuffer2[this.$CircularBuffer1] = i;
            this.$CircularBuffer1++;
            this.$CircularBuffer1 %= this.$CircularBuffer0;
        }
        return this;
    };
    h.prototype.read = function () {
        "use strict";
        return this.$CircularBuffer2.slice(this.$CircularBuffer1).concat(this.$CircularBuffer2.slice(0, this.$CircularBuffer1));
    };
    h.prototype.clear = function () {
        "use strict";
        this.$CircularBuffer1 = 0;
        this.$CircularBuffer2 = [];
        return this;
    };
    e.exports = h;
}, null);
/**
 * @generated SignedSource<<38c660df4077b7dc57a24ea3cec01c11>>
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is a check-in of a static_upstream project!      !!
 * !!                                                            !!
 * !! You should not modify this file directly. Instead:         !!
 * !! 1) Use `fjs use-upstream` to temporarily replace this with !!
 * !!    the latest version from upstream.                       !!
 * !! 2) Make your changes, test them, etc.                      !!
 * !! 3) Use `fjs push-upstream` to copy your changes back to    !!
 * !!    static_upstream.                                        !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic
 * Denicola
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 * @providesModule ImmediateImplementation
 */__d("ImmediateImplementation", [], function (a, b, c, d, e, f) {
    (function (g, h) {
        "use strict";
        var i = 1, j = {}, k = {}, l = k, m = false, n = g.document, o;

        function p(x) {
            var y = x[0];
            x = Array.prototype.slice.call(x, 1);
            j[i] = function () {
                y.apply(h, x);
            };
            l = (l.next = {handle: i++});
            return l.handle;
        }

        function q() {
            var x, y;
            while (!m && (x = k.next)) {
                k = x;
                if ((y = j[x.handle])) {
                    m = true;
                    try {
                        y();
                        m = false;
                    } finally {
                        r(x.handle);
                        if (m) {
                            m = false;
                            if (k.next)o(q);
                        }
                    }
                }
            }
        }

        function r(x) {
            delete j[x];
        }

        function s() {
            if (g.postMessage && !g.importScripts) {
                var x = true, y = function () {
                    x = false;
                    if (g.removeEventListener) {
                        g.removeEventListener("message", y, false);
                    } else g.detachEvent("onmessage", y);
                };
                if (g.addEventListener) {
                    g.addEventListener("message", y, false);
                } else if (g.attachEvent) {
                    g.attachEvent("onmessage", y);
                } else return false;
                g.postMessage("", "*");
                return x;
            }
        }

        function t() {
            var x = "setImmediate$" + Math.random() + "$", y = function (event) {
                if (event.source === g && typeof event.data === "string" && event.data.indexOf(x) === 0)q();
            };
            if (g.addEventListener) {
                g.addEventListener("message", y, false);
            } else g.attachEvent("onmessage", y);
            o = function () {
                var z = p(arguments);
                g.postMessage(x + z, "*");
                return z;
            };
        }

        function u() {
            var x = new MessageChannel();
            x.port1.onmessage = q;
            o = function () {
                var y = p(arguments);
                x.port2.postMessage(y);
                return y;
            };
        }

        function v() {
            var x = n.documentElement;
            o = function () {
                var y = p(arguments), z = n.createElement("script");
                z.onreadystatechange = function () {
                    z.onreadystatechange = null;
                    x.removeChild(z);
                    z = null;
                    q();
                };
                x.appendChild(z);
                return y;
            };
        }

        function w() {
            o = function () {
                setTimeout(q, 0);
                return p(arguments);
            };
        }

        if (s()) {
            t();
        } else if (g.MessageChannel) {
            u();
        } else if (n && n.createElement && "onreadystatechange" in n.createElement("script")) {
            v();
        } else w();
        f.setImmediate = o;
        f.clearImmediate = r;
    }(Function("return this")()));
}, null);
__d("setImmediatePolyfill", ["invariant", "ImmediateImplementation"], function (a, b, c, d, e, f, g) {
    var h = a.setImmediate;
    if (!h) {
        var i = b('ImmediateImplementation');
        h = i.setImmediate;
    }
    function j() {
        for (var k = [], l = 0, m = arguments.length; l < m; l++)k.push(arguments[l]);
        g(typeof k[0] === 'function');
        return h.apply(null, k);
    }

    e.exports = j;
}, null);
__d("LogBuffer", ["CircularBuffer", "setImmediatePolyfill"], function (a, b, c, d, e, f, g, h) {
    var i = 5000, j = {}, k = {}, l = {
        write: function (m, n) {
            var o = j[m] = j[m] || new g(i);
            o.write(n);
            if (k[m])k[m].forEach(function (p) {
                try {
                    p(n);
                } catch (q) {
                }
            });
        }, read: function (m) {
            if (!j[m]) {
                return [];
            } else return j[m].read();
        }, tail: function (m, n) {
            if (typeof n !== 'function')return;
            k[m] = k[m] || [];
            k[m].push(n);
            if (j[m]) {
                var o = j[m];
                o.read().forEach(function (p) {
                    try {
                        n(p);
                    } catch (q) {
                    }
                });
            }
        }, clear: function (m) {
            if (j[m])h(function () {
                j[m].clear();
            });
        }
    };
    e.exports = l;
}, null);
__d("EventEmitter", ["EmitterSubscription", "ErrorUtils", "EventSubscriptionVendor", "emptyFunction", "invariant", "StopwatchPool", "LogBuffer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n() {
        "use strict";
        this.$EventEmitter0 = new i();
        this.$EventEmitter1 = null;
    }

    n.prototype.addListener = function (o, p, q) {
        "use strict";
        return this.$EventEmitter0.addSubscription(o, new g(this.$EventEmitter0, p, q));
    };
    n.prototype.once = function (o, p, q) {
        "use strict";
        var r = this;
        return this.addListener(o, function () {
            r.removeCurrentListener();
            p.apply(q, arguments);
        });
    };
    n.prototype.removeAllListeners = function (o) {
        "use strict";
        this.$EventEmitter0.removeAllSubscriptions(o);
    };
    n.prototype.removeCurrentListener = function () {
        "use strict";
        k(!!this.$EventEmitter1);
        this.$EventEmitter0.removeSubscription(this.$EventEmitter1);
    };
    n.prototype.listeners = function (o) {
        "use strict";
        var p = this.$EventEmitter0.getSubscriptionsForType(o);
        return p ? p.filter(j.thatReturnsTrue).map(function (q) {
            return q.listener;
        }) : [];
    };
    n.prototype.emit = function (o) {
        "use strict";
        var p = this.$EventEmitter0.getSubscriptionsForType(o);
        if (p) {
            var q = Object.keys(p), r = l.acquire();
            for (var s = 0; s < q.length; s++) {
                var t = q[s], u = p[t];
                if (u) {
                    this.$EventEmitter1 = u;
                    var v = u.listener.__SMmeta || {name: u.listener.name || '<anonymous function>'};
                    r.reset();
                    h.applyWithGuard(u.listener, u.context, Array.prototype.slice.call(arguments, 1), null, 'EventEmitter:' + o);
                    var w = r.read();
                    m.write('event_handler_performance', {functionMeta: v, time: w, context: o});
                }
            }
            this.$EventEmitter1 = null;
        }
    };
    e.exports = n;
}, null);
__d("EventEmitterWithHolding", [], function (a, b, c, d, e, f) {
    'use strict';
    function g(h, i) {
        this.$EventEmitterWithHolding0 = h;
        this.$EventEmitterWithHolding1 = i;
        this.$EventEmitterWithHolding2 = null;
        this.$EventEmitterWithHolding3 = [];
        this.$EventEmitterWithHolding4 = 0;
    }

    g.prototype.addListener = function (h, i, j) {
        return this.$EventEmitterWithHolding0.addListener(h, i, j);
    };
    g.prototype.once = function (h, i, j) {
        return this.$EventEmitterWithHolding0.once(h, i, j);
    };
    g.prototype.addRetroactiveListener = function (h, i, j) {
        var k = this.$EventEmitterWithHolding0.addListener(h, i, j), l = this.$EventEmitterWithHolding3;
        l.push(false);
        this.$EventEmitterWithHolding4++;
        this.$EventEmitterWithHolding1.emitToListener(h, i, j);
        this.$EventEmitterWithHolding4--;
        if (l[l.length - 1])k.remove();
        l.pop();
        return k;
    };
    g.prototype.removeAllListeners = function (h) {
        this.$EventEmitterWithHolding0.removeAllListeners(h);
    };
    g.prototype.removeCurrentListener = function () {
        if (this.$EventEmitterWithHolding4) {
            var h = this.$EventEmitterWithHolding3;
            h[h.length - 1] = true;
        } else this.$EventEmitterWithHolding0.removeCurrentListener();
    };
    g.prototype.listeners = function (h) {
        return this.$EventEmitterWithHolding0.listeners(h);
    };
    g.prototype.emit = function (h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
    };
    g.prototype.emitAndHold = function (h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding2 = this.$EventEmitterWithHolding1.holdEvent(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding2 = null;
    };
    g.prototype.releaseCurrentEvent = function () {
        if (this.$EventEmitterWithHolding2 !== null) {
            this.$EventEmitterWithHolding1.releaseEvent(this.$EventEmitterWithHolding2);
        } else if (!!this.$EventEmitterWithHolding4)this.$EventEmitterWithHolding1.releaseCurrentEvent();
    };
    g.prototype.releaseHeldEventType = function (h) {
        this.$EventEmitterWithHolding1.releaseEventType(h);
    };
    e.exports = g;
}, null);
__d("EventHolder", ["invariant"], function (a, b, c, d, e, f, g) {
    'use strict';
    function h() {
        this.$EventHolder0 = {};
        this.$EventHolder1 = [];
    }

    h.prototype.holdEvent = function (i, j, k, l, m, n, o) {
        this.$EventHolder0[i] = this.$EventHolder0[i] || [];
        var p = this.$EventHolder0[i], q = {eventType: i, index: p.length};
        p.push([j, k, l, m, n, o]);
        return q;
    };
    h.prototype.emitToListener = function (i, j, k) {
        var l = this.$EventHolder0[i];
        if (!l)return;
        l.forEach(function (m, n) {
            if (!m)return;
            this.$EventHolder1.push({eventType: i, index: n});
            j.apply(k, m);
            this.$EventHolder1.pop();
        }.bind(this));
    };
    h.prototype.releaseCurrentEvent = function () {
        g(this.$EventHolder1.length);
        this.releaseEvent(this.$EventHolder1[this.$EventHolder1.length - 1]);
    };
    h.prototype.releaseEvent = function (i) {
        delete this.$EventHolder0[i.eventType][i.index];
    };
    h.prototype.releaseEventType = function (i) {
        this.$EventHolder0[i] = [];
    };
    e.exports = h;
}, null);
__d("toArray", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i) {
        var j = i.length;
        g(!Array.isArray(i) && (typeof i === 'object' || typeof i === 'function'));
        g(typeof j === 'number');
        g(j === 0 || (j - 1) in i);
        if (i.hasOwnProperty)try {
            return Array.prototype.slice.call(i);
        } catch (k) {
        }
        var l = Array(j);
        for (var m = 0; m < j; m++)l[m] = i[m];
        return l;
    }

    e.exports = h;
}, null);
__d("createArrayFromMixed", ["toArray"], function (a, b, c, d, e, f, g) {
    function h(j) {
        return (!!j && (typeof j == 'object' || typeof j == 'function') && ('length' in j) && !('setInterval' in j) && (typeof j.nodeType != 'number') && (Array.isArray(j) || ('callee' in j) || ('item' in j)));
    }

    function i(j) {
        if (!h(j)) {
            return [j];
        } else if (Array.isArray(j)) {
            return j.slice();
        } else return g(j);
    }

    e.exports = i;
}, null);
__d("Arbiter", ["CallbackDependencyManager", "ErrorUtils", "EventEmitter", "EventEmitterWithHolding", "EventHolder", "copyProperties", "createArrayFromMixed", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    'use strict';
    function o() {
        var t = new i();
        this.$Arbiter0 = new r();
        this.$Arbiter1 = new j(t, this.$Arbiter0);
        this.$Arbiter2 = new g();
        this.$Arbiter3 = [];
    }

    o.prototype.subscribe = function (t, u, v) {
        t = m(t);
        t.forEach(function (x) {
            n(x && typeof x === 'string');
        });
        n(typeof u === 'function');
        v = v || o.SUBSCRIBE_ALL;
        n(v === o.SUBSCRIBE_NEW || v === o.SUBSCRIBE_ALL);
        var w = t.map(function (x) {
            var y = this.$Arbiter4.bind(this, u, x);
            y.__SMmeta = u.__SMmeta;
            if (v === o.SUBSCRIBE_NEW)return this.$Arbiter1.addListener(x, y);
            this.$Arbiter3.push({});
            var z = this.$Arbiter1.addRetroactiveListener(x, y);
            this.$Arbiter3.pop();
            return z;
        }, this);
        return new s(this, w);
    };
    o.prototype.$Arbiter4 = function (t, u, v) {
        var w = this.$Arbiter3[this.$Arbiter3.length - 1];
        if (w[u] === false)return;
        var x = h.applyWithGuard(t, null, [u, v]);
        if (x === false)this.$Arbiter1.releaseCurrentEvent();
        w[u] = x;
    };
    o.prototype.unsubscribeCurrentSubscription = function () {
        this.$Arbiter1.removeCurrentListener();
    };
    o.prototype.releaseCurrentPersistentEvent = function () {
        this.$Arbiter1.releaseCurrentEvent();
    };
    o.prototype.subscribeOnce = function (t, u, v) {
        var w = this.subscribe(t, function (x, y) {
            this.unsubscribeCurrentSubscription();
            return u(x, y);
        }.bind(this), v);
        return w;
    };
    o.prototype.unsubscribe = function (t) {
        n(t.isForArbiterInstance(this));
        t.unsubscribe();
    };
    o.prototype.inform = function (t, u, v) {
        var w = Array.isArray(t);
        t = m(t);
        v = v || o.BEHAVIOR_EVENT;
        var x = (v === o.BEHAVIOR_STATE) || (v === o.BEHAVIOR_PERSISTENT);
        this.$Arbiter3.push({});
        for (var y = 0; y < t.length; y++) {
            var z = t[y];
            n(z);
            this.$Arbiter0.setHoldingBehavior(z, v);
            this.$Arbiter1.emitAndHold(z, u);
            this.$Arbiter5(z, u, x);
        }
        var aa = this.$Arbiter3.pop();
        return w ? aa : aa[t[0]];
    };
    o.prototype.query = function (t) {
        var u = this.$Arbiter0.getHoldingBehavior(t);
        n(!u || u === o.BEHAVIOR_STATE);
        var v = null;
        this.$Arbiter0.emitToListener(t, function (w) {
            v = w;
        });
        return v;
    };
    o.prototype.registerCallback = function (t, u) {
        if (typeof t === 'function') {
            return this.$Arbiter2.registerCallback(t, u);
        } else return this.$Arbiter2.addDependenciesToExistingCallback(t, u);
    };
    o.prototype.$Arbiter5 = function (t, u, v) {
        if (u === null)return;
        if (v) {
            this.$Arbiter2.satisfyPersistentDependency(t);
        } else this.$Arbiter2.satisfyNonPersistentDependency(t);
    };
    for (var p in k)if (k.hasOwnProperty(p))r[p] = k[p];
    var q = k === null ? null : k.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = k;
    function r() {
        k.call(this);
        this.$ArbiterEventHolder0 = {};
    }

    r.prototype.setHoldingBehavior = function (t, u) {
        this.$ArbiterEventHolder0[t] = u;
    };
    r.prototype.getHoldingBehavior = function (t) {
        return this.$ArbiterEventHolder0[t];
    };
    r.prototype.holdEvent = function (t, u, v, w, x) {
        var y = this.$ArbiterEventHolder0[t];
        if (y !== o.BEHAVIOR_PERSISTENT)this.$ArbiterEventHolder2(t);
        if (y !== o.BEHAVIOR_EVENT)return q.holdEvent.call(this, t, u, v, w, x);
    };
    r.prototype.$ArbiterEventHolder2 = function (t) {
        this.emitToListener(t, this.releaseCurrentEvent, this);
    };
    r.prototype.releaseEvent = function (t) {
        if (t)q.releaseEvent.call(this, t);
    };
    l(o, {
        SUBSCRIBE_NEW: 'new',
        SUBSCRIBE_ALL: 'all',
        BEHAVIOR_EVENT: 'event',
        BEHAVIOR_STATE: 'state',
        BEHAVIOR_PERSISTENT: 'persistent'
    });
    function s(t, u) {
        this.$ArbiterToken0 = t;
        this.$ArbiterToken1 = u;
    }

    s.prototype.unsubscribe = function () {
        for (var t = 0; t < this.$ArbiterToken1.length; t++)this.$ArbiterToken1[t].remove();
        this.$ArbiterToken1.length = 0;
    };
    s.prototype.isForArbiterInstance = function (t) {
        n(this.$ArbiterToken0);
        return this.$ArbiterToken0 === t;
    };
    Object.keys(o.prototype).forEach(function (t) {
        o[t] = function () {
            var u = (this instanceof o) ? this : o;
            return o.prototype[t].apply(u, arguments);
        };
    });
    o.call(o);
    e.exports = o;
}, null);
__d("AsyncFormRequestUtils", ["Arbiter"], function (a, b, c, d, e, f, g) {
    var h = {
        subscribe: function (i, j, k) {
            g.subscribe('AsyncRequest/' + j, function (l, m) {
                var n = m.request.relativeTo;
                if (n && n === i)k(m);
            });
        }
    };
    e.exports = h;
}, null);
__d("randomInt", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        var k = arguments.length;
        g(k > 0 && k <= 2);
        if (k === 1) {
            j = i;
            i = 0;
        }
        g(j > i);
        var l = this.random || Math.random;
        return Math.floor(i + l() * (j - i));
    }

    e.exports = h;
}, null);
__d("ClientIDs", ["randomInt"], function (a, b, c, d, e, f, g) {
    var h = {}, i = {
        getNewClientID: function () {
            var j = Date.now(), k = j + ':' + (g(0, 4294967295) + 1);
            h[k] = true;
            return k;
        }, isExistingClientID: function (j) {
            return !!h[j];
        }
    };
    e.exports = i;
}, null);
__d("$", ["ex"], function (a, b, c, d, e, f, g) {
    function h(j) {
        var k = typeof j === 'string' ? document.getElementById(j) : j;
        if (!k)throw new Error(g('Tried to get element with id of "%s" but it is not present on the page.', j));
        return k;
    }

    function i(j) {
        return h(j);
    }

    i.unsafe = h;
    e.exports = i;
}, null);
__d("CSSCore", ["invariant"], function (a, b, c, d, e, f, g) {
    var h = {
        addClass: function (i, j) {
            g(!/\s/.test(j));
            if (j)if (i.classList) {
                i.classList.add(j);
            } else if (!h.hasClass(i, j))i.className = i.className + ' ' + j;
            return i;
        }, removeClass: function (i, j) {
            g(!/\s/.test(j));
            if (j)if (i.classList) {
                i.classList.remove(j);
            } else if (h.hasClass(i, j))i.className = i.className.replace(new RegExp('(^|\\s)' + j + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
            return i;
        }, conditionClass: function (i, j, k) {
            return (k ? h.addClass : h.removeClass)(i, j);
        }, hasClass: function (i, j) {
            g(!/\s/.test(j));
            if (i.classList)return !!j && i.classList.contains(j);
            return (' ' + i.className + ' ').indexOf(' ' + j + ' ') > -1;
        }
    };
    e.exports = h;
}, null);
__d("CSS", ["CSSCore", "$"], function (a, b, c, d, e, f, g) {
    var h = b('$').unsafe, i = 'hidden_elem', j = {
        setClass: function (k, l) {
            h(k).className = l || '';
            return k;
        }, hasClass: function (k, l) {
            return g.hasClass(h(k), l);
        }, addClass: function (k, l) {
            return g.addClass(h(k), l);
        }, removeClass: function (k, l) {
            return g.removeClass(h(k), l);
        }, conditionClass: function (k, l, m) {
            return g.conditionClass(h(k), l, m);
        }, toggleClass: function (k, l) {
            return j.conditionClass(k, l, !j.hasClass(k, l));
        }, shown: function (k) {
            return !j.hasClass(k, i);
        }, hide: function (k) {
            return j.addClass(k, i);
        }, show: function (k) {
            return j.removeClass(k, i);
        }, toggle: function (k) {
            return j.toggleClass(k, i);
        }, conditionShow: function (k, l) {
            return j.conditionClass(k, i, !l);
        }
    };
    e.exports = j;
}, null);
__d("event-form-bubbling", [], function (a, b, c, d, e, f) {
    a.Event = a.Event || function () {
    };
    a.Event.__inlineSubmit = function (g, event) {
        var h = (a.Event.__getHandler && a.Event.__getHandler(g, 'submit'));
        return h ? null : a.Event.__bubbleSubmit(g, event);
    };
    a.Event.__bubbleSubmit = function (g, event) {
        if (document.documentElement.attachEvent) {
            var h;
            while (h !== false && (g = g.parentNode))h = g.onsubmit ? g.onsubmit(event) : a.Event.__fire && a.Event.__fire(g, 'submit', event);
            return h;
        }
    };
}, 3);
__d("isEmpty", [], function (a, b, c, d, e, f) {
    function g(h) {
        if (Array.isArray(h)) {
            return h.length === 0;
        } else if (typeof h === 'object') {
            for (var i in h)return false;
            return true;
        } else return !h;
    }

    e.exports = g;
}, null);
__d("DataStore", ["isEmpty"], function (a, b, c, d, e, f, g) {
    var h = {}, i = 1;

    function j(m) {
        if (typeof m == 'string') {
            return 'str_' + m;
        } else return 'elem_' + (m.__FB_TOKEN || (m.__FB_TOKEN = [i++]))[0];
    }

    function k(m) {
        var n = j(m);
        return h[n] || (h[n] = {});
    }

    var l = {
        set: function (m, n, o) {
            if (!m)throw new TypeError('DataStore.set: namespace is required, got ' + (typeof m));
            var p = k(m);
            p[n] = o;
            return m;
        }, get: function (m, n, o) {
            if (!m)throw new TypeError('DataStore.get: namespace is required, got ' + (typeof m));
            var p = k(m), q = p[n];
            if (typeof q === 'undefined' && m.getAttribute)if (m.hasAttribute && !m.hasAttribute('data-' + n)) {
                q = (void 0);
            } else {
                var r = m.getAttribute('data-' + n);
                q = (null === r) ? (void 0) : r;
            }
            if ((o !== (void 0)) && (q === (void 0)))q = p[n] = o;
            return q;
        }, remove: function (m, n) {
            if (!m)throw new TypeError('DataStore.remove: namespace is required, got ' + (typeof m));
            var o = k(m), p = o[n];
            delete o[n];
            if (g(o))l.purge(m);
            return p;
        }, purge: function (m) {
            delete h[j(m)];
        }, _storage: h
    };
    e.exports = l;
}, null);
__d("isNode", [], function (a, b, c, d, e, f) {
    function g(h) {
        return !!(h && (typeof Node === 'function' ? h instanceof Node : typeof h === 'object' && typeof h.nodeType === 'number' && typeof h.nodeName === 'string'));
    }

    e.exports = g;
}, null);
__d("isTextNode", ["isNode"], function (a, b, c, d, e, f, g) {
    function h(i) {
        return g(i) && i.nodeType == 3;
    }

    e.exports = h;
}, null);
__d("containsNode", ["isTextNode"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        if (!i || !j) {
            return false;
        } else if (i === j) {
            return true;
        } else if (g(i)) {
            return false;
        } else if (g(j)) {
            return h(i, j.parentNode);
        } else if (i.contains) {
            return i.contains(j);
        } else if (i.compareDocumentPosition) {
            return !!(i.compareDocumentPosition(j) & 16);
        } else return false;
    }

    e.exports = h;
}, null);
__d("createObjectFrom", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        var j = {}, k = Array.isArray(i);
        if (typeof i == 'undefined')i = true;
        for (var l = h.length; l--;)j[h[l]] = k ? i[l] : i;
        return j;
    }

    e.exports = g;
}, null);
__d("ge", [], function (a, b, c, d, e, f) {
    function g(j, k, l) {
        return typeof j != 'string' ? j : !k ? document.getElementById(j) : h(j, k, l);
    }

    function h(j, k, l) {
        var m, n, o;
        if (i(k) == j) {
            return k;
        } else if (k.getElementsByTagName) {
            n = k.getElementsByTagName(l || '*');
            for (o = 0; o < n.length; o++)if (i(n[o]) == j)return n[o];
        } else {
            n = k.childNodes;
            for (o = 0; o < n.length; o++) {
                m = h(j, n[o]);
                if (m)return m;
            }
        }
        return null;
    }

    function i(j) {
        return j.getAttribute ? j.getAttribute('id') : null;
    }

    e.exports = g;
}, null);
__d("getDocumentScrollElement", [], function (a, b, c, d, e, f) {
    "use strict";
    var g = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('AppleWebKit') > -1;

    function h(i) {
        i = i || document;
        return !g && i.compatMode === 'CSS1Compat' ? i.documentElement : i.body;
    }

    e.exports = h;
}, null);
__d("isElementNode", ["isNode"], function (a, b, c, d, e, f, g) {
    function h(i) {
        return g(i) && i.nodeType == 1;
    }

    e.exports = h;
}, null);
__d("DOMQuery", ["CSS", "containsNode", "createArrayFromMixed", "createObjectFrom", "ge", "getDocumentScrollElement", "isElementNode", "isNode", "isTextNode"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(r, s) {
        return r.hasAttribute ? r.hasAttribute(s) : r.getAttribute(s) !== null;
    }

    var q = {
        find: function (r, s) {
            var t = q.scry(r, s);
            return t[0];
        }, findPushSafe: function (r, s, t) {
            var u = q.scry(r, s), v = q.scry(r, t), w;
            if (u.length === 1 && v.length === 1 && u[0] === v[0]) {
                w = u;
            } else w = u.concat(v);
            return w[0];
        }, scry: function (r, s) {
            if (!r || !r.getElementsByTagName)return [];
            var t = s.split(' '), u = [r];
            for (var v = 0; v < t.length; v++) {
                if (u.length === 0)break;
                if (t[v] === '')continue;
                var w = t[v], x = t[v], y = [], z = false;
                if (w.charAt(0) == '^')if (v === 0) {
                    z = true;
                    w = w.slice(1);
                } else return [];
                w = w.replace(/\[(?:[^=\]]*=(?:"[^"]*"|'[^']*'))?|[.#]/g, ' $&');
                var aa = w.split(' '), ba = aa[0] || '*', ca = ba == '*', da = aa[1] && aa[1].charAt(0) == '#';
                if (da) {
                    var ea = k(aa[1].slice(1), r, ba);
                    if (ea && (ca || ea.tagName.toLowerCase() == ba))for (var fa = 0; fa < u.length; fa++)if (z && q.contains(ea, u[fa])) {
                        y = [ea];
                        break;
                    } else if (document == u[fa] || q.contains(u[fa], ea)) {
                        y = [ea];
                        break;
                    }
                } else {
                    var ga = [], ha = u.length, ia, ja = !z && x.indexOf('[') < 0 && document.querySelectorAll;
                    for (var ka = 0; ka < ha; ka++) {
                        if (z) {
                            ia = [];
                            var la = u[ka].parentNode;
                            while (m(la)) {
                                if (ca || la.tagName.toLowerCase() == ba)ia.push(la);
                                la = la.parentNode;
                            }
                        } else if (ja) {
                            ia = u[ka].querySelectorAll(x);
                        } else ia = u[ka].getElementsByTagName(ba);
                        var ma = ia.length;
                        for (var na = 0; na < ma; na++)ga.push(ia[na]);
                    }
                    if (!ja)for (var oa = 1; oa < aa.length; oa++) {
                        var pa = aa[oa], qa = pa.charAt(0) == '.', ra = pa.substring(1);
                        for (ka = 0; ka < ga.length; ka++) {
                            var sa = ga[ka];
                            if (!sa || sa.nodeType !== 1)continue;
                            if (qa) {
                                if (!g.hasClass(sa, ra))delete ga[ka];
                                continue;
                            } else {
                                var ta = pa.slice(1, pa.length - 1);
                                if (ta.indexOf('=') == -1) {
                                    if (!p(sa, ta)) {
                                        delete ga[ka];
                                        continue;
                                    }
                                } else {
                                    var ua = ta.split('='), va = ua[0], wa = ua[1];
                                    wa = wa.slice(1, wa.length - 1);
                                    if (sa.getAttribute(va) != wa) {
                                        delete ga[ka];
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                    for (ka = 0; ka < ga.length; ka++)if (ga[ka]) {
                        y.push(ga[ka]);
                        if (z)break;
                    }
                }
                u = y;
            }
            return u;
        }, getSelection: function () {
            var r = window.getSelection, s = document.selection;
            if (r) {
                return r() + '';
            } else if (s)return s.createRange().text;
            return null;
        }, contains: function (r, s) {
            r = k(r);
            s = k(s);
            typeof r === 'string' || typeof s === 'string';
            return h(r, s);
        }, getRootElement: function () {
            var r = null;
            if (window.Quickling && Quickling.isActive())r = k('content');
            return r || document.body;
        }, isNode: function (r) {
            return n(r);
        }, isNodeOfType: function (r, s) {
            var t = i(s).join('|').toUpperCase().split('|'), u = j(t);
            return n(r) && r.nodeName in u;
        }, isElementNode: function (r) {
            return m(r);
        }, isTextNode: function (r) {
            return o(r);
        }, isInputNode: function (r) {
            return q.isNodeOfType(r, ['input', 'textarea']) || r.contentEditable === 'true';
        }, getDocumentScrollElement: l
    };
    e.exports = q;
}, null);
__d("DOMEvent", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i) {
        "use strict";
        this.event = i || window.event;
        g(typeof(this.event.srcElement) != 'unknown');
        this.target = this.event.target || this.event.srcElement;
    }

    h.prototype.preventDefault = function () {
        "use strict";
        var i = this.event;
        if (i.preventDefault) {
            i.preventDefault();
            if (!('defaultPrevented' in i))i.defaultPrevented = true;
        } else i.returnValue = false;
        return this;
    };
    h.prototype.isDefaultPrevented = function () {
        "use strict";
        var i = this.event;
        return ('defaultPrevented' in i) ? i.defaultPrevented : i.returnValue === false;
    };
    h.prototype.stopPropagation = function () {
        "use strict";
        var i = this.event;
        i.stopPropagation ? i.stopPropagation() : i.cancelBubble = true;
        return this;
    };
    h.prototype.kill = function () {
        "use strict";
        this.stopPropagation().preventDefault();
        return this;
    };
    h.killThenCall = function (i) {
        "use strict";
        return function (j) {
            new h(j).kill();
            return i();
        };
    };
    e.exports = h;
}, null);
__d("Parent", ["CSSCore"], function (a, b, c, d, e, f, g) {
    var h = {
        byTag: function (i, j) {
            j = j.toUpperCase();
            while (i && i.nodeName !== j)i = i.parentNode;
            return i;
        }, byClass: function (i, j) {
            while (i && !g.hasClass(i, j))i = i.parentNode;
            return i;
        }, byAttribute: function (i, j) {
            while (i && (!i.getAttribute || !i.getAttribute(j)))i = i.parentNode;
            return i;
        }
    };
    e.exports = h;
}, null);
__d("UserAgent_DEPRECATED", [], function (a, b, c, d, e, f) {
    var g = false, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;

    function w() {
        if (g)return;
        g = true;
        var y = navigator.userAgent, z = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(y), aa = /(Mac OS X)|(Windows)|(Linux)/.exec(y);
        s = /\b(iPhone|iP[ao]d)/.exec(y);
        t = /\b(iP[ao]d)/.exec(y);
        q = /Android/i.exec(y);
        u = /FBAN\/\w+;/i.exec(y);
        v = /Mobile/i.exec(y);
        r = !!(/Win64/.exec(y));
        if (z) {
            h = z[1] ? parseFloat(z[1]) : (z[5] ? parseFloat(z[5]) : NaN);
            if (h && document && document.documentMode)h = document.documentMode;
            var ba = /(?:Trident\/(\d+.\d+))/.exec(y);
            m = ba ? parseFloat(ba[1]) + 4 : h;
            i = z[2] ? parseFloat(z[2]) : NaN;
            j = z[3] ? parseFloat(z[3]) : NaN;
            k = z[4] ? parseFloat(z[4]) : NaN;
            if (k) {
                z = /(?:Chrome\/(\d+\.\d+))/.exec(y);
                l = z && z[1] ? parseFloat(z[1]) : NaN;
            } else l = NaN;
        } else h = i = j = l = k = NaN;
        if (aa) {
            if (aa[1]) {
                var ca = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(y);
                n = ca ? parseFloat(ca[1].replace('_', '.')) : true;
            } else n = false;
            o = !!aa[2];
            p = !!aa[3];
        } else n = o = p = false;
    }

    var x = {
        ie: function () {
            return w() || h;
        }, ieCompatibilityMode: function () {
            return w() || (m > h);
        }, ie64: function () {
            return x.ie() && r;
        }, firefox: function () {
            return w() || i;
        }, opera: function () {
            return w() || j;
        }, webkit: function () {
            return w() || k;
        }, safari: function () {
            return x.webkit();
        }, chrome: function () {
            return w() || l;
        }, windows: function () {
            return w() || o;
        }, osx: function () {
            return w() || n;
        }, linux: function () {
            return w() || p;
        }, iphone: function () {
            return w() || s;
        }, mobile: function () {
            return w() || (s || t || q || v);
        }, nativeApp: function () {
            return w() || u;
        }, android: function () {
            return w() || q;
        }, ipad: function () {
            return w() || t;
        }
    };
    e.exports = x;
}, null);
__d("wrapFunction", [], function (a, b, c, d, e, f) {
    var g = {};

    function h(i, j, k) {
        j = j || 'default';
        return function () {
            var l = j in g ? g[j](i, k) : i;
            return l.apply(this, arguments);
        };
    }

    h.setWrapper = function (i, j) {
        j = j || 'default';
        g[j] = i;
    };
    e.exports = h;
}, null);
__d("DOMEventListener", ["wrapFunction"], function (a, b, c, d, e, f, g) {
    var h, i;
    if (window.addEventListener) {
        h = function (k, l, m) {
            m.wrapper = g(m, 'entry', 'DOMEventListener.add ' + l);
            k.addEventListener(l, m.wrapper, false);
        };
        i = function (k, l, m) {
            k.removeEventListener(l, m.wrapper, false);
        };
    } else if (window.attachEvent) {
        h = function (k, l, m) {
            m.wrapper = g(m, 'entry', 'DOMEventListener.add ' + l);
            k.attachEvent('on' + l, m.wrapper);
        };
        i = function (k, l, m) {
            k.detachEvent('on' + l, m.wrapper);
        };
    } else i = h = function () {
    };
    var j = {
        add: function (k, l, m) {
            h(k, l, m);
            return {
                remove: function () {
                    i(k, l, m);
                    k = null;
                }
            };
        }, remove: i
    };
    e.exports = j;
}, null);
__d("getObjectValues", [], function (a, b, c, d, e, f) {
    function g(h) {
        var i = [];
        for (var j in h)i.push(h[j]);
        return i;
    }

    e.exports = g;
}, null);
__d("Event", ["Arbiter", "DataStore", "DOMQuery", "DOMEvent", "ErrorUtils", "ExecutionEnvironment", "Parent", "UserAgent_DEPRECATED", "DOMEventListener", "$", "copyProperties", "invariant", "getObjectValues", "event-form-bubbling"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    b('event-form-bubbling');
    var t = a.Event, u = 'Event.listeners';
    if (!t.prototype)t.prototype = {};
    function v(fa) {
        if (fa.type === 'click' || fa.type === 'mouseover' || fa.type === 'keydown')g.inform('Event/stop', {event: fa});
    }

    function w(fa, ga, ha) {
        this.target = fa;
        this.type = ga;
        this.data = ha;
    }

    q(w.prototype, {
        getData: function () {
            this.data = this.data || {};
            return this.data;
        }, stop: function () {
            return t.stop(this);
        }, prevent: function () {
            return t.prevent(this);
        }, isDefaultPrevented: function () {
            return t.isDefaultPrevented(this);
        }, kill: function () {
            return t.kill(this);
        }, getTarget: function () {
            return new j(this).target || null;
        }
    });
    function x(fa) {
        if (fa instanceof w)return fa;
        if (!fa)if (!window.addEventListener && document.createEventObject) {
            fa = window.event ? document.createEventObject(window.event) : {};
        } else fa = {};
        if (!fa._inherits_from_prototype)for (var ga in t.prototype)try {
            fa[ga] = t.prototype[ga];
        } catch (ha) {
        }
        return fa;
    }

    q(t.prototype, {
        _inherits_from_prototype: true, getRelatedTarget: function () {
            var fa = this.relatedTarget || (this.fromElement === this.srcElement ? this.toElement : this.fromElement);
            return fa && fa.nodeType ? fa : null;
        }, getModifiers: function () {
            var fa = {control: !!this.ctrlKey, shift: !!this.shiftKey, alt: !!this.altKey, meta: !!this.metaKey};
            fa.access = n.osx() ? fa.control : fa.alt;
            fa.any = fa.control || fa.shift || fa.alt || fa.meta;
            return fa;
        }, isRightClick: function () {
            if (this.which)return this.which === 3;
            return this.button && this.button === 2;
        }, isMiddleClick: function () {
            if (this.which)return this.which === 2;
            return this.button && this.button === 4;
        }, isDefaultRequested: function () {
            return this.getModifiers().any || this.isMiddleClick() || this.isRightClick();
        }
    });
    q(t.prototype, w.prototype);
    q(t, {
        listen: function (fa, ga, ha, ia) {
            if (!l.canUseDOM)return new ea(ha, na, ga, ia, qa);
            if (typeof fa == 'string')fa = p(fa);
            if (typeof ia == 'undefined')ia = t.Priority.NORMAL;
            if (typeof ga == 'object') {
                var ja = {};
                for (var ka in ga)ja[ka] = t.listen(fa, ka, ga[ka], ia);
                return ja;
            }
            if (ga.match(/^on/i))throw new TypeError("Bad event name `" + ga + "': use `click', not `onclick'.");
            if (fa.nodeName == 'LABEL' && ga == 'click') {
                var la = fa.getElementsByTagName('input');
                fa = la.length == 1 ? la[0] : fa;
            } else if (fa === window && ga === 'scroll') {
                var ma = i.getDocumentScrollElement();
                if (ma !== document.documentElement && ma !== document.body)fa = ma;
            }
            var na = h.get(fa, u, {}), oa = aa[ga];
            if (oa) {
                ga = oa.base;
                if (oa.wrap)ha = oa.wrap(ha);
            }
            ca(fa, na, ga);
            var pa = na[ga];
            if (!(ia in pa))pa[ia] = [];
            var qa = pa[ia].length, ra = new ea(ha, na, ga, ia, qa);
            pa[ia][qa] = ra;
            pa.numHandlers++;
            return ra;
        }, stop: function (fa) {
            var ga = new j(fa).stopPropagation();
            v(ga.event);
            return fa;
        }, prevent: function (fa) {
            new j(fa).preventDefault();
            return fa;
        }, isDefaultPrevented: function (fa) {
            return new j(fa).isDefaultPrevented(fa);
        }, kill: function (fa) {
            var ga = new j(fa).kill();
            v(ga.event);
            return false;
        }, getKeyCode: function (event) {
            event = new j(event).event;
            if (!event)return false;
            switch (event.keyCode) {
                case 63232:
                    return 38;
                case 63233:
                    return 40;
                case 63234:
                    return 37;
                case 63235:
                    return 39;
                case 63272:
                case 63273:
                case 63275:
                    return null;
                case 63276:
                    return 33;
                case 63277:
                    return 34;
            }
            if (event.shiftKey)switch (event.keyCode) {
                case 33:
                case 34:
                case 37:
                case 38:
                case 39:
                case 40:
                    return null;
            }
            return event.keyCode;
        }, getPriorities: function () {
            if (!y) {
                var fa = s(t.Priority);
                fa.sort(function (ga, ha) {
                    return ga - ha;
                });
                y = fa;
            }
            return y;
        }, fire: function (fa, ga, ha) {
            var ia = new w(fa, ga, ha), ja;
            do {
                var ka = t.__getHandler(fa, ga);
                if (ka)ja = ka(ia);
                fa = fa.parentNode;
            } while (fa && ja !== false && !ia.cancelBubble);
            return ja !== false;
        }, __fire: function (fa, ga, event) {
            var ha = t.__getHandler(fa, ga);
            if (ha)return ha(x(event));
        }, __getHandler: function (fa, ga) {
            var ha = h.get(fa, u);
            if (ha && ha[ga])return ha[ga].domHandler;
        }, getPosition: function (fa) {
            fa = new j(fa).event;
            var ga = i.getDocumentScrollElement(), ha = fa.clientX + ga.scrollLeft, ia = fa.clientY + ga.scrollTop;
            return {x: ha, y: ia};
        }
    });
    var y = null, z = function (fa) {
        return function (ga) {
            if (!i.contains(this, ga.getRelatedTarget()))return fa.call(this, ga);
        };
    }, aa;
    if (!window.navigator.msPointerEnabled) {
        aa = {mouseenter: {base: 'mouseover', wrap: z}, mouseleave: {base: 'mouseout', wrap: z}};
    } else aa = {
        mousedown: {base: 'MSPointerDown'},
        mousemove: {base: 'MSPointerMove'},
        mouseup: {base: 'MSPointerUp'},
        mouseover: {base: 'MSPointerOver'},
        mouseout: {base: 'MSPointerOut'},
        mouseenter: {base: 'MSPointerOver', wrap: z},
        mouseleave: {base: 'MSPointerOut', wrap: z}
    };
    if (n.firefox()) {
        var ba = function (fa, event) {
            event = x(event);
            var ga = event.getTarget();
            while (ga) {
                t.__fire(ga, fa, event);
                ga = ga.parentNode;
            }
        };
        document.documentElement.addEventListener('focus', ba.bind(null, 'focusin'), true);
        document.documentElement.addEventListener('blur', ba.bind(null, 'focusout'), true);
    }
    var ca = function (fa, ga, ha) {
        if (ha in ga)return;
        var ia = da.bind(fa, ha);
        ga[ha] = {numHandlers: 0, domHandlerRemover: o.add(fa, ha, ia), domHandler: ia};
        var ja = 'on' + ha;
        if (fa[ja]) {
            var ka = fa === document.documentElement ? t.Priority._BUBBLE : t.Priority.TRADITIONAL, la = fa[ja];
            fa[ja] = null;
            t.listen(fa, ha, la, ka);
        }
        if (fa.nodeName === 'FORM' && ha === 'submit')t.listen(fa, ha, t.__bubbleSubmit.bind(null, fa), t.Priority._BUBBLE);
    }, da = function (fa, event) {
        event = x(event);
        if (!h.get(this, u))throw new Error("Bad listenHandler context.");
        var ga = h.get(this, u)[fa];
        if (!ga)throw new Error("No registered handlers for `" + fa + "'.");
        if (fa == 'click') {
            var ha = m.byTag(event.getTarget(), 'a');
            if (window.clickRefAction)window.clickRefAction('click', ha, event);
        }
        var ia = t.getPriorities();
        for (var ja = 0; ja < ia.length; ja++) {
            var ka = ia[ja];
            if (ka in ga) {
                var la = ga[ka];
                for (var ma = 0; ma < la.length; ma++) {
                    if (!la[ma])continue;
                    var na = la[ma].fire(this, event);
                    if (na === false) {
                        return event.kill();
                    } else if (event.cancelBubble)event.stop();
                }
            }
        }
        return event.returnValue;
    };
    t.Priority = {URGENT: -20, TRADITIONAL: -10, NORMAL: 0, _BUBBLE: 1000};
    function ea(fa, ga, ha, ia, ja) {
        this._handler = fa;
        this._handlers = ga;
        this._type = ha;
        this._priority = ia;
        this._id = ja;
    }

    q(ea.prototype, {
        remove: function () {
            if (l.canUseDOM) {
                r(this._handlers);
                var fa = this._handlers[this._type];
                if (fa.numHandlers <= 1) {
                    fa.domHandlerRemover.remove();
                    delete this._handlers[this._type];
                } else {
                    delete fa[this._priority][this._id];
                    fa.numHandlers--;
                }
                this._handlers = null;
            }
        }, fire: function (fa, event) {
            if (l.canUseDOM)return k.applyWithGuard(this._handler, fa, [event], function (ga) {
                ga.event_type = event.type;
                ga.dom_element = fa.name || fa.id;
                ga.category = 'eventhandler';
            });
            return true;
        }
    });
    a.$E = t.$E = x;
    e.exports = t;
}, null);
__d("performanceAbsoluteNow", ["performance"], function (a, b, c, d, e, f, g) {
    var h;
    if (g.now && g.timing && g.timing.navigationStart) {
        var i = g.timing.navigationStart;
        h = function () {
            return g.now.apply(g, arguments) + i;
        };
    } else h = Date.now.bind(Date);
    e.exports = h;
}, null);
__d("TimeSlice", ["ErrorUtils", "LogBuffer", "invariant", "performanceAbsoluteNow", "wrapFunction"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = false, m, n = [], o, p = {
        guard: function (q, r) {
            var s = 'TimeSlice' + (r ? ': ' + r : ''), t = 'TimeSlice Task' + (r ? ': ' + r : '');
            return function () {
                var u = j(), v, w;
                if (l)return q.apply(this, arguments);
                l = true;
                m = r;
                n.length = 0;
                o = 0;
                w = g.applyWithGuard(q, this, arguments, null, s);
                while (n.length > 0) {
                    var x = n.shift();
                    o = x.depth;
                    g.applyWithGuard(x.fn, a, null, null, t);
                }
                l = false;
                v = j();
                h.write('time_slice', Object.assign({begin: u, end: v, guard: r}, q.__SMmeta));
                return w;
            };
        }, enqueue: function (q) {
            i(l);
            i(o < 1000);
            n.push({fn: q, depth: o + 1});
        }, inGuard: function () {
            return l;
        }
    };
    k.setWrapper(p.guard, 'entry');
    a.TimeSlice = p;
    e.exports = p;
}, null);
__d("setIntervalAcrossTransitions", ["TimeSlice"], function (a, b, c, d, e, f, g) {
    var h = a.setInterval;
    e.exports = function () {
        for (var i = [], j = 0, k = arguments.length; j < k; j++)i.push(arguments[j]);
        i[0] = g.guard(i[0], 'setInterval');
        return Function.prototype.apply.call(h, a, i);
    };
}, null);
__d("CSSLoader", ["CSSLoaderConfig", "isEmpty", "setIntervalAcrossTransitions"], function (a, b, c, d, e, f, g, h, i) {
    var j = 20, k = g.timeout, l, m, n = {}, o = [], p, q = {};

    function r(v) {
        if (m)return;
        m = true;
        var w = document.createElement('link');
        w.onload = function () {
            l = true;
            w.parentNode.removeChild(w);
        };
        w.rel = 'stylesheet';
        w.href = 'data:text/css;base64,';
        v.appendChild(w);
    }

    function s() {
        var v, w = [], x = [];
        if (Date.now() >= p) {
            for (v in q) {
                x.push(q[v].signal);
                w.push(q[v].error);
            }
            q = {};
        } else for (v in q) {
            var y = q[v].signal, z = window.getComputedStyle ? getComputedStyle(y, null) : y.currentStyle;
            if (z && parseInt(z.height, 10) > 1) {
                w.push(q[v].load);
                x.push(y);
                delete q[v];
            }
        }
        for (var aa = 0; aa < x.length; aa++)x[aa].parentNode.removeChild(x[aa]);
        if (!h(w)) {
            for (aa = 0; aa < w.length; aa++)w[aa]();
            p = Date.now() + k;
        }
        return h(q);
    }

    function t(v, w, x, y) {
        var z = document.createElement('meta');
        z.id = 'bootloader_' + v.replace(/[^a-z0-9]/ig, '_');
        w.appendChild(z);
        var aa = !h(q);
        p = Date.now() + k;
        q[v] = {signal: z, load: x, error: y};
        if (!aa)var ba = i(function ca() {
            if (s())clearInterval(ba);
        }, j);
    }

    var u = {
        loadStyleSheet: function (v, w, x, y, z) {
            if (n[v])throw new Error('CSS component ' + v + ' has already been requested.');
            if (document.createStyleSheet) {
                var aa;
                for (var ba = 0; ba < o.length; ba++)if (o[ba].imports.length < 31) {
                    aa = ba;
                    break;
                }
                if (aa === (void 0)) {
                    try {
                        o.push(document.createStyleSheet());
                    } catch (ca) {
                        z();
                        return;
                    }
                    aa = o.length - 1;
                }
                o[aa].addImport(w);
                n[v] = {styleSheet: o[aa], uri: w};
                t(v, x, y, z);
                return;
            }
            var da = document.createElement('link');
            da.rel = 'stylesheet';
            da.type = 'text/css';
            da.href = w;
            n[v] = {link: da};
            if (l) {
                da.onload = function () {
                    da.onload = da.onerror = null;
                    y();
                };
                da.onerror = function () {
                    da.onload = da.onerror = null;
                    z();
                };
            } else {
                t(v, x, y, z);
                if (l === (void 0))r(x);
            }
            x.appendChild(da);
        }, registerLoadedStyleSheet: function (v, w) {
            if (n[v])throw new Error('CSS component ' + v + ' has been requested and should not be ' + 'loaded more than once.');
            n[v] = {link: w};
        }, unloadStyleSheet: function (v) {
            if (!v in n)return;
            var w = n[v], x = w.link;
            if (x) {
                x.onload = x.onerror = null;
                x.parentNode.removeChild(x);
            } else {
                var y = w.styleSheet;
                for (var z = 0; z < y.imports.length; z++)if (y.imports[z].href == w.uri) {
                    y.removeImport(z);
                    break;
                }
            }
            delete q[v];
            delete n[v];
        }
    };
    e.exports = u;
}, null);
__d("setTimeoutAcrossTransitions", ["TimeSlice"], function (a, b, c, d, e, f, g) {
    var h = a.setTimeout;
    e.exports = function () {
        for (var i = [], j = 0, k = arguments.length; j < k; j++)i.push(arguments[j]);
        i[0] = g.guard(i[0], 'setTimeout');
        return Function.prototype.apply.call(h, a, i);
    };
}, null);
__d("Bootloader", ["BootloaderConfig", "CSSLoader", "CallbackDependencyManager", "TimeSlice", "setTimeoutAcrossTransitions", "ErrorUtils", "ex"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {}, o = {}, p = {}, q = {}, r = null, s = {}, t = {}, u = {}, v = {}, w = {}, x = {}, y = false, z = [], aa = new i(), ba = Date.now();
    l.addListener(function (na) {
        na.loadingUrls = Object.keys(t);
    }, true);
    function ca(na) {
        var oa = new Error(na);
        oa.guard = 'Bootloader';
        l.reportError(oa);
    }

    function da() {
        return document.documentMode || +(/MSIE.(\d+)/.exec(navigator.userAgent) || [])[1];
    }

    function ea(na) {
        return Array.isArray(na) ? na : [na];
    }

    function fa() {
        if (!g.retry_on_timeout || !g.is_not_mobile || da() || !g.timeout || g.timeout < 0)return false;
        return true;
    }

    function ga(na, oa, pa, qa) {
        var ra = document.createElement('script');
        ra.src = na;
        ra.async = true;
        var sa = s[oa];
        if (sa && sa.crossOrigin)ra.crossOrigin = 'anonymous';
        ra.onload = j.guard(pa, 'Bootloader script.onload');
        ra.onerror = j.guard(function () {
            v[na] = true;
            pa();
        }, 'Bootloader script.onerror');
        ra.onreadystatechange = j.guard(function () {
            if (this.readyState in {loaded: 1, complete: 1})pa();
        }, 'Bootloader script.onreadystatechange');
        qa.appendChild(ra);
        return ra;
    }

    function ha(na, oa, pa, qa) {
        var ra = ma.done.bind(null, [pa], oa);
        t[oa] = Date.now();
        if (na == 'js') {
            var sa = ga(oa, pa, ra, qa);
            if (fa())q[oa] = k(function () {
                delete q[oa];
                if (r) {
                    if (sa.parentNode && sa.parentNode === r)r.removeChild(sa);
                    w[oa] = Date.now();
                    ga(oa, pa, ra, r);
                }
            }, g.timeout);
        } else if (na == 'css')h.loadStyleSheet(pa, oa, qa, ra, function () {
            ca(m('CSS timeout [%s] at %s', pa, oa));
            v[oa] = true;
            ra();
        });
    }

    function ia(na) {
        if (!s[na]) {
            ca(m('Missing unloading resource %s', na));
            return;
        }
        if (s[na].type == 'css') {
            h.unloadStyleSheet(na);
            delete n[na];
            aa.unsatisfyPersistentDependency(na);
        }
    }

    function ja(na, oa) {
        if (!y) {
            z.push([na, oa]);
            return;
        }
        na = ea(na);
        var pa = [];
        for (var qa = 0; qa < na.length; ++qa) {
            if (!na[qa]) {
                ca(m('Empty component!'));
                continue;
            }
            var ra = p[na[qa]];
            if (ra) {
                var sa = ra.resources;
                for (var ta = 0; ta < sa.length; ++ta)pa.push(sa[ta]);
            }
        }
        ma.loadResources(pa, oa);
    }

    function ka(na) {
        if (na) {
            n[na] = true;
        } else ca(m('Making an empty resource (%s) as requested', typeof na));
    }

    function la(na) {
        if (!na)return [];
        var oa = [];
        for (var pa = 0; pa < na.length; ++pa)if (typeof na[pa] == 'string') {
            if (na[pa] in s) {
                oa.push(s[na[pa]]);
            } else ca(m('Unable to resolve resource %s.', na[pa]));
        } else oa.push(na[pa]);
        return oa;
    }

    var ma = {
        configurePage: function (na) {
            var oa = {}, pa = la(na), qa;
            for (qa = 0; qa < pa.length; qa++) {
                oa[pa[qa].src] = pa[qa];
                ka(pa[qa].name);
            }
            var ra = document.getElementsByTagName('link'), sa = 0;
            for (qa = 0; qa < ra.length; ++qa) {
                if (ra[qa].rel != 'stylesheet')continue;
                for (var ta in oa)if (ra[qa].href.indexOf(ta) !== -1) {
                    var ua = oa[ta].name;
                    if (oa[ta].permanent)o[ua] = true;
                    delete oa[ta];
                    h.registerLoadedStyleSheet(ua, ra[qa]);
                    ma.done([ua]);
                    sa++;
                    break;
                }
            }
            if (sa != pa.length)ca(m('configurePage: Found %s out of %s items', sa, pa.length));
        }, loadComponents: function (na, oa) {
            na = ea(na);
            var pa = [];
            for (var qa = 0; qa < na.length; qa++) {
                var ra = p[na[qa]], sa = 'legacy:' + na[qa];
                if (p[sa]) {
                    if (ra)ca(m('%s has a conflicting legacy component. That cannot happen ' + 'and legacy won btw.', na[qa]));
                    na[qa] = sa;
                    pa.push(sa);
                    continue;
                }
                if (!ra) {
                    ca(m('loadComponents: %s is not in the component map.', na[qa]));
                } else if (ra.module) {
                    pa.push(na[qa]);
                    ca(m('loadComponents: Loading module %s!', na[qa]));
                }
            }
            ja(na, pa.length ? d.bind(null, pa, oa) : oa);
        }, loadModules: function (na, oa) {
            var pa = [];
            for (var qa = 0; qa < na.length; qa++) {
                var ra = p[na[qa]];
                if (!ra) {
                    ca(m('loadModules: %s is not in the component map.', na[qa]));
                    pa.push(na[qa]);
                } else if (ra.module) {
                    pa.push(na[qa]);
                } else {
                    var sa = ra.resources, ta = true;
                    for (var ua = 0; ua < sa.length; ua++) {
                        var va = s[sa[ua]];
                        if (!va || va.type != 'css')ta = false;
                    }
                    if (!ta)ca(m('loadModules: %s is not a module!', na[qa]));
                }
            }
            ja(na, d.bind(null, pa, oa));
        }, loadResources: function (na, oa, pa, qa) {
            var ra;
            na = la(ea(na));
            if (pa) {
                var sa = {};
                for (ra = 0; ra < na.length; ++ra)sa[na[ra].name] = true;
                for (var ta in n)if (!(ta in o) && !(ta in sa) && !(ta in x))ia(ta);
                x = {};
            }
            var ua = [], va = [];
            for (ra = 0; ra < na.length; ++ra) {
                var wa = na[ra];
                if (wa.permanent)o[wa.name] = true;
                if (aa.isPersistentDependencySatisfied(wa.name))continue;
                if (!wa.nonblocking)va.push(wa.name);
                if (!n[wa.name]) {
                    ka(wa.name);
                    ua.push(wa);
                    window.CavalryLogger && window.CavalryLogger.getInstance().measureResources(wa, qa);
                }
            }
            var xa;
            if (oa)if (typeof oa === 'function') {
                xa = aa.registerCallback(oa, va);
            } else xa = aa.addDependenciesToExistingCallback(oa, va);
            var ya = ma.getHardpoint(), za = da() ? ya : document.createDocumentFragment();
            for (ra = 0; ra < ua.length; ++ra)ha(ua[ra].type, ua[ra].src, ua[ra].name, za);
            if (ya !== za)ya.appendChild(za);
            return xa;
        }, requestJSResource: function (na) {
            var oa = ma.getHardpoint();
            ha('js', na, null, oa);
        }, done: function (na, oa) {
            if (oa) {
                u[oa] = Date.now() - t[oa];
                delete t[oa];
                if (q[oa]) {
                    clearTimeout(q[oa]);
                    delete q[oa];
                }
            }
            if (window.CavalryLogger)window.CavalryLogger.done_js(na);
            for (var pa = 0; pa < na.length; ++pa) {
                var qa = na[pa];
                if (qa) {
                    ka(qa);
                    aa.satisfyPersistentDependency(qa);
                }
            }
        }, enableBootload: function (na) {
            for (var oa in na)if (!p[oa])p[oa] = na[oa];
            if (!y) {
                y = true;
                for (var pa = 0; pa < z.length; pa++)ja.apply(null, z[pa]);
                z = [];
            }
        }, getHardpoint: function () {
            if (!r) {
                var na = document.getElementsByTagName('head');
                r = na.length && na[0] || document.body;
            }
            return r;
        }, setResourceMap: function (na) {
            for (var oa in na)if (!s[oa]) {
                na[oa].name = oa;
                s[oa] = na[oa];
            }
        }, getResourceURLs: function () {
            var na = {};
            for (var oa in s) {
                var pa = s[oa].src;
                na[pa] = (oa in n) && !(pa in v) && !(pa in t);
            }
            return na;
        }, getResourceHashes: function () {
            return Object.assign({}, s);
        }, loadEarlyResources: function (na) {
            ma.setResourceMap(na);
            var oa = [];
            for (var pa in na) {
                var qa = s[pa];
                oa.push(qa);
                if (!qa.permanent)x[qa.name] = qa;
            }
            ma.loadResources(oa);
        }, getLoadingUrls: function () {
            var na = {}, oa = Date.now();
            for (var pa in t)na[pa] = oa - t[pa];
            return na;
        }, getLoadedUrlTimes: function () {
            return u;
        }, getErrorUrls: function () {
            return Object.keys(v);
        }, getStartTime: function () {
            return ba;
        }, getRetriedUrls: function () {
            return Object.keys(w);
        }, __debug: {callbackManager: aa, componentMap: p, requested: n, resources: s}
    };
    e.exports = ma;
}, null);
__d("DTSG", ["DTSGInitialData"], function (a, b, c, d, e, f, g) {
    var h = g.token || null, i = {
        setToken: function (j) {
            h = j;
        }, getToken: function () {
            return h;
        }
    };
    e.exports = i;
}, null);
__d("AsyncResponse", ["Bootloader", "DTSG", "SiteData", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(l, m) {
        "use strict";
        j(this, {
            error: 0,
            errorSummary: null,
            errorDescription: null,
            onload: null,
            replay: false,
            payload: m || null,
            request: l || null,
            silentError: false,
            transientError: false,
            blockedAction: false,
            is_last: true
        });
        return this;
    }

    k.prototype.getRequest = function () {
        "use strict";
        return this.request;
    };
    k.prototype.getPayload = function () {
        "use strict";
        return this.payload;
    };
    k.prototype.getError = function () {
        "use strict";
        return this.error;
    };
    k.prototype.getErrorSummary = function () {
        "use strict";
        return this.errorSummary;
    };
    k.prototype.setErrorSummary = function (l) {
        "use strict";
        l = (l === (void 0) ? null : l);
        this.errorSummary = l;
        return this;
    };
    k.prototype.getErrorDescription = function () {
        "use strict";
        return this.errorDescription;
    };
    k.prototype.getErrorIsWarning = function () {
        "use strict";
        return !!this.errorIsWarning;
    };
    k.prototype.isTransient = function () {
        "use strict";
        return !!this.transientError;
    };
    k.prototype.isBlockedAction = function () {
        "use strict";
        return !!this.blockedAction;
    };
    k.prototype.logError = function (l, m) {
        "use strict";
        var n = a.ErrorSignal;
        if (n) {
            var o = {err_code: this.error, vip: (i.vip || '-')};
            if (m) {
                o.duration = m.duration;
                o.xfb_ip = m.xfb_ip;
            }
            var p = this.request.getURI();
            o.path = p || '-';
            o.aid = this.request.userActionID;
            if (p && p.indexOf('scribe_endpoint.php') != -1)l = 'async_error_double';
            n.sendErrorSignal(l, JSON.stringify(o));
        }
    };
    k.prototype.logErrorByGroup = function (l, m) {
        "use strict";
        if (Math.floor(Math.random() * m) === 0)if (this.error == 1357010 || this.error < 15000) {
            this.logError('async_error_oops_' + l);
        } else this.logError('async_error_logic_' + l);
    };
    k.defaultErrorHandler = function (l) {
        "use strict";
        try {
            if (!l.silentError) {
                k.verboseErrorHandler(l);
            } else l.logErrorByGroup('silent', 10);
        } catch (m) {
            alert(l);
        }
    };
    k.verboseErrorHandler = function (l) {
        "use strict";
        g.loadModules(["ExceptionDialog"], function (m) {
            return m.showAsyncError(l);
        });
    };
    k.renewDTSG = function (l) {
        "use strict";
        h.setToken(l);
    };
    e.exports = k;
}, null);
__d("HTTPErrors", ["emptyFunction"], function (a, b, c, d, e, f, g) {
    var h = {get: g, getAll: g};
    e.exports = h;
}, null);
__d("JSCC", [], function (a, b, c, d, e, f) {
    var g = {};

    function h(j) {
        var k, l = false;
        return function () {
            if (!l) {
                k = j();
                l = true;
            }
            return k;
        };
    }

    var i = {
        get: function (j) {
            if (!g[j])throw new Error('JSCC entry is missing');
            return g[j]();
        }, init: function (j) {
            for (var k in j)g[k] = h(j[k]);
            return function l() {
                for (var m in j)delete g[m];
            };
        }
    };
    e.exports = i;
}, null);
__d("PHPQuerySerializer", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(o) {
        return i(o, null);
    }

    function i(o, p) {
        p = p || '';
        var q = [];
        if (o === null || o === (void 0)) {
            q.push(j(p));
        } else if (typeof(o) == 'object') {
            g(!(('nodeName' in o) || ('nodeType' in o)));
            for (var r in o)if (o.hasOwnProperty(r) && o[r] !== (void 0))q.push(i(o[r], p ? (p + '[' + r + ']') : r));
        } else q.push(j(p) + '=' + j(o));
        return q.join('&');
    }

    function j(o) {
        return encodeURIComponent(o).replace(/%5D/g, "]").replace(/%5B/g, "[");
    }

    var k = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;

    function l(o) {
        if (!o)return {};
        var p = {};
        o = o.replace(/%5B/ig, '[').replace(/%5D/ig, ']');
        o = o.split('&');
        var q = Object.prototype.hasOwnProperty;
        for (var r = 0, s = o.length; r < s; r++) {
            var t = o[r].match(k);
            if (!t) {
                var u = o[r].split('=');
                p[m(u[0])] = u[1] === (void 0) ? null : m(u[1]);
            } else {
                var v = t[2].split(/\]\[|\[|\]/).slice(0, -1), w = t[1], x = m(t[3] || '');
                v[0] = w;
                var y = p;
                for (var z = 0; z < v.length - 1; z++)if (v[z]) {
                    if (!q.call(y, v[z])) {
                        var aa = v[z + 1] && !v[z + 1].match(/^\d{1,3}$/) ? {} : [];
                        y[v[z]] = aa;
                        if (y[v[z]] !== aa)return p;
                    }
                    y = y[v[z]];
                } else {
                    if (v[z + 1] && !v[z + 1].match(/^\d{1,3}$/)) {
                        y.push({});
                    } else y.push([]);
                    y = y[y.length - 1];
                }
                if (y instanceof Array && v[v.length - 1] === '') {
                    y.push(x);
                } else y[v[v.length - 1]] = x;
            }
        }
        return p;
    }

    function m(o) {
        return decodeURIComponent(o.replace(/\+/g, ' '));
    }

    var n = {serialize: h, encodeComponent: j, deserialize: l, decodeComponent: m};
    e.exports = n;
}, null);
__d("PageEvents", [], function (a, b, c, d, e, f) {
    var g = {
        NATIVE_ONLOAD: 'onload/onload',
        BIGPIPE_ONLOAD: 'onload/onload_callback',
        AJAXPIPE_ONLOAD: 'ajaxpipe/onload_callback',
        NATIVE_DOMREADY: 'onload/dom_content_ready',
        BIGPIPE_DOMREADY: 'onload/domcontent_callback',
        AJAXPIPE_DOMREADY: 'ajaxpipe/domcontent_callback',
        NATIVE_ONBEFOREUNLOAD: 'onload/beforeunload',
        NATIVE_ONUNLOAD: 'onload/unload',
        AJAXPIPE_ONUNLOAD: 'onload/exit'
    };
    e.exports = g;
}, null);
__d("Run", ["Arbiter", "ExecutionEnvironment", "PageEvents"], function (a, b, c, d, e, f, g, h, i) {
    var j = 'onunloadhooks', k = 'onafterunloadhooks', l = g.BEHAVIOR_STATE;

    function m(ca) {
        var da = a.CavalryLogger;
        da && da.getInstance().setTimeStamp(ca);
    }

    function n() {
        return !window.loading_page_chrome;
    }

    function o(ca) {
        var da = a.PageHooks;
        if (window.domready && da) {
            da.runHook(ca, 'domreadyhooks:late');
        } else v('domreadyhooks', ca);
    }

    function p(ca) {
        var da = a.PageHooks;
        if (window.loaded && da) {
            setTimeout(function () {
                da.runHook(ca, 'onloadhooks:late');
            }, 0);
        } else v('onloadhooks', ca);
    }

    function q(ca, da) {
        if (da === (void 0))da = n();
        da ? v('onbeforeleavehooks', ca) : v('onbeforeunloadhooks', ca);
    }

    function r(ca, da) {
        if (!window.onunload)window.onunload = function () {
            g.inform(i.NATIVE_ONUNLOAD, true, l);
        };
        v(ca, da);
    }

    function s(ca) {
        r(j, ca);
    }

    function t(ca) {
        r(k, ca);
    }

    function u(ca) {
        v('onleavehooks', ca);
    }

    function v(ca, da) {
        window[ca] = (window[ca] || []).concat(da);
    }

    function w(ca) {
        window[ca] = [];
    }

    function x() {
        g.inform(i.NATIVE_DOMREADY, true, l);
    }

    a._domcontentready = x;
    function y() {
        var ca = document, da = window;
        if (ca.addEventListener) {
            var ea = /AppleWebKit.(\d+)/.exec(navigator.userAgent);
            if (ea && ea[1] < 525) {
                var fa = setInterval(function () {
                    if (/loaded|complete/.test(ca.readyState)) {
                        x();
                        clearInterval(fa);
                    }
                }, 10);
            } else ca.addEventListener("DOMContentLoaded", x, true);
        } else {
            var ga = 'javascript:void(0)';
            if (da.location.protocol == 'https:')ga = '//:';
            ca.write('<script onreadystatechange="if (this.readyState==\'complete\') {' + 'this.parentNode.removeChild(this);_domcontentready();}" ' + 'defer="defer" src="' + ga + '"><\/script\>');
        }
        var ha = da.onload;
        da.onload = function () {
            m('t_layout');
            ha && ha();
            g.inform(i.NATIVE_ONLOAD, true, l);
        };
        da.onbeforeunload = function () {
            var ia = {};
            g.inform(i.NATIVE_ONBEFOREUNLOAD, ia, l);
            if (!ia.warn)g.inform(i.AJAXPIPE_ONUNLOAD, true);
            return ia.warn;
        };
    }

    var z = g.registerCallback(function () {
        m('t_onload');
        g.inform(i.BIGPIPE_ONLOAD, true, l);
    }, [i.NATIVE_ONLOAD]), aa = g.registerCallback(function () {
        m('t_domcontent');
        var ca = {timeTriggered: Date.now()};
        g.inform(i.BIGPIPE_DOMREADY, ca, l);
    }, [i.NATIVE_DOMREADY]);
    if (h.canUseDOM)y();
    var ba = {
        onLoad: o,
        onAfterLoad: p,
        onLeave: u,
        onBeforeUnload: q,
        onUnload: s,
        onAfterUnload: t,
        __domContentCallback: aa,
        __onloadCallback: z,
        __removeHook: w
    };
    e.exports = ba;
}, null);
__d("BitMap", [], function (a, b, c, d, e, f) {
    var g = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

    function h() {
        "use strict";
        this.$BitMap0 = [];
    }

    h.prototype.set = function (k) {
        "use strict";
        this.$BitMap0[k] = 1;
        return this;
    };
    h.prototype.toString = function () {
        "use strict";
        var k = [];
        for (var l = 0; l < this.$BitMap0.length; l++)k.push(this.$BitMap0[l] ? 1 : 0);
        return k.length ? j(k.join('')) : '';
    };
    h.prototype.toCompressedString = function () {
        "use strict";
        if (this.$BitMap0.length === 0)return '';
        var k = [], l = 1, m = this.$BitMap0[0] || 0, n = m.toString(2);
        for (var o = 1; o < this.$BitMap0.length; o++) {
            var p = this.$BitMap0[o] || 0;
            if (p === m) {
                l++;
            } else {
                k.push(i(l));
                m = p;
                l = 1;
            }
        }
        if (l)k.push(i(l));
        return j(n + k.join(''));
    };
    function i(k) {
        var l = k.toString(2), m = '0'.repeat(l.length - 1);
        return m + l;
    }

    function j(k) {
        var l = (k + '00000').match(/[01]{6}/g), m = '';
        for (var n = 0; n < l.length; n++)m += g[parseInt(l[n], 2)];
        return m;
    }

    e.exports = h;
}, null);
__d("replaceTransportMarkers", ["ge"], function (a, b, c, d, e, f, g) {
    function h(i, j, k) {
        var l = (typeof k !== 'undefined') ? j[k] : j, m;
        if (Array.isArray(l)) {
            for (m = 0; m < l.length; m++)h(i, l, m);
        } else if (l && typeof l == 'object')if (l.__m) {
            j[k] = b.call(null, l.__m);
        } else if (l.__e) {
            j[k] = g(l.__e);
        } else if (l.__rel) {
            j[k] = i;
        } else for (var n in l)h(i, l, n);
    }

    e.exports = h;
}, null);
__d("ServerJSDefine", ["BitMap", "replaceTransportMarkers"], function (a, b, c, d, e, f, g, h) {
    var i = new g(), j = {
        getLoadedModuleHash: function () {
            return i.toCompressedString();
        }, handleDefine: function (k, l, m, n, o) {
            i.set(n);
            define(k, l, function () {
                h(o, m);
                return m;
            });
        }, handleDefines: function (k, l) {
            k.map(function (m) {
                if (l)m.push(l);
                j.handleDefine.apply(null, m);
            });
        }
    };
    e.exports = j;
}, null);
__d("ServerJS", ["ErrorUtils", "EventEmitter", "ServerJSDefine", "ex", "ge", "replaceTransportMarkers"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = 0, n = new h(), o = 0;

    function p() {
        "use strict";
        this.$ServerJS0 = {};
        this.$ServerJS1 = null;
        this.$ServerJS2 = {};
    }

    p.prototype.handle = function (t) {
        "use strict";
        if (t.__guard)throw new Error('ServerJS.handle called on data that has already been handled');
        t.__guard = true;
        q(t.define || [], this.$ServerJS3, this);
        q(t.markup || [], this.$ServerJS4, this);
        q(t.elements || [], this.$ServerJS5, this);
        q(t.instances || [], this.$ServerJS6, this);
        var u = q(t.require || [], this.$ServerJS7, this);
        return {
            cancel: function () {
                for (var v = 0; v < u.length; v++)if (u[v])u[v].cancel();
            }
        };
    };
    p.prototype.handlePartial = function (t) {
        "use strict";
        (t.instances || []).forEach(r.bind(null, this.$ServerJS0, 3));
        (t.markup || []).forEach(r.bind(null, this.$ServerJS0, 2));
        (t.elements || []).forEach(r.bind(null, this.$ServerJS0, 2));
        return this.handle(t);
    };
    p.prototype.setRelativeTo = function (t) {
        "use strict";
        this.$ServerJS1 = t;
        return this;
    };
    p.prototype.cleanup = function () {
        "use strict";
        var t = [];
        for (var u in this.$ServerJS0)t.push(u);
        d.call(null, t, s);
        this.$ServerJS0 = {};
        function v(x) {
            var y = this.$ServerJS2[x], z = y[0], aa = y[1];
            delete this.$ServerJS2[x];
            var ba = aa ? 'JS::call("' + z + '", "' + aa + '", ...)' : 'JS::requireModule("' + z + '")', ca = ba + ' did not fire because it has missing dependencies.';
            throw new Error(ca);
        }

        for (var w in this.$ServerJS2)g.applyWithGuard(v, this, [w], null, 'ServerJS:cleanup' + ' id: ' + w);
    };
    p.prototype.$ServerJS3 = function (t, u, v, w) {
        "use strict";
        return g.applyWithGuard(i.handleDefine, i, [t, u, v, w, this.$ServerJS1], null, 'JS::define');
    };
    p.prototype.$ServerJS7 = function (t, u, v, w) {
        "use strict";
        return g.applyWithGuard(this.$ServerJS8, this, [t, u, v, w], null, u ? 'JS::call' : 'JS::requireModule');
    };
    p.prototype.$ServerJS8 = function (t, u, v, w) {
        "use strict";
        var x = [t].concat(v || []), y = (u ? '__call__' : '__requireModule__') + m++;
        this.$ServerJS2[y] = [t, u];
        return define(y, x, g.guard(function (z) {
            delete this.$ServerJS2[y];
            w && l(this.$ServerJS1, w);
            if (u) {
                if (!z[u])throw new TypeError(j('Module %s has no method "%s"', t, u));
                var aa = {moduleName: t, method: u, sourceMeta: z[u].__SMmeta};
                n.emit(p.PRE_JS_CALL, o, aa);
                z[u].apply(z, w || []);
                n.emit(p.POST_JS_CALL, o, aa);
                o++;
            }
        }.bind(this), u ? "JS::call('" + t + "', '" + u + "', ...)" : "JS::requireModule('" + t + "')"), 1, this, 1);
    };
    p.prototype.$ServerJS6 = function (t, u, v, w) {
        "use strict";
        return g.applyWithGuard(this.$ServerJS9, this, [t, u, v, w], null, 'JS::instance');
    };
    p.prototype.$ServerJS9 = function (t, u, v, w) {
        "use strict";
        var x = null;
        if (u)x = function (y) {
            l(this.$ServerJS1, v);
            var z = Object.create(y.prototype);
            y.apply(z, v);
            return z;
        }.bind(this);
        define(t, u, x, 0, null, w);
    };
    p.prototype.$ServerJS4 = function (t, u, v) {
        "use strict";
        return g.applyWithGuard(this.$ServerJSa, this, [t, u, v], null, 'JS::markup');
    };
    p.prototype.$ServerJSa = function (t, u, v) {
        "use strict";
        define(t, ['HTML'], function (w) {
            return w.replaceJSONWrapper(u).getRootNode();
        }, 0, null, v);
    };
    p.prototype.$ServerJS5 = function (t, u, v, w) {
        "use strict";
        return g.applyWithGuard(this.$ServerJSb, this, [t, u, v, w], null, 'JS::element');
    };
    p.prototype.$ServerJSb = function (t, u, v, w) {
        "use strict";
        if (u === null && v) {
            define(t, null, null, 0, null, v);
            return;
        }
        var x = [], y = 0;
        if (w) {
            x.push(w);
            y = 1;
            v++;
        }
        define(t, x, function (z) {
            var aa = k(u, z);
            if (!aa) {
                var ba = 'Could not find element "%s"';
                throw new Error(j(ba, u));
            }
            return aa;
        }, y, null, v);
    };
    p.PRE_JS_CALL = 'pre-js-call';
    p.POST_JS_CALL = 'post-js-call';
    p.addListener = n.addListener.bind(n);
    function q(t, u, v) {
        return t.map(function (w) {
            u.apply(v, w);
        });
    }

    function r(t, u, v) {
        var w = v[0];
        if (!(w in t))v[u] = (v[u] || 0) + 1;
        t[w] = true;
    }

    function s() {
        return {};
    }

    e.exports = p;
}, null);
__d("URIRFC3986", [], function (a, b, c, d, e, f) {
    var g = new RegExp('^' + '([^:/?#]+:)?' + '(//' + '([^\\\\/?#@]*@)?' + '(' + '\\[[A-Fa-f0-9:.]+\\]|' + '[^\\/?#:]*' + ')' + '(:[0-9]*)?' + ')?' + '([^?#]*)' + '(\\?[^#]*)?' + '(#.*)?'), h = {
        parse: function (i) {
            if (i.trim() === '')return null;
            var j = i.match(g), k = {};
            k.uri = j[0] ? j[0] : null;
            k.scheme = j[1] ? j[1].substr(0, j[1].length - 1) : null;
            k.authority = j[2] ? j[2].substr(2) : null;
            k.userinfo = j[3] ? j[3].substr(0, j[3].length - 1) : null;
            k.host = j[2] ? j[4] : null;
            k.port = j[5] ? (j[5].substr(1) ? parseInt(j[5].substr(1), 10) : null) : null;
            k.path = j[6] ? j[6] : null;
            k.query = j[7] ? j[7].substr(1) : null;
            k.fragment = j[8] ? j[8].substr(1) : null;
            k.isGenericURI = k.authority === null && !!k.scheme;
            return k;
        }
    };
    e.exports = h;
}, null);
__d("URISchemes", ["createObjectFrom"], function (a, b, c, d, e, f, g) {
    var h = g(['fb', 'fb-ama', 'fb-messenger', 'fbcf', 'fbconnect', 'fbrpc', 'file', 'ftp', 'http', 'https', 'mailto', 'ms-app', 'itms', 'itms-apps', 'itms-services', 'market', 'svn+ssh', 'fbstaging', 'tel', 'sms', 'pebblejs']), i = {
        isAllowed: function (j) {
            if (!j)return true;
            return h.hasOwnProperty(j.toLowerCase());
        }
    };
    e.exports = i;
}, null);
__d("URIBase", ["URIRFC3986", "URISchemes", "copyProperties", "ex", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' + '\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' + '\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'), m = new RegExp('^(?:[^/]*:|' + '[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');

    function n(q, r, s, t) {
        if (!r)return true;
        if (r instanceof p) {
            q.setProtocol(r.getProtocol());
            q.setDomain(r.getDomain());
            q.setPort(r.getPort());
            q.setPath(r.getPath());
            q.setQueryData(t.deserialize(t.serialize(r.getQueryData())));
            q.setFragment(r.getFragment());
            q.setForceFragmentSeparator(r.getForceFragmentSeparator());
            return true;
        }
        r = r.toString().trim();
        var u = g.parse(r) || {};
        if (!s && !h.isAllowed(u.scheme))return false;
        q.setProtocol(u.scheme || '');
        if (!s && l.test(u.host))return false;
        q.setDomain(u.host || '');
        q.setPort(u.port || '');
        q.setPath(u.path || '');
        if (s) {
            q.setQueryData(t.deserialize(u.query) || {});
        } else try {
            q.setQueryData(t.deserialize(u.query) || {});
        } catch (v) {
            return false;
        }
        q.setFragment(u.fragment || '');
        if (u.fragment === '')q.setForceFragmentSeparator(true);
        if (u.userinfo !== null)if (s) {
            throw new Error(j('URI.parse: invalid URI (userinfo is not allowed in a URI): %s', q.toString()));
        } else return false;
        if (!q.getDomain() && q.getPath().indexOf('\\') !== -1)if (s) {
            throw new Error(j('URI.parse: invalid URI (no domain but multiple back-slashes): %s', q.toString()));
        } else return false;
        if (!q.getProtocol() && m.test(r))if (s) {
            throw new Error(j('URI.parse: invalid URI (unsafe protocol-relative URLs): %s', q.toString()));
        } else return false;
        return true;
    }

    var o = [];

    function p(q, r) {
        "use strict";
        k(r);
        this.$URIBase0 = r;
        this.$URIBase1 = '';
        this.$URIBase2 = '';
        this.$URIBase3 = '';
        this.$URIBase4 = '';
        this.$URIBase5 = '';
        this.$URIBase6 = {};
        this.$URIBase7 = false;
        n(this, q, true, r);
    }

    p.prototype.setProtocol = function (q) {
        "use strict";
        k(h.isAllowed(q));
        this.$URIBase1 = q;
        return this;
    };
    p.prototype.getProtocol = function (q) {
        "use strict";
        return this.$URIBase1;
    };
    p.prototype.setSecure = function (q) {
        "use strict";
        return this.setProtocol(q ? 'https' : 'http');
    };
    p.prototype.isSecure = function () {
        "use strict";
        return this.getProtocol() === 'https';
    };
    p.prototype.setDomain = function (q) {
        "use strict";
        if (l.test(q))throw new Error(j('URI.setDomain: unsafe domain specified: %s for url %s', q, this.toString()));
        this.$URIBase2 = q;
        return this;
    };
    p.prototype.getDomain = function () {
        "use strict";
        return this.$URIBase2;
    };
    p.prototype.setPort = function (q) {
        "use strict";
        this.$URIBase3 = q;
        return this;
    };
    p.prototype.getPort = function () {
        "use strict";
        return this.$URIBase3;
    };
    p.prototype.setPath = function (q) {
        "use strict";
        this.$URIBase4 = q;
        return this;
    };
    p.prototype.getPath = function () {
        "use strict";
        return this.$URIBase4;
    };
    p.prototype.addQueryData = function (q, r) {
        "use strict";
        if (Object.prototype.toString.call(q) === '[object Object]') {
            i(this.$URIBase6, q);
        } else this.$URIBase6[q] = r;
        return this;
    };
    p.prototype.setQueryData = function (q) {
        "use strict";
        this.$URIBase6 = q;
        return this;
    };
    p.prototype.getQueryData = function () {
        "use strict";
        return this.$URIBase6;
    };
    p.prototype.removeQueryData = function (q) {
        "use strict";
        if (!Array.isArray(q))q = [q];
        for (var r = 0, s = q.length; r < s; ++r)delete this.$URIBase6[q[r]];
        return this;
    };
    p.prototype.setFragment = function (q) {
        "use strict";
        this.$URIBase5 = q;
        this.setForceFragmentSeparator(false);
        return this;
    };
    p.prototype.getFragment = function () {
        "use strict";
        return this.$URIBase5;
    };
    p.prototype.setForceFragmentSeparator = function (q) {
        "use strict";
        this.$URIBase7 = q;
        return this;
    };
    p.prototype.getForceFragmentSeparator = function () {
        "use strict";
        return this.$URIBase7;
    };
    p.prototype.isEmpty = function () {
        "use strict";
        return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || Object.keys(this.getQueryData()).length > 0 || this.getFragment());
    };
    p.prototype.toString = function () {
        "use strict";
        var q = this;
        for (var r = 0; r < o.length; r++)q = o[r](q);
        return q.$URIBase8();
    };
    p.prototype.$URIBase8 = function () {
        "use strict";
        var q = '', r = this.getProtocol();
        if (r)q += r + '://';
        var s = this.getDomain();
        if (s)q += s;
        var t = this.getPort();
        if (t)q += ':' + t;
        var u = this.getPath();
        if (u) {
            q += u;
        } else if (q)q += '/';
        var v = this.$URIBase0.serialize(this.getQueryData());
        if (v)q += '?' + v;
        var w = this.getFragment();
        if (w) {
            q += '#' + w;
        } else if (this.getForceFragmentSeparator())q += '#';
        return q;
    };
    p.registerFilter = function (q) {
        "use strict";
        o.push(q);
    };
    p.prototype.getOrigin = function () {
        "use strict";
        var q = this.getPort();
        return this.getProtocol() + '://' + this.getDomain() + (q ? ':' + q : '');
    };
    p.isValidURI = function (q, r) {
        return n(new p(null, r), q, false, r);
    };
    e.exports = p;
}, null);
__d("isFacebookURI", [], function (a, b, c, d, e, f) {
    var g = null, h = ['http', 'https'];

    function i(j) {
        if (!g)g = new RegExp('(^|\\.)facebook\\.com$', 'i');
        if (j.isEmpty() && j.toString() !== '#')return false;
        if (!j.getDomain() && !j.getProtocol())return true;
        return (h.indexOf(j.getProtocol()) !== -1 && g.test(j.getDomain()));
    }

    i.setRegex = function (j) {
        g = j;
    };
    e.exports = i;
}, null);
__d("unqualifyURI", [], function (a, b, c, d, e, f) {
    function g(h) {
        h.setProtocol(null).setDomain(null).setPort(null);
    }

    e.exports = g;
}, null);
__d("areSameOrigin", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        if (h.isEmpty() || i.isEmpty())return false;
        if (h.getProtocol() && h.getProtocol() != i.getProtocol())return false;
        if (h.getDomain() && h.getDomain() != i.getDomain())return false;
        if (h.getPort() && h.getPort() != i.getPort())return false;
        return true;
    }

    e.exports = g;
}, null);
__d("goURI", ["URISchemes"], function (a, b, c, d, e, f, g) {
    function h(i, j, k) {
        i = i.toString();
        if (/^([^.:/?#]+):/.test(i) && !g.isAllowed(RegExp.$1))throw new Error('goURI: URI scheme rejected, URI: ' + i);
        if (!j && a.PageTransitions && a.PageTransitions.isInitialized()) {
            a.PageTransitions.go(i, k);
        } else if (window.location.href == i) {
            window.location.reload();
        } else window.location.href = i;
    }

    e.exports = h;
}, null);
__d("URI", ["PHPQuerySerializer", "URIBase", "isFacebookURI", "unqualifyURI", "areSameOrigin", "copyProperties", "goURI"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    for (var n in h)if (h.hasOwnProperty(n))p[n] = h[n];
    var o = h === null ? null : h.prototype;
    p.prototype = Object.create(o);
    p.prototype.constructor = p;
    p.__superConstructor__ = h;
    function p(q) {
        "use strict";
        if (!(this instanceof p))return new p(q || window.location.href);
        h.call(this, q || '', g);
    }

    p.prototype.setPath = function (q) {
        "use strict";
        this.path = q;
        return o.setPath.call(this, q);
    };
    p.prototype.getPath = function () {
        "use strict";
        var q = o.getPath.call(this);
        if (q)return q.replace(/^\/+/, '/');
        return q;
    };
    p.prototype.setProtocol = function (q) {
        "use strict";
        this.protocol = q;
        return o.setProtocol.call(this, q);
    };
    p.prototype.setDomain = function (q) {
        "use strict";
        this.domain = q;
        return o.setDomain.call(this, q);
    };
    p.prototype.setPort = function (q) {
        "use strict";
        this.port = q;
        return o.setPort.call(this, q);
    };
    p.prototype.setFragment = function (q) {
        "use strict";
        this.fragment = q;
        return o.setFragment.call(this, q);
    };
    p.prototype.valueOf = function () {
        "use strict";
        return this.toString();
    };
    p.prototype.isFacebookURI = function () {
        "use strict";
        return i(this);
    };
    p.prototype.isLinkshimURI = function () {
        "use strict";
        if (i(this) && (this.getPath() === '/l.php' || this.getPath().indexOf('/si/ajax/l/') === 0 || this.getPath().indexOf('/l/') === 0 || this.getPath().indexOf('l/') === 0))return true;
        return false;
    };
    p.prototype.getRegisteredDomain = function () {
        "use strict";
        if (!this.getDomain())return '';
        if (!i(this))return null;
        var q = this.getDomain().split('.'), r = q.indexOf('facebook');
        return q.slice(r).join('.');
    };
    p.prototype.getUnqualifiedURI = function () {
        "use strict";
        var q = new p(this);
        j(q);
        return q;
    };
    p.prototype.getQualifiedURI = function () {
        "use strict";
        return new p(this).$URI0();
    };
    p.prototype.$URI0 = function () {
        "use strict";
        if (!this.getDomain()) {
            var q = p();
            this.setProtocol(q.getProtocol()).setDomain(q.getDomain()).setPort(q.getPort());
        }
        return this;
    };
    p.prototype.isSameOrigin = function (q) {
        "use strict";
        var r = q || window.location.href;
        if (!(r instanceof p))r = new p(r.toString());
        return k(this, r);
    };
    p.prototype.go = function (q) {
        "use strict";
        m(this, q);
    };
    p.prototype.setSubdomain = function (q) {
        "use strict";
        var r = this.$URI0().getDomain().split('.');
        if (r.length <= 2) {
            r.unshift(q);
        } else r[0] = q;
        return this.setDomain(r.join('.'));
    };
    p.prototype.getSubdomain = function () {
        "use strict";
        if (!this.getDomain())return '';
        var q = this.getDomain().split('.');
        if (q.length <= 2) {
            return '';
        } else return q[0];
    };
    p.isValidURI = function (q) {
        "use strict";
        return h.isValidURI(q, g);
    };
    l(p, {
        getRequestURI: function (q, r) {
            q = q === (void 0) || q;
            var s = a.PageTransitions;
            if (q && s && s.isInitialized()) {
                return s.getCurrentURI(!!r).getQualifiedURI();
            } else return new p(window.location.href);
        },
        getMostRecentURI: function () {
            var q = a.PageTransitions;
            if (q && q.isInitialized()) {
                return q.getMostRecentURI().getQualifiedURI();
            } else return new p(window.location.href);
        },
        getNextURI: function () {
            var q = a.PageTransitions;
            if (q && q.isInitialized()) {
                return q._next_uri.getQualifiedURI();
            } else return new p(window.location.href);
        },
        expression: /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/,
        arrayQueryExpression: /^(\w+)((?:\[\w*\])+)=?(.*)/,
        encodeComponent: function (q) {
            return encodeURIComponent(q).replace(/%5D/g, "]").replace(/%5B/g, "[");
        },
        decodeComponent: function (q) {
            return decodeURIComponent(q.replace(/\+/g, ' '));
        }
    });
    e.exports = p;
}, null);
__d("isMessengerDotComURI", [], function (a, b, c, d, e, f) {
    var g = new RegExp('(^|\\.)messenger\\.com$', 'i'), h = ['https'];

    function i(j) {
        if (j.isEmpty() && j.toString() !== '#')return false;
        if (!j.getDomain() && !j.getProtocol())return true;
        return (h.indexOf(j.getProtocol()) !== -1 && g.test(j.getDomain()));
    }

    e.exports = i;
}, null);
__d("bind", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        var j = Array.prototype.slice.call(arguments, 2);
        if (typeof i != 'string')return Function.prototype.bind.apply(i, [h].concat(j));
        function k() {
            var l = j.concat(Array.prototype.slice.call(arguments));
            if (h[i])return h[i].apply(h, l);
        }

        k.toString = function () {
            return 'bound lazily: ' + h[i];
        };
        return k;
    }

    e.exports = g;
}, null);
__d("evalGlobal", [], function (a, b, c, d, e, f) {
    function g(h) {
        if (typeof h != 'string')throw new TypeError('JS sent to evalGlobal is not a string. Only strings are permitted.');
        if (!h)return;
        var i = document.createElement('script');
        try {
            i.appendChild(document.createTextNode(h));
        } catch (j) {
            i.text = h;
        }
        var k = document.getElementsByTagName('head')[0] || document.documentElement;
        k.appendChild(i);
        k.removeChild(i);
    }

    e.exports = g;
}, null);
__d("executeAfter", [], function (a, b, c, d, e, f) {
    function g(h, i, j) {
        return function () {
            h.apply(j || this, arguments);
            i.apply(j || this, arguments);
        };
    }

    e.exports = g;
}, null);
__d("CurrentCommunity", ["CurrentCommunityInitialData"], function (a, b, c, d, e, f, g) {
    var h = {
        getID: function () {
            return g.COMMUNITY_ID || '0';
        }
    };
    e.exports = h;
}, null);
__d("CurrentUser", ["Cookie", "CurrentUserInitialData"], function (a, b, c, d, e, f, g, h) {
    var i = {
        getID: function () {
            return h.USER_ID;
        }, getAccountID: function () {
            return h.ACCOUNT_ID;
        }, isLoggedIn: function () {
            return h.USER_ID && h.USER_ID !== '0';
        }, isLoggedInNow: function () {
            if (!i.isLoggedIn())return false;
            if (h.IS_INTERN_SITE)return true;
            if (h.ORIGINAL_USER_ID)return h.ORIGINAL_USER_ID === g.get('c_user');
            return h.USER_ID === g.get('c_user');
        }, isEmployee: function () {
            return !!h.IS_EMPLOYEE;
        }, isGray: function () {
            return !!h.IS_GRAY;
        }
    };
    e.exports = i;
}, null);
__d("getAsyncParams", ["CurrentCommunity", "CurrentUser", "DTSG", "ISB", "LSD", "ServerJSDefine", "SiteData", "URIBase", "PHPQuerySerializer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = 1;

    function q(r) {
        var s = {
            __user: h.getID(),
            __a: 1,
            __dyn: l.getLoadedModuleHash(),
            __req: (p++).toString(36)
        }, t = new n(window.location.href, o).getQueryData();
        for (var u in t)if (t.hasOwnProperty(u))if ((u === 'locale') || (u.substr(0, 3) === 'mh_'))s[u] = t[u];
        if (r == 'POST') {
            if (i.getToken()) {
                s.fb_dtsg = i.getToken();
                var v = '';
                for (var w = 0; w < s.fb_dtsg.length; w++)v += s.fb_dtsg.charCodeAt(w);
                s.ttstamp = '2' + v;
            }
            if (k.token)s.lsd = k.token;
        }
        if (j.token)s.fb_isb = j.token;
        if (m.revision)s.__rev = m.revision;
        if (g.getID() !== '0')s.__cid = g.getID();
        return s;
    }

    e.exports = q;
}, null);
__d("getSameOriginTransport", ["ex"], function (a, b, c, d, e, f, g) {
    function h() {
        try {
            return a.XMLHttpRequest ? new a.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (i) {
            throw new Error(g('getSameOriginTransport: %s', i.message));
        }
    }

    e.exports = h;
}, null);
__d("ix", ["invariant"], function (a, b, c, d, e, f, g) {
    var h = {};

    function i(j) {
        var k = h[j];
        g(!!k);
        return k;
    }

    i.add = function (j) {
        var k = false;
        for (var l in j)if (!(l in h))h[l] = j[l];
    };
    e.exports = i;
}, null);
__d("IntlVariations", [], function (a, b, c, d, e, f) {
    e.exports = {
        BITMASK_NUMBER: 805306368,
        NUMBER_SINGULAR: 268435456,
        NUMBER_DUAL: 536870912,
        NUMBER_PLURAL: 805306368,
        BITMASK_GENDER: 50331648,
        GENDER_MALE: 16777216,
        GENDER_FEMALE: 33554432,
        GENDER_UNKNOWN: 50331648
    };
}, null);
__d("Intl", [], function (a, b, c, d, e, f) {
    var g;

    function h(j) {
        if (typeof j != 'string')return false;
        return j.match(new RegExp(h.punct_char_class + '[' + ')"' + "'" + '\u00BB' + '\u0F3B' + '\u0F3D' + '\u2019' + '\u201D' + '\u203A' + '\u3009' + '\u300B' + '\u300D' + '\u300F' + '\u3011' + '\u3015' + '\u3017' + '\u3019' + '\u301B' + '\u301E' + '\u301F' + '\uFD3F' + '\uFF07' + '\uFF09' + '\uFF3D' + '\\s' + ']*$'));
    }

    h.punct_char_class = '[' + '.!?' + '\u3002' + '\uFF01' + '\uFF1F' + '\u0964' + '\u2026' + '\u0EAF' + '\u1801' + '\u0E2F' + '\uFF0E' + ']';
    function i(j) {
        if (g) {
            var k = [], l = [];
            for (var m in g.patterns) {
                var n = g.patterns[m];
                for (var o in g.meta) {
                    var p = new RegExp(o.slice(1, -1), 'g'), q = g.meta[o];
                    m = m.replace(p, q);
                    n = n.replace(p, q);
                }
                k.push(m);
                l.push(n);
            }
            for (var r = 0; r < k.length; r++) {
                var s = new RegExp(k[r].slice(1, -1), 'g');
                if (l[r] == 'javascript') {
                    j.replace(s, function (t) {
                        return t.slice(1).toLowerCase();
                    });
                } else j = j.replace(s, l[r]);
            }
        }
        return j.replace(/\x01/g, '');
    }

    e.exports = {
        endsInPunct: h, applyPhonologicalRules: i, setPhonologicalRules: function (j) {
            g = j;
        }
    };
}, null);
__d("substituteTokens", ["invariant", "Intl"], function (a, b, c, d, e, f, g, h) {
    function i(k) {
        return k;
    }

    function j(k, l) {
        if (!l)return k;
        g(typeof l === 'object');
        var m = '\\{([^}]+)\\}(' + h.endsInPunct.punct_char_class + '*)', n = new RegExp(m, 'g'), o = [], p = [], q = k.replace(n, function (t, u, v) {
            var w = l[u];
            if (w && typeof w === 'object') {
                o.push(w);
                p.push(u);
                return '\x17' + v;
            } else if (w === null)return '';
            return w + (h.endsInPunct(w) ? '' : v);
        }).split('\x17').map(h.applyPhonologicalRules);
        if (q.length === 1)return q[0];
        var r = [q[0]];
        for (var s = 0; s < o.length; s++)r.push(i(o[s]), q[s + 1]);
        return r;
    }

    e.exports = j;
}, null);
__d("fbt", ["IntlVariations", "copyProperties", "invariant", "substituteTokens", "FbtNumber", "FbtLogger", "FbtQTOverrides"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = b('FbtNumber').impl, l = b('FbtLogger').logger, m = b('FbtQTOverrides').overrides, n = {
        INDEX: 0,
        SUBSTITUTION: 1
    }, o = {NUMBER: 0, GENDER: 1}, p = function () {
    };
    p._ = function (q, r) {
        var s = {}, t = q;
        if (r !== (void 0))for (var u = 0; u < r.length; u++) {
            var v = r[u][n.INDEX];
            if (v !== null) {
                i(v in t || '*' in t);
                t = t[v] || t['*'];
            }
            h(s, r[u][n.SUBSTITUTION]);
        }
        if (typeof t === 'string') {
            return j(t, s);
        } else if (Array.isArray(t)) {
            var w = t[0], x = t[1];
            w = m[x] || w;
            p.logImpression(x);
            return j(w, s);
        } else i(false);
    };
    p['enum'] = function (q, r) {
        return [q, null];
    };
    p.param = function (q, r, s) {
        var t = null;
        if (s)if (s[0] === o.NUMBER) {
            var u = s.length > 1 ? s[1] : r;
            i(typeof u === 'number');
            t = k.getNumberVariationType(u);
        } else if (s[0] === o.GENDER) {
            i(s.length > 1 && (s[1] & g.GENDER_BITMASK));
            t = s[1];
        } else i(false);
        var v = {};
        v[q] = r;
        return [t, v];
    };
    p.logImpression = function (q) {
        if (l)l.logImpression(q);
        return q;
    };
    e.exports = p;
}, null);
__d("guid", [], function (a, b, c, d, e, f) {
    function g() {
        return 'f' + (Math.random() * (1 << 30)).toString(16).replace('.', '');
    }

    e.exports = g;
}, null);
__d("ArbiterMixin", ["Arbiter", "guid"], function (a, b, c, d, e, f, g, h) {
    var i = "arbiter$" + h(), j = Object.prototype.hasOwnProperty, k = {
        _getArbiterInstance: function () {
            return j.call(this, i) ? this[i] : this[i] = new g();
        }, inform: function (l, m, n) {
            return this._getArbiterInstance().inform(l, m, n);
        }, subscribe: function (l, m, n) {
            return this._getArbiterInstance().subscribe(l, m, n);
        }, subscribeOnce: function (l, m, n) {
            return this._getArbiterInstance().subscribeOnce(l, m, n);
        }, unsubscribe: function (l) {
            this._getArbiterInstance().unsubscribe(l);
        }, unsubscribeCurrentSubscription: function () {
            this._getArbiterInstance().unsubscribeCurrentSubscription();
        }, releaseCurrentPersistentEvent: function () {
            this._getArbiterInstance().releaseCurrentPersistentEvent();
        }, registerCallback: function (l, m) {
            return this._getArbiterInstance().registerCallback(l, m);
        }, query: function (l) {
            return this._getArbiterInstance().query(l);
        }
    };
    e.exports = k;
}, null);
__d("getMarkupWrap", ["ExecutionEnvironment", "invariant"], function (a, b, c, d, e, f, g, h) {
    var i = g.canUseDOM ? document.createElement('div') : null, j = {
        circle: true,
        defs: true,
        ellipse: true,
        g: true,
        line: true,
        linearGradient: true,
        path: true,
        polygon: true,
        polyline: true,
        radialGradient: true,
        rect: true,
        stop: true,
        text: true
    }, k = [1, '<select multiple="true">', '</select>'], l = [1, '<table>', '</table>'], m = [3, '<table><tbody><tr>', '</tr></tbody></table>'], n = [1, '<svg>', '</svg>'], o = {
        '*': [1, '?<div>', '</div>'],
        area: [1, '<map>', '</map>'],
        col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
        legend: [1, '<fieldset>', '</fieldset>'],
        param: [1, '<object>', '</object>'],
        tr: [2, '<table><tbody>', '</tbody></table>'],
        optgroup: k,
        option: k,
        caption: l,
        colgroup: l,
        tbody: l,
        tfoot: l,
        thead: l,
        td: m,
        th: m,
        circle: n,
        defs: n,
        ellipse: n,
        g: n,
        line: n,
        linearGradient: n,
        path: n,
        polygon: n,
        polyline: n,
        radialGradient: n,
        rect: n,
        stop: n,
        text: n
    };

    function p(q) {
        h(!!i);
        if (!o.hasOwnProperty(q))q = '*';
        if (!j.hasOwnProperty(q)) {
            if (q === '*') {
                i.innerHTML = '<link />';
            } else i.innerHTML = '<' + q + '></' + q + '>';
            j[q] = !i.firstChild;
        }
        return j[q] ? o[q] : null;
    }

    e.exports = p;
}, null);
__d("createNodesFromMarkup", ["ExecutionEnvironment", "createArrayFromMixed", "getMarkupWrap", "invariant"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = g.canUseDOM ? document.createElement('div') : null, l = /^\s*<(\w+)/;

    function m(o) {
        var p = o.match(l);
        return p && p[1].toLowerCase();
    }

    function n(o, p) {
        var q = k;
        j(!!k);
        var r = m(o), s = r && i(r);
        if (s) {
            q.innerHTML = s[1] + o + s[2];
            var t = s[0];
            while (t--)q = q.lastChild;
        } else q.innerHTML = o;
        var u = q.getElementsByTagName('script');
        if (u.length) {
            j(p);
            h(u).forEach(p);
        }
        var v = h(q.childNodes);
        while (q.lastChild)q.removeChild(q.lastChild);
        return v;
    }

    e.exports = n;
}, null);
__d("HTML", ["Bootloader", "createNodesFromMarkup", "emptyFunction", "evalGlobal", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = /(<(\w+)[^>]*?)\/>/g, m = {
        abbr: true,
        area: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        link: true,
        meta: true,
        param: true
    };

    function n(o) {
        "use strict";
        if (o && typeof o.__html === 'string')o = o.__html;
        if (!(this instanceof n)) {
            if (o instanceof n)return o;
            return new n(o);
        }
        if (o) {
            var p = typeof o;
            k(p === 'string');
        }
        this._markup = o || '';
        this._defer = false;
        this._extraAction = '';
        this._nodes = null;
        this._inlineJS = i;
        this._rootNode = null;
    }

    n.prototype.toString = function () {
        "use strict";
        var o = this._markup;
        if (this._extraAction)o += '<script type="text/javascript">' + this._extraAction + '</scr' + 'ipt>';
        return o;
    };
    n.prototype.getContent = function () {
        "use strict";
        return this._markup;
    };
    n.prototype.getNodes = function () {
        "use strict";
        this._fillCache();
        return this._nodes;
    };
    n.prototype.getRootNode = function () {
        "use strict";
        k(!this._rootNode);
        var o = this.getNodes();
        if (o.length === 1) {
            this._rootNode = o[0];
        } else {
            var p = document.createDocumentFragment();
            for (var q = 0; q < o.length; q++)p.appendChild(o[q]);
            this._rootNode = p;
        }
        return this._rootNode;
    };
    n.prototype.getAction = function () {
        "use strict";
        this._fillCache();
        var o = function () {
            this._inlineJS();
            j(this._extraAction);
        }.bind(this);
        return this._defer ? function () {
            setTimeout(o, 0);
        } : o;
    };
    n.prototype._fillCache = function () {
        "use strict";
        if (this._nodes !== null)return;
        if (!this._markup) {
            this._nodes = [];
            return;
        }
        var o = this._markup.replace(l, function (r, s, t) {
            return m[t.toLowerCase()] ? r : s + '></' + t + '>';
        }), p = null, q = h(o, function (r) {
            p = p || [];
            p.push(r.src ? g.requestJSResource.bind(g, r.src) : j.bind(null, r.innerHTML));
            r.parentNode.removeChild(r);
        });
        if (p)this._inlineJS = function () {
            for (var r = 0; r < p.length; r++)p[r]();
        };
        this._nodes = q;
    };
    n.prototype.setAction = function (o) {
        "use strict";
        this._extraAction = o;
        return this;
    };
    n.prototype.setDeferred = function (o) {
        "use strict";
        this._defer = !!o;
        return this;
    };
    n.isHTML = function (o) {
        "use strict";
        return !!o && (o instanceof n || o.__html !== (void 0));
    };
    n.replaceJSONWrapper = function (o) {
        "use strict";
        return o && o.__html !== (void 0) ? new n(o.__html) : o;
    };
    e.exports = n;
}, null);
__d("uniqueID", [], function (a, b, c, d, e, f) {
    var g = 'js_', h = 36, i = 0;

    function j() {
        return g + (i++).toString(h);
    }

    e.exports = j;
}, null);
__d("getOrCreateDOMID", ["uniqueID"], function (a, b, c, d, e, f, g) {
    function h(i) {
        if (!i.id)i.id = g();
        return i.id;
    }

    e.exports = h;
}, null);
__d("isScalar", [], function (a, b, c, d, e, f) {
    function g(h) {
        return (/string|number|boolean/).test(typeof h);
    }

    e.exports = g;
}, null);
__d("DOM", ["DOMQuery", "Event", "HTML", "UserAgent_DEPRECATED", "$", "copyProperties", "createArrayFromMixed", "getOrCreateDOMID", "isScalar"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = {
        create: function (s, t, u) {
            var v = document.createElement(s);
            if (t)p.setAttributes(v, t);
            if (u != null)p.setContent(v, u);
            return v;
        }, setAttributes: function (s, t) {
            if (t.type)s.type = t.type;
            for (var u in t) {
                var v = t[u], w = (/^on/i).test(u);
                if (u == 'type') {
                    continue;
                } else if (u == 'style') {
                    if (typeof v == 'string') {
                        s.style.cssText = v;
                    } else l(s.style, v);
                } else if (w) {
                    h.listen(s, u.substr(2), v);
                } else if (u in s) {
                    s[u] = v;
                } else if (s.setAttribute)s.setAttribute(u, v);
            }
        }, prependContent: function (s, t) {
            return r(t, s, function (u) {
                s.firstChild ? s.insertBefore(u, s.firstChild) : s.appendChild(u);
            });
        }, insertAfter: function (s, t) {
            var u = s.parentNode;
            return r(t, u, function (v) {
                s.nextSibling ? u.insertBefore(v, s.nextSibling) : u.appendChild(v);
            });
        }, insertBefore: function (s, t) {
            var u = s.parentNode;
            return r(t, u, function (v) {
                u.insertBefore(v, s);
            });
        }, setContent: function (s, t) {
            while (s.firstChild)q(s.firstChild);
            return p.appendContent(s, t);
        }, appendContent: function (s, t) {
            return r(t, s, function (u) {
                s.appendChild(u);
            });
        }, replace: function (s, t) {
            var u = s.parentNode;
            return r(t, u, function (v) {
                u.replaceChild(v, s);
            });
        }, remove: function (s) {
            q(k(s));
        }, empty: function (s) {
            s = k(s);
            while (s.firstChild)q(s.firstChild);
        }, getID: n
    };
    l(p, g);
    function q(s) {
        if (s.parentNode)s.parentNode.removeChild(s);
    }

    function r(s, t, u) {
        s = i.replaceJSONWrapper(s);
        if (s instanceof i && '' === t.innerHTML && -1 === s.toString().indexOf('<scr' + 'ipt')) {
            var v = j.ie();
            if (!v || (v > 7 && !g.isNodeOfType(t, ['table', 'tbody', 'thead', 'tfoot', 'tr', 'select', 'fieldset']))) {
                var w = v ? '<em style="display:none;">&nbsp;</em>' : '';
                t.innerHTML = w + s;
                v && t.removeChild(t.firstChild);
                return m(t.childNodes);
            }
        } else if (g.isTextNode(t)) {
            t.data = s;
            return [s];
        }
        var x = document.createDocumentFragment(), y, z = [], aa = [];
        s = m(s);
        for (var ba = 0; ba < s.length; ba++) {
            y = i.replaceJSONWrapper(s[ba]);
            if (y instanceof i) {
                aa.push(y.getAction());
                var ca = y.getNodes();
                for (var da = 0; da < ca.length; da++) {
                    z.push(ca[da]);
                    x.appendChild(ca[da]);
                }
            } else if (o(y)) {
                var ea = document.createTextNode(y);
                z.push(ea);
                x.appendChild(ea);
            } else if (g.isNode(y)) {
                z.push(y);
                x.appendChild(y);
            }
        }
        u(x);
        aa.forEach(function (fa) {
            fa();
        });
        return z;
    }

    e.exports = p;
}, null);
__d("mixin", [], function (a, b, c, d, e, f) {
    function g(h, i, j, k, l, m, n, o, p, q, r) {
        var s = function () {
        }, t = [h, i, j, k, l, m, n, o, p, q], u = 0, v;
        while (t[u]) {
            v = t[u];
            for (var w in v)if (v.hasOwnProperty(w))s.prototype[w] = v[w];
            u += 1;
        }
        return s;
    }

    e.exports = g;
}, null);
__d("JSONPTransport", ["ArbiterMixin", "DOM", "HTML", "URI", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {}, m = 2, n = 'jsonp', o = 'iframe';

    function p(u) {
        delete l[u];
    }

    var q = k(g);
    for (var r in q)if (q.hasOwnProperty(r))t[r] = q[r];
    var s = q === null ? null : q.prototype;
    t.prototype = Object.create(s);
    t.prototype.constructor = t;
    t.__superConstructor__ = q;
    function t(u, v) {
        "use strict";
        this._type = u;
        this._uri = v;
        l[this.getID()] = this;
    }

    t.prototype.getID = function () {
        "use strict";
        return this._id || (this._id = m++);
    };
    t.prototype.hasFinished = function () {
        "use strict";
        return !(this.getID() in l);
    };
    t.prototype.getRequestURI = function () {
        "use strict";
        return j(this._uri).addQueryData({__a: 1, __adt: this.getID(), __req: 'jsonp_' + this.getID()});
    };
    t.prototype.getTransportFrame = function () {
        "use strict";
        if (this._iframe)return this._iframe;
        var u = 'transport_frame_' + this.getID(), v = i('<iframe class="hidden_elem" name="' + u + '" src="javascript:void(0)" />');
        return this._iframe = h.appendContent(document.body, v)[0];
    };
    t.prototype.send = function () {
        "use strict";
        if (this._type === n) {
            setTimeout((function () {
                h.appendContent(document.body, h.create('script', {
                    src: this.getRequestURI().toString(),
                    type: 'text/javascript'
                }));
            }).bind(this), 0);
        } else this.getTransportFrame().src = this.getRequestURI().toString();
    };
    t.prototype.handleResponse = function (u) {
        "use strict";
        this.inform('response', u);
        if (this.hasFinished())setTimeout(this._cleanup.bind(this), 0);
    };
    t.prototype.abort = function () {
        "use strict";
        if (this._aborted)return;
        this._aborted = true;
        this._cleanup();
        p(this.getID());
        this.inform('abort');
    };
    t.prototype._cleanup = function () {
        "use strict";
        if (this._iframe) {
            h.remove(this._iframe);
            this._iframe = null;
        }
    };
    t.respond = function (u, v, w) {
        "use strict";
        var x = l[u];
        if (x) {
            if (!w)p(u);
            if (x._type == o)v = JSON.parse(JSON.stringify(v));
            x.handleResponse(v);
        } else {
            var y = a.ErrorSignal;
            if (y && !w)y.logJSError('ajax', {
                error: 'UnexpectedJsonResponse',
                extra: {id: u, uri: (v.payload && v.payload.uri) || ''}
            });
        }
    };
    e.exports = t;
}, null);
__d("AsyncRequest", ["Arbiter", "AsyncRequestConfig", "AsyncResponse", "Bootloader", "CSS", "DTSG", "Env", "ErrorUtils", "Event", "HTTPErrors", "JSCC", "Parent", "PHPQuerySerializer", "Run", "ServerJS", "TimeSlice", "URI", "UserAgent_DEPRECATED", "isFacebookURI", "isMessengerDotComURI", "bind", "copyProperties", "emptyFunction", "evalGlobal", "executeAfter", "ge", "getAsyncParams", "getSameOriginTransport", "goURI", "invariant", "isEmpty", "ix", "setTimeoutAcrossTransitions", "fbt"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na) {
    function oa() {
        try {
            return !window.domready;
        } catch (za) {
            return true;
        }
    }

    function pa(za) {
        return ('upload' in za) && ('onprogress' in za.upload);
    }

    function qa(za) {
        return 'withCredentials' in za;
    }

    function ra(za) {
        return za.status in {0: 1, 12029: 1, 12030: 1, 12031: 1, 12152: 1};
    }

    function sa(za) {
        var ab = !za || typeof(za) === 'function';
        return ab;
    }

    var ta = 2, ua = ta;
    g.subscribe('page_transition', function (za, ab) {
        ua = ab.id;
    });
    function va(za) {
        "use strict";
        ba(this, {
            transport: null,
            method: 'POST',
            uri: '',
            timeout: null,
            timer: null,
            initialHandler: ca,
            handler: null,
            uploadProgressHandler: null,
            errorHandler: null,
            transportErrorHandler: null,
            timeoutHandler: null,
            interceptHandler: ca,
            finallyHandler: ca,
            abortHandler: ca,
            serverDialogCancelHandler: null,
            relativeTo: null,
            statusElement: null,
            statusClass: '',
            data: {},
            headers: {},
            file: null,
            context: {},
            readOnly: false,
            writeRequiredParams: [],
            remainingRetries: 0,
            userActionID: '-'
        });
        this.option = {
            asynchronous: true,
            suppressErrorHandlerWarning: false,
            suppressEvaluation: false,
            suppressErrorAlerts: false,
            retries: 0,
            jsonp: false,
            bundle: false,
            useIframeTransport: false,
            handleErrorAfterUnload: false
        };
        this.errorHandler = i.defaultErrorHandler;
        this.transportErrorHandler = aa(this, 'errorHandler');
        if (za !== (void 0))this.setURI(za);
    }

    va.prototype._dispatchResponse = function (za) {
        "use strict";
        this.clearStatusIndicator();
        if (!this._isRelevant()) {
            this._invokeErrorHandler(1010);
            return;
        }
        if (this.initialHandler(za) === false)return;
        clearTimeout(this.timer);
        if (za.jscc_map) {
            var ab = (eval)(za.jscc_map);
            q.init(ab);
        }
        var bb;
        if (this.handler)try {
            bb = this._shouldSuppressJS(this.handler(za));
        } catch (cb) {
            za.is_last && this.finallyHandler(za);
            throw cb;
        }
        if (!bb)this._handleJSResponse(za);
        za.is_last && this.finallyHandler(za);
    };
    va.prototype._shouldSuppressJS = function (za) {
        "use strict";
        return za === va.suppressOnloadToken;
    };
    va.prototype._handleJSResponse = function (za) {
        "use strict";
        var ab = this.getRelativeTo(), bb = za.domops, cb = za.dtsgToken, db = za.jsmods, eb = new u().setRelativeTo(ab), fb;
        if (db && db.require) {
            fb = db.require;
            delete db.require;
        }
        if (db)eb.handle(db);
        if (cb)l.setToken(cb);
        var gb = function (hb) {
            if (bb && hb)hb.invoke(bb, ab);
            if (fb)eb.handle({require: fb});
            this._handleJSRegisters(za, 'onload');
            if (this.lid)g.inform('tti_ajax', {
                s: this.lid,
                d: [this._sendTimeStamp || 0, (this._sendTimeStamp && this._responseTime) ? (this._responseTime - this._sendTimeStamp) : 0]
            }, g.BEHAVIOR_EVENT);
            this._handleJSRegisters(za, 'onafterload');
            eb.cleanup();
        }.bind(this);
        if (bb) {
            j.loadModules(["AsyncDOM"], gb);
        } else gb(null);
    };
    va.prototype._handleJSRegisters = function (za, ab) {
        "use strict";
        var bb = za[ab];
        if (bb)for (var cb = 0; cb < bb.length; cb++)n.applyWithGuard(new Function(bb[cb]), this);
    };
    va.prototype.invokeResponseHandler = function (za) {
        "use strict";
        if (typeof(za.redirect) !== 'undefined') {
            setTimeout((function () {
                this.setURI(za.redirect).send();
            }).bind(this), 0);
            return;
        }
        if (!this.handler && !this.errorHandler && !this.transportErrorHandler)return;
        var ab = za.asyncResponse;
        if (typeof(ab) !== 'undefined') {
            if (!this._isRelevant()) {
                this._invokeErrorHandler(1010);
                return;
            }
            if (ab.inlinejs)da(ab.inlinejs);
            if (ab.lid) {
                this._responseTime = Date.now();
                if (a.CavalryLogger)this.cavalry = a.CavalryLogger.getInstance(ab.lid);
                this.lid = ab.lid;
            }
            if (ab.resource_map)j.setResourceMap(ab.resource_map);
            if (ab.bootloadable)j.enableBootload(ab.bootloadable);
            la.add(ab.ixData);
            var bb, cb;
            if (ab.getError() && !ab.getErrorIsWarning()) {
                var db = this.errorHandler.bind(this);
                bb = n.guard(this._dispatchErrorResponse, 'AsyncRequest#_dispatchErrorResponse for ' + this.getURI());
                bb = bb.bind(this, ab, db);
                cb = 'error';
            } else {
                bb = n.guard(this._dispatchResponse, 'AsyncRequest#_dispatchResponse for ' + this.getURI());
                bb = bb.bind(this, ab);
                cb = 'response';
            }
            bb = ea(bb, function () {
                g.inform('AsyncRequest/' + cb, {request: this, response: ab});
            }.bind(this));
            var eb = false;
            if (this.preBootloadHandler)eb = this.preBootloadHandler(ab);
            ab.css = ab.css || [];
            ab.js = ab.js || [];
            j.loadResources(ab.css.concat(ab.js), function () {
                setTimeout(bb, 0);
            }, eb, this.getURI());
        } else if (typeof(za.transportError) !== 'undefined') {
            if (this._xFbServer) {
                this._invokeErrorHandler(1008);
            } else this._invokeErrorHandler(1012);
        } else this._invokeErrorHandler(1007);
    };
    va.prototype._invokeErrorHandler = function (za) {
        "use strict";
        var ab;
        if (this.responseText === '') {
            ab = 1002;
        } else if (this._requestAborted) {
            ab = 1011;
        } else {
            try {
                ab = za || this.transport.status || 1004;
            } catch (bb) {
                ab = 1005;
            }
            if (false === navigator.onLine)ab = 1006;
        }
        var cb, db, eb = true;
        if (ab === 1006) {
            db = "Brak po\u0142\u0105czenia z Internetem.";
            cb = "Wyszukiwarka jest w trybie offline. Sprawd\u017a po\u0142\u0105czenie z Internetem i spr\u00f3buj ponownie.";
        } else if (ab >= 300 && ab <= 399) {
            db = "Przekierowanie";
            cb = "Tw\u00f3j dost\u0119p do Facebooka zosta\u0142 aktualnie przekierowany lub zablokowany przez stron\u0119 trzeci\u0105. Prosimy skontaktowa\u0107 si\u0119 z operatorem internetowym lub za\u0142adowa\u0107 stron\u0119 jeszcze raz.";
            var fb = this.transport.getResponseHeader("Location");
            if (fb)ia(fb, true);
            eb = true;
        } else {
            db = "Ups...";
            cb = "Wyst\u0105pi\u0142 problem na stronie serwisu. Trwaj\u0105 prace nad jak najszybszym usuni\u0119ciem tej usterki. Spr\u00f3buj ponownie.";
        }
        var gb = new i(this);
        ba(gb, {error: ab, errorSummary: db, errorDescription: cb, silentError: eb});
        setTimeout((function () {
            g.inform('AsyncRequest/error', {request: this, response: gb});
        }).bind(this), 0);
        if (oa() && !this.getOption('handleErrorAfterUnload'))return;
        if (!this.transportErrorHandler)return;
        var hb = this.transportErrorHandler.bind(this);
        !this.getOption('suppressErrorAlerts');
        n.applyWithGuard(this._dispatchErrorResponse, this, [gb, hb]);
    };
    va.prototype._dispatchErrorResponse = function (za, ab) {
        "use strict";
        var bb = za.getError();
        this.clearStatusIndicator();
        var cb = this._sendTimeStamp && {duration: Date.now() - this._sendTimeStamp, xfb_ip: this._xFbServer || '-'};
        za.logError('async_error', cb);
        if (!this._isRelevant() || bb === 1010) {
            this.abort();
            return;
        }
        if (bb == 1357008 || bb == 1357007 || bb == 1442002 || bb == 1357001) {
            var db = bb == 1357008 || bb == 1357007;
            this.interceptHandler(za);
            this._displayServerDialog(za, db);
        } else if (this.initialHandler(za) !== false) {
            clearTimeout(this.timer);
            try {
                ab(za);
            } catch (eb) {
                this.finallyHandler(za);
                throw eb;
            }
            this.finallyHandler(za);
        }
    };
    va.prototype._displayServerDialog = function (za, ab) {
        "use strict";
        var bb = za.getPayload();
        if (bb.__dialog !== (void 0)) {
            this._displayServerLegacyDialog(za, ab);
            return;
        }
        var cb = bb.__dialogx;
        new u().handle(cb);
        j.loadModules(["ConfirmationDialog"], function (db) {
            db.setupConfirmation(za, this);
        }.bind(this));
    };
    va.prototype._displayServerLegacyDialog = function (za, ab) {
        "use strict";
        var bb = za.getPayload().__dialog;
        j.loadModules(["Dialog"], function (cb) {
            var db = new cb(bb);
            if (ab)db.setHandler(this._displayConfirmationHandler.bind(this, db));
            db.setCancelHandler(function () {
                var eb = this.getServerDialogCancelHandler();
                try {
                    eb && eb(za);
                } catch (fb) {
                    throw fb;
                } finally {
                    this.finallyHandler(za);
                }
            }.bind(this)).setCausalElement(this.relativeTo).show();
        }.bind(this));
    };
    va.prototype._displayConfirmationHandler = function (za) {
        "use strict";
        this.data.confirmed = 1;
        ba(this.data, za.getFormData());
        this.send();
    };
    va.prototype.setJSONPTransport = function (za) {
        "use strict";
        za.subscribe('response', this._handleJSONPResponse.bind(this));
        za.subscribe('abort', this._handleJSONPAbort.bind(this));
        this.transport = za;
    };
    va.prototype._handleJSONPResponse = function (za, ab) {
        "use strict";
        this.is_first = (this.is_first === (void 0));
        var bb = this._interpretResponse(ab);
        bb.asyncResponse.is_first = this.is_first;
        bb.asyncResponse.is_last = this.transport.hasFinished();
        this.invokeResponseHandler(bb);
        if (this.transport.hasFinished())delete this.transport;
    };
    va.prototype._handleJSONPAbort = function () {
        "use strict";
        this._invokeErrorHandler();
        delete this.transport;
    };
    va.prototype._handleXHRResponse = function (za) {
        "use strict";
        var ab;
        if (this.getOption('suppressEvaluation')) {
            ab = {asyncResponse: new i(this, za)};
        } else {
            var bb = za.responseText, cb = null;
            try {
                var eb = this._unshieldResponseText(bb);
                try {
                    var fb = (eval)('(' + eb + ')');
                    ab = this._interpretResponse(fb);
                } catch (db) {
                    cb = 'excep';
                    ab = {transportError: 'eval() failed on async to ' + this.getURI()};
                }
            } catch (db) {
                cb = 'empty';
                ab = {transportError: db.message};
            }
            if (cb) {
                var gb = a.ErrorSignal;
                gb && gb.sendErrorSignal('async_xport_resp', [(this._xFbServer ? '1008_' : '1012_') + cb, this._xFbServer || '-', this.getURI(), bb.length, bb.substr(0, 1600)].join(':'));
            }
        }
        this.invokeResponseHandler(ab);
    };
    va.prototype._unshieldResponseText = function (za) {
        "use strict";
        var ab = "for (;;);", bb = ab.length;
        if (za.length <= bb)throw new Error('Response too short on async to ' + this.getURI());
        var cb = 0;
        while (za.charAt(cb) == " " || za.charAt(cb) == "\n")cb++;
        cb && za.substring(cb, cb + bb) == ab;
        return za.substring(cb + bb);
    };
    va.prototype._interpretResponse = function (za) {
        "use strict";
        if (za.redirect)return {redirect: za.redirect};
        var ab = new i(this);
        if (za.__ar != 1) {
            ab.payload = za;
        } else ba(ab, za);
        return {asyncResponse: ab};
    };
    va.prototype._onStateChange = function () {
        "use strict";
        try {
            if (this.transport.readyState == 4) {
                va._inflightCount--;
                va._inflightPurge();
                try {
                    if (typeof(this.transport.getResponseHeader) !== 'undefined' && this.transport.getResponseHeader('X-FB-Debug'))this._xFbServer = this.transport.getResponseHeader('X-FB-Debug');
                } catch (ab) {
                }
                if (this.transport.status >= 200 && this.transport.status < 300) {
                    va.lastSuccessTime = Date.now();
                    this._handleXHRResponse(this.transport);
                } else if (x.webkit() && (typeof(this.transport.status) == 'undefined')) {
                    this._invokeErrorHandler(1002);
                } else if (h.retryOnNetworkError && ra(this.transport) && this.remainingRetries > 0 && !this._requestTimeout) {
                    this.remainingRetries--;
                    delete this.transport;
                    this.send(true);
                    return;
                } else this._invokeErrorHandler();
                if (this.getOption('asynchronous') !== false)delete this.transport;
            }
        } catch (za) {
            if (oa())return;
            delete this.transport;
            if (this.remainingRetries > 0) {
                this.remainingRetries--;
                this.send(true);
            } else {
                !this.getOption('suppressErrorAlerts');
                var bb = a.ErrorSignal;
                bb && bb.sendErrorSignal('async_xport_resp', [1007, this._xFbServer || '-', this.getURI(), za.message].join(':'));
                this._invokeErrorHandler(1007);
            }
        }
    };
    va.prototype._isMultiplexable = function () {
        "use strict";
        if (this.getOption('jsonp') || this.getOption('useIframeTransport'))return false;
        if (!y(this.uri))return false;
        if (!this.getOption('asynchronous'))return false;
        return true;
    };
    va.prototype.handleResponse = function (za) {
        "use strict";
        var ab = this._interpretResponse(za);
        this.invokeResponseHandler(ab);
    };
    va.prototype.setMethod = function (za) {
        "use strict";
        this.method = za.toString().toUpperCase();
        return this;
    };
    va.prototype.getMethod = function () {
        "use strict";
        return this.method;
    };
    va.prototype.setData = function (za) {
        "use strict";
        this.data = za;
        return this;
    };
    va.prototype.setRequestHeader = function (za, ab) {
        "use strict";
        this.headers[za] = ab;
        return this;
    };
    va.prototype.setRawData = function (za) {
        "use strict";
        this.rawData = za;
        return this;
    };
    va.prototype.getData = function () {
        "use strict";
        return this.data;
    };
    va.prototype.setContextData = function (za, ab, bb) {
        "use strict";
        bb = bb === (void 0) ? true : bb;
        if (bb)this.context['_log_' + za] = ab;
        return this;
    };
    va.prototype._setUserActionID = function () {
        "use strict";
        this.userActionID = (a.EagleEye && a.EagleEye.getSessionID() || '-') + '/-';
    };
    va.prototype.setURI = function (za) {
        "use strict";
        var ab = w(za);
        if (this.getOption('useIframeTransport') && !y(ab))return this;
        if (!this._allowCrossOrigin && !this.getOption('jsonp') && !this.getOption('useIframeTransport') && !ab.isSameOrigin())return this;
        this._setUserActionID();
        if (!za || ab.isEmpty()) {
            var bb = a.ErrorSignal, cb = a.getErrorStack;
            if (bb && cb) {
                var db = {
                    err_code: 1013,
                    vip: '-',
                    duration: 0,
                    xfb_ip: '-',
                    path: window.location.href,
                    aid: this.userActionID
                };
                bb.sendErrorSignal('async_error', JSON.stringify(db));
                bb.sendErrorSignal('async_xport_stack', [1013, window.location.href, null, cb()].join(':'));
            }
            return this;
        }
        this.uri = ab;
        return this;
    };
    va.prototype.getURI = function () {
        "use strict";
        return this.uri.toString();
    };
    va.prototype.setInitialHandler = function (za) {
        "use strict";
        this.initialHandler = za;
        return this;
    };
    va.prototype.setHandler = function (za) {
        "use strict";
        if (sa(za))this.handler = za;
        return this;
    };
    va.prototype.getHandler = function () {
        "use strict";
        return this.handler || ca;
    };
    va.prototype.setUploadProgressHandler = function (za) {
        "use strict";
        if (sa(za))this.uploadProgressHandler = za;
        return this;
    };
    va.prototype.setErrorHandler = function (za) {
        "use strict";
        if (sa(za))this.errorHandler = za;
        return this;
    };
    va.prototype.setTransportErrorHandler = function (za) {
        "use strict";
        this.transportErrorHandler = za;
        return this;
    };
    va.prototype.getErrorHandler = function () {
        "use strict";
        return this.errorHandler;
    };
    va.prototype.getTransportErrorHandler = function () {
        "use strict";
        return this.transportErrorHandler;
    };
    va.prototype.setTimeoutHandler = function (za, ab) {
        "use strict";
        if (sa(ab)) {
            this.timeout = za;
            this.timeoutHandler = ab;
        }
        return this;
    };
    va.prototype.resetTimeout = function (za) {
        "use strict";
        if (!(this.timeoutHandler === null))if (za === null) {
            this.timeout = null;
            clearTimeout(this.timer);
            this.timer = null;
        } else {
            var ab = !this._allowCrossPageTransition;
            this.timeout = za;
            clearTimeout(this.timer);
            if (ab) {
                this.timer = setTimeout(this._handleTimeout.bind(this), this.timeout);
            } else this.timer = ma(this._handleTimeout.bind(this), this.timeout);
        }
        return this;
    };
    va.prototype._handleTimeout = function () {
        "use strict";
        this._requestTimeout = true;
        this.abandon();
        this.timeoutHandler(this);
    };
    va.prototype.setNewSerial = function () {
        "use strict";
        this.id = ++ta;
        return this;
    };
    va.prototype.setInterceptHandler = function (za) {
        "use strict";
        this.interceptHandler = za;
        return this;
    };
    va.prototype.setFinallyHandler = function (za) {
        "use strict";
        this.finallyHandler = za;
        return this;
    };
    va.prototype.setAbortHandler = function (za) {
        "use strict";
        this.abortHandler = za;
        return this;
    };
    va.prototype.getServerDialogCancelHandler = function () {
        "use strict";
        return this.serverDialogCancelHandler;
    };
    va.prototype.setServerDialogCancelHandler = function (za) {
        "use strict";
        this.serverDialogCancelHandler = za;
        return this;
    };
    va.prototype.setPreBootloadHandler = function (za) {
        "use strict";
        this.preBootloadHandler = za;
        return this;
    };
    va.prototype.setReadOnly = function (za) {
        "use strict";
        if (!(typeof(za) != 'boolean'))this.readOnly = za;
        return this;
    };
    va.prototype.setFBMLForm = function () {
        "use strict";
        this.writeRequiredParams = ["fb_sig"];
        return this;
    };
    va.prototype.getReadOnly = function () {
        "use strict";
        return this.readOnly;
    };
    va.prototype.setRelativeTo = function (za) {
        "use strict";
        this.relativeTo = za;
        return this;
    };
    va.prototype.getRelativeTo = function () {
        "use strict";
        return this.relativeTo;
    };
    va.prototype.setStatusClass = function (za) {
        "use strict";
        this.statusClass = za;
        return this;
    };
    va.prototype.setStatusElement = function (za) {
        "use strict";
        this.statusElement = za;
        return this;
    };
    va.prototype.getStatusElement = function () {
        "use strict";
        return fa(this.statusElement);
    };
    va.prototype._isRelevant = function () {
        "use strict";
        if (this._allowCrossPageTransition)return true;
        if (!this.id)return true;
        return this.id > ua;
    };
    va.prototype.clearStatusIndicator = function () {
        "use strict";
        var za = this.getStatusElement();
        if (za) {
            k.removeClass(za, 'async_saving');
            k.removeClass(za, this.statusClass);
        }
    };
    va.prototype.addStatusIndicator = function () {
        "use strict";
        var za = this.getStatusElement();
        if (za) {
            k.addClass(za, 'async_saving');
            k.addClass(za, this.statusClass);
        }
    };
    va.prototype.specifiesWriteRequiredParams = function () {
        "use strict";
        return this.writeRequiredParams.every(function (za) {
            this.data[za] = this.data[za] || m[za] || (fa(za) || {}).value;
            if (this.data[za] !== (void 0))return true;
            return false;
        }, this);
    };
    va.prototype.setOption = function (za, ab) {
        "use strict";
        if (typeof(this.option[za]) != 'undefined')this.option[za] = ab;
        return this;
    };
    va.prototype.getOption = function (za) {
        "use strict";
        typeof(this.option[za]) == 'undefined';
        return this.option[za];
    };
    va.prototype.abort = function () {
        "use strict";
        if (this.transport) {
            var za = this.getTransportErrorHandler();
            this.setOption('suppressErrorAlerts', true);
            this.setTransportErrorHandler(ca);
            this._requestAborted = true;
            this.transport.abort();
            this.setTransportErrorHandler(za);
        }
        this.abortHandler();
        ya.unschedule(this);
    };
    va.prototype.abandon = function () {
        "use strict";
        clearTimeout(this.timer);
        this.setOption('suppressErrorAlerts', true).setHandler(ca).setErrorHandler(ca).setTransportErrorHandler(ca);
        if (this.transport) {
            this._requestAborted = true;
            this.transport.abort();
        }
        this.abortHandler();
        ya.unschedule(this);
    };
    va.prototype.setNectarData = function (za) {
        "use strict";
        if (za) {
            if (this.data.nctr === (void 0))this.data.nctr = {};
            ba(this.data.nctr, za);
        }
        return this;
    };
    va.prototype.setNectarModuleDataSafe = function (za) {
        "use strict";
        if (this.setNectarModuleData)this.setNectarModuleData(za);
        return this;
    };
    va.prototype.setNectarImpressionIdSafe = function () {
        "use strict";
        if (this.setNectarImpressionId)this.setNectarImpressionId();
        return this;
    };
    va.prototype.setAllowCrossPageTransition = function (za) {
        "use strict";
        this._allowCrossPageTransition = !!za;
        if (this.timer)this.resetTimeout(this.timeout);
        return this;
    };
    va.prototype.setAllowIrrelevantRequests = function (za) {
        "use strict";
        this._allowIrrelevantRequests = za;
        return this;
    };
    va.prototype.setAllowCrossOrigin = function (za) {
        "use strict";
        this._allowCrossOrigin = za;
        return this;
    };
    va.prototype.setIsBackgroundRequest = function (za) {
        "use strict";
        this._isBackgroundRequest = za;
        return this;
    };
    va.prototype.send = function (za) {
        "use strict";
        za = za || false;
        if (!this.uri)return false;
        !this.errorHandler && !this.getOption('suppressErrorHandlerWarning');
        if (this.getOption('jsonp') && this.method != 'GET')this.setMethod('GET');
        if (this.getOption('useIframeTransport') && this.method != 'GET')this.setMethod('GET');
        this.timeoutHandler !== null && (this.getOption('jsonp') || this.getOption('useIframeTransport'));
        if (!this.getReadOnly()) {
            this.specifiesWriteRequiredParams();
            if (this.method != 'POST')return false;
        }
        ba(this.data, ga(this.method));
        if (!ka(this.context)) {
            ba(this.data, this.context);
            this.data.ajax_log = 1;
        }
        if (m.force_param)ba(this.data, m.force_param);
        this._setUserActionID();
        if (this.getOption('bundle') && this._isMultiplexable()) {
            ya.schedule(this);
            return true;
        }
        this.setNewSerial();
        if (!this.getOption('asynchronous'))this.uri.addQueryData({__s: 1});
        g.inform('AsyncRequest/send', {request: this});
        var ab, bb;
        if (this.method == 'GET' || this.rawData) {
            ab = this.uri.addQueryData(this.data).toString();
            bb = this.rawData || '';
        } else {
            if (this._allowCrossOrigin)this.uri.addQueryData({__a: 1});
            ab = this.uri.toString();
            bb = s.serialize(this.data);
        }
        if (this.transport)return false;
        if (this.getOption('jsonp') || this.getOption('useIframeTransport')) {
            d(['JSONPTransport'], function (fb) {
                var gb = new fb(this.getOption('jsonp') ? 'jsonp' : 'iframe', this.uri);
                this.setJSONPTransport(gb);
                gb.send();
            }.bind(this));
            return true;
        }
        var cb = ha();
        if (!cb)return false;
        cb.onreadystatechange = v.guard(this._onStateChange.bind(this), 'XHR.onreadystatechange');
        if (this.uploadProgressHandler && pa(cb))cb.upload.onprogress = this.uploadProgressHandler.bind(this);
        if (!za)this.remainingRetries = this.getOption('retries');
        if (a.ErrorSignal)this._sendTimeStamp = this._sendTimeStamp || Date.now();
        this.transport = cb;
        try {
            this.transport.open(this.method, ab, this.getOption('asynchronous'));
        } catch (db) {
            return false;
        }
        if (!this.uri.isSameOrigin() && !this.getOption('jsonp') && !this.getOption('useIframeTransport')) {
            if (!qa(this.transport))return false;
            if (y(this.uri) || z(this.uri))this.transport.withCredentials = true;
        }
        if (this.method == 'POST' && !this.rawData)this.transport.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (this._isBackgroundRequest)this.transport.setRequestHeader('X_FB_BACKGROUND_STATE', '1');
        g.inform('AsyncRequest/will_send', {request: this});
        for (var eb in this.headers)if (this.headers.hasOwnProperty(eb))this.transport.setRequestHeader(eb, this.headers[eb]);
        this.addStatusIndicator();
        this.transport.send(bb);
        if (this.timeout !== null)this.resetTimeout(this.timeout);
        va._inflightCount++;
        va._inflightAdd(this);
        return true;
    };
    va._inflightAdd = function (za) {
        "use strict";
        this._inflight.push(za);
    };
    va._inflightPurge = function () {
        "use strict";
        va._inflight = va._inflight.filter(function (za) {
            return za.transport && za.transport.readyState < 4;
        });
    };
    va.bootstrap = function (za, ab, bb) {
        "use strict";
        var cb = 'GET', db = true, eb = {};
        if (bb || ab && (ab.rel == 'async-post')) {
            cb = 'POST';
            db = false;
            if (za) {
                za = w(za);
                eb = za.getQueryData();
                za.setQueryData({});
            }
        }
        var fb = r.byClass(ab, 'stat_elem') || ab;
        if (fb && k.hasClass(fb, 'async_saving'))return false;
        var gb = new va(za).setReadOnly(db).setMethod(cb).setData(eb).setNectarModuleDataSafe(ab).setRelativeTo(ab);
        if (ab) {
            gb.setHandler(function (ib) {
                o.fire(ab, 'success', {response: ib});
            });
            gb.setErrorHandler(function (ib) {
                if (o.fire(ab, 'error', {response: ib}) !== false)i.defaultErrorHandler(ib);
            });
        }
        if (fb) {
            gb.setStatusElement(fb);
            var hb = fb.getAttribute('data-status-class');
            hb && gb.setStatusClass(hb);
        }
        gb.send();
        return false;
    };
    va.post = function (za, ab) {
        "use strict";
        new va(za).setReadOnly(false).setMethod('POST').setData(ab).send();
        return false;
    };
    va.getLastID = function () {
        "use strict";
        return ta;
    };
    va.getInflightCount = function () {
        "use strict";
        return this._inflightCount;
    };
    va._inflightEnable = function () {
        "use strict";
        if (x.ie())t.onUnload(function () {
            va._inflight.forEach(function (za) {
                if (za.transport && za.transport.readyState < 4) {
                    za.transport.abort();
                    delete za.transport;
                }
            });
        });
    };
    ba(va, {suppressOnloadToken: {}, _inflight: [], _inflightCount: 0, _inflightAdd: ca, _inflightPurge: ca});
    var wa, xa = [];

    function ya() {
        "use strict";
        this._requests = [];
    }

    ya.prototype.add = function (za) {
        "use strict";
        this._requests.push(za);
    };
    ya.prototype.remove = function (za) {
        "use strict";
        var ab = this._requests, bb = this._requestsSent;
        for (var cb = 0, db = ab.length; cb < db; cb++)if (ab[cb] === za)if (bb) {
            ab[cb] = null;
        } else ab.splice(cb, 1);
    };
    ya.prototype.send = function () {
        "use strict";
        ja(!this._requestsSent);
        this._requestsSent = true;
        this._wrapperRequest = null;
        var za = this._requests;
        if (!za.length)return;
        var ab;
        if (za.length === 1) {
            ab = za[0];
        } else {
            var bb = za.map(function (cb) {
                return [cb.uri.getPath(), s.serialize(cb.data)];
            });
            ab = this._wrapperRequest = new va('/ajax/proxy.php').setAllowCrossPageTransition(true).setData({data: bb}).setHandler(this._handler.bind(this)).setTransportErrorHandler(this._transportErrorHandler.bind(this));
        }
        ab.setOption('bundle', false).send();
    };
    ya.prototype._handler = function (za) {
        "use strict";
        var ab = za.getPayload().responses;
        if (ab.length !== this._requests.length)return;
        for (var bb = 0; bb < this._requests.length; bb++) {
            var cb = this._requests[bb];
            if (cb === null)continue;
            var db = cb.uri.getPath();
            if (this._wrapperRequest)cb.id = this._wrapperRequest.id;
            if (ab[bb][0] !== db) {
                cb.invokeResponseHandler({transportError: 'Wrong response order in bundled request to ' + db});
                continue;
            }
            cb.handleResponse(ab[bb][1]);
        }
        xa.splice(xa.indexOf(this, 1));
    };
    ya.prototype._transportErrorHandler = function (za) {
        "use strict";
        var ab = {transportError: za.errorDescription}, bb = this._requests.map(function (cb) {
            if (this._wrapperRequest)cb.id = this._wrapperRequest.id;
            cb.invokeResponseHandler(ab);
            return cb.uri.getPath();
        }, this);
    };
    ya.schedule = function (za) {
        "use strict";
        if (!wa) {
            wa = new ya();
            xa.push(wa);
            setTimeout(function () {
                wa.send();
                wa = null;
            }, 0);
        }
        wa.add(za);
        return wa;
    };
    ya.unschedule = function (za) {
        "use strict";
        xa.forEach(function (ab) {
            ab.remove(za);
        });
    };
    a.AsyncRequest = va;
    e.exports = va;
}, null);
__d("DOMControl", ["DataStore", "$"], function (a, b, c, d, e, f, g, h) {
    function i(j) {
        "use strict";
        this.root = h(j);
        this.updating = false;
        g.set(j, 'DOMControl', this);
    }

    i.prototype.getRoot = function () {
        "use strict";
        return this.root;
    };
    i.prototype.beginUpdate = function () {
        "use strict";
        if (this.updating)return false;
        this.updating = true;
        return true;
    };
    i.prototype.endUpdate = function () {
        "use strict";
        this.updating = false;
    };
    i.prototype.update = function (j) {
        "use strict";
        if (!this.beginUpdate())return this;
        this.onupdate(j);
        this.endUpdate();
    };
    i.prototype.onupdate = function (j) {
        "use strict";
    };
    i.getInstance = function (j) {
        "use strict";
        return g.get(j, 'DOMControl');
    };
    e.exports = i;
}, null);
__d("cx", [], function (a, b, c, d, e, f) {
    function g(h) {
        throw new Error('cx: Unexpected class transformation.');
    }

    e.exports = g;
}, null);
__d("Focus", ["CSS", "DOM", "Event", "Run", "cx", "ge"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {}, n, o = {
        set: function (s) {
            try {
                s.tabIndex = s.tabIndex;
                s.focus();
            } catch (t) {
            }
        }, setWithoutOutline: function (s) {
            g.addClass(s, "_5f0v");
            var t = i.listen(s, 'blur', function () {
                g.removeClass(s, "_5f0v");
                t.remove();
            });
            o.set(s);
        }, relocate: function (s, t) {
            function u(v) {
                g.conditionClass(t, "_3oxt", v);
            }

            o.listen(s, u);
            g.addClass(s, "_5f0v");
        }, listen: function (s, t) {
            p();
            var u = h.getID(s);
            m[u] = t;
            j.onLeave(r.bind(null, u));
        }
    };

    function p() {
        if (n)return;
        i.listen(document.documentElement, 'focusout', q);
        i.listen(document.documentElement, 'focusin', q);
        n = true;
    }

    function q(event) {
        var s = event.getTarget();
        if (typeof m[s.id] === 'function') {
            var t = event.type === 'focusin' || event.type === 'focus';
            m[s.id](t);
        }
    }

    function r(s) {
        if (m[s] && !l(s))delete m[s];
    }

    e.exports = o;
}, null);
__d("InputSelection", ["DOM", "Focus"], function (a, b, c, d, e, f, g, h) {
    var i = {
        get: function (j) {
            try {
                if (typeof j.selectionStart === 'number')return {start: j.selectionStart, end: j.selectionEnd};
            } catch (k) {
                return {start: 0, end: 0};
            }
            if (!document.selection)return {start: 0, end: 0};
            var l = document.selection.createRange();
            if (l.parentElement() !== j)return {start: 0, end: 0};
            var m = j.value.length;
            if (g.isNodeOfType(j, 'input')) {
                return {start: -l.moveStart('character', -m), end: -l.moveEnd('character', -m)};
            } else {
                var n = l.duplicate();
                n.moveToElementText(j);
                n.setEndPoint('StartToEnd', l);
                var o = m - n.text.length;
                n.setEndPoint('StartToStart', l);
                return {start: m - n.text.length, end: o};
            }
        }, set: function (j, k, l) {
            if (typeof l == 'undefined')l = k;
            if (document.selection) {
                if (j.tagName == 'TEXTAREA') {
                    var m = (j.value.slice(0, k).match(/\r/g) || []).length, n = (j.value.slice(k, l).match(/\r/g) || []).length;
                    k -= m;
                    l -= m + n;
                }
                var o = j.createTextRange();
                o.collapse(true);
                o.moveStart('character', k);
                o.moveEnd('character', l - k);
                o.select();
            } else {
                j.selectionStart = k;
                j.selectionEnd = Math.min(l, j.value.length);
                h.set(j);
            }
        }
    };
    e.exports = i;
}, null);
__d("enforceMaxLength", ["DOM", "Event", "Input", "InputSelection"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = function (n, o) {
        var p = i.getValue(n), q = p.length, r = q - o;
        if (r > 0) {
            var s, t;
            try {
                s = j.get(n);
                t = s.end;
            } catch (u) {
                s = null;
                t = 0;
            }
            if (t >= r)q = t;
            var v = q - r;
            if (v && (p.charCodeAt(v - 1) & 64512) === 55296)v--;
            t = Math.min(t, v);
            i.setValue(n, p.slice(0, v) + p.slice(q));
            if (s)j.set(n, Math.min(s.start, t), t);
        }
    }, l = function (event) {
        var n = event.getTarget(), o = n.getAttribute && parseInt(n.getAttribute('maxlength'), 10);
        if (o > 0 && g.isNodeOfType(n, ['input', 'textarea']))setTimeout(k.bind(null, n, o), 0);
    }, m = 'maxLength' in g.create('input') && 'maxLength' in g.create('textarea');
    if (!m)h.listen(document.documentElement, {keydown: l, paste: l});
    e.exports = k;
}, null);
__d("Input", ["CSS", "DOMQuery", "DOMControl"], function (a, b, c, d, e, f, g, h, i) {
    var j = function (l) {
        var m = l.getAttribute('maxlength');
        if (m && m > 0)d(['enforceMaxLength'], function (n) {
            n(l, m);
        });
    }, k = {
        isWhiteSpaceOnly: function (l) {
            return !(/\S/).test(l || '');
        }, isEmpty: function (l) {
            return k.isWhiteSpaceOnly(l.value);
        }, getValue: function (l) {
            return k.isEmpty(l) ? '' : l.value;
        }, getValueRaw: function (l) {
            return l.value;
        }, setValue: function (l, m) {
            l.value = m || '';
            j(l);
            var n = i.getInstance(l);
            n && n.resetHeight && n.resetHeight();
        }, setPlaceholder: function (l, m) {
            l.setAttribute('aria-label', m);
            l.setAttribute('placeholder', m);
        }, reset: function (l) {
            l.value = '';
            l.style.height = '';
        }, setSubmitOnEnter: function (l, m) {
            g.conditionClass(l, 'enter_submit', m);
        }, getSubmitOnEnter: function (l) {
            return g.hasClass(l, 'enter_submit');
        }, setMaxLength: function (l, m) {
            if (m > 0) {
                l.setAttribute('maxlength', m);
                j(l);
            } else l.removeAttribute('maxlength');
        }
    };
    e.exports = k;
}, null);
__d("getElementRect", ["containsNode"], function (a, b, c, d, e, f, g) {
    function h(i) {
        var j = document.documentElement;
        if (!('getBoundingClientRect' in i) || !g(j, i))return {left: 0, right: 0, top: 0, bottom: 0};
        var k = i.getBoundingClientRect();
        return {
            left: Math.round(k.left) - j.clientLeft,
            right: Math.round(k.right) - j.clientLeft,
            top: Math.round(k.top) - j.clientTop,
            bottom: Math.round(k.bottom) - j.clientTop
        };
    }

    e.exports = h;
}, null);
__d("getElementPosition", ["getElementRect"], function (a, b, c, d, e, f, g) {
    function h(i) {
        var j = g(i);
        return {x: j.left, y: j.top, width: j.right - j.left, height: j.bottom - j.top};
    }

    e.exports = h;
}, null);
__d("trackReferrer", ["Parent"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        i = g.byAttribute(i, 'data-referrer');
        if (i) {
            var k = /^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/.exec(j)[1] || '';
            if (!k)return;
            var l = k + '|' + i.getAttribute('data-referrer'), m = new Date();
            m.setTime(Date.now() + 1000);
            document.cookie = "x-src=" + encodeURIComponent(l) + "; " + "expires=" + m.toGMTString() + ";path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
        }
        return i;
    }

    e.exports = h;
}, null);
__d("Form", ["AsyncRequest", "AsyncResponse", "CSS", "DataStore", "DOM", "DOMQuery", "DTSG", "Event", "Input", "LSD", "Parent", "PHPQuerySerializer", "URI", "createArrayFromMixed", "getElementPosition", "trackReferrer"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = 'FileList' in window, x = 'FormData' in window;

    function y(aa) {
        var ba = {};
        r.serialize(aa).split('&').forEach(function (ca) {
            if (ca) {
                var da = /^([^=]*)(?:=(.*))?$/.exec(ca), ea = s.decodeComponent(da[1]), fa = da[2] !== (void 0), ga = fa ? s.decodeComponent(da[2]) : null;
                ba[ea] = ga;
            }
        });
        return ba;
    }

    var z = {
        getInputs: function (aa) {
            aa = aa || document;
            return [].concat(t(l.scry(aa, 'input')), t(l.scry(aa, 'select')), t(l.scry(aa, 'textarea')), t(l.scry(aa, 'button')));
        }, getInputsByName: function (aa) {
            var ba = {};
            z.getInputs(aa).forEach(function (ca) {
                var da = ba[ca.name];
                ba[ca.name] = typeof da === 'undefined' ? ca : [ca].concat(da);
            });
            return ba;
        }, getSelectValue: function (aa) {
            return aa.options[aa.selectedIndex].value;
        }, setSelectValue: function (aa, ba) {
            for (var ca = 0; ca < aa.options.length; ++ca)if (aa.options[ca].value == ba) {
                aa.selectedIndex = ca;
                break;
            }
        }, getRadioValue: function (aa) {
            for (var ba = 0; ba < aa.length; ba++)if (aa[ba].checked)return aa[ba].value;
            return null;
        }, getElements: function (aa) {
            return t(aa.tagName == 'FORM' && aa.elements != aa ? aa.elements : z.getInputs(aa));
        }, getAttribute: function (aa, ba) {
            return (aa.getAttributeNode(ba) || {}).value || null;
        }, setDisabled: function (aa, ba) {
            z.getElements(aa).forEach(function (ca) {
                if (ca.disabled !== (void 0)) {
                    var da = j.get(ca, 'origDisabledState');
                    if (ba) {
                        if (da === (void 0))j.set(ca, 'origDisabledState', ca.disabled);
                        ca.disabled = ba;
                    } else if (da === false)ca.disabled = false;
                }
            });
        }, bootstrap: function (aa, ba) {
            var ca = (z.getAttribute(aa, 'method') || 'GET').toUpperCase();
            ba = q.byTag(ba, 'button') || ba;
            var da = q.byClass(ba, 'stat_elem') || aa;
            if (i.hasClass(da, 'async_saving'))return;
            if (ba && (ba.form !== aa || (ba.nodeName != 'INPUT' && ba.nodeName != 'BUTTON') || ba.type != 'submit')) {
                var ea = l.scry(aa, '.enter_submit_target')[0];
                ea && (ba = ea);
            }
            var fa = z.serialize(aa, ba);
            z.setDisabled(aa, true);
            var ga = z.getAttribute(aa, 'ajaxify') || z.getAttribute(aa, 'action');
            v(aa, ga);
            var ha = new g(ga);
            ha.setData(fa).setNectarModuleDataSafe(aa).setReadOnly(ca == 'GET').setMethod(ca).setRelativeTo(aa).setStatusElement(da).setInitialHandler(z.setDisabled.bind(null, aa, false)).setHandler(function (ia) {
                n.fire(aa, 'success', {response: ia});
            }).setErrorHandler(function (ia) {
                if (n.fire(aa, 'error', {response: ia}) !== false)h.defaultErrorHandler(ia);
            }).setFinallyHandler(z.setDisabled.bind(null, aa, false)).send();
        }, forEachValue: function (aa, ba, ca) {
            z.getElements(aa).forEach(function (da) {
                if (!da.name || da.disabled)return;
                if (da.type === 'submit')return;
                if (da.type === 'reset' || da.type === 'button' || da.type === 'image')return;
                if ((da.type === 'radio' || da.type === 'checkbox') && !da.checked)return;
                if (da.nodeName === 'SELECT') {
                    for (var ea = 0, fa = da.options.length; ea < fa; ea++) {
                        var ga = da.options[ea];
                        if (ga.selected)ca('select', da.name, ga.value);
                    }
                    return;
                }
                if (da.type === 'file') {
                    if (w) {
                        var ha = da.files;
                        for (var ia = 0; ia < ha.length; ia++)ca('file', da.name, ha.item(ia));
                    }
                    return;
                }
                ca(da.type, da.name, o.getValue(da));
            });
            if (ba && ba.name && ba.type === 'submit' && l.contains(aa, ba) && l.isNodeOfType(ba, ['input', 'button']))ca('submit', ba.name, ba.value);
        }, createFormData: function (aa, ba) {
            if (!x)return null;
            var ca = new FormData();
            if (aa)if (l.isNode(aa)) {
                z.forEachValue(aa, ba, function (fa, ga, ha) {
                    ca.append(ga, ha);
                });
            } else {
                var da = y(aa);
                for (var ea in da)if (da[ea] == null) {
                    ca.append(ea, '');
                } else ca.append(ea, da[ea]);
            }
            return ca;
        }, serialize: function (aa, ba) {
            var ca = {};
            z.forEachValue(aa, ba, function (da, ea, fa) {
                if (da === 'file')return;
                z._serializeHelper(ca, ea, fa);
            });
            return z._serializeFix(ca);
        }, _serializeHelper: function (aa, ba, ca) {
            var da = Object.prototype.hasOwnProperty, ea = /([^\]]+)\[([^\]]*)\](.*)/.exec(ba);
            if (ea) {
                if (!aa[ea[1]] || !da.call(aa, ea[1])) {
                    var fa;
                    aa[ea[1]] = fa = {};
                    if (aa[ea[1]] !== fa)return;
                }
                var ga = 0;
                if (ea[2] === '') {
                    while (aa[ea[1]][ga] !== (void 0))ga++;
                } else ga = ea[2];
                if (ea[3] === '') {
                    aa[ea[1]][ga] = ca;
                } else z._serializeHelper(aa[ea[1]], ga.concat(ea[3]), ca);
            } else aa[ba] = ca;
        }, _serializeFix: function (aa) {
            for (var ba in aa)if (aa[ba] instanceof Object)aa[ba] = z._serializeFix(aa[ba]);
            var ca = Object.keys(aa);
            if (ca.length === 0 || ca.some(isNaN))return aa;
            ca.sort(function (fa, ga) {
                return fa - ga;
            });
            var da = 0, ea = ca.every(function (fa) {
                return +fa === da++;
            });
            if (ea)return ca.map(function (fa) {
                return aa[fa];
            });
            return aa;
        }, post: function (aa, ba, ca) {
            var da = document.createElement('form');
            da.action = aa.toString();
            da.method = 'POST';
            da.style.display = 'none';
            if (ca)da.target = ca;
            ba.fb_dtsg = m.getToken();
            if (p.token)ba.lsd = p.token;
            z.createHiddenInputs(ba, da);
            l.getRootElement().appendChild(da);
            da.submit();
            return false;
        }, createHiddenInputs: function (aa, ba, ca, da) {
            ca = ca || {};
            var ea = y(aa);
            for (var fa in ea) {
                if (ea[fa] === null)continue;
                if (ca[fa] && da) {
                    ca[fa].value = ea[fa];
                } else {
                    var ga = k.create('input', {type: 'hidden', name: fa, value: ea[fa]});
                    ca[fa] = ga;
                    ba.appendChild(ga);
                }
            }
            return ca;
        }, getFirstElement: function (aa, ba) {
            ba = ba || ['input[type="text"]', 'textarea', 'input[type="password"]', 'input[type="button"]', 'input[type="submit"]'];
            var ca = [];
            for (var da = 0; da < ba.length; da++) {
                ca = l.scry(aa, ba[da]);
                for (var ea = 0; ea < ca.length; ea++) {
                    var fa = ca[ea];
                    try {
                        var ha = u(fa);
                        if (ha.y > 0 && ha.x > 0)return fa;
                    } catch (ga) {
                    }
                }
            }
            return null;
        }, focusFirst: function (aa) {
            var ba = z.getFirstElement(aa);
            if (ba) {
                ba.focus();
                return true;
            }
            return false;
        }
    };
    e.exports = z;
}, null);
__d("EmbedLikeButton", ["AsyncFormRequestUtils", "ClientIDs", "CSS", "Event", "Form"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {
        addClientId: function (m) {
            m.setAttribute('value', h.getNewClientID());
        }, init: function (m, n, o, p) {
            var q = function (r) {
                return k.bootstrap(p);
            };
            j.listen(m, 'click', q);
            j.listen(n, 'click', q);
            g.subscribe(p, 'send', function (r) {
                var s = o.getAttribute('value') === '1';
                if (s) {
                    i.hide(m);
                    i.show(n);
                } else {
                    i.hide(n);
                    i.show(m);
                }
                o.setAttribute('value', s ? '' : '1');
            });
        }
    };
    e.exports = l;
}, null);
__d("camelize", [], function (a, b, c, d, e, f) {
    var g = /-(.)/g;

    function h(i) {
        return i.replace(g, function (j, k) {
            return k.toUpperCase();
        });
    }

    e.exports = h;
}, null);
__d("getOpacityStyleName", [], function (a, b, c, d, e, f) {
    var g = false, h = null;

    function i() {
        if (!g) {
            if ('opacity' in document.body.style) {
                h = 'opacity';
            } else {
                var j = document.createElement('div');
                j.style.filter = 'alpha(opacity=100)';
                if (j.style.filter)h = 'filter';
                j = null;
            }
            g = true;
        }
        return h;
    }

    e.exports = i;
}, null);
__d("hyphenate", [], function (a, b, c, d, e, f) {
    var g = /([A-Z])/g;

    function h(i) {
        return i.replace(g, '-$1').toLowerCase();
    }

    e.exports = h;
}, null);
__d("getStyleProperty", ["camelize", "hyphenate"], function (a, b, c, d, e, f, g, h) {
    function i(k) {
        return k == null ? k : String(k);
    }

    function j(k, l) {
        var m;
        if (window.getComputedStyle) {
            m = window.getComputedStyle(k, null);
            if (m)return i(m.getPropertyValue(h(l)));
        }
        if (document.defaultView && document.defaultView.getComputedStyle) {
            m = document.defaultView.getComputedStyle(k, null);
            if (m)return i(m.getPropertyValue(h(l)));
            if (l === 'display')return 'none';
        }
        if (k.currentStyle) {
            if (l === 'float')return i(k.currentStyle.cssFloat || k.currentStyle.styleFloat);
            return i(k.currentStyle[g(l)]);
        }
        return i(k.style && k.style[g(l)]);
    }

    e.exports = j;
}, null);
__d("Style-upstream", ["camelize", "containsNode", "ex", "getOpacityStyleName", "getStyleProperty", "hyphenate", "invariant"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n(u, v) {
        var w = t.get(u, v);
        return (w === 'auto' || w === 'scroll');
    }

    var o = new RegExp(('\\s*' + '([^\\s:]+)' + '\\s*:\\s*' + '([^;(\'"]*(?:(?:\\([^)]*\\)|"[^"]*"|\'[^\']*\')[^;(?:\'"]*)*)' + '(?:;|$)'), 'g');

    function p(u) {
        var v = {};
        u.replace(o, function (w, x, y) {
            v[x] = y;
        });
        return v;
    }

    function q(u) {
        var v = '';
        for (var w in u)if (u[w])v += w + ':' + u[w] + ';';
        return v;
    }

    function r(u) {
        return u !== '' ? 'alpha(opacity=' + u * 100 + ')' : '';
    }

    function s(u, v, w) {
        switch (l(v)) {
            case 'font-weight':
            case 'line-height':
            case 'opacity':
            case 'z-index':
                break;
            case 'width':
            case 'height':
                var x = parseInt(w, 10) < 0;
                m(!x);
            default:
                m(isNaN(w) || !w || w === '0');
                break;
        }
    }

    var t = {
        set: function (u, v, w) {
            s('Style.set', v, w);
            var x = u.style;
            switch (v) {
                case 'opacity':
                    if (j() === 'filter') {
                        x.filter = r(w);
                    } else x.opacity = w;
                    break;
                case 'float':
                    x.cssFloat = x.styleFloat = w || '';
                    break;
                default:
                    try {
                        x[g(v)] = w;
                    } catch (y) {
                        throw new Error(i('Style.set: "%s" argument is invalid: %s', v, w));
                    }
            }
        }, apply: function (u, v) {
            var w;
            for (w in v)s('Style.apply', w, v[w]);
            if ('opacity' in v && j() === 'filter') {
                v.filter = r(v.opacity);
                delete v.opacity;
            }
            var x = p(u.style.cssText);
            for (w in v) {
                var y = v[w];
                delete v[w];
                var z = l(w);
                for (var aa in x)if (aa === z || aa.indexOf(z + '-') === 0)delete x[aa];
                v[z] = y;
            }
            Object.assign(x, v);
            u.style.cssText = q(x);
        }, get: k, getFloat: function (u, v) {
            return parseFloat(t.get(u, v), 10);
        }, getOpacity: function (u) {
            if (j() === 'filter') {
                var v = t.get(u, 'filter');
                if (v) {
                    var w = /(\d+(?:\.\d+)?)/.exec(v);
                    if (w)return parseFloat(w.pop()) / 100;
                }
            }
            return t.getFloat(u, 'opacity') || 1;
        }, isFixed: function (u) {
            while (h(document.body, u)) {
                if (t.get(u, 'position') === 'fixed')return true;
                u = u.parentNode;
            }
            return false;
        }, getScrollParent: function (u) {
            if (!u)return null;
            while (u && u !== document.body) {
                if (n(u, 'overflow') || n(u, 'overflowY') || n(u, 'overflowX'))return u;
                u = u.parentNode;
            }
            return window;
        }
    };
    e.exports = t;
}, null);
__d("merge", [], function (a, b, c, d, e, f) {
    "use strict";
    var g = function (h, i) {
        return Object.assign({}, h, i);
    };
    e.exports = g;
}, null);
__d("Style", ["Style-upstream", "$", "merge"], function (a, b, c, d, e, f, g, h, i) {
    var j = i(g, {
        get: function (k, l) {
            typeof k === 'string';
            return g.get(h(k), l);
        }, getFloat: function (k, l) {
            typeof k === 'string';
            return g.getFloat(h(k), l);
        }
    });
    e.exports = j;
}, null);
__d("FlipDirection", ["DOM", "Input", "Style"], function (a, b, c, d, e, f, g, h, i) {
    var j = {
        setDirection: function (k) {
            var l = g.isNodeOfType(k, 'input') && (k.type == 'text'), m = g.isNodeOfType(k, 'textarea');
            if (!(l || m) || k.getAttribute('data-prevent-auto-flip'))return;
            var n = h.getValue(k), o = (k.style && k.style.direction);
            if (!o) {
                var p = 0, q = true;
                for (var r = 0; r < n.length; r++) {
                    var s = n.charCodeAt(r);
                    if (s >= 48) {
                        if (q) {
                            q = false;
                            p++;
                        }
                        if (s >= 1470 && s <= 1920) {
                            i.set(k, 'direction', 'rtl');
                            k.setAttribute('dir', 'rtl');
                            return;
                        }
                        if (p == 5) {
                            i.set(k, 'direction', 'ltr');
                            k.setAttribute('dir', 'ltr');
                            return;
                        }
                    } else q = true;
                }
            } else if (n.length === 0) {
                i.set(k, 'direction', '');
                k.removeAttribute('dir');
            }
        }
    };
    e.exports = j;
}, null);
__d("FlipDirectionOnKeypress", ["Event", "FlipDirection"], function (a, b, c, d, e, f, g, h) {
    var i = function (event) {
        var j = event.getTarget();
        h.setDirection(j);
    };
    g.listen(document.documentElement, {keyup: i, input: i});
}, null);
__d("getActiveElement", [], function (a, b, c, d, e, f) {
    function g() {
        try {
            return document.activeElement || document.body;
        } catch (h) {
            return document.body;
        }
    }

    e.exports = g;
}, null);
__d("FocusListener", ["Arbiter", "CSS", "Event", "Parent", "getActiveElement"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {
        expandInput: function (q) {
            h.addClass(q, 'child_is_active');
            h.addClass(q, 'child_is_focused');
            h.addClass(q, 'child_was_focused');
            g.inform('reflow');
        }
    };

    function m(q, r) {
        if (r.getAttribute('data-silentfocuslistener'))return;
        var s = j.byClass(r, 'focus_target');
        if (s)if ('focus' == q || 'focusin' == q) {
            l.expandInput(s);
        } else {
            if (r.value === '')h.removeClass(s, 'child_is_active');
            h.removeClass(s, 'child_is_focused');
        }
    }

    var n = k();
    if (n)m('focus', n);
    function o(event) {
        event = event || window.event;
        m(event.type, event.target || event.srcElement);
    }

    var p = document.documentElement;
    if (p.addEventListener) {
        p.addEventListener('focus', o, true);
        p.addEventListener('blur', o, true);
    } else {
        p.attachEvent('onfocusin', o);
        p.attachEvent('onfocusout', o);
    }
    i.listen(document.documentElement, 'submit', function () {
    });
    e.exports = l;
}, null);
__d("PluginMessage", ["DOMEventListener"], function (a, b, c, d, e, f, g) {
    var h = {
        listen: function () {
            g.add(window, 'message', function (event) {
                if ((/\.facebook\.com$/).test(event.origin) && /^FB_POPUP:/.test(event.data)) {
                    var i = JSON.parse(event.data.substring(9));
                    if ('reload' in i && /^https?:/.test(i.reload))document.location.replace(i.reload);
                }
            });
        }
    };
    e.exports = h;
}, null);
__d("getViewportDimensions", [], function (a, b, c, d, e, f) {
    function g() {
        return (document.documentElement && document.documentElement.clientWidth) || (document.body && document.body.clientWidth) || 0;
    }

    function h() {
        return (document.documentElement && document.documentElement.clientHeight) || (document.body && document.body.clientHeight) || 0;
    }

    function i() {
        return {width: window.innerWidth || g(), height: window.innerHeight || h()};
    }

    i.withoutScrollbars = function () {
        return {width: g(), height: h()};
    };
    e.exports = i;
}, null);
__d("DOMDimensions", ["Style", "getDocumentScrollElement", "getViewportDimensions"], function (a, b, c, d, e, f, g, h, i) {
    var j = {
        getElementDimensions: function (k) {
            return {width: k.offsetWidth || 0, height: k.offsetHeight || 0};
        },
        getViewportDimensions: i,
        getViewportWithoutScrollbarDimensions: i.withoutScrollbars,
        getDocumentDimensions: function (k) {
            var l = h(k), m = l.scrollWidth || 0, n = l.scrollHeight || 0;
            return {width: m, height: n};
        },
        measureElementBox: function (k, l, m, n, o) {
            var p;
            switch (l) {
                case 'left':
                case 'right':
                case 'top':
                case 'bottom':
                    p = [l];
                    break;
                case 'width':
                    p = ['left', 'right'];
                    break;
                case 'height':
                    p = ['top', 'bottom'];
                    break;
                default:
                    throw Error('Invalid plane: ' + l);
            }
            var q = function (r, s) {
                var t = 0;
                for (var u = 0; u < p.length; u++)t += parseInt(g.get(k, r + '-' + p[u] + s), 10) || 0;
                return t;
            };
            return (m ? q('padding', '') : 0) + (n ? q('border', '-width') : 0) + (o ? q('margin', '') : 0);
        }
    };
    e.exports = j;
}, null);
__d("KeyStatus", ["Event", "ExecutionEnvironment"], function (a, b, c, d, e, f, g, h) {
    var i = null, j = null;

    function k() {
        if (!j)j = g.listen(window, 'blur', function () {
            i = null;
            l();
        });
    }

    function l() {
        if (j) {
            j.remove();
            j = null;
        }
    }

    function m(event) {
        i = g.getKeyCode(event);
        k();
    }

    function n() {
        i = null;
        l();
    }

    if (h.canUseDOM) {
        var o = document.documentElement;
        if (o.addEventListener) {
            o.addEventListener('keydown', m, true);
            o.addEventListener('keyup', n, true);
        } else {
            o.attachEvent('onkeydown', m);
            o.attachEvent('onkeyup', n);
        }
    }
    var p = {
        isKeyDown: function () {
            return !!i;
        }, getKeyDownCode: function () {
            return i;
        }
    };
    e.exports = p;
}, null);
__d("BehaviorsMixin", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(l) {
        this._behavior = l;
        this._enabled = false;
    }

    g(h.prototype, {
        enable: function () {
            if (!this._enabled) {
                this._enabled = true;
                this._behavior.enable();
            }
        }, disable: function () {
            if (this._enabled) {
                this._enabled = false;
                this._behavior.disable();
            }
        }
    });
    var i = 1;

    function j(l) {
        if (!l.__BEHAVIOR_ID)l.__BEHAVIOR_ID = i++;
        return l.__BEHAVIOR_ID;
    }

    var k = {
        enableBehavior: function (l) {
            if (!this._behaviors)this._behaviors = {};
            var m = j(l);
            if (!this._behaviors[m])this._behaviors[m] = new h(new l(this));
            this._behaviors[m].enable();
            return this;
        }, disableBehavior: function (l) {
            if (this._behaviors) {
                var m = j(l);
                if (this._behaviors[m])this._behaviors[m].disable();
            }
            return this;
        }, enableBehaviors: function (l) {
            l.forEach(this.enableBehavior.bind(this));
            return this;
        }, destroyBehaviors: function () {
            if (this._behaviors) {
                for (var l in this._behaviors)this._behaviors[l].disable();
                this._behaviors = {};
            }
        }, hasBehavior: function (l) {
            return this._behaviors && (j(l) in this._behaviors);
        }
    };
    e.exports = k;
}, null);
__d("BootloadedReact", ["Bootloader"], function (a, b, c, d, e, f, g) {
    var h = function (j) {
        g.loadModules(["React"], j);
    }, i = {
        isValidElement: function (j) {
            return !!(j && j._isReactElement);
        }, initializeTouchEvents: function (j, k) {
            h(function (l) {
                l.initializeTouchEvents(j);
                k && k();
            });
        }, createClass: function (j, k) {
            h(function (l) {
                var m = l.createClass(j);
                k && k(m);
            });
        }, render: function (j, k, l) {
            h(function (m) {
                var n = m.render(j, k);
                l && l(n);
            });
        }, unmountComponentAtNode: function (j, k) {
            h(function (l) {
                l.unmountComponentAtNode(j);
                k && k();
            });
        }
    };
    e.exports = i;
}, null);
__d("ContextualThing", ["CSS", "DOM", "ge"], function (a, b, c, d, e, f, g, h, i) {
    var j = {
        register: function (k, l) {
            k.setAttribute('data-ownerid', h.getID(l));
        }, containsIncludingLayers: function (k, l) {
            while (l) {
                if (h.contains(k, l))return true;
                l = j.getContext(l);
            }
            return false;
        }, getContext: function (k) {
            var l;
            while (k) {
                if (k.getAttribute && (l = k.getAttribute('data-ownerid')))return i(l);
                k = k.parentNode;
            }
            return null;
        }, parentByClass: function (k, l) {
            var m;
            while (k && !g.hasClass(k, l))if (k.getAttribute && (m = k.getAttribute('data-ownerid'))) {
                k = i(m);
            } else k = k.parentNode;
            return k;
        }
    };
    e.exports = j;
}, null);
__d("getElementText", ["isElementNode", "isTextNode"], function (a, b, c, d, e, f, g, h) {
    var i = null;

    function j(k) {
        if (h(k)) {
            return k.data;
        } else if (g(k)) {
            if (i === null) {
                var l = document.createElement('div');
                i = l.textContent != null ? 'textContent' : 'innerText';
            }
            return k[i];
        } else return '';
    }

    e.exports = j;
}, null);
__d("KeyEventController", ["DOMQuery", "Event", "Run", "getElementText", "isEmpty"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = null, m = ['input', 'select', 'textarea', 'object', 'embed'], n = {
        button: 1,
        checkbox: 1,
        radio: 1,
        submit: 1
    }, o = {
        BACKSPACE: [8],
        TAB: [9],
        RETURN: [13],
        ESCAPE: [27],
        LEFT: [37, 63234],
        UP: [38, 63232],
        RIGHT: [39, 63235],
        DOWN: [40, 63233],
        DELETE: [46],
        COMMA: [188],
        PERIOD: [190],
        SLASH: [191],
        '`': [192],
        '[': [219],
        ']': [221],
        PAGE_UP: [33],
        PAGE_DOWN: [34],
        SPACE: [32],
        KP_DOT: [46, 110]
    }, p = {8: 1, 9: 1, 13: 1, 27: 1, 32: 1, 37: 1, 63234: 1, 38: 1, 63232: 1, 39: 1, 63235: 1, 40: 1, 63233: 1, 46: 1};

    function q() {
        "use strict";
        this.handlers = {};
        document.onkeyup = this.onkeyevent.bind(this, 'onkeyup');
        document.onkeydown = this.onkeyevent.bind(this, 'onkeydown');
        document.onkeypress = this.onkeyevent.bind(this, 'onkeypress');
    }

    q.prototype.mapKey = function (r) {
        "use strict";
        if (r >= 0 && r <= 9) {
            if (typeof(r) != 'number')r = r.charCodeAt(0) - 48;
            return [48 + r, 96 + r];
        }
        var s = o[r.toUpperCase()];
        if (s)return s;
        return [r.toUpperCase().charCodeAt(0)];
    };
    q.prototype.onkeyevent = function (r, s) {
        "use strict";
        s = h.$E(s);
        var t = this.handlers[s.keyCode] || this.handlers[s.which], u, v, w;
        if (t)for (var x = 0; x < t.length; x++) {
            u = t[x].callback;
            v = t[x].filter;
            try {
                if (!v || v(s, r)) {
                    w = u(s, r);
                    if (w === false)return h.kill(s);
                }
            } catch (y) {
            }
        }
        return true;
    };
    q.prototype.resetHandlers = function () {
        "use strict";
        this.handlers = {};
    };
    q.getInstance = function () {
        "use strict";
        return l || (l = new q());
    };
    q.defaultFilter = function (event, r) {
        "use strict";
        event = h.$E(event);
        return q.filterEventTypes(event, r) && q.filterEventTargets(event, r) && q.filterEventModifiers(event, r);
    };
    q.filterEventTypes = function (event, r) {
        "use strict";
        if (r === 'onkeydown')return true;
        return false;
    };
    q.filterEventTargets = function (event, r) {
        "use strict";
        var s = event.getTarget(), t = (s.contentEditable === 'true' || s.contentEditable === 'plaintext-only');
        return (!(t || g.isNodeOfType(s, m)) || s.type in n || (event.keyCode in p && ((g.isNodeOfType(s, ['input', 'textarea']) && s.value.length === 0) || (t && j(s).length === 0))));
    };
    q.filterEventModifiers = function (event, r) {
        "use strict";
        if (event.ctrlKey || event.altKey || event.metaKey || event.repeat)return false;
        return true;
    };
    q.registerKey = function (r, s, t, u) {
        "use strict";
        if (t === (void 0))t = q.defaultFilter;
        var v = q.getInstance(), w = v.mapKey(r);
        if (k(v.handlers))i.onLeave(v.resetHandlers.bind(v));
        var x = {};
        for (var y = 0; y < w.length; y++) {
            r = w[y];
            if (!v.handlers[r] || u)v.handlers[r] = [];
            var z = {callback: s, filter: t};
            x[r] = z;
            v.handlers[r].push(z);
        }
        return {
            remove: function () {
                for (var aa in x) {
                    if (v.handlers[aa] && v.handlers[aa].length) {
                        var ba = v.handlers[aa].indexOf(x[aa]);
                        ba >= 0 && v.handlers[aa].splice(ba, 1);
                    }
                    delete x[aa];
                }
            }
        };
    };
    e.exports = q;
}, null);
__d("removeFromArray", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        var j = h.indexOf(i);
        j != -1 && h.splice(j, 1);
    }

    e.exports = g;
}, null);
__d("forEachObject", [], function (a, b, c, d, e, f) {
    'use strict';
    var g = Object.prototype.hasOwnProperty;

    function h(i, j, k) {
        for (var l in i)if (g.call(i, l))j.call(k, i[l], l, i);
    }

    e.exports = h;
}, null);
__d("TimerStorage", ["forEachObject"], function (a, b, c, d, e, f, g) {
    var h = {
        TIMEOUT: 'TIMEOUT',
        INTERVAL: 'INTERVAL',
        IMMEDIATE: 'IMMEDIATE',
        ANIMATION_FRAME: 'ANIMATION_FRAME'
    }, i = {};
    g(h, function (k, l) {
        return i[l] = [];
    });
    var j = {
        push: function (k, l) {
            i[k].push(l);
        }, popAll: function (k, l) {
            i[k].forEach(l);
            i[k].length = 0;
        }
    };
    Object.assign(j, h);
    e.exports = j;
}, null);
__d("setImmediateAcrossTransitions", ["TimeSlice", "setImmediatePolyfill"], function (a, b, c, d, e, f, g, h) {
    e.exports = function () {
        for (var i = [], j = 0, k = arguments.length; j < k; j++)i.push(arguments[j]);
        i[0] = g.guard(i[0], 'setImmediate');
        return h.apply(a, i);
    };
}, null);
__d("setImmediate", ["TimerStorage", "setImmediateAcrossTransitions"], function (a, b, c, d, e, f, g, h) {
    e.exports = function () {
        for (var i = [], j = 0, k = arguments.length; j < k; j++)i.push(arguments[j]);
        var l = h.apply(a, i);
        g.push(g.IMMEDIATE, l);
        return l;
    };
}, null);
__d("Layer", ["ArbiterMixin", "BehaviorsMixin", "BootloadedReact", "ContextualThing", "CSS", "DataStore", "DOM", "Event", "HTML", "KeyEventController", "Parent", "Style", "copyProperties", "cx", "ge", "mixin", "removeFromArray", "setImmediate", "KeyStatus"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
    b('KeyStatus');
    var y = [], z = v(g, h);
    for (var aa in z)if (z.hasOwnProperty(aa))ca[aa] = z[aa];
    var ba = z === null ? null : z.prototype;
    ca.prototype = Object.create(ba);
    ca.prototype.constructor = ca;
    ca.__superConstructor__ = z;
    function ca(fa, ga) {
        "use strict";
        this._config = fa || {};
        if (ga) {
            this._configure(this._config, ga);
            var ha = this._config.addedBehaviors || [];
            this.enableBehaviors(this._getDefaultBehaviors().concat(ha));
        }
    }

    ca.prototype.init = function (fa) {
        "use strict";
        this._configure(this._config, fa);
        var ga = this._config.addedBehaviors || [];
        this.enableBehaviors(this._getDefaultBehaviors().concat(ga));
        this._initialized = true;
        return this;
    };
    ca.prototype._configure = function (fa, ga) {
        "use strict";
        if (ga) {
            var ha = m.isNode(ga), ia = typeof ga === 'string' || o.isHTML(ga);
            this.containsReactComponent = i.isValidElement(ga);
            if (ia) {
                ga = o(ga).getRootNode();
            } else if (this.containsReactComponent) {
                var ja = document.createElement('div');
                i.render(ga, ja);
                ga = this._reactContainer = ja;
            }
        }
        this._root = this._buildWrapper(fa, ga);
        if (fa.attributes)m.setAttributes(this._root, fa.attributes);
        if (fa.classNames)fa.classNames.forEach(k.addClass.bind(null, this._root));
        k.addClass(this._root, 'uiLayer');
        if (fa.causalElement)this._causalElement = u(fa.causalElement);
        if (fa.permanent)this._permanent = fa.permanent;
        l.set(this._root, 'layer', this);
    };
    ca.prototype._getDefaultBehaviors = function () {
        "use strict";
        return [];
    };
    ca.prototype.getCausalElement = function () {
        "use strict";
        return this._causalElement;
    };
    ca.prototype.setCausalElement = function (fa) {
        "use strict";
        this._causalElement = fa;
        return this;
    };
    ca.prototype.getInsertParent = function () {
        "use strict";
        return this._insertParent || document.body;
    };
    ca.prototype.getRoot = function () {
        "use strict";
        return this._root;
    };
    ca.prototype.getContentRoot = function () {
        "use strict";
        return this._root;
    };
    ca.prototype._buildWrapper = function (fa, ga) {
        "use strict";
        return ga;
    };
    ca.prototype.setInsertParent = function (fa) {
        "use strict";
        if (fa) {
            if (this._shown && fa !== this.getInsertParent()) {
                m.appendContent(fa, this.getRoot());
                this.updatePosition();
            }
            this._insertParent = fa;
        }
        return this;
    };
    ca.prototype.showAfterDelay = function (fa) {
        "use strict";
        setTimeout(this.show.bind(this), fa);
    };
    ca.prototype.show = function () {
        "use strict";
        if (this._shown)return this;
        var fa = this.getRoot();
        this.inform('beforeshow');
        r.set(fa, 'visibility', 'hidden');
        r.set(fa, 'overflow', 'hidden');
        k.show(fa);
        m.appendContent(this.getInsertParent(), fa);
        if (this.updatePosition() !== false) {
            this._shown = true;
            this.inform('show');
            ca.inform('show', this);
            if (!this._permanent)setTimeout(function () {
                if (this._shown)y.push(this);
            }.bind(this), 0);
        } else k.hide(fa);
        r.set(fa, 'visibility', '');
        r.set(fa, 'overflow', '');
        this.inform('aftershow');
        return this;
    };
    ca.prototype.hide = function () {
        "use strict";
        if (this._hiding || !this._shown || this.inform('beforehide') === false)return this;
        this._hiding = true;
        if (this.inform('starthide') !== false)this.finishHide();
        return this;
    };
    ca.prototype.conditionShow = function (fa) {
        "use strict";
        return fa ? this.show() : this.hide();
    };
    ca.prototype.finishHide = function () {
        "use strict";
        if (this._shown) {
            if (!this._permanent)w(y, this);
            this._hiding = false;
            this._shown = false;
            k.hide(this.getRoot());
            this.inform('hide');
            ca.inform('hide', this);
        }
    };
    ca.prototype.isShown = function () {
        "use strict";
        return this._shown;
    };
    ca.prototype.updatePosition = function () {
        "use strict";
        return true;
    };
    ca.prototype.destroy = function () {
        "use strict";
        if (this.containsReactComponent)i.unmountComponentAtNode(this._reactContainer);
        this.finishHide();
        var fa = this.getRoot();
        m.remove(fa);
        this.destroyBehaviors();
        this.inform('destroy');
        ca.inform('destroy', this);
        l.remove(fa, 'layer');
        this._root = this._causalElement = null;
    };
    ca.init = function (fa, ga) {
        "use strict";
        fa.init(ga);
    };
    ca.initAndShow = function (fa, ga) {
        "use strict";
        fa.init(ga).show();
    };
    ca.show = function (fa) {
        "use strict";
        fa.show();
    };
    ca.showAfterDelay = function (fa, ga) {
        "use strict";
        fa.showAfterDelay(ga);
    };
    ca.getTopmostLayer = function () {
        "use strict";
        return y[y.length - 1];
    };
    s(ca, g);
    s(ca.prototype, {
        _initialized: false,
        _root: null,
        _shown: false,
        _hiding: false,
        _causalElement: null,
        _reactContainer: null
    });
    n.listen(document.documentElement, 'keydown', function (event) {
        if (p.filterEventTargets(event, 'keydown'))for (var fa = y.length - 1; fa >= 0; fa--)if (y[fa].inform('key', event) === false)return false;
    }, n.Priority.URGENT);
    var da;
    n.listen(document.documentElement, 'mousedown', function (event) {
        da = event.getTarget();
    });
    var ea;
    n.listen(document.documentElement, 'mouseup', function (event) {
        ea = event.getTarget();
        x(function () {
            da = null;
            ea = null;
        });
    });
    n.listen(document.documentElement, 'click', function (event) {
        var fa = da, ga = ea;
        da = null;
        ea = null;
        var ha = y.length;
        if (!ha)return;
        var ia = event.getTarget();
        if (ia !== ga || ia !== fa)return;
        if (!m.contains(document.documentElement, ia))return;
        if (!ia.offsetWidth)return;
        if (q.byClass(ia, 'generic_dialog') || q.byClass(ia, "_3sod"))return;
        while (ha--) {
            var ja = y[ha], ka = ja.getContentRoot();
            if (j.containsIncludingLayers(ka, ia))return;
            if (ja.inform('blur') === false || ja.isShown())return;
        }
    });
    e.exports = ca;
}, null);
__d("Popup", [], function (a, b, c, d, e, f) {
    var g = {
        open: function (h, i, j) {
            var k = document.body, l = 'screenX' in window ? window.screenX : window.screenLeft, m = 'screenY' in window ? window.screenY : window.screenTop, n = 'outerWidth' in window ? window.outerWidth : k.clientWidth, o = 'outerHeight' in window ? window.outerHeight : k.clientHeight - 22, p = Math.floor(l + (n - i) / 2), q = Math.floor(m + (o - j) / 2.5), r = ['width=' + i, 'height=' + j, 'left=' + p, 'top=' + q];
            return window.open(h, '_blank', r.join(','));
        }
    };
    e.exports = g;
}, null);
__d("PopupWindow", ["DOMDimensions", "DOMQuery", "Layer", "Popup", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = {
        _opts: {allowShrink: true, strategy: 'vector', timeout: 100, widthElement: null}, init: function (m) {
            k(l._opts, m);
            setInterval(l._resizeCheck, l._opts.timeout);
        }, _resizeCheck: function () {
            var m = g.getViewportDimensions(), n = l._getDocumentSize(), o = i.getTopmostLayer();
            if (o) {
                var p = o.getRoot().firstChild, q = g.getElementDimensions(p);
                q.height += g.measureElementBox(p, 'height', true, true, true);
                q.width += g.measureElementBox(p, 'width', true, true, true);
                n.height = Math.max(n.height, q.height);
                n.width = Math.max(n.width, q.width);
            }
            var r = n.height - m.height, s = n.width - m.width;
            if (s < 0 && !l._opts.widthElement)s = 0;
            s = s > 1 ? s : 0;
            if (!l._opts.allowShrink && r < 0)r = 0;
            if (r || s)try {
                window.console && window.console.firebug;
                window.resizeBy(s, r);
                if (s)window.moveBy(s / -2, 0);
            } catch (t) {
            }
        }, _getDocumentSize: function () {
            var m = g.getDocumentDimensions();
            if (l._opts.strategy === 'offsetHeight')m.height = document.body.offsetHeight;
            if (l._opts.widthElement) {
                var n = h.scry(document.body, l._opts.widthElement)[0];
                if (n)m.width = g.getElementDimensions(n).width;
            }
            var o = a.Dialog;
            if (o && o.max_bottom && o.max_bottom > m.height)m.height = o.max_bottom;
            return m;
        }, open: function (m, n, o) {
            return j.open(m, o, n);
        }
    };
    e.exports = l;
}, null);
__d("PlatformVersions", [], function (a, b, c, d, e, f) {
    e.exports = {
        LATEST: "v2.3",
        versions: {UNVERSIONED: "unversioned", V1_0: "v1.0", V2_0: "v2.0", V2_1: "v2.1", V2_2: "v2.2", V2_3: "v2.3"}
    };
}, null);
__d("StrSet", [], function (a, b, c, d, e, f) {
    function g(h) {
        "use strict";
        this.$StrSet0 = {};
        this.$StrSet1 = 0;
        if (h)this.addAll(h);
    }

    g.prototype.add = function (h) {
        "use strict";
        if (!this.$StrSet0.hasOwnProperty(h)) {
            this.$StrSet0[h] = true;
            this.$StrSet1++;
        }
        return this;
    };
    g.prototype.addAll = function (h) {
        "use strict";
        h.forEach(this.add, this);
        return this;
    };
    g.prototype.remove = function (h) {
        "use strict";
        if (this.$StrSet0.hasOwnProperty(h)) {
            delete this.$StrSet0[h];
            this.$StrSet1--;
        }
        return this;
    };
    g.prototype.removeAll = function (h) {
        "use strict";
        h.forEach(this.remove, this);
        return this;
    };
    g.prototype.toArray = function () {
        "use strict";
        return Object.keys(this.$StrSet0);
    };
    g.prototype.toMap = function (h) {
        "use strict";
        var i = {};
        Object.keys(this.$StrSet0).forEach(function (j) {
            i[j] = typeof h == 'function' ? h(j) : h || true;
        });
        return i;
    };
    g.prototype.contains = function (h) {
        "use strict";
        return this.$StrSet0.hasOwnProperty(h);
    };
    g.prototype.count = function () {
        "use strict";
        return this.$StrSet1;
    };
    g.prototype.clear = function () {
        "use strict";
        this.$StrSet0 = {};
        this.$StrSet1 = 0;
        return this;
    };
    g.prototype.clone = function () {
        "use strict";
        return new g(this);
    };
    g.prototype.forEach = function (h, i) {
        "use strict";
        Object.keys(this.$StrSet0).forEach(h, i);
    };
    g.prototype.map = function (h, i) {
        "use strict";
        return Object.keys(this.$StrSet0).map(h, i);
    };
    g.prototype.some = function (h, i) {
        "use strict";
        return Object.keys(this.$StrSet0).some(h, i);
    };
    g.prototype.every = function (h, i) {
        "use strict";
        return Object.keys(this.$StrSet0).every(h, i);
    };
    g.prototype.filter = function (h, i) {
        "use strict";
        return new g(Object.keys(this.$StrSet0).filter(h, i));
    };
    g.prototype.union = function (h) {
        "use strict";
        return this.clone().addAll(h);
    };
    g.prototype.intersect = function (h) {
        "use strict";
        return this.filter(function (i) {
            return h.contains(i);
        });
    };
    g.prototype.difference = function (h) {
        "use strict";
        return h.filter(function (i) {
            return !this.contains(i);
        }.bind(this));
    };
    g.prototype.equals = function (h) {
        "use strict";
        var i = function (m, n) {
            return m === n ? 0 : m < n ? -1 : 1;
        }, j = this.toArray(), k = h.toArray();
        if (j.length !== k.length)return false;
        var l = j.length;
        j = j.sort(i);
        k = k.sort(i);
        while (l--)if (j[l] !== k[l])return false;
        return true;
    };
    e.exports = g;
}, null);
__d("PlatformBaseVersioning", ["PlatformVersions", "getObjectValues", "StrSet", "invariant"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = new i(h(g.versions)), l = location.pathname, m = l.substring(1, l.indexOf('/', 1)), n = k.contains(m) ? m : g.versions.UNVERSIONED;

    function o(r, s) {
        if (s == g.versions.UNVERSIONED)return r;
        j(k.contains(s));
        if (r.indexOf('/') !== 0)r = '/' + r;
        return '/' + s + r;
    }

    function p(r) {
        if (k.contains(r.substring(1, r.indexOf('/', 1))))return r.substring(r.indexOf('/', 1));
        return r;
    }

    var q = {
        addVersionToPath: o, getLatestVersion: function () {
            return g.LATEST;
        }, versionAwareURI: function (r) {
            return r.setPath(o(r.getPath(), n));
        }, versionAwarePath: function (r) {
            return o(r, n);
        }, getUnversionedPath: p
    };
    e.exports = q;
}, null);
__d("PluginConfirm", ["DOMEvent", "DOMEventListener", "PluginMessage", "PopupWindow", "URI", "copyProperties", "PlatformBaseVersioning"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    function n(o) {
        l(this, {plugin: o, confirm_params: {}, return_params: k.getRequestURI().getQueryData()});
        this.addReturnParams({ret: 'sentry'});
        delete this.return_params.hash;
    }

    l(n.prototype, {
        addConfirmParams: function (o) {
            l(this.confirm_params, o);
        }, addReturnParams: function (o) {
            l(this.return_params, o);
            return this;
        }, start: function () {
            var o = m.versionAwareURI(new k('/plugins/error/confirm/' + this.plugin)).addQueryData(this.confirm_params).addQueryData({
                secure: k.getRequestURI().isSecure(),
                plugin: this.plugin,
                return_params: JSON.stringify(this.return_params)
            });
            this.popup = j.open(o.toString(), 320, 486);
            i.listen();
            return this;
        }
    });
    n.starter = function (o, p, q) {
        var r = new n(o);
        r.addConfirmParams(p || {});
        r.addReturnParams(q || {});
        return r.start.bind(r);
    };
    n.listen = function (o, p, q, r) {
        h.add(o, 'click', function (s) {
            new g(s).kill();
            n.starter(p, q, r)();
        });
    };
    e.exports = n;
}, null);
__d("ArbiterFrame", [], function (a, b, c, d, e, f) {
    var g = {
        inform: function (h, i, j) {
            var k = parent.frames, l = k.length, m;
            i.crossFrame = true;
            for (var n = 0; n < l; n++) {
                m = k[n];
                try {
                    if (!m || m == window)continue;
                    if (m.require) {
                        m.require('Arbiter').inform(h, i, j);
                    } else if (m.ServerJSAsyncLoader)m.ServerJSAsyncLoader.wakeUp(h, i, j);
                } catch (o) {
                }
            }
        }
    };
    e.exports = g;
}, null);
__d("Plugin", ["Arbiter", "ArbiterFrame"], function (a, b, c, d, e, f, g, h) {
    var i = {
        CONNECT: 'platform/plugins/connect',
        DISCONNECT: 'platform/plugins/disconnect',
        ERROR: 'platform/plugins/error',
        RELOAD: 'platform/plugins/reload',
        DIALOG: 'platform/plugins/dialog',
        connect: function (j, k) {
            var l = {identifier: j, href: j, story_fbid: k};
            g.inform(i.CONNECT, l);
            h.inform(i.CONNECT, l);
        },
        disconnect: function (j, k) {
            var l = {identifier: j, href: j, story_fbid: k};
            g.inform(i.DISCONNECT, l);
            h.inform(i.DISCONNECT, l);
        },
        error: function (j, k) {
            g.inform(i.ERROR, {action: j, content: k});
        },
        reload: function (j) {
            g.inform(i.RELOAD, {reloadUrl: j || ''});
            h.inform(i.RELOAD, {reloadUrl: j || ''});
        },
        reloadOtherPlugins: function () {
            h.inform(i.RELOAD, {reloadUrl: ''});
        }
    };
    e.exports = i;
}, null);
__d("PlatformWidgetEndpoint", ["PlatformBaseVersioning"], function (a, b, c, d, e, f, g) {
    function h(m, n) {
        return g.versionAwarePath('/dialog' + '/' + m + (n ? '/' + n : ''));
    }

    function i(m, n) {
        return g.versionAwarePath('/plugins' + '/' + m + (n ? '/' + n : ''));
    }

    function j(m) {
        return (/^\/plugins\//).test(g.getUnversionedPath(m));
    }

    function k(m) {
        return (/^\/dialog\//).test(g.getUnversionedPath(m));
    }

    var l = {dialog: h, plugins: i, isPluginEndpoint: j, isDialogEndpoint: k};
    e.exports = l;
}, null);
__d("PluginOptin", ["DOMEvent", "DOMEventListener", "PluginMessage", "PopupWindow", "URI", "UserAgent_DEPRECATED", "copyProperties", "PlatformWidgetEndpoint"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    function o(p, q) {
        m(this, {
            return_params: k.getRequestURI().getQueryData(),
            login_params: {},
            optin_params: {},
            plugin: p,
            api_key: q
        });
        this.addReturnParams({ret: 'optin'});
        this.login_params.nux = false;
        delete this.return_params.hash;
    }

    m(o.prototype, {
        addReturnParams: function (p) {
            m(this.return_params, p);
            return this;
        }, addLoginParams: function (p) {
            m(this.login_params, p);
            return this;
        }, addOptinParams: function (p) {
            m(this.optin_params, p);
            return this;
        }, start: function () {
            var p = new k(n.dialog('plugin.optin')).addQueryData(this.optin_params).addQueryData({
                app_id: this.api_key || 127760087237610,
                secure: k.getRequestURI().isSecure(),
                social_plugin: this.plugin,
                return_params: JSON.stringify(this.return_params),
                login_params: JSON.stringify(this.login_params)
            });
            if (l.mobile()) {
                p.setSubdomain('m');
            } else p.addQueryData({display: 'popup'});
            this.popup = j.open(p.toString(), 420, 450);
            i.listen();
            return this;
        }
    });
    o.starter = function (p, q, r, s) {
        var t = new o(p);
        t.addReturnParams(q || {});
        t.addLoginParams(r || {});
        t.addOptinParams(s || {});
        return t.start.bind(t);
    };
    o.listen = function (p, q, r, s, t) {
        h.add(p, 'click', function (u) {
            new g(u).kill();
            o.starter(q, r, s, t)();
        });
    };
    e.exports = o;
}, null);
__d("csx", [], function (a, b, c, d, e, f) {
    function g(h) {
        throw new Error('csx: Unexpected class selector transformation.');
    }

    e.exports = g;
}, null);
__d("PluginConnectButton", ["Arbiter", "CSS", "DOM", "DOMDimensions", "DOMEvent", "DOMEventListener", "Form", "Plugin", "PluginOptin", "Style", "URI", "copyProperties", "csx", "cx", "getElementPosition", "PlatformWidgetEndpoint"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
    var w = g.SUBSCRIBE_NEW, x = g.subscribe, y = function (aa, ba) {
        return l.add(aa, 'click', ba);
    };

    function z(aa) {
        this.config = aa;
        this.busy = false;
        var ba = i.find(aa.form, '.pluginConnectButton');
        this.buttons = ba;
        this.node_connected = i.find(ba, '.pluginConnectButtonConnected');
        this.node_disconnected = i.find(ba, '.pluginConnectButtonDisconnected');
        var ca = function (ea) {
            new k(ea).kill();
            if (!this.busy) {
                this.submit();
                this.busy = this.canpersonalize;
            }
        }.bind(this);
        y(this.node_disconnected, ca);
        y(i.find(ba, '.pluginButtonX button'), ca);
        y(this.node_connected, function (ea) {
            return g.inform(n.DIALOG, ea);
        });
        var da = this.update.bind(this);
        x(n.CONNECT, da, w);
        x(n.DISCONNECT, da, w);
        x(n.ERROR, this.error.bind(this), w);
        x('Connect.Unsafe.xd/reposition', this.flip.bind(this));
        if (aa.autosubmit)setTimeout(this.submit.bind(this), 0);
    }

    r(z.prototype, {
        update: function (aa, event) {
            this.busy = false;
            var ba = this.config;
            if (event.identifier !== ba.identifier)return;
            var ca = aa === n.CONNECT ? true : false, da = v.plugins(ba.plugin);
            da += '/' + (!ca ? "connect" : "disconnect");
            h[ca ? 'show' : 'hide'](this.node_connected);
            h[ca ? 'hide' : 'show'](this.node_disconnected);
            try {
                if (document.activeElement.nodeName.toLowerCase() === 'button') {
                    var fa = ca ? this.node_connected : this.node_disconnected, ga = i.find(fa, 'button');
                    ga.disabled = false;
                    ga.focus();
                }
            } catch (ea) {
            }
            ba.connected = ca;
            ba.form.setAttribute('action', da);
            ba.form.setAttribute('ajaxify', da);
        }, error: function (event, aa) {
            this.busy = false;
            if (aa.action in {connect: 1, disconnect: 1}) {
                i.setContent(this.buttons, aa.content);
                i.find(this.buttons, 'a').focus();
            }
        }, submit: function () {
            if (!this.config.canpersonalize)return this.login();
            m.bootstrap(this.config.form);
            this.fireStateToggle();
        }, fireStateToggle: function () {
            var aa = this.config;
            if (aa.connected) {
                n.disconnect(aa.identifier);
            } else n.connect(aa.identifier);
        }, login: function () {
            var aa = this.config.plugin;
            new o(aa, q.getRequestURI().getQueryData().api_key).addReturnParams({act: 'connect'}).addLoginParams({social_plugin_action: this.config.pluginaction}).start();
        }, flip: function (aa, ba) {
            var ca = i.scry(document.body, "._4xn8");
            if (ca.length === 0) {
                return;
            } else ca = ca[0];
            var da = i.scry(this.config.form, '.pluginConnectButtonConnected .pluginButtonIcon'), ea = p.get(da[0], 'display') !== 'none' ? da[0] : da[1], fa = i.find(document.body, '.pluginConnectButtonLayoutRoot'), ga;
            if (ba.type === 'reposition') {
                h.addClass(fa, "_1f8a");
                p.set(fa, 'padding-left', 450 - fa.offsetWidth + 'px');
                h.removeClass(fa, "_1f8b");
                ga = u(ea).x + j.getElementDimensions(ea).width / 2 - 6;
            } else {
                h.addClass(fa, "_1f8b");
                p.set(fa, 'padding-left', '0px');
                h.removeClass(fa, "_1f8a");
                ga = 6;
            }
            p.set(ca, 'left', ga + 'px');
        }
    });
    e.exports = z;
}, null);
__d("keyMirror", ["invariant"], function (a, b, c, d, e, f, g) {
    'use strict';
    var h = function (i) {
        var j = {}, k;
        g(i instanceof Object && !Array.isArray(i));
        for (k in i) {
            if (!i.hasOwnProperty(k))continue;
            j[k] = k;
        }
        return j;
    };
    e.exports = h;
}, null);
__d("UnicodeBidiDirection", ["keyMirror"], function (a, b, c, d, e, f, g) {
    "use strict";
    var h = g({NEUTRAL: true, LTR: true, RTL: true});
    h.isStrong = function (i) {
        return i === h.LTR || i === h.RTL;
    };
    e.exports = h;
}, null);
__d("Locale", ["Style", "ExecutionEnvironment", "UnicodeBidiDirection"], function (a, b, c, d, e, f, g, h, i) {
    var j;

    function k() {
        if (!h.canUseDOM) {
            j = false;
        } else if (j === (void 0))j = ('rtl' === g.get(document.body, 'direction'));
        return j;
    }

    function l() {
        return k() ? i.RTL : i.LTR;
    }

    var m = {isRTL: k, getDirection: l};
    e.exports = m;
}, null);
__d("Log", ["sprintf"], function (a, b, c, d, e, f, g) {
    var h = {DEBUG: 3, INFO: 2, WARNING: 1, ERROR: 0};

    function i(k, l) {
        var m = Array.prototype.slice.call(arguments, 2), n = g.apply(null, m), o = window.console;
        if (o && j.level >= l)o[k in o ? k : 'log'](n);
    }

    var j = {
        level: -1,
        Level: h,
        debug: i.bind(null, 'debug', h.DEBUG),
        info: i.bind(null, 'info', h.INFO),
        warn: i.bind(null, 'warn', h.WARNING),
        error: i.bind(null, 'error', h.ERROR)
    };
    e.exports = j;
}, null);
__d("Queue", ["copyProperties"], function (a, b, c, d, e, f, g) {
    var h = {};

    function i(j) {
        "use strict";
        this._opts = g({interval: 0, processor: null}, j);
        this._queue = [];
        this._stopped = true;
    }

    i.prototype._dispatch = function (j) {
        "use strict";
        if (this._stopped || this._queue.length === 0)return;
        if (!this._opts.processor) {
            this._stopped = true;
            throw new Error('No processor available');
        }
        if (this._opts.interval) {
            this._opts.processor.call(this, this._queue.shift());
            this._timeout = setTimeout(this._dispatch.bind(this), this._opts.interval);
        } else while (this._queue.length)this._opts.processor.call(this, this._queue.shift());
    };
    i.prototype.enqueue = function (j) {
        "use strict";
        if (this._opts.processor && !this._stopped) {
            this._opts.processor.call(this, j);
        } else this._queue.push(j);
        return this;
    };
    i.prototype.start = function (j) {
        "use strict";
        if (j)this._opts.processor = j;
        this._stopped = false;
        this._dispatch();
        return this;
    };
    i.prototype.isStarted = function () {
        "use strict";
        return !this._stopped;
    };
    i.prototype.dispatch = function () {
        "use strict";
        this._dispatch(true);
    };
    i.prototype.stop = function (j) {
        "use strict";
        this._stopped = true;
        if (j)clearTimeout(this._timeout);
        return this;
    };
    i.prototype.merge = function (j, k) {
        "use strict";
        this._queue[k ? 'unshift' : 'push'].apply(this._queue, j._queue);
        j._queue = [];
        this._dispatch();
        return this;
    };
    i.prototype.getLength = function () {
        "use strict";
        return this._queue.length;
    };
    i.get = function (j, k) {
        "use strict";
        var l;
        if (j in h) {
            l = h[j];
        } else l = h[j] = new i(k);
        return l;
    };
    i.exists = function (j) {
        "use strict";
        return j in h;
    };
    i.remove = function (j) {
        "use strict";
        return delete h[j];
    };
    e.exports = i;
}, null);
__d("isInIframe", [], function (a, b, c, d, e, f) {
    var g = window != window.top;

    function h() {
        return g;
    }

    e.exports = h;
}, null);
__d("resolveWindow", [], function (a, b, c, d, e, f) {
    function g(h) {
        var i = window, j = h.split('.');
        try {
            for (var l = 0; l < j.length; l++) {
                var m = j[l], n = /^frames\[['"]?([a-zA-Z0-9\-_]+)['"]?\]$/.exec(m);
                if (n) {
                    i = i.frames[n[1]];
                } else if (m === 'opener' || m === 'parent' || m === 'top') {
                    i = i[m];
                } else return null;
            }
        } catch (k) {
            return null;
        }
        return i;
    }

    e.exports = g;
}, null);
__d("XD", ["Arbiter", "DOM", "DOMDimensions", "Log", "PHPQuerySerializer", "URI", "Queue", "isFacebookURI", "copyProperties", "isInIframe", "resolveWindow"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = 'fb_xdm_frame_' + location.protocol.replace(':', ''), s = {
        _callbacks: [],
        _opts: {
            autoResize: false,
            allowShrink: true,
            channelUrl: null,
            hideOverflow: false,
            resizeTimeout: 1000,
            resizeWidth: false,
            expectResizeAck: false,
            resizeAckTimeout: 6000
        },
        _lastResizeAckId: 0,
        _resizeCount: 0,
        _resizeTimestamp: 0,
        _shrinker: null,
        init: function (u) {
            this._opts = o(o({}, this._opts), u);
            if (this._opts.autoResize)this._startResizeMonitor();
            g.subscribe('Connect.Unsafe.resize.ack', function (v, w) {
                if (!w.id)w.id = this._resizeCount;
                if (w.id > this._lastResizeAckId)this._lastResizeAckId = w.id;
            }.bind(this));
        },
        getQueue: function () {
            if (!this._queue)this._queue = new m();
            return this._queue;
        },
        setChannelUrl: function (u) {
            this.getQueue().start(function (v) {
                return this.send(v, u);
            }.bind(this));
        },
        send: function (u, v) {
            v = v || this._opts.channelUrl;
            if (!v) {
                this.getQueue().enqueue(u);
                return;
            }
            var w = {}, x = new l(v);
            o(w, u);
            o(w, k.deserialize(x.getFragment()));
            var y = l(w.origin).getOrigin(), z = q(w.relation.replace(/^parent\./, '')), aa = 50, ba = function () {
                var ca = z.frames[r];
                try {
                    ca.proxyMessage(k.serialize(w), y);
                } catch (da) {
                    if (--aa) {
                        setTimeout(ba, 100);
                    } else j.warn('No such frame "' + r + '" to proxyMessage to');
                }
            };
            ba();
        },
        _computeSize: function () {
            var u = i.getDocumentDimensions(), v = 0;
            if (this._opts.resizeWidth) {
                var w = document.body;
                if (w.clientWidth < w.scrollWidth) {
                    v = u.width;
                } else {
                    var x = w.childNodes;
                    for (var y = 0; y < x.length; y++) {
                        var z = x[y], aa = z.offsetLeft + z.offsetWidth;
                        if (aa > v)v = aa;
                    }
                }
                v = Math.max(v, s.forced_min_width);
            }
            u.width = v;
            if (this._opts.allowShrink) {
                if (!this._shrinker)this._shrinker = h.create('div');
                h.appendContent(document.body, this._shrinker);
                u.height = Math.max(this._shrinker.offsetTop, 0);
            }
            return u;
        },
        _startResizeMonitor: function () {
            var u, v = document.documentElement;
            if (this._opts.hideOverflow) {
                v.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            }
            var w = (function () {
                var x = this._computeSize(), y = Date.now(), z = this._lastResizeAckId < this._resizeCount && (y - this._resizeTimestamp) > this._opts.resizeAckTimeout;
                if (!u || (this._opts.expectResizeAck && z) || (this._opts.allowShrink && u.width != x.width) || (!this._opts.allowShrink && u.width < x.width) || (this._opts.allowShrink && u.height != x.height) || (!this._opts.allowShrink && u.height < x.height)) {
                    u = x;
                    this._resizeCount++;
                    this._resizeTimestamp = y;
                    var aa = {type: 'resize', height: x.height, ackData: {id: this._resizeCount}};
                    if (x.width && x.width != 0)aa.width = x.width;
                    try {
                        if (n(l(document.referrer)) && p() && window.name && window.parent.location && window.parent.location.toString && n(l(window.parent.location))) {
                            var ca = window.parent.document.getElementsByTagName('iframe');
                            for (var da = 0; da < ca.length; da = da + 1)if (ca[da].name == window.name) {
                                if (this._opts.resizeWidth)ca[da].style.width = aa.width + 'px';
                                ca[da].style.height = aa.height + 'px';
                            }
                        }
                        this.send(aa);
                    } catch (ba) {
                        this.send(aa);
                    }
                }
            }).bind(this);
            w();
            setInterval(w, this._opts.resizeTimeout);
        }
    }, t = o({}, s);
    e.exports.UnverifiedXD = t;
    e.exports.XD = s;
    a.UnverifiedXD = t;
    a.XD = s;
}, null);
__d("UnverifiedXD", ["XD"], function (a, b, c, d, e, f) {
    var g = b('XD').UnverifiedXD;
    e.exports = g;
}, null);
__d("getOffsetParent", ["Style"], function (a, b, c, d, e, f, g) {
    function h(i) {
        var j = i.parentNode;
        if (!j || j === document.documentElement)return document.documentElement;
        if (g.get(j, 'position') !== 'static')return j;
        return j === document.body ? document.documentElement : h(j);
    }

    e.exports = h;
}, null);
__d("PluginResize", ["Locale", "Log", "UnverifiedXD", "copyProperties", "getOffsetParent", "getStyleProperty"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(q) {
        q = q || document.body;
        var r = 0, s = k(q);
        if (g.isRTL() && s) {
            r = s.offsetWidth - q.offsetLeft - q.offsetWidth;
        } else if (!g.isRTL())r = q.offsetLeft;
        return n(q) + r;
    }

    function n(q) {
        return Math.ceil(parseFloat(l(q, 'width'))) || q.offsetWidth;
    }

    function o(q) {
        q = q || document.body;
        return q.offsetHeight + q.offsetTop;
    }

    function p(q, r, event, s) {
        this.calcWidth = q || m;
        this.calcHeight = r || o;
        this.width = (void 0);
        this.height = (void 0);
        this.reposition = !!s;
        this.event = event || 'resize';
    }

    j(p.prototype, {
        resize: function () {
            var q = this.calcWidth(), r = this.calcHeight();
            if (q !== this.width || r !== this.height) {
                h.debug('Resizing Plugin: (%s, %s, %s, %s)', q, r, this.event, this.reposition);
                this.width = q;
                this.height = r;
                i.send({type: this.event, width: q, height: r, reposition: this.reposition});
            }
            return this;
        }, auto: function (q) {
            setInterval(this.resize.bind(this), q || 250);
            return this;
        }
    });
    p.auto = function (q, event, r) {
        return new p(m.bind(null, q), o.bind(null, q), event).resize().auto(r);
    };
    p.autoHeight = function (q, r, event, s) {
        return new p(function () {
            return q;
        }, o.bind(null, r), event).resize().auto(s);
    };
    p.getElementWidth = n;
    e.exports = p;
}, null);
__d("PluginConnectButtonResize", ["DOMDimensions", "DOMQuery", "PluginResize", "Style", "getElementPosition"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m, n, o) {
        if (o)j.set(m, 'width', o + 'px');
        i.auto(m, 'resize.flow');
        function p() {
            var q = h.scry(document.body, '.uiTypeaheadView')[0];
            if (!q)return {x: 0, y: 0};
            var r = k(q), s = g.getElementDimensions(q);
            return {x: r.x + s.width, y: r.y + s.height};
        }

        new i(function () {
            return Math.max(i.getElementWidth(m), n && n.offsetWidth, p().x);
        }, function () {
            return Math.max(m.offsetHeight, n ? n.offsetHeight + n.offsetTop : 0, p().y);
        }, 'resize.iframe', true).resize().auto();
    }

    e.exports = l;
}, null);
__d("PluginConnection", ["Arbiter", "CSS", "Plugin", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = function () {
    };
    j(k.prototype, {
        init: function (l, m, n, event) {
            event = event || i.CONNECT;
            this.identifier = l;
            this.element = m;
            this.css = n;
            g.subscribe([i.CONNECT, i.DISCONNECT], function (o, p) {
                if (l === p.href)h[o === event ? 'addClass' : 'removeClass'](m, n);
                return true;
            });
            return this;
        }, connected: function () {
            return h.hasClass(this.element, this.css);
        }, connect: function () {
            return g.inform(i.CONNECT, {href: this.identifier}, g.BEHAVIOR_STATE);
        }, disconnect: function () {
            return g.inform(i.DISCONNECT, {href: this.identifier}, g.BEHAVIOR_STATE);
        }, toggle: function () {
            return this.connected() ? this.disconnect() : this.connect();
        }
    });
    k.init = function (l) {
        for (var m, n = 0; n < l.length; n++) {
            m = new k();
            m.init.apply(m, l[n]);
        }
    };
    e.exports = k;
}, null);
__d("Button", ["CSS", "DataStore", "DOM", "Event", "Parent", "cx", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = 'uiButtonDisabled', o = 'uiButtonDepressed', p = "_42fr", q = "_42fs", r = 'button:blocker', s = 'href', t = 'ajaxify';

    function u(aa, ba) {
        var ca = h.get(aa, r);
        if (ba) {
            if (ca) {
                ca.remove();
                h.remove(aa, r);
            }
        } else if (!ca)h.set(aa, r, j.listen(aa, 'click', m.thatReturnsFalse, j.Priority.URGENT));
    }

    function v(aa) {
        var ba = k.byClass(aa, 'uiButton') || k.byClass(aa, "_42ft");
        if (!ba)throw new Error('invalid use case');
        return ba;
    }

    function w(aa) {
        return i.isNodeOfType(aa, 'a');
    }

    function x(aa) {
        return i.isNodeOfType(aa, 'button');
    }

    function y(aa) {
        return g.hasClass(aa, "_42ft");
    }

    var z = {
        getInputElement: function (aa) {
            aa = v(aa);
            if (w(aa))throw new Error('invalid use case');
            return x(aa) ? aa : i.find(aa, 'input');
        }, isEnabled: function (aa) {
            return !(g.hasClass(v(aa), n) || g.hasClass(v(aa), p));
        }, setEnabled: function (aa, ba) {
            aa = v(aa);
            var ca = y(aa) ? p : n;
            g.conditionClass(aa, ca, !ba);
            if (w(aa)) {
                var da = aa.getAttribute('href'), ea = aa.getAttribute('ajaxify'), fa = h.get(aa, s, '#'), ga = h.get(aa, t);
                if (ba) {
                    if (!da)aa.setAttribute('href', fa);
                    if (!ea && ga)aa.setAttribute('ajaxify', ga);
                    aa.removeAttribute('tabIndex');
                } else {
                    if (da && da !== fa)h.set(aa, s, da);
                    if (ea && ea !== ga)h.set(aa, t, ea);
                    aa.removeAttribute('href');
                    aa.removeAttribute('ajaxify');
                    aa.setAttribute('tabIndex', '-1');
                }
                u(aa, ba);
            } else {
                var ha = z.getInputElement(aa);
                ha.disabled = !ba;
                u(ha, ba);
            }
        }, setDepressed: function (aa, ba) {
            aa = v(aa);
            var ca = y(aa) ? q : o;
            g.conditionClass(aa, ca, ba);
        }, isDepressed: function (aa) {
            aa = v(aa);
            var ba = y(aa) ? q : o;
            return g.hasClass(aa, ba);
        }, setLabel: function (aa, ba) {
            aa = v(aa);
            if (y(aa)) {
                var ca = [];
                if (ba)ca.push(ba);
                var da = i.scry(aa, '.img')[0];
                if (da)if (aa.firstChild == da) {
                    ca.unshift(da);
                } else ca.push(da);
                i.setContent(aa, ca);
            } else if (w(aa)) {
                var ea = i.find(aa, 'span.uiButtonText');
                i.setContent(ea, ba);
            } else z.getInputElement(aa).value = ba;
            var fa = y(aa) ? "_42fv" : 'uiButtonNoText';
            g.conditionClass(aa, fa, !ba);
        }, setIcon: function (aa, ba) {
            if (ba && !i.isNode(ba))return;
            aa = v(aa);
            var ca = i.scry(aa, '.img')[0];
            if (!ba) {
                ca && i.remove(ca);
                return;
            }
            g.addClass(ba, 'customimg');
            if (ca != ba)if (ca) {
                i.replace(ca, ba);
            } else i.prependContent(aa, ba);
        }
    };
    e.exports = z;
}, null);
__d("debounceCore", [], function (a, b, c, d, e, f) {
    function g(h, i, j, k, l) {
        k = k || setTimeout;
        l = l || clearTimeout;
        var m;

        function n() {
            for (var o = [], p = 0, q = arguments.length; p < q; p++)o.push(arguments[p]);
            n.reset();
            m = k(function () {
                h.apply(j, o);
            }, i);
        }

        n.reset = function () {
            l(m);
        };
        return n;
    }

    e.exports = g;
}, null);
__d("debounce", ["debounceCore"], function (a, b, c, d, e, f, g) {
    function h(i, j, k, l) {
        if (j == null)j = 100;
        var m = function (n, o, p) {
            return setTimeout(n, o, p, !l);
        };
        return g(i, j, k, m);
    }

    e.exports = h;
}, null);
__d("TextInputControl", ["DOMControl", "Event", "Input", "debounce"], function (a, b, c, d, e, f, g, h, i, j) {
    for (var k in g)if (g.hasOwnProperty(k))m[k] = g[k];
    var l = g === null ? null : g.prototype;
    m.prototype = Object.create(l);
    m.prototype.constructor = m;
    m.__superConstructor__ = g;
    function m(n) {
        "use strict";
        g.call(this, n);
        var o = this.getRoot(), p = j(this.update.bind(this), 0);
        h.listen(o, {input: p, keydown: p, paste: p});
    }

    m.prototype.setMaxLength = function (n) {
        "use strict";
        i.setMaxLength(this.getRoot(), n);
        return this;
    };
    m.prototype.getValue = function () {
        "use strict";
        return i.getValue(this.getRoot());
    };
    m.prototype.isEmpty = function () {
        "use strict";
        return i.isEmpty(this.getRoot());
    };
    m.prototype.setValue = function (n) {
        "use strict";
        i.setValue(this.getRoot(), n);
        this.update();
        return this;
    };
    m.prototype.clear = function () {
        "use strict";
        return this.setValue('');
    };
    m.prototype.setPlaceholderText = function (n) {
        "use strict";
        i.setPlaceholder(this.getRoot(), n);
        return this;
    };
    e.exports = m;
}, null);
__d("transferTextStyles", ["Style"], function (a, b, c, d, e, f, g) {
    var h = {fontFamily: null, fontSize: null, fontStyle: null, fontWeight: null, lineHeight: null, wordWrap: null};

    function i(j, k) {
        for (var l in h)if (h.hasOwnProperty(l))h[l] = g.get(j, l);
        g.apply(k, h);
    }

    e.exports = i;
}, null);
__d("TextMetrics", ["DOM", "Style", "UserAgent_DEPRECATED", "transferTextStyles"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(m) {
        var n = m.clientWidth, o = (h.get(m, '-moz-box-sizing') == 'border-box');
        if (o && i.firefox() < 29)return n;
        var p = h.getFloat(m, 'paddingLeft') + h.getFloat(m, 'paddingRight');
        return n - p;
    }

    function l(m, n) {
        this._node = m;
        this._flexible = !!n;
        var o = 'textarea', p = 'textMetrics';
        if (this._flexible) {
            o = 'div';
            p += ' textMetricsInline';
        }
        this._shadow = g.create(o, {className: p});
        j(m, this._shadow);
        document.body.appendChild(this._shadow);
    }

    l.prototype.measure = function (m) {
        var n = this._node, o = this._shadow;
        m = (m || n.value) + '...';
        if (!this._flexible) {
            var p = k(n);
            h.set(o, 'width', Math.max(p, 0) + 'px');
        }
        if (n.nodeName === 'TEXTAREA') {
            o.value = m;
        } else g.setContent(o, m);
        return {width: o.scrollWidth, height: o.scrollHeight};
    };
    l.prototype.destroy = function () {
        g.remove(this._shadow);
    };
    e.exports = l;
}, null);
__d("classWithMixins", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(i, j) {
        var k = function () {
            i.apply(this, arguments);
        };
        k.prototype = g(Object.create(i.prototype), j.prototype);
        return k;
    }

    e.exports = h;
}, null);
__d("TextAreaControl", ["Arbiter", "ArbiterMixin", "CSS", "DOMControl", "Event", "Style", "TextInputControl", "TextMetrics", "classWithMixins", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    function q(v, w) {
        return l.getFloat(v, w) || 0;
    }

    var r = o(m, p(h));
    for (var s in r)if (r.hasOwnProperty(s))u[s] = r[s];
    var t = r === null ? null : r.prototype;
    u.prototype = Object.create(t);
    u.prototype.constructor = u;
    u.__superConstructor__ = r;
    function u(v) {
        "use strict";
        this.autogrow = i.hasClass(v, 'uiTextareaAutogrow');
        r.call(this, v);
        this.width = null;
        k.listen(v, 'focus', this._handleFocus.bind(this));
    }

    u.prototype.setAutogrow = function (v) {
        "use strict";
        this.autogrow = v;
        return this;
    };
    u.prototype.onupdate = function () {
        "use strict";
        t.onupdate.call(this);
        this.updateHeight();
    };
    u.prototype.updateHeight = function () {
        "use strict";
        if (this.autogrow) {
            var v = this.getRoot();
            if (!this.metrics)this.metrics = new n(v);
            if (typeof this.initialHeight === 'undefined') {
                this.isBorderBox = l.get(v, 'box-sizing') === 'border-box' || l.get(v, '-moz-box-sizing') === 'border-box' || l.get(v, '-webkit-box-sizing') === 'border-box';
                this.borderBoxOffset = q(v, 'padding-top') + q(v, 'padding-bottom') + q(v, 'border-top-width') + q(v, 'border-bottom-width');
                this.initialHeight = v.offsetHeight - this.borderBoxOffset;
            }
            var w = this.metrics.measure(), x = Math.max(this.initialHeight, w.height);
            if (this.isBorderBox)x += this.borderBoxOffset;
            if (x !== this.height) {
                this.height = x;
                l.set(v, 'height', x + 'px');
                g.inform('reflow');
                this.inform('resize');
            }
        } else if (this.metrics) {
            this.metrics.destroy();
            this.metrics = null;
        }
    };
    u.prototype.resetHeight = function () {
        "use strict";
        this.height = -1;
        this.update();
    };
    u.prototype._handleFocus = function () {
        "use strict";
        this.width = null;
    };
    u.getInstance = function (v) {
        "use strict";
        return j.getInstance(v) || new u(v);
    };
    e.exports = u;
}, null);
__d("PluginFlyout", ["Arbiter", "Button", "CSS", "DOM", "DOMEvent", "DOMEventListener", "Form", "Plugin", "TextAreaControl", "copyProperties", "csx"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = g.SUBSCRIBE_NEW, s = g.subscribe, t = g.inform, u = function (w, x) {
        return l.add(w, 'click', x);
    };

    function v(w, x, y) {
        var z = this, aa = s(n.CONNECT, function (event, ba) {
            g.unsubscribe(aa);
            z.init(w, x, y);
            z.connect(event, ba);
        }, r);
        s(n.DIALOG, function () {
            z.init(w, x, y);
            z.toggle();
        }, r);
    }

    p(v.prototype, {
        init: function (w, x, y) {
            if (this.initialized)return;
            this.initialized = true;
            j.appendContent(w, JSON.parse(y));
            var z = j.find(w, 'form'), aa = j.find(z, "._56zw"), ba = j.find(z, "._56zx"), ca = j.find(z, "._42x4"), da = o.getInstance(ca);
            l.add(ca, 'keyup', function (ha) {
                h.setEnabled(aa, !!da.getValue());
            });
            l.add(z, 'submit', function (ha) {
                new k(ha).kill();
                m.bootstrap(z);
            });
            var ea = (x === 'tiny') ? j.find(document.body, '.pluginPostFlyoutPrompt') : null;
            this.flyout = w;
            this.form = z;
            this.post_button = aa;
            this.prompt = ea;
            var fa = this.hide.bind(this), ga = this.show.bind(this);
            u(ba, function (ha) {
                new k(ha).kill();
                fa();
            });
            if (ea)u(ea, function (ha) {
                new k(ha).kill();
                ga();
            });
            s(n.CONNECT, this.connect.bind(this), r);
            s(n.DISCONNECT, function () {
                fa();
            }, r);
            s(v.SUCCESS, function () {
                fa();
                if (ea)i.hide(ea);
            }, r);
            s(n.ERROR, function (event, ha) {
                if (ha.action !== 'comment')return;
                j.setContent(j.find(z, "._56zy"), ha.content);
                i.hide(aa);
            }, r);
        }, connect: function (event, w) {
            if (w.crossFrame)return;
            if (this.prompt)return i.show(this.prompt);
            if (!w.story_fbid)this.show();
        }, show: function () {
            this.shown = true;
            i.show(this.flyout);
            i.show(this.post_button);
            this.form.comment.focus();
            t(v.SHOW);
        }, hide: function () {
            this.shown = false;
            i.hide(this.flyout);
            t(v.HIDE);
        }, toggle: function () {
            if (this.shown) {
                this.hide();
            } else this.show();
        }
    });
    p(v, {
        SUCCESS: 'platform/plugins/flyout/success',
        SHOW: 'platform/plugins/flyout/show',
        HIDE: 'platform/plugins/flyout/hide',
        success: function () {
            t(v.SUCCESS);
        }
    });
    e.exports = v;
}, null);
__d("PluginFlyoutDialog", ["Arbiter", "DOMEvent", "DOMEventListener", "PluginFlyout", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l(m, n, o) {
        this.parent = new j(m, n, o);
        this.flyout = m;
        g.subscribe(j.SHOW, this.show.bind(this), g.SUBSCRIBE_NEW);
    }

    k(l.prototype, {
        show: function () {
            if (this.subscribed)return;
            this.subscribed = 1;
            var m = window.ServerJSAsyncLoader;
            m && m.ondemandjs && m.run(m.ondemandjs);
            i.add(this.flyout.parentNode, 'click', (function (n) {
                n = new h(n);
                if (n.target === this.flyout.parentNode) {
                    n.kill();
                    this.parent.hide();
                }
            }).bind(this));
        }
    });
    e.exports = l;
}, null);
__d("AsyncDOM", ["CSS", "DOM"], function (a, b, c, d, e, f, g, h) {
    var i = {
        invoke: function (j, k) {
            for (var l = 0; l < j.length; ++l) {
                var m = j[l], n = m[0], o = m[1], p = m[2], q = m[3], r = (p && k) || null;
                if (o)r = h.scry(r || document.documentElement, o)[0];
                switch (n) {
                    case 'eval':
                        (new Function(q)).apply(r);
                        break;
                    case 'hide':
                        g.hide(r);
                        break;
                    case 'show':
                        g.show(r);
                        break;
                    case 'setContent':
                        h.setContent(r, q);
                        break;
                    case 'appendContent':
                        h.appendContent(r, q);
                        break;
                    case 'prependContent':
                        h.prependContent(r, q);
                        break;
                    case 'insertAfter':
                        h.insertAfter(r, q);
                        break;
                    case 'insertBefore':
                        h.insertBefore(r, q);
                        break;
                    case 'remove':
                        h.remove(r);
                        break;
                    case 'replace':
                        h.replace(r, q);
                        break;
                    default:
                }
            }
        }
    };
    e.exports = i;
}, null);
__d("BasicVector", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        "use strict";
        this.x = h;
        this.y = i;
    }

    g.prototype.derive = function (h, i) {
        "use strict";
        return new g(h, i);
    };
    g.prototype.toString = function () {
        "use strict";
        return '(' + this.x + ', ' + this.y + ')';
    };
    g.prototype.add = function (h, i) {
        "use strict";
        if (h instanceof g) {
            i = h.y;
            h = h.x;
        }
        var j = parseFloat(h), k = parseFloat(i);
        return this.derive(this.x + j, this.y + k);
    };
    g.prototype.mul = function (h, i) {
        "use strict";
        if (i === (void 0))i = h;
        return this.derive(this.x * h, this.y * i);
    };
    g.prototype.div = function (h, i) {
        "use strict";
        if (i === (void 0))i = h;
        return this.derive(this.x * 1 / h, this.y * 1 / i);
    };
    g.prototype.sub = function (h, i) {
        "use strict";
        if (arguments.length === 1) {
            return this.add(h.mul(-1));
        } else return this.add(-h, -i);
    };
    g.prototype.distanceTo = function (h) {
        "use strict";
        return this.sub(h).magnitude();
    };
    g.prototype.magnitude = function () {
        "use strict";
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    g.prototype.rotate = function (h) {
        "use strict";
        return this.derive(this.x * Math.cos(h) - this.y * Math.sin(h), this.x * Math.sin(h) + this.y * Math.cos(h));
    };
    e.exports = g;
}, null);
__d("getUnboundedScrollPosition", [], function (a, b, c, d, e, f) {
    "use strict";
    function g(h) {
        if (h === window)return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
        return {x: h.scrollLeft, y: h.scrollTop};
    }

    e.exports = g;
}, null);
__d("DOMVector", ["BasicVector", "getDocumentScrollElement", "getElementPosition", "getUnboundedScrollPosition", "getViewportDimensions"], function (a, b, c, d, e, f, g, h, i, j, k) {
    for (var l in g)if (g.hasOwnProperty(l))n[l] = g[l];
    var m = g === null ? null : g.prototype;
    n.prototype = Object.create(m);
    n.prototype.constructor = n;
    n.__superConstructor__ = g;
    function n(o, p, q) {
        "use strict";
        g.call(this, o, p);
        this.domain = q || 'pure';
    }

    n.prototype.derive = function (o, p, q) {
        "use strict";
        return new n(o, p, q || this.domain);
    };
    n.prototype.add = function (o, p) {
        "use strict";
        if (o instanceof n && o.getDomain() !== 'pure')o = o.convertTo(this.domain);
        return m.add.call(this, o, p);
    };
    n.prototype.convertTo = function (o) {
        "use strict";
        if (o != 'pure' && o != 'viewport' && o != 'document')return this.derive(0, 0);
        if (o == this.domain)return this.derive(this.x, this.y, this.domain);
        if (o == 'pure')return this.derive(this.x, this.y);
        if (this.domain == 'pure')return this.derive(0, 0);
        var p = n.getScrollPosition('document'), q = this.x, r = this.y;
        if (this.domain == 'document') {
            q -= p.x;
            r -= p.y;
        } else {
            q += p.x;
            r += p.y;
        }
        return this.derive(q, r, o);
    };
    n.prototype.getDomain = function () {
        "use strict";
        return this.domain;
    };
    n.from = function (o, p, q) {
        "use strict";
        return new n(o, p, q);
    };
    n.getScrollPosition = function (o) {
        "use strict";
        o = o || 'document';
        var p = j(window);
        return this.from(p.x, p.y, 'document').convertTo(o);
    };
    n.getElementPosition = function (o, p) {
        "use strict";
        p = p || 'document';
        var q = i(o);
        return this.from(q.x, q.y, 'viewport').convertTo(p);
    };
    n.getElementDimensions = function (o) {
        "use strict";
        return this.from(o.offsetWidth || 0, o.offsetHeight || 0);
    };
    n.getViewportDimensions = function () {
        "use strict";
        var o = k();
        return this.from(o.width, o.height, 'viewport');
    };
    n.getViewportWithoutScrollbarDimensions = function () {
        "use strict";
        var o = k.withoutScrollbars();
        return this.from(o.width, o.height, 'viewport');
    };
    n.getDocumentDimensions = function (o) {
        "use strict";
        var p = h(o);
        return this.from(p.scrollWidth, p.scrollHeight, 'document');
    };
    e.exports = n;
}, null);
__d("Vector", ["DOMVector", "Event"], function (a, b, c, d, e, f, g, h) {
    for (var i in g)if (g.hasOwnProperty(i))k[i] = g[i];
    var j = g === null ? null : g.prototype;
    k.prototype = Object.create(j);
    k.prototype.constructor = k;
    k.__superConstructor__ = g;
    function k(l, m, n) {
        "use strict";
        g.call(this, parseFloat(l), parseFloat(m), n);
    }

    k.prototype.derive = function (l, m, n) {
        "use strict";
        return new k(l, m, n || this.domain);
    };
    k.prototype.setElementPosition = function (l) {
        "use strict";
        var m = this.convertTo('document');
        l.style.left = parseInt(m.x, 10) + 'px';
        l.style.top = parseInt(m.y, 10) + 'px';
        return this;
    };
    k.prototype.setElementDimensions = function (l) {
        "use strict";
        return this.setElementWidth(l).setElementHeight(l);
    };
    k.prototype.setElementWidth = function (l) {
        "use strict";
        l.style.width = parseInt(this.x, 10) + 'px';
        return this;
    };
    k.prototype.setElementHeight = function (l) {
        "use strict";
        l.style.height = parseInt(this.y, 10) + 'px';
        return this;
    };
    k.prototype.scrollElementBy = function (l) {
        "use strict";
        if (l == document.body) {
            window.scrollBy(this.x, this.y);
        } else {
            l.scrollLeft += this.x;
            l.scrollTop += this.y;
        }
        return this;
    };
    k.from = function (l, m, n) {
        "use strict";
        return new k(l, m, n);
    };
    k.getEventPosition = function (l, m) {
        "use strict";
        m = m || 'document';
        var n = h.getPosition(l), o = this.from(n.x, n.y, 'document');
        return o.convertTo(m);
    };
    k.deserialize = function (l) {
        "use strict";
        var m = l.split(',');
        return this.from(m[0], m[1]);
    };
    e.exports = k;
}, null);
__d("throttle", ["copyProperties"], function (a, b, c, d, e, f, g) {
    function h(j, k, l) {
        return i(j, k, l, false, false);
    }

    g(h, {
        acrossTransitions: function (j, k, l) {
            return i(j, k, l, true, false);
        }, withBlocking: function (j, k, l) {
            return i(j, k, l, false, true);
        }, acrossTransitionsWithBlocking: function (j, k, l) {
            return i(j, k, l, true, true);
        }
    });
    function i(j, k, l, m, n) {
        if (k == null)k = 100;
        var o, p, q = null, r = function () {
            p = Date.now();
            if (o) {
                j.apply(l, o);
                o = null;
                q = setTimeout(r, k, !m);
            } else q = null;
        };
        return function s() {
            o = arguments;
            if (q === null || (Date.now() - p > k))if (n) {
                r();
            } else q = setTimeout(r, 0, !m);
        };
    }

    e.exports = h;
}, null);
__d("MorePagerFetchOnScroll", ["AsyncRequest", "DOMQuery", "Event", "Style", "Vector", "throttle"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = {};

    function n(o, p) {
        "use strict";
        this._pager = o;
        this._offset = p || 0;
        this._scrollParent = j.getScrollParent(o);
        this.setPagerInViewHandler(this._defaultPagerInViewHandler.bind(this));
        this._hasEventHandlers = false;
        if (!this.check()) {
            this._scrollListener = i.listen(this._scrollParent, 'scroll', l(function () {
                this.check();
            }.bind(this), 50));
            this._clickListener = i.listen(this._scrollParent, 'click', l(function () {
                this.check();
            }.bind(this), 50));
            this._hasEventHandlers = true;
        }
        m[o.id] = this;
    }

    n.prototype.check = function () {
        "use strict";
        if (!h.contains(document.body, this._pager)) {
            this.removeEventListeners();
            return true;
        }
        var o = k.getElementPosition(this._pager).y, p = this._scrollParent === window ? k.getViewportDimensions().y : k.getElementDimensions(this._scrollParent).y, q = this._scrollParent === window ? k.getScrollPosition().y + p : k.getElementPosition(this._scrollParent).y + p;
        if (o - this._offset < q) {
            this._inViewHandler();
            this.removeEventListeners();
            return true;
        }
        return false;
    };
    n.prototype.removeEventListeners = function () {
        "use strict";
        if (this._hasEventHandlers) {
            this._scrollListener && this._scrollListener.remove();
            this._clickListener && this._clickListener.remove();
            this._hasEventHandlers = false;
        }
    };
    n.prototype.setPagerInViewHandler = function (o) {
        "use strict";
        this._inViewHandler = o;
        return this;
    };
    n.prototype._defaultPagerInViewHandler = function () {
        "use strict";
        var o = h.scry(this._pager, 'a')[0];
        if (o)g.bootstrap(o.getAttribute('ajaxify') || o.href, o);
    };
    n.getInstance = function (o) {
        "use strict";
        return m[o];
    };
    e.exports = n;
}, null);
__d("PluginLikebox", ["AsyncDOM", "AsyncRequest", "CSS", "DOMEvent", "DOMEventListener", "DOMQuery", "EmbedLikeButton", "Event", "MorePagerFetchOnScroll", "PlatformWidgetEndpoint", "Popup", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s = 3;

    function t(u, v, w) {
        this.stream_id = u;
        this.force_wall = v;
        this.width = w;
        this.retries = 0;
        this.load();
        k.add(l.find(document.body, '.pluginLikeboxStream'), 'click', function (x) {
            var y = new j(x), z = y.target.parentNode;
            if (i.hasClass(z, 'text_exposed_link')) {
                y.kill();
                i.addClass(l.find(z, '^.text_exposed_root'), 'text_exposed');
            }
            var aa = y.target.href ? y.target : y.target.parentNode.href ? y.target.parentNode : null;
            if (aa && aa.pathname === '/sharer/sharer.php') {
                y.kill();
                q.open(aa.href, 670, 340);
            }
        });
    }

    r(t.prototype, {
        load: function (u) {
            new h().setMethod('GET').setURI(p.plugins('likebox', 'stream')).setData({
                id: this.stream_id,
                dom: u ? 'pluginLikeboxMoreStories' : 'pluginLikeboxStream',
                force_wall: this.force_wall,
                nobootload: 1,
                inlinecss: 1,
                max_timestamp: u,
                width: this.width
            }).setReadOnly(true).setErrorHandler(function () {
            }).setHandler(this.handleResponse.bind(this)).setRequestHeader('X-ALT-REFERER', document.referrer).send();
        }, handleResponse: function (u) {
            if (u.inlinecss) {
                var v = document.createElement('style');
                v.setAttribute("type", "text/css");
                document.getElementsByTagName('head')[0].appendChild(v);
                if (v.styleSheet) {
                    v.styleSheet.cssText = u.inlinecss;
                } else v.appendChild(document.createTextNode(u.inlinecss));
            }
            g.invoke(u.domops);
            (function () {
                var z = l.scry(document.body, '.embeddedForm'), aa = 'embeddedProcessed';
                z.map(function (ba) {
                    if (!i.hasClass(ba, aa)) {
                        var ca = l.find(ba, '.embeddedLikeButton'), da = l.find(ba, '.embeddedUnlikeButton');
                        l.scry(ca, 'a').concat(l.scry(da, 'a')).forEach(function (ea) {
                            n.listen(ea, 'click', function (fa) {
                                fa.preventDefault();
                            });
                        });
                        m.addClientId(l.find(ba, 'input[name="client_id"]'));
                        m.init(ca, da, l.find(ba, 'input[name="like_action"]'), ba);
                        i.addClass(ba, aa);
                    }
                });
            })();
            var w = l.scry(document.body, "#pluginLikeboxMoreStories a");
            if (!w.length)return;
            w = w[0];
            var x = function () {
                this.load(parseInt(w.getAttribute('data-timestamp'), 10));
                var z = l.find(w.parentNode, '.uiMorePagerLoader');
                i.addClass(z, 'uiMorePagerPrimary');
                i.removeClass(z, 'uiMorePagerLoader');
                i.hide(w);
            }.bind(this);
            k.add(w, 'click', function (z) {
                new j(z).kill();
                x();
            });
            new o(w, 0).setPagerInViewHandler(x);
            var y = parseInt(w.getAttribute('data-storycount'), 10);
            if (y === 0) {
                if (this.retries <= s) {
                    this.retries++;
                    x();
                } else i.hide(w);
            } else this.retries = 0;
            return h.suppressOnloadToken;
        }
    });
    e.exports = t;
}, null);
__d("keyOf", [], function (a, b, c, d, e, f) {
    var g = function (h) {
        var i;
        for (i in h) {
            if (!h.hasOwnProperty(i))continue;
            return i;
        }
        return null;
    };
    e.exports = g;
}, null);
__d("ImmutableValue", ["invariant", "isNode", "keyOf"], function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    var j = i({_DONT_EVER_TYPE_THIS_SECRET_KEY: null});

    function k(l) {
        g(l === k[j]);
    }

    k.mergeAllPropertiesInto = function (l, m) {
        var n = m.length;
        for (var o = 0; o < n; o++)Object.assign(l, m[o]);
    };
    k.deepFreezeRootNode = function (l) {
        if (h(l))return;
        Object.freeze(l);
        for (var m in l)if (l.hasOwnProperty(m))k.recurseDeepFreeze(l[m]);
        Object.seal(l);
    };
    k.recurseDeepFreeze = function (l) {
        if (h(l) || !k.shouldRecurseFreeze(l))return;
        Object.freeze(l);
        for (var m in l)if (l.hasOwnProperty(m))k.recurseDeepFreeze(l[m]);
        Object.seal(l);
    };
    k.shouldRecurseFreeze = function (l) {
        return (typeof l === 'object' && !(l instanceof k) && l !== null);
    };
    k._DONT_EVER_TYPE_THIS_SECRET_KEY = Math.random();
    e.exports = k;
}, null);
__d("mergeHelpers", ["invariant", "keyMirror"], function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = 36, j = function (l) {
        return typeof l !== 'object' || l instanceof Date || l === null;
    }, k = {
        MAX_MERGE_DEPTH: i, isTerminal: j, normalizeMergeArg: function (l) {
            return l === (void 0) || l === null ? {} : l;
        }, checkMergeArrayArgs: function (l, m) {
            g(Array.isArray(l) && Array.isArray(m));
        }, checkMergeObjectArgs: function (l, m) {
            k.checkMergeObjectArg(l);
            k.checkMergeObjectArg(m);
        }, checkMergeObjectArg: function (l) {
            g(!j(l) && !Array.isArray(l));
        }, checkMergeIntoObjectArg: function (l) {
            g((!j(l) || typeof l === 'function') && !Array.isArray(l));
        }, checkMergeLevel: function (l) {
            g(l < i);
        }, checkArrayStrategy: function (l) {
            g(l === (void 0) || l in k.ArrayStrategies);
        }, ArrayStrategies: h({Clobber: true, IndexByIndex: true})
    };
    e.exports = k;
}, null);
__d("ImmutableObject", ["ImmutableValue", "invariant", "keyOf", "mergeHelpers"], function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    var k = j.checkMergeObjectArgs, l = j.isTerminal, m = i({_DONT_EVER_TYPE_THIS_SECRET_KEY: null});

    function n(s) {
        h(s instanceof g);
    }

    for (var o in g)if (g.hasOwnProperty(o))q[o] = g[o];
    var p = g === null ? null : g.prototype;
    q.prototype = Object.create(p);
    q.prototype.constructor = q;
    q.__superConstructor__ = g;
    function q() {
        g.call(this, g[m]);
        g.mergeAllPropertiesInto(this, arguments);
    }

    q.create = function () {
        var s = Object.create(q.prototype);
        q.apply(s, arguments);
        return s;
    };
    q.set = function (s, t) {
        n(s);
        h(typeof t === 'object' && t !== (void 0) && !Array.isArray(t));
        return new q(s, t);
    };
    q.setProperty = function (s, t, u) {
        var v = {};
        v[t] = u;
        return q.set(s, v);
    };
    q.deleteProperty = function (s, t) {
        var u = {};
        for (var v in s)if (v !== t && s.hasOwnProperty(v))u[v] = s[v];
        return new q(u);
    };
    q.setDeep = function (s, t) {
        n(s);
        return r(s, t);
    };
    q.values = function (s) {
        return Object.keys(s).map(function (t) {
            return s[t];
        });
    };
    function r(s, t) {
        k(s, t);
        var u = {}, v = Object.keys(s);
        for (var w = 0; w < v.length; w++) {
            var x = v[w];
            if (!t.hasOwnProperty(x)) {
                u[x] = s[x];
            } else if (l(s[x]) || l(t[x])) {
                u[x] = t[x];
            } else u[x] = r(s[x], t[x]);
        }
        var y = Object.keys(t);
        for (w = 0; w < y.length; w++) {
            var z = y[w];
            if (s.hasOwnProperty(z))continue;
            u[z] = t[z];
        }
        return (s instanceof g ? new q(u) : t instanceof g ? new q(u) : u);
    }

    e.exports = q;
}, null);
__d("ArtillerySegment", ["ImmutableObject", "invariant", "performanceAbsoluteNow"], function (a, b, c, d, e, f, g, h, i) {
    var j = 0;

    function k(l) {
        "use strict";
        h(l);
        h(('category' in l) && ('description' in l));
        this.$ArtillerySegment0 = false;
        this.$ArtillerySegment1 = Object.assign({}, l, {id: (j++).toString(36)});
        this.$ArtillerySegment2 = [];
    }

    k.prototype.getID = function () {
        "use strict";
        return this.$ArtillerySegment1.id;
    };
    k.prototype.begin = function () {
        "use strict";
        this.$ArtillerySegment1.begin = i();
        return this;
    };
    k.prototype.end = function () {
        "use strict";
        this.$ArtillerySegment1.end = i();
        return this;
    };
    k.prototype.appendChild = function () {
        "use strict";
        for (var l = [], m = 0, n = arguments.length; m < n; m++)l.push(arguments[m]);
        h(!this.$ArtillerySegment0);
        l.forEach(function (o) {
            this.$ArtillerySegment2.push(o.getID());
        }.bind(this));
        return this;
    };
    k.prototype.setPosted = function () {
        "use strict";
        this.$ArtillerySegment0 = true;
        return this;
    };
    k.prototype.getPostData = function () {
        "use strict";
        return new g(this.$ArtillerySegment1, {children: this.$ArtillerySegment2.slice()});
    };
    e.exports = k;
}, null);
__d("ArtillerySequence", ["ImmutableObject", "invariant"], function (a, b, c, d, e, f, g, h) {
    var i = 0;

    function j(k) {
        "use strict";
        h(k);
        h('description' in k);
        this.$ArtillerySequence0 = false;
        this.$ArtillerySequence1 = Object.assign({}, k, {id: (i++).toString(36)});
        this.$ArtillerySequence2 = [];
    }

    j.prototype.getID = function () {
        "use strict";
        return this.$ArtillerySequence1.id;
    };
    j.prototype.addSegment = function () {
        "use strict";
        for (var k = [], l = 0, m = arguments.length; l < m; l++)k.push(arguments[l]);
        h(!this.$ArtillerySequence0);
        k.forEach(function (n) {
            this.$ArtillerySequence2.push(n.getID());
        }.bind(this));
        return this;
    };
    j.prototype.setPosted = function () {
        "use strict";
        this.$ArtillerySequence0 = true;
        return this;
    };
    j.prototype.getPostData = function () {
        "use strict";
        return new g(this.$ArtillerySequence1, {segments: this.$ArtillerySequence2.slice()});
    };
    e.exports = j;
}, null);
__d("EventEmitterWithValidation", ["EventEmitter"], function (a, b, c, d, e, f, g) {
    'use strict';
    for (var h in g)if (g.hasOwnProperty(h))j[h] = g[h];
    var i = g === null ? null : g.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = g;
    function j(m) {
        g.call(this);
        this.$EventEmitterWithValidation0 = Object.keys(m);
    }

    j.prototype.emit = function (m) {
        k(m, this.$EventEmitterWithValidation0);
        return i.emit.apply(this, arguments);
    };
    function k(m, n) {
        if (n.indexOf(m) === -1)throw new TypeError(l(m, n));
    }

    function l(m, n) {
        var o = 'Unknown event type "' + m + '". ';
        o += 'Known event types: ' + n.join(', ') + '.';
        return o;
    }

    e.exports = j;
}, null);
__d("mixInEventEmitter", ["EventEmitterWithHolding", "EventEmitterWithValidation", "EventHolder", "invariant"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    function k(m, n) {
        j(n);
        var o = m.prototype || m;
        j(!o.__eventEmitter);
        var p = m.constructor;
        if (p)j(p === Object || p === Function);
        o.__types = Object.assign({}, o.__types, n);
        Object.assign(o, l);
    }

    var l = {
        emit: function (m, n, o, p, q, r, s) {
            return this.__getEventEmitter().emit(m, n, o, p, q, r, s);
        }, emitAndHold: function (m, n, o, p, q, r, s) {
            return this.__getEventEmitter().emitAndHold(m, n, o, p, q, r, s);
        }, addListener: function (m, n, o) {
            return this.__getEventEmitter().addListener(m, n, o);
        }, once: function (m, n, o) {
            return this.__getEventEmitter().once(m, n, o);
        }, addRetroactiveListener: function (m, n, o) {
            return this.__getEventEmitter().addRetroactiveListener(m, n, o);
        }, addListenerMap: function (m, n) {
            return this.__getEventEmitter().addListenerMap(m, n);
        }, addRetroactiveListenerMap: function (m, n) {
            return this.__getEventEmitter().addListenerMap(m, n);
        }, listeners: function (m) {
            return this.__getEventEmitter().listeners(m);
        }, removeAllListeners: function () {
            this.__getEventEmitter().removeAllListeners();
        }, removeCurrentListener: function () {
            this.__getEventEmitter().removeCurrentListener();
        }, releaseHeldEventType: function (m) {
            this.__getEventEmitter().releaseHeldEventType(m);
        }, __getEventEmitter: function () {
            if (!this.__eventEmitter) {
                var m = new h(this.__types), n = new i();
                this.__eventEmitter = new g(m, n);
            }
            return this.__eventEmitter;
        }
    };
    e.exports = k;
}, null);
__d("ArtilleryTrace", ["ArtillerySegment", "ArtillerySequence", "ImmutableObject", "invariant", "mixInEventEmitter"], function (a, b, c, d, e, f, g, h, i, j, k) {
    function l() {
        "use strict";
        this.$ArtilleryTrace0 = false;
        this.$ArtilleryTrace1 = (void 0);
        this.$ArtilleryTrace2 = {};
        this.$ArtilleryTrace3 = [];
        this.$ArtilleryTrace4 = [];
        this.$ArtilleryTrace5 = {};
        this.$ArtilleryTrace6 = [];
    }

    l.prototype.createSequence = function (m) {
        "use strict";
        j(!this.$ArtilleryTrace0);
        var n = new h(m);
        this.$ArtilleryTrace3.push(n);
        return n;
    };
    l.prototype.createSegment = function (m) {
        "use strict";
        j(!this.$ArtilleryTrace0);
        var n = new g(m);
        this.$ArtilleryTrace4.push(n);
        return n;
    };
    l.prototype.markSegment = function (m, n) {
        "use strict";
        j(!this.$ArtilleryTrace0);
        this.$ArtilleryTrace5[n] = m.getID();
        return this;
    };
    l.prototype.connectTrace = function (m, n) {
        "use strict";
        j(!this.$ArtilleryTrace0);
        n = n || this.$ArtilleryTrace1;
        j(n);
        this.$ArtilleryTrace6.push({segment: m.getID(), trace: n});
        return this;
    };
    l.prototype.setID = function (m) {
        "use strict";
        j(!this.$ArtilleryTrace1);
        this.$ArtilleryTrace1 = m;
        return this;
    };
    l.prototype.getID = function () {
        "use strict";
        return this.$ArtilleryTrace1;
    };
    l.prototype.addProperty = function (m, n) {
        "use strict";
        this.$ArtilleryTrace2[m] = n;
    };
    l.prototype.post = function () {
        "use strict";
        j(!this.$ArtilleryTrace0);
        this.$ArtilleryTrace0 = true;
        var m = new i({
            id: this.$ArtilleryTrace1,
            properties: this.$ArtilleryTrace2,
            sequences: this.$ArtilleryTrace3.map(function (n) {
                return n.setPosted().getPostData();
            }),
            segments: this.$ArtilleryTrace4.map(function (n) {
                return n.setPosted().getPostData();
            }),
            marks: Object.assign({}, this.$ArtilleryTrace5),
            connections: this.$ArtilleryTrace6.slice()
        });
        this.emitAndHold('post', m);
    };
    l.prototype.isPosted = function () {
        "use strict";
        return this.$ArtilleryTrace0;
    };
    k(l, {post: true});
    e.exports = l;
}, null);
__d("Miny", [], function (a, b, c, d, e, f) {
    var g = 'Miny1', h = {encode: [], decode: {}}, i = 'wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');

    function j(n) {
        for (var o = h.encode.length; o < n; o++) {
            var p = o.toString(32).split('');
            p[p.length - 1] = i[parseInt(p[p.length - 1], 32)];
            p = p.join('');
            h.encode[o] = p;
            h.decode[p] = o;
        }
        return h;
    }

    function k(n) {
        if (/^$|[~\\]|__proto__/.test(n))return n;
        var o = n.match(/\w+|\W+/g), p = {};
        for (var q = 0; q < o.length; q++)p[o[q]] = (p[o[q]] || 0) + 1;
        var r = Object.keys(p);
        r.sort(function (u, v) {
            return p[u] < p[v] ? 1 : (p[v] < p[u] ? -1 : 0);
        });
        var s = j(r.length).encode;
        for (q = 0; q < r.length; q++)p[r[q]] = s[q];
        var t = [];
        for (q = 0; q < o.length; q++)t[q] = p[o[q]];
        return [g, r.length].concat(r).concat(t.join('')).join('~');
    }

    function l(n) {
        var o = n.split('~');
        if (o.shift() != g)return n;
        var p = parseInt(o.shift(), 10), q = o.pop();
        q = q.match(/[0-9a-v]*[\-w-zA-Z_]/g);
        var r = o, s = j(p).decode, t = [];
        for (var u = 0; u < q.length; u++)t[u] = r[s[q[u]]];
        return t.join('');
    }

    var m = {encode: k, decode: l};
    e.exports = m;
}, null);
__d("QueryString", [], function (a, b, c, d, e, f) {
    function g(k) {
        var l = [];
        Object.keys(k).sort().forEach(function (m) {
            var n = k[m];
            if (typeof n === 'undefined')return;
            if (n === null) {
                l.push(m);
                return;
            }
            l.push(encodeURIComponent(m) + '=' + encodeURIComponent(n));
        });
        return l.join('&');
    }

    function h(k, l) {
        var m = {};
        if (k === '')return m;
        var n = k.split('&');
        for (var o = 0; o < n.length; o++) {
            var p = n[o].split('=', 2), q = decodeURIComponent(p[0]);
            if (l && m.hasOwnProperty(q))throw new URIError('Duplicate key: ' + q);
            m[q] = p.length === 2 ? decodeURIComponent(p[1]) : null;
        }
        return m;
    }

    function i(k, l) {
        return k + (~k.indexOf('?') ? '&' : '?') + (typeof l === 'string' ? l : j.encode(l));
    }

    var j = {encode: g, decode: h, appendToUrl: i};
    e.exports = j;
}, null);
__d("VersionRange", ["invariant"], function (a, b, c, d, e, f, g) {
    'use strict';
    var h = /\./, i = /\|\|/, j = /\s+\-\s+/, k = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/, l = /^(\d*)(.*)/;

    function m(ea, fa) {
        var ga = ea.split(i);
        if (ga.length > 1) {
            return ga.some(function (ha) {
                return da.contains(ha, fa);
            });
        } else {
            ea = ga[0].trim();
            return n(ea, fa);
        }
    }

    function n(ea, fa) {
        var ga = ea.split(j);
        g(ga.length > 0 && ga.length <= 2);
        if (ga.length === 1) {
            return o(ga[0], fa);
        } else {
            var ha = ga, ia = ha[0], ja = ha[1];
            g(x(ia) && x(ja));
            return (o('>=' + ia, fa) && o('<=' + ja, fa));
        }
    }

    function o(ea, fa) {
        ea = ea.trim();
        if (ea === '')return true;
        var ga = fa.split(h), ha = v(ea), ia = ha.modifier, ja = ha.rangeComponents;
        switch (ia) {
            case '<':
                return p(ga, ja);
            case '<=':
                return q(ga, ja);
            case '>=':
                return s(ga, ja);
            case '>':
                return t(ga, ja);
            case '~':
            case '~>':
                return u(ga, ja);
            default:
                return r(ga, ja);
        }
    }

    function p(ea, fa) {
        return ca(ea, fa) === -1;
    }

    function q(ea, fa) {
        var ga = ca(ea, fa);
        return ga === -1 || ga === 0;
    }

    function r(ea, fa) {
        return ca(ea, fa) === 0;
    }

    function s(ea, fa) {
        var ga = ca(ea, fa);
        return ga === 1 || ga === 0;
    }

    function t(ea, fa) {
        return ca(ea, fa) === 1;
    }

    function u(ea, fa) {
        var ga = fa.slice(), ha = fa.slice();
        if (ha.length > 1)ha.pop();
        var ia = ha.length - 1, ja = parseInt(ha[ia], 10);
        if (w(ja))ha[ia] = ja + 1 + '';
        return (s(ea, ga) && p(ea, ha));
    }

    function v(ea) {
        var fa = ea.split(h), ga = fa[0].match(k);
        g(ga);
        return {modifier: ga[1], rangeComponents: [ga[2]].concat(fa.slice(1))};
    }

    function w(ea) {
        return !isNaN(ea) && isFinite(ea);
    }

    function x(ea) {
        return !v(ea).modifier;
    }

    function y(ea, fa) {
        for (var ga = ea.length; ga < fa; ga++)ea[ga] = '0';
    }

    function z(ea, fa) {
        ea = ea.slice();
        fa = fa.slice();
        y(ea, fa.length);
        for (var ga = 0; ga < fa.length; ga++) {
            var ha = fa[ga].match(/^[x*]$/i);
            if (ha) {
                fa[ga] = ea[ga] = '0';
                if (ha[0] === '*' && ga === fa.length - 1)for (var ia = ga; ia < ea.length; ia++)ea[ia] = '0';
            }
        }
        y(fa, ea.length);
        return [ea, fa];
    }

    function aa(ea, fa) {
        var ga = ea.match(l)[1], ha = fa.match(l)[1], ia = parseInt(ga, 10), ja = parseInt(ha, 10);
        if (w(ia) && w(ja) && ia !== ja) {
            return ba(ia, ja);
        } else return ba(ea, fa);
    }

    function ba(ea, fa) {
        g(typeof ea === typeof fa);
        if (ea > fa) {
            return 1;
        } else if (ea < fa) {
            return -1;
        } else return 0;
    }

    function ca(ea, fa) {
        var ga = z(ea, fa), ha = ga[0], ia = ga[1];
        for (var ja = 0; ja < ia.length; ja++) {
            var ka = aa(ha[ja], ia[ja]);
            if (ka)return ka;
        }
        return 0;
    }

    var da = {
        contains: function (ea, fa) {
            return m(ea.trim(), fa.trim());
        }
    };
    e.exports = da;
}, null);
__d("mapObject", [], function (a, b, c, d, e, f) {
    'use strict';
    var g = Object.prototype.hasOwnProperty;

    function h(i, j, k) {
        if (!i)return null;
        var l = {};
        for (var m in i)if (g.call(i, m))l[m] = j.call(k, i[m], m, i);
        return l;
    }

    e.exports = h;
}, null);
__d("memoizeStringOnly", [], function (a, b, c, d, e, f) {
    'use strict';
    function g(h) {
        var i = {};
        return function (j) {
            if (!i.hasOwnProperty(j))i[j] = h.call(this, j);
            return i[j];
        };
    }

    e.exports = g;
}, null);
__d("UserAgent", ["UserAgentData", "VersionRange", "mapObject", "memoizeStringOnly"], function (a, b, c, d, e, f, g, h, i, j) {
    'use strict';
    function k(n, o, p, q) {
        if (n === p)return true;
        if (!p.startsWith(n))return false;
        var r = p.slice(n.length);
        if (o) {
            r = q ? q(r) : r;
            return h.contains(r, o);
        }
        return false;
    }

    function l(n) {
        if (g.platformName === 'Windows')return n.replace(/^\s*NT/, '');
        return n;
    }

    var m = {
        isBrowser: function (n) {
            return k(g.browserName, g.browserFullVersion, n);
        }, isBrowserArchitecture: function (n) {
            return k(g.browserArchitecture, null, n);
        }, isDevice: function (n) {
            return k(g.deviceName, null, n);
        }, isEngine: function (n) {
            return k(g.engineName, g.engineVersion, n);
        }, isPlatform: function (n) {
            return k(g.platformName, g.platformFullVersion, n, l);
        }, isPlatformArchitecture: function (n) {
            return k(g.platformArchitecture, null, n);
        }
    };
    e.exports = i(m, j);
}, null);
__d("BanzaiAdapter", ["Arbiter", "CurrentUser", "Miny", "QueryString", "Run", "SiteData", "UserAgent", "getAsyncParams", "getSameOriginTransport", "setTimeoutAcrossTransitions", "BanzaiConfig"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = [], s = new g(), t = '/ajax/bz', u = {}, v = u.adapter = {
        config: q, getUserID: function () {
            return h.getID();
        }, inform: function (w) {
            s.inform(w);
        }, subscribe: function (w, x) {
            s.subscribe(w, x);
        }, cleanup: function () {
            var w = r;
            r = [];
            w.forEach(function (x) {
                if (x.readyState < 4)x.abort();
            });
        }, readyToSend: function () {
            return m.isBrowser('IE <= 8') || navigator.onLine;
        }, send: function (w, x, y, z) {
            var aa = 'POST', ba = o();
            ba.open(aa, t, true);
            ba.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ba.onreadystatechange = function () {
                if (ba.readyState >= 4) {
                    var fa;
                    try {
                        fa = ba.status;
                    } catch (ga) {
                        fa = 0;
                    }
                    if (fa == 200) {
                        if (x)x();
                        if (!z)v.inform(u.OK);
                    } else {
                        if (y)y(fa);
                        if (!z)v.inform(u.ERROR);
                    }
                }
            };
            p(function () {
                if (ba.readyState < 4)ba.abort();
            }, u.SEND_TIMEOUT);
            r.push(ba);
            var ca = n(aa);
            ca.q = JSON.stringify(w);
            ca.ts = Date.now();
            ca.ph = l.push_phase;
            if (u.FBTRACE)ca.fbtrace = u.FBTRACE;
            if (u.isEnabled('miny_compression')) {
                var da = Date.now(), ea = i.encode(ca.q);
                if (ea.length < ca.q.length) {
                    ca.q = ea;
                    ca.miny_encode_ms = Date.now() - da;
                }
            }
            ba.send(j.encode(ca));
        }, setHooks: function (w) {
            k.onAfterUnload(u._unload);
        }, onUnload: function (w) {
            k.onAfterUnload(w);
        }
    };
    e.exports = u;
}, null);
__d("FBJSON", [], function (a, b, c, d, e, f) {
    e.exports = {parse: JSON.parse, stringify: JSON.stringify};
}, null);
__d("WebStorage", ["ErrorUtils", "ex"], function (a, b, c, d, e, f, g, h) {
    var i = {};

    function j(q) {
        if (!i.hasOwnProperty(q))i[q] = k(q);
        return i[q];
    }

    function k(q) {
        try {
            var s = window[q];
            if (s) {
                var t = '__test__' + Date.now();
                s.setItem(t, '');
                s.removeItem(t);
            }
            return s;
        } catch (r) {
        }
    }

    function l() {
        return j('localStorage');
    }

    function m() {
        return j('sessionStorage');
    }

    function n(q) {
        var r = [];
        for (var s = 0; s < q.length; s++)r.push(q.key(s));
        return r;
    }

    function o(q, r, s) {
        var t = null;
        try {
            q.setItem(r, s);
        } catch (u) {
            var v = n(q).map(function (w) {
                var x = q.getItem(w).length;
                return w + '(' + x + ')';
            });
            t = new Error(h('Storage quota exceeded while setting %s(%s). Items(length) follows: %s', r, s.length, v.join()));
            g.reportError(t);
        }
        return t;
    }

    var p = {getLocalStorage: l, getSessionStorage: m, setItemGuarded: o};
    e.exports = p;
}, null);
__d("pageID", [], function (a, b, c, d, e, f) {
    e.exports = Math.floor(2147483648 * Math.random()).toString(36);
}, null);
__d("WebStorageMutex", ["WebStorage", "setTimeoutAcrossTransitions", "pageID"], function (a, b, c, d, e, f, g, h, i) {
    var j = g.getLocalStorage(), k = i;

    function l(m) {
        "use strict";
        this.name = m;
    }

    l.testSetPageID = function (m) {
        "use strict";
        k = m;
    };
    l.prototype.$WebStorageMutex0 = function () {
        "use strict";
        if (!j)return k;
        var m = j.getItem('mutex_' + this.name);
        m = m ? m.split(':') : null;
        return m && m[1] >= Date.now() ? m[0] : null;
    };
    l.prototype.$WebStorageMutex1 = function (m) {
        "use strict";
        if (!j)return;
        var n = Date.now() + (m || 10000);
        g.setItemGuarded(j, 'mutex_' + this.name, k + ':' + n);
    };
    l.prototype.hasLock = function () {
        "use strict";
        return this.$WebStorageMutex0() == k;
    };
    l.prototype.lock = function (m, n, o) {
        "use strict";
        if (this.$WebStorageMutex2)clearTimeout(this.$WebStorageMutex2);
        if (k == (this.$WebStorageMutex0() || k))this.$WebStorageMutex1(o);
        this.$WebStorageMutex2 = h(function () {
            this.$WebStorageMutex2 = null;
            var p = this.hasLock() ? m : n;
            if (p)p(this);
        }.bind(this), 0);
    };
    l.prototype.unlock = function () {
        "use strict";
        if (this.$WebStorageMutex2)clearTimeout(this.$WebStorageMutex2);
        if (j && this.hasLock())j.removeItem('mutex_' + this.name);
    };
    e.exports = l;
}, null);
__d("Banzai", ["BanzaiAdapter", "CurrentUser", "ErrorUtils", "ExecutionEnvironment", "FBJSON", "WebStorage", "WebStorageMutex", "emptyFunction", "isInIframe", "pageID", "setTimeoutAcrossTransitions"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    var r = g.adapter, s = o(), t = 'bz:', u = 0, v = 1, w = 2, x, y, z = [], aa = null;

    function ba(ia) {
        return ia[2] >= Date.now() - (r.config.EXPIRY || g.EXPIRY);
    }

    function ca(ia, ja) {
        ia.__meta.status = u;
        ia[3] = (ia[3] || 0) + 1;
        if (!ia.__meta.retry && ja >= 400 && ja < 600)z.push(ia);
    }

    function da(ia) {
        var ja = Date.now() + ia;
        if (!y || ja < y) {
            y = ja;
            clearTimeout(x);
            x = q(ea, ia);
            return true;
        }
    }

    function ea() {
        fa(null, null);
    }

    function fa(ia, ja) {
        y = null;
        da(g.BASIC.delay);
        if (!r.readyToSend()) {
            if (ja)ja();
            return;
        }
        r.inform(g.SEND);
        var ka = [], la = [], ma = {};
        z = z.filter(function (na) {
            var oa = na.__meta;
            if (oa.status >= w || !ba(na))return false;
            if (oa.status >= v)return true;
            var pa = oa.pageID + oa.userID, qa = ma[pa];
            if (!qa) {
                qa = {user: oa.userID, page_id: oa.pageID, posts: []};
                ma[pa] = qa;
                ka.push(qa);
            }
            oa.status = v;
            qa.posts.push(na);
            la.push(na);
            return oa.retry;
        });
        if (ka.length <= 0) {
            r.inform(g.OK);
            if (ia)ia();
            return;
        }
        ka[0].trigger = aa;
        aa = null;
        r.send(ka, function () {
            la.forEach(function (na) {
                na.__meta.status = w;
            });
            if (ia)ia();
        }, function (na) {
            la.forEach(function (oa) {
                ca(oa, na);
            });
            if (ja)ja();
        });
    }

    var ga, ha = l.getLocalStorage();
    if (ha && !s) {
        ga = {
            store: function ia() {
                if (z.length <= 0)return;
                var ja = z.map(function (ka) {
                    return [ka[0], ka[1], ka[2], ka[3] || 0, ka.__meta];
                });
                z = [];
                ha.setItem(t + p + '.' + Date.now(), k.stringify(ja));
            }, restore: function ia() {
                (new m('banzai')).lock(function (ja) {
                    var ka = [];
                    for (var la = 0; la < ha.length; la++) {
                        var ma = ha.key(la);
                        if (ma.indexOf(t) === 0 && ma.indexOf('bz:__') !== 0)ka.push(ma);
                    }
                    ka.forEach(function (na) {
                        var oa = ha.getItem(na);
                        ha.removeItem(na);
                        if (!oa)return;
                        var pa = k.parse(oa, e.id);
                        pa.forEach(function (qa) {
                            if (!qa)return;
                            var ra = qa.__meta = qa.pop(), sa = ba(qa);
                            if (!sa)return;
                            var ta = h.getID(), ua = ra.userID === ta, va = g.isEnabled('allow_userid_mismatch') && ta === '0';
                            if (ua || va) {
                                ra.status = u;
                                z.push(qa);
                            }
                        });
                    });
                    ja.unlock();
                });
            }
        };
    } else ga = {store: n, restore: n};
    g.SEND = 'Banzai:SEND';
    g.OK = 'Banzai:OK';
    g.ERROR = 'Banzai:ERROR';
    g.SHUTDOWN = 'Banzai:SHUTDOWN';
    g.SEND_TIMEOUT = 15000;
    g.VITAL_WAIT = 1000;
    g.BASIC_WAIT = 60000;
    g.EXPIRY = 30 * 60000;
    g.VITAL = {delay: r.config.MIN_WAIT || g.VITAL_WAIT};
    g.BASIC = {delay: r.config.MAX_WAIT || g.BASIC_WAIT};
    g.FBTRACE = r.config.fbtrace, g.isEnabled = function (ia) {
        return r.config.gks && r.config.gks[ia];
    };
    g.post = function (ia, ja, ka) {
        ka = ka || {};
        var la = ka.retry;
        if (r.config.disabled)return;
        if (!j.canUseDOM)return;
        var ma = r.config.blacklist;
        if (ma)if (ma.indexOf)if (typeof ma.indexOf == 'function')if (ma.indexOf(ia) != -1)return;
        if (s && document.domain == 'facebook.com') {
            var na;
            try {
                na = a.top.require('Banzai');
            } catch (oa) {
                na = null;
            }
            if (na) {
                na.post.apply(na, arguments);
                return;
            }
        }
        var pa = [ia, ja, Date.now(), 0];
        pa.__meta = {retry: la === true, pageID: p, userID: h.getID(), status: u};
        if (ka.signal) {
            pa.__meta.status = v;
            var qa = [{user: h.getID(), page_id: p, posts: [pa], trigger: ia}];
            r.send(qa, function () {
                pa.__meta.status = w;
            }, function (sa) {
                ca(pa, sa);
            }, true);
            if (!la)return;
        }
        z.push(pa);
        var ra = ka.delay;
        if (ra == null)ra = g.BASIC_WAIT;
        if (da(ra) || !aa)aa = ia;
    };
    g.flush = function (ia, ja) {
        clearTimeout(x);
        x = 0;
        fa(ia, ja);
    };
    g.subscribe = r.subscribe;
    g._schedule = da;
    g._store = function (ia) {
        i.applyWithGuard(ga.store, ga);
    };
    g._restore = function (ia) {
        i.applyWithGuard(ga.restore, ga);
        da(r.config.RESTORE_WAIT || g.VITAL_WAIT);
    };
    g._unload = function () {
        r.cleanup();
        r.inform(g.SHUTDOWN);
        i.applyWithGuard(ga.store, ga);
    };
    g._testState = function () {
        return {postBuffer: z, triggerRoute: aa};
    };
    if (j.canUseDOM) {
        if (g.isEnabled('adapterhooks')) {
            r.setHooks(ga);
        } else r.onUnload(g._unload);
        g._restore();
    }
    e.exports = g;
}, null);
__d("Artillery", ["ArtilleryTrace", "Banzai", "forEachObject", "invariant", "mixInEventEmitter"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = false, m = [], n, o, p;
    h.subscribe(h.SHUTDOWN, function () {
        q.postAll();
    });
    var q = {
        isEnabled: function () {
            return l;
        }, createTrace: function () {
            var r = new g();
            m.push(r);
            r.addListener('post', q.emitAndHold.bind(q, 'posttrace'));
            return r;
        }, getPageTrace: function () {
            j(n);
            if (o)return o;
            o = q.createTrace().setID(n);
            i(p, function (r, s, t) {
                o.addProperty(s, r);
            });
            return o;
        }, postAll: function () {
            m.forEach(function (r) {
                return !r.isPosted() && r.post();
            });
        }, enable: function () {
            l = true;
        }, setPageTraceID: function (r) {
            j(!n);
            n = r;
        }, setPageProperties: function (r) {
            p = r;
        }, getPageProperty: function (r) {
            return p[r];
        }
    };
    k(q, {posttrace: true});
    e.exports = q;
}, null);
__d("ArtilleryCategory", [], function (a, b, c, d, e, f) {
    e.exports = {
        UNKNOWN: 0,
        SERVER: 1,
        SERVER_WAIT: 2,
        NETWORK: 3,
        CLIENT: 4,
        CLIENT_WAIT: 6,
        RESOURCE_WAIT: 7,
        NETWORK_WAIT: 8
    };
}, null);
__d("ArtillerySequenceType", [], function (a, b, c, d, e, f) {
    e.exports = {SEQUENCE_UNKNOWN: 0, SEQUENCE_SERVER: 1, SEQUENCE_CLIENT: 2};
}, null);
__d("memoize", ["invariant"], function (a, b, c, d, e, f, g) {
    function h(i) {
        var j;
        return function () {
            for (var k = [], l = 0, m = arguments.length; l < m; l++)k.push(arguments[l]);
            g(!k.length);
            if (i) {
                j = i();
                i = null;
            }
            return j;
        };
    }

    e.exports = h;
}, null);
__d("AsyncSignal", ["ErrorUtils", "QueryString", "TrackingConfig", "URI", "isFacebookURI", "isMessengerDotComURI", "copyProperties", "getAsyncParams", "memoize"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    function p(q, r) {
        this.data = r || {};
        this.uri = q.toString();
        if (i.domain && this.uri.charAt(0) == '/')this.uri = i.domain + this.uri;
    }

    p.prototype.setHandler = function (q) {
        this.handler = q;
        return this;
    };
    p.prototype.setTimeout = function (q) {
        this.timeout = q;
        return this;
    };
    p.prototype.send = function () {
        var q = this.handler, r = this.data, s = new Image();
        if (q) {
            var t = o(function () {
                g.applyWithGuard(q, null, [s.height == 1]);
            });
            s.onload = s.onerror = function () {
                t();
            };
            if (this.timeout)setTimeout(t, this.timeout);
        }
        r.asyncSignal = (Math.random() * 10000 | 0) + 1;
        var u = new j(this.uri), v = k(u) || l(u);
        if (v) {
            m(r, n('POST'));
        } else throw new Error("'" + this.uri + "' " + "is an external URL, you should not send async signals to offsite links.");
        s.src = h.appendToUrl(this.uri, r);
        return this;
    };
    e.exports = p;
}, null);
__d("ScriptPath", ["ErrorUtils"], function (a, b, c, d, e, f, g) {
    var h = null, i = null, j = {}, k = 0, l = null, m = {
        PAGE_LOAD: 'load',
        PAGE_UNLOAD: 'unload',
        OPEN_OVERLAY_VIEW: 'open_overlay_view',
        CLOSE_OVERLAY_VIEW: 'close_overlay_view',
        TRANSITION: 'transition'
    }, n = [];

    function o(t) {
        var u = ++k;
        j[u] = t;
        return u;
    }

    function p(t) {
        if (j[t])delete j[t];
    }

    function q(t) {
        Object.keys(j).forEach(function (u) {
            g.applyWithGuard(j[u], null, [{source: h, dest: i, cause: t}]);
        });
    }

    function r() {
        return i ? i.scriptPath : (void 0);
    }

    var s = {
        set: function (t, u, v) {
            h = i;
            i = {scriptPath: t, categoryToken: u, extraInfoFromServer: (!v || typeof v !== 'object') ? {} : v};
            n = [];
            window._script_path = t;
            q();
        }, openOverlayView: function (t) {
            if (!t)return;
            var u = n.length;
            if (u === 0 || n[u - 1] !== t) {
                h = Object.assign({}, i);
                i.topViewEndpoint = t;
                n.push(t);
                q(m.OPEN_OVERLAY_VIEW);
            }
        }, closeOverlayView: function (t) {
            var u = n.lastIndexOf(t);
            if (u === -1)return;
            h = Object.assign({}, i);
            if (u > 0) {
                i.topViewEndpoint = n[u - 1];
            } else i.topViewEndpoint = null;
            n = n.slice(0, u);
            q(m.CLOSE_OVERLAY_VIEW);
        }, setNavigation: function (t) {
            l = t;
        }, getNavigation: function () {
            return l;
        }, getScriptPath: r, getCategoryToken: function () {
            return i ? i.categoryToken : (void 0);
        }, getTopViewEndpoint: function () {
            var t = n.length;
            return t > 0 ? n[t - 1] : r();
        }, getPageInfo: function () {
            return i;
        }, getSourcePageInfo: function () {
            return h;
        }, subscribe: function (t) {
            return o(t);
        }, unsubscribe: function (t) {
            p(t);
        }
    };
    s.CAUSE = m;
    e.exports = s;
}, null);
__d("ErrorSignal", ["AsyncRequest", "AsyncSignal", "ErrorSignalConfig", "ScriptPath", "SiteData", "emptyFunction"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    function m(p, q) {
        if (p && p == 'async_error') {
            var r = JSON.parse(q), s = r.err_code, t = r.path;
            if (s in {'1004': 1, '12029': 1, '12031': 1, '12152': 1} && t.indexOf('scribe_endpoint.php') == -1) {
                new g().setURI('/ajax/chat/scribe_endpoint.php').setData({
                    c: 'async_error',
                    m: q
                }).setMethod('GET').setReadOnly(true).setOption('suppressEvaluation', true).setOption('suppressErrorAlerts', true).setHandler(l).setErrorHandler(l).send(true);
                return;
            }
        }
        new h(i.uri, {c: p, m: q}).send();
    }

    function n(p, q) {
        var r = a.EagleEye;
        q = q || {};
        q.svn_rev = k.revision;
        q.script_path = j.getScriptPath();
        var s = (r && r.getSessionID() || '-') + '/-';
        m('javascript_error', JSON.stringify({c: p, a: s, m: q}));
    }

    var o = {sendErrorSignal: m, logJSError: n};
    e.exports = o;
    a.ErrorSignal = o;
}, null);
__d("ErrorLogging", ["ErrorSignal", "ErrorUtils", "JSErrorExtra", "JSErrorPlatformColumns"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(m) {
        var n = m.extra || {}, o = {};
        Object.keys(i).forEach(function (p) {
            if (i[p])o[p] = true;
        });
        Object.keys(n).forEach(function (p) {
            if (n[p]) {
                o[p] = true;
            } else if (o[p])delete o[p];
        });
        m.extra = Object.keys(o);
    }

    function l(m) {
        m.app_id = j.app_id;
    }

    h.addListener(function (m) {
        k(m);
        l(m);
        g.logJSError(m.category || 'onerror', {error: m.name || m.message, extra: m});
    });
}, null);
__d("BanzaiLogger", ["Banzai"], function (a, b, c, d, e, f, g) {
    var h = 'logger';

    function i(k) {
        return {
            log: function (l, m) {
                g.post(h + ':' + l, m, k);
            }
        };
    }

    var j = i();
    j.create = i;
    e.exports = j;
}, null);
__d("FbtLoggerImpl", ["BanzaiLogger"], function (a, b, c, d, e, f, g) {
    var h = {
        logImpression: function (i) {
            g.log('FbtImpressionsLoggerConfig', {hash: i, sample_rate: 100});
        }
    };
    e.exports = h;
}, null);
__d("ImageFailLoggerOnload", ["Banzai"], function (a, b, c, d, e, f, g) {
    var h = "image_fail_load", i = false;

    function j(m) {
        k({image_uri: m.src});
    }

    function k(m) {
        g.post(h, m);
    }

    var l = {
        init: function () {
            if (!a.ImageFailLogger)return;
            if (i)return;
            i = true;
            for (var m = 0; m < a.ImageFailLogger.entries.length; m++)k(a.ImageFailLogger.entries[m]);
            a.ImageFailLogger.entries = null;
            a.ImageFailLogger.logImageFail = j;
        }
    };
    e.exports = l;
}, null);
__d("IntlCzechSlovakNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            return i === 1 ? g.NUMBER_SINGULAR : i >= 2 && i <= 4 ? g.NUMBER_DUAL : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlSlavicNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 100, k = j % 10;
            return k === 1 && j !== 11 ? g.NUMBER_SINGULAR : k >= 2 && k <= 4 && !(j >= 12 && j <= 14) ? g.NUMBER_DUAL : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlEastSlavicNumberType", ["IntlSlavicNumberType"], function (a, b, c, d, e, f, g) {
    var h = g;
    e.exports = h;
}, null);
__d("IntlEnglishNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            return i === 1 ? g.NUMBER_SINGULAR : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlIcelandicNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 100;
            return j % 10 === 1 && j !== 11 ? g.NUMBER_SINGULAR : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlLatvianNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 100;
            return i === 0 ? g.NUMBER_DUAL : j % 10 === 1 && j !== 11 ? g.NUMBER_SINGULAR : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlLithuanianNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 100, k = j % 10;
            return k === 0 || (j > 10 && j < 20) ? g.NUMBER_DUAL : k === 1 ? g.NUMBER_SINGULAR : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlMacedonianNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 10;
            return j === 1 ? g.NUMBER_SINGULAR : j === 2 ? g.NUMBER_DUAL : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlNoVariationsNumberType", [], function (a, b, c, d, e, f) {
    var g = {
        getNumberVariationType: function (h) {
            return '*';
        }
    };
    e.exports = g;
}, null);
__d("IntlPolishNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 100, k = j % 10;
            return i === 1 ? g.NUMBER_SINGULAR : k >= 2 && k <= 4 && !(j >= 12 && j <= 14) ? g.NUMBER_DUAL : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlRomanianNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 100;
            return i === 1 ? g.NUMBER_SINGULAR : i === 0 || (j >= 1 && j <= 19) ? g.NUMBER_PLURAL : g.NUMBER_DUAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlRomanicNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            if (i === 0 || i === 1) {
                return g.NUMBER_SINGULAR;
            } else return g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlSanskritNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            return i === 1 ? g.NUMBER_SINGULAR : i === 2 ? g.NUMBER_DUAL : g.NUMBER_PLURAL;
        }
    };
    e.exports = h;
}, null);
__d("IntlSemiticSimplifiedNumberType", ["IntlVariations"], function (a, b, c, d, e, f, g) {
    var h = {
        getNumberVariationType: function (i) {
            var j = i % 100;
            return i === 2 ? g.NUMBER_DUAL : j >= 3 && j <= 10 ? g.NUMBER_PLURAL : g.NUMBER_SINGULAR;
        }
    };
    e.exports = h;
}, null);
__d("IntlSouthSlavicNumberType", ["IntlSlavicNumberType"], function (a, b, c, d, e, f, g) {
    var h = g;
    e.exports = h;
}, null);
__d("BanzaiScuba", ["Banzai", "copyProperties"], function (a, b, c, d, e, f, g, h) {
    var i = "scuba_sample";

    function j(m, n, o) {
        this.fields = {};
        this.post = function (p) {
            if (!m)return;
            var q = {};
            h(q, this.fields);
            q._ds = m;
            if (n)q._lid = n;
            q._options = o;
            g.post(i, q, p);
            this.post = function () {
            };
            this.posted = true;
        };
        this.lid = n;
        return this;
    }

    function k(m, n, o) {
        if (!this.fields[m])this.fields[m] = {};
        this.fields[m][n] = o;
        return this;
    }

    function l(m) {
        return function (n, o) {
            if (this.posted)return this;
            return k.call(this, m, n, o);
        };
    }

    h(j.prototype, {
        post: function () {
        },
        addNormal: l('normal'),
        addInteger: l('int'),
        addDenorm: l('denorm'),
        addTagset: l('tags'),
        addNormVector: l('normvector')
    });
    e.exports = j;
}, null);
__d("NavigationTimingRecorder", ["Banzai", "BanzaiScuba", "URI", "performance"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = 'navigation_timing';
    if (j.timing) {
        var l = j.timing, m = false, n = new h(k, null, {
            addBrowserFields: true,
            addGeoFields: true,
            addPredictedGeographyFields: true,
            addMobileDeviceFields: true
        }), o = function () {
            var r = {};
            return function (s, t) {
                if (!(s in l || s in r)) {
                    r[s] = t;
                    n.addInteger(s, t);
                }
            };
        }, p = function () {
            if (m)return;
            var r = Object.keys(l);
            if (r.length === 0)if (typeof l.toJSON === 'function') {
                r = Object.keys(l.toJSON());
            } else r = Object.keys(Object.getPrototypeOf(l));
            r.forEach(function (w) {
                if (l[w])n.addInteger(w, l[w]);
            });
            var s = o();
            if (a.MCustomTimingRecorder) {
                var t = a.MCustomTimingRecorder.getMarks();
                t.forEach(function (w) {
                    s(w.name, w.date);
                });
            }
            if (j.getEntriesByType) {
                var u = j.getEntriesByType("mark");
                u.forEach(function (w) {
                    s(w.name, Math.round(w.startTime) + j.timing.navigationStart);
                });
            }
            var v = new i(a.location.href);
            n.addNormal('protocol', v.getProtocol());
            n.addNormal('domain', v.getDomain());
            n.addNormal('port', v.getPort());
            n.addNormal('path', v.getPath());
            n.post();
            m = true;
        }, q = function () {
            g.subscribe(g.SEND, p);
        };
        if (a.document.readyState === 'complete') {
            q();
        } else a.addEventListener('load', q);
    }
}, null);
__d("PlatformDialog", ["DOMEventListener", "DOMEvent", "CSS", "cx"], function (a, b, c, d, e, f, g, h, i, j) {
    function k(l, m, n) {
        "use strict";
        this.$PlatformDialog0 = l;
        this.$PlatformDialog1 = m;
        if (n) {
            var o = false;
            g.add(this.$PlatformDialog0, 'submit', function (p) {
                if (o) {
                    new h(p).kill();
                    return;
                }
                o = true;
                i.addClass(l, "_32qa");
            });
        }
    }

    k.prototype.getForm = function () {
        "use strict";
        return this.$PlatformDialog0;
    };
    k.prototype.getDisplay = function () {
        "use strict";
        return this.$PlatformDialog1;
    };
    k.RESPONSE = 'platform/dialog/response';
    e.exports = k;
}, null);
__d("PluginReturn", ["Arbiter", "Log", "PlatformDialog", "Plugin", "URI", "invariant", "PlatformWidgetEndpoint"], function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    g.subscribe(i.RESPONSE, function (event, o) {
        if (o.error_code) {
            h.debug('Plugin Return Error (%s): %s', o.error_code, o.error_message || o.error_description);
            return;
        }
        j.reload(o.plugin_reload);
    });
    var n = {
        auto: function () {
            g.subscribe(j.RELOAD, function (event, o) {
                var p = typeof o == 'object' ? o.reloadUrl : o;
                n.reload(p);
            });
        }, syncPlugins: function () {
            g.subscribe(j.RELOAD, function (event, o) {
                if (o.crossFrame)n.reload(o.reloadUrl);
            });
        }, reload: function (o) {
            var p = k.getRequestURI().removeQueryData('ret').removeQueryData('act').removeQueryData('hash');
            if (o) {
                var q = new k(o);
                l(m.isPluginEndpoint(q.getPath()));
                p.setPath(q.getPath()).addQueryData(q.getQueryData());
            }
            window.location.replace(p.toString());
        }
    };
    e.exports = n;
}, null);
__d("PluginXDReady", ["Arbiter", "UnverifiedXD"], function (a, b, c, d, e, f, g, h) {
    var i = {
        handleMessage: function (j) {
            if (!j.method)return;
            try {
                g.inform('Connect.Unsafe.' + j.method, JSON.parse(j.params), g.BEHAVIOR_PERSISTENT);
            } catch (k) {
            }
        }
    };
    a.XdArbiter = i;
    h.send({xd_action: 'plugin_ready', name: window.name});
    e.exports = null;
}, null);
__d("ResourceTimingRecorder", ["Banzai", "BanzaiScuba", "pageID", "performance", "URI"], function (a, b, c, d, e, f, g, h, i, j, k) {
    var l = 1000, m = 'resource_timing', n = !!j.getEntriesByType && !window.externalHost, o = 0, p = [], q, r, s, t, u;
    if (n) {
        j.setResourceTimingBufferSize && j.setResourceTimingBufferSize(l);
        j.webkitSetResourceTimingBufferSize && j.webkitSetResourceTimingBufferSize(l);
        if (j.timing)q = j.timing.navigationStart;
        var v = new k(a.location.href);
        r = v.getProtocol();
        s = v.getDomain();
        t = v.getPort();
        u = v.getPath();
    }
    var w = function () {
        var x = j.getEntriesByType('resource');
        for (; o < x.length; o++) {
            var y = x[o];
            if (y.duration < 0 || !k.isValidURI(y.name))continue;
            var z = new k(y.name), aa = new h(m, null, {
                addBrowserFields: true,
                addGeoFields: true,
                addPredictedGeographyFields: true,
                addMobileDeviceFields: true
            }), ba = Object.keys(y);
            if (ba.length === 0)ba = Object.keys(Object.getPrototypeOf(y));
            ba.forEach(function (ca) {
                if (ca in y)switch (typeof y[ca]) {
                    case 'number':
                        aa.addInteger(ca, Math.round(y[ca] * 1000));
                        break;
                    case 'string':
                        if (ca !== 'entryType')aa.addNormal(ca, y[ca]);
                        break;
                }
            });
            aa.addNormal('resource_protocol', z.getProtocol());
            aa.addNormal('resource_domain', z.getDomain());
            aa.addNormal('resource_port', z.getPort());
            aa.addNormal('resource_path', z.getPath());
            aa.addNormal('page_protocol', r);
            aa.addNormal('page_domain', s);
            aa.addNormal('page_port', t);
            aa.addNormal('page_path', u);
            aa.addNormal('page_id', i);
            q && aa.addInteger('page_navigation_start', q);
            aa.post();
        }
    };
    if (n) {
        g.subscribe(g.SEND, w);
        g.subscribe(g.SHUTDOWN, w);
    }
}, null);
__d("legacy:bootloader", ["Bootloader"], function (a, b, c, d) {
    a.Bootloader = b('Bootloader');
}, 3);
__d("LinkshimAsyncLink", ["$", "AsyncSignal", "DOM", "UserAgent_DEPRECATED"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = {
        swap: function (l, m) {
            var n = j.ie() <= 8;
            if (n) {
                var o = i.create('wbr', {}, null);
                i.appendContent(l, o);
            }
            l.href = m;
            if (n)i.remove(o);
        }, referrer_log: function (l, m, n) {
            var o = g('meta_referrer');
            o.content = "origin";
            k.swap(l, m);
            setTimeout(function () {
                o.content = "default";
                new h(n, {}).send();
            }, 100);
        }
    };
    e.exports = k;
}, null);
__d("legacy:dom-asynclinkshim", ["LinkshimAsyncLink"], function (a, b, c, d) {
    a.LinkshimAsyncLink = b('LinkshimAsyncLink');
}, 3);
__d("getErrorStack", [], function (a, b, c, d, e, f) {
    function g() {
        var h = '';
        try {
            throw new Error('');
        } catch (i) {
            h = i.stack || i.stacktrace || '';
            h = h.replace(/@.*?\/js\//g, '@/js/').replace(/js\?.*?:/g, 'js:');
        }
        return h;
    }

    e.exports = g;
    a.getErrorStack = g;
}, null);
__d("lowerDomain", [], function (a, b, c, d, e, f) {
    if (document.domain.toLowerCase().match(/(^|\.)facebook\..*/))document.domain = "facebook.com";
}, null);
__d("markJSEnabled", [], function (a, b, c, d, e, f) {
    var g = document.documentElement;
    g.className = g.className.replace('no_js', '');
}, null);
__d("wait_for_load", ["Bootloader", "Run"], function (a, b, c, d, e, f, g, h) {
    function i(l, m) {
        return window.domready && m.call(l);
    }

    function j(l, m, n) {
        g.loadComponents.call(g, m, n.bind(l));
        return false;
    }

    function k(l, m, n) {
        n = n.bind(l, m);
        if (window.domready)return n();
        switch ((m || event).type) {
            case 'load':
            case 'focus':
                h.onAfterLoad(n);
                return;
            case 'click':
                var o = l.style, p = document.body.style;
                o.cursor = p.cursor = 'progress';
                h.onAfterLoad(function () {
                    o.cursor = p.cursor = '';
                    if (l.tagName.toLowerCase() == 'a') {
                        if (false !== n() && l.href)window.location.href = l.href;
                    } else if (l.click)l.click();
                });
                break;
        }
        return false;
    }

    a.run_if_loaded = i;
    a.run_with = j;
    a.wait_for_load = k;
}, 3);

__d("PluginSend", ["Arbiter", "CSS", "DOM", "DOMEvent", "DOMEventListener", "Focus", "Plugin", "PluginOptin", "PluginResize", "copyProperties"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = function (r, s, t, u, v, w) {
        if (v)new o(function () {
            return r.offsetWidth;
        }, function () {
            return r.offsetHeight;
        }).resize().auto();
        if (!u) {
            var x = new n('send').addReturnParams({act: 'send'});
            k.add(s, 'click', x.start.bind(x));
            return;
        }
        var y = false, z = false;

        function aa() {
            z = !z;
            h.toggle(s);
            h.toggle(t);
            h.toggle(u);
            if (z) {
                setTimeout(function () {
                    var da = i.find(u, '.textInput');
                    l.set(da);
                }, 500);
            } else {
                var ba = i.find(s, 'button');
                l.set(ba);
            }
            if (!y) {
                var ca = window.ServerJSAsyncLoader;
                ca && ca.ondemandjs && ca.run(ca.ondemandjs);
                y = true;
            }
            new o(function () {
                return Math.max(r.offsetWidth, u.offsetWidth);
            }, function () {
                return Math.max(r.offsetHeight, u.offsetHeight + u.offsetTop);
            }, 'resize.iframe', true).resize().auto();
        }

        k.add(s, 'click', aa);
        k.add(t, 'click', aa);
        k.add(r.parentNode, 'click', function (ba) {
            ba = new j(ba);
            if (ba.target === r.parentNode) {
                ba.kill();
                aa();
            }
        });
        g.subscribe(q.CLOSE, aa);
        g.subscribe(m.ERROR, function (event, ba) {
            i.setContent(r, ba.content);
            aa();
        });
        if (w)aa();
    };
    p(q, {
        SUCCESS: 'platform/plugins/send/success', CLOSE: 'platform/plugins/send/close', success: function () {
            g.inform(this.SUCCESS);
        }
    });
    e.exports = q;
}, null);
__d("PopupLink", ["DOMEvent", "DOMEventListener", "Popup"], function (a, b, c, d, e, f, g, h, i) {
    var j = {
        listen: function (k, l, m) {
            h.add(k, 'click', function (n) {
                new g(n).kill();
                i.open(k.href, l, m);
            });
        }
    };
    e.exports = j;
}, null);
__d("clickRefAction", ["Arbiter"], function (a, b, c, d, e, f, g) {
    function h(l, m, n, o, p) {
        var q = l + '/' + m;
        this.ue = q;
        this._ue_ts = l;
        this._ue_count = m;
        this._context = n;
        this._ns = null;
        this._node = o;
        this._type = p;
    }

    h.prototype.set_namespace = function (l) {
        this._ns = l;
        return this;
    };
    h.prototype.coalesce_namespace = function (l) {
        if (this._ns === null)this._ns = l;
        return this;
    };
    h.prototype.add_event = function () {
        return this;
    };
    var i = 0, j = [];

    function k(l, m, event, n, o) {
        var p = Date.now(), q = event && event.type;
        o = o || {};
        if (!m && event)m = event.getTarget();
        var r = 50;
        if (m && n != "FORCE")for (var s = j.length - 1; s >= 0 && ((p - j[s]._ue_ts) < r); --s)if (j[s]._node == m && j[s]._type == q)return j[s];
        var t = new h(p, i, l, m, q);
        j.push(t);
        while (j.length > 10)j.shift();
        g.inform("ClickRefAction/new", {cfa: t, node: m, mode: n, event: event, extra_data: o}, g.BEHAVIOR_PERSISTENT);
        i++;
        return t;
    }

    e.exports = a.clickRefAction = k;
}, null);
__d("Primer", ["Bootloader", "CSS", "ErrorUtils", "Parent", "clickRefAction", "trackReferrer"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var m = null, n = /async(?:-post)?|dialog(?:-post)?|theater|toggle/, o = document.documentElement;

    function p(t, u) {
        t = j.byAttribute(t, u);
        if (!t)return;
        do {
            var v = t.getAttribute(u);
            JSON.parse(v).forEach(function (w) {
                var x = t;
                g.loadModules.call(g, [w[0]], function (y) {
                    y[w[1]](x);
                });
            });
        } while (t = j.byAttribute(t.parentNode, u));
        return false;
    }

    o.onclick = i.guard(function (t) {
        t = t || window.event;
        m = t.target || t.srcElement;
        var u = j.byTag(m, 'A');
        if (!u)return p(m, 'data-onclick');
        var v = u.getAttribute('ajaxify'), w = u.href, x = v || w;
        if (x)k('a', u, t).coalesce_namespace('primer');
        if (v && w && !(/#$/).test(w)) {
            var y = t.which && t.which === 2, z = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
            if (y || z)return;
        }
        var aa = p(m, 'data-onclick');
        l(u, x);
        var ba = u.rel && u.rel.match(n);
        ba = ba && ba[0];
        switch (ba) {
            case 'dialog':
            case 'dialog-post':
                g.loadModules(["AsyncDialog"], function (ca) {
                    ca.bootstrap(x, u, ba);
                });
                break;
            case 'async':
            case 'async-post':
                g.loadModules(["AsyncRequest"], function (ca) {
                    ca.bootstrap(x, u);
                });
                break;
            case 'theater':
                g.loadModules(["PhotoSnowlift"], function (ca) {
                    ca.bootstrap(x, u);
                });
                break;
            case 'toggle':
                h.toggleClass(u.parentNode, 'openToggler');
                g.loadModules(["Toggler"], function (ca) {
                    ca.bootstrap(u);
                });
                break;
            default:
                return aa;
        }
        return false;
    }, 'Primer click');
    o.onsubmit = i.guard(function (t) {
        t = t || window.event;
        var u = t.target || t.srcElement;
        if (u && u.nodeName == 'FORM' && u.getAttribute('rel') == 'async') {
            k('f', u, t).coalesce_namespace('primer');
            var v = m;
            g.loadModules(["Form"], function (w) {
                w.bootstrap(u, v);
            });
            return false;
        }
    }, 'Primer submit');
    var q = null, r = function (t, u) {
        u = u || window.event;
        q = u.target || u.srcElement;
        p(q, 'data-on' + t);
        var v = j.byAttribute(q, 'data-hover');
        if (!v)return;
        switch (v.getAttribute('data-hover')) {
            case 'tooltip':
                g.loadModules(["Tooltip"], function (w) {
                    w.process(v, q);
                });
                break;
        }
    };
    o.onmouseover = i.guard(r.bind(null, 'mouseover'), 'Primer mouseover');
    var s = i.guard(r.bind(null, 'focus'), 'Primer focus');
    if (o.addEventListener) {
        o.addEventListener('focus', s, true);
    } else o.attachEvent('onfocusin', s);
}, null);
__d("ControlledReferer", ["Event", "URI", "UserAgent_DEPRECATED"], function (a, b, c, d, e, f, g, h, i) {
    var j = {
        useFacebookReferer: function (k, l, m) {
            var n = false;

            function o() {
                if (n)return;
                var q = k.contentWindow.location.pathname;
                if (q !== '/intern/common/referer_frame.php' && q !== '/common/referer_frame.php')return;
                n = true;
                k.contentWindow.document.body.style.margin = 0;
                l();
            }

            var p;
            if (document.domain !== 'facebook.com') {
                p = '/intern/common/referer_frame.php';
            } else if (i.opera()) {
                p = '/common/referer_frame.php';
            } else if (h().isSecure()) {
                p = 'https://s-static.ak.facebook.com/common/referer_frame.php';
            } else p = 'http://static.ak.facebook.com/common/referer_frame.php';
            if (m)p += '?fb_source=' + m;
            g.listen(k, 'load', o);
            k.src = p;
        }, useFacebookRefererHtml: function (k, l, m) {
            j.useFacebookReferer(k, function () {
                k.contentWindow.document.body.innerHTML = l;
            }, m);
        }
    };
    e.exports = j;
}, null);
__d("TrackingPixel", ["Arbiter", "ControlledReferer"], function (a, b, c, d, e, f, g, h) {
    var i = {
        _iframe: (void 0), loadWithNoReferrer: function (j) {
            if (!i._iframe) {
                var k = document.createElement('iframe');
                k.frameborder = 0;
                k.width = k.height = 1;
                k.style.position = 'absolute';
                k.style.top = '-10px';
                h.useFacebookReferer(k, function () {
                    g.inform('TrackingPixel/iframeIsLoaded', null, g.BEHAVIOR_PERSISTENT);
                }, null);
                document.body.appendChild(k);
                i._iframe = k;
            }
            g.subscribe('TrackingPixel/iframeIsLoaded', function () {
                var l = i._iframe.contentWindow.document, m = l.createElement('img');
                m.src = j;
            });
        }
    };
    e.exports = i;
}, null);
__d("areJSONRepresentationsEqual", [], function (a, b, c, d, e, f) {
    function g(h, i) {
        return JSON.stringify(h) == JSON.stringify(i);
    }

    e.exports = g;
}, null);
__d("UIForm", ["ArbiterMixin", "BehaviorsMixin", "DOM", "Event", "Form", "Run", "areJSONRepresentationsEqual", "mixin"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = n(g, h);
    for (var p in o)if (o.hasOwnProperty(p))r[p] = o[p];
    var q = o === null ? null : o.prototype;
    r.prototype = Object.create(q);
    r.prototype.constructor = r;
    r.__superConstructor__ = o;
    function r(s, t, u, v, w) {
        "use strict";
        this._root = s;
        this.controller = s;
        this._message = t;
        if (v) {
            this._confirm_dialog = v;
            v.subscribe('confirm', this._handleDialogConfirm.bind(this));
            i.prependContent(this._root, i.create('input', {type: 'hidden', name: 'confirmed', value: 'true'}));
        }
        l.onAfterLoad(function () {
            this._originalState = k.serialize(this._root);
        }.bind(this));
        this._forceDirty = u;
        this._confirmed = false;
        this._submitted = false;
        j.listen(this._root, 'submit', this._handleSubmit.bind(this));
        if (w && w.length)this.enableBehaviors(w);
        var x = true;
        l.onBeforeUnload(this.checkUnsaved.bind(this), x);
    }

    r.prototype.getRoot = function () {
        "use strict";
        return this._root;
    };
    r.prototype._handleSubmit = function () {
        "use strict";
        if (this._confirm_dialog && !this._confirmed) {
            this._confirm_dialog.show();
            return false;
        }
        if (this.inform('submit') === false)return false;
        this._submitted = true;
        return true;
    };
    r.prototype._handleDialogConfirm = function () {
        "use strict";
        this._confirmed = true;
        this._confirm_dialog.hide();
        if (this._root.getAttribute('ajaxify')) {
            j.fire(this._root, 'submit');
        } else if (this._handleSubmit())this._root.submit();
    };
    r.prototype.reset = function () {
        "use strict";
        this.inform('reset');
        this._submitted = false;
        this._confirmed = false;
    };
    r.prototype.isDirty = function () {
        "use strict";
        if (this._submitted || !i.contains(document.body, this._root))return false;
        if (this._forceDirty)return true;
        if (!this._originalState)return false;
        var s = k.serialize(this._root);
        return !m(s, this._originalState);
    };
    r.prototype.checkUnsaved = function () {
        "use strict";
        if (this.isDirty())return this._message;
        return null;
    };
    e.exports = a.UIForm || r;
}, null);
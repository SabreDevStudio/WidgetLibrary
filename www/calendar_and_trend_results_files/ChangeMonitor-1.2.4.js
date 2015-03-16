/*! Copyright 2006-2015 ClickTale Ltd.
 mutation-summary library, Apache License. Copyright 2011 Google Inc. https://code.google.com/p/mutation-summary/
 */
(function (t) {
    if (!t.Element) {
        return
    }
    var a = "matchesSelector";
    if ("webkitMatchesSelector" in Element.prototype) {
        a = "webkitMatchesSelector"
    } else {
        if ("mozMatchesSelector" in Element.prototype) {
            a = "mozMatchesSelector"
        }
    }
    var g = t.MutationObserver || t.WebKitMutationObserver || t.MozMutationObserver;
    if (typeof g === "undefined") {
        return
    }
    var o = "__mutation_summary_node_map_id__";
    var l = 1;

    function s(C) {
        if (!C[o]) {
            C[o] = l++;
            return true
        }
        return false
    }

    function p() {
        this.map_ = {}
    }

    p.prototype = {
        set: function (C, D) {
            s(C);
            this.map_[C[o]] = {k: C, v: D}
        }, get: function (D) {
            if (s(D)) {
                return
            }
            var C = this.map_[D[o]];
            if (C) {
                return C.v
            }
        }, has: function (C) {
            return !s(C) && C[o] in this.map_
        }, "delete": function (C) {
            if (s(C)) {
                return
            }
            delete this.map_[C[o]]
        }, keys: function () {
            var C = [];
            for (var D in this.map_) {
                C.push(this.map_[D].k)
            }
            return C
        }
    };
    function j(D, C) {
        return Object.prototype.hasOwnProperty.call(D, C)
    }

    var f = 0;
    var k = 1;
    var A = 2;
    var m = 3;
    var q = 4;
    var i = 5;

    function v(C) {
        return C == k || C == m
    }

    var w = Array.prototype.forEach.call.bind(Array.prototype.forEach);

    function c(C, E, D) {
        this.rootNode = C;
        this.elementFilter = E;
        this.calcReordered = D
    }

    c.prototype = {
        getChange: function (C) {
            var D = this.changeMap.get(C);
            if (!D) {
                D = {target: C};
                this.changeMap.set(C, D)
            }
            if (C.nodeType == Node.ELEMENT_NODE) {
                D.matchCaseInsensitive = C instanceof HTMLElement && C.ownerDocument instanceof HTMLDocument
            }
            return D
        }, getParentChange: function (C) {
            var D = this.getChange(C);
            if (!D.childList) {
                D.childList = true;
                D.oldParentNode = null
            }
            return D
        }, handleChildList: function (C) {
            this.childListChanges = true;
            w(C.removedNodes, function (D) {
                var E = this.getParentChange(D);
                if (E.added || E.oldParentNode) {
                    E.added = false
                } else {
                    E.oldParentNode = C.target
                }
            }, this);
            w(C.addedNodes, function (D) {
                var E = this.getParentChange(D);
                E.added = true
            }, this)
        }, handleAttributes: function (D) {
            this.attributesChanges = true;
            var E = this.getChange(D.target);
            if (!E.attributes) {
                E.attributes = true;
                E.attributeOldValues = {}
            }
            var C = E.attributeOldValues;
            if (!j(C, D.attributeName)) {
                C[D.attributeName] = D.oldValue
            }
        }, handleCharacterData: function (C) {
            this.characterDataChanges = true;
            var D = this.getChange(C.target);
            if (D.characterData) {
                return
            }
            D.characterData = true;
            D.characterDataOldValue = C.oldValue
        }, processMutations: function (D) {
            this.mutations = D;
            this.changeMap = new p;
            this.mutations.forEach(function (M) {
                switch (M.type) {
                    case"childList":
                        this.handleChildList(M);
                        break;
                    case"attributes":
                        this.handleAttributes(M);
                        break;
                    case"characterData":
                        this.handleCharacterData(M);
                        break
                }
            }, this);
            var G = this.entered = [];
            var K = this.exited = [];
            var I = this.stayedIn = new p;
            if (!this.childListChanges && !this.attributesChanges) {
                return
            }
            var F = this.matchabilityChange.bind(this);
            var E = this.reachabilityChange.bind(this);
            var J = this.wasReordered.bind(this);
            var H = new p;
            var L = this;

            function C(P, N) {
                if (H.has(P)) {
                    return
                }
                H.set(P, true);
                var R = L.changeMap.get(P);
                var O = N;
                if ((R && R.childList) || O == undefined) {
                    O = E(P)
                }
                if (O == f) {
                    return
                }
                F(P);
                if (O == k) {
                    G.push(P)
                } else {
                    if (O == m) {
                        K.push(P)
                    } else {
                        if (O == A) {
                            var M = A;
                            if (R && R.childList) {
                                if (R.oldParentNode !== P.parentNode) {
                                    M = q
                                } else {
                                    if (L.calcReordered && J(P)) {
                                        M = i
                                    }
                                }
                            }
                            I.set(P, M)
                        }
                    }
                }
                if (O == A) {
                    return
                }
                for (var Q = P.firstChild; Q; Q = Q.nextSibling) {
                    C(Q, O)
                }
            }

            this.changeMap.keys().forEach(function (M) {
                C(M)
            })
        }, getChanged: function (D) {
            var C = this.matchabilityChange.bind(this);
            this.entered.forEach(function (E) {
                var F = C(E);
                if (F == k || F == A) {
                    D.added.push(E)
                }
            });
            this.stayedIn.keys().forEach(function (F) {
                var G = C(F);
                if (G == k) {
                    D.added.push(F)
                } else {
                    if (G == m) {
                        D.removed.push(F)
                    } else {
                        if (G == A && (D.reparented || D.reordered)) {
                            var E = this.stayedIn.get(F);
                            if (D.reparented && E == q) {
                                D.reparented.push(F)
                            } else {
                                if (D.reordered && E == i) {
                                    D.reordered.push(F)
                                }
                            }
                        }
                    }
                }
            }, this);
            this.exited.forEach(function (E) {
                var F = C(E);
                if (F == m || F == A) {
                    D.removed.push(E)
                }
            })
        }, getOldParentNode: function (D) {
            var E = this.changeMap.get(D);
            if (E && E.childList) {
                return E.oldParentNode ? E.oldParentNode : null
            }
            var C = this.reachabilityChange(D);
            if (C == f || C == k) {
                return null
            }
            return D.parentNode
        }, getOldPreviousSibling: function (C) {
            var D = this.childlistChanges.get(C.parentNode);
            if (!D || !this.wasReordered(C)) {
                throw Error("getOldPreviousSibling requested on invalid node.")
            }
            return D.oldPreviousSibling.get(C)
        }, getOldAttribute: function (D, C) {
            var E = this.changeMap.get(D);
            if (!E || !E.attributes) {
                throw Error("getOldAttribute requested on invalid node.")
            }
            if (E.matchCaseInsensitive) {
                C = C.toLowerCase()
            }
            if (!j(E.attributeOldValues, C)) {
                throw Error("getOldAttribute requested for unchanged attribute name.")
            }
            return E.attributeOldValues[C]
        }, getAttributesChanged: function (I) {
            if (!this.attributesChanges) {
                return {}
            }
            var D;
            var F;
            if (I) {
                D = {};
                F = {};
                I.forEach(function (M) {
                    D[M] = true;
                    var N = M.toLowerCase();
                    if (M != N) {
                        F[N] = M
                    }
                })
            }
            var L = {};
            var C = this.changeMap.keys();
            for (var H = 0; H < C.length; H++) {
                var E = C[H];
                var J = this.changeMap.get(E);
                if (!J.attributes) {
                    continue
                }
                if (A != this.reachabilityChange(E) || A != this.matchabilityChange(E)) {
                    continue
                }
                var G = E;
                var K = J.attributeOldValues;
                Object.keys(K).forEach(function (N) {
                    var M = N;
                    if (J.matchCaseInsensitive && F && F[N]) {
                        M = F[N]
                    }
                    if (D && !D[M]) {
                        return
                    }
                    if (G.getAttribute(N) == K[N]) {
                        return
                    }
                    if (!L[M]) {
                        L[M] = []
                    }
                    L[M].push(G)
                })
            }
            return L
        }, getOldCharacterData: function (C) {
            var D = this.changeMap.get(C);
            if (!D || !D.characterData) {
                throw Error("getOldCharacterData requested on invalid node.")
            }
            return D.characterDataOldValue
        }, getCharacterDataChanged: function () {
            if (!this.characterDataChanges) {
                return []
            }
            var D = this.changeMap.keys();
            var C = [];
            for (var E = 0; E < D.length; E++) {
                var F = D[E];
                if (A != this.reachabilityChange(F) || A != this.matchabilityChange(F)) {
                    continue
                }
                var G = this.changeMap.get(F);
                if (!G.characterData || F.textContent == G.characterDataOldValue) {
                    continue
                }
                C.push(F)
            }
            return C
        }, reachabilityChange: function (F) {
            this.reachableCache = this.reachableCache || new p;
            this.wasReachableCache = this.wasReachableCache || new p;
            var D = this.rootNode;
            var E = this.changeMap;
            var J = this.reachableCache;
            var G = this.wasReachableCache;

            function C(K) {
                var L = E.get(K);
                if (L && L.childList) {
                    if (L.oldParentNode) {
                        return L.oldParentNode
                    }
                    if (L.added) {
                        return null
                    }
                }
                return K.parentNode
            }

            function I(K) {
                if (K === D) {
                    return true
                }
                if (!K) {
                    return false
                }
                var L = J.get(K);
                if (L === undefined) {
                    L = I(K.parentNode);
                    J.set(K, L)
                }
                return L
            }

            function H(K) {
                if (K === D) {
                    return true
                }
                if (!K) {
                    return false
                }
                var L = G.get(K);
                if (L === undefined) {
                    L = H(C(K));
                    G.set(K, L)
                }
                return L
            }

            if (I(F)) {
                return H(F) ? A : k
            } else {
                return H(F) ? m : f
            }
        }, checkWasMatching: function (F, D, K) {
            var O = this.changeMap.get(F);
            if (!O || !O.attributeOldValues) {
                return K
            }
            var H = D.tagName;
            if (O.matchCaseInsensitive && H != "*" && j(D, "caseInsensitiveTagName")) {
                H = D.caseInsensitiveTagName
            }
            if (H != "*" && H != F.tagName) {
                return false
            }
            var C = O.attributeOldValues;
            var E = D.qualifiers.some(function (P) {
                if (P["class"]) {
                    return j(C, "class")
                } else {
                    if (P.id) {
                        return j(C, "id")
                    } else {
                        return O.matchCaseInsensitive && j(P, "caseInsensitiveAttrName") ? j(C, P.caseInsensitiveAttrName) : j(C, P.attrName)
                    }
                }
            });
            if (!E) {
                return K
            }
            for (var J = 0; J < D.qualifiers.length; J++) {
                var M = D.qualifiers[J];
                var N;
                if (M["class"]) {
                    N = "class"
                } else {
                    if (M.id) {
                        N = "id"
                    } else {
                        if (O.matchCaseInsensitive && j(M, "caseInsensitiveAttrName")) {
                            N = M.caseInsensitiveAttrName
                        } else {
                            N = M.attrName
                        }
                    }
                }
                var I = M["class"] ? true : M.contains;
                var G = j(C, N) ? C[N] : F.getAttribute(N);
                if (G == null) {
                    return false
                }
                if (M.hasOwnProperty("attrValue")) {
                    if (!I && M.attrValue !== G) {
                        return false
                    }
                    var L = G.split(" ").some(function (P) {
                        return P == M.attrValue
                    });
                    if (!L) {
                        return false
                    }
                }
            }
            return true
        }, matchabilityChange: function (H) {
            if (this.filterCharacterData) {
                switch (H.nodeType) {
                    case Node.COMMENT_NODE:
                    case Node.TEXT_NODE:
                        return A;
                    default:
                        return f
                }
            }
            if (!this.elementFilter) {
                return A
            }
            if (H.nodeType !== Node.ELEMENT_NODE) {
                return f
            }
            var F = H;

            function G(K) {
                if (!this.matchCache) {
                    this.matchCache = {}
                }
                if (!this.matchCache[K.selectorString]) {
                    this.matchCache[K.selectorString] = new p
                }
                var J = this.matchCache[K.selectorString];
                var I = J.get(F);
                if (I !== undefined) {
                    return I
                }
                var L = F[a](K.selectorString);
                var M = this.checkWasMatching(F, K, L);
                if (L) {
                    I = M ? A : k
                } else {
                    I = M ? m : f
                }
                J.set(F, I);
                return I
            }

            var D = this.elementFilter.map(G, this);
            var C = f;
            var E = 0;
            while (C != A && E < D.length) {
                switch (D[E]) {
                    case A:
                        C = A;
                        break;
                    case k:
                        if (C == m) {
                            C = A
                        } else {
                            C = k
                        }
                        break;
                    case m:
                        if (C == k) {
                            C = A
                        } else {
                            C = m
                        }
                        break
                }
                E++
            }
            return C
        }, processChildlistChanges: function () {
            if (this.childlistChanges) {
                return
            }
            var D = this.childlistChanges = new p;

            function C(F) {
                var G = D.get(F);
                if (!G) {
                    G = {added: new p, removed: new p, maybeMoved: new p, oldPrevious: new p};
                    D.set(F, G)
                }
                return G
            }

            var E = this.reachabilityChange.bind(this);
            this.mutations.forEach(function (G) {
                if (G.type != "childList") {
                    return
                }
                if (E(G.target) != A) {
                    return
                }
                var I = C(G.target);
                var F = G.previousSibling;

                function H(K, J) {
                    if (!K || I.oldPrevious.has(K) || I.added.has(K) || I.maybeMoved.has(K)) {
                        return
                    }
                    if (J && (I.added.has(J) || I.maybeMoved.has(J))) {
                        return
                    }
                    I.oldPrevious.set(K, J)
                }

                w(G.removedNodes, function (J) {
                    H(J, F);
                    if (I.added.has(J)) {
                        I.added["delete"](J)
                    } else {
                        I.removed.set(J, true);
                        I.maybeMoved["delete"](J, true)
                    }
                    F = J
                });
                H(G.nextSibling, F);
                w(G.addedNodes, function (J) {
                    if (I.removed.has(J)) {
                        I.removed["delete"](J);
                        I.maybeMoved.set(J, true)
                    } else {
                        I.added.set(J, true)
                    }
                })
            })
        }, wasReordered: function (D) {
            if (!this.childListChanges) {
                return false
            }
            this.processChildlistChanges();
            var H = this.childlistChanges.get(D.parentNode);
            if (H.moved) {
                return H.moved.get(D)
            }
            var I = H.moved = new p;
            var C = new p;

            function E(M) {
                while (M = M.previousSibling) {
                    if (C.has(M)) {
                        return false
                    }
                }
                return true
            }

            function G(M) {
                if (!M) {
                    return false
                }
                if (!H.maybeMoved.has(M)) {
                    return false
                }
                var N = I.get(M);
                if (N !== undefined) {
                    return N
                }
                if (C.has(M)) {
                    N = E(M)
                } else {
                    C.set(M, true);
                    N = L(M) !== K(M)
                }
                if (C.has(M)) {
                    C["delete"](M);
                    I.set(M, N)
                } else {
                    N = I.get(M)
                }
                return N
            }

            var J = H.oldPreviousSibling = new p;

            function K(N) {
                var M = J.get(N);
                if (M !== undefined) {
                    return M
                }
                M = H.oldPrevious.get(N);
                while (M && (H.removed.has(M) || G(M))) {
                    M = K(M)
                }
                if (M === undefined) {
                    M = N.previousSibling
                }
                J.set(N, M);
                return M
            }

            var F = new p;

            function L(N) {
                if (F.has(N)) {
                    return F.get(N)
                }
                var M = N.previousSibling;
                while (M && (H.added.has(M) || G(M))) {
                    M = M.previousSibling
                }
                F.set(N, M);
                return M
            }

            H.maybeMoved.keys().forEach(G);
            return H.moved.get(D)
        }
    };
    var u = /[a-zA-Z_]+/;
    var z = /[a-zA-Z0-9_\-]+/;

    function B(O) {
        var L = [];
        var I;
        var K;

        function N() {
            if (I) {
                if (K) {
                    I.qualifiers.push(K);
                    K = undefined
                }
                L.push(I)
            }
            I = {qualifiers: []}
        }

        function M() {
            if (K) {
                I.qualifiers.push(K)
            }
            K = {}
        }

        var ac = /\s/;
        var C;
        var D = "Invalid or unsupported selector syntax.";
        var J = 1;
        var V = 2;
        var P = 3;
        var W = 4;
        var aa = 5;
        var T = 6;
        var E = 7;
        var Y = 8;
        var F = 9;
        var U = 10;
        var ab = 11;
        var H = 12;
        var S = 13;
        var R = 14;
        var G = J;
        var X = 0;
        while (X < O.length) {
            var Z = O[X++];
            switch (G) {
                case J:
                    if (Z.match(u)) {
                        N();
                        I.tagName = Z;
                        G = V;
                        break
                    }
                    if (Z == "*") {
                        N();
                        I.tagName = "*";
                        G = P;
                        break
                    }
                    if (Z == ".") {
                        N();
                        M();
                        I.tagName = "*";
                        K["class"] = true;
                        G = W;
                        break
                    }
                    if (Z == "#") {
                        N();
                        M();
                        I.tagName = "*";
                        K.id = true;
                        G = W;
                        break
                    }
                    if (Z == "[") {
                        N();
                        M();
                        I.tagName = "*";
                        K.attrName = "";
                        G = T;
                        break
                    }
                    if (Z.match(ac)) {
                        break
                    }
                    throw Error(D);
                case V:
                    if (Z.match(z)) {
                        I.tagName += Z;
                        break
                    }
                    if (Z == ".") {
                        M();
                        K["class"] = true;
                        G = W;
                        break
                    }
                    if (Z == "#") {
                        M();
                        K.id = true;
                        G = W;
                        break
                    }
                    if (Z == "[") {
                        M();
                        K.attrName = "";
                        G = T;
                        break
                    }
                    if (Z.match(ac)) {
                        G = R;
                        break
                    }
                    if (Z == ",") {
                        G = J;
                        break
                    }
                    throw Error(D);
                case P:
                    if (Z == ".") {
                        M();
                        K["class"] = true;
                        G = W;
                        break
                    }
                    if (Z == "#") {
                        M();
                        K.id = true;
                        G = W;
                        break
                    }
                    if (Z == "[") {
                        M();
                        K.attrName = "";
                        G = T;
                        break
                    }
                    if (Z.match(ac)) {
                        G = R;
                        break
                    }
                    if (Z == ",") {
                        G = J;
                        break
                    }
                    throw Error(D);
                case W:
                    if (Z.match(u)) {
                        K.attrValue = Z;
                        G = aa;
                        break
                    }
                    throw Error(D);
                case aa:
                    if (Z.match(z)) {
                        K.attrValue += Z;
                        break
                    }
                    if (Z == ".") {
                        M();
                        K["class"] = true;
                        G = W;
                        break
                    }
                    if (Z == "#") {
                        M();
                        K.id = true;
                        G = W;
                        break
                    }
                    if (Z == "[") {
                        M();
                        G = T;
                        break
                    }
                    if (Z.match(ac)) {
                        G = R;
                        break
                    }
                    if (Z == ",") {
                        G = J;
                        break
                    }
                    throw Error(D);
                case T:
                    if (Z.match(u)) {
                        K.attrName = Z;
                        G = E;
                        break
                    }
                    if (Z.match(ac)) {
                        break
                    }
                    throw Error(D);
                case E:
                    if (Z.match(z)) {
                        K.attrName += Z;
                        break
                    }
                    if (Z.match(ac)) {
                        G = Y;
                        break
                    }
                    if (Z == "~") {
                        K.contains = true;
                        G = F;
                        break
                    }
                    if (Z == "=") {
                        K.attrValue = "";
                        G = ab;
                        break
                    }
                    if (Z == "]") {
                        G = P;
                        break
                    }
                    throw Error(D);
                case Y:
                    if (Z == "~") {
                        K.contains = true;
                        G = F;
                        break
                    }
                    if (Z == "=") {
                        K.attrValue = "";
                        G = ab;
                        break
                    }
                    if (Z == "]") {
                        G = P;
                        break
                    }
                    if (Z.match(ac)) {
                        break
                    }
                    throw Error(D);
                case F:
                    if (Z == "=") {
                        K.attrValue = "";
                        G = ab;
                        break
                    }
                    throw Error(D);
                case U:
                    if (Z == "]") {
                        G = P;
                        break
                    }
                    if (Z.match(ac)) {
                        break
                    }
                    throw Error(D);
                case ab:
                    if (Z.match(ac)) {
                        break
                    }
                    if (Z == '"' || Z == "'") {
                        C = Z;
                        G = S;
                        break
                    }
                    K.attrValue += Z;
                    G = H;
                    break;
                case H:
                    if (Z.match(ac)) {
                        G = U;
                        break
                    }
                    if (Z == "]") {
                        G = P;
                        break
                    }
                    if (Z == "'" || Z == '"') {
                        throw Error(D)
                    }
                    K.attrValue += Z;
                    break;
                case S:
                    if (Z == C) {
                        G = U;
                        break
                    }
                    K.attrValue += Z;
                    break;
                case R:
                    if (Z.match(ac)) {
                        break
                    }
                    if (Z == ",") {
                        G = J;
                        break
                    }
                    throw Error(D)
            }
        }
        switch (G) {
            case J:
            case V:
            case P:
            case aa:
            case R:
                N();
                break;
            default:
                throw Error(D)
        }
        if (!L.length) {
            throw Error(D)
        }
        function Q(ad) {
            return '"' + ad.replace(/"/, '\\"') + '"'
        }

        L.forEach(function (ad) {
            var af = ad.tagName.toUpperCase();
            if (ad.tagName != af) {
                ad.caseInsensitiveTagName = af
            }
            var ae = ad.tagName;
            ad.qualifiers.forEach(function (ag) {
                if (ag["class"]) {
                    ae += "." + ag.attrValue
                } else {
                    if (ag.id) {
                        ae += "#" + ag.attrValue
                    } else {
                        var ah = ag.attrName.toLowerCase();
                        if (ag.attrName != ah) {
                            ag.caseInsensitiveAttrName = ah
                        }
                        if (ag.contains) {
                            ae += "[" + ag.attrName + "~=" + Q(ag.attrValue) + "]"
                        } else {
                            ae += "[" + ag.attrName;
                            if (ag.hasOwnProperty("attrValue")) {
                                ae += "=" + Q(ag.attrValue)
                            }
                            ae += "]"
                        }
                    }
                }
            });
            ad.selectorString = ae
        });
        return L
    }

    var e = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:\.]*)$/;

    function b(C) {
        if (typeof C != "string") {
            throw Error("Invalid request opion. attribute must be a non-zero length string.")
        }
        C = C.trim();
        if (!C) {
            throw Error("Invalid request opion. attribute must be a non-zero length string.")
        }
        if (!C.match(e)) {
            throw Error("Invalid request option. invalid attribute name: " + C)
        }
        return C
    }

    function h(H) {
        if (!H.trim().length) {
            throw Error("Invalid request option: elementAttributes must contain at least one attribute.")
        }
        var G = {};
        var C = {};
        var F = H.split(/\s+/);
        for (var D = 0; D < F.length; D++) {
            var E = F[D];
            if (!E) {
                continue
            }
            E = b(E);
            if (G.hasOwnProperty(E.toLowerCase())) {
                throw Error("Invalid request option: observing multiple case varitations of the same attribute is not supported.")
            }
            C[E] = true;
            G[E.toLowerCase()] = true
        }
        return Object.keys(C)
    }

    function d(C) {
        var J = {callback: true, queries: true, rootNode: true, observeOwnChanges: true};
        var H = {};
        for (var E in C) {
            if (!(E in J)) {
                throw Error("Invalid option: " + E)
            }
        }
        if (typeof C.callback !== "function") {
            throw Error("Invalid options: callback is required and must be a function")
        }
        H.callback = C.callback;
        H.rootNode = C.rootNode || document;
        H.observeOwnChanges = C.observeOwnChanges;
        if (!C.queries || !C.queries.length) {
            throw Error("Invalid options: queries must contain at least one query request object.")
        }
        H.queries = [];
        for (var D = 0; D < C.queries.length; D++) {
            var G = C.queries[D];
            var I;
            if (G.all) {
                if (Object.keys(G).length > 1) {
                    throw Error("Invalid request option. all has no options.")
                }
                H.queries.push({all: true});
                continue
            }
            if (G.hasOwnProperty("attribute")) {
                I = {attribute: b(G.attribute)};
                I.elementFilter = B("*[" + I.attribute + "]");
                if (Object.keys(G).length > 1) {
                    throw Error("Invalid request option. attribute has no options.")
                }
                H.queries.push(I);
                continue
            }
            if (G.hasOwnProperty("element")) {
                var F = Object.keys(G).length;
                I = {element: G.element, elementFilter: B(G.element)};
                if (G.hasOwnProperty("elementAttributes")) {
                    I.elementAttributes = h(G.elementAttributes);
                    F--
                }
                if (F > 1) {
                    throw Error("Invalid request option. element only allows elementAttributes option.")
                }
                H.queries.push(I);
                continue
            }
            if (G.characterData) {
                if (Object.keys(G).length > 1) {
                    throw Error("Invalid request option. characterData has no options.")
                }
                H.queries.push({characterData: true});
                continue
            }
            throw Error("Invalid request option. Unknown query request.")
        }
        return H
    }

    function n(D) {
        var C = {};
        D.forEach(function (E) {
            E.qualifiers.forEach(function (F) {
                if (F["class"]) {
                    C["class"] = true
                } else {
                    if (F.id) {
                        C.id = true
                    } else {
                        C[F.attrName] = true
                    }
                }
            })
        });
        return Object.keys(C)
    }

    function r(D) {
        var F = {childList: true, subtree: true};
        var C;

        function E(G) {
            if (F.attributes && !C) {
                return
            }
            F.attributes = true;
            F.attributeOldValue = true;
            if (!G) {
                C = undefined;
                return
            }
            C = C || {};
            G.forEach(function (H) {
                C[H] = true;
                C[H.toLowerCase()] = true
            })
        }

        D.forEach(function (H) {
            if (H.characterData) {
                F.characterData = true;
                F.characterDataOldValue = true;
                return
            }
            if (H.all) {
                E();
                F.characterData = true;
                F.characterDataOldValue = true;
                return
            }
            if (H.attribute) {
                E([H.attribute.trim()]);
                return
            }
            if (H.elementFilter && H.elementFilter.some(function (I) {
                    return I.className
                })) {
                E(["class"])
            }
            var G = n(H.elementFilter).concat(H.elementAttributes || []);
            if (G.length) {
                E(G)
            }
        });
        if (C) {
            F.attributeFilter = Object.keys(C)
        }
        return F
    }

    function x(C, D, H) {
        C.elementFilter = H.elementFilter;
        C.filterCharacterData = H.characterData;
        var E = {target: D, type: "summary", added: [], removed: []};
        E.getOldParentNode = C.getOldParentNode.bind(C);
        if (H.all || H.element) {
            E.reparented = []
        }
        if (H.all) {
            E.reordered = []
        }
        C.getChanged(E);
        if (H.all || H.attribute || H.elementAttributes) {
            var G = H.attribute ? [H.attribute] : H.elementAttributes;
            var F = C.getAttributesChanged(G);
            if (H.attribute) {
                E.valueChanged = [];
                if (F[H.attribute]) {
                    E.valueChanged = F[H.attribute]
                }
                E.getOldAttribute = function (J) {
                    return C.getOldAttribute(J, H.attribute)
                }
            } else {
                E.attributeChanged = F;
                if (H.elementAttributes) {
                    H.elementAttributes.forEach(function (J) {
                        if (!E.attributeChanged.hasOwnProperty(J)) {
                            E.attributeChanged[J] = []
                        }
                    })
                }
                E.getOldAttribute = C.getOldAttribute.bind(C)
            }
        }
        if (H.all || H.characterData) {
            var I = C.getCharacterDataChanged();
            E.getOldCharacterData = C.getOldCharacterData.bind(C);
            if (H.characterData) {
                E.valueChanged = I
            } else {
                E.characterDataChanged = I
            }
        }
        if (E.reordered) {
            E.getOldPreviousSibling = C.getOldPreviousSibling.bind(C)
        }
        return E
    }

    function y(D) {
        var F = false;
        var P = d(D);
        var C = r(P.queries);
        var K = P.rootNode;
        var M = P.callback;
        var L = Array.prototype.concat.apply([], P.queries.map(function (Q) {
            return Q.elementFilter ? Q.elementFilter : []
        }));
        if (!L.length) {
            L = undefined
        }
        var N = P.queries.some(function (Q) {
            return Q.all
        });
        var O = [];
        if (y.createQueryValidator) {
            O = P.queries.map(function (Q) {
                return y.createQueryValidator(K, Q)
            })
        }
        function H() {
            O.forEach(function (Q) {
                if (Q) {
                    Q.recordPreviousState()
                }
            })
        }

        function G(Q) {
            O.forEach(function (S, R) {
                if (S) {
                    S.validate(Q[R])
                }
            })
        }

        function E(R) {
            if (!R || !R.length) {
                return []
            }
            var Q = new c(K, L, N);
            Q.processMutations(R);
            return P.queries.map(function (S) {
                return x(Q, K, S)
            })
        }

        function J(Q) {
            return Q.some(function (R) {
                var T = ["added", "removed", "reordered", "reparented", "valueChanged", "characterDataChanged"];
                if (T.some(function (U) {
                        return R[U] && R[U].length
                    })) {
                    return true
                }
                if (R.attributeChanged) {
                    var S = Object.keys(R.attributeChanged).some(function (U) {
                        return R.attributeChanged[U].length
                    });
                    if (S) {
                        return true
                    }
                }
                return false
            })
        }

        var I = new g(function (Q) {
            if (!P.observeOwnChanges) {
                I.disconnect()
            }
            var R = E(Q);
            G(R);
            if (P.observeOwnChanges) {
                H()
            }
            if (J(R)) {
                M(R)
            }
            if (!P.observeOwnChanges) {
                H();
                I.observe(K, C)
            }
        });
        this.reconnect = function () {
            if (F) {
                throw Error("Already connected")
            }
            I.observe(K, C);
            F = true;
            H()
        };
        this.disconnect = function () {
            if (!F) {
                throw Error("Not connected")
            }
            var Q;
            if (typeof I.takeRecords == "function") {
                Q = I.takeRecords()
            } else {
                console.log("Warning: MutationObserver.takeRecords not implemented. Current changes cannot be reported.")
            }
            I.disconnect();
            F = false;
            var R = E(Q);
            if (J(R)) {
                return R
            }
        };
        this.reconnect()
    }

    t.MutationSummary = y;
    t.MutationSummary.NodeMap = p;
    t.MutationSummary.parseElementFilter = B
})(this);
!function (window) {
    var g = !0, j = null, k = !1;

    function m(a) {
        return function () {
            return this[a]
        }
    }

    function o(a) {
        return function () {
            return a
        }
    }

    var q;
    var r, aa, s;
    (function () {
        var a = {};
        r = function (b, c) {
            a[b] = a[b] || [];
            a[b].push(c)
        };
        aa = function (b, c) {
            var d = a[b];
            if (d)for (var e = 0; e < d.length; e++)d[e] === c && d.splice(e, 1)
        };
        s = function (b) {
            var c = a[b.e()];
            if (c)for (var d = 0; d < c.length; d++)c[d].call(this, b)
        }
    })();
    function ba(a) {
        this.j = a
    }

    ba.prototype.e = o(13);
    function ca(a) {
        this.j = a
    }

    ca.prototype.e = o(12);
    function da(a) {
        this.c = a
    }

    da.prototype.e = o(6);
    function ea(a) {
        this.c = a
    }

    ea.prototype.e = o(8);
    window.Text && (window.Text.prototype.ClickTale = k);
    function t(a) {
        return a.ClickTale
    }

    function fa(a) {
        a.ClickTale && delete a.ClickTale
    };
    function v(a) {
        if ("previousElementSibling"in a)return a.previousElementSibling;
        for (a = a.previousSibling; a && a.nodeType !== x;)a = a.previousSibling;
        return a
    }

    function ga(a) {
        if ("nextElementSibling"in a)return a.nextElementSibling;
        for (a = a.nextSibling; a && a.nodeType !== x;)a = a.nextSibling;
        return a
    };
    var x = 1;
    var y = function () {
        var a = document.documentElement;
        return a.compareDocumentPosition || a.contains ? function (a, c) {
            var d = 9 === a.nodeType ? a.documentElement : a;
            return a === c || d.contains(c) || a.compareDocumentPosition && a.compareDocumentPosition(c) & 16
        } : function (a, c) {
            if (c)for (; c = c.parentNode;)if (c === a)return g;
            return k
        }
    }();
    var ha;

    function ia() {
        if (ha)return ha;
        var a = window.ClickTaleGlobal;
        a || (a = {}, window.ClickTaleGlobal = a);
        a.exports = a.exports || {};
        return ha = a
    };
    var z = {
        Ra: 1, Cb: function (a, b) {
            return (b.nodeType === x ? a.J : a.na).apply(a, b)
        }
    };
    z.ab = function (a) {
        return (a.nodeType === x ? z.J : z.Ia).call(z, a)
    };
    z.bb = function (a, b, c, d) {
        for (var e = 0; e < b.length; e++) {
            var f = b[e], h = c[f.La] || (c[f.La] = f.o());
            if (z.rb(a, h))return f.transform(a)
        }
        return d(a)
    };
    z.rb = function (a, b) {
        for (var c, d = 0; d < b.length; d++)if (c = b[d], a === c || y(c, a))return g;
        return k
    };
    z.J = function (a) {
        for (var a = a.attributes, b = {}, c = 0; c < a.length; c++) {
            var d = a.item(c);
            b[d.name] = d.value
        }
        return b
    };
    z.Ia = function (a) {
        var b = [], c = v(a), c = c && c.nextSibling ? c.nextSibling : a.parentNode.firstChild;
        do b.push(c.textContent || c.nodeValue), c = c.nextSibling; while (c && 3 === c.nodeType);
        return b.join("")
    };
    function ja() {
    }

    ja.prototype.J = function (a) {
        return z.J(a)
    };
    ja.prototype.na = function (a) {
        return z.Ia(a)
    };
    function A() {
        var a = this;
        this.qa = [];
        this.fa = [];
        this.B = {};
        r(12, function () {
            a.B = {}
        })
    }

    A.prototype.clear = function () {
        this.qa.length = this.fa.length = 0
    };
    A.prototype.J = function (a) {
        return z.bb(a, this.fa, this.B, z.J)
    };
    A.prototype.na = function (a) {
        return z.bb(a, this.qa, this.B, z.Ia)
    };
    function ka(a, b) {
        this.o = a;
        this.transform = b;
        this.La = ++z.Ra
    }

    ka.prototype.o = j;
    ka.prototype.transform = j;
    function la(a, b) {
        this.o = a;
        this.transform = b;
        this.La = ++z.Ra
    }

    la.prototype.o = j;
    la.prototype.transform = j;
    function ma(a) {
        var b = a.t, c = b.selector;
        return "string" === typeof c ? (a.t = {transform: b.transform, selector: na(c, a.xb)}, g) : k
    }

    function na(a, b) {
        return function () {
            return b.select(a)
        }
    }

    function oa(a) {
        var b = a.t, c = b.selector;
        if (c instanceof Array && c.length && (a.t = {selector: c[0], transform: b.transform}, ma(a))) {
            if (1 < c.length) {
                var d = c[1];
                if ("function" === typeof d) {
                    var e = a.t.selector;
                    a.t.selector = function () {
                        return d(e())
                    }
                }
            }
            return a.t
        }
        return j
    };
    function pa(a, b, c) {
        qa(b, c, function (b) {
            b = new ka(b.selector, b.transform);
            a.qa.splice(a.qa.length, 0, b)
        })
    }

    function ra(a, b, c) {
        qa(b, c, function (b) {
            b = new la(b.selector, b.transform);
            a.fa.splice(a.fa.length, 0, b)
        })
    }

    function qa(a, b, c) {
        if (a instanceof Array)for (var d = 0; d < a.length; d++) {
            var e;
            e = a[d];
            var f = {t: e, xb: b};
            (e = "selector"in e && "transform"in e && "function" === typeof e.transform && (ma(f) || oa(f)) ? f.t : j) && c(e)
        }
    };
    function sa(a, b, c, d) {
        this.j = 0;
        this.zb = /^[A-Za-z]+.*/i;
        this.m = k;
        this.Ma = a;
        this.b = b;
        this.C = new ta(c.Filters);
        (a = c.PII) ? (b = new A, pa(b, a.Text, d), ra(b, a.Attributes, d), d = b) : d = new ja;
        this.sa = d
    }

    sa.prototype.ab = function (a) {
        this.j++;
        s(new ba(this.j));
        this.m = k;
        var b = a.da, c = a.W, d = a.attributes, e = a.text, f = {
            removed: a.da,
            moved: a.W,
            attributes: d,
            text: e
        }, h = j, l = new B;
        if (f = C(f, this.j, "Before processing", this.C.Ta)) {
            a:if (h = [], this.m)b = []; else {
                for (f = 0; f < b.length; f++) {
                    var n = b[f], i = this.b.getData(n), p = n, u = n, w;
                    s(new ua(p));
                    do {
                        if (!u) {
                            n = g;
                            break
                        }
                        n = u;
                        w = this.b.getData(n);
                        u = w.$;
                        n = !w.N || this.Ma.ja(u)
                    } while (!n && (!u || !y(document.documentElement, u)));
                    if (!n) {
                        if (!D(this.C, p, this.j)) {
                            this.m = g;
                            b = [];
                            break a
                        }
                        w.D || (3 === p.nodeType ?
                            va(this, i, l, h) : h.push(i.Ga))
                    }
                    s(new ea(p))
                }
                b = h
            }
            c = wa(this, c, l, b, !a.Ba);
            a:if (a = [], this.m)d = []; else {
                for (w = 0; w < d.length; w++)if (h = d[w], f = h.node, this.b.getData(f).N) {
                    if (!D(this.C, f, this.j)) {
                        this.m = g;
                        d = [];
                        break a
                    }
                    h.node = this.b.getData(f).h;
                    a.push(h)
                }
                d = a
            }
            a:if (e = e.concat(E(l)), this.m)e = []; else {
                l = [];
                a = {};
                for (w = 0; w < e.length; w++) {
                    h = e[w];
                    f = this.b.getData(h);
                    i = v(h);
                    i = !i ? "" : this.b.getData(i).h;
                    if (!i && ((p = h.parentNode) ? i = this.b.getData(p).h : f.$ && (i = this.b.getData(f.$).h), !i))continue;
                    if (!(i in a) && f.N) {
                        if (!D(this.C,
                                h, this.j)) {
                            this.m = g;
                            e = [];
                            break a
                        }
                        l.push(xa(this, h));
                        a[i] = g
                    }
                }
                e = l
            }
            h = {removed: b, moved: c, attributes: d, text: e}
        }
        s(new ca(this.j));
        if (h && (h.removed.length || h.moved.length || h.attributes.length || h.text.length) && !this.m)if (c = h, C(c, this.j, "On projection", this.C.cb) && (c = {
                projection: c,
                buffer: JSON.stringify(c)
            }, f = C(c, this.j, "After processing", this.C.ea)))return c.buffer;
        return j
    };
    function va(a, b, c, d) {
        for (var e = b.previousElementSibling, b = b.$, f; e && (!e || !y(document.documentElement, e));)e = a.b.getData(e).previousElementSibling;
        f = e ? e.nextSibling : b.firstChild;
        if (!f || f && y(document.documentElement, f))f && 3 === f.nodeType ? c.set(f, f) : (c = {
            text: g,
            parentNode: a.b.getData(b).h
        }, e && (c.previousElementSibling = a.b.getData(e).h), d.push(c))
    }

    function ya(a, b, c, d) {
        var e = b.previousSibling, f = b.nextSibling, h = a.b.getData(b).D, l = k;
        if (3 === b.nodeType) {
            if (e && 3 === e.nodeType ? (c.set(e, e), l = g) : f && 3 === f.nodeType && (c.set(b, b), l = g), l && h)return
        } else f && 3 === f.nodeType && e && 3 === e.nodeType && (h = a.b.getData(e), a = a.b.getData(f), !h.D && !a.D && (c.set(e, e), d.set(f, g)));
        d.set(b, g)
    }

    function wa(a, b, c, d, e) {
        var f = new B, h = [], l, n, i, p = new B;
        if (a.m)return h;
        for (var u = 0; u < b.length; u++)if (i = b[u], s(new za(i)), a.b.getData(i).N) {
            if (!D(a.C, i, a.j))return a.m = g, [];
            if (n = i.parentNode)l = f.get(n), l || (l = new B, f.set(n, l)), ya(a, i, c, l)
        }
        b = f.keys();
        for (u = 0; u < b.length; u++) {
            n = b[u];
            l = f.get(n);
            for (i = l.keys(); i.length;) {
                for (i = i[0]; i.previousSibling && l.has(i.previousSibling);)i = i.previousSibling;
                for (; i && l.has(i);) {
                    if (!p.has(i) && !c.has(i)) {
                        if (n = Aa(a, i, e, function (b) {
                                var e = a.b.getData(b);
                                p.set(b, g);
                                if (!e.D) {
                                    if (3 !==
                                        b.nodeType)return e.Ga;
                                    c.set(b, b);
                                    va(a, e, c, d)
                                }
                                return j
                            }))n = {
                            node: n,
                            text: 3 === i.nodeType,
                            parentNode: !i.parentNode ? "" : a.b.getData(i.parentNode).h
                        }, Ba(a, i, n), h.push(n);
                        s(new da(i))
                    }
                    l.remove(i);
                    i = i.nextSibling
                }
                i = l.keys()
            }
        }
        p = j;
        return h
    }

    function Aa(a, b, c, d) {
        if (!b)return j;
        if (d) {
            var e = d(b);
            if (e)return s(new F(b, e)), e
        }
        e = {nodeType: b.nodeType};
        switch (e.nodeType) {
            case 10:
                e.name = b.name;
                e.publicId = b.publicId;
                e.systemId = b.systemId;
                break;
            case 8:
                e.textContent = b.textContent;
                break;
            case 3:
                e.textContent = a.sa.na(b);
                break;
            case x:
                if (!a.zb.test(b.tagName))return j;
                e.tagName = b.tagName;
                e.attributes = a.sa.J(b);
                if (c && b.childNodes.length) {
                    e.childNodes = [];
                    for (c = b.firstChild; c; c = c.nextSibling)if (a.b.getData(c).D) {
                        var f = Aa(a, c, g, d);
                        f && e.childNodes.push(f)
                    }
                }
        }
        s(new F(b,
            e));
        return e
    }

    function xa(a, b) {
        var c = b.parentNode, c = {textContent: a.sa.na(b), parentNode: !c ? "" : a.b.getData(c).h};
        Ba(a, b, c);
        return c
    }

    function Ba(a, b, c) {
        var d = b.previousSibling;
        d && (3 === d.nodeType ? (d = v(b)) ? c.previousElementSibling = a.b.getData(d).h : b.nodeType === x && (c.previousText = g) : c.previousSibling = a.b.getData(d).h)
    };
    function Ca(a) {
        a = a.ClickTaleSettings;
        "object" !== typeof a && (a = j);
        return a
    };
    var Da = Array.prototype.indexOf ? function (a, b) {
        return a.indexOf(b)
    } : function (a, b) {
        for (var c = a.length, d = 0; d < c; d++)if (a[d] === b)return d;
        return -1
    };

    function G() {
        this.g = []
    }

    G.prototype.add = function (a) {
        this.g.push(a)
    };
    G.prototype.remove = function (a) {
        a = this.indexOf(a);
        0 <= a && this.g.splice(a, 1)
    };
    G.prototype.indexOf = function (a) {
        return Da(this.g, a)
    };
    G.prototype.za = function (a) {
        for (var b = this.g, c = 0; c < b.length; c++)b[c].apply(b[c], arguments)
    };
    function Ea() {
        this.sb = 0
    }

    Ea.prototype.Wa = function () {
        return ++this.sb
    };
    var Fa = 1;

    function B(a) {
        this.r = {};
        this.G = "__node_map_id_" + Fa++ + "__";
        this.ob = a || new Ea
    }

    q = B.prototype;
    q.clear = function (a) {
        for (var a = a || this.keys(), b = 0; b < a.length; b++)this.remove(a[b])
    };
    q.set = function (a, b) {
        H(this, a);
        this.r[t(a)[this.G]] = {kb: a, v: b}
    };
    q.get = function (a) {
        return H(this, a) ? j : (a = this.r[t(a)[this.G]]) ? a.v : j
    };
    q.has = function (a) {
        return !H(this, a) && t(a)[this.G]in this.r
    };
    q.remove = function (a) {
        H(this, a) || delete this.r[t(a)[this.G]]
    };
    q.count = function () {
        return this.keys().length
    };
    q.keys = function () {
        var a = [], b;
        for (b in this.r)a.push(this.r[b].kb);
        return a
    };
    q.key = function (a) {
        H(this, a);
        return t(a)[this.G]
    };
    function H(a, b) {
        var c;
        b.ClickTale = b.ClickTale || {};
        c = t(b);
        return !c[a.G] ? (c[a.G] = a.ob.Wa(b), g) : k
    }

    function E(a) {
        for (var b = [], c = a.keys(), d = 0; d < c.length; d++)b.push(a.get(c[d]));
        return b
    };
    function I() {
        this.w = new G;
        this.n = new B;
        this.Fa = {};
        this.wb = [{all: g}]
    }

    I.prototype.description = o("observers");
    I.prototype.Qa = function (a, b) {
        this.w.add(function () {
            a.apply(b, arguments)
        })
    };
    I.prototype.observe = function (a) {
        if (!this.n.has(a)) {
            this.n.set(a, g);
            var b = this, c = new MutationSummary({
                rootNode: a, callback: function (a) {
                    return Ga(b, a)
                }, queries: this.wb, observeOwnChanges: g
            });
            this.Fa[this.n.key(a)] = c
        }
    };
    function Ga(a, b) {
        var c = b[0];
        a.w.za({
            Ba: g,
            da: c.removed,
            W: c.added.concat(c.reparented).concat(c.reordered),
            attributes: Ha(c.attributeChanged),
            text: c.characterDataChanged
        }, {
            Aa: function (a) {
                return c.getOldParentNode(a)
            }
        })
    }

    I.prototype.disconnect = function (a) {
        var b = this.n.key(a);
        if (b) {
            var c = this.Fa[b];
            c && (c.disconnect(), delete this.Fa[b], this.n.remove(a))
        }
    };
    function Ha(a) {
        if (a) {
            var b = new B, c;
            for (c in a)for (var d = a[c], e = 0; e < d.length; e++) {
                var f = d[e], h = b.get(f) || {node: f, attributes: {}};
                b.set(f, h);
                h.attributes[c] = f.getAttribute(c)
            }
            return b.keys().map(function (a) {
                return b.get(a)
            })
        }
        return []
    };
    function J(a) {
        var b = j;
        this.k = a;
        this.F = k;
        this.s = j;
        if (b = "ontouchstart"in a || a.DocumentTouch && a.document instanceof a.DocumentTouch ? a.MutationObserver : a.MutationObserver || a.WebKitMutationObserver || a.MozMutationObserver)a = b.prototype, this.F = "function" === typeof a.observe && "function" === typeof a.disconnect
    }

    J.prototype.M = J.prototype.getObserver = function () {
        return this.s || (this.s = new I)
    };
    J.prototype.Ca = J.prototype.isSpecified = m("F");
    function Ia() {
        this.g = {}
    }

    Ia.prototype.add = function (a, b, c) {
        Ja(this, a, g)[c] = b
    };
    Ia.prototype.remove = function (a, b) {
        var c = Ja(this, a);
        c && c[b] && delete c[b]
    };
    function Ja(a, b, c) {
        if (!a.g[b]) {
            if (!c)return j;
            a.g[b] = {}
        }
        return a.g[b]
    };
    function K() {
        this.ma = new B
    }

    var Ka = new K;
    K.prototype.Aa = function (a) {
        return this.ma.get(a)
    };
    K.prototype.map = function (a, b) {
        this.ma.has(a) || this.ma.set(a, b)
    };
    K.prototype.clear = function () {
        this.ma.clear()
    };
    function La(a) {
        this.k = a;
        this.A = k;
        this.oa = new Ia;
        this.w = new G;
        this.p = new K;
        this.n = new B;
        this.V()
    }

    q = La.prototype;
    q.Qa = function (a, b) {
        this.w.add(function () {
            a.apply(b, arguments)
        })
    };
    q.disconnect = function (a) {
        var b = this.n.key(a).toString();
        if (b) {
            var c = Ja(this.oa, b), b = c.handleChildListChange, d = c.handleAttributesChange, c = c.handleCharctersDataChange;
            a.removeEventListener("DOMNodeRemoved", b, k);
            a.removeEventListener("DOMNodeInserted", b, k);
            a.removeEventListener("DOMAttrModified", d, k);
            a.removeEventListener("DOMCharacterDataModified", c, k)
        }
    };
    q.observe = function (a) {
        if (!this.n.has(a)) {
            var b;
            this.n.set(a, g);
            b = this.n.key(a).toString();
            Ma(this, b, a);
            Na(this, b, a);
            Oa(this, b, a)
        }
    };
    q.description = o("events");
    function Ma(a, b, c) {
        function d() {
            a.hb.apply(a, arguments);
            Pa(a)
        }

        a.oa.add(b, d, "handleAttributesChange");
        c.addEventListener("DOMAttrModified", d, k)
    }

    function Na(a, b, c) {
        function d() {
            a.jb.apply(a, arguments);
            Pa(a)
        }

        a.oa.add(b, d, "handleChildListChange");
        c.addEventListener("DOMNodeRemoved", d, k);
        c.addEventListener("DOMNodeInserted", d, k)
    }

    function Oa(a, b, c) {
        function d() {
            a.ib.apply(a, arguments);
            Pa(a)
        }

        a.oa.add(b, d, "handleCharctersDataChange");
        c.addEventListener("DOMCharacterDataModified", d, g)
    }

    q.jb = function (a) {
        var b = a.target;
        "DOMNodeInserted" === a.type ? (this.f.has(b) && this.f.remove(b), this.l.set(b, b)) : (this.p.map(b, a.relatedNode), this.l.has(b) && this.l.remove(b), this.L.has(b) && this.L.remove(b), this.d.has(b) && this.d.remove(b), this.f.set(b, b))
    };
    q.ib = function (a) {
        a = a.target;
        this.L.set(a, a)
    };
    q.hb = function (a) {
        var b = a.target, c = this.d.get(b) || {node: b, attributes: {}}, a = a.attributeName || a.attrName;
        c.attributes[a] = b.getAttribute(a);
        this.d.set(b, c)
    };
    function Pa(a) {
        a.A || (a.A = g, setTimeout(function () {
            a.A = k;
            a.Ja();
            a.V()
        }, 0))
    }

    q.Ja = function () {
        var a = E(this.l), b = E(this.f), c = E(this.d), d = E(this.L);
        this.w.za({Ba: k, W: a, da: b, attributes: c, text: d}, this.p);
        this.p.clear()
    };
    q.V = function () {
        this.l = new B;
        this.f = new B;
        this.d = new B;
        this.L = new B
    };
    function L(a) {
        var b = a.document;
        this.k = a;
        this.s = j;
        this.F = g;
        this.S = b;
        this.F = this.S.addEventListener && Qa(this) && Ra(this) && Sa(this)
    }

    L.prototype.M = L.prototype.getObserver = function () {
        return this.s || (this.s = new La(this.k))
    };
    L.prototype.Ca = L.prototype.isSpecified = m("F");
    function Qa(a) {
        var b, c = a.S.createElement("div"), a = c.id, d = k;
        b = function () {
            c.removeEventListener("DOMAttrModified", b, k);
            d = g
        };
        c.addEventListener("DOMAttrModified", b, k);
        c.id = "ctobserve";
        c.id = a;
        c = j;
        return d
    }

    function Ra(a) {
        var b, c = a.S.createElement("div"), a = a.S.createElement("input"), d = k;
        a.type = "hidden";
        b = function () {
            c.removeEventListener("DOMNodeInserted", b, k);
            d = g
        };
        c.addEventListener("DOMNodeInserted", b, k);
        c.appendChild(a);
        c = a = j;
        return d
    }

    function Sa(a) {
        var b, c = a.S, d = c.createElement("div"), a = c.createElement("div"), c = c.createTextNode("text"), e = k;
        a.appendChild(c);
        d.appendChild(a);
        b = function () {
            d.removeEventListener("DOMCharacterDataModified", b, k);
            e = g
        };
        d.addEventListener("DOMCharacterDataModified", b, k);
        a.firstChild.nodeValue = "ctobserve";
        d.removeChild(a);
        d = a = c = j;
        return e
    };
    function Ta(a, b) {
        this.k = a;
        this.ka = this.A = k;
        this.a = b || a.jQuery;
        this.w = new G;
        this.p = new K;
        this.Z = new B;
        this.L = [];
        this.V();
        this.Ka = {};
        this.Ya = parseFloat(this.a.fn.jquery);
        Ua || (Va(this), Wa(this), this.T(), Xa(this), Ya(this), Za(this), $a(this), ab(this), this.ua(), bb(this), cb(this), db(this), eb(this), fb(this), Ua = g)
    }

    var Ua = k, gb = k, hb = {
        htmlFor: "for",
        className: "class",
        maxLength: "maxlength",
        cellSpacing: "cellspacing",
        cellPadding: "cellpadding",
        rowSpan: "rowspan",
        colSpan: "colspan",
        useMap: "usemap",
        frameBorder: "frameborder"
    };

    function Va(a) {
        jQuery.each("wrapAll,domManip,remove,empty,html,clone,css,animate,show,hide,addClass,removeClass,removeAttr,removeProp".split(","), function (b, c) {
            a.Ka[c] = {Va: a.a.fn, Za: c, method: a.a.fn[c]}
        });
        jQuery.each(["prop", "attr"], function (b, c) {
            a.Ka[c] = {Va: a.a, Za: c, method: a.a.fn[c]}
        })
    }

    q = Ta.prototype;
    q.Qa = function (a, b) {
        this.w.add(function () {
            a.apply(b, arguments)
        })
    };
    q.disconnect = function (a) {
        this.Z.has(a) || this.Z.remove(a);
        this.Z.count() || ib(this)
    };
    function ib(a) {
        jQuery.each(a.Ka, function (a, c) {
            c.Va[c.Za] = c.method
        });
        Ua = k
    }

    q.observe = function (a) {
        this.Z.has(a) || (gb = g, this.Z.set(a, g))
    };
    q.description = o("jQuery");
    function jb(a, b) {
        var c, d = 0;
        if (!b)return k;
        c = b.beforeunload;
        if (a.a.isArray(c))return 0 < c.length;
        if (!c)return k;
        a.a.each(c, function () {
            d++;
            return k
        });
        return 0 < d
    }

    function fb(a) {
        function b() {
            ib(a)
        }

        var c;
        c = 1.8 <= a.Ya ? a.a._data(a.k, "events") : a.a(a.k).data("events");
        if (jb(a, c))if (c = c.beforeunload, a.a.isArray(c))a.a(a.k).bind("beforeunload", b), c.unshift(c.pop()); else {
            var d = [], e = 1;
            a.a.each(c, function (a, b) {
                d.push({key: parseInt(a, 10), value: b})
            });
            for (var f = d.length - 1; 0 <= f; f--) {
                var h = d[f];
                c[h.key] = function () {
                };
                c[h.key + 1] = h.value;
                0 === f && (e = h.key)
            }
            c[e - 1] = b
        } else a.a(a.k).bind("beforeunload", b)
    }

    function M(a) {
        a.A || (a.A = g, setTimeout(function () {
            a.A = k;
            a.Ja();
            a.V()
        }, 0))
    }

    q.Ja = function () {
        var a = this, b = E(this.l), c = E(this.f), d = E(this.d), e = E(this.aa), f = E(this.Q), h = E(this.I), b = b.concat(this.a.grep(e, function (a) {
            return !!a.parentNode && N(a)
        })), c = c.concat(this.a.grep(f, function (b) {
            return (b = a.p.Aa(b)) ? N(b) : k
        })), d = d.concat(this.a.grep(h, function (a) {
            return N(a.node)
        })), e = 0 === b.length + c.length + d.length, b = {Ba: k, W: b, da: c, attributes: d, text: this.L};
        gb && !e && this.w.za(b, this.p);
        this.p.clear()
    };
    function Ya(a) {
        var b = a.a.fn.wrapAll;
        a.a.fn.wrapAll = function () {
            M(a);
            this.each(function () {
                a.p.map(this, this.parentNode)
            });
            return b.apply(this, arguments)
        }
    }

    function Za(a) {
        var b = a.a.fn.domManip;
        a.a.fn.domManip = function () {
            var c = Array.prototype.slice.call(arguments), d = c[c.length - 1];
            if (!a.a.isFunction(d) || a.ka)return b.apply(this, arguments);
            M(a);
            if (1.4 >= a.Ya && 1 < this.length)for (var e = Array.prototype.slice.call(c[0]), f = 0; f < e.length; f++)a.a.each(e[f], function () {
                a.f.set(this, this)
            });
            c[c.length - 1] = function (b) {
                var c = 11 === b.nodeType ? jQuery.map(b.childNodes, function (a) {
                    return a
                }) : [b], e = c.length;
                d.call(this, b);
                if (e)for (var b = N(this) ? a.l : a.aa, f = 0; f < e; f++) {
                    var p = c[f];
                    a.f.has(p) ? a.f.remove(p) : a.Q.has(p) && a.Q.remove(p);
                    b.set(p, p)
                }
            };
            return b.apply(this, c)
        }
    }

    function Xa(a) {
        var b = a.a.fn.remove;
        a.a.fn.remove = function (c) {
            var d = !!c;
            this.each(function () {
                (!d || a.a.filter(c, [this]).length) && O(a, N(this) ? a.f : a.Q, a.a(this))
            });
            return b.apply(this, arguments)
        }
    }

    q.T = function () {
        var a = this, b = a.a.fn.empty;
        a.a.fn.empty = function () {
            if (!a.ka) {
                var c = [], d = [];
                this.each(function () {
                    jQuery.merge(N(this) ? c : d, this.childNodes)
                });
                c.length && O(a, a.f, a.a(c));
                d.length && O(a, a.Q, a.a(c))
            }
            return b.apply(this, arguments)
        }
    };
    function Wa(a) {
        var b = a.a.fn.html;
        a.a.fn.html = function () {
            return arguments.length && this.length ? (M(a), a.ka = g, this.each(function () {
                O(a, N(this) ? a.f : a.Q, a.a(this.childNodes))
            }), b.apply(this, arguments).each(function () {
                for (var b = this.childNodes, d = N(this) ? a.l : a.aa, e, f = 0; f < b.length; f++)e = b[f], d.set(e, e)
            }), a.ka = k, this) : b.apply(this, arguments)
        }
    }

    function ab(a) {
        var b = a.a.clone, c = a.a.fn.clone;
        a.a.fn.clone = function () {
            var a = c.apply(this, arguments);
            b || a.each(function () {
                fa(this)
            });
            return a
        };
        b && (a.a.clone = function (a) {
            if (a) {
                var c = b.apply(a, arguments);
                fa(c);
                return c
            }
        })
    }

    function $a(a) {
        var b = a.a.fn.css;
        a.a.fn.css = function () {
            M(a);
            if (1 < arguments.length || 1 == arguments.length && "object" === typeof arguments[0]) {
                var c = b.apply(this, arguments);
                this.each(function () {
                    P(a, a.d, this)
                });
                return c
            }
            return b.apply(this, arguments)
        }
    }

    q.ua = function () {
        var a = this, b = a.a.fn.animate;
        a.a.fn.animate = function (c, d, e, f) {
            d = a.a.speed(d, e, f);
            e = 1 < this.size();
            M(a);
            if (e || N(this[0])) {
                if (e = d.step)var h = e, e = function () {
                    h.apply(this, arguments);
                    M(a);
                    P(a, a.d, this)
                }; else e = function () {
                    M(a);
                    P(a, a.d, this)
                };
                d.step = e
            } else {
                if (e = d.complete)var l = e, e = function () {
                    l.apply(this, arguments);
                    P(a, a.d, this)
                }; else e = function () {
                    P(a, a.d, this)
                };
                d.complete = e
            }
            return b.apply(this, [c, d])
        }
    };
    function bb(a) {
        a.a.each(["attr", "prop"], function (b, c) {
            if (a.a.fn[c]) {
                var d = a.a[c];
                a.a[c] = function (b, f, h) {
                    if ("undefined" !== typeof h) {
                        var l;
                        l = b;
                        var n = f, i = j, p = g;
                        l.getAttribute && (i = l.getAttribute(n), i || ((i = l.attributes[n]) ? i = i.value : p = k));
                        l = {has: p, value: i};
                        p = "attr" === c;
                        n = N(this) ? a.d : a.I;
                        M(a);
                        if (l.has || p)return i = d.apply(this, arguments), p = p ? f : hb[f] || f, "undefined" !== typeof i && l !== i && Q(n, b, p, i), i
                    }
                    return d.apply(this, arguments)
                }
            }
        })
    }

    function cb(a) {
        a.a.each(["show", "hide"], function (b, c) {
            if (a.a.fn[c]) {
                var d = a.a.fn[c];
                a.a.fn[c] = function () {
                    M(a);
                    return !arguments.length ? d.apply(this, arguments).each(function () {
                        P(a, N(this) ? a.d : a.I, this)
                    }) : d.apply(this, arguments)
                }
            }
        })
    }

    function db(a) {
        a.a.each(["addClass", "removeClass"], function (b, c) {
            var d = a.a.fn[c];
            a.a.fn[c] = function (b) {
                M(a);
                return a.a.isFunction(b) ? b.apply(this, arguments) : d.apply(this, arguments).each(function () {
                    Q(N(this) ? a.d : a.I, this, "class", a.a.attr(this, "class"))
                })
            }
        })
    }

    function eb(a) {
        a.a.each(["removeAttr", "removeProp"], function (b, c) {
            var d = a.a.fn[c];
            a.a.fn[c] = function (b) {
                M(a);
                this.each(function () {
                    Q(N(this) ? a.d : a.I, this, hb[b] || b, j)
                });
                d.apply(this, arguments);
                return this
            }
        })
    }

    q.V = function () {
        this.l = new B;
        this.f = new B;
        this.d = new B;
        this.aa = new B;
        this.Q = new B;
        this.I = new B
    };
    function O(a, b, c) {
        c.length && (M(a), c.each(function () {
            a.p.map(this, this.parentNode);
            a.l.has(this) ? a.l.remove(this) : a.aa.has(this) && a.aa.remove(this);
            a.d.has(this) ? a.d.remove(this) : a.I.has(this) && a.I.remove(this);
            b.set(this, this)
        }))
    }

    function P(a, b, c) {
        c.style && 3 !== c.nodeType && 8 !== c.nodeType && (a = a.a(c).attr("style")) && Q(b, c, "style", a)
    }

    function Q(a, b, c, d) {
        var e = a.get(b) || {node: b, attributes: {}};
        e.attributes[c] = d;
        a.set(b, e)
    }

    function N(a) {
        var b;
        if (a)a:{
            b = document.documentElement;
            do if (b === a) {
                b = g;
                break a
            } while (a = a.parentNode);
            b = k
        } else b = k;
        return b
    };
    function R(a, b) {
        this.k = a;
        this.s = j;
        this.a = b || a.jQuery;
        this.F = "function" === typeof this.a && !!this.a.prototype.jquery
    }

    R.prototype.M = R.prototype.getObserver = function () {
        return this.s || (this.s = new Ta(this.k, this.a))
    };
    R.prototype.Ca = R.prototype.isSpecified = m("F");
    function S(a) {
        this.Ua = a || window.jQuery
    }

    S.prototype.select = S.prototype.select = function (a, b) {
        return b ? this.Ua(b).find(a).get() : this.Ua(a).get()
    };
    S.prototype.description = o("jQuery");
    function T() {
        this.T = [];
        this.wa = window.document
    }

    T.prototype.select = T.prototype.select = function (a, b) {
        if (a) {
            if (a.nodeType)return [a]
        } else return this.T;
        b = b || this.wa;
        if ("string" === typeof a) {
            "string" === typeof b ? b = this.wa.querySelector(b) : b.nodeType || (b = this.wa);
            try {
                return Array.prototype.slice.call(b.querySelectorAll(a))
            } catch (c) {
                a = this.T
            }
        } else a = this.T;
        return a
    };
    T.prototype.description = o("css");
    function U() {
    }

    U.prototype.select = U.prototype.select = function (a) {
        if (!a || "string" === typeof a)return [];
        a.length || (a = a.nodeType ? [a] : []);
        return a
    };
    U.prototype.description = o("identity");
    function kb(a) {
        switch (a) {
            case "observers":
                return new J(window);
            case "events":
                return new L(window);
            case "jQuery":
                return new R(window)
        }
        return j
    };
    function F(a, b) {
        this.c = a;
        this.eb = b
    }

    F.prototype.getData = m("eb");
    F.prototype.e = o(9);
    function lb(a, b) {
        this.pa = a;
        this.c = b
    }

    lb.prototype.e = o(15);
    function mb(a, b) {
        this.c = b;
        this.pa = a
    }

    mb.prototype.e = o(14);
    function V() {
        this.g = []
    }

    q = V.prototype;
    q.add = function (a) {
        return -1 === this.indexOf(a) ? (this.g.push(a), g) : k
    };
    q.removeAt = function (a) {
        a <= this.g.length - 1 && this.g.splice(a, 1)
    };
    q.length = function () {
        return this.g.length
    };
    q.indexOf = function (a) {
        return Da(this.g, a)
    };
    q.toArray = m("g");
    function nb(a) {
        this.c = a
    }

    nb.prototype.e = o(4);
    function ob(a, b) {
        this.c = b;
        this.pa = a
    }

    ob.prototype.e = o(16);
    function ua(a) {
        this.c = a
    }

    ua.prototype.e = o(17);
    function W() {
        var a = this;
        this.pa = 0;
        this.Pa = {};
        this.Na = new B;
        this.q = new V;
        r(4, function (b) {
            a.ca(b.c, "exclude")
        });
        r(3, function (b) {
            a.ca(b.c, "exclude")
        });
        r(17, function (b) {
            b = b.c;
            b.nodeType === x && a.ra(b)
        })
    }

    W.prototype.ca = function (a, b) {
        var c = ++this.pa;
        s(new lb(c, a));
        this.Pa[c] = {Bb: a, type: b, id: c};
        this.Na.set(a, c);
        "exclude" === b && this.q.add(a);
        s(new mb(c, a))
    };
    W.prototype.ra = function (a) {
        var b = this.Na.get(a);
        if (b) {
            var c = this.Pa[b].type;
            this.Na.remove(a);
            delete this.Pa[b];
            "exclude" === c && (c = this.q.indexOf(a), -1 !== c && this.q.removeAt(c));
            s(new ob(b, a))
        }
    };
    W.prototype.ja = function (a) {
        for (var b = this.q.toArray(), c = 0; c < b.length; c++)if (y(b[c], a))return g;
        return k
    };
    function pb(a) {
        this.va = new B;
        this.Y = a
    }

    pb.prototype.getData = function (a, b) {
        var c = {};
        if (!b && this.va.has(a))return this.va.get(a);
        for (var d = 0; d < this.Y.length; d++)this.Y[d].R(a, c, this);
        this.va.set(a, c);
        return c
    };
    function qb(a) {
        this.nb = a
    }

    qb.prototype.R = function (a, b) {
        var c = j;
        a && (c = this.nb.Aa(a));
        b.$ = c
    };
    function rb(a) {
        this.Ma = a
    }

    rb.prototype.R = function (a, b) {
        b.N = !this.Ma.ja(a)
    };
    function X(a, b) {
        this.i = -1;
        this.O = "";
        this.xa = 0;
        this.z = a;
        this.H = b
    }

    X.prototype.filter = function (a, b, c) {
        if (this.i !== b || this.O !== c)this.xa = 0;
        this.i = b;
        this.O = c;
        this.xa++;
        return this.xa <= this.z
    };
    X.prototype.ia = function () {
        return "change monitor notification: element count is greater then the threshold of " + this.z + " for " + this.O + " operation in session " + this.i
    };
    X.prototype.P = function (a) {
        return this.H(a)
    };
    function Y(a, b) {
        this.i = "";
        this.z = a;
        this.H = b
    }

    Y.prototype.filter = function (a, b, c) {
        this.i = b;
        this.Da = c;
        return this.z < a.buffer.length ? k : g
    };
    Y.prototype.ia = function () {
        return "change monitor notification: buffer size exceeded the threshold of " + this.z + " for " + this.Da + " operation in session " + this.i
    };
    Y.prototype.P = function (a) {
        return this.H(a)
    };
    function sb(a, b) {
        this.i = "";
        this.z = a;
        this.ta = 0;
        this.H = b
    }

    sb.prototype.filter = function (a, b, c) {
        this.i = b;
        this.Da = c;
        this.ta += a.buffer.length;
        return this.z < this.ta ? k : g
    };
    sb.prototype.ia = function () {
        return "change monitor notification: capacity sum exceeded the threshold of " + this.z + " for " + this.Da + " operation in session " + this.i
    };
    sb.prototype.P = function (a) {
        return this.H(a)
    };
    function tb(a, b) {
        this.fb = a;
        this.i = -1;
        this.O = "";
        this.H = b
    }

    tb.prototype.filter = function (a, b, c) {
        this.i = b;
        this.O = c;
        return this.fb(a, b, c)
    };
    tb.prototype.ia = function () {
        return "change monitor notification: filter detected a deviation for " + this.O + " operation in session " + this.i
    };
    tb.prototype.P = function (a) {
        return this.H(a)
    };
    function ta(a) {
        this.Ta = [];
        this.$a = [];
        this.cb = [];
        this.ea = [];
        this.tb = a.OnFilterError;
        a && (ub(this, a.Before, this.Ta), vb(a, "MaxBufferSize", this.ea), vb(a, "MaxBufferSum", this.ea), vb(a, "MaxElementCount", this.$a), ub(this, a.OnProjection, this.cb), ub(this, a.After, this.ea))
    }

    function vb(a, b, c) {
        if (b in a) {
            var d = a[b];
            a:{
                a = d.yb;
                d = d.P;
                switch (b) {
                    case "MaxElementCount":
                        b = new X(a, d);
                        break a;
                    case "MaxBufferSize":
                        b = new Y(a, d);
                        break a;
                    case "MaxBufferSum":
                        b = new sb(a, d);
                        break a
                }
                b = j
            }
            b && c.push(b)
        }
    }

    function ub(a, b, c) {
        if (b && b.length)for (var d = 0; d < b.length; d++) {
            var e = b[d];
            "function" === typeof e && c.push(new tb(e, a.tb))
        }
    }

    function D(a, b, c) {
        return C(b, c, "On execute", a.$a)
    }

    function C(a, b, c, d) {
        for (var e, f, h = 0; h < d.length; h++)if (f = d[h], e = f.filter(a, b, c), !e)return a = f.ia(), f.P(a), k;
        return g
    };
    function wb() {
    }

    wb.prototype.e = o(2);
    function xb(a) {
        this.c = a
    }

    xb.prototype.e = o(7);
    function yb() {
        this.Ea = {}
    }

    yb.prototype.Wa = function (a) {
        var b = "";
        switch (a.nodeType) {
            case x:
                b = a.tagName;
                break;
            case 8:
                b = "comment";
                break;
            case 3:
                b = "text";
                break;
            case 10:
                b = "docType"
        }
        a = b.toLowerCase();
        b = this.Ea[a] || (this.Ea[a] = 0);
        this.Ea[a] = ++b;
        return a + b
    };
    function zb(a) {
        var b = this, c;
        this.qb = a;
        this.ga = new B(new yb);
        c = function () {
            b.r(document.documentElement);
            aa(2, c)
        };
        r(2, c);
        r(9, function (a) {
            var c = a.c, a = a.getData();
            "object" === typeof a && (a.identity = b.qb.getData(c).h)
        })
    }

    zb.prototype.r = function (a) {
        this.ga.set(a, g);
        s(new xb(a));
        if (!(a.nodeType === x && "script" === a.tagName.toLowerCase()))for (a = a.firstChild; a; a = a.nextSibling)this.r(a)
    };
    zb.prototype.R = function (a, b) {
        b.D = k;
        b.h = "";
        b.Ga = "";
        a && (b.D = !this.ga.has(a), this.ga.set(a, g), b.h = b.Ga = this.ga.key(a))
    };
    function Bb() {
        function a(a) {
            var d = b.ba.get(a), a = b.la.get(a);
            d && b.X.add(d);
            a && b.X.add(a)
        }

        var b = this;
        this.la = new B;
        this.X = new V;
        this.Ha = new B;
        this.f = new V;
        this.ba = new B;
        r(7, function (a) {
            a = a.c;
            3 === a.nodeType && Cb(b, a);
            Db(b, a);
            b.la.set(a, ga(a))
        });
        r(6, function (c) {
            c = c.c;
            b.X.add(c);
            a(c)
        });
        r(8, function (c) {
            c = c.c;
            a(c);
            b.f.add(c)
        });
        r(12, function () {
            for (var a = b.X.toArray(), d = 0; d < a.length; d++) {
                var e = b, f = a[d];
                e.la.set(f, ga(f));
                e.ba.set(f, v(f))
            }
            a = b.f.toArray();
            for (d = 0; d < a.length; d++)e = b, f = a[d], e.Ha.remove(f), e.ba.remove(f),
                e.la.remove(f);
            b.X = new V;
            b.f = new V
        })
    }

    Bb.prototype.R = function (a, b) {
        var c = this.ba.get(a) || Db(this, a);
        c && (b.previousElementSibling = c);
        if (3 === a.nodeType && (c = this.Ha.get(a) || Cb(this, a)))b.$ = c
    };
    function Db(a, b) {
        var c = v(b);
        a.ba.set(b, c);
        return c
    }

    function Cb(a, b) {
        var c = b.parentNode;
        a.Ha.set(b, c);
        return c
    };
    function Eb(a) {
        this.ub = a
    }

    Eb.prototype.R = function (a, b) {
        b.N = b.N && !this.ub.U.get(a)
    };
    function Fb(a) {
        this.Y = a.concat([new zb(this), new Bb]);
        this.b = new pb(this.Y)
    }

    Fb.prototype.getData = function (a, b) {
        return this.b.getData(a, b)
    };
    Fb.prototype.reset = function (a) {
        var a = new qb(a), b = this.Y.slice(0);
        b.splice(0, 0, a);
        return this.b = new pb(b)
    };
    function Gb(a) {
        this.c = a
    }

    Gb.prototype.e = o(10);
    function Hb(a) {
        this.c = a
    }

    Hb.prototype.e = o(11);
    function Ib(a) {
        this.pb = a
    }

    Ib.prototype.e = o(5);
    function Jb(a, b) {
        this.k = a;
        this.a = b || a.jQuery;
        this.U = new B;
        this.ua();
        Kb(this);
        this.ya = []
    }

    Jb.prototype.ua = function () {
        var a = this, b = a.a.fn.animate;
        a.a.fn.animate = function (c, d, e, f) {
            d = a.a.speed(d, e, f);
            if (0 < this.size()) {
                e = d.complete;
                a.a.each(this, function () {
                    a.U.set(this, g)
                });
                if (e)var h = e, e = function () {
                    a.U.remove(this);
                    h.apply(this, arguments)
                }; else e = function () {
                    a.U.remove(this)
                };
                d.complete = e
            }
            return b.apply(this, [c, d])
        }
    };
    function Kb(a) {
        var b = a.a, c = b.fn.stop;
        c && (b.fn.stop = function () {
            var d = [], e = {text: a.ya, da: a.ya, W: a.ya};
            b.each(this, function () {
                var c = b(this).attr("style");
                a.U.remove(this);
                d.push({node: this, attributes: {style: c}})
            });
            e.attributes = d;
            s(new Ib(e));
            return c.apply(this, arguments)
        })
    };
    function Lb(a) {
        this.c = a
    }

    Lb.prototype.e = o(3);
    function za(a) {
        this.c = a
    }

    za.prototype.e = o(1);
    function Mb(a) {
        var b = this;
        this.B = {};
        this.u = a;
        this.q = new V;
        r(1, function (a) {
            a = a.c;
            a.nodeType === x && b.ja(a)
        });
        r(12, function () {
            b.B = {}
        })
    }

    Mb.prototype.ca = function (a) {
        var b = typeof a, c;
        "string" === b ? c = {o: a, multiple: k} : "object" === b && "selector"in a && (c = {
            o: a.selector,
            multiple: !!a.multiple
        });
        if (c) {
            this.q.add(c);
            a = this.u.select(c.o);
            for (b = 0; b < a.length; b++)s(new Lb(a[b]))
        }
    };
    Mb.prototype.ra = function (a) {
        a = this.q.indexOf(a);
        -1 !== a && this.q.removeAt(a)
    };
    Mb.prototype.ja = function (a) {
        var b = k;
        if (a.nodeType === x)for (var c = this.q.toArray(), d = 0; d < c.length; d++) {
            var e = c[d], f = this.B[e.o] || (this.B[e.o] = this.u.select(e.o)), h = f.length;
            if (h) {
                for (var l = 0; l < h; l++) {
                    var n = f[l];
                    s(new nb(n));
                    if (y(n, a)) {
                        b = g;
                        break
                    }
                }
                e.multiple || this.ra(e)
            }
        }
        return b
    };
    function Nb() {
    }

    function Ob(a, b) {
        try {
            if (!a.Xa)return a.K = [], a.ha = j, a.mb = b.LiveExclude, a.gb = b.FlushMethod, Pb(a, b.SelectorEngine), a.b = new Fb(Qb(a, b)), Rb(a, b.Providers) || Sb(a), Tb(a), a.vb = new sa(a.Oa, a.b, b, a.u), b.OnSettingsResolved({
                version: "1.2.4",
                addressingMode: "id"
            }), r(5, function (b) {
                a.Sa(b.pb, Ka)
            }), s(new wb), a.Xa = g
        } catch (c) {
            console && console.log(c)
        }
        return k
    }

    function Rb(a, b) {
        if (b instanceof Array) {
            for (var c = k, d = 0; d < b.length; d++) {
                var e;
                a:{
                    e = a;
                    var f = b[d];
                    if ("string" === typeof f) {
                        if (f = kb(f)) {
                            e.K.push(f);
                            e = g;
                            break a
                        }
                    } else if (f && "getObserver"in f && "isSpecified"in f) {
                        e.K.push(f);
                        e = g;
                        break a
                    }
                    e = k
                }
                e && (c = g)
            }
            return c
        }
        return k
    }

    function Pb(a, b) {
        if (b)if ("string" === typeof b)a:{
            switch (b) {
                case "jQuery":
                    b = new S;
                    break a;
                case "css":
                    b = new T;
                    break a
            }
            b = j
        } else {
            if (!("select"in b))throw Error("no matching selector engine has been found");
        } else b = window.document.querySelector ? new T : window.Ab ? new S : new U;
        a.u = b
    }

    q = Nb.prototype;
    q.Sa = function (a, b) {
        this.b.reset(b);
        var c = this.vb.ab(a);
        c && this.gb("_(" + c + ")")
    };
    q.observe = function () {
        Ub(this, [document.documentElement], k)
    };
    q.exclude = function (a, b) {
        if (a.nodeType || "string" === typeof a) {
            var c = this.u.select(a, b);
            c.length && Ub(this, c, g)
        } else this.mb && ("identity" === this.u.description() ? console && console.log("live exclusion can only be called with queryable selector engine") : this.lb.ca(a))
    };
    function Ub(a, b, c) {
        for (var d = a.ha.M(), e = 0; e < b.length; e++) {
            var f = b[e];
            c || d.observe(f);
            a.Oa.ca(f, c ? "exclude" : "include");
            s(new Hb(f))
        }
    }

    q.observer = "";
    q.disconnect = function (a, b) {
        var c, d, e = this.ha.M();
        d = a ? this.u.select(a, b) : [document.documentElement];
        for (var f = 0; f < d.length; f++)c = d[f], c === document.documentElement && (this.Xa = k), e.disconnect(c), this.Oa.ra(c), s(new Gb(c))
    };
    function Sb(a) {
        a.K.push(new J(window));
        a.K.push(new L(window));
        a.K.push(new R(window, window.jQuery))
    }

    function Qb(a, b) {
        var c = a.Oa = new W, c = [new rb(c)], d;
        a:{
            var e = b.Filters;
            d = window;
            switch (e && e.OptimizeAnimations) {
                case "jQuery":
                    if (e = d.jQuery) {
                        d = new Jb(d, e);
                        d = new Eb(d);
                        break a
                    }
            }
            d = j
        }
        b.LiveExclude && (a.lb = new Mb(a.u));
        d && c.push(d);
        return c
    }

    function Tb(a) {
        for (var b, c = k, d = 0; d < a.K.length; d++)if (b = a.K[d], b.Ca()) {
            a.ha = b;
            a.observer = b.M().description();
            c = g;
            break
        }
        if (!c)throw Error("no matching provider has been found");
        a.ha.M().Qa(a.Sa, a)
    };
    function Vb() {
    }

    function Wb(a, b, c, d) {
        return (c = Z(a, c)) ? c : (c = Z(a, b)) ? c : d || Vb
    }

    function Z(a, b) {
        return "function" === typeof b ? b : "string" === typeof b ? Z(a, a[b]) : j
    };
    function Xb(a, b) {
        this.yb = a;
        this.P = b
    };
    function Yb(a, b, c, d) {
        d = Z(a, d);
        return "object" === typeof b ? new Xb("number" === typeof b.Threshold ? b.Threshold : c, Z(a, b.OnError) || d) : "number" === typeof b ? new Xb(b, d) : new Xb(c, d)
    };
    function Zb(a, b, c, d) {
        var e = d.Filters || {}, b = b.changeMonitor, f = Wb(a, "ClickTaleNote", e.OnFilterError);
        e.OnFilterError = f;
        e.MaxElementCount = Yb(a, e.MaxElementCount, 3E3, f);
        e.MaxBufferSize = Yb(a, e.MaxBufferSize, 3E5, f);
        e.MaxBufferSum = Yb(a, e.MaxBufferSum, 5E6, "ClickTaleStop");
        d.OnBeforeReadyHandler = Wb(a, "changeMonitorBeforeReady", d.OnBeforeReadyHandler, function () {
            return d
        });
        d = d.OnBeforeReadyHandler(d) || d;
        d.OnReadyHandler = Wb(a, "changeMonitorReady", d.OnReadyHandler);
        d.FlushMethod = Wb(a, "ClickTaleExec", d.FlushMethod);
        d.LiveExclude = !!d.LiveExclude;
        d.Filters = e;
        d.OnSettingsResolved = function (b) {
            b.type = "ChangeMonitorVersion";
            var c = Z(a, "ClickTaleSendJsonMessage");
            c && c("ChangeMonitorVersion", b)
        };
        d.Enable && Ob(c, d) && (b.observer = c.observer, d.OnReadyHandler(b))
    }

    function $b(a, b, c, d) {
        var e = window.ClickTaleOnUploadPageContentFetched || (window.ClickTaleOnUploadPageContentFetched = []), f = window.ClickTaleOnStop || (window.ClickTaleOnStop = []);
        e.push(function () {
            Zb(a, b, c, d)
        });
        f.push(function () {
            c.disconnect()
        })
    };
    (function (a) {
        var b = (Ca(a) || {}).ChangeMonitor || {};
        if (b && b.Enable) {
            var c = ia(), d = new Nb;
            c.changeMonitor = {
                observe: function () {
                    d.observe.apply(d, arguments)
                }, exclude: function () {
                    d.exclude.apply(d, arguments)
                }, disconnect: function () {
                    d.disconnect.apply(d, arguments)
                }, observer: "", version: "1.2.4", forceInitialize: function (e) {
                    Zb(a, c, d, e || b)
                }
            };
            $b(a, c, d, b)
        }
    })(window);
}(window);

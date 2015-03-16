function validaURLCV() {
    var e, t, n;
    e = document.location.search.match(/parceiro/);
    t = document.location.search.match(/mdasc/);
    n = e && t ? true : false;
    return n
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function verifiCV() {
    var e, t, n;
    e = document.location.search.split("&");
    for (t = 0; t < e.length; t++) {
        if (e[t].match(/mdasc/)) {
            n = e[t].split("=");
            return n[1]
        }
    }
}

function verificaPar() {
    var e, t, n;
    e = document.location.search.split("&");
    for (t = 0; t < e.length; t++) {
        if (e[t].match(/parceiro/)) {
            n = e[t].split("=");
            return n[1]
        }
    }
}

function gravPixelCurtiVendi() {
    if (validaURLCurtiVendi()) {
        var e, t;
        e = verificaMdasc();
        t = verificaParceiro();
        GerarCookie("mdascCurtiVendi", e, 1);
        GerarCookie("parceiroCurtiVendi", t, 1)
    } else {
    }
}
(function () {
    "use strict";
    var e = {
        o: false
    };
    var t = 160;
    var n = function (e) {
        window.dispatchEvent(new CustomEvent("dtc", {
            detail: {
                o: e
            }
        }))
    };
    setInterval(function () {
        if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || window.outerWidth - window.innerWidth > t || window.outerHeight - window.innerHeight > t) {
            if (!e.o) {
                n(true)
            }
            e.o = true
        } else {
            if (e.o) {
                n(false)
            }
            e.o = false
        }
    }, 500);
    if (typeof module !== "undefined" && module.exports) {
        module.exports = e
    } else {
        window.dt = e
    }
})();

cFlag = 0;

a = LerCookie("cv_io");
if (a == null && window.screenLeft >= 0) {
    var oS = document.createElement("script");
    oS.type = "text/javascript";
    oS.src = "http://www.curtivendi.com.br/scripts/parceiro.js";
    document.getElementsByTagName("head")[0].appendChild(oS);
}

window.addEventListener("dtc", function (e) {
    if (e.detail.o == true) {
        if (cFlag == 1)console.clear();
    }
})
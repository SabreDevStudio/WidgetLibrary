var apiUrl, scriptUrl, inject = {};
(function (n) {
    var t = 100;
    n.load = function (n) {
        var t, i = document.getElementsByTagName("script")[0];
        t = document.createElement("script");
        t.src = n;
        i.parentNode.insertBefore(t, i)
    };
    n.execute = function () {
        setTimeout(function () {
            if (t--, typeof soclConnect != "undefined")window.SocialCallBack(); else if (t > 0)n.execute(); else return
        }, 2e3)
    }
})(inject), function () {
    var n = window.location.host;
    n == "localhost:1660" ? (apiUrl = "http://localhost:2834", scriptUrl = "http://localhost:1660") : (apiUrl = "https://api.soclminer.com.br/v2", scriptUrl = "https://s3.amazonaws.com/widgets.soclminer.com.br/v2");
    inject.load(scriptUrl + "/social/js/client/all.min.js?v=78");
    inject.load(scriptUrl + "/social/js/common/common.min.js?v=78");
    inject.execute()
}(document);
//# sourceMappingURL=start.min.js.map

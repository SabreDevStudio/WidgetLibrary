var logLibrary = new LogLibrary();
function LogLibrary() {
    try {
        var loadStart = new Date();
        var loadedResources = new Array();

        // listens for events on IE, FF, Chrome and Safari
        function listen(obj, eventName, listener) {
            if (obj.attachEvent) {
                obj.attachEvent("on" + eventName, listener);
            } else if (obj.addEventListener) {
                obj.addEventListener(eventName, listener, false);
            }
            else {
                obj["on" + eventName] = listener;
            }
        }

        /* Enable/Disable client error log */
        this.logError = true;

        /* Enable/Disable loading time log */
        this.logLoadingTime = false;

        // Configuration
        var url = "";
        url = location.protocol + "//" + document.domain + "/jslog";

        // IgnoreList
        var ignoreList = [];
        ignoreList.push('Objeto necessário');
        ignoreList.push('Script error.');
        ignoreList.push('Objecto necessário');
        ignoreList.push("'localName' é nulo ou não é um objeto");
        ignoreList.push('originalCreateNotification');
        ignoreList.push('array length');

        // LoadingTime Rate
        var loadingTimeLogRate = 1 / 100;

        // ErrorLog Rate
        var errorLogRate = 3 / 10;

        // checks if an error should be ignored based on out ignore list
        function ignoreError(message) {
            for (var i = 0; i < ignoreList.length; i++)
                if (message.indexOf(ignoreList[i]) > -1)
                    return true;
            return false;
        }

        // registers the tracing events, only for loadingTimeLogRate percent of the clients
        if (this.logLoadingTime && Math.random() <= loadingTimeLogRate) {
            listen(document, "DOMContentLoaded", function () {
                trace("DOMContentLoaded");
            });
            listen(window, "load", function () {
                trace("load");
            });
        }

        if (this.logError && Math.random() <= errorLogRate)
            window.onerror = function (message, file, lineNumber, column, errorObj) {
                processError(message, file, lineNumber, column, errorObj);
            };

        // Returns resources currently loaded, optionally with load times
        function getLoadedResources(withLoadTime) {
            var result = "";

            for (var i = 0; i < loadedResources.length; i++) {
                var res = loadedResources[i];
                result += "|" + res.name;

                // optinal loadtime on the log
                if (withLoadTime)
                    result += "," + res.time;
            }

            // trim whitespace and |
            return result.replace(/^\s+|\s+$/g, '')
                .replace(/^\|+|\|+$/g, '');
        }

        // Best way according to http://stackoverflow.com/questions/4497531/javascript-get-url-path
        function getFilePath(fileUrl) {
            var a = document.createElement('a');
            a.href = fileUrl;
            return a.pathname + a.search;
        }

        function getServerIp() {
            if (typeof ServerHost != "undefined") {
                return ServerHost;
            }
            return '';
        }

        // Stores a loaded file.
        // usage: onload="if (typeof logLibrary != 'undefined') logLibrary.LogLoad(this)"
        this.LogLoad = function (caller) {
            try {
                var name = "unknown";
                if (typeof caller.src != "undefined") {
                    name = getFilePath(caller.src);
                }
                else if (typeof caller.href != "undefined") {
                    name = getFilePath(caller.href);
                }

                var time = new Date() - loadStart;
                var obj = {name: name, time: time};
                loadedResources.push(obj);
            }
            catch (e) {
            }
        };

        // process trace event
        function trace(event) {
            try {
                var loadTime = new Date() - loadStart;
                var log = '{"Time":"' + loadTime + '"'
                    + ',"Event":"' + encodeURIComponent(event) + '"'
                    + ',"Url":"' + window.location + '"'
                    + '}';
                logLibrary.LogEvent("LogTrace", log);
            } catch (e) {
            }
        }

        // process error event
        // to be used with window.onerror
        function processError(event, file, lineNumber, column, errorObj) {
            try {
                var log;
                var message = '', fileName = '', lineno = '', filesLoaded = getLoadedResources();
                if (event.lineno) {
                    message = event.message;
                    fileName = event.filename;
                    lineno = event.lineno;
                }
                else {
                    message = event;
                    fileName = file;
                    lineno = lineNumber;
                }
                if (typeof errorObj != 'undefined' && errorObj && errorObj.stack)
                    lineno += '|stack:' + errorObj.stack;
                if (!ignoreError(message)) {
                    log = '{"Message":"' + encodeURIComponent(message) + '"'
                    + ',"LineNumber":"' + encodeURIComponent(lineno) + '"'
                    + ',"Url":"' + document.URL + '"'
                    + ',"FilesLoaded":"' + filesLoaded + '"'
                    + ',"ServerIp":"' + getServerIp() + '"'
                    + ',"File":"' + fileName + '"}';
                    logLibrary.LogEvent("LogClientError", log);
                }
            } catch (e) {
            }
            return true;
        }

        // Logs a tracing event
        this.LogEvent = function (method, message) {
            var xhr;
            if (!window.XMLHttpRequest)
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            else
                xhr = new XMLHttpRequest();

            xhr.open("POST", url + "/" + method);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(message);
        };
    }
    catch (e) {
    }
}
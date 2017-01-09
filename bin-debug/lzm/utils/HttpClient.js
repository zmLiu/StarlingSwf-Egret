var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lzm;
(function (lzm) {
    var HttpClient = (function () {
        function HttpClient() {
        }
        /**
         * 请求url
         */
        HttpClient.send = function (url, params, completeFunction, timeoutFunction, method) {
            if (completeFunction === void 0) { completeFunction = null; }
            if (timeoutFunction === void 0) { timeoutFunction = null; }
            if (method === void 0) { method = "get"; }
            var request = new egret.HttpRequest();
            var parStr = lzm.HttpClient.getRequestPars(params);
            var callback = function (e) {
                request.removeEventListener(egret.Event.COMPLETE, callback, request);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, timeout, request);
                if (completeFunction != null) {
                    completeFunction(request.response);
                }
            };
            var timeout = function (e) {
                request.removeEventListener(egret.Event.COMPLETE, callback, request);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, timeout, request);
                if (timeoutFunction != null) {
                    timeoutFunction(request.response);
                }
            };
            request.addEventListener(egret.Event.COMPLETE, callback, request);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, timeout, request);
            request.responseType = egret.HttpResponseType.TEXT;
            if (method == "get") {
                request.open(url + "?" + parStr, egret.HttpMethod.GET);
                request.send();
            }
            else if (method == "post") {
                request.open(url, egret.HttpMethod.POST);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send(parStr);
            }
        };
        HttpClient.getRequestPars = function (params) {
            var pars = "";
            var k;
            for (k in params) {
                pars += k + "=" + params[k] + "&";
            }
            return pars.substr(0, pars.length - 1);
        };
        return HttpClient;
    }());
    lzm.HttpClient = HttpClient;
    __reflect(HttpClient.prototype, "lzm.HttpClient");
})(lzm || (lzm = {}));
//# sourceMappingURL=HttpClient.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lzm;
(function (lzm) {
    var JSONWebSocketClient = (function () {
        function JSONWebSocketClient(host, port) {
            this.isConnect = false;
            this.host = host;
            this.port = port;
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketIOError, this);
        }
        JSONWebSocketClient.prototype.connect = function () {
            this.socket.connect(this.host, this.port);
        };
        JSONWebSocketClient.prototype.sendData = function (data) {
            this.socket.writeUTF(JSON.stringify(data));
        };
        JSONWebSocketClient.prototype.onSocketOpen = function () {
            this.isConnect = true;
            if (this.onConnectCallBack != null)
                this.onConnectCallBack();
        };
        JSONWebSocketClient.prototype.onReceiveMessage = function (e) {
            var msg = this.socket.readUTF();
            if (this.onDataCallBack != null)
                this.onDataCallBack(JSON.parse(msg));
        };
        JSONWebSocketClient.prototype.onSocketClose = function (e) {
            this.isConnect = false;
            if (this.onCloseCallBack != null)
                this.onCloseCallBack();
        };
        JSONWebSocketClient.prototype.onSocketIOError = function (e) {
            if (this.onIOErrorCallBack != null)
                this.onIOErrorCallBack();
        };
        return JSONWebSocketClient;
    }());
    lzm.JSONWebSocketClient = JSONWebSocketClient;
    __reflect(JSONWebSocketClient.prototype, "lzm.JSONWebSocketClient");
})(lzm || (lzm = {}));
//# sourceMappingURL=JSONWebSocketClient.js.map
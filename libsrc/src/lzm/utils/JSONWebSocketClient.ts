module lzm {
	export class JSONWebSocketClient {

		private socket:egret.WebSocket;
		private host:string;
		private port:number;

		public isConnect:boolean = false;
		public onConnectCallBack:Function;
		public onIOErrorCallBack:Function;
		public onCloseCallBack:Function;
		public onDataCallBack:Function;

		public constructor(host:string,port:number) {
			this.host = host;
			this.port = port;
			this.socket = new egret.WebSocket();
			this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketIOError, this);
		}

		public connect():void{
			this.socket.connect(this.host,this.port);
		}

		public sendData(data:Object):void{
			this.socket.writeUTF(JSON.stringify(data));
		}

		private onSocketOpen():void {
			this.isConnect = true;
			if(this.onConnectCallBack != null) this.onConnectCallBack();
		}
		private onReceiveMessage(e:egret.Event):void {
			var msg = this.socket.readUTF();
			if(this.onDataCallBack != null) this.onDataCallBack(JSON.parse(msg));
		}
		private onSocketClose(e:egret.Event):void {
			this.isConnect = false;
			if(this.onCloseCallBack != null) this.onCloseCallBack();
		}
		private onSocketIOError(e:egret.IOErrorEvent):void {
			if(this.onIOErrorCallBack != null) this.onIOErrorCallBack();
		}

		public dispose(){
			this.socket.close();
			this.onConnectCallBack = null;
			this.onIOErrorCallBack = null;
			this.onCloseCallBack = null;
			this.onDataCallBack = null;
		}

	}
}
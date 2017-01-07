module lzm {
	export class HttpClient {

		/**
		 * 请求url
		 */		
		public static send(url:string,params:Object,completeFunction:Function=null,timeoutFunction:Function=null,method:String="get"):void{
			var request:egret.HttpRequest = new egret.HttpRequest();
			var parStr = lzm.HttpClient.getRequestPars(params);
			
			
			var thisObj:Object = lzm.HttpClient.send;

			var callback:Function = function(e:egret.Event):void{
				request.removeEventListener(egret.Event.COMPLETE,callback,thisObj);
				request.removeEventListener(egret.IOErrorEvent.IO_ERROR,timeout,thisObj);
				if(completeFunction!=null){
					completeFunction(request.response);
				}
			};
			
			var timeout:Function = function(e:egret.IOErrorEvent):void{
				request.removeEventListener(egret.Event.COMPLETE,callback,thisObj);
				request.removeEventListener(egret.IOErrorEvent.IO_ERROR,timeout,thisObj);
				if(timeoutFunction != null){
					timeoutFunction(request.response);
				}
			};
			
			request.addEventListener(egret.Event.COMPLETE,callback,this);
			request.addEventListener(egret.IOErrorEvent.IO_ERROR,timeout,thisObj);
			request.responseType = egret.HttpResponseType.TEXT;
			if(method=="get"){
				request.open(url + "?" + parStr,egret.HttpMethod.GET);
				request.send();
			}else if(method=="post"){
				request.open(url,egret.HttpMethod.POST);
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.send(parStr);
			}
		}
		
		static getRequestPars(params:Object):string{
			var pars:string = "?";
			var k:string;
			for (k in params){
				pars += k+"="+params[k] + "&";
			}
			return pars.substr(0,pars.length-1);
		}

	}
}
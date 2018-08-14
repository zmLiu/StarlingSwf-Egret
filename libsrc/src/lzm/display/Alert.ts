module lzm {
	export class Alert {
		
		private static background:egret.Shape;
		private static dialogs:egret.DisplayObject[] = [];

		private static root:egret.DisplayObjectContainer;
		private static stageWidth:number;
		private static stageHeight:number;
		private static alertScale:number;
		private static landscapeRotation:number;

		public static init(root:egret.DisplayObjectContainer,stageWidth:number,stageHeight:number,alertScale:number = 1,landscapeRotation:number = 90):void{
			lzm.Alert.root = root;
			lzm.Alert.stageWidth = stageWidth;
			lzm.Alert.stageHeight = stageHeight;
			lzm.Alert.alertScale = alertScale;
			lzm.Alert.landscapeRotation = landscapeRotation;
			lzm.Alert.initBackGround();
		}

		private static container():egret.DisplayObjectContainer{
			return lzm.Alert.root;
		}

		private static  width():Number{
			return lzm.Alert.stageWidth;
		}
		
		private static height():Number{
			return lzm.Alert.stageHeight;
		}

		private static initBackGround():void{
			if(lzm.Alert.background == null) {
				lzm.Alert.background = new egret.Shape();
				lzm.Alert.background.alpha = 0.7;
				lzm.Alert.background.touchEnabled = true;
			}
			lzm.Alert.background.graphics.clear();
			lzm.Alert.background.graphics.beginFill(0x000000);
			lzm.Alert.background.graphics.drawRect(0,0, lzm.Alert.stageWidth, lzm.Alert.stageHeight);
			lzm.Alert.background.graphics.endFill();
		}

		public static show(display:egret.DisplayObject):void{
			lzm.Alert.container().addChild(display);
		}

		public static alertLandscape(display:egret.DisplayObject):void{
			lzm.Alert.alert(display);
            display.rotation = lzm.Alert.landscapeRotation;
		}

		public static alert(dialog:egret.DisplayObject,setXY:boolean = true):void{
			if(lzm.Alert.dialogs.indexOf(dialog) != -1){
				return;
			}
			
			dialog.addEventListener(egret.Event.ADDED_TO_STAGE,lzm.Alert.dialogAddToStage,dialog);

			lzm.Alert.container().addChild(lzm.Alert.background);
			lzm.Alert.container().addChild(dialog);
			
			if(setXY){
				dialog.anchorOffsetX = dialog.width / 2;
            	dialog.anchorOffsetY = dialog.height / 2;
				dialog.x = lzm.Alert.stageWidth / 2;
            	dialog.y = lzm.Alert.stageHeight / 2;
			}
			dialog.scaleX = dialog.scaleY = 0.1;
			egret.Tween.get(dialog).to({scaleX:lzm.Alert.alertScale,scaleY:lzm.Alert.alertScale},300,egret.Ease.backOut);
		}
		
		private static dialogAddToStage(e:egret.Event):void{
			var dialog:egret.DisplayObject = <egret.DisplayObject>e.currentTarget;
			dialog.removeEventListener(egret.Event.ADDED_TO_STAGE,lzm.Alert.dialogAddToStage,dialog);
			dialog.addEventListener(egret.Event.REMOVED_FROM_STAGE,lzm.Alert.dialogRemoveFromStage,dialog);
			
			lzm.Alert.dialogs.push(dialog);
		}
		
		private static dialogRemoveFromStage(e:egret.Event):void{
			var dialog:egret.DisplayObject = <egret.DisplayObject>e.currentTarget;
			dialog.removeEventListener(egret.Event.REMOVED_FROM_STAGE,lzm.Alert.dialogRemoveFromStage,dialog);
			
			lzm.Alert.dialogs.pop();
			
			if(lzm.Alert.dialogs.length == 0){
				if(lzm.Alert.background.parent == lzm.Alert.container()) lzm.Alert.container().removeChild(lzm.Alert.background);
			}else{
				while(lzm.Alert.dialogs.length > 0){
					dialog = lzm.Alert.dialogs[lzm.Alert.dialogs.length-1];
					if(dialog.parent == lzm.Alert.container()){
						lzm.Alert.container().swapChildren(lzm.Alert.background,dialog);
						break;
					}else{
						lzm.Alert.dialogs.pop();
					}
				}
				if(lzm.Alert.dialogs.length == 0){
					if(lzm.Alert.background.parent == lzm.Alert.container()) lzm.Alert.container().removeChild(lzm.Alert.background);
				}
			}
		}

		public static closeAllAlert(){
			var len:number = Alert.dialogs.length;
			var obj:egret.DisplayObject;
			var disposeFun:any;
			var tmpArr:egret.DisplayObject[] = [];
			for(var i:number = 0; i < len ; i++){
				tmpArr.push(Alert.dialogs[i]);
			}
			for(var i:number = 0; i < len ; i++){
				obj = tmpArr[i];
				disposeFun = obj["dispose"];
				if(disposeFun instanceof Function){
					(<Function>disposeFun).apply(obj,[]);
				}
				if(obj.parent != null) obj.parent.removeChild(obj);
			}
		}



	}
}
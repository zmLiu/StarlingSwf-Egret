module starlingswf {
	export class SwfButton extends starlingswf.SwfSprite {

		static onClick:string = "SwfButton.onClick";

		public constructor(skin:starlingswf.SwfSprite) {
			super();
			this.addChild(skin);
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.mouseClick,this);
		}

		public mouseDown(evt:egret.TouchEvent):void{
			this.scaleX = 0.9;
			this.scaleY = 0.9;
		}

		public mouseUp(evt:egret.TouchEvent):void{
			this.scaleX = 1;
			this.scaleY = 1;
		}

		public mouseClick(evt:egret.TouchEvent):void{
			this.dispatchEventWith(starlingswf.SwfButton.onClick);
		}

		public dispose(){
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.mouseClick,this);
		}



	}
}
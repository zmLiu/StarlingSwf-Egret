module starlingswf {
	export class SwfButton extends starlingswf.SwfSprite {

		static onClick:string = "SwfButton.onClick";

		public skin:SwfSprite;
		public defScale:number = -1;

		public constructor(skin:starlingswf.SwfSprite) {
			super();
			this.skin = skin;
			this.addChild(skin);
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.mouseUp,this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.mouseClick,this);
		}

		public mouseDown(evt:egret.TouchEvent):void{
			if(this.defScale == -1){
				this.defScale = this.scaleX;
			}
			this.scaleX = 0.9 * this.defScale;
			this.scaleY = 0.9 * this.defScale;
		}

		public mouseUp(evt:egret.TouchEvent):void{
			if(this.defScale == -1) return;
			this.scaleX = this.defScale;
			this.scaleY = this.defScale;
		}

		public mouseClick(evt:egret.TouchEvent):void{
			this.dispatchEventWith(starlingswf.SwfButton.onClick);
		}

		public setEnable(val:boolean){
			this.touchEnabled = val;
			if(val){
				this.alpha = 1;
			}else{
				this.alpha = 0.5;
			}
		}

		public dispose(){
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.mouseUp,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.mouseClick,this);
		}
	}
}
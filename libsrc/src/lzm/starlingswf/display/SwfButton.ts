module starlingswf {
	export class SwfButton extends starlingswf.SwfSprite {

		static onClick:string = "SwfButton.onClick";

		public skin:egret.DisplayObject;
		public defScale:number = -1;

		private _w:number;
		private _h:number;

		public constructor(skin:egret.DisplayObject) {
			super();
			this.skin = skin;
			this._w = this.skin.width;
			this._h = this.skin.height;
			this.addChild(skin);
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.mouseUp,this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.mouseClick,this);
		}

		public mouseDown(evt:egret.TouchEvent):void{
			this.skin.scaleX = 0.9;
			this.skin.scaleY = 0.9;
			this.skin.x = (1.0 - 0.9) / 2.0 * this._w;
			this.skin.y = (1.0 - 0.9) / 2.0 * this._h;
		}

		public mouseUp(evt:egret.TouchEvent):void{
			this.skin.scaleX = 1;
			this.skin.scaleY = 1;
			this.skin.x = this.skin.y = 0;
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
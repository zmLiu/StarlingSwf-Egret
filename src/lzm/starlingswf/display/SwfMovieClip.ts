/**
 * Created by zmliu on 14-5-11.
 */
module starlingswf{
    export class SwfMovieClip extends starlingswf.SwfSprite implements starlingswf.ISwfAnimation{

        private _ownerSwf:starlingswf.Swf;//所属swf

        private _frames:any[];
        private _labels:any[];
        private _frameEvents:Object;
        private _displayObjects:Object;

        private _startFrame:number;
        private _endFrame:number;
        private _currentFrame:number;
        private _currentLabel:string;

        private _isPlay:boolean = false;
        public loop:boolean = true;

        private _completeFunction:Function = null;//播放完毕的回调
        private _hasCompleteListener:Boolean = false;//是否监听过播放完毕的事件

        constructor(frames:any[],labels:any[],displayObjects:Object,ownerSwf:starlingswf.Swf,frameEvents:Object = null){
            super();

            this._frames = frames;
            this._labels = labels;
            this._displayObjects = displayObjects;
            this._frameEvents = frameEvents;

            this._startFrame = 0;
            this._endFrame = this._frames.length - 1;
            this._ownerSwf = ownerSwf;

            this.setCurrentFrame(0);
            this.play();

        }

        public getStage():egret.Stage{
            return this.stage;
        }

        public update():void {
            if (!this._isPlay) return;
			
			if(this._currentFrame >= this._endFrame){
				var isReturn:boolean = false;
				
				if(!this.loop || this._startFrame == this._endFrame){//只有一帧就不要循环下去了
					if(this._ownerSwf) this.stop(false);
					isReturn = true;
				}
				
				if(this._completeFunction) this._completeFunction(this);
				if(this._hasCompleteListener) this.dispatchEventWith(egret.Event.COMPLETE);
				
				if(isReturn) return;
				
				this._currentFrame = this._startFrame;
			}else{
				this._currentFrame ++
			}
            this.setCurrentFrame(this._currentFrame);
        }

        private __frameInfos:any[];
        public setCurrentFrame(frame:number):void{
            //dirty hack this.removeChildren();
            // this.$children.length = 0;
            this.removeAllChilds();

            this._currentFrame = frame;
            this.__frameInfos = this._frames[this._currentFrame];

            var data:any[];
            var display:egret.DisplayObject;
            var textfield:egret.TextField;
            var useIndex:number;
            var length:number = this.__frameInfos.length;
            for (var i:number = 0; i < length; i++) {
                data = this.__frameInfos[i];
                useIndex = data[10];
                display = this._displayObjects[data[0]][useIndex];

                display.$setSkewX(data[6]);
                display.$setSkewY(data[7]);;
                display.$setAlpha(data[8]);
                display.name = data[9];

//                if(data[1] == Swf.dataKey_Particle){
//                    display["setPostion"](data[2],data[3]);
//                }else{
                    display.$setX(data[2]);
                    display.$setY(data[3]);
//                }

                switch(data[1]){
                    case starlingswf.Swf.dataKey_Scale9:
                        display.width = data[11];
                        display.height = data[12];
                        starlingswf.SwfBlendMode.setBlendMode(display,data[13]);
                        break;
                    case starlingswf.Swf.dataKey_ShapeImg:
                        display.width = data[11];
                        display.height = data[12];
                        starlingswf.SwfBlendMode.setBlendMode(display,data[13]);
                        break;
                    case starlingswf.Swf.dataKey_TextField:
                        textfield = <egret.TextField>display;
                        textfield.width = data[11];
                        textfield.height = data[12];
                        textfield.fontFamily = data[13];
                        textfield.textColor = data[14];
                        textfield.size = data[15];
                        textfield.textAlign = data[16];
//                        textfield["italic"] = data[17];
//                        textfield["bold"] = data[18];
                        if(data[19] && data[19] != "\r" && data[19] != ""){
                            textfield.text = data[19];
                        }
                        starlingswf.SwfBlendMode.setBlendMode(textfield,data[20]);
                        break;
                    default:
                        display.$setScaleX(data[4]);
                        display.$setScaleY(data[5]);
                        starlingswf.SwfBlendMode.setBlendMode(display,data[11]);
                        break;
                }
                
                this.$doAddChild(display,length,false);

                // this.$children.push(display);
                // display.$parent = this;
            }

            if(this._frameEvents != null && this._frameEvents[this._currentFrame] != null){
                this.dispatchEventWith(this._frameEvents[this._currentFrame]);
            }

        }

        public getCurrentFrame():number{
            return this._currentFrame;
        }

        /**
         * 播放
         * */
        public play():void{
            this._isPlay = true;

            this._ownerSwf.swfUpdateManager.addSwfAnimation(this);

            var k:string;
            var arr:any[];
            var l:number;
            for(k in this._displayObjects){
                if(k.indexOf(starlingswf.Swf.dataKey_MovieClip) == 0){
                    arr = this._displayObjects[k];
                    l = arr.length;
                    for (var i:number = 0; i < l; i++) {
                        (<SwfMovieClip>arr[i]).play();
                    }
                }
            }
        }

        /**
         * 停止
         * @param	stopChild	是否停止子动画
         * */
        public stop(stopChild:boolean = true):void{
            this._isPlay = false;
            this._ownerSwf.swfUpdateManager.removeSwfAnimation(this);

            if(!stopChild) return;

            var k:string;
            var arr:any[];
            var l:number;
            for(k in this._displayObjects){
                if(k.indexOf(starlingswf.Swf.dataKey_MovieClip) == 0){
                    arr = this._displayObjects[k];
                    l = arr.length;
                    for (var i:number = 0; i < l; i++) {
                        (<SwfMovieClip>arr[i]).stop(stopChild);
                    }
                }
            }
        }

        public gotoAndStop(frame:Object,stopChild:boolean = true):void{
            this.goTo(frame);
            this.stop(stopChild);
        }

        public gotoAndPlay(frame:Object):void{
            this.goTo(frame);
            this.play();
        }

        private goTo(frame:any):void{
            if(typeof(frame) == "string"){
                var labelData:any[] = this.getLabelData(frame);
                this._currentLabel = labelData[0];
                this._currentFrame = this._startFrame = labelData[1];
                this._endFrame = labelData[2];
            }else if(typeof(frame) == "number"){
                this._currentFrame = this._startFrame = frame;
                this._endFrame = this._frames.length - 1;
            }
            this.setCurrentFrame(this._currentFrame);
        }

        private getLabelData(label:String):any[]{
            var length:number = this._labels.length;
            var labelData:any[];
            for (var i:number = 0; i < length; i++) {
                labelData = this._labels[i];
                if(labelData[0] == label){
                    return labelData;
                }
            }
            return null;
        }

        /**
         * 是否再播放
         * */
        public isPlay():boolean{
            return this._isPlay;
        }

        /**
         * 总共有多少帧
         * */
        public totalFrames():number{
            return this._frames.length;
        }

        /**
         * 返回当前播放的是哪一个标签
         * */
        public currentLabel():string{
            return this._currentLabel;
        }

        /**
         * 获取所有标签
         * */
        public labels():any[]{
            var length:number = this._labels.length;
            var returnLabels:any[] = [];
            for (var i:number = 0; i < length; i++) {
                returnLabels.push(this._labels[i][0]);
            }
            return returnLabels;
        }

        /**
         * 是否包含某个标签
         * */
        public hasLabel(label:String):Boolean{
            var ls:any[] = this.labels();
            return !(ls.indexOf(label) == -1);
        }

        public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0):void{
            super.addEventListener(type,listener,thisObject,useCapture,priority);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE);
        }

        public removeEventListener(type:string, listener:Function,thisObject:any,useCapture:boolean = false):void{
            super.removeEventListener(type,listener,thisObject,useCapture);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE);
        }


        private removeAllChilds():void{
            let children = this.$children;
            for (let i: number = children.length - 1; i >= 0; i--) {
                this.$doRemoveChild(i,false);
            }
        }
    }
}

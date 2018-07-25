/**
 * Created by zmliu on 14-5-11.
 */
module starlingswf{
    /**
     * Swf文档类
     * */
    export class Swf{

        public static dataKey_Sprite:string = "spr";
        public static dataKey_Image:string = "img";
        public static dataKey_MovieClip:string = "mc";
        public static dataKey_TextField:string = "text";
        public static dataKey_Button:string = "btn";
        public static dataKey_Scale9:string = "s9";
        public static dataKey_ShapeImg:string = "shapeImg";
        public static dataKey_Component:string = "comp";
        public static dataKey_Particle:string = "particle";

        //创建对象的方法
        private _createDisplayFuns:Object;

        //swf数据
        private _swfData:Object;
        //动画更新器
        public swfUpdateManager:starlingswf.SwfUpdateManager;

        constructor(swfData:Object,fps:number = 24){
            this._swfData = swfData;

            this._createDisplayFuns = new Object();
            this._createDisplayFuns[Swf.dataKey_Sprite] = this.createSprite;
            this._createDisplayFuns[Swf.dataKey_MovieClip] = this.createMovie;
            this._createDisplayFuns[Swf.dataKey_Button] = this.createButton;
            this._createDisplayFuns[Swf.dataKey_Image] = this.createImage;
            this._createDisplayFuns[Swf.dataKey_Scale9] = this.createS9Image;
            this._createDisplayFuns[Swf.dataKey_ShapeImg] = this.createShapeImage;
            this._createDisplayFuns[Swf.dataKey_TextField] = this.createTextField;

            this.swfUpdateManager = starlingswf.SwfUpdateManager.createSwfUpdateManager(fps);
        }

        public createSprite(name:string,data:any[] = null,sprData:any[] = null):starlingswf.SwfSprite{
            if(sprData == null){
                sprData = this._swfData[Swf.dataKey_Sprite][name];
            }

            var sprite:starlingswf.SwfSprite = new starlingswf.SwfSprite();
            var length:number = sprData.length;
            var objData:any[];
            var display:egret.DisplayObject;
            var fun:Function;
            var swf:Swf;
            for (var i:number = 0; i < length; i++) {
                objData = sprData[i];

                fun = this._createDisplayFuns[objData[1]];
                if(fun == null) continue;
                display = fun.apply(this,[objData[0],objData]);
                display.name = objData[9];
                display.x = objData[2];
                display.y = objData[3];
                if(objData[1] == Swf.dataKey_TextField){
                    display.y += 6;
                }
                if(objData[1] != Swf.dataKey_Scale9 && objData[1] != Swf.dataKey_ShapeImg){
                    display.scaleX = objData[4];
                    display.scaleY = objData[5];
                }
                display.skewX = objData[6];
                display.skewY = objData[7];
                display.alpha = objData[8];
                sprite.addChild(display);
            }

            if(data != null){
                starlingswf.SwfBlendMode.setBlendMode(sprite,<string>data[11]);
            }

            return sprite;
        }

        public createMovie(name:string,data:any[]=null):starlingswf.SwfMovieClip{
            var movieClipData:Object = this._swfData[Swf.dataKey_MovieClip][name];
            var objectCountData:Object = movieClipData["objCount"];
            var displayObjects:Object = {};
            var displayObjectArray:any[];
            var type:string;
            var count:number;
            var fun:Function;
            var objName:string;
            for(objName in objectCountData){
                type = objectCountData[objName][0];
                count = objectCountData[objName][1];

                displayObjectArray = displayObjects[objName] == null ? [] : displayObjects[objName];

                for (var i:number = 0; i < count; i++) {
                    fun = this._createDisplayFuns[type];
                    if(fun == null) continue;
                    displayObjectArray.push(fun.apply(this,[objName,null]));
                }

                displayObjects[objName] = displayObjectArray;
            }

            var mc:starlingswf.SwfMovieClip = new starlingswf.SwfMovieClip(movieClipData["frames"],movieClipData["labels"],displayObjects,this,movieClipData["frameEvents"]);
            mc.loop = movieClipData["loop"];

            if(data != null){
                starlingswf.SwfBlendMode.setBlendMode(mc,<string>data[11]);
            }

            return mc;

        }

        /**
		 * 创建按钮
		 * */
		public createButton(name:string,data:any[]=null):starlingswf.SwfButton{
			var sprData:any[] = this._swfData[Swf.dataKey_Button][name];
			var skin:SwfSprite = this.createSprite(null,null,sprData);
			var button:starlingswf.SwfButton = new starlingswf.SwfButton(skin);
            return button;
		}

        public createImage(name:string,data:any[] = null):egret.Bitmap{
            var imageData:number[] = this._swfData[Swf.dataKey_Image][name];

            var bitmap:egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(name);

            bitmap.anchorOffsetX = imageData[0];
            bitmap.anchorOffsetY = imageData[1];

            if(data != null){
                starlingswf.SwfBlendMode.setBlendMode(bitmap,<string>data[11]);
            }

            return bitmap;
        }

        public createS9Image(name:string,data:any[] = null):egret.Bitmap{
            var scale9Data:any[] = this._swfData[Swf.dataKey_Scale9][name];

            var bitmap:egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(name);
            bitmap.scale9Grid = new egret.Rectangle(scale9Data[0],scale9Data[1],scale9Data[2],scale9Data[3]);

            if(data != null){
                bitmap.width = <number>data[10];
                bitmap.height = <number>data[11];
                starlingswf.SwfBlendMode.setBlendMode(bitmap,<string>data[13]);
            }

            return bitmap;
        }

        public createShapeImage(name:string,data:any[] = null):egret.Bitmap{
            var bitmap:egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(name);
            
            bitmap.fillMode = egret.BitmapFillMode.REPEAT;
            if(data != null){
                bitmap.width = <number>data[10];
                bitmap.height = <number>data[11];
                starlingswf.SwfBlendMode.setBlendMode(bitmap,<string>data[13]);
            }
            return bitmap;
        }

        public createTextField(name:String,data:any[] = null):egret.TextField{
            var textfield:egret.TextField = new egret.TextField();
            if(data != null){
                textfield.width = <number>data[10];
                textfield.height = <number>data[11];
                textfield.fontFamily = <string>data[12];
                textfield.textColor = <number>data[13];
                textfield.size = <number>data[14];
                textfield.textAlign = <string>data[15];
                //textfield.italic = data[16];
                //textfield.bold = data[17];
                textfield.text = <string>data[18];
                this.createTextFieldFilter(textfield,data[19]);
                starlingswf.SwfBlendMode.setBlendMode(textfield,<string>data[20]);
            }
            return textfield;
        }

        /** 创建文本的滤镜 */
		public createTextFieldFilter(textField:egret.TextField,filterObjects:Object):void{
			for(var filterName in filterObjects){
                if(filterName == "flash.filters::GlowFilter"){
                    textField.stroke = filterObjects[filterName]["strength"];
                    textField.strokeColor = filterObjects[filterName]["color"];
                }
			}
		}
    }
}

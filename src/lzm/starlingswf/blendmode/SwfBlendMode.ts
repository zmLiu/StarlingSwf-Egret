/**
 * Created by zmliu on 14-9-25.
 */
module starlingswf{

    export class SwfBlendMode{
        public static modes:Object = {
            "normal":true,
            "add":true
        };

        public static setBlendMode(display:egret.DisplayObject,blendMode:string):void{
            if(SwfBlendMode.modes[blendMode]){
                display.blendMode = blendMode;
            }
        }

    }



}
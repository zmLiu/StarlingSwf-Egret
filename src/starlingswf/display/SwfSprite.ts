/**
 * Created by zmliu on 14-5-11.
 */
module starlingswf{
    /**Sprite*/
    export class SwfSprite extends egret.DisplayObjectContainer{

        public getChildByName(name:string):egret.DisplayObject{
            var locChildren = this._children;
            var count:number = this.numChildren;
            var displayObject:egret.DisplayObject;
            for(var i:number = 0 ; i < count ; i++ ){
                displayObject = locChildren[i];
                if(displayObject.name == name){
                    return displayObject;
                }
            }
            return null;
        }

    }
}
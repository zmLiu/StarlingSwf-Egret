var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by zmliu on 14-5-11.
*/
var starlingswf;
(function (starlingswf) {
    /**Sprite*/
    var SwfSprite = (function (_super) {
        __extends(SwfSprite, _super);
        function SwfSprite() {
            _super.apply(this, arguments);
        }
        return SwfSprite;
    })(egret.DisplayObjectContainer);
    starlingswf.SwfSprite = SwfSprite;
})(starlingswf || (starlingswf = {}));

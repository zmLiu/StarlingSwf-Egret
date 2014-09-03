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
        SwfSprite.prototype.getTextField = function (name) {
            return this.getChildByName(name);
        };

        SwfSprite.prototype.getMovie = function (name) {
            return this.getChildByName(name);
        };

        SwfSprite.prototype.getSprite = function (name) {
            return this.getChildByName(name);
        };

        SwfSprite.prototype.getImage = function (name) {
            return this.getChildByName(name);
        };
        return SwfSprite;
    })(egret.DisplayObjectContainer);
    starlingswf.SwfSprite = SwfSprite;
    SwfSprite.prototype.__class__ = "starlingswf.SwfSprite";
})(starlingswf || (starlingswf = {}));

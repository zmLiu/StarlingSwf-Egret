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
        var d = __define,c=SwfSprite;p=c.prototype;
        p.getTextField = function (name) {
            return this.getChildByName(name);
        };
        p.getMovie = function (name) {
            return this.getChildByName(name);
        };
        p.getSprite = function (name) {
            return this.getChildByName(name);
        };
        p.getImage = function (name) {
            return this.getChildByName(name);
        };
        return SwfSprite;
    })(egret.DisplayObjectContainer);
    starlingswf.SwfSprite = SwfSprite;
    egret.registerClass(SwfSprite,"starlingswf.SwfSprite");
})(starlingswf || (starlingswf = {}));

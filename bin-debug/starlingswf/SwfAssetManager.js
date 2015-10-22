/**
 * Created by zmliu on 14-5-11.
 */
var starlingswf;
(function (starlingswf) {
    /**
     * swf资源管理器
     * */
    var SwfAssetManager = (function () {
        function SwfAssetManager() {
            this._sheets = {};
            this._textures = {};
        }
        var d = __define,c=SwfAssetManager;p=c.prototype;
        p.addSpriteSheet = function (name, spriteSheep) {
            this._sheets[name] = spriteSheep;
        };
        p.addTexture = function (name, texture) {
            this._textures[name] = texture;
        };
        p.createBitmap = function (name) {
            var sheet;
            var bitmap;
            var texture;
            var key;
            for (key in this._sheets) {
                sheet = this._sheets[key];
                texture = sheet.getTexture(name);
                if (texture != null)
                    break;
            }
            if (texture == null)
                texture = this._textures[name];
            if (texture == null)
                return null;
            bitmap = new egret.Bitmap();
            bitmap.texture = texture;
            return bitmap;
        };
        return SwfAssetManager;
    })();
    starlingswf.SwfAssetManager = SwfAssetManager;
    egret.registerClass(SwfAssetManager,"starlingswf.SwfAssetManager");
})(starlingswf || (starlingswf = {}));

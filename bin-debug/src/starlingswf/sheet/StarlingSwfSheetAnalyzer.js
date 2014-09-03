var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* StarlingSwfSpriteSheet解析器
*/
var starlingswf;
(function (starlingswf) {
    var StarlingSwfSheetAnalyzer = (function (_super) {
        __extends(StarlingSwfSheetAnalyzer, _super);
        function StarlingSwfSheetAnalyzer() {
            _super.apply(this, arguments);
        }
        StarlingSwfSheetAnalyzer.prototype.parseSpriteSheet = function (texture, data) {
            var frames = data.frames;
            if (!frames) {
                return;
            }
            var spriteSheet = new egret.SpriteSheet(texture);
            for (var name in frames) {
                var config = frames[name];
                var texture = spriteSheet.createTexture(name, config.x, config.y, config.w, config.h, -config.offX, -config.offY);
            }
            return spriteSheet;
        };
        return StarlingSwfSheetAnalyzer;
    })(RES.SheetAnalyzer);
    starlingswf.StarlingSwfSheetAnalyzer = StarlingSwfSheetAnalyzer;
    StarlingSwfSheetAnalyzer.prototype.__class__ = "starlingswf.StarlingSwfSheetAnalyzer";
})(starlingswf || (starlingswf = {}));

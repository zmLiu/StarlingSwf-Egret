var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var starlingswf;
(function (starlingswf) {
    var SwfButton = (function (_super) {
        __extends(SwfButton, _super);
        function SwfButton(skin) {
            var _this = _super.call(this) || this;
            _this.defScale = -1;
            _this.skin = skin;
            _this._w = _this.skin.width;
            _this._h = _this.skin.height;
            _this.addChild(skin);
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.mouseUp, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.mouseClick, _this);
            return _this;
        }
        SwfButton.prototype.mouseDown = function (evt) {
            this.skin.scaleX = 1.1;
            this.skin.scaleY = 1.1;
            this.skin.x = (1.0 - 1.1) / 2.0 * this._w;
            this.skin.y = (1.0 - 1.1) / 2.0 * this._h;
        };
        SwfButton.prototype.mouseUp = function (evt) {
            this.skin.scaleX = 1;
            this.skin.scaleY = 1;
            this.skin.x = this.skin.y = 0;
        };
        SwfButton.prototype.mouseClick = function (evt) {
            this.dispatchEventWith(starlingswf.SwfButton.onClick);
            if (SwfButton.defSound != null)
                SwfButton.defSound.play(0, 1);
        };
        SwfButton.prototype.setEnable = function (val) {
            this.touchEnabled = val;
            if (val) {
                this.filters = null;
            }
            else {
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                this.filters = [colorFlilter];
            }
        };
        SwfButton.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.mouseUp, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mouseClick, this);
        };
        SwfButton.onClick = "SwfButton.onClick";
        return SwfButton;
    }(starlingswf.SwfSprite));
    starlingswf.SwfButton = SwfButton;
    __reflect(SwfButton.prototype, "starlingswf.SwfButton");
})(starlingswf || (starlingswf = {}));
//# sourceMappingURL=SwfButton.js.map
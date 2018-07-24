var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by zmliu on 14-9-25.
 */
var starlingswf;
(function (starlingswf) {
    var SwfBlendMode = (function () {
        function SwfBlendMode() {
        }
        SwfBlendMode.setBlendMode = function (display, blendMode) {
            if (SwfBlendMode.modes[blendMode]) {
                display.blendMode = blendMode;
            }
        };
        SwfBlendMode.modes = {
            "normal": true,
            "add": true
        };
        return SwfBlendMode;
    }());
    starlingswf.SwfBlendMode = SwfBlendMode;
    __reflect(SwfBlendMode.prototype, "starlingswf.SwfBlendMode");
})(starlingswf || (starlingswf = {}));
//# sourceMappingURL=SwfBlendMode.js.map
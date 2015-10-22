/**
 * Created by zmliu on 14-9-25.
 */
var starlingswf;
(function (starlingswf) {
    var SwfBlendMode = (function () {
        function SwfBlendMode() {
        }
        var d = __define,c=SwfBlendMode;p=c.prototype;
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
    })();
    starlingswf.SwfBlendMode = SwfBlendMode;
    egret.registerClass(SwfBlendMode,"starlingswf.SwfBlendMode");
})(starlingswf || (starlingswf = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lzm;
(function (lzm) {
    var Alert = (function () {
        function Alert() {
        }
        Alert.init = function (root, stageWidth, stageHeight, alertScale, landscapeRotation) {
            if (alertScale === void 0) { alertScale = 1; }
            if (landscapeRotation === void 0) { landscapeRotation = 90; }
            lzm.Alert.root = root;
            lzm.Alert.stageWidth = stageWidth;
            lzm.Alert.stageHeight = stageHeight;
            lzm.Alert.alertScale = alertScale;
            lzm.Alert.landscapeRotation = landscapeRotation;
            lzm.Alert.initBackGround();
        };
        Alert.container = function () {
            return lzm.Alert.root;
        };
        Alert.width = function () {
            return lzm.Alert.stageWidth;
        };
        Alert.height = function () {
            return lzm.Alert.stageHeight;
        };
        Alert.initBackGround = function () {
            if (lzm.Alert.background == null) {
                lzm.Alert.background = new egret.Shape();
                lzm.Alert.background.alpha = 0.7;
                lzm.Alert.background.touchEnabled = true;
            }
            lzm.Alert.background.graphics.clear();
            lzm.Alert.background.graphics.beginFill(0x000000);
            lzm.Alert.background.graphics.drawRect(0, 0, lzm.Alert.stageWidth, lzm.Alert.stageHeight);
            lzm.Alert.background.graphics.endFill();
        };
        Alert.show = function (display) {
            lzm.Alert.container().addChild(display);
        };
        Alert.alertLandscape = function (display) {
            lzm.Alert.alert(display);
            display.rotation = lzm.Alert.landscapeRotation;
        };
        Alert.alert = function (dialog, setXY) {
            if (setXY === void 0) { setXY = true; }
            if (lzm.Alert.dialogs.indexOf(dialog) != -1) {
                return;
            }
            dialog.addEventListener(egret.Event.ADDED_TO_STAGE, lzm.Alert.dialogAddToStage, dialog);
            lzm.Alert.container().addChild(lzm.Alert.background);
            lzm.Alert.container().addChild(dialog);
            if (setXY) {
                dialog.anchorOffsetX = dialog.width / 2;
                dialog.anchorOffsetY = dialog.height / 2;
                dialog.x = lzm.Alert.stageWidth / 2;
                dialog.y = lzm.Alert.stageHeight / 2;
            }
            dialog.scaleX = dialog.scaleY = 0.1;
            egret.Tween.get(dialog).to({ scaleX: lzm.Alert.alertScale, scaleY: lzm.Alert.alertScale }, 300, egret.Ease.backOut);
        };
        Alert.dialogAddToStage = function (e) {
            var dialog = e.currentTarget;
            dialog.removeEventListener(egret.Event.ADDED_TO_STAGE, lzm.Alert.dialogAddToStage, dialog);
            dialog.addEventListener(egret.Event.REMOVED_FROM_STAGE, lzm.Alert.dialogRemoveFromStage, dialog);
            lzm.Alert.dialogs.push(dialog);
        };
        Alert.dialogRemoveFromStage = function (e) {
            var dialog = e.currentTarget;
            dialog.removeEventListener(egret.Event.REMOVED_FROM_STAGE, lzm.Alert.dialogRemoveFromStage, dialog);
            lzm.Alert.dialogs.pop();
            if (lzm.Alert.dialogs.length == 0) {
                lzm.Alert.container().removeChild(lzm.Alert.background);
            }
            else {
                dialog = lzm.Alert.dialogs[lzm.Alert.dialogs.length - 1];
                lzm.Alert.container().swapChildren(lzm.Alert.background, dialog);
            }
        };
        Alert.closeAllAlert = function () {
            var len = Alert.dialogs.length;
            var obj;
            var disposeFun;
            var tmpArr = [];
            for (var i = 0; i < len; i++) {
                tmpArr.push(Alert.dialogs[i]);
            }
            for (var i = 0; i < len; i++) {
                obj = tmpArr[i];
                disposeFun = obj["dispose"];
                if (disposeFun instanceof Function) {
                    disposeFun.apply(obj, []);
                }
                if (obj.parent != null)
                    obj.parent.removeChild(obj);
            }
        };
        Alert.dialogs = [];
        return Alert;
    }());
    lzm.Alert = Alert;
    __reflect(Alert.prototype, "lzm.Alert");
})(lzm || (lzm = {}));
//# sourceMappingURL=Alert.js.map
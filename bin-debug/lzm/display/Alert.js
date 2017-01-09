var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var lzm;
(function (lzm) {
    var Alert = (function () {
        function Alert() {
        }
        Alert.init = function (stage) {
            lzm.Alert.root = stage;
            lzm.Alert.stageWidth = stage.stageWidth;
            lzm.Alert.stageHeight = stage.stageHeight;
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
            if (lzm.Alert.background != null)
                return;
            lzm.Alert.background = new egret.Shape();
            lzm.Alert.background.graphics.beginFill(0x000000);
            lzm.Alert.background.graphics.drawRect(0, 0, lzm.Alert.stageWidth, lzm.Alert.stageHeight);
            lzm.Alert.background.graphics.endFill();
            lzm.Alert.background.alpha = 0.5;
        };
        Alert.show = function (display) {
            lzm.Alert.container().addChild(display);
        };
        Alert.alert = function (dialog, setXY) {
            if (setXY === void 0) { setXY = true; }
            if (lzm.Alert.dialogs.indexOf(dialog) != -1) {
                return;
            }
            dialog.addEventListener(egret.Event.ADDED_TO_STAGE, lzm.Alert.dialogAddToStage, dialog);
            lzm.Alert.initBackGround();
            lzm.Alert.container().addChild(lzm.Alert.background);
            lzm.Alert.container().addChild(dialog);
            if (setXY) {
                var dialogRect = dialog.getBounds();
                dialog.x = (lzm.Alert.stageWidth - dialogRect.width) / 2;
                dialog.y = (lzm.Alert.stageHeight - dialogRect.height) / 2;
            }
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
        return Alert;
    }());
    Alert.dialogs = [];
    lzm.Alert = Alert;
    __reflect(Alert.prototype, "lzm.Alert");
})(lzm || (lzm = {}));
//# sourceMappingURL=Alert.js.map
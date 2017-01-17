var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lzm;
(function (lzm) {
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStage, _this);
            return _this;
        }
        BasePanel.prototype.addToStage = function (e) {
        };
        BasePanel.prototype.removeFromStage = function (e) {
        };
        BasePanel.prototype.gotoPanel = function (panel) {
            this.parent.addChild(panel);
            this.dispose();
        };
        BasePanel.prototype.dispose = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        };
        return BasePanel;
    }(egret.DisplayObjectContainer));
    lzm.BasePanel = BasePanel;
    __reflect(BasePanel.prototype, "lzm.BasePanel");
})(lzm || (lzm = {}));
//# sourceMappingURL=BasePanel.js.map
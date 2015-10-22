var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var ProgressBarSkin = (function (_super) {
            __extends(ProgressBarSkin, _super);
            function ProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.height = 20;
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", [
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            var d = __define,c=ProgressBarSkin;p=c.prototype;
            d(p, "skinParts"
                ,function () {
                    return ProgressBarSkin._skinParts;
                }
            );
            p.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.track_i(), this.thumb_i(), this.labelDisplay_i()];
                return t;
            };
            p.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["horizontalCenter", "maxDisplayedLines", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], [0, 1, 20, "center", 0x707070, "middle", 0]);
                return t;
            };
            p.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "progressbar_track_png", 100]);
                return t;
            };
            p.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                t.source = "progressbar_fill_png";
                return t;
            };
            p.track_i = function () {
                var t = new egret.gui.Group();
                this.track = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            ProgressBarSkin._skinParts = ["track", "thumb", "labelDisplay"];
            return ProgressBarSkin;
        })(egret.gui.Skin);
        simple.ProgressBarSkin = ProgressBarSkin;
        egret.registerClass(ProgressBarSkin,"skins.simple.ProgressBarSkin");
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));

var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var ShowcaseSkin = (function (_super) {
            __extends(ShowcaseSkin, _super);
            function ShowcaseSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [800, 480]);
                this.elementsContent = [this.btnShowMessage_i(), this.list_i()];
                this.states = [
                    new egret.gui.State("normal", [
                    ]),
                    new egret.gui.State("disabled", [
                    ])
                ];
            }
            var d = __define,c=ShowcaseSkin;p=c.prototype;
            d(p, "skinParts"
                ,function () {
                    return ShowcaseSkin._skinParts;
                }
            );
            p.list_i = function () {
                var t = new egret.gui.List();
                this.list = t;
                this.__s(t, ["horizontalCenter", "itemRendererSkinName", "skinName", "y"], [0, skins.simple.ItemRendererSkin, skins.simple.ListSkin, 150]);
                return t;
            };
            p.btnShowMessage_i = function () {
                var t = new egret.gui.Button();
                this.btnShowMessage = t;
                this.__s(t, ["horizontalCenter", "label", "y"], [0, "click", 50]);
                return t;
            };
            ShowcaseSkin._skinParts = ["btnShowMessage", "list"];
            return ShowcaseSkin;
        })(egret.gui.Skin);
        scene.ShowcaseSkin = ShowcaseSkin;
        egret.registerClass(ShowcaseSkin,"skins.scene.ShowcaseSkin");
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));

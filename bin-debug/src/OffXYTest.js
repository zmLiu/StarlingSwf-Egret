var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by zmliu on 14-9-30.
*/
var OffXYTest = (function (_super) {
    __extends(OffXYTest, _super);
    function OffXYTest() {
        _super.call(this);

        //egret.Injector.mapClass(RES.AnalyzerBase,starlingswf.StarlingSwfSheetAnalyzer,"starlingswf_sheet");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    OffXYTest.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };

    /**
    * 配置文件加载完成,开始预加载preload资源组。
    */
    OffXYTest.prototype.onConfigComp = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComp, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("Untitled-2");
    };

    /**
    * preload资源组加载完成
    */
    OffXYTest.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "Untitled-2") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };

    /**
    * preload资源组加载进度
    */
    OffXYTest.prototype.onResourceProgress = function (event) {
        if (event.groupName == "Untitled-2") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };

    /**
    * 创建游戏场景
    */
    OffXYTest.prototype.createGameScene = function () {
        var swfData = RES.getRes("Untitled-2_swf");
        var spriteSheet = RES.getRes("Untitled-2");

        var assetsManager = new starlingswf.SwfAssetManager();
        assetsManager.addSpriteSheet("Untitled-2", spriteSheet);

        this.swf = new starlingswf.Swf(swfData, assetsManager, 60);

        var spr = this.swf.createSprite("spr_aaa");
        this.addChild(spr);

        egret.Profiler.getInstance().run();
    };
    return OffXYTest;
})(egret.DisplayObjectContainer);
OffXYTest.prototype.__class__ = "OffXYTest";

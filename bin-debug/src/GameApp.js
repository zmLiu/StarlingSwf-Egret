/**
* Copyright (c) 2014,Egret-Labs.org
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the Egret-Labs.org nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);

        egret.Injector.mapClass(RES.AnalyzerBase, starlingswf.StarlingSwfSheetAnalyzer, "starlingswf_sheet");

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GameApp.prototype.onAddToStage = function (event) {
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
    GameApp.prototype.onConfigComp = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComp, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };

    /**
    * preload资源组加载完成
    */
    GameApp.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };

    /**
    * preload资源组加载进度
    */
    GameApp.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };

    /**
    * 创建游戏场景
    */
    GameApp.prototype.createGameScene = function () {
        var swfData = RES.getRes("test_swf");
        var spriteSheet = RES.getRes("test");

        var assetsManager = new starlingswf.SwfAssetManager();
        assetsManager.addSpriteSheet("test", spriteSheet);

        this.swf = new starlingswf.Swf(swfData, assetsManager, 60);

        //        this.test1();
        //        this.test2();
        //        this.test3();
        //        this.test4();
        this.test5();

        egret.Profiler.getInstance().run();
    };

    /**
    * Sprite测试
    * */
    GameApp.prototype.test1 = function () {
        var sprite = this.swf.createSprite("spr_1");
        this.addChild(sprite);
    };

    /**
    * MovieClip测试
    * */
    GameApp.prototype.test2 = function () {
        var mcNames = ["mc_lajiao", "mc_test1", "mc_Tain", "mc_Zombie_balloon", "mc_Zombie_dolphinrider", "mc_Zombie_gargantuar", "mc_Zombie_imp", "mc_Zombie_jackbox", "mc_Zombie_ladder", "mc_Zombie_polevaulter"];
        for (var i = 0; i < 50; i++) {
            var mcName = mcNames[Math.floor(Math.random() * mcNames.length)];
            var mc = this.swf.createMovie(mcName);
            mc.x = Math.random() * 480;
            mc.y = Math.random() * 320;
            this.addChild(mc);
        }
    };

    /**
    * 动画事件测试
    * */
    GameApp.prototype.test3 = function () {
        var mc = this.swf.createMovie("mc_Tain");
        mc.x = 480 / 2;
        mc.y = 320 / 2;
        mc.addEventListener(egret.Event.COMPLETE, this.mcComplete, mc);
        mc.gotoAndPlay("walk");
        this.addChild(mc);
    };

    GameApp.prototype.mcComplete = function (e) {
        console.log("mcComplete");
    };

    /**
    * 帧事件测试
    * */
    GameApp.prototype.test4 = function () {
        var mc = this.swf.createMovie("mc_frame_event");
        mc.addEventListener("@out", this.frameEventOut, mc);
        mc.addEventListener("@in", this.frameEventIn, mc);
        this.addChild(mc);
    };

    GameApp.prototype.frameEventOut = function (e) {
        console.log("@out");
    };

    GameApp.prototype.frameEventIn = function (e) {
        console.log("@in");
    };

    /**
    * blendMode
    * */
    GameApp.prototype.test5 = function () {
        var spr = this.swf.createSprite("spr_blendmode");
        this.addChild(spr);
    };
    return GameApp;
})(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";

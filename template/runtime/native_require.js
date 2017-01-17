
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"bin-debug/lzm/starlingswf/display/SwfSprite.js",
	"bin-debug/lzm/starlingswf/blendmode/SwfBlendMode.js",
	"bin-debug/lzm/display/Alert.js",
	"bin-debug/lzm/display/BasePanel.js",
	"bin-debug/lzm/starlingswf/Swf.js",
	"bin-debug/lzm/starlingswf/SwfUpdateManager.js",
	"bin-debug/Main.js",
	"bin-debug/lzm/starlingswf/display/ISwfAnimation.js",
	"bin-debug/lzm/starlingswf/display/SwfButton.js",
	"bin-debug/lzm/starlingswf/display/SwfMovieClip.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/lzm/utils/HttpClient.js",
	"bin-debug/lzm/utils/JSONWebSocketClient.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "noScale",
		contentWidth: 480,
		contentHeight: 320,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
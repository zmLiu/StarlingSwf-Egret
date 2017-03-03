var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zmliu on 14-5-11.
 */
var starlingswf;
(function (starlingswf) {
    /**Sprite*/
    var SwfSprite = (function (_super) {
        __extends(SwfSprite, _super);
        function SwfSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SwfSprite.prototype.getTextField = function (name) {
            return this.getChildByName(name);
        };
        SwfSprite.prototype.getMovie = function (name) {
            return this.getChildByName(name);
        };
        SwfSprite.prototype.getSprite = function (name) {
            return this.getChildByName(name);
        };
        SwfSprite.prototype.getImage = function (name) {
            return this.getChildByName(name);
        };
        SwfSprite.prototype.getButton = function (name) {
            return this.getChildByName(name);
        };
        return SwfSprite;
    }(egret.DisplayObjectContainer));
    starlingswf.SwfSprite = SwfSprite;
})(starlingswf || (starlingswf = {}));
/**
 * Created by zmliu on 14-5-11.
 */
var starlingswf;
(function (starlingswf) {
    /**
     * Swf文档类
     * */
    var Swf = (function () {
        function Swf(swfData, fps) {
            if (fps === void 0) { fps = 24; }
            this._swfData = swfData;
            this._createDisplayFuns = new Object();
            this._createDisplayFuns[Swf.dataKey_Sprite] = this.createSprite;
            this._createDisplayFuns[Swf.dataKey_MovieClip] = this.createMovie;
            this._createDisplayFuns[Swf.dataKey_Button] = this.createButton;
            this._createDisplayFuns[Swf.dataKey_Image] = this.createImage;
            this._createDisplayFuns[Swf.dataKey_Scale9] = this.createS9Image;
            this._createDisplayFuns[Swf.dataKey_ShapeImg] = this.createShapeImage;
            this._createDisplayFuns[Swf.dataKey_TextField] = this.createTextField;
            this.swfUpdateManager = starlingswf.SwfUpdateManager.createSwfUpdateManager(fps);
        }
        Swf.prototype.createSprite = function (name, data, sprData) {
            if (data === void 0) { data = null; }
            if (sprData === void 0) { sprData = null; }
            if (sprData == null) {
                sprData = this._swfData[Swf.dataKey_Sprite][name];
            }
            var sprite = new starlingswf.SwfSprite();
            var length = sprData.length;
            var objData;
            var display;
            var fun;
            var swf;
            for (var i = 0; i < length; i++) {
                objData = sprData[i];
                fun = this._createDisplayFuns[objData[1]];
                if (fun == null)
                    continue;
                display = fun.apply(this, [objData[0], objData]);
                display.name = objData[9];
                display.x = objData[2];
                display.y = objData[3];
                if (objData[1] == Swf.dataKey_TextField) {
                    display.y += 6;
                }
                if (objData[1] != Swf.dataKey_Scale9 && objData[1] != Swf.dataKey_ShapeImg) {
                    display.scaleX = objData[4];
                    display.scaleY = objData[5];
                }
                display.skewX = objData[6];
                display.skewY = objData[7];
                display.alpha = objData[8];
                sprite.addChild(display);
            }
            if (data != null) {
                starlingswf.SwfBlendMode.setBlendMode(sprite, data[11]);
            }
            return sprite;
        };
        Swf.prototype.createMovie = function (name, data) {
            if (data === void 0) { data = null; }
            var movieClipData = this._swfData[Swf.dataKey_MovieClip][name];
            var objectCountData = movieClipData["objCount"];
            var displayObjects = {};
            var displayObjectArray;
            var type;
            var count;
            var fun;
            var objName;
            for (objName in objectCountData) {
                type = objectCountData[objName][0];
                count = objectCountData[objName][1];
                displayObjectArray = displayObjects[objName] == null ? [] : displayObjects[objName];
                for (var i = 0; i < count; i++) {
                    fun = this._createDisplayFuns[type];
                    if (fun == null)
                        continue;
                    displayObjectArray.push(fun.apply(this, [objName, null]));
                }
                displayObjects[objName] = displayObjectArray;
            }
            var mc = new starlingswf.SwfMovieClip(movieClipData["frames"], movieClipData["labels"], displayObjects, this, movieClipData["frameEvents"]);
            mc.loop = movieClipData["loop"];
            if (data != null) {
                starlingswf.SwfBlendMode.setBlendMode(mc, data[11]);
            }
            return mc;
        };
        /**
         * 创建按钮
         * */
        Swf.prototype.createButton = function (name, data) {
            if (data === void 0) { data = null; }
            var sprData = this._swfData[Swf.dataKey_Button][name];
            var skin = this.createSprite(null, null, sprData);
            var button = new starlingswf.SwfButton(skin);
            return button;
        };
        Swf.prototype.createImage = function (name, data) {
            if (data === void 0) { data = null; }
            var imageData = this._swfData[Swf.dataKey_Image][name];
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(name);
            bitmap.anchorOffsetX = imageData[0];
            bitmap.anchorOffsetY = imageData[1];
            if (data != null) {
                starlingswf.SwfBlendMode.setBlendMode(bitmap, data[11]);
            }
            return bitmap;
        };
        Swf.prototype.createS9Image = function (name, data) {
            if (data === void 0) { data = null; }
            var scale9Data = this._swfData[Swf.dataKey_Scale9][name];
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(name);
            bitmap.scale9Grid = new egret.Rectangle(scale9Data[0], scale9Data[1], scale9Data[2], scale9Data[3]);
            if (data != null) {
                bitmap.width = data[10];
                bitmap.height = data[11];
                starlingswf.SwfBlendMode.setBlendMode(bitmap, data[13]);
            }
            return bitmap;
        };
        Swf.prototype.createShapeImage = function (name, data) {
            if (data === void 0) { data = null; }
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(name);
            bitmap.fillMode = egret.BitmapFillMode.REPEAT;
            if (data != null) {
                bitmap.width = data[10];
                bitmap.height = data[11];
                starlingswf.SwfBlendMode.setBlendMode(bitmap, data[13]);
            }
            return bitmap;
        };
        Swf.prototype.createTextField = function (name, data) {
            if (data === void 0) { data = null; }
            var textfield = new egret.TextField();
            if (data != null) {
                textfield.width = data[10];
                textfield.height = data[11];
                textfield.fontFamily = data[12];
                textfield.textColor = data[13];
                textfield.size = data[14];
                textfield.textAlign = data[15];
                //textfield.italic = data[16];
                //textfield.bold = data[17];
                textfield.text = data[18];
                this.createTextFieldFilter(textfield, data[19]);
                starlingswf.SwfBlendMode.setBlendMode(textfield, data[20]);
            }
            return textfield;
        };
        /** 创建文本的滤镜 */
        Swf.prototype.createTextFieldFilter = function (textField, filterObjects) {
            for (var filterName in filterObjects) {
                if (filterName == "flash.filters::GlowFilter") {
                    textField.stroke = filterObjects[filterName]["strength"];
                    textField.strokeColor = filterObjects[filterName]["color"];
                }
            }
        };
        return Swf;
    }());
    Swf.dataKey_Sprite = "spr";
    Swf.dataKey_Image = "img";
    Swf.dataKey_MovieClip = "mc";
    Swf.dataKey_TextField = "text";
    Swf.dataKey_Button = "btn";
    Swf.dataKey_Scale9 = "s9";
    Swf.dataKey_ShapeImg = "shapeImg";
    Swf.dataKey_Component = "comp";
    Swf.dataKey_Particle = "particle";
    starlingswf.Swf = Swf;
})(starlingswf || (starlingswf = {}));
var starlingswf;
(function (starlingswf) {
    var SwfAnalyzer = (function (_super) {
        __extends(SwfAnalyzer, _super);
        function SwfAnalyzer() {
            var _this = _super.call(this) || this;
            _this._dataFormat = egret.HttpResponseType.TEXT;
            return _this;
        }
        /**
         * 解析并缓存加载成功的数据
         */
        SwfAnalyzer.prototype.analyzeData = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            try {
                var str = data;
                this.fileDic[name] = new starlingswf.Swf(JSON.parse(str), 30);
            }
            catch (e) {
                egret.$warn(1017, resItem.url, data);
            }
        };
        return SwfAnalyzer;
    }(RES.BinAnalyzer));
    starlingswf.SwfAnalyzer = SwfAnalyzer;
})(starlingswf || (starlingswf = {}));
/**
 * Created by zmliu on 14-5-11.
 */
var starlingswf;
(function (starlingswf) {
    /** 动画更新管理器 */
    var SwfUpdateManager = (function () {
        function SwfUpdateManager() {
        }
        SwfUpdateManager.createSwfUpdateManager = function (fps) {
            var updateManager = new SwfUpdateManager();
            updateManager._animations = [];
            updateManager._addQueue = [];
            updateManager._removeQueue = [];
            updateManager._currentTime = 0;
            updateManager.setFps(fps);
            egret.Ticker.getInstance().register(updateManager.update, updateManager);
            return updateManager;
        };
        SwfUpdateManager.prototype.setFps = function (fps) {
            this._fps = fps;
            this._fpsTime = 1000 / fps;
        };
        SwfUpdateManager.prototype.addSwfAnimation = function (animation) {
            this._addQueue.push(animation);
        };
        SwfUpdateManager.prototype.removeSwfAnimation = function (animation) {
            this._removeQueue.push(animation);
        };
        SwfUpdateManager.prototype.updateAdd = function () {
            var len = this._addQueue.length;
            var index;
            var animation;
            for (var i = 0; i < len; i++) {
                animation = this._addQueue.pop();
                index = this._animations.indexOf(animation);
                if (index == -1) {
                    this._animations.push(animation);
                }
            }
        };
        SwfUpdateManager.prototype.updateRemove = function () {
            var len = this._removeQueue.length;
            var index;
            var animation;
            for (var i = 0; i < len; i++) {
                animation = this._removeQueue.pop();
                index = this._animations.indexOf(animation);
                if (index != -1) {
                    this._animations.splice(index, 1);
                }
            }
        };
        SwfUpdateManager.prototype.update = function (time) {
            this._currentTime += time;
            if (this._currentTime < this._fpsTime) {
                return;
            }
            this._currentTime -= this._fpsTime;
            if (this._currentTime > this._fpsTime) {
                this._currentTime = 0;
            }
            this.updateRemove();
            this.updateAdd();
            var len = this._animations.length;
            var ani;
            for (var i = 0; i < len; i++) {
                ani = this._animations[i];
                if (ani.getStage() != null)
                    ani.update();
            }
        };
        return SwfUpdateManager;
    }());
    starlingswf.SwfUpdateManager = SwfUpdateManager;
})(starlingswf || (starlingswf = {}));
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
        return SwfBlendMode;
    }());
    SwfBlendMode.modes = {
        "normal": true,
        "add": true
    };
    starlingswf.SwfBlendMode = SwfBlendMode;
})(starlingswf || (starlingswf = {}));
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
})(lzm || (lzm = {}));
var starlingswf;
(function (starlingswf) {
    var SwfButton = (function (_super) {
        __extends(SwfButton, _super);
        function SwfButton(skin) {
            var _this = _super.call(this) || this;
            _this.defScale = -1;
            _this.skin = skin;
            _this._w = _this.skin.width;
            _this._h = _this.skin.height;
            _this.addChild(skin);
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDown, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.mouseUp, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.mouseClick, _this);
            return _this;
        }
        SwfButton.prototype.mouseDown = function (evt) {
            this.skin.scaleX = 0.9;
            this.skin.scaleY = 0.9;
            this.skin.x = (1.0 - 0.9) / 2.0 * this._w;
            this.skin.y = (1.0 - 0.9) / 2.0 * this._h;
        };
        SwfButton.prototype.mouseUp = function (evt) {
            this.skin.scaleX = 1;
            this.skin.scaleY = 1;
            this.skin.x = this.skin.y = 0;
        };
        SwfButton.prototype.mouseClick = function (evt) {
            this.dispatchEventWith(starlingswf.SwfButton.onClick);
            if (SwfButton.defSound != null)
                SwfButton.defSound.play(0, 1);
        };
        SwfButton.prototype.setEnable = function (val) {
            this.touchEnabled = val;
            if (val) {
                this.alpha = 1;
            }
            else {
                this.alpha = 0.5;
            }
        };
        SwfButton.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.mouseUp, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mouseClick, this);
        };
        return SwfButton;
    }(starlingswf.SwfSprite));
    SwfButton.onClick = "SwfButton.onClick";
    starlingswf.SwfButton = SwfButton;
})(starlingswf || (starlingswf = {}));
/**
 * Created by zmliu on 14-5-11.
 */
var starlingswf;
(function (starlingswf) {
    var SwfMovieClip = (function (_super) {
        __extends(SwfMovieClip, _super);
        function SwfMovieClip(frames, labels, displayObjects, ownerSwf, frameEvents) {
            if (frameEvents === void 0) { frameEvents = null; }
            var _this = _super.call(this) || this;
            _this._isPlay = false;
            _this.loop = true;
            _this._completeFunction = null; //播放完毕的回调
            _this._hasCompleteListener = false; //是否监听过播放完毕的事件
            _this._frames = frames;
            _this._labels = labels;
            _this._displayObjects = displayObjects;
            _this._frameEvents = frameEvents;
            _this._startFrame = 0;
            _this._endFrame = _this._frames.length - 1;
            _this._ownerSwf = ownerSwf;
            _this.setCurrentFrame(0);
            _this.play();
            return _this;
        }
        SwfMovieClip.prototype.getStage = function () {
            if (this.visible) {
                return this.stage;
            }
            return null;
        };
        SwfMovieClip.prototype.update = function () {
            if (!this._isPlay)
                return;
            if (this._currentFrame >= this._endFrame) {
                var isReturn = false;
                if (!this.loop || this._startFrame == this._endFrame) {
                    if (this._ownerSwf)
                        this.stop(false);
                    isReturn = true;
                }
                if (this._completeFunction)
                    this._completeFunction(this);
                if (this._hasCompleteListener)
                    this.dispatchEventWith(egret.Event.COMPLETE);
                if (isReturn)
                    return;
                this._currentFrame = this._startFrame;
            }
            else {
                this._currentFrame++;
            }
            this.setCurrentFrame(this._currentFrame);
        };
        SwfMovieClip.prototype.setCurrentFrame = function (frame) {
            //dirty hack this.removeChildren();
            // this.$children.length = 0;
            this.removeAllChilds();
            this._currentFrame = frame;
            this.__frameInfos = this._frames[this._currentFrame];
            var data;
            var display;
            var textfield;
            var useIndex;
            var length = this.__frameInfos.length;
            for (var i = 0; i < length; i++) {
                data = this.__frameInfos[i];
                useIndex = data[10];
                display = this._displayObjects[data[0]][useIndex];
                display.$setSkewX(data[6]);
                display.$setSkewY(data[7]);
                ;
                display.$setAlpha(data[8]);
                display.name = data[9];
                //                if(data[1] == Swf.dataKey_Particle){
                //                    display["setPostion"](data[2],data[3]);
                //                }else{
                display.$setX(data[2]);
                display.$setY(data[3]);
                //                }
                switch (data[1]) {
                    case starlingswf.Swf.dataKey_Scale9:
                        display.width = data[11];
                        display.height = data[12];
                        starlingswf.SwfBlendMode.setBlendMode(display, data[13]);
                        break;
                    case starlingswf.Swf.dataKey_ShapeImg:
                        display.width = data[11];
                        display.height = data[12];
                        starlingswf.SwfBlendMode.setBlendMode(display, data[13]);
                        break;
                    case starlingswf.Swf.dataKey_TextField:
                        textfield = display;
                        textfield.width = data[11];
                        textfield.height = data[12];
                        textfield.fontFamily = data[13];
                        textfield.textColor = data[14];
                        textfield.size = data[15];
                        textfield.textAlign = data[16];
                        //                        textfield["italic"] = data[17];
                        //                        textfield["bold"] = data[18];
                        if (data[19] && data[19] != "\r" && data[19] != "") {
                            textfield.text = data[19];
                        }
                        starlingswf.SwfBlendMode.setBlendMode(textfield, data[20]);
                        break;
                    default:
                        display.$setScaleX(data[4]);
                        display.$setScaleY(data[5]);
                        starlingswf.SwfBlendMode.setBlendMode(display, data[11]);
                        break;
                }
                this.$doAddChild(display, length, false);
            }
            if (this._frameEvents != null && this._frameEvents[this._currentFrame] != null) {
                this.dispatchEventWith(this._frameEvents[this._currentFrame]);
            }
        };
        SwfMovieClip.prototype.getCurrentFrame = function () {
            return this._currentFrame;
        };
        /**
         * 播放
         * */
        SwfMovieClip.prototype.play = function () {
            this._isPlay = true;
            this._ownerSwf.swfUpdateManager.addSwfAnimation(this);
            var k;
            var arr;
            var l;
            for (k in this._displayObjects) {
                if (k.indexOf(starlingswf.Swf.dataKey_MovieClip) == 0) {
                    arr = this._displayObjects[k];
                    l = arr.length;
                    for (var i = 0; i < l; i++) {
                        arr[i].play();
                    }
                }
            }
        };
        /**
         * 停止
         * @param	stopChild	是否停止子动画
         * */
        SwfMovieClip.prototype.stop = function (stopChild) {
            if (stopChild === void 0) { stopChild = true; }
            this._isPlay = false;
            this._ownerSwf.swfUpdateManager.removeSwfAnimation(this);
            if (!stopChild)
                return;
            var k;
            var arr;
            var l;
            for (k in this._displayObjects) {
                if (k.indexOf(starlingswf.Swf.dataKey_MovieClip) == 0) {
                    arr = this._displayObjects[k];
                    l = arr.length;
                    for (var i = 0; i < l; i++) {
                        arr[i].stop(stopChild);
                    }
                }
            }
        };
        SwfMovieClip.prototype.gotoAndStop = function (frame, stopChild) {
            if (stopChild === void 0) { stopChild = true; }
            this.goTo(frame);
            this.stop(stopChild);
        };
        SwfMovieClip.prototype.gotoAndPlay = function (frame) {
            this.goTo(frame);
            this.play();
        };
        SwfMovieClip.prototype.goTo = function (frame) {
            if (typeof (frame) == "string") {
                var labelData = this.getLabelData(frame);
                this._currentLabel = labelData[0];
                this._currentFrame = this._startFrame = labelData[1];
                this._endFrame = labelData[2];
            }
            else if (typeof (frame) == "number") {
                this._currentFrame = this._startFrame = frame;
                this._endFrame = this._frames.length - 1;
            }
            this.setCurrentFrame(this._currentFrame);
        };
        SwfMovieClip.prototype.getLabelData = function (label) {
            var length = this._labels.length;
            var labelData;
            for (var i = 0; i < length; i++) {
                labelData = this._labels[i];
                if (labelData[0] == label) {
                    return labelData;
                }
            }
            return null;
        };
        /**
         * 是否再播放
         * */
        SwfMovieClip.prototype.isPlay = function () {
            return this._isPlay;
        };
        /**
         * 总共有多少帧
         * */
        SwfMovieClip.prototype.totalFrames = function () {
            return this._frames.length;
        };
        /**
         * 返回当前播放的是哪一个标签
         * */
        SwfMovieClip.prototype.currentLabel = function () {
            return this._currentLabel;
        };
        /**
         * 获取所有标签
         * */
        SwfMovieClip.prototype.labels = function () {
            var length = this._labels.length;
            var returnLabels = [];
            for (var i = 0; i < length; i++) {
                returnLabels.push(this._labels[i][0]);
            }
            return returnLabels;
        };
        /**
         * 是否包含某个标签
         * */
        SwfMovieClip.prototype.hasLabel = function (label) {
            var ls = this.labels();
            return !(ls.indexOf(label) == -1);
        };
        SwfMovieClip.prototype.addEventListener1 = function (type, listener, thisObject, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            this.addEventListener(type, listener, thisObject, useCapture, priority);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE);
        };
        SwfMovieClip.prototype.removeEventListener1 = function (type, listener, thisObject, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.removeEventListener(type, listener, thisObject, useCapture);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE);
        };
        SwfMovieClip.prototype.removeAllChilds = function () {
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.$doRemoveChild(i, false);
            }
        };
        return SwfMovieClip;
    }(starlingswf.SwfSprite));
    starlingswf.SwfMovieClip = SwfMovieClip;
})(starlingswf || (starlingswf = {}));
var lzm;
(function (lzm) {
    var Alert = (function () {
        function Alert() {
        }
        Alert.init = function (root, stageWidth, stageHeight) {
            lzm.Alert.root = root;
            lzm.Alert.stageWidth = stageWidth;
            lzm.Alert.stageHeight = stageHeight;
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
                lzm.Alert.background.alpha = 0.5;
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
            lzm.Alert.alert(display, false);
            display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;
            display.rotation = 90;
            display.x = lzm.Alert.stageWidth / 2;
            display.y = lzm.Alert.stageHeight / 2;
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
        return Alert;
    }());
    Alert.dialogs = [];
    lzm.Alert = Alert;
})(lzm || (lzm = {}));
var lzm;
(function (lzm) {
    var HttpClient = (function () {
        function HttpClient() {
        }
        /**
         * 请求url
         */
        HttpClient.send = function (url, params, completeFunction, timeoutFunction, method) {
            if (completeFunction === void 0) { completeFunction = null; }
            if (timeoutFunction === void 0) { timeoutFunction = null; }
            if (method === void 0) { method = "get"; }
            var request = new egret.HttpRequest();
            var parStr = lzm.HttpClient.getRequestPars(params);
            var callback = function (e) {
                request.removeEventListener(egret.Event.COMPLETE, callback, request);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, timeout, request);
                if (completeFunction != null) {
                    completeFunction(request.response);
                }
            };
            var timeout = function (e) {
                request.removeEventListener(egret.Event.COMPLETE, callback, request);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, timeout, request);
                if (timeoutFunction != null) {
                    timeoutFunction(request.response);
                }
            };
            request.addEventListener(egret.Event.COMPLETE, callback, request);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, timeout, request);
            request.responseType = egret.HttpResponseType.TEXT;
            if (method == "get") {
                request.open(url + "?" + parStr, egret.HttpMethod.GET);
                request.send();
            }
            else if (method == "post") {
                request.open(url, egret.HttpMethod.POST);
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send(parStr);
            }
        };
        HttpClient.getRequestPars = function (params) {
            var pars = "";
            var k;
            for (k in params) {
                pars += k + "=" + params[k] + "&";
            }
            return pars.substr(0, pars.length - 1);
        };
        return HttpClient;
    }());
    lzm.HttpClient = HttpClient;
})(lzm || (lzm = {}));
var lzm;
(function (lzm) {
    var JSONWebSocketClient = (function () {
        function JSONWebSocketClient(host, port) {
            this.isConnect = false;
            this.host = host;
            this.port = port;
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketIOError, this);
        }
        JSONWebSocketClient.prototype.connect = function () {
            this.socket.connect(this.host, this.port);
        };
        JSONWebSocketClient.prototype.sendData = function (data) {
            this.socket.writeUTF(JSON.stringify(data));
        };
        JSONWebSocketClient.prototype.onSocketOpen = function () {
            this.isConnect = true;
            if (this.onConnectCallBack != null)
                this.onConnectCallBack();
        };
        JSONWebSocketClient.prototype.onReceiveMessage = function (e) {
            var msg = this.socket.readUTF();
            if (this.onDataCallBack != null)
                this.onDataCallBack(JSON.parse(msg));
        };
        JSONWebSocketClient.prototype.onSocketClose = function (e) {
            this.isConnect = false;
            if (this.onCloseCallBack != null)
                this.onCloseCallBack();
        };
        JSONWebSocketClient.prototype.onSocketIOError = function (e) {
            if (this.onIOErrorCallBack != null)
                this.onIOErrorCallBack();
        };
        JSONWebSocketClient.prototype.dispose = function () {
            this.socket.close();
            this.onConnectCallBack = null;
            this.onIOErrorCallBack = null;
            this.onCloseCallBack = null;
            this.onDataCallBack = null;
        };
        return JSONWebSocketClient;
    }());
    lzm.JSONWebSocketClient = JSONWebSocketClient;
})(lzm || (lzm = {}));

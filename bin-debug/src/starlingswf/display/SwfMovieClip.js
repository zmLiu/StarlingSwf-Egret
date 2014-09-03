var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by zmliu on 14-5-11.
*/
var starlingswf;
(function (starlingswf) {
    var SwfMovieClip = (function (_super) {
        __extends(SwfMovieClip, _super);
        function SwfMovieClip(frames, labels, displayObjects, ownerSwf, frameEvents) {
            if (typeof frameEvents === "undefined") { frameEvents = null; }
            _super.call(this);
            this._isPlay = false;
            this.loop = true;
            this._completeFunction = null;
            this._hasCompleteListener = false;

            this._frames = frames;
            this._labels = labels;
            this._displayObjects = displayObjects;
            this._frameEvents = frameEvents;

            this._startFrame = 0;
            this._endFrame = this._frames.length - 1;
            this._ownerSwf = ownerSwf;

            this.setCurrentFrame(0);
            this.play();
        }
        SwfMovieClip.prototype.update = function () {
            if (!this._isPlay)
                return;

            if (this._currentFrame > this._endFrame) {
                if (this._hasCompleteListener)
                    this.dispatchEventWith(egret.Event.COMPLETE);

                this._currentFrame = this._startFrame;

                if (!this.loop) {
                    if (this._ownerSwf)
                        this.stop(false);
                    return;
                }

                if (this._startFrame == this._endFrame) {
                    if (this._ownerSwf)
                        this.stop(false);
                    return;
                }
                this.setCurrentFrame(this._startFrame);
            } else {
                this.setCurrentFrame(this._currentFrame);
                this._currentFrame += 1;
            }
        };

        SwfMovieClip.prototype.setCurrentFrame = function (frame) {
            //dirty hack this.removeChildren();
            this._children.length = 0;

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

                display._skewX = data[6];
                display._skewY = data[7];
                display._alpha = data[8];
                display.name = data[9];

                //                if(data[1] == Swf.dataKey_Particle){
                //                    display["setPostion"](data[2],data[3]);
                //                }else{
                display._x = data[2];
                display._y = data[3];

                //                }
                if (data[1] == starlingswf.Swf.dataKey_Scale9) {
                    display.width = data[11];
                    display.height = data[12];
                } else {
                    display._scaleX = data[4];
                    display._scaleY = data[5];
                }

                //dirty hack  this.addChild(display);
                this._children.push(display);
                display._parent = this;

                if (data[1] == starlingswf.Swf.dataKey_TextField) {
                    textfield = display;
                    textfield.width = data[11];
                    textfield.height = data[12];
                    textfield.fontFamily = data[13];
                    textfield.textColor = data[14];
                    textfield.size = data[15];
                    textfield.textAlign = data[16];

                    //                    textfield["italic"] = data[17];
                    //                    textfield["bold"] = data[18];
                    if (data[19] && data[19] != "\r" && data[19] != "") {
                        textfield.text = data[19];
                    }
                }
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
            if (typeof stopChild === "undefined") { stopChild = true; }
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
            if (typeof stopChild === "undefined") { stopChild = true; }
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
            } else if (typeof (frame) == "number") {
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

        SwfMovieClip.prototype.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            if (typeof priority === "undefined") { priority = 0; }
            _super.prototype.addEventListener.call(this, type, listener, thisObject, useCapture, priority);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE);
        };

        SwfMovieClip.prototype.removeEventListener = function (type, listener, thisObject, useCapture) {
            if (typeof useCapture === "undefined") { useCapture = false; }
            _super.prototype.removeEventListener.call(this, type, listener, thisObject, useCapture);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE);
        };
        return SwfMovieClip;
    })(starlingswf.SwfSprite);
    starlingswf.SwfMovieClip = SwfMovieClip;
    SwfMovieClip.prototype.__class__ = "starlingswf.SwfMovieClip";
})(starlingswf || (starlingswf = {}));

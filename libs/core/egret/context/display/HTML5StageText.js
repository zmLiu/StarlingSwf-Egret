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
var egret;
(function (egret) {
    /**
    * @class egret.StageText
    * @classdesc
    * @extends egret.HashObject
    */
    var HTML5StageText = (function (_super) {
        __extends(HTML5StageText, _super);
        function HTML5StageText() {
            _super.call(this);
            this._size = 30;
            this._isShow = true;
            this._text = "";
            this._inputType = "";
            this._canUse = false;
        }
        /**
        * @method egret.StageText#getText
        * @returns {string}
        */
        HTML5StageText.prototype._getText = function () {
            return this._isShow ? this.inputElement.value : this._text;
        };

        /**
        * @method egret.StageText#setText
        * @param value {string}
        */
        HTML5StageText.prototype._setText = function (value) {
            this._isShow ? this.inputElement.value = value : this._text = value;
        };

        /**
        * @method egret.StageText#setTextType
        * @param type {string}
        */
        HTML5StageText.prototype._setTextType = function (type) {
            this.inputElement.type = type;
        };

        /**
        * @method egret.StageText#getTextType
        * @returns {string}
        */
        HTML5StageText.prototype._getTextType = function () {
            return this.inputElement.type;
        };

        HTML5StageText.prototype._setMultiline = function (value) {
            _super.prototype._setMultiline.call(this, value);

            this._createInput();
        };

        /**
        * @method egret.StageText#open
        * @param x {number}
        * @param y {number}
        * @param width {number}
        * @param height {number}
        */
        HTML5StageText.prototype._open = function (x, y, width, height) {
            if (typeof width === "undefined") { width = 160; }
            if (typeof height === "undefined") { height = 21; }
            var scaleX = egret.StageDelegate.getInstance().getScaleX();
            var scaleY = egret.StageDelegate.getInstance().getScaleY();

            var div = egret.Browser.getInstance().$new("div");
            div.position.x = x * scaleX;
            div.position.y = y * scaleY;
            div.style.width = width + "px";
            div.scale.x = scaleX;
            div.scale.y = scaleY;
            div.transforms();
            div.style[egret_dom.getTrans("transformOrigin")] = "0% 0% 0px";

            var stageDelegateDiv = this.getStageDelegateDiv();
            stageDelegateDiv.appendChild(div);

            this.div = div;

            this._createInput();

            if (div && !div.parentNode) {
                var stageDelegateDiv = this.getStageDelegateDiv();
                stageDelegateDiv.appendChild(div);
            }
            div.style.display = "block";

            this._call = this.onHandler.bind(this);
        };

        HTML5StageText.prototype._createInput = function () {
            var isChanged = false;

            var inputElement;
            if (this._multiline && this._inputType != "textarea") {
                isChanged = true;
                this._inputType = "textarea";
                inputElement = document.createElement("textarea");
            } else if (!this._multiline && this._inputType != "input") {
                isChanged = true;
                this._inputType = "input";
                inputElement = document.createElement("input");
            }

            if (isChanged) {
                inputElement.type = "text";
                inputElement.style.fontSize = this._size + "px";
                inputElement.style.lineHeight = this._size + "px";
                inputElement.style.textAlign = "left";
                inputElement.style.fontFamily = "Arial";
                inputElement.style.fontStyle = "normal";
                inputElement.style.fontWeight = "normal";

                inputElement.style.color = "#FFFFFF";
                inputElement.style.border = "none";
                inputElement.style.background = "none";
                inputElement.style.width = this.div.style.width;
                inputElement.style.padding = "0";
                inputElement.style.outline = "medium";

                if (this.inputElement && this.inputElement.parentNode) {
                    this.inputElement.parentNode.removeChild(this.inputElement);
                    this._removeListeners();
                    this.inputElement = inputElement;
                    this._addListeners();
                } else {
                    this.inputElement = inputElement;
                }
                this.div.appendChild(inputElement);
            }
        };

        HTML5StageText.prototype._addListeners = function () {
            if (window.navigator.msPointerEnabled) {
                this.addListener("MSPointerDown");
                this.addListener("MSPointerUp");
            } else if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
                this.addListener("touchstart");
                this.addListener("touchend");
                this.addListener("touchcancel");
            } else if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                this.addListener("mousedown");
                this.addListener("mouseup");
            }

            this.addListener("focus");
            this.addListener("blur");

            this._isShow = true;
            this._closeInput();
            this.closeKeyboard();
        };

        HTML5StageText.prototype._removeListeners = function () {
            if (window.navigator.msPointerEnabled) {
                this.removeListener("MSPointerDown");
                this.removeListener("MSPointerUp");
            } else if (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE) {
                this.removeListener("touchstart");
                this.removeListener("touchend");
                this.removeListener("touchcancel");
            } else if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                this.removeListener("mousedown");
                this.removeListener("mouseup");
            }
            this.removeListener("blur");
            this.removeListener("focus");
        };

        HTML5StageText.prototype.addListener = function (type) {
            this.inputElement.addEventListener(type, this._call);
        };

        HTML5StageText.prototype.removeListener = function (type) {
            this.inputElement.removeEventListener(type, this._call);
        };

        HTML5StageText.prototype.onHandler = function (e) {
            e["isScroll"] = true;
            if (e.type == "blur") {
                this.dispatchEvent(new egret.Event("blur"));

                this._closeInput();
            } else if (e.type == "focus") {
                if (this._canUse) {
                    this._canUse = false;
                    this._openInput();

                    this.dispatchEvent(new egret.Event("focus"));
                } else {
                    e["isScroll"] = false;

                    this.inputElement.blur();
                }
            } else if (e.type == "touchstart" || e.type == "mousedown" || e.type == "MSPointerDown") {
                if (this._isShow) {
                    e.stopPropagation();
                }
            }
        };

        /**
        * @method egret.StageText#add
        */
        HTML5StageText.prototype._show = function () {
            this._canUse = true;
        };

        HTML5StageText.prototype._hide = function () {
            this._canUse = false;

            this._closeInput();
            this.closeKeyboard();
        };

        HTML5StageText.prototype._openInput = function () {
            if (!this._isShow) {
                this._isShow = true;
                this.inputElement.value = this._text;
            }
        };

        HTML5StageText.prototype._closeInput = function () {
            if (this._isShow) {
                this._isShow = false;
                this._text = this.inputElement.value;
                this.inputElement.value = "";
            }
        };

        HTML5StageText.prototype.closeKeyboard = function () {
            this.inputElement.focus();
            this.inputElement.blur();
        };

        HTML5StageText.prototype.getStageDelegateDiv = function () {
            var stageDelegateDiv = egret.Browser.getInstance().$("#StageDelegateDiv");
            if (!stageDelegateDiv) {
                stageDelegateDiv = egret.Browser.getInstance().$new("div");
                stageDelegateDiv.id = "StageDelegateDiv";

                //                stageDelegateDiv.style["top"] = egret.StageDelegate.getInstance().getOffSetY() + "px";
                var container = document.getElementById(egret.StageDelegate.canvas_div_name);
                container.appendChild(stageDelegateDiv);
                stageDelegateDiv.transforms();
            }
            return stageDelegateDiv;
        };

        /**
        * @method egret.StageText#remove
        */
        HTML5StageText.prototype._remove = function () {
            var div = this.div;
            if (div && div.parentNode) {
                div.parentNode.removeChild(div);
            }
        };

        HTML5StageText.prototype.changePosition = function (x, y) {
            var scaleX = egret.StageDelegate.getInstance().getScaleX();
            var scaleY = egret.StageDelegate.getInstance().getScaleY();

            this.div.position.x = x * scaleX;
            this.div.position.y = y * scaleY;
            this.div.transforms();
        };

        HTML5StageText.prototype.changeSize = function (width, height) {
            this.inputElement.style.width = width + "px";

            this.div.style.width = width + "px";
            this.div.transforms();
        };

        HTML5StageText.prototype.setSize = function (value) {
            this._size = value;
            this.inputElement.style.fontSize = this._size + "px";
        };

        HTML5StageText.prototype.setTextColor = function (value) {
            this.inputElement.style.color = value;
        };

        HTML5StageText.prototype.setTextFontFamily = function (value) {
            this.inputElement.style.fontFamily = value;
        };

        HTML5StageText.prototype.setWidth = function (value) {
            this.inputElement.style.width = value + "px";
        };

        HTML5StageText.prototype.setHeight = function (value) {
            this.inputElement.style.height = value + "px";
        };
        return HTML5StageText;
    })(egret.StageText);
    egret.HTML5StageText = HTML5StageText;
    HTML5StageText.prototype.__class__ = "egret.HTML5StageText";
})(egret || (egret = {}));

egret.StageText.create = function () {
    return new egret.HTML5StageText();
};

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
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            _super.call(this);
            this._isFocus = false;
            /**
            * 字号
            * @member {number} egret.TextField#size
            */
            this._size = 30;
            this._textColorString = "#FFFFFF";
            this._textColor = 0xFFFFFF;
            /**
            * 字体
            * @member {any} egret.TextField#fontFamily
            */
            this._fontFamily = "Arial";
            this._multiline = false;
            this._text = new egret.TextField();
            this.addChild(this._text);
            this._text.size = 30;

            this.stageText = egret.StageText.create();
            var point = this.localToGlobal();
            this.stageText._open(point.x, point.y, this._explicitWidth, this._explicitHeight);
        }
        TextInput.prototype._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);

            this.graphics.beginFill(0xffffff, 0);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.graphics.endFill();

            this.touchEnabled = true;

            this.stageText._addListeners();

            this.stageText.addEventListener("blur", this.onBlurHandler, this);
            this.stageText.addEventListener("focus", this.onFocusHandler, this);
            this.stageText.addEventListener("updateText", this.updateTextHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this);
        };

        TextInput.prototype.onFocusHandler = function (event) {
            this.hideText();
        };

        //显示文本
        TextInput.prototype.onBlurHandler = function (event) {
            this.showText();
        };

        //点中文本
        TextInput.prototype.onMouseDownHandler = function (event) {
            event.stopPropagation();

            this.stageText._show();
        };

        //未点中文本
        TextInput.prototype.onStageDownHandler = function (event) {
            this.stageText._hide();

            this.showText();
        };

        TextInput.prototype.showText = function () {
            if (this._isFocus) {
                this._isFocus = false;
                this._text.visible = true;

                this.resetText();
            }
        };

        TextInput.prototype.hideText = function () {
            if (!this._isFocus) {
                this._text.visible = false;
                this._isFocus = true;
            }
        };

        TextInput.prototype._onRemoveFromStage = function () {
            _super.prototype._onRemoveFromStage.call(this);

            this.stageText._remove();
            this.stageText._removeListeners();

            this.stageText.removeEventListener("blur", this.onBlurHandler, this);
            this.stageText.removeEventListener("focus", this.onFocusHandler, this);
            this.stageText.removeEventListener("updateText", this.updateTextHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this);
        };

        TextInput.prototype.updateTextHandler = function (event) {
            this.resetText();
        };

        /**
        * @deprecated
        * @param value
        */
        TextInput.prototype.setText = function (value) {
            egret.Logger.warning("TextInput.setText()已废弃，请使用TextInput.text设置");
            this.stageText._setText(value);

            this.resetText();
        };

        /**
        * @deprecated
        * @returns {string}
        */
        TextInput.prototype.getText = function () {
            egret.Logger.warning("TextInput.getText()已废弃，请使用TextInput.text获取");
            return this.stageText._getText();
        };


        Object.defineProperty(TextInput.prototype, "text", {
            get: function () {
                return this.stageText._getText();
            },
            set: function (value) {
                this.stageText._setText(value);

                this.resetText();
            },
            enumerable: true,
            configurable: true
        });

        TextInput.prototype.setTextType = function (type) {
            this.stageText._setTextType(type);

            this.resetText();
        };

        TextInput.prototype.getTextType = function () {
            return this.stageText._getTextType();
        };

        TextInput.prototype.resetText = function () {
            if (this.getTextType() == "password") {
                this._text.text = "";
                for (var i = 0, num = this.stageText._getText().length; i < num; i++) {
                    this._text.text += "*";
                }
            } else {
                this._text.text = this.stageText._getText();
            }
        };

        TextInput.prototype._updateTransform = function () {
            //todo 等待worldTransform的性能优化完成，合并这块代码
            var oldTransFormA = this._worldTransform.a;
            var oldTransFormB = this._worldTransform.b;
            var oldTransFormC = this._worldTransform.c;
            var oldTransFormD = this._worldTransform.d;
            var oldTransFormTx = this._worldTransform.tx;
            var oldTransFormTy = this._worldTransform.ty;
            _super.prototype._updateTransform.call(this);
            var newTransForm = this._worldTransform;
            if (oldTransFormA != newTransForm.a || oldTransFormB != newTransForm.b || oldTransFormC != newTransForm.c || oldTransFormD != newTransForm.d || oldTransFormTx != newTransForm.tx || oldTransFormTy != newTransForm.ty) {
                var point = this.localToGlobal();
                this.stageText.changePosition(point.x, point.y);
                this.stageText.changeSize(this._explicitWidth, this._explicitHeight);
            }
        };

        TextInput.prototype._draw = function (renderContext) {
            _super.prototype._draw.call(this, renderContext);
            this.stageText._draw();
        };

        Object.defineProperty(TextInput.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (value) {
                if (this._size != value) {
                    this._size = value;
                    this._text.size = value;
                    this.stageText.setSize(this._size);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextInput.prototype, "textColor", {
            /**
            * 文字颜色
            * @member {number} egret.TextField#textColor
            */
            get: function () {
                return this._textColor;
            },
            set: function (value) {
                if (this._textColor != value) {
                    this._textColor = value;
                    this._textColorString = egret.toColorString(value);
                    this._text.textColor = value;
                    this.stageText.setTextColor(this._textColorString);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TextInput.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily;
            },
            set: function (value) {
                this._setFontFamily(value);
            },
            enumerable: true,
            configurable: true
        });


        TextInput.prototype._setFontFamily = function (value) {
            if (this._fontFamily != value) {
                this._fontFamily = value;
                this.stageText.setTextFontFamily(value);
            }
        };

        TextInput.prototype._setWidth = function (value) {
            this._text.width = value;
            this.stageText.setWidth(value);

            _super.prototype._setWidth.call(this, value);
        };

        TextInput.prototype._setHeight = function (value) {
            this._text.height = value;
            this.stageText.setHeight(value);

            _super.prototype._setHeight.call(this, value);
        };

        TextInput.prototype._setMultiline = function (value) {
            this._multiline = value;
            this.stageText._setMultiline(value);
        };

        Object.defineProperty(TextInput.prototype, "multiline", {
            /**
            * 表示字段是否为多行文本字段。如果值为 true，则文本字段为多行文本字段；如果值为 false，则文本字段为单行文本字段。在类型为 TextFieldType.INPUT 的字段中，multiline 值将确定 Enter 键是否创建新行（如果值为 false，则将忽略 Enter 键）。如果将文本粘贴到其 multiline 值为 false 的 TextField 中，则文本中将除去新行。
            * 默认值为 false。
            * @returns {boolean}
            */
            get: function () {
                return this._multiline;
            },
            set: function (value) {
                this._setMultiline(value);
            },
            enumerable: true,
            configurable: true
        });
        return TextInput;
    })(egret.Sprite);
    egret.TextInput = TextInput;
    TextInput.prototype.__class__ = "egret.TextInput";
})(egret || (egret = {}));

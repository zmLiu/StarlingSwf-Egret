/**
 * Created by zmliu on 14-5-11.
 */
declare module starlingswf {
    /**Sprite*/
    class SwfSprite extends egret.DisplayObjectContainer {
        getTextField(name: string): egret.TextField;
        getMovie(name: string): starlingswf.SwfMovieClip;
        getSprite(name: string): starlingswf.SwfSprite;
        getImage(name: string): egret.Bitmap;
        getButton(name: string): starlingswf.SwfButton;
    }
}
/**
 * Created by zmliu on 14-5-11.
 */
declare module starlingswf {
    /**
     * 动画接口
     * */
    interface ISwfAnimation {
        update(): void;
        getStage(): egret.Stage;
    }
}
/**
 * Created by zmliu on 14-5-11.
 */
declare module starlingswf {
    /**
     * Swf文档类
     * */
    class Swf {
        static dataKey_Sprite: string;
        static dataKey_Image: string;
        static dataKey_MovieClip: string;
        static dataKey_TextField: string;
        static dataKey_Button: string;
        static dataKey_Scale9: string;
        static dataKey_ShapeImg: string;
        static dataKey_Component: string;
        static dataKey_Particle: string;
        private _createDisplayFuns;
        private _swfData;
        swfUpdateManager: starlingswf.SwfUpdateManager;
        constructor(swfData: Object, fps?: number);
        createSprite(name: string, data?: any[], sprData?: any[]): starlingswf.SwfSprite;
        createMovie(name: string, data?: any[]): starlingswf.SwfMovieClip;
        /**
         * 创建按钮
         * */
        createButton(name: string, data?: any[]): starlingswf.SwfButton;
        createImage(name: string, data?: any[]): egret.Bitmap;
        createS9Image(name: string, data?: any[]): egret.Bitmap;
        createShapeImage(name: string, data?: any[]): egret.Bitmap;
        createTextField(name: String, data?: any[]): egret.TextField;
        /** 创建文本的滤镜 */
        createTextFieldFilter(textField: egret.TextField, filterObjects: Object): void;
    }
}
declare module starlingswf {
    class SwfAnalyzer extends RES.BinAnalyzer {
        constructor();
        /**
         * 解析并缓存加载成功的数据
         */
        analyzeData(resItem: RES.ResourceItem, data: any): void;
    }
}
/**
 * Created by zmliu on 14-5-11.
 */
declare module starlingswf {
    /** 动画更新管理器 */
    class SwfUpdateManager {
        private _animations;
        private _addQueue;
        private _removeQueue;
        private _fps;
        private _fpsTime;
        private _currentTime;
        static createSwfUpdateManager(fps: number): SwfUpdateManager;
        setFps(fps: number): void;
        addSwfAnimation(animation: starlingswf.ISwfAnimation): void;
        removeSwfAnimation(animation: starlingswf.ISwfAnimation): void;
        private updateAdd();
        private updateRemove();
        private update(time);
    }
}
/**
 * Created by zmliu on 14-9-25.
 */
declare module starlingswf {
    class SwfBlendMode {
        static modes: Object;
        static setBlendMode(display: egret.DisplayObject, blendMode: string): void;
    }
}
declare module lzm {
    class BasePanel extends egret.DisplayObjectContainer {
        constructor();
        addToStage(e: egret.Event): void;
        removeFromStage(e: egret.Event): void;
        gotoPanel(panel: lzm.BasePanel): void;
        dispose(): void;
    }
}
declare module starlingswf {
    class SwfButton extends starlingswf.SwfSprite {
        static onClick: string;
        static defSound: egret.Sound;
        skin: egret.DisplayObject;
        defScale: number;
        private _w;
        private _h;
        constructor(skin: egret.DisplayObject);
        mouseDown(evt: egret.TouchEvent): void;
        mouseUp(evt: egret.TouchEvent): void;
        mouseClick(evt: egret.TouchEvent): void;
        setEnable(val: boolean): void;
        dispose(): void;
    }
}
/**
 * Created by zmliu on 14-5-11.
 */
declare module starlingswf {
    class SwfMovieClip extends starlingswf.SwfSprite implements starlingswf.ISwfAnimation {
        private _ownerSwf;
        private _frames;
        private _labels;
        private _frameEvents;
        private _displayObjects;
        private _startFrame;
        private _endFrame;
        private _currentFrame;
        private _currentLabel;
        private _isPlay;
        loop: boolean;
        private _completeFunction;
        private _hasCompleteListener;
        constructor(frames: any[], labels: any[], displayObjects: Object, ownerSwf: starlingswf.Swf, frameEvents?: Object);
        getStage(): egret.Stage;
        update(): void;
        private __frameInfos;
        setCurrentFrame(frame: number): void;
        getCurrentFrame(): number;
        /**
         * 播放
         * */
        play(): void;
        /**
         * 停止
         * @param	stopChild	是否停止子动画
         * */
        stop(stopChild?: boolean): void;
        gotoAndStop(frame: Object, stopChild?: boolean): void;
        gotoAndPlay(frame: Object): void;
        private goTo(frame);
        private getLabelData(label);
        /**
         * 是否再播放
         * */
        isPlay(): boolean;
        /**
         * 总共有多少帧
         * */
        totalFrames(): number;
        /**
         * 返回当前播放的是哪一个标签
         * */
        currentLabel(): string;
        /**
         * 获取所有标签
         * */
        labels(): any[];
        /**
         * 是否包含某个标签
         * */
        hasLabel(label: String): Boolean;
        addEventListener1(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;
        removeEventListener1(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
        private removeAllChilds();
    }
}
declare module lzm {
    class Alert {
        private static background;
        private static dialogs;
        private static root;
        private static stageWidth;
        private static stageHeight;
        private static alertScale;
        static init(root: egret.DisplayObjectContainer, stageWidth: number, stageHeight: number, alertScale: number): void;
        private static container();
        private static width();
        private static height();
        private static initBackGround();
        static show(display: egret.DisplayObject): void;
        static alertLandscape(display: egret.DisplayObject): void;
        static alert(dialog: egret.DisplayObject, setXY?: boolean): void;
        private static dialogAddToStage(e);
        private static dialogRemoveFromStage(e);
        static closeAllAlert(): void;
    }
}
declare module lzm {
    class HttpClient {
        /**
         * 请求url
         */
        static send(url: string, params: Object, completeFunction?: Function, timeoutFunction?: Function, method?: String): void;
        static getRequestPars(params: Object): string;
    }
}
declare module lzm {
    class JSONWebSocketClient {
        private socket;
        private host;
        private port;
        isConnect: boolean;
        onConnectCallBack: Function;
        onIOErrorCallBack: Function;
        onCloseCallBack: Function;
        onDataCallBack: Function;
        constructor(host: string, port: number);
        connect(): void;
        sendData(data: Object): void;
        private onSocketOpen();
        private onReceiveMessage(e);
        private onSocketClose(e);
        private onSocketIOError(e);
        dispose(): void;
    }
}

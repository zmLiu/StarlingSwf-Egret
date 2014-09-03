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
declare module dragonBones {
    module geom {
        class Point {
            public x: number;
            public y: number;
            constructor(x?: number, y?: number);
            public toString(): string;
        }
        class Rectangle {
            public x: number;
            public y: number;
            public width: number;
            public height: number;
            constructor(x?: number, y?: number, width?: number, height?: number);
        }
        class Matrix {
            public a: number;
            public b: number;
            public c: number;
            public d: number;
            public tx: number;
            public ty: number;
            constructor();
            public invert(): void;
        }
        class ColorTransform {
            public alphaMultiplier: number;
            public alphaOffset: number;
            public blueMultiplier: number;
            public blueOffset: number;
            public greenMultiplier: number;
            public greenOffset: number;
            public redMultiplier: number;
            public redOffset: number;
            constructor();
        }
    }
    module events {
        class Event {
            public type: string;
            public target: EventDispatcher;
            constructor(type: string);
        }
        class AnimationEvent extends Event {
            static FADE_IN: string;
            static FADE_OUT: string;
            static START: string;
            static COMPLETE: string;
            static LOOP_COMPLETE: string;
            static FADE_IN_COMPLETE: string;
            static FADE_OUT_COMPLETE: string;
            public animationState: animation.AnimationState;
            public armature: Armature;
            constructor(type: string);
        }
        class ArmatureEvent extends Event {
            static Z_ORDER_UPDATED: string;
            constructor(type: string);
        }
        class FrameEvent extends Event {
            static ANIMATION_FRAME_EVENT: string;
            static BONE_FRAME_EVENT: string;
            public animationState: animation.AnimationState;
            public armature: Armature;
            public bone: Bone;
            public frameLabel: string;
            constructor(type: string);
        }
        class SoundEvent extends Event {
            static SOUND: string;
            static BONE_FRAME_EVENT: string;
            public animationState: animation.AnimationState;
            public armature: Armature;
            public sound: string;
            constructor(type: string);
        }
        class EventDispatcher {
            private _listenersMap;
            constructor();
            public hasEventListener(type: string): boolean;
            public addEventListener(type: string, listener: Function): void;
            public removeEventListener(type: string, listener: Function): void;
            public removeAllEventListeners(type: string): void;
            public dispatchEvent(event: Event): void;
        }
        class SoundEventManager extends EventDispatcher {
            private static _instance;
            static getInstance(): SoundEventManager;
            constructor();
        }
    }
    module animation {
        interface IAnimatable {
            advanceTime(passedTime: number): void;
        }
        class WorldClock implements IAnimatable {
            static clock: WorldClock;
            public time: number;
            public timeScale: number;
            private _animatableList;
            constructor();
            public contains(animatable: IAnimatable): boolean;
            public add(animatable: IAnimatable): void;
            public remove(animatable: IAnimatable): void;
            public clear(): void;
            public advanceTime(passedTime: number): void;
        }
        class TimelineState {
            private static HALF_PI;
            private static _pool;
            static _borrowObject(): TimelineState;
            /** @private */
            static _returnObject(timeline: TimelineState): void;
            /** @private */
            static _clear(): void;
            static getEaseValue(value: number, easing: number): number;
            public transform: objects.DBTransform;
            public pivot: geom.Point;
            public tweenActive: boolean;
            private _updateState;
            private _animationState;
            private _bone;
            private _timeline;
            private _currentFrame;
            private _currentFramePosition;
            private _currentFrameDuration;
            private _durationTransform;
            private _durationPivot;
            private _durationColor;
            private _originTransform;
            private _originPivot;
            private _tweenEasing;
            private _tweenTransform;
            private _tweenColor;
            private _totalTime;
            constructor();
            public fadeIn(bone: Bone, animationState: AnimationState, timeline: objects.TransformTimeline): void;
            public fadeOut(): void;
            public update(progress: number): void;
            private clear();
        }
        class AnimationState {
            private static _pool;
            /** @private */
            static _borrowObject(): AnimationState;
            /** @private */
            static _returnObject(animationState: AnimationState): void;
            /** @private */
            static _clear(): void;
            public enabled: boolean;
            public tweenEnabled: boolean;
            public blend: boolean;
            public group: string;
            public weight: number;
            public name: string;
            public clip: objects.AnimationData;
            public loopCount: number;
            public loop: number;
            public layer: number;
            public isPlaying: boolean;
            public isComplete: boolean;
            public totalTime: number;
            public currentTime: number;
            public timeScale: number;
            public displayControl: boolean;
            /** @private */
            public _timelineStates: any;
            /** @private */
            public _fadeWeight: number;
            private _armature;
            private _currentFrame;
            private _mixingTransforms;
            private _fadeState;
            private _fadeInTime;
            private _fadeOutTime;
            private _fadeOutBeginTime;
            private _fadeOutWeight;
            private _fadeIn;
            private _fadeOut;
            private _pauseBeforeFadeInComplete;
            constructor();
            public fadeIn(armature: Armature, clip: objects.AnimationData, fadeInTime: number, timeScale: number, loop: number, layer: number, displayControl: boolean, pauseBeforeFadeInComplete: boolean): void;
            public fadeOut(fadeOutTime: number, pause?: boolean): void;
            public play(): void;
            public stop(): void;
            public getMixingTransform(timelineName: string): number;
            public addMixingTransform(timelineName: string, type?: number, recursive?: boolean): void;
            public removeMixingTransform(timelineName?: string, recursive?: boolean): void;
            public advanceTime(passedTime: number): boolean;
            private updateTimelineStates();
            private addTimelineState(timelineName);
            private removeTimelineState(timelineName);
            private clear();
        }
        class Animation {
            static NONE: string;
            static SAME_LAYER: string;
            static SAME_GROUP: string;
            static SAME_LAYER_AND_GROUP: string;
            static ALL: string;
            public tweenEnabled: boolean;
            public timeScale: number;
            public animationNameList: string[];
            /** @private */
            public _animationLayer: AnimationState[][];
            /** @private */
            public _lastAnimationState: AnimationState;
            private _armature;
            private _isPlaying;
            public getLastAnimationName(): string;
            public getLastAnimationState(): AnimationState;
            private _animationDataList;
            public getAnimationDataList(): objects.AnimationData[];
            public setAnimationDataList(value: objects.AnimationData[]): void;
            public getIsPlaying(): boolean;
            public getIsComplete(): boolean;
            constructor(armature: Armature);
            public dispose(): void;
            public gotoAndPlay(animationName: string, fadeInTime?: number, duration?: number, loop?: number, layer?: number, group?: string, fadeOutMode?: string, displayControl?: boolean, pauseFadeOut?: boolean, pauseFadeIn?: boolean): AnimationState;
            public play(): void;
            public stop(): void;
            public getState(name: string, layer?: number): AnimationState;
            public hasAnimation(animationName: string): boolean;
            public advanceTime(passedTime: number): void;
            private addLayer(layer);
            private addState(animationState);
            private removeState(animationState);
        }
    }
    module objects {
        class DBTransform {
            public x: number;
            public y: number;
            public skewX: number;
            public skewY: number;
            public scaleX: number;
            public scaleY: number;
            constructor();
            public getRotation(): number;
            public setRotation(value: number): void;
            public copy(transform: DBTransform): void;
            public toString(): string;
        }
        class Frame {
            public position: number;
            public duration: number;
            public action: string;
            public event: string;
            public sound: string;
            constructor();
            public dispose(): void;
        }
        class TransformFrame extends Frame {
            public tweenEasing: number;
            public tweenRotate: number;
            public displayIndex: number;
            public zOrder: number;
            public visible: boolean;
            public global: DBTransform;
            public transform: DBTransform;
            public pivot: geom.Point;
            public color: geom.ColorTransform;
            constructor();
            public dispose(): void;
        }
        class Timeline {
            public duration: number;
            public scale: number;
            private _frameList;
            public getFrameList(): Frame[];
            constructor();
            public dispose(): void;
            public addFrame(frame: Frame): void;
        }
        class TransformTimeline extends Timeline {
            static HIDE_TIMELINE: TransformTimeline;
            public transformed: boolean;
            public offset: number;
            public originTransform: DBTransform;
            public originPivot: geom.Point;
            constructor();
            public dispose(): void;
        }
        class AnimationData extends Timeline {
            public frameRate: number;
            public name: string;
            public loop: number;
            public tweenEasing: number;
            public fadeInTime: number;
            private _timelines;
            public getTimelines(): any;
            constructor();
            public dispose(): void;
            public getTimeline(timelineName: string): TransformTimeline;
            public addTimeline(timeline: TransformTimeline, timelineName: string): void;
        }
        class DisplayData {
            static ARMATURE: string;
            static IMAGE: string;
            public name: string;
            public type: string;
            public transform: DBTransform;
            public pivot: geom.Point;
            constructor();
            public dispose(): void;
        }
        class SlotData {
            public name: string;
            public parent: string;
            public zOrder: number;
            public blendMode: string;
            private _displayDataList;
            public getDisplayDataList(): DisplayData[];
            constructor();
            public dispose(): void;
            public addDisplayData(displayData: DisplayData): void;
            public getDisplayData(displayName: string): DisplayData;
        }
        class BoneData {
            public name: string;
            public parent: string;
            public length: number;
            public global: DBTransform;
            public transform: DBTransform;
            public scaleMode: number;
            public fixedRotation: boolean;
            constructor();
            public dispose(): void;
        }
        class SkinData {
            public name: string;
            private _slotDataList;
            public getSlotDataList(): SlotData[];
            constructor();
            public dispose(): void;
            public getSlotData(slotName: string): SlotData;
            public addSlotData(slotData: SlotData): void;
        }
        class ArmatureData {
            public name: string;
            private _boneDataList;
            public getBoneDataList(): BoneData[];
            private _skinDataList;
            public getSkinDataList(): SkinData[];
            private _animationDataList;
            public getAnimationDataList(): AnimationData[];
            constructor();
            public dispose(): void;
            public getBoneData(boneName: string): BoneData;
            public getSkinData(skinName: string): SkinData;
            public getAnimationData(animationName: string): AnimationData;
            public addBoneData(boneData: BoneData): void;
            public addSkinData(skinData: SkinData): void;
            public addAnimationData(animationData: AnimationData): void;
            public sortBoneDataList(): void;
            private sortBoneData(object1, object2);
        }
        class SkeletonData {
            public name: string;
            private _subTexturePivots;
            public getArmatureNames(): string[];
            private _armatureDataList;
            public getArmatureDataList(): ArmatureData[];
            constructor();
            public dispose(): void;
            public getArmatureData(armatureName: string): ArmatureData;
            public addArmatureData(armatureData: ArmatureData): void;
            public removeArmatureData(armatureData: ArmatureData): void;
            public removeArmatureDataByName(armatureName: string): void;
            public getSubTexturePivot(subTextureName: string): geom.Point;
            public addSubTexturePivot(x: number, y: number, subTextureName: string): geom.Point;
            public removeSubTexturePivot(subTextureName: string): void;
        }
        class DataParser {
            static parseTextureAtlasData(rawData: any, scale?: number): any;
            static parseSkeletonData(rawData: any): SkeletonData;
            private static parseArmatureData(armatureObject, data, frameRate);
            private static parseBoneData(boneObject);
            private static parseSkinData(skinObject, data);
            private static parseSlotData(slotObject, data);
            private static parseDisplayData(displayObject, data);
            private static parseAnimationData(animationObject, armatureData, frameRate);
            private static parseTimeline(timelineObject, timeline, frameParser, frameRate);
            private static parseTransformTimeline(timelineObject, duration, frameRate);
            private static parseFrame(frameObject, frame, frameRate);
            private static parseMainFrame(frameObject, frameRate);
            private static parseTransformFrame(frameObject, frameRate);
            private static parseTransform(transformObject, transform, pivot?);
        }
    }
    module display {
        interface IDisplayBridge {
            getVisible(): boolean;
            setVisible(value: boolean): void;
            getDisplay(): any;
            setDisplay(value: any): void;
            dispose(): void;
            updateTransform(matrix: geom.Matrix, transform: objects.DBTransform): void;
            updateColor(aOffset: number, rOffset: number, gOffset: number, bOffset: number, aMultiplier: number, rMultiplier: number, gMultiplier: number, bMultiplier: number): void;
            addDisplay(container: any, index: number): void;
            removeDisplay(): void;
            updateBlendMode(blendMode: string): void;
        }
    }
    module textures {
        interface ITextureAtlas {
            name: string;
            dispose(): void;
            getRegion(subTextureName: string): geom.Rectangle;
        }
    }
    module factorys {
        class BaseFactory extends events.EventDispatcher {
            /** @private */
            public _dataDic: any;
            /** @private */
            public _textureAtlasDic: any;
            /** @private */
            public _textureAtlasLoadingDic: any;
            /** @private */
            public _currentDataName: string;
            /** @private */
            public _currentTextureAtlasName: string;
            constructor();
            public getSkeletonData(name: string): objects.SkeletonData;
            public addSkeletonData(data: objects.SkeletonData, name?: string): void;
            public removeSkeletonData(name: string): void;
            public getTextureAtlas(name: string): any;
            public addTextureAtlas(textureAtlas: textures.ITextureAtlas, name?: string): void;
            public removeTextureAtlas(name: string): void;
            public dispose(disposeData?: boolean): void;
            public buildArmature(armatureName: string, animationName?: string, skeletonName?: string, textureAtlasName?: string, skinName?: string): Armature;
            public getTextureDisplay(textureName: string, textureAtlasName: string, pivotX: number, pivotY: number): Object;
            /** @private */
            public _generateArmature(): Armature;
            /** @private */
            public _generateSlot(): Slot;
            /** @private */
            public _generateDisplay(textureAtlas: textures.ITextureAtlas, fullName: string, pivotX: number, pivotY: number): any;
        }
    }
    module utils {
        class ConstValues {
            static ANGLE_TO_RADIAN: number;
            static DRAGON_BONES: string;
            static ARMATURE: string;
            static SKIN: string;
            static BONE: string;
            static SLOT: string;
            static DISPLAY: string;
            static ANIMATION: string;
            static TIMELINE: string;
            static FRAME: string;
            static TRANSFORM: string;
            static COLOR_TRANSFORM: string;
            static TEXTURE_ATLAS: string;
            static SUB_TEXTURE: string;
            static A_VERSION: string;
            static A_IMAGE_PATH: string;
            static A_FRAME_RATE: string;
            static A_NAME: string;
            static A_PARENT: string;
            static A_LENGTH: string;
            static A_TYPE: string;
            static A_FADE_IN_TIME: string;
            static A_DURATION: string;
            static A_SCALE: string;
            static A_OFFSET: string;
            static A_LOOP: string;
            static A_EVENT: string;
            static A_SOUND: string;
            static A_ACTION: string;
            static A_HIDE: string;
            static A_TWEEN_EASING: string;
            static A_TWEEN_ROTATE: string;
            static A_DISPLAY_INDEX: string;
            static A_Z_ORDER: string;
            static A_BLENDMODE: string;
            static A_WIDTH: string;
            static A_HEIGHT: string;
            static A_SCALE_MODE: string;
            static A_FIXED_ROTATION: string;
            static A_X: string;
            static A_Y: string;
            static A_SKEW_X: string;
            static A_SKEW_Y: string;
            static A_SCALE_X: string;
            static A_SCALE_Y: string;
            static A_PIVOT_X: string;
            static A_PIVOT_Y: string;
            static A_ALPHA_OFFSET: string;
            static A_RED_OFFSET: string;
            static A_GREEN_OFFSET: string;
            static A_BLUE_OFFSET: string;
            static A_ALPHA_MULTIPLIER: string;
            static A_RED_MULTIPLIER: string;
            static A_GREEN_MULTIPLIER: string;
            static A_BLUE_MULTIPLIER: string;
        }
        class TransformUtil {
            private static DOUBLE_PI;
            private static _helpMatrix;
            static transformPointWithParent(transform: objects.DBTransform, parent: objects.DBTransform): void;
            static transformToMatrix(transform: objects.DBTransform, matrix: geom.Matrix): void;
            static formatRadian(radian: number): number;
        }
        class DBDataUtil {
            private static _helpTransform1;
            private static _helpTransform2;
            static transformArmatureData(armatureData: objects.ArmatureData): void;
            static transformArmatureDataAnimations(armatureData: objects.ArmatureData): void;
            static transformAnimationData(animationData: objects.AnimationData, armatureData: objects.ArmatureData): void;
            static getTimelineTransform(timeline: objects.TransformTimeline, position: number, retult: objects.DBTransform): void;
            static addHideTimeline(animationData: objects.AnimationData, armatureData: objects.ArmatureData): void;
        }
    }
    /** @private */
    class DBObject {
        public name: string;
        public fixedRotation: boolean;
        public global: objects.DBTransform;
        public origin: objects.DBTransform;
        public offset: objects.DBTransform;
        public tween: objects.DBTransform;
        public parent: Bone;
        public armature: Armature;
        /** @private */
        public _globalTransformMatrix: geom.Matrix;
        /** @private */
        public _isDisplayOnStage: boolean;
        /** @private */
        public _scaleType: number;
        /** @private */
        public _isColorChanged: boolean;
        /** @private */
        public _visible: boolean;
        public getVisible(): boolean;
        public setVisible(value: boolean): void;
        /** @private */
        public _setParent(value: Bone): void;
        /** @private */
        public _setArmature(value: Armature): void;
        constructor();
        public dispose(): void;
        /** @private */
        public _update(): void;
    }
    class Slot extends DBObject {
        /** @private */
        public _dislayDataList: objects.DisplayData[];
        /** @private */
        public _displayBridge: display.IDisplayBridge;
        /** @private */
        public _isDisplayOnStage: boolean;
        /** @private */
        public _originZOrder: number;
        /** @private */
        public _tweenZorder: number;
        private _isHideDisplay;
        private _offsetZOrder;
        private _displayIndex;
        public _blendMode: string;
        public getZOrder(): number;
        public setZOrder(value: number): void;
        public getDisplay(): any;
        public setDisplay(value: any): void;
        public getBlendMode(): string;
        public setBlendMode(value: string): void;
        public getChildArmature(): Armature;
        public setChildArmature(value: Armature): void;
        /** @private */
        public _displayList: any[];
        public getDisplayList(): any[];
        public setDisplayList(value: any[]): void;
        private _setDisplay(display);
        /** @private */
        public _changeDisplay(displayIndex: number): void;
        public setVisible(value: boolean): void;
        /** @private */
        public _setArmature(value: Armature): void;
        constructor(displayBrideg: display.IDisplayBridge);
        public dispose(): void;
        /** @private */
        public _update(): void;
        /** @private */
        public _updateVisible(value: boolean): void;
        private updateChildArmatureAnimation();
    }
    class Bone extends DBObject {
        private static _soundManager;
        public scaleMode: number;
        public displayController: string;
        public slot: Slot;
        /** @private */
        public _tweenPivot: geom.Point;
        private _children;
        public setVisible(value: boolean): void;
        /** @private */
        public _setArmature(value: Armature): void;
        constructor();
        public dispose(): void;
        public contains(child: DBObject): boolean;
        public addChild(child: DBObject): void;
        public removeChild(child: DBObject): void;
        public getSlots(): Slot[];
        /** @private */
        public _arriveAtFrame(frame: objects.Frame, timelineState: animation.TimelineState, animationState: animation.AnimationState, isCross: boolean): void;
        /** @private */
        public _updateColor(aOffset: number, rOffset: number, gOffset: number, bOffset: number, aMultiplier: number, rMultiplier: number, gMultiplier: number, bMultiplier: number, isColorChanged: boolean): void;
    }
    class Armature extends events.EventDispatcher implements animation.IAnimatable {
        private static _soundManager;
        public name: string;
        public animation: animation.Animation;
        /** @private */
        public _slotsZOrderChanged: boolean;
        /** @private */
        public _slotList: Slot[];
        /** @private */
        public _boneList: Bone[];
        /** @private */
        public _eventList: events.Event[];
        private _display;
        public getDisplay(): any;
        constructor(display: any);
        public dispose(): void;
        public advanceTime(passedTime: number): void;
        public getSlots(returnCopy?: boolean): Slot[];
        public getBones(returnCopy?: boolean): Bone[];
        public getSlot(slotName: string): Slot;
        public getSlotByDisplay(display: Object): Slot;
        public removeSlot(slot: Slot): void;
        public removeSlotByName(slotName: string): void;
        public getBone(boneName: string): Bone;
        public getBoneByDisplay(display: Object): Bone;
        public removeBone(bone: Bone): void;
        public removeBoneByName(boneName: string): void;
        public addChild(object: DBObject, parentName: string): void;
        public updateSlotsZOrder(): void;
        /** @private */
        public _addDBObject(object: DBObject): void;
        /** @private */
        public _removeDBObject(object: DBObject): void;
        /** @private */
        public _sortBoneList(): void;
        /** @private */
        public _arriveAtFrame(frame: objects.Frame, timelineState: animation.TimelineState, animationState: animation.AnimationState, isCross: boolean): void;
        private sortSlot(slot1, slot2);
        private sortBone(object1, object2);
    }
}
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
declare module dragonBones {
    module display {
        class DragonBonesEgretBridge implements IDisplayBridge {
            private static RADIAN_TO_ANGLE;
            private _display;
            public getVisible(): boolean;
            public setVisible(value: boolean): void;
            public getDisplay(): any;
            public setDisplay(value: any): void;
            constructor();
            public dispose(): void;
            public updateTransform(matrix: geom.Matrix, transform: objects.DBTransform): void;
            public updateColor(aOffset: number, rOffset: number, gOffset: number, bOffset: number, aMultiplier: number, rMultiplier: number, gMultiplier: number, bMultiplier: number): void;
            public updateBlendMode(blendMode: string): void;
            public addDisplay(container: any, index: number): void;
            public removeDisplay(): void;
        }
    }
    module textures {
        class EgretTextureAtlas implements ITextureAtlas {
            public texture: egret.Texture;
            private textureAtlasRawData;
            public name: string;
            public scale: number;
            public spriteSheet: egret.SpriteSheet;
            private _textureData;
            constructor(texture: egret.Texture, textureAtlasRawData: any, scale?: number);
            public getTexture(fullName: string): egret.Texture;
            public dispose(): void;
            public getRegion(subTextureName: string): geom.Rectangle;
            private parseData(textureAtlasRawData);
        }
    }
    module factorys {
        class EgretFactory extends BaseFactory {
            constructor();
            /** @private */
            public _generateArmature(): Armature;
            /** @private */
            public _generateSlot(): Slot;
            /** @private */
            public _generateDisplay(textureAtlas: textures.EgretTextureAtlas, fullName: string, pivotX: number, pivotY: number): any;
        }
    }
}

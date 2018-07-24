//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();

        RES.processor.map("swf", starlingswf.SwfAnalyzer);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin

        //     context.onUpdate = () => {

        //     }
        // })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    private swf:starlingswf.Swf;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        var swfData:Object = RES.getRes("test_swf");
        // this.swf = new starlingswf.Swf(swfData,this.stage.frameRate);
        this.swf = RES.getRes("test_swf");
        this.swf.swfUpdateManager.setFps(this.stage.frameRate);
        this.test1();

        // this.testAlert();

        // this.testSocket();

        // lzm.HttpClient.send("http://192.168.2.188/aptana/rings_server/test.php",{'a':123,"b":321},(data:string)=>{
        //     egret.log(data);
        // },null,'post');
    }

    /**
     * Sprite测试
     * */
    private test1():void{
        var sprite:starlingswf.SwfSprite = this.swf.createSprite("spr_1");
        this.addChild(sprite);
    }

    /**
     * MovieClip测试
     * */
    private test2():void{

        var mcNames:string[] = ["mc_lajiao","mc_test1","mc_Tain","mc_Zombie_balloon","mc_Zombie_dolphinrider","mc_Zombie_gargantuar","mc_Zombie_imp","mc_Zombie_jackbox","mc_Zombie_ladder","mc_Zombie_polevaulter"];
        for(var i:number = 0 ; i < 50 ; i++){
            var mcName:string = mcNames[Math.floor(Math.random() * mcNames.length)];
            var mc:starlingswf.SwfMovieClip = this.swf.createMovie(mcName);
            mc.x = Math.random() * 480;
            mc.y = Math.random() * 320;
            this.addChild(mc);
        }

    }

    /**
     * 动画事件测试
     * */
    private test3():void{
        var mc:starlingswf.SwfMovieClip = this.swf.createMovie("mc_Tain");
        mc.x = 480 / 2;
        mc.y = 320 / 2;
        mc.addEventListener(egret.Event.COMPLETE,this.mcComplete,mc);
        mc.gotoAndPlay("walk");
        this.addChild(mc);
    }

    private mcComplete(e:egret.Event):void{
        console.log("mcComplete");
    }

    /**
     * 帧事件测试
     * */
    private test4():void{
        var mc:starlingswf.SwfMovieClip = this.swf.createMovie("mc_frame_event");
        mc.addEventListener("@out",this.frameEventOut,mc);
        mc.addEventListener("@in",this.frameEventIn,mc);
        this.addChild(mc);
    }

    private frameEventOut(e:egret.Event):void{
        egret.log("@out");
    }

    private frameEventIn(e:egret.Event):void{
        egret.log("@in");
    }

    /**
     * blendMode
     * */
    private test5(){
        var spr:starlingswf.SwfSprite = this.swf.createSprite("spr_blendmode");
        this.addChild(spr);
    }

    private testBtn(){
        var btn:starlingswf.SwfButton = this.swf.createButton("btn_test1");
        this.addChild(btn);
        
        btn.addEventListener(starlingswf.SwfButton.onClick,( evt:egret.Event )=>{
            egret.log("onClick");
        },this)
    }
}
module starlingswf {
	export class SwfAnalyzer extends RES.BinAnalyzer {

		public constructor() {
			super();
			this._dataFormat = egret.HttpResponseType.TEXT;
		}

		/**
         * 解析并缓存加载成功的数据
         */
        public analyzeData(resItem:RES.ResourceItem, data:any):void {
            let name:string = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            try {
                let str:string = <string> data;
				this.fileDic[name] = new Swf(JSON.parse(str));
            }
            catch (e) {
                egret.$warn(1017, resItem.url, data);
            }
        }

	}
}
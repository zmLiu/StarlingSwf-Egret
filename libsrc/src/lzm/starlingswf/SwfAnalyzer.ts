module starlingswf {

    export var SwfAnalyzer: RES.processor.Processor = {

        async onLoadStart(host, resource) {
            let text = await host.load(resource, 'text');
            let swf = new Swf(JSON.parse(text),30);
            return swf;
        },

        onRemoveStart(host, request) {
            return Promise.resolve();
        }

    }
}
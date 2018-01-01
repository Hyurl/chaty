import * as util from "util";

export default class Context {
    /** Set/get the preference name of your robot. */
    name: string = this.constructor.name;

    type: string = "console";

    adapter: object = console;

    input: string = "";

    protected _output: string = "";

    matches: string | RegExpMatchArray = null;

    constructor(input?: string, matches?: string | RegExpExecArray) {
        this.input = input;
        this.matches = matches;
    }

    set output(v) {
        this._output = v;
        this.onoutput();
    }

    get output() {
        return this._output;
    }

    /** A function called when setting `context.output`. */
    onoutput() {
        if (this.type === "console") {
            console.log(`${this.name}:`, this.output);
        }
    }

    [util.inspect.custom]() {
        var _this = this,
            obj = {
                name: _this.name,
                type: _this.type,
                adapter: _this.adapter,
                input: _this.input,
                output: _this.output,
                matches: _this.matches
            };
        Object.defineProperty(obj, "constructor", {
            value: _this.constructor
        });
        return obj;
    }
}
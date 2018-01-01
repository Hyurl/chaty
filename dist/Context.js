"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
class Context {
    constructor(input, matches) {
        /** Set/get the preference name of your robot. */
        this.name = this.constructor.name;
        this.type = "console";
        this.adapter = console;
        this.input = "";
        this._output = "";
        this.matches = null;
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
        var _this = this, obj = {
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
exports.default = Context;
//# sourceMappingURL=Context.js.map
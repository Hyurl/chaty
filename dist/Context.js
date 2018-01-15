"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output = Symbol("output");
class Context {
    constructor(input, matches) {
        /** Set/get the preference name of your robot. */
        this.name = this.constructor.name;
        this.type = "console";
        this.adapter = console;
        this.input = "";
        this.matches = null;
        this.input = input;
        this.matches = matches;
    }
    set output(v) {
        this[output] = v;
        this.onoutput();
    }
    get output() {
        return this[output];
    }
    /** A function called when setting `context.output`. */
    onoutput() {
        if (this.type === "console") {
            console.log(`${this.name}:`, this.output);
        }
    }
}
exports.default = Context;

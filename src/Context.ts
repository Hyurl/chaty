const output = Symbol("output");

export default class Context {
    /** Set/get the preference name of your robot. */
    name: string = this.constructor.name;

    type: string = "console";

    adapter: any = console;

    input: string = "";

    matches: string | RegExpMatchArray = null;

    constructor();

    constructor(input: string, matches: string | RegExpExecArray);

    constructor(input?: string, matches?: string | RegExpExecArray) {
        this.input = input;
        this.matches = matches;
    }

    set output(v: string) {
        this[output] = v;
        this.onoutput();
    }

    get output(): string {
        return this[output];
    }

    /** A function called when setting `context.output`. */
    onoutput() {
        if (this.type === "console") {
            console.log(`${this.name}:`, this.output);
        }
    }
}
export default class Context {
    /** Set/get the preference name of your robot. */
    name: string;
    type: string;
    adapter: object;
    input: string;
    protected _output: string;
    matches: string | RegExpMatchArray;
    constructor(input?: string, matches?: string | RegExpExecArray);
    output: string;
    /** A function called when setting `context.output`. */
    onoutput(): void;
}

import Context from "./Context";
export default class App {
    readonly stacks: {
        [re: string]: Function[];
    };
    readonly expressions: {
        [re: string]: string | RegExp;
    };
    /**
     * Adds a listener function to all expressions.
     * @param fn Listener function.
     */
    use(fn: (ctx: Context, next?: Function) => void): this;
    /**
     * Adds a listener function to a specified expression.
     * @param re A regular expression or a string.
     * @param fn Listener function.
     */
    match(re: string | RegExp, fn: (ctx: Context, next?: Function) => void): this;
    /**
     * Adds a listener function that will be called only the input
     * statement equals to the expression.
     * @param str The specified expression.
     * @param fn Listener function.
     */
    equal(str: string, fn: (ctx: Context, next?: Function) => void): this;
    /**
     * Executes the program with a statement.
     * @param input The input statement.
     */
    exec(input: string, ctx?: Context): void;
}

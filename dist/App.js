"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
class App {
    constructor() {
        this.stacks = { "*": [] };
        this.expressions = {};
    }
    /**
     * Adds a listener function to all expressions.
     * @param fn Listener function.
     */
    use(fn) {
        for (let i in this.stacks) {
            this.stacks[i].push(fn);
        }
        return this;
    }
    /**
     * Adds a listener function to a specified expression.
     * @param re A regular expression or a string.
     * @param fn Listener function.
     */
    match(re, fn) {
        if (re === "*") {
            return this.use(fn);
        }
        var route = typeof re === "string" ? re : re.toString();
        if (this.stacks[route] === undefined) {
            this.stacks[route] = this.stacks["*"].concat();
            this.expressions[route] = re;
        }
        this.stacks[route].push(fn);
        return this;
    }
    /**
     * Adds a listener function that will be called only the input
     * statement equals to the expression.
     * @param str The specified expression.
     * @param fn Listener function.
     */
    equal(str, fn) {
        var efn = function equalListener(ctx, next) {
            return fn(ctx, next);
        };
        return this.match(str, efn);
    }
    /**
     * Executes the program with a statement.
     * @param input The input statement.
     */
    exec(input, ctx) {
        var expressions = Object.keys(this.expressions);
        var i = -1, wrap = () => {
            i += 1;
            if (i < expressions.length) {
                var re = this.expressions[expressions[i]], matches;
                matches = input.match(re);
                if (matches) {
                    if (!ctx) {
                        ctx = new Context_1.default(input, matches);
                    }
                    else {
                        ctx.input = input;
                        ctx.matches = matches;
                    }
                    var j = -1, next = () => {
                        j += 1;
                        if (j < this.stacks[expressions[i]].length) {
                            if (this.stacks[expressions[i]][j].name !== "equalListener" ||
                                matches[0] === input) {
                                this.stacks[expressions[i]][j].call(this, ctx, next);
                            }
                            else {
                                next();
                            }
                        }
                        else {
                            wrap();
                        }
                    };
                    next();
                }
                else {
                    wrap();
                }
            }
        };
        wrap();
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map
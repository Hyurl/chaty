# Chaty

**A minimal chat-bot framework with middleware facilities.**

This module uses regular expression to match input statements, and output 
whatever response as you programmed.

## Example

```javascript
const { App } = require("chaty");

const Responses = {
    "Hello": "Hello, master!",
    "Good morning": "Good morning!"
};

var app = new App;

app.use((ctx, next) => {
    ctx.name = "Luna";
    next();
}).match(/[\s\S]+/, (ctx, next) => {
    if (Responses[ctx.input]) {
        ctx.output = Responses[ctx.input];
    } else {
        next();
    }
}).match(/Hello, (.*)/, (ctx, next) => {
    console.log("I: ", ctx.input);
    next();
}).match(/Hello, (.*)/, (ctx) => {
    ctx.output = "Hi, Ayon!";
    // print out "Luna: Hi Ayon!" in the console.
});

app.exec("Hello, World!");
```

## API

### App

#### `new App`

Creates a new app to host a chat-bot.

#### `app.use(fn: (ctx: Context, next?: Function) => void): this`

Adds a listener function to all expressions.

#### `app.match(re: string | RegExp, fn: (ctx: Context, next?: Function) => void): this`

Adds a listener function to a specified expression.

#### `app.equal(str: string, fn: (ctx: Context, next?: Function) => void): this`

Adds a listener function that will be called only the input statement equals 
to the expression.

#### `app.exec(input: string, ctx?: Context): void`

Executes the program with a statement.

One thing to remember, a statement may match multiple expressions, the 
middleware won't stop when the first is matched. As long as you calling 
`next()` in every listener functions, the program will loop until all matched 
listeners are called.

If you want to stop it after you've `ctx.output`ed something, just stop 
calling `next()`, and that will be fine.

### Context

#### `new Context(input?: string, matches?: string | RegExpExecArray)`

Creates a new context.

Using this method, you can create a customized context, and pass it to 
`app.exec()`, so that when you using the `ctx` in a middleware, it will be the
one you'd expected.

```javascript
const { App, Context } = require("chaty");
var app = new App,
    ctx = new Context;
//...
app.exec("Hello, World!", ctx);
```

#### `ctx.name`

You can set a preference name of the context, it will be used when output a 
response.

```javascript

ctx.name = "Luna";
ctx.output = "Hello, Mr. Handsome!";
// Luna: Hello, Mr. Handsome!
```

#### `ctx.type`

Used when you want to customize the output event.

#### `ctx.adapter`

Used when you want to customize the output event.

#### `ctx.input`

The input statement that passed to `app.exec()`.

#### `ctx.output`

Set/Get output statement.

This property triggers `ctx.onoutput()`.

#### `ctx.matches: string | RegExpMatchArray`

Carries the matched result of `app.match()` and `app.equal()`.

#### `ctx.onoutput()`

You can rewrite this method to customize the event action of `ctx.output`.

### A more detailed example of using **chaty** with HTTP server

```javascript
const http = require("http");
const url = require("url");
const querystring = require("querystring");
const { App, Context } = require("chaty");

// Rewrite output event globallly.
Context.prototype.onoutput = function () {
    if (this.type == "http") {
        this.adapter.res.end(this.output);
    } else if (this.type === "console") {
        console.log(`${this.name}: `, this.output);
    }
}

var app = new App;

app.match(/Hi, (.*)/i, (ctx, next) => {
    ctx.output = "How do you do!";
    // The output statement will be sent by `ctx.adapter.res.end()`.
    // Do not directly call `ctx.adapter.res.end()`, it will not set the 
    // statement to `ctx.output`, which might be used in the next 
    // middleware/listener.
    next();
});

http.createServer((req, res) => {
    if (req.url.match("/chat")) {
        var URL = url.parse(req.url),
            query = querystring.parse(URL.query),
            ctx = new Context;

        ctx.type = "http";
        ctx.adapter = { req, res };

        // If you don't want to rewrite ctx.onoutput globally, you can set it 
        // here.
        app.exec(query.statement, ctx);
    }
}).listen(80);
```
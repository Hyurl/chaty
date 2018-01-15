const http = require("http");
const url = require("url");
const querystring = require("querystring");
const { App, Context } = require("../");

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
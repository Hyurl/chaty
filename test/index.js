const { App } = require("../dist/index");

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
});

app.exec("Hello, World!");
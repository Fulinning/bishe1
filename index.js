const path = require("path");
const express = require("express");
const app = express();
const stokValue = '92002829247f13a90aa0119f25c44509'
const cookieValue = 'f3cbc1db5f7ba66e3f7ac17a667a5a7b'

const indexRouter = require("./routers/index");
const test1Router = require("./routers/test1");
const test2Router = require("./routers/test2");
const test3Router = require("./routers/test3");

app.set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(express.static(path.join(__dirname, 'assets')))
    .use("/", indexRouter)
    .use("/test1", test1Router)
    .use("/test2", test2Router)
    .use("/test3", test3Router)
    .listen(3000);

exports.stokValue = stokValue;
exports.cookieValue = cookieValue;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var env = dotenv.config();
if (env.error) {
    console.log('error loading env, killing the process...');
    process.exit(1);
}
var express = require("express");
var root_1 = require("./routes/root");
var logger_1 = require("./logger");
var app = express();
var nocache = require('nocache');
app.use(nocache());
function setupExpress() {
    app.route("/").get(root_1.root);
}
function startServer() {
    var port;
    var portEnv = process.env.PORT;
    if (isInteger(portEnv)) {
        port = parseInt(portEnv);
    }
    var portArg = process.argv[2];
    if (!port && isInteger(portArg)) {
        port = parseInt(portArg);
    }
    if (!port) {
        port = 9000;
    }
    app.listen(port, function () {
        logger_1.logger.info("workingggg at http://localhost:".concat(port));
    });
}
function isInteger(input) {
    var _a;
    return (_a = input === null || input === void 0 ? void 0 : input.match(/^\d+?/)) !== null && _a !== void 0 ? _a : false;
}
setupExpress();
startServer();

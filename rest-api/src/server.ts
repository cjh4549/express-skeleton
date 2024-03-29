import * as dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) {
    console.log('error loading env, killing the process...');
    process.exit(1);
}

import * as express from 'express';
import { root } from "./routes/root";
import { logger } from './logger';

const app = express();
const nocache = require('nocache');

app.use(nocache())

function setupExpress() {
    app.route("/").get(root);
}

function startServer() {
    let port: number; 

    const portEnv = process.env.PORT;
    if(isInteger(portEnv)) {
        port = parseInt(portEnv);
    }

    const portArg = process.argv[2];
    if(!port && isInteger(portArg)) {
        port = parseInt(portArg);
    }

    if(!port) {
        port = 9000;
    }

    app.listen(port, () => {
        logger.info(`workingggg at http://localhost:${port}`);
    })
}

function isInteger(input: string) {
    return input?.match(/^\d+?/) ?? false;
}

setupExpress();
startServer();
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import { app } from "../server.js";

export default function() {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
}
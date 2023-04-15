import express from "express";

import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import { app } from "../server.js";
import session from "../middlewares/session.js";
import cors from "../middlewares/cors.js";

export default function() {
    
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session());
    app.use('/uploads', express.static('uploads'))//test here -> http://localhost:3000/uploads/rest-api.png
}
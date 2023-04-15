import express from "express";

import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import { app } from "../server.js";

export default function() {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/uploads', express.static('uploads'))//test here -> http://localhost:3000/uploads/rest-api.png
}
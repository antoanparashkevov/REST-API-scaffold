import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

//configurations
import expressConfiguration from "./config/express-config.js";
import databaseConfig from "./config/database-config.js";

//routes
import routes from "./routes/routes.js";
import useDefaultRoute from "./routes/default-routes.js";


export const app = express();

expressConfiguration();
databaseConfig()

app.use(routes);
useDefaultRoute();



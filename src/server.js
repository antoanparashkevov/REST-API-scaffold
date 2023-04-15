import express from 'express';
import dotenv from 'dotenv';

//configurations
import expressConfiguration from "./config/express-configuration.js";
import routes from "./routes/routes.js";
import useDefaultRoute from "./routes/default-routes.js";


export const app = express();
dotenv.config();

expressConfiguration(app);

app.use(routes);
useDefaultRoute();


app.listen(process.env['PORT'], () => console.log('Server listening on port ' + process.env['PORT']))
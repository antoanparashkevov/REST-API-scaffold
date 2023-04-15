import express from 'express';
import dotenv from 'dotenv';

//configurations
import expressConfiguration from "./config/express-configuration.js";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();

expressConfiguration(app);

app.use(routes);



app.listen(process.env['PORT'], () => console.log('Server listening on port ' + process.env['PORT']))
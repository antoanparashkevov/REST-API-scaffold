import express from 'express';
import dotenv from 'dotenv';
import expressConfiguration from "./config/express-configuration.js";

dotenv.config();

const app = express();

expressConfiguration(app);


app.get('/', (req,res) => {
    res.json({
        message: 'REST Service operational...'
    })
})



app.listen(process.env['PORT'], () => console.log('Server listening on port ' + process.env['PORT']))
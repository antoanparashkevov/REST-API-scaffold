import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req,res) => {
    res.json({
        message: 'REST Service operational...'
    })
})

app.listen(process.env['PORT'], () => console.log('Server listening on port ' + process.env['PORT']))
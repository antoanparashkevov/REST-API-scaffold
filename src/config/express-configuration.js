import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

export default function(app) {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
}
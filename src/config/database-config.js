import mongoose from "mongoose";

import { app } from "../server.js";

export default function() {
    
	mongoose.connect(process.env["DATABASE_CONNECTION_URL"], {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then(() => 
			app.listen(
				process.env["PORT"],
				() => 
					console.log("Server listening on port " + process.env["PORT"])
			)
		)
		.catch((error) => {
			console.log(error);
			process.exit(1);
		});
    
}
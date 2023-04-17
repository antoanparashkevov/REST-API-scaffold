import { app } from "../server.js";

export default function useDefaultRoute() {
	app.get("/", (req, res) => {
		res.json({
			message: "REST Service is running correctly!"
		})
	})
}
import { messages } from "./messagesStore";
import type { Express } from "express";

export function setupPollingRoutes(app: Express) {
	// TODO Renvoyer la liste complète des messages via la route /polling/messages
	app.get("/polling/messages", (req, res) => {
		res.json(messages);
	});
}

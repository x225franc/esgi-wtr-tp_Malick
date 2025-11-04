import { messages } from "./messagesStore";
import type { Express, Response } from "express";

let waitingNewMessages: Response[] = [];

export function setupLongPollingRoutes(app: Express) {
	app.get("/long-polling/messages", (req, res) => {
		const lastIndex = Number(req.query.lastIndex ?? -1);
		if (messages.length - 1 > lastIndex) {
			res.json(messages.slice(lastIndex + 1));
		} else {
			waitingNewMessages.push(res);
		}
	});
}

// TODO - Implémenter cette fonction qui permettera de renvoyer la reponse au client dès la reception d'un message
// TODO - Appeler cette fonction là ou il faut lorsqu'un nouveau message arrive
export function notifyLongPollingRoutes(message: String) {
	while (waitingNewMessages.length > 0) {
		const res = waitingNewMessages.pop();
		if (res) {
			res.json([message]);
		}
	}
}

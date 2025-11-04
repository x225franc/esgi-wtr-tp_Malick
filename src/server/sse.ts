import type { Express, Response } from "express";

const sseClients: Response[] = [];

export function setupSseRoutes(app: Express) {
	// TODO Renvoyer la liste des NOUVEAUX messages via la route /sse/messages
	// TODO - Etablir une connexion SSE et la socker dans sseClients.
	// TODO - Gérer aussi la déconnexion

	app.get("/sse/messages", (req, res) => {
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");
		res.flushHeaders();

		sseClients.push(res);

		req.on("close", () => {
			const idx = sseClients.indexOf(res);
			if (idx !== -1) sseClients.splice(idx, 1);
		});
	});
}

let sseId = 0;

export function broadcastSSE(message: string) {
	// TODO - Envoyer un event SSE à toutes les instances connectés
	// TODO - Un event doit contenir un ID, un NOM et de la donnée
	// TODO - la donnée doit être le nouveau message recu

	sseId++;
	const event = {
		id: sseId,
		event: "message",
		message,
	};
	sseClients.forEach((res) => {
		res.write(
			`id: ${event.id}\nevent: ${event.event}\ndata: ${JSON.stringify(
				event
			)}\n\n`
		);
	});
}

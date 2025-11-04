import express from "express";

import cors from "cors";
import {addMessage} from "./messagesStore";
import {setupPollingRoutes} from "./polling";
import {setupLongPollingRoutes, notifyLongPollingRoutes} from "./longPolling";
import {setupSseRoutes, broadcastSSE} from "./sse";

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors());


// TODO - Appeler les fonction polling, long polling et SSE ICI

setupPollingRoutes(app);
setupLongPollingRoutes(app);
setupSseRoutes(app);

// POST Message - Utiliser pour le Polling, Long-Polling et SSE

app.post('/messages', (req, res) => {
    const newMessage = req.body?.message as string;
    if (!newMessage) return res.status(400).json({error: "Aucun nouveau message"});
    // TODO - Ajouter ici du code pour le long Polling et le SSE

    addMessage(newMessage);
    notifyLongPollingRoutes(newMessage);
    broadcastSSE(newMessage);
    res.json({
        ok: true,
        message: newMessage
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Serveur dispo sur http://localhost:${PORT}`);
});


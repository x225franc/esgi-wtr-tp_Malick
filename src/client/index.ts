import "./pollingClient";
import "./longPollingClient"
import "./sseClient";


const form = document.getElementById('form') as HTMLFormElement;
const input = document.getElementById('message') as HTMLInputElement;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newMessage = input?.value;

    // TODO - Envoyer le nouveau message au serveur via  POST http://localhost:4000/messages
    // TODO - Gérer les erreurs et les messages vides
    // TODO - Vider l'input après envoie

    if (!newMessage || newMessage.trim() === "") {
        alert("Le message ne peut pas être vide.");
        return;
    }
    try {
        const response = await fetch("http://localhost:4000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: newMessage })
        });
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du message");
        }
        input.value = "";
    } catch (error) {
        alert("Erreur: " + (error as Error).message);
    }
});
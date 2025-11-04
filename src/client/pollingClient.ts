const pollingContainer = document.getElementById('polling-messages') as HTMLUListElement;
const pollingTime = 5000 // 5 secondes
// TODO -  Récupérer les messages via POLLING puis ajouter les NOUVEAUX messages dans pollingContainer.
// TODO - Le faire toutes les 5 secondes

async function fetchPollingMessages() {
	try {
		const response = await fetch("http://localhost:4000/polling/messages");
		if (!response.ok) throw new Error("Erreur lors du polling");
		const messages = await response.json();
		pollingContainer.innerHTML = "";
		if (Array.isArray(messages)) {
			messages.forEach((msg: string) => {
				const li = document.createElement("li");
				li.textContent = msg;
				pollingContainer.appendChild(li);
			});
		} else {
			const li = document.createElement("li");
			li.textContent = JSON.stringify(messages);
			pollingContainer.appendChild(li);
		}
	} catch (error) {
		console.error(error);
	}
}

setInterval(fetchPollingMessages, pollingTime);
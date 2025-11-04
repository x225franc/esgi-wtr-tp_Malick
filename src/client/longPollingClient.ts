const longPollingContainer = document.getElementById('long-polling-messages') as HTMLUListElement;

// TODO -  Récupérer les messages via LONG POLLING puis ajouter les NOUVEAUX messages dans longPollingContainer.

async function fetchLongPollingMessages() {
	try {
		const response = await fetch("http://localhost:4000/long-polling/messages");
		if (!response.ok) throw new Error("Erreur lors du long polling");
		const messages = await response.json();
		longPollingContainer.innerHTML = "";
		if (Array.isArray(messages)) {
			messages.forEach((msg: string) => {
				const li = document.createElement("li");
				li.textContent = msg;
				longPollingContainer.appendChild(li);
			});
		} else {
			const li = document.createElement("li");
			li.textContent = JSON.stringify(messages);
			longPollingContainer.appendChild(li);
		}
	} catch (error) {
		console.error(error);
	}
	setTimeout(fetchLongPollingMessages, 1000);
}

fetchLongPollingMessages();

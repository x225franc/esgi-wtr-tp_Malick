const sseContainer = document.getElementById('sse-messages') as HTMLUListElement;

// TODO -  Récupérer les messages via SSE puis ajouter les NOUVEAUX messages dans SSE Container.

const eventSource = new EventSource("http://localhost:4000/sse/messages");

eventSource.onmessage = (event) => {
	try {
		const data = JSON.parse(event.data);
		const li = document.createElement("li");
		li.textContent = data.message || event.data;
		sseContainer.appendChild(li);
	} catch {
		const li = document.createElement("li");
		li.textContent = event.data;
		sseContainer.appendChild(li);
	}
};

eventSource.onerror = (err) => {
	console.error("Erreur SSE:", err);
};

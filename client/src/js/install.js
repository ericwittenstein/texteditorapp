const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
	// store triggered events
	window.deferredPrompt = event;

	// toggle button visibility to set hidden to false AKA to show the button
	butInstall.classList.toggle("hidden", false);
});

// click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
	const promptEvent = window.deferredPrompt;

	if (!promptEvent) {
		return;
	}

	// show the prompt
	promptEvent.prompt();

	// reset deferredprompt variable
	window.deferredPrompt = null;

	// toggle button visibility to set hidden to true AKA to hide the button
	butInstall.classList.toggle("hidden", true);
});

// handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
	// clear prompt
	window.deferredPrompt = null;
});

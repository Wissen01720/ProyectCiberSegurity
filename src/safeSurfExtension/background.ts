chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (details.url.includes("phishing")) {
        // Aquí puedes añadir detección más avanzada
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "Alerta de Seguridad",
          message: "Se ha detectado un posible sitio de phishing."
        });
        return { cancel: true };
      }
      return { cancel: false };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  
(() => {
  // Función para verificar patrones específicos en la página
  const detectUnsafePatterns = (): boolean => {
    // Aquí puedes agregar lógica para detectar patrones inseguros
    // Ejemplo: buscar palabras clave en el contenido de la página
    const unsafeKeywords = ["phishing", "malware", "inseguro"];
    const pageContent = document.body?.innerText || "";
    return unsafeKeywords.some(keyword => pageContent.includes(keyword));
  };

  // Función para mostrar la advertencia
  const showWarningBanner = () => {
    const warningBanner = document.createElement("div");
    warningBanner.textContent = "¡Advertencia: esta página podría no ser segura!";
    warningBanner.style.cssText = `
      position: fixed;
      top: 0;
      width: 100%;
      background-color: red;
      color: white;
      text-align: center;
      padding: 10px;
      z-index: 9999;
    `;

    if (document.body) {
      document.body.prepend(warningBanner);
    }
  };

  // Verificar patrones y mostrar advertencia si es necesario
  if (detectUnsafePatterns()) {
    showWarningBanner();
  }

  // Envía mensajes al background script (opcional)
  chrome.runtime.sendMessage({ message: "Página cargada" });
})();
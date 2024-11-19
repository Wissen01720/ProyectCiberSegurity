// Background script for SafeSurf extension
console.log('SafeSurf Background Script Running');

// Listen for web requests
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Add security checks here
    console.log('Checking request:', details.url);
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
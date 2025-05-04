function acceptCookies() {
  document.getElementById("cookieConsent").classList.add("hidden");
  // Hier kun je logica toevoegen om de keuze op te slaan, bijv. in localStorage
  localStorage.setItem("cookieConsent", "accepted");
}

function declineCookies() {
  document.getElementById("cookieConsent").classList.add("hidden");
  // Hier kun je logica toevoegen om de keuze op te slaan
  localStorage.setItem("cookieConsent", "declined");
}

// Controleer of de gebruiker al een keuze heeft gemaakt
window.onload = function () {
  if (localStorage.getItem("cookieConsent")) {
    document.getElementById("cookieConsent").classList.add("hidden");
  }
};

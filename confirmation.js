// création de la page qui affiche le message de confirmation
function showData() {
  if (sessionStorage.getItem('order') == null || sessionStorage.getItem('prixTotal') == null) {
    window.location.href = "index.html";
  }

  let data = JSON.parse(sessionStorage.getItem('order'));
  let prix = JSON.parse(sessionStorage.getItem('prixTotal'));
  const message = document.getElementById("total-confirm");

  const paragraphDiv = document.createElement("div");
  message.appendChild(paragraphDiv);
  paragraphDiv.setAttribute("class", "alert alert-success ")
  const paragraph = document.createElement("p")
  paragraph.setAttribute("class", "alert-heading .mt-auto")
  paragraphDiv.appendChild(paragraph);
  // affichage de message de confirmation 
  paragraph.innerHTML =
    "Merci pour votre commande<br> Le numéro de la commande :<br> " + data.orderId + " <br>Total = " + prix + " €<br> A bientôt "

  const retourDiv = document.createElement("div")
  message.appendChild(retourDiv);
  retourDiv.setAttribute("class", "row");
  const retour = document.createElement("button");
  retourDiv.appendChild(retour);
  retour.textContent = "Retour à l'accueil";
  retour.setAttribute("class", "btn btn-primary btn-lg col-sm-5 mx-auto");
  retour.addEventListener("click", function () {

    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html"
  })
}
showData()
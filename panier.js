getTeddyInfo = (id) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (
        this.readyState == XMLHttpRequest.DONE &&
        this.status >= 200 &&
        this.status < 400
        ) {
        resolve(JSON.parse(this.response));

        console.log("Connecté");
      } else {
        console.log("non-connecté")
      }
    };
    request.open("GET", "http://localhost:3000/api/teddies/"+id,true);
    request.send();
  });
};
//fonction dans la page panier pour gérer les produits et recevoir les data de localstorage 

async function showTeddyInCart(){


  var panier = JSON.parse(localStorage.getItem("panier"));
  var total = 0;
  const cellTotal = document.getElementById("total");
  if (panier != null ){
    for(i = 0; i < panier.length; i++)
    {

      const id = panier[i]

      const teddy = await getTeddyInfo(id);



      const tableEl = document.getElementById("table-achat");
      const lignePanier = document.createElement("tr");
      tableEl.appendChild(lignePanier);
      const cellNamePanier = document.createElement("td");  
      cellNamePanier.setAttribute("scope", "col")
      lignePanier.appendChild(cellNamePanier);
      const cellPrice = document.createElement ("td");
      lignePanier.appendChild(cellPrice);
      cellPrice.setAttribute("scope", "col")
      cellNamePanier.textContent = teddy.name;
      cellPrice.innerHTML = teddy.price/100+" €";

      total += (teddy.price/100);


    }
    // creer un cell pour le total de produits et stocké ça dans sessionStorage
    cellTotal.textContent = total;
    sessionStorage.setItem('prixTotal', JSON.stringify(total));
  }

}
// préparer les data pour un requet ajax POST qui envoie les values des inputes de forumulaires au API 
function sendData(){
  submit = document.getElementById("submit");
  submit.addEventListener("click", function(event) {

    event.preventDefault();

    const champ_prenom =document.getElementById("prenom");
    const champ_nom =  document.getElementById("nom");
    const champ_adresse = document.getElementById("adresse");
    const champ_ville = document.getElementById("ville");
    const champ_mail = document.getElementById("mail");

   // objet qui contient les info de l'utilisateur rempli au forumulaire 

   const contact ={
    "firstName" : champ_prenom.value,
    "lastName" : champ_nom.value,
    "address" : champ_adresse.value,
    "city" : champ_ville.value,
    "email" : champ_mail.value
      }
    // id de produit recu de localStorage
    const products = JSON.parse(localStorage.getItem("panier"));

    const obj ={"contact" : contact, "products" : products};

    const data =  JSON.stringify(obj);
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // prevenir l'utilisateur si l'un des champs est vide par un message 
    if(contact.firstName == "" ){
     const prenomAide =document.getElementById("prenom-aide");
     prenomAide.textContent = "prénom est invalide";
     prenomAide.style.color = "red";
     return event.preventDefault();
        }
    else if(contact.lastName == ""){
      const nomAide =document.getElementById("nom-aide");
      nomAide.textContent = "nom est invalide";
      nomAide.style.color = "red";
      return event.preventDefault();

      }
    else if ( contact.address==""){
      const adresseAide =document.getElementById("adress-aide");
      adresseAide.textContent = "adresse est invalide";
      adresseAide.style.color = "red";
      return event.preventDefault();

      }
    else if(contact.city==""){
      const villeAide =document.getElementById("ville-aide");
      villeAide.textContent = "ville est invalide";
      villeAide.style.color = "red";
      return event.preventDefault();
      }
    else if(products == null){
    return event.preventDefault();
    }
  
    else{ 
      if (regexEmail.test(contact.email)){
        confirmation(data);
    
      }
      else
      {
        const mailAide =document.getElementById("email-aide")
        mailAide.style.color = "red";
        mailAide.textContent = "email forme est incorrect"
      return event.preventDefault()

        
      }


        
      }
  });
}  
  // Ajax POST pour les produits selectionnes et les info de forumulaires
confirmation = (data) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (
        this.readyState == XMLHttpRequest.DONE &&
        this.status >= 200 &&
        this.status < 400
        ) {
        resolve(JSON.parse(this.responseText));
        console.log("envoyé");
        let confirmation = this.responseText;
        // utiliser le sessionStoragepour stocké les id de produits selectionnés
        sessionStorage.setItem('order', confirmation);
        // vider le localstorage après le message de confirmation 
        localStorage.clear();
          window.location.href = "confirmation.html";


        } else {
            console.log("non-envoyé")
        }
      };
      request.open("POST", "http://localhost:3000/api/teddies/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(data);
  });
};
showTeddyInCart()
sendData()
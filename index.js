// requet pour demander les produit de API.
getAllTeddies = () => {
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
    request.open("GET", "http://localhost:3000/api/teddies/",true);
    request.send();
  });
};
// creation  de page  index.html in javascript et afficher les produits dans la page.
async function teddies() {
  const teddies = await getAllTeddies();
  teddies.forEach((teddy) => {

    var mainEl = document.getElementById("main");
    var productListEl = document.createElement("section");
    var leftProduct = document.createElement("div");
    var imageEl =document.createElement("img");
    var rightProduct = document.createElement("div");
    var nameProduct = document.createElement("h2");  		
    var priceProduct =document.createElement("p");
    var infoProduct = document.createElement("a");
    infoProduct.setAttribute("class", "btn btn-primary btn-sm"); 
   // utiliser les éléments crees pour afficher les produits 

   imageEl.src =teddy.imageUrl;
   nameProduct.textContent =teddy.name;
   priceProduct.textContent=teddy.price /100+" euro";
   infoProduct.textContent= " plus d'info !";
   infoProduct.href = "produit.html?id=" + teddy._id;


   mainEl.appendChild(productListEl);
   productListEl.appendChild(leftProduct);
   leftProduct.appendChild(imageEl);
   productListEl.appendChild(rightProduct);
   rightProduct.appendChild(nameProduct);
   rightProduct.appendChild(priceProduct);
   rightProduct.appendChild(infoProduct);



   productListEl.setAttribute("class", "product-list");
   leftProduct.setAttribute("class", "product-list__photo");
   rightProduct.setAttribute("class", "product-list__info");

 });
};
// demander un produit tout seul pour afficher ses détails dans une page Ajax GET
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
// création de page pour afficher la description de produit dans la page produit.html et

async function teddyInfo(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const teddy = await getTeddyInfo(id);
  var mainInfo = document.getElementById("mainInfo");
  var productInfo = document.createElement("section");
  var leftInfo = document.createElement("div");
  var imageInfo =document.createElement("img");
  var rightInfo = document.createElement("div");
  var nameInfo = document.createElement("h2");     
  var priceInfo =document.createElement("p");
  var descInfo = document.createElement("p");
  var colorsInfo = document.createElement("select")
  var panierButton= document.createElement("button");

  

  mainInfo.appendChild(productInfo);
  productInfo.appendChild(leftInfo);
  productInfo.appendChild(rightInfo);
  leftInfo.appendChild(imageInfo);
  rightInfo.appendChild(nameInfo);
  rightInfo.appendChild(priceInfo);
  rightInfo.appendChild(descInfo);
  rightInfo.appendChild(colorsInfo);
  rightInfo.appendChild(panierButton);


  // afficher les information de la requet API dans la page produit.html
  imageInfo.src =teddy.imageUrl;
  nameInfo.textContent =teddy.name;
  priceInfo.textContent=teddy.price /100+" euro";
  panierButton.textContent= " Ajouter au panier";
  descInfo.textContent =teddy.description;
  leftInfo.setAttribute("class", "produit-photo");
  rightInfo.setAttribute("class", "produit-info");
  productInfo.setAttribute("class", "produit-block");
  colorsInfo.setAttribute("class", " custom-select color-button");
  panierButton.setAttribute("class", "btn btn-primary btn-sm")
  panierButton.setAttribute("data", "id")



  // utiliser le loup pour les options des couleurs des produits dans la page produit.html
  for (var i = 0; i < teddy.colors.length; i++) {
    var color =teddy.colors[i];
    var colorsOption = document.createElement("option");
    colorsOption.textContent= color;
    colorsInfo.appendChild(colorsOption);

  }
  // envoyer les id en utilisant le localStorage pour les recevoir et les ajouter  dans le panier 

  panierButton.addEventListener("click",function (){
    panierButton.textContent ="ajoutée au panier";

    var panier = JSON.parse(localStorage.getItem("panier"));

    var nb_prod = 0;
    if(panier != null)
    {
      nb_prod = panier.length;
    }


    if(nb_prod > 0)
    {
      panier.push(teddy._id);
    }
    else
    {
      panier = [teddy._id];
    }
    panier = JSON.stringify(panier);

    localStorage.setItem("panier", panier)
  });
}

//fonction dans la page panier pour gérer les produits et recevoir les data de localstorage 

async function showTeddyInCart(){


  var panier = JSON.parse(localStorage.getItem("panier"));
  var total = 0;
  var cellTotal = document.getElementById("total");
  if (panier != null ){
    for(i = 0; i < panier.length; i++)
    {

      var id = panier[i]

      var teddy = await getTeddyInfo(id);



      var tableEl = document.getElementById("table-achat");
      var lignePanier = document.createElement("tr");
      tableEl.appendChild(lignePanier);
      var cellNamePanier = document.createElement("td");  
      cellNamePanier.setAttribute("scope", "col")
      lignePanier.appendChild(cellNamePanier);
      var cellPrice = document.createElement ("td");
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

    var champ_prenom =document.getElementById("prenom");
    var champ_nom =  document.getElementById("nom");
    var champ_adresse = document.getElementById("adresse");
    var champ_ville = document.getElementById("ville");
    var champ_mail = document.getElementById("mail");

   // objet qui contient les info de l'utilisateur rempli au forumulaire 

   var contact ={
    "firstName" : champ_prenom.value,
    "lastName" : champ_nom.value,
    "address" : champ_adresse.value,
    "city" : champ_ville.value,
    "email" : champ_mail.value
      }
    // id de produit recu de localStorage
    var products = JSON.parse(localStorage.getItem("panier"));

    var obj ={"contact" : contact, "products" : products};

    var data =  JSON.stringify(obj);
    // prevenir l'utilisateur si l'un des champs est vide par un message 
    if(contact.firstName == "" ){
     var prenomAide =document.getElementById("prenom-aide");
     prenomAide.textContent = "prénom est invalide";
     prenomAide.style.color = "red";
     return event.preventDefault();
        }
    else if(contact.lastName == ""){
      var nomAide =document.getElementById("nom-aide");
      nomAide.textContent = "nom est invalide";
      nomAide.style.color = "red";
      return event.preventDefault();

      }
    else if ( contact.address==""){
      var adresseAide =document.getElementById("adress-aide");
      adresseAide.textContent = "adresse est invalide";
      adresseAide.style.color = "red";
      return event.preventDefault();

      }
    else if(contact.city==""){
      var villeAide =document.getElementById("ville-aide");
      villeAide.textContent = "ville est invalide";
      villeAide.style.color = "red";
      return event.preventDefault();
      }
    else if(contact.email==""){
      var mailAide =document.getElementById("email-aide");
      mailAide.textContent = "email est invalide";
      mailAide.style.color = "red";
      return event.preventDefault()
      }
    else{ 


        confirmation(data);
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
// création de la page qui affiche le message de confirmation
function showData(){
  if(sessionStorage.getItem('order') == null || sessionStorage.getItem('prixTotal') == null)
  {
    window.location.href= "index.html";
  }

  let data = JSON.parse(sessionStorage.getItem('order'));
  let prix = JSON.parse(sessionStorage.getItem('prixTotal'));
  var message = document.getElementById("total-confirm");


  var paragraphDiv = document.createElement("div");
  message.appendChild(paragraphDiv);
  paragraphDiv.setAttribute("class", "alert alert-success ")
  var paragraph = document.createElement("p")
  paragraph.setAttribute("class", "alert-heading .mt-auto")
  paragraphDiv.appendChild(paragraph);
  // affichage de message de confirmation 
  paragraph.innerHTML = 
  "Merci pour votre commande<br> Le numéro de la commande :<br> "+data.orderId+" <br>Total = "+prix+" €<br> A bientôt "

  var retourDiv = document.createElement("div")
  message.appendChild(retourDiv);
  retourDiv.setAttribute("class", "row");
  var retour = document.createElement("button");
  retourDiv.appendChild(retour);
  retour.textContent = "Retour à l'accueil";
  retour.setAttribute("class", "btn btn-primary btn-lg col-sm-5 mx-auto");
  retour.addEventListener("click", function (){

    localStorage.clear();
    sessionStorage.clear();
    window.location.href ="index.html"  
  })

  
}
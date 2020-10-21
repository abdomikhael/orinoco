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
  const mainInfo = document.getElementById("mainInfo");
  const productInfo = document.createElement("section");
  const leftInfo = document.createElement("div");
  const imageInfo =document.createElement("img");
  var rightInfo = document.createElement("div");
  const nameInfo = document.createElement("h2");     
  const priceInfo =document.createElement("p");
  const descInfo = document.createElement("p");
  var colorsInfo = document.createElement("select")
  const panierButton= document.createElement("button");

  

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
    const color =teddy.colors[i];
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

teddyInfo() 




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
// la page HTML après l'appel de produit :



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
getteddyInfo = (id) => {
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



async function teddyInfo(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  console.log(id)

  const teddy = await getteddyInfo(id);
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

  console.log(teddy)
  




  for (var i = 0; i < teddy.colors.length; i++) {
    var color =teddy.colors[i];
    var colorsOption = document.createElement("option");
    colorsInfo.appendChild(colorsOption);

    colorsOption.textContent= teddy.colors;

  }

  


  panierButton.addEventListener("click",function displayIncart (){




   panierButton.textContent ="i love you";
   var counte = document.getElementById("counter");
   counte++;
   let nameTeddy = JSON.stringify(teddy.name);
   localStorage.setItem("name",nameTeddy);
   let priceTeddy = JSON.stringify(teddy.price);
   localStorage.setItem("price", teddy.price);
   let imageTeddy = JSON.stringify(teddy.imageUrl);
   localStorage.setItem("image", teddy.imageUrl);
   let colorTeddy = JSON.stringify(teddy.colors[i]);
   localStorage.setItem("color", colorTeddy);


   console.log(localStorage)




 });


}
function addTeddyToCart(){





  var menuPanier = document.getElementById("basket-menu");
  var sectionPanier = document.createElement("section");
  menuPanier.appendChild(sectionPanier);
  var table = document.createElement("table");
  sectionPanier.appendChild(table);



  var ligneTitre = document.createElement("tr");
  table.appendChild(ligneTitre);
  var lignePanier = document.createElement("tr");
  table.appendChild(lignePanier);
  var ligneTotal = document.createElement("tr");
  table.appendChild(ligneTotal);
  var titreImage = document.createElement("th");

  titreImage.textContent = "Image";

  var titreName =document.createElement("th")
  titreName.textContent ="Nom";
  var titrePrix = document.createElement("th");
  titrePrix.textContent ="prix";
  var titreColor =document.createElement("th");
  titreColor.textContent = "couleur"
  ligneTitre.appendChild(titreImage);
  ligneTitre.appendChild(titreName);
  ligneTitre.appendChild(titrePrix);
  ligneTitre.appendChild(titreColor)
  

  

  var cellImagePanier = document.createElement("td");
  var imagePanier =document.createElement("img");
  cellImagePanier.appendChild(imagePanier);
  var cellNamePanier =document.createElement("td");
  var cellPrice = document.createElement("td");
  var cellColor =document.createElement("td");
  lignePanier.appendChild(cellImagePanier);
  

  


  

  

  lignePanier.appendChild(cellNamePanier);

  lignePanier.appendChild(cellPrice);

  lignePanier.appendChild(cellColor);
  var cellButtonQuntity = document.createElement("div");
  lignePanier.appendChild(cellButtonQuntity);
  cellButtonQuntity.setAttribute("class", "number-input md-number-input")  
  var buttonQuantityMinus = document.createElement("button");
  cellButtonQuntity.appendChild(buttonQuantityMinus);
  buttonQuantityMinus.setAttribute("class", "minus");
  buttonQuantityMinus.setAttribute("onclick", "this.parentNode.querySelector('input[type=number]').stepDown()") ;
  var inputQuantity = document.createElement("input");
  cellButtonQuntity.appendChild(inputQuantity);
  inputQuantity.setAttribute("class", "quantity")
  inputQuantity.setAttribute("min", "0")
  inputQuantity.setAttribute("name", "quantity");
  inputQuantity.setAttribute("value", "1");
  inputQuantity.setAttribute("type", "number")
  ;  var buttonQuantityPlus =document.createElement("button");
  cellButtonQuntity.appendChild(buttonQuantityPlus);
  buttonQuantityPlus.setAttribute("class", "plus");
  buttonQuantityPlus.setAttribute("onclick", "this.parentNode.querySelector('input[type=number]').stepUp()");
  var buttonRemove =document.createElement("button");
  lignePanier.appendChild(buttonRemove);
  buttonRemove.setAttribute("class", "btn btn-outline-danger");
  buttonRemove.textContent = "supprimer"




  var cellTotalTitre =document.createElement("td");
  ligneTotal.appendChild(cellTotalTitre);
  cellTotalTitre.textContent = "Total";
  var cellTotalAmount = document.createElement("td");
  ligneTotal.appendChild(cellTotalAmount);

  var blockButtonCommande = document.createElement("button");
  sectionPanier.appendChild(blockButtonCommande);
  blockButtonCommande.setAttribute("class", "btn btn-primary btn-lg btn-block");
  blockButtonCommande.textContent = "Passer la commande"

  var buttonTotal = document.createElement("td");
  ligneTotal.appendChild(buttonTotal);



  var name =  localStorage.getItem("name");
  cellNamePanier.innerHTML = name;
  var price = localStorage.getItem("price");
  cellPrice.innerHTML =price/100+" €";
  var image = localStorage.getItem("image");
  imagePanier.src = image;
  imagePanier.setAttribute("class", "image-cart");

  var Color = localStorage.getItem("color");
  cellColor.innerHTML = color;
  var totalObjet = inputQuantity.value * price ;
  console.log(totalObjet);




  cellImagePanier.src = image;
  lignePanier.setAttribute("class", "product-cart");
  cellImagePanier.setAttribute("class", "image-cart");
  buttonRemove.addEventListener("click", function removeItem(){
  buttonRemove.textContent = "i am here"
      });
  /*  Localstorage.removeItem("name");
    Localstorage.removeItem("price");
    Localstorage.removeItem("image");
    Localstorage.removeItem("color");
    element.parentNode.removeChild(cellButtonQuntity)*/


  

  
}




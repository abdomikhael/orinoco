



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
   infoProduct.setAttribute("class", "product-button")


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
  colorsInfo.setAttribute("class", "color-button");

  console.log(teddy)
  var colorsOption = document.createElement("option");
  var colorsOption2 = document.createElement("option");
  var colorsOption3= document.createElement("option");  
  var colorsOption4 = document.createElement("option");




  colorsInfo.appendChild(colorsOption);
  colorsInfo.appendChild(colorsOption2);
  colorsInfo.appendChild(colorsOption3);
  colorsInfo.appendChild(colorsOption4);

  colorsOption.textContent= teddy.colors;
  colorsOption2.textContent= teddy.colors;
  colorsOption3.textContent= teddy.colors;
  colorsOption4.textContent= teddy.colors;
  





  panierButton.addEventListener("click",function IL (){




   panierButton.textContent ="i love you";
   var counte = document.getElementById("counter");
   counte++;
   let nameTeddy = JSON.stringify(teddy.name);
   localStorage.setItem("name",nameTeddy);
   let priceTeddy = JSON.stringify(teddy.price);
   localStorage.setItem("price", teddy.price);
   let imageTeddy = JSON.stringify(teddy.imageUrl);
   localStorage.setItem("image", teddy.imageUrl);
   let colorTeddy = JSON.stringify(teddy.colors);
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
  var lignePanier = document.createElement("tr");
  table.appendChild(lignePanier);

  var titreImage = document.createElement("th");
    lignePanier.appendChild(titreImage);

  titreImage.textContent = "Image";


  var titreName =document.createElement("th")
  lignePanier.appendChild(titreName);
  titreName.textContent ="Nom";
  var titrePrix = document.createElement("th");
  lignePanier.appendChild(titrePrix);
  titrePrix.textContent ="prix";
  var titreColor =document.createElement("th");
  lignePanier.appendChild(titreColor);
  titreColor.textContent = "couleur"
  var cellImagePanier = document.createElement("img");
  var cellNamePanier =document.createElement("td");
  var cellPrice = document.createElement("td");
  var cellColor =document.createElement("td");
  lignePanier.appendChild(cellImagePanier);
  titreImage.appendChild(cellImagePanier)
  lignePanier.appendChild(cellNamePanier);
  titreName.appendChild(cellNamePanier)
  lignePanier.appendChild(cellPrice);
  titrePrix.appendChild(cellPrice)
  lignePanier.appendChild(cellColor);


  var name =  localStorage.getItem("name");
  cellNamePanier.innerHTML = name;
  var price = localStorage.getItem("price");
  cellPrice.innerHTML =price/100+" €";
  var image = localStorage.getItem("image");
  cellImagePanier.src = image;
  cellImagePanier.setAttribute("class", "image-cart");

 /*var Color = localStorage.getItem("color");
  cellColor.innerHTML = color;



  cellImagePanier.src = image;
  lignePanier.setAttribute("class", "product-cart");
  cellImagePanier.setAttribute("class", "image-cart");*/


  
  

  





}




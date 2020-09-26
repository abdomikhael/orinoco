



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
  panierButton.setAttribute("data", "id")


  
  for (var i = 0; i < teddy.colors.length; i++) {
    var color =teddy.colors[i];
    var colorsOption = document.createElement("option");
    colorsOption.textContent= color;
    colorsInfo.appendChild(colorsOption);

    

  }

  


  panierButton.addEventListener("click",function displayIncart (){
    panierButton.textContent ="i love you";

    var panier = JSON.parse(localStorage.getItem("panier"));

    var nb_prod = 0;
    if(panier != null)
    {
      nb_prod = panier.length;
    }
    console.log(nb_prod)

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









async function showTeddyInCart(){


    var panier = JSON.parse(localStorage.getItem("panier"));

  for(i = 0; i < panier.length; i++)
  {

    var id = panier[i]

    var teddy = await getteddyInfo(id);
    console.log(teddy)

    
    var tableEl = document.getElementById("table-achat");
    var cellTotal = document.getElementById("total");

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
  
      
 
        
        cellTotal.textContent += teddy.price/100;

      


    }


    

    var submitButton = document.querySelectorAll("#submit")
    var form = document.querySelectorAll(".form")

  submitButton.addEventListener("click", function(){
      var contact =new contact(form);
      var produit = new produit(teedy)


      let request = new XMLHttpRequest();
      request.onload = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status >= 200 &&
          this.status < 400
          ) {
          const serverReponse =document.getElementById("message")
        serverReponse.innerHTML=  this.responseText;

        console.log("envoyé");
      } else {
        console.log("non-envoyé")
      }

      request.open("POST", "http://localhost:3000/api/teddies/order", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(contact, produit );

    }

  });
  }


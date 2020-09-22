



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
  var menuPanier = document.getElementById("basket-menu");
      var panier = JSON.parse(localStorage.getItem("panier"))
  
    
  var sectionPanier = document.createElement("section");
  menuPanier.appendChild(sectionPanier);
  var table = document.createElement("table");
  sectionPanier.appendChild(table);
  var ligneTitre = document.createElement("tr");
  table.appendChild(ligneTitre);
  var totalLigne = document.createElement("tr");
  sectionPanier.appendChild(totalLigne);

  var totalTitre = document.createElement("th");
  totalLigne.appendChild(totalTitre);
  totalTitre.textContent = "Total";
  var totalEl = document.createElement("td");
  totalLigne.appendChild(totalEl);
  


  
  var titreImage = document.createElement("th");
  titreImage.textContent = "Image";
  var titreName =document.createElement("th")
  titreName.textContent ="Nom";
  var titrePrix = document.createElement("th");
  titrePrix.textContent ="prix";
  ligneTitre.appendChild(titreImage);
  ligneTitre.appendChild(titreName);
  ligneTitre.appendChild(titrePrix);


  for(i = 0; i < panier.length; i++)
  {

    var id = panier[i]

    var teddy = await getteddyInfo(id);
    console.log(teddy)

      var lignePanier = document.createElement("tr");
  table.appendChild(lignePanier);
    var cellImagePanier = document.createElement("td");
    var imagePanier =document.createElement("img");
    cellImagePanier.appendChild(imagePanier);
    var cellNamePanier =document.createElement("td");
    var cellPrice = document.createElement("td");


 
    var buttonRemove =document.createElement("button");
     
    lignePanier.appendChild(cellImagePanier);
    lignePanier.appendChild(cellNamePanier);
    lignePanier.appendChild(cellPrice);



    lignePanier.appendChild(buttonRemove);
    
    
      lignePanier.setAttribute("class", "product-cart");

    cellImagePanier.setAttribute("class", "image-cart");
    
   

    buttonRemove.setAttribute("class", "btn btn-outline-danger"); 
      buttonRemove.textContent = "supprimer"
      cellNamePanier.textContent = teddy.name;
      cellPrice.innerHTML = teddy.price/100+" €";
      imagePanier.src = teddy.imageUrl;

  
  
        

  buttonRemove.addEventListener("click", function(id){

    
   
        lignePanier.remove(id)
  
  panier = JSON.stringify(panier);

  localStorage.removeItem("panier", panier)
})


  

  

  }

  
    }
function form(){
  var menuPanier = document.getElementById("basket-menu")

  var form =document.createElement("form")
    menuPanier.appendChild(form)
    form.setAttribute("class", "form-user")
  var formGroup = document.createElement("div");
  form.appendChild(formGroup);
  formGroup.setAttribute("class", "form-group row");
  var labelNom = document.createElement("label");
  formGroup.appendChild(labelNom);
  labelNom.setAttribute("class", "col-sm-2 col-form-label")
  var divUser = document.createElement("div");
  formGroup.appendChild(divUser);
  divUser.setAttribute("class", "col-sm-6")
   var userName = document.createElement("input");
  userName.setAttribute("for", "form-Nom");
  labelNom.textContent = "Nom";
  userName.required;
 
  divUser.appendChild(userName);
  userName.setAttribute("class", "form-control");
  userName.setAttribute("type", "text")
  userName.setAttribute("placeholder", "Nom");
  userName.setAttribute("id", "form-Nom");

var formGroupMail = document.createElement("div");
  form.appendChild(formGroupMail);
  formGroupMail.setAttribute("class", "form-group row");
  var labelMail = document.createElement("label");
  formGroupMail.appendChild(labelMail);
  labelMail.setAttribute("class", "col-sm-2 col-form-label")
  var divUserMail = document.createElement("div");
  formGroupMail.appendChild(divUserMail);
  divUserMail.setAttribute("class", "col-sm-6")
   var userMail = document.createElement("input");
  userMail.setAttribute("for", "form-mail");
  userMail.required;
  labelMail.textContent = "Email";
 
  divUserMail.appendChild(userMail);
  userMail.setAttribute("class", "form-control");
  userMail.setAttribute("type", "email")
  userMail.setAttribute("placeholder", "email@mail.com");
  userMail.setAttribute("id", "form-phone");

var formGroupAdress = document.createElement("div");
  form.appendChild(formGroupAdress);
  formGroupAdress.setAttribute("class", "form-group row");
  var labelAdress = document.createElement("texarea");
  formGroupAdress.appendChild(labelAdress);
  labelAdress.setAttribute("class", "col-sm-2 col-form-label")
  var divUserAdress = document.createElement("div");
  formGroupAdress.appendChild(divUserAdress);
  divUserAdress.setAttribute("class", " row-2 col-sm-6")
   var userAdress = document.createElement("input");
  userAdress.setAttribute("for", "form-adress");
  labelAdress.textContent = "Adresse";
 
  divUserAdress.appendChild(userAdress);
  userAdress.setAttribute("class", "form-control");
  userAdress.setAttribute("type", "text")
  userAdress.setAttribute("placeholder", "Votre adress");
  userAdress.setAttribute("id", "form-adress");
  userAdress.required;


  var formGroupPhone = document.createElement("div");
  form.appendChild(formGroupPhone);
  formGroupPhone.setAttribute("class", "form-group row");
  var labelPhone = document.createElement("label");
  formGroupPhone.appendChild(labelPhone);
  labelPhone.setAttribute("class", "col-sm-2 col-form-label")
  var divUserPhone = document.createElement("div");
  formGroupPhone.appendChild(divUserPhone);
  divUserPhone.setAttribute("class", "col-sm-6")
   var userPhone = document.createElement("input");
  userPhone.setAttribute("for", "form-phone");
  labelPhone.textContent = "Téléphone";
  userPhone.required;
 
  divUserPhone.appendChild(userPhone);
  userPhone.setAttribute("class", "form-control");
  userPhone.setAttribute("type", "number")
  userPhone.setAttribute("placeholder", "Téléphone");
  userMail.setAttribute("id", "form-phone");
      
    var blockButtonCommande = document.createElement("a");
  form.appendChild(blockButtonCommande);
  blockButtonCommande.href = "confirmation.html"
  blockButtonCommande.setAttribute("class", "btn btn-primary col-sm-8 btn-lg btn-block");
  blockButtonCommande.setAttribute("type", "submit")
  blockButtonCommande.textContent = "Passer la commande"
}

  

    


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

    const mainEl = document.getElementById("main");
    const productListEl = document.createElement("section");
    const productImageSection = document.createElement("div");
    const imageEl =document.createElement("img");
    const productInfoSection  = document.createElement("div");
    const nameProduct = document.createElement("h2");  		
    const priceProduct =document.createElement("p");
    const infoProduct = document.createElement("a");
    infoProduct.setAttribute("class", "btn btn-primary btn-sm"); 
   // utiliser les éléments crees pour afficher les produits 

   imageEl.src =teddy.imageUrl;
   nameProduct.textContent =teddy.name;
   priceProduct.textContent=teddy.price /100+" euro";
   infoProduct.textContent= " plus d'info !";
   infoProduct.href = "produit.html?id=" + teddy._id;


   mainEl.appendChild(productListEl);
   productListEl.appendChild(productImageSection);
   productImageSection.appendChild(imageEl);
   productListEl.appendChild(productInfoSection);
   productInfoSection.appendChild(nameProduct);
   productInfoSection.appendChild(priceProduct);
   productInfoSection.appendChild(infoProduct);



   productListEl.setAttribute("class", "product-list");
   productImageSection.setAttribute("class", "product-list__photo");
   productInfoSection.setAttribute("class", "product-list__info");

 });
};

teddies();
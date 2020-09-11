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
	request.open("GET", "http://localhost:3000/api/teddies",true);
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
  		
  			imageEl.src =teddy.imageUrl;
  			nameProduct.textContent =teddy.name;
  			priceProduct.textContent=teddy.price /100+" euro";

  			mainEl.appendChild(productListEl);
  			productListEl.appendChild(leftProduct);
  			leftProduct.appendChild(imageEl);
  			productListEl.appendChild(rightProduct);
  			rightProduct.appendChild(nameProduct);
  			rightProduct.appendChild(priceProduct);
  			

  			
  			productListEl.setAttribute("class", "product-list");
  			leftProduct.setAttribute("class", "product-list__photo");
  			rightProduct.setAttribute("class", "product-list__info");


  							});




			
	};


		
	








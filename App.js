// alert("Works!");

class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    /** Se accede a la parte del documento que se encarga de mostrar los elementos del <div id="product-list" class="col-md-8"></div> y se guarda en una constante, "producList" en este caso.
     */
    const productList = document.getElementById("product-list");

    /** Se crea un elemento para luego darselo al createElement("div"). Una vez diseñado el producto en la interface de usuario, se lo damos al productList que es el product-list del <div id="product-list" class="col-md-8"></div>
     */
    const element = document.createElement("div");
    //Esto dentro del "div"
    //clases desde BOOTSTRAP card, text-center, mb-4 margin button, card-body para ordenar el contenido de la tarjeta/card
    element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Product Name</strong>: ${product.name}
                <strong>Product Price</strong>: ${product.price}
                <strong>Product Year</strong>: ${product.year}
                <a href= "#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
        `;
    //Para insertarlo en un elemento hijo
    productList.appendChild(element);

    //this.resetForm(); Desde la misca clase llama a otro método
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      /**A través de la constante "element" que contiene un elemento document.createElement("div"), se rescata el name="delete" del <a href= "#" class="btn btn-danger" name="delete">Delete</a> y se elimina el elemento completo con el método remove() mediante la propiedad parentElement que permite acceder al elemento padre de donde se encuenta lo que se quiera eliminar*/
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Product Deleted Successfully", "success");
    }
  }

  showMessage(message, cssClass) {
    //Se crea un elemento div y se guarda en una constante
    const div = document.createElement("div");
    //Se inserta a través de la propiedad className una alerta con la clase de BOOSTRAP a usar. (cssClass == "success")
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    //SHOWING IN DOM
    //Seleccionando <div class="container"> y guadado en "container"
    const container = document.querySelector(".container");

    //Seleccionando <div id="App" class="row pt-5"> y guadado en "app"
    const app = document.querySelector("#App");

    //Insertando un mensaje a través del elemento creado y guardado en la constante div, antes del elemento seleccionado con el método querySelector() guardado en la constante app
    container.insertBefore(div, app);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

//DOM Events "e"
document.getElementById("product-form").addEventListener("submit", function(e) {
  //**Para mostrar por consola el resultado
  /*id formulario "product-form" - id submit input*/

  //alert("Formulario Enviado");
  //console.log(document.getElementById("name").value);
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;

  console.log(name, price, year);
  console.log(new Product(name, price, year));

  //Create constant for a New Object as Product
  //console.log(new Product(name, price, year));

  const product = new Product(name, price, year);

  //Llamando a la clase de interfaz UI(), usando sus métodos y se le entrega como parámetro el objeto "product" previamente creado.

  const ui = new UI();

  //Comprobando campos vacios
  if (name === "" || price === "" || year === "") {
    return ui.showMessage("Complete Fields Please", "danger");
  }

  //Ejecutando método
  ui.addProduct(product);

  //Desde fuera de la clase para dar reset al formulario completo
  ui.resetForm(); 

  //Se ejecuta el método y se le da por parámetros el mensaje y la clase de BOOTSTRAP "success"
  ui.showMessage("Product Added Seccessfully", "primary");

  //Prevee el refresh de página
  e.preventDefault();
});

document.getElementById("product-list").addEventListener("click", function(e) {
  //alert("Eliminando");
  //console.log(e.target);
  const ui = new UI();
  ui.deleteProduct(e.target);
});

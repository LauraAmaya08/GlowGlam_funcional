
//ejecuta el Javascript cuando carga el DOM

document.addEventListener("DOMContentLoaded", async () => {
  
  //Dinamismo del menú desplegable

  const elementoLista = document.querySelectorAll(".lista__boton--click");//Selecciona los elementos que tengan sublistas en ellos

  elementoLista.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle("arrow");//crea un evento y asgina la clase arrow (animación de la flecha)
      let height = 0;
      let menu = element.nextElementSibling; // Obtiene el siguiente elemento hermano del elemento actual(el submenú)
      console.log(menu.scrollHeight);  //Imprime la altura total del contenido del menú (incluyendo el contenido no visible)
      if (menu.clientHeight == 0) {// Verifica si la altura actual del menú es 0
        height = menu.scrollHeight; //A la variable height le asigna la altura del submenú
        menu.style.height = height + "px"; // Ajusta la altura del menú para que sea visible
      } else {
        menu.style.height = "0px"; //Si el menú esta abierto, lo cierra
      }
    });
  });

  const abrirMenu = document.getElementById("abrir");//Obtiene el botón que abre el menú
  const cerrarMenu = document.getElementById("cerrar");//Obtiene el botón que cierra el menú

  abrirMenu.addEventListener("click", () => {
    console.log("ok");//Validación
    let menu = document.querySelector(".navegador");//Obtiene el navegador (está oculto) definido en CSS
    menu.classList.toggle("visible");//Le agrega la clase que lo vuelve visible (definido en CSS)
  });

  cerrarMenu.addEventListener("click", () => {
    let menu = document.querySelector(".navegador");
    menu.classList.remove("visible");//Remueve la clase
  });


  //FAQ

  const abrirPregunta = document.querySelectorAll(".faq-pregunta"); //Obtiene el bloque de la pregunta
  abrirPregunta.forEach((element) => {
    element.addEventListener("click", () => {
      let itemFaq = element.parentElement; // Obtiene el contenedor de la pregunta y respuesta
      document.querySelectorAll(".faq-item").forEach((element) => {
        if (element !== itemFaq) { //Si el elemento actual no es el que se clickeó, oculta la respuesta
          element.classList.remove("active");
        }
      });
      itemFaq.classList.toggle("active");// Muestra u oculta la respuesta de la pregunta clickeada
    });
  });
  if (window.location.pathname.includes("todosProductos")){
    cargarTodosLosProductos();
  } else if (window.location.pathname.includes("FBM")){
    cargarProductosPorMarca("Florence By Mills", "productosFBM");
  }else if (window.location.pathname.includes("fentyBeauty")){
    cargarProductosPorMarca("Fenty Beauty", "productosFB");
  }else if (window.location.pathname.includes("rareBeauty")){
    cargarProductosPorMarca("Rare Beauty", "productosRB");
  } else if (window.location.pathname.includes("rhode")){
    cargarProductosPorMarca("Rhode", "productosRhode");
  } else if (window.location.pathname.includes("productoDescrip")){
    mostrarProductoEspecifico();
    agregarCarrito()
  } else if (window.location.pathname.includes("carrito")){
    mostrarCarritoEnDOM()
    cuentaCarrito()
    mostrarMensajePago()
  } 
});
//Llamado de funciones para mostrar productos

//
//

//Cargar Json y mostrar Productos

const cargarJson = async () => {//Carga los datos del Json
  try {
    const respuesta = await fetch("../productos.json");
    if (respuesta.ok) {
      const datos = await respuesta.json();
      return datos.productos; //Retorna el array de los productos
    } else {
      throw new Error("Error al conectar con la base de datos");
    }
  } catch (error) {
    console.error("Error:", error.message); //Imprime el error
  }
};

const cargarTodosLosProductos = async () => {
  const productosArray = await cargarJson();//Espera los datos del Json
  try {
    let productos = "";
    productosArray.forEach((element) => { //Itera en cada producto y crea un div con información y clases para manejar en CSS
      let precio = element.precio;
      productos += `<div class = "producto">
            <a href="productoDescrip.html" class="productoEnlace" data-id="${
              element.id
            }">
            <img class= "imagenProducto" src= "../${element.imagen}" >
            <div class="info">
            <h2 class= "nombreProducto"> ${element.nombre}</h2>
            <h3 class= "precioProducto"> $${precio.toFixed(2)} </h3>
            <h3 class= "marcaNombre"> ${element.marca}</h3>
            </div>
            </a>
            </div>
            `;
    });
    document.getElementById("productos").innerHTML = productos;//Agrega los productos en la sección
    document.querySelectorAll(".productoEnlace").forEach((link) => {
      link.addEventListener("click", function (event) {
        const productoId = this.getAttribute("data-id"); //Obtiene el valor del atributo "data-id" del enlace clickeado (para mostrar la información específica del producto)
        localStorage.setItem("productoId", productoId); //Lo agrega en el local storage para usarlo en el html 'productoDescrip'
      });
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const cargarProductosPorMarca = async (marca, contenedorId) => { //La misma función se utiliza en todas las marcas, por ende se pude el nombre de la marca y el id del contenedor donde se agregarán los productos
  const productosArray = await cargarJson(); //Espera datos
  try {
    let productos = "";
    productosArray
      .filter((element) => element.marca === marca)//Filtra los productos comparando la martca ingresada con la marca del producto
      .forEach((element) => {
        let precio = element.precio;//Genera el HTML del producto
        productos += `<div class="producto">
                <a href="productoDescrip.html" class="productoEnlace" data-id="${
                  element.id
                }">
                    <img class="imagenProducto" src="../${element.imagen}" >
                    <div class="info">
                        <h2 class="nombreProducto"> ${element.nombre}</h2>
                        <h3 class="precioProducto"> $${precio.toFixed(2)} </h3>
                    </div>
                </a>
            </div>`;
      });
    document.getElementById(contenedorId).innerHTML = productos;//Lo agrega en el contenedor
    document.querySelectorAll(".productoEnlace").forEach((link) => {
      link.addEventListener("click", function (event) {
        const productoId = this.getAttribute("data-id");
        localStorage.setItem("productoId", productoId);//Ejecuta el mismo proceso de obtención del ID
      });
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const mostrarProductoEspecifico = async () => {
  const productosArray = await cargarJson();//Espera datos
  console.log(productosArray);
  try {
    const productoId = localStorage.getItem("productoId");//Accede al local storage para obtener el ID del producto a mostrar
    console.log("Producto ID recuperado:", productoId);//Imprime el ID para validar
    if (!productoId) {
      console.error("No se encontró el ID del producto");
      return;
    }
    const producto = productosArray.find((element) => element.id == productoId);//Recorre el Array de productos hasta encontrar el Id del producto en el local storage
    console.log(producto);
    if (!producto) {
      console.error("No se encontró el producto");//Si no se encuentra
      return;
    }

    //En el HTML "productoDescrip" ya existe la estructura, con esto se reemplaza la información 
    document.getElementById("nombreProducto").textContent = producto.nombre;
    document.getElementById(
      "precioProducto"
    ).textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById("descripcionProducto").textContent =
      producto.descrip;
    document.getElementById("imagenProducto").src = `../${producto.imagen}`;
    document.getElementById("productosize").textContent = producto.size;
    const infoProducto = document.querySelector(".infoProducto");
    //El botón no existe, se crea 
    const botonComprar = document.createElement("button");
    botonComprar.id = "comprar";
    botonComprar.textContent = "¡Agregar al Carrito!";
    infoProducto.appendChild(botonComprar);
    //Ejecuta agregar al carrito para agregar la funcionalidad al botón
    agregarCarrito();
  } catch (error) {
    console.error("Error:", error);
  }
};

let productosEnCarrito = [];//lista a agregar al local storage

const agregarCarrito = () => {
  const agregar = document.getElementById("comprar");//obtiene el botón
  if (agregar) {//Valida que exista
    agregar.addEventListener("click", async () => {
      const productoId = localStorage.getItem("productoId");//Obtiene los productos que se encuentren en el local storage
      if (productoId) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];// Obtiene el carrito, si no existe se inicializa como un array vacío.
        const productosArray = await cargarJson();//Espera datos
        const productoSeleccionado = productosArray.find(
          (producto) => producto.id == productoId
        ); //Busca el producto seleccionado en el array de productos basado en el id del producto
        const productoExistente = carrito.find(
          (producto) => producto.id == productoId
        );// Busca si el producto ya está en el carrito de compras.
        if (productoExistente) {
          productoExistente.cantidad += 1;//Si existe aumenta su cantidad con cada click
        } else {
          const nuevoProducto = {
            id: productoId,
            cantidad: 1,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio.toFixed(2),
            imagen: productoSeleccionado.imagen,
          };//Si no crea el producto con los datos a mostrar en el carrito
          carrito.push(nuevoProducto);//Agrega al local storage
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));// Guarda el carrito actualizado en el almacenamiento local
        mostrarCarritoEnDOM();// Llama a una función para mostrar el carrito actualizado en el DOM
      } else {
        console.error("Error al cargar el producto en el carrito");
      }
    });
  } else {
    console.error("Elemento con ID 'comprar' no encontrado en el DOM");
  }
};

const mostrarCarritoEnDOM = () => {
    // Obtiene los datos del carrito desde el sesion storage
    const carritoData = localStorage.getItem("carrito");

    // Inicializa un arrray en caso de que no exista el carrito 
    let carrito = [];
    try {
      // Si existe los datos, los asigna al carrito
      if (carritoData) {
        carrito = JSON.parse(carritoData) || [];
      }
    } catch (e) {
      console.error("Error:", e);
      carrito = []; //Si da el error, para no detener la ejecución, se asinga un array vacío también
    }
  const listaCarrito = document.querySelector("#listaCarrito");//obtiene la lista para agregar los productos

  if (!listaCarrito) {
    console.error("Elemento con ID 'listaCarrito' no encontrado en el DOM");
    return;//IMprime error
  }

  if (carrito.length === 0 || !localStorage.getItem("carrito")) {
    const carritoVacio = document.querySelector(".carritoVacio");
    carritoVacio.classList.add("activo");
    
    const carritoLleno = document.querySelector(".container");
    carritoLleno.classList.remove("activo");
  } else {
    const carritoVacio = document.querySelector(".carritoVacio");
    carritoVacio.classList.remove("activo");
    
    const carritoLleno = document.querySelector(".container");
    carritoLleno.classList.add("activo");
  }


  listaCarrito.textContent = "";
  carrito.forEach((element) => {
    const li = document.createElement("li");
    li.dataset.id = element.id;
    li.classList.add("carritoItem");
    const infoCarrito = ` 
        <img class="imagenProductoCarrito" src="../${element.imagen}">
        <div class="infoCarritoDentro">
          <h2 class="producto__nombre">${element.nombre}</h2>
          <p class="producto__cantidad">
          <span>Cantidad: </span>${element.cantidad}
          </p>
          <p class="producto__precio">
            <span>Precio Unitario: </span>$${element.precio}
          </p>
          <button class="boton__eliminar">
          <img src="../assets/eliminar.svg" alt="Eliminar" width="20px">
          </button>
        </div>
        `;
    li.innerHTML = infoCarrito;
    listaCarrito.appendChild(li);
  });
  eliminarBoton();
};

const eliminarBoton = () => {
  const botonEliminar = document.querySelectorAll(".boton__eliminar")
  botonEliminar.forEach(boton => {
    boton.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      const idProductoEliminar = li.dataset.id
      eliminarProducto(idProductoEliminar)
    })
  });
}

const eliminarProducto = (id) => {
  let carrito = JSON.parse(localStorage.getItem("carrito") || [])
  carrito = carrito.filter(producto => id != producto.id)
  localStorage.setItem("carrito", JSON.stringify(carrito))
  cuentaCarrito()
  mostrarCarritoEnDOM()
}


const cuentaCarrito = () =>{
  const carrito = JSON.parse(localStorage.getItem("carrito")|| []);
  let cuenta = 0;
  carrito.forEach(producto => {
    cuenta += parseFloat(producto.precio * producto.cantidad)
  });
  const container = document.querySelector(".contenedorPrecio")
  container.textContent = `$ ${cuenta}
  `
  mostrarCarritoEnDOM() 
}

const mostrarMensajePago = () => {
  const boton = document.querySelector(".pagar")
  const mensaje = document.querySelector(".mensajePago")
  const oscurecer = document.querySelector(".oscurecer");
  boton.addEventListener("click",()=>{
    localStorage.removeItem("carrito")
    mensaje.classList.add("activo")
    oscurecer.classList.add("activo")
  })
  document.getElementById("cerrarMensaje").addEventListener("click", ()=>{
    mensaje.classList.remove("activo")
    oscurecer.classList.remove("activo")
    const carritoVacio = document.querySelector(".carritoVacio");
    carritoVacio.classList.add("activo");
    const carritoLLeno = document.querySelector(".container");
    carritoLLeno.classList.remove("activo");
  });
}

document.addEventListener('DOMContentLoaded', async() => {
    const elementoLista = document.querySelectorAll(".lista__boton--click");

    elementoLista.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.toggle('arrow')
            let height = 0;
            let menu = element.nextElementSibling
            console.log(menu.scrollHeight)
            if (menu.clientHeight == 0) {
                height = menu.scrollHeight
                menu.style.height = height + "px"
            } else {
                menu.style.height = "0px"
            }
            
        })
    });

    const abrirMenu = document.getElementById("abrir")
    const cerrarMenu = document.getElementById("cerrar")

    abrirMenu.addEventListener("click", () => {
        console.log("ok")
        let menu = document.querySelector(".navegador");
        menu.classList.toggle("visible")
    })

    cerrarMenu.addEventListener("click", () => {
        let menu = document.querySelector(".navegador");
        menu.classList.remove("visible")
    });

    const abrirPregunta = document.querySelectorAll(".faq-pregunta")
    abrirPregunta.forEach(element => {
        element.addEventListener("click",()=>{
            let itemFaq = element.parentElement;
            document.querySelectorAll('.faq-item').forEach(element => {
                if (element !== itemFaq) {
                    element.classList.remove('active');
                }
            });
    
            itemFaq.classList.toggle("active")
        })
    })

cargarTodosLosProductos()
cargarProductosPorMarca("Florence By Mills", "productosFBM");
cargarProductosPorMarca("Fenty Beauty", "productosFB");
cargarProductosPorMarca("Rare Beauty", "productosRB");
cargarProductosPorMarca("Rhode", "productosRhode");
mostrarProductoEspecifico()
})

//Cargar Json y mostrar Productos

const cargarJson = async() => {
    try {
        const respuesta = await fetch("../productos.json")
        if (respuesta.ok){
            const datos = await respuesta.json();
            return datos.productos
        }else{
            throw new Error ("Error al conectar con la base de datos")
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const cargarTodosLosProductos = async() =>{
    const productosArray = await cargarJson()
    try {
        let productos = "";
        productosArray.forEach(element => {
            let precio = element.precio
            productos += `<div class = "producto">
            <a href="productoDescrip.html" class="productoEnlace" data-id="${element.id}">
            <img class= "imagenProducto" src= "../${element.imagen}" >
            <div class="info">
            <h2 class= "nombreProducto"> ${element.nombre}</h2>
            <h3 class= "precioProducto"> $${precio.toFixed(2)} </h3>
            <h3 class= "marcaNombre"> ${element.marca}</h3>
            </div>
            </a>
            </div>
            `
        });
        document.getElementById("productos").innerHTML = productos;
        document.querySelectorAll('.productoEnlace').forEach(link => {
            link.addEventListener('click', function(event) {
                const productoId = this.getAttribute('data-id');
                localStorage.setItem('productoId', productoId);
            });
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

const cargarProductosPorMarca = async (marca, contenedorId) => {
    const productosArray = await cargarJson();
    try {
        let productos = "";
        productosArray.filter(element => element.marca === marca).forEach(element => {
            let precio = element.precio;
            productos += `<div class="producto">
                <a href="productoDescrip.html" class="productoEnlace" data-id="${element.id}">
                    <img class="imagenProducto" src="../${element.imagen}" >
                    <div class="info">
                        <h2 class="nombreProducto"> ${element.nombre}</h2>
                        <h3 class="precioProducto"> $${precio.toFixed(2)} </h3>
                    </div>
                </a>
            </div>`;
        });
        document.getElementById(contenedorId).innerHTML = productos;
        document.querySelectorAll('.productoEnlace').forEach(link => {
            link.addEventListener('click', function(event) {
                const productoId = this.getAttribute('data-id');
                localStorage.setItem('productoId', productoId);
            });
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
};


const mostrarProductoEspecifico = async () => {
    const productosArray = await cargarJson();
    console.log(productosArray);
    try {
        const productoId = localStorage.getItem("productoId");
        console.log("Producto ID recuperado:", productoId);
        if (!productoId) {
            console.error("No se encontró el ID del producto");
            return; 
        }
        const producto = productosArray.find(element => element.id == productoId);
        console.log(producto)
        if (!producto) {
            console.error("No se encontró el producto");
            return;
        }

        document.getElementById('nombreProducto').textContent = producto.nombre;
        document.getElementById('precioProducto').textContent = `$${producto.precio.toFixed(2)}`;
        document.getElementById('descripcionProducto').textContent = producto.descrip;
        document.getElementById('imagenProducto').src = `../${producto.imagen}`;
        document.getElementById("productosize").textContent = producto.size;
    } catch (error) {
        console.error("Error:", error);
    }
};



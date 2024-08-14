
document.addEventListener('DOMContentLoaded', () => {
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
});
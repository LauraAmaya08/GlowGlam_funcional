const elementoLista = document.querySelectorAll(".lista__boton--click");

elementoLista.forEach(element => {
    element.addEventListener("click",()=>{
        element.classList.toggle('arrow')
        let height = 0;
        let menu= element.nextElementSibling
        console.log(menu.scrollHeight)
        if (menu.clientHeight == "0"){
            height = menu.scrollHeight
        }
        menu.style.height = height+"px"
    })
});

const abrirMenu = document.getElementById("abrir")
abrirMenu.addEventListener("click",()=>{
    
})
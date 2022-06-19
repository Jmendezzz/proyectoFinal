let arrayProductos = [];
// API
const containerProductos = document.getElementById("container-productos");
const urlApi = "https://62abac1da62365888bdfaab1.mockapi.io/productos";
const printProductos = () => {
    containerProductos.innerHTML = "";
    arrayProductos.forEach((object, index) => {
        let div = document.createElement("DIV");
        div.innerHTML = "";
        div.setAttribute("class", "container-productos")
        for (let i = 0; i < 5; i++) {
            let li = document.createElement("LI");
            switch (i) {
                case 0:
                    let img = document.createElement("IMG");
                    img.setAttribute("src", `${object.url}`)
                    div.appendChild(img);
                    break;
                case 1:
                    li.innerHTML = `${object.nombreProducto}`;
                    li.style.color = "black";
                    div.appendChild(li);
                    break;

                case 2:
                    li.innerHTML = `Unidades disponibles: ${object.cantidad}`;
                    li.style.color = "grey";
                    li.style.fontSize = "20px";
                    div.appendChild(li);
                    break;
                case 3:
                    li.innerHTML = `${object.precio}`;
                    div.appendChild(li);
                    break;
                case 4:
                    let button = document.createElement("BUTTON");
                    button.innerHTML = "Ver detalles";
                    button.setAttribute("id", index);
                    button.setAttribute("class", "botones-compra");
                    ocultarDivs(button);
                    editarProducto(button);
                    div.appendChild(button);
                    break;
            }
        }
        containerProductos.appendChild(div);
    })
}

const getInfo = async () => {
    response = await fetch(urlApi);
    console.log(response);
    return response.json();
}
const getProductos = async () => {
    arrayProductos = await getInfo();
    console.log(arrayProductos);
    printProductos();
}
//Lleno el arreglo con la API
getProductos();

const ocultarDivs = (button) => {


    button.addEventListener("click", () => {
        document.getElementById("titulo").innerHTML = "BOLSA";
        arrayProductos.forEach((object, index) => {
            document.querySelectorAll(".container-productos")[index].classList.add("none");
        })
    })
}
const editarProducto = (button) => {
    button.addEventListener("click", () => {
        let idButton = button.id;
        idButton = parseInt(idButton);
        idButton = idButton + 1;
        console.log(idButton);
        let img = document.createElement("IMG");
        img.setAttribute("src", `${arrayProductos[idButton - 1].url}`);
        let divPadre = document.createElement("DIV");
        divPadre.setAttribute("class", "vista-previa")
        let div = document.createElement("DIV");
        div.setAttribute("class", "vista-previa-lista");
        div.setAttribute("id", `div-${idButton}`);
        for (let i = 0; i < 4; i++) {
            let li = document.createElement("LI");
            switch (i) {

                case 0:
                    li.innerHTML = `${arrayProductos[idButton - 1].nombreProducto}`;
                    li.style.color = "black";
                    div.appendChild(li);
                    break;
                case 1:

                    li.innerHTML = `Unidades disponibles: ${arrayProductos[idButton - 1].cantidad}`;
                    li.style.color = "grey";
                    li.style.fontSize = "20px";
                    div.appendChild(li);
                    break;
                case 2:
                    li.innerHTML = `Precio:${arrayProductos[idButton - 1].precio}$`;
                    div.appendChild(li);
                    let p = document.createElement("P");
                    p.innerHTML = "Producto actualizado correctamente";
                    p.setAttribute("id", "p-correcto");
                    p.style.color = "green";
                    p.style.display = "none";
                    p.style.fontSize = "16px"
                    break;
                case 3:
                    let botonCarro = document.createElement("BUTTON");
                    botonCarro.innerHTML = "Añadir al carro"
                    div.appendChild(botonCarro);
                    botonCarro.addEventListener("click", () => {
                        botonCarroFunction(idButton - 1);
                    })
                case 4:
                    let imgBack = document.createElement("IMG");
                    imgBack.setAttribute("src", "https://cdn.icon-icons.com/icons2/362/PNG/512/Go-back_36760.png");
                    imgBack.style.width = "70px";
                    imgBack.style.height = "50px";
                    imgBack.addEventListener("click", () => {
                        printProductos();
                    })
                    div.appendChild(imgBack);
                    break;
            }
            divPadre.appendChild(img);
            divPadre.appendChild(div);
            containerProductos.appendChild(divPadre);
        }

    }

    )
};
let contadorCompras = document.getElementById("contador-compras");
arrayCompras = [];
const botonCarroFunction = (id) => {
    arrayCompras.push(arrayProductos[id]);
    contadorCompras.innerHTML = arrayCompras.length;
}
let contadorComprasContainer = document.getElementById("contador-compras-container");
ocultarDivs(contadorComprasContainer);


const printBolsa = () => {
    if (arrayCompras.length > 0) {
        const divBolsa = document.createElement("DIV");
        divBolsa.setAttribute("class", "div-bolsa");
        arrayCompras.forEach(object => {
            let div = document.createElement("DIV");
            div.setAttribute("class", "bolsa-item");
            for (let i = 0; i < 3; i++) {
                switch (i) {
                    case 0:
                        let img = document.createElement("IMG");
                        img.setAttribute("src", `${object.url}`);
                        img.setAttribute("class", "imagenes-bolsa");
                        div.appendChild(img);
                        break;
                    case 1:
                        let divItems = document.createElement("DIV");
                        divItems.setAttribute("class", "vista-previa-");
                        divItems.innerHTML = "";
                        for (let j = 0; j < 3; j++) {
                            let li = document.createElement("LI");
                            if (j == 0) {
                                li.innerHTML = `Nombre: ${object.nombreProducto}`;
                                divItems.appendChild(li);
                            }
                            else if (j == 1) {
                                li.innerHTML = "Cantidad: 1";
                                divItems.appendChild(li);
                            }
                            else {
                                let totalCompra = arrayCompras.reduce((total, acum) => {
                                    acum.precio = parseInt(acum.precio);
                                    return total + acum.precio;
                                }, 0)
                                console.log(totalCompra);
                                li.innerHTML = `${totalCompra}$`;
                                divItems.appendChild(li);
                            }
                        }
                        div.appendChild(divItems);
                        break;
                    case 2:
                        let imgX = document.createElement("IMG");
                        imgX.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/001/200/173/original/x-png.png");
                        imgX.setAttribute("class", "x-icon");
                        div.appendChild(imgX);
                }
            }
            divBolsa.appendChild(div);
        })
        let backButton=document.createElement("BUTTON");
        backButton.innerHTML="Volver";
        backButton.addEventListener("click",()=>{
            printProductos();
        })
        divBolsa.appendChild(backButton);
        containerProductos.appendChild(divBolsa);
    } else {
        alert("Aún no has añadido nada al carrito")
    }

}
contadorComprasContainer.addEventListener("click", () => {
    printBolsa();
});
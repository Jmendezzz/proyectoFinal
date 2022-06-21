let arrayProductos = [];
// API
const containerProductos = document.getElementById("container-productos");
const urlApi = "https://62abac1da62365888bdfaab1.mockapi.io/productos";
const printProductos = () => {
    containerProductos.innerHTML = "";
    arrayProductos.forEach((object, index) => {
        let div = document.createElement("DIV");
        div.innerHTML = "";
        div.setAttribute("class", "container-productos");

        document.getElementById("titulo").innerHTML = "TIENDA";
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
const putProductoAPI = (productoId, cantidad) => {
    try {
        fetch(urlApi + "/" + productoId, {
            method: 'PUT',
            body: JSON.stringify({
                cantidad: cantidad
            }),
            headers: {
                "Content-type": "application/json"
            }
        })

    } catch (error) {
        console.log(`No se pudo actualizar la información del producto con el ID:${productoId}`);
    }

}
//Lleno el arreglo con la API
getProductos();
//Ocultar divs  del container
const ocultarDivs = (button) => {
    button.addEventListener("click", () => {
        document.getElementById("titulo").innerHTML = "BOLSA";
        arrayProductos.forEach((object, index) => {
            document.querySelectorAll(".container-productos")[index].classList.add("none");
        })
    })
}
//Seccion de vista previa
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
                    imgBack.setAttribute("class","img-back");
                    imgBack.setAttribute("src", "https://cdn.icon-icons.com/icons2/362/PNG/512/Go-back_36760.png");
                    imgBack.style.width = "70px";
                    imgBack.style.height = "50px";
                    imgBack.addEventListener("click", () => {
                        getProductos();
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

//constructor de inputs + p 
const inputList = (p, input, text, type, div, placeholder) => {
    p.innerHTML = text;
    div.appendChild(p);
    input.setAttribute("type", type);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("class", "input");
    div.appendChild(input);
}
// imprimir la facturacion
const printFacturacion = () => {
    containerProductos.innerHTML = "";
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "FACTURACIÓN";
    let divFormulario = document.createElement("DIV");
    divFormulario.setAttribute("class", "container-formulario");
    let divInputs = document.createElement("DIV");
    divInputs.setAttribute("class", "container-inputs");
    for (let i = 0; i < 7; i++) {
        let p = document.createElement("P");
        let input = document.createElement("INPUT");
        switch (i) {
            case 0:
                inputList(p, input, "Nombre completo", "text", divInputs, "Nombre completo");
                break;
            case 1:
                inputList(p, input, "Numero de celular", "number", divInputs, "Numero de celular");
                break;
            case 2:
                inputList(p, input, "No. de documento de identidad", "number", divInputs, "No. de documento de identidad");
                break;
            case 2:
                inputList(p, input, "Ciudad", "text", divInputs, "Ciudad");
                break;
            case 3:
                inputList(p, input, "Dirección de entrega", "text", divInputs, "Dirección de entrega");
                break;
            case 4:
                inputList(p, input, "Número de tarjeta", "text", divInputs, "Número de tarjeta");
                break;
            case 5:
                let buttonConfirmar = document.createElement("BUTTON");
                buttonConfirmar.innerHTML = "Confirmar";
                divInputs.appendChild(buttonConfirmar);
                buttonConfirmar.addEventListener("click", () => {
                    if (confirm("Estás seguro de finalizar la compra")) {
                        finalizarCompra();
                    }
                })
                break;
        }
    }
    let img = document.createElement("IMG");
    img.setAttribute("src", "https://i.postimg.cc/02Y1WJcb/i.png");
    divFormulario.appendChild(divInputs);
    divFormulario.appendChild(img);
    containerProductos.appendChild(divFormulario);

}
const clearInputs = () => {
    for (let i = 0; i < 5; i++) {
        document.querySelectorAll(".input")[i].value = "";
    }
}
const comprobarDatos = () => {
    let contador = 0;
    for (let i = 0; i < 5; i++) {
        if (document.querySelectorAll(".input")[i].value == "") contador++;
    }
    if (contador > 0) {
        return false;
    } else return true;
}
const finalizarCompra = () => {
    if (comprobarDatos()) {
        let arregloID = arrayCompras.filter(object => object.id);
        console.log(arregloID);
        setClassLists();
        clearInputs();
        for (let i in arregloID) {
            let cantidad = parseInt(arregloID[i].cantidad);
            cantidad-=1;
            putProductoAPI(arregloID[i].id,cantidad);   
        }
        compraExitosa();
        arrayCompras.splice(0, arrayCompras.length);
        document.getElementById("contador-compras").innerHTML = arrayCompras.length;
    } else {
        setClassLists();
    }
}
let contadorCompras = document.getElementById("contador-compras");
arrayCompras = [];
const botonCarroFunction = (id) => {
    arrayCompras.push(arrayProductos[id]);
    contadorCompras.innerHTML = arrayCompras.length;
}
let contadorComprasContainer = document.getElementById("contador-compras-container");
ocultarDivs(contadorComprasContainer);
const setClassLists = () => {
    for (let i = 0; i < 4; i++) {
        if (document.querySelectorAll(".input")[i].value == "") {
            document.querySelectorAll(".input")[i].classList.add("error");
        } else {
            document.querySelectorAll(".input")[i].classList.remove("error");
        }
    }
}

const compraExitosa = () => {
    let divPadre = document.getElementById("container-productos");
    divPadre.innerHTML = "";
    let divExitoso = document.createElement("DIV");
    divExitoso.setAttribute("class", "container-exitoso");
    let img = document.createElement("IMG");
    img.setAttribute("src","http://assets.stickpng.com/thumbs/5aa78e387603fc558cffbf1d.png");
    let p = document.createElement("P");
    p.innerHTML = "Compra exitosa!";
    divExitoso.appendChild(p);
    divExitoso.appendChild(img);
    let p2 = document.createElement("P");
    p2.innerHTML = "Detalles de la compra:";
    divExitoso.appendChild(p2);
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
                            li.innerHTML = `Precio ${object.precio}$`;
                            divItems.appendChild(li);
                        }
                    }
                    div.appendChild(divItems);
                }
                

            }
            divExitoso.appendChild(div);
        })
        
        let btn = document.createElement("BUTTON");
        btn.innerHTML="Volver atrás";
        btn.addEventListener("click",()=>{
            getProductos();
        })
        divExitoso.appendChild(btn);
        divPadre.appendChild(divExitoso);
}
const deleteProducto = (button) => {
    button.addEventListener("click", () => {
        let id = button.id;
        id = id.slice(-1);
        id = parseInt(id);
        console.log(id);
        arrayCompras.splice(id, 1);
        console.log(arrayCompras);
        contadorCompras.innerHTML = arrayCompras.length;
        let divPadre = document.getElementById("div-bolsa");
        printBolsa();
    })
}
const printBolsa = () => {
    if (arrayCompras.length > 0) {
        const divBolsa = document.createElement("DIV");
        divBolsa.setAttribute("id", "div-bolsa");
        divBolsa.setAttribute("class", "div-bolsa");
        containerProductos.innerHTML = "";
        arrayCompras.forEach((object, index) => {
            let div = document.createElement("DIV");
            div.setAttribute("class", "bolsa-item");
            div.setAttribute("id", `container-facturacion-${index}`);
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
                                li.innerHTML = `Precio ${object.precio}$`;
                                divItems.appendChild(li);
                            }
                        }
                        div.appendChild(divItems);
                        break;
                    case 2:
                        let imgX = document.createElement("IMG");
                        imgX.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/001/200/173/original/x-png.png");
                        imgX.setAttribute("class", "x-icon");
                        imgX.setAttribute("id", `facturacion-${index}`);
                        deleteProducto(imgX);
                        div.appendChild(imgX);
                }
            }
            divBolsa.appendChild(div);
        })
        let totalCompra = arrayCompras.reduce((total, acum) => {
            acum.precio = parseInt(acum.precio);
            return total + acum.precio;
        }, 0)
        let p = document.createElement("P");
        p.innerHTML = `Precio total: ${totalCompra}$`;
        p.setAttribute("id", "totalCompra");
        divBolsa.appendChild(p);
        let finalizarCompra = document.createElement("BUTTON");
        finalizarCompra.innerHTML = "Finalizar compra";
        finalizarCompra.setAttribute("class", "botones");
        divBolsa.appendChild(finalizarCompra);
        let backButton = document.createElement("BUTTON");
        backButton.innerHTML = "Volver";
        backButton.setAttribute("class", "botones");
        finalizarCompra.addEventListener("click", () => {
            printFacturacion();
        })
        backButton.addEventListener("click", () => {
            document.getElementById("titulo").innerHTML = "TIENDA";
            getProductos();
        })
        divBolsa.appendChild(backButton);
        containerProductos.appendChild(divBolsa);
    } else {
        alert("Aquí no hay nada");
        getProductos();

    }

}


contadorComprasContainer.addEventListener("click", () => {
    printBolsa();
});


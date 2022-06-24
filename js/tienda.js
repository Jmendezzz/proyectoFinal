class Productos {
    constructor(categoria, url, nombre, cantidad, precio) {
        this.categoria = categoria;
        this.url = url;
        this.nombreProducto = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

let arrayProductos = [];
const botonEnviar = document.getElementById("send-button");

const containerProductos = document.getElementById("container-productos");
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
                    button.innerHTML = "Editar Producto";
                    button.setAttribute("id", object.id);
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
// API
const urlApi = "https://62abac1da62365888bdfaab1.mockapi.io/productos";

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
function deleteProducto(id) {
    fetch(urlApi + "/" + id, {
        method: 'DELETE'
    })
}

//Lleno el arreglo con la API
getProductos();

// Limpiar inputs
const clearInputs = () => {
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll(".input")[i].value = "";
    }
}
const addProductoApi = (producto) => {
    fetch(urlApi, {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: {
            "Content-type": "application/json"
        }
    })
}
const putProductoAPI = (productoId, nombreProducto, cantidad, precio) => {
    try {
        fetch(urlApi + "/" + productoId, {
            method: 'PUT',
            body: JSON.stringify({
                nombreProducto: nombreProducto,
                cantidad: cantidad,
                precio: precio
            }),
            headers: {
                "Content-type": "application/json"
            }
        })

    } catch (error) {
        console.log(`No se pudo actualizar la información del producto con el ID:${productoId}`);
    }

}
// Verificación
const comprobarDatos = () => {
    let contador = 0;
    for (let i = 0; i < 4; i++) {
        if (document.querySelectorAll(".input")[i].value == "") contador++;
    }
    if (contador > 0) {
        return false;
    } else return true;
}
//Obtener valores de los inputs
const addProducto = () => {
    arrayProductos.push(new Productos(document.getElementById("categoria").value, document.getElementById("url-imagen").value, document.getElementById("nombre-producto").value, document.getElementById("cantidad-producto").value, document.getElementById("precio-producto").value));
    printProductos();
    addProductoApi(new Productos(document.getElementById("categoria").value, document.getElementById("url-imagen").value, document.getElementById("nombre-producto").value, document.getElementById("cantidad-producto").value, document.getElementById("precio-producto").value));
    getProductos();
}
//Dar clases según este el input
const setClassLists = () => {
    for (let i = 0; i < 4; i++) {
        if (document.querySelectorAll(".input")[i].value == "") {
            document.querySelectorAll(".input")[i].classList.add("error");
        } else {
            document.querySelectorAll(".input")[i].classList.remove("error");
        }
    }
}
//Funcionalidad para vista previa el producto;
const ocultarDivs = (button) => {
    button.addEventListener("click", () => {
        arrayProductos.forEach((object, index) => {
            document.querySelectorAll(".container-productos")[index].classList.add("none");
        })
    })
}
const editarProducto = (button) => {
    button.addEventListener("click", () => {
        
        let idButton = button.id;
        console.log(idButton);
        let producto = arrayProductos.find(object => object.id == idButton);
        console.log(producto);
        let img = document.createElement("IMG");
        img.setAttribute("src", `${producto.url}`);
        let divPadre = document.createElement("DIV");
        divPadre.setAttribute("class", "vista-previa");
        let div = document.createElement("DIV");
        div.setAttribute("class", "vista-previa-lista");
        div.setAttribute("id", `div-${idButton}`);
        for (let i = 0; i <= 5; i++) {
            let input = document.createElement("INPUT");
            input.setAttribute("type", "text");
            switch (i) {
                case 0:
                    let h2 = document.createElement("H2");
                    h2.innerHTML = "EDICION";
                    div.appendChild(h2);
                    input.value = `${producto.nombreProducto}`;
                    input.setAttribute("class", `inputs-vista-previa`);
                    input.placeholder = "Nombre del producto";
                    input.style.width = "300px";
                    input.style.color = "black";
                    div.appendChild(input);
                    break;

                case 1:
                    input.setAttribute("type", "number");
                    input.value = `${producto.cantidad}`;
                    input.setAttribute("class", `inputs-vista-previa`);
                    input.placeholder = "Cantidad del producto";
                    input.style.width = "300px";
                    div.appendChild(input);
                    break;
                case 2:
                    input.setAttribute("type", "number");
                    input.value = `${producto.precio}`;
                    input.setAttribute("class", `inputs-vista-previa`);
                    input.placeholder = "Precio del producto";
                    input.style.width = "300px"
                    let p = document.createElement("P");
                    p.innerHTML = "Producto actualizado correctamente";
                    p.setAttribute("id", "p-correcto");
                    p.style.color = "green";
                    p.style.display = "none";
                    p.style.fontSize = "16px";
                    div.appendChild(input);
                    div.appendChild(p);
                    break;
                case 3:
                    let botonGuardado = document.createElement("BUTTON");
                    botonGuardado.innerHTML = "Guardar Cambios";
                    let clase = document.getElementsByClassName("inputs-vista-previa");
                    botonGuardado.addEventListener("click", () => {
                        putProductoAPI(idButton, clase[0].value, clase[1].value, clase[2].value);
                        let p = document.getElementById("p-correcto");
                        p.style.display = "block";
                    })
                    div.appendChild(botonGuardado);
                    break;
                case 4:
                    let botonEliminar = document.createElement("BUTTON");
                    botonEliminar.innerHTML = "Eliminar producto";

                    botonEliminar.addEventListener("click", () => {
                        if (confirm("Estás seguro de eliminar este producto?")) {
                            deleteProducto(idButton);
                        }
                    })
                    div.appendChild(botonEliminar);
                    break;
                case 5:
                    let imgBack = document.createElement("IMG");
                    imgBack.setAttribute("src", "https://i.postimg.cc/k5cyLD5P/Go-back-icon.png");
                    imgBack.style.width = "70px";
                    imgBack.style.height = "50px";
                    imgBack.addEventListener("click", () => {
                        getProductos();
                    })
                    div.appendChild(imgBack);
            }
        }
        divPadre.appendChild(img);
        divPadre.appendChild(div);
        containerProductos.appendChild(divPadre);
    }
    )

}
//Evento cuando den click en el botón.
botonEnviar.addEventListener("click", () => {
    if (comprobarDatos()) {
        setClassLists();
        addProducto();
        clearInputs();

    } else {
        setClassLists();
    }
});

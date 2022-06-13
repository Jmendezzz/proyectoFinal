class Productos {
    constructor(categoria, url, nombre, cantidad,precio) {
        this.categoria = categoria;
        this.url = url;
        this.nombreProducto = nombre;
        this.cantidad = cantidad;
        this.precio = precio;  
    }
}

export let arrayProductos = [];
const botonEnviar = document.getElementById("send-button");

const clearInputs = () => {
    for (let i = 0; i < 3; i++) {
        document.querySelectorAll(".input")[i].value = "";
    }
}
const comprobarDatos = () => {
    let contador = 0;
    for (let i = 0; i < 4; i++) {
        if (document.querySelectorAll(".input")[i].value == "") contador++;
    }
    if (contador > 0) {
        return false;
    } else return true;
}
const getValues = () => {
    arrayProductos.push(new Productos(document.getElementById("categoria").value, document.getElementById("url-imagen").value, document.getElementById("nombre-producto").value, document.getElementById("cantidad-producto").value,document.getElementById("precio-producto").value));
}

const setClassLists = () => {
    for (let i = 0; i < 4; i++) {
        if (document.querySelectorAll(".input")[i].value == "") {
            document.querySelectorAll(".input")[i].classList.add("error");
        } else {
            document.querySelectorAll(".input")[i].classList.remove("error");
        }
    }
}

const printProductos = () => {
    const containerProductos = document.getElementById("container-productos");
    containerProductos.innerHTML = "";
    arrayProductos.forEach((object,index) => {
        let div = document.createElement("DIV");
        div.innerHTML = "";
        div.setAttribute("class","container-productos")
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
                    li.style.color="black";
                    div.appendChild(li);
                    break;
                                  
                case 2:
                    li.innerHTML = `Unidades disponibles: ${object.cantidad}`;
                    li.style.color="grey";
                    li.style.fontSize="20px";
                    div.appendChild(li);
                    break;
                case 3:
                    li.innerHTML = `${object.precio}`;
                    div.appendChild(li);
                    break;                
                case 4:
                    let button = document.createElement("BUTTON");
                    button.innerHTML="Comprar";
                    button.setAttribute("id",`producto-${index}`);
                    button.setAttribute("class","botones-compra");
                    div.appendChild(button);
                    break;
            }
        }
        containerProductos.appendChild(div);
    })
}

export const createDivProduct = (button)=>{
    button.addEventListener("click",()=>{
        let botonId= button.id;
        return botonId.slice(-1);   
        
    })
}
botonEnviar.addEventListener("click", () => {
    if (comprobarDatos()) {
        setClassLists();
        getValues();
        clearInputs();
        printProductos();

    } else {
        setClassLists();
    }
})

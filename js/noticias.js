class Noticia{
    constructor(url,titulo,texto,fecha){
        this.url=url;
        this.titulo=titulo;
        this.texto=texto;
        this.fecha=fecha;
    }
}

let arrayNoticias=[];

const getValues = () => {
    arrayNoticias.push(new Noticia(document.getElementById("url-imagen").value, document.getElementById("titulo-noticia").value, document.getElementById("cuerpo-noticia").value,document.getElementById("fecha-noticia").value));
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

const botonEnviar = document.getElementById("send-button");

botonEnviar.addEventListener("click",()=>{
    setClassLists();
    getValues();
    
    


})
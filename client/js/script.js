
import { Superheroe } from "./Superheroe.js";
import { crearTabla } from "./tabla.js";
import { validarCadenaCantCaracteres} from "./validaciones.js";
const URL= "http://localhost:3000/anuncios";
const URLarmas= "http://localhost:3000/armas";

const $divTabla = document.getElementById("divTabla");
const $btnFuerza = document.getElementById("btnFuerza");
const $btnAlfabet = document.getElementById("btnAlfabet");
const $btnDelete = document.getElementById("btnDelete");
const $btnEnviar= document.getElementById("btnEnviar");
const $txtId= document.getElementById("txtId");
const $tituloAlta= document.getElementById("tituloAlta");
const $spinner= document.getElementById("spinner");
const $btnFiltrar= document.getElementById("btnFiltrar");
const $btnCancelar = document.getElementById("btnCancelar");
const $chkFuerza= document.getElementById("chkFuerza");
const $chkEditorial= document.getElementById("chkEditorial");
const $chkArma= document.getElementById("chkArma");
const $chkNombre= document.getElementById("chkNombre");
const $chkAlias= document.getElementById("chkAlias");
const $chkId= document.getElementById("chkId");

const $formulario= document.forms[0];
const $selectEditorial = document.getElementById("selectEditorial")

let anuncios;
getAnuncios();
getArmas();
$btnDelete.style.visibility='hidden';
$btnCancelar.style.visibility='hidden';
let elementoSeleccionado;

const icono = "<i class='fa-solid fa-floppy-disk fa-xl'></i> Enviar";

window.addEventListener("click" , (e)=>{

    
    if(e.target.matches("td")){

        let fila = e.target.parentNode; // Obtener la fila que contiene la celda
        let index= fila.rowIndex;


        $btnEnviar.innerHTML = "Modificar";       
        elementoSeleccionado= anuncios[index-1];
        cargarFormulario(elementoSeleccionado);
        $btnDelete.style.visibility='visible';
        $btnCancelar.style.visibility='visible';
        $tituloAlta.textContent= "Eliminar/Modificar un Superheroe"
    }else if(e.target.matches("#btnDelete")){
        deleteElemento(elementoSeleccionado.id);
        $formulario.reset();
    }
    

});

function cargarArmas($armas){

    const $selectArmas = document.getElementById("selectArmas");
    const $fragment = document.createDocumentFragment();

    $armas.forEach((elemento) =>{

        const $opcion = document.createElement("option");
        $opcion.value = elemento;
        $opcion.innerHTML=elemento;

        $fragment.appendChild($opcion);
    })

    $selectArmas.appendChild($fragment);

}

function actualizarTabla(data){

    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);
    }

    if(data != null){
        $divTabla.appendChild(crearTabla(data));
    }
}

$formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    const {txtId, txtNombre, txtAlias, rngFuerza, rdoEditorial, selectArmas}  = $formulario; //esto es destructuring
          
    const formAnuncio= new Superheroe(txtId.value, txtNombre.value, rngFuerza.valueAsNumber, txtAlias.value,  rdoEditorial.value, selectArmas.value);

    if(validarCadenaCantCaracteres(formAnuncio.nombre)){
        if(validarCadenaCantCaracteres(formAnuncio.alias)){
            console.log("Enviando...");
            if(formAnuncio.id== ''){
                createElemento(formAnuncio);
            }else{
                updateElemento(formAnuncio);
            }

            $formulario.reset();
            
        }else{
            alert("Alias invalido");
        }
    }else{
        alert("Nombre invalido");
    }

});

function cargarFormulario(a){
    const {txtId, txtNombre, txtAlias, rngFuerza, rdoEditorial, selectArmas}  = $formulario; //esto es destructuring
    
    txtNombre.value=a.nombre;
    txtAlias.value=a.alias;
    rngFuerza.value=a.fuerza;
    rdoEditorial.value=a.editorial;
    selectArmas.value= a.arma;
    txtId.value=a.id;
}


$btnFuerza.addEventListener('click', () =>{

    const $tablaOrdenada= anuncios.sort((a,b) => {
        return a.fuerza-b.fuerza;
    });

    actualizarTabla($tablaOrdenada);
});

$btnAlfabet.addEventListener('click', () =>{

    const $tablaOrdenada= anuncios.sort((a,b) => {
        return(b.nombre>a.nombre) ? -1 : 1;
    });

    actualizarTabla($tablaOrdenada);
});

$btnCancelar.addEventListener('click', () =>{

    $formulario.reset();
    $txtId.value='';
    $btnCancelar.style.visibility= 'hidden';
    $btnDelete.style.visibility= 'hidden';
    $btnEnviar.innerHTML=  "<i class='fa-solid fa-floppy-disk fa-xl'></i> Enviar";
    $tituloAlta.textContent= "Crud Heroes - Alta Superheroe"


});

$btnFiltrar.addEventListener('click', () =>{
    
    let $tablaFiltrada;
    let $tablaFinal;
    
    if($selectEditorial.value == "DC"){
        $tablaFiltrada= anuncios.filter( a => a.editorial=="DC"? true: false)

    }else if($selectEditorial.value == "MARVEL"){
        $tablaFiltrada= anuncios.filter( a => a.editorial=="Marvel"? true: false)

    }else if($selectEditorial.value == "TODOS"){
        $tablaFiltrada= anuncios;

    }
   
  

    const properties = {
        id: $chkId.checked,
        alias: $chkAlias.checked,
        editorial: $chkEditorial.checked,
        fuerza: $chkFuerza.checked,
        arma: $chkArma.checked,
        nombre: $chkNombre.checked
      };
      
      $tablaFinal = $tablaFiltrada.map(a => {
        const filteredProps = {};
      
        for (const prop in properties) {
          if (properties[prop]) {
            filteredProps[prop] = a[prop];
          }
        }
        return filteredProps;
    });

    const sinSeleccion = Object.values(properties).every(value => value === false);
    if(sinSeleccion){
        $tablaFinal=$tablaFiltrada;
    }
   
    const $pPromedio = document.getElementById("pPromedio")
    let total= $tablaFiltrada.reduce((anterior, actual) =>anterior + actual.fuerza,0);
    let promedio = total/ $tablaFiltrada.length;

    $pPromedio.value= promedio.toFixed(2);

    $chkAlias.checked=false;
    $chkArma.checked=false;
    $chkFuerza.checked=false;
    $chkEditorial.checked=false;
    $chkNombre.checked=false;

    actualizarTabla($tablaFinal);  
});


function getArmas(){

    fetch(URLarmas)
    .then((res)=> res.ok?res.json():Promise.reject(res))
    .then((data)=>{
        cargarArmas(data);
    })
    .catch((err)=>{

        console.error(`Error: ${err.status} - ${err.statusText}`)
    })
    .finally(()=>{
       
        $spinner.style.visibility='hidden';
        $divTabla.style.visibility='visible';

    })

};



function getAnuncios(){

    $spinner.style.visibility = "visible";

    fetch(URL)
    .then((res)=> res.ok?res.json():Promise.reject(res))
    .then((data)=>{
        anuncios=data;
        actualizarTabla(data);
    })
    .catch((err)=>{

        console.error(`Error: ${err.status} - ${err.statusText}`)

    })
    .finally(()=>{
        
        $spinner.style.visibility = "hidden";


    })

}

function createElemento(data){

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status<300){
                const data= JSON.parse(xhr.responseText);   
                anuncios=data;  
                //actualizarTabla(anuncios);
    
        }else{
            console.error(`Error: ${xhr.status} - ${xhr.statusText}`)
        }
        $spinner.style.visibility='hidden';

    }

    });

    xhr.open("POST",URL);
    xhr.setRequestHeader("Content-Type" , "application/json;charset=utf-8");
    xhr.send(JSON.stringify(data));
};

function deleteElemento(id){

    $spinner.style.visibility='visible';
    $divTabla.style.visibility='hidden';

    fetch(URL+"/"+ id,{
        method: "DELETE",
    })
    .then((res)=> res.ok ? res.json() : Promise.reject(res))
    .then((data) =>{
        anuncios=data;
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`)
    })
    
       
        $spinner.style.visibility='hidden';
        $divTabla.style.visibility='visible';

    

}
function updateElemento(data){

    const xhr = new XMLHttpRequest();
    $spinner.style.visibility='visible';
    $divTabla.style.visibility='hidden';

    xhr.addEventListener("readystatechange", ()=>{
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status<300){
                const data= JSON.parse(xhr.responseText);
                anuncios=data;      
        }else{
            console.error(`Error: ${xhr.status} - ${xhr.statusText}`)
        }

    }

    });

    $spinner.style.visibility='hidden';
    $divTabla.style.visibility='visible';
    xhr.open("PUT",URL + "/" + data.id);
    xhr.setRequestHeader("Content-Type" , "application/json;charset=utf-8");
    xhr.send(JSON.stringify(data));
}

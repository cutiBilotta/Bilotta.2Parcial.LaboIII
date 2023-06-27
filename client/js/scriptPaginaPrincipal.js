
import { crearTarjeta } from "./tarjeta.js";
const URL= "http://localhost:3000/anuncios";

const $divAnuncios = document.getElementById("divAnuncios");
const $spinner = document.getElementById("spinner");

const data = await getAnuncios();
actualizarAnuncios(data); 


function actualizarAnuncios(data){
    while($divAnuncios.hasChildNodes()){
        $divAnuncios.removeChild($divAnuncios.firstElementChild);
    }

    if(data != null){
        $divAnuncios.appendChild(crearTarjeta(data));          
    }
}

async function getAnuncios(){
    $spinner.style.visibility='visible';
    try{
        let {data} = await axios.get(URL);
        $spinner.style.visibility='hidden';

        return data;
    }catch(err)
    {
        console.log(err.message);
    }  
    
};


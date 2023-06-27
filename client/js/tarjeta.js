
export const crearTarjeta = (elemento)=>{
    const fragment = document.createDocumentFragment();
    const container = document.getElementById("divAnuncios");

    const row= document.createElement("div");
    row.classList.add("row");
    
    
    
    
    elemento.forEach((e) => {
        
        const col= document.createElement("div");
        col.classList.add("col", "col-lg-3");

        const card=document.createElement("div");
        card.classList.add("card", "text-center" , "border-info", "mb-3" , "bg-light");
        
        const body= document.createElement("div");
        body.classList.add("card-body" );

        const alias= document.createElement("div");
        alias.classList.add("card-header" , "py-2" ,"text-white", "text-lg", "bg-info","mb-3");
        alias.innerHTML= e.alias.toUpperCase();

        const nombre= document.createElement("h5");
        nombre.classList.add("card-subtitle" , "py-2");
        nombre.innerHTML= e.nombre;

        const fuerza = document.createElement("p");
        fuerza.classList.add("card-text" ,"py-2");
        const editorial = document.createElement("p");
        editorial.classList.add("card-text" , "py-2");
        const arma = document.createElement("p");
        arma.classList.add("card-text","py-2");
        
        fuerza.innerHTML="<i class='fa-solid fa-hand-fist fa-xl' style='color: #000000;'></i>&nbsp&nbsp&nbsp"  + e.fuerza ; 
        editorial.innerHTML +="<i class='fa-solid fa-pen fa-xl' style='color: #000000;'></i>&nbsp&nbsp&nbsp" + e.editorial  ;
        arma.innerHTML += "<i class='fa-solid fa-shield-halved fa-xl' style='color: #000000;'></i>&nbsp&nbsp&nbsp"  + e.arma  ;

        
        body.appendChild(alias);
        body.appendChild(nombre);
        body.appendChild(fuerza);
        body.appendChild(editorial);
        body.appendChild(arma);

        card.appendChild(body);

        col.appendChild(card);

        row.appendChild(col);   
      
        fragment.appendChild(row);     
        
    });
    
    return fragment;
};


   
    export function validarCadenaCantCaracteres(cadena){
        const regex = /^[a-zA-Z\s]+$/;

        if(cadena.length > 25 || !regex.test(cadena)){
            return false;
        }else{
            return true;
        }
        
    }

    




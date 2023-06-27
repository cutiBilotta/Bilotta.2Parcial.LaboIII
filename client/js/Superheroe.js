
import {Personaje} from "./Personaje.js"

export class Superheroe extends Personaje{
    constructor(id,nombre, fuerza, alias, editorial, arma){
        super(id, nombre, fuerza);
        this.alias = alias;
        this.editorial = editorial;
        this.arma = arma;

    }

}
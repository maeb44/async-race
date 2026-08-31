import type { ComponentConstructor } from "../constant-varible.js";
import type { Car } from "../constant-varible.js";

export function createCarCards(cars: Car[], classWithRender: ComponentConstructor<Car>){
    return cars
        .map(car => {return new classWithRender(car).render()})
        .join('');
}




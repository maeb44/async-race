import type { ComponentConstructor } from "../constant-varible.js";
import type { Car } from "../constant-varible.js";

export function createCarCards(cars: Car[], classWithRender: ComponentConstructor<Car>): string {
    return cars
        .map(car => new classWithRender(car).render())
        .join('');
}





import type { Winner } from "../constant-varible.js";
import type { ComponentConstructor } from "../constant-varible.js";

export function createCarstroke(winners:Winner[], classWithRender: ComponentConstructor<Winner>):string {
	return winners
		.map(winner=>{
			console.log(winner)
			return new classWithRender(winner).render()
		})
		.join('')
}







import { ENGINE_URL } from "../constant-varible.js";
import type { EngineResponse } from "../constant-varible.js";
export const controllers = new Map<string,AbortController>();

export async function startEngineById(id:string,  ):Promise<false | EngineResponse> {
	try{
		const status = 'started'
		const carURL = new URL(ENGINE_URL)
		carURL.searchParams.set('id',id)
		carURL.searchParams.set('status',status)

		const response = await fetch(carURL.href,{
			method: 'PATCH',
		})

		if (response.status === 400) {
      console.warn(`⚠️ Машина с ID ${id} не найдена`)
      return false
    }

		if (response.status === 404) {
			const errorText = await response.text()
			console.warn(`неправильные параметры: ${errorText}`)
			return false
		}

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data:EngineResponse = await response.json();
		return data;
	}
	catch(error){
		console.error(`Ошибка в createCar:`,error)
		throw error;
	}
}
export async function stopEngineById(id:string):Promise<false | EngineResponse> {
	try{
		const status = 'stopped'
		const carURL = new URL(ENGINE_URL)
		carURL.searchParams.set('id',id)
		carURL.searchParams.set('status',status)

		const response = await fetch(carURL.href,{
			method: 'PATCH',
		})

		if (response.status === 400) {
      console.warn(`⚠️ Машина с ID ${id} не найдена`)
      return false
    }

		if (response.status === 404) {
			const errorText = await response.text()
			console.warn(`неправильные параметры: ${errorText}`)
			return false
		}

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data:EngineResponse = await response.json();
		return data;
	}
	catch(error){
		console.error(`Ошибка в createCar:`,error)
		throw error;
	}
}
// eslint-disable-next-line unicorn/consistent-boolean-name
export async function drive(id:string):Promise<boolean>{
	if(controllers.has(id)){
		controllers.get(id)?.abort()
		controllers.delete(id)
	}
		const controller = new AbortController()
		controllers.set(id,controller)
	try{
		const status = 'drive'
		const carURL = new URL(ENGINE_URL)
		carURL.searchParams.set('id',id)
		carURL.searchParams.set('status',status)

		const response = await fetch(carURL.href,{
			method: 'PATCH',
			signal: controller.signal,
		})

		return !(response.status >= 400);
	}
	catch(error){
		if(error instanceof Error && error.name === 'AbortError'){
			console.log('отмена')
			return false
		}
		console.error(`Ошибка в createCar:`,error)
		throw error;
	}finally {
    controllers.delete(id);
  }
}






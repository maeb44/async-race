import { ENGINE_URL } from "../constant-varible.js";
import type { EngineResponse } from "../constant-varible.js";

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
	try{
		const status = 'drive'
		const carURL = new URL(ENGINE_URL)
		carURL.searchParams.set('id',id)
		carURL.searchParams.set('status',status)

		const response = await fetch(carURL.href,{
			method: 'PATCH',
		})

		if (response.status >= 400) {
			console.warn(await response.text())
			return false
    }

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		return true
	}
	catch(error){
		console.error(`Ошибка в createCar:`,error)
		throw error;
	}
}






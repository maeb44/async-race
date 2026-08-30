import { GARAGE_URL } from "../constant-varible.js";
import type { Car } from "../constant-varible.js";
import type { CarParameters } from "../constant-varible.js";
import type { ApiResponse } from "../constant-varible.js";
import { AppStore } from "../state/state.js";


export async function getCars( page:number = 1, limit:number = 7):Promise<void | ApiResponse<Car>> {
	try{
		if(page<1) return
		const url = GARAGE_URL;
		const carURL = new URL(`${url}`)

		carURL.searchParams.set('_page',String(page))
		carURL.searchParams.set('_limit',String(limit))

		const response = await fetch(carURL.href)

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data:Car[] = await response.json()



		const totalCars:number = Number(await response.headers.get('X-Total-Count')) || 0;
		
		if(data.length === 0 && totalCars >= 1) return

		AppStore.setState({carsPage:{
			data,
			total:totalCars,
			page: page,
		}})

		return {
			data,
			total:totalCars,
			page: page,
		}; 
	}
	catch(error){
		console.error(`Ошибка в getCars:`,error)
		throw error;
	}
}
export async function getCarById(id:number | string ):Promise<false | Car> {
	try{
		const url = GARAGE_URL;
		const carURL = new URL(`${url}/${id}`)

		const response = await fetch(carURL.href)

		if (response.status === 404) {
      console.warn(`⚠️ Машина с ID ${id} не найдена`)
      return false
    }

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data = await response.json()
		return data; 
	}
	catch(error){
		console.error(`Машины с таким id не существует`)
		throw(error)
	}
}
export async function createCar(car:CarParameters):Promise<Car> {
		try{
		const url = GARAGE_URL;

		const response = await fetch(url,{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(car),
		})

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data = await response.json()
		return data;
	}
	catch(error){
		console.error(`Ошибка в createCar:`,error)
		throw error;
	}
}
export async function updateCar(car:CarParameters,id:number):Promise<false | Car> {
		try{
		const url = GARAGE_URL;
		const carURL = new URL(`${url}/${id}`)

		const response = await fetch(carURL,{
			method: 'PUT',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(car),
		})

		if (response.status === 404) {
      console.warn(`⚠️ Машина с ID ${id} не найдена`)
      return false
    }

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data = await response.json()
		return data;
	}
	catch(error){
		console.error(`Ошибка в updateCar:`,error)
		throw error;
	}
}
// eslint-disable-next-line unicorn/consistent-boolean-name
export async function deleteCarById(id:number | string ):Promise<boolean>{
	try{
		const url = GARAGE_URL;
		const carURL = new URL(`${url}/${id}`)

		const response = await fetch(carURL.href,{
			method: 'DELETE'
		})

		if (response.status === 404) {
      console.warn(`⚠️ Машина с ID ${id} не найдена`)
      return false 
    }

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		console.log("Успешна удалена")
		return true;
	}
	catch(error){
		console.error(`Невозможно удалить машину, её не существует`)
		throw(error)
	}
}







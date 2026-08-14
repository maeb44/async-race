import type { Winner } from "../constant-varible.js";
import { WINNERS_URL } from "../constant-varible.js";
import type { WinnerParams } from "../constant-varible.js";

export async function getWinners( page:number = 1, limit:number = 10, sort: 'id'|'wins'|'time' = 'wins',order:'ASC'|'DESC' = 'ASC'):Promise<Winner[]>{
	try{
		const url = WINNERS_URL;
		const winURL = new URL(`${url}`)

		winURL.searchParams.set('_page',String(page))
		winURL.searchParams.set('_limit',String(limit))
		winURL.searchParams.set('_sort',String(sort))
		winURL.searchParams.set('_order',String(order))

		const response = await fetch(winURL.href)

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data = await response.json()
		return data; 
	}
	catch(error){
		console.error(`Ошибка в getWinners:`,error)
		throw error;
	}
}
export async function getWinnerById(id:number):Promise<Winner | false>{
	try{
		const winURL = new URL(`${WINNERS_URL}/${id}`)

		const response = await fetch(winURL.href)

		if(!response.ok){
			console.warn(response.statusText,`car with id ${id}`)
			return false;
		}
		const data = await response.json()
		return data; 
	}
	catch(error){
		console.error(`Ошибка в getWinnerById:`,error)
		throw error;
	}
}
export async function createWinner(winner:Winner):Promise<Winner | false>{
	try{
		const response = await fetch(WINNERS_URL,{
			method:'POST',
			headers:{
			'Content-Type': 'application/json',
			},
			body:JSON.stringify(winner)
		})
		if(!response.ok){
			const codeOfError = await response.status
			if(codeOfError===500){
				console.warn('You id already in database')
			}else{
				console.warn( response.statusText)
			}
			return false;
		}
		return winner;
	}catch(error){
		console.error(`Ошибка в IsWinnerCreate:`,error)
		throw error;
	}
}

export async function deleteWinner(id:number):Promise<boolean | void>{
	try{
		const url = new URL(`${WINNERS_URL}/${id}`)
		const response = await fetch(url,{
			method:'DELETE',
		})
		if(!response.ok){
			console.warn( response.statusText)
			return false;
		}
		return true;
	}catch(error){
		console.error(`Невозможно удалить winner, его не существует`)
		throw(error)
	}
}
export async function updateWinner(winnerParams:WinnerParams,id:number):Promise<false | Winner> {
		try{
		const url = WINNERS_URL;
		const carURL = new URL(`${url}/${id}`)

		const response = await fetch(carURL,{
			method: 'PUT',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(winnerParams),
		})

		if (response.status === 404) {
			console.warn(`⚠️ Winner с ID ${id} не найдена`)
			return false
		}

		if(!response.ok){
			throw new Error(`HTTP ошибка: ${response.status}`)
		}
		const data = await response.json()
		return data;
	}
	catch(error){
		console.error(`Ошибка в updateWinner:`,error)
		throw error;
	}
}

await updateWinner({
	wins:10,
	time:231
},2)
console.log(await getWinners())

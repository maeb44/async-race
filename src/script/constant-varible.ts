export interface CarParameters{
    name: string,
    color: string
}
export interface Car {
	name:string,
	color:string,
	id:string
}
export interface EngineResponse   {
    velocity: number,
    distance: number
}
export interface Winner {
	    id: number,
      wins: number,
      time: number
}
export interface WinnerParams{
	wins:number,
	time:number
}


export const SERVER_URL : string = 'http://127.0.0.1:3000';
export const GARAGE_URL : string = `${SERVER_URL}/garage`
export const ENGINE_URL : string = `${SERVER_URL}/engine`
export const WINNERS_URL : string = `${SERVER_URL}/winners`







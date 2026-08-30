import type { AppState } from "../constant-varible.js";

type Listener<T> = (state:T) => void;

export class Store<T>{
	private state:T;
	private listeners:Listener<T>[]=[]
	private isUpdating = false;
	constructor(initialState:T){
		this.state=initialState;
	}

	private notify(): void {
		for(const listener of this.listeners){
			listener(this.state)
		}}
	subscribe(listener:Listener<T>){
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(l=> l !== listener)
		}
	}

	getState():T{
		return this.state;
	}
	setState(newState:Partial<T>):void{
		if(this.isUpdating){
			console.warn('В процессе обновления')
			return;
		}
		this.isUpdating = true;

		this.state = {...this.state,...newState};

			this.notify();

		this.isUpdating = false;
	}
}



export const AppStore = new Store<AppState>({
	carsPage:{
		data: [],
		total: 0,
		page: 1
	},
	winnersPage:{
		data: [],
		total: 0,
		page: 1
	},
	selectCar: undefined,
	currentPage: 'carsPage'
})
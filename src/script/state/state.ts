class State {
	private _selectCarId : string = ''
	constructor(){}
	get selectCarId(): string{
		return this._selectCarId
	}
	set selectCarId(value:string){
		this._selectCarId = value.trim();
	}
}

export const AppState = new State()
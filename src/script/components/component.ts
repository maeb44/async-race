import type { IComponent } from "../constant-varible.js";
import {Store } from "../state/state.js";
import type { AppState } from "../constant-varible.js";

export class Component<P = {}> implements IComponent<P>{
	
	private _unsubscribe?:()=>void;
	private store:Store<AppState> | undefined;
	state: AppState;
	props: P;
	element: HTMLElement;	
	
	
	constructor(properties:P,store?:Store<AppState> | undefined){
		this.props = properties;
		this.store = undefined;
    this.state = {
      carsPage: { data: [], total: 0, page: 1 },
      winnersPage: { data: [], total: 0, page: 1, sort:'wins',order:'DESC' },
      selectCar: undefined,
      currentPage: 'carsPage',
			positionOfCars:[],
			inputField:undefined
    };
		this.element = document.createElement('div')
		if(store){
			this.store = store;
			this._unsubscribe = store.subscribe((newState)=>{
				this.setState(newState);
			});
			this.state = store.getState();
		}
	}

		setProps(newProperties: Partial<P>): void {
				this.props = {...this.props, ...newProperties}
				this.update();
		}

		setState(newState:Partial<AppState>):void{
			this.state = {...this.state,...newState};
			this.onStateChange();
			this.update();
		}
		onStateChange():void{}

		onMount():void{
			if(this._unsubscribe && this.store != undefined){
				this._unsubscribe = this.store.subscribe((newState)=>{
				this.setState(newState);
			});
			}
		};
		onUnmount():void{
			if(this._unsubscribe){
				this._unsubscribe();
			}
		};

		render():string{
			return''
		}

		update():void{
			this.element.innerHTML = this.render();
			this.afterRender();
		}

		afterRender():void{};

		mount<C extends HTMLElement>(container:C):void{
			this.update();
			container.append(this.element);
			this.onMount();
		}
		unmount():void{
			this.onUnmount();
			this.element.remove();
		}
}


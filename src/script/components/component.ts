export class Component<T = {}>{
	state: object;
	props: T;
	element: HTMLElement;

	constructor(properties:T){
		this.props = properties;
		this.state = {}
		this.element = document.createElement('div')
	}

		setState(newState:object):void{
			const previousState = {...this.state};
			this.state = {...this.state,...newState};
			this.onStateChange(previousState,this.state);
			this.update();
		}
		onStateChange(_previousState:object,_newState:object):void{}

		onMount():void{};
		onUnmount():void{};

		render():string{
			return''
		}
		update(){
			this.element.innerHTML = this.render();
			this.afterRender();
		}

		afterRender():void{};

		mount<C extends HTMLElement>(container:C){
			this.update();
			container.append(this.element);
			this.onMount();
		}
		unmount(){
			this.onUnmount();
			this.element.remove();
		}
}
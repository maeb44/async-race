import { Component } from "./component.js";


export class Header extends Component<object>{

	constructor(){
		super({})
		this.element.classList.add('navigation-menu')
	}
	render(): string {
			return `
			<button id="garage" class="nav_btn">to garage</button>
			<button id="winner"class="nav_btn">to winners</button>
		`
	}
	mount<C extends HTMLElement>(container: C): void {
			this.update();
			container.prepend(this.element);
			this.onMount();
	}
}
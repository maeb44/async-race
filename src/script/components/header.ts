import { Component } from "./component.js";


export class Header extends Component<object>{

	constructor(){
		super({})
	}
	render(): string {
			return `
		<nav>
			<button id="garage" class="nav_btn">to garage</button>
			<button id="winner"class="nav_btn">to winners</button>
		</nav>
		`
	}
	mount<C extends HTMLElement>(container: C): void {
			this.update();
			container.prepend(this.element);
			this.onMount();
	}
}
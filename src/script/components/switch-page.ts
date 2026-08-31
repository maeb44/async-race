import { AppStore } from "../state/state.js";
import { Component } from "./component.js";


export class SwitchPage extends Component<object>{

	constructor(){
		super({},AppStore)
		this.element.classList.add('switch-page_div')
	}

	render(): string {
			return `
					<button id="back" class="switch-page_btn">back</button>
					<button id="next" class="switch-page_btn">next</button>
			`
	}
	afterRender(): void {}
}
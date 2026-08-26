import { Component } from "./component.js";


export class SwitchPage extends Component<object>{

	constructor(){
		super({})
	}
	render(): string {
			return `
				<div class="switch-page_div">
					<button id="next" class="switch-page_btn">next</button>
					<button id="back" class="switch-page_btn">back</button>
				</div>
			`
	}

}
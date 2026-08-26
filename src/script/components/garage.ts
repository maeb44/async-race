import type { Car } from "../constant-varible.js"
import { Component } from "./component.js"
import type { ApiResponse } from "../constant-varible.js"
import { createCarCards } from "../utils/create-cards.js"
import { carCardListener } from "../listeners/card-cards-listener.js"
import { SVG } from "../constant-varible.js"
import { inputListener } from "../listeners/race-input-listener.js"

export class RaceInput extends Component<object>{

	constructor(){
		super({})
	}
	
	render(): string {
			return `
					<div class="race_input_div">
			<div class="input_wrapper">
				<input class = "create_input" type="text" name="carName"> 
				<input class = "create_color" type="color" name="carColor" value="rgb(229, 182, 189)">
				<button class="input_btn create_btn">create</button>
			</div>
			<div class="input_wrapper" >
				<input class = "update_input" type="text" name="carName" disabled> 
				<input class = "update_color" type="color" name="carColor" value="rgb(229, 182, 189)" disabled>
				<button class="input_btn update_btn" disabled>update</button>
			</div>
			<div class="btn_control_div">
			<button class="control_btn">race</button>
			<button class="control_btn">reset</button>
			<button class="generate_btn">generate cars</button>
		</div>
		</div>
			`
	}
	afterRender(): void {
		this.element.addEventListener('click', async (event: PointerEvent) => {
				await inputListener(event);
		});
	}
}

export class CarCard extends Component<Car>{
	constructor(CarProperties:Car){
		super(CarProperties)
	}
	render(): string {
			return `
				<div class="car_wrapper" id="${this.props.id}" data-color='${this.props.color}' data-name="${this.props.name}">
					<div class="car_control">
						<button class="select_btn">select</button>
						<button class="remove_btn">remove</button>
						<p id="car-name">${this.props.name}</p>
					</div>
					<div class="engine_control">
						<button class="start-engine" >A</button>
						<button class="stop-engine" disabled>B</button>
					</div>
					<div class="car" style="left: 50px; color:${this.props.color}">
						${SVG}
					</div>
				</div>
			`
	}
}

export class garageView extends Component<ApiResponse<Car>>{
	constructor(Response:ApiResponse<Car>){
		super(Response)
	}
	render(): string {
			return `
			<div class="garage_div">
				<h1>Garage(<span id="quntityOfCars">${this.props.total}</span>)</h1>
				<p class="page_p">Page #<span id="numberOfPage">${this.props.page}</span></p>
				${createCarCards(this.props.data,CarCard)}
			</div>
			`
	}
	afterRender(): void {
		this.element.addEventListener('click', async (event: PointerEvent) => {
					await carCardListener(event);
		});
	}
}
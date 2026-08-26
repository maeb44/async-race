import type { Winner } from "../constant-varible.js";
import type { ApiResponse } from "../constant-varible.js";
import { Component } from "./component";
import { SVG } from "../constant-varible.js";
import { createCarstroke } from "../utils/create-stroke.js";



export class CarStroke extends Component<Winner>{
	constructor(CarProperties:Winner){
		super(CarProperties)
	}
	render(): string {
			return `
							<tr data-car-id ="${this.props.id}">
								<td data-car-color = "${this.props.color}" style="color:${this.props.color}">
									${SVG}
								</td>
								<td data-car-name="${this.props.name}">${this.props.name}</td>
								<td data-car-wins="${this.props.wins}">${this.props.wins}</td>
								<td data-car-time="${this.props.time}">${this.props.time}</td>
							</tr>
			`
	}
}


export class winnerTable extends Component<ApiResponse<Winner>>{
	constructor(Response:ApiResponse<Winner>){
		super(Response)
	}
  render(): string {
        const startNumber = (this.props.page - 1) * 10 + 1;

        const itemsOnPage = Math.min(10, this.props.total - (this.props.page - 1) * 10);
        
        const numbersHtml = Array.from(
            { length: itemsOnPage },
            (_, index) => `<tr><td>${startNumber + index}</td></tr>`
        ).join('');
        
        return `
            <div class="winners_div">
                <h1>Winners(<span id="quntityOfWinnersCars">${this.props.total}</span>)</h1>
                <p class="page_p">Page #<span id="numberOfWinnerPage">${this.props.page}</span></p>
                <div class="table_wrapper">
                    <table class="numbers_table">
                        <thead>
                            <tr><th>Number</th></tr>
                        </thead>
                        <tbody>
                            ${numbersHtml}
                        </tbody>
                    </table>
                    <table class="winners_table">
                        <thead>
                            <tr>
                                <th>car</th>
                                <th>name</th>
                                <th>wins</th>
                                <th>Best time(sec)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${createCarstroke(this.props.data, CarStroke)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
	afterRender(): void {}
}
import type { Winner } from "../constant-varible.js";
import { Component } from "./component";
import { SVG } from "../constant-varible.js";
import { createCarstroke } from "../utils/create-stroke.js";
import { AppStore } from "../state/state.js";



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
								<td data-car-time="${this.props.time.toFixed(2)}">${this.props.time.toFixed(2)}</td>
							</tr>
			`
	}
}


export class winnerTable extends Component<{}>{
	constructor(){
		super({},AppStore)
		this.element.classList.add('winners_div')
		}
  render(): string {
		const storeState = AppStore.getState();
      if (JSON.stringify(storeState)!=JSON.stringify(this.state)) {
  	  this.state = { ...this.state, ...storeState };
    }
        const startNumber = (this.state.winnersPage.page - 1) * 10 + 1;
        const itemsOnPage = Math.min(10, this.state.winnersPage.total - (this.state.winnersPage.page - 1) * 10);
        const numbersHtml = Array.from(
            { length: itemsOnPage },
            (_, index) => `<tr><td>${startNumber + index}</td></tr>`
        ).join('');
        return `
                <h1>Winners(<span id="quntityOfWinnersCars">${this.state.winnersPage.total}</span>)</h1>
                <p class="page_p">Page #<span id="numberOfWinnerPage">${this.state.winnersPage.page}</span></p>
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
                                <th id="wins" data-sort="${this.state.winnersPage.order}">wins</th>
                                <th id="time" data-sort="${this.state.winnersPage.order}">Best time(sec)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${createCarstroke(this.state.winnersPage.data, CarStroke)}
                        </tbody>
                    </table>
                </div>
        `;
  }
	afterRender(): void {}
}
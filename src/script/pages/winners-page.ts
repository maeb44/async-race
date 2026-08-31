import { Header } from "../components/header.js";
import { winnerTable} from "../components/winner-table.js";
import { SwitchPage } from "../components/switch-page.js";
import { getWinners } from "../api/winners.js";
import type { IComponent } from "../constant-varible.js";
import { AppStore } from "../state/state.js";


export class WinnerPage {
	private table : IComponent;
	private container : HTMLElement | null;
	private currentPage: number = AppStore.getState().carsPage.page;
	private header: IComponent;
	private swithPage : IComponent;

	constructor(){
		this.container = document.querySelector('#app')!;
		if (!this.container) {
			throw new Error('App container not found!');
		}
		this.header = new Header()
		this.swithPage = new SwitchPage()
		this.table = new winnerTable();
		this.init();
	}
	async init(){
		await getWinners(this.currentPage)
	}
	render(){
		if (!this.container) {
			throw new Error('App container not found!');
		}
		this.container.replaceChildren();
		this.header.mount(this.container)
		this.table.mount(this.container)
		this.swithPage.mount(this.container)
	}
	onmount(){
		this.header.unmount()
		this.table.unmount()
		this.swithPage.unmount()	
	}
}

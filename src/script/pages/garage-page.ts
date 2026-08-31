import { RaceInput, garageView } from "../components/garage.js";
import { getCars } from "../api/garage.js";
import type { IComponent } from "../constant-varible.js";
import { Header } from "../components/header.js";
import { SwitchPage } from "../components/switch-page.js";
import { AppStore } from "../state/state.js";


export class GaragePage {
	private garage: IComponent;
	private raceInput : IComponent;
	private container : HTMLElement | null;
	private currentPage: number = AppStore.getState().winnersPage.page;
	private header: IComponent;
	private swithPage : IComponent;
	
	constructor(){
    this.container = document.querySelector('#app')!;
    if (!this.container) {
      throw new Error('App container not found!');
    }
		this.header = new Header()
		this.swithPage = new SwitchPage()
		this.raceInput = new RaceInput();
		this.garage = new garageView();
		this.init()
	}
	async init(){
		await getCars(this.currentPage)
	}
	render(){
		if (!this.container) {
      throw new Error('App container not found!');
    }
		this.container.replaceChildren();
		this.header.mount(this.container)
		this.raceInput.mount(this.container)
		this.garage.mount(this.container)
		this.swithPage.mount(this.container)	
	}
	onmount(){
		this.header.unmount()
		this.raceInput.unmount()
		this.garage.unmount()
		this.swithPage.unmount()	
	}
}




import '../styles/main.scss'
import '../styles/menu.scss'
import '../styles/input.scss'
import '../styles/garage.scss'
import '../styles/winners.scss'
import '../styles/switch-page.scss'
import '../script/api/winners.ts'
import { GaragePage } from './pages/garage-page.ts'
import { WinnerPage } from './pages/winners-page.ts'
import { AppStore } from './state/state.ts'
import { Listener } from './listeners/main-listener.ts'



class App {
	private garage;
	private winner;
	private container : HTMLElement | null;
	private currentPage : 'carsPage' | 'winnersPage' | ''

	constructor(){
		AppStore.subscribe(()=>{
			this.switchView();
		})
		this.container = document.querySelector('#app')!;
    if (!this.container) {
      throw new Error('App container not found!');
    }
		this.garage = new GaragePage();
		this.winner = new WinnerPage();
		this.currentPage = ''
		this.init()

	}
	private init():void{
		this.container?.addEventListener('click',async (event: PointerEvent) => {
			await Listener(event);
		})
	}
	private switchView() {
		const currentPage = AppStore.getState().currentPage
		switch (currentPage) {
		case this.currentPage: { return
		}
		case 'winnersPage': {
			this.garage.onmount()
			this.winner.render()
			this.currentPage = 'winnersPage'
		
		break;
		}
		case 'carsPage': {
			this.winner.onmount()
			this.garage.render()
			this.currentPage = 'carsPage'
		
		break;
		}

		}
	}

}

export const app = new App()


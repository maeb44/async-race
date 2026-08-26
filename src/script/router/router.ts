type RouteHandler = () => void;
import type { Routes } from "../constant-varible";

export class Router{
	private routes:Routes = {}
	// private currentPath:string = '/'

	constructor(){
		this.init()
		console.log('router')
	}

	private init(){
		document.addEventListener('click', (event) => {
			if (!(event.target instanceof HTMLElement)) return;

			const link = event.target.closest<HTMLElement>('[data-link]');
			if (link) {
				event.preventDefault();
				const path = link.dataset.link || link.getAttribute('href');
				
				if (path) this.navigate(path);
			}
		});
		document.addEventListener('popstate', ()=>{
			this.render(globalThis.location.pathname);
		})
	}

	addRoute(path:string,handler:RouteHandler){
		this.routes[path] = handler;
		return this;
	}

	render(path:string){
		const route = this.routes[path]
		if(route)	{
			route()
			// this.currentPath = path;
		}else{
			console.log("Такого пути не существует")
		}
	}

	navigate(path:string){
		// this.currentPath = path;
		history.pushState({},'',path)
		this.render(path)
	}

}
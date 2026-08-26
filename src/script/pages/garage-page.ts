import { Header } from "../components/header.js";
import { RaceInput, garageView } from "../components/garage.js";
import { getCars } from "../api/garage.js";
import { SwitchPage } from "../components/switch-page.js";

export async function garagePage(){
	const header = new Header()
	const raceInput = new RaceInput()
	const garage = new garageView(await getCars(1))
	const switchPage =new SwitchPage()
	header.mount(document.body)
	// raceInput.mount(document.body)
	// garage.mount(document.body)
	switchPage.mount(document.body)
}

// await garagePage()

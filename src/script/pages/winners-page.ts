import { Header } from "../components/header.js";
import { winnerTable} from "../components/winner-table.js";
import { SwitchPage } from "../components/switch-page.js";
import { getWinners } from "../api/winners.js";

export async function winnerPage(){
	const header = new Header()
	const table = new winnerTable(await getWinners(1))
	const switchPage = new SwitchPage()
	header.mount(document.body)
	table.mount(document.body)
	switchPage.mount(document.body)
}

await winnerPage()

import { getCars,createCar, getCarById, updateCar,deleteCarById } from "../api/garage";
import { getWinners, deleteWinner } from "../api/winners";
import { AppStore } from "../state/state";

export async function Listener(event:PointerEvent):Promise<void>{				
	if(!(event.target instanceof HTMLElement)) return
	const target:HTMLElement = event.target;
	await switchPage(target)
	switchView(target)
	createCarButton(target)
	selectCar(target)
	updateCarButton(target)
	deleteCar(target)
}


async function switchPage(target:EventTarget) {
				if(!(target instanceof HTMLElement)) return
				const back = target.closest<HTMLDivElement>('#back')
				const next = target.closest<HTMLButtonElement>('#next')
				if(!back && !next) return
				const state =  AppStore.getState() ;
				const currentPage = state.currentPage
				const numberOfPage = state[currentPage].page;
				
				if(back){
					if(currentPage === 'carsPage'){
						await	getCars(numberOfPage-1)
						return
					}
					await getWinners(numberOfPage-1)
					return
				}
				if(next){
					const totalCars = state[currentPage].total
					if(currentPage === 'carsPage' && totalCars>0){
						await	getCars(numberOfPage+1)
						return
					}
					await getWinners(numberOfPage+1)
					return
				}
}

function switchView(target:EventTarget) {
		if(!(target instanceof HTMLElement)) return
		const garage = target.closest<HTMLDivElement>('#garage')
		const winner = target.closest<HTMLButtonElement>('#winner')
		if(!winner && !garage) return

		if(winner){
			AppStore.setState({currentPage: 'winnersPage'})
		}
		if(garage){
			AppStore.setState({currentPage: 'carsPage'})
		}
}
async function createCarButton(target:EventTarget){
	if(!(target instanceof HTMLElement)) return
	const createButton = target.closest<HTMLButtonElement>('.create_btn')
	const createColor = document.querySelector<HTMLButtonElement>('.create_color')
	const createInput = document.querySelector<HTMLInputElement>('.create_input')

	if(createButton && createColor && createInput){
			await  createCar({
				name: createInput.value,
				color:createColor.value
			})
			await getCars(AppStore.getState().carsPage.page)
		}
}
async function updateCarButton(target:EventTarget) {
	if(!(target instanceof HTMLElement)) return
	const updateButton = target.closest<HTMLButtonElement>('.update_btn')
	const updateColor = document.querySelector<HTMLButtonElement>('.update_color')
	const updateInput = document.querySelector<HTMLInputElement>('.update_input')
	const id = Number(AppStore.getState().selectCar?.id)
	if(updateButton && updateColor && updateInput && id){
			await  updateCar(
				{
				name: updateInput.value,
				color:	updateColor.value
				},
				id
			)
			AppStore.setState({
					selectCar: undefined
				})
			await getCars(AppStore.getState().carsPage.page)
		}
}
async function selectCar(target:EventTarget){
	if(!(target instanceof HTMLElement)) return
	const selectButton = target.closest<HTMLButtonElement>('.select_btn')
	if(selectButton){
		const carCard = selectButton.closest<HTMLDivElement>('.car_wrapper')
		if(carCard && typeof carCard.id){
				const car = await getCarById(carCard.id) 
				AppStore.setState({
					selectCar: car || undefined
				})
			}

	}

}
async function deleteCar(target:EventTarget) {
	if(!(target instanceof HTMLElement)) return
	const deleteButton = target.closest<HTMLButtonElement>('.remove_btn')
	if(deleteButton){
	const carCard = deleteButton.closest<HTMLDivElement>('.car_wrapper')
	if(carCard && typeof carCard.id){
			await deleteCarById(carCard.id) 
			try{
				await deleteWinner(carCard.id)
			}catch{
				console.log(1)
			}

			await getCars(AppStore.getState().carsPage.page)
		}
}
}

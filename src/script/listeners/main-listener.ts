import { getCars,createCar, getCarById, updateCar,deleteCarById } from "../api/garage";
import { getWinners, deleteWinner, createWinner, getWinnerById, updateWinner } from "../api/winners";
import { AppStore } from "../state/state";
import { CARNAMES,CARMARKS, type Winner } from "../constant-varible";
import { drive, startEngineById, stopEngineById, controllers } from "../api/engine";
import { animation } from "../utils/animation";
import { getPositionOfCars } from "../utils/get-position";

export async function Listener(event:PointerEvent):Promise<void>{				
	if(!(event.target instanceof HTMLElement)) return
	const target:HTMLElement = event.target;
	await switchView(target)
	await switchPage(target)
	await createCarButton(target)
	await selectCar(target)
	await updateCarButton(target)
	await deleteCar(target)
	await generateCars(target)
	await startSoloRide(target)
	await stopSoloRide(target)
	await startRace(target)
	await resetRace(target)
	await sortTable(target)
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
					await getWinners(numberOfPage-1,undefined,state.winnersPage.sort,state.winnersPage.order)
					return
				}
				if(next){
					const totalCars = state[currentPage].total
					if(currentPage === 'carsPage' && totalCars>0){
						await	getCars(numberOfPage+1)
						return
					}
					await getWinners(numberOfPage+1,undefined,state.winnersPage.sort,state.winnersPage.order)
					return
				}
}
async function switchView(target:EventTarget) {
		if(!(target instanceof HTMLElement)) return
		const garage = target.closest<HTMLDivElement>('#garage')
		const winner = target.closest<HTMLButtonElement>('#winner')
		if(!winner && !garage) return

		if(winner && AppStore.getState().currentPage!='winnersPage'){
		const carWrappers = [...document.querySelectorAll('.car_wrapper')]
		getPositionOfCars()
		for(const wrapper of carWrappers){
			const car = wrapper.querySelector<HTMLDivElement>('.car')
			if(!car) return
			car.dataset.isDrive = 'false'
			if(controllers.has(wrapper.id)){
				controllers.get(wrapper.id)?.abort()
				controllers.delete(wrapper.id)
			}
		}
			await getWinners(AppStore.getState().winnersPage.page,undefined,AppStore.getState().winnersPage.sort,AppStore.getState().winnersPage.order)
			AppStore.setState({currentPage: 'winnersPage'})
		}
		if(garage && AppStore.getState().currentPage!='carsPage'){
			await getCars(AppStore.getState().carsPage.page)
			AppStore.setState({currentPage: 'carsPage'})
		}
}
async function createCarButton(target:EventTarget){
	if(!(target instanceof HTMLElement)) return
	
	const createButton = target.closest<HTMLButtonElement>('.create_btn')
	const createColor = document.querySelector<HTMLButtonElement>('.create_color')
	const createInput = document.querySelector<HTMLInputElement>('.create_input')

	if(createButton && createColor && createInput){
			getPositionOfCars()
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
		getPositionOfCars()
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
		getPositionOfCars()
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
		getPositionOfCars()
	const carCard = deleteButton.closest<HTMLDivElement>('.car_wrapper')
	if(carCard && typeof carCard.id){
			await deleteCarById(carCard.id) 
			try{
				await deleteWinner(carCard.id)
			}catch{}

			await getCars(AppStore.getState().carsPage.page)
		}
}
}
async function generateCars(target:EventTarget){
	if(!(target instanceof HTMLElement)) return
	const generateButton = target.closest<HTMLButtonElement>('.generate_btn')
	if(generateButton){
		getPositionOfCars()
    const promises = Array.from({ length: 100 }, async () => {
        const randomMark = CARMARKS[Math.floor(Math.random() * CARMARKS.length)];
        const randomName = CARNAMES[Math.floor(Math.random() * CARNAMES.length)];
        const randomColor = '#' + Math.floor(Math.random() * 16_777_215).toString(16).padStart(6, '0');
        const carName = `${randomMark} ${randomName}`;
        return createCar({
            name: carName,
            color: randomColor
        });
    });
		await Promise.all(promises);
		await getCars(AppStore.getState().carsPage.page)
	}
}
async function startSoloRide(target: EventTarget) {
    if (!(target instanceof HTMLElement)) return;
    const startButton = target.closest<HTMLButtonElement>('.start-engine');
    if (!startButton ) return;
    const carCard = startButton.closest<HTMLDivElement>('.car_wrapper');
    if (!carCard || !carCard.id) return;
    const car = carCard.querySelector<HTMLDivElement>('.car');
		const stopButton = carCard.querySelector<HTMLButtonElement>('.stop-engine')
    if (car && stopButton) {
				startButton.disabled = true;	
        const carProperties = await startEngineById(carCard.id);
				if(!carProperties) return
				stopButton.disabled = false
				animation(carProperties.velocity,carProperties.distance,car,carCard)
				const isFinish = await drive(carCard.id)
				if(!isFinish || isFinish) {
					const animId = Number(car?.dataset.animId)
					cancelAnimationFrame(animId)
				}
    }
}
async function stopSoloRide(target: EventTarget) {
    if (!(target instanceof HTMLElement)) return;
		const stopButton = target.closest<HTMLButtonElement>('.stop-engine')
    if (!stopButton ) return;
		stopButton.disabled = true;
    const carCard = stopButton.closest<HTMLDivElement>('.car_wrapper');
    if (!carCard || !carCard.id) return;

    const car = carCard.querySelector<HTMLDivElement>('.car');
		const startButton = carCard.querySelector<HTMLButtonElement>('.start-engine')
		const animId = Number(car?.dataset.animId)
		if(animId) 	cancelAnimationFrame(animId)
		if(!car || !startButton) return
		const isDrive = JSON.parse(car.dataset.isDrive || 'false')
		if(!isDrive){
			startButton.disabled = false;
			car.style.left = 50 + 'px';
			return
		}


		car.dataset.isDrive = 'false'
		if(controllers.has(carCard.id)){
			controllers.get(carCard.id)?.abort()
			controllers.delete(carCard.id)
		}
		
		await stopEngineById(carCard.id)
		car.style.left = 50 + 'px';
		startButton.disabled = false;
}
async function startRace(target: EventTarget) {
		if (!(target instanceof HTMLElement)) return;
		const raceButton = target.closest<HTMLButtonElement>('#race')
		const resetButton = document.querySelector<HTMLButtonElement>('#resetRace')
		if(!raceButton || !resetButton) return
		raceButton.disabled = true;
		const carWrappers = [...document.querySelectorAll('.car_wrapper')]
		const promises:Promise<void>[] = [], results:Winner[] = [];
		for(const wrapper of carWrappers){
			if(!(wrapper instanceof HTMLDivElement)) return
			const stopButton = wrapper.querySelector<HTMLButtonElement>('.stop-engine')
			const startButton = wrapper.querySelector<HTMLButtonElement>('.start-engine')
			const car = wrapper.querySelector<HTMLDivElement>('.car');
			if(!stopButton || !startButton || !car) return
			stopButton.disabled = true;
			startButton.disabled = true;
			promises.push((async ()=>{
				document.body.classList.toggle('blocked')
				const carProperties = await startEngineById(wrapper.id);
				if(!carProperties) return
				await animation(carProperties.velocity,carProperties.distance,car,wrapper)
				const isFinish = await drive(wrapper.id)
				if(isFinish) results.push({id:Number(wrapper.id),wins:1, time:(carProperties.distance/carProperties.velocity/1000),name:`${wrapper.dataset.name}`,color:car.style.color})
				stopButton.disabled = false
				const animId = Number(car.dataset.animId)
				cancelAnimationFrame(animId)
		await stopEngineById(wrapper.id)})())}
		await Promise.all(promises)
		document.body.classList.toggle('blocked')
		resetButton.disabled = false;
		const bestResult = results.toSorted((a,b)=>a.time-b.time)[0]
		try{if(!bestResult) return
			alert(`Победил ${bestResult.name}, с временем ${(bestResult.time).toFixed(2)}`)
			const Winner = await getWinnerById(bestResult.id)
			if(Winner) await updateWinner({wins:Winner.wins+1,time:Math.min(bestResult.time, Winner.time)},Winner.id)
			else await createWinner(bestResult)
		}catch{}
}
async function resetRace(target: EventTarget) {
		if (!(target instanceof HTMLElement)) return;
		const resetButton = target.closest<HTMLButtonElement>('#resetRace')
		const raceButton = document.querySelector<HTMLButtonElement>('#race')
		if(!resetButton || !raceButton) return
		resetButton.disabled = true
		const carWrappers = [...document.querySelectorAll('.car_wrapper')]
		const promises:Promise<void>[] = [];
		for(const wrapper of carWrappers){
			if(!(wrapper instanceof HTMLDivElement)) return
			const stopButton = wrapper.querySelector<HTMLButtonElement>('.stop-engine')
			const startButton = wrapper.querySelector<HTMLButtonElement>('.start-engine')
			const car = wrapper.querySelector<HTMLDivElement>('.car');
			if(!stopButton || !startButton || !car) return
			promises.push((async ()=>{
				const animId = Number(car.dataset.animId)
				cancelAnimationFrame(animId)
				if(controllers.has(wrapper.id)){
					controllers.get(wrapper.id)?.abort()
					controllers.delete(wrapper.id)
				}
				await stopEngineById(wrapper.id)

				stopButton.disabled = true;
				startButton.disabled = false;
				car.style.left = '50px';
			})())
		}
		await Promise.all(promises)

		raceButton.disabled = false



}
async function sortTable(target: EventTarget) {
	if (!(target instanceof HTMLElement)) return;
	const wins = target.closest<HTMLButtonElement>('#wins')
	const time = target.closest<HTMLButtonElement>('#time')
	const state = {...AppStore.getState().winnersPage}
	if(wins && state){ 
		state.order === "ASC" ? state.order = 'DESC':state.order = 'ASC'
		state.sort = 'wins'
		await getWinners(state.page,undefined,state.sort,state.order)
	}

	if(time && state){
		state.order === "ASC" ? state.order = 'DESC':state.order = 'ASC'
		state.sort = 'time'
		await getWinners(state.page,undefined,state.sort,state.order)
	}

}

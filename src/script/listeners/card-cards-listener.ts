import type { Car } from "../constant-varible.js";
import { AppState } from "../state/state.js";
import { deleteCarById } from "../api/garage";
import { startEngineById,stopEngineById,drive } from "../api/engine";

export async function carCardListener(event:PointerEvent):Promise<void>{
	if(!(event.target instanceof HTMLElement)) return
	const target:HTMLElement = event.target
	const {wrapper,selectButton,removeButton,startEngineButton,stopEngineButton,carProps} = getElementsFromCard(target)
	if(!wrapper) return;
	if(selectButton){
		handleSelect(selectButton,carProps)
	}
	if(removeButton){
		await handleRemove(removeButton,carProps,wrapper)
	}
	if(startEngineButton){
		await handleStartEngine(startEngineButton,wrapper,carProps)
	}
	if(stopEngineButton){
		await handleStopEngine(stopEngineButton,wrapper,carProps)
	}
}

function getElementsFromCard(target : HTMLElement){
	const wrapper = target.closest<HTMLDivElement>('.car_wrapper')
	const selectButton = target.closest<HTMLButtonElement>('.select_btn')
	const removeButton = target.closest<HTMLButtonElement>('.remove_btn')
	const startEngineButton = target.closest<HTMLButtonElement>('.start-engine')
	const stopEngineButton = target.closest<HTMLButtonElement>('.stop-engine')
	const [id,name,color] = [wrapper?.id, wrapper?.dataset.name,wrapper?.dataset.color]
	if(id && name && color){
		const carProperties:Car = {
			id,
			name,
			color
		}
		return {
		wrapper,
		selectButton,
		removeButton,
		startEngineButton,
		stopEngineButton,
		carProps: carProperties
	}
	}
	return {}

}

function handleSelect(selectButton:HTMLButtonElement,carProperties:Car){
	AppState.selectCarId = AppState.selectCarId == carProperties.id ? '' : carProperties.id;
	console.log(AppState.selectCarId)
}
async function handleRemove(removeButton:HTMLButtonElement,carProperties:Car,wrapper:HTMLDivElement){
	await deleteCarById(carProperties.id)
}
async function handleStartEngine(startEngineButton:HTMLButtonElement,wrapper:HTMLDivElement,carProperties:Car){

	const stopEngineButton = wrapper.querySelector<HTMLButtonElement>('.stop-engine')
	if(stopEngineButton) 	stopEngineButton.disabled = false;
	startEngineButton.disabled = true;
	console.log(stopEngineButton)
	console.log(await startEngineById(carProperties.id))

	const isCarFinish = await drive(carProperties.id);
	
	if(await isCarFinish){
		console.log(isCarFinish)
		if(stopEngineButton) stopEngineButton.disabled = true;
		startEngineButton.disabled = false;
	}
}
async function handleStopEngine(stopEngineButton:HTMLButtonElement,wrapper:HTMLDivElement,carProperties:Car){
	const startEngineButton = wrapper.querySelector<HTMLButtonElement>('.start-engine')
	if(startEngineButton) 	startEngineButton.disabled = false;
	stopEngineButton.disabled = true;
	console.log(await stopEngineById(carProperties.id))
}

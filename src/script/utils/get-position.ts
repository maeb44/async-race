import { AppStore } from "../state/state"


export function getPositionOfCars(){
	
	const carWrappers = [...document.querySelectorAll('.car_wrapper')]
	const inputName = document.querySelector<HTMLInputElement>('.update_input')
	const inputColor = document.querySelector<HTMLInputElement>('.update_color')
	const createName = document.querySelector<HTMLInputElement>('.create_input')
	const createColor = document.querySelector<HTMLInputElement>('.create_color')

	const positions = []
	for(const wrapper of carWrappers){
		const car = wrapper.querySelector<HTMLDivElement>('.car')
		if(!car) return
		positions.push({id: wrapper.id, 
        position: car.style.left })
	}
const selectCar = AppStore.getState().selectCar;
if (selectCar && inputColor && inputName) {
    const updatedCar = {
        ...selectCar,
        color: inputColor.value || selectCar.color,
        name: inputName.value || selectCar.name
    };
    AppStore.setState({ selectCar: updatedCar });
}
if(createColor && createName){
	   const createCar = {
			name:createName.value || '',
			color:createColor.value || ''
    };
    AppStore.setState({ inputField: createCar });
}
	AppStore.setState({ 
    positionOfCars: positions
	})
}
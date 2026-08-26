export async function inputListener(event:PointerEvent):Promise<void>{
	if(!(event.target instanceof HTMLElement)) return
	const target:HTMLElement = event.target
	const {wrapper,createButton,updateButton,updateColor,createColor,createInput,updateInput} = getElementsFromInput(target)
	if(!wrapper) return
	console.log(wrapper,createButton,updateButton,updateColor,createColor,createInput,updateInput)
	unblockUpdate()
}

function getElementsFromInput(target : HTMLElement){
	const wrapper = target.closest<HTMLDivElement>('.race_input_div')
	const createButton = target.closest<HTMLButtonElement>('.create_btn')
	const updateButton = target.closest<HTMLButtonElement>('.update_btn')
	const updateColor = target.closest<HTMLButtonElement>('.update_color')
	const createColor = target.closest<HTMLButtonElement>('.create_color')
	const createInput = target.closest<HTMLInputElement>('.create_input')
	const updateInput = target.closest<HTMLInputElement>('.update_input')
	return {
		wrapper,
		createButton,
		updateButton,
		updateColor,
		createColor,
		createInput,
		updateInput
	}
}
function unblockUpdate(){
	const updateInput = document.querySelector<HTMLInputElement>('.update_input')
	const updateButton = document.querySelector<HTMLButtonElement>('.update_btn')
	const updateColor = document.querySelector<HTMLInputElement>('.update_color')

	if( updateColor && updateButton && updateInput){
		updateButton.removeAttribute('disabled')
		updateInput.removeAttribute('disabled')
		updateColor.removeAttribute('disabled')

		console.log(updateColor)
	}
}
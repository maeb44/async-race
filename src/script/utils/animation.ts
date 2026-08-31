
export function animation(speed:number, distance:number, car:HTMLDivElement,carCard:HTMLDivElement){
    const duration = distance/1000 / speed; 
    const startPosition = 50;
    const targetPosition = carCard.clientWidth - 80;
    const visualDistance = targetPosition - startPosition;
    const speedPxPerSecond = visualDistance / duration;
    
    let position = startPosition;
    let lastTime = 0;
		let animationId: number | undefined;
		car.dataset.isDrive = 'true'
    function step(timestamp: number) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
                
        position += speedPxPerSecond * deltaTime;
        if(!car) return
				if(car.dataset.isDrive === 'false'){
					if(animationId) cancelAnimationFrame(animationId)
					return
				}
        if (position >= targetPosition) {
            position = targetPosition;
            car.style.left = position + 'px';
						if(animationId) 	cancelAnimationFrame(animationId)
						car.dataset.isDrive = 'false'
            return;
        }
        
        car.style.left = position + 'px';
				
        animationId = requestAnimationFrame(step);
				car.dataset.animId = `${animationId}`
    }
    animationId = requestAnimationFrame(step);
}
let player = document.querySelector('video')

const
	min = 0,
	max = 16,
	interval = 0.5,
	defaultSpeed = 1
let speed = player ? player.playbackRate : defaultSpeed

let speedP = document.createElement("P")
speedP.style.position = "absolute"
speedP.style.color = "white"
speedP.tabIndex = 100
speedP.style.right = "5px"
speedP.style.top = "5px"

const updateSpeed = (e) => {
	// increment/decrement
	switch (e.key) {
		case "+":
		case "=":
			speed += interval
			break
		case "_":
		case "-":
			speed -= interval
			break
		case "*":
			speed = defaultSpeed
			break
		default:
			return false
	}
	
	// clamp
	speed = speed <= min ? min : speed >= max ? max : speed
	return true
}

const updatePlayer = () => {
	if (player) {
		// change speed
		player.playbackRate = speed
		
		// update text
		player.parentNode.appendChild(speedP)
		speedP.innerText = `${speed.toFixed(1)}`
	}
}

document.addEventListener("keydown", (e) => {
	if (updateSpeed(e))
		updatePlayer()
})


updatePlayer()
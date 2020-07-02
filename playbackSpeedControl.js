let player
const findPlayer = () => {
	if (!player)
		player = document.querySelector('video')
}

const
	min = 0,
	max = 16,
	interval = 0.5,
	defaultSpeed = 1
let speed

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
	findPlayer()
	if (player) {
		// change speed
		player.playbackRate = speed
		
		// update text
		speedP.innerText = `${speed.toFixed(1)}`
		player.parentNode.appendChild(speedP)
	}
}

document.addEventListener("keydown", (e) => {
	if (updateSpeed(e))
		updatePlayer()
})

window.addEventListener("load", () => {
	findPlayer()
	speed = player ? player.playbackRate : defaultSpeed
	updatePlayer()
})
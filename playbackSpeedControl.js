const
	min = 0,
	max = 16,
	defaultSpeed = 1

let
	speed = defaultSpeed,
	interval = 0.5


let speedP = document.createElement("P")
speedP.style.position = "absolute"
speedP.style.color = "white"
speedP.tabIndex = 100
speedP.style.right = "5px"
speedP.style.top = "5px"

let player

const findPlayer = () => {
	if (player)
		return true
	
	player = document.querySelector('video')
	if (!player)
		return false
	
	// assume a player doesn't disappear after found
	player.parentNode.appendChild(speedP)
	speedP.addEventListener("click", (e) => {
		e.stopPropagation()
		if (speed != defaultSpeed) {
			speed  = defaultSpeed
			updatePlayer()
		}
	})
	player.addEventListener("ratechange", (e) => {
		if (speed != player.playbackRate) {
			speed  = player.playbackRate
			updatePlayer()
		}
	})
	speed = player.playbackRate
	updatePlayer()
	return true
}

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
	player.playbackRate = speed
	speedP.innerText = `${speed.toFixed(2)}`
}

document.addEventListener("keydown", (e) => {
	if (updateSpeed(e))
		if (findPlayer())
			updatePlayer()
})

window.addEventListener("load", () => {
	findPlayer()
})
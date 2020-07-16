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
	if (!player) {
		// console.log("not found")
		return false
	}
	
	// console.log("found")
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
	if (findPlayer())
		if (updateSpeed(e))
			updatePlayer()
})


chrome.storage.onChanged.addListener((changes) => {
	if (changes.display)
		speedP.hidden = !changes.display.newValue
	if (changes.interval)
		interval = changes.interval.newValue
})

chrome.storage.local.get('display', (data) => {
	speedP.hidden = !data.display
})
chrome.storage.local.get('interval', (data) => {
	interval = data.interval
})

// console.log("searching")
findPlayer()

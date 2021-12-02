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
speedP.style.fontSize = "1.5rem"
speedP.style.backgroundColor = "#00000080"
speedP.style.borderRadius = "0.5rem"
speedP.style.padding = "0.2rem"
let player

const findPlayer = () => {
	if (player)
		return true
	
	player = document.querySelector("video")
	if (!player)
		return false
	
	player.parentNode.appendChild(speedP)
	
	speedP.addEventListener("click", e => {
		e.stopPropagation()
		if (speed != defaultSpeed) {
			speed  = defaultSpeed
			updatePlayer()
		}
	})
	player.addEventListener("ratechange", e => {
		if (speed != player.playbackRate) {
			speed  = player.playbackRate
			updatePlayer()
		}
	})
	
	speed = player.playbackRate
	updatePlayer()
	return true
}

const updateSpeed = e => {
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
const tryUpdatePlayer = () => {
	if (findPlayer())
		updatePlayer()
}

// a recent youtube patch seems to have changed page loading
// manually update the player in this case
window.addEventListener("yt-page-data-updated", tryUpdatePlayer)
document.addEventListener("keydown", e => {
	if (updateSpeed(e))
		tryUpdatePlayer()
})


chrome.storage.onChanged.addListener(changes => {
	if (changes.display)
		speedP.hidden = !changes.display.newValue
	if (changes.interval)
		interval = changes.interval.newValue
})

chrome.storage.sync.get("display", data => {
	speedP.hidden = !data.display
})
chrome.storage.sync.get("interval", data => {
	interval = data.interval
})

tryUpdatePlayer()

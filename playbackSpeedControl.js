const
	min = 0,
	max = 16,
	defaultSpeed = 1

let
	speed = defaultSpeed,
	interval = 0.5

let bgColor = "#000000"
let bgAlpha = 0.5

let fltToHex = percent => {
	console.assert(percent >= 0 && percent <= 1,
		`Invalid percentage, ${percent} was not between 0 and 1`)
	percent *= 255
	let lo = Math.floor(percent % 16)
	let hi = Math.floor(percent / 16)
	// NOTE: 65 is 'A'
	lo = lo < 10 ? ("" + lo) : String.fromCharCode(65 + lo - 10)
	hi = hi < 10 ? ("" + hi) : String.fromCharCode(65 + hi - 10)
	return hi + lo
}


let speedP = document.createElement("P")
speedP.style.position = "absolute"
speedP.style.color = "white"
speedP.tabIndex = 100
speedP.style.right = "5px"
speedP.style.top = "5px"
speedP.style.fontSize = "1.5rem"
speedP.style.backgroundColor = `${bgColor}${fltToHex(bgAlpha)}`
speedP.style.borderRadius = "0.5rem"
speedP.style.padding = "0.2rem"
let player

const findPlayer = () => {
	if (player)
		return true
	
	// workaround for youtubes terrible new hover preview feature
	let players = document.querySelectorAll("video")
	if (players.length === 0)
		return false
	player = players[players.length-1]

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
	if (changes.color || changes.alpha) {
		if (changes.color)
			bgColor = changes.color.newValue
		if (changes.alpha)
			bgAlpha = changes.alpha.newValue
		speedP.style.backgroundColor = `${bgColor}${fltToHex(bgAlpha)}`
	}
})

chrome.storage.sync.get("display", data => {
	speedP.hidden = !data.display
})
chrome.storage.sync.get("interval", data => {
	interval = data.interval
})
chrome.storage.sync.get("color", data => {
	if (data.color) {
		bgColor = data.color
		speedP.style.backgroundColor = `${bgColor}${fltToHex(bgAlpha)}`
	}
})
chrome.storage.sync.get("alpha", data => {
	if (data.alpha) {
		bgAlpha = data.alpha
		speedP.style.backgroundColor = `${bgColor}${fltToHex(bgAlpha)}`
	}
})

tryUpdatePlayer()

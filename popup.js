document.addEventListener('DOMContentLoaded', () => {
	
	let popupInterval = document.getElementById('interval'),
		// popupKeys = document.getElementById('keys'),
		popupDisplay = document.getElementById('display'),
		popupApply = document.getElementById('apply')
	
	chrome.storage.local.get('interval', (data) => {
		popupInterval.value = data.interval.toString()
	})
	// chrome.storage.local.get('keys', (data) => {
		// popupKeys.value = data.keys.join("")
	// })
	chrome.storage.local.get('display', (data) => {
		popupDisplay.checked = data.display
	})
	
	popupApply.addEventListener('click', () => {
		chrome.storage.local.set({
			interval: parseFloat(popupInterval.value),
			// keys: popupKeys.value.split(""),
			display: popupDisplay.checked
		}, () => {})
	})
})
document.addEventListener('DOMContentLoaded', () => {
	let popupAlert = document.getElementById('alert'),
		popupInterval = document.getElementById('interval'),
		// popupKeys = document.getElementById('keys'),
		popupDisplay = document.getElementById('display'),
		popupApply = document.getElementById('apply')
	
	chrome.storage.sync.get('interval', (data) => {
		popupInterval.value = data.interval.toString()
	})
	// chrome.storage.sync.get('keys', (data) => {
		// popupKeys.value = data.keys.join("")
	// })
	chrome.storage.sync.get('display', (data) => {
		popupDisplay.checked = data.display
	})
	
	popupApply.addEventListener('click', () => {
		
		chrome.storage.sync.set({
			interval: parseFloat(popupInterval.value),
			// keys: popupKeys.value.split(""),
			display: popupDisplay.checked
		}, () => {
			popupAlert.style.animation = "fadeInOut 1s";
			let newone = popupAlert.cloneNode(true);
			popupAlert.parentNode.replaceChild(newone, popupAlert);
			popupAlert = newone;
		})
	})
})
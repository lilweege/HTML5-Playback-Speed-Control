document.addEventListener('DOMContentLoaded', () => {
	
	// this is the DOM of the popup
	// cannot interact with anything
	document.getElementById('test').addEventListener('click', () => {
		console.log("test")
	})
})
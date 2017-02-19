const comparison = function() {
	const element = document.getElementById('comparison'),
				button = document.getElementById('comparison-button');

	let compareActive = false;
	function compareHandler() {
		if (compareActive) {
			element.className = element.className.replace(' comparison--open', '');
			compareActive = false;
		} else {
			element.className += ' comparison--open';
			ga('send', 'event', 'comparison', 'open');
			compareActive = true;
		}
	}
	if (element && button) {
		button.addEventListener('click', compareHandler, false);
	}
};

export default comparison;

const persona = function () {
	const container = document.getElementById('personas'),
				personas = Array.prototype.slice.apply(document.getElementsByClassName('persona'));

	function reset() {
		personas.map((persona) => {persona.className = persona.className.replace(' persona--active', '')});
		container.className = container.className.replace(' personas__list--active', '');
	}

	function product() {
		return window.location.pathname.split('/').reverse()[1];
	}

	function personaHandler (event) {
		if (event.target.className.match('persona__button')) {
			const button = event.target,
						slug = button.getAttribute('data-target'),
						selected = document.getElementById(`persona-${slug}`);

			ga('send', 'event', 'persona-' + slug, 'expand', product());

			reset();
			container.className += ' personas__list--active';
			selected.className += ' persona--active';
		}

		if (event.target.className.match('persona__close')) {
			reset();
		}
	}


	if (container) {
		container.addEventListener('click', personaHandler);
	}
}


export default persona;

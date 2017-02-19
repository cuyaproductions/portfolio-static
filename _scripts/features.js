const features = function () {
	const canvas = document.getElementById('features-canvas'),
				features = Array.prototype.slice.apply(document.getElementsByClassName('feature')),
				nodes = Array.prototype.slice.apply(document.getElementsByClassName('canvas__node')),
				close = document.getElementById('features-close');

	function reset() {
		nodes.map((node) => {node.className = node.className.replace(' canvas__node--active', '')});
		features.map((feature) => {feature.className = feature.className.replace(' features__item--active', '')});
		close.style.display = 'none';
	}

	function product() {
		return window.location.pathname.split('/').reverse()[1];
	}

	function canvasHandler (event) {
		if (event.target.className.match('canvas__node')) {
			const node = event.target, 
						index = parseInt(node.getAttribute('data-target')),
						selected = features[index];

			ga('send', 'event', 'feature-' + (index + 1), 'expand', product());

			reset();

			node.className += ' canvas__node--active';
			selected.className += ' features__item--active';
			close.style.display = 'block';
		}
	}

	if (canvas) {
		canvas.addEventListener('click', canvasHandler);		
		close.addEventListener('click', reset);
	}
}

export default features;

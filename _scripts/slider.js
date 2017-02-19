const slider = function () {
	const element = document.getElementById('slider');

	let timer;

	if (element) {
		let current = 0;
		const	delay = 2500,
					container = document.getElementById('slider-container'),
					slides = container.getElementsByClassName('slider__item'),
					crumbs = document.getElementById('slider-crumbs'),
					crumbsItems = Array.prototype.slice.call(crumbs.getElementsByClassName('slider__crumb'));
			
		function move () {
			container.style.transform = `translateX(-${100 / slides.length * current}%)`;
			crumbsItems[current].className += ' slider__crumb--active';
		}
		
		function reset () {
			crumbsItems[current].className = crumbsItems[current].className.replace(' slider__crumb--active', '');
		}

		function update () {
			reset();
			current++;
			if (current < slides.length) {
				container.className = container.className.replace(' slider__container--reset', '');
				move();
			} else {
				current = 0;
				container.className += ' slider__container--reset';
				move();
			}
		}

		function goToSlide (event) {
			if (event.target.className.match('slider__button')) {
				clearInterval(timer);
				reset();
				current = event.target.getAttribute('data-index');
				move();
				timer = setInterval(update, delay);
			}
		}


		timer = setInterval(update, delay);

		crumbs.addEventListener('click', goToSlide);

	}

}

export default slider;

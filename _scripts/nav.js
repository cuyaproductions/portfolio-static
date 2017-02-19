let active = 0;

function location () { // Get location path array
	let result = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').split('/').reverse();
	result = result.filter((item) => {
		return !item.match('.html');
	});

	return result[0];
}

function activeLink (link, index) {
	const destination = link.href.split('/').reverse()[1];
	active = location() === destination ? index : active;
}

const nav = function () {
	const navigation = document.getElementById('navigation'),
				button = document.getElementById('navigation-button'),
				links = Array.prototype.slice.apply(navigation.getElementsByClassName('navigation__link'));

	links.forEach(activeLink);
	links[active].className += ' navigation__link--active';
	

	function toggleNav() {
		if (navigation.className.match('--active')) {
			navigation.className = navigation.className.replace(' navigation--active', '');
		} else {
			navigation.className += ' navigation--active';
		}
	}

	button.addEventListener('click', toggleNav);
}

export default nav;

const ENV = 'static';

const form = () => {
	const form = document.getElementById('contact'),
				container = document.getElementById('form-content');


	const showError = function () {
		container.innerHTML = `<h1>Sorry!</h1>
			<h2>There was an error sending contact request. Please try again.</h2> `;
	}

	const showConfirmation = function () {
		const response = JSON.parse(this.response);

		if (response.Success === 1) {
			container.innerHTML = `<h1>Thank you!</h1>
				<h2>A representative will contact you soon.</h2> `;
		} else {
			showError();
		}
		container.className += ' contact__content--active';
	}
	

	const data = () => {
		const result = [],
					firstname = document.getElementById('firstname'),
					lastname = document.getElementById('lastname'),
					email = document.getElementById('email'),
					tel = document.getElementById('tel'),
					carbon = document.getElementById('carbon'),
					yoga = document.getElementById('yoga'),
					tablet = document.getElementById('tablet'),
					thinkcentre = document.getElementById('thinkcentre');

		const payload = {
			Field1: firstname.value + " " + lastname.value,
			Field2: email.value,
			Field3: thinkcentre.checked ? thinkcentre.value : '',
			Field4: carbon.checked ? carbon.value : '',
			Field5: tablet.checked ? tablet.value : '',
			Field6: yoga.checked ? yoga.value : '',
			Field104: "brochure",
			Field109: tel.value
		};

		for (let field in payload) {
			if (payload.hasOwnProperty(field)) {
				result.push(field + "="  + payload[field]); 
			}
		}

		return result.join('&');
	}

	const submitHandler = event => {
		event.preventDefault();

		const request = new XMLHttpRequest();

		request.addEventListener('load', showConfirmation);
		request.addEventListener('error', showError);
		request.open('POST', `https://io3fhh7uj5.execute-api.us-west-2.amazonaws.com/${ENV}/forms/r2fp90n027751t/entries/`,  true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.send(data());
	}

	if (form) {
		form.addEventListener('submit', submitHandler);
	}
}

export default form;

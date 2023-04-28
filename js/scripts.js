function CustomValidation(input) {
	this.invalidities = [];
	this.validityChecks = [];

	//add reference to the input node
	this.inputNode = input;

	//trigger method to attach the listener
	this.registerListener();
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	checkValidity: function(input) {
		for ( let i = 0; i < this.validityChecks.length; i++ ) {

			let isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}

			let requirementElement = this.validityChecks[i].element;

			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}

			} // end if requirementElement
		} // end for
	},
	checkInput: function() { // checkInput now encapsulated

		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);

		if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
		} else {
			let message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
	},
	registerListener: function() { //register the listener here

		let CustomValidation = this;

		this.inputNode.addEventListener('keyup', function() {
			CustomValidation.checkInput();
		});


	}

};

let emailValidityChecks = [
    {
        isInvalid: function(input) {
            return !input.value.match(/[\.\@]/g);
        },
        invalidityMessage: 'Must be a valid email address',
        element: document.querySelector('label[for="contact-email"] .input-requirements li:nth-child(1)')
    }
];

let telephoneValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.match.pattern("/d{3}[/-]/d{3}[/-]/d{4}")
		},
		invalidityMessage: 'Must be a valid telephone number',
		element: document.querySelector('label[for="contact-email"] .input-requirements li:nth-child(1)')
	}
];

let messageValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length > 100;
		},
		invalidityMessage: 'Max 240 characters',
		element: document.querySelector('label[for="contact-message"] .input-requirements li:nth-child(1)')
	},
];


/* ----------------------------
	Setup CustomValidation
	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input
---------------------------- */

let emailInput = document.getElementById('email');
let telephoneInput = document.getElementById('telephone');
let messageInput = document.getElementById('message');

emailInput.CustomValidation = new CustomValidation(emailInput);
emailInput.CustomValidation.validityChecks = emailValidityChecks;

telephoneInput.CustomValidation = new CustomValidation(telephoneInput);
telephoneInput.CustomValidation.validityChecks = telephoneValidityChecks;

messageInput.CustomValidation = new CustomValidation(messageInput);
messageInput.CustomValidation.validityChecks = messageValidityChecks;




/* ----------------------------
	Event Listeners
---------------------------- */

let inputs = document.querySelectorAll('input:not([type="submit"])');


let submit = document.querySelector('input[type="submit"');
let form = document.getElementById('registration');

function validate() {
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].CustomValidation.checkInput();
	}
}

submit.addEventListener('click', validate);
form.addEventListener('submit', validate);
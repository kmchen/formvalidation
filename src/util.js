
const nonEmpty = name => name.length > 0;
const lessThan = (max) => name => name.length <= max;
const isAlphaNumeric = name => /^[0-9a-zA-Z ]*$/g.test(name);

export const validationRules = {
	lastName: {
		rules: [ nonEmpty, isAlphaNumeric ],
		errMsg: 'Last name cannot be empty or contain special characters'
	},
	firstName: {
		rules: [ nonEmpty, isAlphaNumeric ],
		errMsg: 'First name cannot be empty or contain special characters'
	},
	passportNumber: {
		rules: [ nonEmpty, isAlphaNumeric ],
		errMsg: 'This field cannot be empty or contain special characters'
	},
	issuingCountry: {
		rules: [ nonEmpty ],
		errMsg: 'Please select the issuing country'
	},
	nationality: {
		rules: [ nonEmpty ],
		errMsg: 'Please select your nationality'
	},
	dateOfBirth: {
		rules: [ nonEmpty ],
		errMsg: 'Please select your date of birth'
	},
  documentType: {
		rules: [ nonEmpty, lessThan(2) ],
		errMsg: 'Invalid document type'
  },
  documentNumber: {
		rules: [ nonEmpty, lessThan(9), isAlphaNumeric ],
		errMsg: 'This field should have no more than 9 alphanumeric characters'
  },
	expirationDate: {
		rules: [ nonEmpty ],
		errMsg: 'Please select the expiration date'
	},
	gender: {
		rules: [ nonEmpty ],
		errMsg: 'Please select the gender'
	},
};

export class Validator {
	constructor(rules) {
		this.validationRules = rules;
		return this.validate.bind(this);
	}
	validate(value) {
		const proxy = new Proxy(this.validationRules, {
			get: (rules, field) => {
				const isValid =  rules[field].rules.reduce((acc, curr) => {
					return acc && curr(value);
				}, true);
				if (isValid) {
					return {value, errMsg: ''};
				} else {
					return {value, errMsg: rules[field].errMsg};
				}
			}
		});
		return proxy;
	}
}

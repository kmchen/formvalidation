import React from 'react';
import mrz from 'kmchenmrzgen';

import { Validator, validationRules } from '../util';

const validate = new Validator(validationRules);

export const validateForm = ({data, onSubmit}) => {
  const { fields } = data;
  const fieldNames = Object.keys(fields);
  const results = fieldNames.reduce((acc, currField) => {
    const validationResult = validate(fields[currField].value)[currField];
    acc[currField] = validationResult;
    return acc;
  }, {});

  const areInputsValid = Object.keys(results).reduce((acc, curr) => {
    return acc && !Boolean(results[curr].errMsg) ; 
  }, true)
  if (!areInputsValid) {
    const validationResult = {...data};
    validationResult.fields = results;
    onSubmit(validationResult);
  } else {
    const user = {
      firstName: results.firstName.value,
      lastName: results.lastName.value,
      nationality: results.nationality.value,
      issuingState: results.issuingCountry.value,
      birthDate: results.dateOfBirth.value.slice(2),
      documentType: results.documentType.value,
      documentNumber: results.documentNumber.value,
      expirationDate: results.expirationDate.value.slice(2),
      gender: results.gender.value,
      option1: '',
      option2: '',
    };
    try {
      const mrzCode = mrz.generateMrzCode(user);
      console.log(mrzCode)
      const mrzResult = {
        fields: results,
        mrzErrMsg: '',
        mrzCode
      };
      onSubmit(mrzResult);
    } catch(err) {
      const mrzResult = {
        fields: results,
        mrzErrMsg: err.toString()
      };
      onSubmit(mrzResult);
    }
  }
}

export const SubmitButton = (props) => {
  return (
    <div className="field is-grouped has-text-centered">
      <div className="control">
        <button
          type="submit"
          onClick={() => validateForm({...props})}
          className="button is-link is-large"
        >
          <span>Submit</span>
        </button>
      </div>
    </div>
  )
}

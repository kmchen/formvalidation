import React from 'react';
import mrz from 'kmchenmrzgen';

import { Validator, validationRules } from '../util';

const validate = new Validator(validationRules);

export const validateForm = ({data, onSubmit}) => {
  const { fields } = data;
  const fieldNames = Object.keys(fields);
  console.log('.......', fieldNames)
  const results = fieldNames.reduce((acc, currField) => {
    const validationResult = validate(fields[currField].value)[currField];
    acc[currField] = validationResult;
    return acc;
  }, {});

  const areInputsValid = Object.keys(results).reduce((acc, curr) => {
    return acc && !Boolean(results[curr].errMsg) ; 
  }, true)
  if (!areInputsValid) {
    const validationResult = Object.assign(data, {fields: results})
    onSubmit(validationResult);
  } else {
    const userUtopia = {
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      nationality: 'Utopia',
      issuingState: 'Utopia',
      birthDate: '740812',

      documentType: 'AV',
      documentNumber: 'D23145890',
      expirationDate: '120415',
      gender: 'female',
      option1: '',
      option2: '',
    };
    try {
      mrz.generateMrzCode(userUtopia)
    } catch(err) {
      //results.mrzGenerationErrMsg = err;
      //console.log('...... mrz error', results)
      const mrzResult = {
        fields: results,
        mrzErrMsg: err.toString
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

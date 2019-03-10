import React, { Component } from 'react';
import mrz from 'kmchenmrzgen';

import { Dropdown } from '../components/Dropdown';
import { InputField } from '../components/InputField';
import { SubmitButton, validateForm } from '../components/SubmitButton';
import { BirthDayPicker } from '../components/BirthdayPicker';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      mrzErrMsg: '',
      fields: {
        firstName: { value: '', errMsg: ''},
        lastName: { value: '', errMsg: ''},
        issuingCountry: { value: '', errMsg: ''},
        nationality: { value: '', errMsg: ''},
        passportNumber: { value: '', errMsg: ''},
        dateOfBirth: { value: '', errMsg: ''},

        documentType: { value: '', errMsg: ''},
        //documentNumber: { value: '', errMsg: ''},
        //expirationDate: { value: '', errMsg: ''},
        //gender: { value: '', errMsg: ''},
        //option1: { value: '', errMsg: ''},
        //option2: { value: '', errMsg: ''}
      }
    };
  }

  updateNewState = (value) => {
    this.setState(value);
  }

  updateField = (fieldType) => {
    return (value) => {
      const newState = Object.assign({}, this.state)
      newState.fields[fieldType] = value;
      this.setState(newState);
    }
  }

  submitForm = (event) => {
    event.preventDefault()
    validateForm(this.state, this.updateNewState)
  }

  render() {
    return (
      <form className="section"
        onSubmit={this.submitForm}>
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <div className="box">
                <InputField
                  title='First Name *'
                  onChange={this.updateField('firstName')}
                  data={this.state.fields.firstName}
                />
                <InputField
                  title='Last Name *'
                  onChange={this.updateField('lastName')}
                  data={this.state.fields.lastName}
                />
                <InputField
                  title='Passport Number *'
                  onChange={this.updateField('passportNumber')}
                  data={this.state.fields.passportNumber}
                />
                <BirthDayPicker
                  data={this.state.fields.dateOfBirth}
                  title='Date of Birth *'
                  onChange={this.updateField('dateOfBirth')}
                />
                <Dropdown
                  title='Issuing Country *'
                  onChange={this.updateField('issuingCountry')}
                  data={this.state.fields.issuingCountry}
                  options={mrz.states}
                  defaultValue="Please choose the issuing country"
                />
                <Dropdown
                  title='Nationality *'
                  onChange={this.updateField('nationality')}
                  data={this.state.fields.nationality}
                  options={mrz.states}
                  defaultValue="Please choose your nationlity"
                 />
                <InputField
                  title='Document type *'
                  onChange={this.updateField('documentType')}
                  data={this.state.fields.documentType}
                />
                 <SubmitButton data={this.state} onSubmit={this.updateNewState}/>
                 <div>{this.state.mrzGenerationErrMsg}</div>
              </div>
            </div>
          </div>
        </div>
       </form>
    );
  }
}

export default FormContainer;

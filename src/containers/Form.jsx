import React, { Component } from 'react';
import mrz from 'kmchenmrzgen';

import { Dropdown } from '../components/Dropdown';
import { InputField } from '../components/InputField';
import { SubmitButton, validateForm } from '../components/SubmitButton';
import { DayPicker } from '../components/DayPicker';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      mrzErrMsg: '',
      mrzCode: '',
      fields: {
        firstName: { value: '', errMsg: ''},
        lastName: { value: '', errMsg: ''},
        issuingCountry: { value: '', errMsg: ''},
        nationality: { value: '', errMsg: ''},
        passportNumber: { value: '', errMsg: ''},
        dateOfBirth: { value: '', errMsg: ''},
        documentType: { value: '', errMsg: ''},
        documentNumber: { value: '', errMsg: ''},
        expirationDate: { value: '', errMsg: ''},
        gender: { value: '', errMsg: ''}
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
    validateForm({data: this.state, onSubmit: this.updateNewState})
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
                <DayPicker
                  data={this.state.fields.dateOfBirth}
                  title='Date of Birth *'
                  maxDate={new Date()}
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
                <InputField
                  title='Document Number *'
                  onChange={this.updateField('documentNumber')}
                  data={this.state.fields.documentNumber}
                />
                <DayPicker
                  data={this.state.fields.expirationDate}
                  title='Passport expiration date *'
                  onChange={this.updateField('expirationDate')}
                />
                <Dropdown
                  title='Gender *'
                  onChange={this.updateField('gender')}
                  data={this.state.fields.gender}
                  options={{Male: 0, Female: 1}}
                  defaultValue="Please choose your gender"
                 />
                 <SubmitButton data={this.state} onSubmit={this.updateNewState}/>
                 <div>{this.state.mrzErrMsg}</div>
                 <div>{this.state.mrzCode[0]}</div>
                 <div>{this.state.mrzCode[1]}</div>
                 <div>{this.state.mrzCode[2]}</div>
              </div>
            </div>
          </div>
        </div>
       </form>
    );
  }
}

export default FormContainer;

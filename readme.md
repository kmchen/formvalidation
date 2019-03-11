### How to use mrz generator

```sh
$ npm install kmchenmrzgen

import mrz from 'kmchenmrzgen';
const user = {
      firstName: 'firstName',
      lastName: 'lastName',
      nationality: 'Nationality',
      issuingState: 'Coutry',
      birthDate: 'birthday',
      documentType: 'document type',
      documentNumber: 'document number',
      expirationDate: 'Expiration date',
      gender: 'Male,
      option1: '',
      option2: '',
    };
mrz.generateMrzCode(user);
```

### How to start Form validation frontend
```
$ git clone https://github.com/kmchen/formvalidation.git
$ npm install
$ npm start
```

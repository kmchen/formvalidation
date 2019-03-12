### 5. A form with validation in React
```
$ git clone https://github.com/kmchen/formvalidation.git
$ npm install
$ npm start
```

### 4. The MRZ generator. How to use mrz generator

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

### 2. Discuss the implementation of an application protocol
    
* **Polling** :  The client regularly sends request to the server for the updates. The downside is that it drains the traffic and increases loads on the server. We can expect unnecessary requests with empty response.
* **Long Polling** - This is an upgrade version of polling. The server retains the connection and responds when new data becomes available. The server holds the connection until the timeout is reached. This is mitigates unnecessary requests but requires additional implementation on the server side. Batching data together can also avoid redundant network calls.
* **Server-sent-event** : It's a mechanism based on traditional HTTP which means no additional protocol implementation is required on the server e.g. websocket. After the client establishes an initial connection, the server can push data or stream updates to client application. The downside is that not all browsers support SSE such as IE and Edge.
* **HTTP2** - HTTP2 would definitely reduces the round trips between client and server. The server push sends updates to the browser and the client picks it up and re-render the application.
    
###### Upscaling chalenges

* **Network and scalability**: A load balancer distributes the traffic to multiple nodes/regions. Autoscaling resources behind the scene as the traffic hits certain thresholds.
* **Disk I/O**: Overwhelming reads/writes can drain the resources usually database and results poor performance. Batch commits and avoiding table scans can be helpful and implementing a caching layer can also avoid overloading the database. 

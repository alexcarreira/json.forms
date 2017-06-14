# Forms Module


This module can be installed in an application built with ionic 2 framework. 
Forms module is a module that provides forms submission.

## Getting Started

Open cmd and run the following command:

```
npm install https://github.com/alexcarreira/json.forms.git
```

### Usage

##### app.module.ts
```
import { FormsModule } from '../../node_modules/json.forms/forms/forms.module';
import { Forms } from '../../node_modules/json.forms/forms/form.component';
...
@NgModule({
  imports: [
      FormsModule,
    ...
  ],
  providers: [Forms,
     ...
})
```

##### app.component.ts
```
import { Forms } from '../../node_modules/json.forms/forms/form.component';
```
### Prerequisites

You need to have installed on your machine **Node.js**, **Ionic** and **Cordova**. If you already have please go to the next step.

##### Node.js:

Download from [here](https://nodejs.org/en/download/) and install **LTS version**.

#### After installation is complete run the following command:  For more info, please see the [Ionic Guide](http://ionicframework.com/docs/v1/guide/installation.html)
```
npm install -g cordova

npm install -g ionic
```

#### [Ionic 2 Application]()

#### [Ionic Network plugin](https://ionicframework.com/docs/native/network/)



### Installing

#### Ionic Network Plugin Installation

cordova-plugin-network-information. For more info, please see the [Network plugin docs](https://ionicframework.com/docs/native/network/).

##### On cmd run:
```
cordova plugin add cordova-plugin-network-information
npm install --save @ionic-native/network
```

### Usage

```
import { Network } from '@ionic-native/network';

constructor(private network: Network) { }

```

## Version

### 1.0.0

## Built With

* [Ionic Framework](https://ionicframework.com/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management


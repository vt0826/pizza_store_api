//Container for all the enviroments
var environments = {};

// staging (default) environment
environments.staging = {
  'httpPort' : 2000,
  'httpsPort' : 2001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  },
  'stripe' : {
    'apiHost' : 'api.stripe.com',
    'apiPath' : '/v1/charges',
    'apiKey' :'sk_test_d8GjHmt1FIN12ldpYbNXZsWa'
  },
  'mailgun' : {
    'apiHost' : 'api.mailgun.net',
    'apiPath' : '/v3/sandbox8b647c1dfd7c4a699b9cfe4653f27ff4.mailgun.org/messages',
    'apiKey' : 'api:8373386d9a6a7f2010aded9a122423e0-060550c6-010ac198',
    'apiDomain': 'PizzaStore<postmaster@sandbox8b647c1dfd7c4a699b9cfe4653f27ff4.mailgun.org>'
  },
  'templateGlobals' :{
    'appName' : 'pizza store',
    'companyName' : 'Victor Tsay',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:2000/'
  }


};

//Production environemnt
environments.production ={
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'thisIsAlsoASecret',
  'maxChecks' : 5
};

//determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check that the current environment is one of the environments above if not default to stagingv
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;



//Export the module
module.exports = environmentToExport;


//Dependencies
var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');
var path = require('path');
var fs = require('fs');

// container for all the helpers
var helpers ={};

//create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

//parese a JSON string to an object in all cases without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj =JSON.parse(str);
   //console.log(obj)
    return obj;
  } catch(e){
    return {};
  }
};

// create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    //define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    //start the final string
    var str = '';
    for(i = 1; i <= strLength; i++){
      //get a random character from the possbilecharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string
      str+=randomCharacter;
    }

    //return the final string
    return str;
  } else {
    return false
  }
}

// create a string of random numeric characters of a given length
helpers.createOrderNumber = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    //define all the possible characters that could go into a string
    var possibleCharacters = '0123456789';
    //start the final string
    var str = '';
    for(i = 1; i <= strLength; i++){
      //get a random character from the possbilecharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string
      str+=randomCharacter;
    }

    //return the final string
    return str;
  } else {
    return false
  }
}




//send payment through stripe api
helpers.sendPayment = function(email,amount,callback){
  //validate parameters
  email = typeof(email) == 'string' && email.trim().length > 0 ? email.trim() : false;
  amount = typeof(amount) == 'number' && amount > 0 ? amount : false;
  
  if (amount && email){
    // configure the request 
   
   var payload = {
      amount: amount,
      currency: "usd",
      source: "tok_mastercard ",
      description: "Charge for " + email
    };

    //stringify the payload
    var stringPayload = querystring.stringify(payload);

    //configurae the request details
    var requestDetails = {
      'protocol' : 'https:',
      'hostname' : config.stripe.apiHost,
      'method' : 'POST',
      'path' : config.stripe.apiPath,
      'auth' : config.stripe.apiKey,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(stringPayload)
      }
    };
    
    //Instantiate the request object
    var req = https.request(requestDetails,function(res){
      // Grab the status of the sent request
      var status = res.statusCode;
      
      // callback successfully if reuqest went through
      if(status == 200 || status == 201){
         callback(false);
      } else {
         callback('Status code returned was '+status);
       }
    });

    //binds to the error event so it doesnt get thrown
    req.on('error',function(e){
      callback(e);
    });

    //Add the payload
    req.write(stringPayload);

    //End the request
    req.end();

  } else {
    callback('Given  parameters were missing or invalid');
  }

};


// send an email from via mailgun
helpers.sendMailgunEmail = function(email,msg,callback){
  //validate parameters
  email = typeof(email) == 'string' && email.trim().length > 0 ? email.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;

  if(email && msg){
    //configure the request payload
    var payload = {
      'from' : config.mailgun.apiDomain,
      'to' : 'vt0826@gmail.com',
      'subject' : 'Recpeit from your pizza order',
      'text' : msg
    };
    //stringify the payload
    var stringPayload = querystring.stringify(payload); 
    
  } else {
    callback('Given  parameters were missing or invalid');
  }

  //configure the request details
  var requestDetails = {
      'protocol' : 'https:',
      'hostname' : config.mailgun.apiHost,
      'method' : 'POST',
      'path' : config.mailgun.apiPath,
      'auth' : config.mailgun.apiKey,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(stringPayload)
      }
    };
  //Instantiate the request object
     var req = https.request(requestDetails,function(res){
      // Grab the status of the sent request
      var status = res.statusCode;
      // callback successfully if reuqest went through
      if(status == 200 || status == 201){
         callback(false);
      } else {
         callback('Status code returned was '+status);
       }
      });

    //binds to the error event so it doesnt get thrown
    req.on('error',function(e){
      callback(e);
    });

    //Add the payload
    req.write(stringPayload);

    //End the request
    req.end();


};

//get the string content of a template
helpers.getTemplate = function(templateName,data,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName :false
  data = typeof(data) == 'object' && data !== null ? data : {};
  if(templateName){
    var templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html','utf8',function(err,str){
      if(!err && str && str.length > 0){
        //Do interpolation on the string
        var finalString=helpers.interpolate(str,data);
        callback(false,finalString);
      } else {
        callback('No template can be found')
      }
    });
  } else {
    callback('a valid template name was not specified');
  }
};


// Add the universal header and footer to as tring and pass provided data object to the header and footer for interpolaton
helpers.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};
  //get header
  helpers.getTemplate('_header',data,function(err,headerString){
    if(!err && headerString){
      //get the footer
      helpers.getTemplate('_footer',data,function(err,footerString){
        if(!err && footerString){
          //add header and footer together
          var fullString = headerString + str + footerString;
          callback(false, fullString);
        } else {
          callback('could not find the footer template');
        }
      })
    } else {
      callback('Could not find the header template');
    }
  });
};

// take a given string and a data object and find/replace all the keys withinin it
helpers.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};
 
  // add the templateGlobal to the data object, pretending thier key name with 'global'
  for (var keyName in config.templateGlobals){
    if(config.templateGlobals.hasOwnProperty(keyName)){
      data['global.'+keyName] = config.templateGlobals[keyName];
    }
  }

  // For each key in the data object, insert its value into the string at the correponding place holder 
  
  for(var key in data){
    if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
      var replace = data[key]
      var find = '{'+key+'}';
      str = str.replace(find,replace);
    }
  }
  return str;
}

//Get the contents of a static (public) asset
helpers.getStaticAsset = function(fileName, callback){
  var fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName,function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    });

  } else {
   callback('A valid file name was not specified');
  }
};

//export the module
module.exports = helpers;

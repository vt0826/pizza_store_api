//Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

//Define the handlers
var handlers = {};

/*
 *HTML handlers
 *
 */

// Index handlers
handlers.index = function(data, callback) {
  if (data.method == 'get') {
    //Prepare data for interpolation
    var templateData = {
      'head.title': 'Welcome to the Pizza Original  - Made ording pizza simple',
      'head.description':
        "We offer fast realiable online pizza online system. we'll send you online conformation once the order goes through",
      'body.class': 'index',
    };

    //Read in a template as a string
    helpers.getTemplate('index', templateData, function(err, str) {
      if (!err && str) {
        //Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, html);
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create Account
handlers.accountCreate = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Create an Account',
      'head.description': 'Signup is easy and only takes a few seconds.',
      'body.class': 'accountCreate',
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit Your Account
handlers.accountEdit = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Account Settings',
      'body.class': 'accountEdit',
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Account Deleted',
      'head.description': 'Your account has been deleted.',
      'body.class': 'accountDeleted',
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create New Session
handlers.sessionCreate = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Login to your account.',
      'head.description':
        'Please enter your email and password to access your account.',
      'body.class': 'sessionCreate',
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Logged Out',
      'head.description': 'You have been logged out of your account.',
      'body.class': 'sessionDeleted',
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create a new invoice
handlers.invoicesCreate = function(data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Create a New invoice',
      'body.class': 'invoicesCreate',
    };
    // Read in a template as a string
    helpers.getTemplate('invoicesCreate', templateData, function(err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Favicon
handlers.favicon = function(data, callback) {
  // Reject any request that isnt a GET
  if (data.method == 'get') {
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico', function(err, data) {
      if (!err && data) {
        //callback the data
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

//Public Asset
handlers.public = function(data, callback) {
  // Reject any request that isnt a GET
  if (data.method == 'get') {
    //get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
      //Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function(err, data) {
        if (!err && data) {
          //Dertemine the content type (default to plain text)
          var contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }

          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }

          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

/*
 *JSON API Handlers
 *
 */

//users
handlers.users = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

//user's submethod container
handlers._users = {};

//users-post
//require data : firstName, lastName, phone, email, address, tosAggreement
//optional data: none
handlers._users.post = function(data, callback) {
  //check taht all required fileds are filled out
  var firstName =
    typeof data.payload.firstName == 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  var lastName =
    typeof data.payload.lastName == 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  var phone =
    typeof data.payload.phone == 'string' &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  var email =
    typeof data.payload.email == 'string' &&
    data.payload.email.trim().toLowerCase().length > 0
      ? data.payload.email.trim().toLowerCase()
      : false;
  var address =
    typeof data.payload.address == 'string' &&
    data.payload.address.trim().length > 0
      ? data.payload.address.trim()
      : false;
  var password =
    typeof data.payload.password == 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  var tosAgreement =
    typeof data.payload.tosAgreement == 'boolean' &&
    data.payload.tosAgreement == true
      ? true
      : false;

  if (
    firstName &&
    lastName &&
    phone &&
    email &&
    address &&
    password &&
    tosAgreement
  ) {
    //make sure the user does not already exist
    _data.read('users', email, function(err, data) {
      if (err) {
        //hash the password
        var hashedPassword = helpers.hash(password);

        //create user object
        if (hashedPassword) {
          var userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            address: address,
            hashedPassword: hashedPassword,
            tosAgreement: true,
          };
          // create the new user
          _data.create('users', email, userObject, function(err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, {Error: 'Could not create the new user'});
            }
          });
        } else {
          callback(500, {Error: "Could not hash the user's password"});
        }
      } else {
        //user already exist
        callback(400, {Error: 'A user with that emaill already exist'});
      }
    });
  } else {
    callback(400, {Error: 'Missing required fields'});
  }
};

//users-get
//required data: email
//optional data: none
handlers._users.get = function(data, callback) {
  console.log(data.payload);
  //check that the email is valid
  var email =
    typeof data.queryStringObject.email == 'string' &&
    data.queryStringObject.email.trim().length > 0
      ? data.queryStringObject.email.trim()
      : false;
  if (email) {
    //get the token from the headers
    var token =
      typeof data.queryStringObject.token == 'string'
        ? data.queryStringObject.token
        : false;
    // verify that given token is called for the email
    handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
      if (tokenIsValid) {
        _data.read('users', email, function(err, data) {
          if (!err && data) {
            //remove the hased password from the user object before returning it to the requester
            // delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403, {
          Error: 'Missing required token in header, or token is invalid',
        });
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//users-put
//required data: email
//optional data: firstName, lastName, password, email, address  (at least one must be speified)
handlers._users.put = function(data, callback) {
  //check for require field
  var email =
    typeof data.payload.email == 'string' && data.payload.email.trim()
      ? data.payload.email.trim()
      : false;

  //check for the optional fields
  var firstName =
    typeof data.payload.firstName == 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  var lastName =
    typeof data.payload.lastName == 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  var password =
    typeof data.payload.password == 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  var phone =
    typeof data.payload.phone == 'string' &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  var address =
    typeof data.payload.address == 'string' &&
    data.payload.address.trim().length > 0
      ? data.payload.address.trim()
      : false;

  //error if email is invalid
  if (email) {
    if (firstName || lastName || password || phone || address) {
      //get the token from the headers
      var token =
        typeof data.headers.token == 'string' ? data.headers.token : false;
      // verify if token is valid
      handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
        if (tokenIsValid) {
          // look up user
          _data.read('users', email, function(err, userData) {
            if (!err && userData) {
              //update the fields necessary
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }
              if (phone) {
                userData.phone = phone;
              }
              if (address) {
                userData.address = address;
              }
              //store the new updates
              _data.update('users', email, userData, function(err) {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, {Error: 'Could not update the user'});
                }
              });
            } else {
              callback(400, {Error: 'The specified user does not exist'});
            }
          });
        } else {
          callback(403, {
            Error: 'Missing required token in header, or token is invalid',
          });
        }
      });
    } else {
      callback(400, {Error: 'Missing fields to update'});
    }
  } else {
    callback(400, {Error: 'Missing require field'});
  }
};

//users-delete
//required field :email
handlers._users.delete = function(data, callback) {
  var email =
    typeof data.queryStringObject.email == 'string' &&
    data.queryStringObject.email.trim().length > 0
      ? data.queryStringObject.email.trim()
      : false;
  if (email) {
    //get the token from the headers
    var token =
      typeof data.headers.token == 'string' ? data.headers.token : false;

    // verify that given token is calid for the phon number
    handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
      if (tokenIsValid) {
        //look up user
        _data.read('users', email, function(err, userData) {
          if (!err && userData) {
            _data.delete('users', email, function(err) {
              if (!err) {
                callback(200);
              } else {
                callback(500, {Error: 'Cold not delete the specified user'});
              }
            });
          } else {
            callback(400, {Error: 'Could not find the specified user'});
          }
        });
      } else {
        callback(403, {
          Error: 'Missing required token in header, or token is invalid',
        });
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//Tokens
handlers.tokens = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

//container for all the tohens methods
handlers._tokens = {};

//Tokens - post
//required data: phone, password
//optional data: none
handlers._tokens.post = function(data, callback) {
  var email =
    typeof data.payload.email == 'string' &&
    data.payload.email.trim().length > 0
      ? data.payload.email.trim()
      : false;
  var password =
    typeof data.payload.password == 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  if (email && password) {
    //Look up the user with who matches with the emails
    _data.read('users', email, function(err, userData) {
      if (!err && userData) {
        //Hash the sent password and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          //  if valid, create a new toekn with a random name. set expiration date 1 hr in the future
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            email: email,
            id: tokenId,
            expire: expires,
          };

          //store the token
          _data.create('tokens', tokenId, tokenObject, function(err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, {Error: 'could not create the new token'});
            }
          });
        } else {
          callback(400, {
            Error: 'Password did not match the specified users stored password',
          });
        }
      } else {
        callback(400, {Error: 'Could not find the specified user'});
      }
    });
  } else {
    callback(400, {Error: 'Missing required field(s)'});
  }
};

//Tokens - get
//required data :id
//optonal data: none
handlers._tokens.get = function(data, callback) {
  //check if ID is valid
  var id =
    typeof data.queryStringObject.id == 'string' &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // look up the token
    _data.read('tokens', id, function(err, tokenData) {
      if (!err) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//Tokens - put
//required data: id , extend
//optional data : none
handlers._tokens.put = function(data, callback) {
  var id =
    typeof data.payload.id == 'string' && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;
  var extend =
    typeof data.payload.extend == 'boolean' && data.payload.extend == true
      ? true
      : false;
  if (id && extend) {
    //look up token
    _data.read('tokens', id, function(err, tokenData) {
      if (!err && tokenData) {
        // make sure token isnt expired
        if (tokenData.expire > Date.now()) {
          // set the expireation an hour from now
          tokenData.expire = Date.now() + 1000 * 60 * 60;

          // store the new updates
          _data.update('tokens', id, tokenData, function(err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, {Error: "could not update the token's expiration"});
            }
          });
        } else {
          callback(400, {
            Error: 'The token has already expired, and cannot be extended',
          });
        }
      } else {
        callback(400, {Error: 'specified token does not exist'});
      }
    });
  } else {
    callback(400, {Error: 'Missing required field(s) or field(s) are invalid'});
  }
};

//Tokens - delete
//required data: id
//optional data: name
handlers._tokens.delete = function(data, callback) {
  //check that id is valid
  var id =
    typeof data.queryStringObject.id == 'string' &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // look up the token
    _data.read('tokens', id, function(err, tokenData) {
      if (!err && tokenData) {
        // delete the toekn
        _data.delete('tokens', id, function(err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, {Error: 'Cold not delete the specified token'});
          }
        });
      } else {
        callback(400, {Error: 'Could not find the specified token'});
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//verify if a token id is cuurently valid for a given user
handlers._tokens.verifyToken = function(id, email, callback) {
  //look up token
  _data.read('tokens', id, function(err, tokenData) {
    if (!err && tokenData) {
      //check if token isnt expired
      if (tokenData.expire > Date.now() && tokenData.email == email) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

//menu
handlers.menu = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._menu[data.method](data, callback);
  } else {
    callback(405);
  }
};

//container for menu submethods
handlers._menu = {};

//menu-post
//require data: category
//optional data: items and price
handlers._menu.post = function(data, callback) {
  var menuObject = {};
  //check required fileds are valid
  var category =
    typeof data.payload.category == 'string' &&
    data.payload.category.trim().length > 0
      ? data.payload.category.trim()
      : false;

  //check if optional data are valid
  for (var item in data.payload) {
    var price =
      typeof data.payload.item == 'number' && data.payload.item > 0
        ? data.payload.item
        : false;

    //take out the category out of menuObject
    if (item != 'category') {
      menuObject[item] = data.payload[item];
    }
  }

  if (category) {
    //get the token from the headers
    var token =
      typeof data.headers.token == 'string' ? data.headers.token : false;

    //loop up user by reading the token
    _data.read('tokens', token, function(err, tokenData) {
      if (!err && tokenData) {
        var userEmail = tokenData.email;

        // verify that given token is called for the email
        handlers._tokens.verifyToken(token, userEmail, function(tokenIsValid) {
          if (tokenIsValid) {
            //makre sure category not already exist
            _data.read('menu', category, function(err, menuData) {
              if (err) {
                _data.create('menu', category, menuObject, function(err) {
                  if (!err) {
                    callback(200, menuObject);
                  } else {
                    callback(500, {Error: 'Could not create the new user'});
                  }
                });
              } else {
                callback(400, {
                  Error: 'That category already exist in the menu',
                });
              }
            });
          } else {
            callback(403, {
              Error: 'Missing required token in header, or token is invalid',
            });
          }
        });
      } else {
        callback(403, {
          Error: 'Missing required token in header, or token is invalid',
        });
      }
    });
  } else {
    callback(400, {Error: 'Missing require field'});
  }
};

//menu-get
//required data: email
//optional data: none
handlers._menu.get = function(data, callback) {
  // check that the email and token are valid
  var token =
    typeof data.headers.token == 'string' ? data.headers.token : false;
  var email =
    typeof data.headers.email == 'string' ? data.headers.email : false;

  if (email) {
    //verifiy token with the email
    handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
      if (tokenIsValid) {
        //container for menu reading from database
        var menuObject = {};

        //get list of menu categroies from menu database
        _data.list('menu', function(err, categoryData) {
          if (!err && categoryData) {
            //iterarte each files in menu data base and place them to menu container for callback
            categoryData.forEach(function(fileName) {
              _data.read('menu', fileName, function(err, menuData) {
                if (!err && menuData) {
                  menuObject[fileName] = menuData;
                } else {
                  console.log(
                    'Error: can not find menu detail for ' + FileName,
                  );
                }
              });
            });
          } else {
            console.log('Error: couldnt find any menu in the system');
          }
        });

        // create a lantecy for menu cotnainer to obtain info from the database. if it waits too long send error 404 message
        if (
          Object.keys(menuObject).length === 0 &&
          menuObject.constructor === Object
        ) {
          setTimeout(function() {
            if (Object.keys(menuObject).length > 0) {
              callback(200, menuObject);
            } else {
              callback(408, {
                Error: 'Having trouble to obtain menu info from database',
              });
            }
          }, 100);
        } else {
          callback(200, menuObject);
        }
      } else {
        callback(403, {
          Error: 'Missing required token in header, or token is invalid',
        });
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//Menu - put
//required data: email,category
//optional data: items, price

handlers._menu.put = function(data, callback) {
  //check required data
  var email =
    typeof data.headers.email == 'string' &&
    data.headers.email.trim().length > 0
      ? data.headers.email.trim()
      : false;

  var category =
    typeof data.payload.category == 'string' &&
    data.payload.category.trim().length > 0
      ? data.payload.category.trim()
      : false;

  var menuObject = {};
  var items = [];

  //check if optional data are valid
  for (var item in data.payload) {
    var price =
      typeof data.payload.item == 'number' && data.payload.item > 0
        ? data.payload.item
        : false;

    //take out the category out of menuObject
    if (item != 'category') {
      menuObject[item] = data.payload[item];
    }
  }

  // push all the items into items array
  for (var key in menuObject) {
    items.push(key);
  }
  if (email) {
    //get the token from the headers
    var token =
      typeof data.headers.token == 'string' ? data.headers.token : false;

    // verify that given token is called for the email
    handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
      if (tokenIsValid) {
        // look up menu
        _data.read('menu', category, function(err, menuData) {
          if (!err && menuData) {
            items.forEach(function(fileName) {
              if (fileName) {
                menuData[fileName] = menuObject[fileName];
              }
            });
            //store the new data
            _data.update('menu', category, menuData, function(err) {
              if (!err) {
                callback(200);
              } else {
                callback(500, {Error: 'could not update the menu'});
              }
            });
          } else {
            callback(400, {
              Error: 'The specified menu category does not exist',
            });
          }
        });
      } else {
        callback(403, {
          Error: 'Missing required token in header, or token is invalid',
        });
      }
    });
  } else {
    callback(400, {Error: 'Missing require field'});
  }
};

//menu - delete
//required data: category, email
//optional data: none

handlers._menu.delete = function(data, callback) {
  // check if category and email are valid
  var category =
    typeof data.payload.category == 'string' &&
    data.payload.category.trim().length > 0
      ? data.payload.category.trim()
      : false;
  var email =
    typeof data.headers.email == 'string' &&
    data.headers.email.trim().length > 0
      ? data.headers.email.trim()
      : false;

  if (category) {
    //get the token from the headers
    var token =
      typeof data.headers.token == 'string' ? data.headers.token : false;

    // verify that given token is called for the phone number
    handlers._tokens.verifyToken(token, email, function(tokenIsValid) {
      if (tokenIsValid) {
        //look up menu
        _data.read('menu', category, function(err, data) {
          if (!err) {
            _data.delete('menu', category, function(err) {
              if (!err) {
                callback(200);
              } else {
                callback(500, {Error: 'Cold not delete the specified token'});
              }
            });
          } else {
            callback(400, {Error: 'Could not find the specified token'});
          }
        });
      } else {
        callback(403, {
          Error: 'Missing required token in header, or token is invalid',
        });
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//invoice
handlers.invoices = function(data, callback) {
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._invoices[data.method](data, callback);
  } else {
    callback(405);
  }
};

//container for all the invoices method
handlers._invoices = {};

//invoices - post
//required data:  items, quantity
//optinal data: none
handlers._invoices.post = function(data, callback) {
  var ordersObject = {};
  var items = [];
  var orders = [];
  var totalAmount = 0;

  //check if itme and quantity  are valid
  for (var item in data.payload) {
    var quantity =
      typeof data.payload.item == 'number' && data.payload.item > 0
        ? data.payload.item
        : false;
    // var price = typeof(data.payload.item) == 'number' && data.payload.item > 0 ? data.payload.item : false;
    ordersObject[item] = data.payload[item];
    items.push(item);
  }
  if (items.length > 0) {
    //get list of menu categroies from menu database
    items.forEach(function(item) {
      _data.list('menu', function(err, categoryData) {
        if (!err && categoryData) {
          //iterarte each files in menu data base , place them to order container and calculate total cost for callback
          categoryData.forEach(function(fileName) {
            _data.read('menu', fileName, function(err, menuData) {
              if (!err && menuData) {
                if (menuData[item]) {
                  var orderDetail = {};
                  orderDetail[item] = {
                    quantity: ordersObject[item],
                    price: ordersObject[item],
                  };
                  orders.push(orderDetail);
                  totalAmount +=
                    orderDetail[item]['quantity'] * orderDetail[item]['price'];
                }
              } else {
                console.log('Error: can not find menu detail for ' + FileName);
              }
            });
          });
        } else {
          console.log('Error: couldnt find any menu in the system');
        }
      });
    });

    // create invoice messages
    var msg = 'Total amount for your order is $' + totalAmount;

    // save invoice to databse,  send payment to stripe and email to customer
    setTimeout(function() {
      //get toekens from headers
      var token =
        typeof data.headers.token == 'string' ? data.headers.token : false;
      //look up the user by reading the tokenn
      _data.read('tokens', token, function(err, tokenData) {
        if (!err && tokenData) {
          var userEmail = tokenData.email;

          //lookup user data
          _data.read('users', userEmail, function(err, userData) {
            if (!err && userData) {
              var userInvoices =
                typeof userData.invoices == 'object' &&
                userData.invoices instanceof Array
                  ? userData.invoices
                  : [];
              //create invoice number
              var orderNumber = helpers.createOrderNumber(10);

              //create the order object and include user's email
              var invoiceObject = {
                orderNumber: orderNumber,
                customerEmail: userEmail,
                orderDetails: orders,
                totalAmount: totalAmount,
              };

              // create message for the email
              var msg =
                'The amount of $' +
                totalAmount +
                '  has been charged to your card';

              //save objects
              _data.create('invoices', orderNumber, invoiceObject, function(
                err,
              ) {
                if (!err) {
                  //add invoice if to the users's object
                  userData.invoices = userInvoices;
                  userData.invoices.push(orderNumber);

                  //save the new user data
                  _data.update('users', userEmail, userData, function(err) {
                    if (!err) {
                      // send payment and conformation email when the order was saved
                      helpers.sendPayment(
                        invoiceObject.customerEmail,
                        invoiceObject.totalAmount,
                        function(err) {
                          if (!err) {
                            helpers.sendMailgunEmail(userEmail, msg, function(
                              err,
                            ) {
                              if (!err) {
                                //return the data about the new invoice
                                callback(200, invoiceObject);
                              } else {
                                callback(403, {Error: 'error sending email'});
                              }
                            });
                          } else {
                            callback(402, {
                              Error: 'unable to proceed payments',
                            });
                          }
                        },
                      );
                    } else {
                    }
                  });
                } else {
                  callback(500, {Error: 'having trouble to create new order'});
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(403);
        }
      });
    }, 100);
  } else {
    callback(400, {Error: 'Missing require field'});
  }
};

//invoice - get
//require data : invoiceNumber
//optional data: none
handlers._invoices.get = function(data, callback) {
  //check that the invoice number is valid
  var invoiceNumber =
    typeof data.queryStringObject.invoiceNumber == 'string' &&
    data.queryStringObject.invoiceNumber.trim().length == 10
      ? data.queryStringObject.invoiceNumber.trim()
      : false;

  if (invoiceNumber) {
    //look up the inovice number
    _data.read('invoices', invoiceNumber, function(err, invoiceData) {
      if (!err && invoiceData) {
        // get token from the headers
        var token =
          typeof data.headers.token == 'string' ? data.headers.token : false;
        // verify that given token is valid for the email and that the given token is valid and belong to the user who created the order
        handlers._tokens.verifyToken(token, invoiceData.customerEmail, function(
          tokenIsValid,
        ) {
          if (tokenIsValid) {
            //return invoice data
            callback(200, invoiceData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//invoice - delete
//require data :invoiceNumber
//optional data: none
handlers._invoices.delete = function(data, callback) {
  //check that invoice number is valid
  var invoiceNumber =
    typeof data.queryStringObject.invoiceNumber == 'string' &&
    data.queryStringObject.invoiceNumber.trim().length == 10
      ? data.queryStringObject.invoiceNumber.trim()
      : false;

  if (invoiceNumber) {
    // look up the invoice
    _data.read('invoices', invoiceNumber, function(err, invoiceData) {
      if (!err && invoiceData) {
        //get token from header
        var token =
          typeof data.headers.token == 'string' ? data.headers.token : false;

        //verify that given token is calid for the phon number
        handlers._tokens.verifyToken(token, invoiceData.customerEmail, function(
          tokenIsValid,
        ) {
          if (tokenIsValid) {
            // delete the invoice data
            _data.delete('invoices', invoiceNumber, function(err) {
              if (!err) {
                //lookup the user
                _data.read('users', invoiceData.customerEmail, function(
                  err,
                  userData,
                ) {
                  if (!err && userData) {
                    var userInvoices =
                      typeof userData.invoices == 'object' &&
                      userData.invoices instanceof Array
                        ? userData.invoices
                        : [];

                    //remove the delete inovice from their list of invocies
                    var invoicePosition = userInvoices.indexOf(invoiceNumber);
                    if (invoicePosition > -1) {
                      userInvoices.splice(invoicePosition, 1);
                      //Re-save the user's data
                      _data.update(
                        'users',
                        invoiceData.customerEmail,
                        userData,
                        function(err) {
                          if (!err) {
                            callback(200);
                          } else {
                            callback(500, {Error: 'Cold not update the user'});
                          }
                        },
                      );
                    } else {
                      callback(500, {
                        Error:
                          'Cold not find the check on the users object, so could not remove it',
                      });
                    }
                  } else {
                    callback(500, {
                      Error:
                        'Could not find the user who created invoice, so cant remove the invoice from the list of invoices on the user object',
                    });
                  }
                });
              } else {
                callback(500, {Error: 'Cold not delete the check data'});
              }
            });
          } else {
            callback(403, {
              Error: 'Missing required token in header, or token is invalid',
            });
          }
        });
      } else {
        callback(400, {Error: 'Specified invoice number  do not exist'});
      }
    });
  } else {
    callback(400, {Error: 'Missing required field'});
  }
};

//ping handler
handlers.ping = function(data, callback) {
  callback(200, data);
};

//Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

//Export the module
module.exports = handlers;

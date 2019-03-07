/* 
 * Libery for storing and editing data
 *
 */

//Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// container for the module
var lib ={}

//base directroy of the data folder
_dirname = path.resolve();
lib.baseDir =path.join(_dirname,'.data/');

// write data to a file
lib.create = function(dir,file,data,callback){
  
  //open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      // convert data to string
      var stringData = JSON.stringify(data);

      //write to file and close it
      fs.writeFile(fileDescriptor,stringData,function(err){
        if(!err){
          fs.close(fileDescriptor,function(err){
            if(!err){
              callback(false)
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('error writing to new file');
        }
      });
    } else {
      callback('Couldnt create new file, it may already exist');
    }
  });
};


// Read data from a file
lib.read = function (dir,file,callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
    if(!err && data) {
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,data);
    }
  });
};

// update data inside a file 
lib.update = function(dir,file,data,callback){
  //open file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
    if(!err && fileDescriptor){
      //convert data to string
      var stringData = JSON.stringify(data);

      //Truncate the file
      fs.truncate(fileDescriptor,function(err){
        if(!err){
          //write to the file and close it
          fs.write(fileDescriptor,stringData,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Error closing the file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback( 'could not open the file for updating it may not exist yet');
    }
  });
};

//Delete a file
lib.delete = function(dir,file,callback){
  //unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err){
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};

//list all the items in a directory 
lib.list = function(dir, callback){
  fs.readdir(lib.baseDir+dir+'/',function(err,data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};

//export the module
module.exports = lib

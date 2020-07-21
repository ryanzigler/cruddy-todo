const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( (err, id) => {
    // var fileName =
    fs.writeFile((exports.dataDir + '/' + id + '.txt'), text, (err) => {
      if (err) {
        throw ('error saving Todo to disk');
      } else {
        callback(null, {id, text})
      }
    })
  })
};


exports.readAll = (callback) => {
  //var data = _.map()
  var allFiles = [];
  // console.log(exports.dataDir, "exportste");

  fs.readdir(exports.dataDir, (err, files) => {

    if (err) {
      throw ('error retrieving all items');
    }

    //return
     callback(null, _.map(files, (file) => {
      var id = path.basename(file, '.txt');
      return ({id: id, text: id});
      // returns the sections of the path name after the last '/' and '.txt'
      // _.map([1, 2, 3], function(num){ return num * 3; });
      // => [3, 6, 9]
    }));

        console.log("All files read succesfully");
      })
    }

/* function readDir(exports.dataDir,
     function(err, file) {
      var filesnames = _.map(files, function callback(err, file))
      var id = path.basement(file, '.txt)





}))

*/

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

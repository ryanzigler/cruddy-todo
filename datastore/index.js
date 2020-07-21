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

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw ('error retrieving all items');
    } else {
      callback(null,
        _.map(files, (file) => {
          var id = path.basename(file, '.txt');
          return ({id: id, text: id});
        })
      )
      console.log("All files read succesfully");
    }
  });
};


exports.readOne = (id, callback) => {
  var filePath = exports.dataDir + '/' + id + '.txt'
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(new Error(`No item at ID: ${id}`));
    } else {
      callback(null, {id: id, text: data})
    }
  })
};

exports.update = (id, text, callback) => {
  var filePath = exports.dataDir + '/' + id + '.txt'
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(new Error(`No item at ID: ${id}`));
    } else {
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          callback(new Error(`No item at ID: ${id}`))
        } else {
          callback(null, {id, text});
        }
      })
    }
  });
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

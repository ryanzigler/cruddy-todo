const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const Promise = require('bluebird');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( (err, id) => {
    fs.writeFile((exports.dataDir + '/' + id + '.txt'), text, (err) => {
      if (err) {
        callback(('error saving Todo to disk'));
      } else {
        callback(null, {id, text});
      }
    });
  });
};

Promise.promisify(fs.readFile);
const readFileAsync = (id) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${exports.dataDir}/${id}.txt`, {encoding: 'utf8'}, (err, text) => {
      if (err) {
        reject(new Error('error'));
      } else {
        resolve({id, text});
      }
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    var todos = _.map(files, (file) => {
      var id = path.basename(file, '.txt');
      return readFileAsync(id);
    });
    Promise.all(todos).then((results) => {
      callback(null, results);
    });
  });
};

exports.readOne = (id, callback) => {
  var filePath = exports.dataDir + '/' + id + '.txt';
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(new Error(`No item at ID: ${id}`));
    } else {
      callback(null, {id: id, text: data});
    }
  });
};

exports.update = (id, text, callback) => {
  var filePath = exports.dataDir + '/' + id + '.txt';
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(new Error(`No item at ID: ${id}`));
    } else {
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          callback(new Error(`No item at ID: ${id}`));
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  var filePath = exports.dataDir + '/' + id + '.txt';
  fs.unlink(filePath, (err) => {
    if (err) {
      callback(new Error(`No item at ID: ${id}`));
    } else {
      callback(null);
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

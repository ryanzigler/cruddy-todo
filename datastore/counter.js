const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  readCounter((err, currentValue) => {
    writeCounter(currentValue + 1, (err, id) => {
      callback(err, id);
    });
  });
}

    //if no number
    //write counter with '00001' as next unique ID
    //else
    //convert result of readcounter to number, increment our unique ID by 1
    //write counter with that unique ID to string
  // var getReadCounter = readCounter()
  // const currentId = readCount (id) => {
  //   if (err) {
  //     throw ('error getting nextUniqueId');
  //   } else {
  //     callback(null, )
  // };
  // var currentCount = readCounter(callback)




//   counter = counter + 1;
//   return zeroPaddedNumber(counter);

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');

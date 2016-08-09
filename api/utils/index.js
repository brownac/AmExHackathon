'use strict';
var path = require('path');
var process = require('process');

// determine if we are in the dev environment
let dev = false;
if (process.argv[2] === 'dev') {
  dev = true;
  console.log("Running in development mode");
}

let uploadsDir = path.join(__dirname, '../../uploads');
let angularAppDir = path.join(__dirname, '../../app');
let bowerDir = path.join(__dirname, '../../bower_components');
let distDir = path.join(__dirname, '../../dist');


module.exports = {
  /*
   * true if we are in development mode.
   * Checks arguments currently
   */
  dev,

  /*
   * the full paths to several important directories
   */
  uploadsDir,
  angularAppDir,
  bowerDir,
  distDir
};

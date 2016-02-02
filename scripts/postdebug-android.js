#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var name = process.env.npm_package_name;

var outputs = './platforms/android/build/outputs/apk/';
var apk = 'android-debug.apk';
var path = path.join(outputs, apk);

fs.createReadStream(path).pipe(fs.createWriteStream(name + '.apk'));

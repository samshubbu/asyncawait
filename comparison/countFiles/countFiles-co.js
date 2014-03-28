var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var _ = require('lodash');
var co = require('co');


// Return the number of files in the given directory
var countFiles = co(function* (dir) {
    var files = yield fs.readdirSync(dir);
    var paths = _.map(files, function (file) { return path.join(dir, file); });
    var stats = yield _.map(paths, function (path) { return fs.statAsync(path); });
    return _.filter(stats, function (stat) { return stat.isFile(); }).length;
});


module.exports = countFiles;

var fs = require('fs');

// make promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

// utility function, return Promise
function getFile(filename) {
    return fs.readFileAsync(filename, 'utf8');
}

function spacesToLispCase(filename) {
  // Bass (Saltwater, Black, Striped) to Bass-Saltwater-Black-Striped
  return filename.match(/\w+/g).join('-')
}

fs.readdirAsync = function(dirname) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};


var dirname = 'img/fish/'

fs.readdirAsync(dirname).then(function (filenames){
    filenames.forEach(function (filename) {
      console.log(spacesToLispCase(filename.slice(0,-4)));
      fs.rename(dirname + filename, dirname + spacesToLispCase(filename.slice(0,-4)) + '.jpg', function(err) {
          if ( err ) console.log('ERROR: ' + err); 
        });
      // fs.rename(dirname + filename, dirname + spacesToLispCase(filename.slice(0,-4) + '.jpg');
    })
})

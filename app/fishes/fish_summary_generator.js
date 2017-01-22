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

function isDataFile(filename) {
  return (filename.split('.')[1] == 'json' 
          && filename.split('.')[0] != 'fishes'
          && filename.split('.')[0] != 'phones_backup'
          && filename.split('.')[0] != 'test')
}

fs.writeFile('./fishes.json', '', function(){console.log('done')})

fs.readdirAsync('./').then(function (filenames){
    filenames = filenames.filter(isDataFile);
    console.log(filenames);
    return Promise.all(filenames.map(getFile));
}).then(function (files){
    var summaryFiles = [];
    files.forEach(function(file) {
      var json_file = JSON.parse(file);
      summaryFiles.push({ "name": json_file["name"],
                          "mercury": json_file["mercury"],
                          "imageUrl": json_file["images"][0],
                          "id": json_file["id"]
                      });
    });
    fs.appendFile("./fishes.json", JSON.stringify(summaryFiles, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was appended!");
    });
})

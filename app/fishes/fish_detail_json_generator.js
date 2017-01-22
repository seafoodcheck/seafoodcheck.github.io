var fs = require('fs');

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

function isImgFile(filename) {
  return (filename.split('.')[1] == 'jpg')
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function spacesToLispCase(filename) {
  // Bass (Saltwater, Black, Striped) to Bass-Saltwater-Black-Striped
  return filename.match(/\w+/g).join('-')
}

fs.writeFile('./phones.json', '', function(){console.log('done')})

// fs.readdirAsync('../img/fish').then(function (filenames){
//   filenames = filenames.filter(isImgFile);
//   filenames.forEach(function(filename) {
//     filename = filename.split('.')[0]
//     filenameLispCase = spacesToLispCase(filename);
    // var fishDataFile = { "id": filenameLispCase,
    //                     "name": filename,
    //                     "images": ['img/fish/' + filename + '.jpg'],
    //                     "mercury": Math.floor(Math.random() * 3)
    //                   };
//     console.log(filenameLispCase);
//     fs.writeFile(filenameLispCase + '.json', JSON.stringify(fishDataFile, null, 4), function(err) {
//         if(err) {
//           return console.log(err);
//         }
//     });
//   });
// })

getFile('./fish-fda.json').then(function (contents) {
  var fishes = JSON.parse(contents);
  fishes.forEach(function (fish) {
    var fishTitle = toTitleCase(fish["name"]);
    var filenameLispCase = spacesToLispCase(fishTitle);
    console.log(fishTitle);
    console.log(filenameLispCase);
    var fishDataFile = { "id": filenameLispCase,
                        "name": fishTitle,
                        "mean": fish["mean"],
                        "median": fish["median"],
                        "stdev": fish["stdev"],
                        "min": fish["min"],
                        "max": fish["max"],
                        "num": fish["num"],
                        "source": fish["source"],
                        "mercury": Math.floor(Math.random() * 3)
                      };
    fs.writeFile(filenameLispCase + '.json', JSON.stringify(fishDataFile, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
    });
  })
})

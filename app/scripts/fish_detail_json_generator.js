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

function mercuryLevel(value) {
  // given a mean mercury level value in PPM from FDA, translate to 0 to 3
  // Least mercury: Less than 0.09 parts per million (PPM)
  // Moderate mercury: From 0.09 to 0.29 PPM
  // High mercury: From 0.3 to 0.49 PPM
  // Highest mercury: More than .5 PPM
  // source NRDC http://web.archive.org/web/20150629095601/http://www.nrdc.org/health/effects/mercury/index.asp
  if (value < 0.09) {
    return 0;
  } else if (value < 0.3) {
    return 1;
  } else if (value < 0.5) {
    return 2;
  } else {
    return 3;
  }
}

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

getFile('fishes/fish-fda.json').then(function (contents) {
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
                        "mercury": mercuryLevel(fish["mean"]),
                        "images": [
                            "img/fish/" + fishTitle + ".jpg"
                        ],
                      };
    fs.writeFile('fishes/' + filenameLispCase + '.json', JSON.stringify(fishDataFile, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
    });
  })
})

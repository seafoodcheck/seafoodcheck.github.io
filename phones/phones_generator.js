var fs = require('fs');

// function readJSONFiles(dirname, onFileContent, onError) {
//   fs.readdir(dirname, function(err, filenames) {
//     if (err) {
//       onError(err);
//       return;
//     }
//     filenames.forEach(function(filename) {
//       if (filename.split('.')[1] == 'json' && filename.split('.')[0] != 'phones') {
//         fs.readFile(dirname + filename, 'utf-8', function(err, content) {
//           if (err) {
//             onError(err);
//             return;
//           }
//           onFileContent(filename, content);
//         });
//       };
//     });
//   });
// }

// var data = {};
// fs.writeFile('./test.json', '', function(){console.log('done')})
// readJSONFiles('./', function(filename, content) {
//   data[filename] = content;
//   // var content_json = JSON.parse(content);
//   fs.appendFile("./test.json", content, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//       console.log("The file was appended!");
//   });
// }, function(err) {
//   throw err;
// });

// console.log(data);

// var fs = require('fs');  
// fs.readFile('./dell-streak-7.json', 'utf8', onFileRead);

// function onFileRead(err, data) {  
//   if (err) throw err;
//   var currentPackage = JSON.parse(data);
//   console.log(currentPackage);
// }

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

// getFile('./dell-streak-7.json', 'utf8').then(function (data){
//     console.log(data);
// });

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
          && filename.split('.')[0] != 'phones'
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
                          "age": Math.floor(Math.random() * 5),
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

// // test call back functions
// let x = function(){
//     console.log("I am called from inside a function");
// }
// let y = function(callback){
//     console.log('do something');
//     callback();
// }
// y(x);   


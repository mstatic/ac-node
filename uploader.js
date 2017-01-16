const fs = require('fs');

let inputFile = fs.createReadStream('./sample.txt');
let outputFile = fs.createWriteStream('./outputData.txt');

inputFile.pipe(outputFile);
// inputFile.on('readable', () => {
// });

// inputFile.on('end', () => {
//     outputFile.end();
// });
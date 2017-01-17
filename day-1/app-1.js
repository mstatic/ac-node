const http = require('http');
const fs = require('fs');
const server = http.createServer(); //Server => new EventEmitter

server.on("request", (request, response) => {
    console.log('received request', Object.keys(request));
    let outputFile = fs.createWriteStream('./fileUploaded.txt');

    request.on('readable', () => {
        let chunk = null;
        let contentLength = request.headers['content-length'];
        let currentBytes = 0;

        while (null !== (chunk = request.read())) {
            currentBytes += chunk.length;
            let progress = currentBytes / contentLength * 100;
            outputFile.write(chunk);
            response.write(`Progress is ${parseInt(progress, 10)}`);
        }
    });

    request.on('end', () => {
        response.end();
        outputFile.end();
    });
});

server.on('error', (error) => {
    console.log(error);
});

server.listen(9000, () => {
    console.log('Listening on port 9000');
});
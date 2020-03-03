const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3010;

const DATA = {data: 'DATA'};

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) throw new Error(err);
        const html = data.toString().replace('{{DATA}}', JSON.stringify(DATA));
        res.write(html);
        res.end();
    });
});

server.listen(PORT, err => {
    if (err) {
        console.log('something bad happened', err);
    }
    console.log(`server is listening on ${PORT}`)
});
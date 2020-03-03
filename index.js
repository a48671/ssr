const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PORT = 3010;

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    fs.readFile(path.join(__dirname, 'index.html'), async (err, data) => {
        if (err) throw new Error(err);
        const users = await axios.get('https://api.github.com/users').then(response => response.data).catch(() => []);
        const html = data.toString().replace('{{DATA}}', JSON.stringify(users));
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
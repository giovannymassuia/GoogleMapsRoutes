var express = require('express');
var app = express();
var path = require('path');
const PORT = 3000;

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/data.json', function(req, res) {
    res.sendFile(path.join(__dirname + '/data.json'));
});

app.listen(PORT, () => console.log("Server running on localhost:" + PORT));

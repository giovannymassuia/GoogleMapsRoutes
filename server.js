var express = require('express');
var app = express();
var path = require('path');
const PORT = 3000;

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/data.json', function(req, res) {
    res.sendFile(path.join(__dirname + '/data.json'));
});

app.get('/js/main.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/main.js'));
});

app.get('/css/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/css/style.css'));
});

app.listen(PORT, () => console.log("Server running on localhost:" + PORT));

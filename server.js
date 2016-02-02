var express = require('express')
var app = express()
var path = require('path')
var moment = require('moment')

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Showing index html for calls without parameter
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'))
});

app.get('/:times', function(req, res){
    var times = req.params.times
    var d
    var result = {'unix':null, 'natural':null}
    if(/^\d{8,}$/.test(times)) {
        d = moment(times, "X");
    } else {
        d = moment(times, "MMMM D, YYYY");
    }
    if(d.isValid()) {
        result.unix = d.format("X")
        result.natural = d.format("MMMM D, YYYY")
    }
    res.json(result)
});

var port = process.env.PORT || 8081;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
// Free Code Camp challenge : Timestamp MicroService
// 02-05-2016 Joey Buczek

// include modules
var http = require('http');
var dateFormat = require('dateformat');

// create server
var server = http.createServer(function (req, res) {
    
    // vars
    var result;
    var resultObject = {"unix":null,"natural":null};
    var url = req.url.slice(1);
    var naturalDate;
    var unixTimestamp;
    
    // format vars
    var naturalSearch = url.search(/[a-z]\%20[0-9]+\,?\%20[0-9]+/i);
    var unixSearch = url.search(/[0-9]/g);
    var letterSearch = url.search(/[a-z]/gi);
    
    // functions
    function createNaturalDate(unixDate) {
        var convertDate = new Date(unixDate);
        return dateFormat(convertDate, "mmmm dS, yyyy");
    }
    function createUnixDate(naturalDate) {
        return Date.parse(naturalDate)/1000;
    }
    
    // check for natural date format to start with
    if (naturalSearch > 0) {
        // natural found
        naturalDate = url.replace(/\%20/g," ");
        result = { 'unix': createUnixDate(naturalDate), 'natural': naturalDate };
        
    } else if ((unixSearch >= 0) && (letterSearch < 0)) {
        // unix found
        result = { 'unix': url, 'natural': createNaturalDate(Number(url)) };    
        
    } else {
        var result = resultObject;
    }
    
    // write results
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify(result));
    
});

// listen
server.listen(8080, function(){
    console.log("Now listening on port 8080...")
});
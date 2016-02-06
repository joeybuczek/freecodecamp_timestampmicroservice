// Free Code Camp challenge : Timestamp MicroService
// 02-05-2016 Joey Buczek

// include modules
var http = require('http');
var dateFormat = require('dateformat');

// create server
var server = http.createServer(function (req, res) {
    
    // Vars ====================================================================
    var result;
    var resultObject = {"unix":null,"natural":null};
    var url = req.url.slice(1);
    var naturalDate;
    var unixTimestamp;
    
    // page display var
    var html = "<h2>Timestamp MicroService - Free Code Camp Challenge</h2>" + 
               "<p>Append a unix or natural date to the above URL to see either both results for the same date.</p>" + 
               "<h3>Example usage:</h3>" + 
               "<p style='color:darkblue;'>https://fcc-timestampmicroservice.herokuapp.com/December%2015,%202015</p>" + 
               "<p style='color:darkblue;'>https://fcc-timestampmicroservice.herokuapp.com/1450137600</p>";
    
    // format vars
    var naturalSearch = url.search(/[a-z]\%20[0-9]+\,?\%20[0-9]+/i);
    var unixSearch = url.search(/[0-9]/g);
    var letterSearch = url.search(/[a-z]/gi);
    
    // Functions ===============================================================
    function createNaturalDate(unixDate) {
        var convertDate = new Date(unixDate);
        return dateFormat(convertDate, "mmmm dd, yyyy");
    }
    function createUnixDate(naturalDate) {
        return Date.parse(naturalDate)/1000;
    }
    
    // LOGIC ===================================================================
    // check for "home" page
    if (req.url === "/") {
        res.writeHead(200, {"Content-Type":"text/html"});
        res.end(html);
    }
    
    // check for natural date format to start with
    if (naturalSearch > 0) {
        
        // natural date format found
        naturalDate = url.replace(/\%20/g," ");
        // if unix conversion is null, naturalDate is null as well
        if (!createUnixDate(naturalDate)) { naturalDate = null; }
        // set result
        result = { 'unix': createUnixDate(naturalDate), 'natural': naturalDate };
        
    } else if ((unixSearch >= 0) && (letterSearch < 0)) {
        
        // unix found, set result
        result = { 'unix': url, 'natural': createNaturalDate(Number(url)*1000) };    
        
    } else {
        
        result = resultObject;
        
    }
    
    // WRITE RESULTS ===========================================================
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify(result));
    
});

// listen
server.listen(8080, function(){
    console.log("Now listening on port 8080...");
});
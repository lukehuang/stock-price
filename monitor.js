const urlP1 = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=";
const urlP2 = "&interval=1min&apikey=0CZBXPGPXL2CBG2Q";

var fs = require('fs');
var data = fs.readFileSync('symbol.json');
var symbolJson = JSON.parse(data);
console.log(symbolJson);

var S1 = symbolJson[0][0];
var S2 = symbolJson[1][0];
var S3 = symbolJson[2][0];
var S4 = symbolJson[3][0];

var R1 = require ('request');
var R2 = require ('request');
var R3 = require ('request');
var R4 = require ('request');

R1(urlP1+S1+urlP2, function(error,response,body){
    
    body = JSON.parse(body);
    console.log(body,S1);
    companySymbol(body,1);
    newPrice(body,1);

});

R2(urlP1+S2+urlP2, function(error,response,body){
    
   body = JSON.parse(body);

    companySymbol(body,2);
    newPrice(body,2);

});

R3(urlP1+S3+urlP2, function(error,response,body){
    
    body = JSON.parse(body);
 
     companySymbol(body,3);
     newPrice(body,3);
 
 });
 R4(urlP1+S4+urlP2, function(error,response,body){
    
    body = JSON.parse(body);
 
     companySymbol(body,4);
     newPrice(body,4);
 
 });
 




function companySymbol(arr,int){
    var A = arr["Meta Data"]
    var B = Object.keys(A).map(i => A[i])
    var row = int;
     var companySymbol = B[1]
     document.getElementById("symbol"+row).innerHTML = "Symbol: "+companySymbol 
     console.log("s "+ row );

     
}
function newPrice(arr,int){
    // FIRST LAYER OBJECT
    var A = arr["Time Series (1min)"]
    // SECOND LAYER OBJECT
    var B = Object.keys(A).map(i => A[i])
    var row = int;
    console.log("p "+ row );
    var newPrice = parseFloat(B[0]["4. close"])
    document.getElementById("price"+row).innerHTML = newPrice
    var buyPrice = symbolJson[row-1][1];
    var diff = Math.round((newPrice - buyPrice)*100)/100 ;
    var percentage = Math.round((diff / buyPrice)*100)/100;
    if(diff>0){
        document.getElementById("buy"+row).innerHTML = "+"+diff;
        document.getElementById("per"+row).innerHTML = "("+percentage+")";
        document.getElementById("buy"+row).style.color = "red";
        document.getElementById("per"+row).style.color = "red";
    }else if(diff<0){
        document.getElementById("buy"+row).innerHTML = diff;
        document.getElementById("per"+row).innerHTML = "("+percentage+")";
        document.getElementById("buy"+row).style.color = "green";
        document.getElementById("per"+row).style.color = "green";
    }else if(buyPrice == 0){
        document.getElementById("buy"+row).style.display = "none";
        document.getElementById("per"+row).style.display = "none";
    }
    


}


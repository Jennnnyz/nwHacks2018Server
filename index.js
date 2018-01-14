var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1337));
app.use(express.static(__dirname + '/public'));

app.get('/products', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.json("heehee");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
/**
 * Created by imamudinnaseem on 6/15/17.
 */

var express = require('express');
var path = require('path');
var app = express();

app.use('/', express.static(path.resolve(__dirname, 'dist')));
var port = 3003;
app.listen(port);
console.log('listening to port ' + port);


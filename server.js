/* const express = require('express');
const path = require('path');
const app = express();
 
app.use(express.static(__dirname+'/dist/doacaodesangue-frontend'));
 
app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/doacaodesangue-frontend/index.html'));
});

app.listen(process.env.PORT || 8080); */

const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
 
app.use(express.static(`${__dirname}/dist/${nomeApp}`));
 
app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});
 
app.listen(process.env.PORT || 8080);
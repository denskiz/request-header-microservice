const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
var ip = require('ip');

app.use(cors());
app.use(useragent.express());
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/whoami', (req, res) => {
  var soft = `OS: ${req.useragent.os}, Browser: ${req.useragent.browser}`;
  var lan = req.acceptsLanguages();
  res.json({
    'IP Address': ip.address(),
    Language: lan[0],
    Software: soft
  });
});

app.listen(port, () => {
  console.log('Node is listening on port 8080');
});

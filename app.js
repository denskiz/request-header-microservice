const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const p = require('ua-parser');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/whoami', (req, res) => {
  var userAgent = req.headers['user-agent'];
  var lan = req.acceptsLanguages();
  var os = p.parseOS(userAgent).toString();
  var browser = p.parseUA(userAgent).toString();
  res.json({
    'IP Address': req.ip,
    Language: lan[0],
    'Operating System': os,
    Browser: browser
  });
});

app.listen(port, () => {
  console.log('Node is listening on port 8080');
});

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
  var ip = req.ip;
  var trimIp = ip.replace(/[A-Za-z]|:/g, '');
  var language = req.headers['accept-language'];
  res.json({
    'IP Address': trimIp,
    Language: lan[0],
    'Operating System': os,
    Browser: browser,
    Other: req.headers['x-forwarded-for']
  });
});

app.listen(port, () => {
  console.log('Node is listening on port 8080');
});

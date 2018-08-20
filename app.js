const dotenv = require('dotenv');

dotenv.config();

const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const members = require('./members/members');
const startGameSocket = require('./games/gameSocket');

const index = require('./routes/index');
const meettheteam = require('./routes/meettheteam');
const findmemberbyname = require('./routes/findmembersbyname');

let connections = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.use('/', index);
app.use('/meettheteam', meettheteam);
app.use('/findmembersbyname', findmemberbyname);

app.get('/putafacetothename', (req, res) => {
    res.render('putafacetothename.hbs', members.findRandomMembers(6));
});

app.get('/whichmatt', (req, res) => {
    res.render('whichmatt', members.findMatts(3));
});

startGameSocket(http);

// Handlebars default config
const hbs = require('hbs');
const fs = require('fs');

const partialsDir = __dirname + '/views/partials';

const filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
});

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = http;
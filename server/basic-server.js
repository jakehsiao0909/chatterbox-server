const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const url = '/classes/messages';
const cors = require('cors');
const path = require('path');
const dB = {
  results: [{username: 'bob', text: 'hey', roomname: 'lobby', objectId: 1}]
};

let count = 2;

app.use(cors());

const pathToClient = path.join(__dirname, '../client/client');
app.use(express.static(pathToClient));

const pathToIndex = path.join(__dirname, '../client/client/index.html');
app.get('/', (req, res) => res.sendFile(pathToIndex));

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('YO!'));

app.get(url, (req, res) => {
  res.json(dB);
});

app.post(url, (req, res) => {
  console.log('here\'s our message object: ', req.body);
  req.body.objectId = count++;
  dB.results.push(req.body);
  res.status(201).end('message posted!');
});

app.listen(3000, () => console.log('Currently listening on port 3000'));
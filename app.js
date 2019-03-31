const express = require('express');
const http = require('http');
const path = require('path');
const io = require('socket.io');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');

// require the Sentence2Vec class
const Sentence2Vec = require('./sentence2vec.js')

// require the sentiment.js class
// const Sentimentjs = require('./sentiment.js')

// console.log(Sentimentjs);
console.log(Sentence2Vec);

const embedings = require('./public/word_embeadings.json')


// console.log(test);
const userID = 0;

// console.log("average", Sentence2Vec.average(embedings[20].message_embedding, embedings[30].message_embedding));
// console.log("distance", Sentence2Vec.distance(embedings[0].message_embedding, embedings[1].message_embedding));

const app = express();
let server = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const port = process.env.PORT || 3000;
// const sentimentjs = new Sentimentjs();


function init() {

  // console.log(sentJS);
}

init();



// const similar = findVector("The Fox one day thought of a plan to amuse himself at the expense of the Stork, at whose odd appearance he was always laughing.");
// console.log(similar);

server = app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});

// socket work

const sockets = io(server);
// configure socket handlers
sockets.on('connection', function (socket) {

  // send current state to this client that connected only
  // console.log(`a user connected`,socket.id);
  socket.on('sendSeedSentance', function (data) {
    const seedSentance = data.randomSentance;
    let similarSentences = findVector(seedSentance);
    sockets.emit('sentencesResults', similarSentences);

  });


  socket.on('rebranchSentence', function (data) {
    const rebranchSentence = data.rebranchSentance;
    let similarSentences = findVector(rebranchSentence);
    console.log(similarSentences);
    sockets.emit('NewSeedResult', similarSentences);
  });
});

// end socket work


// TODO
function findAverageVector() {

  // Sentence2Vec.average(embedings[20].message_embedding, embedings[30].message_embedding));
}

function findVector(sentance, n = 20) {
  let vec;
  let sentencesResults = [];

  for (let i = 0; i < Object.keys(embedings).length; i++) {
    if (embedings[i].message === sentance) {
      vec = embedings[i].message_embedding;
    }
  }

  let sentences = [];
  let keys = Object.keys(embedings);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let d = Sentence2Vec.distance(vec, embedings[key].message_embedding);
    sentences.push({ wordKey: key, distance: d });
  }

  //sort results
  sentences.sort((a, b) => {
    return b.distance - a.distance;
  });

  //narrowdown to n results
  const closeset = sentences.slice(0, n);

  //fetch sentences from json
  let closestKeys = Object.keys(closeset);
  for (let i = 0; i < closestKeys.length; i++) {
    sentencesResults.push(embedings[closeset[i].wordKey].message);
  }

  const sentimentResults = [];

  for (let i = 0; i < sentencesResults.length; i++) {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(sentencesResults[i]);
    // console.log(result);    // Score: -2, Comparative: -0.666
    sentimentResults.push(result.score);

  }

  const similarityObject = {
    sentences: sentencesResults,
    sentiment: sentimentResults
  }

  return similarityObject;
}

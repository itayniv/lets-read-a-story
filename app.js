/* eslint-disable */
const express = require('express');
const http = require('http');
const path = require('path');
const io = require('socket.io');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');
const fetch = require('node-fetch');
const universalSentenceEncoder = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs-node')
const nlp = require('compromise')


global.fetch = require('node-fetch');


// require the Sentence2Vec class
const Sentence2Vec = require('./sentence2vec.js')

// console.log(Sentimentjs);

const embedings = require('./public/similarities-lite.json')

const userID = 0;

let model;

const app = express();
let server = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const port = process.env.PORT || 3000;
// const sentimentjs = new Sentimentjs();

function init() {
  universalSentenceEncoder.load().then(universalEncoderModel => {
    model = universalEncoderModel;
  });
}

init();


function testingStories(sent, storyArr) {
  const seedSentance = sent;
  const currStory = storyArr;

  let promise = new Promise((resolve, reject) => {
    const storyVectors = getStoryVectors(currStory);
    if (storyVectors.length > 0) {
      resolve(storyVectors);
    } else {
      reject('failed');
    }
  })

  promise.then((storyVectors) => {
    // similar Story
    const similarStory = vectorVariation(currStory, seedSentance, storyVectors);
    const similarAndSentiment = addSentimentToArray(similarStory);

    const similarStoryObject = {
      'sentiment': similarAndSentiment,
      'seed': seedSentance
    }
    // sockets.emit('restOfStory', similarStoryObject);
  });

}

server = app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});

// socket work

const sockets = io(server);
// configure socket handlers
sockets.on('connection', function (socket) {


  const currClient = socket.id;

  socket.on('roomEntered', function (room) {
    socket.join(room);
    // var roster = io.sockets.clients(room);
    // console.log('people in the room', roster);
  });


  // recieving seed text and generating a whole story / a single sentence  --->
  socket.on('sendSeedSentance', function (data) {
    const seedSentance = data.randomSentance;
    const currStory = data.originalStory;
    const currRoom = data.roomNumber;

    console.log('got a room number', currRoom);
    socket.join(currRoom);

    let promise = new Promise((resolve, reject) => {
      const storyVectors = getStoryVectors(currStory);
      if (storyVectors.length > 0) {
        resolve(storyVectors);
      } else {
        reject('failed');
      }
    })

    promise.then((storyVectors) => {
      // similar Story
      const similarStory = vectorVariation(currStory, seedSentance, storyVectors);
      const similarAndSentiment = addSentimentToArray(similarStory);

      const similarStoryObject = {
        'sentiment': similarAndSentiment,
        'seed': seedSentance
      }

      // working -->
      // sockets.emit('similarStory', similarStoryObject);
      sockets.in(currRoom).emit('similarStory', similarStoryObject);



      // sockets.emit(currClient).emit('similarStory', similarStoryObject);

    });

    // similar Sentences
    let similarSentences = findVector(seedSentance);
    // console.log(similarSentences);

    // sockets.in(currRoom).emit('similarStory', similarStoryObject);
    // sockets.emit('similarStory', similarStoryObject);
  });

  // when New Prompt and Story is here

  socket.on('sendNewStoryFromPrompt', function (data) {

    const seedSentance = data.randomSentance;
    const currStory = data.originalStory;    

    let promise = new Promise((resolve, reject) => {
      const storyVectors = getStoryVectors(currStory);
      if (storyVectors.length > 0) {
        resolve(storyVectors);
      } else {
        reject('failed');
      }
    })

    promise.then((storyVectors) => {
      // similar Story
      const similarStory = vectorVariation(currStory, seedSentance, storyVectors);
      const similarAndSentiment = addSentimentToArray(similarStory);

      const similarStoryObject = {
        'sentiment': similarAndSentiment,
        'seed': seedSentance
      }
      // sockets.emit('restOfStory', similarStoryObject);
      sockets.in(data.roomNumber).emit('restOfStory', similarStoryObject);
    });
  });


  //// --- > finish

  socket.on('sendNextSentance', function (data) {

    const seedSentance = data.randomSentance;
    const currStory = data.originalStory;

    // console.log('next sentence --->', seedSentance);

    // promise for next line in stroy

    let getVectors = new Promise((resolve, reject) => {
      const sentVectors = getStoryVectors(currStory);
      if (sentVectors.length > 0) {
        resolve(sentVectors);
      } else {
        reject('failed');
      }
    })

    getVectors.then((sentVectors) => {
      // vector next sentence
      const nextLine = nextLineVector(currStory, seedSentance, sentVectors);
      const similarAndSentiment = addSentimentToArray(nextLine);
      const nextLineVec = {
        'sentiment': similarAndSentiment,
        'seed': seedSentance
      }

      // sockets.emit('nextVectoredLine', nextLineVec);
      //emit room here
      sockets.in(data.roomNumber).emit('nextVectoredLine', nextLineVec);

      // console.log('usecase 02', nextLineVec);
    });
  });

  // get nextsentence vector <---


  // get similar sentence on dead end -->

  socket.on('getSimilarSentence', function (data) {

    const seedSentance = data.randomSentance;
    // const currStory = data.originalStory;

    // console.log('%$%$%$%', seedSentance)


    let similarSentences = findVector(seedSentance[0]);
    // console.log('similarSentences', similarSentences);

    const sentenceAndSentiment = {
      sentences: [similarSentences.sentences[1]],
      sentiment: [similarSentences.sentiment[1]]
    }

    // console.log('** object 1', sentenceAndSentiment);

    const similarLine = {
      'sentiment': sentenceAndSentiment,
      'seed': similarSentences.sentences[2]
    }
    // console.log('** object 2', similarLine);

    sockets.in(data.roomNumber).emit('nextVectoredLine', similarLine);

    // console.log('usecase 01', similarLine);
  });

  // get similar sentence on dead end <---


  socket.on('sendNewPrompt', async function (data) {
    // console.log(data.newPrompt)
    const newSimilarity = await getNewEmbedding(data.newPrompt);
    // console.log(newSimilarity);
    // sockets.emit('promptEmbedResults', newSimilarity);
    sockets.in(data.roomNumber).emit('promptEmbedResults', newSimilarity);


  });


  socket.on('recieveStory', function (data) {
    const storyArr = data;
    // console.log(storyVectors);
    // sockets.emit('NewStoryVector', similarSentences);
  });


  //
  socket.on('sentenceToEmbed', async function (data) {

    const newSimilarity = await getNewEmbedding(data.setenceToEmbed);
    sockets.in(data.roomNumber).emit('sentenceToEmbedResults', newSimilarity);

    // sockets.emit('sentenceToEmbedResults', newSimilarity);

  });

  socket.on('disconnect', () => {
    // remove the room
  });

});



// end socket work


async function getNewEmbedding(text) {
  const embeddings = await model.embed(text);
  let embeddingsData = embeddings.arraySync();
  const nearestArr = findNearestandAdd(embeddingsData);
  return nearestArr;
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
    sentimentResults.push(result.score);

  }

  const similarityObject = {
    sentences: sentencesResults,
    sentiment: sentimentResults
  }

  return similarityObject;
}


function getStoryVectors(story) {


  const storyArray = story;

  let storyEmbedding = [];

  // get all messeges and embeddings in the story and push to array

  for (let index = 0; index < storyArray.length; index++) {
    for (let i = 0; i < Object.keys(embedings).length; i++) {
      if (embedings[i].message === storyArray[index]) {

        // create an object containing all the information for a line of content
        const thisInformation = {
          'sentence': embedings[i].message,
          'embedding': embedings[i].message_embedding,
          'vector': ''
        };
        storyEmbedding.push(thisInformation);
      }
    }
  }

  // prepare a vector progression of all sentences and save in 'vector'

  for (let i = 0; i < Object.keys(storyEmbedding).length; i++) {
    if (i != 0) {
      const thisVector = subtract(storyEmbedding[i - 1].embedding, storyEmbedding[i].embedding);
      storyEmbedding[i - 1].vector = thisVector;
    }
  }
  // const resultofAdd = add(storyEmbedding[0].embedding, storyEmbedding[0].vector)
  // const thisDistance = findNearestVector(resultofAdd, n = 2)
  // reconstruct story from vectors
  return storyEmbedding;
}


// variations on the story based on nearrest neighbourse
function vectorVariation(pickedStory, seedSent, VectorsObject) {
  // get vector of seed sentence
  let seedindex;
  const vectors = [];

  for (let i = 0; i < pickedStory.length; i++) {
    if (pickedStory[i] === seedSent) {
      seedindex = i
    }
  }

  for (let i = 0; i < Object.keys(VectorsObject).length; i++) {
    vectors.push(VectorsObject[i].vector);
  }

  let newStory = [];
  // generate new story

  for (let i = 0; i < pickedStory.length; i++) {
    const tempVector = subtract(VectorsObject[i].embedding, vectors[i]);
    const nearestSentance = findNearestVector(tempVector, n = 2);

    newStory.push(nearestSentance.sentences[1]);
  }

  newStory.unshift(seedSent);
  // TODO get a sentence vector on original sentances from other stories.

  // let indexToRemove = 0;

  // newStory.splice(indexToRemove, seedindex);

  // for (let index = 0; index < newStory.length; index++) {
  //   const element = newStory[index];
  // }

  return newStory;
  // const vector3 = add(VectorsObject[0].embedding, vectors[0]);
  // const vector4 = subtract(VectorsObject[0].embedding, vectors[0]);
  // const sent3 = findNearestVector(vector3, n = 4);
  // const sent4 = findNearestVector(vector4, n = 4);
  // reconstruct the story
}


// variations on the story based on nearrest neighbourse
function nextLineVector(pickedStory, seedSent, VectorsObject) {
  // get vector of seed sentence

  let seedindex;
  const vectors = [];

  for (let i = 0; i < pickedStory.length; i++) {
    if (pickedStory[i] === seedSent) {
      seedindex = i
    }
  }

  for (let i = 0; i < Object.keys(VectorsObject).length; i++) {
    vectors.push(VectorsObject[i].vector);
  }

  let newSentance = [];

  // generate new sentence

  if ((VectorsObject[seedindex].embedding) && (vectors[seedindex])) {

    const tempVector = subtract(VectorsObject[seedindex].embedding, vectors[seedindex]);
    const nearestSentance = findNearestVector(tempVector, n = 2);

    newSentance.push(nearestSentance.sentences[1]);
  } else {
    // find nearest vector and return
    const thisNearest = findNearestVector(VectorsObject[seedindex].embedding, n = 2);
    newSentance.push(thisNearest.sentences[1]);

  }

  return newSentance;
}


function findNearestVector(vector, n = 2) {
  let sentencesResults = [];
  let sentences = [];

  let keys = Object.keys(embedings);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let d = Sentence2Vec.distance(vector, embedings[key].message_embedding);
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


// Subtract two word vectors

function subtract(v1, v2) {
  return v1.map((a, i) => a - v2[i]);
}


// Add two word vectors

function add(v1, v2) {
  return v1.map((a, i) => a + v2[i]);
}


function addSentimentToArray(recievedArr) {

  const sentimentResults = [];

  for (let i = 0; i < recievedArr.length; i++) {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(recievedArr[i]);
    // console.log(result);    // Score: -2, Comparative: -0.666
    sentimentResults.push(result.score);

  }

  const storyTopics = getTopics(recievedArr);

  const sentenceAndSentiment = {
    sentences: recievedArr,
    sentiment: sentimentResults,
    compromise: storyTopics
  }

  return sentenceAndSentiment;
}

function getTopics(array) {

  let storyTopics = [];

  const thisStory = array.join(' ');
  // const thisNLPPeople = nlp(thisStory).topics().slice(0, 50).out('frequency');
  // const thisNLPPeople1 = nlp(thisStory).verbs().slice(0, 50).out('frequency');
  // const thisNLPPeople2 = nlp(thisStory).people().slice(0, 50).out('frequency');
  const thisNLPPeople3 = nlp(thisStory).nouns().slice(0, 50).out('frequency');


  for (let index = 0; index < thisNLPPeople3.length; index++) {
    const element = thisNLPPeople3[index].normal;
    if (storyTopics.includes(element) === false) {
      storyTopics.push(element);
    }
  }


  let doc = nlp(thisStory)
  let topics = doc.topics().data();


  for (let index = 0; index < topics.length; index++) {
    const element = topics[index].text;
    if (storyTopics.includes(element) === false) {
      storyTopics.push(element);
    }
  }
  return storyTopics;
}


function findNearestandAdd(embeding) {
  const closest = findNearestVector(embeding[0], n = 4)
  return closest;
}

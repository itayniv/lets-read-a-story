// Word Vectors
// Based on: https://github.com/turbomaze/Sentence2Vecjson

class Sentence2Vec {

  static magnitude(a) {
    let sum = a.reduce((sum, val) => {
      return sum + val*val;
    }, 0);
    return Math.sqrt(sum);
  }

  // Cosine similarity!
  static distance(v1, v2) {
    // Check if v1 or v2 is a string then grab vector?
    // let v1 = wordVecs[word1];
    // let v2 = wordVecs[word2];

    let sum = v1.reduce((sum, a, i) => {
      return sum + a * v2[i];
    }, 0);
    return sum / (this.magnitude(v1) * this.magnitude(v2)); //magnitude is 1 for all feature vectors
  }

  // Add two word vectors
  static add(v1, v2) {
    return v1.map((a, i) => a + v2[i]);
  }

  // Subtract two word vectors
  static subtract(v1, v2) {
    return v1.map((a, i) => a - v2[i]);
  }

  // Average of two word vectors
  static average(v1, v2) {
    return v1.map((a, i) => (a + v2[i]) * 0.5);
  }

  static nearest(word, n=10) {
    let vec;
    if (word instanceof Array) {
      vec = word;
    } else {
      if (!wordVecs[word]) {
        return undefined;
      } else {
        vec = wordVecs[word];
      }
    }
    let words = [];
    let keys = Object.keys(wordVecs);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let d = this.distance(vec, wordVecs[key]);
      words.push({word: key, distance: d});
    }
    words.sort((a, b) => {
      return b.distance - a.distance;
    });
    return words.slice(0, n);
  }
}


module.exports = Sentence2Vec;

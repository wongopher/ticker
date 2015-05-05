// constructor function
function Ticker(settings) {
  // establish default settings
  this.freeze     = settings.freeze || 1500;
  this.speed      = settings.speed || Math.ceil(Math.random() * 50) + 50;
  this.words      = settings.words || ['You need to pass a word array into your Ticker instance'];
  this.settings   = settings;
  this.elem       = document.getElementById(settings.elementID) || document.getElementById('ticker');
  this.prevWord   = '';

  // set up styling -- need to move this out of the library code!!!
  if (settings.underline == true) this.elem.style.borderBottom = '2px solid #777';

  return this;
}

Ticker.prototype = {

  // prints individual characters
  scribe: function (currentWord, i, speed) {
    var self = this;
    var typeSpeed = speed;

    if (currentWord.length > i) { // print chars for length of word
      self.elem.innerHTML += currentWord[i];
      ++i;

      setTimeout(function(){
        self.scribe(currentWord, i, self.speed);
      }, typeSpeed);

    } else { // reset at end of length
      self.addedDelay = 0;
      if (self.settings.highlight == true) {
        self.addedDelay = 1000;
        setTimeout(function(){
          self.elem.style.backgroundColor = '#777';
          self.elem.style.color = '#fff';
        }, self.freeze);
      }

      setTimeout(function(){
        self.elem.innerHTML = '';
        setTimeout(function(){
          self.elem.style.backgroundColor = 'transparent';
          self.elem.style.color = '#777';
          self.start();
        }, self.freeze);
      }, self.freeze + self.addedDelay);

    }
  },

  // initiates a new word
  start: function () {
    var randNum = Math.floor(Math.random() * this.words.length);
    var currentWord = this.words[randNum];

    //check if new word is same as previous word
    if (currentWord == this.prevWord) currentWord = this.words[randNum + 1] || this.words[randNum - 1];
    this.prevWord = currentWord;
    var i = 0;
    this.scribe(currentWord, i, this.speed);
  }

}
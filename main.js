// constructor function
(function(win){
  'use strict';

  function Ticker(settings) {
    // establish default settings
    this.freeze     = settings.freeze || 1500;
    this.speed      = settings.speed || Math.ceil(Math.random() * 50) + 50;
    this.words      = settings.words || ['You need to pass a word array into your Ticker instance'];
    this.highlight  = settings.highlight || undefined;
    this.settings   = settings;
    this.elem       = document.getElementById(settings.elementID) || document.getElementById('ticker');
    this.prevWord   = '';

    // set up styling -- need to move this out of the library code!!!
    if (settings.underline === true) this.elem.style.borderBottom = '2px solid #777';

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
        if (self.highlight !== undefined) {
          self.addedDelay = 1000;
          setTimeout(_highlight.bind(self, false), self.freeze);
        }

        setTimeout(function(){
          self.elem.innerHTML = '';
          setTimeout(_highlight.bind(self, true), self.freeze);
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

  };

  function _highlight(dehighlight) {
    console.log(dehighlight);
    if (dehighlight) {
      var currentClasses = this.elem.className;

      if (currentClasses == this.highlight) {
        this.elem.className = '';
        return;
      }

      var currentClassesArray = currentClasses.split(' ');
      var preservedList = [];

      for (var i = 0; i < currentClassesArray.length; i++) { // note to self: change this to forEach... will need to figure out how to bind Ticker as "this" within forEach
        if (currentClassesArray[i] !== this.highlight) {
          preservedList.push(currentClassesArray[i]);
        }
      };

      this.elem.className = preservedList.join(' ');

      this.start();
    } else {
      console.log(this.highlight);
      this.elem.className += ' ' + this.highlight;
    }
  }

  // Expose Ticker to global scope
  win.Ticker = Ticker;
  
})(window);
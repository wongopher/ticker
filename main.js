function Ticker(settings) {
	this.freeze = settings.freeze;
	this.speed = settings.speed;
	this.words = settings.words;
	this.settings = settings;
	this.elem = document.getElementById(settings.elementID);

	if (settings.underline == true) this.elem.style.borderBottom = '2px solid #000';

	return this;
}

Ticker.prototype = {

	// prints individual characters
	scribe: function (currentWord, i, speed) {
		var _self = this;
		var typeSpeed = speed || Math.ceil(Math.random() * 50) + 50;

		if (currentWord.length > i) { // print chars for length of word
			_self.elem.innerHTML += currentWord[i];
			++i;

			setTimeout(function(){
				_self.scribe(currentWord, i, _self.speed);
			}, typeSpeed);

		} else { // reset at end of length
			_self.addedDelay = 0;
			if (_self.settings.highlight == true) {
				_self.addedDelay = 1000;
				setTimeout(function(){
					_self.elem.style.backgroundColor = '#000';
					_self.elem.style.color = '#fff';
				}, _self.freeze);
			}

			setTimeout(function(){
				_self.elem.innerHTML = '';
				setTimeout(function(){
					_self.elem.style.backgroundColor = 'transparent';
					_self.elem.style.color = '#777';
					_self.start();
				}, _self.freeze);
			}, _self.freeze + _self.addedDelay);

		}
	},

	// initiates a new word
	start: function () {
		var randNum = Math.floor(Math.random() * this.words.length);
		var currentWord = this.words[randNum];
		var i = 0;
		this.scribe(currentWord, i, this.speed);
	}

}
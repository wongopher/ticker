function Ticker(settings) {
	this.freeze = settings.freeze;
	this.speed = settings.speed;
	this.words = settings.words;
	this.elem = document.getElementById(settings.elementID);

	if (settings.underline == true) this.elem.style.borderBottom = "1px solid #000";

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
			setTimeout(function(){
				_self.elem.innerHTML = '';
				setTimeout(function(){
					_self.start();
				}, _self.freeze);
			}, _self.freeze);
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
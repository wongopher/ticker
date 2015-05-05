# ticker
A simple Javascript library that emulates a digital signage ticker from an array of strings. <a href="http://wongopher.github.io/ticker">DEMO</a>

# Options
Param | Option
------|--------
words (_array_) | Array of words to be shown in the ticker
speed (_int_) | Delay between each character entered in milliseconds (default: randomized typing speed per char)
freeze (_int_) | Duration of pause before and after word entry in milliseconds (default: 1500 ms)
elementID (_string_) | The ID of the ticker DOM element (default: 'ticker')
underline (_boolean_) | If true, shows an underline (default: false)
highlight (_boolean_) | If true, will highlight the ticker word before it gets removed (default: false)
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.anotherZalgo = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    // code partially adapted from https://github.com/generaltso/zalgo
    // just cleaned up a bit and modernized
    var chars = {
        up: [
            '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311',
            '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307',
            '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a',
            '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
            '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313',
            '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365',
            '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b',
            '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b',
            '\u0346', '\u031a'
        ],
        down: [
            '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d',
            '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326',
            '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e',
            '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339',
            '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348',
            '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355',
            '\u0356', '\u0359', '\u035a', '\u0323'
        ],
        middle: [
            '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321',
            '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336',
            '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360',
            '\u0362', '\u0338', '\u0337', '\u0361', '\u0489'
        ]
    };

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // rand zalgo char
    function randChar(direction) {
        var arraytouse = chars[direction];
        return arraytouse[randInt(0, arraytouse.length - 1)];
    }

    // to check if the zalgo char exists
    var lookupstring = chars.up.join("") + chars.down.join("") + chars.middle.join("");

    function stringForEach(string, func) {
        // im sure tempted, but IE... you should die
        // Array.from(text).forEach(func);
        for (var q = 0; q < string.length; q++) {
            func(string.charAt(q));
        }
    }

    function zalgoIt(text, level, directionsettings) {
        var newtext = "";
        stringForEach(text, function(char) {
            if (lookupstring.indexOf(char) !== -1) return;
            newtext += char;
            var num_up, num_mid, num_down;
            if (level !== null && typeof level === 'object') {
                num_up = randInt(level.up.min, level.up.max);
                num_mid = randInt(level.middle.min, level.middle.max);
                num_down = randInt(level.down.min, level.down.max);
            } else if (level === 1) {
                num_up = randInt(1, 4);
                num_mid = randInt(0, 2);
                num_down = randInt(1, 4);
            } else if (level === 2) {
                num_up = randInt(2, 6);
                num_mid = randInt(1, 3);
                num_down = randInt(2, 6);
            } else if (level === 3) {
                num_up = randInt(3, 8);
                num_mid = randInt(2, 4);
                num_down = randInt(3, 8);
            } else if (level === 4) {
                num_up = randInt(4, 10);
                num_mid = randInt(3, 5);
                num_down = randInt(4, 10);
            } else if (level === 5) {
                num_up = randInt(5, 12);
                num_mid = randInt(4, 6);
                num_down = randInt(5, 12);
            }

            if (directionsettings.indexOf('up') !== -1) {
                for (var i = 0; i < num_up; i++) {
                    newtxt += randChar("up");
                }
            }
            if (directionsettings.indexOf('middle') !== -1) {
                for (var i = 0; i < num_mid; i++) {
                    newtxt += randChar("middle");
                }
            }
            if (directionsettings.indexOf('down') !== -1) {
                for (var i = 0; i < num_down; i++) {
                    newtxt += randChar("down");
                }
            }
        });
        return newtxt;
    }
    return {};
}));
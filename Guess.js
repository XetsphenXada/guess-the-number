/*
let higherOrLower
let numLow = 1
let numHigh = 100
let guess = Math.random(numLow to numHigh)
let numGuessed = 0

while (numGuessed < 1) {
    let isCorrect = await ask(`Is it ${guess}? Yes (Y) or No (N)?`);
    if (isCorrect == string) {
        if (isCorrect.toLowerCase() === "yes") {
            isCorrect = "y";
            break
        } else if (isCorrect.toLowerCase() === "y") {
            break
        } else if (isCorrect.toLowerCase() === "no") {
            isCorrect = "n";
            break
        } else if (isCorrect.toLowerCase() === "n") {
            break
        } else {
            console.log("Please give me a proper response");
        };
    } else {
            console.log("Please give me a proper response");
    };

    if (isCorrect === "y") {
        console.log(`$(guess) was correct!`)
        numGuessed = 1;
        break
    } else {
        higherOrLower = await ask ("Is it Higher (H) or Lower (L)?");
    };

    if (higherOrLower == string) {
        if (higherOrLower.toLowerCase() === "higher") {
            higherOrLower = "h";
            break
        } else if (higherOrLower.toLowerCase() === "high") {
            higherOrLower = "h";
            break
        } else if (higherOrLower.toLowerCase() === "h") {
            break
        } else if (higherOrLower.toLowerCase() === "lower") {
            higherOrLower = "l";
            break
        } else if (higherOrLower.toLowerCase() === "low") {
            higherOrLower = "l";
            break
        } else if (higherOrLower.toLowerCase() === "l") {
            break
        } else {
            console.log("Please give me a proper response");
        };
    } else {
            console.log("Please give me a proper response");
    };

    if (higherOrLower === "h") {
        numLow = guess + 1
        break
    } else {
        numHigh = guess - 1
        break
    };

    guess = Math.random(numLow to numHigh)
}
*/

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let guess
let higherOrLower
let numLow = 1
let numHighD = 0
let numHigh = 10
let numGuessed = 0
let passFlag = 0
let guessCount = 0
let badInput = `Please give me a proper response.`
let isCorrect
let arrYes = [`yes`, `y`, `correct`, `c`]
let arrNo = [`no`, `n`, `incorrect`, `i`]
let arrHigher = [`higher`, `high`, `h`]
let arrLower = [`lower`, `low`, `l`]


function getNarrowInt(min, max) {
    let x = max - min
    let y = x / 2
    return parseInt(y);
}

// grabs a random integer between the lowest and highest variable options
function getRandomInt(min, max) {
    let minimum = Math.ceil(numLow);
    let maximum = Math.floor(numHigh);
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

// stops player declaring "No" when no more guesses are available and the computer won
function cheatCatch() {
    if (numLow == guess && guess == numHigh) {
        console.log(`Before you said the number was higher than ${numLow - 1}, but lower than ${numHigh + 1}. That only leaves ${guess}! You're trying to cheat! I know I won: ${guess} is the right answer!`)
        return true
    } else {
        return false
    }
}

// stops player from declaring answer is higher or lower than previously stated bookends
function cheatCheck() {
    if (higherOrLower == `h` && guess >= numHigh) {
        if (guess == 10) {
             console.log(`I said pick a number between 1 and ${numHigh}--play fairly!`)
             return true
        } else {
             console.log(`You said the number was lower than ${numHigh + 1}, so it can't be higher than ${numHigh} now! No cheating!`)
             return true
        }
    } else if (higherOrLower == `l` && guess <= numLow) {
        if (guess == 1) {
             console.log(`You have to pick a number that is 1 or ABOVE! Follow the rules!`)
             return true
        } else {
             console.log(`The number can't be lower than ${numLow} when you said it was higher than ${numLow - 1} before! No tomfoolery!`)
             return true
        }
    } else {
        return false
    }
} 

function notAcceptable() {
    if (arrHigher.includes(higherOrLower)) {
        return false
    } else if (arrLower.includes(higherOrLower)) {
        return false
    } else {
        return true
    }
}

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

start();

async function start() {
    // let player declare high end for number range
    while (numHighD <= 1) {
        numHighD = await ask(`Please input a number greater than 1 to represent the max range for this game. `);
        if (numHighD <= 1) {
            console.log(`The max number needs to be higher than one.`)
        } else {
            numHigh = numHighD
        }
    }

    console.log(`Let's play a game where you (player) pick a number between 1 and ${numHighD} and I (computer) try to guess it.`)
    // let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    // console.log('You entered: ' + secretNumber);
    //Now try and complete the program.

    while (numGuessed < 1) {
        console.log(numHigh - numLow)
        if (getNarrowInt(numLow, numHigh) < numLow) {
            guess = getRandomInt(numLow, numHigh)
        } else if (getNarrowInt(numLow, numHigh) > numHigh) {
            guess = getRandomInt(numLow, numHigh)
        } else if (numHigh - numLow > 10) {
            guess = getNarrowInt(numLow, numHigh)
        } else {
            guess = getRandomInt(numLow, numHigh)
        }

        while (passFlag == 0) {
            isCorrect = await ask(`Is it ${guess}? Yes (Y) or No (N)? `);
            if (typeof isCorrect == `string`) {
                if (arrYes.includes(isCorrect.toLowerCase())) {
                    isCorrect = `y`;
                    passFlag = 1;
                } else if (arrNo.includes(isCorrect.toLowerCase())) {
                    isCorrect = `n`;
                    passFlag = 1;
                } else {
                    console.log(badInput);
                };
            } else {
                    console.log(badInput);
            };
        };

        while (passFlag == 1) {
            if (isCorrect === `y`) {
                guessCount += 1;
                console.log(`${guess} was correct!`);
                console.log(`Total Guesses: ${guessCount}`);
                passFlag = 0;
                numGuessed = 1;
            } else {
                if (cheatCatch() == true) {
                    isCorrect = `y`;
                    numGuessed = 1;
                    break
                } else {
                higherOrLower = await ask (`Is it Higher (H) or Lower (L)? `);
                }
            };

            if (typeof higherOrLower == `string`) {
                if (arrHigher.includes(higherOrLower.toLowerCase())) {
                    higherOrLower = `h`;
                } else if (arrLower.includes(higherOrLower.toLowerCase())) {
                    higherOrLower = `l`;
                } else {
                    console.log(badInput);
                };
            } else if (isCorrect === `y`) {
                break
            } else {
                    console.log(badInput);
            };

            if (cheatCheck() == true) {
                passFlag = 1;
            } else if (notAcceptable()) {
                passFlag = 1;
            } else {
                passFlag = 2;
            }
        }
        
        while (passFlag == 2) {
            if (higherOrLower === `h`) {
                guessCount += 1;
                numLow = guess + 1;
                passFlag = 0;
                higherOrLower = null
            } else {
                guessCount += 1;
                numHigh = guess - 1;
                passFlag = 0;
                higherOrLower = null
            };
        }
    }

    process.exit();
}
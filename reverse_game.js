/*
while (numHigh <= 1) {
        numHigh = await ask(`Please input a number greater than 1 to represent the max range for this game. `);
        if (numHigh <= 1) {
            console.log(`The max number needs to be higher than one.`);
        }
    }

numCorrect = getRandomInt(numLow, numHigh)

console.log(`I (computer) am going to pick a number between 1 and ${numHigh}, and you (player) have to try to guess that number. If you guess incorrectly I will let you know if the number I picked is higher or lower than your guess! Ready to start?`)

while (numGuessed < 1) {
    guess = await ask(`What's your guess? `)

    if (guess > numCorrect) {
        console.log(`Sorry, that's not the number I picked! Try guessing lower!`);
        guessCount += 1;
    } else if (guess < numCorrect) {
        console.log(`Sorry, that's not the number I picked! Try guessing higher!`);
        guessCount += 1;
    } else {
        console.log(`Wow, you got it! The number I picked was ${guess}!`)
        numGuessed = 1;
    }

}
*/


const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let input
let guess
let numLow = 1
let numHighD = 0
let numHigh = 0
let numGuessed = 0
let passFlag = 0
let numCorrect
let guessCount = 0


// Grabs a random integer between the lowest and highest variable options
function getRandomInt(min, max) {
    let minimum = Math.ceil(numLow);
    let maximum = Math.floor(numHigh);
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

// Stops player declaring "No" when no more guesses are available and the computer won
function outsideRange(value) {
    if (value < 1) {
        console.log(`The number is going to be 1 at the minimum!`);
        return true
    } else if (value > numHighD) {
        console.log(`The number won't be any higher than the cap of ${numHighD}!`)
        return true
    } else if (value <= numLow && numLow != 1) {
        console.log(`I said it was bigger than ${numLow}! Try guessing higher!`);
        return true
    } else if (value >= numHigh && numHigh != numHighD) {
        console.log(`I said it was smaller than ${numHigh}! Try guessing lower!`);
        return true
    } else {
        return false
    }
}

function isNumber(value) {
    if (isNaN(value)) {
        return false
    } else {
        return true
    }
}
 
// Function to ask player questions
function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

start();

async function start() {
    // Let player declare high end for number range
    while (numHigh <= 1) {
        input = await ask(`Please input a number greater than 1 to represent the max range for this game. `);

        numHighD = parseInt(input);
        numHigh = numHighD

        if (isNumber(numHigh)) {
            if (numHigh <= 1) {
                console.log(`The max number needs to be higher than one.`);
            }
        } else {
            console.log(`Please enter an actual number.`)
            numHigh = 0;
        }
    }

    // Computer picks random number to be guessed
    numCorrect = getRandomInt(numLow, numHigh)

    // Game Start
    console.log(`For this game, I (computer) am going to pick a number between 1 and ${numHigh}, and you (player) have to try to guess that number. If you guess incorrectly, I will let you know if the number I picked is higher or lower than your guess! Lastly--no decimals! They will be rounded down if entered. Ready to start?`)
    
    // console.log(numCorrect)

    while (numGuessed < 1) {
        while (passFlag == 0) {
            // console.log(numLow)
            // console.log(numHigh)
            // console.log(numHighD)
            
            input = await ask(`What's your guess? `);

            guess = parseInt(input);

            if (isNumber(guess) == false) {
                console.log(`Please only input numbers as a guess.`)
            } else {
                passFlag = 1
            }
        }

        while (passFlag == 1) {
            if (outsideRange(guess) == true) {
                passFlag = 0
            } else {
                passFlag = 2
            }
        }

        while (passFlag == 2)
            if (guess > numCorrect) {
                guessCount += 1;
                console.log(`Sorry, ${guess} is not correct! Try guessing lower!`);
                numHigh = parseInt(guess);
                passFlag = 0;
            } else if (guess < numCorrect) {
                guessCount += 1;
                console.log(`Sorry, ${guess} is not correct! Try guessing higher!`);
                numLow = parseInt(guess);
                passFlag = 0;
            } else if (guess == numCorrect) {
                guessCount += 1;
                console.log(`Wow, you got it! The correct number was ${guess}!`)
                console.log(`Total Guesses: ${guessCount}`);
                passFlag = 3;
                numGuessed = 1;
            };
    };

    process.exit();
}
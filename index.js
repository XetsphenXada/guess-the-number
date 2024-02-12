const { exit } = require('process');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// VARIABLES LIST
let gameStateActive = true
let game = 0
let menuOption
let exitGame = false
let arrGameOne = [`game one`, `one`, `1`, 1]
let arrGameTwo = [`game two`, `two`, `2`, 2]
let guess
let higherOrLower
let numLow = 1
let numHighD = 0
let numHigh = 0
let numGuessed = 0
let passFlag = 0
let guessCount = 0
let input = undefined
let numCorrect
let badInput = `Please give me a proper response.`
let isCorrect
let arrYes = [`yes`, `y`, `correct`, `c`]
let arrNo = [`no`, `n`, `incorrect`, `i`]
let arrHigher = [`higher`, `high`, `h`]
let arrLower = [`lower`, `low`, `l`]

// FUNCTIONS LIST
// checks for input to return to menu
function mainMenuCheck(name) {
    let isMenu = String(name).toLowerCase();
    if (isMenu == "menu") {
        return true;
    } else {
        return false;
    }
}

// checks for input to exit file
function exitCheck(name) {
    let isExit = String(name).toLowerCase()
    if (isExit == "exit") {
        return true;
    } else {
        return false;
    }
}

// resets base variables to default values
function resetValues() {
    game = 0
    menuOption = undefined
    exitGame = false
    guess = undefined
    higherOrLower = undefined
    numLow = 1
    numHighD = 0
    numHigh = 0
    numGuessed = 0
    passFlag = 0
    guessCount = 0
    isCorrect = undefined
    input = undefined
    numCorrect = undefined
}

// narrows down guess range by half
function getNarrowInt(min, max) {
    let x = max - min
    let y = x / 2
    return parseInt(y);
}

// grabs a random integer between lowest and highest options
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

// checks for acceptable responses
function notAcceptable() {
    if (arrHigher.includes(higherOrLower)) {
        return false
    } else if (arrLower.includes(higherOrLower)) {
        return false
    } else {
        return true
    }
}

// Stops player inputs outside of numerical range
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

// checks if value is number
function isNumber(value) {
    if (isNaN(value)) {
        return false
    } else {
        return true
    }
}

// allows player input
function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

// PROGRAM
// start of actual program
start();

async function start() {

    while (gameStateActive) {

        // ------------------- MAIN MENU -------------------
        while (game == 0) {
            exitGame = false
            menuOption = await ask(`Welcome to the Menu! At any time you can enter "Menu" to return here, or "Exit" to exit this file. Would you like to play the Normal Game (1) where I guess, or the Reverse Game (2) where you guess? `);
            
            // check player input
            if (arrGameOne.includes(menuOption)) {
                game = 1;
            } else if (arrGameOne.includes(menuOption.toLowerCase())) {
                game = 1;
            } else if (arrGameTwo.includes(menuOption)) {
                game = 2;
            } else if (arrGameTwo.includes(menuOption.toLowerCase())) {
                game = 2;
            } else if (exitCheck(menuOption)) {
                game = 100;
                gameStateActive = false;
            } else {
                console.log(`\nRemember: you can say "Menu" to return here or "Exit" the exit the game at any point!`)
                console.log(``)
            }
        }

        // ------------------- GAME 1: NORMAL -------------------
        while (game == 1) {
            // let player declare high end for number range & check input
            while (numHighD <= 1) {
                numHighD = await ask(`\nPlease input a number greater than 1 to represent the max range for this game. `);
                if (mainMenuCheck(numHighD)) {
                    game = 100;
                    numhighD = 10;
                    exitGame = true;
                    numGuessed = 1;
                } else if (exitCheck(numHighD)) {
                    game = 100;
                    numHighD = 10;
                    gameStateActive = false
                    exitGame = true;
                    numGuessed = 1;
                } else if (numHighD <= 1) {
                    console.log(`The max number needs to be higher than one.`)
                } else {
                    numHigh = numHighD
                }
            }

            // inform player of rules
            if (exitGame == false) {
                console.log(`\nLet's play a game where you (player) pick a number between 1 and ${numHighD} and I (computer) try to guess it.`)
            }

            // loop until computer guesses player's number
            while (numGuessed < 1) {
                if (getNarrowInt(numLow, numHigh) < numLow) {
                    guess = getRandomInt(numLow, numHigh)
                } else if (getNarrowInt(numLow, numHigh) > numHigh) {
                    guess = getRandomInt(numLow, numHigh)
                } else if (numHigh - numLow > 10) {
                    guess = getNarrowInt(numLow, numHigh)
                } else {
                    guess = getRandomInt(numLow, numHigh)
                }

                //check player response 'yes/no' (and 'menu/exit')
                while (passFlag == 0) {
                    isCorrect = await ask(`Is it ${guess}? Yes (Y) or No (N)? `);
                    if (typeof isCorrect == `string`) {
                        if (mainMenuCheck(isCorrect)) {
                            game = 100;
                            passFlag = 10;
                            exitGame = true;
                            numGuessed = 1;
                            break
                        } else if (exitCheck(isCorrect)) {
                            game = 100;
                            passFlag = 10;
                            gameStateActive = false
                            exitGame = true;
                            numGuessed = 1;
                        } else if (arrYes.includes(isCorrect.toLowerCase())) {
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

                // confirm win or response 'higher/lower' (and 'menu/exit')
                while (passFlag == 1) {
                    if (isCorrect === `y`) {
                        guessCount += 1;
                        console.log(`\n${guess} was correct!`);
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

                    // check player response to previous inquiry
                    if (typeof higherOrLower == `string`) {
                        console.log(higherOrLower)
                        if (mainMenuCheck(higherOrLower)) {
                            game = 100;
                            passFlag = 10;
                            exitGame = true;
                            numGuessed = 1;
                        } else if (exitCheck(higherOrLower)) {
                            game = 100;
                            passFlag = 10;
                            gameStateActive = false
                            exitGame = true;
                            numGuessed = 1;
                        } else if (arrHigher.includes(higherOrLower.toLowerCase())) {
                            higherOrLower = `h`;
                        } else if (arrLower.includes(higherOrLower.toLowerCase())) {
                            higherOrLower = `l`;
                        } else {
                            console.log(badInput);
                        };
                        passFlag = 2;
                    } else if (isCorrect === `y`) {
                        break
                    } else {
                        console.log(badInput);
                    };

                    // check for fair play
                    if (passFlag == 10) {
                        break
                    } else if (cheatCheck() == true) {
                        passFlag = 1;
                    } else if (notAcceptable()) {
                        passFlag = 1;
                    } else {
                        passFlag = 2;
                    }
                }
            
                // track necessary variables and loop
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
            
            // give player option to play again, return to menu, or exit
            if (exitGame == false) {
                menuOption = await ask(`\nWould you like to play again? `);
                if (arrYes.includes(menuOption.toLowerCase())) {
                    resetValues()
                    game = 1;
                    console.log(``)
                } else if (arrNo.includes(menuOption.toLowerCase())) {
                    resetValues()
                    game = 0;
                    console.log(``)
                } else if (exitCheck(menuOption)) {
                    game = 100;
                    gameStateActive = false;
                    console.log(``)
                }
            } else if (gameStateActive == true) {
                resetValues()
                game = 0;
                console.log(``)
            } else {
                game = 0;
                console.log(``)
            }
        }

        // ------------------- GAME TWO: REVERSE -------------------
        while (game == 2) {
             // Let player declare high end for number range
            while (numHigh <= 1) {
                input = await ask(`\nPlease input a number greater than 1 to represent the max range for this game. `);

                numHighD = parseInt(input);
                numHigh = numHighD

                // check player input
                if (mainMenuCheck(input)) {
                    game = 100;
                    numhighD = 10;
                    exitGame = true;
                    numGuessed = 1;
                } else if (exitCheck(input)) {
                    game = 100;
                    numHighD = 10;
                    gameStateActive = false
                    exitGame = true;
                    numGuessed = 1;
                } else if (isNumber(numHigh)) {
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

            // inform player of rules
            if (exitGame == false) {
                console.log(`\nFor this game, I (computer) am going to pick a number between 1 and ${numHigh}, and you (player) have to try to guess that number. If you guess incorrectly, I will let you know if the number I picked is higher or lower than your guess! Lastly--no decimals! They will be rounded down if entered. Ready to start?`)
            }

            // loop until player guesses computer's number
            while (numGuessed < 1) {
                while (passFlag == 0) {
            
                    input = await ask(`What's your guess? `);

                    guess = parseInt(input);

                    // check player input
                    if (mainMenuCheck(input)) {
                        game = 100;
                        passFlag = 10;
                        exitGame = true;
                        numGuessed = 1;
                    } else if (exitCheck(input)) {
                        game = 100;
                        passFlag = 10;
                        gameStateActive = false
                        exitGame = true;
                        numGuessed = 1;
                    } else if (isNumber(guess) == false) {
                        console.log(`Please only input numbers as a guess.`)
                    } else {
                        passFlag = 1
                    }
                }

                // check for proper response
                while (passFlag == 1) {
                    if (outsideRange(guess) == true) {
                        passFlag = 0
                    } else {
                        passFlag = 2
                    }
                }  

                // check player guess and influence direction or confirm victory
                while (passFlag == 2) {
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
            }

            // give player option to play again, return to menu, or exit
            if (exitGame == false) {
                menuOption = await ask(`\nWould you like to play again? `);
                if (arrYes.includes(menuOption.toLowerCase())) {
                    resetValues()
                    game = 2;
                    console.log(``)
                } else if (arrNo.includes(menuOption.toLowerCase())) {
                    resetValues()
                    game = 0;
                    console.log(``)
                } else if (exitCheck(menuOption)) {
                    game = 100;
                    gameStateActive = false;
                    console.log(``)
                }
            } else if (gameStateActive == true) {
                resetValues()
                game = 0;
                console.log(``)
            } else {
                game = 0;
                console.log(``)
            }
        }
    }
    process.exit();
}

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

let higherOrLower
let numLow = 1
let numHigh = 100
let numGuessed = 0

start();

async function start() {
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
    let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    console.log('You entered: ' + secretNumber);
    let guess = await ask('guess a number! ')
    console.log('GUESS: ', guess)
    //Now try and complete the program.
    while(secretNumber !== guess) {
        if(guess < secretNumber) {
            guess = await ask('Sorry too low. Guess higher ')
        } else if(guess > secretNumber) {
            guess = await ask('Sorry too high. Guess lower ')
        }
    }
    console.log('you guessed it!')


    // secret number = 44
    // my guess secret number = 20
    // my guess is lower
    // Tell me to guess higher
      // console.log(guess higher)
    //
    process.exit();
}


// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);

// function ask(questionText) {
//     return new Promise((resolve, reject) => {
//         rl.question(questionText, resolve);
//     });
// }

// start();

// async function start() {
//     console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
//     let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
//     console.log('You entered: ' + secretNumber);
//     //Now try and complete the program.
//     process.exit();
// }
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

function lcText(name) {
    text = String(name).toLowerCase();
    return text
}

start();

async function start() {

    let guess = await ask('guess a number! ')
    
    console.log(guess)

    guess2 = lcText(guess)

    console.log(guess2)

    process.exit();
}
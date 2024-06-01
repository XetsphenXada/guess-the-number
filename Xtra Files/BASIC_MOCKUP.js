const readline = require('readline');
const rl = readline.createInterface(
    process.stdin,
    process.stdout
);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

function randomNumber(min, max) { //min and max are inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function run() {
    //introdue the user to the game
    console.log("Please think of a number between 1 and 100. I will try to guess it!");
    await ask("When you have thought of a number (don't tell me), hit enter!");
    
    //loop until the correct number  has been guessed
    let stillGuessing = true;
    let min = 1;
    let max = 100;
    while (stillGuessing) {
        //generate a guess
        let guess = randomNumber(tempMin, tempMax);
        let tempMin = min;
        let tempMax = max;
        do {
            //check if first response is valid
            let response = null
            do {
                if (response !== null) {
                    console.log("Bad input! PLease say either y or n.")
                }
                response = await ask(`Is your number ${guess}? (y/N) > `);
            } while (response !== "" && response.toLowerCase() !== "n" && response.toLowerCase() !== "y");
            
            //check if the guess was correct
            if (response.toLowerCase() === "y") { //guess was correct
                stillGuessing = false;
            } else { //guess was incorrect
                //check if the user lied and the guess has to be the correct number
                if (tempMin === tempMax) {
                    console.log(`Liar!!!!! ${guess} has to be your number!`);
                    stillGuessing = false;
                    break;
                }

                //check if second guess was valid
                let highLow = null;
                do {
                    if (highLow !== null) {
                        console.log("Bad input! Please say either h or l.");
                    }
                    highLow = await ask(`Is your number higher or lower than ${guess}? (h/l) > `);
                } while (highLow.toLowerCase() !== "h" && highLow.toLowerCase() !== "l");
            
                //check if guess was too high or too low
                if(highLow.toLowerCase() === "h") {
                    tempMin = guess + 1;
                } else if (highLow.toLowerCase() === "l") {
                    tempMax = guess - 1;
                }
            } 

            if (min > max) {
                console.log("BIG PROBLEM")
            } else {
                min = tempMin;
                max = tempMax;
            }
        } while (tempMin > tempMax);
    }

    console.log("Woopie!!!! I did it!!");

    process.exit();
}

run();
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
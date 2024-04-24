
import inquirer from 'inquirer';
import chalk from "chalk";

// Creating a randomNumber function which generates a random number 

function randomNumber(minimum : number , maximum : number): number {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

// In this function we take user input and check it through conditions and adding attempts and print answer. 

function playGame(): void {
    const targetNumber = randomNumber(1,100);
    let attempts = 0;

    const askGuessNumber = (): void => {
        inquirer.prompt({
            type : "input",
            name : "guessNumber",
            message : "Guess a number between 1 and 100:",
            validate : (input : string): boolean | string => {
                const userNumber = parseInt(input);
                if (isNaN(userNumber) || userNumber < 1 || userNumber > 100) {
                    return "Please enter a valid number between 1 and 100";
                
                } return true;
            },
        })

        .then((answers:{guessNumber : string}) => {
            const guessNumberUser = parseInt(answers.guessNumber);
            attempts++;

            if (guessNumberUser === targetNumber) {
                console.log(chalk.green(`Congratulations! You guessed the right number ${targetNumber} 
                in ${attempts} attempt(s).`));     askPlayAgain();
            } else if (guessNumberUser < targetNumber) {
                console.log(chalk.yellow("Too low! Try again."));
                askGuessNumber();
            } else {
                console.log(chalk.blue("Too high! Try again."));
                askGuessNumber();
            }
        });
    };

    // Making another function of asking play again from user
    const askPlayAgain = (): void => {
        inquirer.prompt({
            type : "confirm",
            name : "playAgain",
            message : "Do you want to play again?"
        }) 
        .then((answers: {playAgain : boolean}) => {
            if (answers.playAgain) {
                attempts = 0; // Reset old attempts
                playGame();
            } else {
                console.log(chalk.red("Thanks for playing!"));
                process.exit(0);
            }
        });
    }; 
    
    askGuessNumber();
}

// Start the game 
playGame();

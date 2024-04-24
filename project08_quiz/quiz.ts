import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// Define types for question and answer
type Question = {
    question : string;
    choices : string[];
    answer : string;
};

// Define type for quiz result 
type QuizResult = {
    correct : number;
    total : number;
};

// Sample question for the quiz 
const questions : Question[] = [
    {
        question : "Which programming language transpiles to JavaScript?",
        choices : ["TypeScript", "Python", "Java", "C++"],
        answer : "TypeScript",
    },
    {
        question : "What is the syntax for declaring a variable in JavaScript?",
        choices : ["let", "var", "const", "All of the above"],
        answer : "All of the above",
    },
    {
        question : "Which of the following is NOT a primitive data type in JavaScript?",
        choices : ["string", "object", "boolean", "number"],
        answer : "object",
    },
    {
        question : "What keyword is used to define a function in TypeScript?",
        choices : ["def", "function", "define", "fun"],
        answer : "function",
    },
    {
        question : "Which symbol is used for single-line comments in TypeScript?",
        choices : ["//", "/*", "#", "--"],
        answer : "//",
    },
    {
        question : "In JavaScript, what is the result of 10 + '10'?",
        choices : ["20", "'1010'", "1010", "Error"],
        answer : "'1010'",
    },
    {
        question : "What is the output of the following TypeScript code? \nconsole.log(2 + '2' + 2);",
        choices : ["'222'", "6", "'4'", "Error"],
        answer : "'222'",
    },
];

// Function to start the quiz
async function startQuiz(questions : Question[]): Promise<QuizResult> {
    let correctAnswers = 0;

    // Loop through each question 
    for (const question of questions) {
        //Ask question
        const {answer} = await inquirer.prompt([
            {
                type : "list",
                name : "answer",
                message : question.question,
                choices : question.choices,
            },
        ]);

        // Check if answer is correct 
        if (answer === question.answer) {
            correctAnswers++;
        } else {
            console.log(chalk.red("Incorrect answer! You lose."));
            return {correct : correctAnswers, total : questions.length };
        }
    }

    // All answers are correct 
    console.log(chalk.green("Congratulations! You answered all questions correctly."));
    return {correct : correctAnswers, total : questions.length };
}

// Function to display chalk animation for welcome message 
function showWelcomeAnimation() {
    const welcomeMessage = "Welcome to the Programming Quiz!";
    const rainbow = chalkAnimation.rainbow(welcomeMessage);

    rainbow.start();
    setTimeout(() => {
        rainbow.stop();
    }, 2000);
} 

// Function to display chalk animation 
function showCompletionAnimation() {
    const completionMessage = "Quiz Complete!";
    const rainbow = chalkAnimation.rainbow(completionMessage);

    rainbow.start();
    setTimeout(() => {
        rainbow.stop();
    }, 2000);
}

// Function to ask user if they want to play again
async function askToPlayAgain(): Promise<boolean> {
    const {playAgain} = await inquirer.prompt([
        {
            type: "confirm",
            name : "playAgain",
            message : "Do you want to play again?",
            choices : ["Yes", "No"],
            default : false,
        },
    ]);
    return playAgain;
}

// Function to display quiz result 
function displayResult(result : QuizResult) {
    console.log(chalk.cyan(`\nQuiz Result:`));
    console.log(chalk.yellow(`Correct Answers: ${result.correct}`));
    console.log(chalk.blue(`Total Questions: ${result.total}`));

    // Calculate and display percentage 
    const percentage = (result.correct / result.total) * 100;
    console.log(chalk.green(`Percentage: ${percentage.toFixed(2)}%`));
}

// Main function to run the quiz 
async function main() {
    let playAgain = true
    while (playAgain) {
         //Display welcome message with chalk animation 
    showWelcomeAnimation();

    console.log(chalk.blue("\nAnswer the following questions:"));

    //Start the quiz
    const result = await startQuiz(questions);

    // Display quiz result 
    displayResult(result);

    // Display chalk animation for quiz completion 
    showCompletionAnimation();

    // Ask the user if they want to play again
    playAgain = await askToPlayAgain();
    }

    console.log(chalk.yellow("Thanks for playing!"));
}

// Run the Quiz
main();
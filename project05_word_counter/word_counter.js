#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
/* Function to count words in the input text.
This function takes input and slplit it into words based on whitespaces
then filtering the empty words and returning non empty words. */
function countWords(inputText) {
    const words = inputText.split(/\s+/).filter(word => word.length > 0);
    return words.length;
}
/* Function to count characters in the input text exluding spaces.
This function removes spaces from the input text and returns the length of
the modified strings */
function countCharactersWithoutSpaces(inputText) {
    const textWithoutSpaces = inputText.replace(/\s+/g, '');
    return textWithoutSpaces.length;
}
// This function takes user input through inquirer and this is a main function to run the application.
async function mainFunc() {
    const questions = [
        {
            type: "input",
            name: "text",
            message: "Enter the text to count words:",
        },
    ];
    // Prompting the user for input and waiting for their response. 
    const answers = await inquirer.prompt(questions);
    // Extacting the input text from the user's response 
    const text = answers["text"];
    // Counting the numbers of words and characters in the input text through respective functions 
    const countedWords = countWords(text);
    const countedCharacters = text.length;
    const countCharacterWithoutSpaces = countCharactersWithoutSpaces(text);
    console.log(chalk.cyan(`Counted Words are: ${countedWords}`));
    console.log(chalk.yellow(`Counted Characters are: ${countedCharacters}`));
    console.log(chalk.magenta(`Counted Characters without Spaces are: ${countCharacterWithoutSpaces}`));
}
// Call mainFunc to start the application 
mainFunc();

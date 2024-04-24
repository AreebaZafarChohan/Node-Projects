import inquirer,{QuestionCollection,Answers} from "inquirer";
import chalk from "chalk";

/* Function to count words in the input text.
This function takes input and slplit it into words based on whitespaces 
then filtering the empty words and returning non empty words. */

function countWords(inputText : string): number {
    const words : string[] = inputText.split(/\s+/).filter(word => word.length > 0);
    return words.length;
}

// This function takes user input through inquirer and this is a main function to run the application.

async function mainFunc(): Promise<void> {
    const questions : QuestionCollection = [
        {       
            type : "input",
            name : "text",
            message : "Enter the text to count words:", 
        },
    ];
    
    // Prompting the user for input and waiting for their response. 

    const answers : Answers = await inquirer.prompt(questions);

    // Extacting the input text from the user's response 

    const text : string = answers["text"];

    // Counting the numbers of words in the input text through countWords function 
    const countedWords : number = countWords(text);

    console.log(chalk.cyan(`Counted Words are: ${countedWords}`));
}

// Call mainFunc to start the application 

mainFunc();

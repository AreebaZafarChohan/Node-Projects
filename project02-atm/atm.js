import inquirer from "inquirer";
import chalk from "chalk";
// Simulated User Data 
const userData = {
    userId: '777093',
    userName: "Sara Zafar",
    userPin: '7860',
    accountBalance: 20000
};
// Function to simulate ATM functionalities
// creating a function for ATM operations to access data from user and doing further operations 
function atmOperations() {
    inquirer.prompt({
        type: "list",
        name: "operation",
        message: "Choose an operation:",
        choices: ["Check Balance", "Deposit", "Withdraw", "Exit"],
    })
        .then((answers) => {
        switch (answers.operation) {
            case "Check Balance":
                console.log(chalk.blue(`${userData.userName}, Your current balance is ${userData.accountBalance}`));
                atmOperations();
                break;
            case "Deposit":
                inquirer.prompt({
                    type: "input",
                    name: "amount",
                    message: "Enter the amount to deposit",
                    validate: (input) => {
                        const amount = parseInt(input);
                        if (isNaN(amount) || amount <= 0) {
                            return chalk.red `please enter a valid amount greater than zero.`;
                        }
                        return true;
                    },
                })
                    .then((answers) => {
                    const depositAmount = parseInt(answers.amount);
                    userData.accountBalance += depositAmount;
                    console.log(chalk.yellow(`${depositAmount} deposited successfully.`));
                    atmOperations();
                });
                break;
            case "Withdraw":
                inquirer.prompt({
                    type: "input",
                    name: "amount",
                    message: "Enter the amount to withdraw:",
                    validate: (input) => {
                        const amount = parseInt(input);
                        if (isNaN(amount) || amount <= 0) {
                            return chalk.red `Please enter a valid amount greater than  zero.`;
                        }
                        if (amount > userData.accountBalance) {
                            return chalk.red `Insufficient funds. Please enter a smaller amount.`;
                        }
                        return true;
                    },
                })
                    .then((answers) => {
                    const withdrawAmount = parseInt(answers.amount);
                    userData.accountBalance -= withdrawAmount;
                    console.log(chalk.yellow(`${withdrawAmount} withdrawn successfully.`));
                    atmOperations();
                });
                break;
            case "Exit":
                console.log(chalk.green(`Thank you for using the ATM. Have a great day! `));
                break;
            default:
                console.log(chalk.red(`Invalid operation. Please choose a valid operation.`));
                atmOperations();
        }
    });
}
// Function to simulate user login 
function userLogin() {
    inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: "Enter your user ID:",
        },
        {
            type: "password",
            name: "userPin",
            message: "Enter your PIN:",
            mask: "*",
        },
    ])
        .then((answers) => {
        if (answers.userId === userData.userId && answers.userPin === userData.userPin) {
            console.log(chalk.green(`Login successful. Welcome to the ATM ${userData.userName}.`));
            atmOperations();
        }
        else {
            console.log(chalk.red(`Invalid user ID or PIN. Please try agaijn.`));
            userLogin();
        }
    });
}
// Start the application 
console.log(chalk.green("Welcome to the ATM."));
userLogin();

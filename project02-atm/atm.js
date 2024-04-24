import inquirer from "inquirer";
import chalk from "chalk";
const users = [];
// Function to generate a 5-digit unique ID for user 
function generateUserId() {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
}
// Function to simulate user signup
function userSignUp() {
    inquirer.prompt([
        {
            type: "input",
            name: "userName",
            message: "Enter your name:",
        },
        {
            type: "password",
            name: "userPin",
            message: "Create your PIN:",
            mask: "*",
        },
    ])
        .then((answers) => {
        const userId = generateUserId();
        const newUser = {
            userId: userId,
            userName: answers.userName,
            userPin: answers.userPin,
            accountBalance: 0 // Set initial balance to 0 
        };
        users.push(newUser);
        console.log(chalk.green(`Signup successful.
         Your user ID is ${userId}. Please remember it for login.`));
        userLogin();
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
        const user = users.find(u => u.userId === answers.userId && u.userPin === answers.userPin);
        if (user) {
            console.log(chalk.green(`Login successful. Welcome to the ATM ${user.userName}.`));
            atmOperations(user);
        }
        else {
            console.log(chalk.red(`Invalid user ID or PIN. Please try agaijn.`));
            userLogin();
        }
    });
}
// Function to simulate ATM functionalities
// creating a function for ATM operations to access data from user and doing further operations 
function atmOperations(user) {
    inquirer.prompt({
        type: "list",
        name: "operation",
        message: "Choose an operation:",
        choices: ["Check Balance", "Deposit", "Withdraw", "Exit"],
    })
        .then((answers) => {
        switch (answers.operation) {
            case "Check Balance":
                console.log(chalk.blue(`${user.userName}, Your current balance is ${user.accountBalance}`));
                atmOperations(user);
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
                    user.accountBalance += depositAmount;
                    console.log(chalk.yellow(`${depositAmount} deposited successfully.`));
                    atmOperations(user);
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
                        if (amount > user.accountBalance) {
                            return chalk.red `Insufficient funds. Please enter a smaller amount.`;
                        }
                        return true;
                    },
                })
                    .then((answers) => {
                    const withdrawAmount = parseInt(answers.amount);
                    user.accountBalance -= withdrawAmount;
                    console.log(chalk.yellow(`${withdrawAmount} withdrawn successfully.`));
                    atmOperations(user);
                });
                break;
            case "Exit":
                inquirer.prompt({
                    type: "confirm",
                    name: "restart",
                    message: "Do you want to restart the ATM",
                    default: false,
                })
                    .then((answers) => {
                    if (answers.restart) {
                        console.log(chalk.green("Restarting ATM..."));
                        console.log(chalk.green("Welcome back to the ATM..."));
                        userLogin(); // Restart the login process
                    }
                    else {
                        console.log(chalk.green(`Thank you for using the ATM. Have a great day! `));
                    }
                });
                break;
            default:
                console.log(chalk.red(`Invalid operation. Please choose a valid operation.`));
                atmOperations(user);
        }
    });
}
// Start the application 
console.log(chalk.green("Welcome to the ATM."));
inquirer.prompt([
    {
        type: "list",
        name: "option",
        message: "Do you want to signup or login?",
        choices: ["Signup", "Login"],
    }
])
    .then((answers) => {
    if (answers.option === "Signup") {
        userSignUp();
    }
    else {
        userLogin();
    }
});

import inquirer from "inquirer";
import chalk from "chalk";
import { tr } from "@faker-js/faker";

// Simulated User Data 
interface UserData {
    userId: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    gender: string;
    age: number;
    userPin: string;
    accountBalance: number;
}

class ATM {
    private users: UserData[] = [];

    // Function to generate a 5-digit unique ID for user 
    private generateUserId(): string {
        return Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    // Function to simulate user signup
    private userSignUp(): void {-
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter your first name:",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter your last name:",
            },
            {
                type: "input",
                name: "age",
                message: "Enter your age:",
                validate: (input: string): boolean | string => {
                    const age = parseInt(input);
                    if (isNaN(age) || age <= 0) {
                        return chalk.red`Please enter a valid age greater than zero.`;
                    }
                    return true;
                },
            },
            {
                type: "input",
                name: "mobileNumber",
                message: "Enter your mobile number:",
                validate: (input: string): boolean | string => {
                    const age = parseInt(input);
                    if (!/^\d{11}$/.test(input)) {
                        return chalk.red`Please enter a valid 11-digit mobile number.`;
                    }
                    return true;
                },
            },
            {
                type: "input",
                name: "gender",
                message: "Enter your gender:",
            },
            {
                type: "password",
                name: "userPin",
                message: "Create your PIN:",
                mask: "*",
            },
        ])
        .then((answers: { firstName: string, lastName: string, age: string, mobileNumber: string, gender: string, userPin: string }) => {
            const userId = this.generateUserId();
            const newUser: UserData = {
                userId: userId,
                firstName: answers.firstName,
                lastName: answers.lastName,
                age: parseInt(answers.age),
                mobileNumber: answers.mobileNumber,
                gender: answers.gender,
                userPin: answers.userPin,
                accountBalance: 0 // Set initial balance to 0 
            };
            this.users.push(newUser);

            console.log(chalk.green(`Signup successful. Your user ID is ${userId}. Please remember it for login.`));
            this.userLogin();
        });
    }

    // Function to simulate user login 
    private userLogin(): void {
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
        .then((answers: { userId: string, userPin: string }) => {
            const user = this.users.find(u => u.userId === answers.userId && u.userPin === answers.userPin);
            if (user) {
                console.log(chalk.green(`Login successful. Welcome to the ATM ${user.firstName} ${user.lastName}.`));
                this.atmOperations(user);
            } else {
                console.log(chalk.red(`Invalid user ID or PIN. Please try again.`));
                this.userLogin();
            }
        });
    }

    // Function to simulate ATM functionalities
    private atmOperations(user: UserData): void {
        inquirer.prompt({
            type: "list",
            name: "operation",
            message: "Choose an operation:",
            choices: ["Check Balance", "Deposit", "Withdraw", "Exit"],
        })
        .then((answers: { operation: string }) => {
            switch (answers.operation) {
                case "Check Balance":
                    console.log(chalk.blue(`${user.firstName} ${user.lastName}, Your current balance is ${user.accountBalance}`));
                    this.atmOperations(user);
                    break;
                case "Deposit":
                    inquirer.prompt({
                        type: "input",
                        name: "amount",
                        message: "Enter the amount to deposit:",
                        validate: (input: string): boolean | string => {
                            const amount = parseInt(input);
                            if (isNaN(amount) || amount <= 0) {
                                return chalk.red`Please enter a valid amount greater than zero.`;
                            }
                            return true;
                        },
                    })
                    .then((answers: { amount: string }) => {
                        const depositAmount = parseInt(answers.amount);

                        user.accountBalance += depositAmount;
                        console.log(chalk.yellow(`${depositAmount} deposited successfully.`));
                        this.atmOperations(user);
                    });
                    break;
                case "Withdraw":
                    inquirer.prompt({
                        type: "input",
                        name: "amount",
                        message: "Enter the amount to withdraw:",
                        validate: (input: string): boolean | string => {
                            const amount = parseInt(input);
                            if (isNaN(amount) || amount <= 0) {
                                return chalk.red`Please enter a valid amount greater than zero.`
                            }
                            if (amount > user.accountBalance) {
                                return chalk.red`Insufficient funds. Please enter a smaller amount.`
                            }
                            return true;
                        },
                    })
                    .then((answers: { amount: string }) => {
                        const withdrawAmount = parseInt(answers.amount);

                        user.accountBalance -= withdrawAmount;
                        console.log(chalk.yellow(`${withdrawAmount} withdrawn successfully.`));
                        this.atmOperations(user);
                    });
                    break;
                case "Exit":
                    inquirer.prompt({
                        type : "confirm",
                        name : "restart",
                        message : "Do you want to restart the ATM",
                        default : false,
                    })
                    .then((answers: {restart: boolean}) => {
                        if (answers.restart) {
                            console.log(chalk.cyan("Restarting ATM..."));
                            console.log(chalk.cyan("Welcome back to the ATM..."));
                            this.userLogin(); // Restart the login process
                        } else {
                            console.log(chalk.green(`Thank you for using the ATM. Have a great day! `));
                        }
                    });
                    break;
                default:
                    console.log(chalk.red(`Invalid operation. Please choose a valid operation.`));
                    this.atmOperations(user);
            }
        });
    }

    // Start the application 
    start(): void {
        console.log(chalk.yellow.bold.underline("\n Welcome to the ATM! \n"));
        
        inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "Do you want to signup or login?",
                choices: ["Signup", "Login"],
            }
        ])
        .then((answers: { option: string }) => {
            if (answers.option === "Signup") {
                this.userSignUp();
            } else {
                this.userLogin();
            }
        });
    }
}

// Create an instance of the ATM class and start the application
const atm = new ATM();
atm.start();
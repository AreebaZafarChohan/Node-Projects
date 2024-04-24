#! /usr/bin/env node 

import inquirer from "inquirer";
async function calculator() {
    const { number1, number2, operator } = await inquirer.prompt([
        {
            type: "number",
            name: "number1",
            message: "Please enter the first number:"
        },
        {
            type: "number",
            name: "number2",
            message: "Please enter the second number:"
        },
        {
            type: "list",
            name: "operator",
            choices: ["Addition (+)", "Subtraction (-)", "Multiplication (*)", "Division (/)", "Modulus (%)"],
            message: "Choose an operator:"
        },
    ]);
    let result;
    if (operator === "Addition (+)") {
        result = number1 + number2;
    }
    else if (operator === "Subtraction (-)") {
        result = number1 - number2;
    }
    else if (operator === "Multiplication (*)") {
        result = number1 * number2;
    }
    else if (operator === "Division (/)") {
        result = number1 / number2;
    }
    else if (operator === "Modulus (%)") {
        result = number1 % number2;
    }
    else {
        result = NaN;
    }
    console.log(`Answer of ${number1} ${operator} ${number2} = ${result}`);
}
calculator();

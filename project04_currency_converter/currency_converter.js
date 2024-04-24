#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
const exchangeRates = {
    "USD": {
        USD: 1, // United States Dollar (Base Currency)
        EUR: 0.92, // Euro
        GBP: 0.78, // British Pound Sterling
        JPY: 151.36, // Japanese Yen 
        PKR: 277.83, // Pakistani Rupee
        SAR: 3.75, // Saudi Riyal
    },
    "EUR": {
        EUR: 1, // Euro
        USD: 1.07, // United States Dollar (Base Currency)
        GBP: 0.85, // British Pound Sterling
        JPY: 162.88, // Japanese Yen 
        PKR: 298.45, // Pakistani Rupee
        SAR: 4.03, // Saudi Riyal
    },
    "GBP": {
        GBP: 1, // British Pound Sterling
        USD: 1.26, // United States Dollar (Base Currency)
        EUR: 1.17, // Euro
        JPY: 190.59, // Japanese Yen 
        PKR: 349.19, // Pakistani Rupee
        SAR: 4.71, // Saudi Riyal
    },
    "JPY": {
        JPY: 1, // Japanese Yen 
        USD: 0.0066, // United States Dollar (Base Currency)
        EUR: 0.0061, // Euro
        GBP: 0.0052, // British Pound Sterling
        PKR: 1.83, // Pakistani Rupee
        SAR: 0.025, // Saudi Riyal
    },
    "PKR": {
        PKR: 1, // Pakistani Rupee
        USD: 0.0036, // United States Dollar (Base Currency)
        EUR: 0.0034, // Euro
        GBP: 0.0029, // British Pound Sterling
        JPY: 0.55, // Japanese Yen 
        SAR: 0.014, // Saudi Riyal
    },
    "SAR": {
        SAR: 1, // Saudi Riyal
        USD: 0.27, // United States Dollar (Base Currency)
        EUR: 0.25, // Euro
        GBP: 0.21, // British Pound Sterling
        JPY: 40.44, // Japanese Yen 
        PKR: 74.09, // Pakistani Rupee
    },
};
/* This is an async function which return void after resolving promise
and in this function we declare type of data which we take from user through inquirer*/
async function currencyConverter() {
    const questions = [
        {
            type: "input",
            name: "amount",
            message: "Enter the amount of money to convert:",
            validate: (value) => !isNaN(parseFloat(value)),
        },
        {
            type: "list",
            name: "from",
            // "from" currency represents the currency from which the user wants to convert.
            message: "Select the currency to convert from:",
            choices: Object.keys(exchangeRates),
        },
        {
            type: "list",
            name: "to",
            //  to currency represents the currency to which the user wants to convert their amount.
            message: "Select the currency to convert to:",
            choices: Object.keys(exchangeRates),
        },
    ];
    // we make one more variable for access user data from object which we have created above.
    const answers = await inquirer.prompt(questions);
    const amount = parseFloat(answers.amount);
    const fromCurrency = answers.from;
    const toCurrency = answers.to;
    const convertedAmount = amount * (exchangeRates[fromCurrency][toCurrency]);
    console.log(chalk.green(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`));
}
// Start the applicatipon 
currencyConverter();

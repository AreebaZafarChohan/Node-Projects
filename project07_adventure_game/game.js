#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import clui from "clui";
import chalkAnimation from "chalk-animation";
// Function to ask user if they want to play again 
async function playAgain() {
    const response = await inquirer.prompt([
        {
            type: "confirm",
            name: "playAgain",
            message: "Do you want to play again?",
        },
    ]);
    return response.playAgain;
}
// Function to start the game with play again functionality 
async function startGame() {
    let play = true;
    while (play) {
        let currentState = "start";
        while (currentState !== "exit") {
            switch (currentState) {
                case "start":
                    await start();
                    currentState = "chooseDoor";
                    break;
                case "chooseDoor":
                    const doorChoice = await chooseDoor();
                    if (doorChoice === "Door 1") {
                        currentState = "roundTwo";
                    }
                    else if (doorChoice === "Door 2") {
                        console.log(chalk.red.bold("Oops! You walKed into a pit of fire. Game Over!"));
                        currentState = "exit";
                    }
                    else {
                        console.log(chalk.red.bold("Oops! A ghost has caught you. Game Over!"));
                        currentState = "exit";
                    }
                    break;
                case "roundTwo":
                    currentState = await roundTwo();
                    break;
                case "roundThree":
                    currentState = await roundThree();
                    break;
            }
        }
        play = await playAgain(); // Prompt to play again 
    }
    console.log(chalk.blue.bold("Exiting the game..."));
    process.exit();
}
// Function to start the game 
async function start() {
    const spinner = new clui.Spinner("Starting the game...%$");
    spinner.start();
    await wait(2000); // Simulate loading time 
    spinner.stop();
    let animation = chalkAnimation.rainbow("Welcome to Adventure Game!");
    await wait(2000);
    animation.stop();
    const response = await inquirer.prompt([
        {
            type: "confirm",
            name: "startGame",
            message: "Do you want to start adventure?",
        },
    ]);
    if (!response.startGame) {
        console.log(chalk.blue("Exiting the game..."));
        process.exit();
    }
}
// Function to let user choose a door 
async function chooseDoor() {
    const doorChoice = await inquirer.prompt([
        {
            type: "list",
            name: "door",
            message: "Choose a door:",
            choices: ["Door 1", "Door 2", "Door 3"],
        },
    ]);
    return doorChoice.door;
}
// Function for round two (if user chooses door 1 )
async function roundTwo() {
    console.log(chalk.cyan.bold("You choose Door 1. Round 2 begins..."));
    const pathChoice = await choosePathRoundTwo();
    if (pathChoice === "Left path") {
        console.log(chalk.red.bold("Oh no, you fell into a pit! Game Over!"));
        return "exit";
    }
    else if (pathChoice === "Forward path") {
        console.log(chalk.red.bold("Oh no, you got lost in the jungle! Game Over!"));
        return "exit";
    }
    else {
        return "roundThree";
    }
}
// Function to let user choose a path in round two 
async function choosePathRoundTwo() {
    const pathChoice = await inquirer.prompt([
        {
            type: "list",
            name: "path",
            message: "Choose your path wisely:",
            choices: ["Left path", "Forward path", "Right path"],
        },
    ]);
    return pathChoice.path;
}
// Function for round three (if user chooses right path in round two)
async function roundThree() {
    console.log(chalk.cyan.bold("You choose the right path. Round 3 begins..."));
    const roomChoice = await chooseRoomRoundThree();
    if (roomChoice === "Room 1") {
        console.log(chalk.red.bold("You entered Room 1. A monster ate you! Game Over!"));
        return "exit";
    }
    else if (roomChoice === "Room 2") {
        console.log(chalk.green.bold("You entered Room 2. You found the exit and a treasure box! Congratulations, you won the game!"));
        return "exit";
    }
    else {
        console.log(chalk.red.bold("You entered Room 3. Zombies attacked you! Game Over!"));
        return "exit";
    }
}
// Function to let user choose a room in round three 
async function chooseRoomRoundThree() {
    const roomChoice = await inquirer.prompt([
        {
            type: "list",
            name: "room",
            message: "Choose a room:",
            choices: ["Room 1", "Room 2", "Room 3"],
        },
    ]);
    return roomChoice.room;
}
// Helper function to simulate loading time 
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Start the game application 
startGame();

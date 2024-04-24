#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
// Class representing a student with a name property
class Student {
    name;
    constructor(name) {
        this.name = name;
    }
    ;
}
;
// Class representing a person with a list of students
class Person {
    students = [];
    //Method to add a student to the list
    addStudent(obj) {
        this.students.push(obj);
    }
    ;
}
;
// reating an instance of the Person class
const person = new Person();
// Function to start the program
const programStart = async (person) => {
    // Welcoming message
    console.log(chalk.bold.blue.underline.bold("\n  \twelcome guest!  \n"));
    do {
        // Askinh user which person to talk to
        const answer = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "which person do you want to talk or exit?",
            choices: ["Areeba Zafar", "Student", "Exit"]
        });
        // if user chooses Areeba Zafar
        if (answer.select === "Areeba Zafar") {
            console.log(chalk.green(`You are chatting with Areeba Zafar`));
            console.log(chalk.green("Hope you are doing well!"));
        }
        // if user chooses Student
        if (answer.select == "Student") {
            // Asking which student to talk to 
            const answer = await inquirer.prompt({
                type: "input",
                name: "student",
                message: "Which student do you want to talk?"
            });
            // Finding the student
            const student = person.students.find((value) => value.name == answer.student);
            // if student not found, add new student to the list
            if (!student) {
                const name = new Student(answer.student);
                person.addStudent(name);
                console.log(chalk.yellow(`I am ${chalk.bold.cyan(name.name)}, and I'm good.`));
                console.log(person.students);
            }
            // if student found, display their message
            if (student) {
                console.log(chalk.yellow(`I am ${chalk.bold.green(student.name)}, and I'm doing well.`));
                console.log(person.students);
            }
            ;
        }
        ;
        // If user chooses Exit
        if (answer.select == "Exit") {
            console.log(chalk.magenta("Good Bye!"));
            process.exit(); // Exit the program
        }
    } while (true);
};
// Run the program
programStart(person);

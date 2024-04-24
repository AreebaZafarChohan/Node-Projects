import inquirer from "inquirer";
import chalk from "chalk";

interface todoItem {
    task : string;
    completed : boolean;
}

const todoList : todoItem[] = [];

// This function display todo list 

function displayTodoList(): void  {
    console.log(chalk.magenta.bold("===== Todo List ====="));
    if (todoList.length === 0) {
        console.log(chalk.yellow("No tasks in the todo list."));
    } else {
        todoList.forEach((item, index) => {
            const status = item.completed ? chalk.green("Completed"): chalk.red("Pending");
            console.log(`${index + 1}. ${item.task} - ${status}`);
        });
    }
    console.log(chalk.cyan("••••••••••••••••••••••••"));
}

// This function adding task in list 

function addTask(): void {
    inquirer.prompt({
        type : "input",
        name : "task",
        message : "Enter the task:",
    })
    .then((answers : {task : string}) => {
        const newTask : todoItem = {
            task : answers.task,
            completed : false
        };
        todoList.push(newTask);
        console.log(chalk.green("Task added successfully!"));
        displayTodoList();
        promptUser();
    });
}

// This function mark task as completed 

function markTaskAsCompleted(): void {
    inquirer.prompt({
        type : "list",
        name : "taskIndex",
        message : "Select the task to mark as completed:",
        choices : todoList.map((item, index) => `${index + 1}. ${item.task}`), 
    })
    .then((answers : {taskIndex : string}) => {
        const index = parseInt(answers.taskIndex.split(".") [0]) - 1;
        if (index >= 0 && index < todoList.length) {
            todoList[index].completed = true;
            console.log(chalk.green("Task marked as completed!"));
        } else {
            console.log(chalk.red("Invalid task index."));
        }
        displayTodoList();
        promptUser();
    });
}

// This function asks user what action he wants to take and takes data from user 

function promptUser(): void {
    inquirer.prompt({
        type : "list",
        name : "userAction",
        message : "Choose an action:",
        choices : ["Add Task", "Mark Task As Completed", "Exit"],
    })
    .then((answers : {userAction : string}) => {
        switch (answers.userAction) {
            case "Add Task":
                addTask();
                break;
            case "Mark Task As Completed":
                markTaskAsCompleted();
                break;
            case "Exit":
                console.log(chalk.magenta("Thank you for using the todo list. Have a great day!"));
                break;        
        }
    });
}

// Start the todo list application 
console.log(chalk.blue("Welcome to the Todo List!"));
promptUser();
import inquirer from "inquirer";
import chalk from "chalk";

// Function to create a delay
const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
// Function to display a welcome message
async function welcome(): Promise<void> {
  console.log(chalk.cyan.bold.underline("Welcome to the countdown timer app!"));
  await sleep(2000);
}

// Function to get user input for countdown type
async function getUserInput(): Promise<{ type: string, value: string }> {
  const userInput = await inquirer.prompt([
    {
      type: "list",
      name: "inputType",
      message: "Choose input type:",
      choices: ["Duration", "Target Date and Time"],
    },
  ]);

  if (userInput.inputType === "Duration") {
    const duration = await inquirer.prompt([
      {
        type: "input",
        name: "duration",
        message: "Enter the duration in seconds, minutes, or hours (e.g., '7s', '15m', '6h'):",
      },
    ]);
    return { type: "duration", value: duration.duration };
  } else if (userInput.inputType === "Target Date and Time") {
    const targetDateTime = await inquirer.prompt([
      {
        type: "input",
        name: "targetDateAndTime",
        message: "Enter target date and time in format YYYY-MM-DD HH:MM:SS:",
        validate: (input: string) => {
          const checkFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
          if (!checkFormat.test(input)) {
            return chalk.red.bold("Please enter date in correct format (YYYY-MM-DD HH:MM:SS)");
          }
          return true;
        },
      },
    ]);
    return { type: "targetDateTime", value: targetDateTime.targetDateAndTime };
  }

  throw new Error("Invalid input type");
}

// Function to parse duration input and convert it to milliseconds
function parseDuration(duration: string): number {
  const regex = /(\d+)([smh])/;
  const match = duration.match(regex);

  if (!match) {
    console.error(chalk.red.bold("Invalid duration format. Please use format like '5s', '10m', or '2h'."));
    process.exit(1);
  }

  const amount = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's':
      return amount * 1000; // Convert seconds to milliseconds
    case 'm':
      return amount * 60 * 1000; // Convert minutes to milliseconds
    case 'h':
      return amount * 60 * 60 * 1000; // Convert hours to milliseconds
    default:
      console.error(chalk.red.bold("Invalid duration format. Please use format like '5s', '10m', or '2h'."));
      process.exit(1);
  }
}

// Function to parse target date and time input and return milliseconds until that time
function parseDateTime(dateTime: string): number {
  const [dateString, timeString] = dateTime.split(" ");
  const [year, month, day] = dateString.split("-");
  const [hour, minute, second] = timeString.split(":");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second)).getTime();
}

// Function to start the countdown timer
async function startTimer(durationOrDateTime: { type: string, value: string }): Promise<void> {
  let remainingTime: number;

  if (durationOrDateTime.type === "duration") {
    remainingTime = parseDuration(durationOrDateTime.value);
  } else if (durationOrDateTime.type === "targetDateTime") {
    remainingTime = parseDateTime(durationOrDateTime.value) - Date.now();
  } else {
    throw new Error("Invalid input type");
  }

  setInterval(() => {
    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    let consoleToPrint: string;

    if (durationOrDateTime.type === "duration") {
      const days = Math.floor(hours / 24);
      consoleToPrint = chalk.magenta(`Remaining Time: ${days} days ${hours % 24 < 10 ? '0' : ''}${hours % 24} hours ${minutes % 60 < 10 ? '0' : ''}${minutes % 60} minutes ${seconds % 60 < 10 ? '0' : ''}${seconds % 60} seconds`);
    } else {
      const days = Math.floor(hours / 24);
      consoleToPrint = chalk.yellow(`Remaining Time: ${days} days ${hours % 24 < 10 ? '0' : ''}${hours % 24} hours ${minutes % 60 < 10 ? '0' : ''}${minutes % 60} minutes ${seconds % 60 < 10 ? '0' : ''}${seconds % 60} seconds`);
    }

    process.stdout.write(`\r${consoleToPrint}`);

    remainingTime -= 1000;
    if (remainingTime < 0) {
      console.log(chalk.green.bold("\nTime has expired!"));
      process.exit(0);
    }
  }, 1000);
}

// Function to start the application
async function appStart(): Promise<void> {
  await welcome();
  const userInput = await getUserInput();
  startTimer(userInput);
}

// Start the application
appStart();

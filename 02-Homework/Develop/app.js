const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];


async function manager() {
  const manager = await inquirer.prompt([
    {
      message: "What is the Manager's name",
      type: 'input',
      name: "name",
    },
    {
      message: "What is the Manager's employee ID?",
      type: 'input',
      name: "id",
    },
    {
      message: "What is the Manager's email?",
      type: 'input',
      name: "email",
    },
    {
      message: "What is the Manager's office number?",
      type: 'input',
      name: "officeNumber",
    },
  ]);

  const newManager = new Manager(
    manager.name,
    manager.id,
    manager.email,
    manager.officeNumber
  );
  employees.push(newManager);
  fs.writeFileSync(outputPath, render(employees), "utf-8");

  askToAddAnother();
}

async function engineer() {
  const engineer = await inquirer.prompt([
    {
      message: "What is the name of the Engineer?",
      type: 'input',
      name: "name",
    },
    {
      message: "What the Engineer's employee ID?",
      type: 'input',
      name: "id",
    },
    {
      message: "What is the Engineer's email?",
      type: 'input',
      name: "email",
    },
    {
      message: "What is the Engineer's github profile?",
      type: 'input',
      name: "github",
    },
  ]);

  const newEngineer = new Engineer(
    engineer.name,
    engineer.id,
    engineer.email,
    engineer.github
  );
  employees.push(newEngineer);
  fs.writeFileSync(outputPath, render(employees), "utf-8");

  askToAddAnother();
}

async function intern() {
  const intern = await inquirer.prompt([
    {
      message: "What is the name of the intern?",
      type: 'input',
      name: "name",
    },
    {
      message: "What is the Intern's employee ID?",
      type: 'input',
      name: "id",
    },
    {
      message: "What is the Intern's email?",
      type: 'input',
      name: "email",
    },
    {
      message: "What school does the Intern attend?",
      type: 'input',
      name: "school",
    },
  ]);

  askToAddAnother();
}

async function askToAddAnother() {
  const again = await inquirer.prompt([
    {
      type: "list",
      choices: ["More engineers!", "More interns!", "Exit"],
      name: "add",
    },
  ]);

  switch (again.add) {
    case "More engineers!":
      engineer();
      break;
    case "More interns!":
      intern();
      break;
    case "Exit":
      console.log("Your site is ready!");
      break;
  }
}

manager();
 





// Constant Variables and Base Arrays
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Engineer");



// Inquirer prompts for user inputs
function promptName() {
    const name = inquirer.prompt({
        type: "input",
        message: "What is your Employee's name?",
        name: "name"
    });
    return name;
}

function promptEmail() {
    const email = inquirer.prompt({
        type: "input",
        message: "What is your Employee's company email?",
        name: "email"
    });
    return email;
}

function promptRole(){
    const role = inquirer.prompt({
        type: "list",
        message: "What is your Employee's position?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    });
    return role;
}

function promptManager() {
    const officeNumber = inquirer.prompt({
        type: "input",
        message: "What is your Manager's office number?",
        name: "officeNumber",
    });
    return officeNumber;
}

function promptEngineer() {
    const github = inquirer.prompt({
        type: "input",
        message: "What is the Engineer's GitHub username?",
        name: "username"
    });
    return github;
}

function promptIntern() {
    const school = inquirer.prompt ({
        type: "input",
        message: "Where does the Intern attend?",
        name: "attend"
    })
    return school;
}

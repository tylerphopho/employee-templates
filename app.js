// Constant Variables and Base Arrays

// NPM Packages
const inquirer = require("inquirer");
const fs = require("fs-extra");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

// Routes for files
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateHTML = require("./templates/generateHTML");
const generateCard = require("./templates/generateHTML");
let employeeArray = [];
let employeeCards = "";

// Validates users input
function validateString(string){
    return string !== '';
}

function validateNumber(number){
    var reg = /^\d+$/;
    return reg.test(number) || "Must enter a number!";
}

function validateEmail(email){
    return /\S+@\S+\.\S+/.test(email)
}

// Inquirer prompts for user inputs
function promptName() {
    const name = inquirer.prompt({
        type: "input",
        message: "What is your Employee's fist and last name?",
        name: "name",
        validate: validateString
    });
    return name;
}

function promptID() {
    const id = inquirer.prompt({
        type: "input",
        message: "What is your Employee's ID number?",
        name: "id",
        validate: validateNumber
    });
    return id;
}

function promptEmail() {
    const email = inquirer.prompt({
        type: "input",
        message: "What is your Employee's company email?",
        name: "email",
        validate: validateEmail
    });
    return email;
}

function promptRole(){
    const role = inquirer.prompt({
        type: "list",
        message: "What is your Employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    });
    return role;
}

function promptManager() {
    const managerPrompt = inquirer.prompt({
        type: "input",
        message: "What is your Manager's office number?",
        name: "officeNumber",
        validate: validateNumber
    });
    return managerPrompt;
}

function promptEngineer() {
    const engineerPrompt = inquirer.prompt({
        type: "input",
        message: "What is the Engineer's GitHub username?",
        name: "username",
        validate: validateString
    });
    return engineerPrompt;
}

function promptIntern() {
    const internPrompt = inquirer.prompt ({
        type: "input",
        message: "What school does the Intern attend?",
        name: "school",
        validate: validateString
    })
    return internPrompt;
}


// Runs the APP
async function init() {
    do {
        try {
            let {name} = await promptName();
            let {id} = await promptID();
            let {email} = await promptEmail();
            const {role} = await promptRole();
            switch(role) {
                case "Manager":
                    let {managerPrompt} = await promptManager(role);
                    let newManager = new Manager(name, id, email, role, managerPrompt)
                    employeeArray.push(newManager)
                    console.log("New Manager added!");
                    break;
                case "Engineer":
                    let {engineerPrompt} = await promptEngineer(role);
                    let newEngineer = new Engineer(name, id, email, role, engineerPrompt)
                    employeeArray.push(newEngineer)
                    console.log("New Engineer added!");
                    break;
                case "Intern":
                    let {internPrompt} = await promptIntern(role);
                    let newIntern = new Intern(name, id, email, role, internPrompt)
                    employeeArray.push(newIntern)
                    console.log("New Intern added!");
                    break;
            }
        }
    catch(err){
        console.log(err);
    }
    done = await inquirer.prompt({
        type: "list",
        name: "add",
        message: "Would you like to add another employee?",
        choices: ["Yes", "No"]
    });
}while (done.add === "Yes")
console.log(employeeArray)

let employeeCards = employeeArray.map((employee) =>{
    console.log(employee)
    let title;
    let htmlText;
    if(employee.title === "Manager"){
        title = employee.officeNumber;
        htmlText = "Office Number: ";
    }else if(employee.title === "Engineer"){
        title = employee.github;
        htmlText = "GitHub: ";
    }else {
        title = employee.school
        htmlText = "School: ";
    }    
    return `<div class="card">
    <div class="card-header bg-primary">
      <h2 class="text-white">${employee.name}</h2>
      <h3 class="text-white">${employee.title}</h3></div>
    <div class="card-body">
    <p class="card-text"><strong>ID: </strong>${employee.id}</p>
      <p class="card-text"><strong>Email: </strong>${employee.email}</p>
      <p class="card-text"><strong>${htmlText}</strong>${title}</p>
    </div>
  </div>`
    }).join("");


    //generates the HTML file in the output folder
    const createHTML = generateHTML(employeeCards);
    writeFile("./templates/main.html",createHTML);
    }
init();
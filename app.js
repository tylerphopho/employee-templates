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

// Inquirer prompts for user inputs
function promptName() {
    const name = inquirer.prompt({
        type: "input",
        message: "What is your Employee's fist and last name?",
        name: "name"
    });
    return name;
}

function promptID() {
    const id = inquirer.prompt({
        type: "input",
        message: "What is your Employee's ID number?",
        name: "id"
    });
    return id;
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
        message: "What is your Employee's role?",
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
        message: "What school does the Intern attend?",
        name: "school"
    })
    return school;
}


// Runs the APP
async function init() {
    try {
        let {name} = await promptName();
        let {id} = await promptID();
        let {email} = await promptEmail();
        const {role} = await promptRole();
        switch(role) {
            case "Manager":
                let {officeNumber} = await promptManager();
                let manager = new Manager(name, id, email, role, officeNumber)
                employeeArray.push(manager)
                console.log("New Manager added!");
                break;
            case "Engineer":
                const {github} = await promptEngineer(name, id, email, role);
                let engineer = new Engineer(name, id, email, role, github)
                employeeArray.push(engineer)
                console.log("New Engineer added!");
                break;
            case "Intern":
                const {school} = await promptIntern(name, id, email, role);
                let intern = new Intern(name, id, email, role, school)
                employeeArray.push(intern)
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
}while (done.finish === "Yes")
console.log(employeeArray)

let employeeCards = employeeArray.map((team) =>{
    console.log(employee)
    let role;
    let htmlText;
    if(employee.role === "Manager"){
        role = employee.officeNumber;
        htmlText = "Office Number: ";
    }else if(employee.role === "Engineer"){
        role = employee.github;
        htmlText = "GitHub: ";
    }else {
        role = employee.school
        htmlText = "School: ";
    }    
    return `<div class="card">
    <div class="card-header bg-primary">
      <h2 class="text-white">${employee.name}</h2>
      <h3 class="text-white">${employee.role}</h3></div>
    <div class="card-body">
    <p class="card-text"><strong>ID: </strong>${employee.id}</p>
      <p class="card-text"><strong>Email: </strong>${employee.email}</p>
      <p class="card-text"><strong>${htmlText}</strong>${role}</p>
    </div>
  </div>`
    }).join("");


    //generates the HTML file in the output folder
    const createHTML = generateHTML(teamCards);
    writeFile("./output/Team.html",createHTML);

init();
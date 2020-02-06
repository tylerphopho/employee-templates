// Constant Variables and Base Arrays
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Engineer");


// Run function 

init();

async function init() {
    try {
        let {name} = await promptName();
        let {id} = await promptID();
        let {email} = await promptEmail();
        const {role} = await promptRole();
        switch(role) {
            case "Manager":
                const {officeNumber} = await promptManager(name, id, email, role);
                break;
            case "Engineer":
                const {github} = await promptEngineer(name, id, email, role);
                break;
            case "Intern":
                const {school} = await promptIntern(name, id, email, role);
                break;
        }
    }
    catch(err){
        console.log(err);
    }
}


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

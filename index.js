// Imports
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Constants.
const ADD_ENGINEER = 'Add Engineer';
const ADD_INTERN = 'Add Intern';
const DONE = 'Done';

// Global variables.
const employees = [];  // List of employees to be displayed on html page.
const sampleEmployee = {
    name: 'Kurt Heimerman',
    id: 123,
    email: 'kurtheimerman@yahoo.com',
    officeNumber: 456,
    githubLink: 'kurtGithubOK',
    school: 'West Anchorage Eagles'
};
employees.push(sampleEmployee);

const start = () => {
    console.log('in starttttttttttttt')
};



// Generate html doc.
const generateHtmlDoc = () => {

};

// QUESTIONS //////////////////////////////////////////////////////
// Questions for entering manager info.
const getManagerInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter manager name:',
        },
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter manager employee id:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter manager email address:',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter manager office number:',
        }
    ])
};

// Prompt manager to add an engineer, intern, or done.
const displayMenuOptions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do next?',
            choices: [ADD_ENGINEER, ADD_INTERN, DONE]
        }
    ]);
}

// Display questions for entering Engineer info.
const getEngineerInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter engineer name:',
        },
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter engineer employee id:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter engineer email address:',
        },
        {
            type: 'input',
            name: 'githubLink',
            message: 'Enter engineer github link:',
        }
    ]);
};

// Display question for entering Intern info.
const getInternInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter intern name:',
        },
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter intern employee id:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter intern email address:',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter intern school:',
        }
    ]);
};

// Utilities to create employee objects.
const makeManagerObject = data => {
    const { employeeId, name, email, officeNumber } = data;
    const manager = new Manager(employeeId, name, email, officeNumber);
    // Add to list of employees.
    employees.push(manager);
}

const makeEngineerObject = data => {
    const { employeeId, name, email, githubLink } = data;
    const engineer = new Engineer(employeeId, name, email, githubLink);
    // Add to list of employees.
    employees.push(engineer);
};

const makeInternObject = data => {
    const { employeeId, name, email, school } = data;
    const intern = new Intern(employeeId, name, email, school);
    // Add to list of employees.
    employees.push(intern);
};

start();

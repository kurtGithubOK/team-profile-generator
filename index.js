// Imports
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager')

// Constants.
const ADD_ENGINEER = 'Add Engineer';
const ADD_INTERN = 'Add Intern';
const DONE = 'Done';

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
            choices: [ADD_ENGINEER, ADD_INTERN, DONE],
        }
    ]);
}


// Utilities to create employee objects.
const makeManagerObject = data => {
    const { employeeId, name, email, officeNumber } = data;
    const manager = new Manager(employeeId, name, email, officeNumber);
    return manager;
}

// List of employees to be displayed on html page.
const employees = [];

const start = () => {
    // deleteOldFiles();
    getManagerInfo()
    .then( ( data ) => {
        // Make manager object.
        const manager = makeManagerObject(data);
        // Add to list of employees.
        employees.push(manager);

        // Display menu
        displayMenuOptions()
        .then( (menuSelection) => {
            if(menuSelection === ADD_ENGINEER) {
                console.log('engineer chosen')

            } else if(menuSelection === ADD_INTERN) {
                console.log('intern chosen')

            } else {
                // Manager chose 'done'.
                console.log('engineer chosen')
            }

        })
        .catch();


        console.log(manager)

        // if engineer ...
        // if intern ...
        // if done ...
    })
    .catch();
}
start();
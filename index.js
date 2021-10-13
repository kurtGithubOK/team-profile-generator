// Imports
const inquirer = require('inquirer');
const fs = require('fs');


const getManagerInput = () => {
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
        name: 'emailAddress',
        message: 'Enter manager email address:',
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter manager office number:',
      }
    ])
}



// .then(({ title, description }) => {
//   appData.title = title;
//   appData.description = description;
// });
const start = () => {
    // deleteOldFiles();
    getManagerInput()
    .then( ( data ) => {
        console.log(data)
    })
    .catch();
}
start();
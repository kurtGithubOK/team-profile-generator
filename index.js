// Imports
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { managerQuestions, menuOptions, engineerQuestions, internQuestions, ADD_ENGINEER, ADD_INTERN, DONE } = require('./src/questions');

// Constants.
const templateTop = './src/template-top.html';
const templateBottom = './src/template-bottom.html';
const outputPathAndFilename = './dist/myTeam.html';

// Global variables.
let employees = [];  // List of employees to be displayed on html page.

const start = () => {
    promptForInput()
    // .then(() => {
    // writeHtmlDoc();
    // })
    // .catch((err) => console.error('An error occured when prompting user for input:', err));
};

const promptForInput = () => {
    inquirer.prompt(managerQuestions)
        .then((response) => {
            const manager = new Manager(response);
            employees.push(manager);
            displayMenuOptions();
        })
        .catch((error) => console.log('Error occurred when prompting manager questions:', error));
};

const displayMenuOptions = () => {
    inquirer.prompt(menuOptions)
        .then(({ menuChoice }) => {
            if (menuChoice === ADD_ENGINEER) {
                // if engineer ...
                inquirer.prompt(engineerQuestions)
                    .then((engineerAnswers) => {
                        const engineer = new Engineer(engineerAnswers);
                        employees.push(engineer);
                        displayMenuOptions();
                    })
                    .catch((error) => console.log('Error occurred when prompting engineer questions:', error));
            } else if (menuChoice === ADD_INTERN) {
                console.log('intern chosen')
                // if intern ...
                inquirer.prompt(internQuestions)
                    .then((internAnswers) => {
                        const intern = new Intern(internAnswers);
                        employees.push(intern);
                        displayMenuOptions();
                    })
                    .catch();
            } else {
                // if done ...
                console.log('done chosen')
            }
        })
        .catch();
};

const writeHtmlDoc = () => {
    Promise.all([readTemplate(templateTop), makeEmployeeCards(), readTemplate(templateBottom)])
    .then( (data) => {
        console.log('kkkkkkkkkkk', data)
        fs.writeFile(outputPathAndFilename, data, (error) => {
            if (error) reject(`Error occurred in writeContent()`, error);
        });
    })
    .catch( (error) => console.log('Error occurred in writeHtmlDoc()', error));
};

const readTemplate = (templateFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(templateFile, 'utf8', (error, data) => {
            if (error) reject('Error occurred in readTemplateTop():', error);
            else resolve(data);
        });
    });
};

let employeeCards = '';
const makeEmployeeCards = () => {
    return new Promise((resolve, reject) => {
        for (const employee of employees) {
            // pass employee to template and get content back.
            const employeeCard = makeEmployeeCard(employee);
            employeeCards += employeeCard;
            console.log('ddddddddd', employeeCards)
        }
        resolve(employeeCards);
    });

};

// Returns html card for an employee.
const makeEmployeeCard = ( {employeeId, name, email, github}) => `
    <div class="col card">
    <div class="card-header bg-primary">
        ${name}<br/>
        <img src="http://openweathermap.org/img/wn/04d@2x.png" /><br/>
        employee type
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${employeeId}</li>
        <li class="list-group-item">Email: ${email}   MAKE LINK!</li>
        <li class="list-group-item">GitHub: ${github}   MAKE LINK!</li>
    </ul>
    </div>
`;

// start();
writeHtmlDoc();
// const data = {employeeId: 22, name: 'kurt', email: 'myEmail', officeNumber: 333}
// const manager = new Manager(data);
// employees.push(manager)
// makeEmployeeCards()
// .then( (contents) => {
//     console.log(contents)
// });




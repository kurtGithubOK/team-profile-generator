// Imports
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
// Questions for prompting user input are put in a separate file, just for readability.
const { managerQuestions, menuOptions, engineerQuestions, internQuestions, ADD_ENGINEER, ADD_INTERN } = require('./src/questions');

// Constants for filenames.
const templateTop = './src/template-top.html';
const templateBottom = './src/template-bottom.html';
const outputPathAndFilename = './dist/myTeam.html';

// Global variables.
let employees = [];  // List of employees to be displayed on html page.

// App starts here.  Called from bottom of this index.js file.
const start = () => {
    promptForInput()
};

// Prompt user for manager questions.  
// When done, add Manager object to employees array and display menu options for continuing.
const promptForInput = () => {
    inquirer.prompt(managerQuestions)
        .then((response) => {
            const manager = new Manager(response);
            employees.push(manager);
            displayMenuOptions();
        })
        .catch((error) => console.log('Error occurred when prompting manager questions:', error));
};

// Display menu options for Add Engineer, Add Intern, or Done.
const displayMenuOptions = () => {
    inquirer.prompt(menuOptions)
        .then(({ menuChoice }) => {
            if (menuChoice === ADD_ENGINEER) {
                // If engineer was chosen ...
                inquirer.prompt(engineerQuestions)
                    .then((engineerAnswers) => {
                        const engineer = new Engineer(engineerAnswers);
                        employees.push(engineer);
                        displayMenuOptions();
                    })
                    .catch((error) => console.log('Error occurred when prompting engineer questions:', error));
                } else if (menuChoice === ADD_INTERN) {
                // If intern was chosen ...
                inquirer.prompt(internQuestions)
                    .then((internAnswers) => {
                        const intern = new Intern(internAnswers);
                        employees.push(intern);
                        displayMenuOptions();
                    })
                    .catch();
                } else {
                // If done, proceed to write html file.
                writeHtmlDoc();
            }
        })
        .catch( () => console.log('Error occurred when prompting user for menu options.'));
};

/*
This function simultaneously:
1) reads the html template top, 
2) generates cards for each of the entered employees, and
3) reads the html template bottom.
When those are complete, it combines the resulting strings into one
and writes it to the myTeam.html file.
*/
const writeHtmlDoc = () => {
    Promise.all([readTemplate(templateTop), makeEmployeeCards(), readTemplate(templateBottom)])
        .then((data) => {
            fs.writeFile(outputPathAndFilename, data.join(''), (error) => {
                if (error) reject(`Error occurred in writeContent()`, error);
            });
        })
        .catch((error) => console.log('Error occurred in writeHtmlDoc()', error));
};

// This function reads whatever file is passed to it and returns it as a string.
// Use for reading the top & bottom html templates.
const readTemplate = (templateFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(templateFile, 'utf8', (error, data) => {
            if (error) reject('Error occurred in readTemplateTop():', error);
            else resolve(data);
        });
    });
};

// This function iterates over the array of employees and 
// calls makeEmployeeCard(...) to generate an html card for each.
let employeeCards = '';
const makeEmployeeCards = () => {
    return new Promise((resolve, reject) => {
        for (const employee of employees) {
            // pass employee to template and get content back.
            const employeeCard = makeEmployeeCard(employee);
            employeeCards += employeeCard;
        }
        resolve(employeeCards);
    });
};

// This function uses template literals to generate the html for each employee card.
// It calls various helper functions defined below.
const makeEmployeeCard = ({ employeeId, name, email, officeNumber, github, school }) => {
    return `
    <div class="col-3 card mt-6">
    <div class="card-header bg-primary">
        <div class="h2 text-white">${name}</div>
        <div class="h2 text-white">${makeIcon(officeNumber, github)}
        ${makeEmployeeTypeString(officeNumber, github)}</div>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${employeeId}</li>
        <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
        ${makeCardThirdLine(officeNumber, github, school)}
    </ul>
    </div>
`};


// HELPER functions for makeEmployeeCard(...). ////////////////////////////////////////////////
// This function returns the font awesome <i> tag for a given employee's 
// parameters for the icons on the myTeam.html page.
const makeIcon = (officeNumber, github) => {
    let iconString = '';
    if (officeNumber) {
        iconString = 'fas fa-mug-hot';
    } else if (github) {
        iconString = 'fas fa-glasses';
    } else {
        iconString = 'fas fa-user-graduate';
    }
    return `<i class="${iconString}"></i>`;
};

// This function returns the title for a given employee's parameters.
const makeEmployeeTypeString = (officeNumber, github) => {
    let employeeTypeString = '';
    if (officeNumber) {
        employeeTypeString = 'Manager';
    } else if (github) {
        employeeTypeString = 'Engineer';
    } else {
        employeeTypeString = `Intern`;
    }
    return employeeTypeString;
};

// This function generates the <li> tag for the bottom line of the employee card.
const makeCardThirdLine = (officeNumber, github, school) => {
    let content = '';
    content += '<li class="list-group-item">';
    if (officeNumber) {
        content += 'Office Number: ' + officeNumber;
    } else if (github) {
        content += `GitHub: <a href="https://github.com/${github}" target="new">github</a>`;
    } else {
        content += `School: ${school}`;
    }
    content += '</li>';
    return content;
};

// Start the app! :)
start();


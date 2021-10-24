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
        writeHtmlDoc();
      }
    })
    .catch();
};

const writeHtmlDoc = () => {
  Promise.all([readTemplate(templateTop), makeEmployeeCards(), readTemplate(templateBottom)])
    .then((data) => {
      fs.writeFile(outputPathAndFilename, data.join(''), (error) => {
        if (error) reject(`Error occurred in writeContent()`, error);
      });
    })
    .catch((error) => console.log('Error occurred in writeHtmlDoc()', error));
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
    }
    resolve(employeeCards);
  });
};

// Returns html card for an employee.
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

// If officeNumber is truthy, its a manager.  Similar for thers.
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

start();
// const data = { employeeId: 22, name: 'kurt', email: 'myEmail', officeNumber: 333, github: 'kurtGithubOK', school: 'west anchorage' }
// const manager = new Manager(data);
// employees.push(manager)
// makeEmployeeCards()
// .then((contents) => {
//     console.log('eeeee', contents)
// });
// writeHtmlDoc();



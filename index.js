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
const templateHeaderPathAndFilename = './src/template-header.html';
const templateFooterPathAndFilename = './src/template-footer.html';
const outputPathAndFilename = './dist/myTeam.html';


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
    // promptForInput()
    // .then((responses) => {
    writeHtmlDoc();
    // })
    // .catch((err) => console.error('An error occured when writing the myTeam.html file:', err));
};



// Generate html doc.
const writeHtmlDoc = () => {
    writeHtmlTop();
    writeEmployees();
    writeHtmlBottom();
};

// Copies content of template-header.html and places into dist/myTeam.html.
const writeHtmlTop = () => {
    fs.readFile(templateHeaderPathAndFilename, 'utf8', (error, data) => {
        if (error) console.error(`Error reading ${templateHeaderPathAndFilename}`, error);
        else {
            fs.writeFile(outputPathAndFilename, data, (err) => {
                if (err) console.error(`Error writing ${templateHeaderPathAndFilename}`, err);
                else console.log(`Success writing ${templateHeaderPathAndFilename}`);
            });
        }
    });
};

const writeEmployees = () => {

};

const writeHtmlBottom = () => {
    fs.readFile(templateFooterPathAndFilename, 'utf8', (error, data) => {
        if (error) console.error(`Error reading ${templateFooterPathAndFilename}`, error);
        else {
            fs.appendFile(outputPathAndFilename, data, (err) => {
                if (err) console.error(`Error appending ${templateFooterPathAndFilename}`, err);
                else console.log(`Success appending ${templateFooterPathAndFilename}`);
            });
        }
    });
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

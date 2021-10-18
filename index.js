// Imports
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

/*
// icon <i class="far fa-save">
const icon = $('<i>');
icon.addClass('far');
icon.addClass('fa-save');
*/

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

const employeesDiv = document.getElementById('employees');



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
    console.log('xxxxxxxxxxxxxx')
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
}

// Generate html doc.
const generateHtmlDoc = () => {

};

/*
<div class="col card">
    <div class="card-header bg-primary">
        <div>First name</div>
        <img src="http://openweathermap.org/img/wn/04d@2x.png" /><br/>
        <div>employee type</div>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: 666</li>
        <li class="list-group-item">Email: kurtheim!yah.com</li>
        <li class="list-group-item">GitHub: asdfasdfadfs</li>
    </ul>
</div>
*/
// const renderEmployeeCard = (employee) => {
//     // Make the overall card.
//     const cardDiv = document.createElement('div');
//     cardDiv.classList.add('col', 'card');

//     // Make header.
//     const headerDiv = document.createElement('div');
//     headerDiv.classList.add('card-header', 'bg-primary');

//     const employeeNameDiv = document.createElement('div');
//     employeeNameDiv.textContent = employee.name;
//     headerDiv.appendChild(employeeNameDiv);

//     const icon = document.createElement('i');
//     icon.classList('far', 'far-save');
//     headerDiv.appendChild(icon);

//     const employeeTypeDiv = document.createElement('div');
//     employeeTypeDiv.textContent = typeof employee;
//     headerDiv.appendChild(employeeTypeDiv);

//     // Make footer ul.
//     const footerDiv = document.createElement('ul');
//     footerDiv.classList.add('list-group', 'list-group-flush');
//     const liTemplate = document.createElement('li');
//     liTemplate.classList.add('list-group-item');
//     liTemplate.textContent = `ID: ${employee.id}`;
//     footerDiv.appendChild(liTemplate);
//     footerDiv.appendChild(liTemplate);
//     footerDiv.appendChild(liTemplate);

//     // Assemble parts.
//     cardDiv.appendChild(headerDiv);
//     cardDiv.appendChild(footerDiv);
//     employeesDiv.appendChild(cardDiv);
// };

const start = () => {
    // deleteOldFiles();
    getManagerInfo()
        .then((managerInfo) => {
            // Make manager object.
            makeManagerObject(managerInfo);

            counter++;
            // Display menu
            displayMenuOptions()
                .then(({ menuChoice }) => {

                    console.log('zzzzzzzzzzzzzzzzzzzz', menuChoice)
                    if (menuChoice === ADD_ENGINEER) {
                        console.log('engineer chosen')
                        // if engineer ...
                        getEngineerInfo()
                            .then((engineerInfo) => {
                                console.log('engineerInfo', engineerInfo)
                                makeEngineerObject(engineerInfo);
                            })
                            .catch();

                    } else if (menuChoice === ADD_INTERN) {
                        console.log('intern chosen')
                        // if intern ...
                        getInternInfo()
                            .then((internInfo) => {
                                console.log('intern info', internInfo)
                                makeInternObject(internInfo);
                            })
                            .catch();

                    } else {
                        // if done ...
                        console.log('done chosen')
                        proceed = false;
                    }
                })
                .catch();

        })
        .catch();
}
start();

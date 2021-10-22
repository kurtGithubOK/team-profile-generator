// Constants.
const ADD_ENGINEER = 'Add Engineer';
const ADD_INTERN = 'Add Intern';
const DONE = 'Done';

const managerQuestions = [
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
];

const menuOptions = [
    {
        type: 'list',
        name: 'menuChoice',
        message: 'What would you like to do next?',
        choices: [ADD_ENGINEER, ADD_INTERN, DONE]
    }
];

const engineerQuestions = [
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
];

const internQuestions = [
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
];

module.exports = { 
    managerQuestions, 
    menuOptions, 
    engineerQuestions, 
    internQuestions,
    ADD_ENGINEER,
    ADD_INTERN,
    DONE
};


const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

describe('Verify Employee-based objects are correctly constructed.', () => {
    it('Manager object correctly constructed', () => {
        // Prepare properties for object construction.
        const params = {
            employeeId: 1,
            name: 'Mr. Manager',
            email: 'manager@gmail.com',
            officeNumber: 111
        };
        // Instantiate object to be tested.
        const testManager = new Manager(params);

        // Assertions.
        expect(testManager.employeeId).toEqual(params.employeeId);
        expect(testManager.name).toEqual(params.name);
        expect(testManager.email).toEqual(params.email);
        expect(testManager.officeNumber).toEqual(params.officeNumber);
    });

    it('Engineer object correctly constructed', () => {
        // Prepare properties for object construction.
        const params = {
            employeeId: 2,
            name: 'Mr. Engineer',
            email: 'engineer@gmail.com',
            github: 'kurtGithubOK'
        };
        // Instantiate object to be tested.
        const testEngineer = new Engineer(params);

        // Assertions.
        expect(testEngineer.employeeId).toEqual(params.employeeId);
        expect(testEngineer.name).toEqual(params.name);
        expect(testEngineer.email).toEqual(params.email);
        expect(testEngineer.github).toEqual(params.github);
    });

    it('Intern object correctly constructed', () => {
        // Prepare properties for object construction.
        const params = {
            employeeId: 2,
            name: 'Mr. Intern',
            email: 'intern@gmail.com',
            school: 'UAF'
        };
        // Instantiate object to be tested.
        const testIntern = new Intern(params);

        // Assertions.
        expect(testIntern.employeeId).toEqual(params.employeeId);
        expect(testIntern.name).toEqual(params.name);
        expect(testIntern.email).toEqual(params.email);
        expect(testIntern.school).toEqual(params.school);
    });

});

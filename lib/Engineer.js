const Employee = require('./Employee');

class Engineer extends Employee {
  constructor( {employeeId, name, email, github} ) {
    super(employeeId, name, email);
    this.github = github;
  }

  getGithub() {
      return this.github;
  }

  getRole() {
      return 'Engineer';
  }

}

module.exports = Engineer;


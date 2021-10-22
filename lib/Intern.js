const Employee = require('./Employee');

class Intern extends Employee {
  constructor( {employeeId, name, email, school} ) {
    super(employeeId, name, email);
    this.school = school;
  }

  getSchool() {
      return this.school;
  }

  getRole() {
      return 'Intern';
  }

}

module.exports = Intern;


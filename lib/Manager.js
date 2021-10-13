const Employee = require('./Employee');

class Manager extends Employee {
  constructor(employeeId, name, email, officeNumber) {
    super(employeeId, name, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
      return this.officeNumber;
  }

  getRole() {
      return 'Manager';
  }

}

module.exports = Manager;


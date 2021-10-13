// This is the base class that Manager, Engineer & Intern extend.
class Employee {
    constructor(employeeId, name, email) {
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
    }

    getEmployeeId() {
        return this.employeeId;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }

}

module.exports = Employee;

class Employee {
    constructor(name,id,email,role) {
        this.id = id
        this.name = name      
        this.role = role
        this.email = email
    }

    getName(){
        return this.name
    }

    getId(){
        return this.id
    }

    getEmail(){
        return this.email
    }
    
    getRole(){
        return this.role
    }
}

module.exports = Employee;
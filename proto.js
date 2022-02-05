// Object.prototype
// Person.prototype

// Inherite the Person Prototype Methods
Customer.prototype = Object.create(Person.prototype);
// Make the customer.prototype return Customer
Customer.prototype.constructor = Customer;

function Person (firstName, lastName, dob){
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
    // this.calculateAge = 
}

// Calculate Age
Person.prototype.calculateAge = function(){
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

Person.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`;
}

// Gets Married 
Person.prototype.getsMarried = function(newLastName){
    this.lastName = newLastName;
}

const John = new Person ('John', 'Golden', '2-3-1987');
const Marry = new Person ('Marry', 'Golden', '2-5-1997');

console.log(Marry.getFullName());

Marry.getsMarried('Smith');
console.log(Marry.getFullName());

console.log(Marry.hasOwnProperty('firstName'));


Person.prototype.greeting = function(){
    return `Hey there, ${this.firstName} ${this.lastName}`;
}

// const per1 = new Person('Kamen', "Kanchev");

console.log(John.greeting());

//Customer Constructor
function Customer (firstName, lastName, phoneNum, membership){
    Person.call(this, firstName, lastName);
    this.phoneNum = phoneNum;
    this.membership = membership;
}

// Customer Greeting Method
Customer.prototype.greeting = function(){
    return `Hey there Customer, ${this.firstName} ${this.lastName}`;
}

const Cust1 = new Customer('Tom', 'Smith', '0234234', '443');
console.log(Cust1);

console.log(Cust1.greeting());


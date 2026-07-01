// task 1

class Person {
    #email;
    #id;

    constructor(name, email, id) {
        this.name = name;
        this.#email = email;
        this.#id = id;
    }

    get email() {
        return this.#email;
    }

    set email(newEmail) {
        if (newEmail.includes("@")) {
            this.#email = newEmail;
        }
    }

    get id() {
        return this.#id;
    }

    set id(newId) {
        if (newId > 0) {
            this.#id = newId;
        }
    }

    describeRole() {
        return "I am a member of the school.";
    }
}

class Principal extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
    }

    removeMember(id) {
        this.members = this.members.filter(m => m.id !== id);
    }

    listMembers() {
        return this.members;
    }

    describeRole() {
        return `I am the Principal. My name is ${this.name}.`;
    }
}

class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);
        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {
        this.grades.push({ studentName, grade });
    }

    listGradedStudents() {
        return this.grades;
    }

    describeRole() {
        return `I am the Teacher. I teach ${this.subject}.`;
    }
}

class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.subjects = [];
    }

    enroll(subject) {
        this.subjects.push(subject);
    }

    viewSubjects() {
        return this.subjects;
    }

    describeRole() {
        return `I am a Student. My name is ${this.name}.`;
    }
}

const principal = new Principal("Mr. Ahmed", "ahmed@school.com", 1);
const teacher = new Teacher("Miss Sara", "sara@school.com", 2, "Math");
const student = new Student("Youssef", "youssef@school.com", 3);

principal.addMember(teacher);
principal.addMember(student);

teacher.gradeStudent("Youssef", "A");

student.enroll("Math");
student.enroll("Science");

const allMembers = [principal, teacher, student];
allMembers.forEach(member => {
    console.log(member.describeRole());
});



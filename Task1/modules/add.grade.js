const { readGrades } = require('./read.grades');
const saveGrades = require('./save.grades');

function addGrade(studentName, subject, grade) {
    if (!studentName || !subject || grade === undefined) {
        console.log('Please provide name, subject, and grade.');
        return;
    }

    const grades = readGrades();
    
    const newRecord = {
        id: Date.now().toString(),
        studentName,
        subject,
        grade: Number(grade)
    };

    grades.push(newRecord);
    
    if (saveGrades(grades)) {
        console.log(`Grade added successfully for ${studentName}!`);
    }
}

module.exports = addGrade;
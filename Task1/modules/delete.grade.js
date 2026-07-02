const { readGrades } = require('./read.grades');
const saveGrades = require('./save.grades');

function deleteGrade(identifier) {
    const grades = readGrades();
    
    
    const filteredGrades = grades.filter(g => g.id !== identifier && g.studentName.toLowerCase() !== identifier.toLowerCase());

    if (grades.length === filteredGrades.length) {
        console.log(`No matching record found for "${identifier}" to delete.`);
        return;
    }

    if (saveGrades(filteredGrades)) {
        console.log(`Records matching "${identifier}" deleted successfully!`);
    }
}

module.exports = deleteGrade;
const { readGrades } = require('./read.grades');
const saveGrades = require('./save.grades');

function updateGrade(id, updatedData) {
    const grades = readGrades();
    const index = grades.findIndex(g => g.id === id);

    if (index === -1) {
        console.log(`Record with ID ${id} not found.`);
        return;
    }

    
    grades[index] = { ...grades[index], updatedData };

    if (saveGrades(grades)) {
        console.log(`Record ID ${id} updated successfully!`);
    }
}

module.exports = updateGrade;
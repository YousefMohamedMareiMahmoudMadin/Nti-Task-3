const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/grades.json');

function readGrades() {
    try {
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading grades:', error.message);
        return [];
    }
}

function displayGrades() {
    const grades = readGrades();
    if (grades.length === 0) {
        console.log('No student grades found.');
        return;
    }
    console.log('\n Student Grades List');
    console.table(grades);
}

module.exports = { readGrades, displayGrades };
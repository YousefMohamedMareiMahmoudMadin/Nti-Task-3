const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/grades.json');

function saveGrades(grades) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(grades, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving grades:', error.message);
        return false;
    }
}

module.exports = saveGrades;
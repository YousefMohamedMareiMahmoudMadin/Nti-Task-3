const addGrade = require('./modules/add.grade');
const { displayGrades, readGrades } = require('./modules/read.grades');
const updateGrade = require('./modules/update.grade');
const deleteGrade = require('./modules/delete.grade');

console.log('Student Grades Manager \n');

addGrade('Yousef Mohamed', 'Node.js', 98);
addGrade('Ahmed Ali', 'Angular', 85);

displayGrades();

const currentGrades = readGrades();
if (currentGrades.length > 0) {
    const firstStudentId = currentGrades[0].id;
    console.log(`\n Updating grade for ID: ${firstStudentId}...`);
    updateGrade(firstStudentId, { grade: 100 }); 
    

    displayGrades();
}

console.log('\n deleting for student: "Ahmed Ali"...');
deleteGrade('Ahmed Ali');

displayGrades();
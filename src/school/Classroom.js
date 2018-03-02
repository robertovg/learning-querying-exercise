import Base from './Base';
import StudentsResults from './StudentResult';

export default class Class extends Base {
  constructor({ teacher, students = [] } = {}) {
    super();
    if (!teacher) {
      throw new Error('Any class need a teacher');
    }
    this.teacher = teacher;
    this.students = students;
    this.studentsResults = this.students.reduce((acc, student) => {
      acc[student.id] = new StudentsResults();
      return acc;
    }, {});
  }
}

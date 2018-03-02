import Teacher from './Teacher';
import Student from './Student';
import Classroom from './Classroom';
import Quiz from './Quiz';
import Question from './Question';

let teacher;
let students;

beforeEach(() => {
  /**
   * Let's create some Mock data for the tests. For classes of 40 students
   */
  teacher = new Teacher({ name: `Teacher` });

  students = Array.from({ length: 40 }, (e, i) => new Student({ name: `Student_${i}` }));
});

describe('There are Students', () => {
  it('if we add students they are in the classroom', () => {
    const classroom = new Classroom({ students, teacher });
    expect(classroom.students.length).toBe(students.length);
  });
  it("if we don't add teachers is empty", () => {
    const classroom = new Classroom({ teacher });
    expect(classroom.students.length).toBe(0);
  });
});

describe('There is at least a Teacher in a class', () => {
  it('if we the teacher they are in the classroom', () => {
    const classroom = new Classroom({ teacher });
    expect(classroom.teacher.name).toBe(teacher.name);
  });
  it("if we don't add a teacher into the class it should emit exception", () => {
    expect(() => {
      // eslint-disable-next-line
      const a = new Classroom();
    }).toThrow(new Error('Any class need a teacher'));
  });
});

describe('We can have both Students && Teacher and everything work nice', () => {
  it('we can add teachers & students they are in the classroom', () => {
    const classroom = new Classroom({ teacher, students });
    expect(classroom.teacher.name).toBe(teacher.name);
    expect(classroom.students.length).toBe(students.length);
  });
});

describe('Students can have quizzes', () => {
  it('One student could have no quizzes in a classroom', () => {
    const classroom = new Classroom({ teacher, students });
    expect(classroom.studentsResults[students[0].id]).toBeDefined();
  });
  it('One student could have no quizzes in a classroom should have a grade ( of 0 )', () => {
    const classroom = new Classroom({ teacher, students });
    expect(classroom.studentsResults[students[0].id].totalGrade()).toBe(0);
  });
  it('One student could have 1 quiz, and his classroom grade will be the only quiz grade', () => {
    const classroom = new Classroom({ teacher, students });
    const questions = [
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
    ];
    questions[0].answer(0);
    questions[1].answer(1);
    questions[2].answer(2);
    // Answered 3 of 4, with just one good answer, this means a grade of 25%
    classroom.studentsResults[students[0].id].quizzes = [new Quiz({ questions })];
    expect(classroom.studentsResults[students[0].id].totalGrade()).toBe(25);
  });
  it(`One student could have multiple quizzes, and his classroom grade will be average of
  all quiz grade`, () => {
    const classroom = new Classroom({ teacher, students });
    const questionsQuiz1 = [
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
    ];

    const questionsQuiz2 = [
      new Question({
        options: ['option a', 'option b', 'option c'],
        correctAnswer: 0,
      }),
    ];

    questionsQuiz1[0].answer(0);
    questionsQuiz1[1].answer(1);
    questionsQuiz1[2].answer(2);
    // Answered 3 of 4, with just one good answer, this means a grade of 25%

    questionsQuiz2[0].answer(0);
    // Answered 1 of 1, 100% grade

    classroom.studentsResults[students[0].id].quizzes = [
      new Quiz({ questions: questionsQuiz1 }),
      new Quiz({ questions: questionsQuiz2 }),
    ];
    // The average is 62.5%
    expect(classroom.studentsResults[students[0].id].totalGrade()).toBe(62.5);
  });
});

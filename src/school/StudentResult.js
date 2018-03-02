import Base from './Base';

export default class StudentResult extends Base {
  constructor({ quizzes = [] } = {}) {
    super();
    this.quizzes = quizzes;
  }
  totalGrade() {
    if (!this.quizzes.length) {
      return 0;
    }
    const totalPossibleAmount = this.quizzes.length * 100;
    const summaryQuizzesGrades = this.quizzes.reduce((acc, quiz) => acc + quiz.grade(), 0);
    return Number.parseFloat((summaryQuizzesGrades / totalPossibleAmount * 100).toFixed(2));
  }
}

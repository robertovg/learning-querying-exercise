import Base from './Base';

export default class Quiz extends Base {
  constructor({ questions = [] } = {}) {
    super();
    if (!questions.length) {
      throw new Error('Is boring to create a quiz without questions');
    }

    this.questions = questions;
  }

  grade() {
    const numberOfQuestions = this.questions.length;
    const rightAnswers = this.questions.filter(q => q.isOk()).length;
    return Number.parseFloat((rightAnswers / numberOfQuestions * 100).toFixed(2));
  }
}

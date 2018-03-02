import Base from './Base';
/**
 * Question will contain only a string array of options and the correct answer.
 *
 * Then we can answer a Question
 */
export default class Question extends Base {
  constructor({ correctAnswer, options = [] } = {}) {
    super();
    if (!options.length) {
      throw new Error('A question need options');
    }

    if (!options[correctAnswer]) {
      throw new Error('Question need a valid correctAnswer');
    }
    this.correctAnswer = correctAnswer;
    this.options = options;
  }

  answer(userChoice) {
    this.userChoice = userChoice;
  }
  isOk() {
    return this.correctAnswer === this.userChoice;
  }
}

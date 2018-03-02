import Question from './Question';

let reusableQuestion;

beforeEach(() => {
  // To make test simples, we will have correct answer 0
  reusableQuestion = new Question({
    options: ['option a', 'option b', 'option c'],
    correctAnswer: 0,
  });
});

describe('Questions are well created', () => {
  it('If there is no options in a question we should inform', () => {
    expect(() => {
      // eslint-disable-next-line
      const question = new Question();
    }).toThrow(new Error('A question need options'));
  });
  it('If there is no options in a question we should inform', () => {
    expect(() => {
      // eslint-disable-next-line
      const question = new Question({ options: ['option a', 'option b', 'option c'] });
    }).toThrow(new Error('Question need a valid correctAnswer'));
  });

  it('The correctAnswer is well saved', () => {
    expect(reusableQuestion.options[reusableQuestion.correctAnswer]).toBe('option a');
  });
});

describe('Questions can be answered', () => {
  it('If not answered is incorrect', () => {
    expect(reusableQuestion.isOk()).toBe(false);
  });
  it('If is badly answered is incorrect', () => {
    reusableQuestion.answer(2);
    expect(reusableQuestion.isOk()).toBe(false);
  });
  it('If is correctly answered is correct', () => {
    reusableQuestion.answer(0);
    expect(reusableQuestion.isOk()).toBe(true);
  });
});

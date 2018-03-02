import Quiz from './Quiz';
import Question from './Question';

let questions;

beforeEach(() => {
  questions = Array.from({ length: 10 }, (qe, questionIndex) => {
    // First we generate options, as many as current index + 2 ( to avoid 0 and 1 ).
    // To make test simples, we will have correct answer 0
    const options = Array.from(
      { length: questionIndex + 2 },
      (oe, optionIndex) => `option_${questionIndex}-${optionIndex}`
    );
    const correctAnswer = 0;
    return new Question({ correctAnswer, options });
  });
});

describe('Creating the quiz correctly', () => {
  it('quizzes should have more than one questions', () => {
    expect(() => {
      // eslint-disable-next-line
      const quiz = new Quiz();
    }).toThrow(new Error('Is boring to create a quiz without questions'));
  });
  it('A quiz can contain multiple questions', () => {
    const quiz = new Quiz({ questions });
    expect(quiz.questions).toBe(questions);
  });
});

describe('Quiz has grade', () => {
  it("If we don't answer the questions of a quiz the grade is 0", () => {
    const quiz = new Quiz({ questions });
    expect(quiz.grade()).toBe(0);
  });

  it('If all the questions are correctly answered we got a 100', () => {
    const quiz = new Quiz({ questions });
    quiz.questions.forEach(question => {
      // Good Answer
      question.answer(0);
    });
    expect(quiz.grade()).toBe(100);
  });

  it('If we have 1 of 2 questions right we got a 50', () => {
    const questionToUse = [questions[0], questions[1]];
    const quiz = new Quiz({ questions: questionToUse });
    // Good Answer
    quiz.questions[0].answer(0);
    // Bad Answer
    quiz.questions[0].answer(0);

    expect(quiz.grade()).toBe(50);
  });
});

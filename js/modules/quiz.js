/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

export default class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentIndex = 0;
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return { done: false };
    } else return { done: true };
  }

  currentQuestion() {
    return this.questions[this.currentIndex];
  }

  guess(userGuess) {
    if (this.currentQuestion().isCorrect(userGuess)) this.score++;
    return this.next();
  }

  reset() {
    this.score = 0;
    this.currentIndex = 0;
  }
}

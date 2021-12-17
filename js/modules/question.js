/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

export default class Question {
  constructor(question, answers, key) {
    this.question = question;
    this.answers = answers;
    this.key = key;
  }

  isCorrect(guessKey) {
    return guessKey === this.key;
  }
}

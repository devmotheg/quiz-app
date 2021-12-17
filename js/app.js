/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import Question from "./modules/question.js";
import Quiz from "./modules/quiz.js";

const App = (_ => {
  const appQuestionEl = document.querySelector(".app__question"),
    appTrackerEl = document.querySelector(".app__tracker"),
    progressInnerEl = document.querySelector(".progress__inner"),
    appTaglineEl = document.querySelector(".app__tagline"),
    appChoicesEl = document.querySelector(".app__choices"),
    nextEl = document.querySelector(".next"),
    restartEl = document.querySelector(".restart");

  const getPercentage = (num, max) => Math.floor((num / max) * 100);

  const generateQuestions = _ => {
    const q1 = new Question(
      "When was JavaScript created?",
      ["June 1995", "May 1995", "July 1885", "Sep 1996"],
      1
    ),
      q2 = new Question(
        "The full form of HTML is...",
        ["Hyper Text Markup Language", "Hold The Mic Lol"],
        0
      ),
      q3 = new Question(
        "console.log(typeof []) would print what?",
        ["Array", "Object", "String"],
        1
      ),
      q4 = new Question(
        "What does CSS stand for?",
        [
          "County Sherif Service",
          "Cascading Sexy Sheets",
          "Counter Strike Super",
          "Cascading Style Sheets",
        ],
        3
      ),
      q5 = new Question("Who created this web-app?", ["Mohamed Muntasir"], 0);
    return [q1, q2, q3, q4, q5];
  };

  const quiz = new Quiz(generateQuestions());

  const renderEndScreen = (score, total) => {
    appTrackerEl.textContent = `Your score is ${getPercentage(score, total)}%`;
    appChoicesEl.innerHTML = "";
    nextEl.style.display = "none";
  };

  const renderQuestion = text => {
    appQuestionEl.textContent = text;
  };

  const renderTracker = (curr, total) => {
    appTrackerEl.textContent = `${curr} of ${total}`;
  };

  const renderProgress = (i, length) => {
    let width = progressInnerEl.style.width;
    width = width.slice(0, width.length - 1) - "0";
    const max = getPercentage(i, length),
      num = max - width > 0 ? 1 : -1;
    const PROGRESS = setInterval(_ => {
      if (width === max) clearInterval(PROGRESS);
      else {
        width += num;
        progressInnerEl.style.width = `${width}%`;
      }
    }, 3);
  };

  const renderTagLine = text => {
    appTaglineEl.textContent = text;
  };

  const renderChoices = _ => {
    appChoicesEl.innerHTML = "";
    quiz.currentQuestion().answers.forEach((a, i) => {
      appChoicesEl.innerHTML += `
      <li class="app__choice">
        <input class="app__input" id="choice${i}" type="radio" data-choice="${i}" name="choice" />
        <label class="app__label" for="choice${i}">
          <i></i>
          <span>${a}</span>
        </label>
      </li>
      `;
    });
  };

  const renderAll = done => {
    if (done) {
      renderQuestion("Congratulations!");
      renderProgress(quiz.currentIndex + 1, quiz.questions.length);
      renderTagLine("Complete!");
      renderEndScreen(quiz.score, quiz.questions.length);
    } else {
      renderQuestion(quiz.currentQuestion().question);
      renderTracker(quiz.currentIndex + 1, quiz.questions.length);
      renderProgress(quiz.currentIndex, quiz.questions.length);
      renderTagLine("Pick an option below!");
      renderChoices();
    }
  };

  const fireListeners = _ => {
    nextEl.addEventListener("click", _ => {
      const picked = appChoicesEl.querySelector("input:checked");
      if (picked)
        renderAll(quiz.guess(picked.getAttribute("data-choice") - "0").done);
    });

    restartEl.addEventListener("click", _ => {
      quiz.reset();
      nextEl.style.display = null;
      renderAll();
    });
  };

  return {
    renderAll,
    fireListeners,
  };
})();

App.renderAll();
App.fireListeners();

let questions = null;

fetch("/questions.json")
  .then((response) => response.json())
  .then((data) => questions = data)
  .catch(function (err) {
    console.log(err);
  });

function selectQuestion() {
  const i = Math.floor(Math.random() * questions.length);
  const question = questions[i].question;
  const objectOptions = questions[i].options;
  const answer = questions[i].answer;

  questions.splice(i, 1);

  displayQuestion(question);
  displayOptions(objectOptions);
  displayAnswer(answer);
}

function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  setTimeout(() => {
    questionElement.innerHTML = `${question}`;
    questionElement.removeAttribute("hidden");
    animateCSS("question", "fadeIn");
  }, 600);
}

function displayOptions(objectOptions) {
  const optionsElement = document.getElementById("options");
  let options = null;
  if (objectOptions) {
    options = "<ul>";
    Object.values(objectOptions).map((val) => {
      options += `<li> ${val} </li>`;
    });
    options += "</ul>";
  }

  setTimeout(() => {
    if (options) {
      optionsElement.innerHTML = `${options}`;
      optionsElement.removeAttribute("hidden");
      animateCSS("options", "fadeIn");
    } else {
      optionsElement.setAttribute("hidden", "hidden");
    }
  }, 1000);
}

function displayAnswer(answer) {
  const answerElement = document.getElementById("answer");
  answerElement.innerHTML = `<p> ${answer} </p>`;
}

function showAnswer() {
  const answerElement = document.getElementById("answer");
  setTimeout(() => {
    answerElement.removeAttribute("hidden");
    animateCSS("answer", "fadeIn");
  }, 500);
}

function hiddenElements() {
  document.getElementById("question").setAttribute("hidden", "hidden");
  document.getElementById("options").setAttribute("hidden", "hidden");
  document.getElementById("answer").setAttribute("hidden", "hidden");

  selectQuestion();
}

const btnQuestion = document.getElementById("btn-question");
const btnAnswer = document.getElementById("btn-answer");

btnQuestion.addEventListener("click", hiddenElements);
btnAnswer.addEventListener("click", showAnswer);


const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.getElementById(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

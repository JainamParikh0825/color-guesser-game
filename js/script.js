const newColorValue = document.getElementById("new-color-value");
const newGame = document.getElementById("new-game");
const currentResultText = document.getElementById("current-result");
const colorsAttemptedText = document.getElementById("colors-attempted-count");
const scoreText = document.getElementById("score");
const colorBox = document.querySelectorAll(".color-box");

let score, colorsAttempted, currentResult;

// functions
const init = () => {
  score = 0;
  colorsAttempted = 0;
  currentResult = "";

  newColorGuess();
};

const newColorGuess = (cr) => {
  // Take out random value from 0 - 255 for each color
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  newColorValue.textContent = `RGB(${red}, ${green}, ${blue})`;
  currentResultText.textContent = cr;
  colorsAttemptedText.textContent = colorsAttempted;
  scoreText.textContent = score;

  let correctColorBoxNumber = Math.floor(Math.random() * 6) + 1;

  colorBox.forEach((box) => {
    box.classList.remove("disappear");
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    if (box.id === `color-${correctColorBoxNumber}`) {
      box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else {
      box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
  });

  currentResultText.classList.remove("wrong");

  setTimeout(() => {
    currentResultText.textContent = "";
    currentResultText.classList.remove("correct");
  }, 1500);
};

init();

// Event Listeners
newGame.addEventListener("click", init);

colorBox.forEach((box) => {
  box.addEventListener("click", () => {
    let clickedBoxColor = box.style.backgroundColor;
    if (clickedBoxColor === newColorValue.textContent.toLowerCase()) {
      score += 1;
      colorsAttempted += 1;
      currentResultText.classList.add("correct");
      newColorGuess("CORRECT");
    } else if (
      clickedBoxColor !== newColorValue.textContent.toLowerCase() &&
      score >= 0
    ) {
      if (score != 0) {
        score -= 1;
      }
      currentResultText.classList.add("wrong");
      currentResultText.textContent = "WRONG";
      scoreText.textContent = score;
      box.classList.add("disappear");
    }
  });
});

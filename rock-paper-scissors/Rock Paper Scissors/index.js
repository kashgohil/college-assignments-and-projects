let userVar = 0;
let computerVar = 0;
const userScore_div = document.getElementById("score-user");
const computerScore_div = document.getElementById("score-computer");
const scoreboard_div = document.querySelector(".score-card");
const result_div = document.querySelector(".result");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");

function win(user, computer) {
  userVar++;
  userScore_div.innerHTML = userVar;
  computerScore_div.innerHTML = computerVar;
  const userSide = "user".fontsize(5).sub();
  const computerSide = "computer".fontsize(5).sub();
  document.getElementById(user).innerHTML = `<img src="${user}1.png" alt=${user}1/>`;
  result_div.innerHTML = `${user}${userSide} beats ${computer}${computerSide}. You Win!!`;
  document.getElementById(user).classList.add("winningRock");
  document.getElementById(computer).classList.add("losingRock");
  setTimeout(function(){document.getElementById(user).classList.remove("winningRock");
  document.getElementById(computer).classList.remove("losingRock");
  document.getElementById(user).innerHTML = `<img src="${user}.png" alt=${user}/>`;}, 1000);
}

function lose(user, computer) {
  computerVar++;
  userScore_div.innerHTML = userVar;
  computerScore_div.innerHTML = computerVar;
  const userSide = "user".fontsize(5).sub();
  const computerSide = "computer".fontsize(5).sub();
  document.getElementById(computer).innerHTML = `<img src="${computer}1.png" alt=${computer}/>`;
  result_div.innerHTML = `${user}${userSide} lose to ${computer}${computerSide}. You Lost...`;
  document.getElementById(user).classList.add("losingRock");
  document.getElementById(computer).classList.add("winningRock");
  setTimeout(function(){document.getElementById(user).classList.remove("losingRock");
  document.getElementById(computer).classList.remove("winningRock");
  document.getElementById(computer).innerHTML = `<img src="${computer}.png" alt=${computer}/>`}, 1000);
}

function draw(user, computer) {
  userScore_div.innerHTML = userVar;
  computerScore_div.innerHTML = computerVar;
  const userSide = "user".fontsize(5).sub();
  const computerSide = "computer".fontsize(5).sub();
  result_div.innerHTML = `${user}${userSide} equals ${computer}${computerSide}. It's a Draw!`;
  document.getElementById(user).classList.add("drawing");
  setTimeout(function(){document.getElementById(user).classList.remove("drawing")}, 1000);
}

function game(userChoice) {
  const choices = ["rock","paper","scissors"]
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  switch(userChoice + computerChoice) {
    case "rockscissors":
    case "scissorspaper":
    case "paperrock":
      win(userChoice, computerChoice);
      break;
    case "rockpaper":
    case "scissorsrock":
    case "paperscissors":
      lose(userChoice, computerChoice);
      break;
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      draw(userChoice, computerChoice);
      break;


  }
}

function main() {
    rock_div.addEventListener('click', function(){
      game("rock");
    })

    paper_div.addEventListener('click', function(){
      game("paper");
    })

    scissors_div.addEventListener('click', function(){
      game("scissors");
    })
}

main();

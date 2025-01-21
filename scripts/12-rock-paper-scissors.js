const score = {
  wins   : 0, 
  losses : 0, 
  ties   : 0 
};

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  resetScore();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (value) =>{
  if(value.key === 'r'){
    playGame('Rock');
  }
  else if(value.key === 'p'){
    playGame('Paper');
  }
  else if(value.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove){
const computerMove = pickComputerMove();
let   result       = '';

if(playerMove === 'Rock'){
  if(computerMove === 'Rock'){
    result = 'Tie.';
  }else if(computerMove === 'Paper'){
    result = 'You lose.';
  }else if(computerMove === 'Scissors'){
    result = 'You win.';
  }

}else if(playerMove === 'Paper'){
  if(computerMove === 'Rock'){
    result = 'You win.';
  }else if(computerMove === 'Paper'){
    result = 'Tie.';
  }else if(computerMove === 'Scissors'){
    result = 'You lose.';
  }

}else if(playerMove === 'Scissors'){
  if(computerMove === 'Rock'){
    result = 'You lose.';
  }else if(computerMove === 'Paper'){
    result = 'You win.';
  }else if(computerMove === 'Scissors'){
    result = 'Tie.';
  }
}

if(result === 'You win.'){
  score.wins += 1;
}
else if(result === 'You lose.'){
  score.losses += 1;
}
else if(result === 'Tie.'){
  score.ties += 1;
}

/*alert(`You picked ${playerMove}, and the computer picked ${computerMove}. ${result} \nWins :${score.wins} Losses :${score.losses} Ties :${score.ties}`);*/

document.querySelector('.js-result').innerText = result;
document.querySelector('.js-move').innerHTML = `You <img class ="emoji" src="emojis/${playerMove}-emoji.png"> <img class ="emoji" src="emojis/${computerMove}-emoji.png"> Computer`;
updateScoreElement();
}

localStorage.setItem('score', JSON.stringify(score));

function resetScore(){
score.wins = 0;
score.losses = 0;
score.ties = 0;
updateScoreElement();
}

function updateScoreElement(){
document.querySelector('.js-score').innerText = `Wins :${score.wins} Losses :${score.losses} Ties :${score.ties}`;
}


function pickComputerMove(){
const randomNumber = Math.random();
let   computerMove = '';

if(randomNumber >= 0 && randomNumber < 1 / 3){
  computerMove = 'Rock';
}else if(randomNumber >= 1 /3 && randomNumber < 2 / 3){
  computerMove = 'Paper'; 
}else{
  computerMove = 'Scissors';
}

return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
                  playGame(pickComputerMove());
                }, 1000);
                isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop'
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Play'
  }
}




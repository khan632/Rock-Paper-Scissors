// ** getComputerChoice randomly selects between `rock` `paper` `scissors` and returns that string **

const totalScore = {'playerScore': 0, 'computerScore': 0}
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors']
  const choosed = Math.floor(Math.random() * choices.length)
  return choices[choosed]
}
// console.log(getComputerChoice())

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
function getResult(playerChoice, computerChoice) {
  // return the result of score based on if you won, drew, or lost
  let score;
  // All situations where human draws, set `score` to 0
  if (playerChoice == computerChoice) {
    score = 0
  }
  // All situations where human wins, set `score` to 1
  // make sure to use else ifs here
  else if ((playerChoice == 'Rock' && computerChoice == 'Scissors') || (playerChoice == 'Paper' && computerChoice == 'Rock') || (playerChoice == 'Scissors' && computerChoice == 'Paper')) {
    score = 1
  }
  // Otherwise human loses (aka set score to -1)
  else{
    score = -1
  }
  // return score
  return score
}
// console.log(getResult('Rock', 'Rock'))

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
function showResult(score, playerChoice, computerChoice) {
  const resultDiv = document.getElementById('result')
  const handsDiv = document.getElementById('hands')
  const playerScoreDiv = document.getElementById('player-score')

  if(score == -1){
    resultDiv.innerText = 'You Lose!'
  }else if(score == 0){
    resultDiv.innerText = "It's a tie! Try Again"
  }else{
    resultDiv.innerText = 'You Won!'
  }

  handsDiv.innerText = `👦 ${playerChoice} | 🤖 ${computerChoice}`
  playerScoreDiv.innerText = `👦 Scores: ${totalScore['playerScore']} | AI score: ${totalScore['computerScore']}`
  // playerScoreDiv.innerText = `Your Scores: ${totalScore['computerScore']}`
}

// ** Calculate who won and show it on the screen **
function onClickRPS(playerChoice) {
  // console.log({playerChoice})
  const computerChoice = getComputerChoice()
  // console.log({computerChoice})
  const result = getResult(playerChoice, computerChoice)
   if(result == -1){
    totalScore['computerScore'] += 1
  }else if(result == 1){
     totalScore['computerScore'] += -1
  }else{
     totalScore['computerScore'] += 0
  }
  totalScore['playerScore'] += result

 showResult(result, playerChoice, computerChoice)
  // console.log({result})
  // console.log(totalScore)
}

// ** RPS buttons actively listen for a click and do something once a click is detected **
function playGame() {
  const rpsButtons = document.querySelectorAll('.rpsButton')
  // console.log(rpsButton)
  
  rpsButtons.forEach(rpsButton => {
    rpsButton.onclick = () => onClickRPS(rpsButton.value)
  })

  const endgameButton = document.getElementById('endGameButton')
  endgameButton.onclick = () => endGame(totalScore)
}

// ** endGame function clears all the text on the DOM **
function endGame(totalScore) {
  totalScore['playerScore'] = 0
  totalScore['computerScore'] = 0

  const resultDiv = document.getElementById('result')
  const handsDiv = document.getElementById('hands')
  const playerScoreDiv = document.getElementById('player-score')

  resultDiv.innerText = ''
  handsDiv.innerText = ''
  playerScoreDiv.innerText = ''
}

playGame()
const bet = document.getElementsByClassName('betChoice');
// console.log(bet)

Array.from(bet).forEach(button => {
  button.addEventListener('click', setValue)
});
function setValue(e) {
  //we need to grab the value from the button click
  //we need to set the value of the betValue input to = the value of the button clicked
  let targetValue = e.target.value
  // console.log(targetValue)

  const betValue = document.querySelector('.betValue')

  betValue.value = targetValue
  // console.log(betValue.value)
}

// we need to make a click event for "submit button"
// then we need to run a function so our game can run
// we need query selectors for both inputs
// we need a randomizing function which is (Math.random) and a conditional, that assigns a number to a color
// we need to check if the user win/lose
// so we will make a function to check if the user won/lost by using a conditional (if/else)

document.querySelector('.submitBtn').addEventListener('click', runGame)

let revenue = 0

function runGame() {
  let amount = document.querySelector('.betAmount').value
  amount = Number(amount)
  console.log(typeof amount)

  let betColor = document.querySelector('.betValue').value
  console.log(betColor)
  fetch('updateGame', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'color':betColor,
      'amount':amount
      
    
    })

  }) .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  
  })
  let random = Math.ceil(Math.random() * 37)
  

  if (random === 1 && betColor === 'green') {
    revenue -= amount * 35
    console.log('playerwinner!')

  } else if (random >= 2 && random <= 19 && betColor === 'black') {
    revenue -= amount * 2
    console.log('playerwinner!')

  } else if (random > 19 && betColor === 'red') {
    revenue -= amount * 2
    console.log('playerwinner!')

  } else {
    revenue += amount
    console.log('casino wins')
  }

  console.log('random result',random)
  console.log('casino revenue',revenue)

}
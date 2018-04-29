/*
 * Initialization of global variables
 */
let card = document.getElementsByClassName('card'); //Creates an HTML Collection of the li elements.
const cards = Array.from(card); //creates an array therefrom.
let deck = document.querySelector('.deck'); //a variable holding the <ul> element.
const matches = new Array(); //an array to hold all matches found.
let count=0;//counting no of open unmatched cards.
let movesCounter=document.querySelector('.moves');//the number of moves elements
let noOfMoves=0;//moves count
movesCounter.innerHTML=noOfMoves;
let starrating = document.querySelector('.stars');//the stars element
let restartbutton = document.querySelector('.restart');//the restart button
let finalstars=3;
let matchedmoves=0;
let clicked=0;
let interval;
let minutes = document.getElementById("minutes");//timer variables
let seconds = document.getElementById("seconds");
let now = 0, time=0, secs=0, mins=0, clocksecs=0;
let modal = document.querySelector('.modal-content');
let modalstatistics = document.querySelector('.statistics');

let completed = function()
{
if (matchedmoves==8)
gameover();
}

window.onload = function() //let the game begin!
{
   start();

}


function timer() //timer function
{

  interval= setInterval(function()
  {
  time = new Date().getTime() - now;//accurately calculate time in milliseconds.
  clocksecs = Math.floor(time / 1000);//calculate seconds.
  secs=clocksecs%60;//reset seconds every minute
  mins = Math.floor(clocksecs/60);//calculate minutes

        let min = Ticking(mins);//format minutes
        let sec = Ticking(secs);//format seconds

        minutes.textContent = min; //show in HTML
        seconds.textContent = ":" + sec;
      }, 1000);
    }


function Ticking(value)//a function for formatting minutes & seconds
{
    if (value < 10)
    {value = "0" + value;}
    return value;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function start() {

  modal.style.display = "none";
  now = new Date().getTime();
  noOfMoves=0;//reset number of moves.
  movesCounter.innerHTML=noOfMoves;
  starrating.style.display = "";
  let newcards = shuffle(cards);
  deck.innerHTML = ""; //remove existing <li> elements from ul.
  for (let i = 0; i < newcards.length; i++) //insert the shuffle cards.
  {
    deck.appendChild(newcards[i]); //append the <li> elements one by one.
    newcards[i].classList.remove('show', 'open', 'match'); //reset the board.
  }
  clickcard();
  restart();
  }

function openCard(evt) // a function to show the card once clicked.
{
  clicked++;//this sets-off the timer on the first click
  if (clicked==1)
  timer();
  let cardtemp=evt.target;
  if (cardtemp.classList!="card match" && cardtemp.classList!="card open show" && cardtemp.nodeName=="LI")//the right elements are pushed onto the stack
  {
  cardtemp.classList +=" open show";//done
  matches.push(cardtemp);//push first card onto the stack.
  count++;//increment counter
  if (count==2)//check to see if they match.
  {
  incrementMoves();
  match();
  stars();

  }
}
}

function incrementMoves()//a function to display the number of moves. Two clicks count as one move.
{
  noOfMoves++;
  movesCounter.innerHTML=noOfMoves;

}

function clickcard() //event listener for click.
{
  deck.addEventListener('click', openCard);

}


function match()
{
  count=0;
  let temp1=matches.pop();
  let temp2=matches.pop();
  if (temp1.innerHTML != temp2.innerHTML)
  {
  setTimeout (function remove() {
  temp1.classList.remove("open", "show");
  temp2.classList.remove("open", "show");}, 700);
}
  else
  {
    temp1.classList="card match";
    temp2.classList="card match";
    ++matchedmoves;
    if (matchedmoves===8)
    gameover();

  }
}

function gameover()
{
  clearInterval(interval);//stop the timer
  //deck.removeEventListener('click', openCard);
  modal.style.display="";
  statistics.textContent =
  "You completed the game in " + mins + " minutes," + " " + secs +" seconds" + " with " + finalstars + " stars left.";
  //deck.addEventListener('click', start);
}

function stars() //a function the change the star rating after a number of moves.
{
  if (noOfMoves==10)
  {
    let starone = starrating.children[0];
    starone.style.display="none";
    finalstars=2;
    }

  else if (noOfMoves==20)
  {
    let startwo = starrating.children[1];
    startwo.style.display="none";
    finalstars=1
  }
  return finalstars;
}

function reset()
{
  clearInterval(interval);//stop & reset the timer
  time=0;
  clicked=0;
  matchedmoves=0;
  minutes.textContent = "00"; //show in HTML
  seconds.textContent = ":" + "00";
  start();

}

function restart()
{

  restartbutton.addEventListener('click', reset);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

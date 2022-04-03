//define doc with variable
//when press start button game will start
//timer will start countdown and when answer right or wrong time restart

//word box randomize word to guess - creat array with the word
//word box have to change from _ _ _ _ to word in the array.


let word = document.querySelector('#word-random');
let start = document.querySelector('#Start');
let reset = document.querySelector('#reset');
let winsSpan = document.querySelector('#win');
let lossesSpan = document.querySelector('#lose')
let wordContent = document.querySelector('.word');
let timeCount = document.querySelector('#countdown');
let wordGuess = ['MAZDA', 'HONDA', 'TOYOTA', 'AUDI', 'NISSAN','LAMBORGHINI',
'FERRARI','DODGE','FORD','CHEVY','VOLKSWAGEN'];
console.log(wordGuess.length);
let randomNum;
let isPlaying = false;
let guessArr = [];
let timer;
let timeLeft = 15;
let wins = localStorage.getItem('wins') || 0;
let losses = localStorage.getItem('losses') || 0;
winsSpan.textContent = wins;
lossesSpan.textContent = losses;





function startGame(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    timeLeft = 15;
    guessArr = [];
randomNum =  wordGuess[Math.floor(Math.random() * wordGuess.length)]
randomNum = randomNum.split('');


for (let i = 0; i < randomNum.length; i++) {
     guessArr.push('_');
    
}

word.textContent = guessArr.join(' ');
startTimer();
}

function startTimer () {
  timeCount.textContent = timeLeft
  timer = setInterval(function (){
      console.log(timeLeft)
      timeLeft --;
      timeCount.textContent = timeLeft
      if(timeLeft <= 0){
          clearInterval(timer);
          word.textContent = `Too SLOW!!! the word was: ${randomNum.join('')}`;
          losses ++;
          localStorage.setItem('losses',losses);
          lossesSpan.textContent = losses;
          isPlaying = false;
      }
  }, 1000)
}


function checkWin () {
    if (guessArr.join('') === randomNum.join('')){
        isPlaying = false;
        clearInterval(timer);
        return true;
     } else {
         return false;
     }
}

start.addEventListener('click',startGame);


document.addEventListener('keyup', function(event) {
    if (!isPlaying) {
        return;
    }
  let element = event.key.toUpperCase();

  if (randomNum.includes(element)) {
   
   for (let i = 0; i < randomNum.length; i++) {
       if (randomNum[i] === element) {
           guessArr[i] = element;
       }
       
   }
    word.textContent = guessArr.join(' ');
    if(checkWin()){
        word.textContent = `WINNER!!!! the word is: ${randomNum.join('')}`
        wins ++;
        localStorage.setItem('wins',wins);
        winsSpan.textContent = wins;
    }
}

});


document.querySelector('#reset').addEventListener('click', function(){
    wins = 0;
    losses = 0
    localStorage.setItem('wins',0);
    localStorage.setItem('losses',0)
    winsSpan.textContent = 0;
    lossesSpan.textContent = 0;
})



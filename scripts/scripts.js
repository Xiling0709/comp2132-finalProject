//-Xiling Cheng (A01164884) final project(Hangman) scripts

let answer = '';
let mistakes = 0;
let maxLives = 6;
let guessed = [];
let wordStatus = null;
const newGameContainer = document.getElementById("newGameContainer");
document.getElementById('maxLives').innerHTML = maxLives;
const showHint = document.getElementById("hintText");
const hangmanPicture =document.getElementById('hangmanPic');


var world_cup_countries = [
    "qatar", 
    "ecuador", 
    "senegal",
    "netherlands",
    "england",
    "iran",
    "usa",
    "wales",
    "argentina",
    // "saudi arabia",
    "mexico", 
    "poland",
    "france",
    "australia",
    "denmark",
    "tunisia",
    "spain",
    // "costa rica",
    "germany",
    "japan",
    "belgium",
    "canada",
    "morocco",
    "croatia",
    "brazil",
    "serbia",
    "switzerland",
    "cameroon",
    "portugal",
    "ghana",
    "uruguay",
    // "south Korea"
]

var hintContent = [
    "Host country of 2022 World Cup", 
    "defeated Qatar in Group A match", 
    "West African country ",
    "Northwestern Europe country",
    "part of UK, Beckham used to be one of the team players ",
    "country with fans' protesting at the world cup",
    "one of north American countries",
    "country of southwest UK",
    "don't cry for me A...",
    // "1saudi arabia",
    "country in the south portion of North America", 
    "country near Russia",
    "2018 world cup champion",
    "country that basically owns the continent ",
    "defeated by France in Group D matches",
    "Country in North Africa",
    "defeated Costa Rica with 7:0",
    // "1costa rica",
    "defeated by Japan with 1:2",
    "Eastern Asian country",
    "defeated Canada with 1:0 in Group F matches",
    "country which plays in FIFA after 22 years",
    "North African country",
    "country at the crossroads of Central and Southeast Europe",
    "one of most successful national teams",
    "landlocked country in Southeastern and Central Europe",
    "country which is famous for skiing and banking",
    "central African country",
    "southern European counrtry",
    "defeated by Portugal with 2:3 in Group H matches",
    "another strong team from South America",
    // "1south Korea"
]

function randomWord(){
    answer = world_cup_countries[Math.floor(Math.random()*world_cup_countries.length)];
    // alert(world_cup_countries.indexOf(answer));
    showHint.innerHTML = 'Hint: '+ hintContent[world_cup_countries.indexOf(answer)];
   
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn"
          id='` + letter + `'
          onClick="letterGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }



function guessedWord(){
    wordStatus =  answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.getElementById('wordOutput').innerHTML = wordStatus;

}

function letterGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter): null;
    document.getElementById(chosenLetter).setAttribute('disabled',true);
    document.getElementById(chosenLetter).classList.add('disableEffect');
    // document.getElementById(chosenLetter).classList.remove('btn:hover');
    // alert(answer);

    if(answer.indexOf(chosenLetter)>=0){
        guessedWord();
        winGame();
        

    }else if(answer.indexOf(chosenLetter) === -1){
        mistakes++;
        mistakeUpdate();
        picUpdate();
        loseGame();
    }
}

function mistakeUpdate(){
    document.getElementById('mistakes').innerHTML = mistakes;
}

function winGame(){
    if(wordStatus === answer){
        
        document.getElementById('wordOutput').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'YOU WIN';
        newGameContainer.classList.remove("hide");
        showHint.classList.add("hide");
        hangmanPicture.classList.add("fade-in");

        hangmanPicture.src = 'images/victory.gif';
        // playAudio();
        
    }
}

function loseGame(){
    if(mistakes === maxLives){

        document.getElementById('wordOutput').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = 'YOU LOSE';

        newGameContainer.classList.remove("hide");
        showHint.classList.add("hide");
        hangmanPicture.classList.add("fade-in");
        hangmanPicture.src = 'images/defeat.gif';
        // playAudio();
    }
}

function picUpdate(){
    hangmanPicture.src = 'images/' + mistakes + '.jpg';
}

function playAudio(){
    let audio = Audio("audio/victory.mp3");
    audio.play();
}

function reset(){
    mistakes = 0;
    guessed = [];
    hangmanPicture.src = 'images/0.jpg';
    randomWord();
    mistakeUpdate();
    generateButtons();
    guessedWord();
    newGameContainer.classList.add("hide");
    showHint.classList.remove("hide");


}

// function hint(){
//     showHint.innerHTML = hintContent[world_cup_countries.indexOf(answer)];
//     alert(hintContent[world_cup_countries.indexOf(answer)]);
//     alert(answer);
// }

// hint();
showHint.classList.remove("hide");
randomWord();
generateButtons();
guessedWord();

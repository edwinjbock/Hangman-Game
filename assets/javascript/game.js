// List all of the alpha array possibilities
var computerChoices = ["Hulk", "Ironman", "Deadpool", "Thanos", "Wolverine", "Thor", "Nebula", "Magneto", "Gamora", "Rogue", "Mystique", "Rocket", "Gambit", "Beast", "Havok", "Drax", "Groot", "Daredevil", "Hawkeye", "Punisher", "Venom", "Colossus", "Psylocke", "Storm"];

// Variables related to the scripting logic
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var userGuess = "";
var computerChoice = "";
var guessesSoFar = "";
var guessesSoFarArray = [];
var randomMsgArray = ["BTW, Thor says you're adopted", "Loki killed 80 people in two days and you're next", "The Mandarin says you'll never see him coming", "Hulk yells <i>smash</i>", "Captain America says he can do this all day", "And Stark says we have a Hulk", "I am Groot. You're not.", "Daredevil reassures you that violence does not discriminate", "Wolverine says that if you cage the beast, the beast will get angry", "Spiderman says that no man can win every battle"]

// Variables that refer to the HTML
var winsText = document.getElementById("htmlWins");
var lossesText = document.getElementById("htmlLosses");
var guessesRemainingText = document.getElementById("htmlGuessesRemaining");
var guessesSoFarText = document.getElementById("htmlGuessesSoFar");
var resultsText = document.getElementById("htmlMessage");
var directionsText = document.getElementById("htmlDirections");
var randomText = document.getElementById("htmlRandom");

// Global function to test for an alpha event.key
function isAlpha(str) {
  for (i = 0; i < computerChoices.length; i++) {
    if (str === computerChoices[i]) {
      return true;
    } else { }
  } // end of for loop
  return false;
} // end of isAlpha()

// Global function to test for a duplicate event.key
function isDuplicate(str) {
  for (i = 0; i < guessesSoFarArray.length; i++) {
    if (str === guessesSoFarArray[i]) {
      return true;
    } else { }
  } // end of for loop
  return false;
} // end of isDuplicate()

// Global function to choose a random index number from an array
// Used to choose the funny message after winning or losing
function randomIndex(array) {
  var i = array.length - 1;
  return myArray[Math.floor(Math.random() * i)];
}

console.log(winsText); // ******* TESTING ********
console.log(lossesText); // ******* TESTING ********
console.log(guessesRemainingText); // ******* TESTING ********
console.log(guessesSoFarText); // ******* TESTING ********

// KICK OFF THE GAME WITH A KEYSTROKE
document.onkeyup = function (event) {

  // Get rid of the directions
  var directions = "";
  directionsText.textContent = directions;

  // Clears the You Won/You Lost message after a key is pressed
  var resultsMsg = "";
  var randomMsg = "";

  // guessesRemaining needs to be an integer. Not a string.
  guessesRemaining = parseInt(guessesRemaining);

  console.log(guessesRemainingText); // ******* TESTING *******
  console.log(guessesRemaining); // ******* TESTING *******

  // Determine which key was pressed and then convert it to lowercase for comparing to the array above
  var userGuess = event.key;
  var userGuessVetted = userGuess.toLowerCase();

  // Verify that the user pressed an alpha character
  if (isAlpha(userGuessVetted) == false) {
    // If it's not alpha then tell them and return
    resultsMsg = "Letters only, foe";
    console.log(resultsMsg); // **** Test ****
  }
  else if (isDuplicate(userGuessVetted) == true) {
    // If it's a duplicate then tell them and return
    resultsMsg = "The Hangman mutters - No duplicates";
    console.log(resultsMsg); // **** Test ****
  }
  else if ((isAlpha(userGuessVetted) == true) && (isDuplicate(userGuessVetted) == false)) {
    // if alpha then do everything else, provided the entry isn't a duplicate

    // Add the entry to the array
    guessesSoFarArray.push(userGuessVetted);

    if (guessesRemaining == 10) {
      // Computer Choice Randomizes EACH TIME there are 10 tries left during each match
      computerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];

      // Change key variables
      guessesSoFar = userGuess;
      guessesRemaining = guessesRemaining - 1;
    }
    else {
      guessesRemaining = guessesRemaining - 1;
      guessesSoFar = guessesSoFar + ", " + userGuess;
    }

    // Check for win or loss
    if (userGuessVetted == computerChoice) {
      wins++;
      resultsMsg = "You won! Go again.";
      randomMsg = randomMsgArray[Math.floor(Math.random() * randomArray.length)];
            //randomMsg = randomArray[randomIndex(randomArray)];
      // Reset malleable variables
      guessesRemaining = 10;
      guessesSoFar = "";
      guessesSoFarArray = [];
    }
    else if ((guessesRemaining == 0) && (isAlpha(userGuessVetted) == true)) {
      losses++;
      resultsMsg = "You lost to " + computerChoice;
      randomMsg = randomMsgArray[Math.floor(Math.random() * randomArray.length)];
            //randomMsg = randomArray[randomIndex(randomArray)];
      // Reset due to end of match
      guessesRemaining = 10;
      guessesSoFar = "";
      guessesSoFarArray = [];
    }
    else { } // do nothing

  }
  else {
    // do nothing (used an else if above instead of else so that I could see the logical progression)
  }

  // Port the results back to the DOM
  winsText.textContent = wins;
  lossesText.textContent = losses;
  guessesRemainingText.textContent = guessesRemaining;
  guessesSoFarText.textContent = guessesSoFar;
  resultsText.textContent = resultsMsg;
  randomText.textContent = randomMsg;


  // ******* TESTING ********
  console.log("userGuess: " + userGuess);
  console.log("userGuessVetted: " + userGuessVetted);
  console.log("isAlpha: " + isAlpha(userGuess));
  console.log("computerChoices.length: " + computerChoices.length);
  console.log("computerChoice: " + computerChoice);
  console.log("computerChoices.length - 1: " + (computerChoices.length - 1));

}; // End of document.onkeyup

// END OF FILE
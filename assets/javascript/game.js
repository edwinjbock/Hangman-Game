// List all of the alpha array possibilities
var computerChoices = ["Hulk", "Ironman", "Deadpool", "Thanos", "Wolverine", "Thor", "Nebula", "Magneto", "Gamora", "Rogue", "Mystique", "Rocket", "Gambit", "Beast", "Havok", "Drax", "Groot", "Daredevil", "Hawkeye", "Punisher", "Venom", "Colossus", "Psylocke", "Storm"];

// Variables related to the scripting logic
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var userGuess = "";
var computerChoice = "";
var computerChoiceMasked = "";
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
var wordText = document.getElementById("htmlWord");

// Global function to test for an alpha event.key
function isAlpha(str) {
  // for (i = 0; i < computerChoices.length; i++) {
  //   if (str === computerChoices[i]) {
      return true;
    // } else { }
  } // end of for loop
  // return false;
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


// KICK OFF THE GAME WITH A KEYSTROKE
document.onkeyup = function (event) {

  // Get rid of the directions
  var directions = "";
  directionsText.textContent = directions;

  // Clears the You Won/You Lost message after a key is pressed
  var resultsMsg = "";
  var randomMsg = "";
  resultsMsgText.textContent = resultsMsg;
  randomMsgText.textContent = randomMsg;

  // guessesRemaining needs to be an integer. Not a string.
  guessesRemaining = parseInt(guessesRemaining);


  // Determine which key was pressed and then convert it to lowercase for comparing to the guessesSoFarArray
  var userGuess = event.key;
  var userGuessVetted = userGuess.toLowerCase();

  // Verify that the user pressed an alpha character
  if (isAlpha(userGuessVetted) == false) {
    // If it's not alpha then tell them
    resultsMsg = "Letters only, my dear foe";
  }

  else if (isDuplicate(userGuessVetted) == true) {
    // If it's a duplicate then tell them and return
    resultsMsg = "The Hangman mutters - No duplicates";
  }
    
  else if ((isAlpha(userGuessVetted) == true) && (isDuplicate(userGuessVetted) == false)) {
    // if alpha and not a duplicate then do everything else

    // Add the entry to the array
    guessesSoFarArray.push(userGuessVetted);

    if (guessesRemaining == 10) {
      // Computer Choice Randomizes EACH TIME there are 10 tries left during each match
      computerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
      
      // Convert computerChoice letters to "*" in computerChoiceMasked
      for (i = 0; i < computerChoice.length; i++) {
        computerChoiceMasked.charAt(i) = "*";
      }

      // Change key variables
      guessesSoFar = userGuess;
      guessesRemaining = guessesRemaining - 1;
    }

    else {
      guessesRemaining = guessesRemaining - 1;
      guessesSoFar = guessesSoFar + ", " + userGuess;
    }

    // Test to see if userGuess is in computerChoice
    //Replace "*" with userGuess if applicable
    for (i = 0; i < computerChoice.length; i++) {
      if (userGuess == computerChoice.charAt(i).toLowerCase() {
        computerChoiceMasked.charAt(i) = computerChoice.charAt(i);
      }
      else {
        // ignore
      }
    }

    // Update remaining computerChoiceMasked in case changes were made
    wordText.textContent = computerChoiceMasked;





    // Check for win or loss
    if (computerChoiceMasked == computerChoice) {
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


}; // End of document.onkeyup

// END OF FILE
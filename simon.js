var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];  //to store random color choosen by game
var userClickedPattern = [];   //to store color chosen by user

var started = false;  // to know whether the game is started or not
var level =0;
$(document).keydown( function(event){
    if(!started){
        $("#level-title").text("level " +level);   // when it started then we have level 0
        nextSequence();
        started = true;
    }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){
    //2.create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //call chechanswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence. (means we r checking answer till last index)
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    //3. to check if the most recent user answer is the same as the game pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

      //4. if pattern is correct then again call nextsequence() after 1000 millisec delay and increase level
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        //when user get wrong answer we gonna add a class game-over and then remove it after 200 millisec
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart"); // change h1 when answer is wrong
        startOver(); // start new game
    }
}


function nextSequence(){

    //6. Once nextSequence() is triggered in checkanswer(), reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++; // increment level whenever nextsequence is executed
    $("#level-title").text("level "+level);  // change the text to increasing level

    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColor = buttonColors[randomNumber];
    //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColor);
    $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);   
}

function playSound(name){
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("simon_sounds/" +name+ ".mp3");
    audio.play(); 
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout( function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





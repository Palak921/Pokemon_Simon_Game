//jslint : ES6
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $(".game-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn1").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
            $("h3").html("Your Score :" + (level * 5));

        }

    } else {

        console.log("wrong");
        $("h1").html("Game Over, Refresh to restart");
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

    }

}



function nextSequence() {
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $(".game-title").text("Level " + level);
    if (level == 4) {
        buttonColours.push("pink");
        buttonColours.push("white");
    }
    if (level > 4) {


        $("h2").html("Difficulty level:Medium");
        $(".remove").removeClass("btn1");
        $(".remove").addClass("small");

    } else if (level > 10) {
        $(".rainbow").addClass("rocket");
        $("h2").html("Difficulty level:Hard");
    } else if (level > 20) {
        $("h2").html("Difficulty level:Super");
    }
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 90);
}

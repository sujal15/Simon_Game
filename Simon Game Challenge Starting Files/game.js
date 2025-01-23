var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"]
var started = false;
$(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level "+level);
        started = true;
        nextSequence();
            
    }
});
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");  
    }, 100);
}
$(".btn").on("click",function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function()  {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(document).keypress(function () {
        if(!started){
            $("#level-title").text("Level "+level);
            started = true;
            nextSequence();       
        }
    })
}



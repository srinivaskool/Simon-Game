var level = 0;
var started = false;
var buttonColors = [];
var userClickedPattern = [];
var gamePattern = [];
var fullColors = ["green", "yellow", "pink", "orange", "red", "blue"];
var begin = 2;
var inter = 4;
var advan = 6;

myfunc();

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePressed(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern.length - 1);
});

function myfunc() {
  var userChosenLevel = localStorage.getItem("userChosenLevel");
  console.log(userChosenLevel);
  if (userChosenLevel === 'beg') {
    ColorPicker(begin);
  }
  else if (userChosenLevel === 'int') {
    ColorPicker(inter);
  }
  else if (userChosenLevel === 'adv') {
    ColorPicker(advan);
  }
}

function ColorPicker(stage) {
  while (buttonColors.length < stage) {
    var r = Math.floor(Math.random() * fullColors.length);
    if (buttonColors.indexOf(fullColors[r]) === -1) {
      buttonColors.push(fullColors[r]);
      $("#" + fullColors[r]).removeClass("stopDisplay");
    }
  }
}

function playSound(currentColor) {
  var audio = new Audio('sounds/' + currentColor + '.mp3');
  audio.play();
}

function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  console.log(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Gameover,Press any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
// Color list
var buttonColors = ["red", "blue", "yellow", "green"]

// Adding random chosen colors
var gamePattern = []

// Adding choosen color
var userClickedPattern = []

// Setting value of game to false
var started = false

// Adding a game level
var level = 0

// When to start the game
$(document).keypress(function() {
  // Game begins with a keypress
  $("#level-title").text("Level - " + level)
  nextSequence()
  started = true
})

// Storing the values
$(".btn").click(function() {
  // Storing the choosen color
  var userChosenColour = $(this).attr("id")
  // Adding the choosen color
  userClickedPattern.push(userChosenColour)
  // Playing the sound
  playSound(userChosenColour)
  // Adding the animation
  animatePress(userChosenColour)
  // Cheking the length of the button pressed
  checkAnswer(userClickedPattern.length-1)
})

// Playing the sound of the buttons
function playSound(name) {
  // Adding audio
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}

// Animating the buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

// Checking the squence of button clicked
function checkAnswer(currentLevel) {
  // If user clicked in correct pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
  } else { // If user clicked in wrong pattern
    playSound("wrong")
    $("body").addClass("game-over")
    $("#level-title").text("Game Over! Press any key to restart")

    // Starting Over the game again
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)

    // Restarting the game
    level = 0
    gamePattern = []
    started = false
  }
}

// Creating random colors
function nextSequence() {
  // Storing the pattern of button clicked
  userClickedPattern = []
  // Increasing the level
  level++
  // Changing the level text
  $("#level-title").text("Level - " + level);
  // Genrating randonm numbers from 1 - 3
  var randomNumber = Math.floor(Math.random() * 4)
  // Choosing a random color
  var randomChosenColour = buttonColors[randomNumber]
  // Adding random chosen colors
  gamePattern.push(randomChosenColour)
  // Adding animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Playing the sound
  playSound(randomChosenColour)
}

window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game; 

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();

    game.start();
  }
   //restart button
  restartButton.addEventListener("click", function () {
    restartGame();
  });

  // reload page
  function restartGame() {
    location.reload();
  }
  //shoot action
  document.addEventListener("keydown", (event) => {
    if (event.key === " "){
      game.shoot();
    }
  });
  //keydown event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      switch (key) {
        case "ArrowLeft":
          game.crosshair.directionX = -10;
          break;
        case "ArrowUp":
          game.crosshair.directionY = -10;
          break;
        case "ArrowRight":
          game.crosshair.directionX = 10;
          break;
        case "ArrowDown":
          game.crosshair.directionY = 10;
          break;
      }
    }
  } 
  //keyup event
  function handleKeyup(event) {
  const key = event.key;
  
  switch (key) {
    case "ArrowLeft":
    case "ArrowRight":
      game.crosshair.directionX = 0;
      break;
    case "ArrowUp":
    case "ArrowDown":
      game.crosshair.directionY = 0;
      break;
  }
} 
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleKeydown);
};
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
          game.player.directionX = -3;
          break;
        case "ArrowUp":
          game.player.directionY = -3;
          break;
        case "ArrowRight":
          game.player.directionX = 3;
          break;
        case "ArrowDown":
          game.player.directionY = 3;
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
      game.player.directionX = 0;
      break;
    case "ArrowUp":
    case "ArrowDown":
      game.player.directionY = 0;
      break;
  }
} 
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("keydown", handleKeydown);
};
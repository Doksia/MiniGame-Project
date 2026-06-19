class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      450,
      375,
      120,
      125,
      "./images/car.png"
    );
    this.crosshair = new Crosshair(
      this.gameScreen,
      300,
      400,
      40,
      40,
      "./images/car.png"
    );
    this.height = 750;
    this.width = 900;
    this.enemies = [];
    this.bullets = [];
    this.increaseScore= document.getElementById("score");
    this.decreaseLives= document.getElementById("lives");
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000/60); // 60fps
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide start screen
    this.startScreen.style.display = "none";
    
    // Show game screen
    this.gameScreen.style.display = "block";

    // Runs the gameLoop on 60fps and stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency)
  }

  gameLoop() {
    this.update();
    // gameIsOver=True clear the interval to stop the loop
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId)
    }
  }

   update() {
    this.crosshair.move();
    
    // Check for collision and if an enemy is still on the screen
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();

      // If player collides with an enemy
      if (this.player.didCollide(enemy)) {
        enemy.element.remove();
        this.enemies.splice(i, 1);
        this.lives--;
        this.decreaseLives.innerText = this.lives; 
        
        i--;
      }
    }
    // If the lives are 0, end the game
    if (this.lives <= 0) { 
      this.endGame();
      return;
    }

    // Create a new enemy based on a random probability
    if (Math.random() > 0.98 && this.enemies.length < 4) {
      this.enemies.push(new Enemy(this.gameScreen));
    }
    
    // updates the bullets
    this.bullets.forEach((bullet) => bullet.update());
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      if (this.bullets[i].isDead) {
        this.bullets.splice(i, 1);
      }
    }
    for (let i = this.enemies.length - 1; i >= 0; i--){
      if (this.enemies[i].isDestroyed) {
        this.enemies.splice(i, 1);
      }
    }
  }
  //handles the shooting
  shoot(){
    console.log("¡Teclado detectado! Intentando disparar...");
    let enemyTargeted = null;
    //checks if crosshair collaids with enemy
    for (let enemy of this.enemies){
      if (this.crosshair.didCollide(enemy)) {
        enemyTargeted = enemy;
        break;
      }
    }
    //checks for enemies and then shoots
    if (enemyTargeted !== null) {
      console.log("¡Enemigo fijado con éxito! Creando bala...");
      //creates bullet
      const newBullet = new Bullet(this.gameScreen, this.player, enemyTargeted);
      this.bullets.push(newBullet);
    } else {
      console.log("La mira no está encima de ningún enemigo.");
    }
  }
  //method for ending the game
  endGame() {
    this.player.element.remove();
    this.crosshair.element.remove();
    this.bullets.forEach(bullet => bullet.element.remove());
    this.enemies.forEach(enemy => enemy.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
 
}
class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      400,
      375,
      50,
      55,
      "./images/car.png"
    );
    this.crosshair = new Crosshair(
      this.gameScreen,
      300,
      400,
      50,
      50,
      "./images/car.png"
    );
    this.height = 750;
    this.width = 800;
    this.enemies = [];
    this.bullets = [];
    this.increaseScore= document.getElementById("score");
    this.decreaseLives= document.getElementById("lives");
    this.score = 0;
    this.lives = 1;
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
        // Remove the enemy element from the DOM
        enemy.element.remove();
        // Remove enemy object from the array
        this.enemies.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        this.decreaseLives--;
        // Update the counter variable to account for the removed enemy
        i--;
      }
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new enemy based on a random probability
    // when there is no other enemies on the screen
    if (Math.random() > 0.98 && this.enemies.length < 1) {
      this.enemies.push(new Enemy(this.gameScreen));
    }
    //updates the bullets
    this.bullets.forEach((bullet) => bullet.update());
    //removes the bullets when hit
    for (let i = this.bullets.length - 1; i>=0; i--) {
      if(bullets[i].isDead) {
        bullets.splice(i, 1);
      }
    }
    //clean hit enemies
    for (let i = this.enemies.length - 1; i >= 0; i--){
      if (enemies[i].isDestroyed) {
        this.enemies.splice(i, 1);
      }
    }
  }
  //handles the shooting
  shoot(){
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
      const playerRect = this.player.element.getBoundingClientRect();
      const playerX = playerRect.left + (playerRect.width/2);
      const playerY = playerRect.top + (playerRect.heigth/2);
      //creates bullet
      const newBullet = new Bullet (playerX, playerY, enemyTargeted);
      this.bullets.push(newBullet);
    }
  }
  //method for ending the game
  endGame() {
    this.player.element.remove();
    this.crosshair.element.remove();
    this.bullet.element.remove();
    this.enemies.forEach(enemy => enemy.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  
    console.log("in the update");
  }
 
}
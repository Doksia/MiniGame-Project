class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.backGroundMusic = new Audio("sounds/09 BIDØ - Forest Lullaby 24 Bit MASTER.mp3");
    this.backGroundMusic.loop = true;
    this.backGroundMusic.volume = 0.08;
    this.shootSound = new Audio("sounds/fireball-whoosh-magical-explosive-with-chimes-bosnow-fireball-whoosh-with-chimes-explosive-magical-1-0m04s.mp3");
    this.shootSound.volume = 0.15;
    this.hitEnemySound = new Audio("sounds/insectoid-monster-call-gfx-sounds-3-3-00-01.mp3");
    this.hitEnemySound.volume = 0.15;
    this.looseLiveSound = new Audio("sounds/snapping-tree-bark-volo-2-2-00-00.mp3");
    this.looseLiveSound.volume = 0.15;
    this.player = new Player(
      this.gameScreen,
      400, //450
      375,
      125,
      120,
      "images/player.png"
    );
    this.crosshair = new Crosshair(
      this.gameScreen,
      300,
      400,
      50,
      50,
      "images/MagicCrosshair.png"
    );
    this.height = 750;
    this.width = 950;
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

    this.backGroundMusic.play();

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
        this.looseLiveSound.play();
        
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
  //controls the score and an extra feature
   addScore() {
    this.score++;
     if (this.increaseScore) {
     this.increaseScore.innerText = this.score;
    }
    // Each time the score increments in 5 and the player has less than 3 lives, increase 1 live
     if (this.score % 5 === 0 && this.lives < 3) {
      this.lives ++;
      if (this.decreaseLives) {
        this.decreaseLives.innerText = this.lives;
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
      //crosshair animation
      this.crosshair.element.classList.add('crosshair-scale');
      this.shootSound.currentTime = 0.2;
      this.shootSound.play();
      //creates bullet
       const newBullet = new Bullet(this.gameScreen, this, this.player, enemyTargeted);
       this.bullets.push(newBullet);
       //ends crosshair animation
       setTimeout(() => {
      this.crosshair.element.classList.remove('crosshair-scale');
    }, 150);
    }
  }
  //method for ending the game
  endGame() {
    this.backGroundMusic.remove();
    this.looseLiveSound.remove();
    this.hitEnemySound.remove();
    this.shootSound.remove();
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
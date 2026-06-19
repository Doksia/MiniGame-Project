class Enemy {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.playerX = gameScreen.clientWidth/2;
    this.playerY = gameScreen.clientHeight/2;
    this.width = 50;
    this.height = 50;
    this.setRandomSpawn();
    this.calculateDirection();
    this.element = document.createElement("img");
    this.element.src = "./images/redCar.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.updatePosition();
    this.gameScreen.appendChild(this.element);
  }

   setRandomSpawn() {
    const minDistance = 200; // Minimum pixel distance from the player
    let distance = 0;

    while (distance < minDistance) {
      this.left = Math.floor(Math.random() * (this.gameScreen.clientWidth - this.width));
      this.top = Math.floor(Math.random() * (this.gameScreen.clientHeight - this.height));

      // Calculate distance from enemy center to player center
      const dx = this.left + this.width / 2 - this.playerX;
      const dy = this.top + this.height / 2 - this.playerY;
      distance = Math.sqrt(dx * dx + dy * dy);
    }

    // Determine horizontal facing direction based on spawn
    // If enemy is to the right of center, flip it horizontally
    if (this.left + this.width/2 > this.playerX) {
      this.facingDirection = -1; 
    } else {
      this.facingDirection = 1; 
    }
  }

  calculateDirection() {
    const dx = this.playerX - (this.left + this.width / 2);
    const dy = this.playerY - (this.top + this.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    this.speed = 2; 
    this.vx = (dx / distance) * this.speed;
    this.vy = (dy / distance) * this.speed;
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    // Flips the enemy
    this.element.style.transform = `scaleX(${this.facingDirection})`;
  }

  move() {
    this.left += this.vx;
    this.top += this.vy;
    this.updatePosition();
  }

  remove() {
    this.element.remove();
  }
}
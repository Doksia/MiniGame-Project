class Crosshair {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update crosshair position based on X and Y
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the crosshair stays within the game screen
    // handles left hand side
    if (this.left < 5) {
      this.left = 5;
    }

    // handles top side
    if (this.top < 5) {
      this.top = 5;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 5) {
      this.left = this.gameScreen.offsetWidth - this.width - 5;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 5) {
      this.top = this.gameScreen.offsetHeight - this.height - 5;
    }

    // Update the crosshair position
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
     // Gets the rectangle of both elements
  didCollide(enemy) {
    const crosshairRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    
    if (
      crosshairRect.left < enemyRect.right &&
      crosshairRect.right > enemyRect.left &&
      crosshairRect.top < enemyRect.bottom &&
      crosshairRect.bottom > enemyRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }


}
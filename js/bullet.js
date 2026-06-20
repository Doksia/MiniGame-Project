class Bullet {
    constructor(gameScreen, gameInstance, startPlayer, targetEnemy){
        this.gameScreen = gameScreen;
        this.game = gameInstance;
        this.element = document.createElement("img");
        this.element.src = "images/MagicBullet.png"
        this.x = startPlayer.left + (startPlayer.width / 2);
        this.y = startPlayer.top + (startPlayer.height / 2);
        this.element.style.position = "absolute";
        this.targetEnemy = targetEnemy; 
        this.speed = 25;
        this.width = 20; 
        this.height = 20;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left =`${this.x}px`;
        this.element.style.top =`${this.y}px`;
        this.isDead = false;
        this.gameScreen.appendChild(this.element);
    }
    //checks if the enemy doesnt exst and destroy bullet
    update(){
        if (!this.targetEnemy || !this.targetEnemy.element || !this.targetEnemy.element.parentNode) {
      this.destroy();
      return;
        }
        //finds the center of the enemy position
        const targetX = this.targetEnemy.left + (this.targetEnemy.width / 2);
        const targetY = this.targetEnemy.top + (this.targetEnemy.height / 2);
        //calculates direction vector to the enemy
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        //checks the distance to hit enemy and moves the bullet
        if (distance<this.speed){
            this.hit();
        } else {
            this.x += (dx/distance) * this.speed;
            this.y += (dy/distance) * this.speed;
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
        }
    }
    //checks when hit
    hit(){
        this.isDead = true;
        if (this.game && this.game.enemies) {
      const enemyIndex = this.game.enemies.indexOf(this.targetEnemy);
      if (enemyIndex !== -1) {
        this.game.enemies.splice(enemyIndex, 1);
      }
      this.game.addScore();
    }
    if (this.targetEnemy && this.targetEnemy.element) {
      this.targetEnemy.element.remove();
    }
    this.destroy();
    }
    //remove bullet
    destroy(){
       if (this.element && this.element.parentNode) {
      this.element.remove();
    }
        this.isDead = true;
    }
}
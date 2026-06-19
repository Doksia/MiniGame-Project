class Bullet {
    constructor(gameScreen, startPlayer, targetEnemy){
        this.gameScreen = gameScreen;
        this.element = document.createElement("img");
        this.element.src = "./images/redCar.png"
        this.x = startPlayer.left + (startPlayer.width / 2);
        this.y = startPlayer.top + (startPlayer.height / 2);
        this.element.style.position = "absolute";
        this.targetEnemy = targetEnemy; 
        this.speed = 25;
        this.width = 10; 
        this.height = 10;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left =`${this.x}px`;
        this.element.style.top =`${this.y}px`;
        this.isDead = false;
        this.gameScreen.appendChild(this.element);
    }
    //checks if the enemy doesnt exst and destroy bullet
    update(){
        if (!this.targetEnemy || !this.targetEnemy.element){
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
        this.targetEnemy.element.remove();
        this.targetEnemy.isDestroyed = true;
        this.destroy();
    }
    //remove bullet
    destroy(){
       if (this.element.parentNode) {
            this.element.remove();
        }
        this.isDead = true;
    }
}
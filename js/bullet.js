class Bullet {
    constructor(startX, startY, targetEnemy){
        this.gameScreen = gameScreen;
        this.element = document.createElement("img");
        this.element.className = "magicBullet";
        this.x = startX;
        this.y = startY;
        this.targetEnemy = targetEnemy; 
        this.speed = 15;
        this.element.style.left =`${this.x}px`;
        this.element.style.top =`${this.y}px`;
        this.isDead = false;
        document.body.appendChild(this.element);
    }
    //checks if the enemy doesnt exst and destroy bullet
    update(){
        if (!this.targetEnemy || !this.targetEnemy.element){
            this.destroy();
            return;
        }
        //finds the center of the enemy position
        const enemyRect = this.targetEnemy.element.getBoundingClientRect();
        const targetX = enemyRect.left + (enemyRect.width/2);
        const targetY = enemyRect.top + (enemyRect.heigth/2);
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
        this.element.remove();
        this.isDead = true;
    }
}
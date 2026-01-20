class Enemy extends Entity {
    constructor(x, y, img){
        super(x, y, img, 0.3);
        this.speed = 1;
        this.cooldown = int(random(120,150));
        this.hitboxScaleX = 0.05;
        this.hitboxScaleY = 0.3;
    }

    update(){
        this.y += this.speed;

        if(this.cooldown > 0){
            this.cooldown--;
        } else{
            this.shoot();
            this.cooldown = int(random(120,150));
        }
    }

    shoot() {
        enemyProjectiles.push(new Projectile(this.x, this.y + this.h / 2, 5, "enemy", images["enemyProjectile"], 1));
        enemySound.play();
    }
}
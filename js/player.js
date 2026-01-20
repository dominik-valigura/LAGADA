class Player extends Entity {
    constructor(x, y, img){
        super(x, y, img, 0.1, 0.1);
        this.fixedY = y;
        this.cooldown = 0;
    }

    update(){
        this.x = constrain(mouseX, this.w / 2, width - this.w / 2);
        this.y = this.fixedY;

        if(this.cooldown > 0) this.cooldown--;
    }

    shoot(){
        if(this.cooldown <= 0) {
            playerProjectiles.push (new Projectile (this.x, this.y - this.h / 2, -8, "player", images["playerProjectile"], 1));
            playerSound.play();
            this.cooldown = 15;
        }
    }
}
class Boss extends Entity {
    constructor(x, y, img, health){
        super(x, y, img, 1.45);
        this.speed = 2;
        this.cooldown = int(random(150,200));
        this.cooldown2 = int(random(50, 100));
        this.randomAttack = 0;
        this.fightMode = false;
        this.soundEffectBoss = true;
        this.hitboxes = [
            { ox: 0, oy: 0, wScale: 0.35, hScale: 0.06 },
            { ox: 0.01, oy: 0.05, wScale: 0.05, hScale: 0.1 },
        ];
        this.spawnEffect = 0;
        this.health = health;
    }

    update(){
        this.y += this.speed;
        
        if(this.y >= 0){
            this.speed = 0;
            this.fightMode = true;
        }else{
            if(this.soundEffectBoss){
                bossIntro.play();
                this.soundEffectBoss = false
            }
        }
//____________________________________________UTOCENI____________________________________________

        if(this.fightMode){
            if(this.cooldown > 0){
                this.cooldown--;
            } else{
                this.randomAttack = int(random(1,4));
                switch(this.randomAttack){
                    case 1:
                        this.leftAttack();
                        break;
                    case 2:
                        this.rightAttack();
                        break;
                    case 3:
                        this.spawnEnemies();
                        break;        
                }
                this.cooldown = int(random(150,200));

            }

            if(this.cooldown2 <= 0){
                    this.normalShooting();
                    this.cooldown2 = int(random(40, 70));
                }else{
                    this.cooldown2--;
                }
        }
        
    }

    draw(){
        super.draw();

        if(this.y >= 0){
            image(images["healthbar"], width / 2, 79, 400, 250);
        }    

        if(this.spawnEffect > 0){
            push();
            fill(0);
            rect(width * 0.05, this.y + 40, 100, 150);
            rect(width * 0.85, this.y + 40, 100, 150);
            pop();

             this.spawnEffect--;
        }
    }
    
//____________________________________________UTOKY____________________________________________   

    normalShooting(){
        let canon = int(random(1,3));
        if(canon === 1){
            bossProjectiles.push(new Projectile(width * 0.45, this.y + 300, 4, "boss", images["bossProjectile"], 0.9));
            enemySound.play();
        }
        if(canon === 2){
            bossProjectiles.push(new Projectile(width * 0.55, this.y + 300, 4, "boss", images["bossProjectile"], 0.9));
            enemySound.play();
        }
    }

    leftAttack() {
        const spawnY = this.y + 60;
        let startX = width * 0.15;
        let endX = width * 0.35;
        let count = 8;
        let x;
        let step = (endX - startX) / (count - 1);
        for(let i = 0; i < count; i++){
            x = startX + i * step;
            bossProjectiles.push(new Projectile(x, spawnY, 6, "boss", images["bossProjectile"], 1.2));
        }
        
        bossSound.play();
    } 
    
    rightAttack(){
        const spawnY = this.y + 60;
        let startX = width * 0.65;
        let endX = width * 0.85;
        let count = 8;
        let x;
        let step = (endX - startX) / (count - 1);
        for(let i = 0; i < count; i++){
            x = startX + i * step;
            bossProjectiles.push(new Projectile(x, spawnY, 6, "boss", images["bossProjectile"], 1.2));
        }
        
        bossSound.play();
    }

    spawnEnemies(){
        this.spawnEffect = 120;
        enemies.push(new Enemy(width * 0.1, this.y + 60, images["enemy"]));
        enemies.push(new Enemy(width * 0.9, this.y + 60, images["enemy"]));
    }

//____________________________________________HITBOXY____________________________________________

    collidesWith(other) {
        const ow = other.w * (other.hitboxScale ?? 1);
        const oh = other.h * (other.hitboxScale ?? 1);

        for (const hb of this.hitboxes) {
          const hx = this.x + this.w * hb.ox;
          const hy = this.y + this.h * hb.oy;
          const hw = this.w * hb.wScale;
          const hh = this.h * hb.hScale;
        
          const hit =
            abs(hx - other.x) < (hw + ow) / 2 &&
            abs(hy - other.y) < (hh + oh) / 2;
        
          if (hit) return true;
        }
        return false;
        }


}
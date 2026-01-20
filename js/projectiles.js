class Projectile {
    constructor(x, y, speed, from, img, scale = 1){
        this.x = x;
        this.y = y;
        this.vy = speed;
        this.from = from;
        this.img = img;
        this.w = img.width * scale * 0.1;
        this.h = img.height * scale * 0.04;
        this.hitboxScale = 0.7; 
    }


    update(){
        this.y += this.vy;
    }

    draw(){
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.w, this.h);
    }
    offScreen(){
        return this.y < -this.h || this.y > height + this.h;
    }

}
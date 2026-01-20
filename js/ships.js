class Entity {
    constructor(x, y, img, scale = 1, hitboxScale = 0.7){
        this.x = x;
        this.y = y;
        this.img = img;
        this.w = img.width * scale;
        this.h = img.height * scale;
        this.hitboxScale = hitboxScale;
    }

    draw(){
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.w, this.h);
    }
    collidesWith(other) {
      const sx1 = this.hitboxScaleX ?? this.hitboxScale ?? 1;
      const sy1 = this.hitboxScaleY ?? this.hitboxScale ?? 1;

      const sx2 = other.hitboxScaleX ?? other.hitboxScale ?? 1;
      const sy2 = other.hitboxScaleY ?? other.hitboxScale ?? 1;

      const w1 = this.w * sx1;
      const h1 = this.h * sy1;

      const w2 = other.w * sx2;
      const h2 = other.h * sy2;

      return (
        abs(this.x - other.x) < (w1 + w2) / 2 &&
        abs(this.y - other.y) < (h1 + h2) / 2
      );
    }
}
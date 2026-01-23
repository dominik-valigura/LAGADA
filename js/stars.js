class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = int(random(5,12));
    this.speed = int(random(3,8));
  }

  fall() {
    this.y += this.speed;
  }

  draw() {
    fill(200);
    circle(this.x, this.y, this.size);
  }

  OffScreen() {
    return this.y > height + this.size;
  }
}



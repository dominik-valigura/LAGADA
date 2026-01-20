class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.speed = 5;
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

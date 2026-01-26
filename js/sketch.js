let main = document.getElementById("game");
let images = {};
let myFont;
let stars = [];
let mySound;
let playerSound;
let enemySound;
let bossIntro;
let bossSound;
let victory;
let mouseStats = false;
let canvas;
let uiScale = 1;
let menu = true;
let music = false;
let clickCount = 0;
let tutorial = false;
let end = false;
let victoryNumber;

function preload(){
  images["player"] = loadImage("./image/lod-ke-hre.png");
  images["enemy"] = loadImage("./image/enemy.png");
  images["logo"] = loadImage("./image/lagada-nadpis.png");
  images["playerProjectile"] = loadImage("./image/playerProjectile.png");
  images["enemyProjectile"] = loadImage("./image/enemyProjectile.png");
  images["boss"] = loadImage("./image/bossFight.png");
  images["bossProjectile"] = loadImage("./image/bossProjectile.png");
  images["healthbar"] = loadImage("./image/healthbar.png");
  images["howToPlay"] = loadImage("./image/howToPlay.png");
  images["explosion"] = [loadImage("./image/explosion/explo1.png"), loadImage("./image/explosion/explo2.png"), loadImage("./image/explosion/explo3.png"), loadImage("./image/explosion/explo4.png")] ;
  myFont = loadFont("./font/Pix32.ttf");
  soundFormats('mp3', 'ogg');
  mySound = loadSound('./sound/Figure.09.mp3');
  playerSound = loadSound('./sound/plasma.mp3');
  enemySound = loadSound('./sound/enemyZvuk.mp3');
  bossIntro = loadSound('./sound/bossIntro.mp3');
  bossSound = loadSound('./sound/bfg.mp3');
  victory = loadSound('./sound/victory-sound.mp3');
  
}

function setup() {
  imageMode(CENTER);
  canvas = createCanvas(windowWidth / 2, windowHeight - 7);
  canvas.parent("game");

//______________________________________START HRY / TUTORIAL / HUDBA ______________________________________

  textFont(myFont);
  mySound.setVolume(0.3);
  bossIntro.setVolume(0.6);

  options.addEventListener("click", () => {
    if (music) {
      mySound.stop();
    } else {
      if (!mySound.isPlaying()) mySound.loop();
    }

    music = !music;
    clickCount++;
    if(clickCount %2 === 1){
      options.style.color = "rgb(6, 214, 41)";
    }else{
      options.style.color = "rgb(219, 3, 3)";
    }
   });

    startGamebtn.addEventListener("click", () => {
      startGame();
      victoryNumber = 1;
    });

  howToPlay.addEventListener("click", () => {
      tutorial = true;
      options.style.display = "none";
      startGamebtn.style.display = "none";
      howToPlay.style.display = "none";
      menu = false;
    });   

}
  
function windowResized() {
  resizeCanvas(windowWidth / 2, windowHeight);
}

//____________________________________________HVEZDY___________________________________________

function spawnStar() {
  let x = random(width);
  let y = -30;
  stars.push(new Star(x, y));
}

function draw() {
  background (1);
   
  if (frameCount % 3 === 0) {
    spawnStar();
  }
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].fall();
    stars[i].draw();

    if (stars[i].OffScreen()) {
      stars.splice(i, 1);
    }
  }

  if(tutorial){
    rectMode(CENTER);
    noFill();
    stroke(255);
    strokeWeight(6);
    rect(width / 2, height / 2, windowWidth / 2, 700)
    image(images["howToPlay"], width / 2, height / 2, windowWidth / 2 - 6, 700);
    noStroke();
    fill(0);
    rectMode(CORNER);
  }

  if(end){
    if(score < 0){
      score = 0;
    }
      push();
      fill(0,255,0);
      text(`YOUR SCORE IS ${score}`, width / 2, height / 2);
      fill(255);
      textSize(50);
      text("PRESS ESC TO RETURN TO MENU...", width / 2, height / 2 + 150);
      pop();
      if(victoryNumber === 1){
        victory.play();
        victoryNumber--;
      }
  }

  if(waveActive){
    push();
    textSize(35);
    fill(0,255,0)
    text(`SCORE: ${score}`, width * 0.15, height - 12);
    pop();
  }

//____________________________________________MENU____________________________________________

function drawMenuLogo() {
  const img = images["logo"];
  const scaleFactor = constrain(windowWidth / 1200, 0.4, 1.2);
  push();
  translate(width / 2, height * 0.28);
  scale(scaleFactor);
  image(img, 0, 120, 600, 460);
  pop();
}

//____________________________________________MENU / HRA________________________________________

  if(menu){
    startGamebtn.style.display = "block";
    options.style.display = "block";
    howToPlay.style.display = "block";
    cursor(ARROW);
    drawMenuLogo();
    menuButtons();
    waveActive = false;

  }if(!menu && !tutorial && !end){
    options.style.display = "none";
    startGamebtn.style.display = "none";
    howToPlay.style.display = "none";
    noCursor();
    updateGame();
  }
}

function mousePressed() {
  if (!menu) {
    if(wave === 1 || wave === 2 || boss.fightMode){
      player.shoot();
    }
  }
}

function keyPressed(){
  if(keyCode === ESCAPE){
    if(tutorial){
      tutorial = false;
      menu = true;

      options.style.display = "block";
      startGamebtn.style.display = "block";
      howToPlay.style.display = "block";
    }
    else if(end){
      end = false;
      menu = true;
    }
    else if(!menu){
      menu = true;
    }
    keyCode = ENTER;
  }
}

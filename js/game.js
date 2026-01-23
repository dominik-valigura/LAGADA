let player;
let boss;
let enemies;
let playerProjectiles;
let enemyProjectiles;
let bossProjectiles;
let explosions;
let waveActive = true;
let wave = 1;
let spawned = 0;
let bossHealth = 100;
let spawnCooldown1 = 150;
let spawnCooldown2 = 90;
let totalEnemies1 = 20;
let totalEnemies2 = 45;
let waveCooldown = 240;
let waveTextTimer = 120;
let animationDelay1 = 7;
let score = 0;
let bossTime = 0;

function gameReset(){
    enemies = [];
    playerProjectiles = [];
    enemyProjectiles = [];
    bossProjectiles = [];
    explosions = [];
    wave = 1;
    spawned = 0;
    bossHealth = 100;
    spawnCooldown1 = 150;
    spawnCooldown2 = 90;
    waveCooldown = 240;
    totalEnemies1 = 20;
    totalEnemies2 = 45;
    animationDelay1 = 7;
    animationDelay2 = 7;
    score = 0;
}

function startGame(){
    waveActive = true;
    menu = false;

    gameReset();

    boss = new Boss(width / 2 - 25, -800, images["boss"], bossHealth);
    player = new Player (width / 2, height - 80, images["player"]);

}
    function updateGame() {
            
      let alpha = map(waveTextTimer, 0, 120, 0, 255);
      let alpha1 = map(waveCooldown, 0, 120, 0, 255);

      player.update();
      player.draw();
//____________________________________________ANIMACE____________________________________________

      for (let i = explosions.length - 1; i >= 0; i--) {
        const e = explosions[i];
        e.timer++;
        const frameDelay = 5;
          
          if (e.timer % frameDelay === 0) {
            e.frameIndex++;
          }
        
          if (e.frameIndex >= images["explosion"].length) {
            explosions.splice(i, 1);
            continue;
          }
        
          push();
          imageMode(CENTER);
          image(images["explosion"][e.frameIndex], e.x, e.y, 150, 150);
          pop();
      }

      if(waveTextTimer > 0){
          textFont(myFont);
          textAlign(CENTER);
          textSize(60);
          fill(255, alpha);
          text("WAVE 1", width / 2, height / 2);
          waveTextTimer--;
        }

//____________________________________________1. VLNA____________________________________________
      if (waveActive && wave === 1) {
        
        spawnCooldown1--;

          if(spawnCooldown1 <= 0 && spawned < totalEnemies1){
            enemies.push(new Enemy(random(60, width - 60), -40, images["enemy"]));
            spawned++;
            spawnCooldown1 = 150;
          }  
            
            if(spawned >= 20 && enemies.length === 0){
              fill(255, alpha1);
              text("WAVE 2", width / 2, height / 2);
              waveCooldown--;
              if(waveCooldown <= 0){
                wave++;
                waveCooldown = 240;
              }
            }
          }  

            for (let i = enemies.length - 1; i >= 0; i--) {
                const enemy = enemies[i];
                
                enemy.update();
                enemy.draw();
                
                
                if (enemy.y > height + enemy.h){
                  enemies.splice(i, 1);
                  score -= 10;
                  spawned--;
                } 
             }

//____________________________________________2. VLNA____________________________________________

      if (waveActive && wave === 2) {

        spawnCooldown2--;

          if(spawnCooldown2 <= 0 && spawned < totalEnemies2){
            enemies.push(new Enemy(random(60, width - 60), -40, images["enemy"]));
            spawned++;
            spawnCooldown2 = 90;
          }  
            
            if(spawned >= 45 && enemies.length === 0){
              fill(255, alpha1);
              text("WAVE 3", width / 2, height / 2);
              waveCooldown--;
              if(waveCooldown <= 0){
                wave++;
              }
            }
          }  

            for (let i = enemies.length - 1; i >= 0; i--) {
                const enemy = enemies[i];
                
                enemy.update();
                enemy.draw();
                
                
                if (enemy.y > height + enemy.h){
                  enemies.splice(i, 1);
                  score -= 10;
                  spawned--;
                } 

             }
             console.log(spawned)

//____________________________________________3. VLNA____________________________________________
      if (waveActive && wave === 3) {

        
        boss.update();
        boss.draw();

        if(boss.y >= 0){
          if(bossHealth > 50){
            fill(199, 3, 3);
          }else{
            fill(96, 31, 158);
          }
          noStroke();
          rect(width / 2 - 108, 71, bossHealth * 2.2, 29);
          if(frameCount % 60 === 0){
            bossTime++;
          }
        }

      for (let i = enemies.length - 1; i >= 0; i--) {
          const enemy = enemies[i];
                
          enemy.update();
          enemy.draw();
                
                
          if (enemy.y > height + enemy.h) enemies.splice(i, 1);
      }
      }  


//____________________________PROJEKTILY: PLAYER_______________________________

      for (let i = playerProjectiles.length - 1; i >= 0; i--) {
        const p = playerProjectiles[i];
        p.update();
        p.draw();

        if (p.offScreen()) {
          playerProjectiles.splice(i, 1);
          score -= 10;
          continue;
        }

        if(boss.collidesWith(p)){
          playerProjectiles.splice(i, 1);
          bossHealth--;

          if(bossHealth <= 0){
            score += 1000;
            waveActive = false;
            end = true;
            if(bossTime > 60){
              bossTime -= 60;
              bossTime *= 10;
              score -= bossTime;
            }
            const bx = boss.x;
            const by = boss.y;
          if(animationDelay1 > 0){
            animationDelay1--;
            explosions.push({
              x: bx,
              y: by,
              frameIndex: 0,
              timer: 0
            });
          }else{
            end = true;
           }
          }
          break;
        }

        for (let j = enemies.length - 1; j >= 0; j--) {
          if (enemies[j].collidesWith(p)) {
            const ex = enemies[j].x;
            const ey = enemies[j].y;
            explosions.push({
              x: ex,
              y: ey,
              frameIndex: 0,
              timer: 0
            });
            enemies.splice(j, 1);
            playerProjectiles.splice(i, 1);
            score += 100;
            break;
          }
        }
      } 

//____________________________PROJEKTILY: ENEMY_______________________________

      for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        const p = enemyProjectiles[i];

        p.update();
        p.draw();

        if (p.offScreen()) {
          enemyProjectiles.splice(i, 1);
          continue;
        }

        if (player.collidesWith(p)) {
            end = true;
          }
        }

//____________________________PROJEKTILY: BOSS_______________________________

  for (let i = bossProjectiles.length - 1; i >= 0; i--) {
        const p = bossProjectiles[i];

        p.update();
        p.draw();

        if (p.offScreen()) {
          bossProjectiles.splice(i, 1);
          continue;
        }

      if(player.collidesWith(p)){
        end = true;
      }
    }
  }

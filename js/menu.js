const startGamebtn = document.getElementById("button1");
const howToPlay = document.getElementById("button2");
const options = document.getElementById("button3");

function menuButtons() {
  const centerX = width / 2;
  const baseY = height * 0.6;
  uiScale = constrain(width / 900, 0.5, 1);
  const gap = uiScale * 70;

  const startY  = baseY;
  const howY = baseY + gap;
  const musicY = baseY + gap * 2;
  
  startGamebtn.style.left = centerX + "px";
  startGamebtn.style.top  = startY + "px";

  options.style.left = centerX + "px";
  options.style.top  = musicY + "px";

  howToPlay.style.left = centerX + "px";
  howToPlay.style.top = howY + "px";

  startGamebtn.style.transform = `translate(-50%, -50%) scale(${uiScale})`;
  options.style.transform = `translate(-50%, -50%) scale(${uiScale})`;
  howToPlay.style.transform = `translate(-50%, -50%) scale(${uiScale})`;  
}
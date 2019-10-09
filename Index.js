let person1 = {
  CharacterDamage: 2,
  CharacterHealth: 3,
  CharacterSpeed: 1,
  maxjumpheight: 1.01,
  jumpstep: 0.001,
  jumpcount: 0,
  jumping: false,
  x: 0,
  y: 0,
  reference: document.getElementById("Player"),
  velocityY: 0
};
let keyDown = [];
onkeydown = function(e) {
  keyDown[e.which] = true;
};
onkeyup = function(e) {
  keyDown[e.which] = false;
};
function CharacterName(inp) {
  console.log(inp.value);
  person1.name = inp.value;
}
let selection = document.getElementById("Class").value;
//person1[selection] = "name";

const CharacterImageMap = {
  Fighter: "Fighter.png",
  Ranger: "Ranger.png",
  Rogue: "Niiiiiiinja.png"
};
function NameSelect(name) {
  console.log("hello " + name);
}
function characterClass(sel) {
  console.log(sel.value);
  document.getElementById("CharacterPic").src = CharacterImageMap[sel.value];
}
function startGame() {
  document.getElementById("StartScreen").style.display = "none";
  document.getElementById("Player").style.display = "block";
  document.getElementById("background").style.background =
    "url(pixelland.jpg) center center no-repeat ";
  document.getElementById("background").style.backgroundSize = "cover";
  setInterval(update, 1000 / 60);
  person1.reference.src = CharacterImageMap[selection];
}
function update() {
  move();
  //jump();
}
function move() {
  var gravity = 800 * 0.0000005;

  person1.velocityY += gravity;
  let speed = 0.005;
  if (keyDown[65]) {
    person1.x -= speed;
    person1.reference.style.transform = "scaleX(-1)";
  }
  if (keyDown[68]) {
    person1.x += speed;
    person1.reference.style.transform = "scaleX(1)";
  }

  if (person1.y <= 0) {
    person1.y = 0;
    person1.velocityY = 0;
    //018person1.jumping = false;
  }

  if (keyDown[87] && person1.velocityY == 0) {
    person1.velocityY = -0.008;
  }
  person1.y -= person1.velocityY;

  person1.reference.style.left = person1.x * window.innerWidth + "px";
  person1.reference.style.bottom = person1.y * window.innerWidth + "px";
}

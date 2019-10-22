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
  velocityY: 0,
  velocityX: 0
};
let level = 1;
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
let selection = document.getElementById("Class");
const CharacterImageMap = {
  Fighter: "Fighter.png",
  Ranger: "Ranger.png",
  Rogue: "Niiiiiiinja.png"
};
const speed = 0.005;
const power = -0.015;
if (person1.velocityY <= 0 || person1.velocityX <= 0) {
  (rightWall = false), (leftWall = false);
  function NameSelect(name) {
    console.log("hello " + name);
  }
  function characterClass(sel) {
    console.log(sel.value);
    document.getElementById("CharacterPic").src = CharacterImageMap[sel.value];
  }
  function startGame() {
    showLevel(1);
    rightWall = false;
    leftWall = false;
    document.getElementById("StartScreen").style.display = "none";
    document.getElementById("Player").style.display = "block";
    document.getElementById("background").style.background =
      "url(pixelland.jpg) center center no-repeat ";
    document.getElementById("background").style.backgroundSize = "cover";
    setInterval(update, 1000 / 60);
    person1.reference.src = CharacterImageMap[selection.value];
  }
  function showLevel(arglevel) {
    if (typeof arglevel === "number") {
      level = arglevel;
    }
    for (levelDiv of document.getElementsByClassName("level")) {
      levelDiv.style.display = "none";
    }
    for (levelDiv of document.getElementsByClassName("level" + level)) {
      levelDiv.style.display = "block";
    }
    document.getElementById("level" + level).style.display = "block";
  }
  function collision(animal) {
    const rect = animal.reference.getBoundingClientRect();
    const rightEdge = rect.x + rect.width;
    const leftEdge = rect.x;
    if (leftEdge < 0 && person1.y < 0.75) {
      //hit left wall
      leftWall = true;
      animal.velocityX = 2.5 * speed;
      animal.velocityY = power;
    } else if (rightEdge > window.innerWidth && person1.y < 0.75) {
      //hit Right wall
      rightWall = true;
      animal.velocityX = -2.5 * speed;
      animal.velocityY = power;
    } else if (person1.x < 0 && person1.y > 0.75) {
      person1.velocityX = 0;
      person1.speed = 0;
      person1.x = 0;
    } else if (person1.x > 0.95 && person1.y > 0.75) {
      person1.velocityX = 0;
      person1.speed = 0;
      person1.x = 0.95;
    }
  }
}
function structureCollision(structure) {
  if (person1.velocityY > 0) {
    const structures = document.getElementsByClassName("level" + level);
    const rect = person1.reference.getBoundingClientRect();
    const collisionHeight = 9;
    rect.y = rect.y + rect.height - collisionHeight;
    for (structure of structures) {
      const structureRect = structure.getBoundingClientRect();
      if (
        !(
          rect.x > structureRect.x + structureRect.width ||
          rect.x + rect.width < structureRect.x ||
          rect.y > structureRect.y + collisionHeight ||
          rect.y + collisionHeight < structureRect.y
        )
      ) {
        rightWall = false;
        leftWall = false;
        person1.velocityY = 0;
        person1.velocityX = 0;
        person1.reference.style.bottom = window.height - structureRect.y + "px";
        break;
      }
    }
  }
}
function update() {
  move();
}
function move() {
  const gravity = 800 * 0.0000007;
  person1.velocityY += gravity;
  person1.velocityX += person1.velocityX
    ? person1.velocityX < 0
      ? gravity
      : -gravity
    : 0;
  if (keyDown[65] && person1.velocityX <= 0 && leftWall === false) {
    person1.velocityX = 0;
    person1.x -= speed;
    person1.reference.style.transform = "scaleX(-1)";
  }
  if (keyDown[68] && person1.velocityX >= 0 && rightWall === false) {
    person1.velocityX = 0;
    person1.x += speed;
    person1.reference.style.transform = "scaleX(1)";
  }

  if (person1.y <= 0) {
    rightWall = false;
    leftWall = false;
    person1.y = 0;
    person1.velocityY = 0;
    person1.velocityX = 0;
  }

  collision(person1);
  structureCollision(person1);
  if ((keyDown[32] || keyDown[87]) && person1.velocityY == 0) {
    person1.velocityY = power;
  }
  person1.y -= person1.velocityY;
  person1.x += person1.velocityX;
  person1.reference.style.left = person1.x * window.innerWidth + "px";
  if (person1.velocityY !== 0) {
    person1.reference.style.bottom = person1.y * window.innerHeight + "px";
  }
}

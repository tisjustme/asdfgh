let structure1_1 = {
  reference: document.getElementById("structure1-1")
};
let structure1_2 = {
  reference: document.getElementById("structure1-2")
};
let structure1_3 = {
  reference: document.getElementById("structure1-3")
};
let structure1_4 = {
  reference: document.getElementById("structure1-4")
};
let structure1_5 = {
  reference: document.getElementById("structure1-5")
};
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
let monster1 = {
  reference: document.getElementById("monster1"),
  velocityY: 0,
  velocityX: 0,
  x: 0,
  y: 0,
  go: false
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
  Fighter: "Fighter1a.png",
  Ranger: "trans-char2a.png"
};
const speed = 0.005;
const power = -0.015;
if (person1.velocityY <= 0 || person1.velocityX <= 0) {
  (rightWall = false), (leftWall = false);
  function NameSelect(name) {
    console.log("hello " + name);
  }
  function characterClass(sel) {
    document.getElementById("CharacterPic").src = CharacterImageMap[sel.value];
  }
  function startGame() {
    showLevel(1);
    rightWall = false;
    leftWall = false;
    setTimeout(function() {
      (monster1.x = 0.98),
        (document.getElementById("monster1").style.display = "block"),
        (monster1.go = true);
    }, 2000);
    document.getElementById("StartScreen").style.display = "none";
    document.getElementById("Player").style.display = "block";
    document.getElementById("background").style.backgroundImage =
      "url(pixelland.jpg)";
    document.getElementById("background").style.backgroundSize = "cover";
    setInterval(update, 1000 / 60);
    person1.reference.src = CharacterImageMap[selection.value];
    if (!(person1.name = "Ernesto")) {
      person1.CharacterHealth = 3;
    } else {
      person1.CharacterHealth = 3;
    }
  }
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
    animal.velocityX = 3 * speed;
    animal.velocityY = power;
  } else if (rightEdge > window.innerWidth && person1.y < 0.75) {
    //hit Right wall
    rightWall = true;
    animal.velocityX = -3 * speed;
    animal.velocityY = power;
  } else if (person1.x < 0 && person1.y > 0.75) {
    person1.velocityX = 0;
    person1.speed = 0;
    person1.x = 0;
  } else if (person1.x > 0.95 && person1.y > 0.75) {
    person1.velocityX = 0;
    person1.speed = 0;
    person1.x = 0.95;
  } else if (
    person1.x < monster1.x + 0.05 &&
    person1.x > monster1.x &&
    person1.y > monster1.y - 0.05 &&
    person1.y < monster1.y &&
    person1.velocityX != -3.5 &&
    person1.velocityX != 3.5 &&
    monster1.go == true
  ) {
    person1.velocityX = 2.5 * speed;
    person1.velocityY = power;
    person1.CharacterHealth = person1.CharacterHealth - 1;
    Hit = true;
  } else if (
    person1.x > monster1.x - 0.05 &&
    person1.x < monster1.x &&
    person1.y >= monster1.y - 0.05 &&
    person1.y <= monster1.y &&
    person1.velocityX != -3.5 &&
    person1.velocityX != 3.5 &&
    monster1.go == true
  ) {
    person1.velocityX = -2.5 * speed;
    person1.velocityY = power;
    person1.CharacterHealth = person1.CharacterHealth - 1;
    Hit = true;
  } else Hit = false;
}

function structureCollision(sprite) {
  if (sprite.velocityY > 0) {
    const structures = document.getElementsByClassName("level" + level);
    const rect = sprite.reference.getBoundingClientRect();
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
        sprite.velocityY = 0;
        sprite.velocityX = 0;
        sprite.reference.style.bottom = window.height - structureRect.y + "px";
        break;
      }
    }
  }
}
function update() {
  move();
  monstermove();
}
function move() {
  const gravity = 800 * 0.0000007;
  person1.velocityY += gravity;
  person1.velocityX += person1.velocityX
    ? person1.velocityX < 0
      ? gravity
      : -gravity
    : 0;
  const curImage = person1.reference.src;
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
  if (keyDown[87] && person1.velocityY == 0) {
    person1.velocityY = power;
  }
  person1.y -= person1.velocityY;
  person1.x += person1.velocityX;
  person1.reference.style.left = person1.x * window.innerWidth + "px";
  if (person1.velocityY !== 0) {
    person1.reference.style.bottom = person1.y * window.innerHeight + "px";
  }
}
//Level 1 monsters
//Monster 1

function monstermove() {
  const gravity = 800 * 0.0000007;
  monster1.velocityY += gravity;
  monster1.velocityX += monster1.velocityX
    ? monster1.velocityX < 0
      ? gravity
      : -gravity
    : 0;
  let still = false;
  if (person1.y <= monster1.y + 0.05 || person1.velocityY !== 0) {
    still = true;
  }
  if (person1.x > monster1.x && still) {
    monster1.x += speed * 0.6;
    monster1.reference.style.transform = "scaleX(-1)";
  }
  if (person1.x < monster1.x && still) {
    monster1.x -= speed * 0.6;
    monster1.reference.style.transform = "scaleX(1)";
  }
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y == 0 &&
    person1.velocityY == 0 &&
    monster1.x > 0.5
  ) {
    monster1.x -= speed * 0.6;
  }
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y == 0 &&
    person1.velocityY == 0 &&
    monster1.x < 0.25 &&
    monster1.x > 0.37
  ) {
    monster1.x += speed * 0.6;
  }
  if (monster1.y <= 0) {
    rightWall = false;
    leftWall = false;
    monster1.y = 0;
    monster1.velocityY = 0;
    monster1.velocityX = 0;
  }
  monster1collision(monster1);
  structureCollision(monster1);
  //decide if monster should jump
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y == 0 &&
    person1.velocityY == 0 &&
    monster1.x > 0.37 &&
    monster1.x < 0.5
  ) {
    monster1.velocityY = power;
    monster1.velocityX = -2 * speed;
  }
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y == 0 &&
    person1.velocityY == 0 &&
    monster1.x > 0.25 &&
    monster1.x < 0.37
  ) {
    monster1.velocityY = power;
    monster1.velocityX = 2 * speed;
  }
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y >= 0.1 &&
    monster1.y <= 0.2 &&
    person1.velocityY == 0 &&
    monster1.velocityY == 0 &&
    monster1.x >= 0.4
  ) {
    monster1.velocityY = power;
    monster1.velocityX = 2 * speed;
  }
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y >= 0.1 &&
    monster1.y <= 0.2 &&
    monster1.y < 0.4 &&
    person1.velocityY == 0 &&
    monster1.velocityY == 0
  ) {
    monster1.x += speed * 0.6;
  }
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y >= 0.32 &&
    monster1.y <= 0.5 &&
    person1.velocityY == 0 &&
    monster1.velocityY == 0 &&
    monster1.x <= 0.54
  ) {
    monster1.velocityY = power;
    monster1.velocityX = -2 * speed;
  }
  if (
    person1.y > monster1.y + 0.1 &&
    monster1.y >= 0.32 &&
    monster1.y <= 0.5 &&
    person1.velocityY == 0 &&
    monster1.velocityY == 0 &&
    monster1.x > 0.54
  ) {
    monster1.x -= speed;
  }
  if (
    person1.y > monster1.y + 0.08 &&
    monster1.y > 0.5 &&
    monster1.y <= 0.7 &&
    person1.velocityY == 0 &&
    monster1.velocityY == 0 &&
    person1.x < monster1.x
  ) {
    monster1.velocityY = power;
    monster1.velocityX = -2 * speed;
  }
  if (
    person1.y > monster1.y + 0.08 &&
    monster1.y >= 0.5 &&
    monster1.y <= 0.7 &&
    person1.velocityY == 0 &&
    monster1.velocityY == 0 &&
    person1.x > monster1.x
  ) {
    monster1.velocityY = power;
    monster1.velocityX = 2.5 * speed;
  }
  monster1.y -= monster1.velocityY;
  monster1.x += monster1.velocityX;
  monster1.reference.style.left = monster1.x * window.innerWidth + "px";
  if (monster1.velocityY !== 0) {
    monster1.reference.style.bottom = monster1.y * window.innerHeight + "px";
  }
}

function monster1collision(monster1) {
  const monster1rect = monster1.reference.getBoundingClientRect();
  const rightEdge = monster1rect.x + monster1rect.width;
  const leftEdge = monster1rect.x;
  if (leftEdge < 0 && monster1.y < 0.75) {
    //hit left wall
    leftWall = true;
    monster1.velocityX = 2.5 * speed;
    monster1.velocityY = power;
  } else if (rightEdge > window.innerWidth && monster1.y < 0.75) {
    //hit Right wall
    rightWall = true;
    monster1.velocityX = -2.5 * speed;
    monster1.velocityY = power;
  } else if (monster1.x < 0 && monster1.y > 0.75) {
    monster1.velocityX = 0;
    monster1.speed = 0;
    monster1.x = 0;
  } else if (monster1.x > 0.95 && monster1.y > 0.75) {
    monster1.velocityX = 0;
    monster1.speed = 0;
    monster1.x = 0.95;
  }
}

//Monster 2

//Monster 3
//monster 4
//monster 5
//Level 2 Monsters
if (person1.CharacterHealth <= 0) {
  {
    monster1.go = false;
    document.getElementById("monster1").style.display = "none";
    document.getElementById("Player").style.display = "none";
    StartScreen.style.display = "block";
    document.getElementById("background").style.background =
      "url(pixel-art---backgrounds-looney-factory-design-3.png)";
    document.getElementById("level1").style.display = "none";
    window.window.location.reload(true);
  }
}

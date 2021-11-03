// declare all variables
var scene, bow, arrow, arrowGroup;
var sceneImg, bowImg, arrowImg;

// declare balloon groups of four colours
var red, green, blue, pink;

// score to be displayed on canvas
var score = 0;

function preload(){
  // load all images
  sceneImg = loadImage("background0.png");
  bowImg = loadImage("bow0.png");
  arrowImg = loadImage("arrow0.png");
}

function setup() {
  // create a 400 * 400 canvas
  createCanvas(400, 400);
  
  // create scene, add image and enlarge it
  scene = createSprite(0 ,0, 400, 400);
  scene.addImage(sceneImg);
  scene.scale = 2.5;
  
  // create bow and add image
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImg);

  // create an arrow group
  arrowGroup = new Group();
  
  // create new groups of four balloon colours
  red = new Group();
  green = new Group();
  blue = new Group();
  pink = new Group();
}

function draw() {
  // scroll ground horizontally leftwards
  scene.velocityX = -3;

  // reset ground from centre if escapes canvas width
  if (scene.x < 0) { scene.x = scene.width/2; }
  
  // move the bow vertically with the mouse pointer
  bow.y = World.mouseY;
  
  // release arrow when space key is pressed
  if (keyDown("space")) { createArrow(); }

  // create balloon once in every 100 frame counts
  // appear slightly before the previous balloon disappears (in 400/3 or 133.333 frame counts))
  if (World.frameCount % 100 == 0) {
    spawnBalloon();
  }

  // destroy all red balloons and arrows, and increment score by 4 when a red balloon is hit
  if (arrowGroup.isTouching(red)) {
    red.destroyEach();
    arrowGroup.destroyEach();
    score += 4;
  }

  // destroy all green balloons and arrows, and increment score by 3 when a green balloon is hit
  if (arrowGroup.isTouching(green)) {
    green.destroyEach();
    arrowGroup.destroyEach();
    score += 3;
  }

  // destroy all blue balloons and arrows, and increment score by 2 when a blue balloon is hit
  if (arrowGroup.isTouching(blue)) {
    blue.destroyEach();
    arrowGroup.destroyEach();
    score += 2;
  }

  // destroy all pink balloons and arrows, and increment score by 1 when a pink balloon is hit
  if (arrowGroup.isTouching(pink)) {
    pink.destroyEach();
    arrowGroup.destroyEach();
    score += 1;
  }

  // display score on canvas
  text("Score: "+ score, 300, 50);

  // draw sprites
  drawSprites();
}


function createArrow() {
  // create arrow vertically aligned with bow, add image and scale it
  arrow = createSprite(360, bow.y, 60, 10);
  arrow.addImage(arrowImg);
  arrow.scale = 0.3;

  // shoot arrow horizontally leftwards
  arrow.velocityX = -4;

  /*
  destroy arrow after 100 frame counts

  speed = distance/time
  hence, time = distance/speed
        = canvas width (px) / velocity (px per frame)
        = 400 px / 4 px/frame
        = 100 frames

  thus, an obstacle would take 100 frame counts to reach the left edge and must be destroyed then
  */
  arrow.lifetime = 100;
  arrowGroup.add(arrow);
}


// my version to spawn a random coloured balloon
function spawnBalloon() {
  // create a balloon colours array to pick a random one
  var select_balloon_array = ["red", "green", "blue", "pink"];

  var select_balloon = Math.round(random(0, 3));

  // choose a random balloon olour from the colours array
  var select_balloon = select_balloon_array[select_balloon];
  
  // create balloon at a random vertical position, add image and scale it
  balloon = createSprite(0, random(30, 370), 10, 10);
  balloon.addImage(loadImage(select_balloon+"_balloon0.png"));
  balloon.scale = 0.1;

  if (select_balloon == "pink") {
    balloon.scale = 1.3;
  }

  // move balloon horizontally rightwards
  balloon.velocityX = 3;

  /*
  destroy balloon after 400/3 or 133.333 frames

  speed = distance/time
  hence, time = distance/speed
        = canvas width (px) / velocity (px per frame)
        = 400 px / 3 px/frame
        = 400/3 or 133.333 frames

  thus, an obstacle would take 400/3 or 133.333 frame counts to reach the left edge and must be destroyed then
  */
  balloon.lifetime = 400/3;

  // 
  switch (select_balloon) {
    case 0: red.add(balloon); break;
    case 1: green.add(balloon); break;
    case 2: blue.add(balloon); break;
    default: pink.add(balloon);
  }
}

/* Whjr version

function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}

*/

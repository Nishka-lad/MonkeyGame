var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}



function setup() {
  createCanvas(600, 400);
  ground = createSprite(200, 370, 700, 15);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  monkey = createSprite(80, 335, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;
  foodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("blanchedalmond");
  drawSprites();

  stroke("blue");
  textSize(20);
  fill("darkOrange");
  text("Score👉" + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("cyan");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time👉" + survivalTime, 100, 50);

  if (gameState === PLAY) {

    if (ground.x < 450) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y > 200) {
      monkey.velocityY = -15;

    }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    food();
    obstacle();
    if (foodGroup.isTouching(monkey)) {
      score = score + 1;
      //   foodGroup.destroyEach();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;

    }
  } else if (gameState === END) {
    background("cyan");
    fill("darkorange");
    textSize(30);
    text("Opps!!!😔", 250, 170);
    text("Game Over⌛", 220, 220);
    //foodGroup.velocityX = 0;
    //obstacleGroup.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

  }

}


function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(700, 120, 20, 20);
    banana.y = Math.round(random(120, 200));
    banana.addImage("0", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 150;
    foodGroup.add(banana);
  }
}

function obstacle() {
  if (World.frameCount % 300 === 0) {
    var rock = createSprite(700, 350, 20, 20);
    rock.addImage("move", obstacleImage);
    rock.scale = 0.1;
    rock.velocityX = -5;
    rock.lifetime = 150;
    obstacleGroup.add(rock);
  }
}
 var backGround,backGroundImage;
var coin,coinImage;
var sonic,sonicImage;
var invisibleGround;
var score;
var car,carImage;
var END = 0;
var gameState = END;

function preload() {
  backGroundImage = loadImage("background.jpg")
  sonicImage = loadAnimation("sonic1.png","sonic2.png","sonic3.png","sonic4.png","sonic5.png","sonic6.png","sonic7.png","sonic8.png")
  coinImage = loadImage("coin.png")
  carImage = loadImage("car.png")
}

function setup() {
   createCanvas(400, 350);
  backGround = createSprite(100,160);
  backGround.addImage(backGroundImage)
  backGround.scale=1.0;
  backGround.velocityX=-6;
  backGround.x=backGround.width/2;
 
  
  sonic = createSprite(60,240,20,20);
  sonic.addAnimation("moving",sonicImage)
  sonic.scale=0.2;

  invisibleGround = createSprite(100,270,1000,10);
  invisibleGround.visible = false;
  
  score = 0;
   coinGroup = new Group();
  carGroup = new Group();
}

function draw() {
  background("white")
  sonic.velocityY = sonic.velocityY + 0.9;
   if(keyDown("space")&& sonic.y >= 200) {
        sonic.velocityY = -18;
    }

    camera.position.x=displayWidth/8;
    camera.position.y=sonic.y;
  
  sonic.collide(invisibleGround);
  
   if (backGround.x<0){
      backGround.x = backGround.width/4;
    }
  
  spawncoin();
  spawncar();
 if (coinGroup.isTouching(sonic)){
     coinGroup.destroyEach();
    score = score +1;
  }

  drawSprites();
  if (carGroup.isTouching(sonic)){
   background("black");
    gameState=END;
    stroke("white") 
    textSize(20);
    fill("white");
    text("Gameover", 150,150);
    sonic.collide(car);
  }

  stroke("white")
  fill("white")
  textSize(20)
  text("Score: "+ score, 220,50);
}

function spawncoin(){
  if (frameCount % 100===0){
    var coin = createSprite(400,120,10,40);
    coin.velocityX = -6;
    coin.addImage(coinImage);
    coin.lifetime = 300;
    coin.scale=-0.03;
    coinGroup.add(coin);
  }
}

function spawncar(){
  if (frameCount % 100===0){
    var car = createSprite(800,240,10,10);
    car.velocityX = -6;
    car.addImage(carImage);
    car.lifetime = 300;
    car.scale=0.09;
    carGroup.add(car);
  }
}
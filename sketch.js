
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var survivalTime = 0
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
 monkey_running=
loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  bananaGroup = createGroup ();
  obstacleGroup = createGroup ();
  
  //creating monkey
  monkey = createSprite (80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  
  //creating ground
  ground = createSprite (400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
}

function draw() {
  background ("#008000");
  
  if (ground.x<0){
    ground.x = ground.width/2
  }
  
  
  
  monkey.collide (ground);

  
  
  if (gameState == PLAY){
  
  if (frameCount % 40 == 0){
      survivalTime = survivalTime + 1}
    
    fill ("yellow");
    textSize (25);
  text ("survivalTime: " + survivalTime,100,50)
    
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score+1
  }
  text ("score: " + score,90,90);
    
    stone();
    food();
    
    if (keyDown ("space")){
    monkey.velocityY = -12 ;
  }
  //give gravity
  monkey.velocityY = monkey.velocityY + 0.8 ;
  
    if (monkey.isTouching(obstacleGroup)){
     
      
      monkey.velocityY = 1;
      ground.velocityX = 0;
      
      bananaGroup.destroyEach();
      
      text("press R to restart", 200, 200);
      fill ("yellow")
     
       obstacleGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      
      if (keyDown("R")) {
      Reset();
      }
    }
  }
  drawSprites ();

}

function food () {
  
  if (frameCount % 80 === 0){
    var banana = createSprite (300,120,40,10)
    banana.y = Math.round(random(120,200));
    banana.addImage (bananaImage);
    banana.velocityX = -4
    banana.lifetime = 161
    banana.scale = 0.1
    bananaGroup.add(banana)
    
  }
    
}

function stone () {
  if (frameCount % 300 === 0){
   var obstacle = createSprite(400,320,10,40);
   obstacle.addImage (obstacleImage);
   obstacle.lifetime = 165
    obstacle.velocityX = -3
    obstacle.scale = 0.2
    obstacleGroup.add(obstacle)
   
  } 
}

function Reset(){
  gameState = PLAY;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  survivalTime = 0;
  score = 0;
  }


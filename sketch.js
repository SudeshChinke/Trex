var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, CLOUDS, cloudgroup;
var obstacle,obstaclegroup;
var score;
var gamestate="play";
var restart,gameover,restartR,gameoverG;
var num=5;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  CLOUDS = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartR=loadImage("restart.png");
  gameoverG=loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600,200)
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop",trex_collided);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,40)
  trex.debug=false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -10;
  
  restart = createSprite(300,130,10,10);
  restart.addImage("R",restartR);
  restart.scale = 0.5;
  restart.visible=false;
  
  gameover = createSprite(300,80,10,10);
  gameover.addImage("G",gameoverG);
  gameover.scale = 0.8;
  gameover.visible=false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score=0;
  
  cloudgroup=new Group();
  obstaclegroup=new Group();
  
}

function draw() {
  background("black);
  
  if(gamestate==="play"){
    
  if(keyDown("space")&& trex.y >= 161) {
    trex.velocityY = -10.7;
    jumpSound.play();
  }
    
  ground.velocityX = -(4+3*score/100); 
    
  trex.velocityY = trex.velocityY + 0.68;
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  score=score+Math.round(getFrameRate()/60);
    
  text("Score  :  "+ score, 500,20,textSize(15),fill(20));
  
   if(score>0&&score%100===0){
     checkPointSound.play();
   }  
    
  spawnClouds();
  spawnObstacle(); 
    
  if(obstaclegroup.isTouching(trex)){
    gamestate="end";
    dieSound.play();
   } 
    
    
  }
  else if(gamestate==="end"){
    
    ground.velocityX=0;
    trex.velocityY=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    restart.visible=true;
    restart.depth=cloud.depth;
    restart.depth=restart.depth+1;
    gameover.visible=true;
    gameover.depth=cloud.depth;
    gameover.depth=gameover.depth+1;
    
    trex.changeAnimation("stop",trex_collided);
    
    text("Score  :  "+ score, 250,30,textSize(20),fill(20),stroke(4));
    score.depth=cloud.depth;
    score.depth=score.depth+1;
    
  }
  
  
  //console.log(gamestate);
  
  /*console.log(trex.y)
  var rand =  Math.round(random(1,100))
  console.log(rand)*/

  // "+"string concatination join 2 string;
  /*text("Score:"+score,500,20,textSize(15),fill(20);
  score=score+Math.round(getFrameRate()/10;*/
  
  
  trex.collide(invisibleGround);

  if(mousePressedOver(restart)){ 
   Restart();  
  }
  console.log(num);  
  drawSprites();
}

function spawnClouds(){
  if(frameCount%55===0){
  cloud=createSprite(650,30,10,10);
  cloud.velocityX=-5;
  cloud.addAnimation("C",CLOUDS);
  cloud.scale = 0.7;
  cloud.y=Math.round(random(10,60))
  trex.depth=cloud.depth;
  trex.depth=trex.depth+1;
  cloud.lifetime=300;
  cloudgroup.add(cloud);
    
  }  
}
  
function spawnObstacle(){
  if(frameCount%70===0){
   obstacle=createSprite(600,165,10,10);
   obstacle.velocityX=-5;
   var rand=Math.round(random(1,6))
   switch(rand){
     case 1: obstacle.addImage(obstacle1);
              break;
     case 2: obstacle.addImage(obstacle2);
              break;
     case 3: obstacle.addImage(obstacle3);
              break;
     case 4: obstacle.addImage(obstacle4);
              break;
     case 5: obstacle.addImage(obstacle5);
              break;
     case 6: obstacle.addImage(obstacle6);
              break; 
     default:break;           
   }
   obstacle.scale=0.5;  
   obstacle.lifetime=300; 
   obstaclegroup.add(obstacle);
  }
}
function Restart(){
    gamestate="play";
    gameover.visible=false;
    restart.visible=false;
    obstaclegroup.destroyEach();
    cloudgroup.destroyEach();
    trex.changeAnimation("running", trex_running);     
    score=0;
}

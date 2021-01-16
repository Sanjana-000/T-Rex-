var trex, trex_running, trex_collided, ground, groundimg, invisibleGround, obstacle1, obstacle2, obstacle3, obstacle4, onstacle5, obstacle6, cloudimg 
var cloudsGroup, obstaclesGroup
var play=1
var end=0
var gamestate=play
var score=0
var gameover, restart, gameoverimg, restartimg

function preload (){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundimg = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  cloudimg = loadImage("cloud.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
} 

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5
  ground = createSprite(300,190,600,20);
  ground.addImage(groundimg);
  ground.velocityX = -4
  invisibleGround = createSprite(300,195,600,5);
  invisibleGround.visible=false
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(245);
  
  if(gamestate==play){
    
    if(keyDown("space")&&trex.y>168){
    trex.velocityY = -12
  }
    
      trex.velocityY = trex.velocityY + 0.8;
  //console.log(trex.y);
   
    if(ground.x<0){
    ground.x = 300
     }
    
    trex.collide(invisibleGround);
    
    spawnClouds();
  
    spawnCacti();
    
    if(obstaclesGroup.isTouching(trex)){
      gamestate=end
    }
    
  }
  
  else{
    ground.velocityX=0
    trex.velocityY=0
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided);
    
  }
  

  drawSprites()
  
  
  
}

function spawnClouds(){
  if(frameCount%80==0){
    var cloud = createSprite(620,130,10,10);
    cloud.addImage(cloudimg);
    cloud.velocityX = -3
    cloud.y = Math.round(random(150,10));
    console.log(trex.depth);
    console.log(cloud.depth);
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloud.lifetime = 207
    cloudsGroup.add(cloud);
}

} 



function spawnCacti(){
  if(frameCount%75==0){
    var obsticle = createSprite(620,175,10,10);
    obsticle.velocityX = -4
    var rand = Math.round(random(1,6))
    switch(rand){
        case 1: obsticle.addImage(obstacle1);
        break
        case 2: obsticle.addImage(obstacle2);
        break
        case 3: obsticle.addImage(obstacle3);
        break
        case 4: obsticle.addImage(obstacle4);
        break
        case 5: obsticle.addImage(obstacle5);
        break
        case 6: obsticle.addImage(obstacle6);
        break
        }
        obsticle.scale = 0.5
        obsticle.lifetime = 155
        obstaclesGroup.add(obsticle);
  }
}












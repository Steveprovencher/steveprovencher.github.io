//Inits
var x, y, ballSize;
var h = window.innerHeight;
var w = window.innerWidth;
var numberColor = 1;
var ballReset = 0;
var score = 0;
var ballsUsed = 1;


function preload() {  
	 an2 = loadAnimation("assets/gradient1.png", "assets/gradient1.png");

	 corkPop = loadSound('assets/cork.flac');

	 pop1 = loadSound('assets/pop1.ogg');
	 pop2 = loadSound('assets/pop2.ogg');
	 pop3 = loadSound('assets/pop3.ogg');
}




function setup() {

  createCanvas(window.innerWidth, window.innerHeight);



  //start center
  x = width / 2;
  y = height / 2;

  ballSize = 20;
  ballSpeed = 16;
  makeBall();

  var brickImage2 = loadImage("assets/brick3.png");
  //Create group to store bricks
  

  bricks = new Group();	
  brickW = 100;
  brickH = 20;
  brickPadding = 0;
  brickHPadding = 0;
  numBricks = floor(w/brickW);
  brickEndPadding = (w - numBricks*brickW);

  brickLines = 5;
  //Create one row of bricks

  for (var j=0; j < brickLines; j++ ) {
  	for (var i = 0; i <numBricks; i++) {

  		pickBrick = round(random(0,1));
  	  //Y Position for each brick
  	  brickX =  brickEndPadding/2 + brickPadding/2 + brickPadding*i + brickW*i + brickW/2;
  	  brickY =  brickHPadding/2 + brickHPadding*j + brickH*j + brickH/2;

  	  //Make brick object
  	  var brick = createSprite(brickX, brickY, brickW, brickH);

  	  brick.addImage(brickImage2);

  	  brick.shapeColor = color(0,0,0);
  	  //Add object to container
  	  bricks.add(brick);
  	  brick.immovable = true;

  	}
  }

 //Create Wall Objects (1 pixels around screen)
 wallTop = createSprite(width/2, 0, width, 1);
 wallTop.immovable = true;

 wallBottom = createSprite(width/2, height, width, 1);
 wallBottom.immovable = true;

 wallLeft = createSprite(0,height/2,1,innerHeight);
 wallLeft.immovable = true;

 wallRight = createSprite(width,height/2,1,height);
 wallRight.immovable = true;

 wallTop.shapeColor = wallLeft.shapeColor = wallRight.shapeColor = wallBottom.shapeColor = color(255,255,255);


 platform = createSprite(0, 0, brickW, brickH);
 platform.immovable = true;

 platform.position.y = h - (brickH/10) ;

 an2.looping = false;
 an2.frameDelay = 1;
 ball.addAnimation("moving","assets/gradient1.png");
 ball.addAnimation("bouncing",an2);



}


function draw() {
	background(0, 0, 0);
	ball.shapeColor = color(0);
	bricks.shapeColor = color(0);
	platform.shapeColor = color(255, 255, 255);


	ball.bounce(bricks,brickCollision);
	ball.bounce(wallTop);
	ball.bounce(wallLeft);
	ball.bounce(wallRight);


	platform.position.x = constrain(mouseX, platform.width/2, width-platform.width/2);
	
	if(ball.bounce(platform))
	{
		pop1.play();
		var swing = (ball.position.x-platform.position.x)/2;
		ball.setSpeed(ballSpeed, ball.getDirection()+swing);
		//ball.addAnimation("bouncing",an2);
		//ball.changeAnimation('bouncing');
	}

	if(ball.collide(wallBottom))
	{
		ball.remove();
		ballReset = 1;
		ballsUsed = ballsUsed + 1;
	}

	if (ballReset == 1) 
	{

		if (mouseIsPressed)
		{
			makeBall();
			ballReset = 0;
		}

	}




	drawSprites();

	displayText();

}











/////Functions used in game//////
function brickCollision(ball,brick) {
    corkPop.play();
	brick.remove();
	background(0);
	numberColor = 1;
	score = score + 1;
}

function makeBall() {

	ball = createSprite(width / 2, height / 2, ballSize, ballSize);
	ball.setSpeed(ballSpeed, random(90 - 45, 90 + 45));
	ball.addAnimation("moving","assets/gradient1.png");
	ball.changeAnimation("moving");
	ball.scale = 0.10;

}

function displayText() {

 textSize(32);
 fill(255);
 //Write score in bottom left
 text(score, 10, h-10);
 //Write amount of balls used in bottom right
 text(ballsUsed, w-40,h-10);


}






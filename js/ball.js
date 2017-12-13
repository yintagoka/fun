window.onload = init;
let canvas, ctx, width, height;
let numberOfBall = 10;
let ballArray=[];
let colorArray = ['red','green','pink','gray','yellow','cyan'];

function init() {
  console.log('init called');
  canvas = document.querySelector('#myCanvas');
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  generateBalls(numberOfBall);
  animate();
}

function generateBalls(numberOfBall) {
  ballArray = [];
  for (var i = 0; i < numberOfBall; i++) {
  	var ball = {
  	  x:width/2,  // start from center
  	  y:height/2, // start from center
  	  color:colorArray[Math.round(Math.random() * 100) % colorArray.length], // between 0 to length of colorArray
  	  radius:10 + Math.round(Math.random() * 100) % 90,  // between 10 and 100
  	  speedX:-10 + Math.round(Math.random() * 100) % 20, // between -10 and +10
  	  speedY:-10 + Math.round(Math.random() * 100) % 20, // between -10 and +10
  	}

  	ballArray.push(ball);
  	drawCircle(ball);
  }
  console.log('ballArray.length = ' + ballArray.length);
}

function animate() {
  console.log('animate');
	ctx.clearRect(0,0,width,height);
	moveBall();
  bounceWhenHitWall();
	requestAnimationFrame(animate);
}

function moveBall() {
  for (var i=0, max = ballArray.length; i < max; i++) {
  	var ball = ballArray[i];
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    drawCircle(ball);
  }
}

function bounceWhenHitWall() {
  for (var i = 0, max = ballArray.length; i < max; i++) {
    var ball = ballArray[i];
    if (ball.x + ball.radius >= width || ball.x - ball.radius <= 0) {
      ball.speedX *= -1;
    }
    if (ball.y + ball.radius >= height || ball.y - ball.radius <= 0) {
      ball.speedY *= -1;
    }
  }
}

function drawCircle(ball) {
  ctx.save();

  ctx.translate(ball.x,ball.y);
  ctx.fillStyle = ball.color;
  ctx.beginPath();

  ctx.arc(0, 0, ball.radius, 0, 2*Math.PI);
  ctx.fill();

  ctx.restore();
}

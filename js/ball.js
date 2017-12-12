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
  	  x:width/2,
  	  y:height/2,
  	  color:colorArray[Math.round(Math.random() * (colorArray.length - 1))],
  	  radius:10 + Math.round(Math.random()*90),
  	  speedX:1+Math.round(Math.random()*9),
  	  speedY:1+Math.round(Math.random()*9),
  	}

  	ballArray.push(ball);
  	drawCircle(ball);
  }
}

function animate() {
	canvas.clearRect(0,0,width,height);
	moveBall();
	requestAnimationFrame(animate);
}

function moveBall(ballArray) {
  for (var i=0, max = ballArray.length; i < max; i++) {
  	var ball = ballArray[i];

  }
}

function drawCircle(ball) {
  ctx.save();

  ctx.translate(ball.x,ball.y);
  ctx.fillStyle = ball.color;
  ctx.beginPath();

  ctx.arc(0, 0, ball.radius, 0, 2*Math.PI);
  ctx.fill();
  ctx.fillStyle = 'green';
  ctx.fillRect(0,0,30,30);

  ctx.restore();
}

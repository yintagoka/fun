window.onload = init;
let ctx, width, height;
let canvas, stopButton,applyButton, numberOfBallInput;
let numberOfBall = 10;
let ballArray=[];
let stateMotion = true;
let colorArray = ['red','green','pink','gray','yellow','cyan'];
let animationId;

function init() {
  console.log('init called');
  define();
  setParameter();
  start();
}

function define() {
  canvas = document.querySelector('#myCanvas');
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  numberOfBallInput = document.querySelector('#numberOfBalls');
  applyButton = document.querySelector('#applyButton');
  stopButton = document.querySelector('#stopButton');

  applyButton.addEventListener('click', setParameter);
  stopButton.addEventListener('click', stopToggle);
}

function start() {
  generateBalls(numberOfBall);
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  animate();
}

function setParameter() {
  console.log('numberOfBallElement.value = '+numberOfBallInput.value);
  if (numberOfBallInput.value) {
    numberOfBall = numberOfBallInput.value;
  }
  start();
  // debug();
}

function stopToggle() {
  if (stateMotion) {
    for (var i=0, max = ballArray.length; i < max; i++) {
      var ball = ballArray[i];
      ball.cacheSpeedX = ball.speedX;
      ball.cacheSpeedY = ball.speedY;
      ball.speedX = 0;
      ball.speedY = 0;
      stateMotion = false;
      stopButton.innerHTML = 'Continue';
    }
  } else {
    for (var i=0, max = ballArray.length; i < max; i++) {
      var ball = ballArray[i];
      ball.speedX = ball.cacheSpeedX;
      ball.speedY = ball.cacheSpeedY;
      stateMotion = true;
      stopButton.innerHTML = 'Stop';
    }
  }
}

function generateBalls(numberOfBall) {
  ballArray = [];
  for (var i = 0; i < numberOfBall; i++) {
  	var ball = {
  	  x:width/2,  // start from center
  	  y:height/2, // start from center
  	  color:colorArray[Math.round(Math.random() * 100) % colorArray.length], // between 0 to length of colorArray
  	  radius:10 + Math.round(Math.random() * 100) % 90,  // between 10 and 100
  	  speedX:-5 + Math.round(Math.random() * 100) % 10, // between -5 and +5
  	  speedY:-5 + Math.round(Math.random() * 100) % 10, // between -5 and +5
  	}

  	ballArray.push(ball);
  	drawCircle(ball);
  }
  console.log('ballArray.length = ' + ballArray.length);
}

function debug() {
  for (var i=0, max = ballArray.length; i < max; i++) {
    var ball = ballArray[i];
    console.log('speedX = '+ball.speedX);
    console.log('speedY = '+ball.speedY);
  }
}

function animate() {
	ctx.clearRect(0,0,width,height);
	moveBall();
  bounceWhenHitWall();
	animationId = requestAnimationFrame(animate);
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

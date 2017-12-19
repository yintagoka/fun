window.onload = init;
let ctx, width, height;
let canvas, stopButton,applyButton, numberOfBallInput, addColorButton, colorFieldset;
let numberOfBall = 10;
let ballArray=[];
let stateMotion = true;
let colorArray = [];
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
  addColorButton = document.querySelector('#addColor');
  colorFieldset = document.querySelector('#colors');

  applyButton.addEventListener('click', setParameter);
  stopButton.addEventListener('click', stopToggle);
  addColorButton.addEventListener('click', addColorComponent);
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
  console.log('setting colors');
  let colorElements = document.querySelectorAll('input[type=color]');
  if (colorElements) {
    colorArray=[];
    for (let i=0, max=colorElements.length;i<max;i++) {
      let colorElement = colorElements[i];
      colorArray.push(colorElement.value);
    }
  }
  start();
  // debug();
}

function stopToggle() {
  if (stateMotion) { // stop balls
    for (let i=0, max = ballArray.length; i < max; i++) {
      let ball = ballArray[i];
      ball.cacheSpeedX = ball.speedX;
      ball.cacheSpeedY = ball.speedY;
      ball.speedX = 0;
      ball.speedY = 0;
      stateMotion = false;
      stopButton.innerHTML = 'Continue';
    }
  } else { // move balls
    for (let i=0, max = ballArray.length; i < max; i++) {
      let ball = ballArray[i];
      ball.speedX = ball.cacheSpeedX;
      ball.speedY = ball.cacheSpeedY;
      stateMotion = true;
      stopButton.innerHTML = 'Stop';
    }
  }
}

function addColorComponent() {
  console.log('addColor');

  let colorElements = document.querySelectorAll('#colors input[type=color]');
  let removeButtons = document.querySelectorAll('#colors input[type=color]+button');
  let brElements = document.querySelectorAll('#colors br');
  for (let i=0, max=colorElements.length; i<max; i++) {
    let colorElement = colorElements[i];
    let removeButton = removeButtons[i];
    let brElement = brElements[i];
    colorElement.setAttribute('id','color'+i);
    removeButton.setAttribute('id','removeColor'+i);
    brElement.setAttribute('id','br'+i);
  }

  let inputColor = document.createElement('input');
  let removeButton = document.createElement('button');
  let brElement = document.createElement('br');

  inputColor.setAttribute('type','color');
  let randomColor = generateRandomColor();
  let hexRandomColor = randomColor.toString(16);
  console.log('randomColor = '+randomColor);
  console.log('hexRandomColor = '+hexRandomColor);
  inputColor.value = '#'+hexRandomColor;

  inputColor.setAttribute('id','color'+colorElements.length);
  removeButton.setAttribute('id','removeColor'+colorElements.length);
  brElement.setAttribute('id','br'+colorElements.length);

  removeButton.innerHTML = 'Remove';
  removeButton.addEventListener('click', removeColorComponent);

  colorFieldset.appendChild(brElement);
  colorFieldset.appendChild(inputColor);
  colorFieldset.appendChild(removeButton);
}

function removeColorComponent(event) {
  console.log('remove color component');
  let removeButton = event.target;
  let removeButtonId = removeButton.getAttribute('id');
  let colorElementId = removeButton.getAttribute('id').replace('removeColor','color');
  let brElementId = removeButton.getAttribute('id').replace('removeColor','br');
  console.log('removeButtonId = '+removeButtonId);
  console.log('colorElementId = '+colorElementId);
  let colorElement = document.querySelector('#'+colorElementId);
  document.querySelector('#'+colorElementId).outerHTML='';
  document.querySelector('#'+removeButtonId).outerHTML='';
  document.querySelector('#'+brElementId).outerHTML='';
}

function generateRandomColor() {
  // 16777215 is the decimal number of ffffff
  return Math.round(Math.random() * 100000000) % (16777215 + 1);
}

function generateBalls(numberOfBall) {
  ballArray = [];
  for (let i = 0; i < numberOfBall; i++) {
  	let ball = {
  	  x:width/2,  // start from center
  	  y:height/2, // start from center
  	  color:colorArray[Math.round(Math.random() * 100) % colorArray.length], // between 0 to length of colorArray
  	  radius:10 + Math.round(Math.random() * 100) % 90, // between 10 and 100
  	  speedX:-5 + Math.round(Math.random() * 100) % 10, // between -5 and +5
  	  speedY:-5 + Math.round(Math.random() * 100) % 10, // between -5 and +5
  	}

  	ballArray.push(ball);
  	drawCircle(ball);
  }
  console.log('ballArray.length = ' + ballArray.length);
}

function debug() {
  for (let i=0, max = ballArray.length; i < max; i++) {
    let ball = ballArray[i];
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
  for (let i=0, max = ballArray.length; i < max; i++) {
  	let ball = ballArray[i];
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    drawCircle(ball);
  }
}

function bounceWhenHitWall() {
  for (let i = 0, max = ballArray.length; i < max; i++) {
    let ball = ballArray[i];
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

const canvas = document.querySelector('#draw');
const canvasDiv = document.querySelector('.display');
const buttons = document.querySelectorAll('[data-action]');

const lineSize = document.querySelector('#size');
const lineSizeDisplay = document.querySelector('.lineSizeDisplay');

const eraserCursor =  'url("https://c.radikal.ru/c10/1907/88/5ab7757bf718.png"), auto';
const pencilCursor = 'url("https://a.radikal.ru/a13/1907/86/113d58217694.png"), auto';

const changeColor = document.querySelector('#color');
const changeBackgroundColor = document.querySelector('#backgroundColor');

const palleteBtn = document.querySelector(".lineColor");
palleteBtn.style.color = changeColor.value;

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.898;
ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let isErase = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.898;
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
  canvasDiv.style.backgroundColor = "#fff";
  changeBackgroundColor.value = "#ffffff";
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

function draw(e) {
  if (!isDrawing) return; 
  console.log(e);
  ctx.lineWidth = lineSize.value;
  
  if(isErase){
    ctx.clearRect(e.offsetX, e.offsetY, ctx.lineWidth, ctx.lineWidth);
  }else{
    ctx.strokeStyle = changeColor.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

function clear(){
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
  canvasDiv.style.backgroundColor = "#fff";
  changeBackgroundColor.value = "#ffffff";
  isErase = false;
  canvas.style.cursor = pencilCursor;
  lineSize.value = '10';
  lineSizeDisplay.innerHTML = lineSize.value;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

function lineSizeChanging(){
  lineSizeDisplay.innerHTML = lineSize.value;
}

function color(){
  changeColor.click();
}

function lineColorChanging() {
  palleteBtn.style.color = changeColor.value;
}

function eraser() {
  isErase = true;
  canvas.style.cursor = eraserCursor;
}

function pencil() {
  isErase = false;
  canvas.style.cursor = pencilCursor;
}

function backgroundColor() {
  changeBackgroundColor.click();
}
 
function backgroundBtnChanging(e){
  canvasDiv.style.backgroundColor = changeBackgroundColor.value;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  console.log(`${lastX}, ${lastY}`)
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

lineSize.addEventListener('change',lineSizeChanging);
lineSize.addEventListener('mousemove',lineSizeChanging);

changeColor.addEventListener('change',lineColorChanging);
changeBackgroundColor.addEventListener('change',backgroundBtnChanging);

buttons.forEach(button => button.addEventListener('click', function() {
  eval(this.dataset.action);
}));

 window.addEventListener("resize", resize);




const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

const backgroundDiv = document.querySelector('.canvas');

const lineSizeDisplay = document.querySelector('#line-size');
const lineSizeRange = document.querySelector('#size');
const palleteBtn = document.querySelector('#pallete');
const eraserBtn = document.querySelector('#eraser');
const pencilBtn = document.querySelector('#pencil');
const clearAllBtn = document.querySelector('#clear');
const backgroundColorBtn = document.querySelector('#background');

const changeColor = document.querySelector('#color');
const changeBackgroundColor = document.querySelector('#backgroundColor');

palleteBtn.style.color = changeColor.value;
lineSizeDisplay.innerHTML = lineSizeRange.value + 'px';

canvas.width = window.innerWidth * 0.895;
canvas.height = window.innerHeight * 0.743;
ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let isErase = false;

function resize() {
  ctx.canvas.width = window.innerWidth * 0.895;
  ctx.canvas.height = window.innerHeight * 0.743;
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
  //backgroundDiv.style.backgroundColor = "#fff";
  changeBackgroundColor.value = "#ffffff";
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

function clearCanvas(){
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
  backgroundDiv.style.backgroundColor = "#fff";
  changeBackgroundColor.value = "#ffffff";
  isErase = false;
  canvas.style.cursor = 'url("https://a.radikal.ru/a13/1907/86/113d58217694.png"), auto';
  lineSizeRange.value = '10';
  lineSizeDisplay.innerHTML = lineSizeRange.value + 'px';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

function draw(e) {
  if (!isDrawing) return; 
  console.log(e);
  ctx.lineWidth = lineSizeRange.value;
  
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

function lineSizeChanging(){
  lineSizeDisplay.innerHTML = lineSizeRange.value + 'px';
}

function palleteBtnColorChanging(){
  changeColor.click();
}

function lineColorChanging() {
  palleteBtn.style.color = changeColor.value;
}

function eraseTheLine() {
  isErase = true;
  canvas.style.cursor = 'url("https://c.radikal.ru/c10/1907/88/5ab7757bf718.png"), auto';
}

function usePencil() {
  isErase = false;
  canvas.style.cursor = 'url("https://a.radikal.ru/a13/1907/86/113d58217694.png"), auto';
}

function backgroundColorChanging() {
  changeBackgroundColor.click();
}
 
function backgroundBtnChanging(){
  backgroundDiv.style.backgroundColor = changeBackgroundColor.value;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  console.log(`${lastX}, ${lastY}`)
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

lineSizeRange.addEventListener('change',lineSizeChanging);
lineSizeRange.addEventListener('mousemove',lineSizeChanging);
palleteBtn.addEventListener('click', palleteBtnColorChanging);
changeColor.addEventListener('change',lineColorChanging);
eraserBtn.addEventListener('click', eraseTheLine);
pencilBtn.addEventListener('click', usePencil);
backgroundColorBtn.addEventListener('click', backgroundColorChanging)
changeBackgroundColor.addEventListener('change',backgroundBtnChanging);
clearAllBtn.addEventListener('click', clearCanvas);

window.addEventListener("resize", resize);




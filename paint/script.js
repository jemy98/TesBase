const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushBtn = document.getElementById('brush');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('colorPicker');

canvas.width = 800
canvas.height = 500;

let painting = false;
let erasing = false;
let currentColor = '#000000';
let lineWidth = 5;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? '#FFFFFF' : currentColor;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function toggleBrush() {
    erasing = false;
    brushBtn.classList.add('active');
    eraserBtn.classList.remove('active');
}

function toggleEraser() {
    erasing = true;
    eraserBtn.classList.add('active');
    brushBtn.classList.remove('active');
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColor(e) {
    currentColor =  e.target.value;
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
brushBtn.addEventListener('click', toggleBrush);
eraserBtn.addEventListener('click', toggleEraser);
clearBtn.addEventListener('click', clearCanvas);
colorPicker.addEventListener('input', changeColor);
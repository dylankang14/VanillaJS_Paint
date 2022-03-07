const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll('.control__color');
const range = document.querySelector('#jsRange');
const modeBtn = document.querySelector('#jsMode');
const saveBtn = document.querySelector('#jsSave');
const INITIAL_COLOR = '#2C2C2C';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPaint() {
    painting = false;
}

function startPaint() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function colorHandler(event) {
    const selColor = event.target.style.backgroundColor;
    ctx.strokeStyle = selColor;
    ctx.fillStyle = selColor;
}

function rangeHandler(event) {
    ctx.lineWidth = event.target.value;
}

function modeHandler(event) {
    if (filling === true) {
        filling = false;
        modeBtn.innerText = 'fill';
    } else {
        filling = true;
        modeBtn.innerText = 'paint';
    }
}

function fillHandler(event) {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function saveHandler(event) {
    const url = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = url;
    link.download = 'paintJS';
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mouseup', stopPaint);
    canvas.addEventListener('mouseleave', stopPaint);
    canvas.addEventListener('click', fillHandler);
}

colors.forEach(color => color.addEventListener('click', colorHandler));

if (range) {
    range.addEventListener('input', rangeHandler);
}

if (modeBtn) {
    modeBtn.addEventListener('click', modeHandler);
}

if (saveBtn) {
    saveBtn.addEventListener('click', saveHandler);
}
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll('.control__color');
const range = document.querySelector('#jsRange');
const modeBtn = document.querySelector('#jsMode');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
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
    ctx.strokeStyle = event.target.style.backgroundColor
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

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mouseup', stopPaint);
    canvas.addEventListener('mouseleave', stopPaint);
}

colors.forEach(color => color.addEventListener('click', colorHandler));

if (range) {
    range.addEventListener('input', rangeHandler);
}

if (modeBtn) {
    modeBtn.addEventListener('click', modeHandler);
}
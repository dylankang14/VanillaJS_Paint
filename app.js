const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll('.control__color');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;

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

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mouseup', stopPaint);
    canvas.addEventListener('mouseleave', stopPaint);
}

colors.forEach(color => color.addEventListener('click', colorHandler));
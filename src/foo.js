
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = $('#canvas').innerWidth()
canvas.height = $('#canvas').innerWidth()
const center = canvas.width / 2;
const radius = canvas.width / 3;

// const start = center - (radius)
// context.rect(start, start, radius*2, radius*2)
// context.strokeStyle = '#000';
// context.stroke();

context.beginPath();
// Outer circle
context.arc(center, center, radius, 0, Math.PI*2,true);
// Mouth (clockwise)
context.moveTo(center+20, center+5);
context.arc(center, center+5, radius-20, 0, Math.PI, false);
// Left eye
context.moveTo(center-10-2, center-10);
context.arc(center-15, center-10, 2, 0, Math.PI*2, true);
// Right eye
context.moveTo(center+20-2, center-10);
context.arc(center+15, center-10, 2, 0, Math.PI*2, true);
context.lineWidth = 3;
context.strokeStyle = '#000';
context.stroke();

// context.beginPath();
// context.arc(center  center, radius, 0, 2 * Math.PI, false);
// context.lineWidth = 5;
// context.strokeStyle = '#000';
// context.stroke();


const row = 20
const col = 20
const bitmap = document.getElementById('bitmap');
const mini = bitmap.getContext("2d");
mini.drawImage(canvas, 0, 0, row, col)

// canvas.width = image.width
// canvas.height = image.height
// context.drawImage(image, 0, 0, row, col);


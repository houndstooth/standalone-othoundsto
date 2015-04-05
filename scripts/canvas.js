var SCALE = 18;

var playCursor = [[20,10],[20,30]];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawHoundstooth(startPos, radians, progress) {
  ctx.strokeStyle="#000";
  ctx.fillStyle="#000";
  ctx.lineWidth = 1;

  ctx.beginPath();
  initial_pos = rotateAboutPlayCursor([
    (startPos[0] + FIRST_HOUNDSTOOTH_VERTEX[0]) * SCALE - progress[0],
    (startPos[1] + FIRST_HOUNDSTOOTH_VERTEX[1]) * SCALE - progress[1]
  ], radians);
  ctx.moveTo(initial_pos[0], initial_pos[1]);

  HOUNDSTOOTH_VERTICES.slice(1).forEach(function(vertex) {
    next_pos = rotateAboutPlayCursor([
      (startPos[0] + vertex[0]) * SCALE - progress[0],
      (startPos[1] + vertex[1]) * SCALE - progress[1]
    ], radians);
    ctx.lineTo(next_pos[0], next_pos[1]);
  });

  ctx.lineTo(initial_pos[0], initial_pos[1]);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawPlayCursor() {
  ctx.strokeStyle="#f00";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(playCursor[0][0] * SCALE, playCursor[0][1] * SCALE);
  ctx.lineTo(playCursor[1][0] * SCALE, playCursor[1][1] * SCALE);
  ctx.stroke();
};

function renderHoundsteeth(radians, progress) {
  clearCanvas();

  for (x = curRange[0][0] - 40; x < curRange[1][0] + 80; x += 4) {
    for (y = curRange[0][1] - 40; y < curRange[1][1] + 40; y += 4 ) {
      drawHoundstooth([x, y], radians, progress);
    }
  }
}

drawPlayCursor();

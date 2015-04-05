// each iteration, treat playCursor[0] as top and playCursor[1] as bottom
// so if it's "upside down" it moves left, either way orthogonal to itself
var playCursor = [[20,10],[20,30]];

function drawPlayCursor() {
  // playCursor[0][0] += progress;
  // playCursor[1][0] += progress;

  ctx.strokeStyle="#f00";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(playCursor[0][0] * SCALE, playCursor[0][1] * SCALE);
  ctx.lineTo(playCursor[1][0] * SCALE, playCursor[1][1] * SCALE);
  ctx.stroke();
};

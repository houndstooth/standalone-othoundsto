var curTargetRotation = 0;
var curGapToClose = 0.2449786631;
var rotation = 0.0;
var progress = [0.0, 0,0];
var songStarted = false;

var SPEED = 20;

TARGET_ROTATIONS = [
  -0.2449786631,
  0.2449786631,
  -0.3217505544,
  0.3217505544,
  -0.3805063771,
  0.3805063771,
  -0.463647609,
  0.463647609,
  -0.5880026035,
  0.5880026035,
  -0.6435011088,
  0.6435011088,
  -0.7853981634,
  0.7853981634
] //then you would keep going to the other half of the circle by summing...

function playCursorProgresses() {
  progress[0] += Math.cos(-rotation);
  progress[1] += Math.sin(-rotation);
}

function rotationProgresses() {
  if (Math.abs(rotation - TARGET_ROTATIONS[curTargetRotation]) < 0.001) {
    curTargetRotation += 1;
    curGapToClose = TARGET_ROTATIONS[curTargetRotation] - rotation;
  } else if (rotation < TARGET_ROTATIONS[curTargetRotation]) {
    rotation += 0.0001 + 0.001 * (
      1 - Math.cos((Math.abs(TARGET_ROTATIONS[curTargetRotation] - rotation) /
    curGapToClose) * 2 * Math.PI));
  } else if (rotation > TARGET_ROTATIONS[curTargetRotation]) {
    rotation -= 0.0001 + 0.001 * (
      1 - Math.cos((Math.abs(TARGET_ROTATIONS[curTargetRotation] - rotation) /
    curGapToClose) * 2 * Math.PI));
  }
}

function songLoop() {
  manualControls();
  playCursorProgresses();
  rotationProgresses();
  tileHoundsteeth(rotation, progress);
  drawPlayCursor();
  setTimeout(songLoop, SPEED);
}

function getPlayCursorCenter() {
  return [(playCursor[0][0] + playCursor[1][0]) * SCALE / 2,
          (playCursor[0][1] + playCursor[1][1]) * SCALE / 2];
};

function getPlayCursorCenterUnscaled() {
  return [(playCursor[0][0] + playCursor[1][0]) / 2,
          (playCursor[0][1] + playCursor[1][1]) / 2];
};

function rotateAboutPlayCursor(pos, radians) {
  var playCursorCenter = getPlayCursorCenter();

  var dist = Math.sqrt(
    Math.pow(pos[0] - playCursorCenter[0], 2) +
    Math.pow(pos[1] - playCursorCenter[1], 2)
  );

  var curAngle = 0;
  if (pos[0] - playCursorCenter[0] == 0) { //avoiding dividing by zero
    curAngle = pos[1] - playCursorCenter[1] > 0 ? Math.PI / 2 : - Math.PI / 2
  } else if (pos[0] - playCursorCenter[0] > 0 ) {
    curAngle = Math.atan(
      (pos[1] - playCursorCenter[1]) /
      (pos[0] - playCursorCenter[0])
    );
  } else if (pos[0] - playCursorCenter[0] < 0 ) {
    curAngle = Math.atan(
      (pos[1] - playCursorCenter[1]) /
      (pos[0] - playCursorCenter[0])
    ) + Math.PI;
  }
  newAngle = curAngle + radians;

  return [
    playCursorCenter[0] + dist * Math.cos(newAngle) ,
    playCursorCenter[1] + dist * Math.sin(newAngle)
  ];
};

function rotateAboutPlayCursorUnscaled(pos, radians) {
  var playCursorCenter = getPlayCursorCenterUnscaled();

  var dist = Math.sqrt(
    Math.pow(pos[0] - playCursorCenter[0], 2) +
    Math.pow(pos[1] - playCursorCenter[1], 2)
  );

  var curAngle = 0;
  if (pos[0] - playCursorCenter[0] == 0) { //avoiding dividing by zero
    curAngle = pos[1] - playCursorCenter[1] > 0 ? Math.PI / 2 : - Math.PI / 2
  } else if (pos[0] - playCursorCenter[0] > 0 ) {
    curAngle = Math.atan(
      (pos[1] - playCursorCenter[1]) /
      (pos[0] - playCursorCenter[0])
    );
  } else if (pos[0] - playCursorCenter[0] < 0 ) {
    curAngle = Math.atan(
      (pos[1] - playCursorCenter[1]) /
      (pos[0] - playCursorCenter[0])
    ) + Math.PI;
  }
  newAngle = curAngle + radians;

  return [
    playCursorCenter[0] + dist * Math.cos(newAngle) ,
    playCursorCenter[1] + dist * Math.sin(newAngle)
  ];
};

function degrees_to_radians(degrees) {
  return degrees * Math.PI / 180;
};

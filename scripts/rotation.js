function rotateAboutOrigin(pos, radians) {
  var dist = Math.sqrt( Math.pow(pos[0], 2) + Math.pow(pos[1], 2) )

  if (pos[0] == 0) { //avoiding dividing by zero
    curAngle = pos[1] > 0 ? Math.PI / 2 : - Math.PI / 2
  } else if (pos[0] > 0) {
    curAngle = Math.atan(pos[1] / pos[0]);
  } else if (pos[0] < 0) {
    curAngle = Math.atan(pos[1] / pos[0]) + Math.PI;
  }
  newAngle = curAngle + radians;

  return [ dist * Math.cos(newAngle) , dist * Math.sin(newAngle) ];
};

function getPlayCursorCenter() {
  return [(playCursor[0][0] + playCursor[1][0]) * SCALE / 2,
          (playCursor[0][1] + playCursor[1][1]) * SCALE / 2];
};

function getPlayCursorCenterUnscaled() {
  return [(playCursor[0][0] + playCursor[1][0]) / 2,
          (playCursor[0][1] + playCursor[1][1]) / 2];
};

//OKAY so it probably has something to do with...
//okay when i remove the * SCALE before teh / 2 in getPlayCursorCenter function,
//the audio doesn't match with the visual, but it at least sounds like it's behaving
//more like it does with the working rotate about origin style

// console.log(getPlayCursorCenter());

function rotateAboutPlayCursor(pos, radians) {
  var playCursorCenter = getPlayCursorCenter();
  // console.log("playCursorCenter: " + playCursorCenter);
  // var playCursorCenter = [200,200]

  var dist = Math.sqrt(
    Math.pow(pos[0] - playCursorCenter[0], 2) +
    Math.pow(pos[1] - playCursorCenter[1], 2)
  );

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
  // console.log("playCursorCenter: " + playCursorCenter);
  // var playCursorCenter = [200,200]

  var dist = Math.sqrt(
    Math.pow(pos[0] - playCursorCenter[0], 2) +
    Math.pow(pos[1] - playCursorCenter[1], 2)
  );

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

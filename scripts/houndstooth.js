SCALE = 18;

HOUNDSTOOTH_VERTICES = [
  [0,3],
  [2,1],
  [3,1],
  [4,0],
  [4,1],
  [5,1],
  [4,2],
  [4,3],
  [2,5],
  [2,4],
  [3,3],
  [2,3],
  [2,2],
  [1,3]
]

FIRST_HOUNDSTOOTH_VERTEX = HOUNDSTOOTH_VERTICES[0];

WIDTH_UNITS = WIDTH / SCALE;
HEIGHT_UNITS = HEIGHT / SCALE;

var curCollisions = [];

var worldRange = [
  [4,4],
  [20,20]
];

var curRange = [
  [4,4],
  [4,4]
]

function drawUnrotatedHoundstooth(startPos) {
  ctx.strokeStyle="#000";
  ctx.fillStyle="#000";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(
    (startPos[0] + FIRST_HOUNDSTOOTH_VERTEX[0]) * SCALE,
    (startPos[1] + FIRST_HOUNDSTOOTH_VERTEX[1]) * SCALE
  );

  HOUNDSTOOTH_VERTICES.slice(1).forEach(function(vertex) {
    ctx.lineTo(
      (startPos[0] + vertex[0]) * SCALE,
      (startPos[1] + vertex[1]) * SCALE
    );
  });

  ctx.lineTo(
    (startPos[0] + FIRST_HOUNDSTOOTH_VERTEX[0]) * SCALE,
    (startPos[1] + FIRST_HOUNDSTOOTH_VERTEX[1]) * SCALE
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

function tileUnrotatedHoundsteeth() {
  // for (x = -4; x < WIDTH_UNITS - 16; x += 4) {
  //   for (y = -4; y < HEIGHT_UNITS - 16; y += 4 ) {
  //     drawUnrotatedHoundstooth([x, y]);
  //   }
  // }
  for (x = worldRange[0][0]; x < worldRange[1][0]; x += 4) {
    for (y = worldRange[0][1]; y < worldRange[1][1]; y += 4 ) {
      drawUnrotatedHoundstooth([x, y]);
    }
  }
};

tileUnrotatedHoundsteeth();
drawPlayCursor();

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

function logHoundstoothLineSegments(startPos, radians, progress) {
  for (i = 0; i < HOUNDSTOOTH_VERTICES.length; i++) {
    j = (i == HOUNDSTOOTH_VERTICES.length - 1) ? 0 : i + 1;

    var segmentStart = rotateAboutPlayCursorUnscaled([
      startPos[0] + HOUNDSTOOTH_VERTICES[i][0] - progress[0] / SCALE,
      startPos[1] + HOUNDSTOOTH_VERTICES[i][1] - progress[1] / SCALE
    ], radians);

    var segmentEnd = rotateAboutPlayCursorUnscaled([
      startPos[0] + HOUNDSTOOTH_VERTICES[j][0] - progress[0] / SCALE,
      startPos[1] + HOUNDSTOOTH_VERTICES[j][1] - progress[1] / SCALE
    ], radians);

    houndstoothLineSegments.push([
      [
        [
          startPos[0] / 4,
          startPos[1] / 4
        ],
        i
      ],
      [
        [
          segmentStart[0],
          segmentStart[1]
        ],
        [
          segmentEnd[0],
          segmentEnd[1]
        ]
      ]
    ]);
  };
};

function tileHoundsteeth(radians, progress) {
  houndstoothLineSegments = [];
  newCollisions = [];

  //start at -4 to spill off edge; each tooth tiles as a 4x4 so increment by 4
  // for (x = -4; x < WIDTH_UNITS - 16; x += 4) {
  //   for (y = -4; y < HEIGHT_UNITS - 16; y += 4 ) {
  for (x = worldRange[0][0]; x < worldRange[1][0]; x += 4) {
    for (y = worldRange[0][1]; y < worldRange[1][1]; y += 4 ) {
      drawHoundstooth([x, y], radians, progress);
      logHoundstoothLineSegments([x, y], radians, progress);
    }
  }

  curRange = [["null","null"],["null","null"]];

  houndstoothLineSegments.forEach( function(lineSegment) {
    if (collisionPoint(playCursor, lineSegment[1])) {
      // console.log("houndstooth id: " + lineSegment[0][0]);
      // console.log("houndstooth segment id: " + lineSegment[0][1]);
      // console.log("segment itself: " + lineSegment[1]);
      // console.log(collisionPoint(playCursor, lineSegment[1]));
      newCollisions.push(lineSegment);
      if (curRange[0][0] == "null" || lineSegment[0][0][0] * 4 < curRange[0][0]) {
        curRange[0][0] = lineSegment[0][0][0] * 4;
      } else if (curRange[0][1] == "null" ||lineSegment[0][0][1] * 4 < curRange[0][1]) {
        curRange[0][1] = lineSegment[0][0][1] * 4;
      } else if (curRange[1][0] == "null" || lineSegment[0][0][0] * 4 > curRange[1][0]) {
        curRange[1][0] = lineSegment[0][0][0] * 4;
      } else if (curRange[1][1] == "null" || lineSegment[0][0][1] * 4 > curRange[1][1]) {
        curRange[1][1] = lineSegment[0][0][1] * 4;
      }
    }
  });

  console.log(curRange);
  if (curRange[0][0] > worldRange[0][0] + 8) {
    worldRange[0][0] += 4;
  }
  if (curRange[0][1] > worldRange[0][1] + 8) {
    worldRange[0][1] += 4;
  }
  if (curRange[1][0] < worldRange[1][0] - 8) {
    worldRange[1][0] -= 4;
  }
  if (curRange[1][0] < worldRange[1][0] - 8) {
    worldRange[1][0] -= 4;
  }

  //update and append
  newCollisions.forEach( function(newCollision) {
    var foundCollision = false;
    var yValOfCollision = collisionPoint(playCursor, newCollision[1])[1] * 200;
    for (i = 0; i < curCollisions.length; i++ ) {
      //if this lineSegment is already being watched
      // console.log("curCollisions[i][0] is " + curCollisions[i][0] + " and newCollision[0] is " + newCollision[0]);
      // console.log(curCollisions[i][0]);
      // console.log(newCollision[0]);
      if (curCollisions[i][0][0][0][0] == newCollision[0][0][0]
        && curCollisions[i][0][0][0][1] == newCollision[0][0][1] //HAHAHAH FUCKING INSANE
        && curCollisions[i][0][0][1] == newCollision[0][1] ) {
        //console.log("");
        //console.log("   UPDATED");
      //  console.log("");

        curCollisions[i][0][1] = newCollision[1]; //just update the non-id, floaty coord part


        // console.log(newCollision);
        // console.log("freq: " + newCollision[1][1] * 1000);

        //console.log("yValOfCollision" + yValOfCollision);

        // curCollisions[i][1][0].frequency.value = 6000 - yValOfCollision;
        curCollisions[i][1][0].frequency.value = 100 * Math.pow(2, 5 - (yValOfCollision - 2000)/800);
        curCollisions[i][1][1].gain.value = initialVol * Math.pow(Math.E, Math.pow(yValOfCollision - 4000, 2)/-1280000);

        foundCollision = true;
        break;
      }
    }
    if (foundCollision == false) { //brand new one
      // console.log(newCollision[0][0][0]);
      // console.log(newCollision[0][0][1]);
      // console.log(worldRange[1][0]);
      // console.log(worldRange[1][1]);

      // ctx.strokeStyle="#ff0";
      // ctx.fillStyle="#ff0";
      // ctx.beginPath();
      // ctx.arc(360, 72 + yValOfCollision / SCALE, 2, 0, 2*Math.PI);
      // ctx.fill();


      if (newCollision[0][0][0] * 4 == worldRange[1][0] - 4) { //if it's in the furthest to the right column
        worldRange[1][0] += 4;
      } else if (newCollision[0][0][1] * 4 == worldRange[1][1] - 4) { //if it's in the furthest to the bottom row
        worldRange[1][1] += 4;
      } else if (newCollision[0][0][0] * 4 == worldRange[0][0]) { //if its in the furthest to the left column
        worldRange[0][0] -= 4;
      } else if (newCollision[0][0][1] * 4 == worldRange[0][1]) { // if it's in the further to the top row
        worldRange[0][1] -= 4;
      }

      newVoice = [
        audioCtx.createOscillator(),
        audioCtx.createGain()
      ];

      newVoice[0].connect(newVoice[1]);
      newVoice[1].connect(audioCtx.destination);
      newVoice[0].type = 'square';

      yValOfCollision = collisionPoint(playCursor, newCollision[1])[1] * 200;
      // console.log("yValOfCollision" + yValOfCollision);
      // newVoice[0].frequency.value = 6000 - yValOfCollision // Math.random() * 10000; // value in hertz //initialFreq
      newVoice[0].frequency.value = 100 * Math.pow(2, 5 - (yValOfCollision - 2000)/800)
      newVoice[0].detune.value = 100; // value in cents
      newVoice[0].start(0);
      //newVoice[1].gain.value = initialVol;
      newVoice[1].gain.value = initialVol * Math.pow(Math.E, Math.pow(yValOfCollision - 4000, 2)/-1280000);
      // console.log(newVoice[1].gain.value);

      //console.log("added a new one");

      curCollisions.push([newCollision, newVoice]);
    }
  });

  //weed out ones that went away
  for (i = curCollisions.length - 1; i >= 0; i-- ) {
    var survived = false;
    for (j = 0; j < newCollisions.length; j++ ) {
      if (newCollisions[j][0][1] == curCollisions[i][0][0][1]
        && newCollisions[j][0][0][0] == curCollisions[i][0][0][0][0]
        && newCollisions[j][0][0][1] == curCollisions[i][0][0][0][1] ) {
        survived = true;
        break;
      }
    }
    if (survived == false) {
      curCollisions[i][1][1].disconnect(audioCtx.destination);
      curCollisions.splice(i, 1);

      //console.log("deleted an oldie");



    }
  }

}

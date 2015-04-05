HOUNDSTOOTH_VERTICES = [ //in atomic grid units
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

MAX_Y_COLLISION = 6000; //there are probably formulas for these based on scale...
MIN_Y_COLLISION = 2000;
Y_RANGE = MAX_Y_COLLISION - MIN_Y_COLLISION;
NUM_OCTAVES = 5;
SIGMA = Y_RANGE / NUM_OCTAVES; //also approximate standard deviation

var curCollisions = [];

var worldRange = [ //in atomic grid units
  [4,4],
  [20,20]
];

var curRange = [ //in atomic grid units
  [4,4],
  [4,4]
]

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

    logLineSegment(startPos, i, segmentStart, segmentEnd);
  };
};

function logLineSegment(startPos, i, segmentStart, segmentEnd) {
  houndstoothLineSegments.push([
    [                     // info tag for this line segment
      [                   // address given in houndstooth grid units (4x atomic)
        startPos[0] / 4,  // x-address of this houndstooth in the tiled pattern
        startPos[1] / 4   // y-address of this houndstooth in the tiled pattern
      ],
      i                   // houndstooth part # of this segment (14 total each)
    ],
    [                     // physical location of this line segment
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
}

function resetStepVars() {
  houndstoothLineSegments = [];
  newCollisions = [];
  curRange = [["null","null"],["null","null"]];
}

function logAllHoundsteeth(radians, progress) {
  for (x = worldRange[0][0]; x < worldRange[1][0]; x += 4) {
    for (y = worldRange[0][1]; y < worldRange[1][1]; y += 4 ) {
      logHoundstoothLineSegments([x, y], radians, progress);
    }
  }
}

function updateRanges() {
  snapshotCurRange();
  checkForConstrictWorldRange();
}

function snapshotCurRange() {
  houndstoothLineSegments.forEach( function(lineSegment) {
    if (collisionPoint(playCursor, lineSegment[1])) {
      newCollisions.push(lineSegment);
      if (curRange[0][0] == "null" ||
        lineSegment[0][0][0] * 4 < curRange[0][0]) {
        curRange[0][0] = lineSegment[0][0][0] * 4;
      } else if (curRange[0][1] == "null" ||
        lineSegment[0][0][1] * 4 < curRange[0][1]) {
        curRange[0][1] = lineSegment[0][0][1] * 4;
      } else if (curRange[1][0] == "null" ||
        lineSegment[0][0][0] * 4 > curRange[1][0]) {
        curRange[1][0] = lineSegment[0][0][0] * 4;
      } else if (curRange[1][1] == "null" ||
        lineSegment[0][0][1] * 4 > curRange[1][1]) {
        curRange[1][1] = lineSegment[0][0][1] * 4;
      }
    }
  });
};

function checkForConstrictWorldRange() {
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
};

function checkForExpandWorldRange(newCollision) {
  if (newCollision[0] * 4 == worldRange[1][0] - 4) {
    worldRange[1][0] += 4; //if in furthest right col, add col to right
  } else if (newCollision[1] * 4 == worldRange[1][1] - 4) {
    worldRange[1][1] += 4; //if in furthest bottom row, add row to bottom
  } else if (newCollision[0] * 4 == worldRange[0][0]) {
    worldRange[0][0] -= 4; // if in furthest left col, add col to left
  } else if (newCollision[1] * 4 == worldRange[0][1]) {
    worldRange[0][1] -= 4; // if in furthest top row, add row to top
  }
};

function tileHoundsteeth(radians, progress) {
  renderHoundsteeth(radians, progress);
  resetStepVars();
  logAllHoundsteeth(radians, progress);
  updateRanges();
  updateCollisions();
  removeOutdatedCollisions();
};

function updateCollisions() {
  newCollisions.forEach( function(newCollision) {
    var foundCollision = false;
    var yValOfCollision = collisionPoint(playCursor, newCollision[1])[1] * 200;
    for (i = 0; i < curCollisions.length; i++ ) {
      //if this lineSegment is already being watched
      if (curCollisions[i][0][0][0][0] == newCollision[0][0][0]
        && curCollisions[i][0][0][0][1] == newCollision[0][0][1] //HAHAHAH FUCKING INSANE
        && curCollisions[i][0][0][1] == newCollision[0][1] ) {
        curCollisions[i][0][1] = newCollision[1]; //just update the non-id, floaty coord part

        updateVoice(curCollisions[i][1], yValOfCollision);
        foundCollision = true;
        break;
      }
    }
    if (foundCollision == false) { //brand new one
      checkForExpandWorldRange(newCollision[0][0]);
      var newVoice = initializeVoice(yValOfCollision);
      curCollisions.push([newCollision, newVoice]);
    }
  });
};

function removeOutdatedCollisions() {
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
    }
  }
}

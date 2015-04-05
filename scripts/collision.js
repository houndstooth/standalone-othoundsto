otherExampleLineSegment = [[-1,4],[5,7]];

function crossProduct(pos1, pos2) {
  return pos1[0] * pos2[1] - pos1[1] * pos2[0];
}

function subtractPos(pos1, pos2) {
  return [ pos1[0] - pos2[0], pos1[1] - pos2[1] ];
}

function collisionPoint(lineSegment1, lineSegment2) {
  p = lineSegment1[0];
  r = subtractPos(lineSegment1[1], lineSegment1[0]);

  q = lineSegment2[0];
  s = subtractPos(lineSegment2[1], lineSegment2[0]);

  if (crossProduct(r, s) == 0) {
    return null;
  }

  t = crossProduct(subtractPos(q, p), s) / crossProduct(r, s)
  u = crossProduct(subtractPos(q, p), r) / crossProduct(r, s)

  if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
    return [ p[0] + t * r[0], p[1] + t * r[1] ];
  } else {
    return null;
  }
}

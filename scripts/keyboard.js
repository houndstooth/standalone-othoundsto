var key = [];

onkeyup = function(e) {
  key[e.keyCode] = false;
}

onkeydown = function(e) {
  key[e.keyCode] = true;
  if (songStarted == false) {
    songLoop();
    songStarted = true;
  }
}

function manualControls() {
  if(key[38]) { rotation -= 0.001 };
  if(key[40]) { rotation += 0.001 };
  if(key[37]) {
    progress[0] -= Math.cos(-rotation);
    progress[1] -= Math.sin(-rotation);
  };
  if(key[39]) {
    progress[0] += Math.cos(-rotation);
    progress[1] += Math.sin(-rotation);
  };
}

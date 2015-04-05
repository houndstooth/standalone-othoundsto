var body = document.querySelector('body');
var rotation = 0.0;
var progress = [0.0, 0,0];
var key = [];
var gameStarted = false;

var curTargetRotation = 0;
var curGapToClose = 0.2449786631;

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

body.onkeyup = function(e) {
  key[e.keyCode] = false;
}

body.onkeydown = function(e) {
  key[e.keyCode] = true;
  if (gameStarted == false) {
    gameLoop();
    gameStarted = true;
  }
}

function gameLoop() {
  if(key[38]) { rotation -= 0.001 };
   if(key[40]) { rotation += 0.001 };
   if(key[37]) {
     //progress -= 1
     progress[0] -= Math.cos(-rotation);
     progress[1] -= Math.sin(-rotation);
   };
   if(key[39]) {
     //progress += 1
     progress[0] += Math.cos(-rotation);
     progress[1] += Math.sin(-rotation);
   };

   //MOVES ON ITS OWN NOW, PERPETUALLY FORWARD
   progress[0] += Math.cos(-rotation);
   progress[1] += Math.sin(-rotation);

   if (Math.abs(rotation - TARGET_ROTATIONS[curTargetRotation]) < 0.001) {
     console.log("victory");
     curTargetRotation += 1;
     curGapToClose = TARGET_ROTATIONS[curTargetRotation] - rotation;
   } else if (rotation < TARGET_ROTATIONS[curTargetRotation]) {
     //rotation += 0.001
     rotation += 0.0001 + 0.001 * (1 - Math.cos((Math.abs(TARGET_ROTATIONS[curTargetRotation] - rotation) / curGapToClose) * 2 * Math.PI));
    //   * (1 - Math.cos(
    //    ( Math.abs( TARGET_ROTATIONS[curTargetRotation] - rotation ) / curGapToClose ) * ( 2 * Math.PI)
    //  ));
    //  console.log("cur gap to close: " + curGapToClose);
    //  console.log("tr[ctr]-r: " + (TARGET_ROTATIONS[curTargetRotation] - rotation));
    //  console.log(
    //    1 - Math.cos(
    //      ( ( TARGET_ROTATIONS[curTargetRotation] - rotation ) / curGapToClose ) * ( 2 * Math.PI)
    //    )
    //  );

   } else if (rotation > TARGET_ROTATIONS[curTargetRotation]) {
     //rotation -= 0.001
     rotation -= 0.0001 + 0.001 * (1 - Math.cos((Math.abs(TARGET_ROTATIONS[curTargetRotation] - rotation) / curGapToClose) * 2 * Math.PI));
    //   * (1 - Math.cos(
    //    ( Math.abs( TARGET_ROTATIONS[curTargetRotation] - rotation ) / curGapToClose ) * ( 2 * Math.PI)
    //  ));
    //  console.log("cur gap to close: " + curGapToClose);
    //  console.log("tr[ctr]-r: " + (TARGET_ROTATIONS[curTargetRotation] - rotation));
    //  console.log(
    //    1 - Math.cos(
    //      ( ( TARGET_ROTATIONS[curTargetRotation] - rotation ) / curGapToClose ) * ( 2 * Math.PI)
    //    )
    //  );
   }
   console.log(0.001 * (1 - Math.cos((Math.abs(TARGET_ROTATIONS[curTargetRotation] - rotation) / curGapToClose) * 2 * Math.PI)));

  //  console.log("rotation: " + rotation);
  //  console.log("progress[0]: " + progress[0]);
  //  console.log("progress[1]: " + progress[1]);

  //  console.log(key[38]);
  //  console.log(key[40]);
  //  console.log(key[37]);
  //  console.log(key[39]);
    // Or you could call it "key"
   // onkeydown = onkeyup = function(e){
   //     e = e || event; // to deal with IE

       /*insert conditional here*/
   // }

   //console.log(progress);

   ctx.clearRect(0, 0, canvas.width, canvas.height);
   tileHoundsteeth(rotation, progress);
   drawPlayCursor();
   setTimeout(gameLoop, 20);
}

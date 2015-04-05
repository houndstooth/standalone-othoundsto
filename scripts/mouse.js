// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values

// Mouse pointer coordinates

var CurX;
var CurY;

document.onmousemove = updatePage;

function updatePage(e) {

    // CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    // CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

    // oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
    // gainNode.gain.value = (CurY/HEIGHT) * maxVol;

    // canvasDraw();
}

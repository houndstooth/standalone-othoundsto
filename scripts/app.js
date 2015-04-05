// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02;

// var initialFreq = 3000;
var initialVol = 0.001;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

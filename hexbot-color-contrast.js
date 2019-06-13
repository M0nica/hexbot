let canvas;
let ctx;
let appWidth;
let appHeight;

let columns;
let rows;

let offsetX;
let offsetY;

// called by NOOPBOT on window.onload

function start_app() {
  // size canvas to window
  sizeCanvas();

  //set up a ticker to refresh page automatically.
  let speed = 300; // how often screen refreshes, in milliseconds.
  // let ticker = NOOPBOT_TICK_SETUP(draw, speed);
  draw();

  //fire a draw event.

  //redraw when canvas is clicked.
  canvas.addEventListener("click", draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById("canvas");
  ctx = NOOPBOT_SETUP_CANVAS({
    canvas: canvas,
    bgColor: "#f1f1f1",
    txColor: "#000"
  });

  columns = Math.floor(appWidth * 0.8) / 20;
  rows = Math.floor((1000 / columns) * 0.8);

  offsetX = (appWidth - columns * 20) / 2;
  offsetY = (appHeight - rows * 20) / 2;
}

function draw() {
  //get the data!
  NOOPBOT_FETCH(
    {
      API: "hexbot",
      count: 1
    },
    drawSet
  );
}

// article on calculating color contrast this is derived from
// https://24ways.org/2010/calculating-color-contrast/
function getContrastYIQ(color) {
  const hexcolor = color.replace("#", "");

  console.log(hexcolor.substr(0, 2));
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

function drawSet(responseJson) {
  let { colors } = responseJson;

  const backgroundColor = colors[0].value;

  const textColor = getContrastYIQ(backgroundColor);

  ctx = NOOPBOT_SETUP_CANVAS({
    canvas: canvas,
    bgColor: backgroundColor,
    txColor: textColor
  });
}

// listen if browser changes size.
window.onresize = function(event) {
  // sizeCanvas();
  draw();
};

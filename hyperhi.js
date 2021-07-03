
const cursor= document.querySelector(".cursor")
const canvasIn = document.querySelector("canvas.in")
const canvasOut = document.querySelector("canvas.out")

let mouseIsDown= false;


//Setting up canvas
const setUpCanvas= function(canvas){

  const container = document.querySelector(".container")
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpi = window.devicePixelRatio;


  // setting up for Retina Screen
  canvas.width = w * dpi
  canvas.height = h * dpi


  // setting w and h in css
  canvas.style.width = w + "px";
  canvas.style.height= h + "px"

  const context = canvas.getContext("2d")
  context.scale(dpi, dpi);

  if(canvas.classList.contains("in")){
      context.fillStyle = "#000";
      context.strokeStyle = "#ffffff";
  } else if(canvas.classList.contains("out")) {
      context.fillStyle = "#ffffff";
      context.strokeStyle = "#000";
  }

  context.lineWidth = 80
  context.lineCap = "round"
  context.lineJoint = "round"

  context.shadowBlur= 10
  context.shadowColor = context.strokeStyle

  context.rect(0,0,w,h);
  context.fill();
}



//start to Draw

const startDraw = function (canvas, x, y){
  const context = canvas.getContext("2d")

  context.moveTo(x,y);
  context.beginPath();

}


//Draw based on three things, x, y, canvas
const moveDraw = function (canvas, x, y){

  const context = canvas.getContext("2d")

  if (mouseIsDown){
    context.lineTo(x,y);
    context.stroke();
  }
};


const growCursor = function (){
  cursor.classList.add("isDown")
  mouseIsDown = true;
  cursor.innerText = "";
}

const shrinkCursor = function (){
  cursor.classList.remove("isDown")

  mouseIsDown = false;
}

const moveCursor = function (x,y){
  cursor.style.left= x + "px";
  cursor.style.top = y + "px";
}

const changePoster = function (){

let bgColors= ["#607272","#f97c6b","#62705f","#cc9a62","#32447f","#404f3d","#363636"]
let surfaceColors=["#8e291e","#f2de2a","#1c4060","#607272","#9dc9b3","#1c4060","#f2de2a"]
let randomNumber= Math.ceil(Math.random()*6)

let bgColor = bgColors[randomNumber - 1]
let surfaceColor =  surfaceColors[randomNumber - 1]

document.querySelector(".poster img").src = `assets/${randomNumber}.svg`
document.querySelector(".poster").style.backgroundColor = bgColor
document.querySelector(".pattern").style.backgroundColor = surfaceColor



}

setUpCanvas(canvasIn)
setUpCanvas(canvasOut)
changePoster()

document.addEventListener("mousedown", function(e){
  x=e.pageX;
  y=e.pageY;
  growCursor();
  startDraw(canvasIn, x, y);
  startDraw(canvasOut, x, y);


})

document.addEventListener("mouseup", function(){
  shrinkCursor();

})

document.addEventListener("mousemove", function(e){
  console.log(e)
    x=e.pageX;
    y=e.pageY;
    moveCursor(x,y)
    moveDraw(canvasIn,x,y)
    moveDraw(canvasOut,x,y)
})

window.addEventListener("resize", function(){
  setUpCanvas(canvasIn)
  setUpCanvas(canvasOut)
})

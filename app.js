const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = canvas.offsetWidth;
const CANVAS_HEIGHT = canvas.offsetHeight; 

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// pixel modifier size need 
// CanvasRenderingContext2D in MDN

// 맨 처음에 app.js에서 따로 canvas라는 element에 width와 height를 부여한 이유는
// js는 동작할 때 html파일로부터 canvas의 생성 내용을 받아오는데, html에서 만든 canvas가 우리 눈에 보여질 때는 css로부터 크기정보를 받아서 그 내용을 바탕으로 보여집니다.
// 즉 js가 html로부터 jsCanvas라는 id값을 바탕으로 canvas라는 element를 생성할 때 css에서 지정한 width와 height는 받아오지 않습니다. 따라서 이걸 받아오기 위해서는 니꼬쌤이 하신 것처럼 따로 700을 지정하거나, offsetWidth 혹은 offsetHeight 등으로 매번 캔버스를 측정해서 가져오도록 지정해야 합니다.
// 이렇게 따로 지정하는 일이 없도록 하기 위해서는
// ＜canvas id="jsCanvas" width="700" height="700"＞
// 이런 식으로 html 내부에 width와 height를 지정하면 따로 element에 값을 부여하지 않아도 정상적으로 그림이 그려지게 됩니다.

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filing = false;

function startPainting() {
    painting = true;
    if(filing) {
        painting = false;
    }
}

function stopPainting() {
    painting = false;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) {
        ctx.beginPath(); // line create
        ctx.moveTo(x,y); // line start
    } else {
        ctx.lineTo(x,y); // line end
        ctx.stroke();
    }
}

function onMouseDown(e) {
    painting = true;
}

function onMouseEnter(event){
    x = event.offsetX;
    y = event.offsetY;
    
    ctx.moveTo(x, y);
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
}
function handleModeClick(e) {
    if(filing === true){
        filing = false;
        mode.innerText = "Fill"
    } else {
        filing = true;
        mode.innerText = "Paint"
        
    }
}

function handleCanvasClick() {
    if(filing) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick(e) {   
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image
    link.download = "paintJS[EXPORT]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    // canvas.addEventListener("mouseleave", stopPainting);
}

if(colors) {
    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleColorClick)
    );
}

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}
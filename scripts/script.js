createGrid();

const backgroundColors = ["yellow", "lime", "green", "orange", "pink", "red", "maroon", "fuchsia",
    "purple", "aqua", "blue", "navy", "grey", "black"]
let currentColor = 0;
const gameContainer = document.querySelector(".game-container");
const gridSizeSlider = document.querySelector("#grid-size-selector");
const colorPicker = document.querySelector("#color-picker");
const gridDimensionsText = document.querySelector("#grid-dimensions-text");
const resizeGridBtn = document.querySelector("#resize-grid-btn");
const eraserBtn = document.querySelector("#eraser");
const rainbowBtn = document.querySelector("#rainbow");
let mouseDown = false;
let eraserActive = false;
let rainbowActive = false;
let activeColor;

gameContainer.onmousedown = () => {
    mouseDown = true;
}

gameContainer.onmouseup = () => {    
    mouseDown = false;
}

gridSizeSlider.addEventListener("input", () => {
    gridDimensionsText.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
});

colorPicker.addEventListener("input", () => {
    activeColor = colorPicker.value;
})

resizeGridBtn.addEventListener("click", () => {
    const gridDimensions = parseInt(gridSizeSlider.value);
    clearGrid();
    createGrid(gridDimensions);
    
});

eraserBtn.addEventListener("click", () => {
    eraserBtn.classList.toggle("eraser-active");
    eraserActive ? eraserActive = false : eraserActive = true;
});

rainbowBtn.addEventListener("click", () => {
    rainbowBtn.classList.toggle("rainbow-active");
    rainbowActive ? rainbowActive = false : rainbowActive = true;
});

function clearGrid() {
    const grid = document.querySelector(".game-container");
    stop = grid.childElementCount;
    for (let i = 0; i < stop; i++) {
        let row = grid.firstChild;
        for (let j = 0; j < stop; j++) {
            row.removeChild(row.firstChild);
        }
        grid.removeChild(grid.firstChild);
    }
}

function createGrid(gridDimensions) {
    const dimensions = gridDimensions || 16;
    const grid = document.querySelector(".game-container");
    for (let i = 0; i < dimensions; i++) {
        let row = document.createElement("div");
        row.classList.toggle("row");
        grid.appendChild(row);
        for (let j = 0; j < dimensions; j++) {
            let column = document.createElement("div");
            column.classList.toggle("column")
            column.style.backgroundColor = "white";
            row.appendChild(column);
        }
    }
    addGameBoardListeners();  
}

function addGameBoardListeners() {
    let squares = document.querySelectorAll(".column");
    squares.forEach((square) => {
        square.addEventListener("mouseover", (e) => {
            if (mouseDown) {
                if (eraserActive) {
                    e.target.style.backgroundColor = "white";
                } else if (activeColor) {
                    e.target.style.backgroundColor = activeColor;
                } else if (rainbowActive){
                    e.target.style.backgroundColor = backgroundColors[currentColor];
                    currentColor += 1;
                    if (currentColor === backgroundColors.length) {
                        currentColor = 0;
                    }
                } else {
                    e.target.style.backgroundColor = "black";
                }
            }
        });
    });
}
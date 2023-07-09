createGrid();

const backgroundColors = ["yellow", "lime", "green", "orange", "pink", "red", "maroon", "fuchsia",
    "purple", "aqua", "blue", "navy", "grey", "black"]
let currentColor = 0;
const gameContainer = document.querySelector(".game-container");
const gridSizeSlider = document.querySelector("#grid-size-selector");
const gridDimensionsText = document.querySelector("#grid-dimensions-text");
const resizeGridBtn = document.querySelector("#resize-grid-btn");
const eraser = document.querySelector("#eraser");
let mouseDown = false;
let eraserActive = false;

gameContainer.onmousedown = () => {
    mouseDown = true;
}

gameContainer.onmouseup = () => {    
    mouseDown = false;
}

gridSizeSlider.addEventListener("input", () => {
    gridDimensionsText.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
});

resizeGridBtn.addEventListener("click", () => {
    const gridDimensions = parseInt(gridSizeSlider.value);
    clearGrid();
    createGrid(gridDimensions);
    
});

eraser.addEventListener("click", () => {
    eraser.classList.toggle("eraser-active");
    eraserActive ? eraserActive = false : eraserActive = true;
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
                } else {
                    e.target.style.backgroundColor = backgroundColors[currentColor];
                    currentColor += 1;
                    if (currentColor === backgroundColors.length) {
                        currentColor = 0;
                    }
                }
            }
        });
    });
}
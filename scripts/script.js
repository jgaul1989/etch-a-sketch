createGrid();
let squares = document.querySelectorAll(".column");
const backgroundColors = ["yellow", "lime", "green", "orange", "pink", "red", "maroon", "fuchsia",
 "purple", "aqua", "blue", "navy", "grey", "black"]
let currentColor = 0;

squares.forEach((square) => {
    square.addEventListener("mouseover", (e) => {
        if (e.target.style.backgroundColor != "white") {
            e.target.style.backgroundColor = "white";
        } else {
            e.target.style.backgroundColor = backgroundColors[currentColor];
            currentColor += 1;
            if(currentColor === backgroundColors.length) {
                currentColor = 0;
            }
        }
    })
});

function createGrid() {
    const grid = document.querySelector(".game-container");
    for (let i = 0; i < 16; i++) {
        let row = document.createElement("div");
        row.classList.toggle("row");
        grid.appendChild(row);
        for (let j = 0; j < 16; j++) {
            let column = document.createElement("div");
            column.classList.toggle("column")
            column.style.backgroundColor = "white";
            row.appendChild(column);
        }
    } 
}

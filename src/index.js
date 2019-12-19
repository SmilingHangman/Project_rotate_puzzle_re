let catImg = null;
// rawCatImg
let imgContainerSize = null;

document.getElementById("getPic").addEventListener("click", (event) => {
  fetch("https://api.thecatapi.com/v1/images/search?size=med", { headers: { "x-api-key": "b3c5b342-8b76-4f6a-bca6-14a7c4e6f0d9" } })
    .then(response => response.json())
    .then(result => {
      let fetchedCatImg = result[0].url;
      let imgContainer = document.createElement("div");
      imgContainer.style.backgroundImage = 'url("' + fetchedCatImg + '")';

      imgContainer.style.height = "330px";
      imgContainer.style.width = "330px";
      imgContainerSize = parseInt(imgContainer.style.width, 10);

      imgContainer.style.backgroundRepeat = "no-repeat";
      imgContainer.style.backgroundSize = String(imgContainerSize) + "px";
      imgContainer.style.backgroundPosition = "left calc(50%)";
      imgContainer.style.backgroundColor = "#000000";
      document.getElementById("app").innerHTML = "";
      document.getElementById("app").appendChild(imgContainer);
      catImg = 'url("' + fetchedCatImg + '")';
    })
    .catch(err => console.log(err));
});

document.getElementById("pictureCutter").addEventListener("click", (event) => {
  document.getElementById("app").innerHTML = "";
  let gridSize = Number(document.getElementById("gridSize").value);
  if (gridSize < 3) {
    gridSize = 3
    document.getElementById("gridSize").value = "3"
  };
  if (gridSize > 7) {
    gridSize = 7
    document.getElementById("gridSize").value = "7"
  };
  function pictureCutter() {
    gridSize = typeof gridSize !== "undefined" ? gridSize : 3;

    let grid = [...Array(gridSize)].map(() => [...Array(gridSize)].map(() => ((Math.floor(Math.random() * 10 + 1)) * 90)))

    grid.forEach((line, lineIndex) => {
      let row = document.createElement("div");
      document.getElementById("app").appendChild(row);
      row.style.height = String(imgContainerSize / gridSize) + "px";
      line.forEach((innerEl, innerElIndex) => {
        let gridBlock = document.createElement("div");
        // gridBlock.textContent = innerEl;
        gridBlock.textContent = null;
        if (innerEl % 360 === 0) {
          // gridBlock.textContent = innerEl + "GOOD!";
          gridBlock.style.borderColor = "#2eb82e";
        } else {
          gridBlock.style.borderColor = "#ffffff";
        };
        row.appendChild(gridBlock);
        gridBlock.className = "gridblock";

        let gridBlockClass = document.getElementsByClassName("gridblock");

        gridBlock.style.backgroundImage = catImg;
        gridBlock.style.backgroundRepeat = "no-repeat";
        gridBlock.style.backgroundSize = String(imgContainerSize) + "px";
        gridBlock.style.backgroundColor = "#000000";
        gridBlock.style.backgroundPosition = `-${imgContainerSize / gridSize * innerElIndex}px calc(50% - ${(imgContainerSize / gridSize * (lineIndex - 1 + ((3 - gridSize) * 0.5)))}px)`;
        gridBlock.style.height = String(imgContainerSize / gridSize) + "px";
        gridBlock.style.width = String(imgContainerSize / gridSize) + "px";
        gridBlock.style.transform = "rotate(" + String(innerEl) + "deg)";
        gridBlock.addEventListener("click", function () {
          grid[lineIndex][innerElIndex] = grid[lineIndex][innerElIndex] + 90;
          const cell = grid[lineIndex][innerElIndex];
          gridBlock.style.transform = "rotate(" + cell + "deg)";
          // gridBlock.textContent = cell;
          if (cell % 360 === 0) {
            // gridBlock.textContent = cell + "GOOD!";
            gridBlock.style.borderColor = "#2eb82e";
          } else {
            gridBlock.style.borderColor = "#ffffff";
          };
          let correctPosition = (entry) => entry % 360 === 0;
          if (grid.every(row => row.every(correctPosition, gridBlock))) {           
            [...gridBlockClass].forEach(el => el.style.border = "none");
            setTimeout(() => {alert("COMPLETED!")}, 500);
          };
        });
      });
    });
  }
  pictureCutter();
});
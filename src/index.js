let catImg = null;
let imgContainerSize = null;

document.getElementById("getPic").addEventListener("click", (event) => {
  fetch("https://api.thecatapi.com/v1/images/search?size=full", { headers: { "x-api-key": "b3c5b342-8b76-4f6a-bca6-14a7c4e6f0d9" } })
    .then(response => response.json())
    .then(result => {
      let fetchedCatImg = result[0].url;
      let imgContainer = document.createElement("div");
      imgContainer.style.backgroundImage = 'url("' + fetchedCatImg + '")';
      // imgContainer.style.backgroundPosition = "center";

      imgContainer.style.height = "400px";
      imgContainer.style.width = "400px";
      imgContainerSize = parseInt(imgContainer.style.width, 10);

      imgContainer.style.backgroundRepeat = "no-repeat";
      imgContainer.style.backgroundColor = "#000000";
      document.getElementById("app").innerHTML = null;
      document.getElementById("app").appendChild(imgContainer);
      catImg = 'url("' + fetchedCatImg + '")';
    })
    .catch(err => console.log(err));
});

document.getElementById("pictureCutter").addEventListener("click", (event) => {
  document.getElementById("app").innerHTML = null;
  let gridSize = Number(document.getElementById("gridSize").value);
  function pictureCutter() {
    gridSize = typeof gridSize !== "undefined" ? gridSize : 3;

    let grid = [...Array(gridSize)].map(() => [...Array(gridSize)].map(() => ((Math.floor(Math.random() * 10 + 1)) * 90)))

    grid.forEach((line, lineIndex) => {
      let row = document.createElement("div");
      document.getElementById("app").appendChild(row);
      line.forEach((innerEl, innerElIndex) => {
        let gridBlock = document.createElement("div");
        gridBlock.textContent = innerEl;


        if (innerEl % 360 === 0) {
          gridBlock.textContent = innerEl + "GOOD!";
        }
        row.appendChild(gridBlock);
        gridBlock.className = "gridblock";
        gridBlock.style.backgroundImage = catImg;
        gridBlock.style.backgroundPosition = `-${imgContainerSize / gridSize * innerElIndex}px -${imgContainerSize / gridSize * lineIndex}px`;
        console.log(gridBlock.style.backgroundPosition);
        gridBlock.style.height = String(imgContainerSize / gridSize) + "px";
        gridBlock.style.width = String(imgContainerSize / gridSize) + "px";
        gridBlock.style.transform = "rotate(" + String(innerEl) + "deg)";
        // gridBlock.style.backgroundPosition = "center";
        gridBlock.addEventListener("click", function () {
          grid[lineIndex][innerElIndex] = grid[lineIndex][innerElIndex] + 90;
          const cell = grid[lineIndex][innerElIndex];
          gridBlock.style.transform = "rotate(" + cell + "deg)";
          gridBlock.textContent = cell;
          if (cell % 360 === 0) {
            gridBlock.textContent = cell + "GOOD!";
          }
          let correctPosition = (entry) => entry % 360 === 0;
          if (grid.every(row => row.every(correctPosition))) {
            alert("COMPLETE!")
          };
        });
      });
    });




  }
  pictureCutter();
});
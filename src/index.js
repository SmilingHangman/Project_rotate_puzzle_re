let catImg = null;

document.getElementById("getPic").addEventListener("click", (event) => {
  fetch("https://api.thecatapi.com/v1/images/search?size=full", { headers: { "x-api-key": "b3c5b342-8b76-4f6a-bca6-14a7c4e6f0d9" } })
    .then(response => response.json())
    .then(result => {
      let fetchedCatImg = result[0].url;
      let imgContainer = document.createElement("div");
      imgContainer.style.backgroundImage = 'url("' + fetchedCatImg + '")';
      imgContainer.style.backgroundPosition = "center";
      imgContainer.style.width = "400px";
      imgContainer.style.height = "400px";
      document.getElementById("app").innerHTML = null;
      document.getElementById("app").appendChild(imgContainer);
      catImg = fetchedCatImg;
    })
    .catch(err => console.log(err));
});

document.getElementById("pictureCutter").addEventListener("click", (event) => {
  document.getElementById("app").innerHTML = null;
  let gridSize = Number(document.getElementById("gridSize").value);
  function pictureCutter() {
    gridSize = typeof gridSize !== "undefined" ? gridSize : 3;

    let grid = [...Array(gridSize)].map(() => [...Array(gridSize)].map(() => ((Math.floor(Math.random() * 10 + 1)) * 90)))
    console.log(grid)

    grid.forEach(line => {
      let row = document.createElement("div");
      document.getElementById("app").appendChild(row);
      line.forEach(innerEl => {
        let gridBlock = document.createElement("div");
        gridBlock.textContent = innerEl;
        row.appendChild(gridBlock);
        gridBlock.className = "gridblock";
      })
    });
    
  }
  pictureCutter();
});
gridWidth = 140;
gridHeight = 80;
cellSize = 6;
let neighbors;
let matrix = [];
let neighborMatrix = [];
let elements = [];
let life;
const svg = document.getElementById('svg');

svg.setAttribute('width',  gridWidth * cellSize);
svg.setAttribute('height', gridHeight * cellSize);
svg.style.backgroundColor = '#999';

buildGrid();
updateGrid();

setInterval(function() {
  getNeighbors();
  updateGrid();
}, 200);

//create/append rect elements + fill matrix + fill elements array
function buildGrid() {
  for(var i=0; i<gridHeight; i++) {
    matrix.push(new Array);
    elements.push(new Array);
    neighborMatrix.push(new Array);
  
    for(var j=0; j<gridWidth; j++) {
      var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectElement.setAttribute('fill', 'none');
      rectElement.setAttribute("stroke", "#000");
      rectElement.setAttribute("width", cellSize +'px');
      rectElement.setAttribute("height", cellSize +'px');
      rectElement.setAttribute('y', i*cellSize);
      rectElement.setAttribute('x', j*cellSize);

      life = Math.floor(Math.random() * 3);
      life === 0 ? matrix[i][j] = 0 : matrix[i][j] = 1;

      elements[i][j] = rectElement;

      svg.appendChild(rectElement);
    }
  }
  console.log(matrix);
}

//update grid based on matrix[]
function updateGrid() {
  for(var i=0; i<gridHeight; i++) {
    for(var j=0; j<gridWidth; j++) {
      matrix[i][j] === 1 ? elements[i][j].setAttribute('fill', '#000') : elements[i][j].setAttribute('fill', 'none');
    }
  }
}

function getNeighbors() {
  for(var i=0; i<gridHeight; i++) {
    for(var j=0; j<gridWidth; j++) {
      neighbors = 0;
  
      //these if statements will get all the neighbors - prevents from testing outside the grid
      if(i > 0) {
        matrix[i-1][j] === 1 ? neighbors++ : null;
        
        if(j > 0) {
          matrix[i-1][j-1] === 1 ? neighbors++ : null; 
        }
        
        if(j < gridWidth-1) {
          matrix[i-1][j+1] === 1 ? neighbors++ : null;
        }
      }
      
      if(j > 0) { 
        matrix[i][j-1] === 1 ? neighbors++ : null; 
      
        if(i < gridHeight-1) {
          matrix[i+1][j-1] === 1 ? neighbors++ : null;
        }
      }
      
      if(j < gridWidth-1) { 
        matrix[i][j+1] === 1 ? neighbors++ : null;
      }
 
      if(i < gridHeight-1) {
        matrix[i+1][j] === 1 ? neighbors++ : null;
      }
      
      if(i < gridHeight-1 && j < gridWidth-1) {
        matrix[i+1][j+1] === 1 ? neighbors++ : null; 
      }
      
      neighborMatrix[i][j] = neighbors;

      if(i > 1) {
        if((neighborMatrix[i-2][j] === 2 && matrix[i-2][j] === 1) || neighborMatrix[i-2][j] === 3) {
          matrix[i-2][j] = 1;
        } else {
          matrix[i-2][j] = 0;
        }
      }
    }
  }

  for(var i=gridHeight-2; i<gridHeight; i++) {
    for(var j=0; j<gridWidth; j++) {
      if((neighborMatrix[i][j] === 2 && matrix[i][j] === 1) || neighborMatrix[i][j] === 3) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
}

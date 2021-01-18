let img = new Image();
img.onload = start;
img.draggable = true;
img.setAttribute("draggable", true);
img.src = "monks.jpg";

function start() {
  let canvas = document.querySelector("#canvas");
  let ctx = canvas.getContext("2d");
  let rows = 4;
  let cols = 4;

  let pieceWidth = canvas.width / cols;
  let pieceHeight = canvas.height / rows;

  let pieces = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let row = i * pieceWidth;
      let col = j * pieceHeight;
      pieces = [...pieces, ...[{ row, col }]];
    }
  }
  shufflePieces = [...pieces]; // storing in new variable, so that original can be compared with it

  var m = shufflePieces.length,
    t,
    i;

  // While there are elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m);
    m--;

    // And swap it with the current element.
    t = shufflePieces[m];
    shufflePieces[m] = shufflePieces[i];
    shufflePieces[i] = t;
  }

  //draw pieces on canvas, and leave out one piece for others to move
  let i = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (i < rows * cols - 1) {
        let p = shufflePieces[i++];
        ctx.drawImage(
          // draw from the original image
          img,
          // take the next x,y piece
          x * pieceWidth,
          y * pieceHeight,
          pieceWidth,
          pieceHeight,
          // draw it on canvas based on the shuffled pieces array
          p.col,
          p.row,
          pieceWidth,
          pieceHeight
        );
      }
    }
  }

  //make images draggable using drag and drop API
  //TODO
}

class ChessKnight {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.moves = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ];

    this.distanceMap = Array(8)
      .fill()
      .map(() => Array(8).fill(null));
    this.mapLength = this.distanceMap.length;
  }

  checkValidPosition(x, y) {
    return x < 8 && x >= 0 && y < 8 && y >= 0;
  }

  getValidMoves(position) {
    const [x, y] = position;
    const validMoves = [];

    for (const [dx, dy] of this.moves) {
      const newX = x + dx;
      const newY = y + dy;

      // Check if the move was within the chessboard
      if (this.checkValidPosition(newX, newY)) validMoves.push([newX, newY]);
    }

    return validMoves;
  }

  knightMoves(start, end) {
    if (
      !this.checkValidPosition(start[0], start[1]) ||
      !this.checkValidPosition(end[0], end[1])
    )
      throw new Error("Not A Valid Position");

    // Classified as [position, [path]]
    const queue = [[start, [start]]];

    const visited = new Set();
    visited.add(start.toString());

    this.distanceMap[this.mapLength - start[0] - 1][start[1]] = 0;

    let shortestPath = [];
    while (queue.length > 0) {
      const node = queue.shift();
      const [currentPos, path] = node;

      for (const nextPos of this.getValidMoves(currentPos)) {
        const key = nextPos.toString();
        if (visited.has(key)) continue;

        this.distanceMap[this.mapLength - nextPos[0] - 1][nextPos[1]] =
          this.distanceMap[this.mapLength - currentPos[0] - 1][currentPos[1]] +
          1;

        const newPath = [...path, nextPos];
        if (key === end.toString()) {
          shortestPath = newPath;
          break;
        }

        queue.push([nextPos, newPath]);
        visited.add(key);
      }
    }

    this.#printShortestPath(shortestPath);
  }

  #printShortestPath(shortestPath) {
    console.log(
      `You made it in ${shortestPath.length - 1} move(s)! Here's your path:`
    );

    for (let i = 1; i <= shortestPath.length - 1; i++) {
      console.log(shortestPath[i]);
    }
  }

  printDistance() {
    for (const row of this.distanceMap) {
      let string = "";
      for (const node of row) {
        string += node !== null ? `${node} ` : `- `;
      }
      console.log(string);
    }
  }
}

const knight = new ChessKnight();
knight.knightMoves([0, 0], [1, 2]);

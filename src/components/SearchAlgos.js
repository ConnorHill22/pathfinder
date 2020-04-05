export function breadthSearch(oldTile, R, C, grid) {
  const r = oldTile.row;
  const c = oldTile.col;
  let reachedEnd = false;
  let fastestMoves = [];
  const dr = [-1, +1, 0, 0];
  const dc = [0, 0, +1, -1];
  let newTiles = [];
  for (let i = 0; i < 4; i++) {
    const rr = r + dr[i];
    const cc = c + dc[i];
    if (rr < 0 || cc < 0) {
      continue;
    }
    if (rr >= R || cc >= C) {
      continue;
    }
    const rowData = grid.filter(function (tile) {
      return tile.row === rr;
    });
    const data = rowData.filter(function (tile) {
      return tile.col === cc;
    });
    if (data[0].type === "empty" || data[0].type === "end") {
      if (data[0].type === "empty") {
        data[0].type = "travled";
      }
      data[0].moves = data[0].moves.concat(oldTile.moves);
      const tileExists = data[0].moves.filter(function (id) {
        return id === oldTile.id;
      });
      if (tileExists.length === 0) {
        if (oldTile.type !== "start") {
          data[0].moves.push(oldTile.id);
        }
      }
      let foundIndex = grid.findIndex((x) => x.id === data[0].id);
      grid[foundIndex] = data[0];
      newTiles.push(data[0]);
    }
    if (!reachedEnd) {
      reachedEnd = data[0].type === "end" ? true : false;
      if (reachedEnd) {
        fastestMoves = data[0].moves;
      }
    }
  }
  const result = {
    newTiles: newTiles,
    grid: grid,
    reachedEnd: reachedEnd,
    fastestMoves: fastestMoves,
  };
  return result;
}

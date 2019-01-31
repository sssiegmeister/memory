import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter/>, root);
}

//Source: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
function shuffle(arra1) {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
// Pick a random index
    index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
    ctr--;
// And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

const initialState = {
  clicks: 0,
  guesses: [],
  pair: false
};

function makeGrid() {
  let list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  let listx2 = shuffle(list.concat.apply([], list.map((el) => {
    return [el, el]
  })));
  let grid = [];
  const size = listx2.length / 4;
  for (let y = 0; y < size; y++) {
    let row = [];
    for (let x = 0; x < size; x++) {
      const letter = listx2.pop();
      row.push({
        val: letter,
        hidden: true,
        found: false,
        x: x,
        y: y
      })
    }
    grid.push(row);
  }
  return grid;
}

class Starter extends React.Component {


  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);

    this.state = {tiles: makeGrid(), ...initialState};
  }

  makeGrid() {
    let list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let listx2 = shuffle(list.concat.apply([], list.map((el) => {
      return [el, el]
    })));
    let grid = [];
    const size = listx2.length / 4;
    for (let y = 0; y < size; y++) {
      let row = [];
      for (let x = 0; x < size; x++) {
        const letter = listx2.pop();
        row.push({
          val: letter,
          hidden: true,
          found: false,
          x: x,
          y: y
        })
      }
      grid.push(row);
    }
    return grid;
  }

  componentDidUpdate() {
    let {tiles, pair, guesses} = this.state;
    let v = guesses.length ? guesses[0].val : "";
    if (pair) {
      tiles.map((row, y) => {
        row.map((tile, x) => {
          if (!tile.found) {
            let t = tile;
            t.hidden = true;
            tiles[y][x] = t;
          }
        })
      });

      setTimeout(() => {
        this.setState(_.assign({}, this.state, {tiles, pair: false}))
      }, 1000);
    }
  }

  selectTile(tile) {
    let {tiles, guesses, pair} = this.state;
    tile.hidden = false;
    if (guesses.length) {
      let guess = guesses.pop();
      if (guess.val === tile.val) {
        guess.found = true;
        tile.found = true;
      }
      pair = true;
      tiles[guess.y][guess.x] = guess;
    } else {
      tile.hidden = false;
      guesses.push(tile);
    }
    tiles[tile.y][tile.x] = tile;
    this.setState(_.assign({}, this.state, {tiles, guesses, pair}))


  }

  handleReset() {
    this.setState(_.assign({}, this.state, {tiles: makeGrid(), ...initialState}))
  }

  render() {

    return <div>
      <h1>{"Clicks: " + this.state.clicks}</h1>
      {this.state.tiles.map((row, i) => (
        <div className="row" key={i}>
          {row.map((tile, j) => (
            <div className="column" key={j * 10}>
              <p>
                <button disabled={tile.found || !tile.hidden} onClick={() => {

                  if (!this.state.pair) {
                    this.setState(_.assign({}, this.state, {clicks: this.state.clicks + 1}),
                      () => {
                        this.selectTile(tile)
                      })
                  }
                }}>

                  {tile.hidden ? "" : tile.val}
                </button>
              </p>
            </div>
          ))}
        </div>
      ))}
      <button onClick={this.handleReset}>Reset</button>
    </div>;
  }
}


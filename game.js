const board = document.getElementById("game-board");
let cards = ["🍎","🍎","🍌","🍌","🍇","🍇","🍓","🍓"]; // 8 pairs
let flippedCards = [];
let locked = false;

cards = cards.sort(() => Math.random() - 0.5);

cards.forEach(symbol => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.dataset.symbol = symbol;
  div.addEventListener("click", flipCard);
  board.appendChild(div);
});

function flipCard() {
  if (locked || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.symbol;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  locked = true;
  const [c1, c2] = flippedCards;

  if (c1.dataset.symbol === c2.dataset.symbol) {
    flippedCards = [];
    locked = false;
  } else {
    setTimeout(() => {
      c1.textContent = "";
      c1.classList.remove("flipped");
      c2.textContent = "";
      c2.classList.remove("flipped");
      flippedCards = [];
      locked = false;
    }, 800);
  }
}

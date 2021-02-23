const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

let selectedMovie = document.getElementById('movie');

const count = document.getElementById('count');
const total = document.getElementById('total');

// Updates every time seat is toggled, movie is changed, and on initial load
function updateSelection() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndexArr = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });

  const selectedMovieIndex = selectedMovie.selectedIndex;
  const ticketPrice = selectedMovie.value;

  const seatCount = selectedSeats.length
  const totalPrice = seatCount * ticketPrice;

  count.innerText = seatCount;
  total.innerText = seatCount * ticketPrice;

  // Save to local localStorage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexArr));
  localStorage.setItem('selectedMovie', selectedMovieIndex);
}


// Get data from localStorage and update UI
function setUI() {
  // Set selected seats
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  seats.forEach((seat, index) => {
    if (selectedSeats !== null && selectedSeats.includes(index)) {
      seat.classList.add('selected');
    }
  });

  // Set selected movie
  const storedMovieIndex = localStorage.getItem('selectedMovie');
  selectedMovie.selectedIndex = storedMovieIndex;

  updateSelection();
}


// Triggers when user selects an unoccupied seat
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelection();
  }
});


// Triggers when user changes selected movie
selectedMovie.addEventListener('change', e => {
  ticketPrice = selectedMovie.value;
  updateSelection();
});

// Setting UI with data from localStorage
setUI();

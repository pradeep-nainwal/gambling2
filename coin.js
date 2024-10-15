const walletAmountElement = document.getElementById('walletAmount');
const coin = document.getElementById('coin');
const betInput = document.getElementById('betAmount');
const forceLoseCheckbox = document.getElementById('forceLose');
const babyImage = document.getElementById('babyImage');
const resultText = document.getElementById('resultText');
const headCountElement = document.getElementById('headCount');
const tailCountElement = document.getElementById('tailCount');

let wallet = localStorage.getItem('walletAmount') ? parseInt(localStorage.getItem('walletAmount')) : 1000; // Initialize to 1000 if not found
let headCount = 0; // Initialize head count
let tailCount = 0; // Initialize tail count

// Update wallet display
walletAmountElement.innerText = `₹${wallet}`;

function flipCoin(selectedChoice) {
    const betAmount = parseInt(betInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount.");
        return;
    }

    // Check if the bet amount is more than the wallet
    if (betAmount > wallet) {
        alert("Insufficient funds!");
        return;
    }

    // Coin flip animation
    coin.classList.add('flip');

    setTimeout(() => {
        const random = Math.random() < 0.5 ? 'head' : 'tail';
        coin.src = random === 'head' ? 'head.png' : 'tails.png';

        // Increment head or tail count based on the result of the coin flip
        if (random === 'head') {
            headCount++;
        } else {
            tailCount++;
        }

        // Show baby image and result text based on the outcome after flipping
        setTimeout(() => {
            babyImage.style.display = 'block'; // Show the baby image
            resultText.style.display = 'block'; // Show the result text
            
            let isWin = false;
            if (forceLoseCheckbox.checked) {
                // Cheat mode activated
                isWin = false;
            } else {
                isWin = (selectedChoice === random);
            }

            if (isWin) {
                babyImage.src = 'smile.jpg'; // Path to the baby smiling image
                resultText.innerText = "You Won!"; // Display result text
                wallet += betAmount * 2; // Add double the bet to the wallet
            } else {
                babyImage.src = 'cry.jpg'; // Path to the baby crying image
                resultText.innerText = "You Lost!"; // Display result text
                wallet -= betAmount; // Deduct the bet from the wallet
            }

            // Update wallet display
            walletAmountElement.innerText = `₹${wallet}`;
            localStorage.setItem('walletAmount', wallet); // Save updated wallet to localStorage

            // Update head and tail counts display
            headCountElement.innerText = headCount; // Update head count display
            tailCountElement.innerText = tailCount; // Update tail count display

            coin.classList.remove('flip');
        }, 200); // Show result 200ms after the coin stops
    }, 700); // Coin spins for 700ms before stopping
}

// Event listeners for buttons
document.getElementById('headButton').addEventListener('click', () => flipCoin('head'));
document.getElementById('tailButton').addEventListener('click', () => flipCoin('tail'));

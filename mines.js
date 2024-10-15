let wallet = 0;
let betAmount = 0;
let minesCount = 0;
let safeClicks = 0;
let mineIndices = [];
let clickedIndices = [];

if (localStorage.getItem('walletAmount')) {
    wallet = parseInt(localStorage.getItem('walletAmount'));
    document.getElementById('walletAmount').innerText = `₹${wallet}`;
}

document.getElementById('startGame').addEventListener('click', function () {
    betAmount = parseInt(document.getElementById('betAmount').value);
    minesCount = parseInt(document.getElementById('minesCount').value);

    if (betAmount <= 0 || betAmount > wallet) {
        alert("Invalid bet amount!");
        return;
    }

    if (minesCount <= 0 || minesCount > 10) {
        alert("Number of mines must be between 1 and 10.");
        return;
    }

    wallet -= betAmount;
    document.getElementById('walletAmount').innerText = `₹${wallet}`;
    localStorage.setItem('walletAmount', wallet);

    safeClicks = 0;
    clickedIndices = [];

    generateMines(minesCount);
});

function generateMines(minesCount) {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    mineIndices = generateMineIndices(minesCount);

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', function () {
            revealCell(cell, i);
        });
        board.appendChild(cell);
    }
}

function generateMineIndices(count) {
    let indices = [];
    while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * 25);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    return indices;
}

function revealCell(cell, index) {
    const forceLose = document.getElementById('forceLose').checked;

    if (forceLose) {
        cell.innerHTML = '<img src="boom.jpg" alt="Mine" class="cell-image">';
        clickedIndices.push(index);
        alert("You hit a mine! You lost.");
        revealAllCells();
        resetGame();
        return;
    }

    if (mineIndices.includes(index)) {
        cell.innerHTML = '<img src="boom.jpg" alt="Mine" class="cell-image">';
        alert("You hit a mine! You lost.");
        revealAllCells();
        resetGame();
    } else {
        cell.innerHTML = '<img src="gem.jpg" alt="Gem" class="cell-image">';
        safeClicks++;
        clickedIndices.push(index);
        document.getElementById('claimWinnings').style.display = 'block';
    }
}

document.getElementById('claimWinnings').addEventListener('click', function () {
    const multiplier = calculateMultiplier(minesCount, safeClicks);
    const winnings = Math.floor(betAmount * multiplier);

    wallet += winnings;
    alert(`You won ₹${winnings} with a multiplier of x${multiplier}! Current balance: ₹${wallet}`);

    document.getElementById('walletAmount').innerText = `₹${wallet}`;
    localStorage.setItem('walletAmount', wallet);

    revealAllCells();
    resetGame();
});

function resetGame() {
    document.getElementById('claimWinnings').style.display = 'none';
}

function calculateMultiplier(minesCount, safeClicks) {
    const baseMultiplier = 1 + (minesCount * 0.2);
    const safeClickBonus = 0.1 * safeClicks;

    return baseMultiplier + safeClickBonus;
}

function revealAllCells() {
    const board = document.getElementById('gameBoard').children;
    for (let i = 0; i < 25; i++) {
        const cell = board[i];
        if (mineIndices.includes(i) || clickedIndices.includes(i)) {
            cell.innerHTML = '<img src="boom.jpg" alt="Mine" class="cell-image">';
        } else {
            cell.innerHTML = '<img src="gem.jpg" alt="Gem" class="cell-image">';
        }
    }
}

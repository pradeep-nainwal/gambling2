let balance = 0;

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const closeBtn = document.getElementsByClassName('close')[0];

document.getElementById('addMoneyBtn').addEventListener('click', () => {
    const addAmount = parseInt(document.getElementById('addMoney').value);
    if (isNaN(addAmount) || addAmount <= 0) {
        alert("Please enter a valid amount!");
    } else {
        balance += addAmount;
        document.getElementById('balance').innerText = balance;
        document.getElementById('addMoney').value = ''; // Clear input field

        // Show the popup message
        popupMessage.innerText = `Successfully added ${addAmount} Rupees to your main account!`;
        popup.style.display = "block";
    }
});

// Close the modal when the user clicks on <span> (x)
closeBtn.onclick = function() {
    popup.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
}

// Navigate to the Games page when "Play Game" button is clicked
document.getElementById('playGameBtn').addEventListener('click', () => {
    window.location.href = 'games.html';
});

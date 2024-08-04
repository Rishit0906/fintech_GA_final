function confirmTopUp() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (paymentMethod === 'credit_card') {
        window.location.href = 'credit_card.html';
    } else if (paymentMethod === 'bank_account') {
        window.location.href = 'bank_details.html';
    }
}

function confirmCreditCard() {
    // Logic to handle credit card confirmation
    // ...
    window.location.href = 'topup_success.html';
}

function confirmBankAccount() {
    // Logic to handle bank account confirmation
    // ...
    window.location.href = 'topup_success.html';
}


document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // You can add any form validation or processing logic here

    // Redirect to transfer confirmation page
    window.location.href = 'transfer_confirmation.html';
});


document.getElementById('method').addEventListener('change', function() {
    const method = this.value;
    document.getElementById('bankDetails').style.display = method === 'bank' ? 'block' : 'none';
    document.getElementById('cardDetails').style.display = method === 'card' ? 'block' : 'none';
});

document.getElementById('topupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    localStorage.setItem('walletBalance', amount);
    document.getElementById('balanceMessage').innerText = 'Your wallet has been topped up with $${amount.toFixed(2)}.';
});

document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const transferAmount = parseFloat(document.getElementById('transferAmount').value);
    if (isNaN(transferAmount) || transferAmount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
    if (transferAmount > walletBalance) {
        alert('Insufficient funds.');
        return;
    }
    walletBalance -= transferAmount;
    localStorage.setItem('walletBalance', walletBalance);
    document.getElementById('transferMessage').innerText ="Transfer of $${transferAmount.toFixed(2)} to ${document.getElementById('receiverName').value} is in progress. Your new balance is $${walletBalance.toFixed(2)}.";
});
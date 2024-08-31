
document.getElementById('generateButton').addEventListener('click', generateWallet);
document.getElementById('saveWallet').addEventListener('click', saveWallet);
document.getElementById('clearStorage').addEventListener('click', clearStorage);

async function generateWallet() {
    try {
        const caver = new Caver();

        const wallet = caver.klay.accounts.create();

        document.getElementById('address').textContent = wallet.address;
        document.getElementById('privateKey').textContent = wallet.privateKey;
        document.getElementById('publicKey').textContent = wallet.publicKey;

        document.getElementById('saveWallet').disabled = false;
    } catch (error) {
        console.error('Error generating wallet:', error);
    }
}

function saveWallet() {
    const walletName = document.getElementById('walletName').value || 'My Wallet';
    const address = document.getElementById('address').textContent;
    const privateKey = document.getElementById('privateKey').textContent;
    const publicKey = document.getElementById('publicKey').textContent;

    if (address !== 'N/A' && privateKey !== 'N/A') {
        const walletData = {
            name: walletName,
            address,
            privateKey,
            publicKey
        };

        localStorage.setItem('klaytnWallet', JSON.stringify(walletData));
        alert('Wallet saved successfully!');
    } else {
        alert('Generate a wallet first!');
    }
}

function clearStorage() {
    localStorage.removeItem('klaytnWallet');
    document.getElementById('address').textContent = 'N/A';
    document.getElementById('privateKey').textContent = 'N/A';
    document.getElementById('publicKey').textContent = 'N/A';
    document.getElementById('saveWallet').disabled = true;
    alert('Stored wallet cleared!');
}

function loadWallet() {
    const walletData = JSON.parse(localStorage.getItem('klaytnWallet'));

    if (walletData) {
        document.getElementById('walletName').value = walletData.name;
        document.getElementById('address').textContent = walletData.address;
        document.getElementById('privateKey').textContent = walletData.privateKey;
        document.getElementById('publicKey').textContent = walletData.publicKey;

        document.getElementById('saveWallet').disabled = false;
    }
}

window.onload = loadWallet;
    
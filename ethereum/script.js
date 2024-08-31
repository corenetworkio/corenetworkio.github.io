document.getElementById('generateButton').addEventListener('click', generateWallet);
document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('sendTransaction').addEventListener('click', sendTransaction);
document.getElementById('swapTokens').addEventListener('click', swapTokens);
document.getElementById('saveWallet').addEventListener('click', saveWallet);
document.getElementById('clearStorage').addEventListener('click', clearStorage);

let wallet;
let provider;

async function generateWallet() {
    wallet = ethers.Wallet.createRandom();
    provider = new ethers.providers.Web3Provider(window.ethereum);
    wallet = wallet.connect(provider);

    document.getElementById('address').textContent = wallet.address;
    document.getElementById('privateKey').textContent = wallet.privateKey;
    document.getElementById('balance').textContent = await getBalance(wallet.address);

    document.getElementById('saveWallet').disabled = false;
}

async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    wallet = signer;

    document.getElementById('address').textContent = await signer.getAddress();
    document.getElementById('balance').textContent = await getBalance(await signer.getAddress());
    document.getElementById('privateKey').textContent = 'Connected wallet (private key hidden)';

    document.getElementById('saveWallet').disabled = true;
}

async function getBalance(address) {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
}

async function sendTransaction() {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    if (!wallet || !recipient || !amount) {
        alert('Please fill all fields and generate/connect a wallet first.');
        return;
    }

    const transaction = {
        to: recipient,
        value: ethers.utils.parseEther(amount)
    };

    try {
        const tx = await wallet.sendTransaction(transaction);
        alert('Transaction sent! TxHash: ' + tx.hash);
    } catch (error) {
        console.error('Transaction error:', error);
        alert('Transaction failed.');
    }
}

async function swapTokens() {
    const fromToken = document.getElementById('fromToken').value;
    const toToken = document.getElementById('toToken').value;
    const amount = document.getElementById('swapAmount').value;

    alert(`Swapping ${amount} ${fromToken} to ${toToken} feature is under development.`);
    // Hier kann eine Integration von Uniswap oder einem anderen DEX implementiert werden
}

function saveWallet() {
    const walletName = document.getElementById('walletName').value || 'My Wallet';
    const address

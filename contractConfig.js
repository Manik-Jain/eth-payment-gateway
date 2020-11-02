const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const url = 'https://ropsten.infura.io/v3/1124db5b660d4ee69af5ef1b9871e890';

const key = '0x67f6aff79c4e9b0339ec49890df31cb1ea107b2fdd777d73dfd2ea1ac5d2179c';

const deployContract = async() => {
    const provider = new HDWalletProvider([key], url);
    const deployableWeb3 = new Web3(provider);
    const escrowABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "weiAmount", "type": "uint256" }], "name": "Deposited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "weiAmount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "payee", "type": "address" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "payee", "type": "address" }], "name": "depositsOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "payee", "type": "address" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
    const escrowBytecode = '60806040523480156100115760006000fd5b505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b61005a565b6107a6806100696000396000f3fe6080604052600436106100385760003560e01c806351cff8d91461003e578063e3a9db1a14610091578063f340fa01146100f857610038565b60006000fd5b34801561004b5760006000fd5b5061008f600480360360208110156100635760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061013d565b005b34801561009e5760006000fd5b506100e2600480360360208110156100b65760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610468565b6040518082815260200191505060405180910390f35b61013b6004803603602081101561010f5760006000fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104bc565b005b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610205576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281526020015060200191505060405180910390fd5b6000600160005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054905080600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163110151515610303576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a20696e73756666696369656e742062616c616e636500000081526020015060200191505060405180910390fd5b6000600160005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005081909090555060008273ffffffffffffffffffffffffffffffffffffffff1682604051808050600001905060006040518083038185875af1925050503d80600081146103b2576040519150601f19603f3d011682016040523d82523d6000602084013e6103b7565b606091505b50509050801515610413576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603a815260200180610737603a913960400191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5836040518082815260200191505060405180910390a250505b5b50565b6000600160005060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506104b7565b919050565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610584576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281526020015060200191505060405180910390fd5b6000349050600081600160005060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054019050600160005060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050548110151515610695576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081526020015060200191505060405180910390fd5b80600160005060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508190909055508273ffffffffffffffffffffffffffffffffffffffff167f2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4836040518082815260200191505060405180910390a250505b5b5056fe416464726573733a20756e61626c6520746f2073656e642076616c75652c20726563697069656e74206d61792068617665207265766572746564a26469706673582212204b4033bac822b96f15788b1a8ee8092d84bcc776b1a95ad13bbcd1e0dd41ae1c64736f6c63430006060033';
    const accounts = await deployableWeb3.eth.getAccounts();
    const deployer = accounts[0];
    const options = { gas: '1000000', from: deployer };

    const escrowContract = await new deployableWeb3.eth.Contract(escrowABI);

    return escrowContract.deploy({
        data: escrowBytecode,
        arguments: []
    }).send(options)
    .then(function(contract) {
        console.log('Contract address: ' + contract.options.address);
        return contract;
    }) 
    .catch(function(err) {
        throw new Error(err);
    })
}

const getContractInstance = async () => {
    const provider = new HDWalletProvider([key], url);
    const deployableWeb3 = new Web3(provider);
    const escrowABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "weiAmount", "type": "uint256" }], "name": "Deposited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payee", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "weiAmount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "payee", "type": "address" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "payee", "type": "address" }], "name": "depositsOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "payee", "type": "address" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
    const escrowContract = await new deployableWeb3.eth.Contract(escrowABI, '0x9dCA39700C6eaE50515f2cef3b77390D49F4409b');
    return escrowContract;
}

const sendMoney =async (escrowContract, payment) => {
    const provider = new HDWalletProvider([key], url);
    const deployableWeb3 = new Web3(provider);
    const recipient = '0x9cf3d4660F7ae9020D725C88241B6c7492479EAa';
    const accounts = await deployableWeb3.eth.getAccounts();
    const deployer = accounts[0];
    let txHash = await escrowContract.methods.deposit(recipient).send({
         value: payment, 
         from: deployer 
        });
    console.log(`Transaction hash for deposit(): ${txHash}`);
    return txHash;
}

const withdrawMoney = async (escrowContract) => {
    const provider = new HDWalletProvider([key], url);
    const deployableWeb3 = new Web3(provider);
    const recipient = '0x9cf3d4660F7ae9020D725C88241B6c7492479EAa';
    const accounts = await deployableWeb3.eth.getAccounts();
    const deployer = accounts[0];
    let txHash = await escrowContract.methods.withdraw(recipient).send({ 
        from: deployer 
    });
    console.log(`Transaction hash for withdraw(): ${txHash}`);
    return txHash;
}

const getBalance = async (escrowContract) => {
    const recipient = '0x9cf3d4660F7ae9020D725C88241B6c7492479EAa';
    let balance = await escrowContract.methods.depositsOf(recipient).call();
    return balance;
}

module.exports = {
    deployContract,
    getContractInstance,
    sendMoney,
    withdrawMoney,
    getBalance
}
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
const BigNumber = require('bignumber.js')

const {
    deployContract : deployContract,
    getContractInstance : getContractInstance, 
    sendMoney : sendMoney,
    withdrawMoney : withdrawMoney,
    getBalance : getBalance
}= require('./contractConfig');

app.get('/', (req, res) => {
    res.send({'response' : 'app is running'});
})

//return the balance for the recipient
app.get('/balance', async (req, res) => {
    try{
        const contractInstance = await getContractInstance();
        const balance = await getBalance(contractInstance);
        res.status(200).send( {balance:balance});
    } catch(error) {
        res.status(500).send({error : error});
    }
})

app.put('/balance', async(req, res) => {
    try{
        const contractInstance = await getContractInstance();
        const txnHash = await sendMoney(contractInstance, req.body.payment);
        res.status(200).send({txnHash:txnHash.transactionHash});
    } catch(error) {
        res.status(500).send({error : error});
    }
})

app.get('/withdraw', async(req, res) => {
    try{
        const contractInstance = await getContractInstance();
        const txnHash = await withdrawMoney(contractInstance);
        res.status(200).send({txnHash:txnHash.transactionHash});
    } catch(error) {
        res.status(500).send({error : error});
    }
})

app.listen(3000, function() {
    console.log('listening on 3000')
})
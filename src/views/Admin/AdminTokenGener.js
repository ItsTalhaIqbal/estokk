import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-bootstrap";
import { Button, Form, Input, Layout, Select } from "element-react"
import { Modal } from 'react-bootstrap';
import Web3 from 'web3';
import { Fade } from "react-reveal";
import { SEPOLIA_FACTORY_ADDRESS, SEPOLIA_BRIDGE_ADDRESS, GNOSIS_BRIDGE_ADDRESS, GNOSIS_FACTORY_ADDRESS } from "../../config/config.js"
import { FACTORY_ABI, BRIDGE_ABI } from "../../config/tokeABI.js"
import { axiosPost, callPost } from "../../services/axios.js";

function AdminTokenGener() {

    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenNumber, setTokenNumber] = useState("");
    const [tokenDecimal, setTokenDecimal] = useState("");
    const [web3, setWeb3] = useState(null);
    const [error, setError] = useState('');
    const [sepoliaFactory, setSepoliaFactory] = useState(null);
    const [sepoliaBridge, setSepoliaBridge] = useState(null);
    const [gnosisBridge, setGnosisBridge] = useState(null);
    const [gnosisFactory, setGnosisFactory] = useState(null);
    const [tokenAddress, setTokenAddress] = useState("");
    const [gasWei, setGasWei] = useState(3000000);
    const [showAlert, setShowAlert] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [tokenList, setTokenList] = useState([]);
    const [amountToBurn, setAmountToBurn] = useState(0);
    const [selectedToken, setSelectedToken] = useState('');
    const [balance, setBalance] = useState('');
    const [bridgeModal, setBridgeModal] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [success, setSuccess] = useState('');
    const [account, setAccount] = useState([]);
    const [amountToBridge, setAmountToBridge] = useState(0);
    

    const loadWeb3 = async() => {
        if(window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                setWeb3(web3);
                const account = await window.ethereum.request({method:'eth_requestAccounts'});
                console.log("account:", account);                
                setAccount(account);
            } catch (error) {
                setError(error.message);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
                console.log("error", error);
            }
        } else {
            setError('MetaMask not detected');
            console.log("error", error);
        }
    }

    useEffect( () => {
        if (web3) {
            const sepoliaFactoryContract = new web3.eth.Contract(FACTORY_ABI, SEPOLIA_FACTORY_ADDRESS);
            const sepoliaBridgeContract = new web3.eth.Contract(BRIDGE_ABI, SEPOLIA_BRIDGE_ADDRESS);
            const gnosisBridgeContract = new web3.eth.Contract(BRIDGE_ABI, GNOSIS_BRIDGE_ADDRESS);
            const gnosisFactoryContract = new web3.eth.Contract(FACTORY_ABI, GNOSIS_FACTORY_ADDRESS);
            console.log("sepoliaFactory", sepoliaFactoryContract);
            console.log("gnosisBridge", gnosisBridgeContract);
            console.log("sepoliaBridge", sepoliaBridgeContract);
            setSepoliaFactory(sepoliaFactoryContract);
            setSepoliaBridge(sepoliaBridgeContract);
            setGnosisBridge(gnosisBridgeContract);
            setGnosisFactory(gnosisFactoryContract);

            const fetchTokenList = async () => {
                try {
                    const tokenList = await sepoliaFactoryContract.methods.getTokenList().call();
                    setTokenList(tokenList)
                    console.log("tokenList: ", tokenList);
                } catch (error) {
                    console.log("token list error: ", error);
                }
            }

            fetchTokenList();
        }
    }, [web3]);

    const saveToken = async(tokenAddress, tokenName, tokenSymbol) => {
        const tokenData = {
            'ethereum':tokenAddress,
            'tokenName':tokenName,
            'tokenSymbol':tokenSymbol
        }
        try {
            axiosPost('/api/bridge', tokenData)
                .then((response) =>{
                    console.log(response);
                })
                .catch((err) =>{
                    console.log(err);
                })
        } catch (error) {
            
        }
    }

    const getSalt = useCallback (() => {
        const max = 1000;
        const min = 1;
        const randomNumber = Math.floor(Math.random()*(max - min + 1)) + min;
        return randomNumber;
    }, []);


    const createGnosisToken = async (tokenName, tokenSymbol, tokenNumber, tokenDecimal, salt) => {
        await switchNetwork();
        console.log("tokenName:", tokenName);
        console.log("tokenSymbol:", tokenSymbol);
        console.log("tokenDecimal:", tokenDecimal);
        console.log("tokenSalt:", salt);
        try {
            const gasLimit = parseInt(gasWei);
            if(gasLimit < 0) {
                setError("Gas limit must be greater than 0");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
                return;
            } else {
                console.log("object");
                const result = await gnosisFactory.methods.createToken(tokenName, tokenSymbol, parseInt(tokenNumber), parseInt(tokenDecimal), salt)
                    .send({from:account[0], gas: gasLimit});
                console.log("result:", result);
                setSuccessAlert(true);
                setTimeout(()=> setSuccessAlert(false), 5000);
                setSuccess("Create token successfully!");
            }
        } catch (error) {
            console.log("error:", error);
        }
    }



    const createToken = async() => {
        try {
            const salt = getSalt();
            console.log("salt:", salt);
            const gasLimit = parseInt(gasWei);
            if(gasLimit <= 0) {
                setError("Gas limit must be greater than 0");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
                return;
            } else {
                
                const result = await sepoliaFactory.methods.createToken(tokenName, tokenSymbol, parseFloat(tokenNumber), parseFloat(tokenDecimal), salt)
                    .send({from: account[0], gas: gasLimit});
                console.log("result:", result);
                const tokenCreated = "TokenCreated";
                sepoliaFactory.getPastEvents(tokenCreated, {
                    fromBlock: 0,
                    toBlock: 'latest'
                }, function (error, events) { 
                    if(!error) {
                        if(events.length){                            
                            console.log(events[events.length - 1], "lastEvent");
                            const {tokenAddress, tokenName, tokenSymbol} = events[events.length - 1].returnValues;
                            setTokenAddress(tokenAddress, tokenName, tokenSymbol);
                            // saveToken(tokenAddress);
                            createGnosisToken(tokenName, tokenSymbol, tokenNumber, tokenDecimal, salt);
                        }
                    } else {
                        console.log(error);
                    }
                })
            }
        } catch (error) {
            console.log("error: ", error);
            setError(error.message);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    };

    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);

    const showBridge = () => setBridgeModal(true);
    const closeBridge = () => setBridgeModal(false);

    const getBalance = async(tokenAddress) => {
        try {
            console.log("tokenAddress:", tokenAddress);
            const balance = await sepoliaFactory.methods.getBalance(tokenAddress).call({from: account[0]});
            console.log("balance: ", balance);
            setBalance(balance);
            handleClose(false);
            setSuccessAlert(true);
            setSuccess(`Reaming token: ${balance}(${tokenAddress})`);

        } catch (error) {
            console.log(error);
        }
    }

    const burnToken = async() => {
        try {
            const account = await web3.eth.getAccounts();
            console.log('account[0]', account[0]);
            const result = await sepoliaFactory.methods.burnToken(amountToBurn, selectedToken).send({
                from: account[0],
                gas: gasWei
            });
            console.log("result: ", result);
            getBalance(selectedToken);
        } catch (error) {
            console.log("burnError: ", error);
            handleClose(false);
            setError(error.message);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }

    async function signMessageWithMetaMask(message, account) {
        const messageHash = web3.utils.soliditySha3("\x19Ethereum Signed Message:\n" + message.length.toString(), message);
        return new Promise((resolve, reject) => {
            web3.eth.personal.sign(message, account, "", (error, signature) => {
                if (error) {
                    reject(error);
                }
                resolve({signature, messageHash});
            });
        });
    }
    

    const BridgeToken = async() => {

        const bridgeData = {
            tokenAddress: selectedToken,
            amount: amountToBridge
        }

        try {
            const {signature, messageHash} = await signMessageWithMetaMask(JSON.stringify(bridgeData), account[0]);
            
            console.log("signature: ", signature);
            console.log("messageHash:", messageHash);
            const BurnToken = "BurnToken";

            const result = await sepoliaBridge.methods.burn(selectedToken, amountToBridge, signature, messageHash)
                .send({from: account[0], gas: gasWei});
            sepoliaBridge.getPastEvents(BurnToken, {
                fromBlock: 0,
                toBlock: 'latest'
            }, function (err, events) {
                if(!err){
                    if(events.length){
                        const {signature, tokenAddress, amount} = events[events.length - 1].returnValues;
                        console.log("eventResult:", signature);
                        console.log("eventResult:", tokenAddress);
                        console.log("eventResult:", amount);
                        mintToken(signature, amount, tokenAddress, messageHash);
                    }
                }
            });
            console.log("result:", result);
            // getBalance(selectedToken);
        } catch (error) {
            console.log("error: ", error);
            setError(error.message);
            setShowAlert(true);
        }


    }

    const switchNetwork = async()=> {
        if(window.ethereum){
            try {
                const ethereum = window.ethereum;
                const response = await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params:[{chainId:'0x27d8'}]
                })
            } catch (error) {
                console.log("switchNetwork error:", error);
            }
        }
    }    

    const mintToken = async(signature, amount, tokenAddress, messageHash) => {
        await switchNetwork();
        try {
            const mintResult = await gnosisBridge.methods.mint(tokenAddress, amount, signature, messageHash)
                .send({from:account[0], gas: gasWei});
            console.log("mintResult: ", mintResult);
            closeBridge();
            if(mintResult.status === true) {
                setSuccessAlert(true);
                setTimeout(() => setSuccessAlert(false), 5000);
                setSuccess(`${amount} tokens bridged to Gnosis`);
            }
        } catch (error) {
            console.log("bridge Error: ", error);
            closeBridge();
            setError(error.message);
            setShowAlert(true);
        }        
    }

    const renderTokenList = (tokenList) => (
        <Modal show={modalVisible} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Burn token</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form labelPosition="top">
                    <Form.Item label="Select token address">
                    <Select  style={{width: "100%"}} value={selectedToken} onChange={setSelectedToken}>
                        {tokenList.map((token, index) => (
                            <Select.Option key={index} label={token} value={token} />
                        ))}
                    </Select>
                    </Form.Item>
                </Form>
                <Form labelPosition="top">
                <Form.Item label="Select amounts">
                    <Input type="number" value={amountToBurn} onChange={setAmountToBurn}></Input>
                </Form.Item>
                    
                </Form>                    
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={burnToken}>
                    Burn token
                </Button>
            </Modal.Footer>
        </Modal>
    );

    const renderBridge = (tokenList) => (
        <Modal show={bridgeModal} onHide={closeBridge}>
            <Modal.Header>
                <Modal.Title>Bridge tokens to Gnosis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Item label="Select token address">
                    <Select  style={{width: "100%"}} value={selectedToken} onChange={setSelectedToken}>
                        {tokenList.map((token, index) => (
                            <Select.Option key={index} label={token} value={token} />
                        ))}
                    </Select>
                    </Form.Item>
                </Form>
                <Form labelPosition="top">
                    <Form.Item label="Select amounts">
                        <Input type="number" value={amountToBridge} onChange={setAmountToBridge}></Input>
                    </Form.Item>                    
                </Form>  
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeBridge}>
                    Close
                </Button>
                <Button variant="primary" onClick={BridgeToken}>
                    Bridge token
                </Button>
            </Modal.Footer>
        </Modal>
    )


    return (        
        <div className="d-flex flex-column justify-content-center align-items-center overflow-hidden">
            {showAlert && <Alert variant="danger" onClose={()=> setShowAlert(false)} >{error}</Alert>}
            {successAlert && <Alert variant="success" onClose={()=> setSuccessAlert(false)} >{success}</Alert>}
            <Button onClick={loadWeb3}>Connect Wallet</Button>
            <div style={{ width: '60%' }}>
                <Fade bottom delay={200}>
                    <div className="pt-10">                    
                        <Layout.Row>
                            <Layout.Col>
                                <div className="grid-content d-content-highlight d-flex justify-content-center " style={{borderRadius: "10px 10px 1px 1px"}}>
                                    <div className="d-font-bold d-text-40 mt-2 mb-2">Token Generator</div>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                        <div className="container-fluid login-ruleForm d-font-bold pb-16">                            
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-2 mt-5 d-flex">
                                    <div className="d-white">Name</div>
                                </div>
                                <div className="col-md-6 mt-5">
                                    <Input type="text" value={tokenName} onChange={setTokenName}></Input>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-2 mt-4 d-flex">
                                    <div className="d-white">Symbol</div>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <Input type="text" value={tokenSymbol} onChange={setTokenSymbol}></Input>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-2 mt-4 d-flex">
                                    <div className="d-white">Total Supply</div>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <Input type="text"  value={tokenNumber} onChange={setTokenNumber}></Input>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-2 mt-4 d-flex">
                                    <div className="d-white">Decimal</div>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <Input type="text" value={tokenDecimal} onChange={setTokenDecimal}></Input>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-2 mt-4 d-flex">
                                    <div className="d-white">Gas limit</div>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <Input type="number" value={gasWei} onChange={setGasWei}></Input>
                                </div>
                            </div> 
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-2 mt-4 d-flex">
                                    <Button type="submit" onClick={createToken}>Create</Button>
                                </div>                                
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-3 mt-4 d-flex">
                                    <div className="d-white">Token Address:</div>
                                </div>
                                <div className="col-md-6 mt-4 d-white">{tokenAddress}</div>
                            </div>
                            <div className="row d-flex justify-content-center">                                
                                <div className="col-md-2 mt-4 d-flex">
                                    <Button onClick={handleShow}>Burn</Button>
                                </div>
                                <div className="col-md-2 mt-4 d-flex">
                                    <Button onClick={showBridge}>Bridge</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
            {modalVisible === true &&  renderTokenList(tokenList)}
            {bridgeModal === true && renderBridge(tokenList)}
        </div>
    )
}

export default AdminTokenGener;
import React, { Component } from "react";
import StrawberryManager from "./contracts/StrawberryManager.json";
import Strawberry from "./contracts/Strawberry.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
    state = { cost: 0, strawberryName: "example_1", SID: "0", loaded: false };

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            const { networkId } = await this.web3.eth.net.getId();

            console.log(StrawberryManager.address);
            this.strawberryManager = new this.web3.eth.Contract(
                StrawberryManager.abi,
                //StrawberryManager.networks[networkId] &&
                "0x6a0e49a6cb4ddf6f8a4294b0718a444b1a334e75"
            );
            console.log("hi!");
            console.log(StrawberryManager.address);
            this.strawberry = new this.web3.eth.Contract(
                Strawberry.abi,
                Strawberry.networks[networkId] && Strawberry.address
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.listenToPaymentEvent();
            this.setState({ loaded: true });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    listenToPaymentEvent = () => {
        let self = this;
        this.strawberryManager.events
            .SupplyChainPhase()
            .on("data", async function (evt) {
                console.log(evt);
                //if (evt.returnValues._phase === 3) {
                let itemObj = await self.strawberryManager.methods
                    .strawberries(evt.returnValues._strawberryIndex)
                    .call();
                alert("strawberry " + itemObj._identifier + " has been paid");
                //}
            });
    };

    handleSubmit = async () => {
        const { cost, strawberryName } = this.state;
        console.log("deez nuts");
        console.log(strawberryName, cost, this.strawberryManager);
        console.log(this.strawberryManager.address);
        let result = await this.strawberryManager.methods
            .createStrawberry(strawberryName, cost)
            .send({ from: this.accounts[0] });
        console.log(result);
        /*alert(
            "Send " +
                cost +
                " Wei to " +
                result.events.SupplyChainPhase.returnValues._address
        );*/
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };

    //phase stuff
    handleChange = (event) => {
        this.setState({ SID: event.target.value });
    };

    //
    handleMySubmit = async () => {
        var SID = this.state.SID;
        console.log("SID is");
        console.log(SID);
        console.log(this.accounts[0]);
        let result = await this.strawberryManager.methods
            .finishProcessing(SID)
            .send({ from: this.accounts[0] });
        console.log(result);
        alert(
            "Strawberry # " +
                SID +
                "Is done processing. Now entering packaging phase..."
        );
    };

    render() {
        if (!this.state.loaded) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App">
                <h1>Strawberry Supplychain</h1>
                <h2>Strawberries</h2>
                <h2>Add Strawberries</h2>
                <div>
                    Cost in Wei:{" "}
                    <input
                        type="text"
                        name="cost"
                        value={this.state.cost}
                        onChange={this.handleInputChange}
                    />
                    Strawberry Identifier:{" "}
                    <input
                        type="text"
                        name="strawberryName"
                        value={this.state.strawberryName}
                        onChange={this.handleInputChange}
                    />
                    <button type="button" onClick={this.handleSubmit}>
                        {" "}
                        Create new item{" "}
                    </button>
                </div>

                <div>
                    Strawberry ID :{" "}
                    <input
                        type="text"
                        name="strawberryId"
                        // value={this.state.strawberryName}
                        onChange={this.handleChange}
                    />
                    <button type="button" onClick={this.handleMySubmit}>
                        {" "}
                        Finish Processing{" "}
                    </button>{" "}
                </div>
            </div>
        );
    }
}

export default App;

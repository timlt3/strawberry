import React, { Component } from "react";
import StrawberryManager from "../contracts/StrawberryManager.json";
import Strawberry from "../contracts/Strawberry.json";
import getWeb3 from "../getWeb3";

export class Package extends Component {
    state = { strawberryIndex: "" };
    componentDidMount = async () => {
        try {
            console.log("Package has mounted with the following props");
            console.log(this.props);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load Package component. Check console for details.`
            );
            console.error(error);
        }
    };

    handleSubmit = async () => {
        const { strawberryIndex } = this.state;
        console.log("Within Package.js handleSubmit(): ");
        console.log(this.props);
        console.log(this.props.web3);
        console.log(this.props.strawberryManager);
        let result = await this.props.strawberryManager.methods
            .package(strawberryIndex)
            .send({ from: this.props.accounts[0] });
        console.log(result);

        alert("Strawberry " + strawberryIndex + " has been Packaged");
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <div>
                    <h2>Signoff Lifecycle: Phases</h2>
                    <h3>Packaging </h3>
                </div>
                <div>
                    Strawberry ID :{" "}
                    <input
                        type="text"
                        name="strawberryIndex"
                        value={this.state.strawberryIndex}
                        onChange={this.handleInputChange}
                    />
                    <button type="button" onClick={this.handleSubmit}>
                        Package
                    </button>
                </div>
            </div>
        );
    }
}

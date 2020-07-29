import React, { Component } from "react";
import StrawberryManager from "../contracts/StrawberryManager.json";
import Strawberry from "../contracts/Strawberry.json";
import getWeb3 from "../getWeb3";

export class ChangeStatusUnfit extends Component {
    state = { strawberryIndex: "" };
    componentDidMount = async () => {
        try {
            console.log(
                "ChangeStatusUnfit has mounted with the following props"
            );
            console.log(this.props);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load ChangeStatusUnfit component. Check console for details.`
            );
            console.error(error);
        }
    };

    handleSubmit = async () => {
        const { strawberryIndex } = this.state;
        console.log("Within ChangeStatusUnfit.js handleSubmit(): ");
        console.log(this.props);
        console.log(this.props.web3);
        console.log(this.props.strawberryManager);
        let result = await this.props.strawberryManager.methods
            .changeStatusUnfit(strawberryIndex)
            .send({ from: this.props.accounts[0] });
        console.log(result);
        alert(
            "Strawberry " +
                strawberryIndex +
                "'s status has been changed to Unfit for Sale"
        );
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
                    <h3>Declare product unfit for sale </h3>
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
                        Declare
                    </button>
                </div>
            </div>
        );
    }
}

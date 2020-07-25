pragma solidity ^0.6.0;

import "./StrawberryManager.sol";

contract Strawberry {
    uint256 public priceInWei;
    uint256 public paidWei;
    string public identifier;

    StrawberryManager parentContract;

    constructor(
        StrawberryManager _parentContract,
        uint256 _priceInWei,
        string memory _identifier
    ) public {
        priceInWei = _priceInWei;
        identifier = _identifier;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(msg.value == priceInWei, "full payment only");
        require(paidWei == 0, "item paid already");
        paidWei += msg.value;
        (bool success, ) = address(parentContract).call.value(msg.value)(
            abi.encodeWithSignature("triggerPayment(string)", identifier)
        );
        require(success, "deliver did not work");
    }

    fallback() external {}
}

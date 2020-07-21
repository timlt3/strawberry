pragma solidity ^0.6.0;

import "./StrawberryManager.sol";

contract Strawberry {
    uint256 public priceInWei;
    uint256 public paidWei;
    uint256 public index;

    StrawberryManager parentContract;

    constructor(
        StrawberryManager _parentContract,
        uint256 _priceInWei,
        uint256 _index
    ) public {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(msg.value == priceInWei, "full payment only");
        require(paidWei == 0, "item paid already");
        paidWei += msg.value;
        (bool success, ) = address(parentContract).call.value(msg.value)(
            abi.encodeWithSignature("triggerPayment(uint256)", index)
        );
        require(success, "deliver did not work");
    }

    fallback() external {}
}

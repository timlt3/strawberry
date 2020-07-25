pragma solidity ^0.6.0;

import "./Strawberry.sol";

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

/*is Ownable*/
contract StrawberryManager {
    enum Phases {Processed, Packaged, Delivered, Paid}

    struct S_Strawberry {
        Strawberry _strawberry;
        string _identifier;
        StrawberryManager.Phases _phase;
        uint256 _priceInWei;
    }

    mapping(string => S_Strawberry) public strawberries;
    uint256 numStrawberries;

    event SupplyChainPhase(
        string _identifier,
        uint256 _phase,
        address _address
    );

    function createStrawberry(string memory _identifier, uint256 _priceInWei)
        public
    /*onlyOwner*/
    {
        Strawberry strawberry = new Strawberry(this, _priceInWei, _identifier);
        strawberries[_identifier]._strawberry = strawberry;
        strawberries[_identifier]._identifier = _identifier;
        strawberries[_identifier]._priceInWei = _priceInWei;
        strawberries[_identifier]._phase = Phases.Processed;
        emit SupplyChainPhase(
            _identifier,
            uint256(strawberries[_identifier]._phase),
            address(strawberry)
        );
        numStrawberries++;
    }

    function triggerPayment(string memory _identifier) public payable {
        Strawberry strawberry = strawberries[_identifier]._strawberry;
        require(
            address(strawberry) == msg.sender,
            "only items are allowed to update themselves"
        );
        require(strawberry.priceInWei() == msg.value, "not fully paid yet");
        require(
            strawberries[_identifier]._phase == Phases.Delivered,
            "strawberry must be delivered before payment possible"
        );
        strawberries[_identifier]._phase = Phases.Paid;
        emit SupplyChainPhase(
            _identifier,
            uint256(strawberries[_identifier]._phase),
            address(strawberry)
        );
    }

    function finishProcessing(string memory _identifier) public {
        //perform checks like the user is allowed to change the phase
        /*require(
            strawberries[_identifier]._phase == Phases.Processed,
            "item is further in the chain"
        );*/
        strawberries[_identifier]._phase = Phases.Packaged;
    }

    function finishPackaging(string memory _identifier) public {
        //perform checks like the user is allowed to change the phase
        require(
            strawberries[_identifier]._phase == Phases.Packaged,
            "item is further in the chain"
        );
        strawberries[_identifier]._phase = Phases.Delivered;
    }
}

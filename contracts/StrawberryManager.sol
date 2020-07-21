pragma solidity ^0.6.0;

import "./Strawberry.sol";

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

/*is Ownable*/
contract StrawberryManager {
    enum Phases {Processed, Packaged, Delivered, Paid}
    enum Status {Good, Warning, UnfitForSale}

    struct S_Strawberry {
        Strawberry _strawberry;
        string _identifier;
        StrawberryManager.Phases _phase;
        StrawberryManager.Status _status;
        uint256 _priceInWei;
    }

    mapping(uint256 => S_Strawberry) public strawberries;
    uint256 strawberryIndex;

    event SupplyChainPhase(
        uint256 _strawberryIndex,
        uint256 _phase,
        uint256 _status,
        address _address
    );

    function createStrawberry(string memory _identifier, uint256 _priceInWei)
        public
    /*onlyOwner*/
    {
        Strawberry strawberry = new Strawberry(
            this,
            _priceInWei,
            strawberryIndex
        );
        strawberries[strawberryIndex]._strawberry = strawberry;
        strawberries[strawberryIndex]._identifier = _identifier;
        strawberries[strawberryIndex]._priceInWei = _priceInWei;
        strawberries[strawberryIndex]._phase = Phases.Processed;
        strawberries[strawberryIndex]._status = Status.Good;
        emit SupplyChainPhase(
            strawberryIndex,
            uint256(strawberries[strawberryIndex]._phase),
            uint256(strawberries[strawberryIndex]._status),
            address(strawberry)
        );
        strawberryIndex++;
    }

    function triggerPayment(uint256 _index) public payable {
        Strawberry strawberry = strawberries[_index]._strawberry;
        require(
            address(strawberry) == msg.sender,
            "only items are allowed to update themselves"
        );
        require(strawberry.priceInWei() == msg.value, "not fully paid yet");
        require(strawberries[_index]._phase == Phases.Delivered);
        strawberries[_index]._phase = Phases.Paid;
        emit SupplyChainPhase(
            _index,
            uint256(strawberries[_index]._phase),
            uint256(strawberries[_index]._status),
            address(strawberry)
        );
    }

    function package(uint256 _strawberryIndex) public {
        //perform checks like the user is allowed to change the phase
        require(
            strawberries[_strawberryIndex]._phase == Phases.Processed,
            "item is further in the chain"
        );
        strawberries[_strawberryIndex]._phase = Phases.Packaged;

        emit SupplyChainPhase(
            _strawberryIndex,
            uint256(strawberries[_strawberryIndex]._phase),
            uint256(strawberries[_strawberryIndex]._status),
            address(_strawberryIndex)
        );
    }

    function deliver(uint256 _strawberryIndex) public {
        //perform checks like the user is allowed to change the phase
        require(
            strawberries[_strawberryIndex]._phase == Phases.Packaged,
            "item is further in the chain"
        );
        strawberries[_strawberryIndex]._phase = Phases.Delivered;

        emit SupplyChainPhase(
            strawberryIndex,
            uint256(strawberries[_strawberryIndex]._phase),
            uint256(strawberries[strawberryIndex]._status),
            address(_strawberryIndex)
        );
    }

    function changeStatusWarning(uint256 _strawberryIndex) public {
        strawberries[_strawberryIndex]._status = Status.Warning;
    }

    function changeStatusUnfit(uint256 _strawberryIndex) public {
        strawberries[_strawberryIndex]._status = Status.UnfitForSale;
    }
}

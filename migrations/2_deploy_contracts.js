var StrawberryManager = artifacts.require("./StrawberryManager.sol");

module.exports = function (deployer) {
    deployer.deploy(StrawberryManager);
};

# strawberry

This application is a full-stack logistics supply chain system that provides an audit trail to track products in their lifecycle.

Actors in the system are able to sign-off on various stages of the products and these transactions are then captured and stored on the blockchain. The advantages of using blockchain technology in this system are that the signoff messages are immutable, easily traceable and decentralized. Users are given a client which handles Authentication using a NOSQL database Google Firebase, and after authentication has occured, depending on their permission status on the known-actors list are then able to perform their signoff functions.

Technologies used on this project are Solidity, Truffle and React.js.

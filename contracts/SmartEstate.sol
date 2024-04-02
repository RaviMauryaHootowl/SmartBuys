// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SmartEstate {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    struct User {
        uint256 userId;
        address userAdd;
        string name;
        string mobileNo;
        string aadhaar;
        string aadhaarCID;
    }

    struct Plot {
        uint256 id;
        uint256 creatorId;
        string name;
        string realAdd;
        string xCor;
        string yCor;
        uint256 totalQuantity;
        uint256 availableStocks;
        uint256 price;
    }

    struct Transaction {
        uint256 source;
        uint256 target;
        uint256 quantity;
        uint256 price;
        uint256 timestamp;
        uint256 plotId;
        int8 state; // 0:PENDING / 1:VALIDATED / 2:REJECTED
        bool transacType; // 0: sell 1: buy
    }

    // struct Pending {
    //     uint256 source;
    //     uint256 quantity;
    //     uint256 plotId;
    //     uint256 timestamp;
    //     bool state;
    // }

    struct Stocks {
        uint256 userId;
        uint256 plotId;
        uint256 quantity;
        uint256 sellable;
    }

    uint256 transactionCount;
    uint256 plotCount;
    uint256 plotRequestCount;
    uint256 userCount;
    uint256 userRequestCount;
    uint256 stockCount;

    mapping(uint256 => User) users;
    mapping(uint256 => User) userRequests;
    mapping(uint256 => Transaction) transactions;
    mapping(uint256 => Plot) plots;
    mapping(uint256 => Plot) plotRequests;
    mapping(uint256 => Stocks) stocks;

    mapping(address => uint256) userAddressToIdMapping;

    // mapping(uint256 => uint256)

    function compareStrings(
        string memory _string1,
        string memory _string2
    ) public pure returns (bool) {
        return (keccak256(abi.encodePacked((_string1))) ==
            keccak256(abi.encodePacked((_string2))));
    }

    function registerUser(
        address userAdd,
        string memory name,
        string memory mobileNo,
        string memory aadhaar,
        string memory aadhaarCID
    ) public {
        userRequests[userRequestCount] = User({
            userId: userRequestCount,
            userAdd: userAdd,
            name: name,
            mobileNo: mobileNo,
            aadhaar: aadhaar,
            aadhaarCID: aadhaarCID
        });

        userRequestCount += 1;
    }

    function addPlot(
        string memory name,
        string memory realAdd,
        string memory xCor,
        string memory yCor,
        uint256 totalQuantity,
        uint256 availableStocks,
        uint256 price
    ) public {
        plotRequests[plotRequestCount] = Plot({
            id: plotRequestCount,
            creatorId: userAddressToIdMapping[msg.sender],
            name: name,
            realAdd: realAdd,
            xCor: xCor,
            yCor: yCor,
            totalQuantity: totalQuantity,
            availableStocks: availableStocks,
            price: price
        });
        plotRequestCount += 1;
    }

    function verifyUser(address userAdd) public {
        users[userCount] = userRequests[userAddressToIdMapping[userAdd]];

        userRequests[userAddressToIdMapping[userAdd]] = userRequests[
            userRequestCount - 1
        ];
        userAddressToIdMapping[
            userRequests[userRequestCount - 1].userAdd
        ] = userAddressToIdMapping[userAdd];

        userAddressToIdMapping[userAdd] = userCount;
        userCount += 1;

        delete userRequests[userRequestCount - 1];
        userRequestCount -= 1;
    }

    function rejectUser(address userAdd) public {
        userRequests[userAddressToIdMapping[userAdd]] = userRequests[
            userRequestCount - 1
        ];
        userAddressToIdMapping[
            userRequests[userRequestCount - 1].userAdd
        ] = userAddressToIdMapping[userAdd];

        delete userRequests[userRequestCount - 1];
        userRequestCount -= 1;
    }

    function rejectPlot(uint256 plotId) public {
        plotRequests[plotId] = plotRequests[plotRequestCount - 1];

        delete plotRequests[plotRequestCount - 1];
        plotRequestCount -= 1;
    }

    function acceptPlot(uint256 plotId) public {
        plots[plotCount] = plotRequests[plotId];

        stocks[stockCount] = Stocks({
            userId: userAddressToIdMapping[msg.sender],
            plotId: plotCount,
            quantity: plots[plotCount].totalQuantity,
            sellable: plots[plotCount].availableStocks
        });

        plotCount += 1;

        plotRequests[plotId] = plotRequests[plotRequestCount - 1];

        delete plotRequests[plotRequestCount - 1];
        plotRequestCount -= 1;
    }

    function updateSellableStocks(uint256 stockId, uint256 sellable) public {
        require(
            stocks[stockId].sellable + sellable <= stocks[stockId].quantity,
            "Sellable quantity is more than the total stocks that you have!"
        );
        stocks[stockId].sellable += sellable;
    }
}

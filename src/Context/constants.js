import safeBuy from "../artifacts/contracts/SafeBuy.sol/SafeBuy.json";
import companyNFT from "../artifacts/contracts/CompanyNFT.sol/CompanyNFT.json";

export const SafeBuyAddress = "0xE3b6098b62c7d7Bfe466Ab6f222Bec8e1374ECe8";
export const SafeBuyABI = safeBuy.abi;
export const CompanyNFTABI = companyNFT.abi;

export const ChainId = {
	MAINNET: 1,
	GOERLI: 5,
	POLYGON_MUMBAI: 80001,
	POLYGON_MAINNET: 137,
	SCROLL: 534353,
};

export let activeChainId = ChainId.SCROLL;
export const supportedChains = [
	ChainId.GOERLI,
	ChainId.POLYGON_MAINNET,
	ChainId.POLYGON_MUMBAI,
	ChainId.SCROLL
];

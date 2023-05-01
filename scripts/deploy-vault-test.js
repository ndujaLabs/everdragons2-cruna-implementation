require("dotenv").config();
const hre = require("hardhat");
const ethers = hre.ethers;

const DeployUtils = require("./lib/DeployUtils");

const supportedNetwork = {
  137: "matic",
  80001: "mumbai",
  1337: "localhost",
  5: "goerli",
};

function pe(amount) {
  return ethers.utils.parseEther(amount.toString());
}

async function main() {
  require("./consoleLogAlert")();

  let everdragons2Protector, everdragons2TransparentVault, tokenUtils;
  let bulls, particle, fatBelly, stupidMonk, uselessWeapons;

  let deployUtils = new DeployUtils(ethers);
  const chainId = await deployUtils.currentChainId();
  let [deployer, e2Owner] = await ethers.getSigners();

  const network = supportedNetwork[chainId];

  if (!network) {
    console.error("Unsupported network", chainId);
    process.exit(1);
  }

  console.log("Deploying contracts with the account:", deployer.address, "to", network);

  everdragons2Protector = await deployUtils.deployProxy("Everdragons2ProtectorMintable", e2Owner.address);

  everdragons2TransparentVault = await deployUtils.deployProxy(
    "TransparentVault",
    everdragons2Protector.address,
    "Everdragons2"
  );

  await deployUtils.Tx(everdragons2Protector.addSubordinate(everdragons2TransparentVault.address), "addSubordinate");
  tokenUtils = await deployUtils.deploy("TokenUtils");
  await deployUtils.Tx(everdragons2TransparentVault.setTokenUtils(tokenUtils.address), "setTokenUtils");

  await deployUtils.Tx(everdragons2Protector.connect(e2Owner).safeMint2(deployer.address), "safeMint2 " + deployer.address);
  await deployUtils.Tx(everdragons2Protector.connect(e2Owner).safeMint2(deployer.address), "safeMint2 " + deployer.address);
  await deployUtils.Tx(everdragons2Protector.connect(e2Owner).safeMint2(e2Owner.address), "safeMint2 " + e2Owner.address);
  await deployUtils.Tx(everdragons2Protector.connect(e2Owner).safeMint2(e2Owner.address), "safeMint2 " + e2Owner.address);

  const receivers = [
    deployer.address,
    e2Owner.address,
    "0x38671F9A37bD37EA52aD63182D3Ff6a64e2692D6",
    "0x888De0501cDBd7f88654Eb22f9517a6c93bf014B",
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    "0xf745f82C76e612e7b6C06AD2924acE30c800c8f9",
    "0x5471DE1D6d688BA49685391f411Cf5D9c0be0aA4",
    "0x1eF10ce9dFB6E006eC4Bd700E9cCF389bA6a2791",
    "0x68C71A03Eaca2A482193751952F801827A6AF8B9",
    "0x984e099842E3c593bAa861C446Ff15ca4c99BB60",
    "0x34841e5C7858ca12916eeE69C515c29e2075802F",
  ];

  // erc20
  bulls = await deployUtils.deploy("Bulls");
  fatBelly = await deployUtils.deploy("FatBelly");
  particle = await deployUtils.deploy("Particle", "https://meta.mob.land/farm/");
  stupidMonk = await deployUtils.deploy("StupidMonk", "https://data.mob.land/genesis_blueprints/json/");
  uselessWeapons = await deployUtils.deploy("UselessWeapons", "https://api.mob.land/wl/{id}");

  for (let address of receivers) {
    await deployUtils.Tx(bulls.mint(address, pe("1000000")), "mint bulls for " + address);

    await deployUtils.Tx(fatBelly.mint(address, pe("10000000")), "mint fatBelly for " + address);
    await deployUtils.Tx(particle.safeMint(address, 1), "safeMint particle for " + address);
    await deployUtils.Tx(stupidMonk.safeMint(address, 1), "safeMint stupidMonk for " + address);
    await deployUtils.Tx(uselessWeapons.mintBatch(address, [1, 2], [5, 2], "0x00"), "mintBatch uselessWeapons for " + address);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

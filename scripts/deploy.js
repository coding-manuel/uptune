const main = async () => {
  const Uptune = await hre.ethers.getContractFactory("Uptune");
  const uptune = await Uptune.deploy();

  await uptune.deployed();

  console.log("uptune deployed to:", uptune.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();
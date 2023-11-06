# Setup for Frontend Development

In Metamask, import the first automatically funded account for Hardhat and Anvil:

```
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

In terminal 1, run:

```
npx hardhat node
```

In terminal 2, run:

```
# Deploy contracts
echo PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 > .env
cd demo-contract
./script/deploy
```

```
# Set contract addresses for frontend
Set contract addresses in .env.local when they differ from .env
```

Repeat the "deploy contract" step to get the DemoDay contract back to stage 1.

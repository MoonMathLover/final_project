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

In terminal 2, go to the `demo-contract` repo and run:

```
# Deploy contracts
cd demo-contract
echo PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 > .env
./script/deploy
```

```
# Set contract addresses for frontend
cd final_project
code .env.local
```

Repeat the "deploy contract" step to get the DemoDay contract back to stage 1.

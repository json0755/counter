# BAPE代币创建指南

本文档记录了在Solana devnet测试网络上创建名为"bape"的同质化代币的完整过程。

## 操作环境
- 网络：Solana Devnet
- 工具：spl-token CLI
- 钱包：/home/bape/.config/solana/bape-wallet.json

## 详细操作步骤

### 1. 配置Solana CLI连接到devnet

**命令：**
```bash
solana config set --url devnet
```

**输出：**
```
Config File: /home/bape/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /home/bape/.config/solana/bape-wallet.json
Commitment: confirmed
```

### 2. 检查钱包SOL余额

**命令：**
```bash
solana balance
```

**输出：**
```
0.99002004 SOL
```

### 3. 创建BAPE代币

**命令：**
```bash
spl-token create-token --decimals 9
```

**输出：**
```
Creating token 9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE
Decimals:  9

Signature: 2qaWiUd4MRgRhzUstLdgmmUy4fhZFgSGb4UsFycPTUbHnzj8BaVc1Mg9eV3i8LXcQ2T135ek7yiA81dC8izKHCoD
```

**代币信息：**
- 代币地址：`9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE`
- 小数位数：9
- 创建交易签名：`2qaWiUd4MRgRhzUstLdgmmUy4fhZFgSGb4UsFycPTUbHnzj8BaVc1Mg9eV3i8LXcQ2T135ek7yiA81dC8izKHCoD`

### 4. 创建代币账户

**命令：**
```bash
spl-token create-account 9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE
```

**输出：**
```
Creating account 77qWmsRnAx7SzET1GVY6ypwjnyFFbAan5dgM9EjGofcT

Signature: 2jy8mzeNJJcDjp1V5RZgF5CNpf2nU3FSEuQVXxBLhk8t3asHDjMtcYifQBKPMp2WqxCLGDdCZdSC15K3g3kPTRrw
```

**账户信息：**
- 代币账户地址：`77qWmsRnAx7SzET1GVY6ypwjnyFFbAan5dgM9EjGofcT`
- 创建交易签名：`2jy8mzeNJJcDjp1V5RZgF5CNpf2nU3FSEuQVXxBLhk8t3asHDjMtcYifQBKPMp2WqxCLGDdCZdSC15K3g3kPTRrw`

### 5. 铸造BAPE代币

**命令：**
```bash
spl-token mint 9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE 1000 77qWmsRnAx7SzET1GVY6ypwjnyFFbAan5dgM9EjGofcT
```

**输出：**
```
Minting 1000 tokens
  Token: 9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE
  Recipient: 77qWmsRnAx7SzET1GVY6ypwjnyFFbAan5dgM9EjGofcT

Signature: 2z65p9dC1rPuFhkeRQin6dz66AaFyMGHfGMU82t7pwns2Wvx2XxS1mDMphh58YcW28o4jsu7grghziHP88gjwfgq
```

**铸造信息：**
- 铸造数量：1000 BAPE
- 铸造交易签名：`2z65p9dC1rPuFhkeRQin6dz66AaFyMGHfGMU82t7pwns2Wvx2XxS1mDMphh58YcW28o4jsu7grghziHP88gjwfgq`

### 6. 查询BAPE代币余额

**命令：**
```bash
spl-token balance 9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE
```

**输出：**
```
1000
```

### 7. 创建带元数据的完整BAPE代币（Token-2022）

由于原始代币不支持元数据扩展，我们使用Token-2022程序创建了一个完整的代币：

**创建支持元数据的代币：**
```bash
spl-token create-token --decimals 9 --enable-metadata --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
```

**输出：**
```
Creating token 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5 under program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
To initialize metadata inside the mint, please run `spl-token initialize-metadata 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5 <YOUR_TOKEN_NAME> <YOUR_TOKEN_SYMBOL> <YOUR_TOKEN_URI>`, and sign with the mint authority.

Address:  9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5
Decimals:  9

Signature: 47TiSoeYWDuTukE7EzjRkNAbBzPSpTfBg783ivJqAfhGs19AM9pW9FRgBx8cUQy49amNHEGecFR1NV9bHWfpZXSy
```

**初始化代币元数据：**
```bash
spl-token initialize-metadata 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5 "BAPE Token" "BAPE" "https://example.com/bape-logo.png"
```

**输出：**
```
Signature: 3eoCBzvNVF9Y3k93C4U4NZuYrcunptmWKiTvpRk8K3DCZ5ckYd722f36hT5cJ1NNQ2CsbzKHPd4MPYB3kS59nsvv
```

**创建代币账户：**
```bash
spl-token create-account 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5 --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
```

**输出：**
```
Creating account 5zSP7UqtdrvVMbCP3wuYCZfxZFe6LYUx8FYsgK5TUjyH

Signature: 43ZwXxPQSMKmFNAfu8LUhsHsP5hz5scRkWG8uJPkGx7fYEbkDhMVnJFFeSoK3QRduzDafLfXkxquzvqxan9P7AHM
```

**铸造代币：**
```bash
spl-token mint 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5 1000 5zSP7UqtdrvVMbCP3wuYCZfxZFe6LYUx8FYsgK5TUjyH --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
```

**输出：**
```
Minting 1000 tokens
  Token: 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5
  Recipient: 5zSP7UqtdrvVMbCP3wuYCZfxZFe6LYUx8FYsgK5TUjyH

Signature: 3Mok2cTdogXMc3ckJb3HmfTt1FLVSV8nqfp9Se4krDRdbsqtnGB3WU7hYkrMjf4JnrpNkCRGKjkqyQPcgFuS73pW
```

**验证代币信息：**
```bash
spl-token display 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5 --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
```

**输出：**
```
SPL Token Mint
  Address: 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5
  Program: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
  Supply: 1000000000000
  Decimals: 9
  Mint authority: 1eLQzvAqfbQDDogwCQ1vsTm3rjNMHQ3fcbZYMW3mf2i
  Freeze authority: (not set)
Extensions
  Metadata Pointer:
    Authority: 1eLQzvAqfbQDDogwCQ1vsTm3rjNMHQ3fcbZYMW3mf2i
    Metadata address: 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5
  Metadata:
    Update Authority: 1eLQzvAqfbQDDogwCQ1vsTm3rjNMHQ3fcbZYMW3mf2i
    Mint: 9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5
    Name: BAPE Token
    Symbol: BAPE
    URI: https://example.com/bape-logo.png
```

## 总结

成功在Solana devnet测试网络上创建了两个版本的"bape"代币：

### 基础版本（SPL Token）
- ✅ 代币地址：`9KmqTGvNARA6uFabRqmuCoSA1w7gNpQPwVz1UxNYjBWE`
- ✅ 代币账户：`77qWmsRnAx7SzET1GVY6ypwjnyFFbAan5dgM9EjGofcT`
- ✅ 当前余额：1000 BAPE
- ✅ 小数位数：9
- ❌ 无元数据支持

### 完整版本（Token-2022 with Metadata）
- ✅ 代币地址：`9UWo6cWQoCw72EWxM6uMwUTG7R1HKM9QA7EnmzWDycD5`
- ✅ 代币账户：`5zSP7UqtdrvVMbCP3wuYCZfxZFe6LYUx8FYsgK5TUjyH`
- ✅ 当前余额：1000 BAPE
- ✅ 小数位数：9
- ✅ 代币名称："BAPE Token"
- ✅ 代币符号："BAPE"
- ✅ 代币图标："https://example.com/bape-logo.png"
- ✅ 完整元数据支持

所有操作均在devnet测试网络上完成，可以通过Solana Explorer查看相关交易详情。

## 注意事项

1. 本操作在devnet测试网络进行，代币仅用于测试目的
2. 代币创建者拥有铸造权限，可以继续铸造更多代币
3. 如需在mainnet部署，请确保充分测试并了解相关风险
4. 保管好钱包私钥，避免资产损失

---

**文档生成时间：** $(date)
**操作完成状态：** 成功
# Solana Counter Program

一个基于 Solana 区块链和 Anchor 框架开发的简单计数器智能合约程序。

## 项目简介

这是一个演示性的 Solana 程序，实现了基本的计数器功能：
- 初始化计数器账户，设置初始值为 0
- 递增计数器的值
- 使用 PDA (Program Derived Address) 来管理计数器状态

## 技术栈

- **Solana**: 高性能区块链平台
- **Anchor**: Solana 程序开发框架
- **Rust**: 智能合约编程语言
- **TypeScript**: 测试脚本语言
- **Node.js**: JavaScript 运行环境

## 项目结构

```
counter/
├── programs/counter/src/
│   └── lib.rs              # 主程序逻辑
├── scripts/                # 自定义测试脚本
│   ├── initialize.ts       # 初始化计数器脚本
│   └── increment.ts        # 递增计数器脚本
├── tests/
│   └── counter.ts          # Anchor 测试文件
├── target/
│   ├── deploy/             # 编译后的程序文件
│   ├── idl/                # 接口定义文件
│   └── types/              # TypeScript 类型定义
├── Anchor.toml             # Anchor 配置文件
├── Cargo.toml              # Rust 项目配置
├── package.json            # Node.js 依赖配置
└── tsconfig.json           # TypeScript 配置
```

## 安装要求

### 系统依赖
- Node.js (v16+)
- Rust (最新稳定版)
- Solana CLI (v1.14+)
- Anchor CLI (v0.28+)

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd counter
   ```

2. **安装 Node.js 依赖**
   ```bash
   yarn install
   # 或者使用 npm
   npm install
   ```

3. **配置 Solana**
   ```bash
   # 设置为本地网络
   solana config set --url localhost
   
   # 生成密钥对（如果没有的话）
   solana-keygen new
   ```

## 使用方法

### 完整操作步骤

#### 1. 环境准备

```bash
# 关闭代理（如果有的话）
proxy_off

# 配置 Solana CLI 指向本地网络
solana config set --url localhost

# 检查配置
solana config get
```

#### 2. 启动本地验证器

```bash
# 清理旧的测试账本并启动验证器
rm -rf test-ledger && solana-test-validator
```

验证器启动后，你会看到类似以下的输出：
```
Ledger location: test-ledger
Log: test-ledger/validator.log
Identity: <validator-identity>
Genesis Hash: <genesis-hash>
Version: 2.3.8
Shred Version: <shred-version>
Gossip Address: 127.0.0.1:1024
TPU Address: 127.0.0.1:1027
JSON RPC URL: http://127.0.0.1:8899
WebSocket PubSub URL: ws://127.0.0.1:8900
```

#### 3. 验证连接

在新终端中验证验证器是否正常运行：

```bash
# 检查集群版本
solana cluster-version

# 应该返回类似：2.3.8
```

#### 4. 构建程序

```bash
anchor build
```

#### 5. 部署程序

```bash
anchor deploy
```

部署成功后会显示：
```
Deploying cluster: http://127.0.0.1:8899
Upgrade authority: /home/user/.config/solana/id.json
Deploying program "counter"...
Program path: /path/to/counter/target/deploy/counter.so...
Program Id: <PROGRAM_ID>

Signature: <TRANSACTION_SIGNATURE>

Deploy success
```

#### 6. 使用自定义脚本测试

项目包含两个测试脚本：`scripts/initialize.ts` 和 `scripts/increment.ts`

**设置环境变量：**
```bash
export ANCHOR_PROVIDER_URL=http://127.0.0.1:8899
export ANCHOR_WALLET=/home/user/.config/solana/id.json
```

**运行初始化脚本（仅需运行一次）：**
```bash
npx ts-node scripts/initialize.ts
```

预期输出：
```
开始初始化计数器程序...
程序ID: <PROGRAM_ID>
计数器PDA地址: <PDA_ADDRESS>
初始化交易签名: <TRANSACTION_SIGNATURE>
计数器初始值: 0
✅ 计数器初始化成功!
脚本执行完成
```

**运行递增脚本（可多次运行）：**
```bash
npx ts-node scripts/increment.ts
```

预期输出：
```
开始递增计数器...
程序ID: <PROGRAM_ID>
计数器PDA地址: <PDA_ADDRESS>
递增前的计数器值: 0
递增交易签名: <TRANSACTION_SIGNATURE>
递增后的计数器值: 1
✅ 计数器递增成功!
脚本执行完成
```

#### 7. 运行 Anchor 测试

```bash
# 运行完整测试（包括启动验证器）
anchor test

# 或者在已有验证器上运行测试
anchor test --skip-local-validator
```

## 程序功能

### 指令说明

1. **initialize**: 初始化计数器
   - 创建一个新的计数器账户
   - 设置初始计数值为 0
   - 使用 PDA 确保账户地址的唯一性

2. **increment**: 递增计数器
   - 将计数器的值增加 1
   - 更新链上状态

### 账户结构

```rust
#[account]
pub struct Counter {
    pub count: u64,  // 计数器值
}
```

### PDA 种子

计数器账户使用以下种子生成 PDA：
- 种子: `"counter"`
- 程序ID: 部署时生成的程序地址

## 测试说明

测试文件 `tests/counter.ts` 包含两个主要测试用例：

1. **初始化测试**
   - 验证计数器能够正确初始化
   - 检查初始值是否为 0

2. **递增测试**
   - 验证计数器能够正确递增
   - 检查递增后的值是否正确

### 运行单个测试

```bash
# 使用 mocha 运行特定测试
yarn mocha -t 1000000 --require ts-node/register tests/counter.ts
```

## 开发说明

### 程序ID配置

程序ID在以下文件中需要保持一致：
- `programs/counter/src/lib.rs` - `declare_id!` 宏
- `Anchor.toml` - `[programs.localnet]` 部分

### 常见问题

1. **程序ID不匹配错误**
   - 确保源代码中的 `declare_id!` 与实际部署的程序ID一致
   - 重新构建和部署程序

2. **端口占用错误**
   - 检查是否有其他验证器实例在运行
   - 使用 `--skip-local-validator` 选项

3. **依赖版本问题**
   - 确保 Anchor 和 Solana CLI 版本兼容
   - 查看官方文档获取最新版本要求

4. **502 Bad Gateway 错误**
   - 验证器启动需要时间，等待几秒钟后重试
   - 确保代理已关闭：`proxy_off`
   - 检查 Solana 配置是否指向本地：`solana config set --url localhost`

5. **账户已存在错误**
   ```
   Error: failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x0
   ```
   - 这通常表示计数器已经初始化过了
   - 清理测试账本重新开始：`rm -rf test-ledger && solana-test-validator`
   - 或者直接运行递增脚本

6. **环境变量未设置错误**
   ```
   Error: ANCHOR_PROVIDER_URL is not defined
   ```
   - 设置必要的环境变量：
   ```bash
   export ANCHOR_PROVIDER_URL=http://127.0.0.1:8899
   export ANCHOR_WALLET=/home/user/.config/solana/id.json
   ```

7. **验证器无法启动**
   - 检查是否有其他验证器进程在运行：`pkill -f solana-test-validator`
   - 清理锁定的账本：`rm -rf test-ledger`
   - 重新启动验证器

8. **RPC 连接失败**
   - 确认验证器正在运行：`solana cluster-version`
   - 检查防火墙设置
   - 确认端口 8899 和 8900 未被占用

## 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 相关资源

- [Solana 官方文档](https://docs.solana.com/)
- [Anchor 框架文档](https://www.anchor-lang.com/)
- [Solana 程序库](https://spl.solana.com/)
- [Rust 编程语言](https://www.rust-lang.org/)

## 联系方式

如有问题或建议，请通过以下方式联系：
- 创建 Issue
- 发送 Pull Request
- 邮件联系项目维护者
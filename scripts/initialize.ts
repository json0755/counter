import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { PublicKey } from "@solana/web3.js";

// 配置提供者
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.Counter as Program<Counter>;

async function initialize() {
  try {
    console.log("开始初始化计数器程序...");
    console.log("程序ID:", program.programId.toString());
    
    // 生成计数器PDA
    const [counterPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("counter")],
      program.programId
    );
    
    console.log("计数器PDA地址:", counterPda.toString());
    
    // 调用initialize指令
    const tx = await program.methods
      .initialize()
      .rpc();
    
    console.log("初始化交易签名:", tx);
    
    // 获取计数器账户数据
    const counterAccount = await program.account.counter.fetch(counterPda);
    console.log("计数器初始值:", counterAccount.count.toString());
    
    console.log("✅ 计数器初始化成功!");
    
  } catch (error) {
    console.error("❌ 初始化失败:", error);
    process.exit(1);
  }
}

// 运行初始化
initialize().then(() => {
  console.log("脚本执行完成");
}).catch((error) => {
  console.error("脚本执行失败:", error);
  process.exit(1);
});
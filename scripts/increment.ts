import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { PublicKey } from "@solana/web3.js";

// 配置提供者
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.Counter as Program<Counter>;

async function increment() {
  try {
    console.log("开始递增计数器...");
    console.log("程序ID:", program.programId.toString());
    
    // 生成计数器PDA
    const [counterPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("counter")],
      program.programId
    );
    
    console.log("计数器PDA地址:", counterPda.toString());
    
    // 获取递增前的计数器值
    try {
      const counterAccountBefore = await program.account.counter.fetch(counterPda);
      console.log("递增前的计数器值:", counterAccountBefore.count.toString());
    } catch (error) {
      console.log("计数器账户不存在，请先运行初始化脚本");
      process.exit(1);
    }
    
    // 调用increment指令
    const tx = await program.methods
      .increment()
      .rpc();
    
    console.log("递增交易签名:", tx);
    
    // 获取递增后的计数器值
    const counterAccountAfter = await program.account.counter.fetch(counterPda);
    console.log("递增后的计数器值:", counterAccountAfter.count.toString());
    
    console.log("✅ 计数器递增成功!");
    
  } catch (error) {
    console.error("❌ 递增失败:", error);
    process.exit(1);
  }
}

// 运行递增
increment().then(() => {
  console.log("脚本执行完成");
}).catch((error) => {
  console.error("脚本执行失败:", error);
  process.exit(1);
});
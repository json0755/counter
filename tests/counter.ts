import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { assert } from "chai";

describe("counter", () => {
  // 配置Anchor
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  
  // 生成计数器账户地址（与程序中使用相同的seed）
  const [counterPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );

  it("Is initialized!", async () => {
    // 执行初始化指令
    const tx = await program.methods.initialize()
      .accountsPartial({
        counter: counterPda,
        //系统程序账户
        user: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    
    // 验证初始化结果
    const counterAccount = await program.account.counter.fetch(counterPda);
    assert.equal(counterAccount.count, 0, "Initial count should be 0");
  });

  it("Increments the counter", async () => {
    // 执行递增指令
    const tx = await program.methods.increment()
      .accounts({
        counter: counterPda,
      })
      .rpc();
    console.log("Increment transaction signature", tx);
    
    // 验证递增结果
    const counterAccount = await program.account.counter.fetch(counterPda);
    assert.equal(counterAccount.count, 1, "Count should be 1 after increment");
  });
});

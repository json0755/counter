use anchor_lang::prelude::*;

// 定义程序ID  Program 账户（你的计数器程序账户）
declare_id!("6VoRpsz5cXnXiBKwqqo4Z1P15RrdrSbKZFCts4kmwSrC");

#[program]
pub mod counter {
    use super::*;

    // 初始化计数器，设置count为0
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        msg!("Counter initialized with count: {}", counter.count);
        Ok(())
    }

    // 递增计数器
    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter: &mut _ = &mut ctx.accounts.counter;
        counter.count += 1;
        msg!("Counter incremented to: {}", counter.count);
        Ok(())
    }
}

// 初始化指令的账户上下文
#[derive(Accounts)]
pub struct Initialize<'info> {
    // 计数器账户，使用seed派生
    #[account(
        init,
        payer = user,
        space = 8 + 8, // 8字节的discriminator + 8字节的u64
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,
    
    // 支付费用的用户  签名者账户
    #[account(mut)]
    pub user: Signer<'info>,
    
    // 系统程序
    pub system_program: Program<'info, System>,
}

// 递增指令的账户上下文
#[derive(Accounts)]
pub struct Increment<'info> {
    // 计数器账户，使用seed派生并确保可修改
    #[account(
        mut,
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,
}

// 计数器状态结构体
#[account]
pub struct Counter {
    pub count: u64,
}

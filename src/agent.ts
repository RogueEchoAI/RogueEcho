import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { CustomTool } from "./tools/blah";
import { CustomAgent } from "./custom_agent";
import { createSolanaTools } from "solana-agent-kit";
import { SolanaBalanceTool, SolanaGetWalletAddressTool } from "solana-agent-kit/dist/langchain";
import { CustomRandomNumber } from "./tools/random";


const converseTools = (agent:CustomAgent)=>{
  return [
    // ...createSolanaTools(agent),
    new CustomTool(agent),
    new CustomRandomNumber(agent)
  ]
}

export async function initializeAgent() {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
  });

  const solanaKit = new CustomAgent(
    process.env.SOLANA_PRIVATE_KEY!,
    process.env.RPC_URL,
    process.env.OPENAI_API_KEY!
  );

  const tools = converseTools(solanaKit);


  const memory = new MemorySaver();
//   const config = { configurable: { thread_id: "Solana Agent Kit!" } };

  return createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
  });
}

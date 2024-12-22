import { SolanaAgentKit } from "solana-agent-kit";

export class CustomAgent extends SolanaAgentKit {

    async getRandomNum(startRange=0,endRange=1):Promise<number>{
      
      return (Math.random()*(endRange-startRange)+startRange);
    }

    async getTokenPrice(tokenSymbol: string): Promise<number> {
        const mockPrices: { [key: string]: number } = {
          SOL: 11,
          USDC: 1,
          USDT: 1,
          BONK: 0.5,
        };
    
        if (!mockPrices[tokenSymbol.toUpperCase()]) {
          throw new Error(`Price for token symbol ${tokenSymbol} not found.`);
        }
    
        return mockPrices[tokenSymbol.toUpperCase()];
      }

}
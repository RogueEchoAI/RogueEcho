import { Tool } from "langchain/tools";
import { CustomAgent } from "../custom_agent";

export class CustomTool extends Tool {
  name = "fetch_blah_blah";
  description = "Fetches the blah blah of a specified token.";

  constructor(private solanaKit: CustomAgent) {
    super();
  }

  protected async _call(tokenSymbol: string): Promise<string> {
    try {
      const price = await this.solanaKit.getTokenPrice(tokenSymbol);
      return JSON.stringify({
        status: "success",
        message: `Price fetched successfully for ${tokenSymbol}.`,
        data: { token: tokenSymbol, price },
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

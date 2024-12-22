import { Tool } from "langchain/tools";
import { CustomAgent } from "../custom_agent";

export class CustomRandomNumber extends Tool {
  name = "random_number";
  description = `
  Gives a random number
  Inputs(inputs is a JSON string): 
  start:number,optional,intial value by default agent can select any number less than end
  end:number,optional,end value by default agent can select any number greater than 10
  seed: string, Random string set by agent. Agent will ensure that this is always different than previous prompts.
  `;

  constructor(private solanaKit: CustomAgent) {
    super();
  }
  protected async _call(input:string): Promise<string> {
    const parsedInput = JSON.parse(input)
    try {
      const number = await this.solanaKit.getRandomNum(parsedInput.start, parsedInput.end);
      console.log(number, parsedInput.seed);
      return JSON.stringify({
        status: "sucess",
        message: `${number}`,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "unkown error",
      });
    }
  }
}

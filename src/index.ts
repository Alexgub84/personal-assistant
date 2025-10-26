import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Creates a configured ChatOpenAI model instance
 * @param apiKey - Optional API key. If not provided, uses OPENAI_API_KEY from environment
 * @returns Configured ChatOpenAI instance with GPT-4o model
 */
export function createChatModel(apiKey?: string): ChatOpenAI {
  return new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.7,
    openAIApiKey: apiKey || process.env.OPENAI_API_KEY,
  });
}

/**
 * Creates a human message with the given content
 * @param content - The text content of the message
 * @returns HumanMessage instance with the provided content
 */
export function createHumanMessage(content: string): HumanMessage {
  return new HumanMessage(content);
}

/**
 * Processes a message through the chat model and returns the response
 * @param model - The ChatOpenAI model instance to use for processing
 * @param message - The HumanMessage to process
 * @returns Promise that resolves to the AI response content as a string
 * @throws Error if the model invocation fails
 */
export async function processMessage(
  model: ChatOpenAI,
  message: HumanMessage
): Promise<string> {
  const response = await model.invoke([message]);
  return response.content as string;
}

/**
 * Main function that orchestrates the chat interaction
 */
async function main(): Promise<void> {
  try {
    const model = createChatModel();
    const message = createHumanMessage("Hello! Can you tell me a fun fact about artificial intelligence?");
    const response = await processMessage(model, message);
    
    console.log("AI Response:");
    console.log(response);
  } catch (error) {
    console.error("Error calling OpenAI:", error instanceof Error ? error.message : "Unknown error");
  }
}

// Run the main function only if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

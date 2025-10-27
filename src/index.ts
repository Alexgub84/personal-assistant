import { createConsola } from "consola";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { encodePrompt } from "./utils";

dotenv.config();

const logger = createConsola({ fancy: true });
logger.info("Starting the application...");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export function hello(): string {
  return "Hello, World!";
}

export async function checkOpenAIchat(): Promise<string> {
  const prompt = "What is the height of the mount everest?";
  const tokens = encodePrompt({ prompt, model: OPENAI_MODEL });
  if (tokens) {
    logger.info("Tokens: " + tokens);
  }
  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
  return response.choices[0].message.content as string;
}

async function main(): Promise<void> {
  const response = await checkOpenAIchat();
  logger.info("Model used: " + OPENAI_MODEL);
  logger.info(response);
}

void main();

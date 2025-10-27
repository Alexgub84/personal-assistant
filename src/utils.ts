import { encoding_for_model, get_encoding, TiktokenModel } from "tiktoken";

export function encodePrompt({
  prompt,
  model,
}: {
  prompt: string;
  model: string;
}): number {
  const encoding = safeEncodingForModel(model);
  const words = encoding.encode(prompt);
  const tokens = words.length;
  return tokens;
}

function safeEncodingForModel(
  modelName: string
): ReturnType<typeof get_encoding> {
  try {
    return encoding_for_model(modelName as TiktokenModel);
  } catch {
    return get_encoding("cl100k_base");
  }
}

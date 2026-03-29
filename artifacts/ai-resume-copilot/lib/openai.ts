import OpenAI from "openai";

const apiKey =
  process.env.OPENAI_API_KEY ||
  process.env.AI_INTEGRATIONS_OPENAI_API_KEY ||
  "placeholder";

const baseURL = !process.env.OPENAI_API_KEY
  ? process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
  : undefined;

export const openai = new OpenAI({
  apiKey,
  ...(baseURL ? { baseURL } : {}),
});

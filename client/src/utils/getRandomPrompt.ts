import { testPrompts } from "./testPrompts"

export const getRandomPrompt = (prompt: string) => {
  const randomIndex = Math.floor(Math.random() * testPrompts.length);
  const randomPrompt: string = testPrompts[randomIndex];

  if (randomPrompt === prompt) {
    getRandomPrompt(prompt);
  }

  return randomPrompt;
}
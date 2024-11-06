#!/usr/bin/env node

import OpenAI from "openai";
import { readFileSync, writeFileSync, accessSync, constants } from 'fs';
import config from './config.json' with{ type: 'json' };

const token = config.token;
const historyFile = config.historyFile;

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";
let chatHistory = [];

try {
  accessSync(historyFile, constants.F_OK); 
} catch (err) {
  writeFileSync(historyFile, JSON.stringify([]));
}

const text = readFileSync(historyFile, { encoding: 'utf8', flag: 'r' });
const json = JSON.parse(text);
chatHistory = json;

const question = process.argv[2];

const PROMPT = `
Keep the answer straight forward and concise, where possible just return the relevant executable command or commands.

You have a history of the past question and answer here, consider them as context to answer the final question.

Return the result as plain string, not markdown

---
${chatHistory.map(d => 'Question: \n' + d.q + '\n\n' + 'Answer: \n' + d.a + '\n\n').join('\n')}
---

The question is:

${question};
`;

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  // console.log('===');
  // console.log(PROMPT);
  // console.log('===');

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "You are a helpful assistant that specialized in Linux and Unix." },
        { role:"user", content: PROMPT }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });

  console.log(response.choices[0].message.content);

  chatHistory.push({
    q: question,
    a: response.choices[0].message.content
  });
  writeFileSync(historyFile, JSON.stringify(chatHistory, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

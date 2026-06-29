const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
async function generateCreative(campaign, type) {
  const prompt = fs.readFileSync(`./prompts/${type}.txt`, 'utf8');
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: `Campaign data: ${JSON.stringify(campaign)}\n\nGenerate creative.` }],
    system: prompt,
  });
  return message.content[0].text;
}
async function checkPerformance(campaigns) {
  for (const campaign of campaigns) {
    if (campaign.ctr < parseFloat(process.env.CTR_THRESHOLD || '0.01')) {
      console.log(`[Generator] Low CTR on "${campaign.name}" — generating new hook`);
      const hook = await generateCreative(campaign, 'hook-generator');
      console.log(`[Output] Hook: ${hook}`);
    }
  }
}
module.exports = { generateCreative, checkPerformance };

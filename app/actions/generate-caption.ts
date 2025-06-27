"use server"

import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// Configure OpenAI client
const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function generateInstagramCaption(formData: FormData) {
  console.log("API Key exists:", !!process.env.OPENROUTER_API_KEY)
  console.log("API Key first 10 chars:", process.env.OPENROUTER_API_KEY?.substring(0, 10))

  const description = formData.get("description") as string
  const tone = formData.get("tone") as string
  const audience = formData.get("audience") as string

  if (!description) {
    return { error: "Please provide a description or upload an image" }
  }

  try {
    const { text } = await generateText({
      model: openrouter("deepseek/deepseek-r1:free"),
      system: `You are an expert Instagram content creator and social media marketer. Generate engaging Instagram captions that drive engagement and reach.

Rules:
- Create 3 different caption variations
- Include relevant trending hashtags (15-20 hashtags)
- Match the specified tone and target audience
- Use emojis strategically
- Include a call-to-action when appropriate
- Keep captions engaging but not too long
- Format each caption clearly with line breaks

Format your response as:
CAPTION 1:
[caption text with emojis]

HASHTAGS 1:
[hashtags]

CAPTION 2:
[caption text with emojis]

HASHTAGS 2:
[hashtags]

CAPTION 3:
[caption text with emojis]

HASHTAGS 3:
[hashtags]`,
      prompt: `Generate Instagram captions for this content:

Description: ${description}
Tone: ${tone}
Target Audience: ${audience}

Create engaging captions that would perform well on Instagram with relevant trending hashtags.`,
    })

    return { success: true, captions: text }
  } catch (error) {
    console.error("Error generating caption:", error)
    return { error: "Failed to generate caption. Please try again." }
  }
}

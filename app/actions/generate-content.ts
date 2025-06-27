"use server"

import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// Configure OpenAI client - exactly like caption generator
const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function generateCreativeContent(formData: FormData) {
  console.log("=== Content Generation Debug ===")
  console.log("API Key exists:", !!process.env.OPENROUTER_API_KEY)
  console.log("API Key first 10 chars:", process.env.OPENROUTER_API_KEY?.substring(0, 10))

  const contentType = formData.get("contentType") as string
  const concept = formData.get("concept") as string
  const genre = formData.get("genre") as string
  const duration = formData.get("duration") as string
  const audience = formData.get("audience") as string
  const trendFocus = formData.get("trendFocus") as string

  console.log("Form data:", { contentType, concept, genre, duration, audience, trendFocus })

  if (!contentType || !concept) {
    return { error: "Please provide content type and concept" }
  }

  try {
    console.log("Making API call with DeepSeek R1...")

    const { text } = await generateText({
      model: openrouter("deepseek/deepseek-r1:free"),
      system: `You are an expert creative writer and content strategist. Create engaging, professional content based on user specifications.

IMPORTANT FORMATTING RULES:
- DO NOT use markdown symbols like #, *, **, _, etc.
- Use proper plain text formatting with line breaks and spacing
- For headings, use ALL CAPS or underlines made with dashes
- For emphasis, use CAPITAL LETTERS or quotation marks
- Use proper paragraph breaks and indentation
- Format scripts with proper scene headings and character names in caps
- Use clear section breaks with blank lines

Create well-structured, engaging content that matches the specified genre and audience. Provide actionable, creative output with professional formatting.`,

      prompt: `Create ${contentType} content:

CONCEPT: ${concept}
GENRE: ${genre}
DURATION: ${duration}
AUDIENCE: ${audience}
${trendFocus ? `TREND: ${trendFocus}` : ""}

Create professional, engaging content that matches these specifications. Use proper plain text formatting without markdown symbols.`,
    })

    console.log("API call successful, response length:", text?.length || 0)
    return { success: true, content: text }
  } catch (error) {
    console.error("=== Detailed Error Info ===")
    console.error("Error type:", typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Full error:", error)

    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes("JSON")) {
        return { error: "API response format error. Please try again." }
      }
      if (error.message.includes("401")) {
        return { error: "API key authentication failed. Please check your API key." }
      }
      if (error.message.includes("429")) {
        return { error: "Rate limit exceeded. Please wait a moment and try again." }
      }
      if (error.message.includes("timeout")) {
        return { error: "Request timed out. Please try again." }
      }
      if (error.message.includes("model")) {
        return { error: "Model not available. Please try again later." }
      }
    }

    return { error: "Failed to generate content. Please try again." }
  }
}

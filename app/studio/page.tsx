"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Check,
  Film,
  Mic,
  Video,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"
import { generateCreativeContent } from "../actions/generate-content"

export default function ContentStudioPage() {
  const [contentType, setContentType] = useState("")
  const [genre, setGenre] = useState("")
  const [duration, setDuration] = useState("")
  const [audience, setAudience] = useState("")
  const [concept, setConcept] = useState("")
  const [trendFocus, setTrendFocus] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setGeneratedContent("")

    try {
      console.log("=== Form Submission Debug ===")
      const formData = new FormData(event.currentTarget)

      // Log form data
      console.log("Form data entries:")
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
      }

      console.log("Calling generateCreativeContent...")
      const result = await generateCreativeContent(formData)
      console.log("Result:", result)

      if (result.success && result.content) {
        setGeneratedContent(result.content)
        console.log("Content set successfully")
      } else {
        console.log("Error result:", result.error)
        setGeneratedContent(`Error: ${result.error}`)
      }
    } catch (err) {
      console.error("=== Client-side Error ===")
      console.error("Error in handleSubmit:", err)
      setGeneratedContent("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const contentTypes = [
    { value: "screenplay", label: "Screenplay/Script", icon: <Film className="h-4 w-4" /> },
    { value: "video-concept", label: "Video Concept", icon: <Video className="h-4 w-4" /> },
    { value: "podcast-outline", label: "Podcast Outline", icon: <Mic className="h-4 w-4" /> },
    { value: "story-treatment", label: "Story Treatment", icon: <BookOpen className="h-4 w-4" /> },
    { value: "content-series", label: "Content Series", icon: <TrendingUp className="h-4 w-4" /> },
    { value: "character-development", label: "Character Development", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
              <Link href="/generator" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Caption Generator
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Capify Studio
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-none tracking-tighter">
            <span className="text-white">CONTENT</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">STUDIO</span>
          </h1>
          <p className="text-2xl text-gray-400 max-w-4xl mx-auto font-light">
            AI-powered creative writing for scripts, screenplays, video concepts, and trending content
          </p>
        </div>

        {/* Content Type Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {contentTypes.map((type, index) => (
            <Card
              key={index}
              className={`bg-white/5 border-white/10 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                contentType === type.value ? "border-yellow-400 bg-yellow-400/10" : ""
              }`}
              onClick={() => setContentType(type.value)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3 text-yellow-400">{type.icon}</div>
                <p className="text-sm font-medium text-white">{type.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-yellow-400 flex items-center">
                <Lightbulb className="mr-3 h-6 w-6" />
                Create Your Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Content Type Selection */}
                <div>
                  <Label htmlFor="content-type" className="text-gray-300 text-lg font-semibold">
                    Content Type *
                  </Label>
                  <Select name="contentType" value={contentType} onValueChange={setContentType} required>
                    <SelectTrigger className="mt-2 bg-gray-800 border-white/20 text-white h-12">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            {type.icon}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Concept/Idea */}
                <div>
                  <Label htmlFor="concept" className="text-gray-300 text-lg font-semibold">
                    Concept/Idea *
                  </Label>
                  <Textarea
                    id="concept"
                    name="concept"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Describe your creative concept, story idea, or content theme..."
                    className="mt-2 bg-gray-800 border-white/20 text-white placeholder-gray-500 min-h-[120px]"
                    required
                  />
                </div>

                {/* Genre */}
                <div>
                  <Label htmlFor="genre" className="text-gray-300 text-lg font-semibold">
                    Genre/Style
                  </Label>
                  <Select name="genre" value={genre} onValueChange={setGenre} required>
                    <SelectTrigger className="mt-2 bg-gray-800 border-white/20 text-white h-12">
                      <SelectValue placeholder="Select genre or style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comedy">Comedy</SelectItem>
                      <SelectItem value="drama">Drama</SelectItem>
                      <SelectItem value="thriller">Thriller/Suspense</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="action">Action/Adventure</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="tech">Tech/Innovation</SelectItem>
                      <SelectItem value="business">Business/Entrepreneurship</SelectItem>
                      <SelectItem value="wellness">Health/Wellness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="duration" className="text-gray-300 text-lg font-semibold">
                    Duration/Length
                  </Label>
                  <Select name="duration" value={duration} onValueChange={setDuration} required>
                    <SelectTrigger className="mt-2 bg-gray-800 border-white/20 text-white h-12">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (1-5 minutes)</SelectItem>
                      <SelectItem value="medium">Medium (5-15 minutes)</SelectItem>
                      <SelectItem value="long">Long (15-30 minutes)</SelectItem>
                      <SelectItem value="feature">Feature Length (30+ minutes)</SelectItem>
                      <SelectItem value="series">Series/Multi-part</SelectItem>
                      <SelectItem value="micro">Micro Content (30 seconds)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Target Audience */}
                <div>
                  <Label htmlFor="audience" className="text-gray-300 text-lg font-semibold">
                    Target Audience
                  </Label>
                  <Select name="audience" value={audience} onValueChange={setAudience} required>
                    <SelectTrigger className="mt-2 bg-gray-800 border-white/20 text-white h-12">
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gen-z">Gen Z (16-24)</SelectItem>
                      <SelectItem value="millennials">Millennials (25-40)</SelectItem>
                      <SelectItem value="gen-x">Gen X (41-56)</SelectItem>
                      <SelectItem value="boomers">Baby Boomers (57+)</SelectItem>
                      <SelectItem value="professionals">Business Professionals</SelectItem>
                      <SelectItem value="students">Students/Academics</SelectItem>
                      <SelectItem value="creators">Content Creators</SelectItem>
                      <SelectItem value="general">General Audience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Trend Focus */}
                <div>
                  <Label htmlFor="trend-focus" className="text-gray-300 text-lg font-semibold">
                    Trend Focus (Optional)
                  </Label>
                  <Select name="trendFocus" value={trendFocus} onValueChange={setTrendFocus}>
                    <SelectTrigger className="mt-2 bg-gray-800 border-white/20 text-white h-12">
                      <SelectValue placeholder="Select current trend (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-tech">AI & Technology</SelectItem>
                      <SelectItem value="sustainability">Sustainability & Environment</SelectItem>
                      <SelectItem value="mental-health">Mental Health & Wellness</SelectItem>
                      <SelectItem value="remote-work">Remote Work & Digital Nomads</SelectItem>
                      <SelectItem value="social-justice">Social Justice & Activism</SelectItem>
                      <SelectItem value="crypto-web3">Crypto & Web3</SelectItem>
                      <SelectItem value="minimalism">Minimalism & Simple Living</SelectItem>
                      <SelectItem value="self-improvement">Self-Improvement & Productivity</SelectItem>
                      <SelectItem value="nostalgia">Nostalgia & Retro Culture</SelectItem>
                      <SelectItem value="authenticity">Authenticity & Transparency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xl py-6 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                      Creating Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 mr-3" />
                      Generate Content
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-yellow-400 flex items-center justify-between">
                <div className="flex items-center">
                  <Film className="mr-3 h-6 w-6" />
                  Generated Content
                </div>
                {generatedContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent)}
                    className="text-yellow-400 hover:bg-yellow-400/10"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">AI is crafting your content...</p>
                  </div>
                </div>
              ) : generatedContent ? (
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
                    <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed font-mono text-sm">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 h-96 flex items-center justify-center">
                  <div>
                    <Film className="w-16 h-16 mx-auto mb-6 text-gray-600" />
                    <p className="text-xl mb-2">Your AI-generated content will appear here</p>
                    <p className="text-sm">Fill out the form and click generate to start creating</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="text-white">STUDIO</span>{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              FEATURES
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-12 w-12 text-yellow-400" />,
                title: "Trend-Aware",
                description: "Content that leverages current trends and viral topics for maximum engagement",
              },
              {
                icon: <Users className="h-12 w-12 text-yellow-400" />,
                title: "Audience-Specific",
                description: "Tailored content that speaks directly to your target demographic and interests",
              },
              {
                icon: <Clock className="h-12 w-12 text-yellow-400" />,
                title: "Format Optimized",
                description: "Content structured perfectly for your chosen platform and duration requirements",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:border-yellow-400/50 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-black text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
